
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { AlertTriangle, Camera, Clock, Eye, Monitor, ReceiptText, Server, Shield, Signal, SignalHigh, Smartphone, Wifi } from 'lucide-react';
import QuickAction from '@/components/dashboard/QuickAction';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Monitoring = () => {
  const [systemLoad, setSystemLoad] = useState(68);
  const [activeTab, setActiveTab] = useState("devices");

  // This would be fetched from an API in a real application
  const connectedDevices = [
    { id: 1, name: "Desktop-LT742", type: "Computer", status: "Online", lastSeen: "Just now", ip: "192.168.1.5" },
    { id: 2, name: "Android-SM42", type: "Mobile", status: "Online", lastSeen: "2 mins ago", ip: "192.168.1.12" },
    { id: 3, name: "iOS-iPhone13", type: "Mobile", status: "Offline", lastSeen: "3 hours ago", ip: "192.168.1.15" },
    { id: 4, name: "Laptop-HP8932", type: "Computer", status: "Online", lastSeen: "5 mins ago", ip: "192.168.1.8" },
  ];

  const recentAlerts = [
    { id: 1, type: "Warning", device: "Desktop-LT742", message: "Unusual login attempt detected", time: "10 minutes ago" },
    { id: 2, type: "Critical", device: "Android-SM42", message: "Unauthorized camera access", time: "30 minutes ago" },
    { id: 3, type: "Info", device: "Network", message: "New device connected to network", time: "1 hour ago" },
  ];

  // This simulates taking a snapshot from a device
  const captureSnapshot = (deviceId: number) => {
    console.log(`Capturing snapshot from device ${deviceId}`);
    // In a real application, this would trigger an API call to capture and send the image
    alert(`Snapshot requested from device ${deviceId}. In a real system, this would be sent to your Telegram.`);
  };

  return (
    <DashboardLayout>
      <div className="mb-6 animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-2 py-1 bg-cyberBlue-500/10 text-cyberBlue-400 rounded text-xs font-medium mb-2">
              Security Monitoring
            </div>
            <h1 className="text-2xl font-bold tracking-tight">System Monitoring</h1>
            <p className="text-muted-foreground mt-1">Monitor system activity and security status</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Clock className="h-4 w-4 mr-2" />
              History
            </Button>
            <Button size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Security Scan
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <CardDescription>Real-time system performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">System Load</span>
                <span className="text-sm font-medium">{systemLoad}%</span>
              </div>
              <Progress value={systemLoad} className="h-2" />
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Memory Usage</span>
                  <span className="text-sm font-medium">4.2GB / 8GB</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Network Traffic</span>
                  <span className="text-sm font-medium">1.8 MB/s</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">CPU Temperature</span>
                  <span className="text-sm font-medium">62°C</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Uptime</span>
                  <span className="text-sm font-medium">5d 12h 37m</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Network Overview</CardTitle>
            <CardDescription>Connected devices and traffic</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Network Status</span>
                </div>
                <span className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded-full">Active</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Connected Devices</span>
                  <span className="text-sm font-medium">12 devices</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Connection</span>
                  <span className="text-sm font-medium">1 Gbps (Fiber)</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Download</span>
                  <span className="text-sm font-medium">85.6 Mbps</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Upload</span>
                  <span className="text-sm font-medium">42.3 Mbps</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Security Status</CardTitle>
            <CardDescription>System protection overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Firewall Status</span>
                </div>
                <span className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded-full">Protected</span>
              </div>
              
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-muted-foreground">Last scan completed</span>
                  <span className="text-xs font-medium">2 hours ago</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-muted-foreground">Threats detected</span>
                  <span className="text-xs font-medium">0 threats</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">System updates</span>
                  <span className="text-xs font-medium">Up to date</span>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-2">
                Run Security Scan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="devices">Connected Devices</TabsTrigger>
            <TabsTrigger value="alerts">Recent Alerts</TabsTrigger>
            <TabsTrigger value="logs">Activity Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="devices" className="space-y-4">
            <div className="rounded-md border">
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">Monitored Devices</h3>
                <p className="text-sm text-muted-foreground">All devices currently being monitored by the system.</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-t bg-muted/50">
                      <th className="p-3 text-left text-xs font-medium text-muted-foreground">DEVICE</th>
                      <th className="p-3 text-left text-xs font-medium text-muted-foreground">TYPE</th>
                      <th className="p-3 text-left text-xs font-medium text-muted-foreground">STATUS</th>
                      <th className="p-3 text-left text-xs font-medium text-muted-foreground">IP ADDRESS</th>
                      <th className="p-3 text-left text-xs font-medium text-muted-foreground">LAST SEEN</th>
                      <th className="p-3 text-left text-xs font-medium text-muted-foreground">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {connectedDevices.map((device) => (
                      <tr key={device.id} className="border-t">
                        <td className="p-3 text-sm">
                          <div className="flex items-center gap-2">
                            {device.type === "Computer" ? 
                              <Monitor className="h-4 w-4 text-muted-foreground" /> : 
                              <Smartphone className="h-4 w-4 text-muted-foreground" />
                            }
                            {device.name}
                          </div>
                        </td>
                        <td className="p-3 text-sm">{device.type}</td>
                        <td className="p-3 text-sm">
                          {device.status === "Online" ? (
                            <span className="inline-flex items-center gap-1">
                              <SignalHigh className="h-3 w-3 text-green-500" />
                              <span>Online</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1">
                              <Signal className="h-3 w-3 text-gray-400" />
                              <span>Offline</span>
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-sm">{device.ip}</td>
                        <td className="p-3 text-sm">{device.lastSeen}</td>
                        <td className="p-3 text-sm">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => captureSnapshot(device.id)} disabled={device.status !== "Online"}>
                              <Camera className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <ReceiptText className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuLabel>Device Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Monitor Activity</DropdownMenuItem>
                                <DropdownMenuItem>View Logs</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem disabled={device.status !== "Online"}>
                                  Remote Access
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="alerts">
            <div className="rounded-md border">
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">Security Alerts</h3>
                <p className="text-sm text-muted-foreground">Recent security events and notifications.</p>
              </div>
              
              <div className="overflow-hidden">
                <div className="space-y-1">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 p-3 hover:bg-muted/50 border-t">
                      <div className={`p-1.5 rounded-full ${alert.type === "Critical" ? "bg-red-500/10" : alert.type === "Warning" ? "bg-amber-500/10" : "bg-blue-500/10"}`}>
                        <AlertTriangle className={`h-4 w-4 ${alert.type === "Critical" ? "text-red-500" : alert.type === "Warning" ? "text-amber-500" : "text-blue-500"}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">{alert.message}</p>
                          <span className="text-xs text-muted-foreground">{alert.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Device: {alert.device}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="logs">
            <div className="rounded-md border">
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">System Activity Logs</h3>
                <p className="text-sm text-muted-foreground">Chronological record of system events and activities.</p>
              </div>
              
              <div className="p-4 text-center text-muted-foreground">
                <Server className="h-10 w-10 mx-auto mb-3 opacity-60" />
                <p>Detailed logs will be displayed here.</p>
                <p className="text-sm mt-1">You can also view the full logs page for more information.</p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link to="/logs">View Detailed Logs</Link>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <QuickAction 
          icon={<Eye />}
          title="Live Monitoring"
          description="Real-time system monitoring"
        />
        <QuickAction 
          icon={<Camera />}
          title="Screenshot Capture"
          description="Capture device screens remotely"
        />
        <QuickAction 
          icon={<Shield />}
          title="Security Scan"
          description="Scan for vulnerabilities"
        />
        <QuickAction 
          icon={<Server />}
          title="System Logs"
          description="View detailed system logs"
          to="/logs"
        />
      </div>
    </DashboardLayout>
  );
};

export default Monitoring;
