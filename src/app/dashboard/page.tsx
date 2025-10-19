export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Dashboard - mymindRH
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Funcionários</h2>
            <p className="text-gray-600">Gerencie os funcionários da empresa</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Aniversários</h2>
            <p className="text-gray-600">Acompanhe os aniversários dos funcionários</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Férias</h2>
            <p className="text-gray-600">Controle de férias e folgas</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Advertências</h2>
            <p className="text-gray-600">Registro de advertências</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Suspensões</h2>
            <p className="text-gray-600">Controle de suspensões</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Demissões</h2>
            <p className="text-gray-600">Processo de demissões</p>
          </div>
        </div>
      </div>
    </div>
  )
}
