import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
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
  }

  interface User {
    role: string
    companyId?: string
    company?: {
      id: string
      name: string
      employeeLimit: number
      currentEmployees: number
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
    companyId?: string
    company?: {
      id: string
      name: string
      employeeLimit: number
      currentEmployees: number
    }
  }
}
