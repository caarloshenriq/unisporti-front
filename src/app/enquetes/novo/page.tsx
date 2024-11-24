/* eslint-disable prettier/prettier */
'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/sidebar'
import { Poll } from '@/types/Poll'
import { Question } from '@/types/Question'
import { useState, useCallback } from 'react'
import { createPoll } from './CreatePoll'

export default function NovoEnquetes() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [poll, setPoll] = useState<Poll>({ name: '', active: true })
  const [options, setOptions] = useState<Question[]>([
    { question: '', id_poll: 0, id_question_type: 1 },
  ])

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
    (event: React.FormEvent) => {
      event.preventDefault()
      createPoll(poll, options)
    },
    [poll, options]
  )

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}
      >
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <h1 className="text-2xl font-semibold mb-4">Criar Nova Enquete</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md"
        >
          <div className="mb-4">
            <label htmlFor="title" className="block font-semibold mb-2">
              Título da Enquete
            </label>
            <input
              id="title"
              type="text"
              value={poll.name}
              onChange={(e) => setPoll({ ...poll, name: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Digite o título da enquete"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Opções</label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={option.question}
                  onChange={(e) => handleOptionChange(index, e)}
                  className="w-full p-2 border rounded"
                  placeholder={`Opção ${index + 1}`}
                  required
                />
                {options.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="ml-2 p-2 bg-red-500 text-white rounded"
                  >
                    Remover
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="mt-2 p-2 bg-blue-500 text-white rounded"
            >
              Adicionar Opção
            </button>
          </div>
          <button type="submit" className="p-2 bg-green-500 text-white rounded">
            Criar Enquete
          </button>
        </form>
      </div>
    </div>
  )
}
