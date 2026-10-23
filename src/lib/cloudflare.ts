export function getCloudflareImageUrl(
  imageIdOrUrl: string, 
  variant: 'public' | 'thumb' | 'card' | 'hero' = 'public'
): string {
  // Si ya es una URL completa (http/https), devolverla directamente
  if (imageIdOrUrl.startsWith('http://') || imageIdOrUrl.startsWith('https://')) {
    return imageIdOrUrl;
  }

  // De lo contrario, formatear con la URL de entrega de Cloudflare
  const deliveryUrl = import.meta.env.VITE_CLOUDFLARE_DELIVERY_URL || 'https://imagedelivery.net/demo';
  return `${deliveryUrl}/${imageIdOrUrl}/${variant}`;
}