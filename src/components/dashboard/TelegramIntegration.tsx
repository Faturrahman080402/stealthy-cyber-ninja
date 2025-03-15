
import React, { useState, useEffect } from 'react';
import { Send, MessageSquare, Image, Camera, Check, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TelegramIntegrationProps {
  className?: string;
  botToken?: string;
}

interface MessageStatus {
  id: string;
  content: string;
  type: 'text' | 'image' | 'camera';
  timestamp: string;
  status: 'sent' | 'sending' | 'failed';
}

const TelegramIntegration: React.FC<TelegramIntegrationProps> = ({ 
  className,
  botToken = "7850775302:AAFGuJNqWMHF4BuifoExEEpiHmpHsuuyOjg"
}) => {
  const [status, setStatus] = useState<'connected' | 'connecting' | 'error'>('connecting');
  const [messages, setMessages] = useState<MessageStatus[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data and connecting to Telegram
    const timer = setTimeout(() => {
      setStatus('connected');
      setMessages([
        {
          id: '1',
          content: 'System startup complete',
          type: 'text',
          timestamp: '10:25 AM',
          status: 'sent'
        },
        {
          id: '2',
          content: 'Security scan results',
          type: 'image',
          timestamp: '10:30 AM',
          status: 'sent'
        }
      ]);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newMessage: MessageStatus = {
      id: Date.now().toString(),
      content: inputMessage,
      type: 'text',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sending'
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage('');
    
    // Simulate sending message
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'sent' } 
            : msg
        )
      );
    }, 1000);
  };

  const sendCameraCapture = () => {
    const newMessage: MessageStatus = {
      id: Date.now().toString(),
      content: 'Camera capture from device',
      type: 'camera',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sending'
    };
    
    setMessages([...messages, newMessage]);
    
    // Simulate sending camera capture
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'sent' } 
            : msg
        )
      );
    }, 1500);
  };

  if (loading) {
    return (
      <div className={cn("cyber-card p-4 h-[300px] flex items-center justify-center", className)}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-t-transparent border-cyberBlue-500 rounded-full animate-spin"></div>
          <p className="text-sm text-muted-foreground">Connecting to Telegram...</p>
        </div>
      </div>
    );
  }

  const getStatusIcon = (msgStatus: string) => {
    switch (msgStatus) {
      case 'sent':
        return <Check size={14} className="text-green-400" />;
      case 'sending':
        return <div className="w-3 h-3 border-2 border-t-transparent border-cyberBlue-500 rounded-full animate-spin" />;
      case 'failed':
        return <AlertTriangle size={14} className="text-red-400" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <MessageSquare size={14} className="text-cyberBlue-400" />;
      case 'image':
        return <Image size={14} className="text-purple-400" />;
      case 'camera':
        return <Camera size={14} className="text-green-400" />;
      default:
        return <MessageSquare size={14} className="text-gray-400" />;
    }
  };

  return (
    <div className={cn("cyber-card flex flex-col", className)}>
      <div className="border-b border-border px-4 py-3 flex items-center justify-between">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Send size={16} className="text-cyberBlue-400" />
          Telegram Integration
        </h3>
        <div className="flex items-center gap-2">
          <span className={cn(
            "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
            status === 'connected' ? "bg-green-500/10 text-green-400" :
            status === 'connecting' ? "bg-yellow-500/10 text-yellow-400" :
            "bg-red-500/10 text-red-400"
          )}>
            <span className={cn(
              "w-1.5 h-1.5 mr-1.5 rounded-full",
              status === 'connected' ? "bg-green-400" :
              status === 'connecting' ? "bg-yellow-400" :
              "bg-red-400"
            )}></span>
            {status === 'connected' ? 'Connected' :
            status === 'connecting' ? 'Connecting...' :
            'Connection Error'}
          </span>
        </div>
      </div>
      
      <div className="flex-1 p-2 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto mb-2 space-y-2 max-h-[200px]">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div key={message.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-secondary/50 transition-colors">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/80 flex items-center justify-center">
                  {getTypeIcon(message.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm leading-tight">{message.content}</p>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      {getStatusIcon(message.status)}
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                    <span className="capitalize">
                      {message.type === 'camera' ? 'Camera capture' : message.type}
                    </span>
                    <span>•</span>
                    <span>Bot Channel</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-[100px] flex items-center justify-center">
              <p className="text-sm text-muted-foreground">No messages yet</p>
            </div>
          )}
        </div>
        
        <div className="mt-auto p-2 space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 py-2 px-3 bg-secondary text-sm rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-cyberBlue-500 focus:border-cyberBlue-500"
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="p-2 bg-cyberBlue-500 hover:bg-cyberBlue-600 text-white rounded-md transition-colors"
              disabled={!inputMessage.trim()}
            >
              <Send size={16} />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              <span>Connected to:</span>
              <span className="text-foreground ml-1 font-mono">
                {botToken.substring(0, 8)}...{botToken.substring(botToken.length - 6)}
              </span>
            </div>
            <button
              onClick={sendCameraCapture}
              className="flex items-center gap-1.5 py-1 px-2 bg-secondary hover:bg-secondary/80 rounded-md text-xs transition-colors"
            >
              <Camera size={14} />
              Send Camera Capture
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelegramIntegration;
