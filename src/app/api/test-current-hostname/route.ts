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
    
    // Extrair hostname da URL
    const urlMatch = databaseUrl.match(/@([^:]+):(\d+)\//)
    
    if (!urlMatch) {
      return NextResponse.json({
        success: false,
        error: 'URL de conexão inválida',
        message: 'Não foi possível extrair hostname da URL'
      }, { status: 500 })
    }
    
    const hostname = urlMatch[1]
    const port = parseInt(urlMatch[2])
    
    return NextResponse.json({
      success: true,
      message: 'Hostname extraído com sucesso!',
      databaseUrl: databaseUrl.substring(0, 50) + '...',
      hostname,
      port,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      message: 'Erro ao extrair hostname',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
