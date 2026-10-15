import React, { useState, useEffect, useRef } from 'react';

export const workplaceProblemsData = [
  {
    id: 1,
    num: '01',
    category: 'LIGHTING & PERIPHERAL IDLE DRAW',
    title: 'Empty-Space Waste',
    headline: 'Lights and compatible equipment remain active in unused offices and meeting rooms.',
    shortDescription: 'Lights and compatible equipment remain active in unused offices and meeting rooms.',
    tagline: 'Equipment running after meetings and shifts end',
    icon: 'corporate_fare',
    statusBadge: 'BENCH VERIFIED · RELAY GATING ACTIVE',
    badgeType: 'implemented',
    // 10 Detailed Content Sections
    summary: 'Lighting, secondary displays, and circulation equipment frequently stay fully energized long after employees depart, meetings conclude, or evening work shifts end — wasting significant kilowatt-hours across vacant workplace floors.',
    realWorkplaceScenario: 'In a corporate office tower floor with 12 focus rooms and 4 conference spaces, a cross-functional strategy meeting in Conference Room B concludes 20 minutes early at 11:40 AM. The 8 team members leave for an off-site lunch. The 10 recessed LED troffers, 2 auxiliary fans, and high-lumen video conference display remain fully energized for 3.5 continuous hours until custodial staff make evening security rounds at 7:30 PM.',
    whyItHappens: 'Commercial wall switches are often clustered behind reception desks or inside service utility closets away from room exits. Departing occupants assume incoming colleagues or centralized BMS time-clock schedules will manage the circuits. Fixed time-clock schedules cannot account for early dismissals or cancelled bookings.',
    engineeringChallenge: 'Designing occupancy detection with appropriate timeout rules and hysteresis to avoid nuisance shut-offs during stationary tasks (such as focused desk work or quiet reading) while eliminating multi-hour vacancy gaps without invasive surveillance.',
    howZeroWattResponds: 'ZeroWatt implements a two-stage occupancy-timeout rule. When passive infrared and micro-motion sensing confirm zero occupancy beyond a calibrated grace window (e.g., 8–10 minutes), the controller first signals an ambient dimming warning, then cleanly de-energizes branch circuit relays and auxiliary equipment, preventing idle consumption while protecting against abrupt shutoffs.',
    sensorsAndComponents: [
      { name: 'Motion Transducers', spec: 'Wide-angle PIR sensors (HC-SR501/AM312) on GPIO 32, 33, 25 with 120° Fresnel optics' },
      { name: 'Core Controller', spec: 'ESP32-S3 DevKitC (Dual-Core LX7 @ 240 MHz) running deterministic FreeRTOS state machines' },
      { name: 'Switching Actuators', spec: 'Optocoupled 10A/250VAC zero-crossing relays with snubber networks for inductive load protection' },
      { name: 'Hardware Interface', spec: 'Dry-contact auxiliary inputs for integration with building sub-panels and wall switches' }
    ],
    validationMethod: 'Operating hours, idle runtime (minutes elapsed between verified vacancy and contactor disengagement), and active branch power (W) are continuously metered and compared against unmanaged baseline runtime profiles.',
    limitationsAndSafeguards: 'Physical SPDT manual override switches allow occupants to mechanically force lighting ON independently of microcontroller power. Entry grace periods prevent dark entries, and emergency egress illumination remains permanently wired on unswitched circuits.'
  },
  {
    id: 2,
    num: '02',
    category: 'SPATIAL LOAD ARBITRATION',
    title: 'Occupancy Blindness',
    headline: 'Building controls miss how people distribute themselves across different work zones.',
    shortDescription: 'Building controls miss how people distribute themselves across different work zones.',
    tagline: 'Whole-floor energy penalties for localized presence',
    icon: 'splitscreen',
    statusBadge: 'BENCH VERIFIED · 3-ZONE ARBITRATION',
    badgeType: 'implemented',
    // 10 Detailed Content Sections
    summary: 'Aggregated whole-building or whole-floor occupancy metrics cannot resolve how workers actually distribute themselves between focus pods, collaboration zones, and quiet desk banks.',
    realWorkplaceScenario: 'On a hybrid-schedule Friday afternoon in a 100-desk open-plan tech office, only 12 engineers are working in-office, clustered around the central collaborative bench. Because the floor’s ceiling electrical distribution is wired to two large breaker circuits, all 650 square meters of office space — including 88 empty cubicles and 6 vacant perimeter breakout areas — remain fully illuminated and ventilated at full capacity for 12 occupants.',
    whyItHappens: 'Legacy commercial electrical conduit designs group 40–60 fixtures onto single circuit breakers to minimize initial wiring costs, and building automation systems (BMS) lack granular spatial zoning below the floor or wing level.',
    engineeringChallenge: 'Achieving granular zone-by-zone awareness and control without retrenching structural conduits, violating electrical codes, or resorting to invasive facial-recognition optical cameras.',
    howZeroWattResponds: 'ZeroWatt segments open workspaces into discrete micro-zones (e.g., Zone 1 Collaborative Pods, Zone 2 Central Desks, Zone 3 Perimeter Bays). Using privacy-conscious directional PIR and micro-motion sensing, it detects localized presence and activates only the corresponding zone relays and PWM lighting drivers, shedding empty zones while workers remain comfortably supported.',
    sensorsAndComponents: [
      { name: 'Zoned Motion Sensing', spec: 'Directional PIR sensors with sector beam limiters and non-imaging micro-motion detection' },
      { name: 'Zoned PWM Drivers', spec: 'Multi-channel MOSFET gate drivers (GPIO 16, 17, 18 for lights; 19, 23, 26 for circulation fans)' },
      { name: 'Bus Multiplexing', spec: 'TCA9548A I²C multiplexer for isolated multi-sensor environmental telemetry' },
      { name: 'Spatial Logic Engine', spec: 'Local firmware coordinate mapping executed directly on ESP32-S3 without cloud latency' }
    ],
    validationMethod: 'Zone-by-zone power draw is logged independently (e.g., 3.8W front-zone active vs. 11.5W whole-room prototype benchmark), establishing clear load reduction when only partial zones are occupied.',
    limitationsAndSafeguards: 'Zone-level switching depends on independently controllable circuits or smart dimming ballasts (DALI/0-10V). Life-safety egress pathways remain unswitched. Note: Privacy-conscious presence detection is employed; cameras or precise people counters are not mandatory for core zone gating.'
  },
  {
    id: 3,
    num: '03',
    category: 'NATURAL LIGHT HARVESTING',
    title: 'Daylight Neglect',
    headline: 'Artificial lighting operates unnecessarily when natural light is adequate.',
    shortDescription: 'Artificial lighting operates unnecessarily when natural light is adequate.',
    tagline: 'Perimeter luminaires competing with abundant daylight',
    icon: 'wb_sunny',
    statusBadge: 'BENCH VERIFIED · CLOSED-LOOP PWM',
    badgeType: 'implemented',
    // 10 Detailed Content Sections
    summary: 'Interior architectural luminaires frequently run at maximum continuous wattage even when large perimeter curtain glass walls provide more than enough ambient sunlight to meet work-plane illuminance standards.',
    realWorkplaceScenario: 'A commercial office suite features east- and south-facing floor-to-ceiling glass facades that flood perimeter desk rows with over 850 lux of natural solar light between 9:00 AM and 1:30 PM. Despite this abundant daylight, the overhead 50W LED troffers remain switched on at 100% rated output all morning, causing screen glare, visual fatigue, and continuous wasted kilowatt-hours.',
    whyItHappens: 'Standard wall switches offer only binary on/off control with zero ambient light feedback. In addition, manual window blinds are adjusted inconsistently, and facility teams avoid manual stepped switching to prevent tenant distraction.',
    engineeringChallenge: 'Achieving smooth, continuous daylight harvesting that modulates artificial light output without perceptible steps, visible camera flicker, or rapid cycling during passing cloud transients.',
    howZeroWattResponds: 'ZeroWatt continuously measures natural desk-plane illuminance using calibrated ambient-light sensors positioned along window perimeter zones. When incoming daylight rises, the ESP32 dynamically dims the artificial luminaire PWM duty cycle (from 100% down to 20% or off), harvesting sunlight while preserving an optimal 400–500 lux working plane.',
    sensorsAndComponents: [
      { name: 'Ambient Light Transducers', spec: 'Calibrated LDR voltage dividers and BH1750 digital lux sensors on ADC1 (GPIO 34, 35, 36)' },
      { name: 'Flicker-Free PWM', spec: '16-bit LED PWM @ 25 kHz frequency to ensure zero camera strobe and silent inductor operation' },
      { name: 'Transient Filtering', spec: 'Exponential moving-average low-pass filter in firmware to ignore transient cloud cover' },
      { name: 'Target Reference', spec: 'Configurable 450-lux closed-loop target illuminance setpoint' }
    ],
    validationMethod: 'Continuous dual-curve telemetry records ambient lux levels against artificial LED PWM duty cycle percentages. Working plane illuminance is verified with a calibrated handheld lux meter across morning, midday, and overcast conditions.',
    limitationsAndSafeguards: 'If ambient light sensors disconnect or read zero voltage, the firmware immediately defaults to 100% full illumination. Automated daylight dimming requires compatible 0-10V, PWM, or DALI commercial lighting drivers.'
  },
  {
    id: 4,
    num: '04',
    category: 'INDOOR ENVIRONMENTAL QUALITY',
    title: 'Comfort vs. Efficiency',
    headline: 'Reducing energy consumption must not compromise workplace comfort or ventilation.',
    shortDescription: 'Reducing energy consumption must not compromise workplace comfort or ventilation.',
    tagline: 'Balancing indoor air quality with demand management',
    icon: 'thermostat',
    statusBadge: 'PARTIALLY IMPLEMENTED · SENSORS ACTIVE',
    badgeType: 'partial',
    // 10 Detailed Content Sections
    summary: 'Aggressive energy curtailment strategies that indiscriminately throttle cooling, airflow, or fresh ventilation risk severe indoor air quality (IAQ) degradation, directly impacting employee health and productivity.',
    realWorkplaceScenario: 'To reduce peak electrical demand charges, a commercial office building enforces an automated HVAC fan-speed cut in an executive boardroom during an afternoon budget session. As 14 people deliberate for two hours behind closed doors, CO₂ levels escalate past 1,600 ppm and temperatures rise to 28°C, leading to collective drowsiness, headaches, and degraded cognitive function.',
    whyItHappens: 'Standard occupancy sensors register motion alone, offering zero visibility into air composition, humidity, or respiration buildup. Energy reduction is managed in isolation from human health and thermal comfort standards.',
    engineeringChallenge: 'Decoupling simple presence from environmental demand, measuring multi-parameter indoor air quality (CO₂, temperature, humidity), and coordinating mechanical ventilation within constrained power budgets.',
    howZeroWattResponds: 'ZeroWatt integrates an industrial NDIR CO₂ and temperature/humidity sensor cluster. When CO₂ levels approach ASHRAE 62.1 thresholds (e.g., > 1,000 ppm), the system elevates fresh-air ventilation to Priority 1 (P1). It proactively sheds non-critical ambient loads to reserve power for ventilation dampers, safeguarding air quality and thermal comfort before all else.',
    sensorsAndComponents: [
      { name: 'Environmental Cluster', spec: 'Sensirion SCD30 dual-channel NDIR CO₂, temperature, and relative humidity module on I²C (0x61)' },
      { name: 'Ventilation Actuation', spec: 'Optocoupled auxiliary ventilation relay + 0-10V motorized damper actuator interface' },
      { name: 'Comfort Standards', spec: 'ASHRAE 55 Adaptive Thermal Comfort and Dewpoint Enthalpy routines in firmware' },
      { name: 'Watchdog Supervisor', spec: 'Hardware brownout detector and FreeRTOS task starvation monitor' }
    ],
    validationMethod: 'Telemetry curves track CO₂ concentrations (ppm), ambient temperature (°C), and relative humidity (%) alongside ventilation relay modulation and electrical wattage, verifying that CO₂ stays within healthy working limits.',
    limitationsAndSafeguards: 'Life-safety ventilation and minimum fresh-air baselines (15–20%) are hardcoded into firmware and are NEVER disabled for energy optimization. Occupants retain full manual override over thermostat settings and fan speeds.'
  },
  {
    id: 5,
    num: '05',
    category: 'DYNAMIC DEMAND ARBITRATION',
    title: 'Disconnected Controls',
    headline: 'Independent systems lack coordinated decisions based on actual workplace demand.',
    shortDescription: 'Independent systems lack coordinated decisions based on actual workplace demand.',
    tagline: 'Loads competing blindly under constrained supply',
    icon: 'alt_route',
    statusBadge: 'BENCH VERIFIED · 5-TIER PRIORITY SCHEDULER',
    badgeType: 'implemented',
    // 10 Detailed Content Sections
    summary: 'Commercial workplaces operate multiple independent electrical sub-systems — lighting, ventilation, cooling, and office peripherals — that operate in silos without a shared, context-aware demand hierarchy.',
    realWorkplaceScenario: 'During a summer grid peak event in a commercial business district, a corporate building transitions to rooftop solar and battery inverter power with a strict 20kW feeder cap. Because lighting, hot-desk displays, and chiller pumps run without coordination, secondary accent lights and empty-desk monitors pull maximum current alongside essential cooling, tripping the main breaker and causing an unexpected partial blackout.',
    whyItHappens: 'Siloed electrical sub-systems from different vendors lack a unified local communication bus and have no mechanism to negotiate priority when electrical capacity is constrained.',
    engineeringChallenge: 'Developing deterministic, local-first priority arbitration that executes in millisecond intervals to maintain power consumption below strict caps without causing flickering, race conditions, or cloud lag.',
    howZeroWattResponds: 'ZeroWatt deploys an Edge Demand Arbiter running on the ESP32 that orchestrates active loads across a 5-tier context-aware priority stack: P1: Life Safety & IAQ Ventilation (CO₂ > 1000 ppm); P2: Occupant Thermal Comfort (occupied zone fans); P3: Task Lighting (occupied desks, daylight-harvested); P4: Normal Room Service (ambient lighting & circulation); P5: Low-Value & Idle Loads (empty desk accessories, accent lighting). When power capacity drops, P5 is immediately shed first, safeguarding essential operations.',
    sensorsAndComponents: [
      { name: 'Telemetry Monitor', spec: 'Texas Instruments INA219 high-side I²C bidirectional current/power monitor' },
      { name: 'Arbitration Scheduler', spec: 'Deterministic priority stack running in a dedicated FreeRTOS high-priority task loop' },
      { name: 'Dynamic Budget Dial', spec: 'Hardware encoder and software register for simulated or BMS grid feeder limits' },
      { name: 'Isolated Contactors', spec: 'Zero-crossing relays with optical galvanic isolation preventing electrical back-feed' }
    ],
    validationMethod: 'Dynamic budget step-down tests verify that reducing the power budget cap triggers the sub-250ms shed sequence of P5 and P4 loads while leaving P1 ventilation and P2 comfort loads uninterrupted.',
    limitationsAndSafeguards: 'Controllability is strictly limited to circuits equipped with compatible relays or dimming interfaces; emergency illumination circuits are excluded from load shedding. Rule-based deterministic scheduling is clearly distinguished from prospective machine-learning features.'
  },
  {
    id: 6,
    num: '06',
    category: 'CALIBRATED ELECTRICAL TELEMETRY',
    title: 'Unverified Savings',
    headline: 'Without reliable energy measurements, efficiency improvements remain difficult to prove.',
    shortDescription: 'Without reliable energy measurements, efficiency improvements remain difficult to prove.',
    tagline: 'Hypothetical claims without calibrated physical metering',
    icon: 'fact_check',
    statusBadge: 'BENCH VERIFIED · INA219 SHUNT TELEMETRY',
    badgeType: 'implemented',
    // 10 Detailed Content Sections
    summary: 'Many building energy management products claim substantial percentage savings based on theoretical nameplate formulas rather than calibrated, continuous electrical telemetry at the actual circuit branch.',
    realWorkplaceScenario: 'A commercial property management firm installs automated lighting schedules across three office floors and publishes a 40% energy reduction claim in its annual ESG report by multiplying fixture nameplate ratings by scheduled off-hours. A subsequent utility billing audit reveals true savings were under 5% — because unmetered standby draws, tenant overrides, and line voltage variations were entirely overlooked.',
    whyItHappens: 'Relying on static manufacturer datasheets and timetable assumptions rather than measuring physical voltage, current, and true active power directly at the load branch.',
    engineeringChallenge: 'Implementing high-precision, tamper-evident electrical metering with negligible sensor power consumption, galvanic isolation, and verifiable baseline comparisons.',
    howZeroWattResponds: 'ZeroWatt operates on a strict empirical principle: "Measure first. Claim later." Every control event — whether daylight harvesting, vacancy shutoff, or priority load-shedding — is paired with direct voltage and current measurement across calibrated shunt resistors. Real-time active wattage is continuously logged and compared against baseline operating conditions without fabricated savings claims.',
    sensorsAndComponents: [
      { name: 'Precision Shunt Resistor', spec: 'High-precision 0.1Ω 1% 2W metal foil shunt resistor on 12V DC power distribution bus' },
      { name: 'Digital Power Monitor', spec: 'Texas Instruments INA219 (12-bit ADC, programmable PGA, I²C @ 0x40)' },
      { name: 'Persistent Telemetry Log', spec: 'Local circular telemetry buffer stored on SPI Flash memory with real-time CSV export' },
      { name: 'Benchmark Calibration', spec: 'Dual-calibrated against laboratory-grade Keysight 6.5-digit benchtop multimeter' }
    ],
    validationMethod: 'Side-by-side verification comparing INA219 telemetry logs against a laboratory-grade Keysight digital multimeter. Transparent event logging with timestamped voltage, current, and active wattage deltas for every switching event.',
    limitationsAndSafeguards: 'Low-voltage DC shunt monitoring guarantees galvanic isolation and operator safety on the benchtop prototype; commercial AC building retrofits require certified DIN-rail smart energy meters with CT clamps (e.g. PZEM-004T). Savings claims are strictly limited to empirically measured data.'
  }
];

