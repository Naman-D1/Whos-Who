import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  Workflow, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Sparkles,
  Zap
} from 'lucide-react';

export const ArchitectureEvolution: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(2);

  const steps = [
    {
      id: 0,
      title: 'Traditional Standard AI',
      subtitle: 'Brute-Force Neural Inference',
      badge: 'Legacy Pattern',
      badgeColor: 'text-rose-400 bg-rose-950/60 border-rose-800/80',
      description: 'Wakes up a heavy deep neural network (YOLOv8, RT-DETR, or Vision Transformer) for every single moving pixel group. Even a tiny moth fluttering at night triggers 100% GPU activation.',
      pitfalls: [
        'Wastes up to 80% of total edge battery and compute on environmental noise',
        'Severe thermal throttling on outdoor IP cameras (ambient 45°C + 15W GPU = thermal shutdown)',
        'Floods security control rooms with 1,000+ false alarm notifications per night',
        'Massive cloud egress bandwidth costs if streaming raw video for server-side classification',
      ],
      metrics: {
        computeWasted: '80%',
        powerUsage: '28.5 W',
        falseAlarms: 'High (~1,200/day)',
        hardwareCost: 'Requires $350+ Edge GPU',
      },
    },
    {
      id: 1,
      title: 'Physics Engine Simulation',
      subtitle: 'Theoretical Physics Modeling',
      badge: 'Theoretical Idea',
      badgeColor: 'text-amber-400 bg-amber-950/60 border-amber-800/80',
      description: 'Attempts to filter false alarms by simulating rigid-body and soft-body aerodynamic physics (mass, gravity, air resistance, wind drag) on candidate bounding boxes.',
      pitfalls: [
        'Impossible to deduce 3D mass, density, and friction coefficients from raw 2D pixel bounding boxes',
        'Requires wind anemometer telemetry and multi-view 3D depth sensors not present on CCTV cameras',
        'Simulating non-linear fluid dynamics and cloth deformation on edge CPUs explodes latency > 120ms',
        'Still requires high CPU/memory utilization, defeating the objective of ultra-lightweight filtering',
      ],
      metrics: {
        computeWasted: '65%',
        powerUsage: '18.2 W',
        falseAlarms: 'Moderate',
        hardwareCost: 'Complex multi-sensor setup',
      },
    },
    {
      id: 2,
      title: 'Optical Flow Cascade (Proposed)',
      subtitle: 'Zero-Cost ISP Vector Kinematics',
      badge: 'EdgeFlow Solution',
      badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/80',
      description: 'Leverages the camera ISP built-in H.264/H.265 compression encoder to harvest macroblock motion vectors for free. Evaluates vector angular variance, net displacement, and aspect ratio stability before any AI is awakened.',
      pitfalls: [],
      advantages: [
        'Zero GPU Load: Reuses existing P-frame macroblock motion estimation (SAD/ME) already computed by camera SoC',
        'Multi-Stage Early Rejection: 80% of environmental noise dropped in Stage 2 with < 2ms latency',
        'Eliminates Spatial Memory Overhead: No need to store, track, or re-identify small transient clutter',
        'Compatible with low-cost $15 IP camera chips (Ambarella, HiSilicon, Rockchip, Allwinner)',
      ],
      metrics: {
        computeWasted: '< 4%',
        powerUsage: '4.2 W',
        falseAlarms: 'Near Zero (< 10/day)',
        hardwareCost: '$0 added BOM (existing ISP)',
      },
    },
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div>
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          Architecture Evolution
        </span>
        <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
          Eliminating False-Positive AI Inference via Hardware-Accelerated Vector Analysis
        </h2>
        <p className="text-sm text-slate-400 max-w-3xl mt-2 leading-relaxed">
          Current AI video analytics waste up to 80% of compute power running heavy deep-learning models on environmental noise (bugs, windblown trash, foliage). By replacing full-model inference and complex physics simulations with low-cost Optical Flow Vector Analysis, we filter out erratic motion early.
        </p>
      </div>

      {/* 3 Architecture Approaches Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step, idx) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(idx)}
            className={`text-left p-5 rounded-xl border transition-all cursor-pointer relative ${
              activeStep === idx
                ? 'bg-slate-900 border-slate-700 shadow-lg shadow-black/40 ring-1 ring-slate-600'
                : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${step.badgeColor}`}>
                {step.badge}
              </span>
              <span className="text-xs text-slate-500 font-mono">0{idx + 1}</span>
            </div>
            <h3 className="text-base font-semibold text-white tracking-tight">{step.title}</h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">{step.subtitle}</p>
          </button>
        ))}
      </div>

      {/* Active Step Deep-Dive Comparison */}
      <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white">{steps[activeStep].title}</h3>
              <span className={`text-xs font-mono px-2.5 py-0.5 rounded border ${steps[activeStep].badgeColor}`}>
                {steps[activeStep].subtitle}
              </span>
            </div>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              {steps[activeStep].description}
            </p>
          </div>

          {/* Metric Badges */}
          <div className="flex flex-wrap gap-3">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center min-w-[110px]">
              <span className="text-[10px] text-slate-500 block uppercase">Compute Wasted</span>
              <span className={`text-lg font-bold font-mono tabular-nums ${
                activeStep === 2 ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {steps[activeStep].metrics.computeWasted}
              </span>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center min-w-[110px]">
              <span className="text-[10px] text-slate-500 block uppercase">System Power</span>
              <span className={`text-lg font-bold font-mono tabular-nums ${
                activeStep === 2 ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {steps[activeStep].metrics.powerUsage}
              </span>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center min-w-[130px]">
              <span className="text-[10px] text-slate-500 block uppercase">False Alarms</span>
              <span className="text-sm font-semibold text-slate-200 mt-1 block">
                {steps[activeStep].metrics.falseAlarms}
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Points */}
        <div className="pt-4 border-t border-slate-800">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            {activeStep === 2 ? 'Key Architectural Advantages' : 'Critical Failure Modes & Limitations'}
          </h4>

          {activeStep === 2 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {steps[activeStep].advantages?.map((adv, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-emerald-200/90 leading-relaxed">{adv}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {steps[activeStep].pitfalls?.map((pit, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-rose-950/20 border border-rose-900/40">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-rose-200/90 leading-relaxed">{pit}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Multi-Stage Pipeline Breakdown Table (Section 2 from Proposal) */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            Execution Flow
          </span>
          <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
            Multi-Stage Hardware-Accelerated Pipeline
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Data flows hierarchically from near-free pixel checks to vector variance filters, waking up heavy deep learning only when kinematic thresholds are satisfied.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400">
                <th className="py-3 px-4 font-semibold">Stage</th>
                <th className="py-3 px-4 font-semibold">Mechanism</th>
                <th className="py-3 px-4 font-semibold">Operation &amp; Physical Checks</th>
                <th className="py-3 px-4 font-semibold text-right">Compute Cost</th>
                <th className="py-3 px-4 font-semibold text-right">Execution Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="py-3.5 px-4 font-mono font-medium text-amber-400 whitespace-nowrap">
                  Stage 1
                </td>
                <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">
                  Pixel Motion Check
                </td>
                <td className="py-3.5 px-4 text-slate-300 leading-relaxed">
                  Detects raw pixel shifts using standard temporal background subtraction. Drops completely static scenes without waking downstream stages.
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-amber-400 tabular-nums whitespace-nowrap">
                  &lt; 1% (Near Free)
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-slate-400 tabular-nums whitespace-nowrap">
                  0.4 ms
                </td>
              </tr>
              <tr className="hover:bg-slate-900/40 transition-colors bg-cyan-950/10">
                <td className="py-3.5 px-4 font-mono font-medium text-cyan-400 whitespace-nowrap">
                  Stage 2
                </td>
                <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">
                  Vector Coherence Filter
                </td>
                <td className="py-3.5 px-4 text-slate-300 leading-relaxed">
                  Calculates angular vector variance (<span className="font-mono text-cyan-300">Var(θ)</span>), net displacement ratio, aspect ratio stability (<span className="font-mono text-cyan-300">ΔAR</span>), and stride frequency. Drops bugs, windblown trash, and swaying foliage.
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-cyan-400 tabular-nums whitespace-nowrap">
                  ~3–5% CPU/NPU
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-slate-400 tabular-nums whitespace-nowrap">
                  1.6 ms
                </td>
              </tr>
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="py-3.5 px-4 font-mono font-medium text-emerald-400 whitespace-nowrap">
                  Stage 3
                </td>
                <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">
                  Deep Learning AI (YOLO/ViT)
                </td>
                <td className="py-3.5 px-4 text-slate-300 leading-relaxed">
                  Runs full object classification and attribute extraction (person, weapon, vehicle, license plate) strictly when candidate motion passes Stage 2 filters.
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-emerald-400 tabular-nums whitespace-nowrap">
                  100% (Triggered Rarely)
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-slate-400 tabular-nums whitespace-nowrap">
                  34.0 ms
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
