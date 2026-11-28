import { useState, type FormEvent } from 'react';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '5352365254';

const inputClass =
  'w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded text-xs focus:outline-none focus:border-[#C9A961] focus:bg-white';

/**
 * Formulario de contacto que abre WhatsApp con el mensaje ya escrito.
 * (Antes los formularios mostraban "enviado" pero no mandaban nada.)
 */
export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = [
      `Hola Marianne Houses, mi nombre es ${name.trim()}.`,
      message.trim(),
      email.trim() ? `Mi email: ${email.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n\n');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Su nombre"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputClass}
      />
      <input
        type="email"
        placeholder="Su email (opcional)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
      />
      <textarea
        placeholder="¿Qué tipo de propiedad busca? Zona, presupuesto, venta o renta…"
        rows={4}
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={`${inputClass} h-auto p-3`}
      />
      <button
        type="submit"
        className="w-full h-11 bg-gradient-to-r from-[#D4AF37] to-[#C9A961] hover:brightness-105 text-black font-extrabold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 shadow-sm transition-all"
      >
        <MessageCircle className="w-4 h-4 fill-current" />
        Enviar por WhatsApp
      </button>
      <p className="text-[10px] text-gray-400 text-center">
        Se abrirá WhatsApp con su mensaje listo para enviar.
      </p>
    </form>
  );
}
