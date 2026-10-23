import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-[#0A0A0A]/95 backdrop-blur-md text-white fixed top-0 left-0 right-0 z-50 border-b border-[#C9A961]/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Monograma */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 border border-[#C9A961] flex items-center justify-center rounded-sm">
            <span className="font-serif text-2xl font-bold text-[#C9A961]">M</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-sm tracking-widest font-bold text-white">MARIANNE</span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#C9A961]">Houses</span>
          </div>
        </Link>

        {/* Menú Desktop */}
        <div className="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-widest">
          <Link to="/" className={isActive('/') ? 'text-[#C9A961] border-b border-[#C9A961] pb-1' : 'text-gray-300 hover:text-[#C9A961] transition-colors'}>INICIO</Link>
          <Link to="/propiedades?operacion=Venta" className="text-gray-300 hover:text-[#C9A961] transition-colors">VENTA</Link>
          <Link to="/propiedades?operacion=Renta" className="text-gray-300 hover:text-[#C9A961] transition-colors">RENTA</Link>
          <Link to="/sobre-nosotros" className={isActive('/sobre-nosotros') ? 'text-[#C9A961] border-b border-[#C9A961] pb-1' : 'text-gray-300 hover:text-[#C9A961] transition-colors'}>SOBRE NOSOTROS</Link>
          <Link to="/contacto" className={isActive('/contacto') ? 'text-[#C9A961] border-b border-[#C9A961] pb-1' : 'text-gray-300 hover:text-[#C9A961] transition-colors'}>CONTACTO</Link>
        </div>

        {/* Botón Móvil */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#C9A961]" /> : <Menu className="w-6 h-6 text-[#C9A961]" />}
          </button>
        </div>
      </div>

      {/* Menú Móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0A] px-6 pt-2 pb-6 space-y-3 border-t border-gray-800">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-xs uppercase tracking-wider text-[#C9A961] py-2">INICIO</Link>
          <Link to="/propiedades?operacion=Venta" onClick={() => setMobileMenuOpen(false)} className="block text-xs uppercase tracking-wider text-gray-300 py-2">VENTA</Link>
          <Link to="/propiedades?operacion=Renta" onClick={() => setMobileMenuOpen(false)} className="block text-xs uppercase tracking-wider text-gray-300 py-2">RENTA</Link>
          <Link to="/sobre-nosotros" onClick={() => setMobileMenuOpen(false)} className="block text-xs uppercase tracking-wider text-gray-300 py-2">SOBRE NOSOTROS</Link>
          <Link to="/contacto" onClick={() => setMobileMenuOpen(false)} className="block text-xs uppercase tracking-wider text-gray-300 py-2">CONTACTO</Link>
        </div>
      )}
    </nav>
  );
}