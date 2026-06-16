import { FaBrain, FaMoon, FaSun } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useAppStore } from '../stores/useAppStore';
import { navSections } from './navSections';
import { Button } from './ui/Button';

export default function Header() {
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);

  return (
    <>
      {/* Main header */}
      <header className="border-b border-base bg-surface-overlay backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-section py-3">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-[var(--accent)] flex items-center justify-center flex-shrink-0 shadow-lg">
                <FaBrain className="h-5 w-5 text-[var(--surface-base)]" />
              </div>
              <div className="min-w-0">
                <p className="text-label text-accent">OS Learning</p>
                <p className="text-base font-semibold text-primary truncate">Visual Platform</p>
              </div>
            </div>

            {/* Mobile navigation - visible only on mobile */}
            <nav className="flex lg:hidden gap-2 flex-wrap flex-1 justify-end min-w-0">
              {navSections.slice(0, 3).map((section) => (
                <NavLink
                  key={section.path}
                  to={section.path}
                  end={section.path === '/'}
                  className={({ isActive }) =>
                    `px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-[color:var(--accent)/0.18] text-accent border border-[color:var(--accent)/0.3]'
                        : 'bg-[var(--surface-elevated)] text-muted hover:text-primary hover:bg-[var(--surface-base)] border border-transparent'
                    }`
                  }
                >
                  {section.title.split(' ')[0]}
                </NavLink>
              ))}
            </nav>

            {/* Theme toggle */}
            <Button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              variant="ghost"
              size="sm"
              className="flex-shrink-0"
              title="Toggle theme"
            >
              {theme === 'dark' ? (
                <FaSun className="h-4 w-4 text-amber-400" />
              ) : (
                <FaMoon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile nav drawer - full menu on mobile */}
      <div className="lg:hidden border-b border-slate-700 bg-slate-900/30 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-section py-2">
          <nav className="flex flex-wrap gap-2">
            {navSections.map((section) => (
              <NavLink
                key={section.path}
                to={section.path}
                end={section.path === '/'}
                className={({ isActive }) =>
                  `px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-[color:var(--accent)/0.18] text-accent border border-[color:var(--accent)/0.3]'
                      : 'bg-[var(--surface-elevated)] text-muted hover:text-primary hover:bg-[var(--surface-base)] border border-transparent'
                  }`
                }
              >
                {section.title}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}

