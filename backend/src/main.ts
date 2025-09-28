import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 🔧 CONFIGURAR CORS
  app.enableCors({
    origin: [
      'https://zenithcompete.com',
      'http://localhost:5173',
      'http://localhost:3000'
    ],
    credentials: true,
  });
  
  await app.listen(3000);
  console.log('🚀 Backend rodando na porta 3000');
}
bootstrap();
