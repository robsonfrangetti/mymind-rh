import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser, checkEmployeeLimit, incrementEmployeeCount, logAudit } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    
    if (!user || !user.companyId) {
      return NextResponse.json(
        { error: 'Acesso negado' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const department = searchParams.get('department') || ''
    const status = searchParams.get('status') || ''

    const skip = (page - 1) * limit

    const where: any = {
      companyId: user.companyId
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { cpf: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { position: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (department) {
      where.department = department
    }

    if (status) {
      where.isActive = status === 'active'
    }

    const [employees, total] = await Promise.all([
      prisma.employee.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          cpf: true,
          email: true,
          phone: true,
          position: true,
          department: true,
          salary: true,
          hireDate: true,
          birthDate: true,
          isActive: true,
          createdAt: true
        }
      }),
      prisma.employee.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: employees,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Erro ao buscar funcionários:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    
    if (!user || !user.companyId) {
      return NextResponse.json(
        { error: 'Acesso negado' },
        { status: 401 }
      )
    }

    // Verificar se ainda pode cadastrar funcionários
    const canAddEmployee = await checkEmployeeLimit(user.companyId)
    if (!canAddEmployee) {
      return NextResponse.json(
        { error: 'Limite de funcionários atingido. Entre em contato para aumentar o plano.' },
        { status: 400 }
      )
    }

    const data = await request.json()
    const { name, cpf, email, phone, position, department, salary, hireDate, birthDate, address, city, state, zipCode } = data

    // Validar dados obrigatórios
    if (!name || !cpf || !position || !hireDate) {
      return NextResponse.json(
        { error: 'Dados obrigatórios não fornecidos' },
        { status: 400 }
      )
    }

    // Verificar se CPF já existe
    const existingEmployee = await prisma.employee.findUnique({
      where: { cpf }
    })

    if (existingEmployee) {
      return NextResponse.json(
        { error: 'CPF já cadastrado' },
        { status: 400 }
      )
    }

    const employee = await prisma.employee.create({
      data: {
        name,
        cpf,
        email,
        phone,
        position,
        department,
        salary: salary ? parseFloat(salary) : null,
        hireDate: new Date(hireDate),
        birthDate: birthDate ? new Date(birthDate) : null,
        address,
        city,
        state,
        zipCode,
        companyId: user.companyId,
        userId: user.id
      }
    })

    // Incrementar contador de funcionários
    await incrementEmployeeCount(user.companyId)

    // Log de auditoria
    await logAudit(user.id, user.companyId, 'CREATE', 'employees', employee.id, null, data, request)

    return NextResponse.json({
      success: true,
      data: employee
    })

  } catch (error) {
    console.error('Erro ao criar funcionário:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
