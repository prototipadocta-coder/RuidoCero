import React, { useState } from 'react';
import { Download, FileText, CheckCircle, ShieldCheck, HelpCircle, Share2 } from 'lucide-react';

export const ResourcesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'normas' | 'checklist' | 'guias'>('normas');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (docName: string) => {
    setDownloadSuccess(docName);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const whoLimits = [
    { area: 'Dormitorios (Noche)', limit: '30 dB (interior) / 45 dB (exterior)', effect: 'Prevención de despertares y microdespertares nocivos' },
    { area: 'Zonas residenciales (Día)', limit: '50 - 55 dB', effect: 'Prevención de molestia diurna moderada y severa' },
    { area: 'Escuelas y aulas', limit: '35 dB (interior durante clases)', effect: 'Adecuada inteligibilidad del habla y aprendizaje' },
    { area: 'Hospitales y salas de reposo', limit: '30 dB noche / 40 dB día', effect: 'Recuperación física y reposo de pacientes' },
    { area: 'Espacios de trabajo intelectual', limit: '45 - 55 dB', effect: 'Prevención de fatiga mental y errores de concentración' },
  ];

  const homeChecklist = [
    { title: 'Revisión de electrodomésticos', tip: 'Coloca almohadillas antivibración bajo la lavadora y secadora.' },
    { title: 'Aislamiento en aberturas', tip: 'Instala burletes de caucho o silicona en puertas y ventanas para sellar filtraciones de aire y sonido.' },
    { title: 'Distribución interior', tip: 'Ubica la cabecera de la cama lejos de muros colindantes con ascensores o tuberías.' },
    { title: 'Uso de textiles y alfombras', tip: 'Cortinas gruesas y alfombras reducen la reverberación y el eco en habitaciones.' },
    { title: 'Horarios de descanso respetados', tip: 'Evita encender aspiradoras, taladros o música después de las 21:30 hrs.' },
  ];

  const guides = [
    {
      id: 'g1',
      title: 'Manual de Convivencia Acústica Comunitaria',
      format: 'PDF (2.4 MB)',
      description: 'Guía práctica para juntas de vecinos, edificios de departamentos y condominios.',
    },
    {
      id: 'g2',
      title: 'Infografía: Efectos del Ruido en el Cerebro',
      format: 'PNG HD',
      description: 'Material gráfico de alta resolución listo para imprimir o proyectar en centros educativos.',
    },
    {
      id: 'g3',
      title: 'Protocolo de Denuncia por Ruido Molesto',
      format: 'PDF (1.1 MB)',
      description: 'Plantilla de carta y pasos legales para presentar quejas formales ante municipios.',
    },
  ];

  return (
    <section id="recursos" className="relative w-full py-10 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
            <span>Biblioteca y Herramientas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Recursos y Guías Prácticas
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Información científica, estándares internacionales de la OMS y herramientas ciudadanas para combatir la contaminación sonora.
          </p>

          {/* Segmented Control */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl mt-4">
            <button
              onClick={() => setActiveTab('normas')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'normas'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Límites OMS
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'checklist'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hogar Silencioso
            </button>
            <button
              onClick={() => setActiveTab('guias')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'guias'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Descargas y Materiales
            </button>
          </div>
        </div>

        {/* Tab 1: Normas OMS */}
        {activeTab === 'normas' && (
          <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Valores guía de la Organización Mundial de la Salud (OMS)
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-200">
                Directrices Ambientales
              </span>
            </div>

            <div className="divide-y divide-slate-200">
              {whoLimits.map((item, i) => (
                <div key={i} className="py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.area}</h4>
                    <p className="text-xs text-slate-600">{item.effect}</p>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-xs sm:text-sm font-bold font-mono text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-md">
                      {item.limit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Checklist */}
        {activeTab === 'checklist' && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
            {homeChecklist.map((c, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{c.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{c.tip}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Descargas */}
        {activeTab === 'guias' && (
          <div className="max-w-4xl mx-auto space-y-4 animate-in fade-in duration-200">
            {downloadSuccess && (
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center justify-between">
                <span>✓ Descarga preparada para: {downloadSuccess}</span>
                <span className="text-[10px] text-emerald-600">Listo</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {guides.map((g) => (
                <div key={g.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">{g.title}</h4>
                    <p className="text-xs text-slate-500 mb-3">{g.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">{g.format}</span>
                    <button
                      onClick={() => handleDownload(g.title)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Descargar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
