
import React, { useState, useEffect } from 'react';
import { Monitor, Camera, Mic, HardDrive, Cpu, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DeviceMonitorProps {
  className?: string;
}

interface DeviceStatus {
  id: number;
  name: string;
  type: 'desktop' | 'laptop' | 'mobile';
  status: 'online' | 'offline' | 'connected';
  lastSeen: string;
  ip: string;
  resources: {
    cpu: number;
    memory: number;
    disk: number;
  };
}

const DeviceMonitor: React.FC<DeviceMonitorProps> = ({ className }) => {
  const [devices, setDevices] = useState<DeviceStatus[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<DeviceStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setDevices([
        {
          id: 1,
          name: 'Workstation Alpha',
          type: 'desktop',
          status: 'online',
          lastSeen: 'Just now',
          ip: '192.168.1.101',
          resources: {
            cpu: 32,
            memory: 45,
            disk: 65
          }
        },
        {
          id: 2,
          name: 'Dev Laptop',
          type: 'laptop',
          status: 'offline',
          lastSeen: '2 hours ago',
          ip: '192.168.1.155',
          resources: {
            cpu: 0,
            memory: 0,
            disk: 78
          }
        },
        {
          id: 3,
          name: 'Test Mobile',
          type: 'mobile',
          status: 'connected',
          lastSeen: '5 minutes ago',
          ip: '192.168.1.203',
          resources: {
            cpu: 48,
            memory: 36,
            disk: 22
          }
        }
      ]);
      setSelectedDevice({
        id: 1,
        name: 'Workstation Alpha',
        type: 'desktop',
        status: 'online',
        lastSeen: 'Just now',
        ip: '192.168.1.101',
        resources: {
          cpu: 32,
          memory: 45,
          disk: 65
        }
      });
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className={cn("cyber-card p-4 h-[400px] flex items-center justify-center", className)}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-t-transparent border-cyberBlue-500 rounded-full animate-spin"></div>
          <p className="text-sm text-muted-foreground">Loading devices...</p>
        </div>
      </div>
    );
  }

  const selectDevice = (device: DeviceStatus) => {
    setSelectedDevice(device);
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'desktop':
        return <Monitor size={16} />;
      case 'laptop':
        return <Laptop size={16} />;
      case 'mobile':
        return <Smartphone size={16} />;
      default:
        return <Monitor size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-cyberGreen-400';
      case 'offline':
        return 'text-gray-400';
      case 'connected':
        return 'text-cyberBlue-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className={cn("cyber-card", className)}>
      <div className="border-b border-border px-4 py-3 flex items-center justify-between">
        <h3 className="text-sm font-medium">Device Monitor</h3>
        <span className="text-xs px-2 py-1 bg-cyberBlue-500/10 text-cyberBlue-400 rounded">
          {devices.filter(d => d.status !== 'offline').length} Active
        </span>
      </div>
      
      <div className="grid md:grid-cols-3 grid-cols-1 h-[350px]">
        {/* Device list */}
        <div className="border-r border-border overflow-y-auto col-span-1">
          {devices.map((device) => (
            <div 
              key={device.id}
              onClick={() => selectDevice(device)}
              className={cn(
                "p-3 border-b border-border flex items-center gap-3 cursor-pointer group transition-colors",
                selectedDevice?.id === device.id ? "bg-cyberBlue-500/5" : "hover:bg-secondary"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                device.status === 'online' ? "bg-cyberGreen-500/10" :
                device.status === 'connected' ? "bg-cyberBlue-500/10" : "bg-gray-500/10"
              )}>
                {getDeviceIcon(device.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{device.name}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className={cn("h-1.5 w-1.5 rounded-full", getStatusColor(device.status))}></span>
                  <span>{device.status}</span>
                  <span className="text-secondary-foreground">•</span>
                  <span>{device.ip}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Device details */}
        <div className="col-span-2 p-4 flex flex-col">
          {selectedDevice ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    selectedDevice.status === 'online' ? "bg-cyberGreen-500/10" :
                    selectedDevice.status === 'connected' ? "bg-cyberBlue-500/10" : "bg-gray-500/10"
                  )}>
                    {getDeviceIcon(selectedDevice.type)}
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedDevice.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className={cn("h-1.5 w-1.5 rounded-full", getStatusColor(selectedDevice.status))}></span>
                      <span className="capitalize">{selectedDevice.status}</span>
                      <span>• Last seen: {selectedDevice.lastSeen}</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs bg-secondary px-2 py-1 rounded">{selectedDevice.ip}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mb-4">
                <ResourceCard 
                  title="CPU" 
                  value={selectedDevice.resources.cpu} 
                  icon={<Cpu size={16} />}
                  color="cyberBlue"
                />
                <ResourceCard 
                  title="Memory" 
                  value={selectedDevice.resources.memory} 
                  icon={<Ram size={16} />}
                  color="cyberGreen"
                />
                <ResourceCard 
                  title="Disk" 
                  value={selectedDevice.resources.disk} 
                  icon={<HardDrive size={16} />}
                  color="purple"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <ActionButton 
                  label="Capture Camera" 
                  icon={<Camera size={16} />}
                  disabled={selectedDevice.status === 'offline'}
                  variant="primary"
                />
                <ActionButton 
                  label="Capture Audio"
                  icon={<Mic size={16} />}
                  disabled={selectedDevice.status === 'offline'}
                  variant="secondary"
                />
              </div>
              
              <div className="mt-auto">
                <div className="border-t border-border -mx-4 px-4 pt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Device ID: {selectedDevice.id}</span>
                  <button className="text-xs text-cyberBlue-400 hover:underline">
                    View Full Details
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground text-sm">Select a device to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface ResourceCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'cyberBlue' | 'cyberGreen' | 'purple';
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, value, icon, color }) => {
  const colorClass = 
    color === 'cyberBlue' ? 'bg-cyberBlue-500/10 text-cyberBlue-400' :
    color === 'cyberGreen' ? 'bg-cyberGreen-500/10 text-cyberGreen-400' :
    'bg-purple-500/10 text-purple-400';
    
  const progressColor = 
    color === 'cyberBlue' ? 'bg-cyberBlue-500' :
    color === 'cyberGreen' ? 'bg-cyberGreen-500' :
    'bg-purple-500';
  
  return (
    <div className="cyber-card p-3">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${colorClass}`}>
          {icon}
        </div>
        <span className="text-xs font-medium">{title}</span>
        <span className="ml-auto text-xs font-mono">{value}%</span>
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${progressColor}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

interface ActionButtonProps {
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
  variant: 'primary' | 'secondary';
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, icon, disabled = false, variant }) => {
  const baseClasses = "px-3 py-2 rounded-md text-xs font-medium flex items-center gap-2 transition-colors";
  const variants = {
    primary: "bg-cyberBlue-500 hover:bg-cyberBlue-600 text-white disabled:bg-cyberBlue-500/50 disabled:text-white/50",
    secondary: "bg-secondary hover:bg-secondary/80 text-foreground disabled:bg-secondary/50 disabled:text-foreground/50"
  };
  
  return (
    <button 
      className={cn(baseClasses, variants[variant])}
      disabled={disabled}
    >
      {icon}
      {label}
    </button>
  );
};

// Additional custom components for device icons
const Laptop = ({ size = 24, className }: { size?: number, className?: string }) => (
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
    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"></path>
  </svg>
);

const Ram = ({ size = 24, className }: { size?: number, className?: string }) => (
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
    <path d="M6 19v-3"></path>
    <path d="M10 19v-3"></path>
    <path d="M14 19v-3"></path>
    <path d="M18 19v-3"></path>
    <path d="M8 11V9"></path>
    <path d="M16 11V9"></path>
    <path d="M12 11V9"></path>
    <path d="M2 15h20"></path>
    <path d="M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"></path>
  </svg>
);

export default DeviceMonitor;
