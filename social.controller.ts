import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SocialService } from './social.service';
import type { Request, Response } from 'express';

@Controller('social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  // Autenticação com Google
  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {
    // Inicia o fluxo de autenticação com Google
  }

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    // Aqui você pode processar o usuário autenticado
    // Por exemplo, criar um JWT token e redirecionar para o frontend
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/auth/callback?provider=google&user=${JSON.stringify(user)}`);
  }

  // Autenticação com Facebook
  @Get('auth/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(@Req() req: Request) {
    // Inicia o fluxo de autenticação com Facebook
  }

  @Get('auth/facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    // Aqui você pode processar o usuário autenticado
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/auth/callback?provider=facebook&user=${JSON.stringify(user)}`);
  }

  // Gerar URLs de compartilhamento para competições
  @Get('share/competition/:id')
  async shareCompetition(@Param('id') competitionId: string) {
    // Aqui você buscaria os dados da competição do banco de dados
    const competitionData = {
      name: 'Campeonato de Futebol 2024',
      registrationDeadline: '2024-12-31',
      bannerUrl: '/uploads/competition-banner.jpg',
    };

    const shareUrls = await this.socialService.shareCompetition(competitionId, competitionData);
    const metaTags = this.socialService.generateMetaTags({
      title: `🏆 ${competitionData.name} - Zenith Compete`,
      description: `Participe da competição ${competitionData.name}! Inscrições abertas.`,
      url: `${process.env.FRONTEND_URL}/competicoes/${competitionId}`,
      image: competitionData.bannerUrl,
    });

    return {
      shareUrls,
      metaTags,
      socialPost: await this.socialService.generateSocialPost('competition', {
        id: competitionId,
        ...competitionData,
      }),
    };
  }

  // Gerar URLs de compartilhamento para equipes
  @Get('share/team/:id')
  async shareTeam(@Param('id') teamId: string) {
    // Aqui você buscaria os dados da equipe do banco de dados
    const teamData = {
      name: 'Equipe Exemplo',
      city: 'Boa Vista',
      state: 'RR',
      shieldUrl: '/uploads/team-shield.png',
    };

    const shareUrls = await this.socialService.shareTeam(teamId, teamData);
    const metaTags = this.socialService.generateMetaTags({
      title: `⚽ ${teamData.name} - Zenith Compete`,
      description: `Conheça a equipe ${teamData.name} de ${teamData.city}, ${teamData.state}.`,
      url: `${process.env.FRONTEND_URL}/equipes/${teamId}`,
      image: teamData.shieldUrl,
    });

    return {
      shareUrls,
      metaTags,
    };
  }

  // Gerar URLs de compartilhamento para notícias
  @Get('share/news/:slug')
  async shareNews(@Param('slug') newsSlug: string) {
    // Aqui você buscaria os dados da notícia do banco de dados
    const newsData = {
      title: 'Título da Notícia',
      excerpt: 'Resumo da notícia...',
      slug: newsSlug,
      imageUrl: '/uploads/news-image.jpg',
    };

    const shareUrls = await this.socialService.shareNews(newsSlug, newsData);
    const metaTags = this.socialService.generateMetaTags({
      title: `📰 ${newsData.title} - Zenith Compete`,
      description: newsData.excerpt,
      url: `${process.env.FRONTEND_URL}/noticias/${newsSlug}`,
      image: newsData.imageUrl,
    });

    return {
      shareUrls,
      metaTags,
      socialPost: await this.socialService.generateSocialPost('news', newsData),
    };
  }

  // Gerar URLs de compartilhamento para resultados
  @Get('share/match/:id')
  async shareMatch(@Param('id') matchId: string) {
    // Aqui você buscaria os dados da partida do banco de dados
    const matchData = {
      homeTeam: 'Equipe A',
      awayTeam: 'Equipe B',
      homeScore: 2,
      awayScore: 1,
      competition: 'Campeonato 2024',
      date: '2024-01-15',
      competitionBanner: '/uploads/competition-banner.jpg',
    };

    const shareUrls = await this.socialService.shareResults(matchId, matchData);
    const metaTags = this.socialService.generateMetaTags({
      title: `🏅 Resultado: ${matchData.homeTeam} vs ${matchData.awayTeam}`,
      description: `Confira o resultado da partida!`,
      url: `${process.env.FRONTEND_URL}/partidas/${matchId}`,
      image: matchData.competitionBanner,
    });

    return {
      shareUrls,
      metaTags,
      socialPost: await this.socialService.generateSocialPost('result', {
        id: matchId,
        ...matchData,
      }),
    };
  }

  // Endpoint para gerar post personalizado para redes sociais
  @Post('generate-post')
  async generatePost(@Body() data: { type: string; content: any }) {
    return await this.socialService.generateSocialPost(data.type as any, data.content);
  }

  // Endpoint para obter meta tags para uma URL específica
  @Post('meta-tags')
  async generateMetaTags(@Body() content: {
    title: string;
    description: string;
    url: string;
    image?: string;
  }) {
    return this.socialService.generateMetaTags(content);
  }
}
