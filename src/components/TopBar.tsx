import React from 'react';
import { Download, Sliders } from 'lucide-react';

interface TopBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenConfig: () => void;
  onOpenCode: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  setActiveTab,
  onOpenConfig,
  onOpenCode,
}) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <a 
        href="#" 
        onClick={(e) => { e.preventDefault(); setActiveTab('simulator'); }}
        className="text-lg font-bold tracking-tight text-white flex items-center gap-2 hover:text-emerald-400 transition-colors"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
        EdgeFlow
      </a>

      {/* Zone 2: 4-6 clean text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
        <button
          onClick={() => setActiveTab('camera')}
          className={`hover:text-white transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'camera' ? 'text-white border-b-2 border-emerald-500 pb-0.5' : ''
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Live Camera (OpenCV)
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`hover:text-white transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'simulator' ? 'text-white border-b-2 border-emerald-500 pb-0.5' : ''
          }`}
        >
          Synthetic Simulator
        </button>
        <button
          onClick={() => setActiveTab('evolution')}
          className={`hover:text-white transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'evolution' ? 'text-white border-b-2 border-emerald-500 pb-0.5' : ''
          }`}
        >
          Architecture Spec
        </button>
        <button
          onClick={() => setActiveTab('profiles')}
          className={`hover:text-white transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'profiles' ? 'text-white border-b-2 border-emerald-500 pb-0.5' : ''
          }`}
        >
          Signal Profiles
        </button>
        <button
          onClick={() => setActiveTab('telemetry')}
          className={`hover:text-white transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'telemetry' ? 'text-white border-b-2 border-emerald-500 pb-0.5' : ''
          }`}
        >
          Hardware Benchmark
        </button>
        <button
          onClick={() => setActiveTab('tco')}
          className={`hover:text-white transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'tco' ? 'text-white border-b-2 border-emerald-500 pb-0.5' : ''
          }`}
        >
          TCO & ROI
        </button>
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenCode}
          className="px-3.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-700/80 rounded-lg hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <Sliders className="w-3.5 h-3.5 text-slate-400" />
          <span>ISP C-Filter Kernel</span>
        </button>
        <button
          onClick={onOpenConfig}
          className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 transition-colors flex items-center gap-2 whitespace-nowrap shadow-sm shadow-emerald-500/20 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-slate-950" />
          <span>Export Edge Config</span>
        </button>
      </div>
    </header>
  );
};
