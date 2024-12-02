'use client'
import Header from '@/components/Header'
import Sidebar from '@/components/sidebar'
import CustomModal from '@/components/CustomModal'
import { useState, useEffect, useCallback, FormEvent } from 'react'
import { FiEdit, FiTrash } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { Modality } from '@/types/Modality'
import { User } from '@/types/User'
import { api } from '@/services/ApiClient'
import { Instructor } from '@/types/Instructor'

export default function Modalidades() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [modalities, setModalities] = useState<Modality[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false)
  const [selectedModality, setSelectedModality] = useState<Modality | null>(
    null
  )
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [newModality, setNewModality] = useState<Modality>({
    id_modality: 0,
    id_instructor: 0,
    description: '',
    max_participants: 0,
    active: true,
  })

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await api.get('/instructor')
        setInstructors(response.data)
      } catch (error) {
        console.error('Erro ao buscar os instrutores:', error)
      }
    }

    fetchInstructors()
  },[])

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

  const openUpdateModal = (modality: Modality) => {
    setNewModality(modality)
    setShowUpdateModal(true)
  }

  const closeUpdateModal = () => {
    setShowUpdateModal(false)
  }

  const confirmDelete = async () => {
    if (selectedModality) {
      try {
        await api.delete(`/modality/${selectedModality.id_modality}`)
        setModalities(
          modalities.filter(
            (modality) => modality.id_modality !== selectedModality.id_modality
          )
        )
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
        const response = await api.get('/modality')
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
        await api.post(`/modality`, newModality)
        toast.success('Modalidade criada com sucesso!')
        setShowCreateModal(false)
        setNewModality({
          id_modality: 0,
          id_instructor: 0,
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

  const updateModality = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      console.log("sem if")
        try {
          console.log(newModality)
          await api.put(`/modality`, newModality)
          toast.success('Modalidade atualizada com sucesso!')
          setShowUpdateModal(false)
          setNewModality({
            id_modality: 0,
            id_instructor: 0,
            description: '',
            max_participants: 0,
            active: true,
          })
        } catch (error) {
          console.error(error)
          toast.error('Erro ao atualizar modalidade.')
        }
    },
    []
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
                  <th className="py-2 px-4 border-b text-center font-semibold text-gray-700">
                    Descrição
                  </th>
                  <th className="py-2 px-4 border-b text-center font-semibold text-gray-700">
                    Instrutor
                  </th>
                  <th className="py-2 px-4 border-b text-center font-semibold text-gray-700">
                    Máximo de Participantes
                  </th>
                  <th className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="bg-uniporraGreen1 px-4 py-2 rounded-lg hover:bg-slate-500 transition-colors text-white"
                    >
                      Novo
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {modalities.length > 0 ? (
                  modalities.map((modality) => {
                    // Encontre o nome do instrutor usando o id_instructor
                    const instructor = instructors.find(
                      (instructor) =>
                        instructor.id_instructor === (modality.id_instructor)
                    )
                    return (
                      <tr
                        key={modality.id_modality}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4 border-b text-center text-gray-700">
                          {modality.description}
                        </td>
                        <td className="py-3 px-4 border-b text-center text-gray-700">
                          {instructor
                            ? instructor.name
                            : 'Instrutor não encontrado'}
                        </td>
                        <td className="py-3 px-4 border-b text-center text-gray-700">
                          {modality.max_participants}
                        </td>
                        <td className="py-3 px-4 border-b text-center">
                          <div className="flex justify-center space-x-4">
                            <span
                              onClick={() => openUpdateModal(modality)}
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
                    )
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-4 px-4 text-center text-gray-500"
                    >
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
            Tem certeza que deseja excluir a modalidade{' '}
            <strong>{selectedModality?.description}</strong>?
          </p>
        </CustomModal>

        {/* Modal para criação de nova modalidade */}
        <CustomModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onConfirm={(e: FormEvent) => createModality(e)}
          title="Cadastrar Modalidade"
          type="register"
        >
          <form className="space-y-4" onSubmit={createModality}>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Descrição
              </label>
              <input
                type="text"
                id="description"
                onChange={(e) =>
                  setNewModality({
                    ...newModality,
                    description: e.target.value,
                  })
                }
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="instructor"
                className="block text-sm font-medium text-gray-700"
              >
                Instrutor
              </label>
              <select
                id="modality"
                onChange={(e) =>
                  setNewModality({
                    ...newModality,
                    id_instructor: parseInt(e.target.value, 10) || 0,
                  })
                }
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Selecione uma Instrutor</option>
                {instructors.map((instructor) => (
                  <option
                    key={instructor.id_instructor}
                    value={instructor.id_instructor}
                  >
                    {instructor.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="max_participants"
                className="block text-sm font-medium text-gray-700"
              >
                Máximo de Participantes
              </label>
              <input
                type="number"
                id="max_participants"
                onChange={(e) =>
                  setNewModality({
                    ...newModality,
                    max_participants: parseInt(e.target.value, 10) || 0,
                  })
                }
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </form>
        </CustomModal>
        {/* Modal para edição de modalidade */}
        <CustomModal
          isOpen={showUpdateModal}
          onClose={closeUpdateModal}
          onConfirm={(e: FormEvent) => updateModality(e)}
          title="Editar Modalidade"
          type="update"
        >
          <form onSubmit={updateModality} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-700">Descrição</label>
              <input
                type="text"
                value={newModality.description}
                onChange={(e) =>
                  setNewModality({
                    ...newModality,
                    description: e.target.value,
                  })
                }
                className="px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700">Máximo de Participantes</label>
              <input
                type="number"
                value={newModality.max_participants}
                onChange={(e) =>
                  setNewModality({
                    ...newModality,
                    max_participants: Number(e.target.value),
                  })
                }
                className="px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700">Instrutor</label>
              <select
                value={newModality.id_instructor}
                onChange={(e) =>
                  setNewModality({
                    ...newModality,
                    id_instructor: Number(e.target.value),
                  })
                }
                className="px-4 py-2 border rounded-lg"
              >
                <option value={0} disabled>
                  Selecione um instrutor
                </option>
                {instructors.map((instructor) => (
                  <option
                    key={instructor.id_instructor}
                    value={instructor.id_instructor}
                  >
                    {instructor.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </CustomModal>
      </div>
    </div>
  )
}
