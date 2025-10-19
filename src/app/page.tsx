import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {/* Logo com ícone de mente */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-2xl">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                {/* Efeito de conexão */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse delay-100"></div>
                <div className="absolute top-1/2 -right-6 w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              mymind<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">RH</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Conecte sua mente ao futuro da gestão de recursos humanos
            </p>
            
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Sistema inteligente para empresas pequenas e médias. 
              Gerencie funcionários, controle limites e maximize a eficiência do seu RH.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login-simple"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Acessar Sistema
              </Link>
              
              <Link
                href="#features"
                className="border-2 border-white/30 hover:border-white/50 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 hover:bg-white/10"
              >
                Conhecer Recursos
              </Link>
            </div>
          </div>
        </div>
        
        {/* Efeito de partículas flutuantes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-100"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping delay-200"></div>
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-ping delay-300"></div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Recursos Inteligentes
            </h2>
            <p className="text-xl text-gray-300">
              Tudo que você precisa para gerenciar seu RH de forma eficiente
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Dashboard */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-white mb-2">Dashboard</h3>
              <p className="text-gray-300">Visão geral completa do seu RH em tempo real</p>
            </div>
            
            {/* Funcionários */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-white mb-2">Funcionários</h3>
              <p className="text-gray-300">Gerencie todos os funcionários da sua empresa</p>
            </div>
            
            {/* Aniversários */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl mb-4">🎂</div>
              <h3 className="text-xl font-semibold text-white mb-2">Aniversários</h3>
              <p className="text-gray-300">Nunca perca um aniversário importante</p>
            </div>
            
            {/* Férias */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl mb-4">🏖️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Férias</h3>
              <p className="text-gray-300">Controle completo de férias e folgas</p>
            </div>
            
            {/* Advertências */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Advertências</h3>
              <p className="text-gray-300">Sistema completo de advertências</p>
            </div>
            
            {/* Contratos */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-white mb-2">Contratos</h3>
              <p className="text-gray-300">Gestão de contratos de trabalho</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Modelo de Cobrança Inteligente
            </h2>
            <p className="text-xl text-gray-300">
              Pague apenas pelo que usar
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Por Funcionário Cadastrado
                </h3>
                <p className="text-lg text-gray-300 mb-6">
                  Cada empresa recebe um usuário master que pode cadastrar funcionários até o limite contratado.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="bg-white/5 rounded-lg p-6">
                    <div className="text-3xl font-bold text-blue-400 mb-2">10</div>
                    <div className="text-white">Funcionários</div>
                    <div className="text-gray-400 text-sm">Plano Básico</div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-6">
                    <div className="text-3xl font-bold text-purple-400 mb-2">50</div>
                    <div className="text-white">Funcionários</div>
                    <div className="text-gray-400 text-sm">Plano Intermediário</div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-6">
                    <div className="text-3xl font-bold text-pink-400 mb-2">∞</div>
                    <div className="text-white">Funcionários</div>
                    <div className="text-gray-400 text-sm">Plano Empresarial</div>
                  </div>
                </div>
                
                <p className="text-gray-400 mt-6">
                  Quando o limite é atingido, você é notificado para aumentar o plano.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 mymindRH. Conectando mentes ao futuro do RH.
          </p>
        </div>
      </footer>
    </div>
  )
}