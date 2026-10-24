// Todas las zonas posibles de La Habana (para el admin / formularios)
export const ALL_HAVANA_ZONES = [
  'Miramar',
  'Kohly',
  'Siboney',
  'Vedado',
  'Playa',
  'Santa Fe',
  'Atabey',
  'Cubanacán',
  'Nuevo Vedado',
  'Habana Vieja',
  'Centro Habana',
  'Cerro',
  'Diez de Octubre',
  'La Lisa',
  'Marianao',
  'Boyeros',
  'Arroyo Naranjo',
  'San Miguel del Padrón',
  'Guanabacoa',
  'Habana del Este',
  'Regla',
] as const;

export type HavanaZone = typeof ALL_HAVANA_ZONES[number];