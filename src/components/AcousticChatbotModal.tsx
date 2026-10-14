import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Home,
  Briefcase,
  Car,
  GraduationCap,
  Store,
  Volume2,
  VolumeX,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  TrendingDown,
  Minimize2,
  Maximize2
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  scenario?: string;
  behavior?: string;
  timestamp: string;
}

interface AcousticChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialScenario?: string;
  onPlayMiniGame?: () => void;
}

const PRESET_SCENARIOS = [
  {
    id: 'motos',
    title: 'Motos y Piques (Vía Principal / Barichara)',
    icon: Car,
    description: 'Resonadores modificados, escapes abiertos y piques en laderas empinadas',
    defaultBehavior: 'Motos acelerando con resonador y escape libre en pendientes residenciales',
    suggestions: [
      '¿Cómo actuar ante motos con resonador que aceleran en la loma a la medianoche?',
      'Piques ilegales y aceleraciones en el sector El Chuscal y Barichara',
      '¿Cómo solicitar operativos de sonometría con la Secretaría de Movilidad de Medellín?',
    ],
  },
  {
    id: 'bares',
    title: 'Bares del Parque Principal',
    icon: Store,
    description: 'Cantinas, estancos y tabernas con bafles orientados hacia el espacio público',
    defaultBehavior: 'Bafles de alta potencia proyectando música hacia la calle y aceras',
    suggestions: [
      'El bar del Parque tiene la música a más de 95 dB hasta las 3:00 am',
      '¿Qué compromisos exige el programa "Medellín Convive la Noche" a los negocios?',
      '¿Cómo solicitar mediación ante la Inspección de Policía 7A de San Antonio de Prado?',
    ],
  },
  {
    id: 'fincas',
    title: 'Fincas de Recreo en Veredas (Potrerito / El Salado)',
    icon: Home,
    description: 'Fiestas con car audio y minitecas en zonas rurales campesinas',
    defaultBehavior: 'Alquiler de fincas para fiestas clandestinas con car audio a cielo abierto',
    suggestions: [
      '¿Cómo aplica la nueva Ley Antirruido 2450 de 2025 a dueños de fincas de recreo?',
      'Música electrónica retumbando en el cañón de la vereda durante todo el fin de semana',
      'Impacto del car audio en las aves y fauna silvestre de San Antonio de Prado',
    ],
  },
  {
    id: 'urbanizaciones',
    title: 'Urbanizaciones (Limonar / Barichara)',
    icon: Briefcase,
    description: 'Macrociudadelas densas: bafles en balcones, paredes delgadas y áreas comunes',
    defaultBehavior: 'Sacar cabinas de sonido al balcón o vibración de bajos contra muros compartidos',
    suggestions: [
      'Mi vecino saca un bafle bluetooth al balcón en El Limonar todo el domingo',
      'Taladros y obras un domingo a las 6:30 am en bloque de apartamentos',
      '¿Cómo activar el Comité de Convivencia de la copropiedad antes de llamar al 123?',
    ],
  },
  {
    id: 'perifoneo',
    title: 'Venta Ambulante y Perifoneo Barrial',
    icon: GraduationCap,
    description: 'Megáfonos estridentes de chatarreros, plátanos y aguacates en calles estrechas',
    defaultBehavior: 'Uso continuo de megáfonos de alta potencia a volumen máximo desde temprano',
    suggestions: [
      'Camionetas de venta ambulante perifoneando a volumen desmedido a las 7:00 am',
      '¿Qué regula la normativa de Medellín sobre perifoneo comercial en barrios residenciales?',
      '¿Cómo acordar horarios amables con vendedores informales en la Junta de Acción Comunal?',
    ],
  },
];

const PRESET_BEHAVIORS = [
  'Acelerar motos con resonador modificado en pendientes residenciales',
  'Sacar bafles o cabinas de sonido al balcón del apartamento',
  'Instalar car audio a campo abierto en fincas de recreo veredales',
  'Poner bafles de cantina apuntando a la calle en el Parque Principal',
  'Perifonear con megáfono a volumen máximo desde las 7:00 am',
  'Tocar el claxon repetidamente en embotellamientos en El Chuscal',
];

