import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode } from 'lucide-react';
import { FilterParameters } from '../types/pipeline';

interface EdgeConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterParams: FilterParameters;
}

export const EdgeConfigModal: React.FC<EdgeConfigModalProps> = ({
  isOpen,
  onClose,
  filterParams,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const configJson = {
    schema_version: "2.1.0",
    pipeline_name: "EdgeFlow_Hardware_Accelerated_Cascade",
    target_environment: "Outdoor_Perimeter_CCTV",
    isp_vector_harvesting: {
      enabled: true,
      codec_engine: "H264_H265_P_FRAME",
      macroblock_dimension_px: 16,
      read_mode: "DIRECT_DMA_REGISTER",
      zero_copy_buffer: true
    },
    stage_1_pixel_motion: {
      method: "TEMPORAL_BACKGROUND_SUBTRACTION",
      luminance_delta_threshold: 18,
      min_motion_macroblocks: 2,
      compute_budget_percent: 0.8
    },
    stage_2_vector_coherence: {
      sliding_temporal_window_frames: 12,
      angular_variance_max_degrees: filterParams.varianceThreshold,
      min_net_displacement_ratio: filterParams.minNetDisplacement,
      max_aspect_ratio_deformation_rate: filterParams.maxAspectDeformation,
      stride_cadence_detection: {
        enabled: true,
        frequency_range_hz: [filterParams.strideFrequencyMin, filterParams.strideFrequencyMax]
      },
      spatial_rejection_policy: {
        drop_erratic_jitter: true,
        drop_oscillating_foliage: true,
        drop_tumbling_debris: true
      }
    },
    stage_3_deep_learning_inference: {
      wake_trigger_policy: "COHERENT_KINEMATICS_ONLY",
      model_runtime: "TFLite_NNAPI_HailoRT",
      model_path: "/opt/models/yolov8s_security_quant_int8.bin",
      inference_confidence_threshold: 0.75,
      cooldown_period_frames: 15
    },
    telemetry: {
      log_stage_2_rejection_metrics: true,
      suppress_cloud_upload_on_drop: true
    }
  };

  const jsonString = JSON.stringify(configJson, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'edgeflow_pipeline_config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl space-y-0">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Edge Pipeline Configuration (JSON)</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-400 leading-relaxed">
            This configuration file is loaded directly by the camera SoC daemon (<code className="text-emerald-300 font-mono text-[11px]">/etc/edgeflow/config.json</code>). It configures the hardware ISP DMA registers and Stage 2 kinematic thresholds.
          </p>

          <div className="relative">
            <pre className="p-4 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 max-h-80 overflow-y-auto leading-relaxed">
              {jsonString}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-950/60">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 transition-colors flex items-center gap-2 cursor-pointer shadow-sm shadow-emerald-500/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download edgeflow_pipeline_config.json</span>
          </button>
        </div>
      </div>
    </div>
  );
};
