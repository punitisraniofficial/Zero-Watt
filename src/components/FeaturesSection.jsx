import React, { useState, useEffect } from 'react';

const featuresData = [
  {
    id: 1,
    num: '01',
    name: 'Efficient Energy Saving',
    shortName: 'Energy Saving',
    icon: 'bolt',
    tag: 'LOAD GATING & HARVESTING',
    stage: 'STAGE 05: ACT',
    description: 'Optimize energy consumption by intelligently switching off electrical loads when spaces are unoccupied.',
    benefits: [
      'Eliminates vampire and idle power draw in vacant classroom zones',
      'Lowers institutional electricity bills and daily operating overhead',
      'Extends operational lifespan of LED drivers, relays, and circulation motors'
    ],
    practicalApplication: 'Automated MOSFET PWM throttling and branch circuit relay cut-off on DevKitC ESP32-S3 across GPIO 16, 17, and 18 whenever occupancy perception flags zero presence.',
    chartTitle: 'POTENTIAL ENERGY-SAVING IMPACT',
    chartSubtitle: 'Illustrative Relative Capability Score · Hardware Benchmark Benchmark in Progress',
    metrics: [
      { label: 'Off-Peak Idle Draw Reduction', value: 92 },
      { label: 'Load Shedding Responsiveness', value: 88 },
      { label: 'Daylight PWM Dimming Yield', value: 78 },
      { label: 'Branch Circuit Isolation Safety', value: 95 }
    ]
  },
  {
    id: 2,
    num: '02',
    name: 'AI-Driven Actions',
    shortName: 'AI Actions',
    icon: 'neurology',
    tag: 'EDGE DECISION ENGINE',
    stage: 'STAGE 03: PRIORITIZE',
    description: 'Use intelligent decision-making based on occupancy information and configurable automation rules to recommend or trigger energy-saving actions.',
    benefits: [
      'Smarter automation without continuous manual teacher intervention',
      'Dynamic priority reallocation safeguarding classroom indoor air quality (P1)',
      'Adaptive load shedding balancing total demand under constrained circuit caps'
    ],
    practicalApplication: 'Cooperative finite-state machine running locally on ESP32 evaluates a 5-tier priority matrix every 250ms, dynamically yielding non-essential branch circuits.',
    chartTitle: 'AUTOMATION & ARBITRATION CAPABILITY',
    chartSubtitle: 'Illustrative Decision Engine Metric · Deterministic Edge Evaluation',
    metrics: [
      { label: 'Decision Loop Determinism', value: 96 },
      { label: 'Priority Arbitration Accuracy', value: 91 },
      { label: 'Rule Execution Speed (<10ms)', value: 98 },
      { label: 'Autonomous Fail-Safe Continuity', value: 87 }
    ]
  },
  {
    id: 3,
    num: '03',
    name: 'Smart Energy Monitoring',
    shortName: 'Energy Monitoring',
    icon: 'speed',
    tag: 'TELEMETRY & MEASUREMENT',
    stage: 'STAGE 04: ALLOCATE',
    description: 'Monitor energy usage and system activity through a centralized dashboard, helping users understand consumption patterns and identify potential inefficiencies.',
    benefits: [
      'Real-time visibility into instantaneous circuit voltage, current, and wattage',
      'Verifiable shunt measurement proving genuine physical conservation deltas',
      'Historical event logging and CSV export for institutional academic audits'
    ],
    practicalApplication: 'Calibrated INA219 high-side shunt monitor on I²C 0x40 bus samples 12V DC power bus at 100Hz with zero cloud dependency or internet delay.',
    chartTitle: 'MONITORING & TELEMETRY PRECISION',
    chartSubtitle: 'Calibrated Shunt Verification Profile · Hardware Bus Metric',
    metrics: [
      { label: 'Shunt Measurement Precision', value: 95 },
      { label: 'Sampling Fidelity (100Hz Bus)', value: 93 },
      { label: 'Telemetry Synchronization', value: 90 },
      { label: 'Audit Trail Data Completeness', value: 96 }
    ]
  },
  {
    id: 4,
    num: '04',
    name: 'Reduced Emissions',
    shortName: 'Reduced Emissions',
    icon: 'eco',
    tag: 'CARBON MITIGATION',
    stage: 'GRID RESILIENCE',
    description: 'Reduce unnecessary electricity consumption, helping lower the indirect carbon emissions associated with electricity generation.',
    benefits: [
      'Direct reduction of kilowatt-hours consumed from regional fossil-fuel grid plants',
      'Accelerates campus progress toward net-zero environmental sustainability milestones',
      'Prevents excessive parasitic transformer heat in building electrical risers'
    ],
    practicalApplication: 'Quiescent baseline throttling suppresses campus idle circuits during lecture changeovers, contributing to campus-wide peak grid load shaving.',
    chartTitle: 'POTENTIAL EMISSIONS REDUCTION PROFILE',
    chartSubtitle: 'Illustrative Carbon Abatement Estimate · Grid Factor Benchmarked',
    metrics: [
      { label: 'Indirect Carbon Abatement Potential', value: 84 },
      { label: 'Grid Peak-Shaving Capability', value: 82 },
      { label: 'Thermal Waste Suppression', value: 89 },
      { label: 'Campus Sustainability Index', value: 91 }
    ]
  },
  {
    id: 5,
    num: '05',
    name: 'Real-Time Person Detection',
    shortName: 'Person Detection',
    icon: 'center_focus_strong',
    tag: 'SPATIAL COMPUTER VISION',
    stage: 'STAGE 01: SENSE',
    description: 'Detect people within monitored spaces using camera-based computer vision to support timely and context-aware energy management.',
    benefits: [
      'Instant spatial awareness across independent classroom zones',
      'Eliminates false triggers caused by thermal drafts, sunlight beams, or moving curtains',
      'Sub-second latency ensuring seamless illumination as occupants step into pods'
    ],
    practicalApplication: 'Quantized edge vision pipeline processes camera frames on a local vision coprocessor, streaming binary presence vectors over serial UART to the ESP32 state machine.',
    chartTitle: 'DETECTION PERFORMANCE & FIDELITY',
    chartSubtitle: 'Edge Vision Latency & Reliability · Real-Time Perception Benchmarks',
    metrics: [
      { label: 'Edge Inference Latency (<50ms)', value: 94 },
      { label: 'Spatial Zone Discretization', value: 91 },
      { label: 'Thermal Artifact Immunity', value: 97 },
      { label: 'Low-Light Detection Resilience', value: 83 }
    ]
  },
  {
    id: 6,
    num: '06',
    name: 'Occupancy Estimation',
    shortName: 'Occupancy Estimation',
    icon: 'groups',
    tag: 'DENSITY & CLUSTERING',
    stage: 'STAGE 02: UNDERSTAND',
    description: 'Estimate the number of occupants in a monitored area to provide better context for energy usage and space utilization.',
    benefits: [
      'Enables proportional ventilation scaling corresponding to room occupant density',
      'Detects sparse partial utilization (e.g. 4 students occupying a 60-bench hall)',
      'Provides rich space-utilization analytics for academic facility planning'
    ],
    practicalApplication: 'Centroid cluster tracking aggregates occupant density across front podium, middle benches, and window pods, dynamically tuning SCD30 baseline ventilation fan duty cycle.',
    chartTitle: 'OCCUPANCY ESTIMATION PERFORMANCE',
    chartSubtitle: 'Cluster Density & Adaptive Scaling Metric · Privacy-First Analytics',
    metrics: [
      { label: 'Crowd Cluster Head-Count Tracking', value: 89 },
      { label: 'Ventilation Scaling Sensitivity', value: 93 },
      { label: 'Spatial Density Discretization', value: 86 },
      { label: 'Privacy Vectorization (No Cloud Feed)', value: 99 }
    ]
  },
  {
    id: 7,
    num: '07',
    name: 'Smart Alerts & Notifications',
    shortName: 'Smart Alerts',
    icon: 'notifications_active',
    tag: 'SAFETY & SYSTEM HEALTH',
    stage: 'SYSTEM HEALTH',
    description: 'Notify users about important system events, detected inactivity, energy-saving actions, and potential issues through the monitoring dashboard.',
    benefits: [
      'Immediate alert dispatch when indoor air quality deteriorates (CO₂ > 1000 ppm)',
      'Instant notifications when aggregate branch circuits exceed permitted load cap',
      'Detailed chronological telemetry logs for engineering evaluation and viva testing'
    ],
    practicalApplication: 'Autonomous interrupt service routine flags abnormal wattage excursions, trigger relay overrides, and logs timestamped events directly into the browser dashboard.',
    chartTitle: 'ALERT RESPONSIVENESS & DISPATCH',
    chartSubtitle: 'Safety Threshold Dispatch Profile · High-Priority Event Latency',
    metrics: [
      { label: 'Interrupt Dispatch Latency (<100ms)', value: 97 },
      { label: 'Air Quality Threshold Trip (1000 ppm)', value: 95 },
      { label: 'Over-Budget Safety Intercept', value: 94 },
      { label: 'Diagnostic Telemetry Capture Rate', value: 92 }
    ]
  }
];

