import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Teste com banco externo público (JSONPlaceholder)
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    return NextResponse.json({
      success: true,
      message: 'Conexão externa funcionando!',
      data: data.slice(0, 2), // Apenas 2 usuários para não sobrecarregar
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Erro na conexão externa:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      message: 'Erro na conexão externa',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
