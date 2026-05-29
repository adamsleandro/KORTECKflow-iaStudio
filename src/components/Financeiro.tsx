import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  Filter, 
  Download, 
  Plus, 
  Search, 
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  DollarSign,
  Receipt,
  Building2,
  CreditCard,
  Target,
  ArrowLeft,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { BaseTable, Column } from './common/BaseTable';
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
import { cn } from '@/lib/utils';

// --- MOCK DATA ---
const REVENUE_EXPENSE_DATA = [
  { month: 'Jan', revenue: 145000, expenses: 102000, profit: 43000 },
  { month: 'Fev', revenue: 162000, expenses: 110000, profit: 52000 },
  { month: 'Mar', revenue: 158000, expenses: 125000, profit: 33000 },
  { month: 'Abr', revenue: 191000, expenses: 132000, profit: 59000 },
  { month: 'Mai', revenue: 175000, expenses: 118000, profit: 57000 },
  { month: 'Jun', revenue: 210000, expenses: 140000, profit: 70000 },
];

const CATEGORY_DATA = [
  { name: 'Matéria-Prima', value: 45, color: '#3b82f6' },
  { name: 'Folha de Pagamento', value: 30, color: '#10b981' },
  { name: 'Infraestrutura', value: 15, color: '#f59e0b' },
  { name: 'Marketing/Vendas', value: 10, color: '#ef4444' },
];

const PAYABLES_DATA = [
  { id: '1', description: 'Fornecedor de Alumínio ABC', value: 15400.00, dueDate: '2024-06-15', status: 'Pendente', category: 'MP' },
  { id: '2', description: 'Energia Elétrica RS', value: 3200.00, dueDate: '2024-06-12', status: 'Atrasado', category: 'Infra' },
  { id: '3', description: 'Impostos Federais', value: 22000.00, dueDate: '2024-06-20', status: 'Agendado', category: 'Tax' },
  { id: '4', description: 'Manutenção Router CNC', value: 1800.00, dueDate: '2024-06-14', status: 'Pago', category: 'Manut' },
  { id: '5', description: 'Folha Operacional', value: 68000.00, dueDate: '2024-06-30', status: 'Aguardando', category: 'RH' },
];

const RECEIVABLES_DATA = [
  { id: 'R1', client: 'Banco Itaú - Fachada', value: 45000.00, dueDate: '2024-06-18', status: 'Em Dia', method: 'Boleto' },
  { id: 'R2', client: 'Shopping Center Norte', value: 12000.00, dueDate: '2024-06-14', status: 'Atrasado', method: 'Pix' },
  { id: 'R3', client: 'Postos Shell Matriz', value: 35500.00, dueDate: '2024-06-22', status: 'Em Dia', method: 'Boleto' },
  { id: 'R4', client: 'Condomínio Alpha', value: 8900.00, dueDate: '2024-06-15', status: 'Pago', method: 'Cartão' },
];

