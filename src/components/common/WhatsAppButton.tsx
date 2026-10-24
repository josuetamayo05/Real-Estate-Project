import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string; // Formato internacional sin + ni espacios, ej: 5351234567
}

export function WhatsAppButton({ phoneNumber = '5352365254' }: WhatsAppButtonProps) {
  const message = encodeURIComponent('Hola Marianne Houses, quisiera consultar sobre sus propiedades disponibles.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
    >
      <MessageCircle className="w-7 h-7 fill-current" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 text-xs font-bold uppercase tracking-wider transition-all duration-500 ease-in-out">
        WhatsApp Directo
      </span>
    </a>
  );
}