import React, { useState } from 'react';

export default function LockVisualizer() {
  const [mutexHolder, setMutexHolder] = useState<string | null>(null);
  const [waiting, setWaiting] = useState<string[]>([]);
  const [semaphore, setSemaphore] = useState(2);

  const requestMutex = (thread: string) => {
    if (!mutexHolder) {
      setMutexHolder(thread);
    } else {
      setWaiting((w) => (w.includes(thread) ? w : [...w, thread]));
    }
  };

  const releaseMutex = () => {
    setMutexHolder(null);
    setWaiting((w) => {
      if (w.length === 0) return [];
      const [first, ...rest] = w;
      setMutexHolder(first);
      return rest;
    });
  };

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-body">Locking Mechanisms</h4>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="p-4 rounded-lg surface-base">
          <p className="text-sm text-muted">Mutex (exclusive lock)</p>
          <p className="mt-2 font-semibold text-body">Holder: {mutexHolder ?? 'none'}</p>
          <p className="mt-2 text-sm text-muted">Waiting: {waiting.join(', ') || '—'}</p>
          <div className="mt-3 flex gap-2">
            <button onClick={() => requestMutex('T1')} className="btn btn-accent">T1 request</button>
            <button onClick={() => requestMutex('T2')} className="btn btn-accent">T2 request</button>
            <button onClick={releaseMutex} className="btn btn-warning">Release</button>
          </div>
        </div>

        <div className="p-4 rounded-lg surface-base">
          <p className="text-sm text-muted">Semaphore (counted permits)</p>
          <p className="mt-2 font-semibold text-body">Permits: {semaphore}</p>
          <div className="mt-3 flex gap-2">
            <button onClick={() => setSemaphore((s) => Math.max(0, s - 1))} className="btn btn-accent">Acquire</button>
            <button onClick={() => setSemaphore((s) => s + 1)} className="btn btn-success">Release</button>
            <button onClick={() => setSemaphore(2)} className="btn btn-secondary">Reset</button>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg surface-overlay text-sm text-muted">
        <p className="font-semibold text-body">Critical Section</p>
        <p className="mt-2">When a thread holds the mutex it may enter the critical section. Semaphore permits allow a limited number of threads to enter concurrently.</p>
      </div>
    </div>
  );
}
