import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Factory, 
  Workflow, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Play, 
  Pause, 
  AlertCircle, 
  Maximize2, 
  Calendar as CalendarIcon, 
  Filter, 
  Plus,
  Zap,
  Activity,
  History,
  Settings2,
  Layers,
  ArrowRight,
  TrendingUp,
  Cpu,
  BarChart3,
  Search,
  MoreVertical,
  ChevronRight,
  GanttChartSquare,
  Package,
  Wrench
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart as RePieChart,
  Pie
} from 'recharts';

// --- MOCK DATA ---
interface OrderService {
  id: string;
  client: string;
  product: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'planning' | 'material' | 'production' | 'finishing' | 'quality' | 'delivered';
  progress: number;
  deadline: string;
  machine?: string;
  operator?: string;
  material?: string;
}

const OS_DATA: OrderService[] = [
  { id: 'OS-4251', client: 'Banco Itaú', product: 'Fachada ACM & Letra Caixa', priority: 'critical', status: 'production', progress: 65, deadline: 'Hoje', machine: 'Router CNC 01', operator: 'Felipe S.', material: 'ACM 3mm Silver' },
  { id: 'OS-4252', client: 'Restaurante Sabor', product: 'Cardápios & Luminoso', priority: 'medium', status: 'material', progress: 15, deadline: 'Amanhã', machine: 'Laser 02', operator: 'Carlos L.', material: 'Acrílico 2mm' },
  { id: 'OS-4253', client: 'Academia Fit', product: 'Adesivação Total', priority: 'high', status: 'planning', progress: 5, deadline: '12/05', material: 'Vinil Brilho' },
  { id: 'OS-4248', client: 'Tech Corp', product: 'Branding Industrial', priority: 'low', status: 'quality', progress: 95, deadline: 'Ontem', machine: 'Router CNC 01', operator: 'Felipe S.' },
  { id: 'OS-4255', client: 'Condomínio Alpha', product: 'Sinalização Interna', priority: 'medium', status: 'production', progress: 40, deadline: '15/05', machine: 'Impressora UV' },
];

const OEE_DATA = [
  { time: '08:00', oee: 82, availability: 95, performance: 88, quality: 98 },
  { time: '10:00', oee: 78, availability: 90, performance: 85, quality: 100 },
  { time: '12:00', oee: 45, availability: 50, performance: 90, quality: 99 },
  { time: '14:00', oee: 88, availability: 98, performance: 92, quality: 97 },
  { time: '16:00', oee: 92, availability: 99, performance: 94, quality: 98 },
  { time: '18:00', oee: 85, availability: 95, performance: 90, quality: 99 },
];

const MACHINE_LOAD = [
  { name: 'Router 01', load: 85, color: '#3b82f6' },
  { name: 'Laser 02', load: 42, color: '#10b981' },
  { name: 'UV Gel', load: 95, color: '#f59e0b' },
  { name: 'Dobradora', load: 20, color: '#ef4444' },
  { name: 'Serralheria', load: 65, color: '#8b5cf6' },
];

