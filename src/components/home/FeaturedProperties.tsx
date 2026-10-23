import { useEffect, useState } from 'react';
import { PropertyCard } from '../property/PropertyCard';
import { getProperties } from '../../services/propertyService';
import type { Property } from '../../types';

export function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProperties().then((data) => {
      setProperties(data.filter((p) => p.featured).slice(0, 6));
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
    <main id="propiedades" className="max-w-6xl mx-auto px-4 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((prop) => (
          <PropertyCard key={prop.id} property={prop} />
        ))}
      </div>
    </main>
  );
}