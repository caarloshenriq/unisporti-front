'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { useState } from 'react'

export default function RegisterClass() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [classTitle, setClassTitle] = useState<string>('')
  const [classDescription, setClassDescription] = useState<string>('')
  const [classFiles, setClassFiles] = useState<FileList | null>(null)

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  // Função de submissão do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', classTitle)
    formData.append('description', classDescription)

    if (classFiles) {
      Array.from(classFiles).forEach((file) => formData.append('files', file))
    }

    // Aqui você pode adicionar a lógica para enviar os dados para o servidor
    console.log('Dados da Aula:', {
      title: classTitle,
      description: classDescription,
      files: classFiles,
    })
    alert('Aula registrada com sucesso!')

    setClassTitle('')
    setClassDescription('')
    setClassFiles(null)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}
      >
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="flex items-center justify-center h-full p-8">
          <div className="bg-white p-10 shadow-lg rounded-lg max-w-lg w-full">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Registrar Aula
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-lg font-semibold mb-2"
                  htmlFor="classTitle"
                >
                  Título da Aula:
                </label>
                <input
                  type="text"
                  id="classTitle"
                  value={classTitle}
                  onChange={(e) => setClassTitle(e.target.value)}
                  className="w-full border-gray-300 border rounded-md p-2"
                  placeholder="Digite o título da aula"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-lg font-semibold mb-2"
                  htmlFor="classDescription"
                >
                  Descrição da Aula:
                </label>
                <textarea
                  id="classDescription"
                  value={classDescription}
                  onChange={(e) => setClassDescription(e.target.value)}
                  className="w-full border-gray-300 border rounded-md p-2"
                  rows={5}
                  placeholder="Digite a descrição da aula"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-lg font-semibold mb-2"
                  htmlFor="classFiles"
                >
                  Arquivos:
                </label>
                <input
                  type="file"
                  id="classFiles"
                  onChange={(e) => setClassFiles(e.target.files)}
                  className="w-full border-gray-300 border rounded-md p-2"
                  multiple
                />
              </div>

              <button
                type="submit"
                className="w-full bg-uniporraGreen2 text-white font-semibold rounded-md px-4 py-2 transition-colors"
              >
                Registrar Aula
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
