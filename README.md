# mymindRH - Sistema de Gestão de Recursos Humanos

Sistema completo para gestão de recursos humanos com modelo SaaS (Software as a Service).

## 🚀 Funcionalidades

### Para Empresas:
- **Dashboard** - Visão geral do RH
- **Funcionários** - Cadastro e gestão de funcionários
- **Aniversários** - Controle de aniversários
- **Férias** - Gestão de solicitações de férias
- **Advertências** - Sistema de advertências
- **Suspensões** - Controle de suspensões
- **Demissões** - Gestão de demissões
- **Contratos** - Contratos de trabalho
- **Lançamentos** - Lançamentos financeiros
- **Legislação** - Consulta de legislação trabalhista

### Para Administradores:
- **Painel Master** - Gerenciamento de todas as empresas
- **Controle de Limites** - Gerenciamento de limites de funcionários
- **Cobrança** - Sistema de cobrança por funcionário

## 🛠️ Tecnologias

- **Frontend**: Next.js 15 + React + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js
- **Deployment**: AWS (recomendado)

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd mymind-rh
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados:
```bash
# Configure a DATABASE_URL no arquivo .env
DATABASE_URL="postgresql://username:password@localhost:5432/mymindrh?schema=public"
```

4. Execute as migrações:
```bash
npx prisma migrate dev
npx prisma generate
```

5. Execute o seed para dados iniciais:
```bash
npm run db:seed
```

6. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🔐 Credenciais Padrão

### Administrador:
- Email: `admin@mymindrh.com.br`
- Senha: `admin123`

### Empresa de Exemplo:
- Email: `admin@techcorp.com`
- Senha: `empresa123`

## 🌐 Deploy

### AWS (Recomendado):
1. Configure AWS RDS para PostgreSQL
2. Configure AWS Amplify para frontend
3. Configure variáveis de ambiente
4. Deploy automático via Git

### Alternativas:
- Vercel + Supabase
- Railway
- DigitalOcean

## 📊 Modelo de Negócio

- **Cobrança por funcionário**: R$ X por funcionário/mês
- **Limite controlado**: Empresas têm limite de funcionários
- **Escalabilidade**: Sistema cresce conforme demanda
- **Painel administrativo**: Controle total das empresas

## 🔧 Desenvolvimento

```bash
# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar em produção
npm start

# Linting
npm run lint
```

## 📝 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── (dashboard)/       # Rotas do dashboard da empresa
│   ├── (admin)/           # Rotas do painel administrativo
│   ├── login/             # Página de login
│   └── api/               # API Routes
├── components/            # Componentes React
│   ├── layout/            # Componentes de layout
│   ├── admin/             # Componentes do admin
│   └── ui/                # Componentes de UI
├── lib/                   # Utilitários e configurações
└── types/                 # Definições de tipos TypeScript
```

## 🚀 Próximos Passos

1. **Configurar banco de dados em produção**
2. **Implementar sistema de pagamento**
3. **Adicionar mais funcionalidades de RH**
4. **Implementar relatórios avançados**
5. **Adicionar integração com sistemas externos**

## ✅ Deploy Status
- ✅ Vercel configuration fixed
- ✅ Runtime error resolved

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através do painel administrativo.