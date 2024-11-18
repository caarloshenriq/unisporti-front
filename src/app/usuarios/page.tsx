'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { useEffect, useState } from 'react'
import { User } from '@/types/User'
import { api } from '@/services/ApiClient'
import toast from 'react-hot-toast'
import { formatCpf, formatPhone } from '@/utils/Masks'

export default function UserList() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [users, setUsers] = useState<User[]>([])

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  useEffect(() => {
    // Carregar a lista de usuários ao montar o componente
    const fetchUsers = async () => {
      try {
        // const response = await api.get(`/api/secure/admin/users`)
        // setUsers(response.data)
      } catch (error) {
        console.error(error)
        toast.error('Erro ao carregar os usuários')
      }
    }
    fetchUsers()
  }, [])

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}
      >
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="flex flex-col items-center h-full p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Lista de Usuários</h1>
          <div className="overflow-x-auto w-full max-w-4xl">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Nome</th>
                  <th className="py-2 px-4 border-b text-left">CPF</th>
                  <th className="py-2 px-4 border-b text-left">Email</th>
                  <th className="py-2 px-4 border-b text-left">Telefone</th>
                  <th className="py-2 px-4 border-b text-left">Função</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border-b">{`${user.firstName} ${user.lastName}`}</td>
                    <td className="py-2 px-4 border-b">{formatCpf(user.cpf)}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{formatPhone(user.phone)}</td>
                    <td className="py-2 px-4 border-b">{user.role}</td>
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
