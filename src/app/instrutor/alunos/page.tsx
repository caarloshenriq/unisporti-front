'use client'
import Header from '@/components/Header'
import Sidebar from '@/components/sidebar'
import { api } from '@/services/ApiClient'
import { Athlete } from '@/types/Athletes'
import { Instructor } from '@/types/Instructor'
import { JwtPayload } from '@/types/Jwt'
import { Modality } from '@/types/Modality'
import { Training } from '@/types/Training'
import { jwtDecode } from 'jwt-decode'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'

export default function Modalidades() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [athletes, setAthletes] = useState<Athlete[]>([])
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  useEffect(() => {
    const fetchStudents = async () => {
        try {
          const res = await api.get('/instructor/athletes')
          setAthletes(res.data)
        } catch (error) {
          console.error(error)
        }
      }
      fetchStudents()
  }, [])
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}
      >
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="flex flex-col items-center h-full p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Atletas
          </h1>
          <div className="overflow-x-auto w-full">
            <table className="w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-4 px-6 border-b text-left text-lg font-semibold">
                    Nome
                  </th>
                  <th className="py-4 px-6 border-b text-left text-lg font-semibold">
                    Treino
                  </th>
                  <th className="py-4 px-6 border-b text-left text-lg font-semibold">
                    Modalidade
                  </th>
                </tr>
              </thead>
              <tbody>
                {athletes.map((athlete) => (
                  <tr key={athlete.id_user} className="hover:bg-gray-100">
                    <td className="py-4 px-6 border-b text-lg">
                      {`${athlete.first_name} ${athlete.last_name}`}
                    </td>
                    <td className="py-4 px-6 border-b text-lg">
                      {athlete.training_description}
                    </td>
                    <td className="py-4 px-6 border-b text-lg">
                      {athlete.training_description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
