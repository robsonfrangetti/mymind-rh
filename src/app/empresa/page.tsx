'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EmpresaLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulação de autenticação
    if (email === 'admin@mymindrh.com.br' && password === 'admin123') {
      const user = { email, name: 'Administrador', role: 'ADMIN' }
      localStorage.setItem('user', JSON.stringify(user))
      router.push('/dashboard')
    } else {
      setError('Email ou senha inválidos')
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
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-2">
              mymind<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">RH</span>
            </h1>
            <p className="text-gray-300">Acesso Empresarial</p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="seu@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Sua senha"
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
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {loading ? 'Entrando...' : 'Entrar no Sistema'}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center space-y-2">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Esqueceu sua senha?
            </a>
            <div className="text-sm text-gray-400">
              Não tem conta? <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Entre em contato</a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            © 2024 mymindRH. Conectando mentes ao futuro do RH.
          </p>
        </div>
      </div>
    </div>
  )
}
