import React, { useState, useEffect } from 'react';
import { Navbar, NavSection } from './components/Navbar';
import { CitySkyline } from './components/CitySkyline';
import { Footer } from './components/Footer';

// Sections
import { HeroOverview } from './components/sections/HeroOverview';
import { WhatIsNoiseSection } from './components/sections/WhatIsNoiseSection';
import { CausesSection } from './components/sections/CausesSection';
import { HealthEffectsSection } from './components/sections/HealthEffectsSection';
import { SolutionsSection } from './components/sections/SolutionsSection';
import { ResourcesSection } from './components/sections/ResourcesSection';
import { NoiseMiniGame } from './components/sections/NoiseMiniGame';
import { ActNowSection } from './components/sections/ActNowSection';
import { ReportsSection } from './components/sections/ReportsSection';

// Modals & Chatbot
import { LearnMoreModal } from './components/LearnMoreModal';
import { PledgeModal } from './components/PledgeModal';
import { AcousticChatbotModal } from './components/AcousticChatbotModal';
import { FloatingChatbotLauncher } from './components/FloatingChatbotLauncher';

// Icons for slide controller
import { ChevronLeft, ChevronRight, Layers, Eye } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<NavSection>('que-es');
  const [viewMode, setViewMode] = useState<'slide' | 'full'>('slide');
  const [learnMoreSection, setLearnMoreSection] = useState<NavSection | null>(null);
  const [isPledgeModalOpen, setIsPledgeModalOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatbotInitialScenario, setChatbotInitialScenario] = useState<string>('hogar');

  const openChatbotWithScenario = (scenario: string = 'hogar') => {
    setChatbotInitialScenario(scenario);
    setIsChatbotOpen(true);
  };

  // In slide mode, ordered sequence of the core screens from the mockup
  const slideOrder: NavSection[] = ['que-es', 'efectos', 'soluciones', 'actua-ahora', 'juego', 'inicio', 'causas', 'recursos', 'reportes'];

  const currentSlideIndex = slideOrder.indexOf(activeSection);

  const goToNextSlide = () => {
    const nextIdx = (currentSlideIndex + 1) % slideOrder.length;
    setActiveSection(slideOrder[nextIdx]);
  };

  const goToPrevSlide = () => {
    const prevIdx = (currentSlideIndex - 1 + slideOrder.length) % slideOrder.length;
    setActiveSection(slideOrder[prevIdx]);
  };

  const handleSelectSection = (section: NavSection) => {
    setActiveSection(section);
    if (viewMode === 'full') {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Keyboard navigation for slide mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (learnMoreSection || isPledgeModalOpen) return;
      if (e.key === 'ArrowRight') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, learnMoreSection, isPledgeModalOpen]);

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Top Navigation Bar with exact RuidoCero branding */}
      <Navbar
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        onOpenChatbot={() => openChatbotWithScenario('hogar')}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {viewMode === 'slide' ? (
          /* SLIDE VIEW MODE (Exact 1:1 view of the 4 mockups) */
          <div className="flex-1 flex flex-col justify-between min-h-[calc(100vh-5rem)]">
            <div className="flex-1 flex items-center justify-center py-4 sm:py-6">
              <div className="w-full">
                {activeSection === 'que-es' && (
                  <WhatIsNoiseSection
                    onLearnMore={() => setLearnMoreSection('que-es')}
                    onNavigateToCauses={() => setActiveSection('causas')}
                  />
                )}

                {activeSection === 'efectos' && (
                  <HealthEffectsSection
                    onLearnMore={() => setLearnMoreSection('efectos')}
                    onNavigateToSolutions={() => setActiveSection('soluciones')}
                  />
                )}

                {activeSection === 'soluciones' && (
                  <SolutionsSection
                    onLearnMore={() => setLearnMoreSection('soluciones')}
                    onNavigateToAct={() => setActiveSection('actua-ahora')}
                  />
                )}

                {activeSection === 'actua-ahora' && (
                  <ActNowSection
                    onParticipateNow={() => setIsPledgeModalOpen(true)}
                    onExploreResources={() => setActiveSection('recursos')}
                  />
                )}

                {activeSection === 'inicio' && (
                  <HeroOverview
                    onNavigate={(sec) => setActiveSection(sec)}
                    onOpenChatbot={openChatbotWithScenario}
                  />
                )}

                {activeSection === 'causas' && <CausesSection />}

                {activeSection === 'recursos' && <ResourcesSection />}

                {activeSection === 'juego' && (
                  <NoiseMiniGame
                    onOpenChatbot={openChatbotWithScenario}
                    onNavigateSection={handleSelectSection}
                    onOpenLearnMore={(sec) => setLearnMoreSection(sec)}
                  />
                )}

                {activeSection === 'reportes' && (
                  <ReportsSection onOpenChatbot={openChatbotWithScenario} />
                )}
              </div>
            </div>

            {/* Slide Navigation Controls & City Skyline at the Base */}
            <div className="relative w-full">
              {/* Floating Slide Navigator Pills */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={goToPrevSlide}
                      className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shadow-xs"
                      aria-label="Pantalla anterior"
                      title="Pantalla anterior (←)"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono text-slate-500 font-semibold px-2">
                      {currentSlideIndex + 1} / {slideOrder.length}
                    </span>
                    <button
                      onClick={goToNextSlide}
                      className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shadow-xs"
                      aria-label="Pantalla siguiente"
                      title="Pantalla siguiente (→)"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quick screen dots matching the 4 primary prototype screens */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveSection('que-es')}
                      className={`h-2 rounded-full transition-all ${activeSection === 'que-es' ? 'w-6 bg-emerald-600' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                      title="1. ¿Qué es?"
                    />
                    <button
                      onClick={() => setActiveSection('efectos')}
                      className={`h-2 rounded-full transition-all ${activeSection === 'efectos' ? 'w-6 bg-emerald-600' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                      title="2. Efectos en la salud"
                    />
                    <button
                      onClick={() => setActiveSection('soluciones')}
                      className={`h-2 rounded-full transition-all ${activeSection === 'soluciones' ? 'w-6 bg-emerald-600' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                      title="3. Soluciones"
                    />
                    <button
                      onClick={() => setActiveSection('actua-ahora')}
                      className={`h-2 rounded-full transition-all ${activeSection === 'actua-ahora' ? 'w-6 bg-emerald-600' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                      title="4. Actúa ahora"
                    />
                  </div>

                  <button
                    onClick={() => setViewMode('full')}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                  >
                    <span>Ver toda la landing</span>
                    <Layers className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Exact City Skyline Silhouette Grounding the Screen */}
              <CitySkyline />
            </div>
          </div>
        ) : (
          /* FULL CONTINUOUS LANDING PAGE MODE */
          <div className="flex-1 flex flex-col">
            <HeroOverview
              onNavigate={handleSelectSection}
              onOpenChatbot={openChatbotWithScenario}
            />
            
            <div className="h-px bg-slate-100 max-w-7xl mx-auto w-full" />
            <WhatIsNoiseSection
              onLearnMore={() => setLearnMoreSection('que-es')}
              onNavigateToCauses={() => handleSelectSection('causas')}
            />

            <CausesSection />

            <div className="h-px bg-slate-100 max-w-7xl mx-auto w-full" />
            <HealthEffectsSection
              onLearnMore={() => setLearnMoreSection('efectos')}
              onNavigateToSolutions={() => handleSelectSection('soluciones')}
            />

            <div className="h-px bg-slate-100 max-w-7xl mx-auto w-full" />
            <SolutionsSection
              onLearnMore={() => setLearnMoreSection('soluciones')}
              onNavigateToAct={() => handleSelectSection('actua-ahora')}
            />

            <ResourcesSection />

            <div className="h-px bg-slate-100 max-w-7xl mx-auto w-full" />
            <NoiseMiniGame
              onOpenChatbot={openChatbotWithScenario}
              onNavigateSection={handleSelectSection}
              onOpenLearnMore={(sec) => setLearnMoreSection(sec)}
            />

            <div className="h-px bg-slate-100 max-w-7xl mx-auto w-full" />
            <ActNowSection
              onParticipateNow={() => setIsPledgeModalOpen(true)}
              onExploreResources={() => handleSelectSection('recursos')}
            />

            <ReportsSection onOpenChatbot={openChatbotWithScenario} />

            <Footer onNavigate={handleSelectSection} />
          </div>
        )}
      </main>

      {/* Interactive Modals */}
      <LearnMoreModal
        isOpen={!!learnMoreSection}
        onClose={() => setLearnMoreSection(null)}
        section={learnMoreSection || 'que-es'}
      />

      <PledgeModal
        isOpen={isPledgeModalOpen}
        onClose={() => setIsPledgeModalOpen(false)}
      />

      {/* Behavioral Noise Reduction Chatbot Modal */}
      <AcousticChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        initialScenario={chatbotInitialScenario}
        onPlayMiniGame={() => handleSelectSection('juego')}
      />

      {/* Floating Chatbot Launcher Button */}
      <FloatingChatbotLauncher onClick={() => openChatbotWithScenario('hogar')} />

    </div>
  );
}
