'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Company {
  id: string
  name: string
  employeeLimit: number
  currentEmployees: number
  status: 'active' | 'inactive'
  createdAt: string
}

interface User {
  email: string
  name: string
  role: string
}

export default function AdminPanel() {
  const [user, setUser] = useState<User | null>(null)
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const router = useRouter()

  useEffect(() => {
    // Verificar se usuário está logado
    const userData = localStorage.getItem('admin')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      // Redirecionar para login se não estiver logado
      router.push('/empresa')
    }
    setLoading(false)
  }, [router])

  // Dados mockados para demonstração
  useEffect(() => {
    if (user) {
      setCompanies([
        {
          id: '1',
          name: 'TechCorp Solutions',
          employeeLimit: 10,
          currentEmployees: 8,
          status: 'active',
          createdAt: '2024-01-15'
        },
        {
          id: '2',
          name: 'Inovação Digital',
          employeeLimit: 25,
          currentEmployees: 25,
          status: 'active',
          createdAt: '2024-02-20'
        },
        {
          id: '3',
          name: 'StartupXYZ',
          employeeLimit: 5,
          currentEmployees: 3,
          status: 'active',
          createdAt: '2024-03-10'
        }
      ])
    }
  }, [user])

  const handleLogout = () => {
    localStorage.removeItem('admin')
    router.push('/empresa')
  }

  const handleIncreaseLimit = (companyId: string) => {
    // Lógica para aumentar limite
    setCompanies(prev => prev.map(company => 
      company.id === companyId 
        ? { ...company, employeeLimit: company.employeeLimit + 5 }
        : company
    ))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
                <p className="text-gray-600">mymindRH</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Bem-vindo, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('companies')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'companies'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Empresas
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'billing'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Cobrança
            </button>
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Total de Empresas</h3>
                <p className="text-3xl font-bold text-blue-600">{companies.length}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Empresas Ativas</h3>
                <p className="text-3xl font-bold text-green-600">
                  {companies.filter(c => c.status === 'active').length}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Total de Funcionários</h3>
                <p className="text-3xl font-bold text-purple-600">
                  {companies.reduce((acc, company) => acc + company.currentEmployees, 0)}
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Empresas com Limite Atingido</h3>
              <div className="space-y-3">
                {companies.filter(c => c.currentEmployees >= c.employeeLimit).map(company => (
                  <div key={company.id} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{company.name}</p>
                      <p className="text-sm text-gray-600">
                        {company.currentEmployees}/{company.employeeLimit} funcionários
                      </p>
                    </div>
                    <button
                      onClick={() => handleIncreaseLimit(company.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Aumentar Limite
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Companies Tab */}
        {activeTab === 'companies' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Empresas Cadastradas</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Empresa
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Funcionários
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {companies.map((company) => (
                    <tr key={company.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{company.name}</div>
                        <div className="text-sm text-gray-500">ID: {company.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {company.currentEmployees}/{company.employeeLimit}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className={`h-2 rounded-full ${
                              company.currentEmployees >= company.employeeLimit
                                ? 'bg-red-500'
                                : company.currentEmployees / company.employeeLimit > 0.8
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            }`}
                            style={{
                              width: `${Math.min((company.currentEmployees / company.employeeLimit) * 100, 100)}%`
                            }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          company.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {company.status === 'active' ? 'Ativa' : 'Inativa'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleIncreaseLimit(company.id)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Aumentar Limite
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumo de Cobrança</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Receita Mensal</p>
                  <p className="text-2xl font-bold text-green-600">R$ 2.450,00</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Funcionários Ativos</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {companies.reduce((acc, company) => acc + company.currentEmployees, 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Histórico de Pagamentos</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">TechCorp Solutions</p>
                    <p className="text-sm text-gray-600">Janeiro 2024</p>
                  </div>
                  <p className="font-semibold text-green-600">R$ 800,00</p>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Inovação Digital</p>
                    <p className="text-sm text-gray-600">Janeiro 2024</p>
                  </div>
                  <p className="font-semibold text-green-600">R$ 1.250,00</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
