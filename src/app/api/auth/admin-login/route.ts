import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdmin, generateAdminToken, logAudit } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    const admin = await authenticateAdmin(email, password)

    if (!admin) {
      // Log de tentativa de login admin falhada
      await logAudit(null, null, 'ADMIN_LOGIN_FAILED', 'admin_users', null, null, { email }, request)
      
      return NextResponse.json(
        { error: 'Credenciais administrativas inválidas' },
        { status: 401 }
      )
    }

    const token = generateAdminToken(admin)

    // Log de login admin bem-sucedido
    await logAudit(admin.id, null, 'ADMIN_LOGIN_SUCCESS', 'admin_users', admin.id, null, { email }, request)

    return NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      },
      token
    })

  } catch (error) {
    console.error('Erro no login admin:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
