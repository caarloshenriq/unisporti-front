'use client'

import { api } from '@/services/ApiClient'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'

export default function Login() {
  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  // Função para aplicar a máscara de CPF
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setCpf(value);
  }

  // Função para remover a máscara de CPF ao enviar
  const removeCpfMask = (value: string) => {
    return value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cpfWithoutMask = removeCpfMask(cpf); // CPF sem máscara
    console.log({ cpf: cpfWithoutMask, password });
    const response = await api.post('api/auth/login', { cpf: cpfWithoutMask, password });
    toast.success('Login realizado com sucesso!');
    router.push('/dashboard');
    localStorage.setItem('token', response.data.token);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
          Entrar
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="cpf"
              className="block text-sm font-medium text-gray-700"
            >
              CPF
            </label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              required
              maxLength={14}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              value={cpf}
              onChange={handleCpfChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
