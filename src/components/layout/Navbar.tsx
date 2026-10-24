import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white fixed top-0 left-0 right-0 z-50 border-b border-[#C9A961]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
        
        {/* LOGO: Se añade mix-blend-lighten para que el negro del logo se fusione 100% con el fondo */}
        <a href="/" className="flex items-center h-full py-2">
          <img
            src="/logo.png"
            alt="Marianne Houses"
            className="h-14 sm:h-16 md:h-20 w-auto object-contain mix-blend-lighten"
          />
        </a>

        {/* Menú Desktop */}
        <div className="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-widest">
          <a href="#inicio" className="text-[#C9A961]">Inicio</a>
          <a href="#venta" className="text-gray-300 hover:text-[#C9A961] transition-colors">Venta</a>
          <a href="#renta" className="text-gray-300 hover:text-[#C9A961] transition-colors">Renta</a>
          <a href="#nosotros" className="text-gray-300 hover:text-[#C9A961] transition-colors">Sobre Nosotros</a>
          <a href="#contacto" className="text-gray-300 hover:text-[#C9A961] transition-colors">Contacto</a>
        </div>

        {/* Botón Móvil */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-white hover:text-[#C9A961]"
            aria-label="Abrir Menú"
          >
            {isOpen ? <X className="w-7 h-7 text-[#C9A961]" /> : <Menu className="w-7 h-7 text-[#C9A961]" />}
          </button>
        </div>

      </div>

      {/* Menú desplegable Móvil en negro puro */}
      {isOpen && (
        <div className="md:hidden bg-black border-b border-[#C9A961]/30 px-6 py-4 space-y-3">
          <a href="#inicio" onClick={() => setIsOpen(false)} className="block text-sm uppercase tracking-wider text-[#C9A961] py-2">Inicio</a>
          <a href="#venta" onClick={() => setIsOpen(false)} className="block text-sm uppercase tracking-wider text-gray-300 py-2">Venta</a>
          <a href="#renta" onClick={() => setIsOpen(false)} className="block text-sm uppercase tracking-wider text-gray-300 py-2">Renta</a>
          <a href="#nosotros" onClick={() => setIsOpen(false)} className="block text-sm uppercase tracking-wider text-gray-300 py-2">Sobre Nosotros</a>
          <a href="#contacto" onClick={() => setIsOpen(false)} className="block text-sm uppercase tracking-wider text-gray-300 py-2">Contacto</a>
        </div>
      )}
    </nav>
  );
}