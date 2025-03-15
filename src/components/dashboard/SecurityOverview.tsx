
import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SecurityOverviewProps {
  className?: string;
}

interface SecurityStatus {
  overallScore: number;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  issues: {
    high: number;
    medium: number;
    low: number;
  };
  lastScan: string;
  securedDevices: number;
  totalDevices: number;
}

const SecurityOverview: React.FC<SecurityOverviewProps> = ({ className }) => {
  const [securityData, setSecurityData] = useState<SecurityStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setSecurityData({
        overallScore: 82,
        threatLevel: 'low',
        issues: {
          high: 0,
          medium: 2,
          low: 5
        },
        lastScan: '2 hours ago',
        securedDevices: 3,
        totalDevices: 3
      });
      setLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className={cn("cyber-card p-4 h-[220px] flex items-center justify-center", className)}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-t-transparent border-cyberBlue-500 rounded-full animate-spin"></div>
          <p className="text-sm text-muted-foreground">Analyzing security status...</p>
        </div>
      </div>
    );
  }

  if (!securityData) return null;

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'high':
        return 'text-orange-400';
      case 'critical':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className={cn("cyber-card", className)}>
      <div className="border-b border-border px-4 py-3 flex items-center justify-between">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Shield size={16} className="text-cyberBlue-400" />
          Security Overview
        </h3>
        <span className="text-xs text-muted-foreground">
          Last scan: {securityData.lastScan}
        </span>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Security Score */}
          <div className="cyber-card p-3 flex items-center gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={cn("text-xl font-bold", getScoreColor(securityData.overallScore))}>
                  {securityData.overallScore}
                </span>
              </div>
              <svg viewBox="0 0 36 36" className="w-16 h-16 transform -rotate-90">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="hsl(var(--secondary))"
                  strokeWidth="3"
                  strokeDasharray="100, 100"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={securityData.overallScore >= 80 ? '#34D399' : securityData.overallScore >= 60 ? '#FBBF24' : securityData.overallScore >= 40 ? '#FB923C' : '#F87171'}
                  strokeWidth="3"
                  strokeDasharray={`${securityData.overallScore}, 100`}
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Security Score</p>
              <p className="text-sm font-medium mt-1">
                {securityData.overallScore >= 80 ? 'Excellent' : 
                securityData.overallScore >= 60 ? 'Good' : 
                securityData.overallScore >= 40 ? 'Fair' : 'Poor'}
              </p>
            </div>
          </div>
          
          {/* Threat Level */}
          <div className="cyber-card p-3 flex items-center gap-4">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center",
              securityData.threatLevel === 'low' ? "bg-green-500/10" :
              securityData.threatLevel === 'medium' ? "bg-yellow-500/10" :
              securityData.threatLevel === 'high' ? "bg-orange-500/10" : "bg-red-500/10"
            )}>
              <AlertTriangle size={20} className={getThreatLevelColor(securityData.threatLevel)} />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Threat Level</p>
              <p className={cn("text-sm font-medium mt-1 capitalize", getThreatLevelColor(securityData.threatLevel))}>
                {securityData.threatLevel}
              </p>
            </div>
          </div>
          
          {/* Device Security */}
          <div className="cyber-card p-3 flex items-center gap-4">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center",
              securityData.securedDevices === securityData.totalDevices ? "bg-green-500/10" : "bg-yellow-500/10"
            )}>
              {securityData.securedDevices === securityData.totalDevices ? (
                <CheckCircle size={20} className="text-green-400" />
              ) : (
                <Info size={20} className="text-yellow-400" />
              )}
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Device Security</p>
              <p className="text-sm font-medium mt-1">
                {securityData.securedDevices} / {securityData.totalDevices} Secured
              </p>
            </div>
          </div>
        </div>
        
        {/* Issues Summary */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <IssueCounter 
            type="high" 
            count={securityData.issues.high} 
            color="red" 
          />
          <IssueCounter 
            type="medium" 
            count={securityData.issues.medium} 
            color="yellow" 
          />
          <IssueCounter 
            type="low" 
            count={securityData.issues.low} 
            color="blue" 
          />
        </div>
      </div>
    </div>
  );
};

interface IssueCounterProps {
  type: string;
  count: number;
  color: 'red' | 'yellow' | 'blue' | 'green';
}

const IssueCounter: React.FC<IssueCounterProps> = ({ type, count, color }) => {
  const colorClass = 
    color === 'red' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
    color === 'yellow' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
    color === 'blue' ? 'bg-cyberBlue-500/10 text-cyberBlue-400 border-cyberBlue-500/20' :
    'bg-green-500/10 text-green-400 border-green-500/20';
    
  return (
    <div className={cn('rounded-md border p-2 flex items-center justify-between', colorClass)}>
      <span className="text-xs font-medium capitalize">{type} Issues</span>
      <span className="text-xs font-mono font-bold">{count}</span>
    </div>
  );
};

export default SecurityOverview;
