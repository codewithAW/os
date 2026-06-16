import { AnimatePresence, motion } from 'framer-motion';
import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useAppStore } from './stores/useAppStore';
import Layout from './components/Layout';

const HomePage = lazy(() => import('./pages/HomePage'));
const CpuPage = lazy(() => import('./pages/CpuPage'));
const ProcessorPage = lazy(() => import('./pages/ProcessorPage'));
const ProcessManagementPage = lazy(() => import('./pages/ProcessManagementPage'));
const ThreadManagementPage = lazy(() => import('./pages/ThreadManagementPage'));
const InstructionPage = lazy(() => import('./pages/InstructionPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  const theme = useAppStore((state) => state.theme);
  const location = useLocation();

  useEffect(() => {
    // Only toggle the 'dark' class; Tailwind dark mode uses the presence of this class
    document.documentElement.classList.toggle('dark', theme === 'dark');
    // Also expose current theme on a data attribute for CSS variable tuning
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen">
      <Layout>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35 }}
            className="px-4 pb-16 pt-6 md:px-8 lg:px-12 min-w-0"
          >
            <Suspense
              fallback={
                <div className="min-h-[240px] flex items-center justify-center rounded-3xl border border-white/10 bg-slate-950/80 text-sm text-slate-300">
                  Loading page...
                </div>
              }
            >
              <Routes location={location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/cpu" element={<CpuPage />} />
                <Route path="/processor-info" element={<ProcessorPage />} />
                <Route path="/process-management" element={<ProcessManagementPage />} />
                <Route path="/thread-management" element={<ThreadManagementPage />} />
                <Route path="/instruction-management" element={<InstructionPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </Layout>
    </div>
  );
}

export default App;
