import { emitSimulationEvent } from './eventBus';
import type {
  ProcessEntry,
  ProcessSpec,
  QueueUpdatePayload,
  RunningSlot,
  SimulationEvent,
  SimulationSnapshot,
} from './types';

const defaultProcessEntries: ProcessEntry[] = [
  { id: 'P1', burst: 5, priority: 2, state: 'Ready' },
  { id: 'P2', burst: 3, priority: 1, state: 'Ready' },
  { id: 'P3', burst: 7, priority: 3, state: 'Ready' },
];

const createProcessSpec = (entry: ProcessEntry): ProcessSpec => ({
  ...entry,
  remaining: entry.burst,
});

const cloneProcess = (process: ProcessSpec): ProcessSpec => ({ ...process });

const historySnapshot = (snapshot: SimulationSnapshot, historyLength: number): QueueUpdatePayload => ({
  ...snapshot,
  historyLength,
});

const buildSnapshot = (state: EngineState): SimulationSnapshot => ({
  cycle: state.cycle,
  processPool: state.processPool.map(cloneProcess),
  readyQueue: [...state.readyQueue],
  blockedQueue: [...state.blockedQueue],
  running: state.running.map((slot) => ({
    coreId: slot.coreId,
    process: slot.process ? cloneProcess(slot.process) : null,
  })),
  completed: [...state.completed],
  contextSwitches: state.contextSwitches,
});

interface EngineState {
  cycle: number;
  processPool: ProcessSpec[];
  readyQueue: string[];
  blockedQueue: string[];
  running: RunningSlot[];
  completed: string[];
  contextSwitches: number;
}

interface SimulationEngine {
  start: () => void;
  pause: () => void;
  reset: (processes?: ProcessEntry[]) => void;
  step: () => void;
  addProcess: (entry: ProcessEntry) => void;
  setSpeed: (speed: number) => void;
  seek: (cycleIndex: number) => void;
  subscribe: (listener: (event: SimulationEvent) => void) => () => void;
  getCurrentSnapshot: () => QueueUpdatePayload;
}

