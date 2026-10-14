import React from 'react';
import { ArrowRight, ShieldAlert, HeartPulse } from 'lucide-react';
import { HealthEffectsIllustration } from '../illustrations/HealthEffectsIllustration';

interface HealthEffectsSectionProps {
  onLearnMore: () => void;
  onNavigateToSolutions?: () => void;
}

export const HealthEffectsSection: React.FC<HealthEffectsSectionProps> = ({
  onLearnMore,
  onNavigateToSolutions,
}) => {
  return (
    <section id="efectos" className="relative w-full py-8 md:py-14 lg:py-18 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Paragraphs, Conoce más button (Matching Screen 2) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-slate-900 leading-[1.15] tracking-tight">
              Efectos en la salud
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              <p>
                La contaminación auditiva puede causar estrés, ansiedad, dolores de cabeza, dificultad para dormir, pérdida de audición y problemas de concentración.
              </p>
              <p>
                La exposición constante a ruidos fuertes también puede afectar el corazón y la calidad de vida.
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
                onClick={onNavigateToSolutions}
                className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-emerald-800 hover:text-emerald-950 px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                <span>Descubre las soluciones</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Medical Fact Snippet */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 max-w-xl flex items-start gap-3">
              <HeartPulse className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-800">Dato de la OMS:</span> Más de 12.000 muertes prematuras al año en Europa están relacionadas con el estrés cardiovascular provocado por el ruido ambiental urbano.
              </p>
            </div>
          </div>

          {/* Right Column: Character with Headache & 6 Health Badges */}
          <div className="lg:col-span-6 flex justify-center">
            <HealthEffectsIllustration />
          </div>

        </div>
      </div>
    </section>
  );
};
