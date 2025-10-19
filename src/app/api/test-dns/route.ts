import { NextResponse } from 'next/server'
import { promisify } from 'util'
import { lookup } from 'dns'

const lookupAsync = promisify(lookup)

export async function GET() {
  try {
    const hostname = 'db.cmrvzkaqivpoxwrhptwn.supabase.co'
    
    console.log('🔍 Testando DNS para:', hostname)
    
    const result = await lookupAsync(hostname)
    
    return NextResponse.json({
      success: true,
      message: 'DNS resolveu com sucesso!',
      hostname,
      result: {
        address: result.address,
        family: result.family
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Erro no DNS:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      message: 'Erro ao resolver DNS',
      hostname: 'db.cmrvzkaqivpoxwrhptwn.supabase.co',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
