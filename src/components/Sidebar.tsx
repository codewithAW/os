import { NavLink } from 'react-router-dom';
import { navSections } from './navSections';

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col gap-2 h-fit sticky top-28">
      {/* Section header */}
      <div className="px-4 py-2 mb-2">
        <p className="text-label text-muted mb-1">Navigate</p>
        <p className="text-sm font-semibold text-primary">Topics</p>
      </div>

      {/* Navigation links */}
      <nav className="flex flex-col gap-1">
        {navSections.map((section) => {
          const Icon = section.icon;
          return (
            <NavLink
              key={section.path}
              to={section.path}
              end={section.path === '/'}
              className={({ isActive }) =>
                `
                  group flex items-center gap-3 px-4 py-2 rounded-lg
                  transition-all duration-200
                  ${
                    isActive
                      ? 'bg-[color:var(--accent)/0.18] text-accent border border-[color:var(--accent)/0.3]'
                      : 'text-muted hover:text-primary hover:bg-[color:var(--surface-overlay)/0.85] border border-transparent'
                  }
                `
              }
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm font-medium truncate">{section.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

