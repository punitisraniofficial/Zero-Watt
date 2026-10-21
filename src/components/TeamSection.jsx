import React, { useState, useEffect } from 'react';
import amitabhImg from '../assets/team-members/amitabh.jpeg';
import icchaImg from '../assets/team-members/iccha.jpeg';
import paragImg from '../assets/team-members/parag.jpeg';
import punitImg from '../assets/team-members/punit.jpeg';

const teamMembers = [
  {
    id: 'amitabh',
    name: 'Amitabh Ghosh',
    role: 'Execution & Backend Head',
    tag: 'EXECUTION & BACKEND',
    initials: 'AG',
    photo: amitabhImg,
    accentColor: 'from-emerald-600 to-teal-800',
    description: 'Leads end-to-end system execution, firmware deployment pipeline, and hardware-software orchestration between RPi4 edge controllers and gateway systems. Specializes in real-time embedded systems, low-power sleep modes, and fail-safe hardware watchdogs.',
    quote: '"True energy conservation isn\'t about turning things off manually—it\'s about engineering systems that think and act before energy is ever squandered."',
    linkedin: 'https://www.linkedin.com/in/amitabhaghosh90',
    skills: ['FreeRTOS', 'RPi4 OS / Linux', 'Firmware Orchestration', 'Galvanic Safety']
  },
  {
    id: 'iccha',
    name: 'Iccha Vats',
    role: 'Research & Backend',
    tag: 'RESEARCH & BACKEND',
    initials: 'IV',
    photo: icchaImg,
    accentColor: 'from-teal-600 to-cyan-800',
    description: 'Drives thermodynamic and occupancy research models, mathematical energy yield calculations, and sensor telemetry analysis for dynamic indoor air quality and load prioritization. Researches closed-loop daylight harvesting algorithms and metabolic CO₂ dissipation curves.',
    quote: '"Smart management systems should breathe with their occupants; when science guides ventilation, energy savings and occupant focus thrive together."',
    linkedin: 'https://www.linkedin.com/in/iccha-vats-b91592407/',
    skills: ['Thermodynamics Modeling', 'IAQ Analytics', 'Data Pipelines', 'CO₂ Kinetics']
  },
  {
    id: 'parag',
    name: 'Parag Singhal',
    role: 'Backend Team',
    tag: 'BACKEND & SYSTEMS',
    initials: 'PS',
    photo: paragImg,
    accentColor: 'from-amber-600 to-orange-800',
    description: 'Engineers embedded driver modules, I²C & Modbus communication pipelines, and real-time state machine routines ensuring microsecond-level deterministic actuation. Focused on multi-sensor bus arbitration, ADC daylight dividers, and physical MOSFET PWM switching.',
    quote: '"Deterministic edge logic guarantees that safety and priority gating remain uncompromised, even in the event of complete network blackout."',
    linkedin: 'https://www.linkedin.com/in/parag-singhal-4574142b2/',
    skills: ['I²C Bus Drivers', 'Modbus RS485', 'PWM Controllers', 'State Machines']
  },
  {
    id: 'punit',
    name: 'Punit Israni',
    role: 'Frontend & UI',
    tag: 'FRONTEND & UI LEAD',
    initials: 'PI',
    photo: punitImg,
    accentColor: 'from-green-600 to-emerald-900',
    description: 'Architects the interactive digital twin visualizer, real-time telemetry streaming interfaces, custom SVG vector evidence engine, and clean engineering design system. Crafts responsive, accessible data representations for evaluators, faculty, and facility operators.',
    quote: '"Complexity under the hood should feel effortless on screen. Telemetry proves the math; intuitive design tells the human story."',
    linkedin: 'https://www.linkedin.com/in/punit-israni-5548a7258/',
    skills: ['React 19', 'Tailwind CSS', 'SVG Data Curves', 'Digital Twin UI']
  }
];

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedMember(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="space-y-6 scroll-mt-20 relative" id="team">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border-subtle pb-4">
        <div>
          <div className="text-xs font-telemetry-mono text-primary font-bold tracking-widest uppercase">
            11 / ENGINEERING TEAM
          </div>
          <h2 className="text-2xl sm:text-3xl font-headline-md text-forest-deep font-bold mt-1">
            Meet the Builders
          </h2>
        </div>
        <p className="text-sm font-body-sm text-on-surface-variant max-w-xl text-left sm:text-right">
          The engineering minds from <strong>Binary Brains Team</strong> behind the ZeroWatt spatial sensing, embedded telemetry, and intelligent energy platform. Click any profile to view details.
        </p>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            onClick={() => setSelectedMember(member)}
            className="glass-surface border border-white/80 rounded-3xl p-6 shadow-[0_4px_25px_-5px_rgba(2,44,34,0.05)] hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer hover-lift tap-pop"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') setSelectedMember(member); }}
            title={`Click to view ${member.name}'s profile`}
          >
            <div>
              {/* Card Top: Photo or Initials Avatar with Tag */}
              <div className="flex items-center justify-between mb-5">
                <div className="relative">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-border-subtle shadow-sm group-hover:scale-105 group-hover:border-primary transition-all duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className={`hidden w-14 h-14 rounded-2xl bg-gradient-to-br ${member.accentColor} text-white items-center justify-center font-bold text-lg font-headline-sm shadow-sm`}>
                    {member.initials}
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-telemetry-mono font-bold bg-secondary-container text-primary border border-primary/20">
                  {member.tag}
                </span>
              </div>

              {/* Name & Role */}
              <h3 className="text-lg font-bold font-headline-sm text-forest-deep group-hover:text-primary transition-colors flex items-center justify-between">
                <span>{member.name}</span>
                <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity font-telemetry-mono">
                  View →
                </span>
              </h3>
              <p className="text-xs font-semibold text-primary font-telemetry-mono mt-0.5 mb-3">
                {member.role}
              </p>

              {/* Description Snippet */}
              <p className="text-xs font-body-sm text-on-surface-variant leading-relaxed line-clamp-3">
                {member.description}
              </p>
            </div>

            {/* Bottom Status & Direct LinkedIn Link */}
            <div className="pt-5 mt-5 border-t border-border-subtle flex items-center justify-between text-[11px] font-telemetry-mono text-on-surface-variant">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                <span>Active Core</span>
              </span>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0077B5]/10 hover:bg-[#0077B5] text-[#0077B5] hover:text-white transition-all font-semibold"
                title={`Connect with ${member.name} on LinkedIn`}
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn ↗</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Detail Modal when clicked */}
      {selectedMember && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedMember(null)}
        >
          <div 
            className="bg-surface-base border border-border-subtle rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col md:flex-row relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-surface-base/80 hover:bg-surface-muted border border-border-subtle text-forest-deep flex items-center justify-center transition-colors cursor-pointer shadow-sm"
              aria-label="Close Profile"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left Side: Photo & Quick Badges */}
            <div className="md:w-5/12 bg-gradient-to-b from-surface-subtle to-surface-muted p-6 sm:p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-border-subtle">
              <div className="relative mb-4 group">
                <img
                  src={selectedMember.photo}
                  alt={selectedMember.name}
                  className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl object-cover shadow-md border-3 border-surface-base"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className={`hidden w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-gradient-to-br ${selectedMember.accentColor} text-white items-center justify-center font-bold text-3xl font-headline-sm shadow-md`}>
                  {selectedMember.initials}
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-telemetry-mono font-bold bg-secondary-container text-primary border border-primary/20 mb-2">
                {selectedMember.tag}
              </span>

              <div className="text-xs font-telemetry-mono text-on-surface-variant flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span>Binary Brains Team</span>
              </div>
            </div>

            {/* Right Side: Details, Quote, LinkedIn */}
            <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between space-y-5">
              <div>
                <h3 className="text-2xl font-bold font-headline-md text-forest-deep">
                  {selectedMember.name}
                </h3>
                <p className="text-sm font-semibold text-primary font-telemetry-mono mt-0.5">
                  {selectedMember.role}
                </p>

                {/* Detailed Description */}
                <div className="mt-4 text-xs sm:text-sm font-body-sm text-on-surface-variant leading-relaxed">
                  {selectedMember.description}
                </div>

                {/* Quote Box */}
                <div className="mt-5 p-4 rounded-xl bg-surface-subtle border-l-3 border-primary italic text-xs sm:text-sm font-body-sm text-forest-deep shadow-2xs">
                  <div className="flex gap-2">
                    <span className="text-primary text-xl font-serif leading-none">“</span>
                    <p>{selectedMember.quote.replace(/^"|"$/g, '')}</p>
                  </div>
                </div>

                {/* Key Focus Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {selectedMember.skills.map(s => (
                    <span key={s} className="px-2.5 py-0.5 rounded-md text-[10px] font-telemetry-mono bg-surface-muted text-on-surface-variant border border-border-subtle">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions: LinkedIn Link */}
              <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                <a
                  href={selectedMember.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0077B5] hover:bg-[#005E93] text-white text-xs font-telemetry-mono font-semibold transition-all shadow-sm hover:scale-[1.02]"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>Connect on LinkedIn</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedMember(null)}
                  className="text-xs font-telemetry-mono text-on-surface-variant hover:text-forest-deep underline underline-offset-4"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