export function Production({ initialTab: propInitialTab }: { initialTab?: string }) {
  const [activeTab, setActiveTab] = useState(() => {
    if (propInitialTab === 'pcp-main' || propInitialTab === 'pcp-os') return 'pcp';
    if (propInitialTab === 'qual-exp' || propInitialTab === 'qual-retr') return 'qualidade';
    if (propInitialTab === 'prod-chao' || propInitialTab === 'prod-cnc' || propInitialTab === 'prod-imp') return 'chao';
    return 'chao';
  });

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-750 max-w-[1700px] mx-auto pb-24">
      {/* Mesh Industrial Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 border-b border-white/5 pb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
             <div className="p-2.5 bg-blue-600/10 rounded-xl border border-blue-500/20">
                <Cpu size={28} className="text-blue-500" />
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-[0.5em] text-zinc-500 uppercase italic">OPERATIONAL CORE // SHOP FLOOR</span>
                <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                  Chão de <span className="text-blue-600">Fábrica</span>
                </h1>
             </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
           <div className="hidden xl:flex items-center gap-8 px-8 border-r border-white/5 mr-3">
              <div className="text-right">
                 <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1 italic">OEE GLOBAL</p>
                 <p className="text-2xl font-black text-emerald-500 italic tracking-tighter">84.2%</p>
              </div>
              <div className="text-right">
                 <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1 italic">FILA PROD.</p>
                 <p className="text-2xl font-black text-white italic tracking-tighter">154 OS</p>
              </div>
           </div>
           
           <div className="flex gap-3">
              <Button variant="ghost" className="h-14 px-8 border-white/5 text-zinc-500 hover:text-white uppercase font-black text-[10px] tracking-widest">
                 <GanttChartSquare size={18} className="mr-3" /> Cronograma
              </Button>
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-500 font-black h-14 px-10 text-[11px] uppercase tracking-widest shadow-2xl shadow-blue-600/20 transition-all border-0"
              >
                <Plus className="mr-3" size={18} /> Nova OS
              </Button>
           </div>
        </div>
      </div>

      {/* Station Operational Status Banner - Fully Integrated (Non-floating) */}
      <div id="station-operational-status" className="bg-[#0c0c10] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col xl:flex-row items-center justify-between gap-8 shadow-2xl border-t-2 border-t-blue-500">
         <div className="flex items-center gap-5 w-full xl:w-auto">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-500 shadow-lg shadow-blue-500/5 relative shrink-0">
               <Workflow size={28} />
               <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-zinc-950 italic text-[8px] font-black text-black flex items-center justify-center">!</div>
            </div>
            <div>
               <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Status Operacional da Estação</p>
               <div className="flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-pulse" />
                  <span className="text-lg font-black text-white uppercase italic tracking-tight">Normal / <span className="text-emerald-500">Fluxo de Produção Estável</span></span>
               </div>
            </div>
         </div>
         
         <div className="grid grid-cols-3 gap-8 w-full xl:w-auto px-8 xl:border-x border-white/5 py-4 xl:py-0">
            <div className="text-center xl:text-left min-w-[100px]">
               <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1 italic">Jobs em Fila</p>
               <p className="text-3xl font-black text-white italic tracking-tighter">154</p>
            </div>
            <div className="text-center xl:text-left min-w-[100px] border-x border-white/5 xl:border-x-0 xl:px-4">
               <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1 italic">Setup Médio</p>
               <p className="text-3xl font-black text-blue-500 italic tracking-tighter">12m</p>
            </div>
            <div className="text-center xl:text-left min-w-[100px]">
               <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1 italic">Atrasos [OS]</p>
               <p className="text-3xl font-black text-rose-500 italic tracking-tighter">02</p>
            </div>
         </div>

         <div className="flex items-center gap-4 w-full xl:w-auto justify-end">
            <Button variant="outline" className="flex-1 xl:flex-none h-14 px-8 border-white/10 text-[11px] hover:bg-white/5 uppercase tracking-widest font-black text-zinc-300">Relatórios BI</Button>
            <Button className="flex-1 xl:flex-none h-14 bg-blue-600 hover:bg-blue-500 text-white font-black h-14 px-10 text-[11px] uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all border-0">Painel do Operador</Button>
         </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <TabsList className="bg-[#0c0c10] border border-white/5 p-1 h-auto lg:h-14 flex flex-wrap lg:flex-nowrap w-full xl:w-auto overflow-x-auto scrollbar-hide">
            {[
              { id: 'chao', label: 'CHÃO DE FÁBRICA', icon: <Activity size={14} /> },
              { id: 'pcp', label: 'PCP & ORDENAÇÃO', icon: <Layers size={14} /> },
              { id: 'maquinas', label: 'TELEMETRIA CNC', icon: <Zap size={14} /> },
              { id: 'qualidade', label: 'QUALIDADE & RNC', icon: <CheckCircle2 size={14} /> },
            ].map(tab => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id} 
                className="flex-1 data-[state=active]:bg-white/10 data-[state=active]:text-white text-zinc-500 text-[10px] font-black px-8 h-12 tracking-widest uppercase flex items-center justify-center gap-3 border-r border-white/5 last:border-0 rounded-none transition-all whitespace-nowrap"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="flex items-center flex-wrap gap-6 text-[10px] font-black tracking-widest text-zinc-600 uppercase bg-white/[0.01] px-6 py-3 rounded-xl border border-white/5">
             <div className="flex items-center gap-2 text-emerald-500"><div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" /> OPERANDO [08]</div>
             <div className="flex items-center gap-2 text-amber-500"><div className="w-2 h-2 rounded-full bg-amber-500" /> SETUP [02]</div>
             <div className="flex items-center gap-2 text-rose-500"><div className="w-2 h-2 rounded-full bg-rose-500" /> PARADA [01]</div>
          </div>
        </div>

        <TabsContent value="chao" className="space-y-8 mt-0 outline-none">
          {/* Shop Floor Active Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[
              { id: 'CNC-01', name: 'Router CNC 01', op: 'Felipe S.', status: 'operando', job: 'OS-4251', detail: 'Fachada ACM Itaú', prog: 78, time: '35m', tool: 'Fresadora 6mm' },
              { id: 'FIBER-01', name: 'Laser Fiber 01', op: 'Carlos L.', status: 'parada', job: '-', detail: 'Sensor de Fluxo Travado', prog: 0, time: '2h 15m', error: 'ALERTA TÉCNICO' },
              { id: 'UV-01', name: 'Impressora UV-Gel', op: 'Julia R.', status: 'operando', job: 'OS-4254', detail: 'Adesivos Poliméricos', prog: 32, time: '1h 10m', tool: 'CMYK+W' },
              { id: 'PRESS-01', name: 'Dobradora Hidraul.', op: 'Ricardo M.', status: 'setup', job: 'OS-4250', detail: 'Caixas Inox', prog: 92, time: '05m', tool: 'Matriz 12mm' },
              { id: 'SERR-01', name: 'Serralheria Industrial', op: 'Equipe A', status: 'operando', job: 'OS-4245', detail: 'Estrutura Treliçada', prog: 45, time: '5h', tool: 'Solda MIG' },
              { id: 'CNC-02', name: 'Router CNC 02', op: 'Marcos G.', status: 'operando', job: 'OS-4251', detail: 'Usinagem Interna', prog: 60, time: '40m', tool: 'Diamond Bit' },
            ].map((machine, i) => (
              <Card key={i} className="bg-[#0c0c10] border-white/5 hover:border-white/20 transition-all overflow-hidden relative group">
                <div className={cn(
                  "absolute top-0 left-0 w-full h-1.5",
                  machine.status === 'operando' ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]" : 
                  machine.status === 'setup' ? "bg-amber-500" : "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]"
                )} />
                <CardHeader className="pb-4 pt-8 px-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1">MÁC. ID: {machine.id}</span>
                       <CardTitle className="text-xl font-black text-white uppercase italic tracking-tighter">{machine.name}</CardTitle>
                    </div>
                    <div className="flex gap-2">
                       <Button size="icon" variant="ghost" className="h-10 w-10 text-zinc-500 hover:text-white bg-white/5 border border-white/5">
                          {machine.status === 'operando' ? <Pause size={18} className="text-amber-500" /> : <Play size={18} className="text-emerald-500" />}
                       </Button>
                       <Button size="icon" variant="ghost" className="h-10 w-10 text-zinc-500 hover:text-white bg-white/5 border border-white/5">
                          <Maximize2 size={18} />
                       </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 px-6 pb-6">
                  {machine.status === 'parada' ? (
                    <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-2xl space-y-3">
                       <div className="flex items-center gap-3 text-rose-500 text-[11px] font-black uppercase tracking-widest">
                          <AlertCircle size={18} /> {machine.error}
                       </div>
                       <p className="text-[12px] text-zinc-400 font-bold italic uppercase">{machine.detail}</p>
                       <Button className="w-full bg-rose-600 hover:bg-rose-500 text-white h-11 text-[10px] font-black uppercase tracking-widest mt-4">CHAMAR MANUTENÇÃO</Button>
                    </div>
                  ) : (
                    <div className="p-5 bg-black/40 rounded-2xl border border-white/5 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-blue-500" />
                             <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Carga Atual</p>
                          </div>
                          <p className={cn("text-base font-black italic uppercase", machine.job === '-' ? "text-zinc-800" : "text-white")}>{machine.job} <span className="text-zinc-600 mx-2">|</span> {machine.detail}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-[11px] font-black text-zinc-500">
                          <span className="uppercase italic tracking-widest">{machine.tool || 'PADRÃO'}</span>
                          <span className="text-white italic">{machine.prog}% COMPLETADO</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                           <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${machine.prog}%` }}
                              className="h-full bg-blue-600 relative"
                           >
                              <div className="absolute top-0 right-0 h-full w-4 bg-white/20 blur-sm" />
                           </motion.div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-6 border-t border-white/5 pt-6">
                    <div className="space-y-1.5">
                      <p className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Responsável</p>
                      <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-[9px] font-black text-white uppercase italic">
                            {machine.op.split(' ').map(n => n[0]).join('')}
                         </div>
                         <p className="text-[12px] text-zinc-400 font-black uppercase italic tracking-tight">{machine.op}</p>
                      </div>
                    </div>
                    <div className="space-y-1.5 text-right">
                       <p className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Tempo Restante</p>
                       <div className="flex items-center justify-end gap-2 text-zinc-400">
                          <Clock size={12} className="text-blue-500" />
                          <p className="text-[12px] font-black uppercase italic tracking-widest">{machine.time}</p>
                       </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* OEE Analytics & Efficiency */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
             <Card className="lg:col-span-8 bg-[#0c0c10] border-white/5 overflow-hidden">
                <CardHeader className="bg-white/[0.01] border-b border-white/5 py-8 px-10">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-1">
                         <div className="flex items-center gap-2 text-blue-500 text-[10px] font-black tracking-widest uppercase">
                            <Activity size={14} /> Telemetria Industrial
                         </div>
                         <CardTitle className="text-xl font-black text-white uppercase tracking-[0.1em] italic">Eficiência de Equipamento [OEE]</CardTitle>
                      </div>
                      <div className="flex items-center gap-6">
                         {[
                           { label: 'DISPONIB.', val: '92%', color: 'blue' },
                           { label: 'PERFORM.', val: '88%', color: 'emerald' },
                           { label: 'QUALIDADE', val: '98%', color: 'amber' },
                         ].map((item, i) => (
                           <div key={i} className="text-right">
                              <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">{item.label}</p>
                              <p className={cn("text-xl font-black italic", `text-${item.color}-500`)}>{item.val}</p>
                           </div>
                         ))}
                      </div>
                   </div>
                </CardHeader>
                <CardContent className="p-10 h-[400px]">
                   <ResponsiveContainer width="99%" height="99%">
                      <AreaChart data={OEE_DATA}>
                         <defs>
                            <linearGradient id="oeeGrad" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                               <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                         </defs>
                         <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                         <XAxis dataKey="time" stroke="#333" fontSize={10} axisLine={false} tickLine={false} />
                         <YAxis stroke="#333" fontSize={10} axisLine={false} tickLine={false} />
                         <RechartsTooltip 
                           contentStyle={{ backgroundColor: '#09090b', border: '1px solid #ffffff10', borderRadius: '16px' }}
                           itemStyle={{ fontSize: '11px', color: '#fff', fontWeight: '900', textTransform: 'uppercase' }}
                         />
                         <Area type="monotone" dataKey="oee" stroke="#3b82f6" fillOpacity={1} fill="url(#oeeGrad)" strokeWidth={4} />
                      </AreaChart>
                   </ResponsiveContainer>
                </CardContent>
             </Card>

             <Card className="lg:col-span-4 bg-[#0c0c10] border-white/5 flex flex-col">
                <CardHeader className="bg-white/[0.01] border-b border-white/5 py-8 px-10">
                   <CardTitle className="text-sm font-black text-white uppercase tracking-widest italic">Carga dos Recursos</CardTitle>
                </CardHeader>
                <CardContent className="p-10 flex-1 flex flex-col justify-between">
                   <div className="space-y-8">
                      {MACHINE_LOAD.map((m, i) => (
                        <div key={i} className="space-y-3">
                           <div className="flex justify-between items-center text-[10px] font-black uppercase italic tracking-[0.2em] text-zinc-500">
                              <span className="text-white">{m.name}</span>
                              <span className="text-zinc-400">{m.load}% OCUPADO</span>
                           </div>
                           <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                              <motion.div 
                                 initial={{ width: 0 }}
                                 animate={{ width: `${m.load}%` }}
                                 className="h-full"
                                 style={{ backgroundColor: m.color }}
                              />
                           </div>
                        </div>
                      ))}
                   </div>
                   <div className="pt-10">
                      <Button variant="outline" className="w-full h-14 bg-white/5 border-white/10 text-zinc-400 text-[11px] font-black uppercase tracking-widest hover:text-white hover:bg-white/10 group">
                         <Workflow size={16} className="mr-2 group-hover:rotate-180 transition-transform duration-500" /> 
                         Otimizar Escalonamento [IA]
                      </Button>
                   </div>
                </CardContent>
             </Card>
          </div>
        </TabsContent>

        <TabsContent value="pcp" className="space-y-8 mt-0 outline-none">
           {/* Sequencing Board */}
           <Card className="bg-[#0c0c10] border-white/5 overflow-hidden">
              <CardHeader className="bg-white/[0.01] border-b border-white/5 py-8 px-10 flex flex-row items-center justify-between">
                 <div className="space-y-1">
                    <CardTitle className="text-lg font-black text-white uppercase tracking-widest italic leading-none">Fila Global de Produção [PCP]</CardTitle>
                    <p className="text-[11px] font-bold text-zinc-600 uppercase">Sequenciamento LIFO/FIFO automatizado por prioridade</p>
                 </div>
                 <div className="flex gap-4">
                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                       <Input className="bg-black/40 border-white/10 pl-10 h-11 w-72 text-[10px] text-white font-black uppercase tracking-widest" placeholder="BUSCAR OS / CLIENTE..." />
                    </div>
                    <Button variant="outline" className="h-11 px-6 border-white/10 text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                       <Filter size={16} className="mr-2" /> Filtros
                    </Button>
                 </div>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                 <Table>
                    <TableHeader className="bg-white/[0.01]">
                       <TableRow className="border-white/5 hover:bg-transparent">
                          <TableHead className="w-[150px] text-[10px] font-black text-zinc-600 uppercase tracking-widest pl-10">ID / SEQUÊNCIA</TableHead>
                          <TableHead className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">CLIENTE & PROJETO</TableHead>
                          <TableHead className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">MAQUINÁRIO</TableHead>
                          <TableHead className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">MATÉRIA-PRIMA</TableHead>
                          <TableHead className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">PRIORIDADE</TableHead>
                          <TableHead className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">PRAZO [ESTIM.]</TableHead>
                          <TableHead className="text-[10px] font-black text-zinc-600 uppercase tracking-widest text-right pr-10">AÇÕES</TableHead>
                       </TableRow>
                    </TableHeader>
                    <TableBody>
                       {OS_DATA.map((os, i) => (
                          <TableRow key={os.id} className="border-white/5 hover:bg-white/[0.02] group cursor-pointer h-20">
                             <TableCell className="pl-10">
                                <div className="flex items-center gap-3">
                                   <div className="w-7 h-7 rounded bg-zinc-900 border border-white/5 flex items-center justify-center text-[10px] font-black text-zinc-700 underline decoration-blue-500 underline-offset-4 tracking-tighter">#{String(i+1).padStart(2, '0')}</div>
                                   <span className="text-sm font-black text-white italic">{os.id}</span>
                                </div>
                             </TableCell>
                             <TableCell>
                                <div className="flex flex-col">
                                   <span className="text-[12px] font-black text-white uppercase italic tracking-tight">{os.client}</span>
                                   <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight">{os.product}</span>
                                </div>
                             </TableCell>
                             <TableCell>
                                <Badge variant="outline" className={cn(
                                   "bg-transparent border-white/10 text-zinc-400 text-[9px] font-black uppercase italic tracking-widest h-6 px-3",
                                   os.machine && "border-blue-500/30 text-blue-400 bg-blue-500/5"
                                )}>
                                   {os.machine || "AGUARDANDO RECURSO"}
                                </Badge>
                             </TableCell>
                             <TableCell>
                                <div className="flex items-center gap-2">
                                   <Package size={12} className={os.material ? "text-emerald-500" : "text-zinc-600"} />
                                   <span className={cn("text-[10px] font-bold uppercase italic", os.material ? "text-zinc-300" : "text-zinc-700")}>{os.material || "SEM ESTOQUE"}</span>
                                </div>
                             </TableCell>
                             <TableCell>
                                <Badge className={cn(
                                   "text-[9px] font-black uppercase border-0 px-3",
                                   os.priority === 'critical' ? "bg-rose-600 text-white animate-pulse" :
                                   os.priority === 'high' ? "bg-amber-600 text-white" :
                                   "bg-blue-600/20 text-blue-400"
                                )}>
                                   {os.priority}
                                </Badge>
                             </TableCell>
                             <TableCell>
                                <div className="flex flex-col">
                                   <span className={cn("text-[11px] font-black uppercase italic", os.deadline === 'Hoje' || os.deadline === 'Ontem' ? "text-rose-500" : "text-blue-500")}>{os.deadline}</span>
                                   <span className="text-[9px] text-zinc-700 font-mono">EST: 14:00H</span>
                                </div>
                             </TableCell>
                             <TableCell className="text-right pr-10">
                                <div className="flex items-center justify-end gap-2">
                                   <Button size="icon" variant="ghost" className="h-9 w-9 text-zinc-600 hover:text-white transition-all"><Settings2 size={16} /></Button>
                                   <Button size="icon" variant="ghost" className="h-9 w-9 text-zinc-600 hover:text-white transition-all"><MoreVertical size={16} /></Button>
                                </div>
                             </TableCell>
                          </TableRow>
                       ))}
                    </TableBody>
                 </Table>
              </CardContent>
           </Card>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'META DIÁRIA', val: '45 jobs', color: 'blue' },
                { label: 'META SEMANAL', val: '210 jobs', color: 'emerald' },
                { label: 'META MENSAL', val: '800 jobs', color: 'amber' },
              ].map((stat, i) => (
                <Card key={i} className="bg-[#0c0c10] border-white/5 p-8 flex flex-col items-center justify-center space-y-3">
                   <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">{stat.label}</p>
                   <p className={cn("text-4xl font-black italic tracking-tighter transition-all", `text-${stat.color}-500/80`)}>{stat.val}</p>
                </Card>
              ))}
           </div>
        </TabsContent>

        <TabsContent value="maquinas" className="outline-none space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Router CNC 01', type: 'Usinagem Pesada', status: 'optimal', uptime: '98.2%', temp: '42°C', load: 85 },
                { name: 'Laser Fiber 01', type: 'Corte Precisão', status: 'warning', uptime: '72.5%', temp: '68°C', load: 0 },
                { name: 'Impressora UV', type: 'Impressão Industrial', status: 'optimal', uptime: '95.8%', temp: '28°C', load: 95 },
                { name: 'Dobradora CNC', type: 'Conformação', status: 'optimal', uptime: '99.1%', temp: '34°C', load: 20 },
              ].map((m, i) => (
                <Card key={i} className="bg-[#0c0c10] border-white/5 p-8 hover:border-white/20 transition-all border-2 border-transparent">
                   <div className="flex justify-between items-start mb-6">
                      <div className={cn("p-4 rounded-2xl bg-white/5", m.status === 'optimal' ? "text-emerald-500" : "text-rose-500")}>
                         <Zap size={24} />
                      </div>
                      <Badge variant="outline" className={cn("text-[9px] font-black border-0 uppercase px-3 italic", m.status === 'optimal' ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500")}>
                         {m.status === 'optimal' ? 'SISTEMA OK' : 'ALERTA TÉCNICO'}
                      </Badge>
                   </div>
                   <div className="space-y-1 mb-8">
                      <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">{m.name}</h3>
                      <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest">{m.type}</p>
                   </div>
                   <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-white/5 pt-6">
                      <div className="space-y-1">
                         <p className="text-[9px] font-black text-zinc-700 uppercase">Uptime</p>
                         <p className="text-sm font-black text-white italic">{m.uptime}</p>
                      </div>
                      <div className="space-y-1 text-right">
                         <p className="text-[9px] font-black text-zinc-700 uppercase">T. Core</p>
                         <p className={cn("text-sm font-black italic", Number(m.temp.replace('°C', '')) > 60 ? "text-rose-500" : "text-white")}>{m.temp}</p>
                      </div>
                   </div>
                   <Button variant="ghost" className="w-full mt-8 h-12 text-[10px] font-black uppercase tracking-widest border border-white/5 hover:bg-white/5">Abrir Painel Técnico</Button>
                </Card>
              ))}
           </div>
        </TabsContent>

        <TabsContent value="qualidade" className="outline-none space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <Card className="bg-[#0c0c10] border-white/5 overflow-hidden">
                  <CardHeader className="bg-white/[0.01] border-b border-white/5 py-8 px-10">
                     <CardTitle className="text-sm font-black text-white uppercase tracking-widest italic">Controle de Saída & QA Final</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                     <Table>
                        <TableBody>
                           {[
                             { os: 'OS-4248', client: 'Tech Corp', inspector: 'Sueli R.', status: 'Aprovado', date: 'Hoje' },
                             { os: 'OS-4242', client: 'Banco Bradesco', inspector: 'Sueli R.', status: 'Pendente', date: 'Hoje' },
                             { os: 'OS-4239', client: 'Postos Shell', inspector: 'Felipe S.', status: 'Reprovado', date: 'Ontem' },
                           ].map((item, i) => (
                              <TableRow key={i} className="border-white/5 h-20 hover:bg-white/[0.01]">
                                 <TableCell className="pl-10 font-black text-white italic">{item.os}</TableCell>
                                 <TableCell className="text-[11px] font-bold text-zinc-500 uppercase tracking-tight">{item.client}</TableCell>
                                 <TableCell className="text-[10px] font-black text-zinc-600 uppercase italic">{item.inspector}</TableCell>
                                 <TableCell className="text-right pr-10">
                                    <Badge variant="outline" className={cn(
                                       "text-[10px] font-black uppercase border-0 px-4 py-1",
                                       item.status === 'Aprovado' ? "bg-emerald-500/10 text-emerald-500" : 
                                       item.status === 'Reprovado' ? "bg-rose-500/10 text-rose-500 italic" : "bg-zinc-800 text-zinc-500"
                                    )}>
                                       {item.status}
                                    </Badge>
                                 </TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </CardContent>
               </Card>

               <Card className="bg-rose-950/10 border-rose-500/20 overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity"><AlertTriangle size={80} className="text-rose-500" /></div>
                  <CardHeader className="bg-rose-500/5 border-b border-rose-500/10 py-8 px-10">
                     <CardTitle className="text-sm font-black text-rose-500 uppercase italic tracking-tighter">Gestão de R.N.C. [Retrabalho]</CardTitle>
                  </CardHeader>
                  <CardContent className="p-10 space-y-8">
                     <div className="flex items-center gap-6 p-6 bg-black/40 rounded-3xl border border-rose-500/20 relative overflow-hidden">
                        <div className="w-14 h-14 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-500 border border-rose-500/30">
                           <Wrench size={28} />
                        </div>
                        <div className="flex-1">
                           <div className="flex justify-between items-center mb-1">
                              <h4 className="text-base font-black text-white uppercase italic tracking-tight">OS-4235 | FALHA DE POLIMERIZAÇÃO</h4>
                              <span className="text-[9px] font-black bg-rose-600 text-white px-2 py-0.5 rounded italic">PERDA TOTAL</span>
                           </div>
                           <p className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest leading-relaxed">Operador identificou bolhas na laminação do vinil industrial. Causa provável: Umidade.</p>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-6">
                        <Card className="bg-white/[0.02] border-white/5 p-6 space-y-4">
                           <div className="flex justify-between items-center text-[10px] font-black text-zinc-700 uppercase">
                              <span>Custo de Perda</span>
                              <span className="text-rose-500">R$ 1.150,00</span>
                           </div>
                           <Button variant="outline" className="w-full text-zinc-400 border-white/10 text-[9px] font-black uppercase tracking-widest h-10 hover:bg-white/5">Ver RNC Completo</Button>
                        </Card>
                        <Card className="bg-white/[0.02] border-white/5 p-6 space-y-4 text-center flex flex-col items-center justify-center">
                           <Button className="w-full bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest h-12 shadow-lg shadow-rose-600/20">REFAZER JOB [AUTO]</Button>
                        </Card>
                     </div>
                  </CardContent>
               </Card>
            </div>
        </TabsContent>
      </Tabs>


    </div>
  );
}
