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
    
    // Extrair informações da URL
    const urlMatch = databaseUrl.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
    
    if (!urlMatch) {
      return NextResponse.json({
        success: false,
        error: 'URL de conexão inválida',
        message: 'Não foi possível extrair informações da URL'
      }, { status: 500 })
    }
    
    const username = urlMatch[1]
    const password = urlMatch[2]
    const hostname = urlMatch[3]
    const port = urlMatch[4]
    const database = urlMatch[5]
    
    return NextResponse.json({
      success: true,
      message: 'Informações da URL extraídas!',
      databaseUrl: databaseUrl.substring(0, 50) + '...',
      username,
      password: password.substring(0, 5) + '...',
      hostname,
      port,
      database,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      message: 'Erro ao extrair informações da URL',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
