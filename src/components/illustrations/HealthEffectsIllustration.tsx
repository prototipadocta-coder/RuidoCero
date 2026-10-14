import React, { useState } from 'react';
import { Brain, Zap, Moon, Target, Ear, Heart } from 'lucide-react';

interface HealthEffectsIllustrationProps {
  onSelectEffect?: (effectId: string) => void;
}

export const HealthEffectsIllustration: React.FC<HealthEffectsIllustrationProps> = ({ onSelectEffect }) => {
  const [activeEffect, setActiveEffect] = useState<string | null>(null);

  const effects = [
    {
      id: 'estres',
      label: 'Estrés',
      icon: Brain,
      position: 'top-0 left-8 sm:left-12',
      detail: 'El ruido activa el sistema nervioso simpático, elevando el cortisol y provocando tensión crónica.',
    },
    {
      id: 'dolores',
      label: 'Dolores de cabeza',
      icon: Zap,
      position: 'top-0 right-8 sm:right-12',
      detail: 'La sobreestimulación auditiva desencadena migrañas, cefaleas tensionales y fatiga mental.',
    },
    {
      id: 'sueno',
      label: 'Dificultad para dormir',
      icon: Moon,
      position: 'top-1/3 left-0 sm:left-2',
      detail: 'Ruidos superiores a 40 dB fragmentan el sueño REM, provocando insomnio y agotamiento diurno.',
    },
    {
      id: 'audicion',
      label: 'Pérdida de audición',
      icon: Ear,
      position: 'top-1/3 right-0 sm:right-2',
      detail: 'Destrucción progresiva e irreversible de las células ciliadas del oído interno e inducción de tinnitus.',
    },
    {
      id: 'concentracion',
      label: 'Problemas de concentración',
      icon: Target,
      position: 'bottom-2 left-4 sm:left-10',
      detail: 'Dificulta el aprendizaje, el rendimiento laboral y la retención de memoria a corto plazo.',
    },
    {
      id: 'corazon',
      label: 'Afecta el corazón',
      icon: Heart,
      position: 'bottom-2 right-4 sm:right-10',
      detail: 'Aumenta la presión arterial media y el riesgo de cardiopatías isquémicas e infartos según la OMS.',
    },
  ];

  return (
    <div className="relative w-full max-w-[500px] mx-auto aspect-square flex items-center justify-center p-2 sm:p-4">
      {/* Concentric waves */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[92%] h-[92%] rounded-full border border-emerald-200/50 bg-emerald-50/20" />
        <div className="absolute w-[76%] h-[76%] rounded-full border border-emerald-300/50 bg-emerald-100/30" />
        <div className="absolute w-[62%] h-[62%] rounded-full border border-emerald-400/40 bg-emerald-100/40" />
        <div className="absolute w-[48%] h-[48%] rounded-full border border-emerald-500/30" />
      </div>

      {/* Acoustic Frequency Bars on Left & Right */}
      <div className="absolute left-1 sm:left-6 top-1/2 -translate-y-1/2 flex items-center gap-1 select-none pointer-events-none opacity-70">
        <div className="w-1.5 h-6 bg-slate-700 rounded-full" />
        <div className="w-1.5 h-12 bg-slate-800 rounded-full" />
        <div className="w-1.5 h-16 bg-slate-900 rounded-full" />
        <div className="w-1.5 h-10 bg-slate-800 rounded-full" />
        <div className="w-1.5 h-5 bg-slate-600 rounded-full" />
      </div>

      <div className="absolute right-1 sm:right-6 top-1/2 -translate-y-1/2 flex items-center gap-1 select-none pointer-events-none opacity-70">
        <div className="w-1.5 h-5 bg-slate-600 rounded-full" />
        <div className="w-1.5 h-10 bg-slate-800 rounded-full" />
        <div className="w-1.5 h-16 bg-slate-900 rounded-full" />
        <div className="w-1.5 h-12 bg-slate-800 rounded-full" />
        <div className="w-1.5 h-6 bg-slate-700 rounded-full" />
      </div>

      {/* Central Character: Man with headache and hands on ears */}
      <div className="relative z-10 w-48 sm:w-56 select-none">
        <svg viewBox="0 0 240 280" className="w-full h-auto drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="manSweaterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2e6f40" />
              <stop offset="100%" stopColor="#1e4e2c" />
            </linearGradient>
            <linearGradient id="manSkinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f7d4b2" />
              <stop offset="100%" stopColor="#e5b48e" />
            </linearGradient>
            <linearGradient id="manHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3d2a1d" />
              <stop offset="100%" stopColor="#20150d" />
            </linearGradient>
          </defs>

          {/* Shoulders / Torso */}
          <path
            d="M 45 280 C 45 210, 75 185, 120 185 C 165 185, 195 210, 195 280 Z"
            fill="url(#manSweaterGrad)"
            stroke="#14361e"
            strokeWidth="3"
          />

          {/* Round crewneck collar */}
          <path
            d="M 98 186 C 105 198, 135 198, 142 186"
            fill="none"
            stroke="#14361e"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Neck */}
          <path
            d="M 102 145 L 102 188 C 112 194, 128 194, 138 188 L 138 145 Z"
            fill="url(#manSkinGrad)"
            stroke="#bd8662"
            strokeWidth="2"
          />

          {/* Back Hair */}
          <ellipse cx="120" cy="115" rx="46" ry="52" fill="url(#manHairGrad)" />

          {/* Face Base */}
          <path
            d="M 86 100 C 86 65, 154 65, 154 100 C 154 145, 138 165, 120 165 C 102 165, 86 145, 86 100 Z"
            fill="url(#manSkinGrad)"
            stroke="#bd8662"
            strokeWidth="2.5"
          />

          {/* Hair Front Cut */}
          <path
            d="M 80 95 C 80 60, 105 45, 120 45 C 135 45, 160 60, 160 95 C 152 82, 140 76, 128 84 C 118 75, 96 78, 80 95 Z"
            fill="url(#manHairGrad)"
          />
          {/* Sideburns */}
          <rect x="84" y="90" width="7" height="22" rx="3" fill="url(#manHairGrad)" />
          <rect x="149" y="90" width="7" height="22" rx="3" fill="url(#manHairGrad)" />

          {/* Agonized Brows */}
          <path d="M 96 98 Q 106 94 114 102" fill="none" stroke="#2b1c11" strokeWidth="3" strokeLinecap="round" />
          <path d="M 144 98 Q 134 94 126 102" fill="none" stroke="#2b1c11" strokeWidth="3" strokeLinecap="round" />
          {/* Forehead stress lines */}
          <path d="M 112 88 Q 120 86 128 88" stroke="#bd8662" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M 115 92 Q 120 90 125 92" stroke="#bd8662" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Tightly Squeezed Eyes */}
          <path d="M 98 110 Q 106 118 114 112" fill="none" stroke="#20150d" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M 142 110 Q 134 118 126 112" fill="none" stroke="#20150d" strokeWidth="3.2" strokeLinecap="round" />
          {/* Eye corner pain lines */}
          <path d="M 94 108 L 91 106" stroke="#bd8662" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 146 108 L 149 106" stroke="#bd8662" strokeWidth="1.8" strokeLinecap="round" />

          {/* Nose */}
          <path d="M 120 110 L 118 124 Q 120 127 124 125" fill="none" stroke="#99603c" strokeWidth="2.4" strokeLinecap="round" />

          {/* Grimacing / Clenched Mouth */}
          <path d="M 106 142 Q 112 138 120 141 Q 128 138 134 142" fill="none" stroke="#682121" strokeWidth="3" strokeLinecap="round" />
          <line x1="108" y1="145" x2="132" y2="145" stroke="#99603c" strokeWidth="1.5" strokeLinecap="round" />

          {/* Arms & Hands raised to ears / temples */}
          {/* Left Arm */}
          <path
            d="M 52 225 C 50 170, 68 130, 80 115 C 88 108, 96 114, 96 126 C 96 145, 80 190, 75 235 Z"
            fill="url(#manSweaterGrad)"
            stroke="#14361e"
            strokeWidth="3"
          />
          {/* Left Hand */}
          <path
            d="M 76 118 C 72 106, 82 96, 92 98 C 96 100, 97 110, 96 124 C 92 136, 84 144, 76 132 Z"
            fill="url(#manSkinGrad)"
            stroke="#bd8662"
            strokeWidth="2.5"
          />

          {/* Right Arm */}
          <path
            d="M 188 225 C 190 170, 172 130, 160 115 C 152 108, 144 114, 144 126 C 144 145, 160 190, 165 235 Z"
            fill="url(#manSweaterGrad)"
            stroke="#14361e"
            strokeWidth="3"
          />
          {/* Right Hand */}
          <path
            d="M 164 118 C 168 106, 158 96, 148 98 C 144 100, 143 110, 144 124 C 148 136, 156 144, 164 132 Z"
            fill="url(#manSkinGrad)"
            stroke="#bd8662"
            strokeWidth="2.5"
          />
        </svg>
      </div>

      {/* 6 Circular Health Impact Badges matching mockup */}
      {effects.map((item) => {
        const Icon = item.icon;
        const isActive = activeEffect === item.id;
        return (
          <div key={item.id} className={`absolute ${item.position} z-20 flex flex-col items-center`}>
            <button
              onClick={() => {
                setActiveEffect(isActive ? null : item.id);
                onSelectEffect?.(item.id);
              }}
              onMouseEnter={() => setActiveEffect(item.id)}
              onMouseLeave={() => setActiveEffect(null)}
              className={`flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full border-2 transition-all duration-200 shadow-sm ${
                isActive
                  ? 'bg-emerald-600 text-white border-emerald-700 scale-110 shadow-md ring-4 ring-emerald-200'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-500 hover:text-emerald-700 hover:scale-105'
              }`}
              aria-label={item.label}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
            </button>
            <span className="mt-1 text-[11px] sm:text-xs font-semibold text-slate-800 text-center max-w-[90px] leading-tight">
              {item.label}
            </span>

            {/* Tooltip on active */}
            {isActive && (
              <div className="absolute z-30 top-full mt-2 w-48 sm:w-56 p-2.5 bg-slate-900 text-white text-xs rounded-xl shadow-xl pointer-events-none animate-in fade-in zoom-in-95 duration-200">
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
