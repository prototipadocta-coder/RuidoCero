import React from 'react';
import { NavSection } from './Navbar';
import { CitySkyline } from './CitySkyline';

interface FooterProps {
  onNavigate: (section: NavSection) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative w-full bg-slate-900 text-slate-300 pt-0 overflow-hidden">
      {/* City Skyline Silhouette sits right at the base of the content / top of footer */}
      <div className="w-full bg-white">
        <CitySkyline />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          
          {/* Brand mark */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-0.5 px-1 py-1 rounded bg-slate-800">
              <span className="w-1 h-3 bg-slate-400 rounded-full" />
              <span className="w-1 h-5 bg-slate-400 rounded-full" />
              <span className="w-1 h-7 bg-emerald-500 rounded-full" />
              <span className="w-1 h-9 bg-emerald-500 rounded-full" />
              <span className="w-1 h-6 bg-emerald-500 rounded-full" />
              <span className="w-1 h-4 bg-slate-400 rounded-full" />
              <span className="w-1 h-2 bg-slate-400 rounded-full" />
            </div>
            <div className="flex items-baseline tracking-tight">
              <span className="text-xl font-bold text-white">Ruido</span>
              <span className="text-xl font-bold text-emerald-400">Cero</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-400 font-medium">
            <button onClick={() => onNavigate('inicio')} className="hover:text-white transition-colors">
              Inicio
            </button>
            <button onClick={() => onNavigate('que-es')} className="hover:text-white transition-colors">
              ¿Qué es?
            </button>
            <button onClick={() => onNavigate('causas')} className="hover:text-white transition-colors">
              Causas
            </button>
            <button onClick={() => onNavigate('efectos')} className="hover:text-white transition-colors">
              Efectos
            </button>
            <button onClick={() => onNavigate('soluciones')} className="hover:text-white transition-colors">
              Soluciones
            </button>
            <button onClick={() => onNavigate('recursos')} className="hover:text-white transition-colors">
              Recursos
            </button>
            <button onClick={() => onNavigate('juego')} className="hover:text-white transition-colors text-emerald-400 font-semibold">
              Mini Juego
            </button>
            <button onClick={() => onNavigate('reportes')} className="hover:text-white transition-colors">
              Reportes
            </button>
            <button onClick={() => onNavigate('actua-ahora')} className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
              Actúa ahora
            </button>
          </nav>
        </div>

        {/* Quiet Bottom Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 RuidoCero · Plataforma ciudadana educativa por la salud acústica y el bienestar urbano.</p>
          <p>Basado en los lineamientos de salud auditiva de la Organización Mundial de la Salud (OMS).</p>
        </div>
      </div>
    </footer>
  );
};
