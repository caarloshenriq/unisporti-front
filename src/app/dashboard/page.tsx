'use client'

import Sidebar from '@/components/sidebar'
import { useState } from 'react'
import Header from '@/components/Header'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  return (
    <div className="">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`${sidebarOpen ? 'ml-64' : ''} bg-uniporrabg h-screen flex flex-col`}>
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <div className="flex-grow flex justify-center items-center">
          <img src="logo.png" alt="Logo" className="w-40 h-40" />
        </div>
      </div>
    </div>
  )
}
