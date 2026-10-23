import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/home/Hero';
import { FilterBar } from '../components/home/FilterBar';
import { FeaturedProperties } from '../components/home/FeaturedProperties';

export function Home() {
  return (
    
    <div className="bg-[#F8F8F8] min-h-screen font-sans text-[#1A1A1A] antialiased">
      <Navbar />
      <Hero />
      <FilterBar />
      <FeaturedProperties />


      {/* SOBRE NOSOTROS Y CONTACTO DIRECTO (Réplica exacta de la maqueta) */}
      <section id="nosotros" className="max-w-6xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white p-6 sm:p-10 rounded-2xl border border-gray-200 shadow-sm">
          
          {/* Texto Sobre Nosotros */}
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1A1A1A] mb-3 uppercase tracking-wider">
              SOBRE NOSOTROS
            </h2>
            <div className="flex gap-4 items-start">
              <p className="text-gray-600 text-xs font-normal leading-relaxed flex-1">
                Marianne Houses es compromiso con la excelencia, el lujo y la firmeza que La Habana requiere. Nos especializamos en residencias independientes, casas coloniales y mansiones exclusivas, garantizando discreción y máxima confidencialidad en cada transacción.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80" 
                alt="Marianne Houses Nos" 
                className="w-28 h-20 object-cover rounded-lg shadow-sm border border-gray-100 flex-shrink-0"
              />
            </div>
          </div>

          {/* Formulario Directo de Contacto */}
          <div id="contacto" className="bg-white p-2 rounded-xl">
            <h3 className="font-bold text-xs text-gray-800 mb-3">
              Directo de contacto
            </h3>
            <form onSubmit={(e) => { e.preventDefault(); alert('Solicitud de información enviada correctamente.'); }} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input 
                  type="text" 
                  placeholder="Name" 
                  required 
                  className="w-full h-9 px-3 bg-white border border-gray-300 rounded text-xs focus:outline-none focus:border-[#C9A961]"
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  required 
                  className="w-full h-9 px-3 bg-white border border-gray-300 rounded text-xs focus:outline-none focus:border-[#C9A961]"
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Solicitara información" 
                  required 
                  className="w-full h-14 px-3 bg-white border border-gray-300 rounded text-xs focus:outline-none focus:border-[#C9A961]"
                />
              </div>
              <button 
                type="submit"
                className="w-full h-10 bg-gradient-to-r from-[#D4AF37] to-[#C9A961] hover:brightness-105 text-black font-extrabold text-xs uppercase tracking-wider rounded transition-all shadow-sm"
              >
                SOLICITAR INFORMACIÓN
              </button>
            </form>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}