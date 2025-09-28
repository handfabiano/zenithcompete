import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Users, 
  Calendar, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Eye
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalAthletes: 0,
    activeCompetitions: 0,
    pendingRegistrations: 0,
    completedCompetitions: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingCompetitions, setUpcomingCompetitions] = useState([]);

  const isAdmin = user?.profile?.role === 'admin';

  useEffect(() => {
    // Mock de dados para demonstração
    setStats({
      totalAthletes: isAdmin ? 156 : 12,
      activeCompetitions: isAdmin ? 8 : 3,
      pendingRegistrations: isAdmin ? 24 : 2,
      completedCompetitions: isAdmin ? 45 : 8
    });

    setRecentActivities([
      {
        id: 1,
        type: 'registration',
        title: 'Nova inscrição no Campeonato Regional',
        description: 'Equipe Águias se inscreveu na competição',
        time: '2 horas atrás',
        icon: Calendar
      },
      {
        id: 2,
        type: 'athlete',
        title: 'Novo atleta cadastrado',
        description: 'João Silva foi adicionado à equipe',
        time: '5 horas atrás',
        icon: Users
      },
      {
        id: 3,
        type: 'competition',
        title: 'Competição finalizada',
        description: 'Copa de Basquete Juvenil foi concluída',
        time: '1 dia atrás',
        icon: Trophy
      }
    ]);

    setUpcomingCompetitions([
      {
        id: 1,
        name: 'Campeonato Regional de Futebol 2024',
        startDate: '2024-03-15',
        registrationDeadline: '2024-03-01',
        status: 'open',
        registeredTeams: 12,
        maxTeams: 16
      },
      {
        id: 2,
        name: 'Torneio de Vôlei Feminino',
        startDate: '2024-05-10',
        registrationDeadline: '2024-05-01',
        status: 'open',
        registeredTeams: 6,
        maxTeams: 10
      },
      {
        id: 3,
        name: 'Copa de Basquete Juvenil',
        startDate: '2024-04-20',
        registrationDeadline: '2024-04-10',
        status: 'upcoming',
        registeredTeams: 8,
        maxTeams: 12
      }
    ]);
  }, [isAdmin]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'open':
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
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {isAdmin ? 'Painel Administrativo' : 'Painel da Equipe'}
        </h1>
        <p className="text-gray-600">
          Bem-vindo de volta, {user?.profile?.full_name || user?.email}
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isAdmin ? 'Total de Atletas' : 'Meus Atletas'}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAthletes}</div>
            <p className="text-xs text-muted-foreground">
              +2 desde o último mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Competições Ativas
            </CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCompetitions}</div>
            <p className="text-xs text-muted-foreground">
              {isAdmin ? 'Competições em andamento' : 'Participando atualmente'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isAdmin ? 'Inscrições Pendentes' : 'Inscrições Abertas'}
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingRegistrations}</div>
            <p className="text-xs text-muted-foreground">
              {isAdmin ? 'Aguardando aprovação' : 'Disponíveis para inscrição'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Competições Finalizadas
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedCompetitions}</div>
            <p className="text-xs text-muted-foreground">
              Total histórico
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Atividades Recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>
              Últimas ações realizadas no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Próximas Competições */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Próximas Competições</CardTitle>
              <CardDescription>
                Competições com inscrições abertas ou próximas
              </CardDescription>
            </div>
            <Link to="/competicoes">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Ver Todas
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingCompetitions.map((competition) => (
                <div key={competition.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 line-clamp-1">
                      {competition.name}
                    </h4>
                    {getStatusBadge(competition.status)}
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Início: {formatDate(competition.startDate)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Inscrições até: {formatDate(competition.registrationDeadline)}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {competition.registeredTeams}/{competition.maxTeams} equipes
                    </div>
                  </div>
                  {competition.status === 'open' && (
                    <div className="mt-3">
                      <Link to={`/competicoes/${competition.id}`}>
                        <Button size="sm" className="w-full">
                          {isAdmin ? 'Gerenciar' : 'Inscrever Equipe'}
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Acesso rápido às principais funcionalidades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {isAdmin ? (
              <>
                <Link to="/painel/admin/competicoes">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <Trophy className="h-6 w-6 mb-2" />
                    Nova Competição
                  </Button>
                </Link>
                <Link to="/painel/admin/equipes">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <Users className="h-6 w-6 mb-2" />
                    Gerenciar Equipes
                  </Button>
                </Link>
                <Link to="/painel/admin/noticias">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <Plus className="h-6 w-6 mb-2" />
                    Nova Notícia
                  </Button>
                </Link>
                <Link to="/painel/admin/apoiadores">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <TrendingUp className="h-6 w-6 mb-2" />
                    Gerenciar Apoiadores
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/painel/atletas">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <Plus className="h-6 w-6 mb-2" />
                    Adicionar Atleta
                  </Button>
                </Link>
                <Link to="/painel/equipe">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <Users className="h-6 w-6 mb-2" />
                    Gerenciar Equipe
                  </Button>
                </Link>
                <Link to="/painel/inscricoes">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <Calendar className="h-6 w-6 mb-2" />
                    Minhas Inscrições
                  </Button>
                </Link>
                <Link to="/competicoes">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <Eye className="h-6 w-6 mb-2" />
                    Ver Competições
                  </Button>
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
