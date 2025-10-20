import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import { prisma } from './prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'mymindrh-secret-key-2024'

export interface AuthUser {
  id: string
  email: string
  name: string
  role: string
  companyId?: string
  company?: {
    id: string
    name: string
    employeeLimit: number
    currentEmployees: number
  }
}

export interface AdminUser {
  id: string
  email: string
  name: string
  role: string
}

// ========================================
// FUNÇÕES DE HASH
// ========================================

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// ========================================
// FUNÇÕES DE JWT
// ========================================

export function generateToken(user: AuthUser): string {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role, 
      companyId: user.companyId 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  )
}

export function generateAdminToken(admin: AdminUser): string {
  return jwt.sign(
    { 
      id: admin.id, 
      email: admin.email, 
      role: admin.role 
    },
    JWT_SECRET,
    { expiresIn: '8h' }
  )
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

// ========================================
// AUTENTICAÇÃO DE USUÁRIOS
// ========================================

export async function authenticateUser(email: string, password: string): Promise<AuthUser | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { 
        company: {
          select: {
            id: true,
            name: true,
            employeeLimit: true,
            currentEmployees: true
          }
        }
      }
    })

    if (!user || !user.isActive) {
      return null
    }

    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      return null
    }

    // Atualizar último login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    })

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      companyId: user.companyId || undefined,
      company: user.company ? {
        id: user.company.id,
        name: user.company.name,
        employeeLimit: user.company.employeeLimit,
        currentEmployees: user.company.currentEmployees
      } : undefined
    }
  } catch (error) {
    console.error('Erro na autenticação:', error)
    return null
  }
}

// ========================================
// AUTENTICAÇÃO DE ADMIN
// ========================================

export async function authenticateAdmin(email: string, password: string): Promise<AdminUser | null> {
  try {
    const admin = await prisma.adminUser.findUnique({
      where: { email }
    })

    if (!admin || !admin.isActive) {
      return null
    }

    const isValidPassword = await verifyPassword(password, admin.password)
    if (!isValidPassword) {
      return null
    }

    // Atualizar último login
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() }
    })

    return {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role
    }
  } catch (error) {
    console.error('Erro na autenticação admin:', error)
    return null
  }
}

// ========================================
// MIDDLEWARE DE AUTENTICAÇÃO
// ========================================

export async function getCurrentUser(request: NextRequest): Promise<AuthUser | null> {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return null
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { 
        company: {
          select: {
            id: true,
            name: true,
            employeeLimit: true,
            currentEmployees: true
          }
        }
      }
    })

    if (!user || !user.isActive) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      companyId: user.companyId || undefined,
      company: user.company ? {
        id: user.company.id,
        name: user.company.name,
        employeeLimit: user.company.employeeLimit,
        currentEmployees: user.company.currentEmployees
      } : undefined
    }
  } catch (error) {
    console.error('Erro ao obter usuário atual:', error)
    return null
  }
}

export async function getCurrentAdmin(request: NextRequest): Promise<AdminUser | null> {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return null
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return null
    }

    const admin = await prisma.adminUser.findUnique({
      where: { id: decoded.id }
    })

    if (!admin || !admin.isActive) {
      return null
    }

    return {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role
    }
  } catch (error) {
    console.error('Erro ao obter admin atual:', error)
    return null
  }
}

// ========================================
// FUNÇÕES DE AUDITORIA
// ========================================

export async function logAudit(
  userId: string | null,
  companyId: string | null,
  action: string,
  table: string,
  recordId: string | null,
  oldData: any = null,
  newData: any = null,
  request: NextRequest
) {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        companyId,
        action,
        table,
        recordId,
        oldData: oldData ? JSON.stringify(oldData) : undefined,
        newData: newData ? JSON.stringify(newData) : undefined,
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    })
  } catch (error) {
    console.error('Erro ao registrar auditoria:', error)
  }
}

// ========================================
// FUNÇÕES DE NOTIFICAÇÃO
// ========================================

export async function createNotification(
  userId: string | null,
  companyId: string | null,
  type: string,
  title: string,
  message: string
) {
  try {
    await prisma.notification.create({
      data: {
        userId,
        companyId,
        type,
        title,
        message
      }
    })
  } catch (error) {
    console.error('Erro ao criar notificação:', error)
  }
}

// ========================================
// VALIDAÇÕES DE NEGÓCIO
// ========================================

export async function checkEmployeeLimit(companyId: string): Promise<boolean> {
  try {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: { employeeLimit: true, currentEmployees: true }
    })

    if (!company) {
      return false
    }

    return company.currentEmployees < company.employeeLimit
  } catch (error) {
    console.error('Erro ao verificar limite de funcionários:', error)
    return false
  }
}

export async function incrementEmployeeCount(companyId: string): Promise<void> {
  try {
    await prisma.company.update({
      where: { id: companyId },
      data: {
        currentEmployees: {
          increment: 1
        }
      }
    })
  } catch (error) {
    console.error('Erro ao incrementar contador de funcionários:', error)
  }
}

export async function decrementEmployeeCount(companyId: string): Promise<void> {
  try {
    await prisma.company.update({
      where: { id: companyId },
      data: {
        currentEmployees: {
          decrement: 1
        }
      }
    })
  } catch (error) {
    console.error('Erro ao decrementar contador de funcionários:', error)
  }
}