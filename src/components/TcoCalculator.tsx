import React, { useState } from 'react';
import { 
  DollarSign, 
  Zap, 
  HardDrive, 
  Leaf, 
  TrendingDown, 
  ShieldCheck, 
  Server,
  Calculator
} from 'lucide-react';

export const TcoCalculator: React.FC = () => {
  const [cameraCount, setCameraCount] = useState<number>(150);
  const [noiseEnvironment, setNoiseEnvironment] = useState<'low' | 'moderate' | 'severe'>('moderate');
  const [deploymentModel, setDeploymentModel] = useState<'edge_npu' | 'cloud_gpu'>('edge_npu');

  // Noise event multiplier per camera per day
  const noiseEventsPerDay = noiseEnvironment === 'low' ? 600 : noiseEnvironment === 'moderate' ? 1400 : 3200;
  const filterRejectionRate = 0.785; // 78.5% noise rejected

  // Total daily events filtered across fleet
  const totalDailyNoiseEvents = cameraCount * noiseEventsPerDay;
  const filteredEventsPerDay = Math.round(totalDailyNoiseEvents * filterRejectionRate);

  // Compute power & cost calculation
  // Cloud GPU inference cost per 1,000 calls ~ $0.003 or $1.00/hour for dedicated instance
  // Edge power: 24W baseline vs 6.8W EdgeFlow -> delta 17.2W per camera
  const wattsSavedPerCamera = deploymentModel === 'edge_npu' ? 17.2 : 45.0;
  const totalWattsSaved = cameraCount * wattsSavedPerCamera;
  const annualKwhSaved = (totalWattsSaved * 24 * 365) / 1000;
  const electricityRate = 0.16; // $0.16 per kWh
  const annualPowerSavings = Math.round(annualKwhSaved * electricityRate);

  // Cloud inference / bandwidth savings
  const monthlyBandwidthGbSaved = Math.round((filteredEventsPerDay * 30 * 2.5) / 1024); // 2.5MB per triggered clip
  const annualCloudCostSavings = deploymentModel === 'cloud_gpu'
    ? Math.round((filteredEventsPerDay * 365 * 0.0018) + (monthlyBandwidthGbSaved * 12 * 0.08))
    : Math.round(annualPowerSavings + (cameraCount * 120)); // hardware longevity extension

  // CO2 metric tons (EPA approx: 0.855 lbs CO2 per kWh = 0.000388 metric tons)
  const annualCarbonTons = (annualKwhSaved * 0.000388).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          Enterprise TCO &amp; ROI
        </span>
        <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
          Scale Economics: 70–80% Compute &amp; Energy Reduction
        </h2>
        <p className="text-sm text-slate-400 max-w-3xl mt-2 leading-relaxed">
          Quantify the concrete energy, bandwidth, and GPU infrastructure savings of deploying EdgeFlow across enterprise camera fleets.
        </p>
      </div>

      {/* Main Interactive Calculator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls Column (Left 5 cols) */}
        <div className="lg:col-span-5 p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-6">
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-400" />
            <span>Deployment Fleet Parameters</span>
          </h3>

          {/* Camera Count Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Camera Fleet Sizing:</span>
              <span className="font-mono text-emerald-400 font-bold text-sm tabular-nums">
                {cameraCount} Cameras
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={1000}
              step={10}
              value={cameraCount}
              onChange={(e) => setCameraCount(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>10</span>
              <span>250</span>
              <span>500</span>
              <span>1,000</span>
            </div>
          </div>

          {/* Environmental Noise Profile */}
          <div className="space-y-2">
            <span className="text-xs text-slate-400 block">Outdoor Noise Environment:</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setNoiseEnvironment('low')}
                className={`py-2 px-2 text-xs rounded-lg border transition-all cursor-pointer text-center ${
                  noiseEnvironment === 'low'
                    ? 'bg-slate-800 border-emerald-500/80 text-white font-medium'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="block font-medium">Low Noise</span>
                <span className="text-[10px] text-slate-500 block">Warehouse</span>
              </button>
              <button
                onClick={() => setNoiseEnvironment('moderate')}
                className={`py-2 px-2 text-xs rounded-lg border transition-all cursor-pointer text-center ${
                  noiseEnvironment === 'moderate'
                    ? 'bg-slate-800 border-emerald-500/80 text-white font-medium'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="block font-medium">Moderate</span>
                <span className="text-[10px] text-slate-500 block">Perimeter / Lot</span>
              </button>
              <button
                onClick={() => setNoiseEnvironment('severe')}
                className={`py-2 px-2 text-xs rounded-lg border transition-all cursor-pointer text-center ${
                  noiseEnvironment === 'severe'
                    ? 'bg-slate-800 border-emerald-500/80 text-white font-medium'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="block font-medium">Severe / Wind</span>
                <span className="text-[10px] text-slate-500 block">Forest / Highway</span>
              </button>
            </div>
          </div>

          {/* Deployment Model */}
          <div className="space-y-2">
            <span className="text-xs text-slate-400 block">System Architecture Target:</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setDeploymentModel('edge_npu')}
                className={`py-2 px-3 text-xs rounded-lg border transition-all cursor-pointer text-left ${
                  deploymentModel === 'edge_npu'
                    ? 'bg-slate-800 border-emerald-500/80 text-white font-medium'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="block font-semibold">Edge IP Cameras</span>
                <span className="text-[10px] text-slate-500">SoC &amp; On-prem Gateways</span>
              </button>
              <button
                onClick={() => setDeploymentModel('cloud_gpu')}
                className={`py-2 px-3 text-xs rounded-lg border transition-all cursor-pointer text-left ${
                  deploymentModel === 'cloud_gpu'
                    ? 'bg-slate-800 border-emerald-500/80 text-white font-medium'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="block font-semibold">Cloud AI Ingestion</span>
                <span className="text-[10px] text-slate-500">AWS / Azure VMS Cluster</span>
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500 space-y-1">
            <div>· Baseline assumption: Standard YOLOv8 neural network inference per motion cluster</div>
            <div>· Vector Filter efficiency: 78.5% environmental motion rejection at Stage 2</div>
          </div>
        </div>

        {/* Results & Value Realization (Right 7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Hero ROI Metric Card */}
          <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                Total Estimated Annual Operational Savings
              </span>
              <span className="text-xs font-mono text-slate-400">USD / Year</span>
            </div>

            <div className="text-4xl font-extrabold text-white font-mono tabular-nums tracking-tight">
              ${annualCloudCostSavings.toLocaleString()}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Achieved by suppressing <strong className="text-emerald-400 font-mono">{filteredEventsPerDay.toLocaleString()} false-positive AI wakeups</strong> every single day across {cameraCount} cameras before they consume GPU inference cycles.
            </p>
          </div>

          {/* Impact Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Metric 1: Power Saved */}
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Clean Energy Saved</span>
              </div>
              <div className="text-xl font-bold text-white font-mono tabular-nums">
                {Math.round(annualKwhSaved).toLocaleString()} <span className="text-xs font-normal text-slate-400">kWh/yr</span>
              </div>
              <p className="text-[10px] text-slate-500">
                Prevents edge thermal throttling
              </p>
            </div>

            {/* Metric 2: Bandwidth Egress Saved */}
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
                <span>Uplink Egress Saved</span>
              </div>
              <div className="text-xl font-bold text-white font-mono tabular-nums">
                {(monthlyBandwidthGbSaved / 1024).toFixed(1)} <span className="text-xs font-normal text-slate-400">TB/mo</span>
              </div>
              <p className="text-[10px] text-slate-500">
                Drastically cuts 4G/5G data bills
              </p>
            </div>

            {/* Metric 3: Carbon Offset */}
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                <span>Carbon Reduction</span>
              </div>
              <div className="text-xl font-bold text-white font-mono tabular-nums">
                {annualCarbonTons} <span className="text-xs font-normal text-slate-400">tCO₂e</span>
              </div>
              <p className="text-[10px] text-slate-500">
                ESG sustainability benchmark
              </p>
            </div>
          </div>

          {/* Qualitative Operational Highlights */}
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2.5">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Control Room &amp; Security Operator Impact
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span><strong>Zero Alert Fatigue:</strong> Security dispatchers respond only to valid human and vehicle intrusions rather than nocturnal moth swarms.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span><strong>Zero Memory Leakage:</strong> Stateless temporal sliding window requires only 184 KB RAM without tracking or re-identifying transient noise.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
