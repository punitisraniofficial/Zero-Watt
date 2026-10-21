import React, { useRef, useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import LabControlCards from './LabControlCards';

export default function LiveSimulator({
  zones,
  onToggleZone,
  onToggleZoneOccupancy,
  onDaylightChange,
  env,
  onCo2Change,
  onTempChange,
  onRhChange,
  power,
  onBudgetChange,
  systemMode,
  onSetSystemMode,
  currentDecision,
  isSerialConnected,
  activeStep,
  onRunGuidedStep,
  isRunningDemo,
  onStartAutoDemo,
  onStopAutoDemo,
  onResetExhibition,
  presenterScript,
  manualLoads,
  onManualLoadChange
}) {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleReload = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      iframeRef.current.src = '/smart-office-simulator.html';
    }
  };

  const handleEnterFullScreen = async () => {
    setIsFullScreen(true);
    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch (e) {
      // Fallback to CSS overlay if native requestFullscreen is denied
      console.log('Fullscreen fallback to overlay:', e);
    }
  };

  const handleExitFullScreen = async () => {
    setIsFullScreen(false);
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (e) {
      console.log('Exit fullscreen error:', e);
    }
  };

  // Sync bridge when iframe sends fullscreen requests
  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data && typeof e.data === 'object') {
        if (e.data.type === 'ZEROWATT_REQUEST_FULLSCREEN') {
          handleEnterFullScreen();
        } else if (e.data.type === 'ZEROWATT_EXIT_FULLSCREEN') {
          handleExitFullScreen();
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullScreen) {
        handleExitFullScreen();
      }
    };
    const handleFsChange = () => {
      if (!document.fullscreenElement && isFullScreen) {
        setIsFullScreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFsChange);
    };
  }, [isFullScreen]);

  // Lock body scroll when in fullscreen overlay
  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullScreen]);

  return (
    <ScrollReveal animation="fade-in" threshold={0.06}>
      <section className="space-y-6" id="live-simulator">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border-subtle pb-4">
        <div>
          <div className="text-xs font-telemetry-mono text-primary font-bold tracking-widest uppercase">
            05 / LIVE SYSTEM
          </div>
          <h2 className="text-2xl sm:text-3xl font-headline-md text-forest-deep font-bold mt-1">
            Command centre, not a mock-up.
          </h2>
        </div>
        <p className="text-sm font-body-sm text-on-surface-variant max-w-xl text-left sm:text-right">
          Real-time 3D spatial digital twin &amp; closed-loop energy simulator. Senses multi-zone occupancy, daylight, and HVAC ventilation load — continuously orchestrating power within strict capacity budgets.
        </p>
      </div>

      {/* Simulator Container */}
      <div
        ref={containerRef}
        className={
          isFullScreen
            ? "fixed inset-0 z-[9999] bg-[#F8FAFC] text-slate-800 overflow-y-auto m-0 p-0 border-0 flex flex-col"
            : "glass-surface border border-white/80 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col hover-lift transition-all duration-300"
        }
      >
        {/* Floating Controls Overlay (ONLY in Full Screen: sleek glassmorphic pill top right) */}
        {isFullScreen ? (
          <div className="fixed top-4 right-4 sm:right-6 z-50 flex items-center gap-2 sm:gap-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full border border-slate-200/90 shadow-lg font-telemetry-mono text-xs text-slate-700">
            <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="hidden sm:inline">LIVE 3D SIMULATION</span>
            </span>

            <span className="w-px h-4 bg-slate-200 hidden sm:inline"></span>

            <button
              type="button"
              onClick={handleReload}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-telemetry-mono font-medium rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition cursor-pointer"
              title="Reset Simulator to Initial State"
            >
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={handleExitFullScreen}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-telemetry-mono font-bold rounded-full bg-red-600 hover:bg-red-700 text-white transition shadow-sm cursor-pointer"
              title="Exit Full Screen (or press Esc)"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Exit Full Screen (Esc)</span>
            </button>
          </div>
        ) : (
          /* Normal Inline Toolbar */
          <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 bg-surface-subtle border-b border-border-subtle gap-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-telemetry-mono font-semibold bg-secondary-container text-primary">
                <span className="w-2 h-2 rounded-full bg-telemetry-pulse animate-pulse"></span>
                LIVE WEBGL SIMULATOR
              </span>
              <span className="hidden sm:inline-block text-xs font-telemetry-mono text-on-surface-variant">
                SMART MANAGEMENT SYSTEM 3D DIGITAL TWIN
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-telemetry-mono font-medium rounded-lg border border-border-subtle bg-surface-base hover:bg-surface-muted text-forest-deep transition-colors shadow-2xs cursor-pointer"
                title="Reset Simulator to Initial State"
              >
                <svg className="w-3.5 h-3.5 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset
              </button>
            </div>
          </div>
        )}

        {/* Embedded 3D Simulation Viewport
            - In Full Screen: Exactly 100vh (first screen), NO black borders, fills viewport
            - In Default Mode: 840px / 920px / 980px height
        */}
        <div
          className={
            isFullScreen
              ? "relative w-full h-screen min-h-screen border-0 m-0 p-0 shrink-0 bg-[#F8FAFC]"
              : "relative w-full bg-surface-base"
          }
        >
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#F8FAFC]/90 backdrop-blur-xs">
              <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="mt-3 text-xs font-telemetry-mono text-slate-600 font-medium">
                Loading 3D Smart Office Simulator...
              </span>
            </div>
          )}
          <iframe
            ref={iframeRef}
            src="/smart-office-simulator.html"
            title="ZeroWatt Smart Office Live Simulator"
            className={
              isFullScreen
                ? "w-full h-full border-0 block bg-[#F8FAFC]"
                : "w-full h-[500px] sm:h-[660px] lg:h-[740px] border-0 block bg-surface-base"
            }
            loading="eager"
            onLoad={() => {
              setIsLoading(false);
              // Send initial state sync to iframe
              if (iframeRef.current?.contentWindow) {
                iframeRef.current.contentWindow.postMessage({
                  type: 'ZEROWATT_SET_ENV',
                  co2: env?.co2,
                  temp: env?.temp,
                  rh: env?.rh
                }, '*');
              }
            }}
          />

          {/* Floating hint to scroll down for controls in Full Screen mode */}
          {isFullScreen && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-md text-xs font-telemetry-mono text-slate-700 animate-bounce">
              <span>Scroll down for interactive controls &amp; options</span>
              <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          )}
        </div>

        {/* FULLSCREEN CONTROLS: Placed BELOW the 100vh 3D Model Viewport
            - Looks like a native, integral part of the simulation (pure #F8FAFC background, white cards)
        */}
        {isFullScreen && (
          <div className="w-full bg-[#F8FAFC] border-t border-slate-200 py-10 px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                <div>
                  <span className="text-xs font-telemetry-mono text-primary font-bold uppercase tracking-wider">
                    FULLSCREEN SIMULATION CONTROLS &amp; OPTIONS
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-forest-deep font-normal mt-1">
                    Spatial, Environmental, Guided &amp; Manual Options
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-body-sm mt-1">
                    All parameters operate in real-time closed-loop synchronization with the 3D digital twin above.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="px-3 py-1 rounded-full text-xs font-telemetry-mono font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    ● REAL-TIME SYNC ACTIVE
                  </span>
                  <button
                    type="button"
                    onClick={handleExitFullScreen}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold transition shadow-sm cursor-pointer flex items-center gap-2"
                  >
                    <span>✕ Exit Full Screen</span>
                  </button>
                </div>
              </div>

              {/* Render the 4 interactive control cards */}
              <LabControlCards
                zones={zones}
                onToggleZoneOccupancy={onToggleZoneOccupancy}
                onDaylightChange={onDaylightChange}
                env={env}
                onCo2Change={onCo2Change}
                onTempChange={onTempChange}
                onRhChange={onRhChange}
                activeStep={activeStep}
                onRunGuidedStep={onRunGuidedStep}
                isRunningDemo={isRunningDemo}
                onStartAutoDemo={onStartAutoDemo}
                onStopAutoDemo={onStopAutoDemo}
                onResetExhibition={onResetExhibition}
                presenterScript={presenterScript}
                manualLoads={manualLoads}
                onManualLoadChange={onManualLoadChange}
                systemMode={systemMode}
              />

              {/* Bottom footer bar with exit button */}
              <div className="pt-6 pb-4 flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 text-xs text-slate-500 font-telemetry-mono gap-3">
                <span>ZeroWatt Smart Management System &middot; Closed-Loop Spatial Simulation</span>
                <button
                  type="button"
                  onClick={handleExitFullScreen}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold transition shadow-sm cursor-pointer flex items-center gap-2"
                >
                  <span>✕ Exit Full Screen</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DEFAULT VIEW ONLY: Simulator Interaction Guide Footer (Hidden in Full Screen) */}
        {!isFullScreen && (
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
        )}
      </div>
    </section>
  </ScrollReveal>
  );
}
