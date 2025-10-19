import { NextRequest, NextResponse } from 'next/server'
import { authenticateUser, generateToken, logAudit } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    const user = await authenticateUser(email, password)

    if (!user) {
      // Log de tentativa de login falhada
      await logAudit(null, null, 'LOGIN_FAILED', 'users', null, null, { email }, request)
      
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    const token = generateToken(user)

    // Log de login bem-sucedido
    await logAudit(user.id, user.companyId || null, 'LOGIN_SUCCESS', 'users', user.id, null, { email }, request)

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        companyId: user.companyId,
        company: user.company
      },
      token
    })

  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
