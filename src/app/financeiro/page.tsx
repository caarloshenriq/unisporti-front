'use client'

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function Financeiro(){
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
      };
      const dadosMensalidades = [
        { mes: "04/2024", valor: 200.00, status: true },
        { mes: "05/2024", valor: 200.00, status: true },
        { mes: "06/2024", valor: 200.00, status: true },
        { mes: "07/2024", valor: 200.00, status: true },
        { mes: "08/2024", valor: 200.00, status: true },
        { mes: "09/2024", valor: 200.00, status: false },
        { mes: "10/2024", valor: 200.00, status: false },
        { mes: "11/2024", valor: 200.00, status: false },
        { mes: "12/2024", valor: 200.00, status: false },
      ];
    return(
        <div className="flex h-screen bg-gray-100">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
          <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Mensalidades</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Mês</th>
                <th className="py-2 px-4 border-b">Valor (R$)</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {dadosMensalidades.map((mensalidade, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border-b">{mensalidade.mes}</td>
                  <td className="py-2 px-4 border-b">{mensalidade.valor.toFixed(2)}</td>
                  <td className={`py-2 px-4 border-b ${mensalidade.status === true ? 'text-green-600' : 'text-red-600'}`}>
                    {mensalidade.status? 'Pago' : 'Pendente'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
        </div>)
}