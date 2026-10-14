import React, { useState } from 'react';
import { ArrowRight, Volume2, Info, CheckCircle2 } from 'lucide-react';
import { WhatIsNoiseIllustration } from '../illustrations/WhatIsNoiseIllustration';

interface WhatIsNoiseSectionProps {
  onLearnMore: () => void;
  onNavigateToCauses?: () => void;
}

export const WhatIsNoiseSection: React.FC<WhatIsNoiseSectionProps> = ({
  onLearnMore,
  onNavigateToCauses,
}) => {
  const [selectedCauseId, setSelectedCauseId] = useState<string | null>(null);

  return (
    <section id="que-es" className="relative w-full py-8 md:py-14 lg:py-18 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Paragraphs, Conoce más button (Matching Screen 1) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-slate-900 leading-[1.15] tracking-tight">
              ¿Qué es la contaminación auditiva?
            </h1>

            <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              <p>
                La contaminación auditiva es el exceso de ruido en el ambiente que puede afectar la salud y el bienestar de las personas.
              </p>
              <p>
                Es causada por el tráfico, la construcción, la música a alto volumen y otras actividades que generan sonidos intensos.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onLearnMore}
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 active:scale-98 cursor-pointer"
              >
                Conoce más
              </button>

              <button
                onClick={onNavigateToCauses}
                className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-emerald-800 hover:text-emerald-950 px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                <span>Ver causas frecuentes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Micro Decibel Quick Indicator */}
            <div className="pt-2 border-t border-slate-100 flex items-center gap-4 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Límite saludable OMS:</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-mono font-medium">
                &lt; 53 dB (Día)
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono font-medium">
                &lt; 45 dB (Noche)
              </span>
            </div>
          </div>

          {/* Right Column: Exact Character Illustration with Soundwaves and Orbiting Badges */}
          <div className="lg:col-span-6 flex justify-center">
            <WhatIsNoiseIllustration onSelectCause={(cause) => setSelectedCauseId(cause)} />
          </div>

        </div>
      </div>
    </section>
  );
};
