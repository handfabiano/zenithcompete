import { useState } from 'react';
import { 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  MessageCircle, 
  Send, 
  Copy, 
  Check,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import axios from 'axios';

const SocialShare = ({ 
  type = 'competition', // competition, team, news, match
  itemId,
  title,
  description,
  url,
  image,
  className = '',
  showTitle = true,
  compact = false
}) => {
  const [shareUrls, setShareUrls] = useState(null);
  const [socialPost, setSocialPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const loadShareData = async () => {
    if (shareUrls) return; // Já carregado
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/social/share/${type}/${itemId}`
      );
      
      setShareUrls(response.data.shareUrls);
      setSocialPost(response.data.socialPost);
    } catch (err) {
      setError('Erro ao carregar opções de compartilhamento');
      console.error('Erro ao carregar share data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = (platform, url) => {
    if (platform === 'copy') {
      copyToClipboard(url || window.location.href);
      return;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      key: 'facebook'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      key: 'twitter'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      key: 'linkedin'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-600 hover:bg-green-700',
      key: 'whatsapp'
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-blue-500 hover:bg-blue-600',
      key: 'telegram'
    }
  ];

  if (compact) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Button
          variant="outline"
          size="sm"
          onClick={loadShareData}
          disabled={loading}
        >
          <Share2 className="h-4 w-4 mr-1" />
          Compartilhar
        </Button>
        
        {shareUrls && (
          <div className="flex space-x-1">
            {socialPlatforms.slice(0, 3).map((platform) => {
              const Icon = platform.icon;
              return (
                <Button
                  key={platform.key}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare(platform.key, shareUrls[platform.key])}
                  className="p-2"
                >
                  <Icon className="h-4 w-4" />
                </Button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <Card className={`w-full ${className}`}>
      {showTitle && (
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Share2 className="h-5 w-5" />
            <span>Compartilhar</span>
          </CardTitle>
        </CardHeader>
      )}
      
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {!shareUrls && !loading && (
          <Button onClick={loadShareData} className="w-full">
            <Share2 className="h-4 w-4 mr-2" />
            Carregar Opções de Compartilhamento
          </Button>
        )}
        
        {loading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-sm text-gray-600 mt-2">Carregando...</p>
          </div>
        )}
        
        {shareUrls && (
          <div className="space-y-4">
            {/* Redes Sociais */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Redes Sociais</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {socialPlatforms.map((platform) => {
                  const Icon = platform.icon;
                  const url = shareUrls[platform.key];
                  
                  if (!url && platform.key !== 'instagram') return null;
                  
                  return (
                    <Button
                      key={platform.key}
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare(platform.key, url)}
                      className={`${platform.color} text-white border-0`}
                      disabled={!url}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {platform.name}
                    </Button>
                  );
                })}
              </div>
            </div>
            
            <Separator />
            
            {/* Copiar Link */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Link Direto</h4>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(url || window.location.href)}
                  className="flex-1"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2 text-green-600" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copiar Link
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(url || window.location.href, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Post Sugerido */}
            {socialPost && (
              <>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Post Sugerido</h4>
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <p className="text-sm text-gray-800 whitespace-pre-line">
                      {socialPost.text}
                    </p>
                    {socialPost.hashtags && (
                      <div className="flex flex-wrap gap-1">
                        {socialPost.hashtags.map((hashtag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {hashtag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(socialPost.text + '\n\n' + socialPost.hashtags?.join(' '))}
                      className="mt-2"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copiar Texto
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SocialShare;
