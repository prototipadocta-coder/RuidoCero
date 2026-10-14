import React, { useState } from 'react';
import { Car, Hammer, Volume2, Music, AlertTriangle } from 'lucide-react';

interface WhatIsNoiseIllustrationProps {
  onSelectCause?: (cause: string) => void;
}

export const WhatIsNoiseIllustration: React.FC<WhatIsNoiseIllustrationProps> = ({ onSelectCause }) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const causes = [
    {
      id: 'trafico',
      label: 'Tráfico vehicular',
      level: '85 - 90 dB',
      desc: 'El tránsito constante de automóviles, autobuses y motocicletas es la principal fuente de ruido urbano.',
      icon: Car,
      position: 'top-2 sm:top-4 left-1/2 -translate-x-1/2',
    },
    {
      id: 'construccion',
      label: 'Construcción y obras',
      level: '100 - 110 dB',
      desc: 'Martillos neumáticos, excavadoras y herramientas pesadas generan vibraciones y decibeles peligrosos.',
      icon: Hammer,
      position: 'top-16 sm:top-20 left-2 sm:left-6',
    },
    {
      id: 'altavoces',
      label: 'Sonidos intensos',
      level: '95 - 115 dB',
      desc: 'Megáfonos comerciales, alarmas y altavoces en espacios públicos sin control acústico.',
      icon: Volume2,
      position: 'top-16 sm:top-20 right-2 sm:right-6',
    },
    {
      id: 'musica',
      label: 'Música a alto volumen',
      level: '90 - 105 dB',
      desc: 'Bares, discotecas o parlantes residenciales que superan el límite seguro de decibeles.',
      icon: Music,
      position: 'bottom-16 sm:bottom-20 right-4 sm:right-10',
    },
  ];

  return (
    <div className="relative w-full max-w-[460px] mx-auto aspect-square flex items-center justify-center p-4">
      {/* Concentric soundwaves radiating in emerald tones */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[88%] h-[88%] rounded-full border border-emerald-200/50 bg-emerald-50/20 animate-pulse-slow" />
        <div className="absolute w-[74%] h-[74%] rounded-full border border-emerald-300/60 bg-emerald-100/30" />
        <div className="absolute w-[60%] h-[60%] rounded-full border border-emerald-400/50 bg-emerald-100/40" />
        <div className="absolute w-[46%] h-[46%] rounded-full border-2 border-emerald-500/40" />
      </div>

      {/* Acoustic Frequency Bars on Left & Right */}
      <div className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 select-none pointer-events-none opacity-80">
        <div className="w-1.5 h-6 bg-slate-700 rounded-full" />
        <div className="w-1.5 h-10 bg-slate-800 rounded-full" />
        <div className="w-1.5 h-16 bg-slate-900 rounded-full" />
        <div className="w-1.5 h-12 bg-slate-800 rounded-full" />
        <div className="w-1.5 h-8 bg-slate-700 rounded-full" />
        <div className="w-1.5 h-14 bg-slate-900 rounded-full" />
        <div className="w-1.5 h-5 bg-slate-600 rounded-full" />
      </div>

      <div className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 select-none pointer-events-none opacity-80">
        <div className="w-1.5 h-5 bg-slate-600 rounded-full" />
        <div className="w-1.5 h-12 bg-slate-800 rounded-full" />
        <div className="w-1.5 h-16 bg-slate-900 rounded-full" />
        <div className="w-1.5 h-10 bg-slate-800 rounded-full" />
        <div className="w-1.5 h-14 bg-slate-900 rounded-full" />
        <div className="w-1.5 h-7 bg-slate-700 rounded-full" />
      </div>

      {/* Central Character: Woman covering ears in distress */}
      <div className="relative z-10 w-52 sm:w-64 select-none">
        <svg viewBox="0 0 240 280" className="w-full h-auto drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sweaterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#436850" />
              <stop offset="100%" stopColor="#2c4736" />
            </linearGradient>
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f8d5b8" />
              <stop offset="100%" stopColor="#e8b997" />
            </linearGradient>
            <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#262626" />
              <stop offset="100%" stopColor="#171717" />
            </linearGradient>
          </defs>

          {/* Shoulders / Torso */}
          <path
            d="M 50 280 C 50 210, 80 185, 120 185 C 160 185, 190 210, 190 280 Z"
            fill="url(#sweaterGrad)"
            stroke="#1b2e23"
            strokeWidth="3"
          />

          {/* Collar detail */}
          <path
            d="M 100 186 C 105 200, 135 200, 140 186"
            fill="none"
            stroke="#1b2e23"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Neck */}
          <path
            d="M 104 150 L 104 190 C 112 195, 128 195, 136 190 L 136 150 Z"
            fill="url(#skinGrad)"
            stroke="#c9916b"
            strokeWidth="2"
          />

          {/* Back Hair */}
          <ellipse cx="120" cy="130" rx="55" ry="60" fill="url(#hairGrad)" />

          {/* Head Base */}
          <path
            d="M 85 110 C 85 70, 155 70, 155 110 C 155 150, 135 170, 120 170 C 105 170, 85 150, 85 110 Z"
            fill="url(#skinGrad)"
            stroke="#c9916b"
            strokeWidth="2.5"
          />

          {/* Facial Features (Distressed) */}
          {/* Eyebrows angled inward with pain */}
          <path d="M 98 102 Q 106 100 114 105" fill="none" stroke="#262626" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 142 102 Q 134 100 126 105" fill="none" stroke="#262626" strokeWidth="2.8" strokeLinecap="round" />
          {/* Wrinkle lines between brows */}
          <path d="M 118 102 L 118 106" stroke="#9a6744" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 122 102 L 122 106" stroke="#9a6744" strokeWidth="1.5" strokeLinecap="round" />

          {/* Eyes squeezed shut tightly */}
          <path d="M 97 114 Q 106 120 114 115" fill="none" stroke="#171717" strokeWidth="3" strokeLinecap="round" />
          <path d="M 143 114 Q 134 120 126 115" fill="none" stroke="#171717" strokeWidth="3" strokeLinecap="round" />

          {/* Nose */}
          <path d="M 120 115 L 118 128 Q 120 131 123 129" fill="none" stroke="#a36e4b" strokeWidth="2.2" strokeLinecap="round" />

          {/* Grimacing mouth pressed tight / slightly wavy */}
          <path d="M 107 146 Q 114 142 120 145 Q 126 148 133 144" fill="none" stroke="#7a2e2e" strokeWidth="3" strokeLinecap="round" />

          {/* Front Hair Bangs */}
          <path
            d="M 85 105 C 85 75, 105 60, 120 60 C 135 60, 155 75, 155 105 C 145 92, 130 90, 120 98 C 110 90, 95 92, 85 105 Z"
            fill="url(#hairGrad)"
          />
          <path
            d="M 82 100 C 80 135, 90 155, 92 165 C 88 150, 82 130, 80 105 Z"
            fill="url(#hairGrad)"
          />
          <path
            d="M 158 100 C 160 135, 150 155, 148 165 C 152 150, 158 130, 160 105 Z"
            fill="url(#hairGrad)"
          />

          {/* Left Hand covering left ear */}
          <g>
            <path
              d="M 60 210 C 60 160, 72 120, 82 110 C 88 105, 96 110, 96 122 C 96 140, 85 180, 80 220 Z"
              fill="url(#sweaterGrad)"
              stroke="#1b2e23"
              strokeWidth="3"
            />
            {/* Hand & fingers */}
            <path
              d="M 78 115 C 75 105, 84 96, 92 98 C 96 100, 98 108, 97 122 C 94 135, 86 145, 78 135 Z"
              fill="url(#skinGrad)"
              stroke="#c9916b"
              strokeWidth="2.5"
            />
            <path d="M 84 104 C 86 112, 86 122, 87 130" stroke="#c9916b" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 89 104 C 91 112, 91 122, 92 130" stroke="#c9916b" strokeWidth="1.8" strokeLinecap="round" />
          </g>

          {/* Right Hand covering right ear */}
          <g>
            <path
              d="M 180 210 C 180 160, 168 120, 158 110 C 152 105, 144 110, 144 122 C 144 140, 155 180, 160 220 Z"
              fill="url(#sweaterGrad)"
              stroke="#1b2e23"
              strokeWidth="3"
            />
            {/* Hand & fingers */}
            <path
              d="M 162 115 C 165 105, 156 96, 148 98 C 144 100, 142 108, 143 122 C 146 135, 154 145, 162 135 Z"
              fill="url(#skinGrad)"
              stroke="#c9916b"
              strokeWidth="2.5"
            />
            <path d="M 156 104 C 154 112, 154 122, 153 130" stroke="#c9916b" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 151 104 C 149 112, 149 122, 148 130" stroke="#c9916b" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* Floating Badges with Icons */}
      {causes.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeItem === item.id;
        return (
          <div key={item.id} className={`absolute ${item.position} z-20`}>
            <button
              onClick={() => {
                setActiveItem(isActive ? null : item.id);
                onSelectCause?.(item.id);
              }}
              onMouseEnter={() => setActiveItem(item.id)}
              onMouseLeave={() => setActiveItem(null)}
              className={`group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 transition-all duration-300 shadow-sm ${
                isActive
                  ? 'bg-emerald-600 text-white border-emerald-700 scale-110 shadow-md ring-4 ring-emerald-200'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-500 hover:text-emerald-700 hover:scale-105'
              }`}
              title={item.label}
              aria-label={item.label}
            >
              <IconComponent className="w-6 h-6 stroke-[2]" />
            </button>

            {/* Hover tooltip / active card */}
            {isActive && (
              <div className="absolute z-30 left-1/2 -translate-x-1/2 mt-2 w-52 sm:w-60 p-2.5 bg-slate-900 text-white text-xs rounded-xl shadow-xl pointer-events-none animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between font-semibold mb-1 text-emerald-400">
                  <span>{item.label}</span>
                  <span className="bg-emerald-950 px-1.5 py-0.5 rounded text-[10px] text-emerald-300 font-mono">
                    {item.level}
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">{item.desc}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
