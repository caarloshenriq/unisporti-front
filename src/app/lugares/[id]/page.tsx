'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { useCallback, useEffect, useState } from 'react'
import { Place } from '@/types/Place'
import { api } from '@/services/ApiClient'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'

export default function EditPlace() {
  const router = useRouter()
  const { id } = useParams()
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
        await api.put(`api/v1/place`, place)
        toast.success('Atualizado com sucesso')
        router.push('/lugares')
      } catch (error) {
        console.log(error)
        toast.error('Erro ao atualizar o lugar')
      }
    },
    [place, router]
  )

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await api.get(`/api/v1/place/${id}`)
        const data = response.data
        setPlace(data)
      } catch (error) {
        console.error('Erro ao buscar o lugar:', error)
        toast.error('Erro ao buscar o lugar')
      }
    }

    if (id) {
      fetchPlace()
    }
  }, [id])

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}
      >
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="flex justify-center h-full p-8">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Cadastrar Novo Lugar
            </h1>
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
                  Capacidade Máxima
                </label>
                <input
                  type="number"
                  id="capacity"
                  value={place.max_capacity}
                  onChange={(e) =>
                    setPlace({
                      ...place,
                      max_capacity: parseInt(e.target.value, 10) || 0,
                    })
                  }
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-green-500 text-white font-bold py-2 rounded-md hover:bg-green-600"
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
