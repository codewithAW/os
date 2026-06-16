import { create } from 'zustand';

interface SimulationStore {
  liveFlowMode: boolean;
  isRunning: boolean;
  speed: number;
  currentCycle: number;
  currentTask: string | null;
  setLiveFlowMode: (value: boolean) => void;
  setRunning: (value: boolean) => void;
  setSpeed: (value: number) => void;
  setCurrentCycle: (cycle: number) => void;
  setCurrentTask: (task: string | null) => void;
}

export const useSimulationStore = create<SimulationStore>((set) => ({
  liveFlowMode: false,
  isRunning: false,
  speed: 1,
  currentCycle: 0,
  currentTask: null,
  setLiveFlowMode: (liveFlowMode) => set(() => ({ liveFlowMode })),
  setRunning: (isRunning) => set(() => ({ isRunning })),
  setSpeed: (speed) => set(() => ({ speed })),
  setCurrentCycle: (currentCycle) => set(() => ({ currentCycle })),
  setCurrentTask: (currentTask) => set(() => ({ currentTask })),
}));
