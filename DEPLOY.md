# 🚀 Guia de Deploy - mymindRH

## Configuração Completa para Produção

### 1. **Supabase (Banco de Dados)**

1. Acesse: https://supabase.com
2. Crie uma conta gratuita
3. Crie um novo projeto: `mymindrh`
4. Copie a DATABASE_URL do projeto
5. Configure as variáveis de ambiente

### 2. **Vercel (Hospedagem)**

1. Acesse: https://vercel.com
2. Conecte com GitHub
3. Importe o repositório mymind-rh
4. Configure as variáveis de ambiente
5. Deploy automático

### 3. **Variáveis de Ambiente**

```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"
NEXTAUTH_URL="https://mymindrh.vercel.app"
NEXTAUTH_SECRET="seu-secret-super-seguro"
```

### 4. **Comandos de Deploy**

```bash
# Gerar Prisma Client
npx prisma generate

# Fazer push do schema
npx prisma db push

# Executar seed
npm run db:seed
```

### 5. **Domínio Personalizado**

1. Configure DNS no registro.br
2. Aponte para Vercel
3. Configure SSL automático

## ✅ Sistema Pronto para Produção!

- ✅ Banco PostgreSQL profissional
- ✅ Hospedagem escalável
- ✅ SSL automático
- ✅ CDN global
- ✅ Deploy automático