export default function FeaturesSection() {
  // Default state: selectedFeature = null (Icon gallery only)
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [animatedBars, setAnimatedBars] = useState({});

  const handleCardClick = (featureId) => {
    // Clicking currently selected feature collapses the panel
    if (selectedFeature === featureId) {
      setSelectedFeature(null);
    } else {
      setSelectedFeature(featureId);
    }
  };

  const activeData = featuresData.find(f => f.id === selectedFeature);

  // Animate horizontal bars smoothly whenever activeData changes
  useEffect(() => {
    if (!activeData) {
      setAnimatedBars({});
      return;
    }

    // Reset bars to 0 first, then animate to target values
    const initial = {};
    activeData.metrics.forEach((_, idx) => {
      initial[idx] = 0;
    });
    setAnimatedBars(initial);

    const timer = setTimeout(() => {
      const targets = {};
      activeData.metrics.forEach((m, idx) => {
        targets[idx] = m.value;
      });
      setAnimatedBars(targets);
    }, 60);

    return () => clearTimeout(timer);
  }, [selectedFeature]);

  return (
    <section className="bg-surface-base border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 scroll-mt-20" id="features">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border-subtle pb-4">
        <div>
          <div className="text-xs font-telemetry-mono text-primary font-bold tracking-widest uppercase flex items-center gap-2">
            <span>01 / CORE SYSTEM FEATURES</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
            <span className="text-outline font-normal">7 INTERACTIVE CAPABILITIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-headline-md text-forest-deep font-bold mt-1">
            Autonomous Conservation Features
          </h2>
        </div>
        <p className="text-sm font-body-sm text-on-surface-variant max-w-xl text-left sm:text-right">
          Camera-based occupant perception combined with ESP32 edge power gating delivers context-aware efficiency without sacrificing human comfort. Click any card below to inspect capabilities.
        </p>
      </div>

      {/* 2. DEFAULT STATE — 7 ICON CARDS GALLERY ONLY */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
        {featuresData.map((f) => {
          const isSelected = selectedFeature === f.id;
          return (
            <button
              key={f.id}
              onClick={() => handleCardClick(f.id)}
              className={`group text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden select-none active:scale-[0.98] ${
                isSelected
                  ? 'bg-secondary-container/50 border-primary ring-2 ring-primary/25 shadow-md -translate-y-0.5'
                  : 'bg-surface-subtle hover:bg-white hover:border-primary/50 hover:shadow-md border-border-subtle'
              }`}
            >
              {/* Top Row: Index + Active Dot Indicator */}
              <div className="flex items-center justify-between w-full mb-3">
                <span className={`text-[10px] font-telemetry-mono font-bold tracking-wider ${
                  isSelected ? 'text-primary' : 'text-outline group-hover:text-primary transition-colors'
                }`}>
                  F{f.num}
                </span>
                <span className={`w-2 h-2 rounded-full transition-all ${
                  isSelected ? 'bg-primary ring-4 ring-primary/20 scale-110' : 'bg-border-strong group-hover:bg-primary/50'
                }`}></span>
              </div>

              {/* Icon Container */}
              <div className="my-1.5 flex items-center justify-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-primary text-surface-base shadow-sm scale-105'
                    : 'bg-surface-base border border-border-subtle text-primary group-hover:border-primary/40 group-hover:bg-secondary-container/30 group-hover:scale-105 shadow-xs'
                }`}>
                  <span className="material-symbols-outlined text-2xl">
                    {f.icon}
                  </span>
                </div>
              </div>

              {/* Feature Name */}
              <div className="mt-3 text-center w-full">
                <span className={`text-xs font-semibold block leading-tight font-body-md transition-colors ${
                  isSelected ? 'text-forest-deep font-bold' : 'text-forest-deep group-hover:text-primary'
                }`}>
                  {f.name}
                </span>
                <span className={`text-[10px] font-telemetry-mono mt-1 block transition-colors ${
                  isSelected ? 'text-primary font-bold' : 'text-outline group-hover:text-forest-deep'
                }`}>
                  {isSelected ? 'Click to Close ✕' : 'Click to View'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. INTERACTIVE FEATURE DETAIL PANEL (EXPANDS UPON SELECTION) */}
      {activeData && (
        <div className="bg-surface-subtle border-2 border-primary/40 rounded-2xl p-5 sm:p-7 shadow-lg space-y-6 transition-all duration-300 animate-fadeIn">
          {/* Active Feature Banner Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary text-surface-base flex items-center justify-center shadow-sm shrink-0">
                <span className="material-symbols-outlined text-2xl">{activeData.icon}</span>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-telemetry-mono font-bold bg-secondary-container text-on-secondary-container uppercase">
                    FEATURE {activeData.num}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-telemetry-mono font-semibold bg-surface-base border border-border-subtle text-outline uppercase">
                    {activeData.tag}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-telemetry-mono font-bold bg-surface-base border border-border-subtle text-primary uppercase">
                    {activeData.stage}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-headline-md font-bold text-forest-deep mt-1">
                  {activeData.name}
                </h3>
              </div>
            </div>

            <button
              onClick={() => setSelectedFeature(null)}
              className="self-start sm:self-center px-3 py-1.5 rounded-lg bg-surface-base hover:bg-white border border-border-subtle text-xs font-telemetry-mono text-outline hover:text-forest-deep transition flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">close</span>
              <span>Collapse Panel</span>
            </button>
          </div>

          {/* TWO-COLUMN DETAILS GRID: LEFT = BAR GRAPH, RIGHT = DESCRIPTION & BENEFITS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* LEFT 6 COLS: Horizontal Bar Graph */}
            <div className="lg:col-span-6 bg-surface-base border border-border-subtle rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between border-b border-border-subtle pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">bar_chart</span>
                    <h4 className="text-xs font-bold text-forest-deep uppercase font-telemetry-mono tracking-wider">
                      {activeData.chartTitle}
                    </h4>
                  </div>
                  <span className="text-[10px] font-telemetry-mono font-semibold text-outline">
                    RELATIVE SCALE (%)
                  </span>
                </div>

                <p className="text-[11px] font-telemetry-mono text-outline mb-4">
                  {activeData.chartSubtitle}
                </p>

                {/* Animated Horizontal Bars */}
                <div className="space-y-3.5">
                  {activeData.metrics.map((m, idx) => {
                    const currentVal = animatedBars[idx] ?? 0;
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-telemetry-mono">
                          <span className="text-forest-deep font-medium">{m.label}</span>
                          <span className="font-bold text-primary">{currentVal}%</span>
                        </div>
                        <div className="w-full bg-surface-muted h-3 rounded-full overflow-hidden p-0.5 border border-border-subtle">
                          <div
                            className="bg-gradient-to-r from-primary to-primary-container h-full rounded-full transition-all duration-700 ease-out shadow-xs"
                            style={{ width: `${currentVal}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Data Integrity / Scientific Notice */}
              <div className="bg-surface-subtle p-3 rounded-lg border border-border-subtle flex items-start gap-2.5 text-[11px] font-telemetry-mono text-outline leading-tight">
                <span className="material-symbols-outlined text-sm text-alarm-amber shrink-0 mt-0.5">verified_user</span>
                <span>
                  <strong>Data Integrity Protocol:</strong> The bars above illustrate relative capability importance. Real shunt wattage, voltage, and current deltas are recorded independently in Section 04 Evidence Engine via calibrated INA219 measurements.
                </span>
              </div>
            </div>

            {/* RIGHT 6 COLS: Description, Key Benefits & Practical Implementation */}
            <div className="lg:col-span-6 bg-surface-base border border-border-subtle rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                {/* Description */}
                <div>
                  <span className="text-[11px] font-telemetry-mono text-outline uppercase tracking-wider block mb-1">
                    System Architecture Overview
                  </span>
                  <p className="text-sm font-body-md text-forest-deep leading-relaxed">
                    {activeData.description}
                  </p>
                </div>

                {/* Benefits List */}
                <div>
                  <span className="text-[11px] font-telemetry-mono text-outline uppercase tracking-wider block mb-2">
                    Verified Operational Benefits
                  </span>
                  <div className="space-y-2">
                    {activeData.benefits.map((b, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-body-md text-on-surface-variant">
                        <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check_circle</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical Implementation & Hardware Integration */}
                <div className="bg-secondary-container/30 border border-secondary/20 p-3.5 rounded-lg space-y-1">
                  <span className="text-[11px] font-telemetry-mono text-forest-deep font-bold tracking-wider uppercase block flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-primary">developer_board</span>
                    Hardware & Edge Implementation
                  </span>
                  <p className="text-xs font-telemetry-mono text-on-surface-variant leading-relaxed">
                    {activeData.practicalApplication}
                  </p>
                </div>
              </div>

              {/* Bottom Quick Action Anchor */}
              <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-xs font-telemetry-mono">
                <span className="text-outline">Live hardware testable in simulator:</span>
                <a
                  href="#live-simulator"
                  className="text-primary hover:text-primary-hover font-bold inline-flex items-center gap-1 underline"
                >
                  Jump to 03 / Live System →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
