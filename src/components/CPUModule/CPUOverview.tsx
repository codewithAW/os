import React from 'react';

export default function CPUOverview() {
  return (
    <section aria-labelledby="cpu-overview" className="space-y-4">
      <h2 id="cpu-overview" className="text-2xl font-semibold text-white">What is a Processor?</h2>
      <p className="text-slate-300">
        A processor, or central processing unit (CPU), is the primary component that performs computations and
        executes instructions. Often called the "brain" of the computer, the CPU coordinates and controls the
        execution of programs by fetching instructions from memory, decoding them, and performing arithmetic or
        logic operations.
      </p>
      <div className="rounded-2xl bg-slate-900/80 p-4 text-sm text-slate-200">
        <h3 className="font-semibold text-white">Functions of a Processor</h3>
        <ul className="mt-2 list-disc pl-5">
          <li>Instruction fetch and decode</li>
          <li>Arithmetic and logic operations</li>
          <li>Control and sequencing</li>
          <li>Data movement between registers and memory</li>
        </ul>
      </div>
    </section>
  );
}
