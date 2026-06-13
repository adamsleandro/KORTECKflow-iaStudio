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
  TrendingDown, 
  Users, 
  Package, 
  ShoppingBag,
  Search,
  Bell,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/src/lib/ThemeContext';

const dataVendasMeta = [
  { name: 'Jan', vendas: 42000, meta: 38000 },
  { name: 'Fev', vendas: 39000, meta: 40000 },
  { name: 'Mar', vendas: 51000, meta: 42000 },
  { name: 'Abr', vendas: 47000, meta: 45000 },
  { name: 'Mai', vendas: 58000, meta: 48000 },
  { name: 'Jun', vendas: 64000, meta: 52000 },
  { name: 'Jul', vendas: 72000, meta: 55000 },
  { name: 'Ago', vendas: 69000, meta: 58000 }
];

const dataCanais = [
  { name: 'PDV Loja', value: 95, color: '#7c3aed' },
  { name: 'E-commerce', value: 75, color: '#f97316' },
  { name: 'WhatsApp', value: 60, color: '#7c3aed' },
  { name: 'Marketplace', value: 45, color: '#f97316' },
  { name: 'Atacado', value: 30, color: '#7c3aed' },
];

const dataCategoria = [
  { name: 'Comunicação Visual', value: 45, color: '#7c3aed' },
  { name: 'Totens e Displays', value: 25, color: '#f97316' },
  { name: 'Projetos Especiais', value: 15, color: '#3b82f6' },
  { name: 'Letra Caixa', value: 15, color: '#10b981' },
];

const dataPedidos = [
  { id: '#10482', cliente: 'Maria Silva', canal: 'PDV', status: 'Pago', statusColor: 'bg-emerald-100 text-emerald-600', valor: 'R$ 1.240,00' },
  { id: '#10483', cliente: 'João Pereira', canal: 'WhatsApp', status: 'Pendente', statusColor: 'bg-amber-100 text-amber-600', valor: 'R$ 850,00' },
  { id: '#10484', cliente: 'Tech Solutions LTDA', canal: 'B2B Atacado', status: 'Pago', statusColor: 'bg-emerald-100 text-emerald-600', valor: 'R$ 12.500,00' },
  { id: '#10485', cliente: 'Ana Costa', canal: 'E-commerce', status: 'Cancelado', statusColor: 'bg-rose-100 text-rose-600', valor: 'R$ 320,00' },
  { id: '#10486', cliente: 'Shopping Iguatemi', canal: 'Projetos', status: 'Pago', statusColor: 'bg-emerald-100 text-emerald-600', valor: 'R$ 45.000,00' },
];

