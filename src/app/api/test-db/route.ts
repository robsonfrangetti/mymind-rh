import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    console.log('🔍 Testando conexão com o banco...')
    
    // Testar conexão
    await prisma.$connect()
    console.log('✅ Conexão com banco estabelecida!')
    
    // Verificar usuários
    const users = await prisma.user.findMany()
    console.log('👥 Usuários encontrados:', users.length)
    
    const userData = users.map(user => ({
      email: user.email,
      role: user.role,
      name: user.name
    }))
    
    // Verificar empresas
    const companies = await prisma.company.findMany()
    console.log('🏢 Empresas encontradas:', companies.length)
    
    const companyData = companies.map(company => ({
      name: company.name,
      employeeLimit: company.employeeLimit
    }))
    
    return NextResponse.json({
      success: true,
      message: 'Banco funcionando!',
      users: userData,
      companies: companyData,
      totalUsers: users.length,
      totalCompanies: companies.length
    })
    
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco:', error)
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'Erro ao conectar com o banco'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
