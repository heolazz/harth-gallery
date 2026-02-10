import React, { useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { DESIGN_PROJECTS } from './constants';
import ProjectCard from './components/ProjectCard';
import BridgeCard from './components/BridgeCard';
import ArtGallery from './components/ArtGallery';
import ActiveProject from './components/ActiveProject';
import { useGalleryDimensions } from './hooks/useGalleryDimensions';
import { useHorizontalScroll } from './hooks/useHorizontalScroll';
import { useTouchNavigation } from './hooks/useTouchNavigation';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';

const App: React.FC = () => {
  // Refs
  const ghostContainerRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const artSectionRef = useRef<HTMLDivElement>(null);

  // Navigation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();
  const location = useLocation();

  // Derive activeId from URL path: /project/:id
  const activeId = location.pathname.startsWith('/project/')
    ? location.pathname.split('/project/')[1]
    : null;

  // Set activeId URL handler
  const handleSetActiveId = (id: string | null) => {
    if (id) navigate(`/project/${id}`);
    else navigate('/');
  };

  // 1. Calculate dynamic height
  const ghostHeight = useGalleryDimensions(horizontalTrackRef, stickyContainerRef);

  // 2. Map Vertical Scroll to Horizontal Transform + Auto-Dismiss Logic
  const { isArtUnlocked, syncScroll } = useHorizontalScroll(
    ghostContainerRef,
    horizontalTrackRef,
    progressBarRef,
    ghostHeight,
    activeId,
    handleSetActiveId
  );

  // 3. Mobile Touch Handling relative to the sticky container
  useTouchNavigation(stickyContainerRef, activeId);

  // 4. Keyboard Navigation
  useKeyboardNavigation(!!activeId);

  const scrollToArt = () => {
    if (ghostContainerRef.current) {
      const endOfGallery = ghostContainerRef.current.offsetTop + ghostHeight;
      window.scrollTo({ top: endOfGallery, behavior: 'smooth' });
    }
  };

  const getDisplacementState = (itemId: string, index: number) => {
    if (!activeId) return 'idle';
    if (activeId === itemId) return 'active';
    const activeIndex = DESIGN_PROJECTS.findIndex(p => p.id === activeId);
    if (index < activeIndex) return 'left';
    return 'right';
  };

  const activeProject = DESIGN_PROJECTS.find(p => p.id === activeId);

  return (
    <main className="bg-stone-50 text-stone-900 selection:bg-stone-200">

      {/* Header */}
      <header className={`fixed top-0 left-0 w-full z-40 px-8 py-6 flex justify-between items-center transition-all duration-500 ${activeId ? 'opacity-0 -translate-y-10 pointer-events-none' : 'opacity-100 mix-blend-difference text-white'}`}>
        <div><h1 className="text-2xl font-serif font-semibold tracking-tight">Harth</h1></div>
        <div><a href="#" className="text-sm font-medium uppercase tracking-widest">Gallery</a></div>
      </header>

      {/* Progress Bar - Updated with Ref */}
      <div
        ref={progressBarRef}
        className={`fixed top-0 left-0 h-[3px] bg-stone-900 z-50 transition-opacity duration-300 ${activeId ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* SCROLL HIJACKING STRUCTURE */}
      <div
        ref={ghostContainerRef}
        style={{ height: `${ghostHeight + window.innerHeight}px` }}
        className="relative w-full"
      >
        <div
          ref={stickyContainerRef}
          // Changed h-screen to h-[100dvh] for mobile browser address bar stability
          className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center touch-pan-y"
        >
          {/* Moving Track - Style will be managed by hook ref */}
          <div
            ref={horizontalTrackRef}
            className="flex h-full items-center will-change-transform pl-[10vw] pr-[10vw]"
          >
            {/* Desktop Intro: Clean & Minimalist */}
            <div className={`flex-shrink-0 w-[15vw] h-full hidden md:flex flex-col justify-center px-12 transition-opacity duration-500 ${activeId ? 'opacity-0' : 'opacity-100'}`}>
              <div className="border-l border-stone-300 pl-6 py-4">
                <h2 className="font-serif text-3xl text-stone-800 italic mb-2">Selected Works</h2>
                <p className="text-xs font-bold tracking-[0.2em] text-stone-300 uppercase">Swipe</p>
              </div>
            </div>

            {/* Mobile Intro: Clean & Simple */}
            <div className="flex-shrink-0 w-[70vw] md:hidden flex flex-col justify-center px-8 snap-center">
              <h2 className="font-serif text-3xl text-stone-800 mb-2">Selected Works</h2>
              <p className="text-stone-400 text-xs tracking-widest uppercase flex items-center gap-2">
                Swipe <span className="text-lg">&rarr;</span>
              </p>
            </div>

            {DESIGN_PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                displacementState={getDisplacementState(project.id, index)}
                onClick={(id) => {
                  handleSetActiveId(id);
                  syncScroll();
                }}
              />
            ))}

            <div className={`transition-opacity duration-500 ${activeId ? 'opacity-0' : 'opacity-100'}`}>
              <BridgeCard onClick={scrollToArt} />
            </div>
          </div>
        </div>
      </div>

      {/* OVERLAY: The Active Project View */}
      <AnimatePresence>
        <Routes>
          <Route path="/project/:id" element={
            activeProject ? (
              <ActiveProject
                project={activeProject}
                onClose={() => handleSetActiveId(null)}
              />
            ) : null
          } />
        </Routes>
      </AnimatePresence>

      {/* Vertical Art Gallery */}
      <ArtGallery
        isVisible={true}
        innerRef={artSectionRef}
        onSelectArt={() => { }}
      />

    </main>
  );
};

export default App;