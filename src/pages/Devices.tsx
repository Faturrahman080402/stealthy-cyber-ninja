
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Radio, Laptop, Smartphone, Server, Wifi, Shield, AlertCircle, Eye, MoreVertical, Power, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

// Mock data for connected devices
const DEVICES = [
  {
    id: 'dev-001',
    name: 'Workstation Alpha',
    type: 'laptop',
    ip: '192.168.1.101',
    status: 'online',
    os: 'Windows 10',
    lastSeen: '2 minutes ago',
    vulnerabilities: 0,
    cpu: 23,
    ram: 42,
    storage: 56
  },
  {
    id: 'dev-002',
    name: 'Mobile Test Device',
    type: 'smartphone',
    ip: '192.168.1.102',
    status: 'online',
    os: 'Android 12',
    lastSeen: 'Just now',
    vulnerabilities: 2,
    cpu: 15,
    ram: 38,
    storage: 72
  },
  {
    id: 'dev-003',
    name: 'Network Server',
    type: 'server',
    ip: '192.168.1.5',
    status: 'online',
    os: 'Ubuntu 22.04',
    lastSeen: '5 minutes ago',
    vulnerabilities: 0,
    cpu: 67,
    ram: 58,
    storage: 43
  },
  {
    id: 'dev-004',
    name: 'Gateway Router',
    type: 'router',
    ip: '192.168.1.1',
    status: 'online',
    os: 'Custom Firmware',
    lastSeen: '1 minute ago',
    vulnerabilities: 1,
    cpu: 32,
    ram: 45,
    storage: 28
  },
  {
    id: 'dev-005',
    name: 'Developer Laptop',
    type: 'laptop',
    ip: '192.168.1.110',
    status: 'offline',
    os: 'macOS',
    lastSeen: '3 hours ago',
    vulnerabilities: 0,
    cpu: 0,
    ram: 0,
    storage: 65
  }
];

const Devices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [devices, setDevices] = useState(DEVICES);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter devices based on search and active tab
  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          device.ip.includes(searchTerm);
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'online') return matchesSearch && device.status === 'online';
    if (activeTab === 'offline') return matchesSearch && device.status === 'offline';
    if (activeTab === 'vulnerable') return matchesSearch && device.vulnerabilities > 0;
    
    return matchesSearch;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate refreshing device data
    setTimeout(() => {
      toast({
        title: "Devices refreshed",
        description: `Found ${devices.length} devices on the network.`,
      });
      setIsRefreshing(false);
    }, 1500);
  };

  const handleConnect = (deviceId: string) => {
    toast({
      title: "Connection established",
      description: `Successfully connected to device ${deviceId}.`,
    });
  };

  const handleMonitor = (deviceId: string) => {
    toast({
      title: "Monitoring initiated",
      description: `Now monitoring device ${deviceId}.`,
    });
  };

  const renderDeviceIcon = (type: string) => {
    switch (type) {
      case 'laptop':
        return <Laptop className="h-10 w-10 text-cyberBlue-400" />;
      case 'smartphone':
        return <Smartphone className="h-10 w-10 text-cyberBlue-400" />;
      case 'server':
        return <Server className="h-10 w-10 text-cyberBlue-400" />;
      case 'router':
        return <Wifi className="h-10 w-10 text-cyberBlue-400" />;
      default:
        return <Radio className="h-10 w-10 text-cyberBlue-400" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6 animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-2 py-1 bg-cyberBlue-500/10 text-cyberBlue-400 rounded text-xs font-medium mb-2">
              Device Management
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Connected Devices</h1>
            <p className="text-muted-foreground mt-1">Monitor and manage connected devices on your network</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="gap-1"
            >
              <RefreshCw size={16} className={`${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button size="sm" className="gap-1">
              <Radio size={16} /> Scan Network
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid gap-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <Card className="cyber-card p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Devices</p>
                <h3 className="text-2xl font-bold mt-1">{devices.length}</h3>
              </div>
              <div className="w-10 h-10 rounded-md bg-cyberBlue-500/10 flex items-center justify-center">
                <Radio className="h-5 w-5 text-cyberBlue-400" />
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              <span className="text-cyberGreen-400">+2</span> devices since last scan
            </div>
          </Card>
          
          <Card className="cyber-card p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Online Devices</p>
                <h3 className="text-2xl font-bold mt-1">{devices.filter(d => d.status === 'online').length}</h3>
              </div>
              <div className="w-10 h-10 rounded-md bg-cyberGreen-500/10 flex items-center justify-center">
                <Power className="h-5 w-5 text-cyberGreen-400" />
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              {Math.round((devices.filter(d => d.status === 'online').length / devices.length) * 100)}% of total devices
            </div>
          </Card>
          
          <Card className="cyber-card p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vulnerable Devices</p>
                <h3 className="text-2xl font-bold mt-1">{devices.filter(d => d.vulnerabilities > 0).length}</h3>
              </div>
              <div className="w-10 h-10 rounded-md bg-red-500/10 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              <span className="text-red-400">Attention required</span>
            </div>
          </Card>
          
          <Card className="cyber-card p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Protected Devices</p>
                <h3 className="text-2xl font-bold mt-1">{devices.filter(d => d.vulnerabilities === 0).length}</h3>
              </div>
              <div className="w-10 h-10 rounded-md bg-cyberGreen-500/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-cyberGreen-400" />
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              <span className="text-cyberGreen-400">Secured</span> and monitored
            </div>
          </Card>
        </div>
        
        {/* Device List */}
        <div className="cyber-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border">
            <div className="w-full md:w-64">
              <Input
                placeholder="Search devices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="grid grid-cols-4 w-full md:w-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="online">Online</TabsTrigger>
                <TabsTrigger value="offline">Offline</TabsTrigger>
                <TabsTrigger value="vulnerable">Vulnerable</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {filteredDevices.length === 0 ? (
            <div className="p-8 text-center">
              <Radio className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-medium text-lg">No devices found</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Try changing your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredDevices.map(device => (
                <div key={device.id} className="p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-secondary rounded-md flex-shrink-0">
                        {renderDeviceIcon(device.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{device.name}</h3>
                          <Badge variant={device.status === 'online' ? 'success' : 'secondary'} className="ml-1">
                            {device.status}
                          </Badge>
                          {device.vulnerabilities > 0 && (
                            <Badge variant="destructive" className="ml-1">
                              {device.vulnerabilities} vulnerabilities
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1 space-y-1">
                          <p>IP: {device.ip} • {device.os}</p>
                          <p>Last seen: {device.lastSeen}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleConnect(device.id)}
                        disabled={device.status !== 'online'}
                      >
                        Connect
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => handleMonitor(device.id)}
                        disabled={device.status !== 'online'}
                      >
                        <Eye size={16} className="mr-1" /> Monitor
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Device</DropdownMenuItem>
                          <DropdownMenuItem>Security Scan</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Remove Device</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  {device.status === 'online' && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>CPU</span>
                          <span>{device.cpu}%</span>
                        </div>
                        <Progress value={device.cpu} className="h-1" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>RAM</span>
                          <span>{device.ram}%</span>
                        </div>
                        <Progress value={device.ram} className="h-1" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Storage</span>
                          <span>{device.storage}%</span>
                        </div>
                        <Progress value={device.storage} className="h-1" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Devices;
