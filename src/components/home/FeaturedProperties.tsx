import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PropertyCard } from '../property/PropertyCard';
import { getProperties } from '../../services/propertyService';
import type { Property } from '../../types';

// Número de la casa a partir de su id ('casa-16' -> 16) para saber cuáles son las más nuevas
const houseNumber = (p: Property) => Number(p.id.match(/\d+/)?.[0] ?? 0);

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center mb-8 sm:mb-10">
      <p className="text-[#C9A961] text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] mb-2">
        {eyebrow}
      </p>
      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">{title}</h2>
      <div className="w-12 h-0.5 bg-[#C9A961] mx-auto mt-4" />
    </div>
  );
}

export function FeaturedProperties() {
  const [featured, setFeatured] = useState<Property[]>([]);
  const [latest, setLatest] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProperties().then((data) => {
      const available = data.filter((p) => !p.sold);
      const top = available.filter((p) => p.featured).slice(0, 6);
      const newest = available
        .filter((p) => !top.includes(p))
        .sort((a, b) => houseNumber(b) - houseNumber(a))
        .slice(0, 3);
      setFeatured(top);
      setLatest(newest);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-white rounded-xl h-80 animate-pulse border border-gray-200" />
        ))}
      </div>
    );
  }

  return (
    <main id="propiedades" className="max-w-6xl mx-auto px-4 mb-20 space-y-16 sm:space-y-20">
      {latest.length > 0 && (
        <section>
          <SectionTitle eyebrow="Novedades" title="Recién Agregadas" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latest.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section>
          <SectionTitle eyebrow="Selección exclusiva" title="Propiedades Destacadas" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </section>
      )}

      <div className="text-center">
        <Link
          to="/propiedades"
          className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white font-extrabold text-xs uppercase tracking-widest rounded-md transition-colors"
        >
          Ver todo el catálogo
        </Link>
      </div>
    </main>
  );
}
