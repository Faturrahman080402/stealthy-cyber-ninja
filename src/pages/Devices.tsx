
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Radio, Smartphone, Laptop, Server, 
  Filter, RefreshCw, Plus, MoreVertical, Eye, Lock, Power
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const Devices = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  
  const devices = [
    { 
      id: 'dev-001', 
      name: 'Windows Workstation', 
      ip: '192.168.1.101', 
      type: 'desktop', 
      os: 'Windows 11', 
      status: 'online',
      lastSeen: '3 minutes ago',
      cpu: '32%',
      memory: '48%',
      disk: '62%'
    },
    { 
      id: 'dev-002', 
      name: 'Ubuntu Server', 
      ip: '192.168.1.200', 
      type: 'server', 
      os: 'Ubuntu 22.04', 
      status: 'online',
      lastSeen: '1 minute ago',
      cpu: '56%',
      memory: '72%',
      disk: '38%'
    },
    { 
      id: 'dev-003', 
      name: 'Android Phone', 
      ip: '192.168.1.115', 
      type: 'mobile', 
      os: 'Android 14', 
      status: 'online',
      lastSeen: 'Just now',
      cpu: '23%',
      memory: '45%',
      disk: '51%'
    },
    { 
      id: 'dev-004', 
      name: 'MacBook Pro', 
      ip: '192.168.1.135', 
      type: 'laptop', 
      os: 'macOS Ventura', 
      status: 'offline',
      lastSeen: '3 hours ago',
      cpu: '0%',
      memory: '0%',
      disk: '67%'
    },
    { 
      id: 'dev-005', 
      name: 'Linux Server', 
      ip: '192.168.1.201', 
      type: 'server', 
      os: 'CentOS 8', 
      status: 'offline',
      lastSeen: '1 day ago',
      cpu: '0%',
      memory: '0%',
      disk: '43%'
    },
    { 
      id: 'dev-006', 
      name: 'iPhone 15', 
      ip: '192.168.1.120', 
      type: 'mobile', 
      os: 'iOS 17', 
      status: 'online',
      lastSeen: '5 minutes ago',
      cpu: '18%',
      memory: '39%',
      disk: '42%'
    }
  ];
  
  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'desktop':
        return <Laptop className="w-5 h-5" />;
      case 'server':
        return <Server className="w-5 h-5" />;
      case 'mobile':
        return <Smartphone className="w-5 h-5" />;
      case 'laptop':
        return <Laptop className="w-5 h-5" />;
      default:
        return <Radio className="w-5 h-5" />;
    }
  };
  
  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        device.ip.includes(searchQuery) ||
                        device.os.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus ? device.status === filterStatus : true;
    const matchesType = filterType ? device.type === filterType : true;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  const deviceTypes = [...new Set(devices.map(device => device.type))];
  
  return (
    <DashboardLayout>
      <div className="mb-6 animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-2 py-1 bg-cyberBlue-500/10 text-cyberBlue-400 rounded text-xs font-medium mb-2">
              Asset Management
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Managed Devices</h1>
            <p className="text-muted-foreground mt-1">View and manage all connected devices</p>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="gap-1">
              <RefreshCw size={16} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button size="sm" className="gap-1">
              <Plus size={16} />
              <span className="hidden sm:inline">Add Device</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="cyber-card p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Devices</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold">{devices.length}</h3>
            <Radio className="h-5 w-5 text-cyberBlue-400" />
          </div>
        </div>
        
        <div className="cyber-card p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Online Devices</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold">{devices.filter(d => d.status === 'online').length}</h3>
            <Badge variant="default" className="bg-cyberGreen-500 hover:bg-cyberGreen-600">Active</Badge>
          </div>
        </div>
        
        <div className="cyber-card p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Offline Devices</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold">{devices.filter(d => d.status === 'offline').length}</h3>
            <Badge variant="secondary">Inactive</Badge>
          </div>
        </div>
      </div>
      
      <div className="cyber-card p-4 mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search by name, IP, OS..." 
              className="pl-9" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Button variant="outline" className="gap-1" onClick={() => setFilterStatus(null)}>
                <Filter size={16} />
                <span>Status</span>
              </Button>
              <div className="absolute top-full right-0 mt-1 bg-sidebar border border-border rounded-md shadow-lg z-10 w-36 p-1" hidden={true}>
                <button 
                  className="w-full text-left px-3 py-1.5 text-sm rounded-sm hover:bg-secondary"
                  onClick={() => setFilterStatus('online')}
                >
                  Online
                </button>
                <button 
                  className="w-full text-left px-3 py-1.5 text-sm rounded-sm hover:bg-secondary"
                  onClick={() => setFilterStatus('offline')}
                >
                  Offline
                </button>
                <button 
                  className="w-full text-left px-3 py-1.5 text-sm rounded-sm hover:bg-secondary"
                  onClick={() => setFilterStatus(null)}
                >
                  All
                </button>
              </div>
            </div>
            
            <div className="relative">
              <Button variant="outline" className="gap-1" onClick={() => setFilterType(null)}>
                <Filter size={16} />
                <span>Type</span>
              </Button>
              <div className="absolute top-full right-0 mt-1 bg-sidebar border border-border rounded-md shadow-lg z-10 w-36 p-1" hidden={true}>
                {deviceTypes.map(type => (
                  <button 
                    key={type}
                    className="w-full text-left px-3 py-1.5 text-sm rounded-sm hover:bg-secondary flex items-center gap-2"
                    onClick={() => setFilterType(type)}
                  >
                    {getDeviceIcon(type)}
                    <span className="capitalize">{type}</span>
                  </button>
                ))}
                <button 
                  className="w-full text-left px-3 py-1.5 text-sm rounded-sm hover:bg-secondary"
                  onClick={() => setFilterType(null)}
                >
                  All Types
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDevices.length > 0 ? (
            filteredDevices.map(device => (
              <div key={device.id} className="border border-border rounded-lg overflow-hidden hover:border-cyberBlue-500/50 transition-colors">
                <div className="flex items-center justify-between p-3 bg-sidebar/50">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      device.status === 'online' ? "bg-cyberGreen-500/10" : "bg-muted"
                    )}>
                      {getDeviceIcon(device.type)}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{device.name}</h3>
                      <p className="text-xs text-muted-foreground">{device.ip}</p>
                    </div>
                  </div>
                  <Badge variant={device.status === 'online' ? "default" : "secondary"} className={device.status === 'online' ? "bg-cyberGreen-500 hover:bg-cyberGreen-600" : ""}>
                    {device.status === 'online' ? 'Online' : 'Offline'}
                  </Badge>
                </div>
                
                <div className="p-3">
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Type</p>
                      <p className="text-sm capitalize">{device.type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">OS</p>
                      <p className="text-sm">{device.os}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Last Seen</p>
                      <p className="text-sm">{device.lastSeen}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">CPU Usage</p>
                      <p className="text-sm">{device.cpu}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between gap-2">
                    <Button size="sm" variant="outline" asChild className="flex-1 gap-1 h-8">
                      <Link to={`/devices/${device.id}`}>
                        <Eye size={14} />
                        <span>View</span>
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 gap-1 h-8">
                      <Lock size={14} />
                      <span>Access</span>
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <Power size={14} />
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <MoreVertical size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-8 text-center">
              <p className="text-muted-foreground">No devices found matching the current filters.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Devices;
