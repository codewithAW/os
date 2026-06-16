interface FlowTimelineProps {
  cycle: number;
  maxCycle: number;
  onSeek: (value: number) => void;
}

export default function FlowTimeline({ cycle, maxCycle, onSeek }: FlowTimelineProps) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5 text-slate-200">
      <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/70">Live flow timeline</p>
      <div className="mt-3">
        <input
          type="range"
          min={0}
          max={Math.max(maxCycle, 1)}
          value={Math.min(cycle, Math.max(maxCycle, 1))}
          onChange={(event) => onSeek(Number(event.target.value))}
          className="w-full"
        />
        <div className="mt-2 flex justify-between text-xs text-slate-500">
          <span>0</span>
          <span>{Math.max(maxCycle, 1)}</span>
        </div>
      </div>
    </div>
  );
}
