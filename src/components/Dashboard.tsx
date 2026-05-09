import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ReTooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  Cell,
  PieChart as RePieChart,
  Pie
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Package, 
  Factory, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal,
  Zap,
  Clock,
  AlertCircle,
  Layout,
  Cpu,
  Activity,
  TrendingDown,
  CheckCircle2
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

export function Dashboard() {
  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 animate-in fade-in slide-in-from-top-4 duration-700 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-zinc-500 mb-2 uppercase">
            <Layout size={14} /> CENTRAL DE INTELIGÊNCIA
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter leading-none">Centro de Comando<span className="text-blue-600">.</span></h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="hidden sm:flex -space-x-3 mr-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-9 h-9 rounded-full border-4 border-[#050505] overflow-hidden bg-zinc-800 ring-1 ring-white/5 shadow-2xl">
                <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="User" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
          <Button variant="outline" className="flex-1 sm:flex-none bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-bold h-10 md:h-11 px-4 md:px-6 text-[10px] uppercase tracking-widest transition-all">
            Exportar Logs
          </Button>
          <Button className="flex-1 sm:flex-none bg-blue-600 text-white hover:bg-blue-500 font-bold h-10 md:h-11 px-6 md:px-8 text-[11px] uppercase tracking-[0.1em] shadow-[0_0_25px_rgba(37,99,235,0.25)] transition-all">
            Nova OS
          </Button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'OEE GLOBAL', value: '84.2%', trend: '+2.4% ↑', icon: <Cpu className="text-blue-500" />, detail: 'Eficiência Sistêmica' },
          { label: 'MÁQUINAS ATIVAS', value: '07/09', trend: 'Auditado', icon: <Activity className="text-emerald-500" />, detail: 'Status em Tempo Real' },
          { label: 'PERDA MATERIAL', value: '1.2%', trend: '-0.8% ↓', icon: <TrendingDown className="text-amber-500" />, detail: 'Economia R$ 4.2k' },
          { label: 'RECEITA MENSAL', value: 'R$ 452k', trend: '+12.5% ↑', icon: <Zap className="text-purple-500" />, detail: 'Projeção Batida' },
        ].map((kpi, i) => (
          <Card key={i} className="bg-[#111116] border-white/5 hover:border-white/10 transition-all group relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-2">
                <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-black">{kpi.label}</span>
                <span className={cn(
                  "text-[10px] font-black",
                  kpi.trend.includes('↑') ? "text-emerald-500" : kpi.trend.includes('↓') ? "text-blue-500" : "text-zinc-500"
                )}>{kpi.trend}</span>
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-light text-white tracking-tighter leading-none italic">{kpi.value}</h3>
                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-zinc-400 group-hover:scale-110 group-hover:bg-white/[0.05] transition-all">
                  {kpi.icon}
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-1.5">
                 <div className="w-full bg-white/5 h-1 rounded-full">
                    <div className="bg-blue-600 h-full w-[80%] rounded-full shadow-[0_0_8px_rgba(37,99,235,0.5)]" />
                 </div>
                 <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{kpi.detail}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <Card className="xl:col-span-8 bg-[#111116] border-white/5 overflow-hidden">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 bg-white/[0.01]">
            <div>
              <CardTitle className="text-sm font-black text-white uppercase tracking-widest italic">Performance Industrial</CardTitle>
              <CardDescription className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Acompanhamento diário (Seg - Sáb)</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 pt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.5)]" />
                <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest font-mono text-[9px] sm:text-[10px]">Produção Real</span>
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest font-mono text-[9px] sm:text-[10px]">Meta</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[280px] md:h-[340px] w-full pt-8 pl-0 overflow-hidden relative min-h-[280px] md:min-h-[340px]">
            <ResponsiveContainer width="99%" height="99%">
              <BarChart data={dataPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#3f3f46" 
                  fontSize={10} 
                  fontWeight="bold"
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: '#71717a' }}
                />
                <YAxis 
                  stroke="#3f3f46" 
                  fontSize={10} 
                  fontWeight="bold"
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: '#71717a' }}
                  tickFormatter={(value) => `${value}`}
                />
                <ReTooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{ backgroundColor: '#0c0c0c', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}
                />
                <Bar dataKey="prod" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="meta" fill="#18181b" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="xl:col-span-4 space-y-6">
          <Card className="bg-[#111116] border-white/5">
            <CardHeader className="border-b border-white/5 bg-white/[0.01]">
              <CardTitle className="text-sm font-black text-white uppercase tracking-widest italic">Mix de Produção</CardTitle>
            </CardHeader>
            <CardContent className="h-[180px] md:h-[200px] flex items-center justify-center pt-4 overflow-hidden relative min-h-[180px] md:min-h-[200px]">
              <ResponsiveContainer width="99%" height="99%">
                <RePieChart>
                  <Pie
                    data={dataOSStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {dataOSStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <ReTooltip 
                    contentStyle={{ backgroundColor: '#0c0c0c', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </CardContent>
            <div className="px-6 pb-6 space-y-3">
              {dataOSStatus.map((status, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: status.color }} />
                    <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">{status.name}</span>
                  </div>
                  <span className="text-xs font-black text-white italic">{status.value}%</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-blue-500/20 relative overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                 <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Cortex AI Insight</span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                Gargalo em <span className="text-white italic">Corte Laser</span> impedindo 14% da OS-4250. Recomendamos priorizar a manutenção preditiva do bico #04.
              </p>
              <Button className="w-full mt-6 bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest h-10">
                 Agendar Manutenção
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Production & Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-12">
        <Card className="bg-[#111116] border-white/5 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 bg-white/[0.01]">
            <div>
              <CardTitle className="text-sm font-black text-white uppercase tracking-widest italic">Monitoramento em Tempo Real</CardTitle>
              <CardDescription className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Status do Chão de Fábrica</CardDescription>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
               <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
               <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest">Motor ao Vivo</span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {[
                { machine: 'Router CNC-01', status: 'Operando', operator: 'Marcos Silva', progress: 75, color: 'blue' },
                { machine: 'Laser Fiber-03', status: 'Em Espera', operator: 'Ana Julia', progress: 0, color: 'zinc' },
                { machine: 'Impressora UV-02', status: 'Operando', operator: 'Roberto Dias', progress: 45, color: 'emerald' },
                { machine: 'Termoformadora', status: 'Configuração', operator: 'Equipe Alpha', progress: 12, color: 'amber' },
              ].map((item, i) => (
                <div key={i} className="p-5 hover:bg-white/[0.02] transition-all flex items-center justify-between gap-6 group">
                  <div className="flex items-center gap-5 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-black border border-white/5 flex items-center justify-center group-hover:border-blue-500/30 transition-all">
                      <Zap size={20} className={cn(
                        "transition-colors",
                        item.status === 'Operando' ? "text-blue-500" : "text-zinc-600"
                      )} />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-black text-white tracking-tight italic uppercase">{item.machine}</h4>
                        <span className="text-[9px] tracking-[0.2em] text-zinc-500 uppercase font-black">{item.operator}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-white/5 h-1 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className={cn(
                              "h-full rounded-full",
                              item.color === 'blue' ? "bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" :
                              item.color === 'emerald' ? "bg-emerald-600 shadow-[0_0_8px_rgba(16,185,129,0.4)]" :
                              item.color === 'amber' ? "bg-amber-600 shadow-[0_0_8px_rgba(245,158,11,0.4)]" : "bg-zinc-800"
                            )}
                          />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-zinc-500 w-8 text-right tracking-tighter">{item.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="p-4 bg-white/[0.01] border-t border-white/5 flex justify-center">
            <Button variant="ghost" className="text-[10px] text-zinc-500 hover:text-white uppercase tracking-[0.2em] font-black h-8">
              Visão Geral da Fábrica <ArrowUpRight size={14} className="ml-2" />
            </Button>
          </div>
        </Card>

        <Card className="bg-[#111116] border-white/5 flex flex-col">
          <CardHeader className="border-b border-white/5 bg-white/[0.01]">
            <CardTitle className="text-sm font-black text-white uppercase tracking-widest italic">Alertas de Segurança & Logs</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4 group cursor-pointer p-3 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/5 transition-all">
                <div className="mt-1 w-2 h-2 rounded-full bg-rose-600 shadow-[0_0_10px_rgba(225,29,72,0.6)] shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">Estoque Crítico: LED Neon</p>
                    <span className="text-[9px] text-zinc-600 font-mono">14:24</span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">Suprimentos: Nível atingiu <span className="text-rose-500 font-bold">12m</span>. Ponto de pedido automático acionado.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group cursor-pointer p-3 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/5 transition-all">
                <div className="mt-1 w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.6)] shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">OS #4251 Priorizada</p>
                    <span className="text-[9px] text-zinc-600 font-mono">12:10</span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">PCP: Alocação movida para <span className="text-blue-400 font-bold">CNC-01</span> via sugestão Cortex IA.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group cursor-pointer p-3 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/5 transition-all opacity-60">
                <div className="mt-1 w-2 h-2 rounded-full bg-zinc-600 shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-white">Relatório Mensal Gerado</p>
                    <span className="text-[9px] text-zinc-600 font-mono">08:00</span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">Financeiro: Logs de faturamento de Abril disponíveis para download.</p>
                </div>
              </div>
            </div>

            <Separator className="bg-white/5" />
            
            <div className="mt-auto">
              <div className="bg-[#09090b] border border-white/5 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500">
                     <Users size={16} />
                   </div>
                   <div>
                     <p className="text-xs font-bold text-white uppercase tracking-tighter italic">Time em Operação</p>
                     <p className="text-[10px] text-zinc-500 font-black">24 Colaboradores Ativos</p>
                   </div>
                </div>
                <div className="flex -space-x-2">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-6 h-6 rounded-full border-2 border-[#09090b] bg-zinc-800" />
                   ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
