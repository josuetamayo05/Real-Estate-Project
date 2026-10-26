import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { PropertyCard } from '../components/property/PropertyCard';
import { MOCK_PROPERTIES } from '../data/mockProperties';
import { ALL_HAVANA_ZONES } from '../data/zones';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Properties() {
  const [searchParams] = useSearchParams();
  
  const [operation, setOperation] = useState(searchParams.get('operacion') || '');
  const [zone, setZone] = useState(searchParams.get('zona') || '');
  const [bedrooms, setBedrooms] = useState(searchParams.get('habitaciones') || '');
  const [maxPrice, setMaxPrice] = useState(Number(searchParams.get('precioMax')) || 3000000);

  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter((p) => {
      if (operation && p.operation.toLowerCase() !== operation.toLowerCase()) return false;
      if (zone && p.zone.toLowerCase() !== zone.toLowerCase()) return false;
      if (bedrooms && p.bedrooms < Number(bedrooms)) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
  }, [operation, zone, bedrooms, maxPrice]);

  return (
    <div className="bg-[#F8F8F8] min-h-screen font-sans text-[#1A1A1A]">
      <Navbar />

      {/* BOTÓN VOLVER AL INICIO */}
        <div className="mb-6 flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-[#C9A961] transition-colors bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Inicio
          </Link>

          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Catálogo de Propiedades
          </span>
        </div>

      <main className="max-w-6xl mx-auto px-4 pt-28 pb-20">
        <h1 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-2 text-center">
          CATÁLOGO DE PROPIEDADES
        </h1>
        <p className="text-xs text-gray-500 text-center uppercase tracking-widest mb-8">
          Residencias exclusivas en La Habana
        </p>

        {/* Barra de Filtros */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Operación</label>
            <select 
              value={operation} 
              onChange={(e) => setOperation(e.target.value)}
              className="w-full h-9 bg-gray-50 border border-gray-200 rounded text-xs px-2 focus:outline-none focus:border-[#C9A961]"
            >
              <option value="">Todas</option>
              <option value="Venta">Venta</option>
              <option value="Renta">Renta</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Zona</label>
            <select 
              value={zone} 
              onChange={(e) => setZone(e.target.value)}
              className="w-full h-9 bg-gray-50 border border-gray-200 rounded text-xs px-2 focus:outline-none focus:border-[#C9A961]"
            >
              <option value="">Todas las zonas</option>
              {ALL_HAVANA_ZONES.map((availableZone) => (
                <option key={availableZone} value={availableZone}>{availableZone}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Habitaciones Min.</label>
            <select 
              value={bedrooms} 
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full h-9 bg-gray-50 border border-gray-200 rounded text-xs px-2 focus:outline-none focus:border-[#C9A961]"
            >
              <option value="">Cualquiera</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between text-[10px] font-bold uppercase text-gray-500 mb-1">
              <span>Precio Max</span>
              <span className="text-[#C9A961]">${maxPrice.toLocaleString()} USD</span>
            </div>
            <input 
              type="range"
              min="100000"
              max="2000000"
              step="50000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#C9A961]"
            />
          </div>
        </div>

        {/* Grid Resultante */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500 text-xs">No se encontraron propiedades que coincidan con tus filtros.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}