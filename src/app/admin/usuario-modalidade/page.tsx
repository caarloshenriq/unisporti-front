'use client';
import Header from '@/components/Header';
import Sidebar from '@/components/sidebar';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useUserModalityData, getRoleLabel } from './GetData';
import { useState } from 'react';

export default function UserModality() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const { userPlan, users, plans, modalities } = useUserModalityData();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

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
                      (modality) => modality.id_modality === plan?.id_plan
                    );
                    return (
                      <tr key={String(userPlan.id_user_plan)} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 border-b text-center text-gray-700">
                          {user ? `${user.first_name} ${user.last_name}` : 'Usuário não encontrado'}
                        </td>
                        <td className="py-3 px-4 border-b text-center text-gray-700">
                          {plan ? plan.name : 'Plano nao encontrado'}
                        </td>
                        <td className="py-3 px-4 border-b text-center text-gray-700">
                          {modality?.description}
                        </td>
                        <td className="py-3 px-4 border-b text-center text-gray-700">
                          {new Date(userPlan.start_date as string).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="py-3 px-4 border-b text-center text-gray-700">{getRoleLabel(userPlan.status)}</td>
                        <td className="py-3 px-4 border-b text-center">
                          <div className="flex justify-center space-x-4">
                            <span
                              onClick={() => setShowUpdateModal(true)}
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
      </div>
    </div>
  );
}
