import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import Home from './pages/Home';
import Competitions from './pages/Competitions';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import TeamManagement from './pages/TeamManagement';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Home />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/competicoes" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Competitions />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Signup />} />
          
          {/* Rotas Protegidas - Painel */}
          <Route path="/painel" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="equipe" element={<TeamManagement />} />
            <Route path="atletas" element={<div className="p-8 text-center">Página de Atletas em desenvolvimento</div>} />
            <Route path="inscricoes" element={<div className="p-8 text-center">Página de Inscrições em desenvolvimento</div>} />
            <Route path="configuracoes" element={<div className="p-8 text-center">Página de Configurações em desenvolvimento</div>} />
            
            {/* Rotas Admin */}
            <Route path="admin/equipes" element={
              <ProtectedRoute requiredRole="admin">
                <div className="p-8 text-center">Gerenciamento de Equipes (Admin) em desenvolvimento</div>
              </ProtectedRoute>
            } />
            <Route path="admin/competicoes" element={
              <ProtectedRoute requiredRole="admin">
                <div className="p-8 text-center">Gerenciamento de Competições (Admin) em desenvolvimento</div>
              </ProtectedRoute>
            } />
            <Route path="admin/noticias" element={
              <ProtectedRoute requiredRole="admin">
                <div className="p-8 text-center">Gerenciamento de Notícias (Admin) em desenvolvimento</div>
              </ProtectedRoute>
            } />
            <Route path="admin/apoiadores" element={
              <ProtectedRoute requiredRole="admin">
                <div className="p-8 text-center">Gerenciamento de Apoiadores (Admin) em desenvolvimento</div>
              </ProtectedRoute>
            } />
          </Route>

          {/* Outras rotas públicas */}
          <Route path="/equipes" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <div className="p-8 text-center">Página de Equipes em desenvolvimento</div>
              </main>
              <Footer />
            </div>
          } />
          <Route path="/noticias" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <div className="p-8 text-center">Página de Notícias em desenvolvimento</div>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
