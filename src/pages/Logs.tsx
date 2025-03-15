
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { AlertCircle, ArrowDownUp, Clock, Download, FileText, Filter, Search, Server } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

const Logs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [logTypeFilter, setLogTypeFilter] = useState('all');

  // Sample log data - In a real application, this would come from an API
  const systemLogs = [
    { id: 1, timestamp: '2023-06-15 14:32:47', type: 'info', message: 'System scan completed successfully', source: 'Security Scanner' },
    { id: 2, timestamp: '2023-06-15 13:15:22', type: 'warning', message: 'High memory usage detected (87%)', source: 'System Monitor' },
    { id: 3, timestamp: '2023-06-15 12:05:33', type: 'error', message: 'Failed to connect to device DESKTOP-A25F', source: 'Device Manager' },
    { id: 4, timestamp: '2023-06-15 11:47:10', type: 'info', message: 'User authentication successful', source: 'Auth Service' },
    { id: 5, timestamp: '2023-06-15 10:22:55', type: 'info', message: 'Backup completed for all devices', source: 'Backup Service' },
    { id: 6, timestamp: '2023-06-15 09:34:12', type: 'warning', message: 'Network traffic spike detected', source: 'Network Monitor' },
    { id: 7, timestamp: '2023-06-15 08:19:45', type: 'error', message: 'Connection timeout for device MOBILE-C17', source: 'Connection Manager' },
    { id: 8, timestamp: '2023-06-14 23:45:37', type: 'info', message: 'System update check completed', source: 'Update Service' },
    { id: 9, timestamp: '2023-06-14 22:30:18', type: 'warning', message: 'Multiple failed login attempts detected', source: 'Auth Service' },
    { id: 10, timestamp: '2023-06-14 20:15:29', type: 'info', message: 'Daily security report generated', source: 'Reporting Service' }
  ];

  const securityLogs = [
    { id: 1, timestamp: '2023-06-15 15:43:22', type: 'critical', message: 'Unauthorized access attempt blocked (IP: 203.45.78.21)', source: 'Firewall' },
    { id: 2, timestamp: '2023-06-15 14:28:13', type: 'warning', message: 'Unusual login pattern detected from user admin', source: 'Auth Monitor' },
    { id: 3, timestamp: '2023-06-15 12:15:40', type: 'info', message: 'SSH key rotation completed successfully', source: 'Key Manager' },
    { id: 4, timestamp: '2023-06-15 10:37:55', type: 'warning', message: 'Certificate expiration in 7 days for domain example.com', source: 'Certificate Manager' },
    { id: 5, timestamp: '2023-06-15 08:22:18', type: 'critical', message: 'Malware detected in file system.exe.tmp', source: 'Antivirus' }
  ];

  // Filter logs based on search query and type
  const filteredSystemLogs = systemLogs.filter(log => {
    const matchesQuery = searchQuery === '' || 
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) || 
      log.source.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = logTypeFilter === 'all' || log.type === logTypeFilter;
    
    return matchesQuery && matchesType;
  });

  const getLogTypeBadge = (type: string) => {
    switch(type) {
      case 'info':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">Info</Badge>;
      case 'warning':
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">Warning</Badge>;
      case 'error':
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">Error</Badge>;
      case 'critical':
        return <Badge variant="outline" className="bg-red-700/10 text-red-700 border-red-700/20">Critical</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6 animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-2 py-1 bg-cyberBlue-500/10 text-cyberBlue-400 rounded text-xs font-medium mb-2">
              System Logs
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Activity Logs</h1>
            <p className="text-muted-foreground mt-1">View detailed system and security logs</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Clock className="h-4 w-4 mr-2" />
              History
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="default" size="sm">
              <ArrowDownUp className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Log Summary</CardTitle>
            <CardDescription>Last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Total Logs</span>
                <span className="text-2xl font-medium">247</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">System Events</span>
                <span className="text-2xl font-medium">164</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Warnings</span>
                <span className="text-2xl font-medium text-amber-500">56</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Errors</span>
                <span className="text-2xl font-medium text-red-500">27</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
            <CardDescription>Active issues requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Unauthorized access attempt</p>
                  <p className="text-xs text-muted-foreground">3 attempts from IP 203.45.78.21</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Certificate expiring soon</p>
                  <p className="text-xs text-muted-foreground">example.com (7 days remaining)</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-2">
                View All Alerts
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
            <CardDescription>Currently monitored</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="space-y-1">
                  <div className="text-sm font-medium">Active Monitoring</div>
                  <div className="text-xs text-muted-foreground">12 devices connected</div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/monitoring">
                    View
                  </Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center justify-center p-2 rounded-md bg-card border border-border">
                  <Server className="h-5 w-5 mb-1 text-muted-foreground" />
                  <span className="text-xs text-center">Servers</span>
                  <span className="text-sm font-medium">3</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 rounded-md bg-card border border-border">
                  <FileText className="h-5 w-5 mb-1 text-muted-foreground" />
                  <span className="text-xs text-center">Workstations</span>
                  <span className="text-sm font-medium">5</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 rounded-md bg-card border border-border">
                  <FileText className="h-5 w-5 mb-1 text-muted-foreground" />
                  <span className="text-xs text-center">Mobile</span>
                  <span className="text-sm font-medium">4</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <Tabs defaultValue="system">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="system">System Logs</TabsTrigger>
              <TabsTrigger value="security">Security Logs</TabsTrigger>
              <TabsTrigger value="network">Network Logs</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search logs..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={logTypeFilter} onValueChange={setLogTypeFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <TabsContent value="system">
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-3 text-left text-xs font-medium text-muted-foreground w-44">TIMESTAMP</th>
                      <th className="p-3 text-left text-xs font-medium text-muted-foreground w-28">TYPE</th>
                      <th className="p-3 text-left text-xs font-medium text-muted-foreground">MESSAGE</th>
                      <th className="p-3 text-left text-xs font-medium text-muted-foreground w-40">SOURCE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSystemLogs.length > 0 ? (
                      filteredSystemLogs.map((log) => (
                        <tr key={log.id} className="border-b hover:bg-muted/50">
                          <td className="p-3 text-sm whitespace-nowrap">{log.timestamp}</td>
                          <td className="p-3">{getLogTypeBadge(log.type)}</td>
                          <td className="p-3 text-sm">{log.message}</td>
                          <td className="p-3 text-sm text-muted-foreground">{log.source}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="p-6 text-center text-muted-foreground">
                          No logs found matching your criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="flex items-center justify-between p-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>{filteredSystemLogs.length}</strong> of <strong>{systemLogs.length}</strong> logs
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security">
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-3 text-left text-xs font-medium text-muted-foreground w-44">TIMESTAMP</th>
                      <th className="p-3 text-left text-xs font-medium text-muted-foreground w-28">TYPE</th>
                      <th className="p-3 text-left text-xs font-medium text-muted-foreground">MESSAGE</th>
                      <th className="p-3 text-left text-xs font-medium text-muted-foreground w-40">SOURCE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {securityLogs.map((log) => (
                      <tr key={log.id} className="border-b hover:bg-muted/50">
                        <td className="p-3 text-sm whitespace-nowrap">{log.timestamp}</td>
                        <td className="p-3">{getLogTypeBadge(log.type)}</td>
                        <td className="p-3 text-sm">{log.message}</td>
                        <td className="p-3 text-sm text-muted-foreground">{log.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex items-center justify-between p-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>{securityLogs.length}</strong> logs
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="network">
            <div className="rounded-md border p-8 text-center">
              <Server className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-60" />
              <h3 className="text-lg font-medium mb-1">Network Logs</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-4">
                Detailed network traffic logs and connection events will be displayed here.
              </p>
              <Button variant="outline">Configure Network Logging</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Logs;
