'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulação de autenticação admin
    if (email === 'admin@mymindrh.com.br' && password === 'admin123') {
      const admin = { email, name: 'Administrador', role: 'SUPER_ADMIN' }
      localStorage.setItem('admin', JSON.stringify(admin))
      router.push('/adm')
    } else {
      setError('Credenciais de administrador inválidas')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-100"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping delay-200"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-ping delay-300"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Card Principal */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">ADMIN</span>
            </h1>
            <p className="text-gray-300">Painel Administrativo</p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Administrativo
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                placeholder="admin@mymindrh.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Senha Administrativa
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                placeholder="Sua senha administrativa"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {loading ? 'Entrando...' : 'Acessar Painel Admin'}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center space-y-2">
            <a href="/empresa" className="text-sm text-gray-400 hover:text-white transition-colors">
              ← Voltar para Login Empresarial
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            © 2024 mymindRH. Acesso Restrito.
          </p>
        </div>
      </div>
    </div>
  )
}
