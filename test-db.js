const { PrismaClient } = require('@prisma/client')

async function testDatabase() {
  const prisma = new PrismaClient()
  
  try {
    console.log('🔍 Testando conexão com o banco...')
    
    // Testar conexão
    await prisma.$connect()
    console.log('✅ Conexão com banco estabelecida!')
    
    // Verificar usuários
    const users = await prisma.user.findMany()
    console.log('👥 Usuários encontrados:', users.length)
    
    users.forEach(user => {
      console.log(`- ${user.email} (${user.role})`)
    })
    
    // Verificar empresas
    const companies = await prisma.company.findMany()
    console.log('🏢 Empresas encontradas:', companies.length)
    
    companies.forEach(company => {
      console.log(`- ${company.name} (${company.employeeLimit} funcionários)`)
    })
    
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

testDatabase()
