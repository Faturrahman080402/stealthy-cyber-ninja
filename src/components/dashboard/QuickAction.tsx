
import React from 'react';
import { cn } from '@/lib/utils';

interface QuickActionProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
}

const QuickAction: React.FC<QuickActionProps> = ({ 
  title, 
  description,
  icon, 
  onClick,
  variant = 'default',
  className 
}) => {
  const variantStyles = {
    default: "bg-card hover:bg-card/80",
    outline: "bg-transparent border border-border hover:bg-card/50",
    ghost: "bg-transparent hover:bg-card/50"
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "cyber-card flex items-center gap-3 p-3 transition-all duration-200 rounded-md hover:shadow-md w-full text-left", 
        variantStyles[variant],
        className
      )}
    >
      <div className="w-10 h-10 rounded-md bg-cyberBlue-500/10 flex items-center justify-center text-cyberBlue-400 flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-medium text-sm">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
    </button>
  );
};

export default QuickAction;
