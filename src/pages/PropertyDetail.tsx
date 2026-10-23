import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Bath, Bed, Maximize2, Car, MapPin, MessageCircle, Check, ArrowLeft } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { MOCK_PROPERTIES } from '../data/mockProperties';

export function PropertyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const property = MOCK_PROPERTIES.find((p) => p.slug === slug) || MOCK_PROPERTIES[0];
  const [selectedImg, setSelectedImg] = useState(property.images[0] || '');

  const whatsappMessage = encodeURIComponent(
    `Hola, solicito más información sobre la propiedad: "${property.title}" (Ref: ${property.slug})`
  );
  const whatsappUrl = `https://wa.me/${(property.whatsapp || '5350000000').replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  return (
    <div className="bg-[#F8F8F8] min-h-screen font-sans text-[#1A1A1A]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 pt-28 pb-20">
        {/* Volver */}
        <Link to="/propiedades" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#C9A961] mb-6 font-semibold uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" /> Volver al catálogo
        </Link>

        {/* Título & Precio */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="bg-[#C9A961] text-black text-[10px] font-extrabold px-3 py-1 rounded uppercase tracking-wider shadow-sm inline-block mb-2">
              {property.operation}
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#1A1A1A]">{property.title}</h1>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#C9A961]" /> {property.address || property.zone}
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-3xl font-extrabold text-[#C9A961]">${property.price.toLocaleString()} USD</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Zona {property.zone}</p>
          </div>
        </div>

        {/* Galería de Fotos */}
        <div className="space-y-3 mb-10">
          <div className="aspect-[16/9] md:aspect-[21/9] bg-gray-200 rounded-xl overflow-hidden shadow-md">
            <img src={selectedImg} alt={property.title} className="w-full h-full object-cover" />
          </div>
          {property.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {property.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setSelectedImg(img)}
                  className={`w-24 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                    selectedImg === img ? 'border-[#C9A961] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Ficha Técnica y Descripción */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Columna Izquierda: Detalle */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Métricas clave */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm grid grid-cols-4 gap-4 text-center">
              <div className="border-r border-gray-100">
                <Bed className="w-5 h-5 text-[#C9A961] mx-auto mb-1" />
                <p className="text-xs font-bold text-gray-800">{property.bedrooms} Hab.</p>
              </div>
              <div className="border-r border-gray-100">
                <Bath className="w-5 h-5 text-[#C9A961] mx-auto mb-1" />
                <p className="text-xs font-bold text-gray-800">{property.bathrooms} Baños</p>
              </div>
              <div className="border-r border-gray-100">
                <Maximize2 className="w-5 h-5 text-[#C9A961] mx-auto mb-1" />
                <p className="text-xs font-bold text-gray-800">{property.area} m²</p>
              </div>
              <div>
                <Car className="w-5 h-5 text-[#C9A961] mx-auto mb-1" />
                <p className="text-xs font-bold text-gray-800">{property.parking} Garaje</p>
              </div>
            </div>

            {/* Descripción */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-3">
              <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">Descripción</h2>
              <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">{property.description}</p>
            </div>

            {/* Comodidades */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-3">
              <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">Amenidades y Características</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs text-gray-700">
                    <Check className="w-4 h-4 text-[#C9A961]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Columna Derecha: Tarjeta de Contacto / CTA */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 sticky top-28">
              <h3 className="font-bold text-xs uppercase tracking-wider text-gray-800">¿Interesado en esta propiedad?</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Contacte directamente a un asesor de Marianne Houses para agendar una visita privada.
              </p>

              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full h-11 bg-gradient-to-r from-[#D4AF37] to-[#C9A961] hover:brightness-105 text-black font-extrabold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                CONTACTAR POR WHATSAPP
              </a>

              <hr className="border-gray-100" />

              <form onSubmit={(e) => { e.preventDefault(); alert('Solicitud enviada.'); }} className="space-y-3 pt-2">
                <input type="text" placeholder="Su Nombre" required className="w-full h-9 px-3 bg-gray-50 border border-gray-200 rounded text-xs focus:outline-none focus:border-[#C9A961]" />
                <input type="email" placeholder="Su Correo" required className="w-full h-9 px-3 bg-gray-50 border border-gray-200 rounded text-xs focus:outline-none focus:border-[#C9A961]" />
                <textarea placeholder="Mensaje" rows={3} className="w-full p-3 bg-gray-50 border border-gray-200 rounded text-xs focus:outline-none focus:border-[#C9A961]" />
                <button type="submit" className="w-full h-9 bg-gray-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded transition-colors">
                  SOLICITAR MÁS INFO
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}