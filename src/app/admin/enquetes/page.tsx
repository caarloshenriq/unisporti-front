'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/sidebar'
import { Poll } from '@/types/Poll'
import { Question } from '@/types/Question'
import { useState, useCallback } from 'react'
import axios from 'axios' // Biblioteca para fazer as requisições HTTP
import { useRouter } from 'next/navigation'
import { api } from '@/services/ApiClient'

export default function NovoEnquetes() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [poll, setPoll] = useState<Poll>({ name: '', active: true })
  const [options, setOptions] = useState<Question[]>([
    { question: '', id_poll: 0, id_question_type: 1 },
  ])
  const [loading, setLoading] = useState(false) // Estado para mostrar o carregamento
  const [error, setError] = useState<string | null>(null) // Estado para mensagens de erro

  const router = useRouter()

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev)
  }, [])

  const handleOptionChange = useCallback(
    (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
      setOptions((prevOptions) => {
        const newOptions = [...prevOptions]
        newOptions[index] = {
          ...newOptions[index],
          question: event.target.value,
        }
        return newOptions
      })
    },
    []
  )

  const addOption = useCallback(() => {
    setOptions((prevOptions) => [
      ...prevOptions,
      { question: '', id_poll: poll.id_poll || 0, id_question_type: 1 },
    ])
  }, [poll.id_poll])

  const removeOption = useCallback((index: number) => {
    setOptions((prevOptions) => prevOptions.filter((_, i) => i !== index))
  }, [])

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault()
      setLoading(true)
      setError(null) // Resetando erros anteriores

      try {
        // Primeira chamada para criar a enquete
        const pollResponse = await api.post('/poll', {
          name: poll.name,
          active: poll.active,
        })

        const { id_poll } = pollResponse.data // id_poll da resposta

        // Segunda chamada para criar as opções da enquete
        for (const option of options) {
          await api.post('/question', {
            question: option.question,
            id_poll: id_poll, // Associando a opção à enquete criada
            id_question_type: option.id_question_type,
          })
        }

        // Sucesso, redireciona ou mostra mensagem
        router.push('/dashboard') // Redireciona para o dashboard ou outra página de sua escolha
      } catch (err) {
        console.error(err)
        setError('Ocorreu um erro ao criar a enquete. Tente novamente.') // Mensagem de erro
      } finally {
        setLoading(false)
      }
    },
    [poll, options, router]
  )

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}
      >
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Criar Nova Enquete</h1>

          {/* Exibindo mensagem de erro */}
          {error && <div className="mb-4 text-red-500">{error}</div>}

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg space-y-6"
          >
            {/* Título da Enquete */}
            <div className="mb-6">
              <label htmlFor="title" className="block font-semibold text-gray-700 mb-2">
                Título da Enquete
              </label>
              <input
                id="title"
                type="text"
                value={poll.name}
                onChange={(e) => setPoll({ ...poll, name: e.target.value })}
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Digite o título da enquete"
                required
              />
            </div>

            {/* Opções */}
            <div className="mb-6">
              <label className="block font-semibold text-gray-700 mb-2">Opções</label>
              {options.map((option, index) => (
                <div key={index} className="flex items-center mb-4 space-x-4">
                  <input
                    type="text"
                    value={option.question}
                    onChange={(e) => handleOptionChange(index, e)}
                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder={`Opção ${index + 1}`}
                    required
                  />
                  {options.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      Remover
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addOption}
                className="p-4 bg-blue-500 text-white rounded-lg w-full hover:bg-blue-600 transition duration-200"
              >
                Adicionar Opção
              </button>
            </div>

            {/* Botão Criar Enquete */}
            <button
              type="submit"
              className={`w-full p-4 ${loading ? 'bg-gray-400' : 'bg-green-500'} text-white rounded-lg hover:bg-green-600 transition duration-200`}
              disabled={loading} // Desabilita o botão durante o processo de envio
            >
              {loading ? 'Criando...' : 'Criar Enquete'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
