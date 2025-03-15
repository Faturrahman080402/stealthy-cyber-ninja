
import React, { useState, useEffect } from 'react';
import { Clock, User, AlertTriangle, CheckCircle, Info, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityLogProps {
  className?: string;
  limit?: number;
}

interface ActivityEntry {
  id: number;
  timestamp: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  source: string;
}

const ActivityLog: React.FC<ActivityLogProps> = ({ className, limit = 6 }) => {
  const [logs, setLogs] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLogs([
        {
          id: 1,
          timestamp: '2 min ago',
          type: 'info',
          message: 'System scan initiated',
          source: 'System'
        },
        {
          id: 2,
          timestamp: '15 min ago',
          type: 'success',
          message: 'Device "Workstation Alpha" connected',
          source: 'Devices'
        },
        {
          id: 3,
          timestamp: '43 min ago',
          type: 'warning',
          message: 'Unusual login attempt detected',
          source: 'Security'
        },
        {
          id: 4,
          timestamp: '1 hour ago',
          type: 'error',
          message: 'Connection to "Dev Laptop" lost',
          source: 'Devices'
        },
        {
          id: 5,
          timestamp: '3 hours ago',
          type: 'info',
          message: 'System updates available',
          source: 'Updates'
        },
        {
          id: 6,
          timestamp: '5 hours ago',
          type: 'success',
          message: 'Security scan completed: No threats found',
          source: 'Security'
        },
        {
          id: 7,
          timestamp: '6 hours ago',
          type: 'info',
          message: 'New device "Test Mobile" registered',
          source: 'Devices'
        }
      ]);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className={cn("cyber-card p-4 h-[300px] flex items-center justify-center", className)}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-t-transparent border-cyberBlue-500 rounded-full animate-spin"></div>
          <p className="text-sm text-muted-foreground">Loading activity logs...</p>
        </div>
      </div>
    );
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info size={16} className="text-cyberBlue-400" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-yellow-400" />;
      case 'error':
        return <XCircle size={16} className="text-red-400" />;
      case 'success':
        return <CheckCircle size={16} className="text-green-400" />;
      default:
        return <Info size={16} className="text-cyberBlue-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'info':
        return 'bg-cyberBlue-500/10 text-cyberBlue-400 border-cyberBlue-500/20';
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'error':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'success':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const filteredLogs = filter === 'all' 
    ? logs 
    : logs.filter(log => log.type === filter);

  return (
    <div className={cn("cyber-card", className)}>
      <div className="border-b border-border px-4 py-3 flex items-center justify-between">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Clock size={16} className="text-cyberBlue-400" />
          Activity Log
        </h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <Search size={12} className="text-muted-foreground" />
            </div>
            <input 
              type="text" 
              placeholder="Search logs..."
              className="py-1 pl-7 pr-2 text-xs bg-secondary border border-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-cyberBlue-500 focus:border-cyberBlue-500 w-[120px]"
            />
          </div>
          <select 
            className="py-1 px-2 text-xs bg-secondary border border-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-cyberBlue-500 focus:border-cyberBlue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="info">Info</option>
            <option value="warning">Warnings</option>
            <option value="error">Errors</option>
            <option value="success">Success</option>
          </select>
        </div>
      </div>
      
      <div className="p-2 overflow-hidden">
        {filteredLogs.length > 0 ? (
          <div className="space-y-2 max-h-[270px] overflow-y-auto pr-2">
            {filteredLogs.slice(0, limit).map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-secondary/50 transition-colors">
                <div className={cn("mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0", getTypeColor(log.type))}>
                  {getTypeIcon(log.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-tight">{log.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {log.timestamp}
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-secondary/80">
                      {log.source}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[200px] flex items-center justify-center">
            <p className="text-sm text-muted-foreground">No logs found</p>
          </div>
        )}
      </div>
      
      {filteredLogs.length > limit && (
        <div className="px-4 py-2 border-t border-border text-center">
          <button className="text-xs text-cyberBlue-400 hover:underline">
            View All Logs
          </button>
        </div>
      )}
    </div>
  );
};

// Additional icon component
const XCircle = ({ size = 24, className }: { size?: number, className?: string }) => (
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
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
);

export default ActivityLog;
