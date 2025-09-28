# Backend - Sistema de Competições Esportivas

Este é o backend do sistema de inscrição de atletas em competições esportivas, desenvolvido com **NestJS**, **Supabase** e **PostgreSQL**.

## 🚀 Tecnologias Utilizadas

- **NestJS** - Framework Node.js para APIs robustas
- **Supabase** - Backend-as-a-Service com PostgreSQL
- **TypeScript** - Linguagem de programação
- **JWT** - Autenticação e autorização
- **Passport** - Middleware de autenticação

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Supabase

## ⚙️ Configuração

### 1. Configurar o Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Crie um novo projeto
3. Vá para **Settings > API** e copie:
   - Project URL
   - anon public key
   - service_role key (cuidado, esta chave tem privilégios administrativos)

### 2. Configurar o Banco de Dados

1. No painel do Supabase, vá para **SQL Editor**
2. Execute o script `database/schema.sql` para criar todas as tabelas
3. Verifique se todas as tabelas foram criadas corretamente

### 3. Configurar Variáveis de Ambiente

1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edite o arquivo `.env` com suas credenciais do Supabase:
   ```env
   SUPABASE_URL=https://seu-projeto.supabase.co
   SUPABASE_ANON_KEY=sua_chave_anon_aqui
   SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role_aqui
   JWT_SECRET=um_secret_muito_seguro_aqui
   JWT_EXPIRES_IN=7d
   PORT=3001
   NODE_ENV=development
   ```

### 4. Instalar Dependências

```bash
npm install
```

## 🏃‍♂️ Executando a Aplicação

### Desenvolvimento
```bash
npm run start:dev
```

### Produção
```bash
npm run build
npm run start:prod
```

O servidor estará rodando em `http://localhost:3001`

## 📚 Endpoints da API

### Autenticação
- `POST /auth/signup` - Cadastro de usuário
- `POST /auth/signin` - Login
- `GET /auth/profile` - Obter perfil do usuário logado
- `PUT /auth/profile` - Atualizar perfil
- `POST /auth/signout` - Logout

### Equipes
- `POST /teams` - Criar equipe (requer autenticação)
- `GET /teams` - Listar equipes
- `GET /teams/my-team` - Obter equipe do usuário logado
- `GET /teams/:id` - Obter detalhes de uma equipe
- `PUT /teams/:id` - Atualizar equipe
- `PUT /teams/:id/approve` - Aprovar equipe (apenas admin)
- `DELETE /teams/:id` - Excluir equipe (apenas admin)

## 🔒 Autenticação

A API usa JWT (JSON Web Tokens) para autenticação. Para acessar endpoints protegidos:

1. Faça login via `POST /auth/signin`
2. Use o `access_token` retornado no header `Authorization: Bearer <token>`

## 👥 Roles de Usuário

- **admin**: Acesso total ao sistema
- **team_manager**: Pode gerenciar sua própria equipe e atletas

## 🗄️ Estrutura do Banco de Dados

O sistema possui as seguintes tabelas principais:

- `profiles` - Perfis de usuário
- `teams` - Equipes
- `athletes` - Atletas
- `competitions` - Competições
- `registrations` - Inscrições de equipes em competições
- `athlete_competition_entries` - Atletas inscritos em competições específicas
- `news` - Notícias
- `sponsors` - Patrocinadores
- `rounds` - Rodadas/fases das competições
- `matches` - Confrontos
- `match_results` - Resultados dos confrontos

## 🛠️ Desenvolvimento

### Estrutura de Pastas
```
src/
├── auth/           # Módulo de autenticação
├── teams/          # Módulo de equipes
├── supabase/       # Configuração do Supabase
├── app.module.ts   # Módulo principal
└── main.ts         # Ponto de entrada
```

### Adicionando Novos Módulos

Para adicionar um novo módulo (ex: competições):

1. Gere o módulo: `nest g module competitions`
2. Gere o serviço: `nest g service competitions`
3. Gere o controlador: `nest g controller competitions`
4. Crie os DTOs em `competitions/dto/`
5. Importe o módulo em `app.module.ts`

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## 📝 Próximos Passos

- [ ] Implementar módulo de competições
- [ ] Implementar módulo de atletas
- [ ] Implementar módulo de inscrições
- [ ] Implementar módulo de notícias
- [ ] Implementar módulo de patrocinadores
- [ ] Implementar módulo de confrontos e resultados
- [ ] Adicionar testes automatizados
- [ ] Configurar CI/CD
- [ ] Documentação da API com Swagger

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
