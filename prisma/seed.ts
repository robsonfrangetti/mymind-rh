import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Criar usuário admin
  const adminPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mymindrh.com.br' },
    update: {},
    create: {
      email: 'admin@mymindrh.com.br',
      name: 'Administrador',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // Criar empresa de exemplo
  const company = await prisma.company.upsert({
    where: { cnpj: '12.345.678/0001-90' },
    update: {},
    create: {
      name: 'TechCorp Ltda',
      cnpj: '12.345.678/0001-90',
      email: 'contato@techcorp.com',
      phone: '(11) 99999-9999',
      address: 'Rua das Flores, 123 - São Paulo/SP',
      employeeLimit: 20,
      currentEmployees: 0,
      isActive: true,
    },
  })

  // Criar usuário da empresa
  const companyUserPassword = await bcrypt.hash('empresa123', 12)
  
  const companyUser = await prisma.user.upsert({
    where: { email: 'admin@techcorp.com' },
    update: {},
    create: {
      email: 'admin@techcorp.com',
      name: 'Admin TechCorp',
      password: companyUserPassword,
      role: 'COMPANY_ADMIN',
      companyId: company.id,
    },
  })

  // Criar alguns funcionários de exemplo
  const employees = [
    {
      name: 'João Silva',
      cpf: '123.456.789-00',
      email: 'joao@techcorp.com',
      phone: '(11) 88888-8888',
      position: 'Desenvolvedor',
      department: 'TI',
      salary: 8000,
      hireDate: new Date('2024-01-15'),
      birthDate: new Date('1990-05-15'),
      address: 'Rua A, 123',
      companyId: company.id,
    },
    {
      name: 'Maria Santos',
      cpf: '987.654.321-00',
      email: 'maria@techcorp.com',
      phone: '(11) 77777-7777',
      position: 'Designer',
      department: 'Marketing',
      salary: 6000,
      hireDate: new Date('2024-01-10'),
      birthDate: new Date('1992-03-20'),
      address: 'Rua B, 456',
      companyId: company.id,
    },
  ]

  for (const employee of employees) {
    await prisma.employee.create({
      data: employee,
    })
  }

  // Atualizar contador de funcionários
  await prisma.company.update({
    where: { id: company.id },
    data: { currentEmployees: employees.length },
  })

  console.log('Seed executado com sucesso!')
  console.log('Admin criado:', admin.email)
  console.log('Empresa criada:', company.name)
  console.log('Usuário da empresa criado:', companyUser.email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
