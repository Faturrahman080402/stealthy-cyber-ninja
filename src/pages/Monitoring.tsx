
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Eye } from 'lucide-react';

const Monitoring = () => {
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
        </div>
      </div>
      
      <div className="min-h-[400px] flex flex-col items-center justify-center cyber-card p-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="w-16 h-16 rounded-full bg-cyberBlue-500/10 flex items-center justify-center mb-4">
          <Eye className="w-8 h-8 text-cyberBlue-400" />
        </div>
        <h2 className="text-xl font-medium mb-2">Monitoring Dashboard</h2>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          This section provides detailed monitoring of system resources, network traffic, and security events.
        </p>
        <p className="text-center text-sm text-muted-foreground">
          This page is under construction and will be available soon.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Monitoring;
