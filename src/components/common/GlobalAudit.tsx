import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';
import { 
  Activity, 
  Terminal, 
  ShieldCheck, 
  AlertTriangle, 
  User, 
  Cpu,
  X,
  ChevronUp,
  Maximize2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

export type AuditType = 'USER' | 'SYSTEM' | 'SECURITY' | 'AI' | 'ERROR';

export interface AuditLog {
  id: string;
  timestamp: Date;
  type: AuditType;
  user: string;
  action: string;
  module: string;
  detail?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface GlobalAuditProps {
  logs: AuditLog[];
  isOpen: boolean;
  onToggle: () => void;
}

export function GlobalAudit({ logs, isOpen, onToggle }: GlobalAuditProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-rose-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-blue-500';
      default: return 'bg-zinc-700';
    }
  };

  const getTypeIcon = (type: AuditType) => {
    switch (type) {
      case 'USER': return <User size={12} />;
      case 'SYSTEM': return <Cpu size={12} />;
      case 'SECURITY': return <ShieldCheck size={12} />;
      case 'AI': return <Terminal size={12} className="text-blue-400" />;
      case 'ERROR': return <AlertTriangle size={12} className="text-rose-500" />;
    }
  };

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-[60] transition-all duration-500 ease-in-out px-4 md:px-0 md:left-16",
      isOpen ? "h-[320px]" : "h-10"
    )}>
      {/* Backdrop for open state */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[-1] pointer-events-none md:hidden"
          />
        )}
      </AnimatePresence>

      <div className="h-full bg-black/90 backdrop-blur-xl border-t border-white/10 flex flex-col shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        {/* Header/Toggle Bar */}
        <div 
          onClick={onToggle}
          className="h-10 shrink-0 flex items-center justify-between px-6 cursor-pointer hover:bg-white/5 transition-colors group"
        >
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] font-mono italic">
                <Activity size={12} className={cn("text-blue-500", isOpen && "animate-pulse")} /> 
                Audit System <span className="text-white/20">|</span> Realtime Logs
             </div>
             <Badge className="bg-blue-600/10 text-blue-500 border-0 text-[8px] font-black h-4 px-1.5">{logs.length} EVENTS</Badge>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-4 text-[9px] font-bold text-zinc-600 uppercase tracking-widest">
                <span>Buffer: Active</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
             </div>
             <div className="text-zinc-500 group-hover:text-white transition-colors">
                {isOpen ? <X size={14} /> : <ChevronUp size={14} />}
             </div>
          </div>
        </div>

        {/* Logs Body */}
        <div className={cn("flex-1 overflow-hidden transition-opacity duration-300", isOpen ? "opacity-100" : "opacity-0 invisible")}>
          <ScrollArea className="h-full">
            <div className="p-4 space-y-1">
              {logs.map((log) => (
                <div 
                  key={log.id} 
                  className="flex items-center gap-4 py-2 px-3 hover:bg-white/[0.03] rounded-lg transition-colors group cursor-default"
                >
                  <span className="text-[10px] font-mono text-zinc-600 w-16 shrink-0">{format(log.timestamp, 'HH:mm:ss')}</span>
                  <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", getSeverityColor(log.severity))} />
                  <div className="w-24 shrink-0 flex items-center gap-2">
                     <span className="text-zinc-700">{getTypeIcon(log.type)}</span>
                     <span className={cn(
                       "text-[9px] font-black uppercase tracking-widest",
                       log.type === 'AI' ? "text-blue-400" : log.type === 'ERROR' ? "text-rose-500" : "text-zinc-500"
                     )}>{log.type}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-zinc-300 truncate group-hover:text-white transition-colors">
                       <span className="text-zinc-600 uppercase text-[9px] mr-2">[{log.module}]</span>
                       {log.action}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                     <span className="text-[9px] font-black text-zinc-700 uppercase italic">{log.user}</span>
                     <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-white text-zinc-600">
                        <Maximize2 size={12} />
                     </button>
                  </div>
                </div>
              ))}
              {logs.length === 0 && (
                <div className="h-[200px] flex flex-col items-center justify-center opacity-20">
                  <Terminal size={40} className="mb-2" />
                  <p className="text-xs font-black uppercase tracking-widest">No active logs in current session</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
