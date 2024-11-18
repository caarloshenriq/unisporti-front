'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { useCallback, useState } from 'react'
import { User } from '@/types/User'
import { api } from '@/services/ApiClient'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { formatCpf, formatPhone } from '@/utils/Masks'

export default function NewUser() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [user, setUser] = useState<User>({
    active: false,
    cpf: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: '',
    birthDate: new Date(),
  })

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setUser((prevUser) => ({
      ...prevUser,
      [name]: name === 'cpf' ? formatCpf(value) : name === 'phone' ? formatPhone(value) : value,
    }))
  }

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        console.log(user)
        // await api.post(`/api/secure/admin/user`, user)
        toast.success(`Usuário criado com sucesso`)
        router.push('/lugares')
      } catch (error) {
        console.error(error)
        toast.error(`Erro ao criar o usuário`)
      }
    },
    [user, router]
  )

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}
      >
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="flex justify-center items-center h-full p-4 sm:p-8">
          <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 sm:p-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Novo Usuário</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Nome</label>
                  <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Sobrenome</label>
                  <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">CPF</label>
                  <input
                    type="text"
                    name="cpf"
                    value={user.cpf}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                    required
                    maxLength={14}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Telefone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                    maxLength={15}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Função</label>
                  <select
                    name="role"
                    value={user.role}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                    required
                  >
                    <option value="">Selecione uma função</option>
                    <option value="ROLE_ADMIN">Administrador</option>
                    <option value="ROLE_MANAGER">Gerente</option>
                    <option value="ROLE_INSTRUCTOR">Instrutor</option>
                    <option value="ROLE_USER">Usuário</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white font-bold py-3 rounded-md hover:bg-green-700 transition duration-200"
              >
                Cadastrar
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
