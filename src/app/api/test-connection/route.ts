import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Teste básico de conexão
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()
    
    console.log('🔍 Testando conexão com o banco...')
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Definida' : 'Não definida')
    
    await prisma.$connect()
    console.log('✅ Conexão estabelecida!')
    
    // Teste simples
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('✅ Query executada:', result)
    
    await prisma.$disconnect()
    
    return NextResponse.json({
      success: true,
      message: 'Conexão com banco estabelecida!',
      timestamp: new Date().toISOString(),
      databaseUrl: process.env.DATABASE_URL ? 'Definida' : 'Não definida'
    })

  } catch (error) {
    console.error('❌ Erro ao conectar com o banco:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      message: 'Erro ao conectar com o banco',
      timestamp: new Date().toISOString(),
      databaseUrl: process.env.DATABASE_URL ? 'Definida' : 'Não definida'
    }, { status: 500 })
  }
}
