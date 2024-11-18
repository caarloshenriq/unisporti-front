'use client'
import Header from '@/components/Header'
import Sidebar from '@/components/sidebar'
import CustomModal from '@/components/CustomModal'
import { useState, useEffect, useCallback } from 'react'
import { FiEdit, FiTrash } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { Modality } from '@/types/Modality'
import { User } from '@/types/User'
import { api } from '@/services/ApiClient'

export default function Modalidades() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [modalities, setModalities] = useState<Modality[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedModality, setSelectedModality] = useState<Modality | null>(null)
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const [newModality, setNewModality] = useState<Modality>({
    id_modality: 0,
    id_instructor: { id: 0, firstName: '', email: '', lastName: '', phone: '', role: '', cpf: '', active: true, birthDate: new Date() },
    description: '',
    max_participants: 0,
    active: true,
  })

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  const openDeleteModal = (modality: Modality) => {
    setSelectedModality(modality)
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setSelectedModality(null)
    setShowDeleteModal(false)
  }

  const confirmDelete = async () => {
    if (selectedModality) {
      try {
        await api.delete(`/api/v1/modality/${selectedModality.id_modality}`)
        setModalities(modalities.filter((modality) => modality.id_modality !== selectedModality.id_modality))
        closeDeleteModal()
        toast.success('Modalidade deletada com sucesso!')
      } catch (error) {
        console.error('Erro ao deletar a modalidade:', error)
        closeDeleteModal()
      }
    }
  }

  useEffect(() => {
    const fetchModalities = async () => {
      try {
        const response = await api.get('/api/v1/modality')
        setModalities(response.data)
      } catch (error) {
        console.error('Erro ao buscar as modalidades:', error)
      }
    }

    fetchModalities()
  }, [])

  const createModality = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        await api.post(`/api/secure/admin/modality`, newModality)
        toast.success('Modalidade criada com sucesso!')
        setShowCreateModal(false)
        setNewModality({
          id_modality: 0,
          id_instructor: { id: 0, firstName: '', email: '', lastName: '', phone: '', role: '', cpf: '', active: true, birthDate: new Date() },
          description: '',
          max_participants: 0,
          active: true,
        }) // Resetar os campos do formulário
      } catch (error) {
        console.error(error)
        toast.error('Erro ao criar modalidade.')
      }
    },
    [newModality]
  )

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}
      >
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="p-8 h-full overflow-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Modalidades</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-center font-semibold text-gray-700">Descrição</th>
                  <th className="py-2 px-4 border-b text-center font-semibold text-gray-700">Instrutor</th>
                  <th className="py-2 px-4 border-b text-center font-semibold text-gray-700">Máximo de Participantes</th>
                  <th className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="bg-uniporraGreen3 text-white px-4 py-2 rounded-lg hover:bg-uniporraGreen2 transition-colors"
                    >
                      Novo
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {modalities.length > 0 ? (
                  modalities.map((modality) => (
                    <tr key={modality.id_modality} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 border-b text-center text-gray-700">{modality.description}</td>
                      <td className="py-3 px-4 border-b text-center text-gray-700">{modality.id_instructor.firstName}</td>
                      <td className="py-3 px-4 border-b text-center text-gray-700">{modality.max_participants}</td>
                      <td className="py-3 px-4 border-b text-center">
                        <div className="flex justify-center space-x-4">
                          <span
                            onClick={() => console.log('Editar modalidade', modality.id_modality)}
                            className="cursor-pointer text-uniporraGreen1 hover:text-uniporraGreen2"
                            title="Editar"
                          >
                            <FiEdit size={20} />
                          </span>
                          <span
                            onClick={() => openDeleteModal(modality)}
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
                    <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                      Nenhuma modalidade encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>

        {/* Modal para confirmação de exclusão */}
        <CustomModal
          isOpen={showDeleteModal}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
          title="Confirmar Exclusão"
          type="delete"
        >
          <p className="text-gray-600">
            Tem certeza que deseja excluir a modalidade <strong>{selectedModality?.description}</strong>?
          </p>
        </CustomModal>

        {/* Modal para criação de nova modalidade */}
        <CustomModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onConfirm={() =>createModality}
          title="Cadastrar Modalidade"
          type="register"
        >
          <form className="space-y-4" onSubmit={createModality}>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <input
                type="text"
                id="description"
                value={newModality.description}
                onChange={(e) => setNewModality({ ...newModality, description: e.target.value })}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">
                Instrutor
              </label>
              <input
                type="text"
                id="instructor"
                value={newModality.id_instructor.firstName}
                onChange={(e) => setNewModality({ ...newModality, id_instructor: { ...newModality.id_instructor, firstName: e.target.value } })}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label htmlFor="max_participants" className="block text-sm font-medium text-gray-700">
                Máximo de Participantes
              </label>
              <input
                type="number"
                id="max_participants"
                value={newModality.max_participants}
                onChange={(e) => setNewModality({ ...newModality, max_participants: parseInt(e.target.value, 10) || 0 })}
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
