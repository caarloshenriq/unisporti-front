'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/sidebar'
import { useCallback, useEffect, useState } from 'react'
import { User } from '@/types/User'
import { api } from '@/services/ApiClient'
import toast from 'react-hot-toast'
import { useRouter, useParams } from 'next/navigation'
import { formatCpf, formatPhone } from '@/utils/Masks'

export default function EditUser() {
  const router = useRouter()
  const { id } = useParams() // Obtenção do ID do usuário a ser editado da URL
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [user, setUser] = useState<User>({
    active: true,
    cpf: '',
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    role: '',
    birth_date: new Date(),
  })

  const [instructorInfo, setInstructorInfo] = useState({
    institution: '',
    degree_name: '',
    start_date: '',
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get(`/api/secure/admin/user/${id}`)
        setUser({
          ...data,
          birth_date: new Date(data.birth_date),
        })
      } catch (error) {
        console.error(error)
        toast.error(`Erro ao carregar os dados do usuário`)
      }
    }

    fetchUser()
  }, [id])

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name === 'birth_date') {
      setUser((prevUser) => ({
        ...prevUser,
        birth_date: new Date(value),
      }))
    } else if (name === 'cpf') {
      setUser((prevUser) => ({ ...prevUser, cpf: formatCpf(value) }))
    } else if (name === 'phone') {
      setUser((prevUser) => ({ ...prevUser, phone: formatPhone(value) }))
    } else {
      setUser((prevUser) => ({ ...prevUser, [name]: value }))
    }
  }

  const handleInstructorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInstructorInfo((prevInfo) => ({ ...prevInfo, [name]: value }))
  }

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        const cleanCpf = user.cpf.replace(/\D/g, '')
        const cleanPhone = user.phone.replace(/\D/g, '')

        const userData = {
          ...user,
          cpf: cleanCpf,
          phone: cleanPhone,
          birthDate: user.birth_date,
        }

        await api.put(`/api/secure/admin/user`, userData)

        toast.success(`Usuário atualizado com sucesso`)
        router.push('/usuarios')
      } catch (error) {
        console.error(error)
        toast.error(`Erro ao atualizar o usuário`)
      }
    },
    [user, instructorInfo, router, id]
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
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Editar Usuário
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Nome</label>
                  <input
                    type="text"
                    name="first_name"
                    value={user.first_name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Sobrenome</label>
                  <input
                    type="text"
                    name="last_name"
                    value={user.last_name}
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
                  <label className="block text-gray-700">
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    name="birth_date"
                    value={
                      user.birth_date instanceof Date &&
                      !isNaN(user.birth_date.getTime())
                        ? user.birth_date.toISOString().split('T')[0]
                        : ''
                    }
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
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
                    <option value="A">Administrador</option>
                    <option value="M">Gerente</option>
                    <option value="I">Instrutor</option>
                    <option value="U">Usuário</option>
                  </select>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none"
                >
                  Atualizar Usuário
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
