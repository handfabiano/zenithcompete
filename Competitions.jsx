import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Search,
  Filter,
  ArrowRight,
  Trophy
} from 'lucide-react';

const Competitions = () => {
  const [competitions, setCompetitions] = useState([]);
  const [filteredCompetitions, setFilteredCompetitions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock de dados das competições
  useEffect(() => {
    // Simular carregamento da API
    setTimeout(() => {
      const mockCompetitions = [
        {
          id: 1,
          title: 'Campeonato Regional de Futebol 2024',
          description: 'Competição entre as melhores equipes da região com premiação em dinheiro para os primeiros colocados.',
          startDate: '2024-03-15',
          endDate: '2024-03-30',
          location: 'Estádio Municipal - São Paulo',
          registrationStartDate: '2024-01-15',
          registrationEndDate: '2024-03-01',
          registrationFee: 150.00,
          status: 'open_for_registration',
          registeredTeams: 12,
          maxTeams: 16,
          bannerUrl: '/api/placeholder/400/200',
          sport: 'Futebol'
        },
        {
          id: 2,
          title: 'Copa de Basquete Juvenil',
          description: 'Torneio para atletas até 18 anos, promovendo o desenvolvimento do basquete na categoria de base.',
          startDate: '2024-04-20',
          endDate: '2024-04-25',
          location: 'Ginásio Central - Rio de Janeiro',
          registrationStartDate: '2024-02-01',
          registrationEndDate: '2024-04-10',
          registrationFee: 100.00,
          status: 'upcoming',
          registeredTeams: 8,
          maxTeams: 12,
          bannerUrl: '/api/placeholder/400/200',
          sport: 'Basquete'
        },
        {
          id: 3,
          title: 'Torneio de Vôlei Feminino',
          description: 'Competição exclusiva para equipes femininas, incentivando a participação das mulheres no esporte.',
          startDate: '2024-05-10',
          endDate: '2024-05-15',
          location: 'Arena Esportiva - Belo Horizonte',
          registrationStartDate: '2024-03-01',
          registrationEndDate: '2024-05-01',
          registrationFee: 120.00,
          status: 'open_for_registration',
          registeredTeams: 6,
          maxTeams: 10,
          bannerUrl: '/api/placeholder/400/200',
          sport: 'Vôlei'
        },
        {
          id: 4,
          title: 'Campeonato de Futsal Universitário',
          description: 'Competição entre universidades de todo o país, promovendo a integração estudantil através do esporte.',
          startDate: '2024-06-01',
          endDate: '2024-06-10',
          location: 'Complexo Esportivo Universitário - Brasília',
          registrationStartDate: '2024-04-01',
          registrationEndDate: '2024-05-20',
          registrationFee: 80.00,
          status: 'upcoming',
          registeredTeams: 0,
          maxTeams: 20,
          bannerUrl: '/api/placeholder/400/200',
          sport: 'Futsal'
        },
        {
          id: 5,
          title: 'Liga de Handebol Regional',
          description: 'Liga regional de handebol com jogos durante todo o semestre, formato de pontos corridos.',
          startDate: '2024-02-01',
          endDate: '2024-07-30',
          location: 'Diversos ginásios da região',
          registrationStartDate: '2023-12-01',
          registrationEndDate: '2024-01-20',
          registrationFee: 200.00,
          status: 'in_progress',
          registeredTeams: 14,
          maxTeams: 14,
          bannerUrl: '/api/placeholder/400/200',
          sport: 'Handebol'
        },
        {
          id: 6,
          title: 'Copa de Tênis de Mesa',
          description: 'Torneio individual e por equipes de tênis de mesa, aberto para todas as idades.',
          startDate: '2023-12-15',
          endDate: '2023-12-20',
          location: 'Centro de Convenções - Salvador',
          registrationStartDate: '2023-10-01',
          registrationEndDate: '2023-12-01',
          registrationFee: 50.00,
          status: 'completed',
          registeredTeams: 24,
          maxTeams: 24,
          bannerUrl: '/api/placeholder/400/200',
          sport: 'Tênis de Mesa'
        }
      ];
      
      setCompetitions(mockCompetitions);
      setFilteredCompetitions(mockCompetitions);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrar competições baseado na busca e filtros
  useEffect(() => {
    let filtered = competitions;

    // Filtro por texto
    if (searchTerm) {
      filtered = filtered.filter(competition =>
        competition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        competition.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        competition.sport.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(competition => competition.status === statusFilter);
    }

    setFilteredCompetitions(filtered);
  }, [competitions, searchTerm, statusFilter]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'open_for_registration':
        return <Badge className="bg-green-100 text-green-800">Inscrições Abertas</Badge>;
      case 'upcoming':
        return <Badge variant="secondary">Em Breve</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800">Em Andamento</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800">Finalizada</Badge>;
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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Trophy className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Carregando competições...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header da Página */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Competições Esportivas
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubra e participe das melhores competições esportivas da região. 
              Inscreva sua equipe e mostre seu talento!
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros e Busca */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nome, descrição ou modalidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="open_for_registration">Inscrições Abertas</SelectItem>
                  <SelectItem value="upcoming">Em Breve</SelectItem>
                  <SelectItem value="in_progress">Em Andamento</SelectItem>
                  <SelectItem value="completed">Finalizadas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Lista de Competições */}
        {filteredCompetitions.length === 0 ? (
          <div className="text-center py-12">
            <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma competição encontrada
            </h3>
            <p className="text-gray-600">
              Tente ajustar os filtros ou buscar por outros termos.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCompetitions.map((competition) => (
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
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white">
                      {competition.sport}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl">{competition.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {competition.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>
                        {formatDate(competition.startDate)} - {formatDate(competition.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{competition.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span>
                        {competition.registeredTeams}/{competition.maxTeams} equipes inscritas
                      </span>
                    </div>
                    {competition.registrationFee > 0 && (
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium">Taxa de inscrição: </span>
                        <span className="ml-1 text-green-600 font-semibold">
                          {formatCurrency(competition.registrationFee)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/competicoes/${competition.id}`} className="flex-1">
                      <Button className="w-full">
                        Ver Detalhes
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    {competition.status === 'open_for_registration' && (
                      <Link to="/login">
                        <Button variant="outline">
                          Inscrever
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Call to Action */}
        {filteredCompetitions.length > 0 && (
          <div className="text-center mt-12 bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Pronto para Competir?
            </h3>
            <p className="text-gray-600 mb-6">
              Cadastre sua equipe e participe das melhores competições esportivas da região.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cadastro">
                <Button size="lg">
                  <Users className="mr-2 h-5 w-5" />
                  Cadastrar Equipe
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Área da Equipe
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Competitions;
