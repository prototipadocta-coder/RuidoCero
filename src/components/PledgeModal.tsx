import React, { useState } from 'react';
import { X, Check, Award, Sparkles, Share2, ThumbsUp, VolumeX } from 'lucide-react';

interface PledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PledgeModal: React.FC<PledgeModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [selectedCommitments, setSelectedCommitments] = useState<number[]>([0, 1, 3]);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const commitments = [
    'No tocaré el claxon/bocina innecesariamente en atascos de tráfico.',
    'Escucharé música con auriculares por debajo del 60% del volumen.',
    'Respetaré las horas de descanso nocturno (22:00 a 07:00) en mi hogar.',
    'Modularé el tono de voz en el transporte público y lugares cerrados.',
    'Plantearé soluciones acústicas amigables en mi comunidad de vecinos.',
  ];

  const toggleCommitment = (index: number) => {
    if (selectedCommitments.includes(index)) {
      setSelectedCommitments(selectedCommitments.filter((i) => i !== index));
    } else {
      setSelectedCommitments([...selectedCommitments, index]);
    }
  };

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsCompleted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isCompleted ? (
          <div>
            <div className="mb-6 pr-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Compromiso Ciudadano</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                Firma el Compromiso RuidoCero
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Selecciona las acciones cotidianas con las que cuidarás el ambiente sonoro de tu comunidad.
              </p>
            </div>

            <form onSubmit={handleSign} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Mis compromisos personales:</label>
                {commitments.map((text, idx) => {
                  const isChecked = selectedCommitments.includes(idx);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleCommitment(idx)}
                      className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-3 cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950 font-medium'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isChecked ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="leading-snug">{text}</span>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tu nombre o alias</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Martín Soler"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ciudad / Barrio</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ej. Madrid, Lima, Bogotá..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={selectedCommitments.length === 0}
                  className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Confirmar mi compromiso</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
              <Award className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">¡Felicidades!</span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                Eres Embajador del Silencio
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Gracias, <strong className="text-slate-900">{name}</strong> {city ? `de ${city}` : ''}. Cada acción que tomas crea un entorno más amable para todos.
              </p>
            </div>

            {/* Virtual Credential Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-xl text-left relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xs" />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5 font-bold tracking-tight text-sm">
                  <span>Ruido</span>
                  <span className="text-emerald-300">Cero</span>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/20 text-white font-semibold">
                  Certificado Ciudadano
                </span>
              </div>

              <p className="text-xs opacity-80 mb-0.5">Defensor de la paz sonora:</p>
              <h4 className="text-lg font-bold tracking-wide">{name}</h4>

              <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-[11px] opacity-90">
                <span>{selectedCommitments.length} Compromisos activos</span>
                <span className="font-mono">#RC-{Math.floor(1000 + Math.random() * 9000)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-colors"
              >
                Cerrar y continuar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
