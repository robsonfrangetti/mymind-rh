import { NextRequest, NextResponse } from 'next/server'
import { getCurrentAdmin, logAudit } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin(request)
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Acesso negado' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''

    const skip = (page - 1) * limit

    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { cnpj: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (status) {
      where.isActive = status === 'active'
    }

    const [companies, total] = await Promise.all([
      prisma.company.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          cnpj: true,
          email: true,
          phone: true,
          employeeLimit: true,
          currentEmployees: true,
          isActive: true,
          plan: true,
          createdAt: true,
          _count: {
            select: {
              employees: true,
              users: true
            }
          }
        }
      }),
      prisma.company.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: companies,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Erro ao buscar empresas:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin(request)
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Acesso negado' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const { name, cnpj, email, phone, address, city, state, zipCode, employeeLimit, plan } = data

    // Validar dados obrigatórios
    if (!name || !cnpj || !email || !employeeLimit) {
      return NextResponse.json(
        { error: 'Dados obrigatórios não fornecidos' },
        { status: 400 }
      )
    }

    // Verificar se CNPJ já existe
    const existingCompany = await prisma.company.findUnique({
      where: { cnpj }
    })

    if (existingCompany) {
      return NextResponse.json(
        { error: 'CNPJ já cadastrado' },
        { status: 400 }
      )
    }

    const company = await prisma.company.create({
      data: {
        name,
        cnpj,
        email,
        phone,
        address,
        city,
        state,
        zipCode,
        employeeLimit,
        plan: plan || 'BASIC',
        billingCycle: 'MONTHLY',
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias
      }
    })

    // Log de auditoria
    await logAudit(admin.id, company.id, 'CREATE', 'companies', company.id, null, data, request)

    return NextResponse.json({
      success: true,
      data: company
    })

  } catch (error) {
    console.error('Erro ao criar empresa:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
