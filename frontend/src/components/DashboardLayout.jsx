import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Menu, 
  X, 
  Home, 
  Users, 
  Calendar, 
  UserCheck, 
  Settings, 
  LogOut,
  Shield,
  Newspaper,
  Award
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const isAdmin = user?.profile?.role === 'admin';

  const navigation = [
    { name: 'Visão Geral', href: '/painel', icon: Home },
    { name: 'Minha Equipe', href: '/painel/equipe', icon: Users },
    { name: 'Atletas', href: '/painel/atletas', icon: UserCheck },
    { name: 'Inscrições', href: '/painel/inscricoes', icon: Calendar },
    ...(isAdmin ? [
      { name: 'Gerenciar Equipes', href: '/painel/admin/equipes', icon: Shield },
      { name: 'Competições', href: '/painel/admin/competicoes', icon: Trophy },
      { name: 'Notícias', href: '/painel/admin/noticias', icon: Newspaper },
      { name: 'Apoiadores', href: '/painel/admin/apoiadores', icon: Award },
    ] : []),
    { name: 'Configurações', href: '/painel/configuracoes', icon: Settings },
  ];

  const isActivePath = (path) => {
    if (path === '/painel') {
      return location.pathname === '/painel';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
            <div className="flex h-16 items-center justify-between px-4 border-b">
              <div className="flex items-center space-x-2">
                <Trophy className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-gray-900">Zenith Compete</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActivePath(item.href)
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="border-t p-4">
              <Button variant="ghost" onClick={handleLogout} className="w-full justify-start">
                <LogOut className="mr-3 h-5 w-5" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4 border-b">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gray-900">Zenith Compete</span>
            </div>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActivePath(item.href)
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="border-t p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user?.profile?.full_name?.charAt(0) || user?.email?.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.profile?.full_name || user?.email}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {isAdmin ? 'Administrador' : 'Gerente de Equipe'}
                </p>
              </div>
            </div>
            <Button variant="ghost" onClick={handleLogout} className="w-full justify-start">
              <LogOut className="mr-3 h-5 w-5" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="lg:pl-64">
        {/* Header Mobile */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm lg:hidden">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center space-x-2">
            <Trophy className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-gray-900">Zenith Compete</span>
          </div>
        </div>

        {/* Conteúdo da Página */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
