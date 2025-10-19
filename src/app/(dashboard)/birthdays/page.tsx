"use client"

import { useState } from "react"
import { Calendar, Gift } from "lucide-react"

export default function BirthdaysPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)

  // Mock data - será substituído por dados reais do banco
  const birthdays = [
    {
      id: "1",
      name: "Ana Costa",
      position: "Analista",
      department: "Financeiro",
      birthDate: "1990-01-25",
      age: 34
    },
    {
      id: "2",
      name: "Carlos Lima",
      position: "Gerente",
      department: "Vendas",
      birthDate: "1985-01-28",
      age: 39
    },
    {
      id: "3",
      name: "Maria Silva",
      position: "Assistente",
      department: "RH",
      birthDate: "1992-02-15",
      age: 32
    }
  ]

  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ]

  const filteredBirthdays = birthdays.filter(birthday => {
    const birthMonth = new Date(birthday.birthDate).getMonth() + 1
    return birthMonth === selectedMonth
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Aniversários</h1>
        <p className="text-gray-600">
          Acompanhe os aniversários dos funcionários
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor="month" className="text-sm font-medium text-gray-700">
          Mês:
        </label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        >
          {months.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBirthdays.map((birthday) => {
          const birthDate = new Date(birthday.birthDate)
          const day = birthDate.getDate()
          const isToday = birthDate.getMonth() === new Date().getMonth() && 
                         birthDate.getDate() === new Date().getDate()
          
          return (
            <div key={birthday.id} className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center space-x-4">
                <div className={`rounded-full p-3 ${
                  isToday ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  <Gift className={`h-6 w-6 ${
                    isToday ? 'text-yellow-600' : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {birthday.name}
                  </h3>
                  <p className="text-sm text-gray-600">{birthday.position}</p>
                  <p className="text-sm text-gray-500">{birthday.department}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{day}</div>
                  <div className="text-sm text-gray-500">
                    {months[birthDate.getMonth()]}
                  </div>
                  <div className="text-xs text-gray-400">
                    {birthday.age} anos
                  </div>
                </div>
              </div>
              {isToday && (
                <div className="mt-4 rounded-lg bg-yellow-50 p-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">
                      Aniversário hoje! 🎉
                    </span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filteredBirthdays.length === 0 && (
        <div className="rounded-lg bg-white p-12 text-center shadow">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            Nenhum aniversário neste mês
          </h3>
          <p className="mt-2 text-gray-500">
            Não há funcionários fazendo aniversário em {months[selectedMonth - 1]}.
          </p>
        </div>
      )}
    </div>
  )
}
