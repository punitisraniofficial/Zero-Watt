import React from 'react';

const teamMembers = [
  {
    name: 'Amitabh Ghosh',
    role: 'Execution & Backend Head',
    tag: 'EXECUTION & BACKEND',
    initials: 'AG',
    accentColor: 'from-emerald-600 to-teal-800',
    description: 'Leads end-to-end system execution, firmware deployment pipeline, and hardware-software orchestration between edge controllers and gateway systems.'
  },
  {
    name: 'Iccha Vatsp',
    role: 'Research & Backend',
    tag: 'RESEARCH & BACKEND',
    initials: 'IV',
    accentColor: 'from-teal-600 to-cyan-800',
    description: 'Spearheads energy conservation modeling, dynamic priority reallocation algorithms, and sensor telemetry analysis for IAQ and occupancy kinetics.'
  },
  {
    name: 'Parag Singhal',
    role: 'Backend Team',
    tag: 'BACKEND & SYSTEMS',
    initials: 'PS',
    accentColor: 'from-amber-600 to-orange-800',
    description: 'Engineers robust sensor communication drivers, I²C/Modbus industrial bus telemetry interfaces, and low-latency gateway message routing.'
  },
  {
    name: 'Punit Israni',
    role: 'Frontend & UI',
    tag: 'FRONTEND & UI LEAD',
    initials: 'PI',
    accentColor: 'from-green-600 to-emerald-900',
    description: 'Crafts the high-fidelity telemetry visualizer, interactive digital twin simulators, design system tokens, and responsive real-time operator interfaces.'
  }
];

export default function TeamSection() {
  return (
    <section className="space-y-6 scroll-mt-20" id="team">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border-subtle pb-4">
        <div>
          <div className="text-xs font-telemetry-mono text-primary font-bold tracking-widest uppercase">
            07 / ENGINEERING TEAM
          </div>
          <h2 className="text-2xl sm:text-3xl font-headline-md text-forest-deep font-bold mt-1">
            Meet the Builders
          </h2>
        </div>
        <p className="text-sm font-body-sm text-on-surface-variant max-w-xl text-left sm:text-right">
          The engineering minds from NIT Tiruchirappalli behind the ZeroWatt spatial sensing, embedded telemetry, and intelligent energy platform.
        </p>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="bg-surface-base border border-border-subtle rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Header with Avatar and Tag */}
              <div className="flex items-center justify-between mb-5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.accentColor} text-white flex items-center justify-center font-bold text-lg font-headline-sm shadow-sm group-hover:scale-105 transition-transform`}>
                  {member.initials}
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-telemetry-mono font-bold bg-secondary-container text-primary border border-primary/20">
                  {member.tag}
                </span>
              </div>

              {/* Name & Role */}
              <h3 className="text-lg font-bold font-headline-sm text-forest-deep group-hover:text-primary transition-colors">
                {member.name}
              </h3>
              <p className="text-xs font-semibold text-primary font-telemetry-mono mt-0.5 mb-3">
                {member.role}
              </p>

              {/* Description */}
              <p className="text-xs font-body-sm text-on-surface-variant leading-relaxed">
                {member.description}
              </p>
            </div>

            {/* Bottom Status Indicator */}
            <div className="pt-5 mt-5 border-t border-border-subtle flex items-center justify-between text-[11px] font-telemetry-mono text-on-surface-variant">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>Active Core</span>
              </span>
              <span className="text-outline">NIT Trichy</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