export function createSimulationEngine(initialProcesses: ProcessEntry[] = defaultProcessEntries): SimulationEngine {
  let timer: number | null = null;
  let speed = 1;
  let running = false;
  let history: QueueUpdatePayload[] = [];
  const state: EngineState = {
    cycle: 0,
    processPool: initialProcesses.map(createProcessSpec),
    readyQueue: initialProcesses.map((process) => process.id),
    blockedQueue: [],
    running: [
      { coreId: 1, process: null },
      { coreId: 2, process: null },
    ],
    completed: [],
    contextSwitches: 0,
  };

  const notify = (event: SimulationEvent) => emitSimulationEvent(event);

  const pushHistory = () => {
    const snapshot = buildSnapshot(state);
    history = [...history, historySnapshot(snapshot, history.length + 1)];
  };

  const emitQueueUpdate = () => {
    notify({ type: 'QUEUE_UPDATE', payload: history[history.length - 1], timestamp: Date.now() });
  };

  const transitionProcess = (process: ProcessSpec, nextState: string) => {
    const previousState = process.state;
    process.state = nextState;
    notify({
      type: `PROCESS_${nextState.toUpperCase()}` as SimulationEvent['type'],
      payload: { id: process.id, from: previousState, to: nextState, remaining: process.remaining },
      timestamp: Date.now(),
    });
  };

  const scheduleReady = () => {
    const freeSlot = state.running.find((slot) => slot.process === null);
    if (!freeSlot || state.readyQueue.length === 0) {
      return;
    }

    const nextId = state.readyQueue.shift();
    if (!nextId) {
      return;
    }

    const nextProcess = state.processPool.find((item) => item.id === nextId);
    if (!nextProcess) {
      return;
    }

    transitionProcess(nextProcess, 'Running');
    freeSlot.process = nextProcess;
    state.contextSwitches += 1;
    notify({
      type: 'CONTEXT_SWITCH',
      payload: { coreId: freeSlot.coreId, processId: nextProcess.id, cycle: state.cycle },
      timestamp: Date.now(),
    });
  };

  const flushBlocked = () => {
    if (state.blockedQueue.length === 0) {
      return;
    }
    const processId = state.blockedQueue.shift();
    if (!processId) {
      return;
    }
    const process = state.processPool.find((item) => item.id === processId);
    if (!process) {
      return;
    }
    transitionProcess(process, 'Ready');
    state.readyQueue.push(process.id);
    notify({
      type: 'PROCESS_READY',
      payload: { id: process.id, readyQueue: [...state.readyQueue] },
      timestamp: Date.now(),
    });
  };

  const maybeBlockOneReadyProcess = () => {
    if (state.cycle > 0 && state.cycle % 4 === 0 && state.readyQueue.length > 0) {
      const processId = state.readyQueue.shift();
      if (!processId) {
        return;
      }
      const process = state.processPool.find((item) => item.id === processId);
      if (!process) {
        return;
      }
      transitionProcess(process, 'Blocked');
      state.blockedQueue.push(process.id);
      notify({
        type: 'PROCESS_BLOCKED',
        payload: { id: process.id, blockedQueue: [...state.blockedQueue] },
        timestamp: Date.now(),
      });
    }
  };

  const runCycle = () => {
    state.cycle += 1;
    notify({ type: 'CPU_CYCLE', payload: { cycle: state.cycle }, timestamp: Date.now() });

    maybeBlockOneReadyProcess();
    if (state.cycle > 0 && state.cycle % 5 === 0) {
      flushBlocked();
    }

    state.running.forEach((slot) => {
      if (!slot.process) {
        return;
      }
      slot.process.remaining -= 1;
      if (slot.process.remaining <= 0) {
        transitionProcess(slot.process, 'Terminated');
        state.completed.push(slot.process.id);
        slot.process = null;
      }
    });

    scheduleReady();
    scheduleReady();

    pushHistory();
    emitQueueUpdate();
    if (running) {
      scheduleNextTick();
    }
  };

  const scheduleNextTick = () => {
    if (timer !== null) {
      window.clearTimeout(timer);
      timer = null;
    }
    timer = window.setTimeout(runCycle, Math.max(150, 1000 / speed));
  };

  const initialize = (processes: ProcessEntry[]) => {
    state.cycle = 0;
    state.processPool = processes.map(createProcessSpec);
    state.readyQueue = processes.map((process) => process.id);
    state.blockedQueue = [];
    state.running = [
      { coreId: 1, process: null },
      { coreId: 2, process: null },
    ];
    state.completed = [];
    state.contextSwitches = 0;
    history = [];
    pushHistory();
    notify({ type: 'SIMULATION_RESET', payload: buildSnapshot(state), timestamp: Date.now() });
    emitQueueUpdate();
  };

  initialize(initialProcesses);

  return {
    start: () => {
      if (running) {
        return;
      }
      running = true;
      scheduleNextTick();
    },
    pause: () => {
      running = false;
      if (timer !== null) {
        window.clearTimeout(timer);
        timer = null;
      }
    },
    reset: (processes: ProcessEntry[] = defaultProcessEntries) => {
      running = false;
      if (timer !== null) {
        window.clearTimeout(timer);
        timer = null;
      }
      initialize(processes);
    },
    step: () => {
      if (running) {
        return;
      }
      runCycle();
    },
    addProcess: (entry: ProcessEntry) => {
      const process = createProcessSpec(entry);
      state.processPool.push(process);
      state.readyQueue.push(process.id);
      transitionProcess(process, 'Ready');
      pushHistory();
      emitQueueUpdate();
      notify({ type: 'PROCESS_CREATED', payload: { id: process.id, burst: process.burst, priority: process.priority }, timestamp: Date.now() });
    },
    setSpeed: (nextSpeed: number) => {
      speed = Math.max(0.5, Math.min(4, nextSpeed));
      if (running) {
        scheduleNextTick();
      }
    },
    seek: (cycleIndex: number) => {
      const snapshot = history[Math.max(0, Math.min(history.length - 1, cycleIndex))];
      if (!snapshot) {
        return;
      }
      state.cycle = snapshot.cycle;
      state.processPool = snapshot.processPool.map(cloneProcess);
      state.readyQueue = [...snapshot.readyQueue];
      state.blockedQueue = [...snapshot.blockedQueue];
      state.running = snapshot.running.map((slot) => ({
        coreId: slot.coreId,
        process: slot.process ? cloneProcess(slot.process) : null,
      }));
      state.completed = [...snapshot.completed];
      state.contextSwitches = snapshot.contextSwitches;
      running = false;
      if (timer !== null) {
        window.clearTimeout(timer);
        timer = null;
      }
      notify({ type: 'QUEUE_UPDATE', payload: snapshot, timestamp: Date.now() });
    },
    subscribe: (listener: (event: SimulationEvent) => void) => {
      return () => {
        /* no-op: use global event bus */
      };
    },
    getCurrentSnapshot: () => history[history.length - 1],
  };
}
