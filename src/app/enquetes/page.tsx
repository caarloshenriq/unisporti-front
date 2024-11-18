/* eslint-disable prettier/prettier */
'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/sidebar'
import { useState } from 'react'

export default function Enquetes() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}
      >
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      </div>
    </div>
  )
}
