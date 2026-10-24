import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  message: string;
  propertyTitle?: string;
  createdAt: number;
}

export async function sendContactMessage(data: Omit<ContactMessage, 'createdAt'>) {
  try {
    await addDoc(collection(db, 'contacts'), {
      ...data,
      createdAt: Date.now(),
    });
    return true;
  } catch (error) {
    console.error('Error guardando contacto en Firestore:', error);
    return false;
  }
}