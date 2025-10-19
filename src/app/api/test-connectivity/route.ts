import { NextResponse } from 'next/server'
import { createConnection } from 'net'

export async function GET() {
  try {
    const hostname = 'db.cmrvzkaqivpoxwrhptwn.supabase.co'
    const port = 5432
    
    console.log('🔍 Testando conectividade TCP para:', hostname, 'porta', port)
    
    // Teste de conectividade TCP
    const testConnection = () => {
      return new Promise((resolve, reject) => {
        const socket = createConnection(port, hostname)
        
        const timeout = setTimeout(() => {
          socket.destroy()
          reject(new Error('Timeout de conexão TCP'))
        }, 10000)
        
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
    }
    
    const result = await testConnection()
    
    return NextResponse.json({
      success: true,
      message: 'Conectividade TCP funcionando!',
      hostname,
      port,
      result,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Erro na conectividade TCP:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      message: 'Erro na conectividade TCP',
      hostname: 'db.cmrvzkaqivpoxwrhptwn.supabase.co',
      port: 5432,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
