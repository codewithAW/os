import { motion } from 'framer-motion';

const stages = ['L1 Cache', 'L2 Cache', 'L3 Cache', 'RAM'];

export default function MemoryFlow() {
  return (
    <div className="glass-card rounded-[28px] border border-[var(--border)] bg-[color:var(--surface-elevated)/0.92] p-5 shadow-glow backdrop-blur-xl">
      <h3 className="text-xl font-semibold text-[var(--text-primary)]">Cache Memory Request Flow</h3>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
        {stages.map((stage, index) => (
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            className="rounded-3xl border border-[var(--border)] bg-[color:var(--surface-base)/0.92] p-5 text-[var(--text-primary)] min-h-[160px]"
          >
            <p className="text-cyan-300 text-xs">Request →</p>
            <p className="mt-3 text-base font-semibold leading-snug">{stage}</p>
            <p className="mt-2 text-[var(--text-secondary)] text-xs leading-normal">
              {index === 3
                ? 'Fallback RAM access for a cache miss.'
                : 'Low latency cache stage for fast CPU access.'}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-3 rounded-3xl border border-[color:var(--accent)/0.1] bg-[color:var(--surface-base)/0.9] p-4 text-[var(--text-primary)]">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span>Hit</span>
          <span className="text-cyan-300">Fastest path</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm">
          <span>Miss</span>
          <span className="text-amber-300">Access next level cache / RAM</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm">
          <span>Latency</span>
          <span className="text-[var(--text-secondary)]">L1 &lt; L2 &lt; L3 &lt; RAM</span>
        </div>
      </div>
    </div>
  );
}
