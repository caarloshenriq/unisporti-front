'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import CustomModal from '@/components/CustomModal'
import { useState, useEffect, useCallback } from 'react'
import { Place } from '@/types/Place'
import { api } from '@/services/ApiClient'
import { useRouter } from 'next/navigation'
import { FiEdit, FiTrash } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function NewPlace() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [places, setPlaces] = useState<Place[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [place, setPlace] = useState<Place>({
    name: '',
    max_capacity: 0,
  })
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

  const createPlace = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        console.log(place)
        await api.post(`/api/secure/admin/place`, place)
        toast.success('Lugar criado com sucesso!')
      } catch (error) {
        console.error(error)
      }
    },
    [place, router]
  )

  const openEditModal = (place: Place) => {
    setSelectedPlace(place)
    setPlace(place) 
    setShowEditModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedPlace) {
      try {
        await api.put(`/api/v1/place/${selectedPlace.id_place}`, place)
        setPlaces(
          places.map((p) => (p.id_place === selectedPlace.id_place ? { ...p, ...place } : p))
        )
        setShowEditModal(false)
        toast.success('Lugar atualizado com sucesso!')
      } catch (error) {
        console.error('Erro ao atualizar o lugar:', error)
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
                      onClick={() => setShowCreateModal(!showCreateModal)}
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
                            onClick={() => openEditModal(place)}
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

        {/* Modal para deletar */}
        <CustomModal
          isOpen={showDeleteModal}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
          title="Confirmar Exclusão"
          type="delete"
        >
          <p className="text-gray-600">
            Tem certeza que deseja excluir o item{' '}
            <strong>{selectedPlace?.name}</strong>?
          </p>
        </CustomModal>

        {/* Modal para criar */}
        <CustomModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onConfirm={() => createPlace}
          title="Cadastrar Novo Lugar"
          type="register"
        >
          <form className="space-y-4" onSubmit={createPlace}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                Capacidade Máxima
              </label>
              <input
                type="number"
                id="capacity"
                value={place.max_capacity}
                onChange={(e) =>
                  setPlace({ ...place, max_capacity: parseInt(e.target.value, 10) || 0 })
                }
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </form>
        </CustomModal>

        {/* Modal para editar */}
        <CustomModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onConfirm={() => handleSubmit}
          title="Editar Lugar"
          type="update"
        >
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                Capacidade Máxima
              </label>
              <input
                type="number"
                id="capacity"
                value={place.max_capacity}
                onChange={(e) =>
                  setPlace({ ...place, max_capacity: parseInt(e.target.value, 10) || 0 })
                }
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </form>
        </CustomModal>
      </div>
    </div>
  )
}
