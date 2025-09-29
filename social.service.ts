import { Injectable } from '@nestjs/common';

export interface SocialProfile {
  id: string;
  email: string;
  name: string;
  picture?: string;
  provider: 'google' | 'facebook';
}

export interface ShareContent {
  title: string;
  description: string;
  url: string;
  image?: string;
}

@Injectable()
export class SocialService {
  async validateGoogleUser(profile: any): Promise<SocialProfile> {
    return {
      id: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      picture: profile.photos[0]?.value,
      provider: 'google',
    };
  }

  async validateFacebookUser(profile: any): Promise<SocialProfile> {
    return {
      id: profile.id,
      email: profile.emails?.[0]?.value,
      name: profile.displayName,
      picture: profile.photos[0]?.value,
      provider: 'facebook',
    };
  }

  generateShareUrls(content: ShareContent) {
    const encodedUrl = encodeURIComponent(content.url);
    const encodedTitle = encodeURIComponent(content.title);
    const encodedDescription = encodeURIComponent(content.description);

    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      instagram: null, // Instagram não suporta compartilhamento direto via URL
    };
  }

  async shareCompetition(competitionId: string, competitionData: any) {
    const shareContent: ShareContent = {
      title: `🏆 ${competitionData.name} - Zenith Compete`,
      description: `Participe da competição ${competitionData.name}! Inscrições abertas até ${competitionData.registrationDeadline}. Venha mostrar seu talento em Roraima!`,
      url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/competicoes/${competitionId}`,
      image: competitionData.bannerUrl,
    };

    return this.generateShareUrls(shareContent);
  }

  async shareTeam(teamId: string, teamData: any) {
    const shareContent: ShareContent = {
      title: `⚽ ${teamData.name} - Zenith Compete`,
      description: `Conheça a equipe ${teamData.name} de ${teamData.city}, ${teamData.state}. Acompanhe suas participações nas competições esportivas de Roraima!`,
      url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/equipes/${teamId}`,
      image: teamData.shieldUrl,
    };

    return this.generateShareUrls(shareContent);
  }

  async shareNews(newsId: string, newsData: any) {
    const shareContent: ShareContent = {
      title: `📰 ${newsData.title} - Zenith Compete`,
      description: newsData.excerpt || newsData.content.substring(0, 150) + '...',
      url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/noticias/${newsData.slug}`,
      image: newsData.imageUrl,
    };

    return this.generateShareUrls(shareContent);
  }

  async shareResults(matchId: string, matchData: any) {
    const shareContent: ShareContent = {
      title: `🏅 Resultado: ${matchData.homeTeam} vs ${matchData.awayTeam}`,
      description: `Confira o resultado da partida entre ${matchData.homeTeam} e ${matchData.awayTeam} na competição ${matchData.competition}!`,
      url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/partidas/${matchId}`,
      image: matchData.competitionBanner,
    };

    return this.generateShareUrls(shareContent);
  }

  generateMetaTags(content: ShareContent) {
    return {
      // Open Graph (Facebook, LinkedIn)
      'og:title': content.title,
      'og:description': content.description,
      'og:url': content.url,
      'og:image': content.image,
      'og:type': 'website',
      'og:site_name': 'Zenith Compete',
      
      // Twitter Cards
      'twitter:card': 'summary_large_image',
      'twitter:title': content.title,
      'twitter:description': content.description,
      'twitter:image': content.image,
      'twitter:site': '@zenithcompete',
      
      // WhatsApp
      'whatsapp:title': content.title,
      'whatsapp:description': content.description,
      'whatsapp:image': content.image,
    };
  }

  async generateSocialPost(type: 'competition' | 'result' | 'news', data: any) {
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    
    switch (type) {
      case 'competition':
        return {
          text: `🏆 Nova competição disponível!\n\n${data.name}\n📅 Inscrições até: ${data.registrationDeadline}\n📍 Local: ${data.location}\n\nInscreva sua equipe agora! 👇\n${baseUrl}/competicoes/${data.id}`,
          hashtags: ['#ZenithCompete', '#Roraima', '#Esporte', '#Competicao'],
        };
        
      case 'result':
        return {
          text: `🏅 RESULTADO!\n\n${data.homeTeam} ${data.homeScore} x ${data.awayScore} ${data.awayTeam}\n\n🏆 ${data.competition}\n📅 ${data.date}\n\nVeja mais detalhes: ${baseUrl}/partidas/${data.id}`,
          hashtags: ['#ZenithCompete', '#Resultado', '#Esporte', '#Roraima'],
        };
        
      case 'news':
        return {
          text: `📰 ${data.title}\n\n${data.excerpt}\n\nLeia mais: ${baseUrl}/noticias/${data.slug}`,
          hashtags: ['#ZenithCompete', '#Noticias', '#Esporte', '#Roraima'],
        };
        
      default:
        return {
          text: `🏆 Zenith Compete - O melhor do esporte em Roraima!\n\nAcompanhe competições, resultados e muito mais em: ${baseUrl}`,
          hashtags: ['#ZenithCompete', '#Roraima', '#Esporte'],
        };
    }
  }
}
