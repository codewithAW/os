export interface ProcessorSeries {
  name: string;
  series: string[];
  details: Record<string, string>;
}

export const intelSeries: ProcessorSeries = {
  name: 'Intel',
  series: ['U Series', 'H Series', 'HX Series', 'HK Series', 'K Series', 'KF Series', 'F Series', 'T Series'],
  details: {
    'U Series': 'Designed for thin and light laptops with efficient power and balanced performance.',
    'H Series': 'High performance mobile processors for gaming and creative workloads.',
    'HX Series': 'Desktop-class power in mobile form factors with maximum core counts.',
    'HK Series': 'Unlocked high-performance mobile CPUs for enthusiasts and overclocking.',
    'K Series': 'Unlocked desktop processors for gaming and content creation.',
    'KF Series': 'High-performance desktop chips without integrated graphics.',
    'F Series': 'Value desktop processors with discrete GPU support.',
    'T Series': 'Low power desktop processors for quiet, efficient systems.',
  },
};

export const amdSeries: ProcessorSeries = {
  name: 'AMD',
  series: ['U Series', 'HS Series', 'HX Series', 'X Series', 'G Series'],
  details: {
    'U Series': 'Efficient processors for ultraportable laptops and low-power usage.',
    'HS Series': 'Balanced high-performance mobile chips with efficiency tuned for notebooks.',
    'HX Series': 'Maximum mobile performance for heavy content creation and gaming.',
    'X Series': 'Desktop-grade processors optimized for power and multi-thread workloads.',
    'G Series': 'Integrated graphics and efficient desktop performance for compact systems.',
  },
};

export const processorGenerations = {
  intel: ['10th Generation', '11th Generation', '12th Generation', '13th Generation', '14th Generation', 'Core Ultra'],
  amd: ['Ryzen 3000', 'Ryzen 4000', 'Ryzen 5000', 'Ryzen 7000', 'Ryzen 8000'],
};
