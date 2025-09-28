import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { 
  Trophy, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  User, 
  Users, 
  Phone,
  MapPin,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
  const [step, setStep] = useState(1); // 1: Dados pessoais, 2: Dados da equipe
  const [formData, setFormData] = useState({
    // Dados pessoais
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Dados da equipe
    teamName: '',
    contactEmail: '',
    phoneNumber: '',
    city: '',
    state: 'RR', // Roraima por padrão
    description: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro quando o usuário começar a digitar
    if (error) setError('');
  };

  const validateStep1 = () => {
    if (!formData.fullName.trim()) {
      setError('Nome completo é obrigatório');
      return false;
    }
    if (!formData.email.trim()) {
      setError('E-mail é obrigatório');
      return false;
    }
    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.teamName.trim()) {
      setError('Nome da equipe é obrigatório');
      return false;
    }
    if (!formData.contactEmail.trim()) {
      setError('E-mail de contato da equipe é obrigatório');
      return false;
    }
    if (!formData.city.trim()) {
      setError('Cidade é obrigatória');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
      setError('');
    }
  };

  const handlePrevStep = () => {
    setStep(1);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    setLoading(true);
    setError('');

    try {
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        teamData: {
          name: formData.teamName,
          contactEmail: formData.contactEmail,
          phoneNumber: formData.phoneNumber,
          city: formData.city,
          state: formData.state,
          description: formData.description
        }
      };

      const result = await signup(userData);
      
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Cadastro Realizado!
                </h2>
                <p className="text-gray-600 mb-4">
                  Sua equipe foi cadastrada com sucesso. Aguarde a aprovação do administrador 
                  para começar a participar das competições.
                </p>
                <p className="text-sm text-gray-500">
                  Redirecionando para o login em alguns segundos...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <div className="bg-primary p-3 rounded-full">
              <Trophy className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Cadastrar no Zenith Compete
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Registre sua equipe e comece a participar das competições
          </p>
        </div>

        {/* Indicador de Passos */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <span className="ml-2 text-sm font-medium text-gray-600">Dados Pessoais</span>
          </div>
          <div className="mx-4 w-16 h-0.5 bg-gray-200">
            <div className={`h-full transition-all duration-300 ${
              step >= 2 ? 'bg-primary w-full' : 'bg-gray-200 w-0'
            }`}></div>
          </div>
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
            <span className="ml-2 text-sm font-medium text-gray-600">Dados da Equipe</span>
          </div>
        </div>

        {/* Formulário */}
        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 ? 'Seus Dados Pessoais' : 'Dados da Equipe'}
            </CardTitle>
            <CardDescription>
              {step === 1 
                ? 'Preencha suas informações pessoais para criar a conta'
                : 'Agora vamos cadastrar os dados da sua equipe'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={step === 1 ? (e) => { e.preventDefault(); handleNextStep(); } : handleSubmit}>
              {step === 1 ? (
                // Passo 1: Dados Pessoais
                <div className="space-y-6">
                  {/* Nome Completo */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        placeholder="Seu nome completo"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* E-mail */}
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Senha */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Mínimo 6 caracteres"
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirmar Senha */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        placeholder="Digite a senha novamente"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Passo 2: Dados da Equipe
                <div className="space-y-6">
                  {/* Nome da Equipe */}
                  <div className="space-y-2">
                    <Label htmlFor="teamName">Nome da Equipe</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="teamName"
                        name="teamName"
                        type="text"
                        required
                        placeholder="Nome da sua equipe"
                        value={formData.teamName}
                        onChange={handleChange}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* E-mail de Contato da Equipe */}
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">E-mail de Contato da Equipe</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="contactEmail"
                        name="contactEmail"
                        type="email"
                        required
                        placeholder="contato@equipe.com"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Telefone */}
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Telefone (Opcional)</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        placeholder="(95) 99999-9999"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Cidade e Estado */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="city"
                          name="city"
                          type="text"
                          required
                          placeholder="Boa Vista"
                          value={formData.city}
                          onChange={handleChange}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input
                        id="state"
                        name="state"
                        type="text"
                        value="RR"
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Descrição */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição da Equipe (Opcional)</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Conte um pouco sobre sua equipe, modalidades que praticam, histórico, etc."
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Mensagem de Erro */}
              {error && (
                <Alert variant="destructive" className="mt-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Botões */}
              <div className="flex justify-between mt-6">
                {step === 2 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                  >
                    Voltar
                  </Button>
                )}
                <div className={step === 1 ? 'ml-auto' : ''}>
                  <Button
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Cadastrando...' : step === 1 ? 'Próximo' : 'Cadastrar Equipe'}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Link para Login */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
