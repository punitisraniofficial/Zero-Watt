import React from 'react';
import logoUrl from '../assets/logo.png';

export default function Navbar({ onOpenSerialModal, isSerialConnected }) {
  return (
    <header className="bg-surface-base/95 backdrop-blur-md border-b border-border-subtle sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand: Logo + ZeroWatt */}
        <a className="flex items-center gap-3 group" href="#">
          <img 
            alt="ZeroWatt Logo" 
            className="w-9 h-9 object-contain rounded-full border border-border-subtle p-0.5 bg-surface-base shadow-sm group-hover:scale-105 transition-transform" 
            src={logoUrl} 
          />
          <span className="text-xl font-headline-sm font-bold text-forest-deep tracking-tight">ZeroWatt</span>
        </a>

        {/* Clean Landing Page Nav Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-label-md text-label-md text-on-surface-variant">
          <a className="hover:text-primary transition-colors font-medium" href="#features">Features</a>
          <a className="hover:text-primary transition-colors font-medium" href="#problem">The Problem</a>
          <a className="text-primary font-semibold hover:text-primary-hover transition-colors" href="#live-simulator">Live Simulator</a>
          <a className="hover:text-primary transition-colors font-medium" href="#evidence-telemetry">Evidence &amp; Telemetry</a>
          <a className="hover:text-primary transition-colors font-medium" href="#architecture">Architecture</a>
          <a className="hover:text-primary transition-colors font-medium" href="#hardware-specs">Hardware Specs</a>
        </nav>

        {/* Right Header Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSerialModal}
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-telemetry-mono text-[11px] font-semibold transition hover:opacity-90 ${
              isSerialConnected 
                ? 'bg-secondary-container border-primary text-forest-deep' 
                : 'bg-alarm-amber-subtle border-alarm-amber/40 text-alarm-amber'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full pulse-dot ${isSerialConnected ? 'bg-primary' : 'bg-alarm-amber'}`}></span>
            <span>{isSerialConnected ? 'ESP32 Connected (115200)' : 'Simulation Mode'}</span>
          </button>

          <a 
            className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-surface-base px-4 py-2 rounded-lg text-label-md font-label-md font-semibold transition active:scale-95 shadow-sm shadow-primary/20" 
            href="#live-simulator"
          >
            <span className="material-symbols-outlined text-base">terminal</span>
            <span>Launch Simulator</span>
          </a>
        </div>
      </div>
    </header>
  );
}
