import React from 'react';
import LabControlCards from './LabControlCards';

export default function InteractiveSystemLab({
  zones,
  onToggleZoneOccupancy,
  onDaylightChange,
  env,
  onCo2Change,
  onTempChange,
  onRhChange,
  activeStep,
  onRunGuidedStep,
  isRunningDemo,
  onStartAutoDemo,
  onStopAutoDemo,
  onResetExhibition,
  presenterScript,
  manualLoads,
  onManualLoadChange,
  systemMode,
  toast,
  onDismissToast,
  onScrollToSimulator
}) {
  return (
    <section className="space-y-6 pt-4" id="interactive-lab">
      {/* Toast Notification when Demo Step runs */}
      {toast && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 max-w-md bg-[#022C22]/95 backdrop-blur-xl text-white p-4 rounded-2xl shadow-2xl border border-primary/40 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-telemetry-pulse animate-pulse shrink-0"></span>
            <div>
              <div className="text-[10px] font-telemetry-mono text-primary font-bold uppercase tracking-wider">
                Demo Step 0{toast.step} Active
              </div>
              <div className="text-sm font-semibold text-white leading-snug">
                {toast.title}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onScrollToSimulator}
              className="px-3 py-1.5 rounded-xl bg-primary hover:bg-emerald-400 text-forest-deep text-xs font-bold font-telemetry-mono flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            >
              <span>View simulation</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
            <button
              type="button"
              onClick={onDismissToast}
              className="text-white/60 hover:text-white p-1 cursor-pointer"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-2">
        <div>
          <div className="text-xs font-telemetry-mono text-primary font-bold tracking-widest uppercase">
            05.5 / INTERACTIVE SYSTEM LAB
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-forest-deep tracking-tight font-normal leading-tight mt-1">
            Touch every input.<br />
            <span className="italic font-serif">Watch every decision.</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-body-sm text-on-surface-variant max-w-xl leading-relaxed lg:text-right">
          This lab is deliberately separated from measured evidence. In <strong className="text-forest-deep uppercase font-semibold">Simulation Mode</strong> you can change occupancy, daylight, CO₂, temperature, humidity and load budget to understand the control logic. When real hardware is connected, sensor controls become read-only and the RPi4 remains the authority.
        </p>
      </div>

      {/* Context Notice Strips (Why this section exists & Simulation != Measurement) */}
      <div className="space-y-2.5">
        <div className="bg-[#FAF8F5] border border-[#EFE5D7] rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs">
          <span className="font-telemetry-mono font-bold text-amber-800 tracking-wider uppercase text-[11px] shrink-0">
            WHY THIS SECTION EXISTS
          </span>
          <span className="text-slate-600">
            This is the safe rehearsal laboratory. Change inputs deliberately, see the rule-based decisions and practice the demonstration without confusing simulated values with measured results.
          </span>
        </div>

        <div className="bg-[#FAF8F5] border border-[#EFE5D7] rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs">
          <span className="font-telemetry-mono font-bold text-amber-800 tracking-wider uppercase text-[11px] shrink-0">
            SIMULATION ≠ MEASUREMENT
          </span>
          <span className="text-slate-600">
            Use this section to explain logic and rehearse the demo. Do not present these generated values as experimental results.
          </span>
        </div>
      </div>

      {/* 2x2 Interactive Bento Grid */}
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
    </section>
  );
}
