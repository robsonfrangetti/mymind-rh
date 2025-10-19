import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Log detalhado do ambiente
    const envInfo = {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV,
      DATABASE_URL: process.env.DATABASE_URL ? 'Definida' : 'Não definida',
      DATABASE_URL_LENGTH: process.env.DATABASE_URL?.length || 0,
      DATABASE_URL_START: process.env.DATABASE_URL?.substring(0, 50) || 'N/A'
    }

    console.log('🔍 Debug Info:', envInfo)

    // Teste de conexão com timeout
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    })

    console.log('🔍 Tentando conectar...')
    
    // Timeout de 10 segundos
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout de conexão')), 10000)
    })

    const connectPromise = prisma.$connect()
    
    await Promise.race([connectPromise, timeoutPromise])
    console.log('✅ Conexão estabelecida!')

    // Teste simples
    const result = await prisma.$queryRaw`SELECT 1 as test, NOW() as timestamp`
    console.log('✅ Query executada:', result)

    await prisma.$disconnect()

    return NextResponse.json({
      success: true,
      message: 'Conexão com banco estabelecida!',
      envInfo,
      result,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Erro detalhado:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      message: 'Erro ao conectar com o banco',
      envInfo: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: process.env.VERCEL,
        VERCEL_ENV: process.env.VERCEL_ENV,
        DATABASE_URL: process.env.DATABASE_URL ? 'Definida' : 'Não definida',
        DATABASE_URL_LENGTH: process.env.DATABASE_URL?.length || 0,
        DATABASE_URL_START: process.env.DATABASE_URL?.substring(0, 50) || 'N/A'
      },
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
