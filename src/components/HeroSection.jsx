import React from 'react';
import logoUrl from '../assets/logo.png';
import AnimatedLogo from './AnimatedLogo';

export default function HeroSection() {
  return (
    <section className="bg-surface-base border border-border-subtle rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden" id="blueprint">
      {/* Background Watermark */}
      <div className="absolute right-0 top-0 w-96 h-full opacity-5 pointer-events-none flex items-center justify-end pr-8">
        <img 
          alt="ZeroWatt Watermark" 
          className="w-80 h-80 object-contain select-none" 
          src={logoUrl} 
        />
      </div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/60 border border-secondary-container text-xs font-telemetry-mono text-primary font-bold uppercase tracking-wider">
            <span>SMART CLASSROOM BHARAT</span>
            <span>✦</span>
            <span>F1.0 ENGINEERING BLUEPRINT</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline-xl text-forest-deep font-bold tracking-tight leading-tight">
            An engineering classroom <span className="italic text-primary font-normal">that thinks before it consumes.</span>
          </h1>
          
          <p className="text-base sm:text-lg font-body-lg text-on-surface-variant leading-relaxed">
            A student-built exploration of spatial sensing, environmental intelligence, measurable power control, and human-first automation — designed for demonstration, testing, and real-time grid resilience.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-telemetry-mono text-forest-deep">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary-container font-semibold">
              <strong>03</strong> Independent Zones
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-subtle border border-border-subtle">
              <strong>05</strong> Decision Stages
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-subtle border border-border-subtle">
              <strong>100%</strong> Local Core Control
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary-container text-on-secondary-container font-semibold">
              <strong>0</strong> Fabricated Savings Claims
            </span>
          </div>
        </div>

        {/* Animated Electric Logo Component */}
        <AnimatedLogo />
      </div>
    </section>
  );
}

