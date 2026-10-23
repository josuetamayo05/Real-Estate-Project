import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export function About() {
  return (
    <div className="bg-[#F8F8F8] min-h-screen font-sans text-[#1A1A1A]">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 pt-32 pb-20">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-center mb-4">SOBRE MARIANNE HOUSES</h1>
        <p className="text-xs text-[#C9A961] text-center font-bold uppercase tracking-widest mb-10">Liderazgo Inmobiliario de Alto Nivel en La Habana</p>
        
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6 text-gray-600 text-xs sm:text-sm font-light leading-relaxed">
          <p>
            Marianne Houses es una firma boutique especializada en la gestión y comercialización de propiedades de lujo en los repartos más cotizados de La Habana: Kohly, Siboney, Miramar, Vedado y Atabey.
          </p>
          <p>
            Entendemos que la adquisición o renta de una residencia de alto valor requiere un nivel extremo de discreción, transparencia y eficiencia legal. Nuestro equipo ofrece asesoramiento integral desde la selección del inmueble hasta el cierre notarial.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}