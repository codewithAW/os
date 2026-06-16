import React, { useEffect, useRef, useState } from 'react';

type Thread = {
  id: number;
  name: string;
  state: 'ready' | 'running' | 'blocked' | 'terminated';
};

export default function LiveThreadSimulation() {
  const [threads, setThreads] = useState<Thread[]>([
    { id: 1, name: 'Thread 1', state: 'ready' },
    { id: 2, name: 'Thread 2', state: 'ready' },
    { id: 3, name: 'Thread 3', state: 'ready' },
  ]);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(800);
  const [sharedCounter, setSharedCounter] = useState(0);
  const [useLock, setUseLock] = useState(true);
  const lockRef = useRef(false);
  const idxRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setThreads((prev) => {
        // find next ready thread
        const ready = prev.filter((t) => t.state === 'ready');
        if (ready.length === 0) return prev.map((t) => ({ ...t, state: t.state === 'running' ? 'terminated' : t.state }));
        idxRef.current = (idxRef.current + 1) % ready.length;
        const next = ready[idxRef.current];
        return prev.map((t) => {
          if (t.id === next.id) return { ...t, state: 'running' };
          if (t.state === 'running') return { ...t, state: 'ready' };
          return t;
        });
      });
      // running thread increments shared counter (with optional lock)
      setThreads((prev) => {
        const runner = prev.find((t) => t.state === 'running');
        if (!runner) return prev;
        if (useLock) {
          if (lockRef.current) {
            // already locked -> runner becomes blocked
            return prev.map((t) => (t.id === runner.id ? { ...t, state: 'blocked' } : t));
          }
          lockRef.current = true;
          setSharedCounter((c) => c + 1);
          lockRef.current = false;
          return prev.map((t) => (t.id === runner.id ? { ...t, state: 'ready' } : t));
        }
        // no lock -> possible race but simple model
        setSharedCounter((c) => c + 1);
        return prev.map((t) => (t.id === runner.id ? { ...t, state: 'ready' } : t));
      });
    }, speed);
    return () => clearInterval(interval);
  }, [running, speed, useLock]);

  const reset = () => {
    setRunning(false);
    setThreads([
      { id: 1, name: 'Thread 1', state: 'ready' },
      { id: 2, name: 'Thread 2', state: 'ready' },
      { id: 3, name: 'Thread 3', state: 'ready' },
    ]);
    setSharedCounter(0);
    lockRef.current = false;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-body">Live Thread Execution Simulation</h4>
        <div className="flex items-center gap-3">
          <label className="text-sm text-muted flex items-center gap-2">
            <input type="checkbox" checked={useLock} onChange={() => setUseLock((v) => !v)} />
            Use Lock
          </label>
          <button
            onClick={() => setRunning((r) => !r)}
            className="btn btn-accent"
          >
            {running ? 'Pause' : 'Start'}
          </button>
          <button onClick={reset} className="btn btn-secondary">
            Reset
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 grid grid-cols-3 gap-3">
          {threads.map((t) => (
            <div key={t.id} className="p-4 rounded-xl surface-base">
              <p className="text-sm text-muted">{t.name}</p>
              <p className="mt-2 font-semibold text-body">{t.state.toUpperCase()}</p>
            </div>
          ))}
        </div>
        <div className="min-w-[10rem] p-4 rounded-xl surface-elevated text-center">
          <p className="text-sm text-muted">CPU</p>
          <p className="mt-2 text-2xl font-bold text-body">{threads.find((t) => t.state === 'running')?.name ?? 'Idle'}</p>
        </div>
      </div>

      <div className="p-4 rounded-lg surface-overlay">
        <p className="text-sm text-muted">Shared counter (shows concurrent updates)</p>
        <p className="mt-2 text-2xl font-semibold text-body">{sharedCounter}</p>
        <div className="mt-3">
          <label className="text-sm text-muted">Speed</label>
          <input
            type="range"
            min={200}
            max={1500}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full mt-2"
          />
        </div>
      </div>
    </div>
  );
}
