import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function EvidenceEngine({
  powerHistory,
  eventLogs,
  onExportCsv
}) {
  // Generate SVG path strings from powerHistory array
  // We map history items (say 15 points) across SVG width 800 and height 120 (max power ~12W)
  const maxW = 12.0;
  const svgW = 800;
  const svgH = 120;
  const paddingY = 15;

  const getY = (w) => {
    const clamped = Math.max(0, Math.min(maxW, w));
    // inverted Y (0W -> bottom svgH - paddingY, maxW -> paddingY)
    return (svgH - paddingY) - (clamped / maxW) * (svgH - paddingY * 2);
  };

  const generatePath = (key) => {
    if (!powerHistory || powerHistory.length < 2) return '';
    const step = svgW / (powerHistory.length - 1);
    
    return powerHistory.reduce((acc, point, idx) => {
      const x = idx * step;
      const y = getY(point[key]);
      if (idx === 0) return `M ${x.toFixed(1)} ${y.toFixed(1)}`;
      
      // Smooth curve with cubic bezier control points
      const prevX = (idx - 1) * step;
      const prevY = getY(powerHistory[idx - 1][key]);
      const cp1X = prevX + step * 0.5;
      const cp1Y = prevY;
      const cp2X = x - step * 0.5;
      const cp2Y = y;
      return `${acc} C ${cp1X.toFixed(1)} ${cp1Y.toFixed(1)}, ${cp2X.toFixed(1)} ${cp2Y.toFixed(1)}, ${x.toFixed(1)} ${y.toFixed(1)}`;
    }, '');
  };

  const requestedPath = generatePath('requestedW');
  const allocatedPath = generatePath('allocatedW');
  const measuredPath = generatePath('measuredW');

  return (
    <ScrollReveal animation="slide-up" threshold={0.1}>
      <section className="bg-surface-base border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 transition-all duration-300" id="evidence-telemetry">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-4">
          <div>
            <div className="text-xs font-telemetry-mono text-primary font-bold tracking-widest uppercase">
              06 / EVIDENCE ENGINE
            </div>
            <h2 className="text-2xl sm:text-3xl font-headline-md text-forest-deep font-bold mt-1">
              Measure first. Claim later.
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-telemetry-mono text-on-surface-variant hidden md:inline">
              Live INA219 Telemetry Trace (Requested vs Allocated vs Measured kW / W)
            </span>
            <button 
              onClick={onExportCsv}
              className="px-3 py-1.5 rounded-lg bg-surface-subtle border border-border-subtle text-xs font-telemetry-mono hover:bg-white text-on-surface transition cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Real-Time SVG Power Curve Trace Graph */}
        <div className="bg-surface-subtle p-5 rounded-xl border border-border-subtle relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between text-xs font-telemetry-mono mb-3 gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-alarm-amber inline-block"></span> Requested Load (kW / W)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-primary-container inline-block"></span> Allocated Budget (kW / W)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-forest-deep inline-block"></span> Measured Power (INA219)
              </span>
            </div>
            <span className="text-outline">Sampling Interval: 250ms</span>
          </div>

        <div className="w-full h-40 relative">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 120">
            {/* Grid Lines */}
            <line stroke="#E2E8F0" strokeDasharray="4" x1="0" x2="800" y1="30" y2="30"></line>
            <line stroke="#E2E8F0" strokeDasharray="4" x1="0" x2="800" y1="60" y2="60"></line>
            <line stroke="#E2E8F0" strokeDasharray="4" x1="0" x2="800" y1="90" y2="90"></line>

            {/* Requested Power Line (Amber) */}
            <path
              d={requestedPath || "M 0 50 Q 150 40 300 45 T 500 35 T 700 48 T 800 45"}
              fill="none"
              stroke="#F59E0B"
              strokeDasharray="3"
              strokeWidth="2"
            ></path>

            {/* Allocated Power Line (Emerald) */}
            <path
              d={allocatedPath || "M 0 52 Q 150 42 300 48 T 500 40 T 700 50 T 800 48"}
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
            ></path>

            {/* Measured Actual Power via INA219 */}
            <path
              d={measuredPath || "M 0 56 Q 70 54 150 58 T 230 55 T 300 57 T 400 52 T 500 55 T 600 53 T 700 56 T 800 55"}
              fill="none"
              stroke="#022C22"
              strokeWidth="2"
            ></path>
          </svg>
        </div>

        <div className="flex justify-between text-[10px] font-telemetry-mono text-outline mt-1.5">
          <span>T - 60s</span>
          <span>T - 45s</span>
          <span>T - 30s</span>
          <span>T - 15s</span>
          <span className="font-bold text-primary">Live (T = 0s)</span>
        </div>
      </div>

      {/* Tabular Chronological Event Log */}
      <div className="overflow-x-auto rounded-xl border border-border-subtle">
        <table className="w-full text-left font-telemetry-mono text-xs border-collapse">
          <thead>
            <tr className="bg-surface-subtle text-on-surface-variant border-b border-border-subtle uppercase text-[10px]">
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Occupancy Z1-Z3</th>
              <th className="py-3 px-4">Light Input</th>
              <th className="py-3 px-4">SCD30 Env</th>
              <th className="py-3 px-4">Requested</th>
              <th className="py-3 px-4">Allocation</th>
              <th className="py-3 px-4">Measured (V / I / W)</th>
              <th className="py-3 px-4">Event Summary</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle bg-surface-base">
            {eventLogs.map((log, idx) => (
              <tr key={idx} className="hover:bg-surface-subtle transition">
                <td className="py-2.5 px-4 text-outline">{log.time}</td>
                <td className="py-2.5 px-4 text-forest-deep font-semibold">{log.occupancy}</td>
                <td className="py-2.5 px-4">{log.light}</td>
                <td className="py-2.5 px-4">{log.env}</td>
                <td className="py-2.5 px-4 text-alarm-amber">{log.requested}</td>
                <td className="py-2.5 px-4 text-primary font-bold">{log.allocated}</td>
                <td className="py-2.5 px-4">{log.measured}</td>
                <td className="py-2.5 px-4 text-forest-deep">{log.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  </ScrollReveal>
  );
}
