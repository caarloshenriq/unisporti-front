'use client'

import { jwtDecode, JwtPayload } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { FaBars, FaCaretDown, FaCaretUp } from 'react-icons/fa'
import {parseCookies, destroyCookie} from 'nookies'

interface HeaderProps {
  toggleSidebar: () => void
  sidebarOpen: boolean
}

const Header: FC<HeaderProps> = ({ toggleSidebar, sidebarOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const router = useRouter()

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev)
  }
  const decoded: JwtPayload = jwtDecode(parseCookies().token)

  return (
    <header className="bg-uniporraGreen3 text-white py-4 flex items-center justify-between px-4 relative">
      <button onClick={toggleSidebar} className="text-white focus:outline-none">
        {!sidebarOpen && <FaBars className="w-6 h-6 ml-4" />}
      </button>
      <h1
        className="text-2xl font-bold hover:cursor-pointer"
        onClick={() => router.push('/dashboard')}
      >
        Unisporti
      </h1>
      <div className="relative">
        <button
          onClick={handleDropdownToggle}
          className="flex items-center text-white px-4 py-2 rounded-lg focus:outline-none transition-colors duration-300"
        >
          {decoded.sub}
          <div className={`ml-2 transition-transform duration-300 ease-in-out`}>
            {dropdownOpen ? <FaCaretUp /> : <FaCaretDown />}
          </div>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white text-uniporraGreen3 rounded-lg shadow-lg w-48 hover:bg-green-50">
            <button
              onClick={() => {
                destroyCookie(null, 'token')
                router.push('/login')
              }}
              className="block w-full text-left px-4 py-2"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
