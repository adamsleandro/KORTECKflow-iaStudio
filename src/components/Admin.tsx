import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Users, 
  Lock, 
  Fingerprint, 
  Activity, 
  ShieldAlert, 
  Key, 
  ChevronRight, 
  MoreVertical,
  Cpu,
  BrainCircuit,
  Zap,
  Globe,
  Database,
  History,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function Admin() {
  const [activeTab, setActiveTab] = useState('gest-adm');
  const [isAiAuditRunning, setIsAiAuditRunning] = useState(false);

  const startAiAudit = () => {
    setIsAiAuditRunning(true);
    setTimeout(() => setIsAiAuditRunning(false), 3000);
  };

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-750 max-w-[1600px] mx-auto pb-24 sys-adm-gest">
      {/* Mesh Admin Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 border-b border-transparent pb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
             <div className="p-2.5 bg-blue-600/10 rounded-xl border border-blue-500/20">
                <ShieldCheck size={28} className="text-blue-500" />
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-[0.5em] text-zinc-500 uppercase">SYSTEM ARCHITECTURE // MESH-CORE</span>
                <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                  Centro de <span className="text-blue-600">Controle</span> <span className="text-zinc-700 italic">&</span> Segurança
                </h1>
             </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
           <Button 
             onClick={startAiAudit}
             disabled={isAiAuditRunning}
             className="bg-blue-600 text-white hover:bg-blue-500 font-black h-14 px-8 text-[11px] uppercase tracking-widest shadow-sm shadow-blue-600/10 transition-all border-0"
           >
             {isAiAuditRunning ? (
               <><Cpu className="mr-3 animate-spin" size={18} /> Analisando Heurísticas...</>
             ) : (
               <><BrainCircuit className="mr-3" size={18} /> Auditoria IA Completa</>
             )}
           </Button>
           <Button variant="outline" className="bg-white/5 border-transparent hover:bg-white/10 text-white h-14 px-8 text-[11px] uppercase font-black tracking-widest">
             Logs Globais
           </Button>
        </div>
      </div>

      {/* Top Cyber Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Admins Ativos', value: '04', trend: 'Nível Root 0', icon: <Lock className="text-blue-500" />, color: 'blue' },
          { label: 'Uptime Global', value: '99.98%', trend: 'Estabilidade Total', icon: <Globe className="text-emerald-500" />, color: 'emerald' },
          { label: 'Security Score', value: '98/100', trend: 'Auditado A+', icon: <ShieldAlert className="text-blue-400" />, color: 'blue' },
          { label: 'Latência Fibra', value: '24ms', trend: 'Region East-1', icon: <Zap className="text-amber-500" />, color: 'amber' },
        ].map((stat, i) => (
          <Card key={i} className="bg-white dark:bg-zinc-900 border-transparent relative overflow-hidden group">
            <div className={cn("absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-10 -mr-16 -mt-16", `bg-${stat.color}-500`)} />
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{stat.label}</span>
                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border-none flex items-center justify-center group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-black text-white italic tracking-tighter leading-none">{stat.value}</h3>
                <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">{stat.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <Card className="xl:col-span-8 zinc-900 border-transparent overflow-hidden rounded-3xl">
          <CardHeader className="border-b border-transparent flex flex-row items-center justify-between p-8 bg-white/[0.01]">
            <div>
              <CardTitle className="text-sm font-black text-white uppercase tracking-widest italic">Gestão de Privilégios</CardTitle>
              <CardDescription className="text-[10px] font-bold text-zinc-500 uppercase mt-1 tracking-tight">Hierarquia de acesso e privilégios Mesh-Core</CardDescription>
            </div>
            <Button className="bg-white text-black hover:bg-zinc-200 h-10 text-[10px] font-black uppercase tracking-widest transition-all">
              <Plus size={14} className="mr-2" /> Novo Admin
            </Button>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: 'Adams Leandro', role: 'Super Admin', level: 'Nível 0 (Root)', status: 'Ativo', email: 'adams@korteck.com', lastLogin: '10 min atrás' },
                { name: 'Ricardo Santos', role: 'Gerente TI', level: 'Nível 1', status: 'Ativo', email: 'ricardo@korteck.com', lastLogin: '2h atrás' },
                { name: 'Elena Meyer', role: 'Finanças', level: 'Nível 1', status: 'Inativo', email: 'elena@korteck.com', lastLogin: '3 dias atrás' },
                { name: 'Agente Cortex', role: 'Sistema IA', level: 'Daemon', status: 'Ativo', email: 'ai@mesh.local', lastLogin: 'Tempo Real' },
              ].map((admin, i) => (
                <Card key={i} className="bg-[#14141d]/40 border-none hover:border-blue-500/30 transition-all p-5 rounded-2xl flex flex-col justify-between group relative overflow-hidden">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-11 h-11 rounded-xl bg-zinc-900 border-none flex items-center justify-center text-zinc-500 group-hover:border-blue-500/50 shadow-inner overflow-hidden relative shrink-0">
                           <img src={`https://i.pravatar.cc/100?u=${admin.email}`} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={admin.name} />
                           <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-black text-white italic uppercase tracking-tighter leading-none truncate">{admin.name}</h4>
                            <Badge className={cn(
                              "text-[7px] font-black uppercase h-3.5 px-1.5 tracking-wider border-0 shrink-0",
                              admin.status === 'Ativo' ? "bg-emerald-500/10 text-emerald-500" : "bg-white/5 text-zinc-600"
                            )}>
                              {admin.status}
                            </Badge>
                          </div>
                          <p className="text-[9px] font-bold text-zinc-500 tracking-[0.05em] uppercase mt-1 truncate">
                            <span className="text-blue-500/80 font-extrabold">{admin.role}</span> // {admin.email}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-700 hover:text-white transition-colors shrink-0 -mt-1 -mr-1">
                        <MoreVertical size={14} />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-transparent flex items-center justify-between text-[10px]">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest leading-none mb-1">Nível de Acesso</span>
                      <span className="text-[10px] font-black text-white italic tracking-tighter uppercase leading-none">{admin.level}</span>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest leading-none mb-1">Atividade</span>
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest leading-none">{admin.lastLogin}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="xl:col-span-4 space-y-8">
          <Card className="bg-gradient-to-br from-blue-600/10 to-blue-950/20 border-blue-500/20 overflow-hidden relative p-10 border-2">
            <div className="absolute top-0 right-0 p-12 opacity-10"><BrainCircuit size={100} className="text-white" /></div>
            <div className="relative z-10 space-y-6">
               <div className="flex items-center gap-3 text-blue-400 text-[10px] font-black tracking-[0.4em] uppercase">
                  <Fingerprint size={16} className="animate-pulse" /> IA Cyber Intelligence
               </div>
               <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-tight">Diagnóstico Ativo</h3>
               
               <div className="space-y-4">
                  <div className="p-4 bg-black/40 border-none rounded-2xl flex gap-4">
                     <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                     <p className="text-[11px] text-zinc-400 font-medium leading-relaxed uppercase tracking-tighter italic">
                        Criptografia <span className="text-white">AES-256</span> validada em todos os canais de Telemetria CNC.
                     </p>
                  </div>
                  <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-2xl flex gap-4">
                     <AlertTriangle size={18} className="text-rose-500 shrink-0" />
                     <p className="text-[11px] text-rose-300 font-medium leading-relaxed uppercase tracking-tighter italic">
                        Anomalia: Acesso faturamento por <span className="text-white font-black">#Marcos_OPS</span> fora do horário.
                     </p>
                  </div>
               </div>

               <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-[11px] uppercase h-14 tracking-widest shadow-sm shadow-blue-600/20">
                  REFORÇAR SEGURANÇA IA
               </Button>
            </div>
          </Card>

          <Card className="bg-white dark:bg-zinc-900 border-transparent p-10 space-y-8">
             <div>
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic mb-2">Monitor de Recursos</h4>
                <p className="text-xl font-black text-white italic tracking-tighter uppercase">Carga do Sistema</p>
             </div>

             <div className="space-y-6">
                {[
                  { label: 'Uso de CPU', val: 12 },
                  { label: 'DB / Storage', val: 45 },
                  { label: 'I/O Operativo', val: 78 },
                ].map((s, i) => (
                  <div key={i} className="space-y-2">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest italic">
                        <span className="text-zinc-600">{s.label}</span>
                        <span className="text-blue-500">{s.val}%</span>
                     </div>
                     <Progress value={s.val} className="h-1 bg-white/5" />
                  </div>
                ))}
             </div>
          </Card>
        </div>
      </div>

      {/* Real-time Audit Table */}
      <Card className="bg-white dark:bg-zinc-900 border-transparent overflow-hidden rounded-3xl">
        <CardHeader className="bg-white/[0.01] border-b border-transparent p-8 flex flex-row items-center justify-between">
           <div>
              <CardTitle className="text-sm font-black text-white uppercase tracking-widest italic leading-none">Auditoria Global Mesh</CardTitle>
              <p className="text-[10px] font-bold text-zinc-600 uppercase mt-1">Sincronização em Tempo Real (Shadow-Ops)</p>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">Monitoring Live</span>
           </div>
        </CardHeader>
        <CardContent className="p-0">
           <div className="overflow-x-auto">
              <table className="w-full text-left font-sans">
                 <thead>
                    <tr className="border-b border-transparent bg-white/[0.01]">
                       <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Protocolo</th>
                       <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Evento Operativo</th>
                       <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Canal</th>
                       <th className="p-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {[
                      { id: '12:04:52', event: 'Global Config Override', channel: 'Core-Mesh', status: 'SUCCESS' },
                      { id: '12:01:10', event: 'API Matrix Secret Rotation', channel: 'IAM-System', status: 'SUCCESS' },
                      { id: '11:58:34', event: 'Unusual Access Pattern', channel: 'Commercial', status: 'WARNING' },
                      { id: '11:45:00', event: 'DB Deep Backup Cluster-0', channel: 'Infra', status: 'SUCCESS' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.01] transition-colors group">
                         <td className="p-6 font-mono text-[10px] text-zinc-500 italic tracking-tighter">{row.id}</td>
                         <td className="p-6 text-[11px] font-black text-white uppercase italic tracking-tighter group-hover:text-blue-500 transition-colors">{row.event}</td>
                         <td className="p-6 text-[10px] font-black text-zinc-600 uppercase tracking-widest">{row.channel}</td>
                         <td className="p-6 text-right">
                            <span className={cn(
                               "text-[9px] font-black px-3 py-1 rounded-sm italic tracking-widest",
                               row.status === 'SUCCESS' ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-600/10 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.1)]"
                            )}>{row.status}</span>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
