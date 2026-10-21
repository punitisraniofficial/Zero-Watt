import React from 'react';
import ScrollReveal from './ScrollReveal';
import TypewriterText from './TypewriterText';

export default function WhatIsZeroWattSection() {
  const manifestoPhrases = [
    '“Smarter Energy. Less Waste. A Greener Tomorrow.”',
    '“Decentralized Edge Intelligence. Zero Standby Loss.”',
    '“Autonomous Circuit Gating. Verified Telemetry.”',
    '“Privacy-First Local AI on RPi4. 100% Cloud-Free.”'
  ];

  return (
    <ScrollReveal animation="slide-up" threshold={0.1}>
      <section className="scroll-mt-20 relative overflow-hidden rounded-3xl border border-emerald-900/50 bg-[#040e0a] text-slate-100 shadow-2xl transition-all duration-300" id="what-is-zerowatt">
        {/* Background Tech Elements: Radial glows and digital grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.18),rgba(255,255,255,0))] pointer-events-none"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Decorative Grid Line Matrix */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#062b1e0f_1px,transparent_1px),linear-gradient(to_bottom,#062b1e0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

        <div className="relative z-10 p-5 sm:p-8 lg:p-9 space-y-6">
          {/* Top Header Block */}
          <div className="space-y-2.5 max-w-3xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-telemetry-mono font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>01 / WHAT IS ZEROWATT</span>
              <span className="text-emerald-500/60 font-normal">·</span>
              <span className="text-emerald-300/80 font-normal text-[11px]">SMART ENERGY ARCHITECTURE</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-headline-xl font-black text-white tracking-tight leading-tight">
              What Is <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">ZeroWatt?</span>
            </h2>

            <p className="text-sm sm:text-base font-body-lg text-emerald-300/90 italic font-medium min-h-[1.6em] flex items-center">
              <TypewriterText 
                phrases={manifestoPhrases} 
                typingSpeed={40} 
                deletingSpeed={20} 
                pauseMs={2500}
                className="text-emerald-300" 
              />
            </p>
          </div>

          {/* Concise Visually Engaging Definition Block */}
          <div className="relative rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#071d15]/60 to-emerald-950/40 border border-emerald-500/30 p-5 sm:p-7 backdrop-blur-md shadow-xl overflow-hidden group animate-pop delay-100">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-emerald-400 to-teal-500"></div>
            
            <div className="space-y-4 max-w-4xl">
              <p className="text-base sm:text-xl font-body-lg text-slate-200 leading-relaxed font-normal">
                <strong className="text-emerald-300 font-bold">ZeroWatt</strong> is an AI-powered smart energy management system that detects energy wastage, automates electrical appliances, and monitors real-time energy consumption to improve energy efficiency and reduce electricity costs in workplaces.
              </p>
              
              <div className="flex flex-wrap items-center gap-y-2.5 gap-x-6 text-xs font-telemetry-mono text-emerald-400/90 pt-2 border-t border-emerald-900/40">
                <span className="flex items-center gap-1.5 animate-slide-left delay-75">
                  <span className="text-emerald-400">✓</span> Commercial &amp; Campus Workplaces
                </span>
                <span className="flex items-center gap-1.5 animate-slide-left delay-150">
                  <span className="text-emerald-400">✓</span> Privacy-First Edge Computer Vision
                </span>
                <span className="flex items-center gap-1.5 animate-slide-left delay-200">
                  <span className="text-emerald-400">✓</span> Verified Telemetry (kW / W)
                </span>
                <span className="flex items-center gap-1.5 animate-slide-left delay-300">
                  <span className="text-emerald-400">✓</span> Zero Cloud Dependency
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
