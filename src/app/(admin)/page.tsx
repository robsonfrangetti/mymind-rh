export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrativo</h1>
        <p className="text-gray-600">
          Visão geral do sistema mymindRH
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center">
            <div className="rounded-lg p-3 bg-blue-500">
              <div className="h-6 w-6 text-white">🏢</div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total de Empresas
              </p>
              <p className="text-2xl font-bold text-gray-900">
                12
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center">
            <div className="rounded-lg p-3 bg-green-500">
              <div className="h-6 w-6 text-white">👥</div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total de Funcionários
              </p>
              <p className="text-2xl font-bold text-gray-900">
                156
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center">
            <div className="rounded-lg p-3 bg-yellow-500">
              <div className="h-6 w-6 text-white">💰</div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Receita Mensal
              </p>
              <p className="text-2xl font-bold text-gray-900">
                R$ 15.600
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center">
            <div className="rounded-lg p-3 bg-purple-500">
              <div className="h-6 w-6 text-white">📈</div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Crescimento
              </p>
              <p className="text-2xl font-bold text-gray-900">
                +12%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-900">
            Empresas Recentes
          </h3>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">TechCorp Ltda</p>
                <p className="text-sm text-gray-600">15 funcionários</p>
              </div>
              <span className="text-sm text-gray-500">15/01/2024</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">StartupXYZ</p>
                <p className="text-sm text-gray-600">8 funcionários</p>
              </div>
              <span className="text-sm text-gray-500">10/01/2024</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-900">
            Limites de Funcionários
          </h3>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Empresa A</p>
                <p className="text-sm text-gray-600">8/10 funcionários</p>
              </div>
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '80%'}}></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Empresa B</p>
                <p className="text-sm text-gray-600">15/15 funcionários</p>
              </div>
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{width: '100%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
