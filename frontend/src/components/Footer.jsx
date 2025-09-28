import { Link } from 'react-router-dom';
import { Trophy, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Zenith Compete</span>
            </div>
            <p className="text-gray-300 text-sm">
              Plataforma completa para gestão de competições esportivas em Roraima, 
              facilitando a inscrição de equipes e atletas em eventos esportivos regionais.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link 
                  to="/competicoes" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Competições
                </Link>
              </li>
              <li>
                <Link 
                  to="/equipes" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Equipes
                </Link>
              </li>
              <li>
                <Link 
                  to="/noticias" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Notícias
                </Link>
              </li>
            </ul>
          </div>

          {/* Para Equipes */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Para Equipes</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/cadastro" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Cadastrar Equipe
                </Link>
              </li>
              <li>
                <Link 
                  to="/login" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Área da Equipe
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Como Participar
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Regulamentos
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="h-4 w-4" />
                <span>contato@zenithcompete.com</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="h-4 w-4" />
                <span>(11) 9999-9999</span>
              </li>
              <li className="flex items-start space-x-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>
                  Av. das Competições, 123<br />
                  Boa Vista, RR - 69300-000
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha de Separação */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Zenith Compete. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Política de Privacidade
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
