import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCube, FaCircle, FaArrowRight, FaCogs, FaMicrochip, FaClipboardList, FaNetworkWired } from 'react-icons/fa';
import { subscribeToSimulationEvents } from '../simulation/eventBus';
import { createSimulationEngine } from '../simulation/engine';
import { useSimulationStore } from '../stores/useSimulationStore';
import { ProcessEntry, QueueUpdatePayload } from '../simulation/types';
import FlowMetricsPanel from '../components/LiveFlow/FlowMetricsPanel';
import FlowVisualizationBoard from '../components/LiveFlow/FlowVisualizationBoard';
import SimulationControls from '../components/LiveFlow/SimulationControls';
import SectionTitle from '../components/SectionTitle';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';

const defaultProcesses: ProcessEntry[] = [
  { id: 'P1', burst: 5, priority: 2, state: 'Ready' },
  { id: 'P2', burst: 3, priority: 1, state: 'Ready' },
  { id: 'P3', burst: 7, priority: 4, state: 'Ready' },
];

export default function ProcessManagementPage() {
  const [processes, setProcesses] = useState<ProcessEntry[]>(defaultProcesses);
  const [newId, setNewId] = useState('P4');
  const [burst, setBurst] = useState(4);
  const [priority, setPriority] = useState(3);
  const [quantum, setQuantum] = useState(3);
  const [liveFlowState, setLiveFlowState] = useState<QueueUpdatePayload>({
    cycle: 0,
    processPool: defaultProcesses.map((process) => ({ ...process, remaining: process.burst })),
    readyQueue: defaultProcesses.map((process) => process.id),
    blockedQueue: [],
    running: [
      { coreId: 1, process: null },
      { coreId: 2, process: null },
    ],
    completed: [],
    contextSwitches: 0,
    historyLength: 1,
  });
  const [historyLength, setHistoryLength] = useState(1);

  const {
    liveFlowMode,
    isRunning,
    speed,
    currentCycle,
    setLiveFlowMode,
    setRunning,
    setSpeed,
    setCurrentCycle,
    setCurrentTask,
  } = useSimulationStore();

  const engine = useMemo(() => createSimulationEngine(defaultProcesses), []);

  useEffect(() => {
    const unsubscribe = subscribeToSimulationEvents((event) => {
      if (event.type === 'QUEUE_UPDATE') {
        const payload = event.payload as QueueUpdatePayload;
        setLiveFlowState(payload);
        setHistoryLength(payload.historyLength);
        if (typeof payload.cycle === 'number') {
          setCurrentCycle(payload.cycle);
        }
      }

      if (event.type === 'PROCESS_RUNNING') {
        const payload = event.payload as { id: string };
        setCurrentTask(payload.id);
      }

      if (event.type === 'PROCESS_TERMINATED') {
        setCurrentTask(null);
      }

      if (event.type === 'CPU_CYCLE') {
        const payload = event.payload as { cycle: number };
        setCurrentCycle(payload.cycle);
      }
    });

    return () => {
      unsubscribe();
      engine.pause();
    };
  }, [engine, setCurrentCycle, setCurrentTask]);

  useEffect(() => {
    if (!liveFlowMode) {
      engine.pause();
      setRunning(false);
    }
  }, [engine, liveFlowMode, setRunning]);

  const fcfsOrder = useMemo(() => processes.map((process) => process.id).join(' → '), [processes]);
  const shortest = useMemo(
    () => [...processes].sort((a, b) => a.burst - b.burst).map((process) => process.id).join(' → '),
    [processes],
  );
  const priorityOrder = useMemo(
    () => [...processes].sort((a, b) => a.priority - b.priority).map((process) => process.id).join(' → '),
    [processes],
  );

  const roundRobinSequence = useMemo(() => {
    const queue = processes.map((process) => ({ ...process, remaining: process.burst }));
    const order: string[] = [];
    while (queue.some((job) => job.remaining > 0)) {
      queue.forEach((job) => {
        if (job.remaining > 0) {
          order.push(job.id);
          job.remaining -= quantum;
        }
      });
    }
    return order.join(' → ');
  }, [processes, quantum]);

  const toggleLiveFlow = () => {
    setLiveFlowMode(!liveFlowMode);
  };

  const syncAddProcess = () => {
    const id = newId || `P${processes.length + 1}`;
    const entry: ProcessEntry = { id, burst, priority, state: 'Ready' };
    setProcesses((current) => [...current, entry]);
    engine.addProcess(entry);
    setNewId(`P${processes.length + 2}`);
  };

  const handlePlayPause = () => {
    if (isRunning) {
      engine.pause();
      setRunning(false);
    } else {
      engine.start();
      setRunning(true);
    }
  };

  const handleReset = () => {
    engine.reset(processes);
    setRunning(false);
  };

  const handleStep = () => {
    engine.step();
  };

  const handleSpeedChange = (nextSpeed: number) => {
    engine.setSpeed(nextSpeed);
    setSpeed(nextSpeed);
  };

  const handleSeek = (cycleIndex: number) => {
    engine.seek(cycleIndex);
  };

  // Educational content data
  const processDefinitionItems = [
    { icon: FaCube, label: 'Program Code', desc: 'Instructions executed by CPU', color: 'blue' },
    { icon: FaMicrochip, label: 'CPU Registers', desc: 'Current execution state', color: 'amber' },
    { icon: FaClipboardList, label: 'Memory', desc: 'Data and variables', color: 'green' },
    { icon: FaNetworkWired, label: 'Resources', desc: 'Files and devices', color: 'purple' },
  ];

  const osResponsibilities = [
    { title: 'Process Creation', desc: 'Initialize new processes and allocate resources', icon: FaCube },
    { title: 'CPU Scheduling', desc: 'Decide which process runs next on CPU', icon: FaMicrochip },
    { title: 'Context Switching', desc: 'Save/restore process state efficiently', icon: FaArrowRight },
    { title: 'Synchronization', desc: 'Manage access to shared resources', icon: FaNetworkWired },
    { title: 'Process Termination', desc: 'Clean up and release process resources', icon: FaCircle },
  ];

  const processStates = [
    { state: 'New', desc: 'Process is created', color: 'slate' },
    { state: 'Ready', desc: 'Waiting for CPU allocation', color: 'blue' },
    { state: 'Running', desc: 'CPU is executing it', color: 'green' },
    { state: 'Waiting', desc: 'Waiting for I/O or event', color: 'amber' },
    { state: 'Terminated', desc: 'Finished execution', color: 'slate' },
  ];

  return (
    <div className="space-y-12">
      <SectionTitle 
        title="Process Management" 
        subtitle="Master Operating System process management concepts" 
      />

      {/* ============================================ SECTION 1: WHAT IS A PROCESS ============================================ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card>
          <CardHeader title="🧠 What is a Process?" />
          <CardContent>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Definition</h4>
                <p className="text-slate-300 leading-relaxed">
                  A <span className="font-semibold text-cyan-300">process</span> is a program that is currently <span className="font-semibold text-cyan-300">running in memory</span>. It's an instance of a program in execution, with its own memory space, CPU state, and resources.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Real-World Examples</h4>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-accent-soft border border-accent-soft">
                    <p className="text-sm font-semibold text-accent">Chrome Browser Running</p>
                    <p className="text-xs text-muted mt-1">= Process (P1)</p>
                  </div>
                  <div className="p-3 rounded-lg bg-success-soft border border-success-soft">
                    <p className="text-sm font-semibold text-success">Game Running</p>
                    <p className="text-xs text-muted mt-1">= Process (P2)</p>
                  </div>
                  <div className="p-3 rounded-lg bg-warning-soft border border-warning-soft">
                    <p className="text-sm font-semibold text-warning">YouTube App</p>
                    <p className="text-xs text-muted mt-1">= Process (P3)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Program vs Process Comparison */}
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <motion.div 
                whileHover={{ y: -2 }}
                className="p-5 rounded-xl surface-panel border border-base"
              >
                <h5 className="text-primary font-semibold mb-3 flex items-center gap-2">
                  <FaCube className="text-muted" /> Program
                </h5>
                <ul className="text-sm text-muted space-y-2">
                  <li>✓ Passive (stored on disk)</li>
                  <li>✓ File on storage drive</li>
                  <li>✓ Static code and data</li>
                  <li>✓ Same for all instances</li>
                </ul>
              </motion.div>
              <motion.div 
                whileHover={{ y: -2 }}
                className="p-5 rounded-xl bg-accent-soft border border-accent-soft"
              >
                <h5 className="text-primary font-semibold mb-3 flex items-center gap-2">
                  <FaMicrochip className="text-accent" /> Process
                </h5>
                <ul className="text-sm text-muted space-y-2">
                  <li>✓ Active (running in memory)</li>
                  <li>✓ Lives in RAM</li>
                  <li>✓ Dynamic state and execution</li>
                  <li>✓ Unique for each instance</li>
                </ul>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ============================================ SECTION 2: WHAT A PROCESS CONTAINS ============================================ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card>
          <CardHeader title="⚙️ What a Process Contains" />
          <CardContent>
            <p className="text-slate-300 mb-6">Every process has these critical components:</p>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {processDefinitionItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <item.icon className="text-lg text-cyan-300" />
                    <h5 className="font-semibold text-white text-sm">{item.label}</h5>
                  </div>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Process Memory Layout */}
            <div className="mt-8">
              <h4 className="text-white font-semibold mb-4">Process Memory Layout</h4>
              <div className="flex flex-col gap-2 p-4 rounded-lg bg-slate-900/50 border border-slate-700/50">
                {[
                  { section: 'Code Section', range: '0x00000 - 0x10000', color: 'blue' },
                  { section: 'Initialized Data', range: '0x10000 - 0x20000', color: 'green' },
                  { section: 'Uninitialized Data', range: '0x20000 - 0x30000', color: 'amber' },
                  { section: 'Heap (Dynamic)', range: '0x30000 - 0x70000', color: 'purple' },
                  { section: 'Stack (Local)', range: '0x70000 - 0xFFFFF', color: 'rose' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 py-2">
                    <div className={`w-6 h-6 rounded bg-${item.color}-500/20 border border-${item.color}-500/40`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">{item.section}</p>
                      <p className="text-xs text-slate-400">{item.range}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ============================================ SECTION 3: PROCESS STATES & LIFECYCLE ============================================ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card>
          <CardHeader title="🧠 Process State & Lifecycle" />
          <CardContent>
            <p className="text-slate-300 mb-6">A process goes through five states during its lifetime:</p>
            
            {/* State Timeline */}
            <div className="relative mb-8">
              <div className="flex items-center justify-between gap-2">
                {processStates.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="flex-1"
                  >
                    <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 text-center">
                      <p className="font-semibold text-white text-lg">{item.state}</p>
                      <p className="text-xs text-slate-400 mt-2">{item.desc}</p>
                    </div>
                    {idx < processStates.length - 1 && (
                      <div className="hidden md:flex justify-center mt-3">
                        <FaArrowRight className="text-slate-500 rotate-0 hidden md:inline" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* State Transition Details */}
            <div className="grid gap-4">
              <div className="p-4 rounded-lg surface-panel border border-base">
                <p className="font-semibold text-accent text-sm mb-2">New → Ready</p>
                <p className="text-xs text-muted">Process created and loaded into memory, ready for scheduling</p>
              </div>
              <div className="p-4 rounded-lg surface-panel border border-base">
                <p className="font-semibold text-success text-sm mb-2">Ready → Running</p>
                <p className="text-xs text-muted">OS scheduler assigns CPU time to the process</p>
              </div>
              <div className="p-4 rounded-lg surface-panel border border-base">
                <p className="font-semibold text-warning text-sm mb-2">Running → Waiting/Blocked</p>
                <p className="text-xs text-muted">Process waits for I/O operation or system resource</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <p className="font-semibold text-slate-300 text-sm mb-2">Waiting → Ready</p>
                <p className="text-xs text-slate-400">I/O completes, process returns to ready queue</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <p className="font-semibold text-slate-300 text-sm mb-2">Running → Terminated</p>
                <p className="text-xs text-slate-400">Process completes execution or is killed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ============================================ SECTION 4: WHAT IS PROCESS MANAGEMENT ============================================ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card>
          <CardHeader title="⚙️ What is Process Management?" />
          <CardContent>
            <div className="p-6 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 mb-6">
              <p className="text-white font-semibold mb-3">Definition</p>
              <p className="text-slate-300 leading-relaxed">
                <span className="text-cyan-300 font-semibold">Process Management</span> is the Operating System's responsibility to manage running programs. It controls process creation, scheduling, synchronization, and termination to ensure efficient resource utilization and system stability.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <p className="font-semibold text-white mb-3">Key Objectives</p>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li>✓ Fair CPU allocation</li>
                  <li>✓ Maximize CPU utilization</li>
                  <li>✓ Minimize context switches</li>
                  <li>✓ Prevent process starvation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <p className="font-semibold text-white mb-3">Core Activities</p>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li>✓ Process creation/termination</li>
                  <li>✓ CPU scheduling</li>
                  <li>✓ Memory management</li>
                  <li>✓ Resource allocation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ============================================ SECTION 5: OS RESPONSIBILITIES ============================================ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card>
          <CardHeader title="🔥 OS Responsibilities in Process Management" />
          <CardContent>
            <p className="text-slate-300 mb-6">The Operating System has five critical responsibilities:</p>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
              {osResponsibilities.map((resp, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="p-5 rounded-lg bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-cyan-500/30 transition"
                >
                  <div className="flex justify-center mb-3">
                    <resp.icon className="text-2xl text-cyan-400" />
                  </div>
                  <h5 className="font-semibold text-white text-center text-sm mb-2">{resp.title}</h5>
                  <p className="text-xs text-slate-400 text-center">{resp.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Detailed Explanations */}
            <div className="mt-8 space-y-4">
              {[
                {
                  title: 'Process Creation',
                  details: 'The OS creates a new process when a program is launched. It allocates memory, initializes registers, sets up file descriptors, and creates a Process Control Block (PCB).'
                },
                {
                  title: 'CPU Scheduling',
                  details: 'The OS decides which process should run on the CPU and when. Different algorithms (FCFS, SJF, Priority, Round Robin) optimize for different goals.'
                },
                {
                  title: 'Context Switching',
                  details: 'When switching between processes, the OS saves the current process state to its PCB and loads the next process state from memory. This is efficient but has overhead.'
                },
                {
                  title: 'Synchronization',
                  details: 'The operating system controls access to shared resources using mechanisms like locks and semaphores to prevent problems such as race conditions and data corruption when multiple processes or threads try to use the same resource at the same time.'
                },
                {
                  title: 'Process Termination',
                  details: 'When a process finishes or crashes, the OS deallocates memory, closes file handles, and releases all resources back to the system.'
                }
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/30">
                  <p className="font-semibold text-cyan-300 mb-2">{item.title}</p>
                  <p className="text-sm text-slate-300">{item.details}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ============================================ SECTION 6: PROCESS ANALOGY ============================================ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card>
          <CardHeader title="💡 Real-World Analogy: Restaurant Kitchen" />
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-5 rounded-lg bg-gradient-to-b from-blue-500/10 to-blue-600/5 border border-blue-500/20"
              >
                <h4 className="font-semibold text-blue-300 mb-3">Process = Customer Order</h4>
                <p className="text-sm text-slate-300">
                  Each customer order is like a process. It contains all the information needed: menu items, special requests, dietary restrictions, and payment info.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-5 rounded-lg bg-gradient-to-b from-green-500/10 to-green-600/5 border border-green-500/20"
              >
                <h4 className="font-semibold text-green-300 mb-3">CPU = Chef</h4>
                <p className="text-sm text-slate-300">
                  The chef is like the CPU. There's usually only one chef, but they prepare many orders. They work on one order at a time.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-5 rounded-lg bg-gradient-to-b from-amber-500/10 to-amber-600/5 border border-amber-500/20"
              >
                <h4 className="font-semibold text-amber-300 mb-3">OS = Restaurant Manager</h4>
                <p className="text-sm text-slate-300">
                  The manager decides which order the chef cooks next. They prevent chaos by organizing orders and switching efficiently.
                </p>
              </motion.div>
            </div>

            <div className="mt-6 p-5 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <p className="font-semibold text-white mb-4">How It Works Together:</p>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex gap-3">
                  <FaArrowRight className="text-cyan-400 flex-shrink-0 mt-0.5" />
                  <p><span className="font-semibold text-white">Manager</span> decides which order (process) to give to the chef (CPU)</p>
                </div>
                <div className="flex gap-3">
                  <FaArrowRight className="text-cyan-400 flex-shrink-0 mt-0.5" />
                  <p><span className="font-semibold text-white">Chef</span> works on the order, then moves to the next one when manager says so</p>
                </div>
                <div className="flex gap-3">
                  <FaArrowRight className="text-cyan-400 flex-shrink-0 mt-0.5" />
                  <p><span className="font-semibold text-white">Switching</span> between orders has overhead (setup/cleanup) like context switching</p>
                </div>
                <div className="flex gap-3">
                  <FaArrowRight className="text-cyan-400 flex-shrink-0 mt-0.5" />
                  <p><span className="font-semibold text-white">Fair scheduling</span> ensures all customers get served, none are starved</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ============================================ SECTION 7: INTERACTIVE SIMULATOR ============================================ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card>
          <CardHeader title="🧪 Interactive Process Scheduling Simulator" />
          <CardContent>
            <p className="text-slate-300 mb-6">Experiment with CPU scheduling algorithms and see how different processes are scheduled:</p>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-slate-900/80 p-5">
                <h4 className="text-lg font-semibold text-white mb-4">Add New Process</h4>
                <div className="space-y-4">
                  <label className="block text-sm text-slate-300">
                    Process ID
                    <input
                      value={newId}
                      onChange={(event) => setNewId(event.target.value)}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none"
                    />
                  </label>
                  <label className="block text-sm text-slate-300">
                    Burst Time
                    <input
                      type="number"
                      min={1}
                      value={burst}
                      onChange={(event) => setBurst(Number(event.target.value))}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none"
                    />
                  </label>
                  <label className="block text-sm text-slate-300">
                    Priority
                    <input
                      type="number"
                      min={1}
                      value={priority}
                      onChange={(event) => setPriority(Number(event.target.value))}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={syncAddProcess}
                    className="w-full rounded-lg bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                  >
                    Add Process
                  </button>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-slate-900/80 p-5 text-slate-200">
                <h4 className="text-lg font-semibold text-white mb-4">Current Process List</h4>
                <div className="space-y-3">
                  {processes.map((process) => (
                    <div key={process.id} className="rounded-lg border border-white/10 bg-slate-950/80 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-white">{process.id}</p>
                        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">{process.state}</span>
                      </div>
                      <p className="mt-2 text-sm text-slate-300">Burst: {process.burst} | Priority: {process.priority}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Round Robin Quantum */}
            <div className="mt-6 rounded-lg border border-white/10 bg-slate-900/80 p-5">
              <p className="text-sm font-semibold text-white mb-4">Round Robin Quantum: {quantum} cycles</p>
              <input
                type="range"
                min={1}
                max={6}
                value={quantum}
                onChange={(event) => setQuantum(Number(event.target.value))}
                className="w-full"
              />
            </div>

            {/* Scheduling Results */}
            <div className="mt-6 rounded-lg border border-white/10 bg-slate-900/80 p-5">
              <h4 className="text-lg font-semibold text-white mb-4">Scheduling Results</h4>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="rounded-lg bg-slate-950/80 p-4">
                  <p className="text-sm font-semibold text-cyan-300 mb-2">FCFS (First-Come-First-Served)</p>
                  <p className="text-sm text-slate-300">{fcfsOrder}</p>
                </div>
                <div className="rounded-lg bg-slate-950/80 p-4">
                  <p className="text-sm font-semibold text-green-300 mb-2">SJF (Shortest Job First)</p>
                  <p className="text-sm text-slate-300">{shortest}</p>
                </div>
                <div className="rounded-lg bg-slate-950/80 p-4">
                  <p className="text-sm font-semibold text-amber-300 mb-2">Priority Scheduling</p>
                  <p className="text-sm text-slate-300">{priorityOrder}</p>
                </div>
                <div className="rounded-lg bg-slate-950/80 p-4">
                  <p className="text-sm font-semibold text-purple-300 mb-2">Round Robin</p>
                  <p className="text-sm text-slate-300">{roundRobinSequence}</p>
                </div>
              </div>
            </div>

            {/* Live Flow Simulation */}
            <div className="mt-6 text-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleLiveFlow}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-400 hover:to-blue-400 transition"
              >
                {liveFlowMode ? '⏸ Stop Live Simulation' : '▶ Start Live Simulation'}
              </motion.button>
            </div>

            {liveFlowMode && (
              <div className="mt-6 space-y-6 rounded-lg border border-cyan-300/10 bg-slate-950/70 p-6">
                <SimulationControls
                  liveFlowMode={liveFlowMode}
                  isRunning={isRunning}
                  cycle={currentCycle}
                  maxCycle={historyLength}
                  speed={speed}
                  onToggleLiveFlow={toggleLiveFlow}
                  onPlayPause={handlePlayPause}
                  onReset={handleReset}
                  onStep={handleStep}
                  onSpeedChange={handleSpeedChange}
                  onSeek={handleSeek}
                />
                <FlowMetricsPanel
                  cycle={liveFlowState.cycle}
                  contextSwitches={liveFlowState.contextSwitches}
                  readyQueue={liveFlowState.readyQueue}
                  blockedQueue={liveFlowState.blockedQueue}
                  completed={liveFlowState.completed}
                  running={liveFlowState.running.map((slot) => ({
                    coreId: slot.coreId,
                    process: slot.process
                      ? { id: slot.process.id, remaining: slot.process.remaining }
                      : null,
                  }))}
                />
                <FlowVisualizationBoard
                  running={liveFlowState.running.map((slot) => ({
                    coreId: slot.coreId,
                    process: slot.process
                      ? { id: slot.process.id, remaining: slot.process.remaining }
                      : null,
                  }))}
                  readyQueue={liveFlowState.readyQueue}
                  blockedQueue={liveFlowState.blockedQueue}
                  completed={liveFlowState.completed}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
