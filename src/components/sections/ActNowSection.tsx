import React, { useState } from 'react';
import { ArrowRight, Users, Check, Sparkles, Megaphone } from 'lucide-react';
import { ActNowIllustration } from '../illustrations/ActNowIllustration';

interface ActNowSectionProps {
  onParticipateNow: () => void;
  onExploreResources?: () => void;
}

export const ActNowSection: React.FC<ActNowSectionProps> = ({
  onParticipateNow,
  onExploreResources,
}) => {
  const [pledgeCount, setPledgeCount] = useState(1428);
  const [hasSignedPledge, setHasSignedPledge] = useState(false);

  const handlePledge = () => {
    if (!hasSignedPledge) {
      setPledgeCount((prev) => prev + 1);
      setHasSignedPledge(true);
    }
    onParticipateNow();
  };

  return (
    <section id="actua-ahora" className="relative w-full py-8 md:py-14 lg:py-18 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Paragraphs, Highlighted callout, Participar ahora button (Matching Screen 4) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-slate-900 leading-[1.15] tracking-tight">
              Actúa ahora
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              <p>
                Ayuda a reducir la contaminación auditiva evitando hacer ruidos innecesarios, respetando los horarios de descanso, usando el volumen adecuado y motivando a otras personas a cuidar el ambiente sonoro.
              </p>
              <p className="text-emerald-700 font-bold text-lg sm:text-xl leading-snug">
                ¡Cada pequeña acción cuenta para tener una comunidad más tranquila y saludable!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handlePledge}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-base shadow-sm hover:shadow-md transition-all duration-200 active:scale-98 cursor-pointer"
              >
                Participar ahora
              </button>

              {onExploreResources && (
                <button
                  onClick={onExploreResources}
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-emerald-800 hover:text-emerald-950 px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  <span>Guías y recursos comunitarios</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Live Community Counter */}
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100 text-slate-600">
              <div className="flex items-center -space-x-2">
                <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">
                  RC
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">
                  +3
                </div>
              </div>
              <p className="text-xs sm:text-sm">
                <span className="font-bold text-slate-900 font-mono tabular-nums">{pledgeCount.toLocaleString()}</span> personas ya han firmado el compromiso por el descanso y la paz acústica.
              </p>
            </div>
          </div>

          {/* Right Column: Youth Community Advocates Holding Banner & Floating Icons */}
          <div className="lg:col-span-6 flex justify-center">
            <ActNowIllustration onJoinClick={handlePledge} />
          </div>

        </div>
      </div>
    </section>
  );
};
