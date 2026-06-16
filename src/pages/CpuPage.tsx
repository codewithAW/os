import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBolt, FaCubes, FaMemory, FaRegClock, FaNetworkWired, FaTools } from 'react-icons/fa';
import CpuScene from '../components/visuals/CpuScene';
import MemoryFlow from '../components/visuals/MemoryFlow';
import PipelineScene from '../components/visuals/PipelineScene';
import SectionTitle from '../components/SectionTitle';
import CPUOverview from '../components/CPUModule/CPUOverview';
import PartsOfProcessor from '../components/CPUModule/PartsOfProcessor';
import ProcessorTypes from '../components/CPUModule/ProcessorTypes';
import CPUSimulator from '../components/CPUModule/CPUSimulator';

const stages = ['Fetch', 'Decode', 'Execute', 'Store'];

const multicoreModes = [
  { label: 'Single Core', cores: 1 },
  { label: 'Dual Core', cores: 2 },
  { label: 'Quad Core', cores: 4 },
  { label: 'Octa Core', cores: 8 },
];

export default function CpuPage() {
  const [cycleStep, setCycleStep] = useState(0);
  const [selectedCore, setSelectedCore] = useState(2);
  const pipelineItems = useMemo(
    () => [
      { title: 'Instruction 1', color: 'from-cyan-400 to-blue-500' },
      { title: 'Instruction 2', color: 'from-violet-500 to-fuchsia-500' },
      { title: 'Instruction 3', color: 'from-amber-400 to-orange-500' },
    ],
    [],
  );

  return (
    <div className="space-y-10">
      <SectionTitle title="CPU & CPU Management" subtitle="Core architecture and execution visualizations" />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <CPUOverview />
          <CPUSimulator />
          <PartsOfProcessor />
          <ProcessorTypes />
        </div>
        <div className="space-y-6">
          {/* Right column intentionally reserved for supporting panels (Registers, Clock, etc.) */}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="surface-panel shadow-glow p-6 w-full max-w-full min-w-0 overflow-hidden">
          <h3 className="text-xl font-semibold text-primary">CPU Architecture</h3>
          <p className="mt-3 text-muted">
            Explore the CPU model, its internal components, and how the control paths drive instruction execution.
          </p>
          <div className="mt-6">
            <CpuScene />
          </div>
        </div>
        <div className="space-y-6">
          <div className="surface-card shadow-glow p-5 w-full max-w-full min-w-0 overflow-hidden">
            <div className="flex items-center gap-3 text-accent">
              <FaCubes className="h-5 w-5" />
              <h4 className="text-lg font-semibold text-primary">Registers</h4>
            </div>
            <p className="mt-3 text-slate-300">
              Visualize register state as the CPU loads operands, stores temporary values, and tracks control flow.
            </p>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[var(--text-primary)]">
              {['PC', 'IR', 'ACC', 'MAR'].map((register) => (
                <div key={register} className="rounded-3xl bg-[color:var(--surface-elevated)/0.92] p-4">
                  <p className="text-cyan-300">{register}</p>
                  <p className="mt-2 text-[var(--text-secondary)]">0x{Math.floor(Math.random() * 65535).toString(16).toUpperCase()}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="surface-card shadow-glow p-5">
            <div className="flex items-center gap-3 text-warning">
              <FaRegClock className="h-5 w-5" />
              <h4 className="text-lg font-semibold text-primary">Clock Cycle</h4>
            </div>
            <p className="mt-3 text-slate-300">
              A stable clock drives instruction timing. Higher frequency means more cycles per second and better throughput.
            </p>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-[var(--text-primary)]">
              {['Fetch', 'Decode', 'Execute'].map((phase) => (
                <div key={phase} className="rounded-3xl bg-[color:var(--surface-elevated)/0.92] p-4">
                  <p className="text-[var(--text-secondary)]">{phase}</p>
                  <p className="mt-2 text-cyan-300">{Math.floor(Math.random() * 5 + 1)} cycles</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="surface-panel shadow-glow p-6 w-full max-w-full min-w-0 overflow-hidden">
          <h3 className="text-xl font-semibold text-primary">Fetch Decode Execute Cycle</h3>
          <p className="mt-3 text-muted">Step through the instruction flow and watch how registers and control signals respond.</p>
          <div className="mt-6 space-y-4">
            <div className="grid gap-3 md:grid-cols-4">
              {stages.map((stage, index) => (
                <button
                  key={stage}
                  onClick={() => setCycleStep(index)}
                  className={`rounded-3xl border px-4 py-4 text-left text-sm transition ${
                    cycleStep === index
                      ? 'border-[color:var(--accent)/0.8] bg-[color:var(--accent)/0.14] text-accent'
                      : 'border-base bg-[color:var(--surface-elevated)/0.92] text-muted hover:border-[color:var(--accent)/0.3] hover:bg-[color:var(--surface-base)/0.94]'
                  }`}
                >
                  <p className="font-semibold">{stage}</p>
                  <p className="mt-1 text-xs text-slate-400">Step {index + 1}</p>
                </button>
              ))}
            </div>
            <div className="rounded-[28px] border border-[color:var(--accent)/0.2] bg-[color:var(--surface-elevated)/0.92] p-5">
              <p className="text-sm uppercase tracking-[0.35em] text-accent/70">Current Stage</p>
              <h4 className="mt-3 text-2xl font-semibold text-primary">{stages[cycleStep]}</h4>
              <p className="mt-2 text-muted">
                {cycleStep === 0 && 'The CPU fetches the next instruction from memory and loads it into the instruction register.'}
                {cycleStep === 1 && 'Decode the instruction, identify operands, and prepare the ALU and control signals.'}
                {cycleStep === 2 && 'Execute the operation with the ALU, update registers, and manage results.'}
                {cycleStep === 3 && 'Store the computed result back into memory or registers and prepare the next fetch.'}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-[32px] border border-white/10 bg-slate-950/70 p-5 shadow-glow backdrop-blur-xl w-full max-w-full min-w-0 overflow-hidden">
            <div className="flex items-center gap-3 text-cyan-300">
              <FaBolt className="h-5 w-5" />
              <h4 className="text-lg font-semibold text-white">ALU & Control Unit</h4>
            </div>
            <p className="mt-3 text-slate-300">
              The ALU processes arithmetic and logic operations while the control unit sequences instructions and data flow.
            </p>
            <div className="mt-5 space-y-3 text-sm text-[var(--text-primary)]">
              <div className="rounded-3xl bg-[color:var(--surface-elevated)/0.92] p-4">ALU performs operations such as ADD, SUB, AND, OR, and comparisons.</div>
              <div className="rounded-3xl bg-[color:var(--surface-elevated)/0.92] p-4">Control unit uses instruction bits to generate timing signals and route data through the CPU.</div>
            </div>
          </div>
          <div className="rounded-[32px] border border-[var(--border)] bg-[color:var(--surface-elevated)/0.92] p-5 shadow-glow backdrop-blur-xl">
            <div className="flex items-center gap-3 text-emerald-300">
              <FaMemory className="h-5 w-5" />
              <h4 className="text-lg font-semibold text-[var(--text-primary)]">Cache & Memory</h4>
            </div>
            <MemoryFlow />
          </div>
        </div>
      </div>

      <div className="space-y-6 rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-glow backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Pipelining & Parallel Execution</h3>
            <p className="mt-2 text-slate-300">
              Visualize instruction overlap and how multiple pipelines improve throughput across modern CPUs.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {multicoreModes.map((mode) => (
              <button
                key={mode.cores}
                onClick={() => setSelectedCore(mode.cores)}
                className={`rounded-3xl border px-4 py-3 text-left text-sm transition ${
                  selectedCore === mode.cores
                    ? 'border-cyan-300 bg-cyan-500/10 text-white'
                    : 'border-base bg-[color:var(--surface-elevated)/0.92] text-[var(--text-primary)] hover:border-[color:var(--accent)/0.3] hover:bg-[color:var(--surface-base)/0.94]'
                }`}
              >
                <p className="font-semibold">{mode.label}</p>
                <p className="mt-1 text-slate-400">{mode.cores} logical core{mode.cores > 1 ? 's' : ''}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-[32px] border border-[var(--border)] bg-[color:var(--surface-elevated)/0.92] p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/70">Workload Distribution</p>
              <h4 className="mt-3 text-2xl font-semibold text-white">{selectedCore} Core Configuration</h4>
              <p className="mt-3 text-slate-300">
                A {selectedCore}-core design can distribute independent threads across multiple execution units, reducing wait time and improving responsiveness.
              </p>
            </div>
            <div className="rounded-3xl bg-[color:var(--surface-base)/0.92] p-4 text-[var(--text-primary)]">
              <p className="text-sm text-cyan-300">Logical vs Physical Cores</p>
              <div className="mt-4 grid gap-3">
                <div className="flex items-center justify-between rounded-3xl bg-[color:var(--surface-elevated)/0.92] p-3">
                  <span>Physical cores</span>
                  <span>{selectedCore}</span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-[color:var(--surface-elevated)/0.92] p-3">
                  <span>Logical threads</span>
                  <span>{selectedCore * 2}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <PipelineScene />
          </div>
        </div>
      </div>
    </div>
  );
}
