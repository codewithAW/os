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
      <div className="rounded-[28px] border border-[#d8c9b0] bg-[#f7f3eb] p-5 shadow-lg">
        <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/70">Live metrics</p>
        <div className="mt-5 grid gap-3">
          <div className="rounded-3xl bg-[#faf1e3] p-4 shadow-md">
            <p className="text-sm text-[var(--text-secondary)]">Cycle</p>
            <p className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">{cycle}</p>
          </div>
          <div className="rounded-3xl bg-[#faf1e3] p-4 shadow-md">
            <p className="text-sm text-[var(--text-secondary)]">Context switches</p>
            <p className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">{contextSwitches}</p>
          </div>
        </div>
      </div>
      <div className="grid gap-3">
        <div className="rounded-[28px] border border-[#d8c9b0] bg-[#f7f3eb] p-5 shadow-lg">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/70">Queue counts</p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-sm text-[var(--text-primary)]">
            <div className="rounded-3xl bg-[#faf1e3] p-4 shadow-md">
              <p className="text-[var(--text-secondary)]">Ready</p>
              <p className="mt-2 text-lg font-semibold text-[var(--text-primary)]">{readyQueue.length}</p>
            </div>
            <div className="rounded-3xl bg-[#faf1e3] p-4 shadow-md">
              <p className="text-[var(--text-secondary)]">Blocked</p>
              <p className="mt-2 text-lg font-semibold text-[var(--text-primary)]">{blockedQueue.length}</p>
            </div>
            <div className="rounded-3xl bg-[#faf1e3] p-4 shadow-md">
              <p className="text-[var(--text-secondary)]">Completed</p>
              <p className="mt-2 text-lg font-semibold text-[var(--text-primary)]">{completed.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-[28px] border border-[#d8c9b0] bg-[#f7f3eb] p-5 shadow-lg">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/70">CPU running</p>
          <div className="mt-4 space-y-3 text-sm text-[var(--text-primary)]">
            {running.map((slot) => (
              <div key={slot.coreId} className="rounded-3xl bg-[#faf1e3] p-4 shadow-md">
                <p className="font-semibold text-[var(--text-primary)]">Core {slot.coreId}</p>
                <p className="mt-2 text-[var(--text-secondary)]">
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
