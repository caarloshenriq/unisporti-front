'use client'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { useState } from 'react'

const mockModalityDetails = {
  id: 1,
  name: 'Futebol',
  teacher: 'Carlos Henrique',
  availableSchedules: ['Quarta-feira 19:30', 'Sábado 10:00'],
  additionalInfo: 'Os treinos são realizados no campo da escola.',
}

const mockClasses = [
  { id: 1, name: 'Turma A', schedule: 'Quarta-feira 19:30' },
  { id: 2, name: 'Turma B', schedule: 'Sábado 10:00' },
]

export default function ModalityDetail() {
  //{ params }: { params: { id: string } }
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [showClasses, setShowClasses] = useState<boolean>(false)

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  const toggleView = () => {
    setShowClasses((prev) => !prev)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}
      >
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="p-8 h-full overflow-auto">
          <h1 className="text-2xl font-bold mb-4">
            Detalhes da modalidade {mockModalityDetails.name}
          </h1>
          {!showClasses ? (
            <div>
              <h2>Professor Responsável: {mockModalityDetails.teacher}</h2>
              <h3>Horários Disponíveis:</h3>
              <ul>
                {mockModalityDetails.availableSchedules.map(
                  (schedule, index) => (
                    <li key={index}>{schedule}</li>
                  )
                )}
              </ul>
              <p>{mockModalityDetails.additionalInfo}</p>
              <button
                onClick={toggleView}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Ver Turmas
              </button>
            </div>
          ) : (
            <div>
              <h2>Turmas vinculadas à modalidade:</h2>
              <ul>
                {mockClasses.map(({ id, name, schedule }) => (
                  <li key={id}>
                    {name} - {schedule}
                  </li>
                ))}
              </ul>
              <button
                onClick={toggleView}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Voltar aos Detalhes
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
