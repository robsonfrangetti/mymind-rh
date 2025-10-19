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
    
    // Extrair informações da URL de forma mais simples
    const parts = databaseUrl.split('://')
    const protocol = parts[0]
    const rest = parts[1]
    
    const [auth, host] = rest.split('@')
    const [username, password] = auth.split(':')
    const [hostname, portAndDb] = host.split(':')
    const [port, database] = portAndDb.split('/')
    
    return NextResponse.json({
      success: true,
      message: 'Informações da URL extraídas!',
      databaseUrl: databaseUrl.substring(0, 50) + '...',
      protocol,
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
