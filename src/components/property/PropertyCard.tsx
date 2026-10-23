import { Link } from 'react-router-dom';
import { Bed, Bath, MessageCircle } from 'lucide-react';
import type { Property } from '../../types';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const mainImage = property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80';

  const whatsappMessage = encodeURIComponent(
    `Hola, estoy interesado en la propiedad: "${property.title}" (Ref: ${property.slug})`
  );
  const whatsappUrl = `https://wa.me/${(property.whatsapp || '5350000000').replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  return (
    <article className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#C9A961]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Imagen y Badge */}
        <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
          <span className="absolute top-3 left-3 z-10 bg-gradient-to-r from-[#D4AF37] to-[#C9A961] text-black text-[10px] font-extrabold px-3 py-1 rounded uppercase tracking-wider shadow-md">
            {property.operation}
          </span>
          <img 
            src={mainImage} 
            alt={property.title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
            loading="lazy"
          />
        </div>

        {/* Info centrada como la imagen de la clienta */}
        <div className="p-5 text-center">
          <h3 className="text-xl font-extrabold text-[#1A1A1A] tracking-tight mb-0.5">
            ${property.price.toLocaleString()} <span className="text-xs font-normal text-gray-500">USD</span>
          </h3>
          <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-500 mb-3">
            INDEPENDIENTE {property.zone.toUpperCase()}
          </p>

          {/* Iconos Baños y Camas */}
          <div className="flex items-center justify-center gap-6 py-2 border-y border-gray-100 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-gray-700" />
              <span className="font-bold text-xs">{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-gray-700" />
              <span className="font-bold text-xs">{property.bedrooms}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Botones de acción inferiores */}
      <div className="p-4 pt-0 space-y-2">
        <Link
          to={`/propiedad/${property.slug}`}
          className="w-full h-10 bg-[#D4D4D4] hover:bg-[#c5c5c5] text-gray-900 font-bold text-[11px] uppercase tracking-wider rounded flex items-center justify-center transition-colors"
        >
          VER DETALLES
        </Link>
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noreferrer"
          className="w-full h-10 bg-gradient-to-r from-[#D4AF37] to-[#C9A961] hover:brightness-105 text-black font-extrabold text-[11px] uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-all shadow-sm"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          WHATSAPP
        </a>
      </div>
    </article>
  );
}