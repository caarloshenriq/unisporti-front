'use client'

import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className="bg-uniporraGreen3 text-white py-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <h1 className="text-3xl font-bold">Unisporti</h1>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>
        <nav
          className={`md:flex md:items-center ${isOpen ? 'block' : 'hidden'}`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 items-center">
            <li>
              <a
                href="#home"
                className="block py-2 px-4 hover:text-uniporraGreen2"
              >
                Início
              </a>
            </li>
            <li>
              <a
                href="#modalidades"
                className="block py-2 px-4 hover:text-uniporraGreen2"
              >
                Modalidades
              </a>
            </li>
            <li>
              <a
                href="#sobre"
                className="block py-2 px-4 hover:text-uniporraGreen2"
              >
                Sobre
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="block py-2 px-4 hover:text-uniporraGreen2"
              >
                Contato
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="block bg-white text-uniporraGreen3 px-4 py-2 rounded-lg hover:bg-uniporraGreen2 hover:text-white transition-all"
              >
                Entrar
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

const HomeSection = () => {
  return (
    <section id="home" className="bg-uniporra2 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-uniporra">
          Bem-vindo à Unisport
        </h2>
        <p className="text-lg mb-8 text-uniporraBlack">
          A Unisport é a sua escola de esportes de referência, com professores
          altamente qualificados e cursos de alta qualidade. Venha aprimorar
          suas habilidades esportivas e alcançar seus objetivos com o melhor em
          treinamento e suporte.
        </p>
        <a
          href="#modalidades"
          className="bg-uniporra text-white py-3 px-6 rounded-full hover:bg-uniporraGreen1 transition-all"
        >
          Ver planos
        </a>
      </div>
    </section>
  )
}

const Modality = () => {
  return (
    <section id="modalidades" className="py-20 bg-uniporraBlack">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-12 text-uniporra">
          Nossas Principais Modalidades
        </h3>
        <div className="grid gap-10 md:grid-cols-3">
          {['Futebol', 'Basquete', 'Natação', 'Vôlei', 'Artes Marciais'].map(
            (modality) => (
              <div
                key={modality}
                className="bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105"
              >
                <h4 className="text-2xl font-bold mb-4 text-uniporra">
                  {modality}
                </h4>
                <p className="text-uniporraBlack">
                  Aprimore suas habilidades com nossos treinadores
                  especializados.
                </p>
              </div>
            )
          )}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h4 className="text-2xl font-bold mb-4 text-uniporra">
              Conhecer Mais
            </h4>
            <p className="text-uniporraBlack">
              Saiba mais sobre todas as nossas modalidades e encontre a que mais
              combina com você.
            </p>
            <a
              href="#more"
              className="mt-4 inline-block bg-uniporra text-white py-2 px-4 rounded-full hover:bg-uniporraGreen1 transition-all"
            >
              Descubra Mais
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-uniporraBlack">
      <div className="container mx-auto text-center text-white">
        <h3 className="text-3xl font-bold mb-6 text-uniporra">Contato</h3>
        <p className="text-lg mb-8">
          Se você tiver alguma dúvida ou quiser mais informações, entre em
          contato conosco. Estamos aqui para ajudar!
        </p>
        <form className="max-w-lg mx-auto text-white">
          <div className="mb-4">
            <label className="block text-left mb-2" htmlFor="name">
              Nome
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-uniporraGray rounded-lg"
              placeholder="Seu nome"
            />
          </div>
          <div className="mb-4">
            <label className="block text-left mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-uniporraGray rounded-lg"
              placeholder="Seu email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-left mb-2" htmlFor="message">
              Mensagem
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-2 border border-uniporraGray rounded-lg"
              placeholder="Sua mensagem"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-uniporra text-white py-2 px-6 rounded-full hover:bg-uniporraGreen1 transition-all"
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  )
}

const About = () => {
  return (
    <section id="sobre" className="py-20 bg-uniporra2">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-6 text-uniporra">Sobre Nós</h3>
        <p className="text-lg mb-8 text-uniporraBlack">
          A Unisport é uma instituição dedicada ao desenvolvimento de atletas e
          entusiastas do esporte. Com uma equipe de profissionais altamente
          qualificados e um ambiente de aprendizagem estimulante, oferecemos
          programas personalizados para atender às necessidades de cada aluno.
        </p>
        <p className="text-lg text-uniporraBlack">
          Nosso objetivo é proporcionar uma experiência esportiva enriquecedora
          e ajudar nossos alunos a atingir seu potencial máximo.
        </p>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="bg-uniporraGreen3 text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Unisporti. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

const LandingPage = () => {
  return (
    <div>
      <Header />
      <HomeSection />
      <Modality />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}

export default LandingPage
