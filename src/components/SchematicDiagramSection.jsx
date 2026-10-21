import React, { useState } from 'react';

export default function SchematicDiagramSection() {
  const [selectedSubsystem, setSelectedSubsystem] = useState('all');
  const [isSimulatedOccupied, setIsSimulatedOccupied] = useState(true);
  const [showOriginalModal, setShowOriginalModal] = useState(false);
  const [hoveredPin, setHoveredPin] = useState(null);

  // Subsystem filter helper
  const isHighlighted = (group) => {
    if (selectedSubsystem === 'all') return true;
    return selectedSubsystem === group;
  };

  return (
    <section className="space-y-6 scroll-mt-20" id="schematic">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border-subtle pb-4">
        <div>
          <div className="text-xs font-telemetry-mono text-primary font-bold tracking-widest uppercase">
            09 / HARDWARE SCHEMATIC &amp; ELECTRICAL TOPOLOGY
          </div>
          <h2 className="text-2xl sm:text-3xl font-headline-md text-forest-deep font-bold mt-1">
            System Schematic &amp; Component Wiring Diagram
          </h2>
        </div>
        <p className="text-sm font-body-sm text-on-surface-variant max-w-xl text-left sm:text-right">
          Interactive 1-to-1 schematic replica representing the physical edge gateway orchestrator, industrial RS485 Modbus telemetry bus, environmental microclimate sensors, and isolated contactor relay tripping circuits.
        </p>
      </div>

      {/* Main Interactive Schematic Canvas Card */}
      <div className="bg-surface-base border border-border-subtle rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Top Control Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-6 py-3 bg-surface-subtle border-b border-border-subtle gap-2.5 sm:gap-3">
          {/* Subsystem Filters (Fluid scrollable pills on mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto shrink-0">
            <span className="text-[11px] font-telemetry-mono font-bold text-forest-deep mr-1 shrink-0">FILTER:</span>
            {[
              { id: 'all', label: 'All Subsystems' },
              { id: 'vision', label: 'AI Vision & LAN' },
              { id: 'modbus', label: 'RS485 & Solar' },
              { id: 'sensors', label: 'I2C/UART Sensors' },
              { id: 'relays', label: 'Relays & Loads' },
              { id: 'power', label: 'Isolated 5V Power' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedSubsystem(tab.id)}
                className={`px-2.5 py-1 text-xs font-telemetry-mono font-medium rounded-lg transition-all shrink-0 whitespace-nowrap tap-pop ${
                  selectedSubsystem === tab.id
                    ? 'bg-forest-deep text-white shadow-2xs'
                    : 'bg-surface-base hover:bg-surface-muted text-on-surface-variant border border-border-subtle'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Interactive Simulation & Original View Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto shrink-0 pt-1 sm:pt-0 border-t border-border-subtle/60 sm:border-t-0">
            <button
              type="button"
              onClick={() => setIsSimulatedOccupied(!isSimulatedOccupied)}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-telemetry-mono font-semibold rounded-lg border transition-all shadow-2xs tap-pop shrink-0 ${
                isSimulatedOccupied
                  ? 'border-alarm-amber/60 bg-alarm-amber-subtle text-alarm-amber hover:bg-alarm-amber/20'
                  : 'border-primary/50 bg-secondary-container text-primary hover:bg-secondary-container/80'
              }`}
              title="Toggle Occupancy Simulation state across schematic relays"
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${isSimulatedOccupied ? 'bg-primary animate-pulse' : 'bg-alarm-amber'}`}></span>
              <span className="hidden sm:inline">{isSimulatedOccupied ? 'State: Occupied (Loads ON)' : 'State: Empty (Tripped Minimum)'}</span>
              <span className="sm:hidden">{isSimulatedOccupied ? 'Occupied (ON)' : 'Empty (OFF)'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowOriginalModal(true)}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-telemetry-mono font-medium rounded-lg border border-border-subtle bg-surface-base hover:bg-surface-muted text-forest-deep transition-colors shadow-2xs tap-pop shrink-0"
              title="Inspect original schematic diagram source image"
            >
              <svg className="w-3.5 h-3.5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="hidden sm:inline">Original Sheet</span>
              <span className="sm:hidden">Original</span>
            </button>
          </div>
        </div>

        {/* Live Status Header Strip */}
        <div className="bg-surface-base px-3 sm:px-6 py-2 border-b border-border-subtle flex flex-wrap items-center justify-between text-xs font-telemetry-mono gap-2 text-on-surface-variant">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <strong className="text-forest-deep">Gateway Brain:</strong> Raspberry Pi 4 Model B
            </span>
            <span className="hidden md:inline text-border-strong">|</span>
            <span className="hidden sm:inline">
              <strong className="text-forest-deep">Industrial Bus:</strong> RS485 Modbus RTU
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-[11px] px-2 py-0.5 rounded bg-surface-subtle border border-border-subtle">
              Scale: 1:1
            </span>
            {hoveredPin && (
              <span className="text-[11px] px-2 py-0.5 rounded bg-forest-deep text-white font-bold animate-fadeIn">
                Signal: {hoveredPin}
              </span>
            )}
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden px-4 py-2 bg-emerald-50/80 text-emerald-800 text-[11px] font-telemetry-mono text-center border-b border-emerald-100 flex items-center justify-center gap-1.5">
          <span className="material-symbols-outlined text-sm">swipe</span>
          <span>Swipe horizontally to inspect complete 1:1 schematic wiring</span>
        </div>

        {/* Vector Schematic UI Canvas */}
        <div 
          className="relative w-full overflow-x-auto bg-[#fafafc] select-none p-3 sm:p-6 lg:p-8 flex justify-start sm:justify-center"
          style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x pan-y' }}
        >
          <div className="relative min-w-[1060px] max-w-[1240px] w-full aspect-[1180/840] bg-[#fbfbfe] rounded-xl border border-slate-300 shadow-inner overflow-hidden">
            {/* Grid Pattern Background */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-45" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="schematic-small-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#cbd5e1" strokeWidth="0.6" />
                </pattern>
                <pattern id="schematic-major-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <rect width="100" height="100" fill="url(#schematic-small-grid)" />
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#94a3b8" strokeWidth="1.1" />
                </pattern>
                {/* Marker Arrows */}
                <marker id="arrow-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1d4ed8" />
                </marker>
                <marker id="arrow-green" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#15803d" />
                </marker>
                <marker id="arrow-black" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1e293b" />
                </marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#schematic-major-grid)" />
            </svg>

            {/* SVG Connecting Wires Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-auto" viewBox="0 0 1180 840">
              {/* =========================================================================
                  SUBSYSTEM 1: VISION CAMERA & OFFICE LAN ROUTER TO PI
                  ========================================================================= */}
              <g className={`transition-opacity duration-300 ${isHighlighted('vision') ? 'opacity-100' : 'opacity-20'}`}>
                {/* Ethernet / Wi-Fi double arrow line between Camera and Router */}
                <line x1="195" y1="130" x2="315" y2="130" stroke="#1d4ed8" strokeWidth="2.5" markerEnd="url(#arrow-blue)" markerStart="url(#arrow-blue)" />
                <rect x="210" y="112" width="90" height="18" rx="4" fill="#ffffff" fillOpacity="0.9" stroke="#93c5fd" strokeWidth="1" />
                <text x="255" y="125" textAnchor="middle" fill="#1e40af" fontSize="10" fontFamily="'Geist Mono', monospace" fontWeight="600">
                  Ethernet / Wi-Fi
                </text>

                {/* Blue route from Router to Raspberry Pi Top Header (Network Triggers) */}
                <path
                  d="M 405 130 L 530 130 L 530 280"
                  fill="none"
                  stroke="#1d4ed8"
                  strokeWidth="2.5"
                  markerEnd="url(#arrow-blue)"
                  strokeDasharray={isSimulatedOccupied ? "none" : "6,4"}
                />
                <rect x="420" y="98" width="135" height="28" rx="4" fill="#ffffff" fillOpacity="0.95" stroke="#93c5fd" strokeWidth="1" />
                <text x="487" y="112" textAnchor="middle" fill="#1e40af" fontSize="10.5" fontFamily="'Geist', sans-serif" fontWeight="700">
                  Send network
                </text>
                <text x="487" y="123" textAnchor="middle" fill="#1e40af" fontSize="10.5" fontFamily="'Geist', sans-serif" fontWeight="700">
                  event triggers
                </text>
              </g>

              {/* =========================================================================
                  SUBSYSTEM 2: RS485 MODBUS SHIELDED TWISTED PAIR & POWER BUS
                  ========================================================================= */}
              <g className={`transition-opacity duration-300 ${isHighlighted('modbus') ? 'opacity-100' : 'opacity-20'}`}>
                {/* Heavy black 3-phase power lines from Panel */}
                <path d="M 140 600 L 195 600" fill="none" stroke="#1e293b" strokeWidth="3" />
                <path d="M 140 730 L 210 730" fill="none" stroke="#1e293b" strokeWidth="3" />
                <path d="M 250 670 L 250 690" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeDasharray="3,3" />

                {/* Twisted Pair Cables between USB Adapter, Grid Meter, and Solar Meter */}
                {/* Adapter down to Grid meter */}
                <g className="cursor-pointer" onMouseEnter={() => setHoveredPin('RS485 Modbus Bus [A(D+) / B(D-)]')} onMouseLeave={() => setHoveredPin(null)}>
                  {/* Twisted pair helical simulation */}
                  <path
                    d="M 285 350 L 245 350 L 245 370 Q 235 385 245 400 Q 255 415 245 430 Q 235 445 245 460 Q 255 475 245 490 L 245 540"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="2.8"
                  />
                  <path
                    d="M 285 365 L 255 365 L 255 370 Q 265 385 255 400 Q 245 415 255 430 Q 265 445 255 460 Q 245 475 255 490 L 255 540"
                    fill="none"
                    stroke="#0369a1"
                    strokeWidth="2"
                    strokeDasharray="4,2"
                  />

                  {/* Continuing Twisted Pair to Solar Meter */}
                  <path
                    d="M 270 575 L 300 575 L 390 575 Q 400 590 390 605 Q 380 620 390 635 Q 400 650 390 665 L 390 690"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="2.8"
                  />
                  <path
                    d="M 270 585 L 305 585 L 400 585 Q 410 600 400 615 Q 390 630 400 645 Q 410 660 400 675 L 400 690"
                    fill="none"
                    stroke="#0369a1"
                    strokeWidth="2"
                    strokeDasharray="4,2"
                  />
                </g>

                {/* Modbus Labels */}
                <text x="280" y="345" fill="#0369a1" fontSize="10" fontFamily="'Geist Mono', monospace" fontWeight="bold">A (D+)</text>
                <text x="280" y="378" fill="#0284c7" fontSize="10" fontFamily="'Geist Mono', monospace" fontWeight="bold">B (D-)</text>

                <text x="218" y="534" fill="#0369a1" fontSize="10" fontFamily="'Geist Mono', monospace" fontWeight="bold">A (D+)</text>
                <text x="260" y="534" fill="#0284c7" fontSize="10" fontFamily="'Geist Mono', monospace" fontWeight="bold">B (D-)</text>

                <text x="365" y="682" fill="#0369a1" fontSize="10" fontFamily="'Geist Mono', monospace" fontWeight="bold">A (D+)</text>
                <text x="420" y="682" fill="#0284c7" fontSize="10" fontFamily="'Geist Mono', monospace" fontWeight="bold">B (D-)</text>

                {/* Bus Callout Box */}
                <rect x="70" y="405" width="160" height="34" rx="4" fill="#ffffff" fillOpacity="0.95" stroke="#93c5fd" strokeWidth="1.2" />
                <text x="150" y="420" textAnchor="middle" fill="#0369a1" fontSize="10" fontFamily="'Geist', sans-serif" fontWeight="700">
                  RS485 Modbus Bus
                </text>
                <text x="150" y="432" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="'Geist', sans-serif">
                  (Shielded Twisted Pair)
                </text>
              </g>

              {/* =========================================================================
                  SUBSYSTEM 3: SENSORS (BME280 & PMS5003) WIRING
                  ========================================================================= */}
              <g className={`transition-opacity duration-300 ${isHighlighted('sensors') ? 'opacity-100' : 'opacity-20'}`}>
                {/* Pin 1 (3.3V) -> BME280 3.3V [Red line] */}
                <path
                  d="M 580 280 L 580 90 L 850 90"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2.2"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPin('Pin 1 (3.3V Power) -> BME280')}
                  onMouseLeave={() => setHoveredPin(null)}
                />
                {/* Pin 3 (SDA) -> BME280 SDA [Orange line] */}
                <path
                  d="M 605 280 L 605 110 L 850 110"
                  fill="none"
                  stroke="#ea580c"
                  strokeWidth="2.2"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPin('Pin 3 (GPIO 2 / I2C SDA) -> BME280')}
                  onMouseLeave={() => setHoveredPin(null)}
                />
                {/* Pin 5 (SCL) -> BME280 SCL [Green line] */}
                <path
                  d="M 620 280 L 620 130 L 850 130"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2.2"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPin('Pin 5 (GPIO 3 / I2C SCL) -> BME280')}
                  onMouseLeave={() => setHoveredPin(null)}
                />
                {/* Pin 6 (GND) -> BME280 GND [Black line] */}
                <path
                  d="M 635 280 L 635 150 L 850 150"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="2.2"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPin('Pin 6 (GND System Ground) -> BME280')}
                  onMouseLeave={() => setHoveredPin(null)}
                />

                {/* Common Ground Node Dot */}
                <circle cx="635" cy="240" r="4.5" fill="#1e293b" />
                <path d="M 635 240 L 710 240 L 710 375 L 850 375" fill="none" stroke="#1e293b" strokeWidth="2.2" />

                {/* External 5V Power -> PMS5003 5V (Red Wire from External supply bus) */}
                <path
                  d="M 700 710 L 700 290 L 850 290"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2.4"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPin('External 5V Power Rail -> PMS5003 Air Sensor')}
                  onMouseLeave={() => setHoveredPin(null)}
                />

                {/* Pin 10 (RX) -> PMS5003 TX [Blue Line] */}
                <path
                  d="M 670 280 L 670 318 L 850 318"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2.2"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPin('Pin 10 (GPIO 15 / UART0 RX) -> PMS5003 TX')}
                  onMouseLeave={() => setHoveredPin(null)}
                />

                {/* Pin 8 (TX) -> PMS5003 RX [Orange/Brown Line] */}
                <path
                  d="M 655 280 L 655 345 L 850 345"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="2.2"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPin('Pin 8 (GPIO 14 / UART0 TX) -> PMS5003 RX')}
                  onMouseLeave={() => setHoveredPin(null)}
                />

                {/* Pin 9 GND Common Link */}
                <circle cx="710" cy="375" r="4.5" fill="#1e293b" />
              </g>

              {/* =========================================================================
                  SUBSYSTEM 4: 5V RELAYS & ACTUATION LOOPS
                  ========================================================================= */}
              <g className={`transition-opacity duration-300 ${isHighlighted('relays') ? 'opacity-100' : 'opacity-20'}`}>
                {/* GPIO 17 -> HVAC Relay IN1 [Green Wire] */}
                <path
                  d="M 590 350 L 590 535 L 755 535"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2.2"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPin('GPIO 17 -> HVAC Relay Control (IN1)')}
                  onMouseLeave={() => setHoveredPin(null)}
                />
                {/* GPIO 27 -> Lighting Relay [Green Wire] */}
                <path
                  d="M 610 350 L 610 595 L 755 595"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2.2"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPin('GPIO 27 -> Lighting Relay Control')}
                  onMouseLeave={() => setHoveredPin(null)}
                />
                {/* GPIO 22 -> Appliance Relay [Green Wire] */}
                <path
                  d="M 625 350 L 625 655 L 755 655"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2.2"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPin('GPIO 22 -> Appliance/Fan Relay Control')}
                  onMouseLeave={() => setHoveredPin(null)}
                />

                {/* Relay Outputs: HVAC NO & COM to HVAC Contactor */}
                <path
                  d="M 890 530 L 980 530 L 980 545 L 1020 545"
                  fill="none"
                  stroke={isSimulatedOccupied ? "#15803d" : "#ea580c"}
                  strokeWidth="2.5"
                />
                <path
                  d="M 890 550 L 950 550 L 950 575 L 1020 575"
                  fill="none"
                  stroke={isSimulatedOccupied ? "#15803d" : "#ea580c"}
                  strokeWidth="2.5"
                />
                {/* Lighting and Appliance NO contacts */}
                <path d="M 890 600 L 950 600" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="3,3" />
                <path d="M 890 660 L 950 660" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="3,3" />
              </g>

              {/* =========================================================================
                  SUBSYSTEM 5: EXTERNAL 5V POWER & ISOLATED GROUND
                  ========================================================================= */}
              <g className={`transition-opacity duration-300 ${isHighlighted('power') ? 'opacity-100' : 'opacity-20'}`}>
                {/* Relay VCC & 5V Lines from External Supply */}
                <path d="M 750 725 L 720 725 L 720 710 L 755 710" fill="none" stroke="#dc2626" strokeWidth="2.2" />
                <path d="M 750 740 L 710 740 L 710 730 L 755 730" fill="none" stroke="#dc2626" strokeWidth="2.2" />

                {/* Common Ground from External Supply to Relay GND & Pi GND */}
                <path d="M 750 760 L 680 760 L 680 240 L 635 240" fill="none" stroke="#1e293b" strokeWidth="2.2" />
                <path d="M 680 750 L 755 750" fill="none" stroke="#1e293b" strokeWidth="2.2" />
                <circle cx="680" cy="750" r="4" fill="#1e293b" />
                <circle cx="710" cy="740" r="4" fill="#dc2626" />
              </g>
            </svg>

            {/* =========================================================================
                HTML / VECTOR UI COMPONENTS ABSOLUTE POSITIONED ON SCHEMATIC
                ========================================================================= */}

            {/* 1. TOP-LEFT: SMART CCTV CAMERA */}
            <div
              className={`absolute left-[50px] top-[70px] w-[150px] transition-all duration-300 ${
                isHighlighted('vision') ? 'scale-100 opacity-100' : 'opacity-30'
              }`}
            >
              <div className="bg-white border-2 border-slate-700 rounded-lg p-3 shadow-md flex flex-col items-center text-center">
                {/* Detailed SVG CCTV Camera Icon */}
                <svg className="w-16 h-12 text-slate-700" viewBox="0 0 70 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 8 38 L 22 25 L 22 15" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                  <rect x="2" y="32" width="12" height="14" rx="2" fill="#64748b" />
                  <path d="M 18 10 L 48 10 L 58 24 L 28 24 Z" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
                  <rect x="22" y="14" width="34" height="18" rx="3" fill="#cbd5e1" stroke="#334155" strokeWidth="2" />
                  <circle cx="56" cy="23" r="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                  <circle cx="48" cy="18" r="1.5" fill={isSimulatedOccupied ? "#10b981" : "#ef4444"} className="animate-pulse" />
                </svg>
                <div className="mt-1 font-bold text-xs text-slate-800 leading-tight">
                  Smart CCTV Camera
                </div>
                <div className="text-[10px] text-slate-500 font-telemetry-mono mt-0.5">
                  (Edge AI Person Detection)
                </div>
              </div>
            </div>

            {/* 2. TOP-MIDDLE-LEFT: OFFICE LAN ROUTER */}
            <div
              className={`absolute left-[315px] top-[75px] w-[95px] transition-all duration-300 ${
                isHighlighted('vision') ? 'scale-100 opacity-100' : 'opacity-30'
              }`}
            >
              <div className="bg-white border-2 border-slate-700 rounded-lg p-2.5 shadow-md flex flex-col items-center text-center">
                {/* Router with Antennas & Waves */}
                <div className="flex justify-between w-full px-2 mb-1">
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] text-blue-600 font-bold leading-none animate-ping">(( ))</span>
                    <div className="w-1 h-5 bg-slate-700 rounded-t"></div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] text-blue-600 font-bold leading-none animate-ping">(( ))</span>
                    <div className="w-1 h-5 bg-slate-700 rounded-t"></div>
                  </div>
                </div>
                <div className="w-full bg-slate-200 border border-slate-600 rounded px-1.5 py-1 flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                </div>
                <div className="mt-1.5 font-bold text-[11px] text-slate-800 leading-tight">
                  Office LAN Router
                </div>
              </div>
            </div>

            {/* 3. CENTER: RASPBERRY PI 4 */}
            <div
              className={`absolute left-[415px] top-[260px] w-[275px] transition-all duration-300 ${
                selectedSubsystem === 'all' || selectedSubsystem === 'modbus' || selectedSubsystem === 'sensors' || selectedSubsystem === 'relays' || selectedSubsystem === 'vision'
                  ? 'scale-100 opacity-100'
                  : 'opacity-40'
              }`}
            >
              {/* Raspberry Pi 4 PCB representation */}
              <div className="relative bg-[#1d7745] border-2 border-[#14532d] rounded-xl p-3 text-white shadow-xl">
                {/* Gold corner mounting holes */}
                <div className="absolute top-2 left-2 w-3.5 h-3.5 rounded-full border-2 border-yellow-500 bg-[#14532d]"></div>
                <div className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full border-2 border-yellow-500 bg-[#14532d]"></div>
                <div className="absolute bottom-2 left-2 w-3.5 h-3.5 rounded-full border-2 border-yellow-500 bg-[#14532d]"></div>
                <div className="absolute bottom-2 right-2 w-3.5 h-3.5 rounded-full border-2 border-yellow-500 bg-[#14532d]"></div>

                {/* 40-Pin GPIO Header on Top Edge */}
                <div className="bg-black/80 rounded px-1 py-0.5 mb-2.5 border border-yellow-600/40 flex justify-between items-center">
                  <div className="grid grid-cols-20 gap-0.5 w-full">
                    {[...Array(40)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full ${
                          i === 0 ? 'bg-red-500 ring-1 ring-white' : // Pin 1 (3.3V)
                          i === 2 ? 'bg-orange-400' : // Pin 3 (SDA)
                          i === 4 ? 'bg-emerald-400' : // Pin 5 (SCL)
                          i === 5 || i === 8 ? 'bg-slate-300 ring-1 ring-black' : // Pin 6, 9 (GND)
                          i === 7 ? 'bg-amber-400' : // Pin 8 (TX)
                          i === 9 ? 'bg-blue-400' : // Pin 10 (RX)
                          i === 11 || i === 12 || i === 14 ? 'bg-green-400' : // GPIO 17, 27, 22
                          'bg-yellow-400/80'
                        }`}
                        title={`Pin ${i + 1}`}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Pi Board Body Internal Components */}
                <div className="grid grid-cols-3 gap-2 items-center my-2">
                  {/* Pi Silkscreen Logo */}
                  <div className="flex flex-col items-center">
                    <svg className="w-7 h-7 text-red-300 drop-shadow" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2a3 3 0 00-3 3c0 .3.05.58.14.85C8.04 6.13 7 7.42 7 9c0 1.66 1.34 3 3 3h4c1.66 0 3-1.34 3-3 0-1.58-1.04-2.87-2.14-3.15.09-.27.14-.55.14-.85a3 3 0 00-3-3z"/>
                      <circle cx="9" cy="14" r="2.5" fill="#e11d48"/>
                      <circle cx="15" cy="14" r="2.5" fill="#e11d48"/>
                      <circle cx="12" cy="17" r="2.5" fill="#e11d48"/>
                      <circle cx="8" cy="18" r="2" fill="#e11d48"/>
                      <circle cx="16" cy="18" r="2" fill="#e11d48"/>
                    </svg>
                    <div className="flex gap-1 mt-1">
                      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-2xs"></span>
                      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-2xs"></span>
                      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-2xs"></span>
                    </div>
                  </div>

                  {/* Broadcom SoC Heatspreader */}
                  <div className="bg-slate-300 border-2 border-slate-400 rounded p-1.5 text-slate-800 text-center shadow-inner">
                    <span className="text-[8px] font-telemetry-mono font-bold block leading-none">BROADCOM</span>
                    <span className="text-[7px] font-telemetry-mono block mt-0.5 text-slate-600">BCM2711</span>
                  </div>

                  {/* Ports / USB 3.0 & 2.0 / Gigabit Ethernet */}
                  <div className="flex flex-col gap-1 items-end pr-1">
                    <div className="w-8 h-4 bg-blue-600 rounded-xs border border-slate-300" title="Dual USB 3.0"></div>
                    <div className="w-8 h-4 bg-slate-400 rounded-xs border border-slate-300" title="Dual USB 2.0"></div>
                    <div className="w-8 h-5 bg-slate-300 rounded-xs border border-slate-400 flex items-center justify-center text-[7px] text-slate-700 font-bold" title="Gigabit Ethernet">
                      ETH
                    </div>
                  </div>
                </div>

                {/* Bottom Label */}
                <div className="text-center font-bold text-sm tracking-wide text-emerald-100 font-headline-sm pt-1 border-t border-emerald-600/60">
                  Raspberry Pi 4
                </div>
              </div>
            </div>

            {/* 4. PLUGGED INTO PI USB: USB-TO-RS485 ADAPTER */}
            <div
              className={`absolute left-[295px] top-[320px] w-[110px] transition-all duration-300 ${
                isHighlighted('modbus') ? 'scale-100 opacity-100' : 'opacity-30'
              }`}
            >
              <div className="bg-slate-900 border-2 border-slate-700 text-white rounded-md p-1.5 shadow-lg flex items-center justify-between">
                {/* Screw Terminal Block on Left */}
                <div className="flex flex-col gap-1 bg-emerald-800 p-1 rounded-xs border border-emerald-600">
                  <div className="flex items-center gap-1 text-[8px] font-telemetry-mono font-bold">
                    <span className="w-2 h-2 rounded-full bg-slate-300 inline-block border border-black"></span>
                    <span>A</span>
                  </div>
                  <div className="flex items-center gap-1 text-[8px] font-telemetry-mono font-bold">
                    <span className="w-2 h-2 rounded-full bg-slate-300 inline-block border border-black"></span>
                    <span>B</span>
                  </div>
                </div>

                {/* USB Symbol Body */}
                <div className="text-center px-1">
                  <svg className="w-5 h-5 mx-auto text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15 7v4h1v2h-3V5h2l-3-4-3 4h2v8H8v-2.07c.6-.36 1-.99 1-1.73 0-1.1-.9-2-2-2s-2 .9-2 2c0 .74.4 1.37 1 1.73V13c0 1.1.9 2 2 2h4v4.18c-.6.37-1 1-1 1.82 0 1.1.9 2 2 2s2-.9 2-2c0-.82-.4-1.45-1-1.82V15h4c1.1 0 2-.9 2-2v-2h1V7h-4z"/>
                  </svg>
                </div>

                {/* Male USB plug sticking into Pi */}
                <div className="w-2.5 h-4 bg-slate-300 border border-slate-500 rounded-r-xs"></div>
              </div>
              <div className="text-center font-bold text-[10.5px] text-slate-800 mt-1 leading-tight">
                USB-to-RS485<br />Adapter
              </div>
            </div>

            {/* 5. BOTTOM-LEFT: 3-PHASE ELECTRICAL PANEL */}
            <div
              className={`absolute left-[30px] top-[550px] w-[110px] transition-all duration-300 ${
                isHighlighted('modbus') ? 'scale-100 opacity-100' : 'opacity-30'
              }`}
            >
              <div className="bg-slate-200 border-2 border-slate-700 rounded-md p-3 shadow-md h-[180px] flex flex-col justify-between items-center text-center">
                <div className="w-6 h-2 bg-slate-400 rounded-xs"></div>
                <div className="font-bold text-xs text-slate-900 leading-tight">
                  3-Phase<br />Electrical<br />Panel
                </div>
                {/* Danger / High Voltage Bolt */}
                <div className="w-8 h-8 rounded-full bg-yellow-400 border border-amber-600 flex items-center justify-center">
                  <span className="text-amber-900 text-sm font-black">⚡</span>
                </div>
                <div className="w-4 h-1.5 bg-slate-500 rounded-full"></div>
              </div>
            </div>

            {/* 6. BOTTOM-LEFT: EXISTING 3-PHASE GRID METER */}
            <div
              className={`absolute left-[180px] top-[540px] w-[115px] transition-all duration-300 ${
                isHighlighted('modbus') ? 'scale-100 opacity-100' : 'opacity-30'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                {/* Round utility meter */}
                <div className="w-20 h-20 rounded-full bg-white border-3 border-slate-700 shadow-md flex flex-col items-center justify-center p-2 relative">
                  <div className="w-16 h-5 bg-slate-900 border border-slate-600 rounded text-emerald-400 font-telemetry-mono text-[9px] flex items-center justify-center tracking-widest">
                    001200
                  </div>
                  <div className="flex gap-1.5 mt-1">
                    <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                    <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                    <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                    <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                  </div>
                </div>
                <div className="mt-1.5 font-bold text-xs text-slate-800 leading-tight">
                  Existing 3-Phase<br />Grid Meter
                </div>
              </div>
            </div>

            {/* 7. BOTTOM-LEFT: SOLAR INVERTER / PV SYSTEM */}
            <div
              className={`absolute left-[190px] top-[700px] w-[95px] transition-all duration-300 ${
                isHighlighted('modbus') ? 'scale-100 opacity-100' : 'opacity-30'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-18 h-18 bg-white border-2 border-slate-700 rounded-lg p-1.5 shadow-md flex flex-col items-center justify-center">
                  <div className="flex items-center gap-1 mb-1">
                    {/* Sun Icon */}
                    <span className="text-amber-500 text-base leading-none">☀️</span>
                  </div>
                  {/* Solar PV cells grid */}
                  <div className="w-12 h-9 bg-blue-700 border border-blue-900 grid grid-cols-3 grid-rows-2 gap-0.5 p-0.5">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="bg-blue-500/80 border border-blue-300/40"></div>
                    ))}
                  </div>
                </div>
                <div className="mt-1 font-bold text-[11px] text-slate-800 leading-tight">
                  Solar Inverter /<br />PV System
                </div>
              </div>
            </div>

            {/* 8. BOTTOM-LEFT: SOLAR RS485 METER / MODBUS INTERFACE */}
            <div
              className={`absolute left-[340px] top-[700px] w-[120px] transition-all duration-300 ${
                isHighlighted('modbus') ? 'scale-100 opacity-100' : 'opacity-30'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-22 bg-slate-100 border-2 border-slate-700 rounded-lg p-2 shadow-md">
                  <div className="bg-emerald-950 border border-emerald-600 rounded p-1 text-emerald-300 font-telemetry-mono text-[8px] leading-tight">
                    Solar Ubus<br />Interface
                  </div>
                  <div className="flex justify-center gap-2 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  </div>
                </div>
                <div className="mt-1 font-bold text-[11px] text-slate-800 leading-tight">
                  Solar RS485 Meter /<br />Modbus interface
                </div>
              </div>
            </div>

            {/* 9. TOP-RIGHT: BME280 SENSOR (TEMP/HUMIDITY) */}
            <div
              className={`absolute left-[850px] top-[70px] w-[180px] transition-all duration-300 ${
                isHighlighted('sensors') ? 'scale-100 opacity-100' : 'opacity-30'
              }`}
            >
              <div className="bg-white border-2 border-slate-700 rounded-lg p-3 shadow-md flex items-center justify-between">
                {/* Pin descriptions */}
                <div className="flex flex-col gap-1 text-[10px] font-telemetry-mono font-bold text-slate-700 pr-2">
                  <div className="flex items-center gap-1.5"><span className="text-slate-400">Pin 1</span> <span className="text-red-600">3.3V</span></div>
                  <div className="flex items-center gap-1.5"><span className="text-slate-400">Pin 3</span> <span className="text-orange-600">SDA</span></div>
                  <div className="flex items-center gap-1.5"><span className="text-slate-400">Pin 5</span> <span className="text-emerald-600">SCL</span></div>
                  <div className="flex items-center gap-1.5"><span className="text-slate-400">Pin 6</span> <span className="text-slate-900">GND</span></div>
                </div>

                {/* Purple Breakout Board */}
                <div className="w-12 h-14 bg-purple-700 border border-purple-900 rounded p-1 flex flex-col items-center justify-between text-white shadow-sm">
                  <div className="flex justify-between w-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                  </div>
                  {/* Metal IC package */}
                  <div className="w-5 h-4 bg-slate-300 border border-slate-500 rounded-xs flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-slate-900"></span>
                  </div>
                  <div className="flex justify-between w-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                  </div>
                </div>
              </div>
              <div className="text-center font-bold text-xs text-slate-800 mt-1">
                BME280 Sensor<br />(Temp/Humidity)
              </div>
            </div>

            {/* 10. MIDDLE-RIGHT: PMS5003 PARTICLE SENSOR (AIR QUALITY) */}
            <div
              className={`absolute left-[850px] top-[265px] w-[180px] transition-all duration-300 ${
                isHighlighted('sensors') ? 'scale-100 opacity-100' : 'opacity-30'
              }`}
            >
              <div className="bg-white border-2 border-slate-700 rounded-lg p-3 shadow-md flex items-center justify-between">
                {/* Pin Descriptions */}
                <div className="flex flex-col gap-1 text-[10px] font-telemetry-mono font-bold text-slate-700 pr-2">
                  <div className="flex items-center gap-1.5"><span className="text-slate-500 text-[9px]">External</span> <span className="text-red-600">5V</span></div>
                  <div className="flex items-center gap-1.5"><span className="text-slate-400">Pin 10</span> <span className="text-blue-600">RX</span></div>
                  <div className="flex items-center gap-1.5"><span className="text-slate-400">Pin 8</span> <span className="text-amber-600">TX</span></div>
                  <div className="flex items-center gap-1.5"><span className="text-slate-400">Pin 9</span> <span className="text-slate-900">GND</span></div>
                </div>

                {/* Blue/Metal Laser Particulate Enclosure */}
                <div className="w-16 h-16 bg-sky-200 border-2 border-slate-700 rounded-lg p-1.5 relative shadow-sm">
                  <div className="w-full h-8 bg-sky-400/50 rounded border border-sky-600 mb-1"></div>
                  {/* Intake airflow duct */}
                  <div className="absolute bottom-2 right-2 w-7 h-5 bg-slate-800 rounded-xs flex items-center justify-center">
                    <div className="w-4 h-2 bg-slate-900 rounded-xs"></div>
                  </div>
                </div>
              </div>
              <div className="text-center font-bold text-xs text-slate-800 mt-1">
                PMS5003 Particle Sensor<br />(Air Quality)
              </div>
            </div>

            {/* 11. BOTTOM-RIGHT: 5V MULTI-CHANNEL RELAY MODULE & LOADS */}
            <div
              className={`absolute left-[755px] top-[500px] w-[135px] transition-all duration-300 ${
                isHighlighted('relays') ? 'scale-100 opacity-100' : 'opacity-30'
              }`}
            >
              {/* Blue Relay Board */}
              <div className="bg-[#1e40af] border-2 border-[#1e3a8a] rounded-lg p-2 text-white shadow-xl">
                <div className="text-[10px] font-bold font-telemetry-mono text-center mb-1.5 text-blue-200">
                  5V Multi-Channel Relay Module
                </div>

                {/* 3 Channels */}
                <div className="space-y-1.5">
                  {/* Channel 1: HVAC */}
                  <div className="bg-blue-600 border border-blue-400 rounded p-1 text-[9px] flex items-center justify-between">
                    <div>
                      <div className="font-bold">HVAC Relay</div>
                      <div className="text-[7.5px] text-blue-200 font-telemetry-mono">(IN1)</div>
                    </div>
                    <div className="text-[8px] font-telemetry-mono font-bold text-right">
                      <div>NO</div>
                      <div className="text-blue-300">COM</div>
                    </div>
                  </div>

                  {/* Channel 2: Lighting */}
                  <div className="bg-blue-600 border border-blue-400 rounded p-1 text-[9px] flex items-center justify-between">
                    <div>
                      <div className="font-bold">Lighting</div>
                      <div className="text-[7.5px] text-blue-200 font-telemetry-mono">Relay</div>
                    </div>
                    <div className="text-[8px] font-telemetry-mono font-bold">NO</div>
                  </div>

                  {/* Channel 3: Appliance */}
                  <div className="bg-blue-600 border border-blue-400 rounded p-1 text-[9px] flex items-center justify-between">
                    <div>
                      <div className="font-bold">Appliance</div>
                      <div className="text-[7.5px] text-blue-200 font-telemetry-mono">Relay</div>
                    </div>
                    <div className="text-[8px] font-telemetry-mono font-bold">NO</div>
                  </div>
                </div>

                {/* Bottom Power Pins */}
                <div className="mt-2 pt-1 border-t border-blue-400/40 text-[8px] font-telemetry-mono flex flex-col gap-0.5 text-blue-200">
                  <div className="flex justify-between"><span>Relay VCC</span><span className="text-red-300">5V</span></div>
                  <div className="flex justify-between"><span>Logic 5V</span><span className="text-red-300">5V</span></div>
                  <div className="flex justify-between"><span>Ground</span><span className="text-slate-300">GND</span></div>
                </div>
              </div>
            </div>

            {/* Relay Left Pin Input Labels */}
            <div
              className={`absolute left-[685px] top-[520px] flex flex-col gap-[38px] text-[10px] font-telemetry-mono font-bold text-emerald-800 transition-opacity ${
                isHighlighted('relays') ? 'opacity-100' : 'opacity-20'
              }`}
            >
              <span>GPIO 17</span>
              <span>GPIO 27</span>
              <span>GPIO 22</span>
            </div>

            {/* 12. BOTTOM-RIGHT: HVAC SYSTEM CONTACTOR */}
            <div
              className={`absolute left-[1020px] top-[515px] w-[80px] transition-all duration-300 ${
                isHighlighted('relays') ? 'scale-100 opacity-100' : 'opacity-30'
              }`}
            >
              <div className="bg-slate-200 border-2 border-slate-700 rounded-md p-2 shadow-md flex flex-col items-center text-center">
                <div className="w-full flex justify-between px-2 font-telemetry-mono text-[10px] font-bold text-slate-800 border-b border-slate-400 pb-1">
                  <span>1</span>
                  <span>2</span>
                </div>
                <div className="py-2">
                  <svg className="w-8 h-8 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <div className="font-bold text-[9px] text-slate-800 leading-tight">
                  HVAC System Contactor
                </div>
              </div>
              <div className="text-[9px] font-telemetry-mono font-semibold text-slate-500 text-center mt-1">
                HVAC Dry Contacts
              </div>
            </div>

            {/* 13. EXACT CALLOUT BADGES AS IN ORIGINAL IMAGE */}
            <div
              className={`absolute left-[895px] top-[445px] transition-all duration-300 z-10 ${
                isHighlighted('relays') ? 'opacity-100' : 'opacity-30'
              }`}
            >
              {/* Badge 1: HVAC Minimum */}
              <div className="flex items-center gap-1.5 mb-3 bg-[#fef08a] border-2 border-amber-500 text-amber-950 px-2.5 py-1 rounded-lg shadow-md font-bold text-[10px] tracking-tight">
                {/* Person avatar */}
                <div className="w-4 h-4 rounded-full bg-amber-600 text-white flex items-center justify-center text-[9px] shrink-0">
                  👤
                </div>
                <span>NO ONE DETECTED: Sets HVAC to MINIMUM</span>
              </div>

              {/* Badge 2: Lighting OFF */}
              <div className="bg-[#fef08a] border-2 border-amber-500 text-amber-950 px-2.5 py-1 rounded-lg shadow-md font-bold text-[10px] tracking-tight mb-7">
                NO ONE DETECTED: TRIPS ALL LIGHTING OFF
              </div>

              {/* Badge 3: Fans OFF */}
              <div className="bg-[#fef08a] border-2 border-amber-500 text-amber-950 px-2.5 py-1 rounded-lg shadow-md font-bold text-[10px] tracking-tight">
                NO ONE DETECTED: TRIPS ALL FANS OFF
              </div>
            </div>

            {/* 14. BOTTOM-RIGHT: EXTERNAL 5V / 3A DC POWER SUPPLY (ISOLATED) */}
            <div
              className={`absolute left-[745px] top-[740px] w-[200px] transition-all duration-300 ${
                isHighlighted('power') ? 'scale-100 opacity-100' : 'opacity-30'
              }`}
            >
              <div className="text-right">
                <div className="font-bold text-xs text-slate-800">
                  External 5V / 3A DC Power Supply
                </div>
                <div className="text-[10px] font-telemetry-mono text-slate-500">
                  (isolated galvanic boundary)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Engineering Description in Reference to ZeroWatt Project */}
        <div className="p-6 bg-surface-subtle border-t border-border-subtle space-y-6">
          <div className="border-b border-border-subtle pb-4">
            <h3 className="text-base font-headline-sm font-bold text-forest-deep flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">account_tree</span>
              Engineering Context: The ZeroWatt Electrical &amp; Edge Hardware Stack
            </h3>
            <p className="text-xs font-body-sm text-on-surface-variant mt-1.5 leading-relaxed">
              This physical schematic represents the offline-first edge architecture of ZeroWatt deployed in campus academic halls and corporate workspaces. It bridges high-level computer vision intelligence with real-world electrical load isolation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Block 1 */}
            <div className="p-4 rounded-xl bg-surface-base border border-border-subtle shadow-2xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <h4 className="text-xs font-bold font-telemetry-mono text-forest-deep uppercase tracking-wider">
                  Vision Trigger &amp; Router
                </h4>
              </div>
              <p className="text-xs font-body-sm text-on-surface-variant leading-relaxed">
                Edge AI CCTV cameras run YOLO/MobileNet person detection directly on-device. When zero occupants are detected, encrypted UDP/TCP network event triggers notify the Raspberry Pi gateway over the isolated LAN, eliminating cloud egress and preserving privacy.
              </p>
            </div>

            {/* Block 2 */}
            <div className="p-4 rounded-xl bg-surface-base border border-border-subtle shadow-2xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span>
                <h4 className="text-xs font-bold font-telemetry-mono text-forest-deep uppercase tracking-wider">
                  RS485 Modbus Bus
                </h4>
              </div>
              <p className="text-xs font-body-sm text-on-surface-variant leading-relaxed">
                Industrial shielded twisted-pair wiring links the existing 3-Phase utility meter and rooftop Solar PV inverter to a USB-to-RS485 adapter. This enables continuous polling of true bidirectional active power (kW), power factor, and voltage with zero electrical drift.
              </p>
            </div>

            {/* Block 3 */}
            <div className="p-4 rounded-xl bg-surface-base border border-border-subtle shadow-2xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                <h4 className="text-xs font-bold font-telemetry-mono text-forest-deep uppercase tracking-wider">
                  Microclimate Perception
                </h4>
              </div>
              <p className="text-xs font-body-sm text-on-surface-variant leading-relaxed">
                The BME280 sensor provides calibrated temperature and humidity over I2C (Pin 3 SDA, Pin 5 SCL), while the PMS5003 laser sensor streams particulate counts (PM2.5/PM10) over UART (Pins 8 &amp; 10) to compute dynamic thermal comfort without overcooling empty spaces.
              </p>
            </div>

            {/* Block 4 */}
            <div className="p-4 rounded-xl bg-surface-base border border-border-subtle shadow-2xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <h4 className="text-xs font-bold font-telemetry-mono text-forest-deep uppercase tracking-wider">
                  Fail-Safe Relay Actuation
                </h4>
              </div>
              <p className="text-xs font-body-sm text-on-surface-variant leading-relaxed">
                Optocoupled relays driven by Raspberry Pi GPIO 17, 27, and 22 actuate heavy HVAC contactors and auxiliary lighting/fan banks. An isolated external 5V/3A DC power supply prevents inductive coil kickback from interfering with the Pi’s 3.3V logic rail.
              </p>
            </div>
          </div>

          {/* Quick Specifications Strip */}
          <div className="p-3.5 bg-surface-base rounded-xl border border-border-subtle flex flex-wrap items-center justify-between text-xs font-telemetry-mono gap-3">
            <span className="text-on-surface-variant">
              <strong>Pin Configuration:</strong> I2C (GPIO 2/3) · UART (GPIO 14/15) · Relays (GPIO 17/27/22)
            </span>
            <span className="text-on-surface-variant">
              <strong>Isolation Boundary:</strong> Optocoupled Relays + Galvanically Isolated External 5V/3A DC
            </span>
            <span className="text-primary font-bold">
              Energy Saving Mode: Auto Trip on Empty Room Confirmation
            </span>
          </div>
        </div>
      </div>

      {/* Modal to view Original Schematic Diagram Sheet */}
      {showOriginalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-surface-base rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl border border-border-subtle flex flex-col max-h-[92vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-surface-subtle">
              <div>
                <h3 className="font-bold text-forest-deep text-lg">
                  Original Schematic Diagram Reference
                </h3>
                <p className="text-xs text-on-surface-variant font-telemetry-mono">
                  Asset: Assets/schematic-diagram/WhatsApp Image 2026-10-16 at 11.22.54 AM.jpeg
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowOriginalModal(false)}
                className="w-8 h-8 rounded-full bg-surface-base border border-border-subtle flex items-center justify-center text-forest-deep hover:bg-slate-200 transition-colors font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-4 overflow-auto flex justify-center bg-slate-900/10">
              <img
                src="/schematic-diagram.jpeg"
                alt="ZeroWatt Original Hardware Schematic Diagram"
                className="max-h-[70vh] object-contain rounded-lg shadow-md border border-slate-300"
              />
            </div>
            <div className="px-6 py-3 bg-surface-subtle border-t border-border-subtle flex items-center justify-between text-xs text-on-surface-variant">
              <span>Verified 1:1 hardware topology with Raspberry Pi 4 edge controller.</span>
              <button
                type="button"
                onClick={() => setShowOriginalModal(false)}
                className="px-4 py-1.5 bg-primary text-white rounded-lg font-medium text-xs hover:bg-forest-deep transition-colors"
              >
                Close Reference
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
