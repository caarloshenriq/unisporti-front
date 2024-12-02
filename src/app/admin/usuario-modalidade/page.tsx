'use client'
import Header from '@/components/Header'
import Sidebar from '@/components/sidebar'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { useUserModalityData, getRoleLabel } from './GetData'
import { useCallback, useState } from 'react'
import CustomModal from '@/components/CustomModal'
import { UserPlan } from '@/types/UserPlan'
import { api } from '@/services/ApiClient'
import toast from 'react-hot-toast'
import { QRCodeSVG } from 'qrcode.react'

export default function UserModality() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const [selectModality, setSelectModality] = useState<number | null>(null)
  const [planValue, setPlanValue] = useState<number>(0)
  const [trainingId, setTrainingId] = useState<number | null>(null)
  const [paymentModal, setPaymentModal] = useState<boolean>(false)
  const [newUserPlan, setNewUserPlan] = useState<UserPlan>({
    id_plan: 0,
    id_user: 0,
    start_date: new Date(),
    status: 'P',
  })

  const { userPlan = [], users, plans, modalities, trainings } = useUserModalityData()

  const students = users.filter((u) => u.role === 'U')
  const filteredPlans = plans.filter((p) => p.id_modality === selectModality)
  const filteredTrainings = trainings.filter((t) => t.id_modality === selectModality)

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  const enrollStudent = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        const res = await api.post('/user-plan', newUserPlan)
        setShowCreateModal(false)
        setPaymentModal(true)
        await new Promise((resolve) => setTimeout(resolve, 10000))
        const paymentBody = {
          id_user_plan: res.data.id_user_plan,
          value: planValue,
        }
        await api.post('/financial-movement', paymentBody)
        toast.success('Pagamento efetuado com sucesso!')
        const userTraining = {
          id_training: trainingId,
          id_user: newUserPlan.id_user,
        }
        await api.post(`/training-user`, userTraining)
        toast.success('Aluno matriculado com sucesso!')
        setPaymentModal(false)
      } catch (error) {
        console.error(error)
        toast.error('O aluno já está inscrito no plano selecionado.')
      }
    },
    [newUserPlan, trainingId]
  )

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="p-8 h-full overflow-auto">
          <h1 className="text-uniporraBlack text-3xl font-bold mb-6 text-center">Matrículas</h1>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-center font-semibold text-uniporraBlack">Aluno</th>
                <th className="py-2 px-4 border-b text-center font-semibold text-uniporraBlack">Plano</th>
                <th className="py-2 px-4 border-b text-center font-semibold text-uniporraBlack">Modalidade</th>
                <th className="py-2 px-4 border-b text-center font-semibold text-uniporraBlack">Data de Início</th>
                <th className="py-2 px-4 border-b text-center font-semibold text-uniporraBlack">Status</th>
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
              {userPlan.length > 0 ? (
                userPlan.map((userPlan) => {
                  const user = users.find((user) => user.id_user === userPlan.id_user)
                  const plan = plans.find((plan) => plan.id_plan === userPlan.id_plan)
                  const modality = modalities.find((modality) => modality.id_modality === plan?.id_modality)
                  return (
                    <tr key={String(userPlan.id_user_plan)} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 border-b text-center text-gray-700">
                        {user ? `${user.first_name} ${user.last_name}` : 'Usuário não encontrado'}
                      </td>
                      <td className="py-3 px-4 border-b text-center text-gray-700">
                        {plan ? plan.name : 'Plano não encontrado'}
                      </td>
                      <td className="py-3 px-4 border-b text-center text-gray-700">
                        {modality?.description || 'Modalidade não encontrada'}
                      </td>
                      <td className="py-3 px-4 border-b text-center text-gray-700">
                        {new Date(userPlan.start_date as string).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-3 px-4 border-b text-center text-gray-700">{getRoleLabel(userPlan.status)}</td>
                      <td className="py-3 px-4 border-b text-center"></td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 px-4 text-center text-gray-500">
                    Nenhuma Inscrição encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </main>
        <CustomModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Matricular Aluno"
          type="register"
          onConfirm={enrollStudent}
        >
          <form className="space-y-4">
            <div>
              <label htmlFor="user" className="block text-sm font-medium text-gray-700">
                Aluno
              </label>
              <select
                id="user"
                onChange={(e) => setNewUserPlan({ ...newUserPlan, id_user: parseInt(e.target.value, 10) || 0 })}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Selecione um Aluno</option>
                {students.map((student) => (
                  <option key={student.id_user} value={student.id_user}>
                    {student.first_name} {student.last_name}
                  </option>
                ))}
              </select>
            </div>
            {/* Modalidade */}
            <div>
              <label htmlFor="modality" className="block text-sm font-medium text-gray-700">
                Modalidade
              </label>
              <select
                id="modality"
                onChange={(e) => setSelectModality(parseInt(e.target.value))}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Selecione uma Modalidade</option>
                {modalities.map((modality) => (
                  <option key={modality.id_modality} value={modality.id_modality}>
                    {modality.description}
                  </option>
                ))}
              </select>
            </div>
            {/* Planos */}
            <div>
              <label htmlFor="plan" className="block text-sm font-medium text-gray-700">
                Plano
              </label>
              <select
                id="plan"
                onChange={(e) => {
                  const planId = parseInt(e.target.value) || 0
                  const selectedPlan = plans.find((plan) => plan.id_plan === planId)
                  setNewUserPlan({ ...newUserPlan, id_plan: planId })
                  setPlanValue(selectedPlan ? selectedPlan.price_cents : 0)
                }}
                required
                disabled={!selectModality}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Selecione um Plano</option>
                {filteredPlans.map((plan) => (
                  <option key={plan.id_plan} value={plan.id_plan}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Treinos */}
            <div>
              <label htmlFor="training" className="block text-sm font-medium text-gray-700">
                Treino
              </label>
              <select
                id="training"
                onChange={(e) => setTrainingId(parseInt(e.target.value) || null)}
                required
                disabled={!selectModality}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Selecione um Treino</option>
                {filteredTrainings.map((training) => (
                  <option key={training.id_training} value={training.id_training}>
                    {training.description}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </CustomModal>
        <CustomModal
          isOpen={paymentModal}
          onClose={() => setPaymentModal(!paymentModal)}
          title="Pagamento"
          type="payment"
          onConfirm={enrollStudent}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <QRCodeSVG value="https://i.ytimg.com/vi/bJpJBTFozQs/maxresdefault.jpg" />
            </div>
            valor: R$ {planValue}
          </div>
        </CustomModal>
      </div>
    </div>
  )
}
