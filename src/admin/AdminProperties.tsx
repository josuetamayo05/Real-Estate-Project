// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
// import { signOut } from 'firebase/auth';
// import { db, auth } from '../firebase';
// import { Property, ZONES, PROPERTY_TYPES } from './constants';
// import { 
//   Plus, Search, ArrowUp, ArrowDown, Edit, Trash2, Eye, EyeOff, 
//   Star, FileUp, LogOut, CheckCircle2, XCircle, Home
// } from 'lucide-react';

// export function AdminProperties() {
//   const navigate = useNavigate();
//   const [properties, setProperties] = useState<Property[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterZone, setFilterZone] = useState('');
//   const [filterType, setFilterType] = useState('');

//   useEffect(() => {
//     const q = query(collection(db, 'properties'), orderBy('displayOrder', 'asc'));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const docs = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Property[];
//       setProperties(docs);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await signOut(auth);
//     navigate('/admin/login');
//   };

//   const toggleActive = async (property: Property) => {
//     const ref = doc(db, 'properties', property.id);
//     await updateDoc(ref, { active: !property.active, updatedAt: Date.now() });
//   };

//   const toggleFeatured = async (property: Property) => {
//     const ref = doc(db, 'properties', property.id);
//     await updateDoc(ref, { featured: !property.featured, updatedAt: Date.now() });
//   };

//   const toggleSold = async (property: Property) => {
//     const ref = doc(db, 'properties', property.id);
//     await updateDoc(ref, { sold: !property.sold, updatedAt: Date.now() });
//   };

//   const handleDelete = async (id: string, title: string) => {
//     if (window.confirm(`¿Seguro que deseas eliminar la propiedad "${title}"?`)) {
//       await deleteDoc(doc(db, 'properties', id));
//     }
//   };

//   const moveOrder = async (index: number, direction: 'up' | 'down') => {
//     if (
//       (direction === 'up' && index === 0) ||
//       (direction === 'down' && index === properties.length - 1)
//     ) return;

//     const targetIndex = direction === 'up' ? index - 1 : index + 1;
//     const currentProp = properties[index];
//     const targetProp = properties[targetIndex];

//     const currentRef = doc(db, 'properties', currentProp.id);
//     const targetRef = doc(db, 'properties', targetProp.id);

//     await updateDoc(currentRef, { displayOrder: targetProp.displayOrder });
//     await updateDoc(targetRef, { displayOrder: currentProp.displayOrder });
//   };

//   const filteredProperties = properties.filter((p) => {
//     const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           p.zone.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesZone = filterZone === '' || p.zone === filterZone;
//     const matchesType = filterType === '' || p.propertyType === filterType;
//     return matchesSearch && matchesZone && matchesType;
//   });

//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-900">
//       {/* Header Admin */}
//       <header className="bg-[#0A0A0A] text-white border-b border-[#C9A961]/30 sticky top-0 z-30">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <span className="font-serif text-xl font-bold text-[#C9A961]">Marianne Houses</span>
//             <span className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded border border-gray-700">Panel Admin</span>
//           </div>
//           <div className="flex items-center gap-3">
//             <Link
//               to="/"
//               target="_blank"
//               className="text-xs text-gray-300 hover:text-[#C9A961] flex items-center gap-1 min-h-[44px] px-2"
//             >
//               <Home className="w-4 h-4" />
//               Ver Web
//             </Link>
//             <button
//               onClick={handleLogout}
//               className="text-xs bg-red-950/80 hover:bg-red-900 text-red-200 px-3 py-2 rounded-md flex items-center gap-1 min-h-[44px]"
//             >
//               <LogOut className="w-4 h-4" />
//               Salir
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
//         {/* Barra de Acciones */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Gestión de Propiedades</h1>
//             <p className="text-xs text-gray-500">Total: {properties.length} propiedades registradas</p>
//           </div>

//           <div className="flex items-center gap-3">
//             <Link
//               to="/admin/import"
//               className="min-h-[44px] px-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-xs rounded-lg flex items-center gap-2 transition-colors"
//             >
//               <FileUp className="w-4 h-4 text-gray-500" />
//               Importar JSON
//             </Link>
//             <Link
//               to="/admin/properties/new"
//               className="min-h-[44px] px-4 bg-[#C9A961] hover:bg-[#b89750] text-black font-bold text-xs rounded-lg flex items-center gap-2 transition-colors shadow-sm"
//             >
//               <Plus className="w-4 h-4" />
//               Nueva Propiedad
//             </Link>
//           </div>
//         </div>

//         {/* Filtros de búsqueda */}
//         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <div className="relative">
//             <Search className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Buscar por título o zona..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full min-h-[44px] pl-9 pr-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A961]"
//             />
//           </div>

//           <select
//             value={filterZone}
//             onChange={(e) => setFilterZone(e.target.value)}
//             className="w-full min-h-[44px] px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A961]"
//           >
//             <option value="">Todas las zonas</option>
//             {ZONES.map((z) => (
//               <option key={z} value={z}>{z}</option>
//             ))}
//           </select>

