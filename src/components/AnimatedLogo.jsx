import React from 'react';
import './AnimatedLogo.css';

export default function AnimatedLogo() {
  return (
    <div className="w-full max-w-[340px] sm:max-w-md lg:max-w-none lg:w-[440px] xl:w-[480px] shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-primary/30 bg-[#050b09] transition hover:border-primary/60">
      <svg
        className="w-full h-auto block select-none"
        viewBox="0 0 900 650"
        xmlns="http://www.w3.org/2000/svg"
        style={{ backgroundColor: '#050b09', fontFamily: "'Geist', 'Inter', system-ui, -apple-system, sans-serif" }}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="wireGlow" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="boltGrad" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#a7f3d0" />
            <stop offset="35%" stopColor="#34d399" />
            <stop offset="70%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <radialGradient cx="50%" cy="37%" id="ambientGlow" r="48%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
            <stop offset="45%" stopColor="#059669" stopOpacity="0.12" />
            <stop offset="75%" stopColor="#064e3b" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#050b09" stopOpacity="0" />
          </radialGradient>

          {/* Filters for electric glow */}
          <filter height="200%" id="intenseBloom" width="200%" x="-50%" y="-50%">
            <feGaussianBlur in="SourceGraphic" result="blur1" stdDeviation="5" />
            <feGaussianBlur in="SourceGraphic" result="blur2" stdDeviation="10" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter height="160%" id="wirePulseGlow" width="160%" x="-30%" y="-30%">
            <feGaussianBlur result="blur" stdDeviation="3" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter height="160%" id="coreGlow" width="160%" x="-30%" y="-30%">
            <feGaussianBlur result="blur" stdDeviation="6" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Dark Canvas Backdrop */}
        <rect fill="#050c09" height="650" width="900" x="0" y="0" />

        {/* Physical Light Bloom (Dormant until current completes path in emblem) */}
        <circle className="ambient-glow-circle" cx="450" cy="235" fill="url(#ambientGlow)" r="320" />

        {/* Technical Schematic Coordinate Grid */}
        <g opacity="0.08" stroke="#10b981" strokeDasharray="3 7" strokeWidth="0.75">
          <line x1="80" x2="80" y1="40" y2="450" />
          <line x1="220" x2="220" y1="40" y2="450" />
          <line x1="680" x2="680" y1="40" y2="450" />
          <line x1="820" x2="820" y1="40" y2="450" />
          <line x1="40" x2="860" y1="120" y2="120" />
          <line x1="40" x2="860" y1="350" y2="350" />
        </g>

        {/* ================= BASE DORMANT CIRCUIT TRACES ================= */}
        <g className="base-circuit">
          {/* Top-Left Network */}
          <path d="M 60 70 L 170 70 L 170 140 L 290 140 L 290 195 L 365 195" />
          <path d="M 110 30 L 110 110 L 230 110 L 230 175 L 350 175" />
          <path d="M 40 190 L 150 190 L 150 230 L 335 230" />
          {/* Bottom-Left Network */}
          <path d="M 70 410 L 180 410 L 180 320 L 280 320 L 280 270 L 350 270" />
          <path d="M 120 460 L 120 370 L 240 370 L 240 295 L 365 295" />
          <path d="M 50 280 L 190 280 L 190 250 L 335 250" />
          {/* Top-Right Network */}
          <path d="M 840 70 L 730 70 L 730 140 L 610 140 L 610 195 L 535 195" />
          <path d="M 790 30 L 790 110 L 670 110 L 670 175 L 550 175" />
          <path d="M 860 190 L 750 190 L 750 230 L 565 230" />
          {/* Bottom-Right Network */}
          <path d="M 830 410 L 720 410 L 720 320 L 620 320 L 620 270 L 550 270" />
          <path d="M 780 460 L 780 370 L 660 370 L 660 295 L 535 295" />
          <path d="M 850 280 L 710 280 L 710 250 L 565 250" />
          {/* Interlock Hardware Connectors */}
          <path d="M 190 175 h 12 a 10 10 0 0 1 10 10 v 0 a 10 10 0 0 1 -10 10 h -12 z" fill="#091d16" stroke="#164335" strokeWidth="2" />
          <line stroke="#10b981" strokeWidth="2.5" x1="212" x2="224" y1="181" y2="181" />
          <line stroke="#10b981" strokeWidth="2.5" x1="212" x2="224" y1="189" y2="189" />
          <path d="M 236 172 h -8 a 2 2 0 0 0 -2 2 v 22 a 2 2 0 0 0 2 2 h 8 z" fill="#091d16" stroke="#164335" strokeWidth="2" />
          <path d="M 710 305 h -12 a 10 10 0 0 1 -10 10 v 0 a 10 10 0 0 1 10 10 h 12 z" fill="#091d16" stroke="#164335" strokeWidth="2" />
          <line stroke="#10b981" strokeWidth="2.5" x1="688" x2="676" y1="311" y2="311" />
          <line stroke="#10b981" strokeWidth="2.5" x1="688" x2="676" y1="319" y2="319" />
          <path d="M 664 302 h 8 a 2 2 0 0 0 2 2 v 22 a 2 2 0 0 0 -2 2 h -8 z" fill="#091d16" stroke="#164335" strokeWidth="2" />
        </g>

        {/* ================= STAGE 1: ACTIVE ELECTRIC PULSES TRAVELLING ALONG WIRES ================= */}
        <g fill="none" filter="url(#wirePulseGlow)" stroke="#34d399" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5">
          {/* Top-Left Currents flowing towards emblem */}
          <path className="p-lt" d="M 60 70 L 170 70 L 170 140 L 290 140 L 290 195 L 365 195" />
          <path className="p-lb" d="M 40 190 L 150 190 L 150 230 L 335 230" />
          {/* Bottom-Left Currents flowing towards emblem */}
          <path className="p-lb" d="M 70 410 L 180 410 L 180 320 L 280 320 L 280 270 L 350 270" />
          <path className="p-lt" d="M 120 460 L 120 370 L 240 370 L 240 295 L 365 295" />
          {/* Top-Right Currents flowing towards emblem */}
          <path className="p-rt" d="M 840 70 L 730 70 L 730 140 L 610 140 L 610 195 L 535 195" />
          <path className="p-rb" d="M 860 190 L 750 190 L 750 230 L 565 230" />
          {/* Bottom-Right Currents flowing towards emblem */}
          <path className="p-rb" d="M 830 410 L 720 410 L 720 320 L 620 320 L 620 270 L 550 270" />
          <path className="p-rt" d="M 780 460 L 780 370 L 660 370 L 660 295 L 535 295" />
        </g>

        {/* Circuit Terminal Pins */}
        <g fill="#10b981" opacity="0.6">
          <circle cx="60" cy="70" r="3" />
          <circle cx="110" cy="30" r="2.5" />
          <circle cx="40" cy="190" r="3" />
          <circle cx="70" cy="410" r="3" />
          <circle cx="120" cy="460" r="2.5" />
          <circle cx="840" cy="70" r="3" />
          <circle cx="790" cy="30" r="2.5" />
          <circle cx="860" cy="190" r="3" />
          <circle cx="830" cy="410" r="3" />
          <circle cx="780" cy="460" r="2.5" />
        </g>

        {/* ================= THE ZEROWATT EMBLEM PATHS ================= */}
        {/* Junction Feed Nodes into Emblem */}
        <g fill="#34d399" filter="url(#intenseBloom)">
          <circle cx="365" cy="195" r="4.5" />
          <circle cx="335" cy="230" r="4.5" />
          <circle cx="350" cy="270" r="4.5" />
          <circle cx="535" cy="195" r="4.5" />
          <circle cx="565" cy="230" r="4.5" />
          <circle cx="550" cy="270" r="4.5" />
        </g>

        {/* 1. BASE EMBLEM STRUCTURE (Dormant/Off until current traverses it) */}
        <g id="baseEmblemStructure">
          {/* Outer Orbital Ring Structure */}
          <g className="emblem-outer-assembly" fill="none" strokeLinecap="round" strokeWidth="5.5">
            {/* Outer Arc 1: Top Right to Top Left */}
            <path d="M 450 110 A 125 125 0 0 1 573 213" />
            {/* Outer Arc 2: Right to Bottom Center */}
            <path d="M 568 275 A 125 125 0 0 1 420 357" />
            {/* Outer Arc 3: Left to Top */}
            <path d="M 345 310 A 125 125 0 0 1 332 190" />
            {/* Terminal Node on Outer Arc */}
            <circle cx="420" cy="357" fill="#34d399" r="6" />
          </g>
          {/* Inner Orbital Ring Structure */}
          <g className="emblem-inner-assembly" fill="none" strokeLinecap="round" strokeWidth="5">
            {/* Inner Arc 1 with terminal node */}
            <path d="M 450 147 A 88 88 0 0 1 538 235" />
            <path d="M 400 157 A 88 88 0 0 1 450 147" />
            {/* Inner Arc 2 */}
            <path d="M 525 280 A 88 88 0 0 1 380 300" />
            {/* Inner Arc 3 */}
            <path d="M 364 215 A 88 88 0 0 1 390 170" />
            {/* Terminal Node on Inner Arc */}
            <circle cx="400" cy="157" fill="#34d399" r="5.5" />
          </g>
          {/* Central Lightning Bolt Base Structure */}
          <g className="bolt-power-core">
            <polygon
              fill="url(#boltGrad)"
              points="536,127 408,243 480,243 364,363 450,225 394,225"
              stroke="#a7f3d0"
              strokeLinejoin="miter"
              strokeMiterlimit="4"
              strokeWidth="2.5"
            />
          </g>
        </g>

        {/* ================= STAGES 2, 3, 4: CURRENT ACTUALLY TRAVELLING THE PATH IN THE EMBLEM ================= */}
        {/* Stage 2: Current traverses the outer orbital arcs from the wire terminals into the emblem */}
        <g fill="none" filter="url(#intenseBloom)" stroke="#6ee7b7" strokeLinecap="round" strokeWidth="4.5">
          <path className="emblem-pulse-outer-1" d="M 332 190 A 125 125 0 0 1 450 110 A 125 125 0 0 1 573 213" />
          <path className="emblem-pulse-outer-2" d="M 568 275 A 125 125 0 0 1 420 357 A 125 125 0 0 1 345 310" />
        </g>
        {/* Stage 3: Current traverses the inner orbital arcs around the center */}
        <g fill="none" filter="url(#intenseBloom)" stroke="#a7f3d0" strokeLinecap="round" strokeWidth="4">
          <path className="emblem-pulse-inner" d="M 390 170 A 88 88 0 0 1 450 147 A 88 88 0 0 1 538 235 A 88 88 0 0 1 525 280 A 88 88 0 0 1 380 300" />
        </g>
        {/* Stage 4: Current travels down the exact perimeter contour of the lightning bolt */}
        <g fill="none" filter="url(#intenseBloom)" stroke="#ecfdf5" strokeLinecap="round" strokeLinejoin="miter" strokeWidth="3.5">
          <path className="bolt-contour-stream" d="M 536 127 L 408 243 L 480 243 L 364 363 L 450 225 L 394 225 Z" />
        </g>

        {/* ================= STAGE 5: BRAND SIGN & TAGLINE ILLUMINATION ================= */}
        {/* Sign Title "ZEROWATT" */}
        <g transform="translate(450, 472)">
          <text
            className="brand-title-text"
            fontFamily="'Geist', 'Inter', sans-serif"
            fontSize="29"
            fontWeight="800"
            letterSpacing="4.5"
            textAnchor="middle"
          >
            ZEROWATT
          </text>
        </g>

        {/* Tagline Box Container & Verbatim Text: BOLD and ITALIC */}
        <g transform="translate(450, 532)">
          <rect className="tagline-box-el" height="46" rx="10" ry="10" strokeWidth="2" width="500" x="-250" y="-23" />
          <rect fill="#34d399" height="32" opacity="0.85" rx="3" width="6" x="-244" y="-16" />
          <rect fill="#34d399" height="32" opacity="0.85" rx="3" width="6" x="238" y="-16" />
          <circle cx="-220" cy="0" fill="#10b981" r="2.5" />
          <line stroke="#10b981" strokeDasharray="2 3" strokeWidth="1.5" x1="-214" x2="-196" y1="0" y2="0" />
          <circle cx="220" cy="0" fill="#10b981" r="2.5" />
          <line stroke="#10b981" strokeDasharray="2 3" strokeWidth="1.5" x1="196" x2="214" y1="0" y2="0" />
          <text
            className="tagline-text-el"
            fontFamily="'Geist', 'Inter', sans-serif"
            fontSize="15"
            fontStyle="italic"
            fontWeight="800"
            letterSpacing="1.8"
            textAnchor="middle"
            style={{ textTransform: 'uppercase' }}
            y="6"
          >
            Energy conservation made easier
          </text>
        </g>

        {/* System Telemetry Status Pill */}
        <g transform="translate(450, 582)">
          <rect fill="#04120e" height="24" rx="6" stroke="#0f3b2c" strokeWidth="1" width="250" x="-125" y="-12" />
          <circle cx="-102" cy="0" fill="#10b981" r="3.5">
            <animate attributeName="opacity" dur="2.4s" repeatCount="indefinite" values="1;0.2;1" />
          </circle>
          <text fill="#6ee7b7" fontSize="10" fontStyle="italic" fontWeight="700" letterSpacing="1.5" textAnchor="middle" y="3.5">
            CLOSED CURRENT CIRCUIT • SYNCHRONIZED
          </text>
        </g>
      </svg>
    </div>
  );
}
