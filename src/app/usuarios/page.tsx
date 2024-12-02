'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/sidebar'
import { useEffect, useState } from 'react'
import { User } from '@/types/User'
import { api } from '@/services/ApiClient'
import toast from 'react-hot-toast'
import { formatCpf, formatPhone } from '@/utils/Masks'
import { FiEdit } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

export default function UserList() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [users, setUsers] = useState<User[]>([])
  const router = useRouter()

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(`/user`)
        setUsers(response.data)
      } catch (error) {
        console.error(error)
        toast.error('Erro ao carregar os usuários')
      }
    }
    fetchUsers()
  }, [])

  function getRoleLabel(role: string) {
    switch (role) {
      case 'A':
        return 'Administrador'
      case 'M':
        return 'Gerente'
      case 'I':
        return 'Instrutor'
      case 'U':
        return 'Aluno'
      default:
        return 'Desconhecido'
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}
      >
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="flex flex-col items-center h-full p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Lista de Usuários
          </h1>
          <div className="w-full overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-center font-semibold text-uniporraBlack">Nome</th>
                  <th className="py-2 px-4 border-b text-center font-semibold text-uniporraBlack">CPF</th>
                  <th className="py-2 px-4 border-b text-center font-semibold text-uniporraBlack">Email</th>
                  <th className="py-2 px-4 border-b text-center font-semibold text-uniporraBlack">Telefone</th>
                  <th className="py-2 px-4 border-b text-center font-semibold text-uniporraBlack">Função</th>
                  <th className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => router.push('/usuarios/novo')}
                      className="bg-uniporraGreen1 px-4 py-2 rounded-lg hover:bg-slate-500 transition-colors text-white"
                    >
                      Novo
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id_user} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 border-b text-center">{`${user.first_name} ${user.last_name}`}</td>
                      <td className="py-3 px-4 border-b text-center">{formatCpf(user.cpf)}</td>
                      <td className="py-3 px-4 border-b text-center">{user.email}</td>
                      <td className="py-3 px-4 border-b text-center">{formatPhone(user.phone)}</td>
                      <td className="py-3 px-4 border-b text-center">{getRoleLabel(user.role)}</td>
                      <td className="py-3 px-4 border-b text-center">
                        <div className="flex justify-center items-center space-x-4">
                          <span
                            onClick={() => router.push(`/usuarios/${user.id_user}`)}
                            className="cursor-pointer text-uniporraGreen1 hover:text-uniporraGreen2"
                            title="Editar"
                          >
                            <FiEdit size={20} />
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-4 px-4 text-center text-gray-500">
                      Nenhum usuário encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
