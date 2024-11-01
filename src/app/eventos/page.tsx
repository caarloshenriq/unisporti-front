'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { useState } from 'react'

export default function Events() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  // Função para formatar a data no padrão pt-BR
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  }

  // Lista de eventos
  const events = [
    { id: 1, title: 'Evento de Futebol', date: '2024-09-12' },
    { id: 2, title: 'Campeonato de Basquete', date: '2024-09-18' },
    { id: 3, title: 'Torneio de Natação', date: '2024-09-20' },
    { id: 4, title: 'Vôlei na Praia', date: '2024-09-22' },
    { id: 5, title: 'Torneio de Artes Marciais', date: '2024-09-25' },
  ]

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}
      >
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="p-8 h-full overflow-auto">
          <div className="flex flex-row justify-between">
            <h1 className="text-3xl font-bold mb-6">Eventos</h1>
            <button className="hover:bg-slate-300 font-bold py-2 px-4 rounded hidden">
              Novo Evento
            </button>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105 hover:cursor-pointer"
              >
                <h4 className="text-2xl font-bold mb-4">{event.title}</h4>
                <p className="text-gray-600">Data: {formatDate(event.date)}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