export const problemsData = workplaceProblemsData;

export default function TheProblemSection() {
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const lastActiveElementRef = useRef(null);

  const activeProblem = workplaceProblemsData.find((p) => p.id === selectedProblemId) || null;

  // Handle Card Click
  const handleSelectProblem = (id) => {
    lastActiveElementRef.current = document.activeElement;
    setSelectedProblemId(id);
    setIsNavDrawerOpen(false);

    // Focus panel smoothly without disorienting jump
    setTimeout(() => {
      if (panelRef.current) {
        panelRef.current.focus({ preventScroll: true });
      }
    }, 50);
  };

  const handleClose = () => {
    setSelectedProblemId(null);
    setIsNavDrawerOpen(false);
    if (lastActiveElementRef.current && typeof lastActiveElementRef.current.focus === 'function') {
      lastActiveElementRef.current.focus();
    }
  };

  const handleNext = () => {
    if (!selectedProblemId) return;
    const nextId = selectedProblemId === 6 ? 1 : selectedProblemId + 1;
    setSelectedProblemId(nextId);
  };

  const handlePrev = () => {
    if (!selectedProblemId) return;
    const prevId = selectedProblemId === 1 ? 6 : selectedProblemId - 1;
    setSelectedProblemId(prevId);
  };

  // Keyboard navigation: Escape closes panel/drawer, ArrowLeft/ArrowRight navigates
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedProblemId !== null) {
        if (e.key === 'Escape') {
          e.preventDefault();
          if (isNavDrawerOpen) {
            setIsNavDrawerOpen(false);
          } else {
            handleClose();
          }
        } else if (e.key === 'ArrowRight' && !isNavDrawerOpen) {
          handleNext();
        } else if (e.key === 'ArrowLeft' && !isNavDrawerOpen) {
          handlePrev();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProblemId, isNavDrawerOpen]);

  return (
    <section 
      ref={sectionRef} 
      id="problem" 
      className="space-y-8 scroll-mt-20 relative"
      aria-labelledby="problem-heading"
    >
      {/* 1. HERO & SECTION IDENTITY */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-2">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-telemetry-mono text-primary font-bold tracking-widest uppercase">
                02 / THE PROBLEM
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
              <span className="text-xs font-telemetry-mono text-outline uppercase tracking-wider">
                COMMERCIAL WORKPLACE CONSTRAINTS
              </span>
            </div>

            <h2 
              id="problem-heading" 
              className="text-3xl sm:text-4xl lg:text-5xl font-serif text-forest-deep tracking-tight font-normal leading-[1.15]"
            >
              Workspaces change.<br />
              <span className="italic font-serif relative inline-block">
                Energy systems don't keep up.
                <span className="absolute bottom-1 left-0 w-full h-[2px] bg-[#E58B24]/40 rounded-full"></span>
              </span>
            </h2>
          </div>

          <div className="max-w-md space-y-2">
            <p className="text-sm font-body-md text-on-surface-variant leading-relaxed">
              People move between desks and meeting rooms. Daylight changes throughout the day. Equipment keeps running even when demand disappears. Most buildings still rely on controls that cannot respond intelligently to changing workplace conditions.
            </p>
          </div>
        </div>

        {/* Introductory Strip: WHY THIS SECTION EXISTS */}
        <div className="bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl px-4 py-3 flex flex-wrap items-center gap-3 text-xs shadow-2xs">
          <span className="font-telemetry-mono font-bold text-[#92400E] uppercase tracking-wider text-[11px] px-2 py-0.5 rounded bg-[#FEF3C7] border border-[#FDE68A] shrink-0">
            WHY THIS SECTION EXISTS
          </span>
          <span className="text-[#57534E] font-body-sm leading-normal">
            ZeroWatt aims to bridge the gap between how workplaces actually operate and how their energy is consumed — combining occupancy awareness, environmental sensing, intelligent control and measurable results.
          </span>
        </div>
      </div>

      {/* 2 & 3. SIX WORKPLACE PROBLEM CARDS & SPLIT-PANEL SYSTEM */}
      {!selectedProblemId ? (
        /* DEFAULT STATE — 6 WORKPLACE PROBLEM CARDS IN 3-COLUMN DESKTOP GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {workplaceProblemsData.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectProblem(item.id)}
              className="group text-left bg-surface-base border border-border-subtle hover:border-primary/50 hover:shadow-md rounded-2xl p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden select-none active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-primary/40"
              aria-label={`Explore Workplace Problem ${item.num}: ${item.title}`}
            >
              {/* Subtle top-right ambient accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full pointer-events-none group-hover:from-primary/10 transition-colors"></div>

              <div>
                {/* Top Row: Identifier + Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-telemetry-mono font-bold text-primary tracking-widest px-2.5 py-1 rounded-full bg-secondary-container/60 border border-secondary-container">
                      {item.num}
                    </span>
                    <span className="text-[10px] font-telemetry-mono text-outline uppercase tracking-wider hidden sm:inline">
                      {item.category.split('&')[0]}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-border-subtle group-hover:border-primary/30 group-hover:bg-white flex items-center justify-center transition-colors shadow-2xs">
                    <span className="material-symbols-outlined text-forest-deep text-xl group-hover:text-primary transition-colors">
                      {item.icon}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-headline-md font-bold text-forest-deep tracking-tight group-hover:text-primary transition-colors mb-2">
                  {item.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm font-body-sm text-on-surface-variant leading-relaxed line-clamp-3">
                  {item.shortDescription}
                </p>
              </div>

              {/* Bottom Affordance: CLICK TO EXPLORE */}
              <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between">
                <span className="text-[11px] font-telemetry-mono font-bold tracking-wider text-outline group-hover:text-forest-deep transition-colors flex items-center gap-1.5 uppercase">
                  <span>CLICK TO EXPLORE</span>
                </span>
                <span className="w-7 h-7 rounded-full bg-surface-subtle group-hover:bg-primary group-hover:text-white text-forest-deep flex items-center justify-center transition-all duration-200 group-hover:translate-x-0.5">
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* SPLIT-PANEL INTERFACE (DESKTOP: Left Visible Cards / Right Detail Panel ~44%) */
        <div className="space-y-4">
          {/* Top Quick Breadcrumb & Return Bar */}
          <div className="flex items-center justify-between bg-surface-base border border-border-subtle rounded-xl px-4 py-2.5 text-xs font-telemetry-mono shadow-2xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-forest-deep font-semibold transition cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                <span>All 6 Workplace Issues</span>
              </button>
              <span className="text-outline">/</span>
              <span className="text-primary font-bold">
                {activeProblem.num} — {activeProblem.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsNavDrawerOpen(!isNavDrawerOpen)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-telemetry-mono font-semibold transition cursor-pointer ${
                  isNavDrawerOpen
                    ? 'bg-forest-deep text-white border-forest-deep'
                    : 'bg-surface-subtle hover:bg-white text-forest-deep border-border-subtle'
                }`}
                title="Toggle Workplace Problem Index"
                aria-expanded={isNavDrawerOpen}
              >
                <span className="material-symbols-outlined text-sm">menu</span>
                <span className="hidden sm:inline">Problem Index</span>
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="p-1 rounded-md text-on-surface-variant hover:text-forest-deep hover:bg-surface-subtle transition cursor-pointer"
                aria-label="Close explanation panel"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          </div>

          {/* MAIN SPLIT LAYOUT (Left: 54% Cards List, Right: 46% Detail Panel) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: Problem Cards Strip (5 cols on lg) */}
            <div className="lg:col-span-5 space-y-2.5">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-telemetry-mono text-outline uppercase tracking-wider font-semibold">
                  WORKPLACE CHALLENGES (01–06)
                </span>
                <span className="text-[11px] font-telemetry-mono text-outline">
                  {activeProblem.id} of 6 Selected
                </span>
              </div>

              <div className="space-y-2.5 max-h-[660px] overflow-y-auto pr-1">
                {workplaceProblemsData.map((item) => {
                  const isSelected = item.id === selectedProblemId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectProblem(item.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 select-none ${
                        isSelected
                          ? 'bg-secondary-container/50 border-primary ring-2 ring-primary/25 shadow-sm'
                          : 'bg-surface-base hover:bg-surface-subtle border-border-subtle'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`text-xs font-telemetry-mono font-bold px-2 py-0.5 rounded ${
                          isSelected ? 'bg-primary text-white' : 'bg-surface-subtle text-outline'
                        }`}>
                          {item.num}
                        </span>
                        <div className="min-w-0">
                          <p className={`text-xs font-headline-md font-bold truncate ${
                            isSelected ? 'text-forest-deep' : 'text-on-surface'
                          }`}>
                            {item.title}
                          </p>
                          <p className="text-[11px] font-body-sm text-on-surface-variant truncate">
                            {item.shortDescription}
                          </p>
                        </div>
                      </div>

                      <span className={`material-symbols-outlined text-base shrink-0 ${
                        isSelected ? 'text-primary' : 'text-outline'
                      }`}>
                        {isSelected ? 'arrow_circle_right' : item.icon}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="p-3 bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl text-[11px] font-telemetry-mono text-[#57534E] flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#92400E]">keyboard</span>
                <span>Keyboard controls: <kbd className="bg-white px-1.5 py-0.5 border border-[#E7E0D3] rounded text-[10px]">←</kbd> and <kbd className="bg-white px-1.5 py-0.5 border border-[#E7E0D3] rounded text-[10px]">→</kbd> to cycle</span>
              </div>
            </div>

            {/* RIGHT COLUMN: Full Explanation Detail Panel (7 cols on lg, approx 45-48% width) */}
            <div 
              ref={panelRef}
              tabIndex={-1}
              className="lg:col-span-7 bg-surface-base border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 max-h-[760px] overflow-y-auto focus:outline-none"
            >
              {/* 1 & 2. Panel Header: Problem Number, Category & Large Editorial Heading */}
              <div className="border-b border-border-subtle pb-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-telemetry-mono font-bold text-primary px-2.5 py-1 rounded-full bg-secondary-container/60 border border-secondary-container">
                      PROBLEM {activeProblem.num}
                    </span>
                    <span className="text-[11px] font-telemetry-mono text-outline font-semibold uppercase tracking-wider">
                      {activeProblem.category}
                    </span>
                  </div>

                  {/* 11 & 12. Controls: Prev, Next, Close */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border-subtle bg-surface-subtle hover:bg-white text-xs font-telemetry-mono text-forest-deep transition cursor-pointer"
                      title="Previous Workplace Problem"
                    >
                      <span className="material-symbols-outlined text-sm">arrow_back</span>
                      <span className="hidden sm:inline">Prev</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border-subtle bg-surface-subtle hover:bg-white text-xs font-telemetry-mono text-forest-deep transition cursor-pointer"
                      title="Next Workplace Problem"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="p-1 rounded-lg border border-border-subtle hover:bg-surface-subtle text-outline hover:text-forest-deep transition cursor-pointer ml-1"
                      title="Close Detail Panel (Esc)"
                    >
                      <span className="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-1">
                  <div className="w-12 h-12 rounded-xl bg-secondary-container/50 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-forest-deep text-2xl">
                      {activeProblem.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-serif text-forest-deep font-bold tracking-tight leading-snug">
                      {activeProblem.headline}
                    </h3>
                    <p className="text-xs font-telemetry-mono text-primary font-semibold mt-1">
                      {activeProblem.statusBadge}
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. CONCISE SUMMARY */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-telemetry-mono text-outline font-bold uppercase tracking-wider block">
                  Summary
                </span>
                <p className="text-sm font-body-md text-forest-deep leading-relaxed bg-surface-subtle p-3.5 rounded-xl border border-border-subtle">
                  {activeProblem.summary}
                </p>
              </div>

              {/* 4. WHAT HAPPENS IN A REAL WORKPLACE */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-telemetry-mono text-primary font-bold uppercase tracking-wider block">
                    What happens in a real workplace
                  </span>
                  <span className="text-[10px] font-telemetry-mono text-outline">COMMERCIAL OFFICE CONTEXT</span>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7E0D3] space-y-2">
                  <p className="text-xs sm:text-sm font-body-sm text-[#57534E] leading-relaxed">
                    {activeProblem.realWorkplaceScenario}
                  </p>
                </div>
              </div>

              {/* 5 & 6. WHY IT HAPPENS & THE ENGINEERING CHALLENGE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-telemetry-mono text-outline font-bold uppercase tracking-wider block">
                    Why it happens
                  </span>
                  <div className="p-3.5 rounded-xl bg-surface-subtle border border-border-subtle h-full">
                    <p className="text-xs font-body-sm text-on-surface-variant leading-relaxed">
                      {activeProblem.whyItHappens}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-telemetry-mono text-outline font-bold uppercase tracking-wider block">
                    The engineering challenge
                  </span>
                  <div className="p-3.5 rounded-xl bg-surface-subtle border border-border-subtle h-full">
                    <p className="text-xs font-body-sm text-on-surface-variant leading-relaxed">
                      {activeProblem.engineeringChallenge}
                    </p>
                  </div>
                </div>
              </div>

              {/* 7. HOW ZEROWATT RESPONDS */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-telemetry-mono text-forest-deep font-bold uppercase tracking-wider block flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-sm">memory</span>
                  How ZeroWatt responds
                </span>
                <p className="text-xs sm:text-sm font-body-md text-forest-deep leading-relaxed bg-secondary-container/20 border border-secondary/20 p-4 rounded-xl">
                  {activeProblem.howZeroWattResponds}
                </p>
              </div>

              {/* 8. SENSORS AND COMPONENTS */}
              <div className="space-y-2">
                <span className="text-[11px] font-telemetry-mono text-outline font-bold uppercase tracking-wider block">
                  Sensors and components
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeProblem.sensorsAndComponents.map((hw, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-surface-subtle border border-border-subtle space-y-1">
                      <div className="text-xs font-telemetry-mono font-bold text-forest-deep flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                        <span>{hw.name}</span>
                      </div>
                      <p className="text-[11px] font-telemetry-mono text-on-surface-variant leading-tight">
                        {hw.spec}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 9. HOW WE VALIDATE IT */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-telemetry-mono text-outline font-bold uppercase tracking-wider block">
                  How we validate it
                </span>
                <div className="p-3.5 rounded-xl bg-surface-subtle border border-border-subtle space-y-1.5">
                  <p className="text-xs font-body-sm text-on-surface-variant leading-relaxed">
                    {activeProblem.validationMethod}
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-[11px] font-telemetry-mono text-primary font-semibold">
                    <span className="material-symbols-outlined text-sm">monitoring</span>
                    <span>Direct electrical validation recorded via calibrated shunt monitor</span>
                  </div>
                </div>
              </div>

              {/* 10. LIMITATIONS AND SAFEGUARDS */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-telemetry-mono text-[#92400E] font-bold uppercase tracking-wider block flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#E58B24]">security</span>
                  Limitations and safeguards
                </span>
                <div className="p-3.5 rounded-xl bg-[#FEF3C7]/40 border border-[#FDE68A] text-xs font-body-sm text-[#78350F] leading-relaxed">
                  {activeProblem.limitationsAndSafeguards}
                </div>
              </div>

              {/* Bottom Nav Action Bar */}
              <div className="pt-4 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3 text-xs font-telemetry-mono">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-3.5 py-1.5 rounded-lg border border-border-subtle bg-surface-subtle hover:bg-white text-forest-deep transition cursor-pointer font-semibold flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">grid_view</span>
                  <span>Back to Problem Grid</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-3 py-1.5 rounded-lg border border-border-subtle hover:bg-surface-subtle text-forest-deep transition cursor-pointer"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold transition cursor-pointer"
                  >
                    Next Problem →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3.B HAMBURGER NAVIGATOR MODAL / DRAWER */}
      {isNavDrawerOpen && (
        <div 
          className="fixed inset-0 z-50 bg-forest-deep/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Workplace Problem Index Navigator"
        >
          <div className="bg-surface-base border border-border-subtle rounded-2xl max-w-4xl w-full max-h-[85vh] shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-surface-subtle">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-xl">menu_book</span>
                <div>
                  <h3 className="text-base font-headline-md font-bold text-forest-deep">
                    Workplace Energy Problems — Master Index
                  </h3>
                  <span className="text-[11px] font-telemetry-mono text-outline">
                    Explore all 6 commercial building automation challenges
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsNavDrawerOpen(false)}
                className="p-1 rounded-lg hover:bg-surface-muted text-on-surface-variant hover:text-forest-deep transition cursor-pointer"
                aria-label="Close index dialog"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Split Modal Content: Left List / Right Active Preview */}
            <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
              {/* Left Column: 6 Items List */}
              <div className="md:col-span-5 p-4 border-r border-border-subtle space-y-2 overflow-y-auto max-h-[60vh] bg-surface-subtle/50">
                {workplaceProblemsData.map((p) => {
                  const isCurrent = (activeProblem && activeProblem.id === p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectProblem(p.id)}
                      className={`w-full text-left p-3 rounded-xl border transition cursor-pointer flex items-center gap-3 select-none ${
                        isCurrent
                          ? 'bg-secondary-container/60 border-primary ring-1 ring-primary'
                          : 'bg-white hover:bg-surface-subtle border-border-subtle'
                      }`}
                    >
                      <span className={`text-xs font-telemetry-mono font-bold px-2 py-0.5 rounded ${
                        isCurrent ? 'bg-primary text-white' : 'bg-surface-subtle text-outline'
                      }`}>
                        {p.num}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-forest-deep truncate">{p.title}</div>
                        <div className="text-[11px] text-on-surface-variant truncate">{p.shortDescription}</div>
                      </div>
                      <span className="material-symbols-outlined text-sm text-outline">
                        {p.icon}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Quick Preview & Deep Dive button */}
              <div className="md:col-span-7 p-6 overflow-y-auto max-h-[60vh] space-y-4 flex flex-col justify-between">
                {activeProblem ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-telemetry-mono font-bold text-primary px-2 py-0.5 rounded bg-secondary-container">
                        {activeProblem.num}
                      </span>
                      <h4 className="text-xl font-serif text-forest-deep font-bold">
                        {activeProblem.title}
                      </h4>
                    </div>

                    <p className="text-xs font-body-sm text-on-surface-variant leading-relaxed">
                      {activeProblem.shortDescription}
                    </p>

                    <div className="p-3 bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl text-xs space-y-1">
                      <span className="text-[10px] font-telemetry-mono font-bold text-[#92400E] uppercase tracking-wider block">
                        Workplace Scenario
                      </span>
                      <p className="text-[11px] text-[#57534E] leading-normal line-clamp-3">
                        {activeProblem.realWorkplaceScenario}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[11px] font-telemetry-mono text-outline font-bold uppercase tracking-wider block">
                        ZeroWatt Response
                      </span>
                      <p className="text-xs font-body-sm text-forest-deep bg-surface-subtle p-3 rounded-lg border border-border-subtle">
                        {activeProblem.howZeroWattResponds}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs font-telemetry-mono text-outline">Select a problem from the left list to inspect.</p>
                )}

                <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                  <span className="text-[11px] font-telemetry-mono text-outline">
                    Press <kbd className="bg-surface-subtle px-1 border border-border-subtle rounded">Esc</kbd> to return
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsNavDrawerOpen(false)}
                    className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-telemetry-mono font-semibold transition cursor-pointer"
                  >
                    Open Full Explanation →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. CLOSING BANNER: THE DESIGN SHIFT */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#022C22] via-[#064E3B] to-[#042f2e] text-white p-8 sm:p-10 shadow-lg border border-emerald-900/40">
        {/* Subtle geometric abstract pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#34D399 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        ></div>

        <div className="relative z-10 space-y-4 max-w-4xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-600/30 text-xs font-telemetry-mono text-[#34D399] font-bold tracking-widest uppercase">
            <span>THE DESIGN SHIFT</span>
            <span className="text-amber-400">✦</span>
            <span className="text-emerald-200/80 font-normal">COMMERCIAL ENERGY MANAGEMENT</span>
          </div>

          {/* Headline */}
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal tracking-tight leading-tight text-white">
            From reactive building controls to <span className="italic text-[#E58B24]">intelligent energy management.</span>
          </h3>

          {/* Supporting line */}
          <p className="text-xs sm:text-sm font-telemetry-mono text-emerald-100/90 leading-relaxed pt-1">
            Occupancy-aware automation <span className="text-[#E58B24]">·</span> Adaptive lighting <span className="text-[#E58B24]">·</span> Comfort-first decisions <span className="text-[#E58B24]">·</span> Coordinated controls <span className="text-[#E58B24]">·</span> Measurable savings <span className="text-[#E58B24]">·</span> Safe operation.
          </p>
        </div>
      </div>
    </section>
  );
}
