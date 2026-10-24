import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { MapPin, Phone, Mail } from 'lucide-react';

export function Contact() {
  return (
    <div className="bg-[#F8F8F8] min-h-screen font-sans text-[#1A1A1A]">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 pt-32 pb-20">
        <h1 className="font-serif text-3xl font-bold text-center mb-2">CONTACTE CON NOSOTROS</h1>
        <p className="text-xs text-gray-500 text-center uppercase tracking-widest mb-12">Estamos a su entera disposición</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <div className="space-y-6">
            <h2 className="font-serif text-lg font-bold text-gray-900">Atención Directa</h2>
            <div className="space-y-4 text-xs text-gray-600">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#C9A961]" />
                <span>Miramar, La Habana</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C9A961]" />
                <span>+53 52365254</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C9A961]" />
                <span>marianne9820@gmail.com</span>
              </div>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert('Mensaje enviado.'); }} className="space-y-3">
            <input type="text" placeholder="Su Nombre" required className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded text-xs focus:outline-none focus:border-[#C9A961]" />
            <input type="email" placeholder="Su Email" required className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded text-xs focus:outline-none focus:border-[#C9A961]" />
            <textarea placeholder="Mensaje" rows={4} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded text-xs focus:outline-none focus:border-[#C9A961]" />
            <button type="submit" className="w-full h-10 bg-gradient-to-r from-[#D4AF37] to-[#C9A961] text-black font-extrabold text-xs uppercase tracking-wider rounded">
              ENVIAR MENSAJE
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}