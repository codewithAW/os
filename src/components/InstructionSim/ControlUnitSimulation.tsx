import React, { useEffect, useState } from 'react';

const controlSteps = [
  { step: 'IR load', active: 'IR' },
  { step: 'Opcode decode', active: 'Decoder' },
  { step: 'D3 active', active: 'D3' },
  { step: 'Generate signals', active: 'Control Bus' },
  { step: 'Ready next', active: 'Sequence Counter' },
];

export default function ControlUnitSimulation() {
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % controlSteps.length);
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-body">Control Unit Working Simulation</h4>
          <p className="text-sm text-muted">Visualize opcode decoding, decoder activation, and sequence counter flow.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setRunning((r) => !r)} className="btn btn-accent">
            {running ? 'Pause' : 'Play'}
          </button>
          <button onClick={() => { setIndex(0); setRunning(false); }} className="btn btn-secondary">
            Reset
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="p-4 rounded-xl surface-elevated">
          <p className="text-sm text-muted">Current Control Step</p>
          <p className="mt-2 text-body font-semibold">{controlSteps[index].step}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {controlSteps.map((item, idx) => (
              <span key={item.step} className={`signal-chip ${idx === index ? 'active' : ''}`}>
                {item.step}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl surface-base">
          <p className="text-sm text-muted">Active Unit</p>
          <div className="mt-3 rounded-lg border border-[var(--border)] bg-[var(--surface-overlay)] p-4 text-base font-semibold text-body text-center">
            {controlSteps[index].active}
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl surface-overlay text-sm text-muted">
        <p className="font-semibold text-body">Flow visualization</p>
        <div className="mt-3 flex flex-col gap-3">
          <div className="flow-step">IR → Decoder</div>
          <div className="flow-step">Decoder → Sequence Counter</div>
          <div className="flow-step">Sequence Counter → Control Signals</div>
        </div>
      </div>
    </div>
  );
}
