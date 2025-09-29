import { Injectable, BadRequestException } from '@nestjs/common';
import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  private readonly uploadPath = './uploads';
  private readonly publicPath = './public/uploads';

  constructor() {
    // Criar diretórios se não existirem
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
    if (!fs.existsSync(this.publicPath)) {
      fs.mkdirSync(this.publicPath, { recursive: true });
    }
  }

  async processImage(
    file: Express.Multer.File,
    options: {
      width?: number;
      height?: number;
      quality?: number;
      format?: 'jpeg' | 'png' | 'webp';
    } = {},
  ): Promise<string> {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado');
    }

    const { width = 800, height = 600, quality = 80, format = 'webp' } = options;
    
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${format}`;
    const outputPath = path.join(this.publicPath, filename);

    try {
      await sharp(file.buffer || file.path)
        .resize(width, height, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .toFormat(format, { quality })
        .toFile(outputPath);

      // Remover arquivo original se foi salvo temporariamente
      if (file.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      return `/uploads/${filename}`;
    } catch (error) {
      throw new BadRequestException('Erro ao processar a imagem');
    }
  }

  async uploadTeamShield(file: Express.Multer.File): Promise<string> {
    return this.processImage(file, {
      width: 200,
      height: 200,
      quality: 90,
      format: 'png',
    });
  }

  async uploadCompetitionBanner(file: Express.Multer.File): Promise<string> {
    return this.processImage(file, {
      width: 1200,
      height: 400,
      quality: 85,
      format: 'webp',
    });
  }

  async uploadSponsorLogo(file: Express.Multer.File): Promise<string> {
    return this.processImage(file, {
      width: 300,
      height: 150,
      quality: 90,
      format: 'png',
    });
  }

  async uploadAthletePhoto(file: Express.Multer.File): Promise<string> {
    return this.processImage(file, {
      width: 400,
      height: 400,
      quality: 85,
      format: 'webp',
    });
  }

  async deleteFile(filePath: string): Promise<void> {
    const fullPath = path.join('./public', filePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }

  validateImageFile(file: Express.Multer.File): boolean {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    return allowedMimes.includes(file.mimetype);
  }

  getFileUrl(filename: string): string {
    return `/uploads/${filename}`;
  }
}
