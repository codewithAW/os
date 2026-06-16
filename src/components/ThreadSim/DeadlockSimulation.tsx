import React, { useEffect, useState } from 'react';

type DThread = {
  id: string;
  state: 'running' | 'waiting' | 'blocked' | 'done';
  holds: string[]; // locks held
};

export default function DeadlockSimulation() {
  const [threads, setThreads] = useState<DThread[]>([
    { id: 'A', state: 'running', holds: [] },
    { id: 'B', state: 'waiting', holds: [] },
  ]);
  const [lock1, setLock1] = useState<string | null>(null);
  const [lock2, setLock2] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [deadlock, setDeadlock] = useState(false);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      // simple scripted attempt: A tries lock1 then lock2; B tries lock2 then lock1
      setThreads((prev) => {
        const a = prev.find((t) => t.id === 'A')!;
        const b = prev.find((t) => t.id === 'B')!;

        // A behavior
        if (!a.holds.includes('L1')) {
          if (!lock1) {
            setLock1('A');
            a.holds.push('L1');
            a.state = 'running';
          } else {
            a.state = 'waiting';
          }
        } else if (!a.holds.includes('L2')) {
          if (!lock2) {
            setLock2('A');
            a.holds.push('L2');
            a.state = 'running';
          } else {
            a.state = 'waiting';
          }
        } else {
          a.state = 'done';
        }

        // B behavior
        if (!b.holds.includes('L2')) {
          if (!lock2) {
            setLock2('B');
            b.holds.push('L2');
            b.state = 'running';
          } else {
            b.state = 'waiting';
          }
        } else if (!b.holds.includes('L1')) {
          if (!lock1) {
            setLock1('B');
            b.holds.push('L1');
            b.state = 'running';
          } else {
            b.state = 'waiting';
          }
        } else {
          b.state = 'done';
        }

        // detect deadlock: both waiting and each holds one lock
        const dead = a.state === 'waiting' && b.state === 'waiting' && a.holds.length > 0 && b.holds.length > 0;
        setDeadlock(dead);

        return [ { ...a }, { ...b } ];
      });
    }, 700);
    return () => clearInterval(interval);
  }, [running, lock1, lock2]);

  const reset = () => {
    setRunning(false);
    setLock1(null);
    setLock2(null);
    setThreads([
      { id: 'A', state: 'running', holds: [] },
      { id: 'B', state: 'waiting', holds: [] },
    ]);
    setDeadlock(false);
  };

  const resolve = () => {
    // simple resolution: release locks
    setLock1(null);
    setLock2(null);
    setThreads((t) => t.map((th) => ({ ...th, state: 'done', holds: [] })));
    setDeadlock(false);
    setRunning(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-body">Deadlock Simulation</h4>
        <div className="flex items-center gap-2">
          <button onClick={() => setRunning((r) => !r)} className="btn btn-accent">
            {running ? 'Pause' : 'Start'}
          </button>
          <button onClick={reset} className="btn btn-secondary">Reset</button>
          <button onClick={resolve} className="btn btn-warning">Resolve</button>
        </div>
      </div>

      <div className="flex gap-4 items-start">
        <div className="flex-1 grid grid-cols-2 gap-3">
          {threads.map((t) => (
            <div key={t.id} className="p-4 rounded-lg surface-base">
              <p className="text-sm text-muted">Thread {t.id}</p>
              <p className="mt-2 font-semibold text-body">{t.state.toUpperCase()}</p>
              <p className="mt-2 text-sm text-muted">Holds: {t.holds.join(', ') || '—'}</p>
            </div>
          ))}
        </div>
        <div className="w-48 p-4 rounded-lg surface-elevated">
          <p className="text-sm text-muted">Locks</p>
          <p className="mt-2">L1: {lock1 ?? 'free'}</p>
          <p className="mt-2">L2: {lock2 ?? 'free'}</p>
          <p className="mt-4 font-semibold text-body">Deadlock: {deadlock ? 'YES' : 'NO'}</p>
        </div>
      </div>

      <div className="p-4 rounded-lg surface-overlay text-sm text-muted">
        <p className="font-semibold text-body">Explanation</p>
        <p className="mt-2">This simulation shows two threads attempting to acquire two locks in opposite orders. If each thread holds one lock and waits for the other, the system reaches a circular wait (deadlock). The Coffman conditions (mutual exclusion, hold-and-wait, no preemption, circular wait) are the necessary conditions for deadlock.</p>
      </div>
    </div>
  );
}