export function Dashboard() {
  const { theme } = useTheme();
  const isLight = theme === 'ash-light';

  return (
    <div className={cn(
      "p-4 md:p-8 space-y-6 max-w-[1700px] mx-auto pb-24 font-sans animate-in fade-in duration-500",
      "text-zinc-900 dark:text-zinc-100"
    )}>
      {/* Header Aligned exactly with screenshot */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Visão geral
          </h1>
          <p className="text-[13px] text-zinc-500 font-medium mt-1">
            Acompanhe o desempenho comercial em tempo real
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text"
              placeholder="Buscar produtos, clientes, pedidos..."
              className={cn(
                "h-10 pl-10 pr-4 rounded-full text-xs font-medium w-[300px] outline-none transition-all",
                isLight ? "bg-zinc-100 placeholder:text-zinc-400 border-none focus:border-zinc-300" : "bg-zinc-900 placeholder:text-zinc-500 border-none"
              )}
            />
          </div>
          
          <button className="relative w-8 h-8 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orange-500" />
          </button>
          
          <Button className="h-10 px-5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs border-0 shadow-sm flex items-center gap-2">
            <Plus size={16} /> Nova venda
          </Button>

          <button className="w-10 h-10 rounded-full bg-purple-700 text-white font-bold text-xs flex items-center justify-center border-2 border-white dark:border-zinc-900 shadow-sm">
            A
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Card 1 */}
        <Card className={cn(
          "border-none shadow-sm rounded-2xl overflow-hidden",
          isLight ? "bg-white" : "bg-zinc-900"
        )}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide">Faturamento (Mês)</p>
                <div className="space-y-3">
                  <h3 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">R$ 487.230</h3>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100/60 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg text-[11px] font-bold">
                    <TrendingUp size={12} strokeWidth={3} />
                    12.4% vs. mês anterior
                  </div>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xl">
                $
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className={cn(
          "border-none shadow-sm rounded-2xl overflow-hidden",
          isLight ? "bg-white" : "bg-zinc-900"
        )}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide">Pedidos</p>
                <div className="space-y-3">
                  <h3 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">1.284</h3>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100/60 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg text-[11px] font-bold">
                    <TrendingUp size={12} strokeWidth={3} />
                    8.2% vs. mês anterior
                  </div>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-500/20 text-orange-500 dark:text-orange-400 flex items-center justify-center">
                <ShoppingBag size={20} strokeWidth={2.5} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className={cn(
          "border-none shadow-sm rounded-2xl overflow-hidden",
          isLight ? "bg-white" : "bg-zinc-900"
        )}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide">Novos Clientes</p>
                <div className="space-y-3">
                  <h3 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">312</h3>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-rose-100/60 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-lg text-[11px] font-bold">
                    <TrendingDown size={12} strokeWidth={3} />
                    2.1% vs. mês anterior
                  </div>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/20 text-blue-500 dark:text-blue-400 flex items-center justify-center">
                <Users size={20} strokeWidth={2.5} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 4 */}
        <Card className={cn(
          "border-none shadow-sm rounded-2xl overflow-hidden",
          isLight ? "bg-white" : "bg-zinc-900"
        )}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide">Itens em Estoque</p>
                <div className="space-y-3">
                  <h3 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">8.451</h3>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100/60 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg text-[11px] font-bold">
                    <TrendingUp size={12} strokeWidth={3} />
                    3.6% vs. mês anterior
                  </div>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 flex items-center justify-center">
                <Package size={20} strokeWidth={2.5} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vendas vs Meta */}
        <Card className={cn(
          "lg:col-span-2 border-none shadow-sm rounded-2xl overflow-hidden",
          isLight ? "bg-white" : "bg-zinc-900"
        )}>
          <CardHeader className="p-6 pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base font-bold text-zinc-900 dark:text-white">Vendas vs. Meta</CardTitle>
                <p className="text-[12px] text-zinc-500 mt-1">Últimos 8 meses</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-600" /> Vendas
                </div>
                <div className="flex items-center gap-2 text-[12px] font-medium text-zinc-600 dark:text-zinc-400">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Meta
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[320px] p-6 pt-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataVendasMeta} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isLight ? "#f4f4f5" : "#27272a"} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: isLight ? '#71717a' : '#a1a1aa' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: isLight ? '#71717a' : '#a1a1aa' }} tickFormatter={(val) => `${val/1000}k`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: isLight ? '#fff' : '#18181b', borderRadius: '8px', border: isLight ? '1px solid #e4e4e7' : '1px solid #27272a', fontSize: '13px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="vendas" stroke="#7c3aed" strokeWidth={3} fillOpacity={1} fill="url(#colorVendas)" />
                <Line type="monotone" dataKey="meta" stroke="#f97316" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Canais de venda */}
        <Card className={cn(
          "border-none shadow-sm rounded-2xl overflow-hidden",
          isLight ? "bg-white" : "bg-zinc-900"
        )}>
          <CardHeader className="p-6 pb-4">
            <CardTitle className="text-base font-bold text-zinc-900 dark:text-white">Canais de venda</CardTitle>
          </CardHeader>
          <CardContent className="h-[320px] p-6 flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataCanais} layout="vertical" barSize={32} margin={{ left: 10, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={isLight ? "#f4f4f5" : "#27272a"} />
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: isLight ? '#71717a' : '#a1a1aa' }} width={80} />
                  <RechartsTooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: isLight ? '1px solid #e4e4e7' : '1px solid #27272a', fontSize: '12px' }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {dataCanais.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Table and Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pedidos Recebtes */}
        <Card className={cn(
          "lg:col-span-2 border-none shadow-sm rounded-2xl overflow-hidden",
          isLight ? "bg-white" : "bg-zinc-900"
        )}>
          <CardHeader className="p-6 pb-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold text-zinc-900 dark:text-white">Pedidos recentes</CardTitle>
              <p className="text-[12px] text-zinc-500 mt-1">Últimas movimentações comerciais</p>
            </div>
            <a href="#" className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline">Ver todos →</a>
          </CardHeader>
          <CardContent className="p-0">
             <div className="w-full overflow-auto">
               <table className="w-full text-left border-collapse min-w-[600px]">
                 <thead>
                   <tr className={cn(
                     "border-b uppercase text-[11px] font-bold text-zinc-500 tracking-wider",
                     isLight ? "bg-zinc-50 border-zinc-100" : "bg-zinc-950/40 border-zinc-800"
                   )}>
                     <th className="py-3.5 px-6">Pedido</th>
                     <th className="py-3.5 px-6">Cliente</th>
                     <th className="py-3.5 px-6">Canal</th>
                     <th className="py-3.5 px-6">Status</th>
                     <th className="py-3.5 px-6 text-right">Valor</th>
                   </tr>
                 </thead>
                 <tbody className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
                   {dataPedidos.map((pedido, i) => (
                     <tr key={i} className={cn(
                       "border-b last:border-0 hover:bg-zinc-50/50 dark:hover:bg-zinc-950/20 transition-colors",
                       isLight ? "border-zinc-100" : "border-zinc-800"
                     )}>
                       <td className="py-4 px-6 text-purple-600 dark:text-purple-400 font-bold">{pedido.id}</td>
                       <td className="py-4 px-6 text-zinc-900 dark:text-zinc-100">{pedido.cliente}</td>
                       <td className="py-4 px-6 text-zinc-500">{pedido.canal}</td>
                       <td className="py-4 px-6">
                         <span className={cn("px-3 py-1 rounded-full text-[11px] font-bold", pedido.statusColor)}>
                           {pedido.status}
                         </span>
                       </td>
                       <td className="py-4 px-6 text-right font-bold text-zinc-900 dark:text-zinc-100">{pedido.valor}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </CardContent>
        </Card>

        {/* Por categoria */}
        <Card className={cn(
          "border-none shadow-sm rounded-2xl overflow-hidden",
          isLight ? "bg-white" : "bg-zinc-900"
        )}>
          <CardHeader className="p-6 pb-2">
            <CardTitle className="text-base font-bold text-zinc-900 dark:text-white">Por categoria</CardTitle>
          </CardHeader>
          <CardContent className="p-6 h-[280px] flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={dataCategoria}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {dataCategoria.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ borderRadius: '8px', border: isLight ? '1px solid #e4e4e7' : '1px solid #27272a', fontSize: '13px', fontWeight: 'bold' }} />
                </RePieChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}


