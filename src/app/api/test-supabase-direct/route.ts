import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    console.log('🔍 Testando conexão com Supabase direto...')
    
    // Teste de conexão
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .limit(5)
    
    if (error) {
      console.error('❌ Erro na consulta:', error)
      return NextResponse.json({
        success: false,
        error: error.message,
        message: 'Erro na consulta Supabase',
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }
    
    console.log('✅ Conexão Supabase funcionou!')
    console.log('👥 Usuários encontrados:', data?.length || 0)
    
    return NextResponse.json({
      success: true,
      message: 'Conexão Supabase funcionou!',
      users: data,
      count: data?.length || 0,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Erro na conexão Supabase:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      message: 'Erro na conexão Supabase',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}