import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Eye, RefreshCw, AlertTriangle, ArrowRight, Cpu, Activity, Radio, Shield, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = [
  { time: '00:00', cpu: 32, memory: 40, network: 25 },
  { time: '01:00', cpu: 28, memory: 42, network: 18 },
  { time: '02:00', cpu: 25, memory: 38, network: 15 },
  { time: '03:00', cpu: 35, memory: 40, network: 28 },
  { time: '04:00', cpu: 40, memory: 45, network: 30 },
  { time: '05:00', cpu: 45, memory: 48, network: 35 },
  { time: '06:00', cpu: 55, memory: 52, network: 40 },
  { time: '07:00', cpu: 62, memory: 58, network: 45 },
  { time: '08:00', cpu: 70, memory: 62, network: 50 },
  { time: '09:00', cpu: 75, memory: 65, network: 55 },
  { time: '10:00', cpu: 68, memory: 60, network: 48 },
  { time: '11:00', cpu: 62, memory: 58, network: 42 },
  { time: '12:00', cpu: 60, memory: 55, network: 40 },
];

const systemStatus = [
  { name: 'Firewall', status: 'active', health: 98 },
  { name: 'Intrusion Detection', status: 'active', health: 95 },
  { name: 'Malware Scanner', status: 'active', health: 100 },
  { name: 'VPN Service', status: 'active', health: 92 },
  { name: 'Backup Service', status: 'warning', health: 76 },
  { name: 'Update Service', status: 'active', health: 88 },
];

const recentAlerts = [
  { id: 1, type: 'warning', message: 'Unusual login attempt detected', time: '10 minutes ago' },
  { id: 2, type: 'info', message: 'System update available', time: '25 minutes ago' },
  { id: 3, type: 'error', message: 'Failed backup detected', time: '1 hour ago' },
  { id: 4, type: 'warning', message: 'High CPU usage detected', time: '2 hours ago' },
];

