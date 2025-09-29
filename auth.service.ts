import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from '../supabase/supabase.service';
import { SignUpDto, SignInDto, UpdateProfileDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private supabaseService: SupabaseService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const supabase = this.supabaseService.getClient();

    // Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: signUpDto.email,
      password: signUpDto.password,
    });

    if (authError) {
      throw new BadRequestException(authError.message);
    }

    if (!authData.user) {
      throw new BadRequestException('Falha ao criar usuário');
    }

    // Criar perfil do usuário
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        full_name: signUpDto.fullName,
        role: signUpDto.role,
      })
      .select()
      .single();

    if (profileError) {
      // Se falhar ao criar o perfil, tentar remover o usuário criado
      await supabase.auth.admin.deleteUser(authData.user.id);
      throw new BadRequestException('Falha ao criar perfil do usuário');
    }

    return {
      user: authData.user,
      profile: profileData,
      message: 'Usuário criado com sucesso. Verifique seu email para confirmar a conta.',
    };
  }

  async signIn(signInDto: SignInDto) {
    const supabase = this.supabaseService.getClient();

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: signInDto.email,
      password: signInDto.password,
    });

    if (authError) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Buscar perfil do usuário
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      throw new UnauthorizedException('Perfil do usuário não encontrado');
    }

    // Gerar JWT token
    const payload = { 
      sub: authData.user.id, 
      email: authData.user.email,
      role: profileData.role 
    };
    
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      user: authData.user,
      profile: profileData,
    };
  }

  async getProfile(userId: string) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw new UnauthorizedException('Perfil não encontrado');
    }

    return data;
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('profiles')
      .update({
        full_name: updateProfileDto.fullName,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new BadRequestException('Falha ao atualizar perfil');
    }

    return data;
  }

  async signOut(userId: string) {
    const supabase = this.supabaseService.getClient();
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw new BadRequestException('Falha ao fazer logout');
    }

    return { message: 'Logout realizado com sucesso' };
  }
}
