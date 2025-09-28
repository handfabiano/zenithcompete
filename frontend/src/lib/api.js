import axios from 'axios';

// Configuração base da API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Serviços de autenticação
export const authService = {
  signup: (userData) => api.post('/auth/signup', userData),
  signin: (credentials) => api.post('/auth/signin', credentials),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  signout: () => api.post('/auth/signout'),
};

// Serviços de equipes
export const teamsService = {
  create: (teamData) => api.post('/teams', teamData),
  getAll: (approved) => api.get('/teams', { params: { approved } }),
  getMyTeam: () => api.get('/teams/my-team'),
  getById: (id) => api.get(`/teams/${id}`),
  update: (id, teamData) => api.put(`/teams/${id}`, teamData),
  approve: (id, isApproved) => api.put(`/teams/${id}/approve`, { isApproved }),
  delete: (id) => api.delete(`/teams/${id}`),
};

// Serviços de competições (para implementar futuramente)
export const competitionsService = {
  getAll: () => api.get('/competitions'),
  getById: (id) => api.get(`/competitions/${id}`),
  // Outros métodos serão adicionados quando implementarmos o módulo de competições
};

// Serviços de notícias (para implementar futuramente)
export const newsService = {
  getAll: () => api.get('/news'),
  getBySlug: (slug) => api.get(`/news/${slug}`),
  // Outros métodos serão adicionados quando implementarmos o módulo de notícias
};

// Serviços de patrocinadores (para implementar futuramente)
export const sponsorsService = {
  getAll: () => api.get('/sponsors'),
  getById: (id) => api.get(`/sponsors/${id}`),
  // Outros métodos serão adicionados quando implementarmos o módulo de patrocinadores
};

export default api;
