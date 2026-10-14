import React, { useState } from 'react';
import { Volume1, Headphones, TreePine, FileText, Megaphone } from 'lucide-react';

interface SolutionsIllustrationProps {
  onSelectSolution?: (solutionId: string) => void;
}

export const SolutionsIllustration: React.FC<SolutionsIllustrationProps> = ({ onSelectSolution }) => {
  const [activeSolution, setActiveSolution] = useState<string | null>(null);

  const solutions = [
    {
      id: 'volumen',
      label: 'Reduce el volumen',
      icon: Volume1,
      position: 'top-1 sm:top-2 left-1/4 -translate-x-1/2',
      detail: 'Mantén televisores, altavoces y auriculares por debajo del 60% de su capacidad para evitar daño auditivo.',
    },
    {
      id: 'protectores',
      label: 'Usa protectores auditivos',
      icon: Headphones,
      position: 'top-8 sm:top-10 right-2 sm:right-6',
      detail: 'Utiliza tapones o cascos en conciertos, obras de construcción, viajes en metro o áreas industriales.',
    },
    {
      id: 'arboles',
      label: 'Planta árboles',
      icon: TreePine,
      position: 'top-1/2 -translate-y-8 left-0 sm:left-2',
      detail: 'La vegetación densa y las barreras vivas absorben y dispersan hasta 10 dB de ruido ambiental urbano.',
    },
    {
      id: 'limites',
      label: 'Respeta los límites de ruido',
      icon: FileText,
      position: 'top-1/2 -translate-y-4 right-0 sm:right-2',
      detail: 'Cumple las ordenanzas municipales sobre horarios de descanso (especialmente entre las 22:00 y las 07:00).',
    },
    {
      id: 'concientizacion',
      label: 'Promueve campañas de concientización',
      icon: Megaphone,
      position: 'bottom-0 left-1/2 -translate-x-1/2',
      detail: 'Difunde buenas prácticas sonoras en escuelas, centros de trabajo y juntas de vecinos comunitarias.',
    },
  ];

  return (
    <div className="relative w-full max-w-[500px] mx-auto aspect-square flex items-center justify-center p-2 sm:p-4">
      {/* Soothing Concentric Harmonic Circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[88%] h-[88%] rounded-full border border-emerald-200/60 bg-emerald-50/30" />
        <div className="absolute w-[72%] h-[72%] rounded-full border border-emerald-300/50 bg-emerald-100/30" />
        <div className="absolute w-[56%] h-[56%] rounded-full border border-emerald-400/40 bg-emerald-100/40" />
        <div className="absolute w-[42%] h-[42%] rounded-full border-2 border-emerald-500/30" />
      </div>

      {/* Central Character: Serene Woman with Green Headphones */}
      <div className="relative z-10 w-48 sm:w-56 select-none">
        <svg viewBox="0 0 240 280" className="w-full h-auto drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="peaceSweaterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b7a57" />
              <stop offset="100%" stopColor="#25523a" />
            </linearGradient>
            <linearGradient id="peaceSkinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fae0cb" />
              <stop offset="100%" stopColor="#ebc2a2" />
            </linearGradient>
            <linearGradient id="peaceHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2e231d" />
              <stop offset="100%" stopColor="#1a1410" />
            </linearGradient>
            <linearGradient id="headphoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>

          {/* Shoulders / Torso */}
          <path
            d="M 45 280 C 45 210, 75 185, 120 185 C 165 185, 195 210, 195 280 Z"
            fill="url(#peaceSweaterGrad)"
            stroke="#173626"
            strokeWidth="3"
          />

          {/* Collar */}
          <path
            d="M 100 186 C 105 198, 135 198, 140 186"
            fill="none"
            stroke="#173626"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Neck */}
          <path
            d="M 104 150 L 104 188 C 112 194, 128 194, 136 188 L 136 150 Z"
            fill="url(#peaceSkinGrad)"
            stroke="#c49069"
            strokeWidth="2"
          />

          {/* Back Hair */}
          <ellipse cx="120" cy="130" rx="54" ry="58" fill="url(#peaceHairGrad)" />

          {/* Face Base */}
          <path
            d="M 86 105 C 86 65, 154 65, 154 105 C 154 150, 136 168, 120 168 C 104 168, 86 150, 86 105 Z"
            fill="url(#peaceSkinGrad)"
            stroke="#c49069"
            strokeWidth="2.5"
          />

          {/* Soft Hair framing */}
          <path
            d="M 85 95 C 85 62, 105 48, 120 48 C 135 48, 155 62, 155 95 C 145 84, 132 82, 120 88 C 108 82, 95 84, 85 95 Z"
            fill="url(#peaceHairGrad)"
          />
          {/* Hair locks flowing behind shoulders */}
          <path
            d="M 82 105 C 78 145, 84 185, 88 215 C 82 190, 75 155, 76 105 Z"
            fill="url(#peaceHairGrad)"
          />
          <path
            d="M 158 105 C 162 145, 156 185, 152 215 C 158 190, 165 155, 164 105 Z"
            fill="url(#peaceHairGrad)"
          />

          {/* Calm, Gentle Eyebrows */}
          <path d="M 96 102 Q 106 97 114 101" fill="none" stroke="#2e231d" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M 144 102 Q 134 97 126 101" fill="none" stroke="#2e231d" strokeWidth="2.6" strokeLinecap="round" />

          {/* Relaxed closed/smiling eyes */}
          <path d="M 98 114 Q 106 122 114 114" fill="none" stroke="#1a1410" strokeWidth="3" strokeLinecap="round" />
          <path d="M 142 114 Q 134 122 126 114" fill="none" stroke="#1a1410" strokeWidth="3" strokeLinecap="round" />

          {/* Cheerful blush */}
          <ellipse cx="98" cy="126" rx="8" ry="4" fill="#f87171" opacity="0.3" />
          <ellipse cx="142" cy="126" rx="8" ry="4" fill="#f87171" opacity="0.3" />

          {/* Cute Nose */}
          <path d="M 120 114 L 118 126 Q 120 128 123 127" fill="none" stroke="#a66e48" strokeWidth="2.2" strokeLinecap="round" />

          {/* Serene Smiling Mouth */}
          <path d="M 108 142 Q 120 152 132 142" fill="none" stroke="#881337" strokeWidth="3.2" strokeLinecap="round" />

          {/* Green Noise-Canceling Headphones */}
          {/* Headband arch */}
          <path
            d="M 74 115 C 70 50, 170 50, 166 115"
            fill="none"
            stroke="#15803d"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Headband inner cushion */}
          <path
            d="M 85 92 C 95 62, 145 62, 155 92"
            fill="none"
            stroke="#86efac"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Left Earcup */}
          <g>
            <ellipse cx="76" cy="116" rx="14" ry="22" fill="url(#headphoneGrad)" stroke="#166534" strokeWidth="3" />
            <ellipse cx="78" cy="116" rx="8" ry="14" fill="#14532d" />
            {/* Cushion ring */}
            <ellipse cx="73" cy="116" rx="5" ry="18" fill="#15803d" />
          </g>

          {/* Right Earcup */}
          <g>
            <ellipse cx="164" cy="116" rx="14" ry="22" fill="url(#headphoneGrad)" stroke="#166534" strokeWidth="3" />
            <ellipse cx="162" cy="116" rx="8" ry="14" fill="#14532d" />
            {/* Cushion ring */}
            <ellipse cx="167" cy="116" rx="5" ry="18" fill="#15803d" />
          </g>
        </svg>
      </div>

      {/* 5 Solution Circular Badges matching mockup */}
      {solutions.map((item) => {
        const Icon = item.icon;
        const isActive = activeSolution === item.id;
        return (
          <div key={item.id} className={`absolute ${item.position} z-20 flex flex-col items-center`}>
            <button
              onClick={() => {
                setActiveSolution(isActive ? null : item.id);
                onSelectSolution?.(item.id);
              }}
              onMouseEnter={() => setActiveSolution(item.id)}
              onMouseLeave={() => setActiveSolution(null)}
              className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 transition-all duration-200 shadow-sm ${
                isActive
                  ? 'bg-emerald-600 text-white border-emerald-700 scale-110 shadow-md ring-4 ring-emerald-200'
                  : 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-600 hover:text-white hover:scale-105'
              }`}
              aria-label={item.label}
            >
              <Icon className="w-6 h-6 stroke-[2]" />
            </button>
            <span className="mt-1 text-[11px] sm:text-xs font-semibold text-slate-800 text-center max-w-[105px] leading-tight">
              {item.label}
            </span>

            {/* Tooltip on active */}
            {isActive && (
              <div className="absolute z-30 top-full mt-2 w-52 sm:w-60 p-2.5 bg-slate-900 text-white text-xs rounded-xl shadow-xl pointer-events-none animate-in fade-in zoom-in-95 duration-200">
                <p className="font-semibold text-emerald-400 mb-0.5">{item.label}</p>
                <p className="text-slate-300 text-[11px] leading-relaxed">{item.detail}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
