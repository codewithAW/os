import React from 'react';

type TypeCardProps = {
  title: string;
  definition: string;
  advantages: string[];
  useCases: string[];
};

function TypeCard({ title, definition, advantages, useCases }: TypeCardProps) {
  return (
    <div className="rounded-2xl bg-slate-900/80 p-4">
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-2 text-slate-300 text-sm">{definition}</p>
      <p className="mt-3 text-cyan-300 font-medium">Advantages</p>
      <ul className="mt-1 list-disc pl-5 text-sm text-slate-200">
        {advantages.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>
      <p className="mt-3 text-cyan-300 font-medium">Common use cases</p>
      <ul className="mt-1 list-disc pl-5 text-sm text-slate-200">
        {useCases.map((u) => (
          <li key={u}>{u}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ProcessorTypes() {
  return (
    <section aria-labelledby="processor-types" className="space-y-4">
      <h2 id="processor-types" className="text-2xl font-semibold text-white">Types of Processors</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <TypeCard
          title="Single-core Processor"
          definition="A CPU with one processing core capable of executing one instruction stream at a time."
          advantages={["Simplicity", "Lower power for simple tasks"]}
          useCases={["Legacy embedded systems", "Basic desktop tasks"]}
        />

        <TypeCard
          title="Multi-core Processor"
          definition="A CPU with two or more independent cores that can run multiple threads in parallel."
          advantages={["Higher throughput", "Better multitasking"]}
          useCases={["Desktop workloads", "Servers", "Parallel applications"]}
        />

        <TypeCard
          title="Desktop Processor"
          definition="Optimized for general-purpose computing with a balance of single-thread and multi-thread performance."
          advantages={["Good single-thread performance", "Strong multi-thread scaling"]}
          useCases={["Personal computers", "Workstations"]}
        />

        <TypeCard
          title="Mobile Processor"
          definition="Designed for low power consumption and thermal efficiency in phones and tablets."
          advantages={["Low power", "Thermal control"]}
          useCases={["Smartphones", "Tablets", "IoT devices"]}
        />

        <TypeCard
          title="Server Processor"
          definition="Built for sustained multi-threaded workloads, large caches, and memory bandwidth."
          advantages={["High core counts", "Large caches"]}
          useCases={["Datacenters", "Virtualization", "High-performance computing"]}
        />

        <TypeCard
          title="Embedded Processor"
          definition="Small, specialized CPUs integrated into devices to perform specific tasks."
          advantages={["Low cost", "Small footprint"]}
          useCases={["Appliances", "Automotive systems", "Sensors"]}
        />
      </div>
    </section>
  );
}
