import React from 'react';
import logoUrl from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="mt-16 bg-surface-base border-t border-border-subtle py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-telemetry-mono text-on-surface-variant">
        <div className="flex items-center gap-2.5">
          <img 
            alt="ZeroWatt Small Logo" 
            className="w-6 h-6 object-contain" 
            src={logoUrl} 
          />
          <span className="font-bold text-forest-deep text-sm">ZeroWatt</span>
          <span className="text-border-strong">|</span>
          <span>Intelligent Energy Conservation © 2025</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <span className="text-forest-deep font-medium italic">यत्र आवश्यकता, तत्र ऊर्जा</span>
          <span className="text-border-strong hidden sm:inline">·</span>
          <a className="hover:text-primary transition-colors" href="#features">F1.0 Blueprint</a>
          <span className="text-border-strong hidden sm:inline">·</span>
          <a className="hover:text-primary transition-colors" href="#hardware-specs">RPi4 Firmware Source</a>
          <span className="text-border-strong hidden sm:inline">·</span>
          <a className="hover:text-primary transition-colors" href="#evidence-telemetry">Documentation</a>
        </div>
      </div>
    </footer>
  );
}
