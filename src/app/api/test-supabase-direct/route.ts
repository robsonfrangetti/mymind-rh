import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Teste direto com pg (PostgreSQL driver)
    const { Client } = await import('pg')
    
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 30000 // 30 segundos
    })

    console.log('🔍 Tentando conectar diretamente com pg...')
    
    await client.connect()
    console.log('✅ Conexão pg estabelecida!')

    const result = await client.query('SELECT 1 as test, NOW() as timestamp')
    console.log('✅ Query pg executada:', result.rows)

    await client.end()

    return NextResponse.json({
      success: true,
      message: 'Conexão direta com pg funcionou!',
      result: result.rows,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Erro na conexão direta pg:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      message: 'Erro na conexão direta pg',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
