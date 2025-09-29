import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('team-shield')
  @UseInterceptors(FileInterceptor('file'))
  async uploadTeamShield(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado');
    }

    if (!this.uploadService.validateImageFile(file)) {
      throw new BadRequestException('Apenas arquivos de imagem são permitidos');
    }

    const filePath = await this.uploadService.uploadTeamShield(file);
    
    return {
      message: 'Escudo da equipe enviado com sucesso',
      filePath,
      url: `${process.env.API_URL || 'http://localhost:3001'}${filePath}`,
    };
  }

  @Post('competition-banner')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCompetitionBanner(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado');
    }

    if (!this.uploadService.validateImageFile(file)) {
      throw new BadRequestException('Apenas arquivos de imagem são permitidos');
    }

    const filePath = await this.uploadService.uploadCompetitionBanner(file);
    
    return {
      message: 'Banner da competição enviado com sucesso',
      filePath,
      url: `${process.env.API_URL || 'http://localhost:3001'}${filePath}`,
    };
  }

  @Post('sponsor-logo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSponsorLogo(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado');
    }

    if (!this.uploadService.validateImageFile(file)) {
      throw new BadRequestException('Apenas arquivos de imagem são permitidos');
    }

    const filePath = await this.uploadService.uploadSponsorLogo(file);
    
    return {
      message: 'Logo do patrocinador enviado com sucesso',
      filePath,
      url: `${process.env.API_URL || 'http://localhost:3001'}${filePath}`,
    };
  }

  @Post('athlete-photo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAthletePhoto(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado');
    }

    if (!this.uploadService.validateImageFile(file)) {
      throw new BadRequestException('Apenas arquivos de imagem são permitidos');
    }

    const filePath = await this.uploadService.uploadAthletePhoto(file);
    
    return {
      message: 'Foto do atleta enviada com sucesso',
      filePath,
      url: `${process.env.API_URL || 'http://localhost:3001'}${filePath}`,
    };
  }

  @Post('general')
  @UseInterceptors(FileInterceptor('file'))
  async uploadGeneral(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado');
    }

    if (!this.uploadService.validateImageFile(file)) {
      throw new BadRequestException('Apenas arquivos de imagem são permitidos');
    }

    const filePath = await this.uploadService.processImage(file);
    
    return {
      message: 'Imagem enviada com sucesso',
      filePath,
      url: `${process.env.API_URL || 'http://localhost:3001'}${filePath}`,
    };
  }
}
