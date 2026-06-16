import React, { useEffect, useState } from 'react';

const STAGES = ['F', 'D', 'E', 'M', 'W'];

export default function PipeliningSimulation() {
  const [ticks, setTicks] = useState(0);
  const [running, setRunning] = useState(false);
  const instructions = ['I1', 'I2', 'I3', 'I4', 'I5'];

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTicks((t) => t + 1), 700);
    return () => clearInterval(id);
  }, [running]);

  // compute pipeline matrix: row per instruction, column per stage offset by tick
  const matrix = instructions.map((ins, r) => {
    const offset = r; // simple static schedule
    return STAGES.map((s, c) => {
      const active = ticks === offset + c;
      const progressed = ticks > offset + c;
      return { stage: s, active, progressed };
    });
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-body">Pipelining Live Simulation</h4>
        <div className="flex items-center gap-2">
          <button onClick={() => setRunning((r) => !r)} className="btn btn-accent">{running ? 'Pause' : 'Start'}</button>
          <button onClick={() => { setRunning(false); setTicks(0); }} className="btn btn-secondary">Reset</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-sm">
          <thead>
            <tr className="text-muted">
              <th className="w-24">Instr</th>
              {STAGES.map((s) => <th key={s}>{s}</th>)}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, r) => (
              <tr key={r}>
                <td className="py-2 text-body">{instructions[r]}</td>
                {row.map((cell, c) => (
                  <td key={c} className="p-2">
                    <div className={`p-2 rounded ${cell.active ? 'cell-active font-semibold' : cell.progressed ? 'cell-progress' : 'cell-idle'}`}>
                      {cell.stage}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
