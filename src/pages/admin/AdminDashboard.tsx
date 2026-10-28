import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Trash2, Home as HomeIcon, LogOut, RefreshCw, CheckCircle } from 'lucide-react';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { getProperties } from '../../services/propertyService';
import { mockProperties } from '../../data/mockProperties';
import type { Property } from '../../types';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState('');

  // Carga inicial asíncrona dentro del efecto
  useEffect(() => {
    const isAuth = localStorage.getItem('marianne_admin_auth');
    if (!isAuth) {
      navigate('/admin');
      return;
    }

    let isMounted = true;

    getProperties()
      .then((data) => {
        if (isMounted) {
          setProperties(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error al cargar propiedades de Firestore:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  // Función para refrescar manualmente tras sincronizar
  const refreshProperties = async () => {
    setLoading(true);
    try {
      const data = await getProperties();
      setProperties(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Sincroniza las propiedades locales a Firestore en 1 clic
  const handleSyncInitial = async () => {
    if (!confirm('¿Deseas subir las propiedades iniciales a Firestore? Se guardarán en la base de datos de tu proyecto.')) return;
    
    setSyncing(true);
    setMessage('Sincronizando con Firestore...');
    try {
      for (const prop of mockProperties) {
        await setDoc(doc(db, 'properties', prop.id), prop);
      }
      setMessage('¡Todas las propiedades fueron cargadas con éxito en Firestore!');
      await refreshProperties();
    } catch (error) {
      console.error(error);
      setMessage('Error al sincronizar con Firestore.');
    } finally {
      setSyncing(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`¿Seguro que deseas eliminar la propiedad "${title}"?`)) {
      await deleteDoc(doc(db, 'properties', id));
      setProperties((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('marianne_admin_auth');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-[#0A0A0A] text-white border-b border-[#C9A961]/30 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-xl font-bold text-[#C9A961]">Marianne Houses</span>
            <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded border border-gray-700">PANEL ADMIN</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" target="_blank" className="text-xs text-gray-300 hover:text-[#C9A961] flex items-center gap-1">
              <HomeIcon className="w-4 h-4" /> Ver Web
            </Link>
            <button onClick={handleLogout} className="text-xs bg-red-950/80 hover:bg-red-900 text-red-200 px-3 py-1.5 rounded flex items-center gap-1">
              <LogOut className="w-3.5 h-3.5" /> Salir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {message && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            {message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-serif">Catálogo de Propiedades</h1>
            <p className="text-xs text-gray-500">Total: {properties.length} propiedades en Firestore</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSyncInitial}
              disabled={syncing}
              className="h-10 px-4 bg-gray-900 hover:bg-black text-[#C9A961] font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-2 border border-[#C9A961]/30 shadow"
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
              Sincronizar Iniciales
            </button>

            <Link
              to="/admin/nueva"
              className="h-10 px-5 bg-gradient-to-r from-[#D4AF37] to-[#C9A961] text-black font-extrabold text-xs uppercase tracking-wider rounded-lg flex items-center gap-2 shadow hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" /> Nueva Propiedad
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="bg-white p-8 text-center rounded-xl text-xs text-gray-500">Cargando propiedades...</div>
        ) : (
          <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-bold uppercase text-gray-500">
                  <th className="py-3 px-4">Propiedad</th>
                  <th className="py-3 px-4">Operación / Zona</th>
                  <th className="py-3 px-4">Precio</th>
                  <th className="py-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {properties.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img 
                        src={p.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200'} 
                        alt={p.title} 
                        className="w-12 h-10 object-cover rounded bg-gray-100" 
                      />
                      <span className="font-bold text-gray-900">{p.title}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-gray-800">{p.operation}</span> • {p.zone}
                    </td>
                    <td className="py-3 px-4 font-bold text-gray-900">
                      {p.hidePrice || !p.price ? 'Consultar' : `$${p.price.toLocaleString()}`}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleDelete(p.id, p.title)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}