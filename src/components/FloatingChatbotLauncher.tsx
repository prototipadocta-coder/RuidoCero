import React from 'react';
import { MessageSquare, Bot, Sparkles } from 'lucide-react';

interface FloatingChatbotLauncherProps {
  onClick: () => void;
}

export const FloatingChatbotLauncher: React.FC<FloatingChatbotLauncherProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={onClick}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900 hover:bg-slate-950 text-white shadow-xl hover:shadow-2xl border border-emerald-500/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-emerald-500/10"
        aria-label="Abrir Asistente Acústico RuidoCero"
      >
        {/* Animated avatar */}
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-sm">
          <Bot className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse" />
        </div>

        <div className="text-left hidden sm:block">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-xs font-bold text-white tracking-tight">
              Asistente Acústico
            </span>
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-semibold">
              IA
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            Reduce el ruido en tu escenario
          </span>
        </div>

        {/* Sparkle badge on mobile */}
        <span className="sm:hidden text-xs font-semibold text-emerald-400">
          Chat IA
        </span>
      </button>
    </div>
  );
};
