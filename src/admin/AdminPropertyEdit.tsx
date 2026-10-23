// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams, Link } from 'react-router-dom';
// import { doc, getDoc, setDoc, updateDoc, collection } from 'firebase/firestore';
// import { db } from '../firebase';
// import { Property, ZONES, PROPERTY_TYPES, OPERATIONS, FEATURES } from './constants';
// import { createSlug } from './slug';
// import { uploadCloudinary } from './uploadCloudinary';
// import { ArrowLeft, Upload, Trash2, Star, Save, Image as ImageIcon } from 'lucide-react';

// export function AdminPropertyEdit() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const isNew = !id || id === 'new';

//   const [uploading, setUploading] = useState(false);
//   const [saving, setSaving] = useState(false);

//   // Form State
//   const [title, setTitle] = useState('');
//   const [operation, setOperation] = useState<typeof OPERATIONS[number]>('Venta');
//   const [zone, setZone] = useState<string>(ZONES[0]);
//   const [address, setAddress] = useState('');
//   const [price, setPrice] = useState<number>(100000);
//   const [bedrooms, setBedrooms] = useState<number>(3);
//   const [bathrooms, setBathrooms] = useState<number>(2);
//   const [area, setArea] = useState<number>(150);
//   const [parking, setParking] = useState<number>(1);
//   const [propertyType, setPropertyType] = useState<typeof PROPERTY_TYPES[number]>('Casa');
//   const [description, setDescription] = useState('');
//   const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
//   const [images, setImages] = useState<string[]>([]);
//   const [videoUrl, setVideoUrl] = useState('');
//   const [whatsapp, setWhatsapp] = useState('+5350000000');
//   const [active, setActive] = useState(true);
//   const [featured, setFeatured] = useState(false);
//   const [sold, setSold] = useState(false);

//   useEffect(() => {
//     if (!isNew && id) {
//       const fetchProperty = async () => {
//         const docRef = doc(db, 'properties', id);
//         const snap = await getDoc(docRef);
//         if (snap.exists()) {
//           const data = snap.data() as Property;
//           setTitle(data.title || '');
//           setOperation(data.operation || 'Venta');
//           setZone(data.zone || ZONES[0]);
//           setAddress(data.address || '');
//           setPrice(data.price || 0);
//           setBedrooms(data.bedrooms || 0);
//           setBathrooms(data.bathrooms || 0);
//           setArea(data.area || 0);
//           setParking(data.parking || 0);
//           setPropertyType(data.propertyType || 'Casa');
//           setDescription(data.description || '');
//           setSelectedFeatures(data.features || []);
//           setImages(data.images || []);
//           setVideoUrl(data.videoUrl || '');
//           setWhatsapp(data.whatsapp || '+5350000000');
//           setActive(data.active ?? true);
//           setFeatured(data.featured ?? false);
//           setSold(data.sold ?? false);
//         }
//       };
//       fetchProperty();
//     }
//   }, [id, isNew]);

//   const handleFeatureToggle = (feature: string) => {
//     setSelectedFeatures((prev) =>
//       prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
//     );
//   };

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files || files.length === 0) return;

//     setUploading(true);
//     try {
//       const uploadPromises = Array.from(files).map((file) => uploadCloudinary(file));
//       const urls = await Promise.all(uploadPromises);
//       setImages((prev) => [...prev, ...urls.filter((u): u is string => u !== null)]);
//     } catch (err) {
//       alert('Error subiendo imágenes');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const removeImage = (index: number) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   const setAsMainImage = (index: number) => {
//     setImages((prev) => {
//       const newArr = [...prev];
//       const [selected] = newArr.splice(index, 1);
//       newArr.unshift(selected);
//       return newArr;
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title.trim()) return alert('El título es requerido');

//     setSaving(true);
//     try {
//       const slug = createSlug(title);
//       const now = Date.now();

//       const propertyData: Omit<Property, 'id'> = {
//         title,
//         slug,
//         operation,
//         zone,
//         address,
//         price: Number(price),
//         currency: 'USD',
//         bedrooms: Number(bedrooms),
//         bathrooms: Number(bathrooms),
//         area: Number(area),
//         parking: Number(parking),
//         propertyType,
//         description,
//         features: selectedFeatures,
//         images,
//         videoUrl,
//         active,
//         featured,
//         sold,
//         whatsapp,
//         displayOrder: isNew ? now : 0,
//         createdAt: isNew ? now : now,
//         updatedAt: now,
//       };

