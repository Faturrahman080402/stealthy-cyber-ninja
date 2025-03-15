
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  Cpu, Database, Server, HardDrive, Loader2, RefreshCw,
  Download, UploadCloud, AlertCircle, CheckCircle2, Memory,
  NetworkIcon, Shield, Clock, Terminal, Cable
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';

const System = () => {
  const [lastUpdated, setLastUpdated] = useState('2 minutes ago');
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  
  const systemResources = {
    cpu: 32,
    memory: 48,
    disk: 62,
    network: 27
  };
  
  const systemServices = [
    { name: 'Database Service', status: 'running', uptime: '5 days, 12 hours' },
    { name: 'Web Server', status: 'running', uptime: '5 days, 12 hours' },
    { name: 'Monitoring Agent', status: 'running', uptime: '3 days, 4 hours' },
    { name: 'Security Scanner', status: 'running', uptime: '5 days, 12 hours' },
    { name: 'Backup Service', status: 'stopped', uptime: '0 minutes' },
    { name: 'API Gateway', status: 'running', uptime: '5 days, 11 hours' },
  ];
  
  const systemLogs = [
    { time: '10:25:13', level: 'info', message: 'System resources check completed' },
    { time: '10:15:02', level: 'warning', message: 'High CPU usage detected' },
    { time: '09:58:30', level: 'info', message: 'Backup schedule updated' },
    { time: '09:45:12', level: 'error', message: 'Failed to connect to update server' },
    { time: '09:30:45', level: 'info', message: 'User authentication successful' },
  ];
  
  const updateInformation = {
    currentVersion: '1.8.2',
    latestVersion: '1.9.0',
    releaseDate: '2023-08-15',
    updateAvailable: true,
    lastChecked: '1 hour ago'
  };

  const refreshSystemInfo = () => {
    setLoading(true);
    // Simulating a refresh
    setTimeout(() => {
      setLoading(false);
      setLastUpdated('Just now');
      toast({
        title: "System information refreshed",
        description: "All system metrics have been updated",
      });
    }, 1500);
  };

  const installUpdate = () => {
    setUpdating(true);
    // Simulating an update installation
    setTimeout(() => {
      setUpdating(false);
      toast({
        title: "Update installed",
        description: "System has been updated to version 1.9.0",
      });
    }, 3000);
  };

  const restartService = (serviceName) => {
    toast({
      title: "Service restarting",
      description: `${serviceName} is restarting. This may take a moment.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-6 animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-2 py-1 bg-cyberBlue-500/10 text-cyberBlue-400 rounded text-xs font-medium mb-2">
              System Management
            </div>
            <h1 className="text-2xl font-bold tracking-tight">System Configuration</h1>
            <p className="text-muted-foreground mt-1">Manage system resources and configuration</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="gap-1"
              onClick={refreshSystemInfo}
              disabled={loading}
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <RefreshCw size={16} />
              )}
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            
            <Button 
              size="sm" 
              className="gap-1"
              onClick={installUpdate}
              disabled={updating || !updateInformation.updateAvailable}
            >
              {updating ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Download size={16} />
              )}
              <span className="hidden sm:inline">Update System</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <SystemResourceCard
          title="CPU Usage"
          value={systemResources.cpu}
          icon={<Cpu className="w-5 h-5" />}
          chipColor="blue"
        />
        
        <SystemResourceCard
          title="Memory Usage"
          value={systemResources.memory}
          icon={<Memory className="w-5 h-5" />}
          chipColor="purple"
        />
        
        <SystemResourceCard
          title="Disk Space"
          value={systemResources.disk}
          icon={<HardDrive className="w-5 h-5" />}
          chipColor="amber"
        />
        
        <SystemResourceCard
          title="Network"
          value={systemResources.network}
          icon={<NetworkIcon className="w-5 h-5" />}
          chipColor="green"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* System Services */}
        <div className="md:col-span-2 cyber-card p-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="border-b border-border pb-3 mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Server size={16} className="text-cyberBlue-400" />
              System Services
            </h3>
            <div className="text-xs text-muted-foreground">
              Last updated: {lastUpdated}
            </div>
          </div>
          
          <div className="space-y-3">
            {systemServices.map((service, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 rounded-md bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    service.status === 'running' ? "bg-cyberGreen-500" : "bg-red-500"
                  )}></div>
                  <div>
                    <p className="text-sm font-medium">{service.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="capitalize">{service.status}</span>
                      {service.status === 'running' && (
                        <>
                          <span>•</span>
                          <span>Uptime: {service.uptime}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-7 px-2 text-xs"
                    onClick={() => restartService(service.name)}
                  >
                    Restart
                  </Button>
                  <Button 
                    size="sm" 
                    variant={service.status === 'running' ? "outline" : "default"} 
                    className={cn(
                      "h-7 px-2 text-xs",
                      service.status !== 'running' && "bg-cyberGreen-500 hover:bg-cyberGreen-600"
                    )}
                  >
                    {service.status === 'running' ? 'Stop' : 'Start'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* System Update */}
        <div className="cyber-card p-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="border-b border-border pb-3 mb-4">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <UploadCloud size={16} className="text-cyberBlue-400" />
              System Update
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Current Version</span>
              <span className="text-sm font-mono">{updateInformation.currentVersion}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Latest Version</span>
              <span className="text-sm font-mono">{updateInformation.latestVersion}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Release Date</span>
              <span className="text-sm">{updateInformation.releaseDate}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Last Checked</span>
              <span className="text-sm">{updateInformation.lastChecked}</span>
            </div>
            
            <div className="pt-2">
              {updateInformation.updateAvailable ? (
                <div className="p-3 rounded-md bg-cyberBlue-500/10 border border-cyberBlue-500/20 flex items-center gap-3">
                  <AlertCircle size={18} className="text-cyberBlue-400" />
                  <p className="text-sm">Update available. Install the latest version.</p>
                </div>
              ) : (
                <div className="p-3 rounded-md bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-green-400" />
                  <p className="text-sm">System is up to date.</p>
                </div>
              )}
            </div>
            
            <div className="pt-2 space-y-2">
              <Button 
                variant="outline" 
                className="w-full gap-1"
                onClick={refreshSystemInfo}
                disabled={loading}
              >
                <RefreshCw size={16} />
                Check for Updates
              </Button>
              
              <Button 
                variant="default" 
                className="w-full gap-1"
                onClick={installUpdate}
                disabled={updating || !updateInformation.updateAvailable}
              >
                {updating ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Download size={16} />
                )}
                Install Update
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* System Logs */}
      <div className="cyber-card p-4 mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <div className="border-b border-border pb-3 mb-4 flex items-center justify-between">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Terminal size={16} className="text-cyberBlue-400" />
            System Logs
          </h3>
          <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
            View All Logs
          </Button>
        </div>
        
        <div className="font-mono text-xs">
          {systemLogs.map((log, index) => (
            <div 
              key={index} 
              className={cn(
                "py-1.5 px-2 border-l-2 rounded",
                log.level === 'info' && "border-cyberBlue-400 bg-cyberBlue-500/5",
                log.level === 'warning' && "border-amber-400 bg-amber-500/5",
                log.level === 'error' && "border-red-400 bg-red-500/5",
              )}
            >
              <span className="text-muted-foreground">[{log.time}]</span>{' '}
              <span className={cn(
                log.level === 'info' && "text-cyberBlue-400",
                log.level === 'warning' && "text-amber-400",
                log.level === 'error' && "text-red-400",
              )}>
                {log.level.toUpperCase()}
              </span>{' '}
              <span>{log.message}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Database Configuration */}
      <div className="cyber-card p-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="border-b border-border pb-3 mb-4">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Database size={16} className="text-cyberBlue-400" />
            Database Configuration
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">Database Host</label>
              <Input className="mt-1" value="localhost" readOnly />
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground">Database Name</label>
              <Input className="mt-1" value="cybershield_db" readOnly />
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground">Database User</label>
              <Input className="mt-1" value="cybershield_user" readOnly />
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">Connection Status</label>
              <div className="mt-1 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyberGreen-500"></div>
                <span className="text-sm">Connected</span>
              </div>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground">Connection Pool</label>
              <div className="mt-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs">8/10 connections</span>
                  <span className="text-xs text-muted-foreground">80%</span>
                </div>
                <Progress value={80} className="h-1.5" />
              </div>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground">Last Backup</label>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-sm">2023-08-15 03:00 AM</span>
                <Badge variant="outline" className="text-xs">
                  Automated
                </Badge>
              </div>
            </div>
            
            <div className="pt-2">
              <Button variant="outline" size="sm" className="gap-1 w-full">
                <Shield size={14} />
                Run Database Maintenance
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Helper component for system resource cards
const SystemResourceCard = ({ title, value, icon, chipColor }) => {
  const getColorClasses = (color) => {
    switch (color) {
      case 'blue':
        return "bg-cyberBlue-500/10 text-cyberBlue-400";
      case 'green':
        return "bg-green-500/10 text-green-400";
      case 'amber':
        return "bg-amber-500/10 text-amber-400";
      case 'purple':
        return "bg-purple-500/10 text-purple-400";
      case 'red':
        return "bg-red-500/10 text-red-400";
      default:
        return "bg-cyberBlue-500/10 text-cyberBlue-400";
    }
  };
  
  return (
    <div className="cyber-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">{title}</h3>
        <div className={cn("p-1 rounded", getColorClasses(chipColor))}>
          {icon}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">{value}%</span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock size={12} />
            <span>Real-time</span>
          </div>
        </div>
        
        <Progress value={value} className={cn(
          "h-1.5",
          value > 80 ? "bg-red-500" :
          value > 60 ? "bg-amber-500" :
          "bg-cyberGreen-500"
        )} />
      </div>
    </div>
  );
};

export default System;
