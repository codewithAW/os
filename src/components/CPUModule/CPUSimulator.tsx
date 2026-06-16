import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaStepForward, FaRedo } from 'react-icons/fa';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { StatCard } from '../ui/StatCard';

const STAGES = ['Fetch', 'Decode', 'Execute', 'Store'] as const;

interface DashboardItemProps {
  label: string;
  value: React.ReactNode;
  active?: boolean;
  color?: 'blue' | 'amber' | 'green' | 'slate';
}

function DashboardItem({ label, value, active = false, color = 'slate' }: DashboardItemProps) {
  const bgColor = {
    blue: active ? 'bg-blue-500/20 border-blue-500/50' : 'bg-slate-800 border-slate-700',
    amber: active ? 'bg-amber-500/20 border-amber-500/50' : 'bg-slate-800 border-slate-700',
    green: active ? 'bg-green-500/20 border-green-500/50' : 'bg-slate-800 border-slate-700',
    slate: 'bg-slate-800 border-slate-700',
  };

  return (
    <div className={`border rounded-lg p-4 transition-all ${bgColor[color]}`}>
      <p className="text-xs font-medium text-slate-400 mb-2 uppercase">{label}</p>
      <div className="text-base font-semibold text-white truncate">{value}</div>
    </div>
  );
}

export default function CPUSimulator() {
  const [running, setRunning] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [ip, setIp] = useState(0);
  const [ir, setIr] = useState('LOAD R0, [0]');
  const [registers, setRegisters] = useState({ R0: 0, R1: 0, R2: 0, R3: 0 });
  const [memory] = useState(() => new Array(16).fill(0).map((_, i) => i * 7));
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (running && intervalRef.current == null) {
      intervalRef.current = window.setInterval(() => advance(), 700);
    }
    if (!running && intervalRef.current != null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [running]);

  useEffect(() => {
    const ops = ['LOAD R0, [0]', 'ADD R1, R0', 'STORE R1, [1]', 'NOP'];
    setIr(ops[ip % ops.length]);
  }, [ip]);

  function advance() {
    setStageIndex((s) => {
      const next = s + 1;
      if (next > STAGES.length - 1) {
        setIp((p) => p + 1);
        setRegisters((r) => ({ ...r, R0: r.R0 + 1, R1: r.R1 + 2 }));
        return 0;
      }
      return next;
    });
  }

  function handleStep() {
    advance();
  }

  function handleReset() {
    setRunning(false);
    setStageIndex(0);
    setIp(0);
    setIr('LOAD R0, [0]');
    setRegisters({ R0: 0, R1: 0, R2: 0, R3: 0 });
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Interactive Simulator</h2>
        <p className="text-slate-400 text-sm mt-1">
          Step through the Fetch-Decode-Execute cycle and observe register and memory state changes
        </p>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Control Unit - Full Width on Mobile, Takes 2 cols on Desktop */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader title="Control Unit & Pipeline" />
            <CardContent className="space-y-6">
              {/* Instruction Info */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-300">Current Instruction</p>
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <code className="text-lg font-mono text-blue-300">{ir}</code>
                </div>
              </div>

              {/* Stage Pipeline Visualization */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-300">Execution Stage</p>
                <div className="grid gap-3 grid-cols-4">
                  {STAGES.map((stage, index) => (
                    <motion.button
                      key={stage}
                      onClick={() => setStageIndex(index)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-3 rounded-lg font-medium transition-all ${
                        stageIndex === index
                          ? 'bg-blue-500 text-white ring-2 ring-blue-400 ring-offset-2 ring-offset-slate-900'
                          : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-750'
                      }`}
                    >
                      {stage}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Stage Details Grid */}
              <div className="grid gap-3 grid-cols-2">
                <DashboardItem
                  label="ALU Operation"
                  value={ir.split(' ')[0]}
                  active={stageIndex === 2}
                  color="green"
                />
                <DashboardItem
                  label="Current Cycle"
                  value={`${stageIndex + 1}/${STAGES.length}`}
                  active={true}
                  color="blue"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Control Buttons Panel */}
        <div>
          <Card>
            <CardHeader title="Controls" />
            <CardContent className="space-y-4">
              <div className="flex gap-2 flex-col">
                <Button
                  variant={running ? 'secondary' : 'primary'}
                  size="md"
                  onClick={() => setRunning(!running)}
                  icon={running ? <FaPause /> : <FaPlay />}
                  fullWidth
                >
                  {running ? 'Pause' : 'Run'}
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={handleStep}
                  icon={<FaStepForward />}
                  fullWidth
                >
                  Step
                </Button>
                <Button
                  variant="danger"
                  size="md"
                  onClick={handleReset}
                  icon={<FaRedo />}
                  fullWidth
                >
                  Reset
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="pt-4 border-t border-slate-700 space-y-3">
                <DashboardItem label="Instruction Pointer" value={ip} />
                <DashboardItem label="Cycle" value={stageIndex} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Data View Panels */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Registers */}
        <Card>
          <CardHeader title="CPU Registers" />
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(registers).map(([name, value]) => (
                <div
                  key={name}
                  className="p-3 rounded-lg bg-slate-750 border border-slate-700 hover:border-slate-600 transition-colors"
                >
                  <p className="text-xs font-semibold text-slate-400 mb-1">{name}</p>
                  <p className="text-lg font-mono text-blue-300">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Memory Samples */}
        <Card>
          <CardHeader title="Memory (Samples)" />
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {memory.slice(0, 8).map((value, index) => (
                <div
                  key={index}
                  className="p-2 rounded-lg bg-slate-750 border border-slate-700 text-center text-xs"
                >
                  <p className="font-mono text-slate-400">[{index}]</p>
                  <p className="font-mono text-slate-300 font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Telemetry */}
      <Card>
        <CardHeader title="Execution Telemetry" />
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <StatCard
              label="Instructions Executed"
              value={ip}
              color="blue"
            />
            <StatCard
              label="Current Stage"
              value={STAGES[stageIndex]}
              color="blue"
            />
            <StatCard
              label="Register State"
              value={`${Object.values(registers).reduce((a, b) => a + b, 0)}`}
              color="blue"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

