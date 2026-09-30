import React, { useState } from 'react';
import { 
  Zap, 
  Cpu, 
  ShieldCheck, 
  Activity, 
  Layers, 
  Sliders, 
  Download, 
  ArrowRight,
  TrendingDown,
  Info
} from 'lucide-react';
import { TopBar } from './components/TopBar';
import { PipelineSimulator } from './components/PipelineSimulator';
import { LiveDeviceCamera } from './components/LiveDeviceCamera';
import { ArchitectureEvolution } from './components/ArchitectureEvolution';
import { SignalProfilesMatrix } from './components/SignalProfilesMatrix';
import { HardwareTelemetry } from './components/HardwareTelemetry';
import { TcoCalculator } from './components/TcoCalculator';
import { FilterTuner } from './components/FilterTuner';
import { EdgeConfigModal } from './components/EdgeConfigModal';
import { FirmwareCodeViewer } from './components/FirmwareCodeViewer';
import { FilterParameters } from './types/pipeline';
import { DEFAULT_FILTER_PARAMS } from './utils/motionSimulation';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('camera');
  const [filterParams, setFilterParams] = useState<FilterParameters>(DEFAULT_FILTER_PARAMS);
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);
  const [isCodeOpen, setIsCodeOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* 3-Zone Compliant Top Navigation Bar */}
      <TopBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenConfig={() => setIsConfigOpen(true)}
        onOpenCode={() => setIsCodeOpen(true)}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Executive Hero Banner */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span>System Architecture Proposal &amp; Prototype</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400">OpenCV Device Camera</span>
                <span aria-hidden="true">·</span>
                <span>ISP Optical Flow Cascade</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Lightweight Edge Motion Filtering for AI Video Analytics
              </h1>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Eliminating false-positive AI inference via hardware-accelerated vector analysis. Connect your webcam to test real optical flow vector coherence, angular variance, and human vs. noise filtering in real-time.
              </p>
            </div>

            {/* Quick Navigation Segmented Controls */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800 shrink-0 self-start md:self-end overflow-x-auto max-w-full">
              <button
                onClick={() => setActiveTab('camera')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'camera'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-200"></span>
                Device Camera (OpenCV)
              </button>
              <button
                onClick={() => setActiveTab('simulator')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'simulator'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Synthetic Simulator
              </button>
              <button
                onClick={() => setActiveTab('evolution')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'evolution'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Architecture Spec
              </button>
              <button
                onClick={() => setActiveTab('profiles')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'profiles'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Signal Profiles
              </button>
              <button
                onClick={() => setActiveTab('telemetry')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'telemetry'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Hardware Benchmarks
              </button>
              <button
                onClick={() => setActiveTab('tco')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'tco'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                TCO &amp; ROI
              </button>
            </div>
          </div>

          {/* Clean Unboxed Key Metrics Bar (Adheres to Zero-Pill & Tabular Discipline) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-900/40 border border-slate-800/80 rounded-xl">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                GPU Compute Reduction
              </span>
              <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                -78.4%
              </div>
              <span className="text-[11px] text-slate-500 block">
                Suppresses environmental noise
              </span>
            </div>

            <div className="space-y-1 border-l border-slate-800/80 pl-4">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                Edge Power Dissipation
              </span>
              <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                4.2 W <span className="text-xs text-slate-500 font-normal">vs 28.5 W</span>
              </div>
              <span className="text-[11px] text-slate-500 block">
                Prevents camera thermal throttling
              </span>
            </div>

            <div className="space-y-1 border-l border-slate-800/80 pl-4">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                Vector Extraction Cost
              </span>
              <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">
                0.0 ms <span className="text-xs text-slate-500 font-normal">GPU load</span>
              </div>
              <span className="text-[11px] text-slate-500 block">
                Direct H.264/H.265 ISP register reuse
              </span>
            </div>

            <div className="space-y-1 border-l border-slate-800/80 pl-4">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                Spatial Memory RAM
              </span>
              <div className="text-2xl font-bold font-mono text-slate-200 tabular-nums">
                &lt; 184 KB
              </div>
              <span className="text-[11px] text-slate-500 block">
                Zero multi-object Re-ID memory
              </span>
            </div>
          </div>
        </section>

        {/* Tab Viewport Routing */}
        {activeTab === 'camera' && (
          <section className="space-y-8">
            <LiveDeviceCamera filterParams={filterParams} />
            <FilterTuner params={filterParams} onChange={setFilterParams} />
          </section>
        )}

        {activeTab === 'simulator' && (
          <section className="space-y-8">
            <PipelineSimulator filterParams={filterParams} />
            <FilterTuner params={filterParams} onChange={setFilterParams} />
          </section>
        )}

        {activeTab === 'evolution' && (
          <section>
            <ArchitectureEvolution />
          </section>
        )}

        {activeTab === 'profiles' && (
          <section>
            <SignalProfilesMatrix />
          </section>
        )}

        {activeTab === 'telemetry' && (
          <section>
            <HardwareTelemetry />
          </section>
        )}

        {activeTab === 'tco' && (
          <section>
            <TcoCalculator />
          </section>
        )}
      </main>

      {/* Clean Footer (No fake engines, clean copyright and actions) */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 px-6 text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">EdgeFlow Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Hardware-Accelerated Optical Flow Vector Analysis</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCodeOpen(true)}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              C-Kernel Firmware
            </button>
            <button
              onClick={() => setIsConfigOpen(true)}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Edge Config JSON
            </button>
            <button
              onClick={() => setActiveTab('evolution')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Architecture Spec
            </button>
          </div>
        </div>
      </footer>

      {/* Edge Deployment Config Modal */}
      <EdgeConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        filterParams={filterParams}
      />

      {/* Embedded C/C++ Firmware Code Viewer Modal */}
      <FirmwareCodeViewer
        isOpen={isCodeOpen}
        onClose={() => setIsCodeOpen(false)}
      />
    </div>
  );
}
