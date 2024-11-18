'use client'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import CustomModal from '@/components/CustomModal'
import { useState, useEffect, useCallback } from 'react'
import { FiEdit, FiTrash } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { Plan } from '@/types/Plan'
import { api } from '@/services/ApiClient'
import { formatCurrency } from '@/utils/Masks'

export default function Modalidades() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [plans, setPlans] = useState<Plan[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [newPlan, setNewPlan] = useState<Plan>({
    name: '',
    price_cents: 0,
    duration_days: 0,
    active: true
  })

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  const openDeleteModal = (plan: Plan) => {
    setSelectedPlan(plan)
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setSelectedPlan(null)
    setShowDeleteModal(false)
  }

  const confirmDelete = async () => {
    if (selectedPlan) {
      try {
        await api.delete(`/api/v1/plan/${selectedPlan.id_plan}`)
        setPlans(plans.filter((plan) => plan.id_plan !== selectedPlan.id_plan))
        closeDeleteModal()
        toast.success('Plano deletado com sucesso!')
      } catch (error) {
        console.error('Erro ao deletar o plano:', error)
        closeDeleteModal()
      }
    }
  }

  const openEditModal = (plan: Plan) => {
    setSelectedPlan(plan)
    setNewPlan(plan) // Preenche os dados do plano no estado de edição
    setShowEditModal(true)
  }

  const closeEditModal = () => {
    setSelectedPlan(null)
    setShowEditModal(false)
  }

  const editPlan = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedPlan) {
      try {
        await api.put(`/api/v1/plan/${selectedPlan.id_plan}`, newPlan)
        setPlans(plans.map((plan) => (plan.id_plan === selectedPlan.id_plan ? newPlan : plan)))
        closeEditModal()
        toast.success('Plano editado com sucesso!')
      } catch (error) {
        console.error('Erro ao editar o plano:', error)
      }
    }
  }

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.get('/api/v1/plan')
        setPlans(response.data)
      } catch (error) {
        console.error('Erro ao buscar os planos:', error)
      }
    }

    fetchPlans()
  }, [])

  const createPlan = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        await api.post(`/api/secure/admin/plan`, newPlan)
        toast.success('Plano criado com sucesso!')
        setPlans((prevPlans) => [...prevPlans, newPlan]) // Atualiza a lista de planos
        setShowCreateModal(false) // Fecha o modal após criar o plano
      } catch (error) {
        console.error(error)
      }
    },
    [newPlan]
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
                  <th className="py-2 px-4 border-b text-center font-semibold text-gray-700">Nome</th>
                  <th className="py-2 px-4 border-b text-center font-semibold text-gray-700">Valor</th>
                  <th className="py-2 px-4 border-b text-center font-semibold text-gray-700">Duração</th>
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
                {plans.length > 0 ? (
                  plans.map((plan) => (
                    <tr key={plan.id_plan} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 border-b text-center text-gray-700">{plan.name}</td>
                      <td className="py-3 px-4 border-b text-center text-gray-700">
                        {(plan.price_cents / 100).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </td>
                      <td className="py-3 px-4 border-b text-center text-gray-700">{plan.duration_days} dias</td>
                      <td className="py-3 px-4 border-b text-center">
                        <div className="flex justify-center space-x-4">
                          <span
                            onClick={() => openEditModal(plan)}
                            className="cursor-pointer text-uniporraGreen1 hover:text-uniporraGreen2"
                            title="Editar"
                          >
                            <FiEdit size={20} />
                          </span>
                          <span
                            onClick={() => openDeleteModal(plan)}
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
                    <td colSpan={4} className="py-4 px-4 text-center text-gray-500">
                      Nenhum plano encontrado.
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
            Tem certeza que deseja excluir o plano{' '}
            <strong>{selectedPlan?.name}</strong>?
          </p>
        </CustomModal>

        {/* Modal para criação de plano */}
        <CustomModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onConfirm={() => createPlan}
          title="Cadastrar Plano"
          type="register"
        >
          <form className="space-y-4" onSubmit={createPlan}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                id="name"
                value={newPlan.name}
                onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Preço
              </label>
              <input
                type="text"
                id="price"
                value={newPlan.price_cents ? formatCurrency(newPlan.price_cents.toString()) : ''}
                onChange={(e) => {
                    const value = e.target.value;
                    const rawValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos
                    setNewPlan({
                    ...newPlan,
                    price_cents: parseInt(rawValue, 10) || 0, // Atualiza o valor com o número sem formatação
                    });
                }}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                Duração (em dias)
              </label>
              <input
                type="number"
                id="duration"
                value={newPlan.duration_days}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, duration_days: parseInt(e.target.value, 10) || 0 })
                }
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </form>
        </CustomModal>

        {/* Modal de Edição de plano */}
        <CustomModal
          isOpen={showEditModal}
          onClose={closeEditModal}
          onConfirm={() => editPlan}
          title="Editar Plano"
          type="update"
        >
          <form className="space-y-4" onSubmit={editPlan}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                id="name"
                value={newPlan.name}
                onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Preço
              </label>
              <input
                type="text"
                id="price"
                value={newPlan.price_cents ? formatCurrency(newPlan.price_cents.toString()) : ''}
                onChange={(e) => {
                    const value = e.target.value;
                    const rawValue = value.replace(/\D/g, '');
                    setNewPlan({
                    ...newPlan,
                    price_cents: parseInt(rawValue, 10) || 0,
                    });
                }}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                Duração (em dias)
              </label>
              <input
                type="number"
                id="duration"
                value={newPlan.duration_days}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, duration_days: parseInt(e.target.value, 10) || 0 })
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
