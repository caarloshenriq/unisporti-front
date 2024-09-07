const Header = () => {
  return (
    <header className="bg-uniporraGreen3 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">Unisporti</h1>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li><a href="#home" className="hover:text-uniporraGreen2">Início</a></li>
            <li><a href="#about" className="hover:text-uniporraGreen2">Modalidades</a></li>
            <li><a href="#services" className="hover:text-uniporraGreen2">Sobre</a></li>
            <li><a href="#contact" className="hover:text-uniporraGreen2">Contato</a></li>
            <li className="relative">
              <a href='/login' className="bg-white text-uniporraGreen3 px-4 py-2 rounded-lg hover:bg-uniporraGreen2 hover:text-white transition-all">Entrar</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const HomeSection = () => {
  return (
    <section id="home" className="bg-uniporra2 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-uniporra">Bem-vindo à Unisport</h2>
        <p className="text-lg mb-8 text-uniporraBlack">
          A Unisport é a sua escola de esportes de referência, com professores altamente qualificados 
          e cursos de alta qualidade. Venha aprimorar suas habilidades esportivas e alcançar seus 
          objetivos com o melhor em treinamento e suporte.
        </p>
        <a href="#services" className="bg-uniporra text-white py-3 px-6 rounded-full hover:bg-uniporraGreen1 transition-all">
          Ver planos
        </a>
      </div>
    </section>
  );
};

const Modality = () => {
  return (
    <section id="services" className="py-20 bg-uniporraBlack">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-12 text-uniporra">Nossas Principais Modalidades</h3>
        <div className="grid md:grid-cols-3 gap-10">
          {["Futebol", "Basquete", "Natação", "Vôlei", "Artes Marciais"].map((modality) => (
            <div key={modality} className="bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105">
              <h4 className="text-2xl font-bold mb-4 text-uniporra">{modality}</h4>
              <p className="text-uniporraBlack">Aprimore suas habilidades com nossos treinadores especializados.</p>
            </div>
          ))}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h4 className="text-2xl font-bold mb-4 text-uniporra">Conhecer Mais</h4>
            <p className="text-uniporraBlack">Saiba mais sobre todas as nossas modalidades e encontre a que mais combina com você.</p>
            <a href="#more" className="mt-4 inline-block bg-uniporra text-white py-2 px-4 rounded-full hover:bg-uniporraGreen1 transition-all">Descubra Mais</a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-uniporraBlack text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Unisporti. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

const LandingPage = () => {
  return (
    <div>
      <Header />
      <HomeSection />
      <Modality />
      <Footer />
    </div>
  );
};

export default LandingPage;