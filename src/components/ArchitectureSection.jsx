import React, { useRef, useState } from 'react';

export default function ArchitectureSection() {
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOccupied, setIsOccupied] = useState(true);

  const handleToggle = () => {
    const nextState = !isOccupied;
    setIsOccupied(nextState);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'TOGGLE_OCCUPANCY' }, '*');
    }
  };

  const handleReset = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      setIsOccupied(true);
      iframeRef.current.src = '/architecture.html';
    }
  };

  return (
    <section className="space-y-6 scroll-mt-20" id="architecture">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border-subtle pb-4">
        <div>
          <div className="text-xs font-telemetry-mono text-primary font-bold tracking-widest uppercase">
            05 / SYSTEM ARCHITECTURE
          </div>
          <h2 className="text-2xl sm:text-3xl font-headline-md text-forest-deep font-bold mt-1">
            Distributed Edge-to-Gateway Topology
          </h2>
        </div>
        <p className="text-sm font-body-sm text-on-surface-variant max-w-xl text-left sm:text-right">
          Autonomous gateway orchestration, multi-sensor environmental perception, industrial Modbus &amp; solar telemetry, and fail-safe relay actuation loops.
        </p>
      </div>

      {/* Simulator Container Card */}
      <div className="bg-surface-base border border-border-subtle rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Top Control Toolbar */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 bg-surface-subtle border-b border-border-subtle gap-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-telemetry-mono font-semibold bg-secondary-container text-primary">
              <span className="w-2 h-2 rounded-full bg-telemetry-pulse animate-pulse"></span>
              TOPOLOGY SIMULATOR
            </span>
            <span className="hidden sm:inline-block text-xs font-telemetry-mono text-on-surface-variant">
              CENTRAL BRAIN &amp; DISTRIBUTED PERIPHERAL NODES
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggle}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-telemetry-mono font-medium rounded-lg border transition-colors shadow-2xs ${
                isOccupied 
                  ? 'border-alarm-amber/50 bg-alarm-amber-subtle text-alarm-amber hover:bg-alarm-amber/20' 
                  : 'border-primary/40 bg-secondary-container text-primary hover:bg-secondary-container/80'
              }`}
              title="Toggle Occupied / Unoccupied state in simulation"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>{isOccupied ? 'Simulate: Room Empty' : 'Simulate: Person Enters'}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-telemetry-mono font-medium rounded-lg border border-border-subtle bg-surface-base hover:bg-surface-muted text-forest-deep transition-colors shadow-2xs"
              title="Reset Architecture Diagram"
            >
              <svg className="w-3.5 h-3.5 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Reset</span>
            </button>

            <a
              href="/architecture.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-telemetry-mono font-medium rounded-lg bg-primary text-white hover:bg-forest-deep transition-colors shadow-2xs"
              title="Open architecture simulation in standalone window"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Standalone</span>
            </a>
          </div>
        </div>

        {/* Embedded Simulation Iframe */}
        <div className="relative w-full bg-[#f9f8f6] flex justify-center items-center overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-surface-base/90 backdrop-blur-xs">
              <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="mt-3 text-xs font-telemetry-mono text-on-surface-variant font-medium">
                Loading Architecture Topology Simulation...
              </span>
            </div>
          )}
          <iframe
            ref={iframeRef}
            src="/architecture.html"
            title="ZeroWatt Architecture Topology Simulation"
            className="w-full h-[680px] sm:h-[740px] lg:h-[780px] border-0 block"
            loading="eager"
            onLoad={() => setIsLoading(false)}
          />
        </div>

        {/* Architectural Subsystems Legend & Principles */}
        <div className="p-6 bg-surface-subtle border-t border-border-subtle grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-surface-base border border-border-subtle shadow-2xs">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
              <h4 className="text-xs font-bold font-telemetry-mono text-forest-deep uppercase tracking-wider">
                Control Brain Gateway
              </h4>
            </div>
            <p className="text-xs font-body-sm text-on-surface-variant leading-relaxed">
              Raspberry Pi ZeroWatt gateway runs the central cooperative state machine, aggregating telemetry every 250ms with zero external cloud dependencies.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-base border border-border-subtle shadow-2xs">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#27ae60]"></span>
              <h4 className="text-xs font-bold font-telemetry-mono text-forest-deep uppercase tracking-wider">
                Edge Spatial Sensors
              </h4>
            </div>
            <p className="text-xs font-body-sm text-on-surface-variant leading-relaxed">
              Smart CV camera vision nodes paired with BME280 temperature &amp; PMS5003 particulate sensors feed spatial occupancy and ambient air quality data.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-base border border-border-subtle shadow-2xs">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e5a93d]"></span>
              <h4 className="text-xs font-bold font-telemetry-mono text-forest-deep uppercase tracking-wider">
                Grid &amp; Solar Telemetry
              </h4>
            </div>
            <p className="text-xs font-body-sm text-on-surface-variant leading-relaxed">
              3-Phase Modbus main utility meter and Solar RS485 converter stream bidirectional power flow, calculating net-zero energy conservation in real time.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-base border border-border-subtle shadow-2xs">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4a90e2]"></span>
              <h4 className="text-xs font-bold font-telemetry-mono text-forest-deep uppercase tracking-wider">
                Relay Gating &amp; PWM
              </h4>
            </div>
            <p className="text-xs font-body-sm text-on-surface-variant leading-relaxed">
              Isolated relays drive HVAC dynamic duty cycling, daylight-harvested PWM LED dimmers, and instantaneous fail-safe branch circuit cut-off.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
