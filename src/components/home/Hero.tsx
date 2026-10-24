import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <header id="inicio" className="relative w-full bg-black pt-20 overflow-hidden">
      
      {/* CONTENEDOR CON LA PROPORCIÓN EXACTA DE LA IMAGEN */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[85vh] flex items-center justify-center">
        
        {/* IMAGEN DE FONDO */}
        <img 
          src="/home.jpeg"
          alt="Marianne Houses" 
          className="absolute inset-0 w-full h-full object-contain sm:object-cover object-center opacity-50"
        />

        {/* OVERLAY SUTIL */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

        {/* CONTENIDO TEXTO CENTRADO */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 py-8">
          <h1 className="font-serif text-2xl sm:text-5xl md:text-6xl font-bold tracking-wide leading-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C9A961]">
            EXCLUSIVIDAD Y ELEGANCIA<br />
            EN LA HABANA
          </h1>

          <p className="text-gray-200 text-[11px] sm:text-sm md:text-base font-light tracking-wide max-w-xl mx-auto mb-6">
            Marianne Houses: Su experto en residencias independientes de alto nivel.
          </p>

          <Link 
            to="/propiedades"
            className="inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3.5 bg-gradient-to-r from-[#C9A961] to-[#b89750] hover:from-[#b89750] hover:to-[#a78640] text-black font-extrabold text-[10px] sm:text-xs uppercase tracking-widest rounded-md shadow-xl transition-all hover:scale-105"
          >
            VER PROPIEDADES
          </Link>
        </div>

      </div>

    </header>
  );
}