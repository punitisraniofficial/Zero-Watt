import React, { useState, useEffect } from 'react';
import logoUrl from '../assets/logo.png';
import amitabhImg from '../assets/team-members/amitabh.jpeg';
import icchaImg from '../assets/team-members/iccha.jpeg';
import paragImg from '../assets/team-members/parag.jpeg';
import punitImg from '../assets/team-members/punit.jpeg';

const builders = [
  {
    name: 'Amitabh Ghosh',
    role: 'Execution & Backend Head',
    contribution: 'Firmware orchestration, FreeRTOS task scheduling, galvanic isolation safety, and hardware watchdog loops on RPi4.',
    badge: 'FIRMWARE & HARDWARE CORE',
    initials: 'AG',
    photo: amitabhImg,
    color: 'from-emerald-600 to-teal-800',
    linkedin: 'https://www.linkedin.com/in/amitabhaghosh90'
  },
  {
    name: 'Iccha Vats',
    role: 'Research & IAQ Analytics',
    contribution: 'Metabolic CO₂ decay mathematics, thermodynamic ventilation curves, indoor air quality priority ranking, and empirical energy yield models.',
    badge: 'RESEARCH & THERMODYNAMICS',
    initials: 'IV',
    photo: icchaImg,
    color: 'from-teal-600 to-cyan-800',
    linkedin: 'https://www.linkedin.com/in/iccha-vats-b91592407/'
  },
  {
    name: 'Parag Singhal',
    role: 'Backend & Systems Engineer',
    contribution: 'I²C driver communication stack, industrial RS485 Modbus RTU pipelines, ADC daylight divider calibration, and MOSFET PWM load gating.',
    badge: 'EMBEDDED DRIVERS & MODBUS',
    initials: 'PS',
    photo: paragImg,
    color: 'from-amber-600 to-orange-800',
    linkedin: 'https://www.linkedin.com/in/parag-singhal-4574142b2/'
  },
  {
    name: 'Punit Israni',
    role: 'Frontend & UI Architecture Lead',
    contribution: 'Digital twin interactive simulation, real-time telemetry streaming, Web Serial API hardware bridge, 1:1 schematic vector UI, and design system.',
    badge: 'FRONTEND & DIGITAL TWIN UI',
    initials: 'PI',
    photo: punitImg,
    color: 'from-green-600 to-emerald-900',
    linkedin: 'https://www.linkedin.com/in/punit-israni-5548a7258/'
  }
];

