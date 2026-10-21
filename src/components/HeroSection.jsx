import React, { useState, useEffect } from 'react';
import logoUrl from '../assets/logo.png';
import AnimatedLogo from './AnimatedLogo';

export default function HeroSection() {
  const dynamicPhrases = [
    'thinks before it consumes.',
    'eliminates idle electrical waste.',
    'harvests daylight to slash lighting draw.',
    'ventilates fresh air when CO₂ spikes.',
    'empirically proves savings with shunt telemetry.',
    'runs 100% locally with zero cloud latency.'
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = dynamicPhrases[phraseIndex];
    const typingSpeed = isDeleting ? 28 : 50;

    if (!isDeleting && currentText === fullText) {
      const pauseTimer = setTimeout(() => setIsDeleting(true), 2200);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % dynamicPhrases.length);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentText((prev) =>
        isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex]);

  return (
    <section className="bg-white/80 backdrop-blur-xl border border-white/80 shadow-[0_10px_35px_-5px_rgba(2,44,34,0.05)] rounded-3xl p-5 sm:p-8 lg:p-10 relative overflow-hidden transition-all duration-300 animate-slide-up" id="blueprint">
      {/* Background Ambient Radial Glow */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Background Watermark */}
      <div className="absolute right-0 top-0 w-96 h-full opacity-5 pointer-events-none flex items-center justify-end pr-8 select-none">
        <img 
          alt="ZeroWatt Watermark" 
          className="w-80 h-80 object-contain select-none" 
          src={logoUrl} 
        />
      </div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8 relative z-10">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50/80 border border-emerald-200/70 text-xs font-telemetry-mono text-primary font-bold uppercase tracking-wider shadow-2xs animate-fade-in">
            <span>SMART MANAGEMENT SYSTEM BHARAT</span>
            <span className="text-emerald-400">✦</span>
            <span>F1.0 ENGINEERING BLUEPRINT</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-headline-xl text-forest-deep font-bold tracking-tight leading-tight min-h-[3.6em] sm:min-h-[2.4em] lg:min-h-[2.2em] animate-slide-up delay-100">
            A smart management system{' '}
            <span className="italic text-primary font-normal bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent inline">
              that {currentText}
            </span>
            <span className="inline-block w-0.5 h-6 sm:h-8 bg-emerald-500 ml-1 translate-y-1 animate-cursor align-middle"></span>
          </h1>
          
          <p className="text-base sm:text-lg font-body-lg text-on-surface-variant leading-relaxed animate-fade-in delay-200">
            A student-built exploration of spatial sensing, environmental intelligence, measurable power control, and human-first automation — designed for demonstration, testing, and real-time grid resilience.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs font-telemetry-mono text-forest-deep animate-pop delay-300">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-secondary-container/90 text-primary font-bold shadow-2xs hover-lift tap-pop">
              <strong>03</strong> Independent Zones
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-subtle/80 border border-border-subtle shadow-2xs hover-lift tap-pop">
              <strong>05</strong> Decision Stages
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-subtle/80 border border-border-subtle shadow-2xs hover-lift tap-pop">
              <strong>100%</strong> Local Core Control
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-900 border border-emerald-200/60 font-semibold shadow-2xs hover-lift tap-pop">
              <strong>0</strong> Fabricated Savings Claims
            </span>
          </div>
        </div>

        {/* Animated Electric Logo Component (Centered horizontally below text on Android/mobile, side-by-side on desktop) */}
        <div className="w-full lg:w-auto flex justify-center items-center shrink-0 pt-4 lg:pt-0 animate-pop delay-200">
          <div className="p-2 sm:p-2.5 rounded-3xl bg-white/50 backdrop-blur-md border border-white/80 shadow-xs hover-lift transition-all">
            <AnimatedLogo />
          </div>
        </div>
      </div>
    </section>
  );
}
