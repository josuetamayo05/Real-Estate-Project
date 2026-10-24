import { Link } from 'react-router-dom';
import { Bed, Bath, MessageCircle } from 'lucide-react';
import type { Property } from '../../types';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  // Formatear el precio como en la maqueta: $450,000 USD
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);

  const mainImage = property.images && property.images.length > 0
    ? property.images[0]
    : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80';

  const defaultWhatsappMessage = encodeURIComponent(
    `Hola, estoy interesado en la propiedad: "${property.title}"`
  );
  
  const whatsappNumber = property.whatsapp || "5350000000";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${defaultWhatsappMessage}`;

  return (
    <article className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
      
      <div>
        {/* 1. IMAGEN DE LA CASA + BADGE "VENTA/RENTA" DORADO */}
        <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
          <span className="absolute top-3 left-3 z-10 bg-[#C9A961] text-black text-[10px] font-extrabold px-3 py-1 rounded-sm uppercase tracking-wider shadow">
            {property.operation || 'VENTA'}
          </span>
          <img 
            src={mainImage} 
            alt={property.title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
            loading="lazy"
          />
        </div>

        {/* 2. INFORMACIÓN PRINCIPAL (Precio grande y Zona en Mayúsculas) */}
        <div className="p-4 sm:p-5 text-center">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A] tracking-tight mb-1">
            {formattedPrice} <span className="text-xs font-normal text-gray-500">USD</span>
          </h3>
          <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-3">
            INDEPENDIENTE {property.zone || 'KOHLY'}
          </p>

          {/* 3. BARRA DE ICONOS CENTRADOS (Habitaciones / Baños) */}
          <div className="flex items-center justify-center gap-6 py-2 border-y border-gray-100 text-xs font-semibold text-gray-700">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-[#C9A961]" />
              <span>{property.bedrooms || 0}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-[#C9A961]" />
              <span>{property.bathrooms || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BOTONES DE ACCIÓN INFERIORES ("VER DETALLES" Y "WHATSAPP") */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
        <Link
          to={`/propiedad/${property.slug || property.id}`}
          className="h-10 bg-[#C5C5C5] hover:bg-[#b5b5b5] text-gray-900 font-bold text-[10px] sm:text-[11px] uppercase tracking-wider rounded-md flex items-center justify-center transition-colors text-center"
        >
          VER DETALLES
        </Link>
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noreferrer"
          className="h-10 bg-[#C9A961] hover:bg-[#b89750] text-black font-bold text-[10px] sm:text-[11px] uppercase tracking-wider rounded-md flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          WHATSAPP
        </a>
      </div>

    </article>
  );
}