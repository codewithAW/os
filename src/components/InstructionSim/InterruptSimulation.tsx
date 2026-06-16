import React, { useEffect, useState } from 'react';

export default function InterruptSimulation() {
  const [running, setRunning] = useState(false);
  const [pc, setPc] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const [interrupt, setInterrupt] = useState<string | null>(null);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setPc((p) => p + 1);
      setLog((l) => [...l, `Executed instruction at PC=${pc}`].slice(-10));
    }, 900);
    return () => clearInterval(id);
  }, [running, pc]);

  useEffect(() => {
    if (!interrupt) return;
    // simulate handling: pause normal flow, handle interrupt then resume
    setRunning(false);
    setLog((l) => [...l, `Interrupt received: ${interrupt}`].slice(-20));
    const t = setTimeout(() => {
      setLog((l) => [...l, `Handled interrupt: ${interrupt}`].slice(-20));
      setInterrupt(null);
      setRunning(true);
    }, 1600);
    return () => clearTimeout(t);
  }, [interrupt]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-body">Interrupt Handling Simulation</h4>
        <div className="flex items-center gap-2">
          <button onClick={() => setRunning((r) => !r)} className="btn btn-accent">{running ? 'Pause' : 'Start'}</button>
          <button onClick={() => { setPc(0); setLog([]); setRunning(false); }} className="btn btn-secondary">Reset</button>
        </div>
      </div>

      <div className="p-4 rounded-lg surface-elevated">
        <p className="text-sm text-muted">Program Counter (PC)</p>
        <p className="mt-2 font-semibold text-body">{pc}</p>
      </div>

      <div className="flex gap-3">
        <button onClick={() => setInterrupt('Keyboard')} className="btn btn-success">Trigger Keyboard Interrupt</button>
        <button onClick={() => setInterrupt('Timer')} className="btn btn-warning">Trigger Timer Interrupt</button>
      </div>

      <div className="mt-3 p-4 rounded-lg surface-overlay text-sm text-muted">
        <p className="font-semibold text-body">Event Log</p>
        <div className="mt-2 max-h-40 overflow-auto space-y-1">
          {log.map((l, i) => <div key={i} className="text-muted">{l}</div>)}
        </div>
      </div>
    </div>
  );
}
