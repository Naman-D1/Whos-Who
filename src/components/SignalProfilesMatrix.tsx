import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Wind, 
  Bug, 
  User, 
  TreePine, 
  Car, 
  Activity, 
  TrendingUp,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface SignalProfileItem {
  id: string;
  name: string;
  category: 'Environmental Noise' | 'Target Entity';
  icon: typeof Bug;
  vectorCoherence: string;
  aspectRatioShape: string;
  netDisplacement: string;
  stridePeriodic: string;
  filterAction: 'DROP (Noise)' | 'DROP (Debris)' | 'DROP (Vegetation)' | 'PASS to AI';
  actionType: 'drop' | 'pass';
  detailedExplanation: string;
  sampleWaveform: number[]; // 24 points of vector angular deviation
  aspectRatioCurve: number[]; // 24 points of AR
  hardwareVerdict: string;
}

const SIGNAL_PROFILES: SignalProfileItem[] = [
  {
    id: 'insect',
    name: 'Insects / Lens Moths',
    category: 'Environmental Noise',
    icon: Bug,
    vectorCoherence: 'High angular shift (> 75°/frame), extreme localized pixel velocity',
    aspectRatioShape: 'Rapidly changing scaling factor (flutters toward and away from lens)',
    netDisplacement: 'Near zero global translation (< 25% net/gross ratio)',
    stridePeriodic: 'None (chaotic Brownian flutter)',
    filterAction: 'DROP (Noise)',
    actionType: 'drop',
    detailedExplanation: 'Moths, flies, and gnats flying inches from the camera sensor cover dozens of pixels per frame, creating deceptive large-scale motion. However, their vectors flip direction radically between frames, causing extreme angular variance (Var(θ) > 85°).',
    sampleWaveform: [78, 12, 160, 45, 172, 88, 15, 140, 92, 180, 20, 115, 165, 40, 95, 170, 30, 130, 85, 160, 25, 145, 90, 175],
    aspectRatioCurve: [1.2, 0.4, 2.1, 0.8, 1.9, 0.3, 1.7, 0.5, 2.0, 0.6, 1.8, 0.4, 2.2, 0.7, 1.5, 0.5, 2.1, 0.6, 1.9, 0.4, 1.8, 0.7, 2.0, 0.5],
    hardwareVerdict: 'Rejected in 0.8ms at Stage 2. GPU AI inference 100% suppressed.',
  },
  {
    id: 'trash_bag',
    name: 'Windblown Trash & Plastic Bags',
    category: 'Environmental Noise',
    icon: Wind,
    vectorCoherence: 'High internal vector variance (divergent macroblock vectors)',
    aspectRatioShape: 'Unstable / continuously deforming (stretches, tumbles, wrinkles)',
    netDisplacement: 'Moderate downwind drift, erratic tumbling rotation',
    stridePeriodic: 'None (turbulent aerodynamic tumbling)',
    filterAction: 'DROP (Debris)',
    actionType: 'drop',
    detailedExplanation: 'Tumbling plastic film or discarded boxes deform dynamically with wind gusts. The internal macroblock motion vectors diverge (some blocks point upward, others sideways), creating high internal spatial variance and erratic aspect ratio fluctuation (ΔAR > 0.45/s).',
    sampleWaveform: [42, 68, 95, 120, 85, 40, 110, 140, 75, 50, 130, 90, 60, 115, 145, 80, 55, 125, 95, 70, 135, 100, 65, 120],
    aspectRatioCurve: [0.8, 1.4, 0.5, 1.8, 0.9, 1.6, 0.6, 1.7, 0.8, 1.5, 0.7, 1.9, 0.9, 1.4, 0.6, 1.8, 0.8, 1.5, 0.7, 1.7, 0.9, 1.3, 0.6, 1.6],
    hardwareVerdict: 'Rejected in 1.2ms at Stage 2 due to high internal vector divergence.',
  },
  {
    id: 'foliage',
    name: 'Swaying Tree Branches & Foliage',
    category: 'Environmental Noise',
    icon: TreePine,
    vectorCoherence: 'High oscillatory frequency, periodic vector reversal every 0.4s',
    aspectRatioShape: 'Localized anchored deformation, consistent centroid anchor point',
    netDisplacement: 'Zero net translation over sliding window (||Σv|| / Σ||v|| < 0.15)',
    stridePeriodic: 'Harmonic oscillation (sinusoidal wind resonance, 1.5–3.0 Hz)',
    filterAction: 'DROP (Vegetation)',
    actionType: 'drop',
    detailedExplanation: 'Vegetation moves vigorously during storms, generating massive pixel delta masks. However, branches are tethered to tree trunks. Their motion vectors perfectly invert every half cycle, resulting in a net displacement ratio approaching zero.',
    sampleWaveform: [25, -24, 26, -25, 24, -26, 25, -23, 26, -25, 24, -24, 25, -26, 24, -25, 26, -24, 25, -25, 24, -26, 25, -24],
    aspectRatioCurve: [1.1, 1.15, 1.08, 1.14, 1.1, 1.15, 1.09, 1.13, 1.11, 1.16, 1.08, 1.14, 1.1, 1.15, 1.09, 1.13, 1.11, 1.15, 1.08, 1.14, 1.1, 1.15, 1.09, 1.13],
    hardwareVerdict: 'Filtered at Stage 2 via zero-net-displacement ratio check.',
  },
  {
    id: 'person',
    name: 'Person / Running Child / Intruder',
    category: 'Target Entity',
    icon: User,
    vectorCoherence: 'Unified torso translation vector + periodic limb swing harmonic',
    aspectRatioShape: 'Stable height-to-width ratio (upright posture, AR ~ 2.4–3.2)',
    netDisplacement: 'High directional alignment (net displacement ratio > 75%)',
    stridePeriodic: 'Bipedal stride cadence (1.2–3.2 Hz gait cycle)',
    filterAction: 'PASS to AI',
    actionType: 'pass',
    detailedExplanation: 'Walking or running humans exhibit a dominant translation vector shared across their torso and head macroblocks, with subtle complementary antiphase arm and leg swings. The bounding box aspect ratio remains upright and coherent over time.',
    sampleWaveform: [4, 6, 5, 4, 6, 5, 5, 4, 6, 5, 4, 6, 5, 4, 6, 5, 5, 4, 6, 5, 4, 6, 5, 4],
    aspectRatioCurve: [2.65, 2.62, 2.68, 2.64, 2.63, 2.67, 2.65, 2.62, 2.68, 2.64, 2.63, 2.67, 2.65, 2.62, 2.68, 2.64, 2.63, 2.67, 2.65, 2.62, 2.68, 2.64, 2.63, 2.67],
    hardwareVerdict: 'Kinematic match verified. Stage 3 Deep Learning AI triggered.',
  },
  {
    id: 'vehicle',
    name: 'Motor Vehicle / Cyclist',
    category: 'Target Entity',
    icon: Car,
    vectorCoherence: 'Extremely high directional alignment, near-zero internal variance',
    aspectRatioShape: 'Rigid invariant bounding geometry (zero structural deformation)',
    netDisplacement: 'Near 100% net displacement along linear trajectory',
    stridePeriodic: 'Continuous linear velocity (constant acceleration or cruise)',
    filterAction: 'PASS to AI',
    actionType: 'pass',
    detailedExplanation: 'Vehicles exhibit rigid-body kinematics. Every macroblock within the vehicle bounding box shares the same vector orientation and magnitude. Aspect ratio deformation is virtually zero, making them instant candidates for Stage 3 classification.',
    sampleWaveform: [1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1],
    aspectRatioCurve: [1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9],
    hardwareVerdict: 'Rigid body kinematics confirmed. Stage 3 Deep Learning AI triggered.',
  },
];

