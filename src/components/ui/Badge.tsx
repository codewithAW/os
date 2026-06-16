import { ReactNode } from 'react';

type BadgeColor = 'blue' | 'green' | 'amber' | 'red' | 'slate';

interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
  variant?: 'solid' | 'outline';
  className?: string;
}

const colorClasses: Record<BadgeColor, Record<string, string>> = {
  blue: {
    solid: 'bg-blue-500 text-white',
    outline: 'bg-blue-500/10 text-blue-300 border border-blue-400/50',
  },
  green: {
    solid: 'bg-green-600 text-white',
    outline: 'bg-green-500/10 text-green-300 border border-green-400/50',
  },
  amber: {
    solid: 'bg-amber-600 text-white',
    outline: 'bg-amber-500/10 text-amber-300 border border-amber-400/50',
  },
  red: {
    solid: 'bg-red-600 text-white',
    outline: 'bg-red-500/10 text-red-300 border border-red-400/50',
  },
  slate: {
    solid: 'bg-slate-700 text-slate-100',
    outline: 'bg-slate-500/10 text-slate-300 border border-slate-400/50',
  },
};

export function Badge({
  children,
  color = 'blue',
  variant = 'solid',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1
        px-2 py-1 rounded-full
        text-xs font-semibold
        ${colorClasses[color][variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

export default Badge;
