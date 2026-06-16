import { FaPause, FaPlay, FaRedo, FaStepForward, FaToggleOn } from 'react-icons/fa';

interface SimulationControlsProps {
  liveFlowMode: boolean;
  isRunning: boolean;
  cycle: number;
  maxCycle: number;
  speed: number;
  onToggleLiveFlow: () => void;
  onPlayPause: () => void;
  onReset: () => void;
  onStep: () => void;
  onSpeedChange: (value: number) => void;
  onSeek: (value: number) => void;
}

export default function SimulationControls({
  liveFlowMode,
  isRunning,
  cycle,
  maxCycle,
  speed,
  onToggleLiveFlow,
  onPlayPause,
  onReset,
  onStep,
  onSpeedChange,
  onSeek,
}: SimulationControlsProps) {
  return (
    <div className="space-y-5 rounded-[28px] border border-[#d8c9b0] bg-[#f9f4e8] p-5 shadow-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Live Flow Control</p>
          <h3 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">Simulation Controls</h3>
        </div>
        <button
          type="button"
          onClick={onToggleLiveFlow}
          className={`inline-flex items-center gap-2 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
            liveFlowMode ? 'bg-emerald-500 text-slate-950' : 'bg-[color:var(--surface-base)/0.94] text-[var(--text-primary)] ring-1 ring-[color:var(--accent)/0.2]'
          }`}
        >
          <FaToggleOn />
          {liveFlowMode ? 'Live Flow Active' : 'Activate Live Flow'}
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onPlayPause}
            className="inline-flex items-center gap-2 rounded-3xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            {isRunning ? <FaPause /> : <FaPlay />}
            {isRunning ? 'Pause' : 'Play'}
          </button>
          <button
            type="button"
            onClick={onStep}
            className="inline-flex items-center gap-2 rounded-3xl bg-[color:var(--surface-base)/0.94] px-4 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[color:var(--surface-base)/0.98]"
          >
            <FaStepForward />
            Step
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-3xl bg-[color:var(--surface-base)/0.94] px-4 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[color:var(--surface-base)/0.98]"
          >
            <FaRedo />
            Reset
          </button>
        </div>
        <div className="rounded-3xl border border-[var(--border)] bg-[color:var(--surface-base)/0.94] p-4 text-sm text-[var(--text-primary)]">
          <p className="text-slate-400">Speed</p>
          <div className="mt-3 flex items-center gap-3">
            <input
              type="range"
              min={0.5}
              max={4}
              step={0.5}
              value={speed}
              onChange={(event) => onSpeedChange(Number(event.target.value))}
              className="w-full"
            />
            <span className="min-w-[2.25rem] text-right text-white">{speed.toFixed(1)}x</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-3xl border border-[color:var(--accent)/0.1] bg-[color:var(--surface-base)/0.94] p-4 text-sm text-[var(--text-primary)]">
        <div className="flex items-center justify-between">
          <span>Current cycle</span>
          <strong className="text-white">{cycle}</strong>
        </div>
        <div>
          <label className="text-slate-400">Timeline scrubber</label>
          <input
            type="range"
            min={0}
            max={Math.max(maxCycle, 1)}
            value={Math.min(cycle, Math.max(maxCycle, 1))}
            onChange={(event) => onSeek(Number(event.target.value))}
            className="mt-3 w-full"
          />
          <div className="mt-2 flex justify-between text-xs text-slate-500">
            <span>0</span>
            <span>{Math.max(maxCycle, 1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
