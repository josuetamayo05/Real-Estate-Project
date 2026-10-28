const CLOUD_NAME = "fscqxubu";
const UPLOAD_PRESET = "marianne_houses";

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