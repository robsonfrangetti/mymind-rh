import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Lógica adicional de middleware se necessário
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Rotas públicas
        if (pathname === "/login" || pathname === "/") {
          return true
        }
        
        // Verificar se o usuário está autenticado
        if (!token) {
          return false
        }
        
        // Verificar acesso ao painel admin
        if (pathname.startsWith("/admin")) {
          return token.role === "ADMIN"
        }
        
        // Verificar acesso ao dashboard da empresa
        if (pathname.startsWith("/dashboard")) {
          return token.role === "COMPANY_ADMIN" || token.role === "EMPLOYEE"
        }
        
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
  ]
}
