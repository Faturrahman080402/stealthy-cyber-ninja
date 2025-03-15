
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  Settings as SettingsIcon, User, Shield, Bell, Lock, 
  Database, Monitor, Send, Globe, Laptop, Save, 
  RefreshCw, Clock, Sliders, Eye, EyeOff, Moon, Sun
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

const Settings = () => {
  const [theme, setTheme] = useState('dark');
  const [session, setSession] = useState({
    expires: '2 hours',
    lastActive: '5 minutes ago',
    ip: '192.168.1.45',
    location: 'Local Network'
  });
  
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    requirePasswordChange: 90, // days
    alertOnNewLogin: true,
    passwordStrength: 'strong'
  });
  
  const [notifications, setNotifications] = useState({
    securityAlerts: true,
    deviceStatus: true,
    systemUpdates: true,
    loginAttempts: true
  });
  
  const [user, setUser] = useState({
    username: 'admin',
    email: 'admin@cybershield.io',
    role: 'Security Analyst'
  });
  
  const [telegramSettings, setTelegramSettings] = useState({
    enabled: true,
    botToken: '7850775302:AAFGuJNqWMHF4BuifoExEEpiHmpHsuuyOjg',
    chatId: '-1001234567890'
  });
  
  const [systemSettings, setSystemSettings] = useState({
    scanInterval: 15, // minutes
    logRetention: 30, // days
    autoUpdate: true,
    debugMode: false
  });

  const saveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully",
    });
  };

  const handleToggleSetting = (category, setting) => {
    switch(category) {
      case 'notifications':
        setNotifications({
          ...notifications,
          [setting]: !notifications[setting]
        });
        break;
      case 'security':
        setSecurity({
          ...security,
          [setting]: !security[setting]
        });
        break;
      case 'telegram':
        setTelegramSettings({
          ...telegramSettings,
          [setting]: !telegramSettings[setting]
        });
        break;
      case 'system':
        setSystemSettings({
          ...systemSettings,
          [setting]: !systemSettings[setting]
        });
        break;
    }
    
    toast({
      title: "Setting updated",
      description: `${setting} has been ${eval(`${category}.${setting}`) ? 'disabled' : 'enabled'}`,
    });
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    toast({
      title: "Theme changed",
      description: `Theme set to ${theme === 'dark' ? 'light' : 'dark'} mode`,
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-6 animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-2 py-1 bg-cyberBlue-500/10 text-cyberBlue-400 rounded text-xs font-medium mb-2">
              Configuration
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your account and system settings</p>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="gap-1" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              <span className="hidden sm:inline">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </Button>
            <Button size="sm" onClick={saveSettings} className="gap-1">
              <Save size={16} />
              <span className="hidden sm:inline">Save Changes</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="cyber-card overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <Tabs defaultValue="account" className="w-full">
          <div className="border-b border-border">
            <div className="px-4 py-2">
              <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                <TabsTrigger value="account" className="gap-1.5">
                  <User size={16} />
                  <span className="hidden sm:inline">Account</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="gap-1.5">
                  <Shield size={16} />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="gap-1.5">
                  <Bell size={16} />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="telegram" className="gap-1.5">
                  <Send size={16} />
                  <span className="hidden sm:inline">Telegram</span>
                </TabsTrigger>
                <TabsTrigger value="display" className="gap-1.5">
                  <Monitor size={16} />
                  <span className="hidden sm:inline">Display</span>
                </TabsTrigger>
                <TabsTrigger value="system" className="gap-1.5">
                  <Database size={16} />
                  <span className="hidden sm:inline">System</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          <div className="p-4">
            {/* Account Settings */}
            <TabsContent value="account" className="space-y-6 mt-0">
              <div>
                <h3 className="text-lg font-medium mb-4">Account Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Username</label>
                    <Input 
                      value={user.username} 
                      onChange={(e) => setUser({...user, username: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Email</label>
                    <Input 
                      type="email"
                      value={user.email} 
                      onChange={(e) => setUser({...user, email: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Role</label>
                    <Input 
                      value={user.role} 
                      readOnly
                      className="mt-1 bg-secondary/50"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Session Information</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <span className="text-sm">Session Expires</span>
                    <span className="text-sm">{session.expires}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <span className="text-sm">Last Active</span>
                    <span className="text-sm">{session.lastActive}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <span className="text-sm">IP Address</span>
                    <span className="text-sm font-mono">{session.ip}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Location</span>
                    <span className="text-sm">{session.location}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-end">
                  <Button variant="outline" size="sm" className="gap-1">
                    <RefreshCw size={14} />
                    Renew Session
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Security Settings */}
            <TabsContent value="security" className="space-y-6 mt-0">
              <div>
                <h3 className="text-lg font-medium mb-4">Security Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Two-Factor Authentication</p>
                      <p className="text-xs text-muted-foreground">Enable two-factor authentication for your account</p>
                    </div>
                    <div 
                      className={cn(
                        "w-11 h-6 rounded-full relative cursor-pointer transition-colors",
                        security.twoFactorAuth ? "bg-cyberGreen-500" : "bg-muted"
                      )}
                      onClick={() => handleToggleSetting('security', 'twoFactorAuth')}
                    >
                      <div 
                        className={cn(
                          "absolute top-1 left-1 w-4 h-4 rounded-full bg-background transition-transform",
                          security.twoFactorAuth && "translate-x-5"
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Alert on New Login</p>
                      <p className="text-xs text-muted-foreground">Receive alerts when your account is accessed from a new device</p>
                    </div>
                    <div 
                      className={cn(
                        "w-11 h-6 rounded-full relative cursor-pointer transition-colors",
                        security.alertOnNewLogin ? "bg-cyberGreen-500" : "bg-muted"
                      )}
                      onClick={() => handleToggleSetting('security', 'alertOnNewLogin')}
                    >
                      <div 
                        className={cn(
                          "absolute top-1 left-1 w-4 h-4 rounded-full bg-background transition-transform",
                          security.alertOnNewLogin && "translate-x-5"
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-border">
                    <p className="text-sm font-medium mb-2">Password Strength</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            security.passwordStrength === 'weak' ? "w-1/3 bg-red-500" :
                            security.passwordStrength === 'medium' ? "w-2/3 bg-amber-500" :
                            "w-full bg-cyberGreen-500"
                          )}
                        />
                      </div>
                      <span className="text-xs font-medium capitalize">{security.passwordStrength}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Password Change Requirement</p>
                    <div className="flex items-center gap-2">
                      <Input 
                        type="number" 
                        value={security.requirePasswordChange}
                        onChange={(e) => setSecurity({...security, requirePasswordChange: parseInt(e.target.value)})}
                        min={0}
                        className="w-20"
                      />
                      <span className="text-sm">days</span>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="outline" className="gap-1 w-full">
                      <Lock size={16} />
                      Change Password
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Notification Settings */}
            <TabsContent value="notifications" className="space-y-6 mt-0">
              <div>
                <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Security Alerts</p>
                      <p className="text-xs text-muted-foreground">Receive notifications for security incidents</p>
                    </div>
                    <div 
                      className={cn(
                        "w-11 h-6 rounded-full relative cursor-pointer transition-colors",
                        notifications.securityAlerts ? "bg-cyberGreen-500" : "bg-muted"
                      )}
                      onClick={() => handleToggleSetting('notifications', 'securityAlerts')}
                    >
                      <div 
                        className={cn(
                          "absolute top-1 left-1 w-4 h-4 rounded-full bg-background transition-transform",
                          notifications.securityAlerts && "translate-x-5"
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Device Status Changes</p>
                      <p className="text-xs text-muted-foreground">Receive notifications when devices connect or disconnect</p>
                    </div>
                    <div 
                      className={cn(
                        "w-11 h-6 rounded-full relative cursor-pointer transition-colors",
                        notifications.deviceStatus ? "bg-cyberGreen-500" : "bg-muted"
                      )}
                      onClick={() => handleToggleSetting('notifications', 'deviceStatus')}
                    >
                      <div 
                        className={cn(
                          "absolute top-1 left-1 w-4 h-4 rounded-full bg-background transition-transform",
                          notifications.deviceStatus && "translate-x-5"
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">System Updates</p>
                      <p className="text-xs text-muted-foreground">Receive notifications about system updates</p>
                    </div>
                    <div 
                      className={cn(
                        "w-11 h-6 rounded-full relative cursor-pointer transition-colors",
                        notifications.systemUpdates ? "bg-cyberGreen-500" : "bg-muted"
                      )}
                      onClick={() => handleToggleSetting('notifications', 'systemUpdates')}
                    >
                      <div 
                        className={cn(
                          "absolute top-1 left-1 w-4 h-4 rounded-full bg-background transition-transform",
                          notifications.systemUpdates && "translate-x-5"
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Login Attempts</p>
                      <p className="text-xs text-muted-foreground">Receive notifications about login attempts</p>
                    </div>
                    <div 
                      className={cn(
                        "w-11 h-6 rounded-full relative cursor-pointer transition-colors",
                        notifications.loginAttempts ? "bg-cyberGreen-500" : "bg-muted"
                      )}
                      onClick={() => handleToggleSetting('notifications', 'loginAttempts')}
                    >
                      <div 
                        className={cn(
                          "absolute top-1 left-1 w-4 h-4 rounded-full bg-background transition-transform",
                          notifications.loginAttempts && "translate-x-5"
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Telegram Settings */}
            <TabsContent value="telegram" className="space-y-6 mt-0">
              <div>
                <h3 className="text-lg font-medium mb-4">Telegram Integration</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Enable Telegram Integration</p>
                      <p className="text-xs text-muted-foreground">Connect the system to your Telegram bot</p>
                    </div>
                    <div 
                      className={cn(
                        "w-11 h-6 rounded-full relative cursor-pointer transition-colors",
                        telegramSettings.enabled ? "bg-cyberGreen-500" : "bg-muted"
                      )}
                      onClick={() => handleToggleSetting('telegram', 'enabled')}
                    >
                      <div 
                        className={cn(
                          "absolute top-1 left-1 w-4 h-4 rounded-full bg-background transition-transform",
                          telegramSettings.enabled && "translate-x-5"
                        )}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Bot Token</label>
                    <Input 
                      value={telegramSettings.botToken} 
                      onChange={(e) => setTelegramSettings({...telegramSettings, botToken: e.target.value})}
                      className="mt-1 font-mono"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Chat ID</label>
                    <Input 
                      value={telegramSettings.chatId} 
                      onChange={(e) => setTelegramSettings({...telegramSettings, chatId: e.target.value})}
                      className="mt-1 font-mono"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      variant="default" 
                      className="gap-1 w-full"
                      disabled={!telegramSettings.enabled}
                    >
                      <Send size={16} />
                      Test Connection
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Display Settings */}
            <TabsContent value="display" className="space-y-6 mt-0">
              <div>
                <h3 className="text-lg font-medium mb-4">Display Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Dark Mode</p>
                      <p className="text-xs text-muted-foreground">Enable dark theme for the interface</p>
                    </div>
                    <div 
                      className={cn(
                        "w-11 h-6 rounded-full relative cursor-pointer transition-colors",
                        theme === 'dark' ? "bg-cyberGreen-500" : "bg-muted"
                      )}
                      onClick={toggleTheme}
                    >
                      <div 
                        className={cn(
                          "absolute top-1 left-1 w-4 h-4 rounded-full bg-background transition-transform",
                          theme === 'dark' && "translate-x-5"
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-border">
                    <p className="text-sm font-medium mb-2">Dashboard Layout</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        className={cn(
                          "gap-1 justify-start h-auto py-2",
                          true && "border-cyberBlue-500"
                        )}
                      >
                        <Laptop size={16} />
                        <span>Standard</span>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="gap-1 justify-start h-auto py-2"
                      >
                        <Laptop size={16} />
                        <span>Compact</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* System Settings */}
            <TabsContent value="system" className="space-y-6 mt-0">
              <div>
                <h3 className="text-lg font-medium mb-4">System Configuration</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">System Scan Interval</p>
                    <div className="flex items-center gap-2">
                      <Input 
                        type="number" 
                        value={systemSettings.scanInterval}
                        onChange={(e) => setSystemSettings({...systemSettings, scanInterval: parseInt(e.target.value)})}
                        min={1}
                        className="w-20"
                      />
                      <span className="text-sm">minutes</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Log Retention Period</p>
                    <div className="flex items-center gap-2">
                      <Input 
                        type="number" 
                        value={systemSettings.logRetention}
                        onChange={(e) => setSystemSettings({...systemSettings, logRetention: parseInt(e.target.value)})}
                        min={1}
                        className="w-20"
                      />
                      <span className="text-sm">days</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Automatic Updates</p>
                      <p className="text-xs text-muted-foreground">Allow the system to update automatically</p>
                    </div>
                    <div 
                      className={cn(
                        "w-11 h-6 rounded-full relative cursor-pointer transition-colors",
                        systemSettings.autoUpdate ? "bg-cyberGreen-500" : "bg-muted"
                      )}
                      onClick={() => handleToggleSetting('system', 'autoUpdate')}
                    >
                      <div 
                        className={cn(
                          "absolute top-1 left-1 w-4 h-4 rounded-full bg-background transition-transform",
                          systemSettings.autoUpdate && "translate-x-5"
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Debug Mode</p>
                      <p className="text-xs text-muted-foreground">Enable detailed logging for troubleshooting</p>
                    </div>
                    <div 
                      className={cn(
                        "w-11 h-6 rounded-full relative cursor-pointer transition-colors",
                        systemSettings.debugMode ? "bg-cyberGreen-500" : "bg-muted"
                      )}
                      onClick={() => handleToggleSetting('system', 'debugMode')}
                    >
                      <div 
                        className={cn(
                          "absolute top-1 left-1 w-4 h-4 rounded-full bg-background transition-transform",
                          systemSettings.debugMode && "translate-x-5"
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
