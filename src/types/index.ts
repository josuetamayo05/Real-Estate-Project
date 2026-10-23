export type Operation = 'Venta' | 'Renta';
export type PropertyType = 'Casa' | 'Apartamento' | 'Villa' | 'Mansión' | 'Penthouse';

export interface Property {
  id: string;
  title: string;
  slug: string;
  operation: Operation;
  zone: string;
  address?: string;
  price: number;
  currency: 'USD';
  bedrooms: number;
  bathrooms: number;
  area: number;
  parking: number;
  propertyType: PropertyType;
  description: string;
  features: string[];
  images: string[];
  featured?: boolean;
  sold?: boolean;
  whatsapp?: string;
}

export interface FilterState {
  operation: string;
  zone: string;
  bedrooms: string;
  maxPrice: number;
}