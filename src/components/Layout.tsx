import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen bg-gradient-subtle">
      {/* Background gradient accent */}
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-subtle" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        
        <div className="mx-auto max-w-7xl px-section py-section">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Sidebar - hidden on mobile, shown on lg */}
            <Sidebar />
            
            {/* Main content area */}
            <main className="min-w-0">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

