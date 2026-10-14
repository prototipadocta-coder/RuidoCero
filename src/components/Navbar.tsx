import React, { useState } from 'react';
import { Menu, X, Volume2, Sparkles, Layers, Eye, Bot } from 'lucide-react';

export type NavSection = 'inicio' | 'que-es' | 'causas' | 'efectos' | 'soluciones' | 'recursos' | 'juego' | 'reportes' | 'actua-ahora';

interface NavbarProps {
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  viewMode: 'slide' | 'full';
  onToggleViewMode: (mode: 'slide' | 'full') => void;
  onOpenChatbot?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onSelectSection,
  viewMode,
  onToggleViewMode,
  onOpenChatbot,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavSection; label: string }[] = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'que-es', label: '¿Qué es?' },
    { id: 'causas', label: 'Causas' },
    { id: 'efectos', label: 'Efectos' },
    { id: 'soluciones', label: 'Soluciones' },
    { id: 'recursos', label: 'Recursos' },
    { id: 'juego', label: 'Mini Juego' },
    { id: 'reportes', label: 'Reportes' },
  ];

  const handleNavClick = (id: NavSection) => {
    onSelectSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo Zone */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('inicio')}
              className="group flex items-center gap-2.5 text-left focus:outline-none"
              aria-label="RuidoCero Inicio"
            >
              {/* Soundwave Brand Mark */}
              <div className="flex items-center gap-0.5 px-1 py-1 rounded bg-slate-50 group-hover:bg-emerald-50 transition-colors">
                <span className="w-1 h-3 bg-slate-800 rounded-full group-hover:bg-emerald-600 transition-colors" />
                <span className="w-1 h-5 bg-slate-800 rounded-full group-hover:bg-emerald-600 transition-colors" />
                <span className="w-1 h-7 bg-emerald-600 rounded-full group-hover:scale-110 transition-transform" />
                <span className="w-1 h-9 bg-emerald-600 rounded-full group-hover:scale-110 transition-transform" />
                <span className="w-1 h-6 bg-emerald-600 rounded-full group-hover:scale-110 transition-transform" />
                <span className="w-1 h-4 bg-slate-800 rounded-full group-hover:bg-emerald-600 transition-colors" />
                <span className="w-1 h-2 bg-slate-800 rounded-full group-hover:bg-emerald-600 transition-colors" />
              </div>

              {/* Logo Typography: Ruido in charcoal, Cero in emerald */}
              <div className="flex items-baseline tracking-tight">
                <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Ruido
                </span>
                <span className="text-xl sm:text-2xl font-bold text-emerald-600 tracking-tight">
                  Cero
                </span>
              </div>
            </button>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 text-sm xl:text-[15px] font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-emerald-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full animate-in fade-in duration-200" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Zone & View Switcher */}
          <div className="flex items-center gap-3">
            {/* View Mode Toggle: Slide Mode (1:1 mockup) vs Full Landing Page */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-full text-xs text-slate-600">
              <button
                onClick={() => onToggleViewMode('slide')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all ${
                  viewMode === 'slide'
                    ? 'bg-white text-emerald-800 font-semibold shadow-xs'
                    : 'hover:text-slate-900'
                }`}
                title="Modo pantalla a pantalla (como en el prototipo)"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Vista Prototipo</span>
              </button>
              <button
                onClick={() => onToggleViewMode('full')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all ${
                  viewMode === 'full'
                    ? 'bg-white text-emerald-800 font-semibold shadow-xs'
                    : 'hover:text-slate-900'
                }`}
                title="Vista continua completa con todas las secciones"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Landing Completa</span>
              </button>
            </div>

            {/* Chatbot Advisor Launcher Button */}
            {onOpenChatbot && (
              <button
                onClick={onOpenChatbot}
                className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-xs font-semibold border border-slate-200 hover:border-emerald-300 transition-colors shadow-xs"
                title="Consultar al Asistente Acústico IA"
              >
                <Bot className="w-3.5 h-3.5 text-emerald-600" />
                <span>Asistente IA</span>
              </button>
            )}

            {/* Primary Action Button: Actúa ahora */}
            <button
              onClick={() => handleNavClick('actua-ahora')}
              className={`px-5 py-2 sm:py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm whitespace-nowrap ${
                activeSection === 'actua-ahora'
                  ? 'bg-emerald-700 text-white ring-2 ring-emerald-500 ring-offset-2'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md active:scale-98'
              }`}
            >
              Actúa ahora
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Modo de visualización</span>
            <div className="flex items-center bg-slate-100 p-0.5 rounded-full text-xs">
              <button
                onClick={() => onToggleViewMode('slide')}
                className={`px-2.5 py-1 rounded-full text-xs ${viewMode === 'slide' ? 'bg-white font-semibold text-emerald-800 shadow-xs' : 'text-slate-600'}`}
              >
                Prototipo
              </button>
              <button
                onClick={() => onToggleViewMode('full')}
                className={`px-2.5 py-1 rounded-full text-xs ${viewMode === 'full' ? 'bg-white font-semibold text-emerald-800 shadow-xs' : 'text-slate-600'}`}
              >
                Completa
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors ${
                  activeSection === item.id
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />}
              </button>
            ))}
          </div>

          <div className="pt-2 space-y-2">
            {onOpenChatbot && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenChatbot();
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm shadow-xs text-center flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4 text-emerald-400" />
                <span>Asistente Acústico IA</span>
              </button>
            )}
            <button
              onClick={() => handleNavClick('actua-ahora')}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm text-center"
            >
              Actúa ahora
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
