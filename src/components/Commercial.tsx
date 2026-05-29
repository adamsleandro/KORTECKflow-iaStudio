import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, 
  TrendingUp, 
  Users, 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical,
  ChevronRight,
  DollarSign,
  Clock,
  Briefcase,
  Layers,
  ArrowUpRight,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  Zap,
  Star,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
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
  Cell
} from 'recharts';
import { cn } from '@/lib/utils';
import { BaseTable, Column } from './common/BaseTable';

// --- MOCK DATA ---
const PIPELINE_DATA = [
  { 
    id: 'lead', 
    title: 'Lead Qualificado', 
    count: 12, 
    value: 450000, 
    deals: [
      { id: 'D1', client: 'Hospital Israelita', project: 'Sinalização Bloco B', value: 125000, days: 3, probability: 40 },
      { id: 'D2', client: 'Loggi Matriz', project: 'Letreiro Fachada', value: 45000, days: 1, probability: 60 }
    ]
  },
  { 
    id: 'proposal', 
    title: 'Proposta Enviada', 
    count: 5, 
    value: 820000, 
    deals: [
      { id: 'D3', client: 'Santander', project: 'Rebranding Agências SP', value: 580000, days: 12, probability: 75 }
    ]
  },
  { 
    id: 'negotiation', 
    title: 'Em Negociação', 
    count: 3, 
    value: 125000, 
    deals: [
      { id: 'D4', client: 'Mercado Livre', project: 'Displays PDV', value: 85000, days: 22, probability: 90 }
    ]
  },
  { 
    id: 'closing', 
    title: 'Fechamento', 
    count: 2, 
    value: 35000, 
    deals: [
      { id: 'D5', client: 'Ponto Frio', project: 'Painel LED Interno', value: 35000, days: 5, probability: 95 }
    ]
  },
];

const SALES_PERFORMANCE = [
  { name: 'Ricardo S.', sales: 1200000, goal: 1000000, leads: 45, conversion: 22 },
  { name: 'Ana Paula', sales: 950000, goal: 1000000, leads: 38, conversion: 18 },
  { name: 'Felipe M.', sales: 450000, goal: 800000, leads: 52, conversion: 12 },
];

const REVENUE_ESTIMATE = [
  { month: 'Jan', val: 850000 },
  { month: 'Fev', val: 920000 },
  { month: 'Mar', val: 880000 },
  { month: 'Abr', val: 1100000 },
  { month: 'Mai', val: 950000 },
  { month: 'Jun', val: 1250000 },
];

