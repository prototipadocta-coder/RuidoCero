import React, { useState } from 'react';
import { Volume2, VolumeX, Shield, ArrowRight, Activity, Zap, Sparkles, Bot } from 'lucide-react';
import { NavSection } from '../Navbar';

interface HeroOverviewProps {
  onNavigate: (section: NavSection) => void;
  onOpenChatbot?: (scenario?: string) => void;
}

export const HeroOverview: React.FC<HeroOverviewProps> = ({ onNavigate, onOpenChatbot }) => {
  const [selectedDb, setSelectedDb] = useState(65);

  const soundExamples = [
    { db: 25, label: 'Biblioteca / Susurro', status: 'Seguro', color: 'bg-emerald-500' },
    { db: 50, label: 'Lluvia moderada / Oficina', status: 'Aceptable', color: 'bg-emerald-600' },
    { db: 65, label: 'Conversación normal', status: 'Límite confort', color: 'bg-amber-500' },
    { db: 85, label: 'Tráfico pesado en avenida', status: 'Riesgo auditivo prolongado', color: 'bg-orange-500' },
    { db: 105, label: 'Martillo neumático / Concierto', status: 'Dañino en 15 min', color: 'bg-rose-500' },
    { db: 120, label: 'Sirena / Despegue de avión', status: 'Umbral de dolor', color: 'bg-rose-700' },
  ];

  return (
    <section id="inicio" className="relative w-full pt-6 pb-12 md:pt-10 md:pb-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            <span>Iniciativa Ciudadana por el Bienestar Sonoro</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Menos ruido, <span className="text-emerald-600">más bienestar</span> para todos
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            La contaminación acústica es un enemigo invisible que deteriora nuestra salud diaria. Descubre cómo identificarla, prevenirla y construir entornos más silenciosos.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('que-es')}
              className="px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all active:scale-98 cursor-pointer"
            >
              Comenzar recorrido
            </button>
            {onOpenChatbot && (
              <button
                onClick={() => onOpenChatbot('hogar')}
                className="px-5 py-3 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-sm sm:text-base border border-emerald-200 transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Bot className="w-4 h-4 text-emerald-600" />
                <span>Asistente por Escenario</span>
              </button>
            )}
            <button
              onClick={() => onNavigate('actua-ahora')}
              className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm sm:text-base transition-all cursor-pointer"
            >
              Actuar ahora
            </button>
          </div>
        </div>

        {/* Interactive Sound Level Explorer Bar */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 sm:p-7 max-w-4xl mx-auto mb-12 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-emerald-600" />
                <span>Simulador de Escala de Decibeles (dB)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Arrastra el control para explorar el impacto de cada nivel acústico según la OMS.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto bg-white px-3 py-1.5 rounded-xl border border-slate-200 font-mono">
              <span className="text-xs text-slate-500">Nivel:</span>
              <span className="text-lg font-bold text-slate-900">{selectedDb} dB</span>
            </div>
          </div>

          {/* Slider */}
          <div className="relative mb-6">
            <input
              type="range"
              min="20"
              max="130"
              value={selectedDb}
              onChange={(e) => setSelectedDb(Number(e.target.value))}
              className="w-full h-3 bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-600 rounded-lg appearance-none cursor-pointer accent-slate-900"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
              <span>20 dB (Silencio)</span>
              <span>55 dB (Límite OMS)</span>
              <span>85 dB (Peligro)</span>
              <span>130 dB (Dolor)</span>
            </div>
          </div>

          {/* Current selected status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {soundExamples.map((item) => {
              const isClosest = Math.abs(item.db - selectedDb) <= 15;
              return (
                <div
                  key={item.db}
                  onClick={() => setSelectedDb(item.db)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    isClosest
                      ? 'bg-white border-emerald-500 shadow-sm ring-2 ring-emerald-100'
                      : 'bg-white/60 border-slate-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold font-mono text-slate-700">{item.db} dB</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${item.color} text-white`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 Feature Topic Grid mirroring the 4 sections in the mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          
          <div
            onClick={() => onNavigate('que-es')}
            className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm mb-3 group-hover:scale-105 transition-transform">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">
                ¿Qué es?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                El exceso de ruido en el ambiente y sus fuentes habituales como tráfico y obras.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mt-4">
              <span>Explorar</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('efectos')}
            className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm mb-3 group-hover:scale-105 transition-transform">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">
                Efectos en la salud
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Estrés, cefaleas, insomnio crónico, problemas cardíacos y pérdida auditiva.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mt-4">
              <span>Explorar</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('soluciones')}
            className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm mb-3 group-hover:scale-105 transition-transform">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">
                Soluciones
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Acciones prácticas: volumen moderado, protectores, barreras vegetales y normativas.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mt-4">
              <span>Explorar</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('actua-ahora')}
            className="group p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 hover:border-emerald-600 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm mb-3 group-hover:scale-105 transition-transform">
                04
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-800 transition-colors">
                Actúa ahora
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Únete al compromiso ciudadano por una comunidad tranquila, pacífica y saludable.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 mt-4">
              <span>Participar</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
