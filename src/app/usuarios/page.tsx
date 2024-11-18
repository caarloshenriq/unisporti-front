'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { useCallback, useState } from 'react'
import { Place } from '@/types/Place'
import { api } from '@/services/ApiClient'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function NewPlace() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [place, setPlace] = useState<Place>({
    name: '',
    max_capacity: 0,
  })

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        console.log(place)
        await api.post(`/api/secure/admin/place`, place)
        toast.success(`criado com sucesso`)
        router.push('/lugares')
      } catch (error) {
        console.error(error)
      }
    },
    [place, router]
  )

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}
      >
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="flex justify-center h-full p-8">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Lugares</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  value={place.name}
                  onChange={(e) => setPlace({ ...place, name: e.target.value })}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label
                  htmlFor="capacity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Capacidade
                </label>
                <input
                  type="number"
                  id="capacity"
                  value={place.max_capacity}
                  onChange={(e) =>
                    setPlace({
                      ...place,
                      max_capacity: parseInt(e.target.value),
                    })
                  }
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-center"
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-uniporraGreen1  text-white font-bold py-2 rounded-md hover:bg-uniporraGreen2"
              >
                Cadastrar
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
