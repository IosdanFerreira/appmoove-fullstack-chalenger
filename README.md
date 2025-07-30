# Desafio Fullstack AppMoove

Este repositório contém a implementação da minha solução para o **teste técnico de desenvolvedor(a) fullstack** da AppMoove

## Tecnologias Utilizadas

**Backend**:

- NestJS
- PrismaORM
- MySQL
- Docker

**Frontend**:

- React
- Vite
- TypeScript
- Tailwind
- ShadcnUI

---

## Funcionalidades

- Tela de listagem de usuários
- Paginação da listagem
- Tela de detalhes do usuário
- Tela de cadastro de usuário
- Dados climáticos
- Gráficos para a mudança de temperatura durante o dia
- Backend unificado(NestJS)
- Integração com API da Weather
- Rotas de buscar e criar usuários

---

## Como rodar o projeto

### 🔹 Backend

**Requisitos**:

- Node.js (>= 16.0)
- npm (>= 8.0) ou Yarn (>= 1.22)
- Docker

---

1. **Clone o repositório:**

```bash
git clone https://github.com/IosdanFerreira/devnology-ecommerce-challenge.git

# Com o projeto aberto na IDE, acesse a pasta do backend
cd backend
```

2. **Configurar variáveis de ambiente:**

- Crie um arquivo `.env` na pasta backend
- Cole as seguintes variáveis no arquivo

```env
# Server
HOST=http://127.0.0.1
PORT=3000
ENVIRONMENT=development

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=appmoove-secret-password
DB_DATABASE=appmoove
DATABASE_URL="mysql://root:appmoove-secret-password@localhost:3306/appmoove"

WEATHER_API_KEY=7fe3eb04759e45e4a87162246253007

```

3.  **Conceda as permissões ao aquivo entrypoint.sh:**

```bash
chmod +x .docker/entrypoint.sh
```

**Rode os comando docker:**

```bash
# Construa a build
docker compose build

#Ou caso queira limpar o cache
docker compose build --no-cache

# suba o container do banco de dados
 docker compose up db

 # Rode o backend em outro terminal
 yarn start:dev
# ou, se preferir:
 npm run start:dev
```

### Guia de uso

1.  **Acesse a aplicação:**

    Abra seu navegador e acesse `http://localhost:3000`.

---

### 🔹 Frontend (React)

**Requisitos**:

- Node.js (>= 16.0)
- npm (>= 8.0) ou Yarn (>= 1.22)
- Docker

```bash
# 1. Tenha certeza de que o backend esteja rodando

# 2. Estando a na pasta root, acesse a pasta do frontend
cd frontend

# 3. Instale as dependências
npm install
# ou, se preferir:
yarn install

# 4. Inicie o servidor de desenvolvimento
npm run dev
# ou:
yarn dev

# 5. Acesse no navegador
http://localhost:5173
```
