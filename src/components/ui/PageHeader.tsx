import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  action?: ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  children?: ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  description,
  action,
  breadcrumbs,
  children,
}: PageHeaderProps) {
  return (
    <div className="mb-8 space-y-4">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-2 text-sm text-slate-400">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {crumb.href ? (
                <a href={crumb.href} className="hover:text-white transition-colors">
                  {crumb.label}
                </a>
              ) : (
                <span>{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <span className="text-slate-600">/</span>
              )}
            </div>
          ))}
        </nav>
      )}
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-6xl font-bold text-white mb-2">{title}</h1>
          {subtitle && (
            <p className="text-2xl font-semibold text-slate-400 mb-2">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="text-base text-slate-400 max-w-2xl">{description}</p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
      {children}
    </div>
  );
}

export default PageHeader;