//       if (isNew) {
//         const newDocRef = doc(collection(db, 'properties'));
//         await setDoc(newDocRef, { ...propertyData, displayOrder: now });
//       } else if (id) {
//         const docRef = doc(db, 'properties', id);
//         await updateDoc(docRef, { ...propertyData });
//       }

//       navigate('/admin/properties');
//     } catch (err) {
//       console.error(err);
//       alert('Error guardando la propiedad');
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-900 pb-12">
//       {/* Topbar */}
//       <header className="bg-[#0A0A0A] text-white border-b border-[#C9A961]/30 sticky top-0 z-30">
//         <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
//           <Link
//             to="/admin/properties"
//             className="text-xs text-gray-300 hover:text-[#C9A961] flex items-center gap-1 min-h-[44px]"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Volver
//           </Link>
//           <span className="font-serif text-lg font-bold text-[#C9A961]">
//             {isNew ? 'Nueva Propiedad' : 'Editar Propiedad'}
//           </span>
//           <div className="w-16" />
//         </div>
//       </header>

//       <main className="max-w-5xl mx-auto px-4 mt-8">
//         <form onSubmit={handleSubmit} className="space-y-8">
          
//           {/* Información General */}
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//             <h2 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">Información Principal</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="md:col-span-2">
//                 <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Título de la Propiedad *</label>
//                 <input
//                   type="text"
//                   required
//                   placeholder="Ej. Casa Colonial Restaurada con Piscina"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   className="w-full min-h-[44px] px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A961]"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Operación</label>
//                 <select
//                   value={operation}
//                   onChange={(e) => setOperation(e.target.value as any)}
//                   className="w-full min-h-[44px] px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A961]"
//                 >
//                   {OPERATIONS.map((op) => (
//                     <option key={op} value={op}>{op}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Tipo de Propiedad</label>
//                 <select
//                   value={propertyType}
//                   onChange={(e) => setPropertyType(e.target.value as any)}
//                   className="w-full min-h-[44px] px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A961]"
//                 >
//                   {PROPERTY_TYPES.map((t) => (
//                     <option key={t} value={t}>{t}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Ubicación (Zona)</label>
//                 <select
//                   value={zone}
//                   onChange={(e) => setZone(e.target.value)}
//                   className="w-full min-h-[44px] px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A961]"
//                 >
//                   {ZONES.map((z) => (
//                     <option key={z} value={z}>{z}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Dirección Aproximada</label>
//                 <input
//                   type="text"
//                   placeholder="Ej. Calle 17 e/ 2 y 4"
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                   className="w-full min-h-[44px] px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A961]"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Precio (USD) *</label>
//                 <input
//                   type="number"
//                   required
//                   min="0"
//                   value={price}
//                   onChange={(e) => setPrice(Number(e.target.value))}
//                   className="w-full min-h-[44px] px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A961]"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-bold uppercase text-gray-600 mb-1">WhatsApp de Contacto</label>
//                 <input
//                   type="text"
//                   placeholder="+5350000000"
//                   value={whatsapp}
//                   onChange={(e) => setWhatsapp(e.target.value)}
//                   className="w-full min-h-[44px] px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A961]"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Características Métricas */}
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//             <h2 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">Dimensiones y Espacios</h2>
            
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//               <div>
//                 <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Habitaciones</label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={bedrooms}
//                   onChange={(e) => setBedrooms(Number(e.target.value))}
//                   className="w-full min-h-[44px] px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A961]"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Baños</label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={bathrooms}
//                   onChange={(e) => setBathrooms(Number(e.target.value))}
//                   className="w-full min-h-[44px] px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A961]"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Área (m²)</label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={area}
//                   onChange={(e) => setArea(Number(e.target.value))}
//                   className="w-full min-h-[44px] px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A961]"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Estacionamiento</label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={parking}
//                   onChange={(e) => setParking(Number(e.target.value))}
//                   className="w-full min-h-[44px] px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A961]"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Galería e Imágenes Cloudinary */}
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//             <h2 className="text-lg font-bold text-gray-900 mb-2">Galería de Imágenes</h2>
//             <p className="text-xs text-gray-500 mb-6">Sube las fotos de la propiedad. La primera será la portada.</p>

