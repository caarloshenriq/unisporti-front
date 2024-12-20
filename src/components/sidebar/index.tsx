import { FC } from 'react'
import { FaTimes } from 'react-icons/fa'
import { routes } from './Routes'
import { jwtDecode } from 'jwt-decode'
import { JwtPayload } from '@/types/Jwt'
import { parseCookies } from 'nookies'
interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
}

const Sidebar: FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const userPermissions: JwtPayload = jwtDecode(parseCookies().token)
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-uniporraGreen1 text-white w-64 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-100 ease-in-out`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 text-white focus:outline-none"
      >
        <FaTimes className="w-6 h-6" />
      </button>
      <nav className="mt-16">
        <ul className="flex flex-col space-y-4 px-4">
          <li className="font-bold">
            <a
              href="/dashboard"
              className="block py-2 px-4 border-b border-white relative overflow-hidden"
            >
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 transform hover:w-full"></span>
              Início
            </a>
          </li>
          {routes.map(({ path, label, permission }) => {
            const hasPermission =
              typeof permission === 'string'
                ? userPermissions.role.includes(permission)
                : permission.some((perm) => userPermissions.role.includes(perm))

            return (
              hasPermission && (
                <li key={path} className="font-bold">
                  <a
                    href={path}
                    className="block py-2 px-4 border-b border-white relative overflow-hidden"
                  >
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 transform hover:w-full"></span>
                    {label}
                  </a>
                </li>
              )
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
