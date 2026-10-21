import React from 'react';

export default function LabControlCards({
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
  systemMode
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
      {/* CARD 1: SPATIAL INPUTS (Occupancy + daylight) */}
      <div className="glass-surface border border-white/80 rounded-3xl p-6 sm:p-7 shadow-[0_4px_25px_-5px_rgba(2,44,34,0.05)] hover-lift flex flex-col justify-between transition-all duration-300">
        <div>
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle/60">
            <span className="text-[11px] font-telemetry-mono text-primary font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              SPATIAL INPUTS
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-forest-deep font-normal">
              Occupancy + daylight
            </h3>
          </div>

          <div className="space-y-4">
            {/* Zone 1 - Front */}
            <div className="bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white/80 shadow-2xs hover:border-emerald-500/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-forest-deep">Zone 1 - Front</span>
                <button
                  type="button"
                  onClick={() => onToggleZoneOccupancy && onToggleZoneOccupancy('z1')}
                  className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all tap-pop cursor-pointer active:scale-95 ${
                    zones.z1.occupied
                      ? 'bg-emerald-700 text-white shadow-xs ring-2 ring-emerald-500/30'
                      : 'bg-white/90 border border-slate-300 text-slate-600 hover:border-slate-400'
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
                onChange={(e) => onDaylightChange && onDaylightChange('z1', e.target.value)}
                className="amber-slider"
                style={{
                  background: `linear-gradient(to right, #E58B24 0%, #E58B24 ${zones.z1.daylight}%, #374151 ${zones.z1.daylight}%, #374151 100%)`
                }}
              />
            </div>

            {/* Zone 2 - Middle */}
            <div className="bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white/80 shadow-2xs hover:border-emerald-500/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-forest-deep">Zone 2 - Middle</span>
                <button
                  type="button"
                  onClick={() => onToggleZoneOccupancy && onToggleZoneOccupancy('z2')}
                  className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all tap-pop cursor-pointer active:scale-95 ${
                    zones.z2.occupied
                      ? 'bg-emerald-700 text-white shadow-xs ring-2 ring-emerald-500/30'
                      : 'bg-white/90 border border-slate-300 text-slate-600 hover:border-slate-400'
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
                onChange={(e) => onDaylightChange && onDaylightChange('z2', e.target.value)}
                className="amber-slider"
                style={{
                  background: `linear-gradient(to right, #E58B24 0%, #E58B24 ${zones.z2.daylight}%, #374151 ${zones.z2.daylight}%, #374151 100%)`
                }}
              />
            </div>

            {/* Zone 3 - Window side */}
            <div className="bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white/80 shadow-2xs hover:border-emerald-500/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-forest-deep">Zone 3 - Window side</span>
                <button
                  type="button"
                  onClick={() => onToggleZoneOccupancy && onToggleZoneOccupancy('z3')}
                  className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all tap-pop cursor-pointer active:scale-95 ${
                    zones.z3.occupied
                      ? 'bg-emerald-700 text-white shadow-xs ring-2 ring-emerald-500/30'
                      : 'bg-white/90 border border-slate-300 text-slate-600 hover:border-slate-400'
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
                onChange={(e) => onDaylightChange && onDaylightChange('z3', e.target.value)}
                className="amber-slider"
                style={{
                  background: `linear-gradient(to right, #E58B24 0%, #E58B24 ${zones.z3.daylight}%, #374151 ${zones.z3.daylight}%, #374151 100%)`
                }}
              />
            </div>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 font-body-sm mt-5 pt-3 border-t border-border-subtle/60">
          The LDR values are normalized relative brightness, not precision lux. Each zone is calibrated separately.
        </p>
      </div>

      {/* CARD 2: ENVIRONMENTAL INPUT (Room-level demand) */}
      <div className="glass-surface border border-white/80 rounded-3xl p-6 sm:p-7 shadow-[0_4px_25px_-5px_rgba(2,44,34,0.05)] hover-lift flex flex-col justify-between transition-all duration-300">
        <div>
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle/60">
            <span className="text-[11px] font-telemetry-mono text-primary font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
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
                onChange={(e) => onCo2Change && onCo2Change(e.target.value)}
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
                onChange={(e) => onTempChange && onTempChange(e.target.value)}
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
                onChange={(e) => onRhChange && onRhChange(e.target.value)}
                className="amber-slider"
                style={{
                  background: `linear-gradient(to right, #E58B24 0%, #E58B24 ${((env.rh - 20) / 70) * 100}%, #374151 ${((env.rh - 20) / 70) * 100}%, #374151 100%)`
                }}
              />
            </div>

            {/* Control Bands Indicators */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className={`p-2.5 rounded-2xl text-center text-xs font-telemetry-mono font-medium transition ${
                env.co2 < 1000 
                  ? 'bg-emerald-500/15 text-emerald-800 border border-emerald-500/30 shadow-xs font-bold' 
                  : 'bg-white/50 text-slate-500 border border-border-subtle/60'
              }`}>
                &lt;1000 ppm · normal
              </div>
              <div className={`p-2.5 rounded-2xl text-center text-xs font-telemetry-mono font-medium transition ${
                env.co2 >= 1000 && env.co2 <= 1500 
                  ? 'bg-amber-500/15 text-amber-800 border border-amber-500/30 shadow-xs font-bold' 
                  : 'bg-white/50 text-slate-500 border border-border-subtle/60'
              }`}>
                1000–1500 · ventilate
              </div>
              <div className={`p-2.5 rounded-2xl text-center text-xs font-telemetry-mono font-medium transition ${
                env.co2 > 1500 
                  ? 'bg-rose-500/15 text-rose-800 border border-rose-500/30 shadow-xs font-bold' 
                  : 'bg-white/50 text-slate-500 border border-border-subtle/60'
              }`}>
                &gt;1500 · high priority
              </div>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 font-body-sm mt-5 pt-3 border-t border-border-subtle/60">
          These control bands are prototype demonstration setpoints. They are not presented as universal health or legal limits.
        </p>
      </div>

      {/* CARD 3: GUIDED DEMO (Faculty-facing sequence) */}
      <div className="glass-surface border border-white/80 rounded-3xl p-6 sm:p-7 shadow-[0_4px_25px_-5px_rgba(2,44,34,0.05)] hover-lift flex flex-col justify-between transition-all duration-300">
        <div>
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle/60">
            <span className="text-[11px] font-telemetry-mono text-primary font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
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
                  onClick={() => onRunGuidedStep && onRunGuidedStep(st.num)}
                  className={`p-3 text-left border rounded-2xl transition-all duration-200 cursor-pointer relative tap-pop active:scale-95 ${
                    isActive
                      ? 'bg-emerald-50/80 border-primary shadow-xs ring-2 ring-primary/30'
                      : 'bg-white/60 hover:bg-white border-border-subtle/70 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-mono text-[10px] font-bold flex items-center justify-center mb-1.5 shadow-2xs">
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
              className={`px-5 py-2.5 rounded-full font-semibold text-xs font-telemetry-mono flex items-center gap-2 transition-all cursor-pointer shadow-xs tap-pop active:scale-95 ${
                isRunningDemo
                  ? 'bg-emerald-700 text-white animate-pulse'
                  : 'bg-emerald-700 hover:bg-forest-deep text-white shadow-emerald-900/20'
              }`}
            >
              <span>{isRunningDemo ? 'Running guided demo...' : 'Run guided demo'}</span>
              {isRunningDemo && <span className="w-2 h-2 rounded-full bg-telemetry-pulse animate-ping"></span>}
            </button>

            <button
              type="button"
              onClick={onStopAutoDemo}
              className="px-5 py-2.5 rounded-full border border-border-subtle bg-white/90 hover:bg-white text-slate-700 font-semibold text-xs font-telemetry-mono transition-all tap-pop active:scale-95 cursor-pointer shadow-2xs"
            >
              Stop
            </button>

            <button
              type="button"
              onClick={onResetExhibition}
              className="px-5 py-2.5 rounded-full border border-border-subtle bg-white/90 hover:bg-white text-slate-700 font-semibold text-xs font-telemetry-mono transition-all tap-pop active:scale-95 cursor-pointer shadow-2xs"
            >
              Reset exhibition
            </button>
          </div>
        </div>

        {/* Presenter Line Box */}
        <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-2xl p-4 shadow-2xs backdrop-blur-xs">
          <span className="text-[10px] font-telemetry-mono text-primary font-bold uppercase tracking-wider block mb-1">
            PRESENTER LINE
          </span>
          <p className="text-xs sm:text-sm font-serif text-forest-deep leading-relaxed">
            {presenterScript}
          </p>
        </div>
      </div>

      {/* CARD 4: MANUAL SERVICE (Explicit, logged intervention) */}
      <div className="glass-surface border border-white/80 rounded-3xl p-6 sm:p-7 shadow-[0_4px_25px_-5px_rgba(2,44,34,0.05)] hover-lift flex flex-col justify-between transition-all duration-300">
        <div>
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle/60">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-telemetry-mono text-primary font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                MANUAL SERVICE
              </span>
              {systemMode === 'MANUAL' && (
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-telemetry-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
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
                  onChange={(e) => onManualLoadChange && onManualLoadChange('l1', e.target.value)}
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
                  onChange={(e) => onManualLoadChange && onManualLoadChange('l2', e.target.value)}
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
                  onChange={(e) => onManualLoadChange && onManualLoadChange('l3', e.target.value)}
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
                  onChange={(e) => onManualLoadChange && onManualLoadChange('f1', e.target.value)}
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
                  onChange={(e) => onManualLoadChange && onManualLoadChange('f2', e.target.value)}
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
                  onChange={(e) => onManualLoadChange && onManualLoadChange('f3', e.target.value)}
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
                onChange={(e) => onManualLoadChange && onManualLoadChange('vent', e.target.value)}
                className="amber-slider"
                style={{
                  background: `linear-gradient(to right, #E58B24 0%, #E58B24 ${manualLoads.vent}%, #374151 ${manualLoads.vent}%, #374151 100%)`
                }}
              />
            </div>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 font-body-sm mt-5 pt-3 border-t border-border-subtle/60">
          Touching any slider automatically activates manual service mode and sends hardware PWM &amp; damper commands directly.
        </p>
      </div>
    </div>
  );
}
