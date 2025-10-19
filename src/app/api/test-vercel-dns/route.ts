import { NextResponse } from 'next/server'
import { promisify } from 'util'
import { lookup } from 'dns'

const lookupAsync = promisify(lookup)

export async function GET() {
  try {
    // Teste com diferentes hostnames
    const hostnames = [
      'db.cmrvzkaqivpoxwrhptwn.supabase.co',
      'aws-0-us-east-1.pooler.supabase.com',
      'supabase.com',
      'google.com'
    ]
    
    const results = []
    
    for (const hostname of hostnames) {
      try {
        console.log('🔍 Testando DNS para:', hostname)
        const result = await lookupAsync(hostname)
        results.push({
          hostname,
          success: true,
          address: result.address,
          family: result.family
        })
      } catch (error) {
        results.push({
          hostname,
          success: false,
          error: error instanceof Error ? error.message : 'Erro desconhecido'
        })
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Teste de DNS completo!',
      results,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      message: 'Erro no teste de DNS',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
