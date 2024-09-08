import { FC } from 'react';
import { FaTimes } from 'react-icons/fa';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-uniporraGreen3 text-white w-64 transform ${
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
          <li>
            <a href="/dashboard" className="block py-2 px-4 hover:bg-uniporraGreen2 rounded">Início</a>
          </li>
          <li>
            <a href="#modalidades" className="block py-2 px-4 hover:bg-uniporraGreen2 rounded">Minhas modalidades</a>
          </li>
          <li>
            <a href="#sobre" className="block py-2 px-4 hover:bg-uniporraGreen2 rounded">Sobre</a>
          </li>
          <li>
            <a href="#contact" className="block py-2 px-4 hover:bg-uniporraGreen2 rounded">Contato</a>
          </li>
          <li>
            <a href="/login" className="block bg-white text-uniporraGreen3 py-2 px-4 rounded-lg hover:bg-uniporraGreen2 hover:text-white transition-all">Entrar</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;