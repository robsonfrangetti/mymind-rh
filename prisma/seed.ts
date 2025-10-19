import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // ========================================
  // CRIAR ADMINISTRADOR PRINCIPAL
  // ========================================
  console.log('👤 Criando administrador principal...')
  
  const adminPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@mymindrh.com.br' },
    update: {},
    create: {
      email: 'admin@mymindrh.com.br',
      name: 'Administrador Principal',
      password: adminPassword,
      role: 'SUPER_ADMIN'
    }
  })

  console.log('✅ Administrador criado:', admin.email)

  // ========================================
  // CRIAR EMPRESAS DE EXEMPLO
  // ========================================
  console.log('🏢 Criando empresas de exemplo...')

  const companies = [
    {
      name: 'TechCorp Solutions',
      cnpj: '12.345.678/0001-90',
      email: 'contato@techcorp.com',
      phone: '(11) 99999-9999',
      address: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      employeeLimit: 10,
      plan: 'BASIC',
      billingCycle: 'MONTHLY',
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
      name: 'Inovação Digital Ltda',
      cnpj: '98.765.432/0001-10',
      email: 'rh@inovacao.com',
      phone: '(21) 88888-8888',
      address: 'Av. Paulista, 1000',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '20000-000',
      employeeLimit: 25,
      plan: 'INTERMEDIATE',
      billingCycle: 'MONTHLY',
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
      name: 'StartupXYZ',
      cnpj: '11.222.333/0001-44',
      email: 'admin@startupxyz.com',
      phone: '(31) 77777-7777',
      address: 'Rua da Inovação, 456',
      city: 'Belo Horizonte',
      state: 'MG',
      zipCode: '30000-000',
      employeeLimit: 5,
      plan: 'BASIC',
      billingCycle: 'MONTHLY',
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }
  ]

  const createdCompanies = []
  for (const companyData of companies) {
    const company = await prisma.company.upsert({
      where: { cnpj: companyData.cnpj },
      update: {},
      create: companyData
    })
    createdCompanies.push(company)
    console.log('✅ Empresa criada:', company.name)
  }

  // ========================================
  // CRIAR USUÁRIOS MASTER DAS EMPRESAS
  // ========================================
  console.log('👥 Criando usuários master das empresas...')

  const userPassword = await bcrypt.hash('admin123', 12)

  const users = [
    {
      email: 'admin@techcorp.com',
      name: 'Admin TechCorp',
      password: userPassword,
      role: 'ADMIN',
      companyId: createdCompanies[0].id
    },
    {
      email: 'admin@inovacao.com',
      name: 'Admin Inovação',
      password: userPassword,
      role: 'ADMIN',
      companyId: createdCompanies[1].id
    },
    {
      email: 'admin@startupxyz.com',
      name: 'Admin StartupXYZ',
      password: userPassword,
      role: 'ADMIN',
      companyId: createdCompanies[2].id
    }
  ]

  const createdUsers = []
  for (const userData of users) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: userData
    })
    createdUsers.push(user)
    console.log('✅ Usuário criado:', user.email)
  }

  // ========================================
  // CRIAR FUNCIONÁRIOS DE EXEMPLO
  // ========================================
  console.log('👷 Criando funcionários de exemplo...')

  const employees = [
    // TechCorp Solutions
    {
      name: 'João Silva',
      cpf: '123.456.789-00',
      email: 'joao@techcorp.com',
      phone: '(11) 99999-0001',
      position: 'Desenvolvedor Senior',
      department: 'TI',
      salary: 8000.00,
      hireDate: new Date('2023-01-15'),
      birthDate: new Date('1985-05-20'),
      address: 'Rua A, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-000',
      companyId: createdCompanies[0].id,
      userId: createdUsers[0].id
    },
    {
      name: 'Maria Santos',
      cpf: '987.654.321-00',
      email: 'maria@techcorp.com',
      phone: '(11) 99999-0002',
      position: 'Analista de RH',
      department: 'RH',
      salary: 5000.00,
      hireDate: new Date('2023-03-10'),
      birthDate: new Date('1990-08-15'),
      address: 'Rua B, 456',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-001',
      companyId: createdCompanies[0].id,
      userId: createdUsers[0].id
    },
    // Inovação Digital
    {
      name: 'Pedro Costa',
      cpf: '111.222.333-44',
      email: 'pedro@inovacao.com',
      phone: '(21) 88888-0001',
      position: 'Gerente de Projetos',
      department: 'Gestão',
      salary: 12000.00,
      hireDate: new Date('2022-06-01'),
      birthDate: new Date('1980-12-10'),
      address: 'Av. C, 789',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '20000-001',
      companyId: createdCompanies[1].id,
      userId: createdUsers[1].id
    },
    // StartupXYZ
    {
      name: 'Ana Oliveira',
      cpf: '555.666.777-88',
      email: 'ana@startupxyz.com',
      phone: '(31) 77777-0001',
      position: 'CEO',
      department: 'Diretoria',
      salary: 15000.00,
      hireDate: new Date('2024-01-01'),
      birthDate: new Date('1988-03-25'),
      address: 'Rua D, 321',
      city: 'Belo Horizonte',
      state: 'MG',
      zipCode: '30000-001',
      companyId: createdCompanies[2].id,
      userId: createdUsers[2].id
    }
  ]

  for (const employeeData of employees) {
    const employee = await prisma.employee.upsert({
      where: { cpf: employeeData.cpf },
      update: {},
      create: employeeData
    })
    console.log('✅ Funcionário criado:', employee.name)
  }

  // ========================================
  // ATUALIZAR CONTADORES DE FUNCIONÁRIOS
  // ========================================
  console.log('📊 Atualizando contadores de funcionários...')

  for (const company of createdCompanies) {
    const employeeCount = await prisma.employee.count({
      where: { companyId: company.id, isActive: true }
    })

    await prisma.company.update({
      where: { id: company.id },
      data: { currentEmployees: employeeCount }
    })

    console.log(`✅ ${company.name}: ${employeeCount} funcionários`)
  }

  // ========================================
  // CRIAR DADOS DE BILLING
  // ========================================
  console.log('💰 Criando dados de billing...')

  const billingData = [
    {
      companyId: createdCompanies[0].id,
      amount: 800.00, // 10 funcionários * R$ 80
      employees: 10,
      plan: 'BASIC',
      status: 'PAID',
      dueDate: new Date('2024-01-01'),
      paidDate: new Date('2024-01-01')
    },
    {
      companyId: createdCompanies[1].id,
      amount: 2000.00, // 25 funcionários * R$ 80
      employees: 25,
      plan: 'INTERMEDIATE',
      status: 'PAID',
      dueDate: new Date('2024-01-01'),
      paidDate: new Date('2024-01-01')
    },
    {
      companyId: createdCompanies[2].id,
      amount: 400.00, // 5 funcionários * R$ 80
      employees: 5,
      plan: 'BASIC',
      status: 'PENDING',
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 dias
    }
  ]

  for (const billing of billingData) {
    await prisma.billing.create({
      data: billing
    })
    console.log('✅ Billing criado para:', createdCompanies.find(c => c.id === billing.companyId)?.name)
  }

  console.log('🎉 Seed concluído com sucesso!')
  console.log('📋 Resumo:')
  console.log(`- ${createdCompanies.length} empresas criadas`)
  console.log(`- ${createdUsers.length} usuários master criados`)
  console.log(`- ${employees.length} funcionários criados`)
  console.log(`- ${billingData.length} registros de billing criados`)
  console.log('')
  console.log('🔑 Credenciais de acesso:')
  console.log('Admin Principal: admin@mymindrh.com.br / admin123')
  console.log('TechCorp: admin@techcorp.com / admin123')
  console.log('Inovação: admin@inovacao.com / admin123')
  console.log('StartupXYZ: admin@startupxyz.com / admin123')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })