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
    
    // Testar diferentes formatos de URL
    const formats = [
      {
        name: 'Formato atual',
        url: databaseUrl
      },
      {
        name: 'Formato com postgres.[PROJECT-REF]',
        url: databaseUrl.replace('postgres:', 'postgres.cmrvzkaqivpoxwrhptwn:')
      },
      {
        name: 'Formato direto (sem pooler)',
        url: databaseUrl.replace('aws-0-us-east-1.pooler.supabase.com', 'db.cmrvzkaqivpoxwrhptwn.supabase.co')
      }
    ]
    
    return NextResponse.json({
      success: true,
      message: 'Formatos de URL testados!',
      currentUrl: databaseUrl,
      formats,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      message: 'Erro ao testar formatos',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
