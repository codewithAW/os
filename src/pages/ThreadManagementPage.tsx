import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import LiveThreadSimulation from '../components/ThreadSim/LiveThreadSimulation';
import DeadlockSimulation from '../components/ThreadSim/DeadlockSimulation';
import LockVisualizer from '../components/ThreadSim/LockVisualizer';

export default function ThreadManagementPage() {
  const [showDetails] = useState(true);

  return (
    <div className="space-y-10">
      <SectionTitle title="Thread Management" subtitle="Concurrency, synchronization, and interactive simulations" />

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[24px] border border-cyan-300/8 surface-base p-6">
          <h3 className="text-2xl font-semibold text-body">Core Concepts</h3>
          <p className="mt-3 text-muted">Clear, beginner-friendly definitions with examples and analogies.</p>

          <div className="mt-6 space-y-4">
            <section>
              <h4 className="font-semibold text-body">Thread Creation</h4>
              <p className="mt-2 text-muted">Threads are lightweight units of execution created by a process. Example: spawning a worker to handle I/O.</p>
            </section>

            <section>
              <h4 className="font-semibold text-body">Thread Scheduling</h4>
              <p className="mt-2 text-muted">The OS or runtime decides which thread runs on the CPU. Preemptive scheduling may interrupt threads to share CPU fairly.</p>
            </section>

            <section>
              <h4 className="font-semibold text-body">Context Switching</h4>
              <p className="mt-2 text-muted">Switching the CPU from one thread to another. Overhead includes saving/restoring registers and cache effects. Analogy: switching between cooks in a kitchen requires swapping tools and instructions.</p>
            </section>

            <section>
              <h4 className="font-semibold text-body">Synchronization</h4>
              <p className="mt-2 text-muted">Mechanisms like mutexes and semaphores prevent data races and coordinate access to shared resources.</p>
            </section>

            <section>
              <h4 className="font-semibold text-body">Thread Communication</h4>
              <p className="mt-2 text-muted">Threads communicate via shared memory or message passing. Shared memory is fast but needs synchronization.</p>
            </section>

            <section>
              <h4 className="font-semibold text-body">Thread Termination</h4>
              <p className="mt-2 text-muted">Threads exit after completing work or can be killed. Proper cleanup avoids resource leaks.</p>
            </section>

            <section>
              <h4 className="font-semibold text-body">User-level vs Kernel-level Threads</h4>
              <p className="mt-2 text-muted">User threads are managed by runtimes (fast, lightweight). Kernel threads are scheduled by the OS (better for true parallelism).</p>
            </section>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-body">Analogy (Restaurant)</h4>
            <p className="mt-2 text-muted">Processes are restaurants; threads are cooks. Context switching is swapping which cook is at the stove; synchronization is using the same oven (mutex) so only one cook uses it at a time.</p>
          </div>
        </div>

        <div className="rounded-[24px] border border-cyan-300/8 surface-base p-6 space-y-4">
          <h3 className="text-2xl font-semibold text-body">Comparison: Process vs Thread</h3>
          <table className="w-full mt-3 text-sm">
            <thead>
              <tr className="text-left text-muted">
                <th>Feature</th>
                <th>Process</th>
                <th>Thread</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-cyan-300/8">
                <td className="py-2 text-muted">Isolation</td>
                <td className="text-body">Isolated memory space</td>
                <td className="text-body">Shares memory with siblings</td>
              </tr>
              <tr className="border-t border-cyan-300/8">
                <td className="py-2 text-muted">Creation cost</td>
                <td className="text-body">High</td>
                <td className="text-body">Low</td>
              </tr>
              <tr className="border-t border-cyan-300/8">
                <td className="py-2 text-muted">Communication</td>
                <td className="text-body">IPC (slower)</td>
                <td className="text-body">Shared memory (fast)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg p-6 surface-base">
          <LiveThreadSimulation />
        </div>

        <div className="space-y-6">
          <div className="rounded-lg p-6 surface-base">
            <DeadlockSimulation />
          </div>
          <div className="rounded-lg p-6 surface-base">
            <LockVisualizer />
          </div>
        </div>
      </div>

      <div className="rounded-lg p-6 surface-overlay text-sm text-muted">
        <h4 className="font-semibold text-body">Deep Dive: Race Conditions</h4>
        <p className="mt-2">A race condition occurs when multiple threads access and modify shared data without proper synchronization. Example: two threads incrementing a shared counter without a lock may overwrite each other's updates.</p>
        <h4 className="mt-4 font-semibold text-body">Deadlock Conditions (Coffman)</h4>
        <ol className="mt-2 list-decimal list-inside">
          <li>Mutual exclusion</li>
          <li>Hold and wait</li>
          <li>No preemption</li>
          <li>Circular wait</li>
        </ol>
      </div>
    </div>
  );
}
