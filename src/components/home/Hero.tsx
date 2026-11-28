import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { optimizeImage } from '../../lib/cloudinary';

// Fotos REALES de propiedades del catálogo (horizontales y de buena resolución).
// Para cambiarlas: copiar la URL de Cloudinary de la foto y el slug de su casa.
const SLIDES = [
  {
    image: 'https://res.cloudinary.com/fscqxubu/image/upload/v1793047969/properties/casa-6/eaofoapoecuyrrjzhqow.jpg',
    caption: 'Villa con piscina · Santa Fe',
    slug: 'villa-vacacional-con-piscina-santa-fe-playa',
  },
  {
    image: 'https://res.cloudinary.com/fscqxubu/image/upload/v1795834428/properties/casa-16/sb2nznnfks7t0pznrz5k.jpg',
    caption: 'Residencia con piscina · Miramar',
    slug: 'exclusiva-residencia-piscina-ranchon-alturas-miramar',
  },
  {
    image: 'https://res.cloudinary.com/fscqxubu/image/upload/v1794115592/properties/casa-14/rh5sktqg4p4pelgwgpnx.jpg',
    caption: 'Residencia bi-planta · Miramar',
    slug: 'residencia-biplanta-terreno-apartamento-miramar',
  },
  {
    image: 'https://res.cloudinary.com/fscqxubu/image/upload/v1793379004/properties/casa-9/ccvhdvwu4q4h22yxtt3x.jpg',
    caption: 'Casa con vista al mar · Miramar',
    slug: 'espectacular-casa-2-plantas-vista-al-mar-miramar',
  },
];

const INTERVAL_MS = 6000;

export function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Respeta a quien tiene desactivadas las animaciones en su dispositivo
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[current];

  return (
    <header id="inicio" className="relative w-full bg-black pt-20 overflow-hidden">
      <div className="relative w-full h-[72vh] min-h-[460px] sm:h-[85vh] sm:min-h-[560px] max-h-[900px] flex items-center justify-center">

        {/* FOTOS (fundido entre una y otra) */}
        {SLIDES.map((s, i) => (
          <img
            key={s.image}
            src={optimizeImage(s.image, 1920)}
            alt={s.caption}
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'low'}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[1500ms] ease-in-out ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* DEGRADADO para que el texto se lea sobre cualquier foto */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />

        {/* TEXTO CENTRADO */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 py-8">
          <p className="text-[#C9A961] text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] mb-4">
            Marianne Houses · La Habana
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-wide leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C9A961] drop-shadow">
            EXCLUSIVIDAD Y ELEGANCIA<br />
            EN LA HABANA
          </h1>

          <p className="text-gray-100 text-xs sm:text-base font-light tracking-wide max-w-xl mx-auto mb-7">
            Su experto en residencias independientes de alto nivel.
          </p>

          <Link
            to="/propiedades"
            className="inline-flex items-center justify-center px-7 py-3 sm:px-9 sm:py-4 bg-gradient-to-r from-[#C9A961] to-[#b89750] hover:from-[#b89750] hover:to-[#a78640] text-black font-extrabold text-[10px] sm:text-xs uppercase tracking-widest rounded-md shadow-xl transition-all hover:scale-105"
          >
            VER PROPIEDADES
          </Link>
        </div>

        {/* PIE: casa que se está mostrando + indicadores */}
        <div className="absolute bottom-0 inset-x-0 z-10 px-4 pb-5 sm:pb-7">
          <div className="max-w-6xl mx-auto flex items-end justify-between gap-4">
            <Link
              to={`/propiedad/${slide.slug}`}
              className="text-left text-white/90 hover:text-[#C9A961] transition-colors"
            >
              <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-white/60">
                En la imagen
              </span>
              <span className="text-xs sm:text-sm font-semibold">{slide.caption} →</span>
            </Link>

            <div className="flex gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.image}
                  type="button"
                  onClick={() => setCurrent(i)}
                  aria-label={`Ver foto ${i + 1}: ${s.caption}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === current ? 'w-8 bg-[#C9A961]' : 'w-3 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
