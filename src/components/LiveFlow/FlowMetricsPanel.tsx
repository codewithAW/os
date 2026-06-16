interface FlowMetricsPanelProps {
  cycle: number;
  contextSwitches: number;
  running: { coreId: number; process: { id: string; remaining: number } | null }[];
  readyQueue: string[];
  blockedQueue: string[];
  completed: string[];
}

export default function FlowMetricsPanel({
  cycle,
  contextSwitches,
  running,
  readyQueue,
  blockedQueue,
  completed,
}: FlowMetricsPanelProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5">
        <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/70">Live metrics</p>
        <div className="mt-5 grid gap-3">
          <div className="rounded-3xl bg-slate-950/80 p-4">
            <p className="text-sm text-slate-400">Cycle</p>
            <p className="mt-2 text-2xl font-semibold text-white">{cycle}</p>
          </div>
          <div className="rounded-3xl bg-slate-950/80 p-4">
            <p className="text-sm text-slate-400">Context switches</p>
            <p className="mt-2 text-2xl font-semibold text-white">{contextSwitches}</p>
          </div>
        </div>
      </div>
      <div className="grid gap-3">
        <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/70">Queue counts</p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-sm text-slate-100">
            <div className="rounded-3xl bg-slate-950/80 p-4">
              <p className="text-slate-400">Ready</p>
              <p className="mt-2 text-lg font-semibold text-white">{readyQueue.length}</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-4">
              <p className="text-slate-400">Blocked</p>
              <p className="mt-2 text-lg font-semibold text-white">{blockedQueue.length}</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-4">
              <p className="text-slate-400">Completed</p>
              <p className="mt-2 text-lg font-semibold text-white">{completed.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/70">CPU running</p>
          <div className="mt-4 space-y-3 text-sm text-slate-200">
            {running.map((slot) => (
              <div key={slot.coreId} className="rounded-3xl bg-slate-950/80 p-4">
                <p className="font-semibold text-white">Core {slot.coreId}</p>
                <p className="mt-2 text-slate-300">
                  {slot.process ? `${slot.process.id} · ${slot.process.remaining} cycles left` : 'Idle'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
