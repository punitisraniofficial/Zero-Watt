import React, { useState, useEffect } from 'react';
import logoUrl from '../assets/logo.png';

export default function Navbar({ onOpenSerialModal, isSerialConnected }) {
  const [activeSection, setActiveSection] = useState('features');

  // Track active section on scroll for both desktop & mobile bottom bar highlights
  useEffect(() => {
    const sectionIds = ['features', 'problem', 'live-simulator', 'architecture', 'parts-list', 'team', 'contact'];
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Desktop Nav Items: Restored to previous comprehensive sections
  const desktopNavItems = [
    { id: 'features', label: 'Features', href: '#features' },
    { id: 'problem', label: 'Problem', href: '#problem' },
    { id: 'live-simulator', label: 'Simulator', href: '#live-simulator' },
    { id: 'architecture', label: 'Architecture', href: '#architecture' },
    { id: 'parts-list', label: 'Parts', href: '#parts-list' },
    { id: 'team', label: 'Team', href: '#team' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ];

  // Mobile Nav Items: Concise, clean tab bar WITHOUT the simulation button
  const mobileNavItems = [
    { id: 'features', label: 'Features', icon: 'bolt', href: '#features' },
    { id: 'problem', label: 'Problem', icon: 'troubleshoot', href: '#problem' },
    { id: 'architecture', label: 'Architecture', icon: 'hub', href: '#architecture' },
    { id: 'team', label: 'Team', icon: 'group', href: '#team' },
    { id: 'contact', label: 'Contact', icon: 'mail', href: '#contact' }
  ];

  const handleNavClick = (e, href, id) => {
    e.preventDefault();
    setActiveSection(id);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ========================================================
          1. TOP NAVBAR (Floating Glassmorphic Pill Bar with Enlarged Logo)
         ======================================================== */}
      <header className="sticky top-2 sm:top-3 z-50 w-full max-w-7xl mx-auto px-3 sm:px-6 transition-all animate-slide-down">
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/80 shadow-[0_4px_25px_-4px_rgba(2,44,34,0.06)] rounded-full px-3.5 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between relative min-h-[58px] sm:min-h-[66px]">
          {/* Brand: Enlarged Logo Emblem Card + ZeroWatt */}
          <a className="flex items-center gap-3 sm:gap-3.5 group shrink-0 tap-pop" href="#">
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-white border border-border-subtle overflow-hidden flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <img 
                alt="ZeroWatt Logo" 
                className="w-full h-full object-contain scale-[1.42] transition-transform" 
                src={logoUrl} 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-headline-sm font-bold text-forest-deep tracking-tight leading-none">
                ZeroWatt
              </span>
              <span className="text-[10px] sm:text-[11px] font-telemetry-mono text-emerald-600 font-semibold tracking-wider uppercase mt-1 leading-none">
                AI Energy System
              </span>
            </div>
          </a>

          {/* Desktop Only: Nav Links with Spacing from Reference Design */}
          <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-8 font-label-md text-sm text-slate-600">
            {desktopNavItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.id)}
                  className={`transition-colors duration-200 font-medium tap-pop text-center whitespace-nowrap ${
                    isActive
                      ? 'text-forest-deep font-bold'
                      : 'text-slate-600 hover:text-forest-deep'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Header Actions: Dark Pill "Open Command Centre" Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenSerialModal}
              className="inline-flex items-center gap-2 bg-[#0a2318] hover:bg-forest-deep text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-sm hover-lift tap-pop cursor-pointer active:scale-95"
              title="Open ZeroWatt Command Centre"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              <span className="hidden sm:inline">Open Command Centre</span>
              <span className="sm:hidden">Command Centre</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================
          2. MOBILE CONCISE BOTTOM TAB BAR (iOS / Telegram Style)
             - Sleek, concise, low-profile height
             - NO simulation button (removed per design)
             - 6 evenly-spaced concise tabs
             - Translucent glassmorphism with high backdrop blur
             - Native iOS Safe Area insets
         ======================================================== */}
      <nav 
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/90 backdrop-blur-2xl border-t border-slate-200/80 shadow-[0_-4px_25px_rgba(2,44,34,0.06)] px-2 py-1 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] transition-transform duration-300 animate-slide-up"
      >
        <div className="flex items-center justify-between max-w-md mx-auto">
          {mobileNavItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.id)}
                className={`flex-1 flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all duration-200 tap-pop select-none focus:outline-none text-center ${
                  isActive
                    ? 'text-primary font-bold'
                    : 'text-slate-500 hover:text-slate-800 active:scale-95'
                }`}
              >
                <div className={`px-2 py-0.5 rounded-lg transition-all flex items-center justify-center ${
                  isActive ? 'bg-emerald-500/15' : 'bg-transparent'
                }`}>
                  <span className={`material-symbols-outlined text-[19px] block transition-transform text-center ${
                    isActive ? 'scale-105 text-primary' : 'text-slate-500'
                  }`}>
                    {item.icon}
                  </span>
                </div>
                <span className={`text-[10px] font-medium leading-none tracking-tight mt-1 text-center w-full block truncate ${
                  isActive ? 'text-primary font-bold' : 'text-slate-500'
                }`}>
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
