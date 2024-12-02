'use client'

import Sidebar from '@/components/sidebar'
import { useState } from 'react'
import Header from '@/components/Header'
import { FaCalendar } from 'react-icons/fa'
import Link from 'next/link'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)
  // console.log(localStorage.getItem('token'))
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }


  return (
    <div className="">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`${sidebarOpen ? 'ml-64' : ''}`}>
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        
      </div>
    </div>
  )
}
