import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  elevated?: boolean;
}

interface CardHeaderProps {
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function Card({
  children,
  className = '',
  interactive = false,
  elevated = false,
}: CardProps) {
  return (
    <div
      className={`
        surface-card
        transition-interactive
        ${interactive ? 'hover:bg-[var(--surface-elevated)] hover:shadow-md cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
  children,
  className = '',
}: CardHeaderProps) {
  return (
    <div className={`px-6 py-4 border-b border-[var(--border)] ${className}`}>
      {children ? (
        children
      ) : (
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            {title && (
              <h3 className="text-lg font-semibold text-primary truncate">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-muted mt-1 truncate">{subtitle}</p>
            )}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}
    </div>
  );
}

export function CardContent({
  children,
  className = '',
}: CardContentProps) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

export function CardFooter({
  children,
  className = '',
}: CardFooterProps) {
  return (
    <div
      className={`px-6 py-4 border-t border-[var(--border)] bg-[color:var(--surface-elevated)/0.5] ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
