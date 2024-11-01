'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { useState } from 'react'

export default function Attendance() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  const students = [
    { id: 1, name: 'Carlos Henrique' },
    { id: 2, name: 'Leonardo Zucco' },
    { id: 3, name: 'Pedro Ayres' },
    { id: 4, name: 'Tiago Carvalho' },
    { id: 5, name: 'Vinicius Ledesma' },
    { id: 6, name: "Kaio d'elaqua" },
    { id: 7, name: 'Felipe negrelle' },
    { id: 8, name: 'Arthur petry' },
  ]

  const [attendance, setAttendance] = useState<{
    [key: number]: { lesson1: boolean; lesson2: boolean; lesson3: boolean }
  }>({})

  const handleCheckboxChange = (
    studentId: number,
    lesson: 'lesson1' | 'lesson2' | 'lesson3'
  ) => {
    setAttendance((prevState) => ({
      ...prevState,
      [studentId]: {
        ...prevState[studentId],
        [lesson]: !prevState[studentId]?.[lesson],
      },
    }))
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}
      >
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="p-8">
          <h1 className="text-3xl font-bold mb-6">Registrar Chamada</h1>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b">Nome do Aluno</th>
                <th className="py-3 px-4 border-b">Aula 1</th>
                <th className="py-3 px-4 border-b">Aula 2</th>
                <th className="py-3 px-4 border-b">Aula 3</th>
              </tr>
            </thead>
            <tbody>
              {students
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((student) => (
                  <tr key={student.id}>
                    <td className="py-3 px-4 border-b">{student.name}</td>
                    <td className="py-3 px-4 border-b text-center">
                      <input
                        type="checkbox"
                        checked={attendance[student.id]?.lesson1 || false}
                        onChange={() =>
                          handleCheckboxChange(student.id, 'lesson1')
                        }
                      />
                    </td>
                    <td className="py-3 px-4 border-b text-center">
                      <input
                        type="checkbox"
                        checked={attendance[student.id]?.lesson2 || false}
                        onChange={() =>
                          handleCheckboxChange(student.id, 'lesson2')
                        }
                      />
                    </td>
                    <td className="py-3 px-4 border-b text-center">
                      <input
                        type="checkbox"
                        checked={attendance[student.id]?.lesson3 || false}
                        onChange={() =>
                          handleCheckboxChange(student.id, 'lesson3')
                        }
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  )
}
