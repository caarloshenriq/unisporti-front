'use client'

import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import Header from "@/components/Header";
import { FaBell, FaCalendar, FaChartBar } from "react-icons/fa";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  interface Notice {
    id: number;
    title: string;
    date: string;
  }
  
  const notices: Notice[] = [
    { id: 1, title: "Reunião de pais e mestres", date: "2024-09-10" },
    { id: 2, title: "Novo curso de futebol inicia", date: "2024-09-15" },
    { id: 3, title: "Inscrições abertas para torneio de basquete", date: "2024-09-20" },
  ];
  

  return (
    <div className="">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`${sidebarOpen ? 'ml-64' : ''}`}>
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen}/>
        <section className="bg-white p-4">
          <h2 className="text-xl font-semibold mb-4">Avisos</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {notices.map((notice) => (
                <tr key={notice.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{notice.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notice.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className=" p-4">
          <h2 className="text-xl font-semibold mb-4">Estatísticas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg shadow-md hover:bg-blue-200 hover:cursor-pointer">
              <h3 className="text-lg font-semibold mb-2"><FaCalendar className="inline mr-2" /> Próximos Eventos</h3>
              <ul>
                <li>Evento de futebol - 2024-09-12</li>
                <li>Campeonato de basquete - 2024-09-18</li>
              </ul>
            </div>
            <div className="bg-green-100 p-4 rounded-lg shadow-md hover:bg-green-200 hover:cursor-pointer">
              <h3 className="text-lg font-semibold mb-2"><FaChartBar className="inline mr-2" /> Desempenho do Aluno</h3>
              <p>Gráfico de desempenho será exibido aqui.</p>
              {/* Você pode adicionar um gráfico aqui com uma biblioteca como Chart.js ou Recharts */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