//             <div className="mb-6">
//               <label className="inline-flex min-h-[44px] items-center px-4 py-2 bg-gray-900 hover:bg-[#C9A961] text-white hover:text-black font-semibold text-xs uppercase tracking-wider rounded-lg cursor-pointer transition-colors">
//                 <Upload className="w-4 h-4 mr-2" />
//                 {uploading ? 'Subiendo fotos...' : 'Seleccionar Fotos'}
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   disabled={uploading}
//                   className="hidden"
//                 />
//               </label>
//             </div>

//             {images.length > 0 ? (
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//                 {images.map((img, idx) => (
//                   <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group bg-gray-50">
//                     <img src={img} alt="" className="w-full h-full object-cover" />
//                     {idx === 0 && (
//                       <span className="absolute top-2 left-2 bg-[#C9A961] text-black font-bold text-[10px] px-2 py-0.5 rounded shadow">
//                         Portada
//                       </span>
//                     )}
//                     <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
//                       {idx !== 0 && (
//                         <button
//                           type="button"
//                           onClick={() => setAsMainImage(idx)}
//                           className="p-2 bg-white text-gray-800 rounded-full hover:bg-[#C9A961] transition-colors"
//                           title="Hacer Portada"
//                         >
//                           <Star className="w-4 h-4" />
//                         </button>
//                       )}
//                       <button
//                         type="button"
//                         onClick={() => removeImage(idx)}
//                         className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
//                         title="Eliminar"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center text-gray-400">
//                 <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
//                 <p className="text-xs">Sin imágenes subidas</p>
//               </div>
//             )}
//           </div>

//           {/* Características Especiales */}
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//             <h2 className="text-lg font-bold text-gray-900 mb-4">Comodidades y Amenidades</h2>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//               {FEATURES.map((feat) => {
//                 const checked = selectedFeatures.includes(feat);
//                 return (
//                   <button
//                     key={feat}
//                     type="button"
//                     onClick={() => handleFeatureToggle(feat)}
//                     className={`min-h-[44px] px-3 py-2 rounded-lg border text-xs font-semibold text-left flex items-center justify-between transition-colors ${
//                       checked
//                         ? 'border-[#C9A961] bg-amber-50/50 text-[#1A1A1A]'
//                         : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
//                     }`}
//                   >
//                     <span>{feat}</span>
//                     <span className={`w-3.5 h-3.5 rounded-full border ${checked ? 'bg-[#C9A961] border-[#C9A961]' : 'border-gray-400'}`} />
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Descripción */}
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//             <h2 className="text-lg font-bold text-gray-900 mb-4">Descripción Detallada</h2>
//             <textarea
//               rows={6}
//               placeholder="Describa la distribución de la propiedad, acabados de lujo, estado de la construcción, etc."
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A961]"
//             />
//           </div>

//           {/* Configuración de Estado */}
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//             <h2 className="text-lg font-bold text-gray-900 mb-4">Visibilidad y Estado</h2>
//             <div className="flex flex-wrap gap-6">
//               <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
//                 <input
//                   type="checkbox"
//                   checked={active}
//                   onChange={(e) => setActive(e.target.checked)}
//                   className="w-5 h-5 accent-[#C9A961] rounded"
//                 />
//                 <span className="text-sm font-semibold text-gray-800">Publicado / Visible en Web</span>
//               </label>

//               <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
//                 <input
//                   type="checkbox"
//                   checked={featured}
//                   onChange={(e) => setFeatured(e.target.checked)}
//                   className="w-5 h-5 accent-[#C9A961] rounded"
//                 />
//                 <span className="text-sm font-semibold text-gray-800">Destacar en la Home</span>
//               </label>

//               <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
//                 <input
//                   type="checkbox"
//                   checked={sold}
//                   onChange={(e) => setSold(e.target.checked)}
//                   className="w-5 h-5 accent-red-600 rounded"
//                 />
//                 <span className="text-sm font-semibold text-gray-800">Marcar como Vendida / Rentada</span>
//               </label>
//             </div>
//           </div>

//           {/* Botón Guardar */}
//           <div className="flex justify-end gap-4">
//             <Link
//               to="/admin/properties"
//               className="min-h-[48px] px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center transition-colors"
//             >
//               Cancelar
//             </Link>
//             <button
//               type="submit"
//               disabled={saving}
//               className="min-h-[48px] px-8 bg-[#C9A961] hover:bg-[#b89750] text-black font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-2 transition-colors shadow-md disabled:opacity-50"
//             >
//               <Save className="w-4 h-4" />
//               {saving ? 'Guardando...' : 'Guardar Propiedad'}
//             </button>
//           </div>

//         </form>
//       </main>
//     </div>
//   );
// }