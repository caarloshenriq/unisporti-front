'use client';
import Header from '@/components/Header';
import Sidebar from '@/components/sidebar';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useUserModalityData, getRoleLabel } from './GetData';
import { useCallback, useState } from 'react';
import CustomModal from '@/components/CustomModal';
import { UserPlan } from '@/types/UserPlan';
import { api } from '@/services/ApiClient';
import toast from 'react-hot-toast';

export default function UserModality() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [selectedUserPlan, setSelectedUserPlan] = useState<UserPlan | null>(null)
  const [selectModality, setSelectModality] = useState<number | undefined>(0)
  const [newUserPlan, setNewUserPlan] = useState<UserPlan>(
    {
      id_plan: 0,
      id_user: 0,
      start_date: new Date(),
      status: 'P'
    }
  );
  const { userPlan = [], users, plans, modalities } = useUserModalityData();


  const students = users.filter((u) => u.role === 'U');
  const plan = plans.filter((p) => p.id_modality == selectModality)

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const enrollStudent = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        await api.post(`/api/secure/admin/user-plan`, newUserPlan)
        toast.success('Aluno matriculado com sucesso!')
        setShowCreateModal(false)
      } catch (error) {
        console.error(error)
      }
    },
    [newUserPlan]
  )

  const updateEnroll = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        await api.put(`/api/secure/admin/user-plan`, newUserPlan)
        toast.success('matricula atualizada com sucesso!')
        setShowUpdateModal(false)
      } catch (error) {
        console.error(error)
      }
    },
    [newUserPlan]
  )

  const openEditModal = (userPlan: UserPlan) => {
    setSelectedUserPlan(userPlan)
    const plan = plans.find((plan) => plan.id_plan === userPlan.id_plan);
    const modality = modalities.find(
      (modality) => modality.id_modality === plan?.id_modality
    );
    setSelectModality(modality?.id_modality)
    setShowUpdateModal(true)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}
      >
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="p-8 h-full overflow-auto flex justify-center">
          <div className="w-full max-w-5xl">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-center font-semibold text-gray-700">Aluno</th>
                  <th className="py-2 px-4 border-b text-center font-semibold text-gray-700">Plano</th>
                  <th className="py-2 px-4 border-b text-center font-semibold text-gray-700">Modalidade</th>
                  <th className="py-2 px-4 border-b text-center font-semibold text-gray-700">Data de Início</th>
                  <th className="py-2 px-4 border-b text-center font-semibold text-gray-700">Status</th>
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
                {userPlan.length > 0 ? (
                  userPlan.map((userPlan) => {
                    const user = users.find((user) => user.id_user === userPlan.id_user);
                    const plan = plans.find((plan) => plan.id_plan === userPlan.id_plan);
                    const modality = modalities.find(
                      (modality) => modality.id_modality === plan?.id_modality
                    );
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
                        <td className="py-3 px-4 border-b text-center text-gray-700">
                          {getRoleLabel(userPlan.status)}
                        </td>
                        <td className="py-3 px-4 border-b text-center">
                          <div className="flex justify-center space-x-4">
                            <span
                              onClick={() => openEditModal(userPlan)}
                              className="cursor-pointer text-uniporraGreen1 hover:text-uniporraGreen2"
                              title="Editar"
                            >
                              <FiEdit size={20} />
                            </span>
                            <span
                              onClick={() => setShowDeleteModal(true)}
                              className="cursor-pointer text-red-600 hover:text-red-700"
                              title="Excluir"
                            >
                              <FiTrash size={20} />
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
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
          </div>
        </main>
        <CustomModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(!showCreateModal)}
          title="Matricular Aluno"
          type="register"
          onConfirm={enrollStudent}
        >
          <form className="space-y-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Aluno
                </label>
              <select
                id="user"
                onChange={(e) =>
                  setNewUserPlan({ ...newUserPlan, id_user: parseInt(e.target.value, 10) || 0 })
                }
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
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Modalidade
                </label>
              <select
                id="user"
                onChange={(e) =>
                  setSelectModality(parseInt(e.target.value))
                }
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Selecione um Aluno</option>
                {modalities.map((modality) => (
                  <option key={modality.id_modality} value={modality.id_modality}>
                    {modality.description}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Plano</label>
                <select
                id="user"
                onChange={(e) =>
                  setNewUserPlan({ ...newUserPlan, id_plan: parseInt(e.target.value, 10) || 0 })
                }
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                disabled={!selectModality}
              >
                <option value="">Selecione um plano</option>
                {plan.map((plan) => (
                  <option key={plan.id_plan} value={plan.id_plan}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </CustomModal>

        <CustomModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(!showUpdateModal)}
        title="Editar Matricula"
        type="update"
        onConfirm={updateEnroll}
        >
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Plano</label>
                <select
                id="user"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={selectedUserPlan?.id_plan}
              >
                <option value="">Selecione um plano</option>
                {plan.map((plan) => (
                  <option key={plan.id_plan} value={plan.id_plan}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </div>
        </CustomModal>
      </div>
    </div>
  );
}
