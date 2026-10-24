import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function FilterBar() {
  const navigate = useNavigate();
  const [operation, setOperation] = useState('Venta/Renta');
  const [zone, setZone] = useState('Todas');
  const [bedrooms, setBedrooms] = useState('3');
  const [price, setPrice] = useState(1000000);

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (operation !== 'Venta/Renta') params.set('operacion', operation);
    if (zone !== 'Todas') params.set('zona', zone);
    if (bedrooms) params.set('habitaciones', bedrooms);
    if (price < 2000000) params.set('precioMax', price.toString());

    navigate(`/propiedades?${params.toString()}`);
  };

  return (
    <section className="relative z-20 max-w-5xl mx-auto px-3 sm:px-6 py-6 mb-12">
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 items-end">
          
          {/* Operación */}
          <div>
            <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Filter
            </label>
            <select 
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="w-full h-10 sm:h-11 bg-white border border-gray-200 rounded-lg px-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#C9A961] shadow-sm"
            >
              <option value="Venta/Renta">Venta/Renta</option>
              <option value="Venta">Venta</option>
              <option value="Renta">Renta</option>
            </select>
          </div>

          {/* Zona */}
          <div>
            <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Zona
            </label>
            <select 
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full h-10 sm:h-11 bg-white border border-gray-200 rounded-lg px-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#C9A961] shadow-sm"
            >
              <option value="Todas">Todas las zonas</option>
              <option value="Miramar">Miramar</option>
              <option value="Kohly">Kohly</option>
              <option value="Siboney">Siboney</option>

              <option value="Santa Fe">Santa Fe</option>
              <option value="Vedado">Vedado</option>
              <option value="Atabey">Atabey</option>
            </select>
          </div>

          {/* Habitaciones */}
          <div>
            <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Habitaciones
            </label>
            <select 
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full h-10 sm:h-11 bg-white border border-gray-200 rounded-lg px-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#C9A961] shadow-sm"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5+</option>
            </select>
          </div>

          {/* Precio Slider */}
          <div className="col-span-2 md:col-span-1 mt-1 md:mt-0">
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-700">
                Precio :
              </label>
              <span className="text-[11px] font-bold text-gray-900">
                ${price.toLocaleString()}
              </span>
            </div>
            <input 
              type="range" 
              min="100000" 
              max="2500000" 
              step="50000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              onMouseUp={handleFilter}
              onTouchEnd={handleFilter}
              className="w-full h-2 bg-gray-200 accent-[#C9A961] rounded-lg cursor-pointer"
            />
          </div>

        </div>
      </div>
    </section>
  );
}