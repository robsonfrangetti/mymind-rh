import { NextResponse } from 'next/server'
import { createConnection } from 'net'

export async function GET() {
  try {
    // Teste com diferentes hostnames e portas
    const tests = [
      { hostname: 'db.cmrvzkaqivpoxwrhptwn.supabase.co', port: 5432 },
      { hostname: 'aws-0-us-east-1.pooler.supabase.com', port: 5432 },
      { hostname: 'google.com', port: 80 },
      { hostname: 'supabase.com', port: 443 }
    ]
    
    const results = []
    
    for (const test of tests) {
      try {
        console.log('🔍 Testando TCP para:', test.hostname, 'porta', test.port)
        
        const result = await new Promise((resolve, reject) => {
          const socket = createConnection(test.port, test.hostname)
          
          const timeout = setTimeout(() => {
            socket.destroy()
            reject(new Error('Timeout de conexão TCP'))
          }, 5000)
          
          socket.on('connect', () => {
            clearTimeout(timeout)
            socket.destroy()
            resolve('Conexão TCP estabelecida!')
          })
          
          socket.on('error', (error) => {
            clearTimeout(timeout)
            reject(error)
          })
        })
        
        results.push({
          hostname: test.hostname,
          port: test.port,
          success: true,
          result
        })
        
      } catch (error) {
        results.push({
          hostname: test.hostname,
          port: test.port,
          success: false,
          error: error instanceof Error ? error.message : 'Erro desconhecido'
        })
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Teste de TCP completo!',
      results,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      message: 'Erro no teste de TCP',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
