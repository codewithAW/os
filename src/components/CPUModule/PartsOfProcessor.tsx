import React from 'react';

function Box({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-slate-900/80 p-4">
      <h4 className="font-semibold text-white">{title}</h4>
      <div className="mt-2 text-slate-300 text-sm">{children}</div>
    </div>
  );
}

export default function PartsOfProcessor() {
  return (
    <section aria-labelledby="parts-of-processor" className="space-y-4">
      <h2 id="parts-of-processor" className="text-2xl font-semibold text-white">Parts of a Processor</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <Box title="Control Unit (CU)">
          <p>
            The control unit interprets instructions and generates timing and control signals to coordinate
            the CPU's components.
          </p>
        </Box>

        <Box title="Arithmetic Logic Unit (ALU)">
          <p>
            The ALU performs arithmetic (ADD, SUB, MUL) and logical (AND, OR, XOR) operations and sets
            condition flags used by branch instructions.
          </p>
        </Box>

        <Box title="Registers">
          <p>
            Registers are small, fast storage locations inside the CPU used to hold operands, addresses, and
            intermediate results. Examples: Program Counter (PC), Instruction Register (IR), Accumulator (ACC).
          </p>
        </Box>

        <Box title="Cache Memory">
          <p>
            Small, fast memory placed close to the CPU. Typical hierarchies include L1 (smallest, fastest), L2,
            and L3 (larger, slower). Caches reduce average memory latency.
          </p>
        </Box>

        <Box title="Cores">
          <p>
            A core is an independent processing unit. Single-core CPUs execute one thread at a time; multi-core
            CPUs run multiple threads in parallel, improving throughput for multi-threaded workloads.
          </p>
        </Box>
      </div>
    </section>
  );
}
