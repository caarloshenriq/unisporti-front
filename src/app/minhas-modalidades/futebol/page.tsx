'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// Registrar elementos do ChartJS
ChartJS.register(ArcElement, Tooltip, Legend)

// Interface para Presença
interface Training {
  id: number
  name: string
}

interface User {
  id: number
  name: string
}

interface Presence {
  training: Training
  user: User
  dateTimeTraining: Date
  present: boolean
}

const attendanceData: Presence[] = [
  {
    training: { id: 1, name: 'Treino 1' },
    user: { id: 1, name: 'Carlos' },
    dateTimeTraining: new Date('2024-09-01'),
    present: true,
  },
  {
    training: { id: 2, name: 'Treino 2' },
    user: { id: 1, name: 'Carlos' },
    dateTimeTraining: new Date('2024-09-02'),
    present: false,
  },
  {
    training: { id: 3, name: 'Treino 3' },
    user: { id: 1, name: 'Carlos' },
    dateTimeTraining: new Date('2024-09-03'),
    present: false,
  },
  {
    training: { id: 4, name: 'Treino 4' },
    user: { id: 1, name: 'Carlos' },
    dateTimeTraining: new Date('2024-09-04'),
    present: false,
  },
  {
    training: { id: 5, name: 'Treino 5' },
    user: { id: 1, name: 'Carlos' },
    dateTimeTraining: new Date('2024-09-05'),
    present: true,
  },
]

const totalPresent = attendanceData.filter((data) => data.present).length
const totalAbsent = attendanceData.length - totalPresent

const data = {
  labels: ['Presente', 'Ausente'],
  datasets: [
    {
      label: 'Presença',
      data: [totalPresent, totalAbsent],
      backgroundColor: ['#4CAF50', '#F44336'],
      borderColor: ['#4CAF50', '#F44336'],
      borderWidth: 1,
    },
  ],
}

export default function Soccer() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}
      >
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Presença do Jogador</h1>

          <table className="min-w-full bg-white border border-gray-200 mb-8">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Treino</th>
                <th className="py-2 px-4 border-b">Data</th>
                <th className="py-2 px-4 border-b">Presença</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((entry, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b text-center">
                    {entry.training.name}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {entry.dateTimeTraining.toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {entry.present ? 'Presente' : 'Ausente'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="w-60 mx-auto">
            <Doughnut data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}
