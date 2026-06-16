import React, { useEffect, useState } from 'react';

const steps = [
  {
    title: 'Fetch Opcode',
    description: 'The instruction is read into the Instruction Register (IR) from memory so the CPU can examine it.',
    activeDecoder: 'D3',
    controlSignals: ['Load IR', 'Enable Decoder', 'Increment PC'],
  },
  {
    title: 'Decode Opcode',
    description: 'A 3×8 decoder activates the matching output line for the opcode. For ADD, D3 becomes active.',
    activeDecoder: 'D3',
    controlSignals: ['Select ADD logic', 'Enable ALU'],
  },
  {
    title: 'Sequence Counter',
    description: 'The sequence counter steps through T0 to T4, driving the next fixed control signal at each clock tick.',
    activeDecoder: 'D3',
    controlSignals: ['T0: Fetch operands', 'T1: Execute ALU add', 'T2: Store result'],
  },
  {
    title: 'Generate Control Signals',
    description: 'Hardwired logic gates assert the required signals directly, using fixed wiring for this instruction.',
    activeDecoder: 'D3',
    controlSignals: ['ALU add', 'Write back', 'Clear temporary registers'],
  },
  {
    title: 'Complete ADD Instruction',
    description: 'The result is written back to the register file, and the CPU is ready for the next instruction.',
    activeDecoder: 'D3',
    controlSignals: ['PC updated', 'Ready for next instruction'],
  },
];

export default function HardwiredControlSimulation() {
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % steps.length);
    }, 1200);
    return () => clearInterval(id);
  }, [running]);

  const current = steps[index];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-body">Hardwired Control Simulation</h4>
          <p className="text-sm text-muted">A fixed logic control unit executes the ADD instruction through a preset flow.</p>
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

      <div className="p-4 rounded-xl surface-elevated">
        <p className="text-sm text-muted">Current step</p>
        <p className="mt-2 text-body font-semibold">{current.title}</p>
        <p className="mt-2 text-sm text-muted">{current.description}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="p-4 rounded-xl surface-base">
          <p className="text-sm text-muted">Active Decoder Line</p>
          <div className="mt-3 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-overlay)] px-4 py-3 text-base font-semibold text-body">
            {current.activeDecoder}
          </div>
        </div>

        <div className="p-4 rounded-xl surface-base">
          <p className="text-sm text-muted">Sequence Counter</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {['T0', 'T1', 'T2', 'T3', 'T4'].map((tick, idx) => (
              <span key={tick} className={`signal-chip ${idx === index ? 'active' : ''}`}>
                {tick}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl surface-overlay text-sm text-muted">
        <p className="font-semibold text-body">Control signals generated</p>
        <div className="mt-3 space-y-2">
          {current.controlSignals.map((signal) => (
            <div key={signal} className="signal-chip active inline-flex">
              {signal}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
