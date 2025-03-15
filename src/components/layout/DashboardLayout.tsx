
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, Eye, Activity, Settings, Menu, X, 
  Monitor, Radio, Cpu, Database, AlertTriangle,
  FileText, Send, User, Lock, Terminal
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => (
  <Link 
    to={to} 
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group",
      isActive 
        ? "bg-cyberBlue-500/10 text-cyberBlue-400" 
        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
    )}
  >
    <div className={cn(
      "w-6 h-6 flex items-center justify-center transition-transform duration-300",
      isActive ? "text-cyberBlue-400" : "text-muted-foreground group-hover:text-foreground",
      "group-hover:scale-110"
    )}>
      {icon}
    </div>
    <span className="text-sm font-medium">{label}</span>
    {isActive && (
      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyberBlue-400 animate-pulse-slow"></div>
    )}
  </Link>
);

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { to: '/', icon: <Monitor size={18} />, label: 'Dashboard' },
    { to: '/devices', icon: <Radio size={18} />, label: 'Devices' },
    { to: '/monitoring', icon: <Eye size={18} />, label: 'Monitoring' },
    { to: '/alerts', icon: <AlertTriangle size={18} />, label: 'Alerts' },
    { to: '/system', icon: <Cpu size={18} />, label: 'System' },
    { to: '/logs', icon: <FileText size={18} />, label: 'Logs' },
    { to: '/telegram', icon: <Send size={18} />, label: 'Telegram' },
    { to: '/settings', icon: <Settings size={18} />, label: 'Settings' },
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-2 border-t-transparent border-cyberBlue-500 rounded-full animate-spin mb-4"></div>
          <div className="text-cyberBlue-400 font-mono text-sm animate-pulse">
            <span className="inline-block animate-fade-in">Initializing system...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background bg-cyber-gradient text-foreground flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex flex-col w-64 pt-5 pb-4 bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
          !sidebarOpen && "-translate-x-full"
        )}
      >
        <div className="px-4 flex items-center gap-2 mb-6">
          <Shield className="h-8 w-8 text-cyberBlue-400" />
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Cyber<span className="text-cyberBlue-400">Shield</span>
          </h1>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="ml-auto p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary lg:hidden"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="px-3 py-2">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Main</p>
        </div>
        
        <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
          {navItems.slice(0, 5).map((item) => (
            <NavItem 
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.to}
            />
          ))}
          
          <div className="px-3 py-2 mt-2">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">System</p>
          </div>
          
          {navItems.slice(5).map((item) => (
            <NavItem 
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.to}
            />
          ))}
        </nav>
        
        <div className="px-4 mt-auto">
          <div className="cyber-card p-3 space-y-3 my-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cyberBlue-500/20 flex items-center justify-center">
                <Terminal size={16} className="text-cyberBlue-400" />
              </div>
              <div>
                <p className="text-xs text-foreground font-medium">System Status</p>
                <p className="text-xs text-cyberGreen-400">Secure</p>
              </div>
            </div>
            <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full w-4/5 bg-cyberGreen-500 rounded-full animate-pulse-slow"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        sidebarOpen ? "lg:pl-64" : "pl-0"
      )}>
        {/* Top navigation */}
        <header className="sticky top-0 z-10 bg-sidebar/80 backdrop-blur-lg border-b border-sidebar-border">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-2">
              {!sidebarOpen && (
                <button 
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary"
                >
                  <Menu size={20} />
                </button>
              )}
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary hidden lg:flex"
              >
                <Menu size={20} />
              </button>
              <div className="text-sm font-medium text-muted-foreground">
                <span className="code-text">[</span> Secure Connection <span className="text-cyberGreen-400">●</span> <span className="code-text">]</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="rounded-md p-2 bg-secondary text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                <Bell size={18} />
              </div>
              <div className="flex items-center gap-2 p-1 rounded-md hover:bg-secondary cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-cyberBlue-500/20 flex items-center justify-center">
                  <User size={16} className="text-cyberBlue-400" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-foreground">Admin</p>
                  <p className="text-xs text-muted-foreground">Security Analyst</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="p-4 md:p-6 max-w-7xl mx-auto animate-fade-in">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="border-t border-sidebar-border py-4 px-6 text-center text-xs text-muted-foreground">
          <p>CyberShield Security Platform | <span className="text-cyberBlue-400">Secure Environment</span></p>
        </footer>
      </div>
    </div>
  );
};

// Bell component for notifications
const Bell = ({ size = 24, className }: { size?: number, className?: string }) => (
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
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
  </svg>
);

export default DashboardLayout;
