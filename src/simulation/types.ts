export type SimulationEventType =
  | 'PROCESS_CREATED'
  | 'PROCESS_READY'
  | 'PROCESS_RUNNING'
  | 'PROCESS_BLOCKED'
  | 'PROCESS_TERMINATED'
  | 'CPU_CYCLE'
  | 'CONTEXT_SWITCH'
  | 'QUEUE_UPDATE'
  | 'SIMULATION_RESET';

export interface ProcessEntry {
  id: string;
  burst: number;
  priority: number;
  state: string;
}

export interface ProcessSpec extends ProcessEntry {
  remaining: number;
}

export interface RunningSlot {
  coreId: number;
  process: ProcessSpec | null;
}

export interface SimulationSnapshot {
  cycle: number;
  processPool: ProcessSpec[];
  readyQueue: string[];
  blockedQueue: string[];
  running: RunningSlot[];
  completed: string[];
  contextSwitches: number;
}

export interface QueueUpdatePayload extends SimulationSnapshot {
  historyLength: number;
}

export interface SimulationEvent<T = unknown> {
  type: SimulationEventType;
  payload: T;
  timestamp: number;
}
