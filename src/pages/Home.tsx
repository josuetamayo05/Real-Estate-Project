import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/home/Hero';
import { FilterBar } from '../components/home/FilterBar';
import { FeaturedProperties } from '../components/home/FeaturedProperties';
import { SEO } from '../components/seo/SEO';
import { ContactForm } from '../components/common/ContactForm';
import { optimizeImage } from '../lib/cloudinary';

const ABOUT_BG =
  'https://res.cloudinary.com/fscqxubu/image/upload/v1794115592/properties/casa-14/rh5sktqg4p4pelgwgpnx.jpg';


export function Home() {
  return (
    <div className="bg-[#F8F8F8] min-h-screen font-sans text-[#1A1A1A] antialiased">
      <SEO />
      <Navbar />
      <Hero />
      <FilterBar />
      <FeaturedProperties />

      {/* SOBRE NOSOTROS Y CONTACTO DIRECTO */}
      <section id="nosotros" className="max-w-6xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-2xl border border-gray-200 shadow-sm">

          {/* Sobre Nosotros (fondo negro con el logo, como la marca) */}
          <div className="relative bg-[#0A0A0A] text-white p-8 sm:p-12 flex flex-col justify-center overflow-hidden">
            {/* Fondo: foto real del catálogo (casa-14, jardín) con degradado oscuro encima */}
            <img
              src={optimizeImage(ABOUT_BG, 1200)}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/50 to-black/25" />
            <div className="relative">
            <img
              src="/icon-192.png"
              alt="Marianne Houses"
              className="w-16 h-16 rounded-lg mb-6"
              loading="lazy"
            />
            <p className="text-[#C9A961] text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] mb-2">
              Sobre nosotros
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-4">
              Su hogar en La Habana, con total confianza
            </h2>
            <p className="text-gray-300 text-sm font-light leading-relaxed">
              Marianne Houses es compromiso con la excelencia, el lujo y la firmeza que La Habana requiere. Nos especializamos en residencias independientes, casas coloniales y mansiones exclusivas, garantizando discreción y máxima confidencialidad en cada transacción.
            </p>
            </div>
          </div>

          {/* Formulario de contacto (abre WhatsApp) */}
          <div id="contacto" className="bg-white p-8 sm:p-12">
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-1">
              Contacto directo
            </h3>
            <p className="text-xs text-gray-500 mb-5">
              Cuéntenos qué busca y le responderemos personalmente.
            </p>
            <ContactForm />
          </div>

        </div>
      </section>
      <Footer />
    </div>
  );
}
