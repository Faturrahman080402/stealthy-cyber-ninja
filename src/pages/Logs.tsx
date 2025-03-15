
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FileText } from 'lucide-react';

const Logs = () => {
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
        </div>
      </div>
      
      <div className="min-h-[400px] flex flex-col items-center justify-center cyber-card p-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="w-16 h-16 rounded-full bg-cyberBlue-500/10 flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-cyberBlue-400" />
        </div>
        <h2 className="text-xl font-medium mb-2">System Logs</h2>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          This section provides access to detailed system logs, security events, and audit trails.
        </p>
        <p className="text-center text-sm text-muted-foreground">
          This page is under construction and will be available soon.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Logs;
