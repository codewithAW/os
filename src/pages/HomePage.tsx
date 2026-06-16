import { Link } from 'react-router-dom';
import { FaChevronRight, FaMicrochip, FaProjectDiagram, FaStream, FaTerminal, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import CpuScene from '../components/visuals/CpuScene';
import { topicCards } from '../data/topicData';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { PageHeader } from '../components/ui/PageHeader';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function HomePage() {
  return (
    <div className="space-y-20">
      {/* Hero section */}
      <section className="relative -mx-6 sm:-mx-8 px-6 sm:px-8 py-12 sm:py-20 border-b border-base">
        <div className="absolute inset-0 bg-gradient-subtle opacity-40 pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[color:var(--accent)/0.12] border border-[color:var(--accent)/0.25]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              <span className="text-sm font-medium text-accent">
                Enterprise-Grade OS Education
              </span>
            </div>

            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-6xl font-bold text-white leading-tight">
                Visual Operating System Learning Platform
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
                Master CPU architecture, process management, threading, and instruction execution through interactive 3D visualizations and real-time simulations.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/cpu">
                <Button size="lg" variant="primary" icon={<FaChevronRight />}>
                  Start Learning
                </Button>
              </Link>
              <Button size="lg" variant="secondary">
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>

        {/* 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 relative"
        >
          <div className="relative rounded-lg overflow-hidden surface-panel border border-base">
            <CpuScene />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-primary">
                  Interactive 3D CPU Visualization
                </p>
                <p className="text-xs text-muted">
                  Rotate and inspect CPU architecture in real-time
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Learning paths section */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-white">
            Core Learning Paths
          </h2>
          <p className="text-base text-slate-400">
            Master operating systems through four interconnected topics
          </p>
        </div>

        {/* Topic cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-6 md:grid-cols-2"
        >
          {topicCards.map((topic) => {
            const Icon =
              topic.icon === 'CpuChip'
                ? FaMicrochip
                : topic.icon === 'Layers'
                  ? FaProjectDiagram
                  : topic.icon === 'GitBranch'
                    ? FaStream
                    : FaTerminal;

            return (
              <motion.div key={topic.title} variants={itemVariants}>
                <Link to={topic.path} className="block group">
                  <Card interactive className="h-full">
                    <CardContent className="flex flex-col h-full gap-4 pt-6">
                      <div className="w-12 h-12 rounded-lg bg-[color:var(--accent)/0.14] border border-[color:var(--accent)/0.25] flex items-center justify-center group-hover:bg-[color:var(--accent)/0.2] transition-colors">
                        <Icon className="w-6 h-6 text-[var(--accent)]" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors">
                          {topic.title}
                        </h3>
                        <p className="text-sm text-muted">
                          {topic.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-accent group-hover:gap-3 transition-all pt-2">
                        Explore
                        <FaArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Features section */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-white">
            Why Choose Our Platform?
          </h2>
          <p className="text-base text-slate-400">
            Built for modern learners and educators
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-6 md:grid-cols-3"
        >
          {[
            {
              title: 'Interactive Visualizations',
              description: 'Real-time 3D models and animations that bring complex concepts to life',
            },
            {
              title: 'Hands-On Simulations',
              description: 'Experiment with CPU execution, process scheduling, and threading',
            },
            {
              title: 'Enterprise Quality',
              description: 'Production-grade interface designed for serious learners',
            },
          ].map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card>
                <CardContent className="space-y-4 pt-6">
                  <div className="w-10 h-10 rounded-lg bg-[color:var(--success)/0.12] border border-[color:var(--success)/0.25] flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-[var(--success)]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-primary">{feature.title}</h3>
                    <p className="text-sm text-muted">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