export function Commercial({ initialTab: propInitialTab }: { initialTab?: string }) {
  const [activeTab, setActiveTab] = useState(() => {
    if (propInitialTab === 'crm-pipe') return 'pipeline';
    if (propInitialTab === 'op-vendas') return 'vendedores';
    if (propInitialTab === 'com-leads') return 'leads';
    return 'pipeline';
  });

  const CLIENTS_COLUMNS: Column<any>[] = [
    {
      header: 'Cliente / Empresa',
      accessorKey: 'name',
      cell: (item) => (
        <div className="flex flex-col">
          <span className="text-[11px] font-black text-white italic uppercase tracking-tight">{item.name}</span>
          <span className="text-[9px] text-zinc-600 font-mono tracking-tighter uppercase">{item.segment}</span>
        </div>
      )
    },
    {
      header: 'LTV Total',
      accessorKey: 'ltv',
      cell: (item) => (
        <span className="text-sm font-black text-white italic">R$ {item.ltv.toLocaleString('pt-BR')}</span>
      )
    },
    {
      header: 'Último Contato',
      accessorKey: 'lastContact',
      cell: (item) => (
        <span className="text-[10px] text-zinc-500 font-bold uppercase">{item.lastContact}</span>
      )
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (item) => (
        <Badge className="bg-blue-500/10 text-blue-500 border-0 text-[8px] font-black uppercase">Fiel/Ativo</Badge>
      )
    }
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-750 max-w-[1600px] mx-auto pb-24">
      {/* Mesh Commercial Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="p-2.5 bg-blue-600/10 rounded-xl border border-blue-500/20">
                <Target size={28} className="text-blue-500" />
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-[0.5em] text-zinc-500 uppercase">COMMERCIAL INTELLIGENCE // MESH-CORE</span>
                <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                  Pipeline <span className="text-blue-600">&</span> Comercial
                </h1>
             </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
           <div className="hidden xl:flex items-center gap-10 px-8 border-r border-white/5 mr-3">
              <div className="text-right">
                 <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">FUNIL TOTAL</p>
                 <p className="text-2xl font-black text-white italic tracking-tighter">R$ 4.2M</p>
              </div>
              <div className="text-right">
                 <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">CONVERSÃO MENSAL</p>
                 <div className="flex items-center gap-2 justify-end">
                    <TrendingUp size={14} className="text-emerald-500" />
                    <p className="text-2xl font-black text-emerald-500 italic">22%</p>
                 </div>
              </div>
           </div>
           <Button className="bg-white text-black hover:bg-zinc-200 h-14 px-8 font-black uppercase text-[11px] tracking-widest gap-3 shadow-xl shadow-white/5 transition-all">
              <Plus size={18} /> Novo Lead / Oportunidade
           </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-transparent border-0 p-0 flex flex-wrap gap-2 w-full xl:w-auto overflow-x-auto scrollbar-hide">
          {[
            { id: 'pipeline', label: 'Funil de Vendas', icon: <Layers size={14} /> },
            { id: 'vendedores', label: 'Equipe de Vendas', icon: <Star size={14} /> },
            { id: 'leads', label: 'Base de Clientes', icon: <Users size={14} /> },
            { id: 'analytics', label: 'Análises & Previsões', icon: <TrendingUp size={14} /> },
          ].map(tab => (
            <TabsTrigger 
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-zinc-400 bg-zinc-900/60 hover:bg-zinc-800/80 hover:text-zinc-200 border border-zinc-800/85 data-[state=active]:border-blue-500 text-xs font-semibold px-5 h-11 rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-2.5 cursor-pointer shadow-sm"
            >
              {tab.icon} {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="pipeline" className="mt-0 outline-none">
           {/* Industrial Kanban Board */}
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {PIPELINE_DATA.map((column) => (
                <div key={column.id} className="space-y-4">
                   <div className="flex items-center justify-between px-2">
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-blue-500" />
                         <h3 className="text-[11px] font-black text-white uppercase tracking-widest italic">{column.title}</h3>
                      </div>
                      <Badge variant="outline" className="text-[9px] border-white/10 text-zinc-500 font-black">{column.count}</Badge>
                   </div>
                   
                   <div className="bg-zinc-950/40 border border-white/5 rounded-2xl p-3 min-h-[600px] space-y-4">
                      {column.deals.map((deal) => (
                        <Card key={deal.id} className="bg-white/[0.02] border-white/5 hover:border-blue-500/30 transition-all cursor-grab active:cursor-grabbing group overflow-hidden">
                           <CardContent className="p-4 space-y-4">
                              <div className="space-y-1">
                                 <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{deal.id}</span>
                                    <Badge className="bg-blue-600/10 text-blue-500 border-0 text-[8px] font-black italic">{deal.probability}%</Badge>
                                 </div>
                                 <h4 className="text-sm font-black text-white uppercase italic tracking-tighter leading-tight group-hover:text-blue-400 transition-colors">{deal.client}</h4>
                                 <p className="text-[10px] font-bold text-zinc-500 uppercase">{deal.project}</p>
                              </div>

                              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                 <div className="space-y-1">
                                    <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Valor</p>
                                    <p className="text-sm font-black text-emerald-500 italic tracking-tighter">R$ {deal.value.toLocaleString()}</p>
                                 </div>
                                 <div className="text-right space-y-1">
                                    <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Lead Time</p>
                                    <div className="flex items-center gap-1.5 justify-end text-zinc-400">
                                       <Clock size={10} className="text-blue-500" />
                                       <p className="text-[10px] font-black italic">{deal.days}d</p>
                                    </div>
                                 </div>
                              </div>

                              <div className="flex gap-1.5 pt-2">
                                 <div className="w-6 h-6 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500"><Phone size={10} /></div>
                                 <div className="w-6 h-6 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500"><Mail size={10} /></div>
                                 <div className="w-6 h-6 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500"><MessageSquare size={10} /></div>
                                 <div className="ml-auto flex -space-x-2">
                                    <div className="w-6 h-6 rounded-full border-2 border-zinc-950 bg-blue-600 flex items-center justify-center text-[8px] font-black text-white">RS</div>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                      ))}
                      
                      <Button variant="ghost" className="w-full border-2 border-dashed border-white/5 hover:border-white/10 hover:bg-white/[0.02] h-12 text-[9px] font-black uppercase text-zinc-600 tracking-widest">
                         + Arrastar Item ou Adicionar
                      </Button>
                   </div>

                   <div className="flex justify-between px-2 pt-2 border-t border-white/5">
                      <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Subtotal</span>
                      <span className="text-[11px] font-black text-white italic tracking-tighter px-2 bg-white/5 rounded">R$ {column.value.toLocaleString()}</span>
                   </div>
                </div>
              ))}
           </div>
        </TabsContent>

        <TabsContent value="vendedores" className="mt-0 outline-none">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {SALES_PERFORMANCE.map((v, i) => (
                <Card key={i} className={cn(
                  "bg-[#0c0c10] border-white/5 relative overflow-hidden group",
                  i === 0 && "border-blue-500/20 shadow-[0_0_40px_rgba(37,99,235,0.05)]"
                )}>
                   <div className="absolute top-0 right-0 p-8 opacity-5"><Zap size={80} /></div>
                   <CardHeader className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                         <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-black text-white italic shadow-inner">
                            {v.name.split(' ').map(n => n[0]).join('')}
                         </div>
                         <div>
                            <div className="flex items-center gap-2 mb-1">
                               <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">{v.name}</h3>
                               {i === 0 && <Badge className="bg-amber-500/20 text-amber-500 border-0 text-[8px] font-black">MVP</Badge>}
                            </div>
                            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Executivo de Contas Senior</p>
                         </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pb-6 border-b border-white/5">
                         <div>
                            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">Vendas Acum.</p>
                            <p className="text-xl font-black text-white italic tracking-tighter">R$ {(v.sales/1000).toFixed(0)}k</p>
                         </div>
                         <div className="text-right">
                            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">Meta Batida</p>
                            <p className={cn(
                               "text-xl font-black italic tracking-tighter",
                               v.sales >= v.goal ? "text-emerald-500" : "text-rose-500"
                            )}>{((v.sales/v.goal)*100).toFixed(0)}%</p>
                         </div>
                      </div>
                   </CardHeader>
                   <CardContent className="p-8 space-y-6">
                      <div className="space-y-4">
                         <div className="flex justify-between items-end">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Performance Lead Gen</p>
                            <span className="text-[11px] font-black text-white italic">{v.leads} LEADS</span>
                         </div>
                         <Progress value={v.conversion * 3} className="h-2 bg-white/5" />
                         <div className="flex justify-between text-[9px] font-black text-zinc-700 uppercase tracking-widest">
                            <span>Conversão: {v.conversion}%</span>
                            <span className="text-blue-500 underline underline-offset-4 cursor-pointer">Ver Relatório Detalhado</span>
                         </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 pt-4">
                         <Button variant="outline" className="h-11 border-white/10 text-zinc-400 text-[10px] font-black uppercase hover:text-white">Ver Agenda</Button>
                         <Button className="h-11 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase">Comissionar</Button>
                      </div>
                   </CardContent>
                </Card>
              ))}
           </div>
        </TabsContent>

        <TabsContent value="leads" className="mt-0 outline-none space-y-8">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0c0c10] border border-white/5 p-4 rounded-2xl">
              <div className="flex items-center gap-6">
                 <div>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Base Consolidada</p>
                    <p className="text-2xl font-black text-white italic tracking-tighter">1.248 Clientes</p>
                 </div>
                 <div className="w-px h-10 bg-white/5" />
                 <div>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Novos Lead (30d)</p>
                    <p className="text-xl font-black text-blue-500 italic tracking-tighter">+52</p>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                    <Input className="bg-black/40 border-white/10 pl-10 h-11 w-64 text-[10px] text-white font-black uppercase tracking-widest" placeholder="Pesquisar clientes..." />
                 </div>
                 <Button variant="outline" className="h-11 px-4 border-white/10 text-white text-[10px] font-black uppercase">
                    <Filter size={16} className="mr-2" /> Segmentos
                 </Button>
              </div>
           </div>

           <Card className="bg-[#0c0c10] border-white/5 overflow-hidden">
              <BaseTable 
                columns={CLIENTS_COLUMNS} 
                data={[
                  { id: '1', name: 'Banco Itaú Unibanco', segment: 'Bancário / Finanças', ltv: 1250000, lastContact: '2 dias atrás' },
                  { id: '2', name: 'Shopping Center Norte', segment: 'Varejo / Shopping', ltv: 450000, lastContact: 'Hoje' },
                  { id: '3', name: 'Hospital Albert Einstein', segment: 'Saúde / Hospitalar', ltv: 890000, lastContact: '1 semana atrás' },
                  { id: '4', name: 'Loggi Tecnologia', segment: 'Logística / Tech', ltv: 215000, lastContact: '3 dias atrás' },
                ]} 
                className="bg-transparent border-0"
              />
           </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-0 outline-none space-y-8">
           <Card className="bg-[#0c0c10] border-white/5 overflow-hidden">
              <CardHeader className="bg-white/[0.01] border-b border-white/5 py-8 px-10">
                 <div className="flex justify-between items-center">
                    <div>
                       <CardTitle className="text-[11px] font-black text-white uppercase tracking-widest italic">Previsão de Receita (Sales Forecast)</CardTitle>
                       <CardDescription className="text-[9px] font-bold text-zinc-500 uppercase mt-1">Baseado no volume de propostas em negociação vs taxa histórica</CardDescription>
                    </div>
                    <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[9px] font-black uppercase italic">Trendway: Positivo +15%</Badge>
                 </div>
              </CardHeader>
              <CardContent className="p-10 h-[400px]">
                 <ResponsiveContainer width="99%" height="99%">
                    <AreaChart data={REVENUE_ESTIMATE}>
                       <defs>
                          <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                             <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" stroke="#ffffff03" vertical={false} />
                       <XAxis dataKey="month" stroke="#3f3f46" fontSize={10} axisLine={false} tickLine={false} />
                       <YAxis stroke="#3f3f46" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${v/1000}k`} />
                       <RechartsTooltip 
                          contentStyle={{ backgroundColor: '#09090b', border: '1px solid #18181b', borderRadius: '12px' }}
                          labelStyle={{ color: '#52525b', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}
                          itemStyle={{ fontSize: '11px', color: '#fff', fontWeight: '900' }}
                       />
                       <Area type="monotone" dataKey="val" stroke="#3b82f6" fillOpacity={1} fill="url(#salesGrad)" strokeWidth={4} />
                    </AreaChart>
                 </ResponsiveContainer>
              </CardContent>
           </Card>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-[#0c0c10] border-white/5 p-8 flex flex-col items-center justify-center space-y-4 text-center">
                 <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                    <Briefcase size={32} />
                 </div>
                 <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Ticket Médio Industrial</h3>
                 <p className="text-3xl font-black text-white italic tracking-tighter">R$ 55.400,00</p>
                 <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">+12% comparado ao trimestre anterior</p>
              </Card>

              <Card className="bg-[#0c0c10] border-white/5 p-8 flex flex-col items-center justify-center space-y-4 text-center">
                 <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
                    <Clock size={32} />
                 </div>
                 <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Ciclo de Vendas</h3>
                 <p className="text-3xl font-black text-white italic tracking-tighter">42 Dias</p>
                 <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Foco em redução para 35 dias (Mesh Goal)</p>
              </Card>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
