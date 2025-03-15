
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TelegramIntegration from '@/components/dashboard/TelegramIntegration';
import { 
  Send, MessageSquare, Camera, Image, FileText, 
  Bell, Settings, RefreshCw, Info, Check, Copy, Shield
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

const Telegram = () => {
  const [botToken, setBotToken] = useState('7850775302:AAFGuJNqWMHF4BuifoExEEpiHmpHsuuyOjg');
  const [chatId, setChatId] = useState('-1001234567890');
  const [botConnected, setBotConnected] = useState(true);
  const [botSettings, setBotSettings] = useState({
    notifyOnDeviceConnect: true,
    notifyOnDeviceDisconnect: true,
    notifyOnSecurityEvent: true,
    allowCommandExecution: true,
    enableMediaSharing: true
  });

  // Message history
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'text', 
      content: 'System startup complete', 
      timestamp: '10:25 AM', 
      direction: 'outgoing' 
    },
    { 
      id: 2, 
      type: 'image', 
      content: 'Security scan results', 
      timestamp: '10:30 AM', 
      direction: 'outgoing' 
    },
    { 
      id: 3, 
      type: 'command', 
      content: '/status', 
      timestamp: '10:32 AM', 
      direction: 'incoming' 
    },
    { 
      id: 4, 
      type: 'text', 
      content: 'All systems operational. 4 devices online.', 
      timestamp: '10:32 AM', 
      direction: 'outgoing' 
    }
  ]);

  const copyToken = () => {
    navigator.clipboard.writeText(botToken);
    toast({
      title: "Bot token copied",
      description: "The bot token has been copied to clipboard",
    });
  };

  const handleToggleSetting = (setting) => {
    setBotSettings({
      ...botSettings,
      [setting]: !botSettings[setting]
    });
    
    toast({
      title: "Setting updated",
      description: `${setting} has been ${!botSettings[setting] ? 'enabled' : 'disabled'}`,
    });
  };

  const sendTestMessage = () => {
    const newMessage = { 
      id: messages.length + 1, 
      type: 'text', 
      content: 'This is a test message from the CyberShield platform', 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      direction: 'outgoing' 
    };
    
    setMessages([...messages, newMessage]);
    
    toast({
      title: "Test message sent",
      description: "The message was sent successfully to your Telegram bot",
    });
  };

  const renderMessageIcon = (type) => {
    switch(type) {
      case 'text':
        return <MessageSquare size={16} className="text-cyberBlue-400" />;
      case 'image':
        return <Image size={16} className="text-purple-400" />;
      case 'camera':
        return <Camera size={16} className="text-green-400" />;
      case 'file':
        return <FileText size={16} className="text-amber-400" />;
      case 'command':
        return <Shield size={16} className="text-rose-400" />;
      default:
        return <MessageSquare size={16} />;
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6 animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-2 py-1 bg-cyberBlue-500/10 text-cyberBlue-400 rounded text-xs font-medium mb-2">
              Telegram Integration
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Telegram Bot Control</h1>
            <p className="text-muted-foreground mt-1">Manage your Telegram bot integration and communications</p>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="gap-1">
              <RefreshCw size={16} />
              <span className="hidden sm:inline">Reconnect</span>
            </Button>
            <Button size="sm" className="gap-1">
              <Settings size={16} />
              <span className="hidden sm:inline">Configure</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="lg:col-span-2 space-y-6">
          {/* Main Telegram integration card */}
          <div className="cyber-card p-4">
            <div className="border-b border-border pb-3 mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Send size={16} className="text-cyberBlue-400" />
                Telegram Bot Status
              </h3>
              <Badge 
                variant={botConnected ? "default" : "secondary"} 
                className={botConnected ? "bg-cyberGreen-500 hover:bg-cyberGreen-600" : ""}
              >
                {botConnected ? 'Connected' : 'Disconnected'}
              </Badge>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground">Bot Token</label>
                <div className="relative mt-1">
                  <Input 
                    value={botToken} 
                    onChange={(e) => setBotToken(e.target.value)}
                    className="font-mono pr-10" 
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={copyToken}
                  >
                    <Copy size={14} />
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="text-xs text-muted-foreground">Chat ID</label>
                <Input 
                  value={chatId} 
                  onChange={(e) => setChatId(e.target.value)}
                  className="font-mono mt-1" 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="gap-1"
                  onClick={sendTestMessage}
                >
                  <Send size={14} />
                  Send Test Message
                </Button>
                
                <div className="flex items-center text-xs text-muted-foreground gap-1">
                  <Info size={14} />
                  Last sync: 2 minutes ago
                </div>
              </div>
            </div>
          </div>
          
          {/* Message history */}
          <div className="cyber-card p-4">
            <div className="border-b border-border pb-3 mb-4">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <MessageSquare size={16} className="text-cyberBlue-400" />
                Message History
              </h3>
            </div>
            
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
              {messages.map(message => (
                <div 
                  key={message.id} 
                  className={cn(
                    "flex gap-3 p-3 rounded-lg",
                    message.direction === 'outgoing' 
                      ? "bg-sidebar/50" 
                      : "bg-cyberBlue-500/10"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    message.direction === 'outgoing'
                      ? "bg-secondary/80"
                      : "bg-cyberBlue-500/20"
                  )}>
                    {renderMessageIcon(message.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium">
                        {message.direction === 'outgoing' ? 'CyberShield Bot' : 'You'}
                      </p>
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                    </div>
                    
                    <p className={cn(
                      "text-sm",
                      message.type === 'command' && "font-mono text-xs bg-background py-0.5 px-1.5 rounded"
                    )}>
                      {message.content}
                    </p>
                    
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground capitalize">
                        {message.type}
                      </span>
                      {message.direction === 'outgoing' && (
                        <span className="text-xs text-cyberGreen-400 flex items-center gap-0.5">
                          <Check size={12} />
                          Delivered
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Bot notification settings */}
          <div className="cyber-card p-4">
            <div className="border-b border-border pb-3 mb-4">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Bell size={16} className="text-cyberBlue-400" />
                Notification Settings
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm">Notify on device connect</label>
                <div 
                  className={cn(
                    "w-9 h-5 rounded-full relative cursor-pointer transition-colors",
                    botSettings.notifyOnDeviceConnect ? "bg-cyberGreen-500" : "bg-muted"
                  )}
                  onClick={() => handleToggleSetting('notifyOnDeviceConnect')}
                >
                  <div 
                    className={cn(
                      "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-background transition-transform",
                      botSettings.notifyOnDeviceConnect && "translate-x-4"
                    )}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm">Notify on device disconnect</label>
                <div 
                  className={cn(
                    "w-9 h-5 rounded-full relative cursor-pointer transition-colors",
                    botSettings.notifyOnDeviceDisconnect ? "bg-cyberGreen-500" : "bg-muted"
                  )}
                  onClick={() => handleToggleSetting('notifyOnDeviceDisconnect')}
                >
                  <div 
                    className={cn(
                      "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-background transition-transform",
                      botSettings.notifyOnDeviceDisconnect && "translate-x-4"
                    )}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm">Notify on security event</label>
                <div 
                  className={cn(
                    "w-9 h-5 rounded-full relative cursor-pointer transition-colors",
                    botSettings.notifyOnSecurityEvent ? "bg-cyberGreen-500" : "bg-muted"
                  )}
                  onClick={() => handleToggleSetting('notifyOnSecurityEvent')}
                >
                  <div 
                    className={cn(
                      "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-background transition-transform",
                      botSettings.notifyOnSecurityEvent && "translate-x-4"
                    )}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm">Allow command execution</label>
                <div 
                  className={cn(
                    "w-9 h-5 rounded-full relative cursor-pointer transition-colors",
                    botSettings.allowCommandExecution ? "bg-cyberGreen-500" : "bg-muted"
                  )}
                  onClick={() => handleToggleSetting('allowCommandExecution')}
                >
                  <div 
                    className={cn(
                      "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-background transition-transform",
                      botSettings.allowCommandExecution && "translate-x-4"
                    )}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm">Enable media sharing</label>
                <div 
                  className={cn(
                    "w-9 h-5 rounded-full relative cursor-pointer transition-colors",
                    botSettings.enableMediaSharing ? "bg-cyberGreen-500" : "bg-muted"
                  )}
                  onClick={() => handleToggleSetting('enableMediaSharing')}
                >
                  <div 
                    className={cn(
                      "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-background transition-transform",
                      botSettings.enableMediaSharing && "translate-x-4"
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="cyber-card p-4">
            <div className="border-b border-border pb-3 mb-4">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Send size={16} className="text-cyberBlue-400" />
                Quick Actions
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="gap-1 h-9">
                <Camera size={14} />
                Camera Capture
              </Button>
              
              <Button variant="outline" size="sm" className="gap-1 h-9">
                <FileText size={14} />
                Send Report
              </Button>
              
              <Button variant="outline" size="sm" className="gap-1 h-9">
                <Bell size={14} />
                Alert
              </Button>
              
              <Button variant="outline" size="sm" className="gap-1 h-9">
                <Shield size={14} />
                Security Status
              </Button>
            </div>
          </div>
          
          {/* Mini telegram integration widget */}
          <TelegramIntegration className="h-[280px]" />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Telegram;
