'use client'

import { getWeekdayLabel } from '@/app/admin/treinamentos/Training'
import Header from '@/components/Header'
import Sidebar from '@/components/sidebar'
import { api } from '@/services/ApiClient'
import { Training } from '@/types/Training'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Treinamentos() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [trainings, setTrainings] = useState<Training[]>([])
  const { id } = useParams()

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const res = await api.get('/training')
        const t: Training[] = res.data
        const selectedTrainings = t.filter((training) => training.id_modality === Number(id)) // Corrigido
        setTrainings(selectedTrainings) // Sempre define um array
      } catch (error) {
        console.error(error)
      }
    }
    fetchTraining()
  }, [])
  
  return (
    <div className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}
      >
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4 text-center">Meus Treinamentos</h1>

          <table className="min-w-full bg-white border border-gray-200 mb-8">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Treinamento</th>
                <th className="py-2 px-4 border-b">Dia da Semana</th>
                <th className="py-2 px-4 border-b">Início</th>
                <th className="py-2 px-4 border-b">Término</th>
              </tr>
            </thead>
            <tbody>
              {trainings.map((training) => (
                <tr key={training.id_training}>
                  <td className="py-2 px-4 border-b text-center">
                    {training.description}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {getWeekdayLabel(training.week_day)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {training.start_hour.toFixed(2).replace(".", ":")}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {training.end_hour.toFixed(2).replace(".", ":")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
