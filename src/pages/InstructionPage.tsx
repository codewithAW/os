import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import LiveInstructionCycle from '../components/InstructionSim/LiveInstructionCycle';
import ControlUnitSimulation from '../components/InstructionSim/ControlUnitSimulation';
import HardwiredControlSimulation from '../components/InstructionSim/HardwiredControlSimulation';
import MicroprogrammedControlSimulation from '../components/InstructionSim/MicroprogrammedControlSimulation';

const program = ['LOAD R1, 0x100', 'ADD R2, R1', 'STORE R2, 0x200'];

export default function InstructionPage() {
  const [pointer] = useState(0);
  const currentInstruction = program[pointer] ?? 'NOP';

  return (
    <div className="space-y-10">
      <SectionTitle title="Instruction Management" subtitle="CPU instructions, encoding, control units, and interactive simulations" />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[24px] border border-cyan-300/8 surface-base p-6">
          <h3 className="text-2xl font-semibold text-body">Computer Instructions</h3>
          <p className="mt-3 text-muted">Instructions are the basic commands a CPU understands. They tell the processor what to do and how to do it.</p>

          <div className="mt-6 space-y-5">
            <section>
              <h4 className="font-semibold text-body">Definition</h4>
              <p className="mt-2 text-muted">A computer instruction is a binary-coded command that the CPU executes. It typically includes an opcode, operands, and mode information.</p>
            </section>

            <section>
              <h4 className="font-semibold text-body">Structure of an Instruction</h4>
              <div className="mt-3 space-y-3 text-sm text-muted">
                <div>
                  <p className="font-semibold text-body">Opcode</p>
                  <p>The part of the instruction that specifies the operation, such as ADD, LOAD, or STORE.</p>
                </div>
                <div>
                  <p className="font-semibold text-body">Address field</p>
                  <p>Specifies where data is located in memory or which register holds the operand.</p>
                </div>
                <div>
                  <p className="font-semibold text-body">Mode field</p>
                  <p>Determines how the CPU interprets operands: register, immediate, direct, or indirect.</p>
                </div>
              </div>
            </section>

            <section>
              <h4 className="font-semibold text-body">What each part means</h4>
              <p className="mt-2 text-muted">Think of an instruction as a recipe step: the opcode is the verb, the address field is the ingredient, and the mode field says whether the ingredient is fresh, canned, or pre-prepared.</p>
            </section>
          </div>
        </div>

        <div className="rounded-[24px] border border-cyan-300/8 surface-base p-6">
          <h3 className="text-2xl font-semibold text-body">Instruction Formats</h3>
          <p className="mt-3 text-muted">Different instruction formats tell the CPU how to locate operands and perform operations.</p>

          <div className="mt-6 space-y-5">
            <div className="rounded-xl p-4 surface-elevated">
              <p className="font-semibold text-body">Memory-reference instructions</p>
              <p className="mt-2 text-muted">Use a memory address to load or store data. Example: LOAD R1, 0x100.</p>
            </div>
            <div className="rounded-xl p-4 surface-elevated">
              <p className="font-semibold text-body">Register-reference instructions</p>
              <p className="mt-2 text-muted">Operate directly on CPU registers, such as ADD R1, R2.</p>
            </div>
            <div className="rounded-xl p-4 surface-elevated">
              <p className="font-semibold text-body">Input/output instructions</p>
              <p className="mt-2 text-muted">Control data transfer between the CPU and external devices.</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl p-4 surface-overlay text-sm text-muted">
            <p className="font-semibold text-body">How the CPU identifies instruction types</p>
            <p className="mt-2">The opcode bits are decoded by the Control Unit. Those bits tell the CPU whether the instruction is memory-reference, register-reference, or I/O.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[24px] border border-cyan-300/8 surface-base p-6">
          <h3 className="text-2xl font-semibold text-body">Instruction Set Completeness</h3>
          <p className="mt-3 text-muted">A complete instruction set supports a full range of operations needed by software.</p>

          <div className="mt-6 space-y-4 text-sm text-muted">
            <div>
              <p className="font-semibold text-body">Arithmetic/logic operations</p>
              <p className="mt-1">ADD, SUB, AND, OR, compare and branch decisions.</p>
            </div>
            <div>
              <p className="font-semibold text-body">Data transfer operations</p>
              <p className="mt-1">LOAD, STORE, MOVE between registers and memory.</p>
            </div>
            <div>
              <p className="font-semibold text-body">Program control operations</p>
              <p className="mt-1">JUMP, CALL, RETURN, and conditional branches.</p>
            </div>
            <div>
              <p className="font-semibold text-body">Input/output operations</p>
              <p className="mt-1">IN, OUT, and device control instructions.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-cyan-300/8 surface-base p-6">
          <h3 className="text-2xl font-semibold text-body">Design of the Control Unit</h3>
          <p className="mt-3 text-muted">The Control Unit is the brain of the CPU. It interprets each instruction and issues signals to the datapath.</p>

          <div className="mt-6 space-y-5">
            <section className="rounded-xl p-4 surface-elevated">
              <h4 className="font-semibold text-body">Hardwired Control Unit</h4>
              <p className="mt-2 text-muted">A fixed circuit built with gates and decoders to generate control signals instantly.</p>
              <ul className="mt-3 list-disc list-inside space-y-2 text-sm text-muted">
                <li>Instruction Register (IR) holds the current opcode.</li>
                <li>3×8 Decoder drives one of eight opcode outputs.</li>
                <li>I-bit flip-flop distinguishes register vs memory operations.</li>
                <li>Sequence counter steps through timing signals like T0–T4.</li>
                <li>4×16 decoder and control gates create the required control bus signals.</li>
              </ul>
              <p className="mt-3 text-muted">Example: ADD instruction fetches operands, activates ALU add logic, then writes the result back.</p>
              <p className="mt-2 font-semibold text-body">Pros: fast, low overhead. Cons: hard to modify, less flexible.</p>
            </section>

            <section className="rounded-xl p-4 surface-overlay text-sm text-muted">
              <h4 className="font-semibold text-body">Microprogrammed Control Unit</h4>
              <p className="mt-2">Uses a small ROM of microinstructions to generate control signals step-by-step.</p>
              <ul className="mt-3 list-disc list-inside space-y-2">
                <li>Sequencer chooses the next microinstruction address.</li>
                <li>Control Address Register (CAR) holds the ROM address.</li>
                <li>Control Memory (ROM) stores microinstructions.</li>
                <li>Control Data Register (CDR) holds the current control word.</li>
                <li>Control word expands into the control signals that drive the CPU.</li>
              </ul>
              <p className="mt-3 text-muted">Analogy: hardwired control is a custom-built machine, while microprogrammed control is like running a small firmware program on the CPU.</p>
              <p className="mt-2 font-semibold text-body">Pros: flexible and easy to update. Cons: slightly slower than hardwired logic.</p>
            </section>
          </div>
        </div>
      </div>

      <div className="rounded-[24px] border border-cyan-300/8 surface-base p-6 overflow-x-auto">
        <h3 className="text-2xl font-semibold text-body">Comparison Tables</h3>
        <p className="mt-3 text-muted">Quick reference tables for instruction types and control unit style.</p>

        <div className="mt-6 space-y-6">
          <div className="rounded-xl surface-elevated p-4">
            <h4 className="font-semibold text-body">Instruction Types</h4>
            <table className="w-full mt-4 text-sm border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left text-muted text-xs uppercase tracking-wide">
                  <th className="pb-2">Type</th>
                  <th className="pb-2">Description</th>
                  <th className="pb-2">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[var(--surface-base)] border border-[var(--border)]">
                  <td className="p-3 text-body">Memory-reference</td>
                  <td className="p-3 text-muted">Accesses data in memory using an address field.</td>
                  <td className="p-3 text-body">LOAD R1, 0x100</td>
                </tr>
                <tr className="bg-[var(--surface-base)] border border-[var(--border)]">
                  <td className="p-3 text-body">Register-reference</td>
                  <td className="p-3 text-muted">Performs operations directly on registers.</td>
                  <td className="p-3 text-body">ADD R2, R1</td>
                </tr>
                <tr className="bg-[var(--surface-base)] border border-[var(--border)]">
                  <td className="p-3 text-body">Input/output</td>
                  <td className="p-3 text-muted">Moves data between CPU and peripheral devices.</td>
                  <td className="p-3 text-body">IN R1, keyboard</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-xl surface-elevated p-4">
            <h4 className="font-semibold text-body">Hardwired vs Microprogrammed Control Unit</h4>
            <table className="w-full mt-4 text-sm border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left text-muted text-xs uppercase tracking-wide">
                  <th className="pb-2">Feature</th>
                  <th className="pb-2">Hardwired</th>
                  <th className="pb-2">Microprogrammed</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[var(--surface-base)] border border-[var(--border)]">
                  <td className="p-3 text-body">Implementation</td>
                  <td className="p-3 text-muted">Fixed logic gates and hard-coded circuits.</td>
                  <td className="p-3 text-muted">Control words stored in ROM, executed sequentially.</td>
                </tr>
                <tr className="bg-[var(--surface-base)] border border-[var(--border)]">
                  <td className="p-3 text-body">Flexibility</td>
                  <td className="p-3 text-muted">Low — difficult to change.</td>
                  <td className="p-3 text-muted">High — easy to update control firmware.</td>
                </tr>
                <tr className="bg-[var(--surface-base)] border border-[var(--border)]">
                  <td className="p-3 text-body">Speed</td>
                  <td className="p-3 text-muted">Faster due to direct logic paths.</td>
                  <td className="p-3 text-muted">Slightly slower because it fetches microinstructions.</td>
                </tr>
                <tr className="bg-[var(--surface-base)] border border-[var(--border)]">
                  <td className="p-3 text-body">Best for</td>
                  <td className="p-3 text-muted">High-performance custom CPUs.</td>
                  <td className="p-3 text-muted">Simple CPUs, educational designs, and easy updates.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="rounded-[24px] border border-cyan-300/8 surface-base p-6">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-body">Live Instruction Execution & Control Unit Simulation</h3>
            <p className="mt-3 text-muted">Use the live simulations below to watch how instructions move through the CPU and how control units generate signals.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl p-4 surface-elevated">
              <LiveInstructionCycle instruction={currentInstruction} />
            </div>
            <div className="rounded-xl p-4 surface-elevated">
              <ControlUnitSimulation />
            </div>
            <div className="rounded-xl p-4 surface-elevated">
              <HardwiredControlSimulation />
            </div>
            <div className="rounded-xl p-4 surface-elevated">
              <MicroprogrammedControlSimulation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
