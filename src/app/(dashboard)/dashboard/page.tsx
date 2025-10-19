"use client"

import { useSession } from "next-auth/react"
import { Users, Calendar, Plane, AlertTriangle } from "lucide-react"

export default function DashboardPage() {
  const { data: session } = useSession()

  const stats = [
    {
      title: "Total de Funcionários",
      value: session?.user?.company?.currentEmployees || 0,
      limit: session?.user?.company?.employeeLimit || 0,
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Aniversários do Mês",
      value: 3,
      icon: Calendar,
      color: "bg-green-500"
    },
    {
      title: "Férias Pendentes",
      value: 2,
      icon: Plane,
      color: "bg-yellow-500"
    },
    {
      title: "Advertências",
      value: 1,
      icon: AlertTriangle,
      color: "bg-red-500"
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Visão geral do seu sistema de RH
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
                    {stat.limit && (
                      <span className="text-sm font-normal text-gray-500">
                        /{stat.limit}
                      </span>
                    )}
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
            Funcionários Recentes
          </h3>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">João Silva</p>
                <p className="text-sm text-gray-600">Desenvolvedor</p>
              </div>
              <span className="text-sm text-gray-500">15/01/2024</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Maria Santos</p>
                <p className="text-sm text-gray-600">Designer</p>
              </div>
              <span className="text-sm text-gray-500">10/01/2024</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-900">
            Aniversários do Mês
          </h3>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Ana Costa</p>
                <p className="text-sm text-gray-600">25/01/2024</p>
              </div>
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                Hoje
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Carlos Lima</p>
                <p className="text-sm text-gray-600">28/01/2024</p>
              </div>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                Em 3 dias
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