export default function BuiltBySection() {
  const binaryPhrases = [
    'Binary Brains Team',
    'Binary Brains',
    'Binary Brains · Same Minds. Bigger Things.',
    'Binary Brains · 4 Engineers · 1 Mission'
  ];

  const [phraseIdx, setPhraseIdx] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = binaryPhrases[phraseIdx];
    const typingSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && typedText === fullText) {
      const timer = setTimeout(() => setIsDeleting(true), 2400);
      return () => clearTimeout(timer);
    }

    if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % binaryPhrases.length);
      return;
    }

    const timer = setTimeout(() => {
      setTypedText((prev) =>
        isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIdx]);

  return (
    <section className="space-y-6 scroll-mt-20" id="built-by">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border-subtle pb-4">
        <div>
          <div className="text-xs font-telemetry-mono text-primary font-bold tracking-widest uppercase">
            13 / BUILT BY &amp; ENGINEERING ATTRIBUTION
          </div>
          <h2 className="text-2xl sm:text-3xl font-headline-md text-forest-deep font-bold mt-1">
            Engineered with Purpose
          </h2>
        </div>
        <p className="text-sm font-body-sm text-on-surface-variant max-w-xl text-left sm:text-right">
          Conceived, designed, prototyped, and brought to life — Built by Binary Brains Team.
        </p>
      </div>

      {/* Main Banner Card */}
      <div className="glass-surface border border-white/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_4px_25px_-5px_rgba(2,44,34,0.05)] hover-lift transition-all relative overflow-hidden">
        {/* Subtle Watermark & Glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 space-y-8">
          {/* Institution & Mission Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-border-subtle/60 pb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/80 border border-white/80 p-2 flex items-center justify-center shadow-xs shrink-0">
                <img src={logoUrl} alt="ZeroWatt Emblem" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-telemetry-mono font-bold text-primary tracking-wider uppercase">
                    SMART ENERGY CAPSTONE
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-telemetry-pulse animate-pulse"></span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-headline-sm text-forest-deep mt-0.5">
                  Built by Binary Brains Team
                </h3>
                <p className="text-xs sm:text-sm font-body-sm text-on-surface-variant mt-0.5 font-semibold text-primary">
                  Same Minds. Bigger Things.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 font-telemetry-mono text-xs">
              <div className="px-3.5 py-1.5 rounded-full bg-secondary-container text-primary font-bold border border-primary/20">
                Batch of 2026
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-surface-subtle text-forest-deep border border-border-subtle font-semibold">
                100% Student-Engineered
              </div>
            </div>
          </div>

          {/* Builder Profiles Grid */}
          <div>
            <div className="text-xs font-telemetry-mono font-bold text-on-surface-variant tracking-wider uppercase mb-4">
              THE CORE BUILDERS
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {builders.map((builder, idx) => (
                <div
                  key={idx}
                  className="bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-5 hover:border-primary/40 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between group tap-pop shadow-2xs"
                >
                  <div className="space-y-4">
                    {/* Header with Photo & Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="relative">
                        <img
                          src={builder.photo}
                          alt={builder.name}
                          className="w-12 h-12 rounded-xl object-cover border border-border-subtle shadow-xs group-hover:scale-105 transition-transform"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div
                          style={{ display: 'none' }}
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${builder.color} text-white font-bold font-headline-sm flex items-center justify-center text-sm shadow-xs`}
                        >
                          {builder.initials}
                        </div>
                      </div>

                      <span className="text-[10px] font-telemetry-mono font-bold px-2 py-0.5 rounded bg-surface-base text-primary border border-border-subtle leading-tight text-right">
                        {builder.badge}
                      </span>
                    </div>

                    {/* Name & Role */}
                    <div>
                      <h4 className="font-bold text-base font-headline-sm text-forest-deep group-hover:text-primary transition-colors">
                        {builder.name}
                      </h4>
                      <p className="text-xs font-telemetry-mono font-semibold text-primary mt-0.5">
                        {builder.role}
                      </p>
                    </div>

                    {/* Technical Contribution */}
                    <p className="text-xs font-body-sm text-on-surface-variant leading-relaxed">
                      {builder.contribution}
                    </p>
                  </div>

                  {/* LinkedIn / Connect Link */}
                  <div className="pt-4 mt-4 border-t border-border-subtle flex items-center justify-between">
                    <span className="text-[11px] font-telemetry-mono text-outline">
                      Active Contributor
                    </span>
                    <a
                      href={builder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-telemetry-mono font-semibold text-primary hover:text-forest-deep transition-colors inline-flex items-center gap-1"
                    >
                      <span>LinkedIn</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Philosophy & Open Standards Block */}
          <div className="pt-6 border-t border-border-subtle grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-surface-subtle border border-border-subtle">
              <div className="flex items-center gap-2 text-forest-deep font-bold text-xs font-telemetry-mono mb-1.5 uppercase">
                <span className="text-primary text-sm font-bold">⚡</span>
                <span>Zero Fabricated Claims</span>
              </div>
              <p className="text-xs font-body-sm text-on-surface-variant leading-relaxed">
                Every milliwatt reduction and power factor reading shown in this project is verified by calibrated INA219 shunt sensors and Modbus power meters—no simulated illusions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface-subtle border border-border-subtle">
              <div className="flex items-center gap-2 text-forest-deep font-bold text-xs font-telemetry-mono mb-1.5 uppercase">
                <span className="text-primary text-sm font-bold">🛡️</span>
                <span>Offline-First Autonomy</span>
              </div>
              <p className="text-xs font-body-sm text-on-surface-variant leading-relaxed">
                The RPi4 edge gateway runs intelligence locally without internet dependency, eliminating telemetry latency and protecting institutional privacy.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface-subtle border border-border-subtle">
              <div className="flex items-center gap-2 text-forest-deep font-bold text-xs font-telemetry-mono mb-1.5 uppercase">
                <span className="text-primary text-sm font-bold">🌿</span>
                <span>यत्र आवश्यकता, तत्र ऊर्जा</span>
              </div>
              <p className="text-xs font-body-sm text-on-surface-variant leading-relaxed">
                "Where there is need, there is energy." Energy is treated as an active, conscious resource—diverted only to spaces and occupants that actively require it.
              </p>
            </div>
          </div>

          {/* Centered End Attribution & Big Font Return to Top Block */}
          <div className="pt-8 border-t border-border-subtle flex flex-col items-center justify-center text-center space-y-5">
            {/* Tech Stack Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="font-bold text-forest-deep text-xs font-telemetry-mono mr-1">STACK:</span>
              {['RPi4', 'Raspberry Pi 4', 'Modbus RS485', 'React 19', 'Tailwind CSS', 'Vite', 'FreeRTOS', 'SCD30', 'INA219'].map((tech) => (
                <span key={tech} className="px-2.5 py-0.5 rounded-md bg-surface-subtle border border-border-subtle text-[11px] font-medium text-forest-deep">
                  {tech}
                </span>
              ))}
            </div>

            {/* Big Font Centered Attribution with Live Type Animation */}
            <div className="flex flex-col items-center justify-center space-y-2 py-2">
              <div className="inline-flex items-center justify-center gap-2 sm:gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-headline-md font-extrabold text-forest-deep tracking-tight min-h-[1.4em] flex flex-wrap items-center justify-center text-center">
                  <span>Built by&nbsp;</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 font-black">
                    {typedText}
                  </span>
                  <span className="inline-block w-0.5 sm:w-1 h-6 sm:h-8 md:h-9 bg-emerald-500 ml-1.5 translate-y-0.5 animate-cursor"></span>
                </h3>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              </div>
              <p className="text-sm sm:text-base font-telemetry-mono font-bold text-emerald-600 tracking-wider uppercase">
                Same Minds. Bigger Things.
              </p>
            </div>

            {/* Return to Top Button Centered at Bottom */}
            <div className="pt-1 flex items-center justify-center">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 rounded-full bg-forest-deep hover:bg-emerald-600 text-white text-xs sm:text-sm font-telemetry-mono font-bold transition-all shadow-md hover:shadow-lg hover:shadow-emerald-900/20 hover-lift tap-pop cursor-pointer active:scale-95"
                title="Return to top of page"
              >
                <span className="material-symbols-outlined text-base">arrow_upward</span>
                <span>Return to Top</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
