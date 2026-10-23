import { 
  collection, 
  getDocs, 
  query, 
  where, 
  doc, 
  getDoc, 
  setDoc, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Property } from '../types';
import { MOCK_PROPERTIES } from '../data/mockProperties';

const COLLECTION_NAME = 'properties';

// Obtener todas las propiedades
export async function getProperties(): Promise<Property[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('price', 'desc'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return MOCK_PROPERTIES;
    }

    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Property[];
  } catch (error) {
    console.warn('Error conectando a Firestore, cargando datos locales mock:', error);
    return MOCK_PROPERTIES;
  }
}

// Obtener una propiedad por su slug
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('slug', '==', slug));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docData = snapshot.docs[0];
      return { id: docData.id, ...docData.data() } as Property;
    }
  } catch (error) {
    console.warn('Error buscando slug en Firestore:', error);
  }

  // Fallback a MOCK
  return MOCK_PROPERTIES.find((p) => p.slug === slug) || null;
}

// Sembrar datos iniciales en Firestore (Seed)
export async function seedPropertiesToFirestore(): Promise<void> {
  try {
    for (const property of MOCK_PROPERTIES) {
      const docRef = doc(db, COLLECTION_NAME, property.id);
      await setDoc(docRef, property, { merge: true });
    }
    alert('¡Propiedades iniciales cargadas con éxito en Firestore!');
  } catch (error) {
    console.error('Error sembrando datos en Firestore:', error);
    alert('Error guardando en Firestore. Revisa las reglas de seguridad de tu base de datos.');
  }
}