import React from 'react';
import { motion } from 'motion/react';
import { 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  Cell,
  PieChart as RePieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Package, 
  Factory, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal,
  Target,
  FileText,
  Clock,
  AlertCircle,
  Layout,
  Cpu,
  Activity,
  TrendingDown,
  CheckCircle2,
  PieChart,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const dataPerformance = [
  { name: 'Seg', prod: 4000, meta: 2400 },
  { name: 'Ter', prod: 3000, meta: 1398 },
  { name: 'Qua', prod: 2000, meta: 9800 },
  { name: 'Qui', prod: 2780, meta: 3908 },
  { name: 'Sex', prod: 1890, meta: 4800 },
  { name: 'Sáb', prod: 2390, meta: 3800 },
];

const dataRevenue = [
  { name: 'JAN', value: 45000 },
  { name: 'FEV', value: 52000 },
  { name: 'MAR', value: 48000 },
  { name: 'ABR', value: 61000 },
  { name: 'MAI', value: 55000 },
  { name: 'JUN', value: 67000 },
];

const dataOSStatus = [
  { name: 'Produção', value: 45, color: '#3b82f6' },
  { name: 'Criação', value: 25, color: '#f59e0b' },
  { name: 'Expedição', value: 15, color: '#10b981' },
  { name: 'Atrasado', value: 15, color: '#ef4444' },
];

import { useStore } from '@/src/lib/store';
import { format } from 'date-fns';

export function Dashboard() {
  const { auditLogs, leads, projects, inventory } = useStore();
  
  // Realtime KPI calculations
  const totalLeads = leads.length || 154;
  const activeProjects = projects.length || 42;
  const lowStock = inventory.filter(i => i.status !== 'ok').length || 8;
  const recentAlerts = auditLogs.filter(l => l.severity === 'high' || l.severity === 'critical').slice(0, 3);

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-750 max-w-[1700px] mx-auto pb-24">
      {/* Header Mesh Industrial */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 border-b border-white/5 pb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
             <div className="p-2.5 bg-blue-600/10 rounded-xl border border-blue-500/20">
                <Cpu size={28} className="text-blue-500 animate-pulse" />
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-[0.5em] text-zinc-500 uppercase">EXECUTIVE COMMAND CENTER // MESH-CORE</span>
                <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                  Controle <span className="text-blue-600">de</span> Operações
                </h1>
             </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
           <div className="hidden xl:flex items-center gap-10 px-10 border-r border-white/5 mr-3">
              <div className="text-right">
                 <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">DATA DE HOJE</p>
                 <p className="text-xl font-black text-white italic tracking-tighter">11 MAI 2026</p>
              </div>
              <div className="text-right">
                 <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">STATUS DO SISTEMA</p>
                 <div className="flex items-center gap-2 justify-end">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                    <p className="text-xl font-black text-emerald-500 italic">NOMINAL</p>
                 </div>
              </div>
           </div>
           <Button className="bg-white text-black hover:bg-zinc-200 h-14 px-8 font-black uppercase text-[11px] tracking-widest shadow-xl transition-all">
              Relatório Geral [B.I.]
           </Button>
        </div>
      </div>

      {/* Primary KPI Grid - Ultra High Contrast */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: 'EBITDA ESTIMADO', val: 'R$ 482k', icon: <TrendingUp />, color: 'emerald', detail: 'Margem: 28%' },
          { label: 'OEE GLOBAL', val: '84.2%', icon: <Activity />, color: 'blue', detail: 'Meta: 85%' },
          { label: 'FUNIL COMERCIAL', val: 'R$ 4.2M', icon: <Target />, color: 'indigo', detail: 'Ticket: 55k' },
          { label: 'CUSTO RETRABALHO', val: '1.4%', icon: <AlertCircle />, color: 'rose', detail: 'Limite: 2.0%' },
        ].map((kpi, i) => (
          <Card key={i} className="bg-[#0c0c10] border-white/5 hover:border-white/10 transition-all group overflow-hidden">
             <CardContent className="p-10 relative">
                <div className={cn("absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity", `text-${kpi.color}-500`)}>
                   {React.cloneElement(kpi.icon as React.ReactElement, { size: 64 })}
                </div>
                <div className="space-y-4">
                   <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">{kpi.label}</p>
                   <div className="flex items-end gap-3">
                      <h3 className="text-5xl font-black text-white italic tracking-tighter leading-none">{kpi.val}</h3>
                   </div>
                   <div className="flex items-center gap-2 pt-4">
                      <div className={cn("px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest", `bg-${kpi.color}-500/10 text-${kpi.color}-500`)}>
                         {kpi.detail}
                      </div>
                   </div>
                </div>
             </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Main Chart Dashboard */}
         <Card className="lg:col-span-8 bg-[#0c0c10] border-white/5 overflow-hidden">
            <CardHeader className="bg-white/[0.01] border-b border-white/5 py-8 px-10">
               <div className="flex justify-between items-center">
                  <div>
                     <CardTitle className="text-sm font-black text-white uppercase tracking-widest italic">Análise de Receita vs Produção</CardTitle>
                     <p className="text-[10px] font-bold text-zinc-600 uppercase mt-1">Sincronismo entre faturamento e carga fabril</p>
                  </div>
                  <div className="flex gap-4">
                     <div className="flex items-center gap-2 text-[9px] font-black text-blue-500 uppercase italic">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> FATURAMENTO
                     </div>
                     <div className="flex items-center gap-2 text-[9px] font-black text-zinc-700 uppercase italic">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" /> CARGA PCP
                     </div>
                  </div>
               </div>
            </CardHeader>
            <CardContent className="h-[450px] p-10">
               <ResponsiveContainer width="99%" height="99%">
                  <AreaChart data={dataRevenue}>
                     <defs>
                        <linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                           <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#ffffff03" vertical={false} />
                     <XAxis dataKey="name" stroke="#333" fontSize={10} axisLine={false} tickLine={false} />
                     <YAxis stroke="#333" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${v/1000}k`} />
                     <RechartsTooltip 
                        contentStyle={{ backgroundColor: '#09090b', border: '1px solid #ffffff10', borderRadius: '16px' }}
                        itemStyle={{ fontSize: '12px', color: '#fff', fontWeight: '900' }}
                     />
                     <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#dashGrad)" strokeWidth={4} />
                  </AreaChart>
               </ResponsiveContainer>
            </CardContent>
         </Card>

         <div className="lg:col-span-4 space-y-8">
            <Card className="bg-[#0c0c10] border-white/5 p-10 space-y-8">
               <div className="flex items-center justify-between">
                  <div>
                     <h3 className="text-sm font-black text-white uppercase italic tracking-widest">Mix Operacional</h3>
                     <p className="text-[10px] font-bold text-zinc-700 uppercase">Distribuição por setor</p>
                  </div>
                  <PieChart size={24} className="text-blue-500" />
               </div>
               
               <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <RePieChart>
                        <Pie
                           data={dataOSStatus}
                           cx="50%"
                           cy="50%"
                           innerRadius={60}
                           outerRadius={80}
                           paddingAngle={8}
                           dataKey="value"
                        >
                           {dataOSStatus.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                           ))}
                        </Pie>
                     </RePieChart>
                  </ResponsiveContainer>
               </div>

               <div className="space-y-4">
                  {dataOSStatus.map((s, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-white/[0.03] pb-3 last:border-0">
                       <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                          <span className="text-[10px] font-black text-zinc-600 uppercase italic tracking-widest">{s.name}</span>
                       </div>
                       <span className="text-sm font-black text-white italic">{s.value}%</span>
                    </div>
                  ))}
               </div>
            </Card>

            <Card className="bg-blue-600 border-0 p-10 relative overflow-hidden group cursor-pointer active:scale-95 transition-all">
               <div className="absolute top-0 right-0 p-12 opacity-20"><Zap size={80} className="text-white" /></div>
               <div className="relative z-10 space-y-4">
                  <h4 className="text-lg font-black text-white uppercase italic tracking-tighter leading-tight">Sugestão KORTECK IA</h4>
                  <p className="text-[11px] font-black text-blue-100 uppercase tracking-widest leading-loose">
                     Otimize a escala do turno da noite para o setor CNC 01. Previsão de atraso na OS-4251 de 2.5 horas.
                  </p>
                  <Button className="w-full bg-black text-white hover:bg-zinc-900 border-0 text-[10px] font-black h-12 uppercase tracking-widest mt-4">Resolver Agora</Button>
               </div>
            </Card>
         </div>
      </div>

      {/* Critical Logs Section Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <Card className="bg-[#0c0c10] border-white/5 overflow-hidden">
            <CardHeader className="bg-white/[0.01] border-b border-white/5 py-8 px-10">
               <div className="flex items-center gap-3">
                  <Clock size={18} className="text-blue-500" />
                  <CardTitle className="text-sm font-black text-white uppercase tracking-widest italic">Fila de Eventos Críticos</CardTitle>
               </div>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-white/5">
                  {recentAlerts.length > 0 ? recentAlerts.map((alert, i) => (
                     <div key={i} className="p-8 hover:bg-white/[0.01] transition-all flex items-center justify-between group">
                        <div className="flex items-center gap-6">
                           <div className={cn(
                             "w-12 h-12 rounded-2xl flex items-center justify-center border transition-all group-hover:scale-110",
                             alert.severity === 'critical' ? "bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.1)]" : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                           )}>
                              <AlertTriangle size={24} />
                           </div>
                           <div className="space-y-1">
                              <h4 className="text-sm font-black text-white uppercase italic tracking-tight">{alert.module}</h4>
                              <p className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest">{alert.action}</p>
                           </div>
                        </div>
                        <span className="text-[10px] font-black text-zinc-800 italic underline decoration-blue-500 underline-offset-4">{format(alert.timestamp, 'HH:mm:ss')}</span>
                     </div>
                  )) : (
                    <div className="p-20 text-center opacity-20">
                       <CheckCircle2 size={40} className="mx-auto mb-4 text-emerald-500" />
                       <p className="text-[10px] font-black uppercase tracking-[0.3em]">Operação Estabilizada</p>
                    </div>
                  )}
               </div>
            </CardContent>
         </Card>

         <Card className="bg-[#0c0c10] border-white/5 p-10 flex flex-col justify-between">
            <div className="space-y-8">
               <div className="space-y-1">
                  <h3 className="text-sm font-black text-white uppercase italic tracking-widest">Utilização de Recursos</h3>
                  <p className="text-[10px] font-bold text-zinc-700 uppercase">Carga em tempo real vs Disponibilidade</p>
               </div>
               
               <div className="space-y-10">
                  {[
                    { label: 'MAQUINÁRIO CNC', val: 88, color: 'blue' },
                    { label: 'EQUIPE INSTALAÇÃO', val: 72, color: 'indigo' },
                    { label: 'TRANSPORTE / LOG', val: 45, color: 'zinc' },
                  ].map((r, i) => (
                    <div key={i} className="space-y-4">
                       <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest italic">
                          <span className="text-white">{r.label}</span>
                          <span className={cn(r.val > 80 ? "text-blue-500" : "text-zinc-500")}>{r.val}% ATIVO</span>
                       </div>
                       <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${r.val}%` }}
                             className={cn("h-full", r.val > 80 ? "bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]" : "bg-zinc-800")}
                          />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            
            <Button variant="outline" className="w-full h-14 bg-white/5 border-white/10 text-white font-black uppercase text-[11px] tracking-widest mt-12 hover:bg-white/10 group">
               Visualizar Painel Telemetria <Cpu size={16} className="ml-3 group-hover:rotate-180 transition-transform duration-500" />
            </Button>
         </Card>
      </div>
    </div>
  );
}

