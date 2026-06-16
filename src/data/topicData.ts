export interface TopicCardData {
  title: string;
  description: string;
  icon: string;
  path: string;
  category: string;
}

export const topicCards: TopicCardData[] = [
  {
    title: 'CPU & CPU Management',
    description: 'Explore CPU architecture, pipelines, cache, and execution flow.',
    icon: 'CpuChip',
    path: '/cpu',
    category: 'cpu',
  },
  {
    title: 'Process & Process Management',
    description: 'Study process states, scheduling algorithms, and context switching.',
    icon: 'Layers',
    path: '/process-management',
    category: 'process',
  },
  {
    title: 'Threads & Thread Management',
    description: 'Visualize threads, synchronization, deadlock, and kernel threads.',
    icon: 'GitBranch',
    path: '/thread-management',
    category: 'thread',
  },
  {
    title: 'Instruction & Instruction Management',
    description: 'Learn instruction cycles, opcodes, hazards, and pipeline execution.',
    icon: 'Terminal',
    path: '/instruction-management',
    category: 'instruction',
  },
];

export const searchTopics = [
  'CPU Architecture',
  'ALU',
  'Control Unit',
  'Registers',
  'Cache Memory',
  'Fetch Decode Execute',
  'Pipelining',
  'Multicore CPUs',
  'Hyper Threading',
  'Process States',
  'Context Switching',
  'FCFS',
  'SJF',
  'Round Robin',
  'Priority Scheduling',
  'Multilevel Queue',
  'Thread Lifecycle',
  'Mutex',
  'Semaphore',
  'Deadlock',
  'Instruction Formats',
  'Addressing Modes',
  'Data Hazards',
  'Control Hazards',
];