export const SignalProfilesMatrix: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('person');
  const selectedProfile = SIGNAL_PROFILES.find((p) => p.id === selectedId) || SIGNAL_PROFILES[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          Motion Signal Profiles
        </span>
        <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
          Stage 2 Vector Filtering Criteria &amp; Signal Signatures
        </h2>
        <p className="text-sm text-slate-400 max-w-3xl mt-2 leading-relaxed">
          Stage 2 replaces computationally impossible 3D physics engines with 2D trajectory kinematics. By evaluating vector variance, net displacement, and aspect ratio stability over sliding temporal windows, environmental noise is distinguished from valid targets.
        </p>
      </div>

      {/* Main Signal Matrix Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 shadow-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400">
              <th className="py-3.5 px-4 font-semibold">Object Type</th>
              <th className="py-3.5 px-4 font-semibold">Vector Coherence</th>
              <th className="py-3.5 px-4 font-semibold">Aspect Ratio / Shape</th>
              <th className="py-3.5 px-4 font-semibold">Net Displacement</th>
              <th className="py-3.5 px-4 font-semibold text-right">Filter Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-slate-300">
            {SIGNAL_PROFILES.map((profile) => {
              const Icon = profile.icon;
              const isSelected = profile.id === selectedId;
              const isPass = profile.actionType === 'pass';

              return (
                <tr
                  key={profile.id}
                  onClick={() => setSelectedId(profile.id)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-slate-800/80 text-white'
                      : 'hover:bg-slate-900/50'
                  }`}
                >
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg ${
                        isPass ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-800 text-slate-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-semibold block text-slate-100">{profile.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{profile.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs text-slate-300 leading-relaxed">
                    {profile.vectorCoherence}
                  </td>
                  <td className="py-3.5 px-4 max-w-xs text-slate-300 leading-relaxed">
                    {profile.aspectRatioShape}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                    {profile.netDisplacement}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 font-mono text-xs font-semibold px-2.5 py-1 rounded ${
                      isPass
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/80'
                        : 'bg-rose-950 text-rose-300 border border-rose-800/80'
                    }`}>
                      {isPass ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <X className="w-3.5 h-3.5 text-rose-400" />}
                      {profile.filterAction}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Selected Profile Waveform & Deep Dive Panel */}
      <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${
              selectedProfile.actionType === 'pass'
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                : 'bg-rose-950 text-rose-400 border border-rose-800/60'
            }`}>
              <selectedProfile.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{selectedProfile.name}</h3>
                <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                  selectedProfile.actionType === 'pass'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-rose-950 text-rose-400 border border-rose-800'
                }`}>
                  {selectedProfile.filterAction}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{selectedProfile.hardwareVerdict}</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-4 rounded-lg border border-slate-800/80">
          {selectedProfile.detailedExplanation}
        </p>

        {/* Live Vector Trajectory Waveforms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Waveform 1: Angular Deviation */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Vector Heading Stability (Δθ across 24 frames)</span>
              <span className="font-mono text-slate-500 text-[11px]">Degrees deviation</span>
            </div>
            {/* SVG Waveform Chart */}
            <div className="h-24 w-full flex items-end gap-1.5 pt-4">
              {selectedProfile.sampleWaveform.map((val, i) => {
                const heightPct = Math.min(100, Math.max(10, Math.abs(val) / 1.8));
                const isErratic = Math.abs(val) > 40;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                    <div
                      className={`w-full rounded-t transition-all ${
                        isErratic ? 'bg-rose-500/80' : 'bg-emerald-500/80'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-7 bg-slate-800 text-[9px] font-mono px-1 rounded text-white pointer-events-none z-10">
                      {val}°
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 font-mono">
              <span>t - 24 frames</span>
              <span>Rejection threshold: 38°</span>
              <span>Current t</span>
            </div>
          </div>

          {/* Waveform 2: Aspect Ratio Stability */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Aspect Ratio Deformation (W / H stability)</span>
              <span className="font-mono text-slate-500 text-[11px]">Geometric ratio</span>
            </div>
            {/* SVG Line / Bar Representation */}
            <div className="h-24 w-full flex items-end gap-1.5 pt-4">
              {selectedProfile.aspectRatioCurve.map((val, i) => {
                const heightPct = Math.min(100, (val / 3.0) * 100);
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                    <div
                      className={`w-full rounded-t transition-all ${
                        selectedProfile.actionType === 'pass' ? 'bg-cyan-500/80' : 'bg-amber-500/80'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-7 bg-slate-800 text-[9px] font-mono px-1 rounded text-white pointer-events-none z-10">
                      {val.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 font-mono">
              <span>t - 24 frames</span>
              <span>Humans: Upright ~2.6</span>
              <span>Current t</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