const Monitoring = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <DashboardLayout>
      <div className="mb-6 animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-2 py-1 bg-cyberBlue-500/10 text-cyberBlue-400 rounded text-xs font-medium mb-2">
              System Monitoring
            </div>
            <h1 className="text-2xl font-bold tracking-tight">System Status</h1>
            <p className="text-muted-foreground mt-1">Monitor system performance and security status</p>
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
              <Eye size={16} /> Live View
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="animate-fade-in-up">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cyber-card p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">CPU Usage</p>
                  <h3 className="text-2xl font-bold mt-1">42%</h3>
                </div>
                <div className="w-10 h-10 rounded-md bg-cyberBlue-500/10 flex items-center justify-center">
                  <Cpu className="h-5 w-5 text-cyberBlue-400" />
                </div>
              </div>
              <Progress value={42} className="mt-4 h-1" />
              <div className="mt-2 text-xs text-muted-foreground">
                <span className="text-cyberGreen-400">Normal</span> - 8 cores active
              </div>
            </Card>
            
            <Card className="cyber-card p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Memory Usage</p>
                  <h3 className="text-2xl font-bold mt-1">58%</h3>
                </div>
                <div className="w-10 h-10 rounded-md bg-cyberBlue-500/10 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-cyberBlue-400" />
                </div>
              </div>
              <Progress value={58} className="mt-4 h-1" />
              <div className="mt-2 text-xs text-muted-foreground">
                <span className="text-cyberGreen-400">Normal</span> - 8.2 GB / 16 GB
              </div>
            </Card>
            
            <Card className="cyber-card p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Network</p>
                  <h3 className="text-2xl font-bold mt-1">12 Mbps</h3>
                </div>
                <div className="w-10 h-10 rounded-md bg-cyberBlue-500/10 flex items-center justify-center">
                  <Radio className="h-5 w-5 text-cyberBlue-400" />
                </div>
              </div>
              <Progress value={25} className="mt-4 h-1" />
              <div className="mt-2 text-xs text-muted-foreground">
                <span className="text-cyberGreen-400">Normal</span> - 25% of capacity
              </div>
            </Card>
          </div>
          
          {/* Performance Chart */}
          <Card className="cyber-card p-4">
            <h3 className="text-lg font-medium mb-4">System Performance (Last 12 Hours)</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorNetwork" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="monotone" dataKey="cpu" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCpu)" />
                  <Area type="monotone" dataKey="memory" stroke="#10b981" fillOpacity={1} fill="url(#colorMemory)" />
                  <Area type="monotone" dataKey="network" stroke="#6366f1" fillOpacity={1} fill="url(#colorNetwork)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          {/* Recent Alerts */}
          <Card className="cyber-card">
            <div className="p-4 border-b border-border">
              <h3 className="text-lg font-medium">Recent Alerts</h3>
            </div>
            <div className="divide-y divide-border">
              {recentAlerts.map(alert => (
                <div key={alert.id} className="p-4 flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    alert.type === 'error' ? 'bg-red-500/10' : 
                    alert.type === 'warning' ? 'bg-amber-500/10' : 'bg-blue-500/10'
                  }`}>
                    <AlertTriangle className={`h-4 w-4 ${
                      alert.type === 'error' ? 'text-red-500' : 
                      alert.type === 'warning' ? 'text-amber-500' : 'text-blue-500'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/alerts">
                      <span className="flex items-center gap-1">
                        View <ArrowRight size={14} />
                      </span>
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border">
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link to="/alerts">View All Alerts</Link>
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-6">
          <Card className="cyber-card p-4">
            <h3 className="text-lg font-medium mb-4">CPU Performance</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorCpuDetailed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="monotone" dataKey="cpu" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCpuDetailed)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="p-3 bg-secondary rounded-md">
                <p className="text-xs text-muted-foreground">Current</p>
                <p className="text-lg font-medium">42%</p>
              </div>
              <div className="p-3 bg-secondary rounded-md">
                <p className="text-xs text-muted-foreground">Average</p>
                <p className="text-lg font-medium">38%</p>
              </div>
              <div className="p-3 bg-secondary rounded-md">
                <p className="text-xs text-muted-foreground">Peak</p>
                <p className="text-lg font-medium">75%</p>
              </div>
              <div className="p-3 bg-secondary rounded-md">
                <p className="text-xs text-muted-foreground">Processes</p>
                <p className="text-lg font-medium">124</p>
              </div>
            </div>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="cyber-card p-4">
              <h3 className="text-lg font-medium mb-4">Memory Usage</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorMemoryDetailed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="memory" stroke="#10b981" fillOpacity={1} fill="url(#colorMemoryDetailed)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-3 bg-secondary rounded-md">
                  <p className="text-xs text-muted-foreground">Used</p>
                  <p className="text-lg font-medium">8.2 GB</p>
                </div>
                <div className="p-3 bg-secondary rounded-md">
                  <p className="text-xs text-muted-foreground">Available</p>
                  <p className="text-lg font-medium">7.8 GB</p>
                </div>
              </div>
            </Card>
            
            <Card className="cyber-card p-4">
              <h3 className="text-lg font-medium mb-4">Network Activity</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorNetworkDetailed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="network" stroke="#6366f1" fillOpacity={1} fill="url(#colorNetworkDetailed)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-3 bg-secondary rounded-md">
                  <p className="text-xs text-muted-foreground">Download</p>
                  <p className="text-lg font-medium">8.5 Mbps</p>
                </div>
                <div className="p-3 bg-secondary rounded-md">
                  <p className="text-xs text-muted-foreground">Upload</p>
                  <p className="text-lg font-medium">3.5 Mbps</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cyber-card p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Security Status</p>
                  <h3 className="text-2xl font-bold mt-1">Protected</h3>
                </div>
                <div className="w-10 h-10 rounded-md bg-cyberGreen-500/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-cyberGreen-400" />
                </div>
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                <span className="text-cyberGreen-400">All systems operational</span>
              </div>
            </Card>
            
            <Card className="cyber-card p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Threats Blocked</p>
                  <h3 className="text-2xl font-bold mt-1">142</h3>
                </div>
                <div className="w-10 h-10 rounded-md bg-cyberBlue-500/10 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-cyberBlue-400" />
                </div>
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                <span className="text-cyberBlue-400">+12 today</span>
              </div>
            </Card>
            
            <Card className="cyber-card p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Scan</p>
                  <h3 className="text-2xl font-bold mt-1">2h ago</h3>
                </div>
                <div className="w-10 h-10 rounded-md bg-cyberBlue-500/10 flex items-center justify-center">
                  <Search className="h-5 w-5 text-cyberBlue-400" />
                </div>
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                <span className="text-cyberGreen-400">No threats found</span>
              </div>
            </Card>
          </div>
          
          <Card className="cyber-card">
            <div className="p-4 border-b border-border">
              <h3 className="text-lg font-medium">Security Systems Status</h3>
            </div>
            <div className="divide-y divide-border">
              {systemStatus.map((system, index) => (
                <div key={index} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      system.status === 'active' ? 'bg-cyberGreen-500/10' : 
                      system.status === 'warning' ? 'bg-amber-500/10' : 'bg-red-500/10'
                    }`}>
                      <Shield className={`h-4 w-4 ${
                        system.status === 'active' ? 'text-cyberGreen-400' : 
                        system.status === 'warning' ? 'text-amber-500' : 'text-red-500'
                      }`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{system.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{system.status}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Health</span>
                        <span>{system.health}%</span>
                      </div>
                      <Progress value={system.health} className="h-1" />
                    </div>
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="cyber-card p-4">
            <h3 className="text-lg font-medium mb-4">Security Recommendations</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-amber-500/5 border border-amber-500/20 rounded-md">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Update backup configuration</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your backup service is reporting issues. Consider updating your backup configuration to ensure data safety.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Fix Issue
                  </Button>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-blue-500/5 border border-blue-500/20 rounded-md">
                <Shield className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">System update available</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    A new security update is available for your system. Keeping your system updated helps protect against vulnerabilities.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Update Now
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Monitoring;
