'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import CustomModal from '@/components/CustomModal'
import { useState, useEffect } from 'react'
import { Place } from '@/types/Place'
import { api } from '@/services/ApiClient'
import { useRouter } from 'next/navigation'
import { FiEdit, FiTrash } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function NewPlace() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [places, setPlaces] = useState<Place[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const router = useRouter()

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  const openDeleteModal = (place: Place) => {
    setSelectedPlace(place)
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setSelectedPlace(null)
    setShowDeleteModal(false)
  }

  const confirmDelete = async () => {
    if (selectedPlace) {
      try {
        await api.delete(`/api/v1/place/${selectedPlace.id_place}`)
        setPlaces(
          places.filter((place) => place.id_place !== selectedPlace.id_place)
        )
        closeDeleteModal()
        toast.success('Lugar deletado com sucesso!')
      } catch (error) {
        console.error('Erro ao deletar o lugar:', error)
        closeDeleteModal()
      }
    }
  }

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await api.get('/api/secure/admin/place')
        const data = response.data
        setPlaces(data)
      } catch (error) {
        console.error('Erro ao buscar os lugares:', error)
      }
    }

    fetchPlaces()
  }, [])

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}
      >
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Lugares</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-center font-semibold text-gray-700">
                    Nome
                  </th>
                  <th className="py-2 px-4 border-b text-center font-semibold text-gray-700">
                    Capacidade Máxima
                  </th>
                  <th className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => router.push(`/lugares/novo`)}
                      className="bg-uniporraGreen3 text-white px-4 py-2 rounded-lg hover:bg-uniporraGreen2 transition-colors"
                    >
                      Novo
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {places.length > 0 ? (
                  places.map((place) => (
                    <tr
                      key={place.id_place}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 border-b text-center text-gray-700">
                        {place.name}
                      </td>
                      <td className="py-3 px-4 border-b text-center text-gray-700">
                        {place.max_capacity}
                      </td>
                      <td className="py-3 px-4 border-b text-center">
                        <div className="flex justify-center space-x-4">
                          <span
                            onClick={() =>
                              router.push(`/lugares/${place.id_place}`)
                            }
                            className="cursor-pointer text-uniporraGreen1 hover:text-uniporraGreen2"
                            title="Editar"
                          >
                            <FiEdit size={20} />
                          </span>
                          <span
                            onClick={() => openDeleteModal(place)}
                            className="cursor-pointer text-red-600 hover:text-red-700"
                            title="Excluir"
                          >
                            <FiTrash size={20} />
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-4 px-4 text-center text-gray-500"
                    >
                      Nenhum lugar encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>

        {/* Modal de Confirmação de Exclusão usando CustomModal */}
        <CustomModal
          isOpen={showDeleteModal}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
          title="Confirmar Exclusão"
        >
          <p className="text-gray-600">
            Tem certeza que deseja excluir o item{' '}
            <strong>{selectedPlace?.name}</strong>?
          </p>
        </CustomModal>
      </div>
    </div>
  )
}
