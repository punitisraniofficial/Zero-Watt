import React, { useState, useEffect } from 'react';

export default function HowZeroWattWorksSection() {
  const [activeStep, setActiveStep] = useState(1);
  const [hoveredStep, setHoveredStep] = useState(null);

  // Auto-progress smoothly through steps 1 -> 6 -> 1 every 2.8 seconds without getting stuck
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(prev => (prev % 6) + 1);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Use hovered step if mouse is hovering, otherwise auto-progressing active step
  const currentStep = hoveredStep !== null ? hoveredStep : activeStep;

  const steps = [
    {
      step: 1,
      formatLabel: 'STEP 1 ---->',
      title: 'Camera Detection',
      badge: 'Edge Perception',
      hardware: 'Wide-FOV Edge Camera',
      desc: 'Senses room presence directly at the edge with zero external cloud video streaming.',
      io: 'Live Field of View → Occupancy State'
    },
    {
      step: 2,
      formatLabel: 'STEP 2 ---->',
      title: 'AI Processing',
      badge: 'Local Neural Inference',
      hardware: 'RPi4 + OpenCV + YOLO11n',
      desc: 'Executes lightweight quantized YOLO11n neural network inference in under 50ms locally.',
      io: 'Local Video Frames → Person Bounding Boxes'
    },
    {
      step: 3,
      formatLabel: 'STEP 3 ---->',
      title: 'Decision Engine',
      badge: 'Deterministic Arbiter',
      hardware: 'Python Rules Engine',
      desc: 'Evaluates sustained room vacancy against safety thresholds (e.g. 60s) before shutoff.',
      io: 'Confidence + Inactivity → Decision Command'
    },
    {
      step: 4,
      formatLabel: 'STEP 4 ---->',
      title: 'Electrical Control',
      badge: 'Physical Gating',
      hardware: 'RPi4 GPIO + Isolated Relays',
      desc: 'Dispatches isolated low-voltage signals to zero-crossing solid-state contactors.',
      io: 'GPIO Low-Voltage Signal → AC Contact Interruption'
    },
    {
      step: 5,
      formatLabel: 'STEP 5 ---->',
      title: 'Energy Verification',
      badge: 'Shunt Telemetry',
      hardware: 'Calibrated INA219 Shunt',
      desc: 'Directly measures branch amperage, computing true instantaneous Watts and saved Wh.',
      io: 'Circuit Shunt Current → Verified Watts & kWh'
    },
    {
      step: 6,
      formatLabel: 'STEP 6',
      title: 'Monitoring Dashboard',
      badge: 'Audit Telemetry',
      hardware: 'Web Telemetry & Modbus Bus',
      desc: 'Streams real-time digital twin maps, power curves, and audit-ready timestamps to operators.',
      io: 'Hardware Stream → Central Facility Twin'
    }
  ];

  return (
    <section className="scroll-mt-20 bg-white border border-border-subtle rounded-3xl p-5 sm:p-8 lg:p-9 shadow-sm space-y-6 animate-slide-up" id="how-it-works">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-border-subtle pb-4 animate-fade-in">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-subtle border border-border-subtle text-primary text-xs font-telemetry-mono font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>02 / HOW ZEROWATT WORKS</span>
            <span className="text-outline/40">·</span>
            <span className="text-outline font-normal text-[11px]">AUTOMATED SYSTEM FLOW</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-forest-deep tracking-tight font-normal leading-tight">
            How ZeroWatt Works
          </h2>

          <p className="text-sm sm:text-base font-body-md text-on-surface-variant max-w-2xl">
            A deterministic 6-stage pipeline connecting optical edge sensing, local neural inference, physical circuit gating, and empirical shunt verification.
          </p>
        </div>

        {/* Live Auto-Progress Indicator */}
        <div className="flex items-center gap-3 text-xs font-telemetry-mono text-on-surface-variant bg-surface-subtle px-4 py-2.5 rounded-2xl border border-border-subtle shrink-0">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>
            Active Stage: <strong className="text-emerald-700">Step {currentStep} of 6</strong> · Auto-Progressing
          </span>
        </div>
      </div>

      {/* Schematic Pipeline Strip (STEP 1 ----> STEP 2 ----> ...) */}
      <div className="overflow-x-auto pb-2 scrollbar-thin animate-pop delay-100">
        <div className="flex items-center min-w-[780px] lg:min-w-full justify-between gap-1.5 p-3 bg-surface-subtle border border-border-subtle rounded-2xl">
          {steps.map((st, idx) => {
            const isCurrent = currentStep === st.step;
            return (
              <React.Fragment key={st.step}>
                <div
                  onMouseEnter={() => setHoveredStep(st.step)}
                  onMouseLeave={() => setHoveredStep(null)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-telemetry-mono font-bold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    isCurrent
                      ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/50 scale-[1.03]'
                      : 'bg-white hover:bg-emerald-50/60 text-slate-700 border border-border-subtle hover:border-emerald-300'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    isCurrent ? 'bg-white text-emerald-800 font-black' : 'bg-slate-100 text-slate-600'
                  }`}>
                    0{st.step}
                  </span>
                  <span>{st.title}</span>
                </div>

                {idx < steps.length - 1 && (
                  <div className={`flex items-center font-telemetry-mono text-xs font-black select-none shrink-0 px-1 tracking-tighter transition-colors duration-300 ${
                    currentStep > st.step ? 'text-emerald-600' : 'text-slate-300'
                  }`}>
                    <span>----&gt;</span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Schematic 6-Card Grid with Hover + Green Highlight & Smooth Auto-Progression */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {steps.map((st) => {
          const isCurrent = currentStep === st.step;
          return (
            <div
              key={st.step}
              onMouseEnter={() => setHoveredStep(st.step)}
              onMouseLeave={() => setHoveredStep(null)}
              className={`relative rounded-2xl p-4 sm:p-5 transition-all duration-300 cursor-pointer border flex flex-col justify-between overflow-hidden ${
                isCurrent
                  ? 'bg-emerald-50/40 border-emerald-500 shadow-lg ring-2 ring-emerald-500/30 scale-[1.02]'
                  : 'bg-white border-border-subtle hover:border-emerald-400 hover:shadow-md hover:bg-emerald-50/20'
              }`}
            >
              {/* Top Animated Progress Line (Fills when step is active) */}
              {isCurrent && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500 animate-pulse"></div>
              )}

              <div className="space-y-3.5">
                {/* Header: Schematic format like "STEP 1 ---->" */}
                <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                  <div className={`inline-flex items-center gap-1.5 font-telemetry-mono text-xs font-bold tracking-wider transition-colors ${
                    isCurrent ? 'text-emerald-700' : 'text-primary'
                  }`}>
                    <span>{st.formatLabel}</span>
                  </div>
                  <span className={`text-[10px] font-telemetry-mono px-2 py-0.5 rounded border transition-colors ${
                    isCurrent 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold' 
                      : 'bg-surface-subtle text-on-surface-variant border-border-subtle'
                  }`}>
                    {st.badge}
                  </span>
                </div>

                {/* Title & Hardware Tag */}
                <div>
                  <h3 className={`text-lg font-headline-sm font-bold transition-colors ${
                    isCurrent ? 'text-emerald-950' : 'text-forest-deep'
                  }`}>
                    {st.title}
                  </h3>
                  <div className="mt-1 text-xs font-telemetry-mono text-emerald-800 font-medium">
                    {st.hardware}
                  </div>
                </div>

                {/* Concise Summary (Less detailed, straight to the point) */}
                <p className="text-xs sm:text-sm font-body-sm text-slate-600 leading-relaxed">
                  {st.desc}
                </p>

                {/* Input / Output 1-Liner */}
                <div className="pt-2.5 border-t border-border-subtle/80 flex items-center gap-1.5 text-[11px] font-telemetry-mono">
                  <span className="text-emerald-600 font-bold">⚡</span>
                  <span className="text-slate-500 font-medium truncate">{st.io}</span>
                </div>
              </div>

              {/* Bottom Active Status Chip */}
              <div className="mt-4 pt-3 border-t border-border-subtle/80 flex items-center justify-between text-[11px] font-telemetry-mono">
                <span className={`flex items-center gap-1.5 font-semibold ${
                  isCurrent ? 'text-emerald-700' : 'text-slate-400'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    isCurrent ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'
                  }`}></span>
                  {isCurrent ? 'Active Pipeline Stage' : `Stage 0${st.step}`}
                </span>
                <span className="text-slate-400 text-[10px]">Deterministic</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Engineering Stance Note */}
      <div className="p-4 rounded-xl bg-surface-subtle border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-telemetry-mono text-on-surface-variant">
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 text-base">⚙️</span>
          <span>
            <strong>Deterministic Local Gating:</strong> Continuous cyclic loop operating locally on Raspberry Pi 4 edge hardware without cloud telemetry dependencies.
          </span>
        </div>
        <span className="text-forest-deep font-semibold shrink-0">
          Step 1 → Step 6 Closed Loop
        </span>
      </div>
    </section>
  );
}
