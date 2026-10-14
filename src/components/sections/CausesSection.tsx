import React, { useState } from 'react';
import { Car, Hammer, Music, Factory, Home, Volume2, AlertOctagon } from 'lucide-react';

export const CausesSection: React.FC = () => {
  const [selectedCause, setSelectedCause] = useState<number>(0);

  const causesList = [
    {
      id: 'transporte',
      title: 'Tráfico vehicular y transporte',
      share: '75% - 80%',
      dbRange: '70 - 95 dB',
      icon: Car,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      description: 'El flujo incesante de automóviles, motocicletas con tubos de escape modificados, autobuses diésel y camiones de carga pesada es la principal fuente de contaminación acústica en las ciudades modernas.',
      examples: ['Bocinas y claxonazos innecesarios', 'Frenado brusco y motores acelerados', 'Tránsito de transporte público y trenes'],
      prevention: 'Fomentar la movilidad peatonal, bicicletas, transporte eléctrico y regular el uso del claxon.',
    },
    {
      id: 'construccion',
      title: 'Obras y construcción urbana',
      share: '10% - 15%',
      dbRange: '90 - 115 dB',
      icon: Hammer,
      color: 'text-orange-600 bg-orange-50 border-orange-200',
      description: 'Excavaciones, demoliciones, martillos neumáticos y hormigoneras generan ondas sonoras y vibraciones que penetran en viviendas cercanas y alteran el descanso continuo.',
      examples: ['Martillos mecánicos e hidráulicos', 'Grúas, sierras circulares y mezcladoras', 'Carga y descarga de materiales pesados'],
      prevention: 'Instalar pantallas acústicas perimetrales y respetar estrictamente los horarios diurnos de faena.',
    },
    {
      id: 'ocio',
      title: 'Música, bares y ocio nocturno',
      share: '5% - 8%',
      dbRange: '85 - 110 dB',
      icon: Music,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      description: 'Discotecas, terrazas con música amplificada, eventos al aire libre y fiestas clandestinas sin acondicionamiento acústico impiden la conciliación del sueño de vecinos en zonas mixtas.',
      examples: ['Altavoces exteriores de locales comerciales', 'Concentraciones de personas a altas horas', 'Locales nocturnos sin aislamiento acústico'],
      prevention: 'Doble acristalamiento, limitadores acústicos calibrados y ordenanzas sobre horarios nocturnos.',
    },
    {
      id: 'industria',
      title: 'Industria, talleres y maquinaria',
      share: '3% - 5%',
      dbRange: '80 - 105 dB',
      icon: Factory,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      description: 'Compresores de aire, generadores diésel, sistemas de ventilación central y talleres mecánicos insertos en áreas residenciales o de transición.',
      examples: ['Torres de enfriamiento y extractores ruidosos', 'Carga de chatarra y prensas hidráulicas', 'Generadores eléctricos de emergencia permanentes'],
      prevention: 'Encapsulamiento de motores, silenciadores industriales y reubicación en polígonos zonificados.',
    },
    {
      id: 'domestico',
      title: 'Ruidos domésticos y vecinales',
      share: '2% - 4%',
      dbRange: '60 - 85 dB',
      icon: Home,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      description: 'Electrodomésticos a deshoras, reparaciones caseras nocturnas, música elevada en balcones y ladridos continuos de mascotas sin supervisión.',
      examples: ['Lavadoras o taladros en horas de descanso', 'Televisores a volumen excesivo contra paredes compartidas', 'Arrastre de muebles sin almohadillas protectoras'],
      prevention: 'Pactos de convivencia vecinal, almohadillas de fieltro en muebles y respeto a los horarios de descanso.',
    },
  ];

  return (
    <section id="causas" className="relative w-full py-10 md:py-16 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <span>Diagnóstico Acústico</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            ¿De dónde proviene el ruido en nuestras ciudades?
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Conocer las fuentes principales nos permite exigir normativas claras y adoptar hábitos conscientes en nuestra comunidad.
          </p>
        </div>

        {/* 2-Column interactive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-6xl mx-auto">
          
          {/* Left list of causes */}
          <div className="lg:col-span-5 space-y-2.5">
            {causesList.map((cause, index) => {
              const Icon = cause.icon;
              const isSelected = selectedCause === index;
              return (
                <button
                  key={cause.id}
                  onClick={() => setSelectedCause(index)}
                  className={`w-full p-4 rounded-xl text-left border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-white border-emerald-600 shadow-md ring-2 ring-emerald-100'
                      : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2.5 rounded-lg border ${cause.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {cause.title}
                      </h3>
                      <span className="text-xs text-slate-500 font-mono">
                        {cause.dbRange}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {cause.share}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right detailed spotlight */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            {(() => {
              const current = causesList[selectedCause];
              const Icon = current.icon;
              return (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl border ${current.color}`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Fuente Principal</span>
                        <h4 className="text-xl sm:text-2xl font-bold text-slate-900">{current.title}</h4>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Presión acústica</span>
                      <span className="text-lg font-bold font-mono text-emerald-700">{current.dbRange}</span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {current.description}
                  </p>

                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">Ejemplos comunes:</h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {current.examples.map((ex, i) => (
                        <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-3">
                    <AlertOctagon className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-emerald-900 block mb-0.5">Acción preventiva recomendada</span>
                      <p className="text-xs text-emerald-800 leading-relaxed">{current.prevention}</p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

        </div>

      </div>
    </section>
  );
};
