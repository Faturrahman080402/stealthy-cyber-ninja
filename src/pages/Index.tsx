
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SecurityOverview from '@/components/dashboard/SecurityOverview';
import DeviceMonitor from '@/components/dashboard/DeviceMonitor';
import ActivityLog from '@/components/dashboard/ActivityLog';
import TelegramIntegration from '@/components/dashboard/TelegramIntegration';
import StatsCard from '@/components/dashboard/StatsCard';
import QuickAction from '@/components/dashboard/QuickAction';
import { 
  Shield, Eye, Radio, Activity, Bell, 
  Terminal, RefreshCcw, Camera, Mic, Database,
  Smartphone, Cpu, Wifi, Lock
} from 'lucide-react';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add animation delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Animation classes for staggered fade-in
  const getAnimationDelay = (index: number) => ({
    animationDelay: `${index * 0.1}s`
  });

  return (
    <DashboardLayout>
      <div className="mb-6 animate-fade-in-up" style={getAnimationDelay(0)}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-2 py-1 bg-cyberBlue-500/10 text-cyberBlue-400 rounded text-xs font-medium mb-2">
              Security Dashboard
            </div>
            <h1 className="text-2xl font-bold tracking-tight">System Overview</h1>
            <p className="text-muted-foreground mt-1">Monitor your security status and device connections</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm bg-secondary hover:bg-secondary/70 rounded-md transition-colors flex items-center gap-1.5">
              <RefreshCcw size={14} />
              Refresh
            </button>
            <button className="px-3 py-1.5 text-sm bg-cyberBlue-500 hover:bg-cyberBlue-600 text-white rounded-md transition-colors flex items-center gap-1.5">
              <Shield size={14} />
              Run Security Scan
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className={cn("animate-fade-in-up", isLoaded && "opacity-100")} style={getAnimationDelay(1)}>
          <StatsCard 
            title="Connected Devices" 
            value={2}
            icon={<Radio size={18} className="text-cyberBlue-400" />}
            change={{ value: "+1", trend: "up" }}
          />
        </div>
        <div className={cn("animate-fade-in-up", isLoaded && "opacity-100")} style={getAnimationDelay(2)}>
          <StatsCard 
            title="Security Threats" 
            value={0}
            icon={<Shield size={18} className="text-green-400" />}
            change={{ value: "0%", trend: "neutral" }}
          />
        </div>
        <div className={cn("animate-fade-in-up", isLoaded && "opacity-100")} style={getAnimationDelay(3)}>
          <StatsCard 
            title="System Performance" 
            value="94%"
            icon={<Activity size={18} className="text-purple-400" />}
            change={{ value: "+2%", trend: "up" }}
          />
        </div>
        <div className={cn("animate-fade-in-up", isLoaded && "opacity-100")} style={getAnimationDelay(4)}>
          <StatsCard 
            title="Alerts" 
            value={2}
            icon={<Bell size={18} className="text-yellow-400" />}
            change={{ value: "-1", trend: "down" }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className={cn("animate-fade-in-up", isLoaded && "opacity-100")} style={getAnimationDelay(5)}>
            <SecurityOverview />
          </div>
          <div className={cn("animate-fade-in-up", isLoaded && "opacity-100")} style={getAnimationDelay(6)}>
            <DeviceMonitor />
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          <div className={cn("animate-fade-in-up", isLoaded && "opacity-100")} style={getAnimationDelay(7)}>
            <div className="cyber-card p-4">
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Terminal size={16} className="text-cyberBlue-400" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <QuickAction 
                  title="Camera Snapshot" 
                  description="Capture from connected device"
                  icon={<Camera size={16} />}
                />
                <QuickAction 
                  title="Audio Capture" 
                  description="Record from device microphone"
                  icon={<Mic size={16} />}
                />
                <QuickAction 
                  title="Data Extraction" 
                  description="Retrieve target system data"
                  icon={<Database size={16} />}
                />
              </div>
            </div>
          </div>
          
          <div className={cn("animate-fade-in-up", isLoaded && "opacity-100")} style={getAnimationDelay(8)}>
            <TelegramIntegration />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={cn("animate-fade-in-up", isLoaded && "opacity-100")} style={getAnimationDelay(9)}>
        <ActivityLog />
      </div>
      
      {/* System Info Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={cn("animate-fade-in-up", isLoaded && "opacity-100")} style={getAnimationDelay(10)}>
          <SystemInfoCard 
            title="Network Status"
            status="Secure"
            icon={<Wifi size={20} />}
            statusColor="green"
          />
        </div>
        <div className={cn("animate-fade-in-up", isLoaded && "opacity-100")} style={getAnimationDelay(11)}>
          <SystemInfoCard 
            title="CPU Load"
            status="Normal"
            icon={<Cpu size={20} />}
            statusColor="blue"
            details="32% utilization"
          />
        </div>
        <div className={cn("animate-fade-in-up", isLoaded && "opacity-100")} style={getAnimationDelay(12)}>
          <SystemInfoCard 
            title="Security Protocol"
            status="Active"
            icon={<Lock size={20} />}
            statusColor="green"
            details="All systems protected"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

interface SystemInfoCardProps {
  title: string;
  status: string;
  icon: React.ReactNode;
  statusColor: 'green' | 'yellow' | 'red' | 'blue';
  details?: string;
}

const SystemInfoCard: React.FC<SystemInfoCardProps> = ({ 
  title, 
  status, 
  icon, 
  statusColor,
  details
}) => {
  const colorClass = 
    statusColor === 'green' ? 'text-green-400' :
    statusColor === 'yellow' ? 'text-yellow-400' :
    statusColor === 'red' ? 'text-red-400' :
    'text-cyberBlue-400';
    
  const bgColorClass = 
    statusColor === 'green' ? 'bg-green-500/10' :
    statusColor === 'yellow' ? 'bg-yellow-500/10' :
    statusColor === 'red' ? 'bg-red-500/10' :
    'bg-cyberBlue-500/10';
  
  return (
    <div className="cyber-card p-4 flex items-center gap-4">
      <div className={cn("w-10 h-10 rounded-md flex items-center justify-center", bgColorClass)}>
        <div className={colorClass}>{icon}</div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className={cn("font-medium", colorClass)}>{status}</p>
        {details && <p className="text-xs text-muted-foreground mt-0.5">{details}</p>}
      </div>
    </div>
  );
};

// Helper for conditional class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default Index;
