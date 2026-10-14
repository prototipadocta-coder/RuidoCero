import React from 'react';
import { X, Volume2, ShieldCheck, HeartPulse, Check, Sparkles, BookOpen } from 'lucide-react';
import { NavSection } from './Navbar';

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: NavSection;
}

export const LearnMoreModal: React.FC<LearnMoreModalProps> = ({ isOpen, onClose, section }) => {
  if (!isOpen) return null;

  const contentMap: Record<string, { title: string; subtitle: string; body: React.ReactNode }> = {
    'que-es': {
      title: 'Comprendiendo la Contaminación Sonora',
      subtitle: 'La física del sonido y por qué el ruido urbano nos desestabiliza',
      body: (
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            El sonido se mide en <strong>decibeles (dB)</strong> según una escala logarítmica. Esto significa que un incremento de solo <strong>10 dB representa una duplicación en la percepción del volumen</strong> y una multiplicación por diez de la energía acústica.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-2">Escala comparativa cotidiana:</h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li>• <strong>30 dB:</strong> Rumor de hojas, susurros suaves (confortable).</li>
              <li>• <strong>50 dB:</strong> Oficina tranquila, lluvia constante.</li>
              <li>• <strong>65 dB:</strong> Conversación cercana o televisor a volumen estándar.</li>
              <li>• <strong>85 dB:</strong> Tráfico de avenida principal (comienza el daño con exposición de 8h).</li>
              <li>• <strong>100 dB:</strong> Martillo neumático, sierra eléctrica o discoteca (daño tras 15 min).</li>
              <li>• <strong>120 dB+:</strong> Umbral de dolor inmediato y riesgo de rotura timpánica.</li>
            </ul>
          </div>
          <p>
            A diferencia de los ojos, que cuentan con párpados para descansar de la luz, el <strong>oído humano nunca duerme</strong>: permanece en alerta biológica continua procesando ruidos del entorno incluso en fases profundas de sueño.
          </p>
        </div>
      ),
    },
    'efectos': {
      title: 'Impacto Fisiológico y Psicológico del Ruido',
      subtitle: 'Cómo reacciona el organismo ante la sobreexcitación sonora',
      body: (
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            La Organización Mundial de la Salud (OMS) cataloga el ruido ambiental como el <strong>segundo factor de riesgo medioambiental más perjudicial para la salud</strong>, superado únicamente por la contaminación del aire por partículas.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-100">
              <h5 className="font-bold text-rose-900 text-xs mb-1">Efectos Cardiovasculares</h5>
              <p className="text-xs text-rose-800">
                La activación permanente de la respuesta de lucha o huida dispara la hormona cortisol, provocando vasoconstricción, hipertensión y arritmias.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-100">
              <h5 className="font-bold text-amber-900 text-xs mb-1">Deterioro Cognitivo Infantil</h5>
              <p className="text-xs text-amber-800">
                Los niños que estudian cerca de autopistas o aeropuertos presentan retrasos documentados en comprensión lectora y déficit de atención.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
              <h5 className="font-bold text-emerald-900 text-xs mb-1">Tinnitus y Células Ciliadas</h5>
              <p className="text-xs text-emerald-800">
                Las células sensoriales de la cóclea no se regeneran. Cuando se quiebran por volumen excesivo, se genera un zumbido permanente e incurable (acúfenos).
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100">
              <h5 className="font-bold text-indigo-900 text-xs mb-1">Fragmentación del Sueño</h5>
              <p className="text-xs text-indigo-800">
                Ruidos esporádicos nocturnos (motos, sirenas) alteran la fase delta profunda, provocando fatiga crónica diurna e irritabilidad.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    'soluciones': {
      title: 'Plan Integral de Soluciones Acústicas',
      subtitle: 'Medidas individuales, arquitectónicas y urbanísticas con base científica',
      body: (
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            Combatir el ruido requiere una combinación de disciplina personal en el hogar y presión ciudadana para un diseño urbano inteligente:
          </p>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 text-xs block mb-1">1. Regla 60/60 para Auriculares</span>
              <p className="text-xs text-slate-600">
                Nunca escuches música a más del 60% del volumen máximo del dispositivo y descansa al menos 10 minutos cada 60 minutos de uso continuo.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 text-xs block mb-1">2. Barreras Vivas y Reforestación Urbana</span>
              <p className="text-xs text-slate-600">
                Árboles de copa densa (pino, tilo, ciprés) y setos perennes actúan como difusores acústicos naturales frente a avenidas ruidosas.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 text-xs block mb-1">3. Pavimentos Fonoabsorbentes</span>
              <p className="text-xs text-slate-600">
                El asfalto poroso reduce hasta 4 dB el sonido de rodadura de los neumáticos, disminuyendo el ruido urbano general a la mitad.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    default: {
      title: 'Guía de Concientización RuidoCero',
      subtitle: 'Información para transformar nuestros hábitos sonoros',
      body: (
        <p className="text-sm text-slate-600">
          El silencio y el confort acústico son derechos fundamentales para la salud física y psicológica de toda la comunidad.
        </p>
      ),
    },
  };

  const current = contentMap[section] || contentMap.default;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Guía de Profundización</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
            {current.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {current.subtitle}
          </p>
        </div>

        {/* Modal Content */}
        <div className="mb-6">{current.body}</div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-colors"
          >
            Entendido, volver a la página
          </button>
        </div>
      </div>
    </div>
  );
};
