const CLOUD_NAME = "fscqxubu";
const UPLOAD_PRESET = "marianne_houses";

/**
 * Devuelve la URL de Cloudinary optimizada (formato WebP/AVIF automático,
 * calidad automática y ancho máximo). Las URLs que no son de Cloudinary se
 * devuelven tal cual.
 */
export function optimizeImage(url: string, width = 1600): string {
  if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
  if (/\/upload\/[^/]*(f_auto|q_auto)/.test(url)) return url;
  return url.replace('/upload/', `/upload/f_auto,q_auto,c_limit,w_${width}/`);
}

export async function uploadImageToCloudinary(file: File, folder: string = 'properties'): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', folder);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Error al subir la imagen a Cloudinary');
  }

  const data = await response.json();
  return data.secure_url;
}