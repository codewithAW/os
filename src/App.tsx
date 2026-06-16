import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useAppStore } from './stores/useAppStore';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CpuPage from './pages/CpuPage';
import ProcessorPage from './pages/ProcessorPage';
import ProcessManagementPage from './pages/ProcessManagementPage';
import ThreadManagementPage from './pages/ThreadManagementPage';
import InstructionPage from './pages/InstructionPage';
import NotFoundPage from './pages/NotFoundPage';

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
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/cpu" element={<CpuPage />} />
              <Route path="/processor-info" element={<ProcessorPage />} />
              <Route path="/process-management" element={<ProcessManagementPage />} />
              <Route path="/thread-management" element={<ThreadManagementPage />} />
              <Route path="/instruction-management" element={<InstructionPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Layout>
    </div>
  );
}

export default App;
