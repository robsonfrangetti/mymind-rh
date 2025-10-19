import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const databaseUrl = process.env.DATABASE_URL
    
    if (!databaseUrl) {
      return NextResponse.json({
        success: false,
        error: 'DATABASE_URL não definida',
        message: 'Variável de ambiente não encontrada'
      }, { status: 500 })
    }
    
    return NextResponse.json({
      success: true,
      message: 'URL de conexão encontrada!',
      databaseUrl: databaseUrl,
      length: databaseUrl.length,
      startsWith: databaseUrl.substring(0, 20),
      endsWith: databaseUrl.substring(databaseUrl.length - 20),
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      message: 'Erro ao acessar DATABASE_URL',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
