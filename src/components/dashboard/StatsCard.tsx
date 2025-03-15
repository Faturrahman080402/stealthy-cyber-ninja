
import React from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string | number;
    trend: 'up' | 'down' | 'neutral';
  };
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon, 
  change,
  className 
}) => {
  return (
    <div className={cn("cyber-card p-4", className)}>
      <div className="flex items-center justify-between">
        <div>{icon}</div>
        {change && (
          <div className={cn(
            "text-xs px-1.5 py-0.5 rounded-full flex items-center gap-1",
            change.trend === 'up' ? "bg-green-500/10 text-green-400" :
            change.trend === 'down' ? "bg-red-500/10 text-red-400" :
            "bg-secondary text-muted-foreground"
          )}>
            {change.trend === 'up' && <TrendingUpIcon size={12} />}
            {change.trend === 'down' && <TrendingDownIcon size={12} />}
            {change.trend === 'neutral' && <TrendingFlatIcon size={12} />}
            <span>{change.value}</span>
          </div>
        )}
      </div>
      <div className="mt-2">
        <p className="text-xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};

// Trending icons
const TrendingUpIcon = ({ size = 24, className }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const TrendingDownIcon = ({ size = 24, className }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
    <polyline points="17 18 23 18 23 12"></polyline>
  </svg>
);

const TrendingFlatIcon = ({ size = 24, className }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 12L2 12"></path>
  </svg>
);

export default StatsCard;
