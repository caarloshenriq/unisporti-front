'use client'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { useState } from 'react'

export default function Modalidades() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}
      >
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="p-8 h-full overflow-auto">
          <div className="grid gap-10 md:grid-cols-3">
            {['Futebol', 'Basquete', 'Natação', 'Vôlei', 'Artes Marciais'].map(
              (modality) => (
                <div
                  key={modality}
                  className="bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105 items-center hover:cursor-pointer"
                >
                  <Link href="/minhas-modalidades/futebol">
                    <h4 className="text-2xl font-bold mb-4 text-uniporra">
                      {modality}
                    </h4>
                    <p className="text-uniporraBlack">Quarta-feira 19:30</p>
                  </Link>
                </div>
              )
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
