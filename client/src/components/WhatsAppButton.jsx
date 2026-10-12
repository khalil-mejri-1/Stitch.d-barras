import React, { useState } from 'react';

export const formatWhatsAppNumber = (phone) => {
  if (!phone) return '33630246109';
  let cleaned = String(phone).replace(/[^0-9]/g, '');
  if (cleaned.startsWith('00')) {
    cleaned = cleaned.substring(2);
  }
  if (cleaned.startsWith('0')) {
    cleaned = '33' + cleaned.substring(1);
  }
  return cleaned || '33630246109';
};

const WhatsAppButton = ({ phone }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cleanNumber = formatWhatsAppNumber(phone);
  const message = encodeURIComponent("Bonjour Stitch Débarras, je souhaite obtenir un devis / renseignement.");
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;

  return (
    <div 
      className="fixed bottom-6 right-6 z-[90] flex items-center gap-3 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Tooltip Pill */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`hidden sm:flex items-center gap-2.5 bg-[#1e0a2d]/95 backdrop-blur-md text-white border border-[#25D366]/40 px-4 py-2.5 rounded-2xl shadow-2xl transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse"></span>
        <div className="text-left">
          <p className="text-xs font-black text-white">Discutez sur WhatsApp</p>
          <p className="text-[10px] text-gray-300">Réponse rapide 7j/7</p>
        </div>
      </a>

      {/* Circular WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter Stitch Débarras sur WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.7)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        {/* Animated Radar Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 group-hover:opacity-55 animate-ping pointer-events-none"></span>

        {/* Online Indicator Badge */}
        <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#00d26a] border-2 border-[#1e0a2d] flex items-center justify-center shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
        </span>

        {/* Official WhatsApp SVG Icon */}
        <svg 
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-md transition-transform group-hover:rotate-12 duration-300" 
          viewBox="0 0 24 24"
        >
          <path d="M17.507 14.307l-.009.075c-2.199-1.096-2.429-1.242-2.713-.815-.166.249-.642.808-.788.969-.146.162-.292.182-.538.06-.246-.123-1.042-.384-1.984-1.224-.733-.654-1.228-1.463-1.372-1.71-.144-.247-.015-.38.107-.502.11-.11.246-.287.369-.431.123-.144.164-.247.246-.411.082-.164.041-.308-.021-.431-.062-.123-.554-1.334-.76-1.826-.2-.48-.404-.415-.555-.423-.143-.008-.308-.01-.472-.01-.164 0-.431.062-.656.308-.226.246-.862.842-.862 2.053 0 1.211.883 2.381 1.006 2.545.123.164 1.737 2.653 4.209 3.719.588.254 1.047.406 1.406.52.59.188 1.127.161 1.551.098.473-.07 1.455-.595 1.66-1.17.205-.575.205-1.067.144-1.17-.062-.102-.226-.164-.472-.287m-5.467 7.693c-2.003 0-3.957-.525-5.679-1.52l-.407-.238-4.22 1.107 1.127-4.114-.261-.416c-1.095-1.742-1.673-3.759-1.673-5.819 0-6.075 4.945-11.02 11.026-11.02 2.942 0 5.708 1.147 7.788 3.23 2.079 2.083 3.224 4.852 3.221 7.798 0 6.078-4.947 11.023-11.026 11.023m8.544-19.57c-2.28-2.285-5.316-3.543-8.544-3.543-6.657 0-12.075 5.42-12.077 12.08 0 2.13.557 4.212 1.616 6.046l-1.716 6.27 6.413-1.682c1.769.965 3.766 1.474 5.807 1.475h.005c6.655 0 12.075-5.42 12.078-12.081 0-3.226-1.255-6.26-3.535-8.545" />
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppButton;
