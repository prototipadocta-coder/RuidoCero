import React from 'react';
import { Check, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { SolutionsIllustration } from '../illustrations/SolutionsIllustration';

interface SolutionsSectionProps {
  onLearnMore: () => void;
  onNavigateToAct?: () => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({
  onLearnMore,
  onNavigateToAct,
}) => {
  const solutionsList = [
    'Reducir el volumen de equipos de sonido.',
    'Usar protectores auditivos en lugares ruidosos.',
    'Respetar los límites de ruido.',
    'Plantar árboles, ya que ayudan a disminuir el sonido.',
    'Promover campañas de concientización sobre el ruido.',
  ];

  return (
    <section id="soluciones" className="relative w-full py-8 md:py-14 lg:py-18 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, 5 Checked Items, Conoce más button (Matching Screen 3) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-slate-900 leading-[1.15] tracking-tight">
              Soluciones
            </h2>

            {/* Checked List with emerald checkmark discs */}
            <div className="space-y-3.5 sm:space-y-4 max-w-xl">
              {solutionsList.map((item, index) => (
                <div key={index} className="flex items-start gap-3.5 group">
                  <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-600 text-white shrink-0 mt-0.5 shadow-xs group-hover:scale-105 transition-transform">
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                  </div>
                  <p className="text-base sm:text-lg text-slate-700 leading-snug group-hover:text-slate-900 transition-colors">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={onLearnMore}
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 active:scale-98 cursor-pointer"
              >
                Conoce más
              </button>

              <button
                onClick={onNavigateToAct}
                className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-emerald-800 hover:text-emerald-950 px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                <span>Súmate y actúa ahora</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Practical Eco-Impact note */}
            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 max-w-xl text-xs sm:text-sm text-emerald-900">
              <p>
                💡 <span className="font-semibold">¿Sabías que?</span> Una franja de 5 metros de árboles y arbustos densos en las aceras puede reducir la percepción del ruido del tráfico vehicular entre 3 y 8 decibeles.
              </p>
            </div>
          </div>

          {/* Right Column: Serene Character in Headphones & 5 Solution Badges */}
          <div className="lg:col-span-6 flex justify-center">
            <SolutionsIllustration />
          </div>

        </div>
      </div>
    </section>
  );
};