//           <select
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//             className="w-full min-h-[44px] px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A961]"
//           >
//             <option value="">Todos los tipos</option>
//             {PROPERTY_TYPES.map((t) => (
//               <option key={t} value={t}>{t}</option>
//             ))}
//           </select>
//         </div>

//         {/* Tabla / Lista */}
//         {loading ? (
//           <div className="text-center py-12 bg-white rounded-xl">
//             <p className="text-gray-500">Cargando propiedades...</p>
//           </div>
//         ) : filteredProperties.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
//             <p className="text-gray-500">No se encontraron propiedades.</p>
//           </div>
//         ) : (
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
//             <table className="w-full text-left border-collapse min-w-[800px]">
//               <thead>
//                 <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-bold uppercase tracking-wider text-gray-500">
//                   <th className="py-3 px-4 w-16 text-center">Orden</th>
//                   <th className="py-3 px-4">Propiedad</th>
//                   <th className="py-3 px-4">Tipo / Zona</th>
//                   <th className="py-3 px-4">Precio</th>
//                   <th className="py-3 px-4 text-center">Destacada</th>
//                   <th className="py-3 px-4 text-center">Estado</th>
//                   <th className="py-3 px-4 text-right">Acciones</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100 text-sm">
//                 {filteredProperties.map((property, index) => {
//                   const mainImg = property.images?.[0] || 'https://via.placeholder.com/150';
//                   return (
//                     <tr key={property.id} className="hover:bg-gray-50/80 transition-colors">
//                       {/* Botones Reordenar */}
//                       <td className="py-3 px-2 text-center">
//                         <div className="flex flex-col items-center gap-1">
//                           <button
//                             onClick={() => moveOrder(index, 'up')}
//                             disabled={index === 0}
//                             className="p-1 text-gray-400 hover:text-black disabled:opacity-20"
//                             aria-label="Mover arriba"
//                           >
//                             <ArrowUp className="w-3.5 h-3.5" />
//                           </button>
//                           <button
//                             onClick={() => moveOrder(index, 'down')}
//                             disabled={index === properties.length - 1}
//                             className="p-1 text-gray-400 hover:text-black disabled:opacity-20"
//                             aria-label="Mover abajo"
//                           >
//                             <ArrowDown className="w-3.5 h-3.5" />
//                           </button>
//                         </div>
//                       </td>

//                       {/* Info Básica */}
//                       <td className="py-3 px-4">
//                         <div className="flex items-center gap-3">
//                           <img
//                             src={mainImg}
//                             alt=""
//                             className="w-12 h-12 rounded-lg object-cover bg-gray-100 shrink-0 border border-gray-200"
//                           />
//                           <div>
//                             <p className="font-bold text-gray-900 line-clamp-1">{property.title}</p>
//                             <span className="text-xs text-gray-500">{property.operation}</span>
//                           </div>
//                         </div>
//                       </td>

//                       {/* Tipo / Zona */}
//                       <td className="py-3 px-4">
//                         <p className="text-xs font-semibold text-gray-800">{property.propertyType}</p>
//                         <p className="text-xs text-gray-500">{property.zone}</p>
//                       </td>

//                       {/* Precio */}
//                       <td className="py-3 px-4 font-bold text-gray-900">
//                         ${property.price.toLocaleString()} USD
//                       </td>

//                       {/* Destacada */}
//                       <td className="py-3 px-4 text-center">
//                         <button
//                           onClick={() => toggleFeatured(property)}
//                           className={`p-2 rounded-full transition-colors ${
//                             property.featured ? 'text-[#C9A961] bg-amber-50' : 'text-gray-300 hover:text-gray-500'
//                           }`}
//                           title={property.featured ? 'Quitar destacada' : 'Marcar destacada'}
//                         >
//                           <Star className="w-5 h-5 fill-current" />
//                         </button>
//                       </td>

//                       {/* Estado */}
//                       <td className="py-3 px-4 text-center">
//                         <div className="flex flex-col items-center gap-1">
//                           <button
//                             onClick={() => toggleActive(property)}
//                             className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
//                               property.active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
//                             }`}
//                           >
//                             {property.active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
//                             {property.active ? 'Visible' : 'Oculta'}
//                           </button>

//                           <button
//                             onClick={() => toggleSold(property)}
//                             className={`text-[10px] underline ${
//                               property.sold ? 'text-red-600 font-bold' : 'text-gray-400'
//                             }`}
//                           >
//                             {property.sold ? 'Marcar Disponible' : 'Marcar Vendida'}
//                           </button>
//                         </div>
//                       </td>

//                       {/* Acciones */}
//                       <td className="py-3 px-4 text-right">
//                         <div className="flex items-center justify-end gap-2">
//                           <Link
//                             to={`/admin/properties/edit/${property.id}`}
//                             className="p-2 text-gray-600 hover:text-[#C9A961] hover:bg-gray-100 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
//                             aria-label="Editar"
//                           >
//                             <Edit className="w-4 h-4" />
//                           </Link>
//                           <button
//                             onClick={() => handleDelete(property.id, property.title)}
//                             className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
//                             aria-label="Eliminar"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }