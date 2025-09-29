import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateTeamDto, UpdateTeamDto, ApproveTeamDto } from './dto/team.dto';

@Injectable()
export class TeamsService {
  constructor(private supabaseService: SupabaseService) {}

  async create(createTeamDto: CreateTeamDto, userId: string) {
    const supabase = this.supabaseService.getClient();

    // Verificar se o usuário já tem uma equipe
    const { data: existingTeam } = await supabase
      .from('teams')
      .select('id')
      .eq('coach_id', userId)
      .single();

    if (existingTeam) {
      throw new BadRequestException('Usuário já possui uma equipe cadastrada');
    }

    const { data, error } = await supabase
      .from('teams')
      .insert({
        ...createTeamDto,
        coach_id: userId,
        contact_email: createTeamDto.contactEmail,
        phone_number: createTeamDto.phoneNumber,
        shield_url: createTeamDto.shieldUrl,
      })
      .select()
      .single();

    if (error) {
      throw new BadRequestException('Falha ao criar equipe: ' + error.message);
    }

    return data;
  }

  async findAll(isApproved?: boolean) {
    const supabase = this.supabaseService.getClient();

    let query = supabase
      .from('teams')
      .select(`
        *,
        profiles:coach_id (
          full_name,
          role
        )
      `);

    if (isApproved !== undefined) {
      query = query.eq('is_approved', isApproved);
    }

    const { data, error } = await query;

    if (error) {
      throw new BadRequestException('Falha ao buscar equipes: ' + error.message);
    }

    return data;
  }

  async findOne(id: string) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('teams')
      .select(`
        *,
        profiles:coach_id (
          full_name,
          role
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      throw new NotFoundException('Equipe não encontrada');
    }

    return data;
  }

  async findByUserId(userId: string) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('coach_id', userId)
      .single();

    if (error) {
      throw new NotFoundException('Equipe não encontrada para este usuário');
    }

    return data;
  }

  async update(id: string, updateTeamDto: UpdateTeamDto, userId: string, userRole: string) {
    const supabase = this.supabaseService.getClient();

    // Verificar se o usuário tem permissão para atualizar esta equipe
    if (userRole !== 'admin') {
      const { data: team } = await supabase
        .from('teams')
        .select('coach_id')
        .eq('id', id)
        .single();

      if (!team || team.coach_id !== userId) {
        throw new ForbiddenException('Sem permissão para atualizar esta equipe');
      }
    }

    const { data, error } = await supabase
      .from('teams')
      .update({
        ...updateTeamDto,
        contact_email: updateTeamDto.contactEmail,
        phone_number: updateTeamDto.phoneNumber,
        shield_url: updateTeamDto.shieldUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new BadRequestException('Falha ao atualizar equipe: ' + error.message);
    }

    return data;
  }

  async approve(id: string, approveTeamDto: ApproveTeamDto) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('teams')
      .update({
        is_approved: approveTeamDto.isApproved,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new BadRequestException('Falha ao aprovar/reprovar equipe: ' + error.message);
    }

    return data;
  }

  async remove(id: string) {
    const supabase = this.supabaseService.getClient();

    const { error } = await supabase
      .from('teams')
      .delete()
      .eq('id', id);

    if (error) {
      throw new BadRequestException('Falha ao excluir equipe: ' + error.message);
    }

    return { message: 'Equipe excluída com sucesso' };
  }
}
