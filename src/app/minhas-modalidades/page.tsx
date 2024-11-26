'use client'
import Header from '@/components/Header'
import Sidebar from '@/components/sidebar'
import { api } from '@/services/ApiClient'
import { Instructor } from '@/types/Instructor'
import { JwtPayload } from '@/types/Jwt'
import { Modality } from '@/types/Modality'
import { Training } from '@/types/Training'
import { jwtDecode } from 'jwt-decode'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { getWeekdayLabel } from '../admin/treinamentos/Training'

export default function Modalidades() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [modalities, setModalities] = useState<Modality[]>([])
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [trainings, setTrainings] = useState<Training[]>([])
  let myModalities:Modality[] = []

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  const decoded: JwtPayload = jwtDecode(parseCookies().token)
  if(decoded.role == 'I'){
    useEffect(() => {
      const fetchModalities = async () => {
        try {
          const res = await api.get('/modality')
          setModalities(res.data)
          const resInstructor = await api.get('/instructor')
          setInstructors(resInstructor.data)
        } catch (error) {
          console.error(error)
        }
      }
      fetchModalities()
    }, [])
    const idInstrucotr = instructors.find((instructor) => instructor.id_user == decoded.idUser)?.id_instructor
    myModalities = modalities.filter((modality) => idInstrucotr && modality.id_instructor == idInstrucotr)
  } else {
    useEffect(() => {
      const fetchModalities = async () => {
        try {
          const res = await api.get('/modality')
          setModalities(res.data)
          const resT = await api.get('/training')
          setTrainings(resT.data)
        } catch (error) {
          console.error(error)
        }
      }
      fetchModalities()
    }, [])
    myModalities = modalities
  }
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}
      >
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="p-8 h-full overflow-auto">
        {decoded.role === 'I' ? (
            <div className="grid gap-10 md:grid-cols-3">
              {myModalities.map(
                (modality) => (
                  <div
                    key={modality.id_modality}
                    className="bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105 items-center hover:cursor-pointer"
                  >
                    <h4 className="text-2xl font-bold mb-4 text-uniporra">
                      {modality.description}
                    </h4>
                    <p className="text-uniporraBlack">Adicionar dia e hr treino</p>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="grid gap-10 md:grid-cols-3">
              {trainings.map(
                (training) => {
                  const modality = modalities.find((mod) => mod.id_modality === training.id_modality)
                  return (
                    <div
                      key={training.id_training}
                      className="bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105 items-center hover:cursor-pointer"
                    >
                      <a>
                        <h4 className="text-2xl font-bold mb-4 text-uniporra text-center">
                          {modality?.description}
                        </h4>
                        <p className="text-uniporraBlack text-center">
                          {getWeekdayLabel(training.week_day)} - {training.start_hour.toFixed(2).replace(".", ":")} até {training.end_hour.toFixed(2).replace(".", ":")}
                        </p>
                      </a>
                    </div>
                  )
                }
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
