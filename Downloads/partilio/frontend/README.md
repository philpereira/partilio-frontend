# 🏠 Partilio Frontend

Sistema de Gestão de Despesas Familiares - Interface Web

## 🚀 Tecnologias

- **Next.js 14+** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Zustand** - State Management
- **React Query** - Data Fetching
- **Axios** - HTTP Client
- **Zod** - Validation

## 🏃‍♂️ Início Rápido

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
```

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env.local` com base em `.env.example` para configurar a aplicação.

- `NEXT_PUBLIC_API_BASE_URL` - Base das requisições para a API (padrão `/api`)
- `NODE_ENV` - Define o ambiente (por padrão `production`)
- `NEXT_PUBLIC_ENABLE_DEVTOOLS` - Ativa o React Query Devtools no cliente

## 🌐 URLs

- **Local:** http://localhost:3000
- **API Proxy:** `/api` (rewritten to [backend](https://partilio-backend.onrender.com))

## 📱 Funcionalidades

- ✅ Onboarding completo (6 steps)
- ✅ Dashboard com dados reais
- ✅ Cadastro de despesas
- ✅ Listagem com filtros
- 🔄 Edição de despesas (em desenvolvimento)
- 🔄 Menu de ações (em desenvolvimento)

## 🏗️ Arquitetura

```
src/
├── app/           # Next.js App Router
├── components/    # React Components
├── hooks/         # Custom Hooks
├── services/      # API Services
├── store/         # Zustand Stores
├── types/         # TypeScript Types
└── schemas/       # Zod Schemas
```

## 🛡️ Configuração de CORS no Backend

Para evitar erros de CORS em produção, o backend precisa responder às requisições `OPTIONS` com os cabeçalhos apropriados. Um exemplo usando **Express**:

```ts
import cors from 'cors';
import express from 'express';

const app = express();

const allowedOrigins = [
  'https://partilio-frontend.onrender.com',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.options('*', cors());

// rotas da API abaixo...
```

A configuração também pode ser adaptada para **NestJS** ou **Fastify** seguindo a mesma ideia. Certifique-se de definir a variável `CORS_ORIGIN` na Render para incluir a URL do frontend e `http://localhost:3000` quando for necessário.

## ✔️ Qualidade de Código

Execute `npm run lint` para verificar problemas de estilo e garantir que nenhuma parte do código contenha a URL fixa `https://partilio-backend.onrender.com`. O comando falhará se encontrar essa string.
