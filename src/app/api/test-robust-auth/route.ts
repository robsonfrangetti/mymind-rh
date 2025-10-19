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
    
    // Extrair informações da URL de forma mais robusta
    const parts = databaseUrl.split('://')
    if (parts.length !== 2) {
      throw new Error('URL inválida: não contém ://')
    }
    
    const protocol = parts[0]
    const rest = parts[1]
    
    const atIndex = rest.indexOf('@')
    if (atIndex === -1) {
      throw new Error('URL inválida: não contém @')
    }
    
    const auth = rest.substring(0, atIndex)
    const host = rest.substring(atIndex + 1)
    
    const colonIndex = auth.indexOf(':')
    if (colonIndex === -1) {
      throw new Error('URL inválida: não contém : na autenticação')
    }
    
    const username = auth.substring(0, colonIndex)
    const password = auth.substring(colonIndex + 1)
    
    const colonHostIndex = host.indexOf(':')
    if (colonHostIndex === -1) {
      throw new Error('URL inválida: não contém : no host')
    }
    
    const hostname = host.substring(0, colonHostIndex)
    const portAndDb = host.substring(colonHostIndex + 1)
    
    const slashIndex = portAndDb.indexOf('/')
    if (slashIndex === -1) {
      throw new Error('URL inválida: não contém / no port/db')
    }
    
    const port = portAndDb.substring(0, slashIndex)
    const database = portAndDb.substring(slashIndex + 1)
    
    return NextResponse.json({
      success: true,
      message: 'Informações da URL extraídas!',
      databaseUrl: databaseUrl.substring(0, 50) + '...',
      protocol,
      username,
      password: password ? password.substring(0, 5) + '...' : 'N/A',
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
      databaseUrl: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 50) + '...' : 'N/A',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
