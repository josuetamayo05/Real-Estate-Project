import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { ArrowLeft, Save } from 'lucide-react';

export function AdminPropertyEdit() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState('');
  const [operation, setOperation] = useState<'Venta' | 'Renta'>('Venta');
  const [zone, setZone] = useState('Kohly');
  const [price, setPrice] = useState(450000);
  const [bedrooms, setBedrooms] = useState(4);
  const [bathrooms, setBathrooms] = useState(3);
  const [area] = useState(300);
  const [parking] = useState(2);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert('El título es requerido');

    setSaving(true);
    try {
      const id = Date.now().toString();
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      const newProperty = {
        id,
        title,
        slug,
        operation,
        zone,
        price: Number(price),
        currency: 'USD',
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        area: Number(area),
        parking: Number(parking),
        propertyType: 'Casa',
        description,
        features: ['Jardín', 'Garaje', 'Aire acondicionado'],
        images: [imageUrl || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'],
        featured: true,
        whatsapp: '5350000000',
      };

      await setDoc(doc(db, 'properties', id), newProperty);
      alert('Propiedad creada correctamente!');
      navigate('/admin/dashboard');
    } catch (err) {
      alert('Error guardando en Firestore');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 pb-12">
      <header className="bg-[#0A0A0A] text-white border-b border-[#C9A961]/30 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/admin/dashboard" className="text-xs text-gray-300 hover:text-[#C9A961] flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Volver al panel
          </Link>
          <span className="font-serif text-lg font-bold text-[#C9A961]">Nueva Propiedad</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-8">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow border border-gray-200 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Título de la propiedad *</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full h-10 px-3 bg-gray-50 border rounded text-xs focus:outline-none focus:border-[#C9A961]" placeholder="Ej. Mansión Exclusiva en Kohly" />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Operación</label>
              <select value={operation} onChange={(e) => setOperation(e.target.value as any)} className="w-full h-10 px-3 bg-gray-50 border rounded text-xs">
                <option value="Venta">Venta</option>
                <option value="Renta">Renta</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Zona</label>
              <select value={zone} onChange={(e) => setZone(e.target.value)} className="w-full h-10 px-3 bg-gray-50 border rounded text-xs">
                <option value="Kohly">Kohly</option>
                <option value="Siboney">Siboney</option>
                <option value="Miramar">Miramar</option>
                <option value="Vedado">Vedado</option>
                <option value="Atabey">Atabey</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Precio (USD)</label>
              <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full h-10 px-3 bg-gray-50 border rounded text-xs" />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">URL de la foto de portada</label>
              <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full h-10 px-3 bg-gray-50 border rounded text-xs" placeholder="https://imagedelivery.net/... o Unsplash" />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Habitaciones</label>
              <input type="number" value={bedrooms} onChange={(e) => setBedrooms(Number(e.target.value))} className="w-full h-10 px-3 bg-gray-50 border rounded text-xs" />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Baños</label>
              <input type="number" value={bathrooms} onChange={(e) => setBathrooms(Number(e.target.value))} className="w-full h-10 px-3 bg-gray-50 border rounded text-xs" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Descripción</label>
            <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 bg-gray-50 border rounded text-xs" placeholder="Detalles de la propiedad..." />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full h-11 bg-gradient-to-r from-[#D4AF37] to-[#C9A961] text-black font-extrabold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow"
          >
            <Save className="w-4 h-4" /> {saving ? 'Guardando...' : 'GUARDAR PROPIEDAD EN FIRESTORE'}
          </button>
        </form>
      </main>
    </div>
  );
}