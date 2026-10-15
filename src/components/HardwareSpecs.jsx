import React from 'react';

export default function HardwareSpecs() {
  return (
    <section className="space-y-6 scroll-mt-20 relative" id="hardware-specs">
      <div id="architecture" className="absolute -top-24 pointer-events-none"></div>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border-subtle pb-4">
        <div>
          <div className="text-xs font-telemetry-mono text-primary font-bold tracking-widest uppercase">
            05 / HARDWARE ARCHITECTURE &amp; VALIDATION
          </div>
          <h2 className="text-2xl sm:text-3xl font-headline-md text-forest-deep font-bold mt-1">
            Hardware Pin Topology &amp; Core Principles
          </h2>
        </div>
        <p className="text-sm font-body-sm text-on-surface-variant max-w-xl text-left sm:text-right">
          Physical microcontroller bus mapping, ADC daylight dividers, galvanic boundary safety, and verified academic principles from NIT Tiruchirappalli.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Physical Pin Map & Microcontroller Connections */}
      <div className="bg-surface-base border border-border-subtle rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-border-subtle pb-3 mb-4">
          <h3 className="text-sm font-bold text-forest-deep flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">memory</span>
            HARDWARE PIN MAPPING & BUS TOPOLOGY
          </h3>
          <span className="text-xs font-telemetry-mono text-outline">DevKitC ESP32-S3</span>
        </div>
        <div className="space-y-2.5 text-xs font-telemetry-mono">
          <div className="flex justify-between items-center bg-surface-subtle p-2.5 rounded-lg border border-border-subtle">
            <span className="font-bold text-forest-deep">Spatial PIR Inputs:</span>
            <span className="text-primary font-semibold">GPIO 32 (Z1), GPIO 33 (Z2), GPIO 25 (Z3)</span>
          </div>
          <div className="flex justify-between items-center bg-surface-subtle p-2.5 rounded-lg border border-border-subtle">
            <span className="font-bold text-forest-deep">LDR Daylight Dividers (ADC1):</span>
            <span className="text-primary font-semibold">GPIO 34 (Z1), GPIO 35 (Z2), GPIO 36 (Z3)</span>
          </div>
          <div className="flex justify-between items-center bg-surface-subtle p-2.5 rounded-lg border border-border-subtle">
            <span className="font-bold text-forest-deep">I²C Bus (Sensors + Power):</span>
            <span className="text-primary font-semibold">SDA: GPIO 21 · SCL: GPIO 22 (SCD30 + INA219)</span>
          </div>
          <div className="flex justify-between items-center bg-surface-subtle p-2.5 rounded-lg border border-border-subtle">
            <span className="font-bold text-forest-deep">Controllable MOSFET Gates:</span>
            <span className="text-primary font-semibold">PWM Light (16,17,18) · PWM Fans (19,23,26,27)</span>
          </div>
          <div className="flex justify-between items-center bg-surface-subtle p-2.5 rounded-lg border border-border-subtle">
            <span className="font-bold text-forest-deep">Hardware Safety Boundary:</span>
            <span className="text-alarm-amber font-semibold">12V DC Regulated Bus · Galvanic Isolation</span>
          </div>
        </div>
      </div>

      {/* Engineering Principles */}
      <div className="bg-surface-base border border-border-subtle rounded-2xl p-6 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-border-subtle pb-3 mb-4">
            <h3 className="text-sm font-bold text-forest-deep flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">verified</span>
              ACADEMIC & ENGINEERING PRINCIPLES
            </h3>
            <span className="text-xs font-telemetry-mono text-outline">NIT Tiruchirappalli</span>
          </div>
          <div className="space-y-3 text-xs text-on-surface-variant font-body-sm leading-relaxed">
            <p>
              <strong className="text-forest-deep font-semibold">1. Not Energy Transfer:</strong> Energy is never magically moved from a lamp to a fan. Instead, throttling low-priority demand makes the permitted shared load budget available for essential air quality loads.
            </p>
            <p>
              <strong className="text-forest-deep font-semibold">2. Local-First Authority:</strong> The ESP32 cooperative state machine operates autonomously without internet connectivity or cloud latency dependencies.
            </p>
            <p>
              <strong className="text-forest-deep font-semibold">3. Measured Claims Only:</strong> Switching a switch off does not prove energy was conserved; the INA219 shunt resistor verifies actual voltage, current, and wattage deltas.
            </p>
          </div>
        </div>
        <div className="pt-4 mt-4 border-t border-border-subtle flex items-center justify-between text-xs font-telemetry-mono text-outline">
          <span>Project Team: NIT Tiruchirappalli</span>
          <span className="text-primary font-bold">F1.0 Working Model</span>
        </div>
      </div>
      </div>
    </section>
  );
}
