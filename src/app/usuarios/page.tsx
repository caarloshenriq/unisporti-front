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
        const response = await api.get(`/api/secure/admin/user`)
        setUsers(response.data)
      } catch (error) {
        console.error(error)
        toast.error('Erro ao carregar os usuários')
      }
    }
    fetchUsers()
  }, [users])

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
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Nome</th>
                  <th className="py-2 px-4 border-b text-left">CPF</th>
                  <th className="py-2 px-4 border-b text-left">Email</th>
                  <th className="py-2 px-4 border-b text-left">Telefone</th>
                  <th className="py-2 px-4 border-b text-left">Função</th>
                  <th className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => router.push('/usuarios/novo')}
                      className="bg-uniporraGreen3 text-white px-4 py-2 rounded-lg hover:bg-uniporraGreen2 transition-colors"
                    >
                      Novo
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id_user}>
                    <td className="py-2 px-4 border-b">{`${user.first_name} ${user.last_name}`}</td>
                    <td className="py-2 px-4 border-b">
                      {formatCpf(user.cpf)}
                    </td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">
                      {formatPhone(user.phone)}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {getRoleLabel(user.role)}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <div className="flex justify-center items-center space-x-4">
                        <span
                          onClick={() =>
                            router.push(`/usuarios/${user.id_user}`)
                          }
                          className="cursor-pointer text-uniporraGreen1 hover:text-uniporraGreen2"
                          title="Editar"
                        >
                          <FiEdit size={20} />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
