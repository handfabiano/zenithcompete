import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Chrome, Facebook, AlertCircle } from 'lucide-react';

const SocialLogin = ({ 
  onSuccess, 
  onError, 
  className = '',
  title = 'Entrar com Redes Sociais',
  showTitle = true 
}) => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState('');

  const handleSocialLogin = (provider) => {
    setLoading(provider);
    setError('');
    
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    const authUrl = `${apiUrl}/social/auth/${provider}`;
    
    // Abrir popup para autenticação
    const popup = window.open(
      authUrl,
      `${provider}_auth`,
      'width=500,height=600,scrollbars=yes,resizable=yes'
    );

    // Monitorar o popup
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed);
        setLoading(null);
        
        // Verificar se houve sucesso na autenticação
        // Isso seria implementado com base na sua estratégia de callback
        const urlParams = new URLSearchParams(window.location.search);
        const authResult = urlParams.get('auth_result');
        
        if (authResult === 'success') {
          onSuccess?.();
        } else if (authResult === 'error') {
          setError('Erro na autenticação. Tente novamente.');
          onError?.('Erro na autenticação');
        }
      }
    }, 1000);

    // Timeout de segurança
    setTimeout(() => {
      if (!popup.closed) {
        popup.close();
        clearInterval(checkClosed);
        setLoading(null);
        setError('Tempo limite excedido. Tente novamente.');
        onError?.('Timeout');
      }
    }, 60000); // 1 minuto
  };

  const socialProviders = [
    {
      name: 'Google',
      provider: 'google',
      icon: Chrome,
      color: 'bg-red-600 hover:bg-red-700',
      description: 'Continue com sua conta Google'
    },
    {
      name: 'Facebook',
      provider: 'facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Continue com sua conta Facebook'
    }
  ];

  return (
    <Card className={`w-full ${className}`}>
      {showTitle && (
        <CardHeader>
          <CardTitle className="text-center">{title}</CardTitle>
        </CardHeader>
      )}
      
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-3">
          {socialProviders.map((social) => {
            const Icon = social.icon;
            const isLoading = loading === social.provider;
            
            return (
              <Button
                key={social.provider}
                variant="outline"
                className={`w-full ${social.color} text-white border-0 hover:text-white`}
                onClick={() => handleSocialLogin(social.provider)}
                disabled={loading !== null}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Icon className="h-4 w-4 mr-2" />
                )}
                {isLoading ? 'Conectando...' : `Entrar com ${social.name}`}
              </Button>
            );
          })}
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-600">
            Ao continuar, você concorda com nossos{' '}
            <a href="/termos" className="text-blue-600 hover:underline">
              Termos de Uso
            </a>{' '}
            e{' '}
            <a href="/privacidade" className="text-blue-600 hover:underline">
              Política de Privacidade
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialLogin;
