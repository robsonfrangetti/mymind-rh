"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, CheckCircle, XCircle, Clock } from "lucide-react"

export default function VacationsPage() {
  const [filter, setFilter] = useState("all")

  // Mock data - será substituído por dados reais do banco
  const vacations = [
    {
      id: "1",
      employee: "João Silva",
      startDate: "2024-02-01",
      endDate: "2024-02-15",
      days: 15,
      status: "APPROVED",
      reason: "Férias anuais"
    },
    {
      id: "2",
      employee: "Maria Santos",
      startDate: "2024-03-01",
      endDate: "2024-03-10",
      days: 10,
      status: "PENDING",
      reason: "Férias familiares"
    },
    {
      id: "3",
      employee: "Carlos Lima",
      startDate: "2024-01-15",
      endDate: "2024-01-30",
      days: 15,
      status: "REJECTED",
      reason: "Férias de fim de ano"
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "REJECTED":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "PENDING":
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "Aprovado"
      case "REJECTED":
        return "Rejeitado"
      case "PENDING":
        return "Pendente"
      default:
        return "Desconhecido"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800"
      case "REJECTED":
        return "bg-red-100 text-red-800"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredVacations = vacations.filter(vacation => {
    if (filter === "all") return true
    return vacation.status === filter.toUpperCase()
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Férias</h1>
          <p className="text-gray-600">
            Gerencie as solicitações de férias dos funcionários
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nova Solicitação</span>
        </Button>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === "all"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === "pending"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Pendentes
        </button>
        <button
          onClick={() => setFilter("approved")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === "approved"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Aprovadas
        </button>
        <button
          onClick={() => setFilter("rejected")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === "rejected"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Rejeitadas
        </button>
      </div>

      <div className="space-y-4">
        {filteredVacations.map((vacation) => (
          <div key={vacation.id} className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Calendar className="h-8 w-8 text-blue-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {vacation.employee}
                  </h3>
                  <p className="text-sm text-gray-600">{vacation.reason}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    {new Date(vacation.startDate).toLocaleDateString('pt-BR')} - {new Date(vacation.endDate).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {vacation.days} dias
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(vacation.status)}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(vacation.status)}`}>
                    {getStatusText(vacation.status)}
                  </span>
                </div>
                {vacation.status === "PENDING" && (
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Aprovar
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                      Rejeitar
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVacations.length === 0 && (
        <div className="rounded-lg bg-white p-12 text-center shadow">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            Nenhuma solicitação encontrada
          </h3>
          <p className="mt-2 text-gray-500">
            Não há solicitações de férias com o filtro selecionado.
          </p>
        </div>
      )}
    </div>
  )
}
