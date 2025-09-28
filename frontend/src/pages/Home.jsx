import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Trophy, 
  Users, 
  ArrowRight, 
  Star,
  MapPin,
  Clock
} from 'lucide-react';

const Home = () => {
  const [featuredCompetitions, setFeaturedCompetitions] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [sponsors, setSponsors] = useState([]);

  // Dados mockados para demonstração (serão substituídos por dados reais da API)
  useEffect(() => {
    // Mock de competições em destaque
    setFeaturedCompetitions([
      {
        id: 1,
        title: 'Campeonato Regional de Futebol 2024',
        description: 'Competição entre as melhores equipes da região',
        startDate: '2024-03-15',
        location: 'Estádio Municipal',
        status: 'open_for_registration',
        registeredTeams: 12,
        maxTeams: 16,
        bannerUrl: '/api/placeholder/400/200'
      },
      {
        id: 2,
        title: 'Copa de Basquete Juvenil',
        description: 'Torneio para atletas até 18 anos',
        startDate: '2024-04-20',
        location: 'Ginásio Central',
        status: 'upcoming',
        registeredTeams: 8,
        maxTeams: 12,
        bannerUrl: '/api/placeholder/400/200'
      },
      {
        id: 3,
        title: 'Torneio de Vôlei Feminino',
        description: 'Competição exclusiva para equipes femininas',
        startDate: '2024-05-10',
        location: 'Arena Esportiva',
        status: 'open_for_registration',
        registeredTeams: 6,
        maxTeams: 10,
        bannerUrl: '/api/placeholder/400/200'
      }
    ]);

    // Mock de notícias recentes
    setLatestNews([
      {
        id: 1,
        title: 'Inscrições abertas para o Campeonato Regional',
        excerpt: 'As equipes já podem se inscrever para a maior competição do ano...',
        publishedAt: '2024-01-15',
        imageUrl: '/api/placeholder/300/200'
      },
      {
        id: 2,
        title: 'Novo regulamento para competições 2024',
        excerpt: 'Confira as principais mudanças nas regras para este ano...',
        publishedAt: '2024-01-10',
        imageUrl: '/api/placeholder/300/200'
      },
      {
        id: 3,
        title: 'Parceria com nova empresa de equipamentos',
        excerpt: 'Anunciamos nossa nova parceria que beneficiará todas as equipes...',
        publishedAt: '2024-01-05',
        imageUrl: '/api/placeholder/300/200'
      }
    ]);

    // Mock de patrocinadores
    setSponsors([
      { id: 1, name: 'SportTech', logoUrl: '/api/placeholder/150/80', level: 'gold' },
      { id: 2, name: 'Equipamentos Pro', logoUrl: '/api/placeholder/150/80', level: 'silver' },
      { id: 3, name: 'Academia Fitness', logoUrl: '/api/placeholder/150/80', level: 'bronze' },
      { id: 4, name: 'Nutrição Esportiva', logoUrl: '/api/placeholder/150/80', level: 'bronze' },
    ]);
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'open_for_registration':
        return <Badge className="bg-green-100 text-green-800">Inscrições Abertas</Badge>;
      case 'upcoming':
        return <Badge variant="secondary">Em Breve</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800">Em Andamento</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bem-vindo ao Zenith Compete
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              A plataforma completa para gestão de competições esportivas em Roraima
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/competicoes">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Calendar className="mr-2 h-5 w-5" />
                  Ver Competições
                </Button>
              </Link>
              <Link to="/cadastro">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Users className="mr-2 h-5 w-5" />
                  Cadastrar Equipe
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">50+</h3>
              <p className="text-gray-600">Competições Realizadas</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">200+</h3>
              <p className="text-gray-600">Equipes Cadastradas</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1000+</h3>
              <p className="text-gray-600">Atletas Participantes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Competições em Destaque */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Competições em Destaque
            </h2>
            <p className="text-lg text-gray-600">
              Confira as principais competições abertas para inscrição
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCompetitions.map((competition) => (
              <Card key={competition.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 relative">
                  <img 
                    src={competition.bannerUrl} 
                    alt={competition.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    {getStatusBadge(competition.status)}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{competition.title}</CardTitle>
                  <CardDescription>{competition.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(competition.startDate)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {competition.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {competition.registeredTeams}/{competition.maxTeams} equipes
                    </div>
                  </div>
                  <Link to={`/competicoes/${competition.id}`}>
                    <Button className="w-full">
                      Ver Detalhes
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/competicoes">
              <Button variant="outline" size="lg">
                Ver Todas as Competições
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Últimas Notícias */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Últimas Notícias
            </h2>
            <p className="text-lg text-gray-600">
              Fique por dentro das novidades do mundo esportivo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.map((news) => (
              <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200">
                  <img 
                    src={news.imageUrl} 
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{news.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{news.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {formatDate(news.publishedAt)}
                    </div>
                    <Link to={`/noticias/${news.id}`}>
                      <Button variant="ghost" size="sm">
                        Ler mais
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/noticias">
              <Button variant="outline" size="lg">
                Ver Todas as Notícias
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Nossos Apoiadores */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nossos Apoiadores
            </h2>
            <p className="text-lg text-gray-600">
              Empresas que acreditam no esporte e apoiam nossas competições
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {sponsors.map((sponsor) => (
              <div key={sponsor.id} className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <img 
                    src={sponsor.logoUrl} 
                    alt={sponsor.name}
                    className="w-full h-16 object-contain mx-auto"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">{sponsor.name}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Interessado em apoiar nossas competições?
            </p>
            <Button variant="outline">
              Seja um Apoiador
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
