import React from 'react';

export default function HardwareSpecs() {
  return (
    <section className="space-y-6 scroll-mt-20 relative" id="hardware-specs">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border-subtle pb-4">
        <div>
          <div className="text-xs font-telemetry-mono text-primary font-bold tracking-widest uppercase">
            10 / HARDWARE PIN TOPOLOGY &amp; VALIDATION
          </div>
          <h2 className="text-2xl sm:text-3xl font-headline-md text-forest-deep font-bold mt-1">
            Hardware Pin Topology &amp; Core Principles
          </h2>
        </div>
        <p className="text-sm font-body-sm text-on-surface-variant max-w-xl text-left sm:text-right">
          Physical microcontroller bus mapping, ADC daylight dividers, galvanic boundary safety, and verified principles by Binary Brains Team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Physical Pin Map & Microcontroller Connections */}
      <div className="glass-surface border border-white/80 rounded-3xl p-6 sm:p-7 shadow-[0_4px_25px_-5px_rgba(2,44,34,0.05)] hover-lift transition-all">
        <div className="flex items-center justify-between border-b border-border-subtle/60 pb-3 mb-4">
          <h3 className="text-sm font-bold text-forest-deep flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">memory</span>
            HARDWARE PIN MAPPING &amp; BUS TOPOLOGY
          </h3>
          <span className="text-[11px] font-telemetry-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">RPi4 Controller</span>
        </div>
        <div className="space-y-2.5 text-xs font-telemetry-mono">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white/60 p-3 rounded-xl border border-white/80 shadow-2xs gap-1">
            <span className="font-bold text-forest-deep">Spatial PIR Inputs:</span>
            <span className="text-primary font-semibold">GPIO 32 (Z1), GPIO 33 (Z2), GPIO 25 (Z3)</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white/60 p-3 rounded-xl border border-white/80 shadow-2xs gap-1">
            <span className="font-bold text-forest-deep">LDR Daylight Dividers (ADC1):</span>
            <span className="text-primary font-semibold">GPIO 34 (Z1), GPIO 35 (Z2), GPIO 36 (Z3)</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white/60 p-3 rounded-xl border border-white/80 shadow-2xs gap-1">
            <span className="font-bold text-forest-deep">I²C Bus (Sensors + Power):</span>
            <span className="text-primary font-semibold">SDA: GPIO 21 · SCL: GPIO 22 (SCD30 + INA219)</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white/60 p-3 rounded-xl border border-white/80 shadow-2xs gap-1">
            <span className="font-bold text-forest-deep">Controllable MOSFET Gates:</span>
            <span className="text-primary font-semibold">PWM Light (16,17,18) · PWM Fans (19,23,26,27)</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white/60 p-3 rounded-xl border border-white/80 shadow-2xs gap-1">
            <span className="font-bold text-forest-deep">Hardware Safety Boundary:</span>
            <span className="text-alarm-amber font-semibold">12V DC Regulated Bus · Galvanic Isolation</span>
          </div>
        </div>
      </div>

      {/* Engineering Principles */}
      <div className="glass-surface border border-white/80 rounded-3xl p-6 sm:p-7 shadow-[0_4px_25px_-5px_rgba(2,44,34,0.05)] hover-lift flex flex-col justify-between transition-all">
        <div>
          <div className="flex items-center justify-between border-b border-border-subtle/60 pb-3 mb-4">
            <h3 className="text-sm font-bold text-forest-deep flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">verified</span>
              ACADEMIC &amp; ENGINEERING PRINCIPLES
            </h3>
            <span className="text-[11px] font-telemetry-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">Binary Brains Team</span>
          </div>
          <div className="space-y-3 text-xs text-on-surface-variant font-body-sm leading-relaxed">
            <p>
              <strong className="text-forest-deep font-semibold">1. Not Energy Transfer:</strong> Energy is never magically moved from a lamp to a fan. Instead, throttling low-priority demand makes the permitted shared load budget available for essential air quality loads.
            </p>
            <p>
              <strong className="text-forest-deep font-semibold">2. Local-First Authority:</strong> The RPi4 cooperative state machine operates autonomously without internet connectivity or cloud latency dependencies.
            </p>
            <p>
              <strong className="text-forest-deep font-semibold">3. Measured Claims Only:</strong> Switching a switch off does not prove energy was conserved; the INA219 shunt resistor verifies actual voltage, current, and wattage deltas.
            </p>
          </div>
        </div>
        <div className="pt-4 mt-4 border-t border-border-subtle/60 flex items-center justify-between text-xs font-telemetry-mono text-outline">
          <span>Project Team: Binary Brains Team</span>
          <span className="text-primary font-bold">F1.0 Working Model</span>
        </div>
      </div>
      </div>
    </section>
  );
}
