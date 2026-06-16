import { AnimatePresence, motion } from 'framer-motion';

interface FlowVisualizationBoardProps {
  running: { coreId: number; process: { id: string; remaining: number } | null }[];
  readyQueue: string[];
  blockedQueue: string[];
  completed: string[];
}

export default function FlowVisualizationBoard({ running, readyQueue, blockedQueue, completed }: FlowVisualizationBoardProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
      <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/70">Execution flow</p>
            <h3 className="mt-2 text-lg font-semibold text-white">Active CPU Flow</h3>
          </div>
          <div className="rounded-3xl bg-slate-950/80 px-4 py-2 text-sm text-slate-200">Live queue state</div>
        </div>

        <div className="space-y-5">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-3xl bg-slate-950/80 p-4">
              <p className="text-sm text-slate-400">Ready Queue</p>
              <div className="mt-3 space-y-3">
                <AnimatePresence mode="popLayout">
                  {readyQueue.length === 0 ? (
                    <p className="text-slate-500">No ready processes</p>
                  ) : (
                    readyQueue.map((id) => (
                      <motion.div
                        key={id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        className="rounded-3xl border border-cyan-300/15 bg-slate-900/90 px-4 py-3 text-slate-100"
                      >
                        {id}
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-950/80 p-4">
              <p className="text-sm text-slate-400">Blocked Queue</p>
              <div className="mt-3 space-y-3">
                <AnimatePresence mode="popLayout">
                  {blockedQueue.length === 0 ? (
                    <p className="text-slate-500">No blocked processes</p>
                  ) : (
                    blockedQueue.map((id) => (
                      <motion.div
                        key={id}
                        layout
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        className="rounded-3xl border border-amber-300/15 bg-slate-900/90 px-4 py-3 text-slate-100"
                      >
                        {id}
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-950/80 p-4">
            <p className="text-sm text-slate-400">CPU Cores</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {running.map((slot) => (
                <motion.div
                  layout
                  key={slot.coreId}
                  className="rounded-3xl border border-white/10 bg-slate-900/90 p-4"
                >
                  <p className="text-sm text-slate-400">Core {slot.coreId}</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {slot.process ? slot.process.id : 'Idle'}
                  </p>
                  <p className="mt-1 text-slate-400">
                    {slot.process ? `${slot.process.remaining} cycles remaining` : 'No work assigned'}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
        <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/70">Completion log</p>
        <div className="mt-5 space-y-3">
          <AnimatePresence mode="popLayout">
            {completed.length === 0 ? (
              <p className="text-slate-500">No completed processes yet</p>
            ) : (
              completed.map((id) => (
                <motion.div
                  key={id}
                  layout
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  className="rounded-3xl border border-emerald-300/15 bg-slate-950/90 px-4 py-3 text-slate-100"
                >
                  {id} completed
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
