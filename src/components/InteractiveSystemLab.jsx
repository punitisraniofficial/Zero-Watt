import React from 'react';

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
  const steps = [
    { num: 1, title: 'Empty room' },
    { num: 2, title: 'Zone 1 enters' },
    { num: 3, title: 'Daylight rises' },
    { num: 4, title: 'CO₂ rises' },
    { num: 5, title: 'Budget drops' },
    { num: 6, title: 'Show measured power' },
    { num: 7, title: 'Override' },
    { num: 8, title: 'Limitation + future' }
  ];

  return (
    <section className="space-y-6 pt-4" id="interactive-lab">
      {/* Toast Notification when Demo Step runs */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#022C22] text-white p-4 rounded-2xl shadow-2xl border border-primary/40 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
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
            03.5 / INTERACTIVE SYSTEM LAB
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-forest-deep tracking-tight font-normal leading-tight mt-1">
            Touch every input.<br />
            <span className="italic font-serif">Watch every decision.</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-body-sm text-on-surface-variant max-w-xl leading-relaxed lg:text-right">
          This lab is deliberately separated from measured evidence. In <strong className="text-forest-deep uppercase font-semibold">Simulation Mode</strong> you can change occupancy, daylight, CO₂, temperature, humidity and load budget to understand the control logic. When real hardware is connected, sensor controls become read-only and the ESP32 remains the authority.
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        
        {/* CARD 1: SPATIAL INPUTS (Occupancy + daylight) */}
        <div className="bg-surface-base border border-border-subtle rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
              <span className="text-[11px] font-telemetry-mono text-primary font-bold uppercase tracking-wider">
                SPATIAL INPUTS
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-forest-deep font-normal">
                Occupancy + daylight
              </h3>
            </div>

            <div className="space-y-5">
              {/* Zone 1 - Front */}
              <div className="bg-surface-subtle p-3.5 rounded-xl border border-border-subtle">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-forest-deep">Zone 1 - Front</span>
                  <button
                    type="button"
                    onClick={() => onToggleZoneOccupancy('z1')}
                    className={`px-3 py-0.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                      zones.z1.occupied
                        ? 'bg-[#0f5132] text-white shadow-xs'
                        : 'bg-white border border-slate-300 text-slate-500 hover:border-slate-400'
                    }`}
                  >
                    {zones.z1.occupied ? 'Occupied' : 'Empty'}
                  </button>
                </div>
                <div className="flex justify-between text-xs text-on-surface-variant mb-1.5 font-telemetry-mono">
                  <span>Normalized daylight</span>
                  <span className="font-semibold text-forest-deep">{zones.z1.daylight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={zones.z1.daylight}
                  onChange={(e) => onDaylightChange('z1', e.target.value)}
                  className="amber-slider"
                  style={{
                    background: `linear-gradient(to right, #E58B24 0%, #E58B24 ${zones.z1.daylight}%, #374151 ${zones.z1.daylight}%, #374151 100%)`
                  }}
                />
              </div>

              {/* Zone 2 - Middle */}
              <div className="bg-surface-subtle p-3.5 rounded-xl border border-border-subtle">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-forest-deep">Zone 2 - Middle</span>
                  <button
                    type="button"
                    onClick={() => onToggleZoneOccupancy('z2')}
                    className={`px-3 py-0.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                      zones.z2.occupied
                        ? 'bg-[#0f5132] text-white shadow-xs'
                        : 'bg-white border border-slate-300 text-slate-500 hover:border-slate-400'
                    }`}
                  >
                    {zones.z2.occupied ? 'Occupied' : 'Empty'}
                  </button>
                </div>
                <div className="flex justify-between text-xs text-on-surface-variant mb-1.5 font-telemetry-mono">
                  <span>Normalized daylight</span>
                  <span className="font-semibold text-forest-deep">{zones.z2.daylight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={zones.z2.daylight}
                  onChange={(e) => onDaylightChange('z2', e.target.value)}
                  className="amber-slider"
                  style={{
                    background: `linear-gradient(to right, #E58B24 0%, #E58B24 ${zones.z2.daylight}%, #374151 ${zones.z2.daylight}%, #374151 100%)`
                  }}
                />
              </div>

              {/* Zone 3 - Window side */}
              <div className="bg-surface-subtle p-3.5 rounded-xl border border-border-subtle">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-forest-deep">Zone 3 - Window side</span>
                  <button
                    type="button"
                    onClick={() => onToggleZoneOccupancy('z3')}
                    className={`px-3 py-0.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                      zones.z3.occupied
                        ? 'bg-[#0f5132] text-white shadow-xs'
                        : 'bg-white border border-slate-300 text-slate-500 hover:border-slate-400'
                    }`}
                  >
                    {zones.z3.occupied ? 'Occupied' : 'Empty'}
                  </button>
                </div>
                <div className="flex justify-between text-xs text-on-surface-variant mb-1.5 font-telemetry-mono">
                  <span>Normalized daylight</span>
                  <span className="font-semibold text-forest-deep">{zones.z3.daylight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={zones.z3.daylight}
                  onChange={(e) => onDaylightChange('z3', e.target.value)}
                  className="amber-slider"
                  style={{
                    background: `linear-gradient(to right, #E58B24 0%, #E58B24 ${zones.z3.daylight}%, #374151 ${zones.z3.daylight}%, #374151 100%)`
                  }}
                />
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 font-body-sm mt-5 pt-3 border-t border-border-subtle">
            The LDR values are normalized relative brightness, not precision lux. Each zone is calibrated separately.
          </p>
        </div>

        {/* CARD 2: ENVIRONMENTAL INPUT (Room-level demand) */}
        <div className="bg-surface-base border border-border-subtle rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
              <span className="text-[11px] font-telemetry-mono text-primary font-bold uppercase tracking-wider">
                ENVIRONMENTAL INPUT
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-forest-deep font-normal">
                Room-level demand
              </h3>
            </div>

            <div className="space-y-5">
              {/* CO2 Slider */}
              <div>
                <div className="flex justify-between text-xs font-telemetry-mono mb-1.5">
                  <span className="text-slate-600 font-medium">CO₂</span>
                  <span className="font-bold text-forest-deep">{Math.round(env.co2)} ppm</span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="2000"
                  step="10"
                  value={env.co2}
                  onChange={(e) => onCo2Change(e.target.value)}
                  className="amber-slider"
                  style={{
                    background: `linear-gradient(to right, #E58B24 0%, #E58B24 ${((env.co2 - 400) / 1600) * 100}%, #374151 ${((env.co2 - 400) / 1600) * 100}%, #374151 100%)`
                  }}
                />
              </div>

              {/* Temperature Slider */}
              <div>
                <div className="flex justify-between text-xs font-telemetry-mono mb-1.5">
                  <span className="text-slate-600 font-medium">Temperature</span>
                  <span className="font-bold text-forest-deep">{env.temp.toFixed(1)} °C</span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="36"
                  step="0.1"
                  value={env.temp}
                  onChange={(e) => onTempChange(e.target.value)}
                  className="amber-slider"
                  style={{
                    background: `linear-gradient(to right, #E58B24 0%, #E58B24 ${((env.temp - 18) / 18) * 100}%, #374151 ${((env.temp - 18) / 18) * 100}%, #374151 100%)`
                  }}
                />
              </div>

              {/* Relative Humidity Slider */}
              <div>
                <div className="flex justify-between text-xs font-telemetry-mono mb-1.5">
                  <span className="text-slate-600 font-medium">Relative humidity</span>
                  <span className="font-bold text-forest-deep">{Math.round(env.rh)}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="90"
                  step="1"
                  value={env.rh}
                  onChange={(e) => onRhChange(e.target.value)}
                  className="amber-slider"
                  style={{
                    background: `linear-gradient(to right, #E58B24 0%, #E58B24 ${((env.rh - 20) / 70) * 100}%, #374151 ${((env.rh - 20) / 70) * 100}%, #374151 100%)`
                  }}
                />
              </div>

              {/* Control Bands Indicators */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className={`p-2.5 rounded-xl text-center text-xs font-telemetry-mono font-medium transition ${
                  env.co2 < 1000 
                    ? 'bg-[#EBF7F0] text-[#065F46] border border-[#A7F3D0] shadow-2xs font-bold' 
                    : 'bg-surface-subtle text-slate-500 border border-border-subtle'
                }`}>
                  &lt;1000 ppm · normal
                </div>
                <div className={`p-2.5 rounded-xl text-center text-xs font-telemetry-mono font-medium transition ${
                  env.co2 >= 1000 && env.co2 <= 1500 
                    ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] shadow-2xs font-bold' 
                    : 'bg-surface-subtle text-slate-500 border border-border-subtle'
                }`}>
                  1000–1500 · ventilate
                </div>
                <div className={`p-2.5 rounded-xl text-center text-xs font-telemetry-mono font-medium transition ${
                  env.co2 > 1500 
                    ? 'bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA] shadow-2xs font-bold' 
                    : 'bg-surface-subtle text-slate-500 border border-border-subtle'
                }`}>
                  &gt;1500 · high priority
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 font-body-sm mt-5 pt-3 border-t border-border-subtle">
            These control bands are prototype demonstration setpoints. They are not presented as universal health or legal limits.
          </p>
        </div>

        {/* CARD 3: GUIDED DEMO (Faculty-facing sequence) */}
        <div className="bg-surface-base border border-border-subtle rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
              <span className="text-[11px] font-telemetry-mono text-primary font-bold uppercase tracking-wider">
                GUIDED DEMO
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-forest-deep font-normal">
                Faculty-facing sequence
              </h3>
            </div>

            {/* 8 Step Cards (4 cols x 2 rows) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
              {steps.map((st) => {
                const isActive = activeStep === st.num;
                return (
                  <button
                    key={st.num}
                    type="button"
                    onClick={() => onRunGuidedStep(st.num)}
                    className={`p-3 text-left border rounded-xl transition cursor-pointer relative ${
                      isActive
                        ? 'bg-[#F0FDF4] border-primary shadow-xs ring-1 ring-primary/40'
                        : 'bg-surface-subtle hover:bg-white border-border-subtle text-slate-700'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#FEF3C7] text-amber-900 font-mono text-[10px] font-bold flex items-center justify-center mb-1.5">
                      {st.num}
                    </div>
                    <span className={`text-xs font-medium block leading-tight ${isActive ? 'text-forest-deep font-bold' : 'text-slate-800'}`}>
                      {st.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Action Buttons: Run Guided Demo, Stop, Reset Exhibition */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <button
                type="button"
                onClick={onStartAutoDemo}
                className={`px-5 py-2.5 rounded-xl font-semibold text-xs font-telemetry-mono flex items-center gap-2 transition cursor-pointer shadow-xs ${
                  isRunningDemo
                    ? 'bg-[#155e4b] text-white animate-pulse'
                    : 'bg-[#155e4b] hover:bg-forest-deep text-white'
                }`}
              >
                <span>{isRunningDemo ? 'Running guided demo...' : 'Run guided demo'}</span>
                {isRunningDemo && <span className="w-2 h-2 rounded-full bg-telemetry-pulse animate-ping"></span>}
              </button>

              <button
                type="button"
                onClick={onStopAutoDemo}
                className="px-5 py-2.5 rounded-xl border border-border-subtle bg-white hover:bg-surface-subtle text-slate-700 font-semibold text-xs font-telemetry-mono transition cursor-pointer shadow-2xs"
              >
                Stop
              </button>

              <button
                type="button"
                onClick={onResetExhibition}
                className="px-5 py-2.5 rounded-xl border border-border-subtle bg-white hover:bg-surface-subtle text-slate-700 font-semibold text-xs font-telemetry-mono transition cursor-pointer shadow-2xs"
              >
                Reset exhibition
              </button>
            </div>
          </div>

          {/* Presenter Line Box */}
          <div className="bg-[#FAFDF9] border border-[#C6EBD4] rounded-xl p-4">
            <span className="text-[10px] font-telemetry-mono text-primary font-bold uppercase tracking-wider block mb-1">
              PRESENTER LINE
            </span>
            <p className="text-xs sm:text-sm font-serif text-forest-deep leading-relaxed">
              {presenterScript}
            </p>
          </div>
        </div>

        {/* CARD 4: MANUAL SERVICE (Explicit, logged intervention) */}
        <div className="bg-surface-base border border-border-subtle rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-telemetry-mono text-primary font-bold uppercase tracking-wider">
                  MANUAL SERVICE
                </span>
                {systemMode === 'MANUAL' && (
                  <span className="px-2 py-0.5 rounded text-[9px] font-telemetry-mono font-bold bg-[#FEF3C7] text-amber-900 border border-amber-300">
                    MANUAL MODE ACTIVE
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-forest-deep font-normal">
                Explicit, logged intervention
              </h3>
            </div>

            <p className="text-xs font-body-sm text-slate-600 mb-5 leading-relaxed">
              Manual commands are meaningful only in <strong className="text-forest-deep font-semibold">MANUAL SERVICE</strong>. In the final firmware, the physical selector and safety rules must still have higher authority than the browser.
            </p>

            {/* Sliders Grid */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Light Z1 */}
                <div>
                  <div className="flex justify-between text-xs font-telemetry-mono mb-1">
                    <span className="text-slate-600">Light Z1</span>
                    <span className="font-bold text-forest-deep">{manualLoads.l1}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={manualLoads.l1}
                    onChange={(e) => onManualLoadChange('l1', e.target.value)}
                    className="amber-slider"
                    style={{
                      background: `linear-gradient(to right, #E58B24 0%, #E58B24 ${manualLoads.l1}%, #374151 ${manualLoads.l1}%, #374151 100%)`
                    }}
                  />
                </div>

                {/* Light Z2 */}
                <div>
                  <div className="flex justify-between text-xs font-telemetry-mono mb-1">
                    <span className="text-slate-600">Light Z2</span>
                    <span className="font-bold text-forest-deep">{manualLoads.l2}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={manualLoads.l2}
                    onChange={(e) => onManualLoadChange('l2', e.target.value)}
                    className="amber-slider"
                    style={{
                      background: `linear-gradient(to right, #E58B24 0%, #E58B24 ${manualLoads.l2}%, #374151 ${manualLoads.l2}%, #374151 100%)`
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Light Z3 */}
                <div>
                  <div className="flex justify-between text-xs font-telemetry-mono mb-1">
                    <span className="text-slate-600">Light Z3</span>
                    <span className="font-bold text-forest-deep">{manualLoads.l3}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={manualLoads.l3}
                    onChange={(e) => onManualLoadChange('l3', e.target.value)}
                    className="amber-slider"
                    style={{
                      background: `linear-gradient(to right, #E58B24 0%, #E58B24 ${manualLoads.l3}%, #374151 ${manualLoads.l3}%, #374151 100%)`
                    }}
                  />
                </div>

                {/* Fan Z1 */}
                <div>
                  <div className="flex justify-between text-xs font-telemetry-mono mb-1">
                    <span className="text-slate-600">Fan Z1</span>
                    <span className="font-bold text-forest-deep">{manualLoads.f1}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={manualLoads.f1}
                    onChange={(e) => onManualLoadChange('f1', e.target.value)}
                    className="amber-slider"
                    style={{
                      background: `linear-gradient(to right, #E58B24 0%, #E58B24 ${manualLoads.f1}%, #374151 ${manualLoads.f1}%, #374151 100%)`
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Fan Z2 */}
                <div>
                  <div className="flex justify-between text-xs font-telemetry-mono mb-1">
                    <span className="text-slate-600">Fan Z2</span>
                    <span className="font-bold text-forest-deep">{manualLoads.f2}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={manualLoads.f2}
                    onChange={(e) => onManualLoadChange('f2', e.target.value)}
                    className="amber-slider"
                    style={{
                      background: `linear-gradient(to right, #E58B24 0%, #E58B24 ${manualLoads.f2}%, #374151 ${manualLoads.f2}%, #374151 100%)`
                    }}
                  />
                </div>

                {/* Fan Z3 */}
                <div>
                  <div className="flex justify-between text-xs font-telemetry-mono mb-1">
                    <span className="text-slate-600">Fan Z3</span>
                    <span className="font-bold text-forest-deep">{manualLoads.f3}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={manualLoads.f3}
                    onChange={(e) => onManualLoadChange('f3', e.target.value)}
                    className="amber-slider"
                    style={{
                      background: `linear-gradient(to right, #E58B24 0%, #E58B24 ${manualLoads.f3}%, #374151 ${manualLoads.f3}%, #374151 100%)`
                    }}
                  />
                </div>
              </div>

              {/* Ventilation */}
              <div>
                <div className="flex justify-between text-xs font-telemetry-mono mb-1">
                  <span className="text-slate-600">Ventilation (Damper)</span>
                  <span className="font-bold text-forest-deep">{manualLoads.vent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={manualLoads.vent}
                  onChange={(e) => onManualLoadChange('vent', e.target.value)}
                  className="amber-slider"
                  style={{
                    background: `linear-gradient(to right, #E58B24 0%, #E58B24 ${manualLoads.vent}%, #374151 ${manualLoads.vent}%, #374151 100%)`
                  }}
                />
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 font-body-sm mt-5 pt-3 border-t border-border-subtle">
            Touching any slider automatically activates manual service mode and sends hardware PWM &amp; damper commands directly.
          </p>
        </div>

      </div>
    </section>
  );
}
