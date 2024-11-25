'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/sidebar'
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
    active: true,
    cpf: '',
    email: '',
    first_name: '', // Mudou de firstName para first_name
    last_name: '', // Mudou de lastName para last_name
    phone: '',
    role: '',
    birth_date: new Date(), // Mudou de birthDate para birth_date
  })

  const [instructorInfo, setInstructorInfo] = useState({
    education_institution: '',
    degree_name: '', // Mudou de degreeName para degree_name
    start_date: '', // Mudou de startDate para start_date
  })

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
          password: cleanCpf,
          birthDate: user.birth_date,
        }
        const res = await api.post(`/user`, userData)
        console.log(res.data)
        if (user.role === 'I') {
          const instructorData = {
            ...instructorInfo,
            id_user: res.data.id_user,
            active: true,
          }
          await api.post(`/instructor`, instructorData)
        }
        toast.success(`Usuário criado com sucesso`)
        router.push('/usuarios')
      } catch (error) {
        console.error(error)
        toast.error(`Erro ao criar o usuário`)
      }
    },
    [user, instructorInfo, router]
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
              Novo Usuário
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Nome</label>
                  <input
                    type="text"
                    name="first_name" // Mudou de firstName para first_name
                    value={user.first_name} // Mudou de firstName para first_name
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Sobrenome</label>
                  <input
                    type="text"
                    name="last_name" // Mudou de lastName para last_name
                    value={user.last_name} // Mudou de lastName para last_name
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
                    <option value="U">Aluno</option>
                  </select>
                </div>
              </div>

              {user.role === 'I' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700">
                      Instituição de Ensino
                    </label>
                    <input
                      type="text"
                      name="education_institution" // Corrigido para education_institution
                      value={instructorInfo.education_institution}
                      onChange={handleInstructorChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Nome do Curso</label>
                    <input
                      type="text"
                      name="degree_name" // Mudou de degreeName para degree_name
                      value={instructorInfo.degree_name} // Mudou de degreeName para degree_name
                      onChange={handleInstructorChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">
                      Data de Início
                    </label>
                    <input
                      type="date"
                      name="start_date" // Mudou de startDate para start_date
                      value={instructorInfo.start_date} // Mudou de startDate para start_date
                      onChange={handleInstructorChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none"
              >
                Criar Usuário
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
