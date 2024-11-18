'use client'
import Header from '@/components/Header'
import Sidebar from '@/components/sidebar'
import Link from 'next/link'
import { useState } from 'react'

export default function Modalidades() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  const modality = [
    { id: 1, name: 'Futebol', teacher: 'Carlos Henrique' },
    { id: 2, name: 'Basquete', teacher: 'Leonardo Zucco' },
    { id: 3, name: 'Natação', teacher: 'Pedro Ayres' },
    { id: 4, name: 'Vôlei', teacher: 'Tiago Carvalho' },
    { id: 5, name: 'Karate', teacher: 'Felipe Negrelle' },
  ]

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}
      >
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="p-8 h-full overflow-auto">
          <div className="grid gap-10 md:grid-cols-3">
            {modality.map(({ id, name, teacher }) => (
              <div
                key={id}
                className="bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105 items-center hover:cursor-pointer text-center"
              >
                <Link href={`/modalidades/${id}`}>
                  <h4 className="text-2xl font-bold mb-4 text-uniporra">
                    {name}
                  </h4>
                  <p className="text-uniporraBlack text-center">
                    Professor: {teacher}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
