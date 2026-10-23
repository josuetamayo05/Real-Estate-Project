import React from 'react';
import { PropertyCard } from '../property/PropertyCard';
import { MOCK_PROPERTIES } from '../../data/mockProperties';

export function FeaturedProperties() {
  const featured = MOCK_PROPERTIES.filter((p) => p.featured).slice(0, 6);

  return (
    <main id="propiedades" className="max-w-6xl mx-auto px-4 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featured.map((prop) => (
          <PropertyCard key={prop.id} property={prop} />
        ))}
      </div>
    </main>
  );
}