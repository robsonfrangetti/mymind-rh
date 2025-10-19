import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Teste sem Prisma - apenas verificar se a URL está correta
    const databaseUrl = process.env.DATABASE_URL
    
    if (!databaseUrl) {
      return NextResponse.json({
        success: false,
        error: 'DATABASE_URL não definida',
        message: 'Variável de ambiente não encontrada'
      }, { status: 500 })
    }
    
    // Verificar se a URL contém os elementos corretos
    const urlParts = databaseUrl.split('://')
    const protocol = urlParts[0]
    const rest = urlParts[1]
    
    if (protocol !== 'postgresql') {
      return NextResponse.json({
        success: false,
        error: 'Protocolo incorreto',
        message: `Esperado: postgresql, Recebido: ${protocol}`
      }, { status: 500 })
    }
    
    // Verificar se contém os elementos necessários
    const hasHost = rest.includes('db.xckopwionemuehufhpco.supabase.co')
    const hasPort = rest.includes(':5432')
    const hasUser = rest.includes('postgres:')
    const hasPassword = rest.includes('Rq12032985Africadosul')
    
    return NextResponse.json({
      success: true,
      message: 'URL de conexão analisada',
      analysis: {
        protocol: protocol,
        hasHost: hasHost,
        hasPort: hasPort,
        hasUser: hasUser,
        hasPassword: hasPassword,
        urlLength: databaseUrl.length,
        urlStart: databaseUrl.substring(0, 50) + '...'
      }
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      message: 'Erro ao analisar URL'
    }, { status: 500 })
  }
}