export function Financeiro({ initialTab: propInitialTab }: { initialTab?: string }) {
  const [activeTab, setActiveTab] = useState(() => {
    if (propInitialTab === 'fin-pagar') return 'pagar';
    if (propInitialTab === 'fin-receber') return 'receber';
    if (propInitialTab === 'fin-fluxo') return 'fluxo';
    return 'visao';
  });

  const PAYABLE_COLUMNS: Column<any>[] = [
    {
      header: 'Descrição / Favorecido',
      accessorKey: 'description',
      cell: (item) => (
        <div className="flex flex-col">
          <span className="text-[11px] font-black text-white italic uppercase tracking-tight">{item.description}</span>
          <span className="text-[9px] text-zinc-600 font-mono tracking-tighter uppercase">{item.category}</span>
        </div>
      )
    },
    {
      header: 'Vencimento',
      accessorKey: 'dueDate',
      cell: (item) => (
        <span className="font-mono text-[10px] text-zinc-400">{new Date(item.dueDate).toLocaleDateString('pt-BR')}</span>
      )
    },
    {
      header: 'Valor',
      accessorKey: 'value',
      cell: (item) => (
        <span className="text-sm font-black text-white italic">R$ {item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
      )
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (item) => (
        <Badge className={cn(
          "text-[9px] font-black uppercase border-0",
          item.status === 'Pago' ? "bg-emerald-500/10 text-emerald-500" :
          item.status === 'Atrasado' ? "bg-rose-500/10 text-rose-500 animate-pulse" :
          item.status === 'Pendente' ? "bg-amber-500/10 text-amber-500" : "bg-zinc-800 text-zinc-500"
        )}>
          {item.status}
        </Badge>
      )
    }
  ];

  const RECEIVABLE_COLUMNS: Column<any>[] = [
    {
      header: 'Cliente / Projeto',
      accessorKey: 'client',
      cell: (item) => (
        <div className="flex flex-col">
          <span className="text-[11px] font-black text-white italic uppercase tracking-tight">{item.client}</span>
          <span className="text-[9px] text-zinc-600 font-mono tracking-tighter uppercase">{item.method}</span>
        </div>
      )
    },
    {
      header: 'Vencimento',
      accessorKey: 'dueDate',
      cell: (item) => (
        <span className="font-mono text-[10px] text-zinc-400">{new Date(item.dueDate).toLocaleDateString('pt-BR')}</span>
      )
    },
    {
      header: 'Valor',
      accessorKey: 'value',
      cell: (item) => (
        <span className="text-sm font-black text-blue-500 italic">R$ {item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
      )
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (item) => (
        <Badge className={cn(
          "text-[9px] font-black uppercase border-0",
          item.status === 'Pago' ? "bg-emerald-500/10 text-emerald-500" :
          item.status === 'Atrasado' ? "bg-rose-500/10 text-rose-500" : "bg-blue-500/10 text-blue-500"
        )}>
          {item.status}
        </Badge>
      )
    }
  ];

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-750 max-w-[1600px] mx-auto">
      {/* Header Financeiro */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.4em] text-blue-500 uppercase">
             FINANCIAL FLOW CONTROL [CORE-MESH]
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
            Financeiro <span className="text-blue-600">Corporativo</span>
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-4">
           <Button variant="outline" className="h-12 px-6 bg-white/5 border-white/5 text-zinc-400 hover:text-white font-black uppercase text-[10px] tracking-widest gap-2">
              <Download size={16} /> Relatórios DRE
           </Button>
           <Button className="bg-white text-black hover:bg-zinc-200 h-12 px-8 font-black uppercase text-[11px] tracking-widest shadow-[0_10px_20px_rgba(255,255,255,0.05)] transition-all gap-2">
              <Plus size={18} /> Novo Lançamento
           </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-transparent border-0 p-0 flex flex-wrap gap-2 w-full xl:w-auto overflow-x-auto scrollbar-hide">
          {[
            { id: 'visao', label: 'Visão Geral', icon: <BarChart3 size={14} /> },
            { id: 'pagar', label: 'Contas a Pagar', icon: <TrendingDown size={14} /> },
            { id: 'receber', label: 'Contas a Receber', icon: <TrendingUp size={14} /> },
            { id: 'fluxo', label: 'Fluxo de Caixa', icon: <Wallet size={14} /> },
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

        <TabsContent value="visao" className="space-y-8 mt-0 outline-none">
          {/* Main Financial Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: 'SALDO EM CONTA', val: 'R$ 382.450', detail: '+12% este mês', icon: <Wallet className="text-emerald-500" />, color: 'emerald' },
              { label: 'CONTAS A RECEBER', val: 'R$ 154.200', detail: 'Venc. próximos 7 dias', icon: <TrendingUp className="text-blue-500" />, color: 'blue' },
              { label: 'CONTAS A PAGAR', val: 'R$ 89.150', detail: '1 fatura atrasada', icon: <TrendingDown className="text-rose-500" />, color: 'rose' },
              { label: 'EBITDA PROJETADO', val: 'R$ 240.000', detail: 'Performance trimestral', icon: <Target className="text-amber-500" />, color: 'amber' },
            ].map((stat, i) => (
              <Card key={i} className="bg-[#0c0c10] border-white/5 relative overflow-hidden group">
                 <div className={cn("absolute top-0 right-0 w-32 h-32 blur-[60px] -mr-16 -mt-16 opacity-10", `bg-${stat.color}-500`)} />
                 <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                       <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                          {stat.icon}
                       </div>
                       <Badge variant="outline" className="text-[9px] font-black border-white/10 text-zinc-500">{stat.detail}</Badge>
                    </div>
                    <div className="space-y-1">
                       <h3 className="text-2xl font-black text-white italic tracking-tighter">{stat.val}</h3>
                       <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{stat.label}</p>
                    </div>
                 </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <Card className="lg:col-span-8 bg-[#0c0c10] border-white/5 overflow-hidden">
               <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 bg-white/[0.01]">
                  <div>
                     <CardTitle className="text-xs font-black text-white uppercase tracking-[0.2em] italic">Análise de Receita vs Despesa</CardTitle>
                     <CardDescription className="text-[9px] font-bold text-zinc-500 uppercase mt-1">Comparativo semestral consolidado</CardDescription>
                  </div>
                  <div className="flex gap-4">
                     <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /><span className="text-[9px] font-black text-zinc-400 uppercase">Receita</span></div>
                     <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-500" /><span className="text-[9px] font-black text-zinc-400 uppercase">Despesa</span></div>
                  </div>
               </CardHeader>
               <CardContent className="p-8 h-[400px] overflow-hidden relative min-h-[400px]">
                  <ResponsiveContainer width="99%" height="99%">
                     <AreaChart data={REVENUE_EXPENSE_DATA}>
                        <defs>
                           <linearGradient id="chartRevenue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis dataKey="month" stroke="#52525b" fontSize={10} axisLine={false} tickLine={false} />
                        <YAxis stroke="#52525b" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${v/1000}k`} />
                        <RechartsTooltip 
                           contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px' }}
                           itemStyle={{ fontSize: '10px', color: '#fff', fontWeight: 'bold' }}
                           labelStyle={{ fontSize: '10px', color: '#a1a1aa', textTransform: 'uppercase' }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#chartRevenue)" strokeWidth={3} />
                        <Area type="monotone" dataKey="expenses" stroke="#f43f5e" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
                     </AreaChart>
                  </ResponsiveContainer>
               </CardContent>
            </Card>

            <div className="lg:col-span-4 space-y-6">
              <Card className="bg-[#0c0c10] border-white/5">
                <CardHeader className="bg-white/[0.01] border-b border-white/5">
                   <CardTitle className="text-[10px] font-black text-white uppercase tracking-widest italic">Distribuição de Gastos</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                   <div className="h-[200px] w-full flex items-center justify-center relative">
                      <ResponsiveContainer width="100%" height="100%">
                         <RePieChart>
                            <Pie
                               data={CATEGORY_DATA}
                               cx="50%"
                               cy="50%"
                               innerRadius={60}
                               outerRadius={80}
                               paddingAngle={5}
                               dataKey="value"
                            >
                               {CATEGORY_DATA.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                               ))}
                            </Pie>
                            <RechartsTooltip />
                         </RePieChart>
                      </ResponsiveContainer>
                   </div>
                   <div className="space-y-4 mt-4">
                      {CATEGORY_DATA.map((item, i) => (
                        <div key={i} className="space-y-1.5">
                           <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                              <span>{item.name}</span>
                              <span className="text-white">{item.value}%</span>
                           </div>
                           <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                              <div className={cn("h-full", `bg-[${item.color}]`)} style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                           </div>
                        </div>
                     ))}
                   </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-600/10 to-teal-950/20 border-emerald-500/20 relative overflow-hidden group border-2">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[60px] opacity-20" />
                 <CardHeader>
                    <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black tracking-[0.3em] mb-2 uppercase">
                      <TrendingUp size={14} className="animate-bounce" /> Oportunidade Fiscal
                    </div>
                    <CardTitle className="text-base font-black text-white uppercase italic tracking-tighter leading-tight">Crédito Acumulado</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
                       Detectamos <span className="text-white">R$ 12.400,00</span> em créditos tributários passíveis de recuperação via compensação automática de insumos (MP).
                    </p>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest h-11 shadow-lg shadow-emerald-600/20">
                       Solicitar Compensação
                    </Button>
                 </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pagar" className="space-y-8 mt-0 outline-none">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0c0c10] border border-white/5 p-4 rounded-2xl">
              <div className="flex items-center gap-6">
                 <div>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Total em Aberto</p>
                    <p className="text-2xl font-black text-white italic tracking-tighter">R$ 108.600,00</p>
                 </div>
                 <div className="w-px h-10 bg-white/5" />
                 <div>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Pagos Hoje</p>
                    <p className="text-xl font-black text-emerald-500 italic tracking-tighter">R$ 4.250,00</p>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                    <Input className="bg-black/40 border-white/10 pl-9 h-10 w-64 text-[10px] text-white uppercase font-bold tracking-widest" placeholder="Pesquisar contas..." />
                 </div>
                 <Button variant="outline" className="h-10 px-4 border-white/10 text-white text-[9px] font-black uppercase">
                    <Filter size={14} className="mr-2" /> Filtros
                 </Button>
              </div>
           </div>

           <Card className="bg-[#0c0c10] border-white/5 overflow-hidden">
              <BaseTable 
                columns={PAYABLE_COLUMNS} 
                data={PAYABLES_DATA} 
                className="bg-transparent border-0"
              />
           </Card>
        </TabsContent>

        <TabsContent value="receber" className="space-y-8 mt-0 outline-none">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0c0c10] border border-white/5 p-4 rounded-2xl">
              <div className="flex items-center gap-6">
                 <div>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Previsão Recebimento</p>
                    <p className="text-2xl font-black text-blue-500 italic tracking-tighter">R$ 124.900,00</p>
                 </div>
                 <div className="w-px h-10 bg-white/5" />
                 <div>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Atrasados</p>
                    <p className="text-xl font-black text-rose-500 italic tracking-tighter">R$ 12.000,00</p>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <Button className="h-10 px-6 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest gap-2">
                    <Receipt size={14} /> Faturar Projetos
                 </Button>
              </div>
           </div>

           <Card className="bg-[#0c0c10] border-white/5 overflow-hidden">
              <BaseTable 
                columns={RECEIVABLE_COLUMNS} 
                data={RECEIVABLES_DATA} 
                className="bg-transparent border-0"
              />
           </Card>
        </TabsContent>

        <TabsContent value="fluxo" className="space-y-8 mt-0 outline-none">
           <Card className="bg-[#0c0c10] border-white/5">
              <CardHeader className="border-b border-white/5 bg-white/[0.01]">
                 <div className="flex items-center justify-between">
                    <div>
                       <CardTitle className="text-sm font-black text-white uppercase tracking-widest italic">Projeção Diária de Caixa</CardTitle>
                       <CardDescription className="text-[9px] font-bold text-zinc-500 uppercase mt-1">Estimativa de liquidez para os próximos 15 dias</CardDescription>
                    </div>
                    <Badge variant="outline" className="border-blue-500/20 text-blue-500 text-[9px] font-black uppercase">Modo Preditivo IA Ativo</Badge>
                 </div>
              </CardHeader>
              <CardContent className="p-8 h-[300px]">
                 <ResponsiveContainer width="99%" height="99%">
                    <BarChart data={[
                      { day: '11/06', flow: 382 },
                      { day: '12/06', flow: 379 },
                      { day: '13/06', flow: 385 },
                      { day: '14/06', flow: 373 },
                      { day: '15/06', flow: 358 },
                      { day: '16/06', flow: 360 },
                      { day: '17/06', flow: 405 },
                    ]}>
                       <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                       <XAxis dataKey="day" stroke="#52525b" fontSize={10} axisLine={false} tickLine={false} />
                       <YAxis stroke="#52525b" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}k`} />
                       <RechartsTooltip 
                          contentStyle={{ backgroundColor: '#09090b', border: '1px solid #ffffff10', borderRadius: '12px' }}
                          labelStyle={{ color: '#52525b', fontSize: '10px', textTransform: 'uppercase' }}
                       />
                       <Bar dataKey="flow" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40}>
                         {[0,1,2,3,4,5,6].map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={index === 6 ? '#10b981' : (index === 4 ? '#f43f5e' : '#3b82f6')} />
                         ))}
                       </Bar>
                    </BarChart>
                 </ResponsiveContainer>
              </CardContent>
           </Card>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-[#0c0c10] border-white/5 p-6 space-y-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                       <AlertCircle size={20} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-white uppercase italic">Alerta de Liquidez</p>
                       <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Gargalo previsto para 15/06</p>
                    </div>
                 </div>
                 <p className="text-xs text-zinc-400 leading-relaxed">
                    O vencimento da conta <span className="text-white">Impostos Federais (R$ 22k)</span> em conjunto com a folha operativa pode reduzir o saldo para patamares críticos. Recomendamos antecipar o faturamento do projeto <span className="text-blue-400 italic">Itaú-Fachada</span>.
                 </p>
                 <Button variant="outline" className="w-full text-[10px] font-black uppercase tracking-widest h-10 border-white/5 hover:bg-white/5">
                    Ver Simulação Completa
                 </Button>
              </Card>

              <Card className="bg-[#0c0c10] border-white/5 p-6 space-y-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                       <TrendingUp size={20} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-white uppercase italic">Ponto de Equilíbrio</p>
                       <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Análise de Break-even</p>
                    </div>
                 </div>
                 <div className="space-y-1">
                    <div className="flex justify-between items-end mb-1">
                       <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">R$ 135k (Meta)</span>
                       <span className="text-[11px] font-black text-white italic">R$ 142k (Alcançado)</span>
                    </div>
                    <Progress value={85} className="h-1.5 bg-white/5" />
                 </div>
                 <p className="text-[10px] text-zinc-500 italic">7% acima da meta de cobertura de custos fixos.</p>
              </Card>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
