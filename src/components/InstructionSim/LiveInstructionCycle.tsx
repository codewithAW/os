import React, { useEffect, useState } from 'react';

const STAGES = ['Fetch', 'Decode', 'Execute', 'Memory', 'Write Back'];

export default function LiveInstructionCycle({ instruction = 'ADD R1, R2' }: { instruction?: string }) {
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % STAGES.length), 900);
    return () => clearInterval(id);
  }, [running]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-body">Instruction Cycle Animation</h4>
        <div className="flex items-center gap-2">
          <button onClick={() => { setRunning(!running); }} className="btn btn-accent">
            {running ? 'Pause' : 'Start'}
          </button>
          <button onClick={() => { setIndex(0); setRunning(false); }} className="btn btn-secondary">Reset</button>
        </div>
      </div>

      <div className="p-4 rounded-lg surface-elevated">
        <p className="text-sm text-muted">Instruction</p>
        <p className="mt-2 font-semibold text-body">{instruction}</p>
      </div>

      <div className="mt-3 grid grid-cols-5 gap-3">
        {STAGES.map((s, i) => (
          <div key={s} className={`p-4 rounded-lg transition-all ${i === index ? 'ring-2 ring-cyan-400 scale-105' : ''} surface-base`}>
            <p className="text-sm text-muted uppercase">{s}</p>
            <p className="mt-2 font-semibold text-body">{i === index ? 'Active' : 'Idle'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
