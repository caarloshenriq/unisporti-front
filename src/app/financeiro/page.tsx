'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/sidebar'
import { api } from '@/services/ApiClient'
import { myPayments } from '@/types/MyPayments'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Registre os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Financeiro() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [myPayments, setMyPayments] = useState<myPayments[]>([])

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  useEffect(() => {
    try {
      const fetchMyPayments = async () => {
        const res = await api.get('financial-movement/my-payments')
        setMyPayments(res.data)
      }
      fetchMyPayments()
    } catch (error) {
      console.error('Erro ao buscar os pagamentos:', error)
    }
  }, [])

  // Prepare os dados para o gráfico
  const data = {
    labels: myPayments.map((payment) => format(new Date(payment.date_time_payment), 'dd/MM/yyyy')),
    datasets: [
      {
        label: 'Valor dos Pagamentos (R$)',
        data: myPayments.map((payment) => payment.value),
        backgroundColor: '#8884d8',
        borderColor: '#8884d8',
        borderWidth: 1,
      },
    ],
  }

  // Configurações do gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `R$ ${tooltipItem.raw.toFixed(2)}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}
      >
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Mensalidades</h2>

          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Valor (R$)</th>
                <th className="py-2 px-4 border-b">Plano</th>
                <th className="py-2 px-4 border-b">Modalidade</th>
                <th className="py-2 px-4 border-b">Data do Pagamento</th>
              </tr>
            </thead>
            <tbody>
              {myPayments.map((payment) => (
                <tr key={payment.id_financial_payment} className="text-center">
                  <td className="py-2 px-4 border-b">{payment.value.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">{payment.plan_name}</td>
                  <td className="py-2 px-4 border-b">{payment.modality_name}</td>
                  <td className="py-2 px-4 border-b">{format(new Date(payment.date_time_payment), 'dd/MM/yyyy')}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Gráfico */}
          <div className="mt-6">
            <Bar data={data} options={options} height={50} width={100} />
          </div>
        </div>
      </div>
    </div>
  )
}
