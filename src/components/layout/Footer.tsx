import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../icons/SocialIcons';

export function Footer() {
  return (
    <footer className="bg-[#EFEFEF] text-gray-800 border-t border-gray-200 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-5">
        
        {/* Logo Footer */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-[#C9A961] flex items-center justify-center rounded-sm">
            <span className="font-serif text-xl font-bold text-[#C9A961]">M</span>
          </div>
          <span className="font-serif text-xs tracking-widest font-bold text-gray-900">MARIANNE HOUSES</span>
        </div>

        {/* Redes Sociales */}
        <div className="flex gap-4 text-gray-800">
          <a href="#social" className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-[#C9A961] transition-colors">
            <MessageCircle className="w-3.5 h-3.5" />
          </a>
          <a href="#social" className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-[#C9A961] transition-colors">
            <FacebookIcon className="w-3.5 h-3.5" />
          </a>
          <a href="#social" className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-[#C9A961] transition-colors">
            <InstagramIcon className="w-3.5 h-3.5" />
          </a>
          <a href="#social" className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-[#C9A961] transition-colors">
            <YoutubeIcon className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Datos de Contacto */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-gray-700">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gray-800" />
            <span>Via Cernazicuta, Pandolora 533 A, Habana, ka habana</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-gray-800" />
            <span>(112) 357 7880</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-gray-800" />
            <span>mariannehouses.com</span>
          </div>
        </div>

        <div className="text-[10px] text-gray-500 pt-4 border-t border-gray-300 w-full">
          Copyright © Marianne Houses
        </div>

      </div>
    </footer>
  );
}