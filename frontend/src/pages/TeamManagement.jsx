import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Save, 
  X, 
  Upload,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { teamsService } from '../lib/api';

const TeamManagement = () => {
  const { user } = useAuth();
  const [team, setTeam] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    contactEmail: '',
    phoneNumber: '',
    city: '',
    state: 'RR',
    description: ''
  });

  useEffect(() => {
    loadTeamData();
  }, []);

  const loadTeamData = async () => {
    try {
      setLoading(true);
      const response = await teamsService.getMyTeam();
      const teamData = response.data;
      
      setTeam(teamData);
      setFormData({
        name: teamData.name || '',
        contactEmail: teamData.contact_email || '',
        phoneNumber: teamData.phone_number || '',
        city: teamData.city || '',
        state: teamData.state || 'RR',
        description: teamData.description || ''
      });
    } catch (err) {
      console.error('Erro ao carregar dados da equipe:', err);
      setError('Erro ao carregar dados da equipe');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      
      await teamsService.update(team.id, formData);
      
      setSuccess('Dados da equipe atualizados com sucesso!');
      setEditing(false);
      await loadTeamData(); // Recarregar dados
    } catch (err) {
      console.error('Erro ao atualizar equipe:', err);
      setError(err.response?.data?.message || 'Erro ao atualizar dados da equipe');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setError('');
    setSuccess('');
    // Restaurar dados originais
    if (team) {
      setFormData({
        name: team.name || '',
        contactEmail: team.contact_email || '',
        phoneNumber: team.phone_number || '',
        city: team.city || '',
        state: team.state || 'RR',
        description: team.description || ''
      });
    }
  };

  const getStatusBadge = (isApproved) => {
    if (isApproved) {
      return (
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Aprovada
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-yellow-100 text-yellow-800">
          <Clock className="h-3 w-3 mr-1" />
          Aguardando Aprovação
        </Badge>
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dados da equipe...</p>
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="text-center py-12">
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nenhuma equipe encontrada
        </h3>
        <p className="text-gray-600">
          Você ainda não possui uma equipe cadastrada.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Minha Equipe</h1>
          <p className="text-gray-600">
            Gerencie as informações da sua equipe
          </p>
        </div>
        {!editing && (
          <Button onClick={() => setEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        )}
      </div>

      {/* Status da Equipe */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Status da Equipe</CardTitle>
            {getStatusBadge(team.is_approved)}
          </div>
        </CardHeader>
        <CardContent>
          {team.is_approved ? (
            <div className="flex items-center text-green-700">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Sua equipe foi aprovada e pode participar das competições.</span>
            </div>
          ) : (
            <div className="flex items-center text-yellow-700">
              <Clock className="h-5 w-5 mr-2" />
              <span>
                Sua equipe está aguardando aprovação do administrador. 
                Você será notificado quando a aprovação for concluída.
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Informações da Equipe */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Informações da Equipe</CardTitle>
              <CardDescription>
                Dados básicos e informações de contato
              </CardDescription>
            </div>
            {editing && (
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Mensagens de Feedback */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">{success}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome da Equipe */}
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Equipe</Label>
                {editing ? (
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="Nome da equipe"
                    />
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>{team.name}</span>
                  </div>
                )}
              </div>

              {/* E-mail de Contato */}
              <div className="space-y-2">
                <Label htmlFor="contactEmail">E-mail de Contato</Label>
                {editing ? (
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="contato@equipe.com"
                    />
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{team.contact_email}</span>
                  </div>
                )}
              </div>

              {/* Telefone */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Telefone</Label>
                {editing ? (
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="(95) 99999-9999"
                    />
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{team.phone_number || 'Não informado'}</span>
                  </div>
                )}
              </div>

              {/* Cidade */}
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                {editing ? (
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="Boa Vista"
                    />
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{team.city}, {team.state}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <Label htmlFor="description">Descrição da Equipe</Label>
              {editing ? (
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Conte um pouco sobre sua equipe, modalidades que praticam, histórico, etc."
                  rows={4}
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-md min-h-[100px]">
                  <span className="text-gray-700">
                    {team.description || 'Nenhuma descrição fornecida.'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Escudo da Equipe */}
      <Card>
        <CardHeader>
          <CardTitle>Escudo da Equipe</CardTitle>
          <CardDescription>
            Faça upload do logo ou escudo da sua equipe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
              {team.shield_url ? (
                <img 
                  src={team.shield_url} 
                  alt="Escudo da equipe" 
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <Users className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">
                {team.shield_url ? 'Escudo atual da equipe' : 'Nenhum escudo enviado'}
              </p>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                {team.shield_url ? 'Alterar Escudo' : 'Enviar Escudo'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamManagement;
