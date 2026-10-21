import React, { useState, useMemo, useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

export const partsData = [
  {
    id: 'rpi4-kit',
    num: '01',
    category: 'CONTROL',
    quantity: '×1',
    name: 'Raspberry Pi 4 Model B Kit',
    manufacturer: 'Raspberry Pi Foundation',
    shortSpec: 'Quad-Core Cortex-A72 @ 1.8 GHz · 4GB/8GB LPDDR4 · Gigabit LAN, Dual 4K HDMI, USB 3.0',
    useCase: 'Central deterministic gateway running YOLO11n edge vision, Modbus telemetry, and relay state machine.',
    status: 'ACTIVE GATEWAY',
    // Detailed fields for split-screen panel
    detailedRole: 'Acts as the central edge brain of the ZeroWatt platform. Executes privacy-first quantized neural network inference to detect human occupants, arbitrates dynamic load priorities (P1 Life-Safety/IAQ vs. P2 Lighting/Comfort), polls Modbus energy meters, and directly actuates branch circuit relays without cloud reliance.',
    technicalSpecs: [
      { label: 'Processor', value: 'Broadcom BCM2711, Quad-core Cortex-A72 (ARM v8) 64-bit SoC @ 1.8GHz' },
      { label: 'Memory', value: '4GB / 8GB LPDDR4-3200 SDRAM' },
      { label: 'Operating Voltage', value: '5.1V DC via USB-C (3.0A dedicated power supply)' },
      { label: 'Network', value: 'Gigabit Ethernet (1000BASE-T) + 2.4/5.0 GHz IEEE 802.11ac Wi-Fi' },
      { label: 'I/O Bus', value: 'Standard 40-pin GPIO header (I²C, SPI, UART, PWM channels)' },
      { label: 'Power Consumption', value: '3.4W idle / 7.2W full load inference' }
    ],
    wiring: 'GPIO 16, 17, 18 wired to optocoupled relay gate inputs; I²C bus (GPIO 21 SDA, GPIO 22 SCL) connected to SCD30 and INA219; USB 3.0 port connected to FTDI RS485 converter; RJ45 to local Ethernet switch.',
    practicalApplication: 'In a multi-zone campus office, the RPi4 evaluates occupancy frames in <50ms. If occupants exit Conference Room B, the gateway initiates an 8-minute countdown timer before cutting branch relays, slashing vacant room idle power from 180W down to 0W.'
  },
  {
    id: 'relay-3x',
    num: '02',
    category: 'POWER',
    quantity: '×3',
    name: 'Optocoupled SPDT Power Relays',
    manufacturer: 'Songle / Omron Industrial Compatible',
    shortSpec: '10A / 250VAC · 12V/5V Coil · Zero-Crossing Optoisolation with Flyback Snubber Network',
    useCase: 'Physical galvanic isolation and branch circuit gating across 3 independent office zones.',
    status: 'HARDWARE BENCH TESTED',
    detailedRole: 'Provides physical galvanic isolation between low-voltage digital microcontroller control lines and high-voltage 230VAC building branch circuits. Tripping these contactors completely eliminates phantom load, vampire draw, and forgotten appliance power across vacant focus pods and collaborative zones.',
    technicalSpecs: [
      { label: 'Contact Rating', value: '10A @ 250VAC / 10A @ 30VDC' },
      { label: 'Isolation Voltage', value: '2,500V RMS input-to-output optical barrier' },
      { label: 'Trigger Current', value: '5mA per channel (transistor buffered)' },
      { label: 'Mechanical Life', value: '> 10,000,000 operations' },
      { label: 'Switching Speed', value: '< 10ms operate / < 5ms release' },
      { label: 'Safety Protection', value: 'Integrated flyback diodes + RC snubber for inductive fan loads' }
    ],
    wiring: 'Channels 1, 2, and 3 control inputs tied to Raspberry Pi 4 GPIO pins 16, 17, and 18 via optocouplers. Relay normally-open (NO) contacts wired in series with Zone 1, Zone 2, and Zone 3 AC live conductors.',
    practicalApplication: 'When employees leave work at 6:00 PM, ZeroWatt verifies zero motion and de-energizes all three relay channels, ensuring lighting fixtures, auxiliary monitors, and circulation fans draw true 0.00 Watts until morning arrival.'
  },
  {
    id: 'rs485-repeater',
    num: '03',
    category: 'NETWORK',
    quantity: '×1',
    name: 'RS485 Industrial Signal Repeater & Isolator',
    manufacturer: 'Waveshare / Industrial Standard',
    shortSpec: '2-Wire Half-Duplex · 2.5 kV Galvanic Isolation · 120Ω Differential Line Impedance',
    useCase: 'Extends Modbus RTU meter serial bus over long conduit runs without signal degradation.',
    status: 'FIELD DEPLOYABLE',
    detailedRole: 'Regenerates and galvanically isolates differential serial RS485 communication signals across long architectural electrical risers and noisy conduits. Safeguards the Raspberry Pi controller against ground loops, lightning surges, and industrial inductive interference from heavy motor switchgear.',
    technicalSpecs: [
      { label: 'Baud Rate Support', value: '300 bps to 115,200 bps auto-baud matching' },
      { label: 'Isolation Protection', value: '3,000V DC dual magnetic-optical isolation' },
      { label: 'Transmission Distance', value: 'Up to 1,200 meters (4,000 ft) over shielded twisted pair' },
      { label: 'Bus Nodes', value: 'Supports up to 128 multi-drop nodes on single line segment' },
      { label: 'Power Input', value: '9V–36V DC wide-input industrial terminal rail' },
      { label: 'Surge Suppression', value: '600W TVS lightning surge clamps on lines A & B' }
    ],
    wiring: 'Differential pair (A+, B-) from central gateway connected to Master port; isolated (A\', B\') lines routed along building riser conduits to distributed smart sub-meters.',
    practicalApplication: 'Enables continuous, noise-free Modbus polling from basement electrical main distribution boards up to top-floor smart management system controllers across 4 vertical building floors.'
  },
  {
    id: 'ethernet-conn',
    num: '04',
    category: 'NETWORK',
    quantity: '×1',
    name: 'Gigabit Ethernet LAN Connection',
    manufacturer: 'Cat6 Shielded Industrial RJ45',
    shortSpec: '1000BASE-T · 250MHz Bandwidth · Shielded Foil Twisted Pair (SF/UTP) with Gold Contacts',
    useCase: 'High-speed deterministic telemetry stream to facility digital twin and BACnet bridge.',
    status: 'PLUG-AND-PLAY',
    detailedRole: 'Delivers deterministic, low-latency, collision-free local networking between the ZeroWatt gateway and the facility management server. Allows high-frequency streaming of energy power traces, room digital twin coordinates, and sensor logs with <15ms latency, avoiding campus Wi-Fi congestion.',
    technicalSpecs: [
      { label: 'Standard', value: 'IEEE 802.3ab 1000BASE-T Gigabit Ethernet' },
      { label: 'Bandwidth', value: 'Up to 1 Gbps full-duplex transmission' },
      { label: 'Cable Construction', value: '23 AWG Solid Bare Copper, Overall Aluminum Foil Shield' },
      { label: 'Jitter & Latency', value: '< 2ms local network round-trip time' },
      { label: 'Connector', value: 'RJ45 8P8C shielded with 50-micron gold plating' },
      { label: 'Noise Immunity', value: 'Alien crosstalk suppression compliant with TIA/EIA-568-C.2' }
    ],
    wiring: 'Connected directly from Raspberry Pi 4 native Gigabit Ethernet port to the local building automation VLAN switch.',
    practicalApplication: 'Streams high-resolution INA219 watt traces and digital twin state updates to web dashboards and audit logging databases without dropping frames during campus peak network hours.'
  },
  {
    id: 'rs485-meter-port',
    num: '05',
    category: 'NETWORK',
    quantity: '×1',
    name: 'RS485 Industrial Energy Meter Port',
    manufacturer: 'Schneider / Eastron Modbus Protocol Compatible',
    shortSpec: 'Class 1.0 Accuracy · Modbus-RTU Protocol · Measures kWh, Volts, Amps, Power Factor',
    useCase: 'Ground-truth billing-grade electrical metering to mathematically verify energy reduction.',
    status: 'EMPIRICAL BENCHMARK',
    detailedRole: 'Taps directly into utility-grade digital electrical sub-meters at the branch circuit breaker panel. Continuously reads true RMS voltage, line current, active power (W), reactive power (VAR), total power factor, and accumulated kWh, providing certified mathematical proof of energy conservation.',
    technicalSpecs: [
      { label: 'Protocol', value: 'Modbus-RTU Half-Duplex (Function Codes 03 & 04)' },
      { label: 'Accuracy Class', value: 'IEC 62053-21 Class 1.0 (±1% active energy)' },
      { label: 'Electrical Measurements', value: 'Voltage (V), Current (A), Frequency (Hz), Active Power (kW), kWh' },
      { label: 'Sample Rate', value: 'Hardware integration window: 200ms per measurement frame' },
      { label: 'Rated Current Range', value: '5(60)A direct connection or 5A CT secondary' },
      { label: 'Communication Rate', value: '9600 bps, 8 Data Bits, 1 Stop Bit, No Parity' }
    ],
    wiring: 'Screw terminals 1 (A+) and 2 (B-) tied to the isolated RS485 bus with a 120Ω terminating resistor installed at the bus end.',
    practicalApplication: 'Records verified baseline energy consumption before ZeroWatt automation, and provides mathematical verification that branch power drops from 120W to 4W during empty room intervals.'
  },
  {
    id: 'rs485-usb-converter',
    num: '06',
    category: 'NETWORK',
    quantity: '×1',
    name: 'Industrial RS485 → USB-A Interface Converter',
    manufacturer: 'FTDI Chipset / CH340 Industrial Grade',
    shortSpec: 'Hardware Auto-Transceive · 600W Surge Suppression · 15kV ESD Protection',
    useCase: 'Translates differential field bus signals into Linux virtual serial ttyUSB0 port.',
    status: 'HIGH STABILITY',
    detailedRole: 'Acts as the physical translation layer bridging industrial two-wire differential RS485 voltage swings (-7V to +12V) into standard USB serial packets recognized by the Raspberry Pi operating system as `/dev/ttyUSB0`. Employs automatic hardware direction control to prevent packet collisions.',
    technicalSpecs: [
      { label: 'Controller IC', value: 'Original FTDI FT232RL or CH340E with MAX485 differential driver' },
      { label: 'Baud Rates', value: '300 bps to 3 Mbps asynchronous serial' },
      { label: 'Transceiver Direction', value: 'Zero-delay automatic I/O direction circuit (TXDEN)' },
      { label: 'ESD Protection', value: '±15kV Human Body Model (HBM) on RS485 differential pins' },
      { label: 'Indicators', value: 'Surface-mount LEDs for Power (PWR), Receive (RXD), Transmit (TXD)' },
      { label: 'OS Compatibility', value: 'Native Linux kernel driver (`ftdi_sio`) with zero configuration' }
    ],
    wiring: 'Screw terminals A+ and B- connected to RS485 meter bus; USB-A connector inserted into Raspberry Pi 4 USB 3.0 blue port.',
    practicalApplication: 'Enables Python Modbus scripts (`pymodbus`) running on the RPi4 to query energy meters every 250 milliseconds with zero dropped bytes or transceiver hang-ups.'
  },
  {
    id: 'led-driver-pwm',
    num: '07',
    category: 'POWER',
    quantity: '×1',
    name: 'Multi-Channel PWM LED Driver Module',
    manufacturer: 'Mean Well / High-Efficiency MOSFET Driver',
    shortSpec: '12V/24V Constant Voltage · >1kHz PWM Frequency · Flicker-Free Daylight Dimming',
    useCase: 'Proportional daylight harvesting that dims artificial lights when sun delivers ambient lux.',
    status: 'ENERGY HARVESTING',
    detailedRole: 'Translates hardware pulse-width modulation (PWM) commands from the ZeroWatt microcontroller into high-speed, flicker-free dimming currents for commercial LED ceiling fixtures. When natural daylight floods perimeter windows, the driver smoothly dials down wattage while maintaining constant room lux levels.',
    technicalSpecs: [
      { label: 'Input Voltage', value: '12V – 24V DC regulated auxiliary bus' },
      { label: 'Output Channels', value: '3 Independent Dimming Channels (Zone 1, Zone 2, Zone 3)' },
      { label: 'PWM Frequency', value: '1.2 kHz (exceeds IEEE 1789 standard for zero eye fatigue)' },
      { label: 'Dimming Resolution', value: '8-bit / 256 discrete brightness levels (0% to 100%)' },
      { label: 'Continuous Current', value: 'Up to 3.0A per channel (72W peak per lighting zone)' },
      { label: 'Efficiency', value: '> 96% at nominal operating load' }
    ],
    wiring: 'Gate pins driven by Raspberry Pi 4 hardware PWM pins (GPIO 16, 17, 18); DC output terminals wired to Zone 1, 2, and 3 LED strip arrays.',
    practicalApplication: 'On sunny afternoons, perimeter Zone 3 natural daylight reaches 78%, allowing the driver to dial artificial lighting down to 20% duty cycle, saving 80% lighting energy without occupants noticing any dimming.'
  },
  {
    id: 'scd30-co2',
    num: '08',
    category: 'SENSOR',
    quantity: '×1',
    name: 'Sensirion SCD30 NDIR CO₂ & Climate Sensor',
    manufacturer: 'Sensirion AG (Switzerland)',
    shortSpec: 'Dual-Channel NDIR CO₂ (0–40,000 ppm) · ±(30 ppm + 3%) · Integrated Temp & Humidity',
    useCase: 'Detects human metabolic presence and arbitrates air quality priority for smart ventilation.',
    status: 'CLIMATE BENCHMARK',
    detailedRole: 'World-renowned dual-channel non-dispersive infrared (NDIR) optical sensor that detects human metabolic respiration. When crowded conference rooms hit >1,000 ppm CO₂, ZeroWatt automatically elevates indoor air quality priority to P1, activating ventilation before drowsiness impairs occupant cognitive performance.',
    technicalSpecs: [
      { label: 'CO₂ Measurement Range', value: '0 to 40,000 ppm with dual-channel optical drift compensation' },
      { label: 'CO₂ Accuracy', value: '±(30 ppm + 3% of reading) @ 25°C, 1013 mbar' },
      { label: 'Temperature Accuracy', value: '±0.4°C over -40°C to +70°C operating span' },
      { label: 'Relative Humidity Accuracy', value: '±3% RH over 0% to 100% RH non-condensing' },
      { label: 'Interface Protocol', value: 'I²C (Standard / Fast Mode up to 400 kHz) · 7-bit address `0x61`' },
      { label: 'Supply Voltage', value: '3.3V to 5.5V DC (average active current: 19mA)' }
    ],
    wiring: 'Pin 1 (VDD: 3.3V), Pin 2 (GND), Pin 3 (TX/SCL -> GPIO 22), Pin 4 (RX/SDA -> GPIO 21) wired to Raspberry Pi I²C bus with 4.7kΩ pull-up resistors.',
    practicalApplication: 'In a 12-person meeting room, metabolic CO₂ rises from 450 ppm to 1,120 ppm within 35 minutes. ZeroWatt triggers fresh-air circulation fans proportionally, keeping CO₂ safely below cognitive impairment limits.'
  },
  {
    id: 'honeywell-rspt1000',
    num: '09',
    category: 'SENSOR',
    quantity: '×1',
    name: 'Honeywell RSPT 1000 Dust Monitor / Climate Sensor',
    manufacturer: 'Honeywell Sensing & Productivity Solutions',
    shortSpec: 'Laser Light Scattering · PM2.5 / PM10 Particle Detection · Integrated Thermal Transducer',
    useCase: 'Monitors micro-particulates and dust to trigger filtration only when air quality drops.',
    status: 'INDUSTRIAL GRADE',
    detailedRole: 'Industrial laser-based particulate monitor that measures airborne micro-particulates (PM2.5 and PM10) alongside ambient air temperature. ZeroWatt uses this telemetry to practice demand-controlled air filtration — activating high-draw HEPA scrubbers only when particulate spikes occur rather than running loud fans 24/7.',
    technicalSpecs: [
      { label: 'Operating Principle', value: 'Laser optical scattering with photodiode sensor chamber' },
      { label: 'Particle Size Detection', value: 'PM2.5 (0.3 µm to 2.5 µm) and PM10 (up to 10 µm)' },
      { label: 'Concentration Range', value: '0 to 1,000 µg/m³ continuous real-time readout' },
      { label: 'Response Time', value: '< 6 seconds step-change response' },
      { label: 'Output Interface', value: 'UART serial protocol / 0–10V analog transmission' },
      { label: 'Operating Temperature', value: '-10°C to +50°C industrial environmental rating' }
    ],
    wiring: 'VCC connected to 5V DC supply rail, GND to common ground, TX output to Raspberry Pi 4 UART RX (GPIO 15) for serial packet ingestion.',
    practicalApplication: 'When external construction dust or seasonal smog infiltrates through windows, RSPT 1000 flags a jump to 85 µg/m³. ZeroWatt ramps ventilation filtration fans to scrub indoor air until levels drop below 15 µg/m³.'
  },
  {
    id: 'siemens-qfa2071',
    num: '10',
    category: 'SENSOR',
    quantity: '×1',
    name: 'Siemens QFA2071 Room Temp & Humidity Sensor',
    manufacturer: 'Siemens Building Technologies (BMS Grade)',
    shortSpec: 'High-Precision Pt1000 RTD · 0–10V / 4–20mA Active Outputs · 0–50°C / 0–95% RH',
    useCase: 'High-precision commercial indoor climate perception for thermodynamic HVAC matching.',
    status: 'BMS CERTIFIED',
    detailedRole: 'Premium commercial building automation sensor providing certified temperature and relative humidity telemetry. ZeroWatt combines this thermal data with occupancy headcounts to calculate thermodynamic room enthalpy, ensuring cooling setpoints are adjusted dynamically without wasteful over-chilling.',
    technicalSpecs: [
      { label: 'Measuring Element', value: 'Pt1000 Class B thin-film platinum RTD + Capacitive RH polymer' },
      { label: 'Temperature Range', value: '0°C to +50°C (Accuracy: ±0.3°C at 20°C ambient)' },
      { label: 'Humidity Range', value: '0% to 95% RH non-condensing (Accuracy: ±2% RH in 20–80% range)' },
      { label: 'Signal Output', value: 'Active 0–10V DC linear or 4–20mA current loop' },
      { label: 'Power Supply', value: 'AC 24V (±20%) or DC 13.5–35V commercial automation bus' },
      { label: 'Housing Standard', value: 'IP30 impact-resistant ABS enclosure compliant with CE / UL standards' }
    ],
    wiring: 'Terminal G (24V DC), G0 (GND), U1 (0-10V Temp output) and U2 (0-10V RH output) wired through precision voltage divider to RPi4 ADC channels.',
    practicalApplication: 'Detects natural 3.2°C temperature drops during evening hours, prompting ZeroWatt to throttle air conditioning chiller loops down by 35% before manual thermostats would normally be adjusted.'
  },
  {
    id: 'siemens-qsa2700',
    num: '11',
    category: 'SENSOR',
    quantity: '×1',
    name: 'Siemens QSA2700 Duct & Room Particle Sensor',
    manufacturer: 'Siemens Industry Inc. (HVAC Division)',
    shortSpec: 'Optical Air Quality Laser · PM2.5 & PM10 · Modbus RS485 & 0–10V Active Interface',
    useCase: 'Industrial-grade duct air quality monitoring to prevent running air handlers on clean air.',
    status: 'COMMERCIAL SPEC',
    detailedRole: 'Top-tier commercial building particle sensor designed for demanding corporate offices and hospital facilities. It samples circulating duct and room air to measure particulate loads. When air is pristine, ventilation fan duty cycles are reduced to quiet baseline speeds, slashing kilowatt-hour consumption.',
    technicalSpecs: [
      { label: 'Sensor Technology', value: 'High-power laser diode with forward-scatter optical collector' },
      { label: 'Target Particulates', value: 'Fine dust PM2.5 and coarse dust PM10 (mass concentration µg/m³)' },
      { label: 'Measuring Span', value: '0 to 500 µg/m³ with auto-zero calibration baseline' },
      { label: 'Communication Protocol', value: 'Modbus RTU over RS485 (Address selectable 1–247) + 0–10V analog' },
      { label: 'Air Flow Speed', value: 'Accurate in duct velocities from 0.5 m/s up to 10 m/s' },
      { label: 'Operating Voltage', value: '24V AC/DC (consumption: < 1.5W)' }
    ],
    wiring: 'Tied into the shared RS485 multi-drop serial bus alongside the energy sub-meter, allowing the ZeroWatt gateway to poll particle density over Modbus RTU.',
    practicalApplication: 'Verifies that indoor air remains clean during morning hours, allowing supply fans to run at only 20% baseline speed rather than running full blast, cutting ventilation motor power by 68%.'
  },
  {
    id: 'pir-motion-3x',
    num: '12',
    category: 'SENSOR',
    quantity: '×3',
    name: 'HC-SR501 PIR Motion Transducer Modules',
    manufacturer: 'Murata Pyroelectric Core Compatible',
    shortSpec: '120° Wide-Angle Fresnel Lens · Adjustable Sensitivity & 3s–300s Time Delay',
    useCase: 'Provides non-imaging spatial motion detection across Zone 1, 2, and 3 without privacy compromise.',
    status: 'PRIVACY FIRST',
    detailedRole: 'Deploys dual-element pyroelectric transducers with 120° wide-angle Fresnel lenses across three distinct workplace zones (Front Podium, Central Desks, Window Pods). Detects localized occupant movement with zero cameras, eliminating privacy concerns in commercial offices.',
    technicalSpecs: [
      { label: 'Detection Angle', value: '< 120° cone angle with 7-meter detection radius' },
      { label: 'Operating Voltage', value: '4.5V – 20V DC (onboard 3.3V LDO regulator)' },
      { label: 'Output Signal', value: 'Digital High (3.3V) on motion detected / Low (0V) on stillness' },
      { label: 'Quiescent Current', value: '< 50 µA ultra-low power idle consumption' },
      { label: 'Trigger Mode', value: 'Repeatable trigger (H) with hardware hysteresis filtering' },
      { label: 'Interference Immunity', value: 'RF immunity against 4G/5G mobile signals and LED driver ripple' }
    ],
    wiring: 'Outputs connected to Raspberry Pi 4 GPIO pins 25 (Z1), 26 (Z2), and 27 (Z3) configured as interrupt-driven rising-edge inputs.',
    practicalApplication: 'When employees walk into Zone 2 collaborative desks, the PIR sensor immediately signals the gateway in <10ms to illuminate lighting before workers even reach their chairs.'
  },
  {
    id: 'ldr-dividers-3x',
    num: '13',
    category: 'SENSOR',
    quantity: '×3',
    name: 'GL5528 LDR Photoresistors with 10kΩ Dividers',
    manufacturer: 'Cadmium-Sulfide (CdS) Optical Transducer',
    shortSpec: 'Peak Spectral Response 540nm (Matches Human Eye) · 10 kΩ Fixed Precision Divider',
    useCase: 'Quantifies ambient natural daylight across perimeter windows and interior desks.',
    status: 'DAYLIGHT HARVEST',
    detailedRole: 'Measures incoming natural sunlight across different office locations. As daylight rises through windows, the LDR resistance drops, producing a variable voltage that allows the ZeroWatt algorithm to harvest natural light and reduce artificial lighting proportionally.',
    technicalSpecs: [
      { label: 'Peak Sensitivity', value: '540 nm (photopic curve matching human ocular perception)' },
      { label: 'Light Resistance', value: '10 kΩ to 20 kΩ @ 10 lux' },
      { label: 'Dark Resistance', value: '> 1.0 MΩ @ 0 lux' },
      { label: 'Divider Network', value: '10.0 kΩ ±1% metal-film pull-down resistor for linear ADC output' },
      { label: 'Response Time', value: '20 ms rise time / 30 ms decay time' },
      { label: 'Voltage Range', value: '0.0V (pitch black) to 3.3V (direct outdoor sunlight)' }
    ],
    wiring: 'Top leg tied to 3.3V, center junction connected to ADC input pins via MCP3008/TCA9548A multiplexer, bottom leg tied to ground via 10kΩ resistor.',
    practicalApplication: 'Provides continuous daylight readings to Zone 3 window desk lights, saving over 4.5 kilowatt-hours per fixture each month during clear sunny days.'
  },
  {
    id: 'ina219-meter',
    num: '14',
    category: 'POWER',
    quantity: '×1',
    name: 'INA219 High-Side Voltage / Current / Power Sensor',
    manufacturer: 'Texas Instruments',
    shortSpec: '0.1Ω 1% Shunt Resistor · Up to 26V DC · ±3.2A Range · 12-Bit ADC Precision',
    useCase: 'Provides microsecond electrical power feedback verifying actual branch wattage.',
    status: 'EVIDENCE CORE',
    detailedRole: 'High-side current and voltage shunt monitor that measures real physical wattage drawn by connected loads. Feeds real-time mathematical proof into the ZeroWatt Evidence Engine, comparing requested wattage vs. allocated wattage vs. measured wattage.',
    technicalSpecs: [
      { label: 'Bus Voltage Range', value: '0V to +26V DC high-side sensing' },
      { label: 'Shunt Resistor', value: '0.1 Ω 2W 1% metal alloy precision sense resistor' },
      { label: 'Current Resolution', value: '0.1 mA / ±3.2A full-scale measurement window' },
      { label: 'Accuracy', value: '0.5% max error over temperature (-40°C to +125°C)' },
      { label: 'Digital Interface', value: 'I²C compatible interface with 16 programmable addresses' },
      { label: 'Conversion Time', value: '532 µs per 12-bit voltage and current conversion cycle' }
    ],
    wiring: 'High-side shunt inserted in series with the 12V DC power distribution bus; SDA and SCL connected to RPi4 I²C bus pins 21 and 22.',
    practicalApplication: 'Plots live SVG power curves on the facility dashboard, proving empirically that when Zone 2 turns off, power draw drops from 8.2W to 4.1W within 250 milliseconds.'
  }
];

export default function PartListSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedPartId, setSelectedPartId] = useState(null);
  const sectionRef = useRef(null);

  const categories = [
    { id: 'ALL', label: 'All' },
    { id: 'CONTROL', label: 'Control' },
    { id: 'SENSOR', label: 'Sensors' },
    { id: 'NETWORK', label: 'Network & Comms' },
    { id: 'POWER', label: 'Power & Switching' }
  ];

  // Filter parts by category and search query
  const filteredParts = useMemo(() => {
    return partsData.filter((part) => {
      const matchesCategory =
        selectedCategory === 'ALL' || part.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        part.name.toLowerCase().includes(q) ||
        part.shortSpec.toLowerCase().includes(q) ||
        part.useCase.toLowerCase().includes(q) ||
        part.manufacturer.toLowerCase().includes(q) ||
        part.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const activePart = useMemo(() => {
    return partsData.find((p) => p.id === selectedPartId) || partsData[0];
  }, [selectedPartId]);

  const handleSelectPart = (id) => {
    setSelectedPartId(id);
  };

  const handleCloseDetail = () => {
    setSelectedPartId(null);
  };

  const handleNextPart = () => {
    const currentIndex = filteredParts.findIndex((p) => p.id === activePart.id);
    const nextIndex = (currentIndex + 1) % filteredParts.length;
    setSelectedPartId(filteredParts[nextIndex].id);
  };

  const handlePrevPart = () => {
    const currentIndex = filteredParts.findIndex((p) => p.id === activePart.id);
    const prevIndex = (currentIndex - 1 + filteredParts.length) % filteredParts.length;
    setSelectedPartId(filteredParts[prevIndex].id);
  };

  // Keyboard navigation for split screen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPartId) {
        if (e.key === 'Escape') {
          handleCloseDetail();
        } else if (e.key === 'ArrowRight') {
          handleNextPart();
        } else if (e.key === 'ArrowLeft') {
          handlePrevPart();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPartId, filteredParts, activePart]);

  return (
    <ScrollReveal animation="slide-up" threshold={0.08}>
      <section
        ref={sectionRef}
        id="parts-list"
        className="space-y-6 scroll-mt-20 relative"
        aria-labelledby="parts-list-heading"
      >
      {/* 1. SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border-subtle pb-4">
        <div>
          <div className="text-xs font-telemetry-mono text-primary font-bold tracking-widest uppercase flex items-center gap-2">
            <span>08 / SYSTEM BILL OF MATERIALS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
            <span className="text-outline font-normal">HARDWARE PART LIST</span>
          </div>
          <h2
            id="parts-list-heading"
            className="text-2xl sm:text-3xl font-headline-md text-forest-deep font-bold mt-1"
          >
            ZeroWatt Hardware &amp; Sensor Inventory
          </h2>
        </div>
        <p className="text-sm font-body-sm text-on-surface-variant max-w-xl text-left sm:text-right">
          Every verified compute controller, industrial Modbus gateway, optocoupled relay, and environmental sensor powering the zero-cloud energy reduction loop. Click any part to inspect specs and wiring.
        </p>
      </div>

      {/* 2. SEARCH BAR & CATEGORY FILTER STRIP (Matches reference image style) */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5 bg-white/70 backdrop-blur-xl border border-white/80 p-3 sm:p-4 rounded-3xl shadow-[0_4px_25px_-5px_rgba(2,44,34,0.04)]">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <span className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            </span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Raspberry Pi, SCD30, Siemens, Honeywell, relay, RS485..."
            className="w-full pl-12 pr-10 py-2.5 sm:py-3 bg-white/90 border border-slate-200/90 rounded-2xl text-xs sm:text-sm font-body-md text-forest-deep placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
              title="Clear search"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-full text-xs font-telemetry-mono font-semibold transition-all cursor-pointer whitespace-nowrap tap-pop active:scale-95 ${
                  isActive
                    ? 'bg-forest-deep text-white shadow-xs'
                    : 'bg-white/80 hover:bg-white text-slate-600 hover:text-forest-deep border border-slate-200/80 shadow-2xs'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. CONDITIONAL RENDER: DEFAULT MULTI-COLUMN BENTO GRID vs. SPLIT-SCREEN PANEL */}
      {!selectedPartId ? (
        /* DEFAULT STATE — 4-COLUMN BENTO GRID (Matches Image Style: Category Badge, Gold Serif Quantity, Serif Title, Specs, Use) */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-telemetry-mono text-on-surface-variant px-1">
            <span>
              Showing <strong className="text-forest-deep">{filteredParts.length}</strong> of {partsData.length} Hardware Components
            </span>
            <span className="text-[11px] text-outline hidden sm:inline">
              Click any component to inspect dedicated description &amp; wiring
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredParts.map((part, idx) => (
              <button
                key={part.id}
                type="button"
                onClick={() => handleSelectPart(part.id)}
                className={`group text-left bg-white/85 backdrop-blur-xl border border-white/90 hover:border-emerald-500/70 shadow-[0_4px_20px_-4px_rgba(2,44,34,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.22)] rounded-3xl p-5 sm:p-6 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.015] tap-pop cursor-pointer flex flex-col justify-between relative overflow-hidden select-none focus:outline-none focus:ring-2 focus:ring-primary/40 ring-0 hover:ring-2 hover:ring-emerald-400/25 animate-slide-up delay-${(idx % 4 + 1) * 75}`}
              >
                {/* Top Subtle Emerald Indicator on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Ambient Radial Hover Glow */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full pointer-events-none group-hover:from-emerald-400/20 transition-all duration-300"></div>

                <div>
                  {/* Top Row: Category Badge (Left) + Distinctive Gold/Amber Serif Quantity (Right) */}
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="text-[10px] font-telemetry-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all duration-200">
                      {part.category}
                    </span>
                    <span className="font-serif text-[#C59B27] dark:text-amber-500 text-lg sm:text-xl font-normal tracking-tight group-hover:scale-110 group-hover:text-amber-600 transition-all duration-300 inline-block">
                      {part.quantity}
                    </span>
                  </div>

                  {/* Part Title in Bold Serif */}
                  <h3 className="font-serif font-bold text-forest-deep text-lg sm:text-[19px] leading-snug group-hover:text-emerald-700 transition-colors mb-2 line-clamp-2">
                    {part.name}
                  </h3>

                  {/* Short Spec / Subtitle */}
                  <p className="text-xs font-body-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
                    {part.shortSpec}
                  </p>
                </div>

                {/* Bottom Row: Use Case Footnote */}
                <div className="pt-3.5 border-t border-slate-100/90 text-xs text-slate-600 flex items-start gap-1.5 group-hover:border-emerald-100 transition-colors">
                  <strong className="text-emerald-700 font-telemetry-mono text-[11px] uppercase tracking-wider shrink-0 mt-0.5">
                    Use:
                  </strong>
                  <span className="font-body-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {part.useCase}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {filteredParts.length === 0 && (
            <div className="text-center py-12 bg-white/60 border border-dashed border-slate-300 rounded-3xl p-6">
              <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">search_off</span>
              <p className="text-sm font-semibold text-forest-deep">No matching parts found</p>
              <p className="text-xs text-slate-500 mt-1">Try adjusting your search query or select "All" categories.</p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); }}
                className="mt-4 px-4 py-1.5 text-xs font-telemetry-mono font-semibold rounded-full bg-forest-deep text-white shadow-xs tap-pop"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ========================================================
           SPLIT-SCREEN INTERFACE (Requested: Left Side Tile List, Right Side Dedicated Part Details)
           ======================================================== */
        <div className="space-y-4 animate-in fade-in duration-300">
          {/* Top Return & Navigation Breadcrumb Bar */}
          <div className="flex flex-wrap items-center justify-between glass-surface border border-white/80 rounded-2xl px-4 py-3 text-xs font-telemetry-mono shadow-xs gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCloseDetail}
                className="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-forest-deep font-semibold transition cursor-pointer tap-pop active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                <span>All {partsData.length} Hardware Parts</span>
              </button>
              <span className="text-outline">/</span>
              <span className="text-primary font-bold">
                {activePart.quantity} {activePart.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-white/80 rounded-full border border-slate-200 p-0.5 shadow-2xs">
                <button
                  type="button"
                  onClick={handlePrevPart}
                  className="p-1 rounded-full text-slate-600 hover:text-forest-deep hover:bg-slate-100 transition cursor-pointer tap-pop"
                  title="Previous component (←)"
                >
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <span className="text-[10px] font-telemetry-mono px-2 text-slate-500">
                  {filteredParts.findIndex((p) => p.id === activePart.id) + 1} of {filteredParts.length}
                </span>
                <button
                  type="button"
                  onClick={handleNextPart}
                  className="p-1 rounded-full text-slate-600 hover:text-forest-deep hover:bg-slate-100 transition cursor-pointer tap-pop"
                  title="Next component (→)"
                >
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleCloseDetail}
                className="p-1 rounded-full text-on-surface-variant hover:text-forest-deep hover:bg-white/90 transition cursor-pointer"
                title="Close split view (Esc)"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          </div>

          {/* MAIN SPLIT-SCREEN LAYOUT: Left (40% Column) & Right (60% Dedicated Panel) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: Scrollable Parts List */}
            <div className="lg:col-span-5 space-y-2.5 animate-slide-left">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-telemetry-mono text-outline uppercase tracking-wider font-semibold">
                  HARDWARE INVENTORY ({filteredParts.length})
                </span>
                <span className="text-[11px] font-telemetry-mono text-emerald-700 font-medium">
                  Click to inspect
                </span>
              </div>

              <div className="space-y-2 max-h-[720px] overflow-y-auto pr-1 scrollbar-thin">
                {filteredParts.map((part) => {
                  const isSelected = part.id === activePart.id;
                  return (
                    <button
                      key={part.id}
                      type="button"
                      onClick={() => handleSelectPart(part.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 select-none tap-pop active:scale-[0.98] ${
                        isSelected
                          ? 'bg-emerald-500/15 border-primary ring-2 ring-primary/25 shadow-xs'
                          : 'bg-white/75 hover:bg-white border-white/80 hover:shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`text-[11px] font-serif px-2 py-0.5 rounded-lg shrink-0 ${
                          isSelected ? 'bg-primary text-white font-bold' : 'text-amber-700 bg-amber-50 font-medium'
                        }`}>
                          {part.quantity}
                        </span>
                        <div className="min-w-0">
                          <p className={`text-xs font-serif font-bold truncate ${
                            isSelected ? 'text-forest-deep' : 'text-slate-800'
                          }`}>
                            {part.name}
                          </p>
                          <p className="text-[11px] font-body-xs text-slate-500 truncate mt-0.5">
                            {part.manufacturer} · {part.category}
                          </p>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-sm text-slate-400 shrink-0">
                        chevron_right
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: Dedicated Description & Technical Panel */}
            <div className="lg:col-span-7 bg-white/90 backdrop-blur-xl border border-white/90 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] space-y-6 animate-slide-right">
              {/* Header: Badge, Quantity, Title, Manufacturer */}
              <div className="border-b border-border-subtle/80 pb-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-telemetry-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
                      {activePart.category}
                    </span>
                    <span className="text-[11px] font-telemetry-mono px-2.5 py-0.5 rounded-full bg-secondary-container text-primary font-semibold">
                      {activePart.status}
                    </span>
                  </div>
                  <span className="font-serif text-[#C59B27] dark:text-amber-500 text-2xl font-normal">
                    {activePart.quantity}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-forest-deep font-bold leading-tight">
                    {activePart.name}
                  </h3>
                  <p className="text-xs font-telemetry-mono text-emerald-700 mt-1">
                    Manufacturer: {activePart.manufacturer}
                  </p>
                </div>

                <p className="text-xs sm:text-sm font-body-sm text-slate-600 bg-surface-subtle p-3 rounded-xl border border-border-subtle/60 leading-relaxed">
                  {activePart.shortSpec}
                </p>
              </div>

              {/* Dedicated ZeroWatt Architecture Role */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold font-telemetry-mono text-forest-deep uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">neurology</span>
                  <span>Dedicated ZeroWatt Architecture Role</span>
                </h4>
                <p className="text-xs sm:text-sm font-body-md text-slate-700 leading-relaxed bg-emerald-50/30 p-4 rounded-2xl border border-emerald-100">
                  {activePart.detailedRole}
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold font-telemetry-mono text-forest-deep uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">tune</span>
                  <span>Technical Specifications &amp; Parameters</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-telemetry-mono">
                  {activePart.technicalSpecs.map((spec, i) => (
                    <div
                      key={i}
                      className="bg-surface-subtle p-3 rounded-xl border border-border-subtle/70 flex flex-col justify-between gap-1"
                    >
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                        {spec.label}
                      </span>
                      <span className="text-forest-deep font-medium leading-snug">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hardware Wiring & Pin Mapping */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold font-telemetry-mono text-forest-deep uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">cable</span>
                  <span>Hardware Interfacing &amp; Wiring Topology</span>
                </h4>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs font-telemetry-mono text-slate-700 leading-relaxed">
                  {activePart.wiring}
                </div>
              </div>

              {/* Real Workplace Practical Application */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold font-telemetry-mono text-forest-deep uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">domain</span>
                  <span>Practical Workplace Impact</span>
                </h4>
                <p className="text-xs sm:text-sm font-body-sm text-slate-600 leading-relaxed bg-[#FAF8F5] p-4 rounded-2xl border border-[#EFE5D7]">
                  {activePart.practicalApplication}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  </ScrollReveal>
  );
}
