"use client"

import { Building2, Users, DollarSign, TrendingUp } from "lucide-react"

export default function AdminDashboardPage() {
  const stats = [
    {
      title: "Total de Empresas",
      value: 12,
      icon: Building2,
      color: "bg-blue-500"
    },
    {
      title: "Total de Funcionários",
      value: 156,
      icon: Users,
      color: "bg-green-500"
    },
    {
      title: "Receita Mensal",
      value: "R$ 15.600",
      icon: DollarSign,
      color: "bg-yellow-500"
    },
    {
      title: "Crescimento",
      value: "+12%",
      icon: TrendingUp,
      color: "bg-purple-500"
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrativo</h1>
        <p className="text-gray-600">
          Visão geral do sistema mymindRH
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center">
                <div className={`rounded-lg p-3 ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
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
