import React, { useState } from 'react';

export default function SerialConnectModal({
  isOpen,
  onClose,
  isSerialConnected,
  onConnectWebSerial,
  onDisconnectSerial,
  serialLogs
}) {
  const [baudRate, setBaudRate] = useState('115200');

  if (!isOpen) return null;

  const isWebSerialSupported = typeof navigator !== 'undefined' && 'serial' in navigator;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-deep/60 backdrop-blur-md animate-fade-in">
      <div className="glass-surface border border-white/80 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-border-subtle flex items-center justify-between bg-surface-subtle">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary text-xl">usb</span>
            <div>
              <h3 className="text-sm font-bold text-forest-deep uppercase font-telemetry-mono">
                RPI4 HARDWARE SERIAL BRIDGE
              </h3>
              <p className="text-xs text-on-surface-variant font-body-sm">
                Web Serial API / Local USB COM Port
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-outline hover:text-forest-deep p-1 rounded-lg transition"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 overflow-y-auto">
          <div className="bg-surface-subtle p-3 rounded-xl border border-border-subtle text-xs font-telemetry-mono space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-on-surface-variant">Browser Support:</span>
              <span className={isWebSerialSupported ? "text-primary font-bold" : "text-alarm-amber font-bold"}>
                {isWebSerialSupported ? 'Web Serial API Available' : 'Not Supported (Use Sim)'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-on-surface-variant">Baud Rate:</span>
              <select
                value={baudRate}
                onChange={(e) => setBaudRate(e.target.value)}
                className="bg-surface-base border border-border-strong rounded px-2 py-1 text-xs font-telemetry-mono text-forest-deep focus:outline-none focus:border-primary"
              >
                <option value="115200">115200 (Default)</option>
                <option value="9600">9600</option>
                <option value="57600">57600</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-on-surface-variant">Connection State:</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                isSerialConnected ? 'bg-secondary-container text-primary' : 'bg-alarm-amber-subtle text-alarm-amber'
              }`}>
                {isSerialConnected ? 'CONNECTED' : 'DISCONNECTED / SIMULATION'}
              </span>
            </div>
          </div>

          {/* Terminal stream log view */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-telemetry-mono text-outline">
              <span>RPi4 STREAM (UART0 TX/RX)</span>
              <span>100Hz RING BUFFER</span>
            </div>
            <div className="bg-[#050b09] text-[#34d399] font-telemetry-mono text-[11px] p-3 rounded-xl h-36 overflow-y-auto border border-border-strong space-y-1">
              {serialLogs.length === 0 ? (
                <div className="text-slate-500 italic">No incoming serial packets. Connect device or run simulation.</div>
              ) : (
                serialLogs.map((line, i) => (
                  <div key={i} className="leading-tight font-mono">{line}</div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-border-subtle bg-surface-subtle flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-border-subtle text-xs font-telemetry-mono text-on-surface-variant hover:bg-white transition"
          >
            Close
          </button>
          {isSerialConnected ? (
            <button
              onClick={onDisconnectSerial}
              className="px-4 py-2 rounded-lg bg-alarm-red text-white text-xs font-telemetry-mono font-semibold transition hover:bg-red-600 shadow-sm"
            >
              Disconnect Serial
            </button>
          ) : (
            <button
              onClick={() => onConnectWebSerial(Number(baudRate))}
              className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-telemetry-mono font-semibold transition hover:bg-primary-hover shadow-sm flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">cable</span>
              <span>Connect RPi4 (Web Serial)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