export const AcousticChatbotModal: React.FC<AcousticChatbotModalProps> = ({
  isOpen,
  onClose,
  initialScenario,
  onPlayMiniGame,
}) => {
  const [selectedScenario, setSelectedScenario] = useState<string>(initialScenario || 'hogar');
  const [selectedBehavior, setSelectedBehavior] = useState<string>('');
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `¡Hola! Soy tu **Asistente Acústico RuidoCero**. 🎧

Te ayudo a resolver problemas de contaminación auditiva a partir de **comportamientos y hábitos prácticos**.

Selecciona un escenario arriba o escribe tu caso: ¿dónde ocurre el ruido y qué comportamiento lo está causando?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const currentScenarioObj = PRESET_SCENARIOS.find((s) => s.id === selectedScenario) || PRESET_SCENARIOS[0];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() && !selectedBehavior) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query || `Comportamiento analizado: ${selectedBehavior}`,
      scenario: currentScenarioObj.title,
      behavior: selectedBehavior || 'Observado en el entorno',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario: currentScenarioObj.title,
          behavior: selectedBehavior,
          message: query,
        }),
      });

      if (!response.ok) {
        throw new Error('Error en el servidor al procesar la recomendación acústica.');
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.reply || 'No se pudo generar la recomendación en este momento.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: `🎯 **Diagnóstico del Comportamiento**:
En el escenario de **${currentScenarioObj.title}**, el ruido suele persistir cuando se naturaliza o cuando da pena expresar la molestia.

💡 **Recomendación Conductual Inmediata**:
1. **Pacto verbal preventivo**: Dialoga con la persona antes de que el enojo escale. Explica el impacto en tu descanso sin acusar.
2. **Regla del 50% de volumen**: Ajusta altavoces y televisores a la mitad de su capacidad.
3. **Calzado y protectores**: Coloca fieltros adhesivos en las patas de sillas y muebles.

📉 **Impacto**: Reduce entre **8 y 15 dB** de ruido intrusivo.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to format bot responses nicely with highlights
  const formatBotMessage = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1" />;

          // Highlights for the main sections
          if (line.includes('Diagnóstico del Comportamiento') || line.includes('🎯')) {
            return (
              <div key={idx} className="font-bold text-slate-900 pt-1 flex items-center gap-1.5 text-xs sm:text-sm text-emerald-800">
                <span>{line}</span>
              </div>
            );
          }
          if (line.includes('Cambios de Comportamiento Concretos') || line.includes('💡')) {
            return (
              <div key={idx} className="font-bold text-slate-900 pt-2 flex items-center gap-1.5 text-xs sm:text-sm text-emerald-800">
                <span>{line}</span>
              </div>
            );
          }
          if (line.includes('Medida Práctica o de Entorno') || line.includes('🛠️')) {
            return (
              <div key={idx} className="font-bold text-slate-900 pt-2 flex items-center gap-1.5 text-xs sm:text-sm text-emerald-800">
                <span>{line}</span>
              </div>
            );
          }
          if (line.includes('Impacto Acústico Estimado') || line.includes('📉')) {
            return (
              <div key={idx} className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 font-semibold text-emerald-900 my-1 text-xs">
                <span>{line}</span>
              </div>
            );
          }

          // Bullet items
          if (line.trim().startsWith('-') || line.trim().startsWith('•') || /^\d+\./.test(line.trim())) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                <span dangerouslySetInnerHTML={{ __html: line.replace(/^[-•\d.]+\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </div>
            );
          }

          return (
            <p key={idx} className="text-slate-700" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`relative w-full ${
          isExpanded ? 'max-w-5xl h-[94vh]' : 'max-w-3xl h-[88vh] max-h-[750px]'
        } bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden transition-all duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Chatbot Header */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            {/* Friendly Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm ring-2 ring-emerald-400/40">
              <Bot className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Asistente Acústico · San Antonio de Prado
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-semibold flex items-center gap-1 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Medellín</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Soluciones de convivencia frente al ruido en corregimiento y veredas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {onPlayMiniGame && (
              <button
                onClick={() => {
                  onClose();
                  onPlayMiniGame();
                }}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold border border-emerald-500/30 transition-colors mr-1 cursor-pointer"
                title="Poner a prueba tus decisiones en el Mini Juego"
              >
                <span>🎮 Mini Juego</span>
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden sm:block"
              title={isExpanded ? 'Ventana normal' : 'Pantalla ampliada'}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Cerrar chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scenario Selector Tabs */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200/90 shrink-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
            Selecciona el escenario a intervenir:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {PRESET_SCENARIOS.map((sc) => {
              const Icon = sc.icon;
              const isSelected = selectedScenario === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => {
                    setSelectedScenario(sc.id);
                    setSelectedBehavior('');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-400'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{sc.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Behavior Suggestions Pill Bar */}
        <div className="px-4 py-2 bg-white border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-[11px] shrink-0">
          <span className="text-slate-400 font-semibold whitespace-nowrap">Comportamiento:</span>
          {PRESET_BEHAVIORS.slice(0, 4).map((beh, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedBehavior(beh);
                handleSendMessage(`En el escenario de ${currentScenarioObj.title}, ¿cómo podemos disminuir el ruido cuando el comportamiento problemático es: "${beh}"?`);
              }}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 transition-colors whitespace-nowrap cursor-pointer"
            >
              {beh}
            </button>
          ))}
        </div>

        {/* Chat History Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#fcfcfd]">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div key={msg.id} className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isUser
                      ? 'bg-slate-800 text-white'
                      : 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-xs'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-[85%] sm:max-w-[78%] space-y-1`}>
                  {/* Context tags if user sent scenario */}
                  {isUser && msg.scenario && (
                    <div className="flex items-center justify-end gap-1.5 text-[10px] text-slate-500 font-mono">
                      <span className="bg-slate-200/80 px-2 py-0.5 rounded-md text-slate-700">
                        {msg.scenario}
                      </span>
                    </div>
                  )}

                  <div
                    className={`p-3.5 sm:p-4 rounded-2xl ${
                      isUser
                        ? 'bg-slate-900 text-white rounded-tr-xs'
                        : 'bg-white border border-slate-200/80 shadow-xs rounded-tl-xs text-slate-800'
                    }`}
                  >
                    {isUser ? (
                      <p className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                    ) : (
                      formatBotMessage(msg.text)
                    )}
                  </div>

                  <span className={`text-[10px] text-slate-400 block px-1 ${isUser ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs rounded-tl-xs flex items-center gap-2 text-slate-500 text-xs">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                <span>Analizando escenario y preparando cambios de conducta recomendados...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Questions for Current Scenario */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
            Preguntas rápidas:
          </span>
          {currentScenarioObj.suggestions.map((sug, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(sug)}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-700 whitespace-nowrap text-[11px] transition-colors"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200/80 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Describe el comportamiento ruidoso en "${currentScenarioObj.title}"...`}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/60"
            />
            <button
              type="submit"
              disabled={isLoading || (!inputMessage.trim() && !selectedBehavior)}
              className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Consultar</span>
            </button>
          </form>
          <p className="text-[10px] text-slate-400 text-center mt-2">
            Respuestas generadas con IA experta en salud auditiva comunitaria y directrices de la OMS.
          </p>
        </div>
      </div>
    </div>
  );
};
