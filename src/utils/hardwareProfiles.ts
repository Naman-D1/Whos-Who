import { HardwareProfile } from '../types/pipeline';

export const HARDWARE_PROFILES: HardwareProfile[] = [
  {
    id: 'edge_camera_isp',
    name: 'Smart IP Camera (SoC ISP)',
    category: 'Edge IP Camera',
    soc: 'Ambarella S5L / HiSilicon Hi3516',
    cpuSpec: 'ARM Cortex-A7 Dual @ 1.2GHz',
    npuTops: 0.5,
    typicalPowerWatts: 2.2,
    macroblockSupport: 'Hardware ISP H.264/H.265',
    baselineFullAiWatts: 14.5, // requires offload or heavy embedded NPU
    edgeFlowWatts: 2.4, // near-zero overhead
  },
  {
    id: 'edge_gateway_npu',
    name: 'Edge AI Gateway Box',
    category: 'Edge Gateway',
    soc: 'NVIDIA Jetson Orin Nano / Hailo-8',
    cpuSpec: '6-core ARM Cortex-A78AE + Ampere GPU',
    npuTops: 20,
    typicalPowerWatts: 9.5,
    macroblockSupport: 'NPU Vector Unit',
    baselineFullAiWatts: 24.0,
    edgeFlowWatts: 6.8,
  },
  {
    id: 'centralized_cloud_vms',
    name: 'Centralized Cloud AI Server',
    category: 'Cloud Server',
    soc: 'AWS EC2 g5.xlarge (NVIDIA A10G 24GB)',
    cpuSpec: '4 vCPU AMD EPYC 7R32',
    npuTops: 125,
    typicalPowerWatts: 185,
    macroblockSupport: 'Host CPU Emulation',
    baselineFullAiWatts: 185.0,
    edgeFlowWatts: 42.0, // only triggered streams are ingested & processed
  },
];
