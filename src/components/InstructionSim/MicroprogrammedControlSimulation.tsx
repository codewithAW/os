import React, { useEffect, useState } from 'react';

type MicroStep = {
  label: string;
  description: string;
  romEntry: string;
  signals: string[];
};

const microSteps: MicroStep[] = [
  {
    label: 'Fetch Microinstruction',
    description: 'The control address register (CAR) selects the next microinstruction from control memory.',
    romEntry: 'M0',
    signals: ['Read ROM', 'Load CDR', 'Increment CAR'],
  },
  {
    label: 'Decode Microinstruction',
    description: 'The control word in CDR is decoded into control signals for the CPU datapath.',
    romEntry: 'M1',
    signals: ['Decode control word', 'Enable buses'],
  },
  {
    label: 'Execute Microoperation',
    description: 'Control signals move operands, activate ALU or memory, and update registers.',
    romEntry: 'M2',
    signals: ['Activate ALU', 'Transfer register data', 'Write back result'],
  },
  {
    label: 'Advance CAR',
    description: 'The sequencer determines the next address, usually based on the instruction opcode and status flags.',
    romEntry: 'M3',
    signals: ['Update CAR', 'Select next ROM row'],
  },
  {
    label: 'Complete Cycle',
    description: 'The microprogram finishes the ADD instruction and prepares for the next instruction fetch.',
    romEntry: 'M4',
    signals: ['Set PC', 'Ready next instruction'],
  },
];

export default function MicroprogrammedControlSimulation() {
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % microSteps.length);
    }, 1200);
    return () => clearInterval(id);
  }, [running]);

  const current = microSteps[index];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-body">Microprogrammed Control Simulation</h4>
          <p className="text-sm text-muted">Control signals come from microinstructions stored in ROM.</p>
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
        <p className="text-sm text-muted">Current microinstruction</p>
        <p className="mt-2 text-body font-semibold">{current.label}</p>
        <p className="mt-2 text-sm text-muted">{current.description}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="p-4 rounded-xl surface-base">
          <p className="text-sm text-muted">Control Memory (ROM)</p>
          <div className="mt-3 rounded-lg border border-[var(--border)] bg-[var(--surface-overlay)] p-3 text-body font-semibold">
            {current.romEntry}
          </div>
        </div>

        <div className="p-4 rounded-xl surface-base">
          <p className="text-sm text-muted">Next Address Flow</p>
          <div className="mt-3 space-y-2">
            <div className="signal-chip active">CAR → ROM</div>
            <div className="signal-chip active">ROM → CDR</div>
            <div className="signal-chip active">CDR → Control Signals</div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl surface-overlay text-sm text-muted">
        <p className="font-semibold text-body">Generated control signals</p>
        <div className="mt-3 space-y-2">
          {current.signals.map((signal) => (
            <div key={signal} className="signal-chip active inline-flex">
              {signal}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
