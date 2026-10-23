import React from 'react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <header id="inicio" className="relative min-h-[75vh] flex items-center justify-center bg-[#0A0A0A] pt-28 pb-24 px-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80" 
          alt="Mansión de Lujo Marianne Houses" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/30 to-black/60" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#C9A961] leading-tight tracking-wide mb-4 drop-shadow-md">
          EXCLUSIVIDAD Y ELEGANCIA<br />
          <span className="text-white">EN LA HABANA</span>
        </h1>
        <p className="text-gray-200 text-xs sm:text-sm md:text-base font-light tracking-wide max-w-xl mx-auto mb-8 drop-shadow">
          Marianne Houses: Su experto en residencias independientes de alto nivel.
        </p>
        <Link 
          to="/propiedades"
          className="inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#C9A961] hover:brightness-110 text-black font-extrabold text-xs uppercase tracking-widest rounded shadow-xl transition-all"
        >
          VER PROPIEDADES
        </Link>
      </div>
    </header>
  );
}