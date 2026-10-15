import React, { useRef, useState } from 'react';

export default function LiveSimulator() {
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleReload = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      iframeRef.current.src = '/smart-office-simulator.html';
    }
  };

  return (
    <section className="space-y-6" id="live-simulator">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border-subtle pb-4">
        <div>
          <div className="text-xs font-telemetry-mono text-primary font-bold tracking-widest uppercase">
            03 / LIVE SYSTEM
          </div>
          <h2 className="text-2xl sm:text-3xl font-headline-md text-forest-deep font-bold mt-1">
            Command centre, not a mock-up.
          </h2>
        </div>
        <p className="text-sm font-body-sm text-on-surface-variant max-w-xl text-left sm:text-right">
          Real-time 3D spatial digital twin &amp; closed-loop energy simulator. Senses multi-zone occupancy, daylight, and HVAC ventilation load — continuously orchestrating power within strict capacity budgets.
        </p>
      </div>

      {/* Simulator Card Container */}
      <div className="bg-surface-base border border-border-subtle rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Top Control & Status Toolbar */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 bg-surface-subtle border-b border-border-subtle gap-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-telemetry-mono font-semibold bg-secondary-container text-primary">
              <span className="w-2 h-2 rounded-full bg-telemetry-pulse animate-pulse"></span>
              LIVE WEBGL SIMULATOR
            </span>
            <span className="hidden sm:inline-block text-xs font-telemetry-mono text-on-surface-variant">
              SMART OFFICE 3D DIGITAL TWIN
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-telemetry-mono font-medium rounded-lg border border-border-subtle bg-surface-base hover:bg-surface-muted text-forest-deep transition-colors shadow-2xs"
              title="Reset Simulator to Initial State"
            >
              <svg className="w-3.5 h-3.5 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
            <a
              href="/smart-office-simulator.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-telemetry-mono font-medium rounded-lg bg-primary text-white hover:bg-forest-deep transition-colors shadow-2xs"
              title="Open simulator in standalone tab / full screen"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Full Screen</span>
            </a>
          </div>
        </div>

        {/* Embedded Iframe */}
        <div className="relative w-full bg-surface-base">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-surface-base/90 backdrop-blur-xs">
              <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="mt-3 text-xs font-telemetry-mono text-on-surface-variant font-medium">
                Loading 3D Smart Office Simulator...
              </span>
            </div>
          )}
          <iframe
            ref={iframeRef}
            src="/smart-office-simulator.html"
            title="ZeroWatt Smart Office Live Simulator"
            className="w-full h-[840px] sm:h-[920px] lg:h-[980px] border-0 block bg-surface-base"
            loading="eager"
            onLoad={() => setIsLoading(false)}
          />
        </div>

        {/* Simulator Interaction Guide Footer */}
        <div className="px-4 sm:px-6 py-3 bg-surface-subtle border-t border-border-subtle grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-body-sm text-on-surface-variant">
          <div className="flex items-start gap-2">
            <span className="font-bold text-primary font-telemetry-mono">01.</span>
            <span><strong>3D Orbit &amp; Zoom:</strong> Drag inside the viewport to rotate; scroll to zoom in/out.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-primary font-telemetry-mono">02.</span>
            <span><strong>People Slider:</strong> Move 0–12 headcount to trigger occupancy, daylight &amp; CO₂ kinetics.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-primary font-telemetry-mono">03.</span>
            <span><strong>HVAC &amp; Dampers:</strong> Watch supply air, dampers, and ventilation adapt dynamically.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-primary font-telemetry-mono">04.</span>
            <span><strong>System Overrides:</strong> Switch Auto, Force-on, Master-off, or Manual mode live.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
