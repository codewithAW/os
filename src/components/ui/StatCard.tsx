import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: 'blue' | 'green' | 'amber' | 'red';
  className?: string;
}

const colorClasses = {
  blue: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  green: 'text-green-400 bg-green-500/10 border-green-500/30',
  amber: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  red: 'text-red-400 bg-red-500/10 border-red-500/30',
};

export function StatCard({
  label,
  value,
  icon,
  trend,
  trendValue,
  color = 'blue',
  className = '',
}: StatCardProps) {
  return (
    <div
      className={`
        p-6 rounded-lg
        bg-slate-800 border border-slate-700
        transition-interactive hover:bg-slate-750
        ${className}
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-400 mb-1">{label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-white">{value}</p>
            {trend && trendValue && (
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  trend === 'up'
                    ? 'text-green-400'
                    : trend === 'down'
                      ? 'text-red-400'
                      : 'text-slate-400'
                }`}
              >
                {trend === 'up' && '↑'}
                {trend === 'down' && '↓'}
                {trendValue}
              </div>
            )}
          </div>
        </div>
        {icon && (
          <div
            className={`
              w-12 h-12 rounded-lg
              flex items-center justify-center
              ${colorClasses[color]}
              border
              flex-shrink-0
            `}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;
