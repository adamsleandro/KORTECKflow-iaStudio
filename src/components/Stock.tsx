import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  Database, 
  Trash2, 
  Scissors, 
  Search, 
  Filter, 
  Plus, 
  AlertTriangle,
  Info,
  Maximize2,
  Minimize2,
  Box,
  Truck,
  History,
  TrendingDown,
  Sparkles,
  Layers,
  ArrowRight,
  TrendingUp,
  Scale,
  ClipboardList,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BaseTable, Column } from './common/BaseTable';

interface StockItem {
  id: string;
  name: string;
  category: string;
  current: number;
  min: number;
  unit: string;
  cost: string;
  status: 'ok' | 'low' | 'critical';
}

interface ScrapItem {
  id: string;
  material: string;
  size: string; // Dimensões: 1200x800mm
  color: string;
  thickness: string;
  location: string;
  addedAt: string;
}

const STOCK_DATA: StockItem[] = [
  { id: 'MP-001', name: 'ACM Prata 3mm', category: 'Chapas', current: 15, min: 20, unit: 'un', cost: 'R$ 280,00', status: 'low' },
  { id: 'MP-005', name: 'Acrílico Cristal 5mm', category: 'Chapas', current: 4, min: 10, unit: 'un', cost: 'R$ 420,00', status: 'critical' },
  { id: 'MP-012', name: 'LED Neon Branco Frio', category: 'Elétrica', current: 150, min: 100, unit: 'm', cost: 'R$ 12,00', status: 'ok' },
  { id: 'MP-008', name: 'PVC Expandido 10mm', category: 'Chapas', current: 45, min: 30, unit: 'un', cost: 'R$ 190,00', status: 'ok' },
];

const SCRAP_DATA: ScrapItem[] = [
  { id: 'RET-452', material: 'ACM Prata', size: '1500 x 600 mm', color: 'Prata', thickness: '3mm', location: 'Rack A1', addedAt: '2 dias' },
  { id: 'RET-455', material: 'Acrílico Vermelho', size: '400 x 400 mm', color: 'Vermelho', thickness: '5mm', location: 'Gaveta B', addedAt: '5h' },
  { id: 'RET-456', material: 'PVC Expandido', size: '800 x 1200 mm', color: 'Branco', thickness: '10mm', location: 'Rack C2', addedAt: '12 dias' },
];

const SUPPLIERS_DATA = [
  { id: 'F01', name: 'Alumínio & Cia', contact: 'Marcos Oliveira', phone: '(11) 4455-6677', category: 'Chapas', rating: 4.8 },
  { id: 'F02', name: 'Acrílicos do Brasil', contact: 'Sueli Lima', phone: '(11) 3322-1100', category: 'Chapas', rating: 4.5 },
  { id: 'F03', name: 'Leds Global', contact: 'Ricardo Stein', phone: '(11) 98877-6655', category: 'Elétrica', rating: 4.9 },
  { id: 'F04', name: 'Tintas & Vinis Premium', contact: 'Ana Clara', phone: '(11) 2233-4455', category: 'Impressão', rating: 4.2 },
];

export function Stock({ initialTab: propInitialTab }: { initialTab?: string }) {
  const [activeTab, setActiveTab] = React.useState(() => {
    if (propInitialTab === 'sup-forn') return 'fornecedores';
    if (propInitialTab === 'sup-lista') return 'lista';
    if (propInitialTab === 'scraps') return 'scraps';
    return 'inventory';
  });

  const STOCK_COLUMNS: Column<StockItem>[] = [
    {
      header: 'Identificação Material',
      accessorKey: 'name',
      sortable: true,
      cell: (item) => (
        <div className="flex flex-col">
          <span className="text-[11px] font-black text-white uppercase italic tracking-tight">{item.name}</span>
          <span className="text-[9px] font-bold text-zinc-600 font-mono tracking-widest">{item.id}</span>
        </div>
      )
    },
    {
      header: 'Segmento',
      accessorKey: 'category',
      sortable: true,
      cell: (item) => (
        <Badge variant="outline" className="bg-white/5 border-0 text-[9px] font-black uppercase text-zinc-500 tracking-widest">
           {item.category}
        </Badge>
      )
    },
    {
      header: 'Disponibilidade Real',
      accessorKey: 'current',
      sortable: true,
      cell: (item) => (
        <div className="flex flex-col gap-2 w-48 font-mono">
           <div className="flex justify-between items-center text-[9px] font-black italic uppercase">
              <span className="text-white">{item.current} / {item.min * 2} {item.unit}</span>
              <span className={cn(
                 "ml-2 px-1.5 py-0.5 rounded-sm",
                 item.status === 'ok' ? "bg-emerald-500/10 text-emerald-500" : 
                 item.status === 'low' ? "bg-amber-500/10 text-amber-500" : "bg-rose-500/10 text-rose-500 animate-pulse"
              )}>{item.status.toUpperCase()}</span>
           </div>
           <Progress value={(item.current / (item.min * 2)) * 100} className="h-1 bg-white/5" />
        </div>
      )
    },
    {
      header: 'Markup Sugerido',
      accessorKey: 'cost',
      sortable: true,
      cell: (item) => <span className="text-xs font-mono font-black text-emerald-500/80 italic">{item.cost}</span>
    }
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-750 max-w-[1700px] mx-auto pb-24">
      {/* Industrial Stock Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 border-b border-transparent pb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
             <div className="p-2.5 bg-emerald-600/10 rounded-xl border border-emerald-500/20">
                <Package size={28} className="text-emerald-500" />
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-[0.5em] text-zinc-500 uppercase">SUPPLY CHAIN // HUB-INDUSTRIAL</span>
                <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                  Gestão de <span className="text-emerald-500">Insumos</span> <span className="text-zinc-700 italic">&</span> Materiais
                </h1>
             </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
           <div className="hidden lg:flex items-center gap-8 px-8 border-r border-transparent mr-3">
              <div className="text-right">
                 <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">VALOR ATIVO</p>
                 <p className="text-xl font-black text-white italic tracking-tighter">R$ 452.8k</p>
              </div>
              <div className="text-right">
                 <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">RUPTURA</p>
                 <p className="text-xl font-black text-rose-500 italic tracking-tighter">08 ITEMS</p>
              </div>
           </div>
           
           <div className="flex items-center gap-2">
              <Button variant="outline" className="h-14 px-6 bg-white/5 border-transparent text-zinc-400 hover:text-white font-black uppercase text-[10px] tracking-widest gap-2">
                 <History size={16} /> Movimentações
              </Button>
              <Button className="bg-emerald-600 text-white hover:bg-emerald-500 h-14 px-8 font-black uppercase text-[11px] tracking-widest shadow-sm shadow-emerald-600/10 transition-all gap-2">
                 <Plus size={18} /> Entrada de Nota
              </Button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Valor em Estoque', value: 'R$ 452.8k', trend: 'Auditado hoje', icon: <Database className="text-emerald-500" />, color: 'emerald' },
          { label: 'Materiais Críticos', value: '08 UM', trend: 'Reposição urgente', icon: <AlertTriangle className="text-rose-500" />, color: 'rose' },
          { label: 'Aproveitamento (Retalhos)', value: '18%', trend: '+4% este mês', icon: <Scissors className="text-amber-500" />, color: 'amber' },
          { label: 'Pedidos Compra', value: '12', trend: '4 em trânsito', icon: <Truck className="text-blue-500" />, color: 'blue' },
        ].map((kpi, i) => (
          <Card key={i} className="bg-white dark:bg-zinc-900 border-transparent group hover:border-transparent transition-all relative overflow-hidden">
            <div className={cn("absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-10 -mr-16 -mt-16", `bg-${kpi.color}-500`)} />
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{kpi.label}</p>
                <h3 className="text-2xl font-black text-white italic tracking-tighter">{kpi.value}</h3>
                <p className="text-[9px] text-zinc-500 font-bold uppercase leading-none">{kpi.trend}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/[0.02] border-none flex items-center justify-center group-hover:scale-110 transition-transform">{kpi.icon}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-transparent border-0 p-0 flex flex-wrap gap-2 w-full xl:w-auto overflow-x-auto scrollbar-hide">
          {[
            { id: 'inventory', label: 'Estoque Ativo', icon: <Box size={14} /> },
            { id: 'fornecedores', label: 'Fornecedores', icon: <Truck size={14} /> },
            { id: 'lista', label: 'Catálogo Global', icon: <ClipboardList size={14} /> },
            { id: 'scraps', label: 'Gestão de Retalhos', icon: <Scissors size={14} />, promo: true },
          ].map(tab => (
            <TabsTrigger 
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-zinc-400 bg-zinc-900/60 hover:bg-zinc-800/80 hover:text-zinc-200 border-none/85 data-[state=active]:border-blue-500 text-xs font-semibold px-5 h-11 rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-2.5 cursor-pointer shadow-sm relative"
            >
              {tab.icon} {tab.label}
              {tab.promo && <Badge className="bg-amber-500 text-amber-950 border-0 text-[8px] font-black h-4 px-1 ml-1.5">PRO</Badge>}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="inventory" className="mt-0 outline-none space-y-6">
           <BaseTable 
              data={STOCK_DATA}
              columns={STOCK_COLUMNS}
              className="bg-white dark:bg-zinc-900 border-none rounded-2xl overflow-hidden"
              searchPlaceholder="Localizar insumo no estoque industrial..."
              onRowClick={(item) => console.log('Selected:', item.id)}
           />
        </TabsContent>

        <TabsContent value="fornecedores" className="mt-0 outline-none space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SUPPLIERS_DATA.map((forn) => (
                <Card key={forn.id} className="bg-white dark:bg-zinc-900 border-transparent hover:border-emerald-500/30 transition-all group relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                   <CardHeader className="p-6 pb-2">
                      <div className="flex justify-between items-start mb-4">
                         <div className="w-12 h-12 rounded-xl bg-white/[0.02] border-none flex items-center justify-center text-zinc-500 group-hover:text-emerald-500 transition-colors">
                            <Truck size={22} />
                         </div>
                         <Badge className="bg-emerald-600/10 text-emerald-500 border-0 text-[10px] font-black">{forn.rating} ★</Badge>
                      </div>
                      <CardTitle className="text-lg font-black text-white uppercase italic tracking-tighter">{forn.name}</CardTitle>
                   </CardHeader>
                   <CardContent className="p-6 pt-2 space-y-6">
                      <div className="space-y-1">
                         <p className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Gestor de Conta</p>
                         <p className="text-sm font-bold text-zinc-400 uppercase italic tracking-tight">{forn.contact}</p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-transparent">
                         <div className="space-y-1">
                            <p className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Especialidade</p>
                            <p className="text-[11px] font-black text-emerald-500 uppercase italic">{forn.category}</p>
                         </div>
                         <Button size="icon" variant="ghost" className="h-10 w-10 text-zinc-600 hover:text-white hover:bg-white/5">
                            <ArrowRight size={16} />
                         </Button>
                      </div>
                   </CardContent>
                </Card>
              ))}
           </div>
        </TabsContent>

        <TabsContent value="lista" className="mt-0 outline-none">
           <Card className="bg-white dark:bg-zinc-900 border-transparent p-20 text-center flex flex-col items-center justify-center rounded-3xl border-dashed border-2">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-zinc-800 mb-8 border-none shadow-sm">
                 <Package size={40} />
              </div>
              <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4">Master Index Industrial</h3>
              <p className="text-sm text-zinc-500 max-w-lg mx-auto leading-relaxed font-medium">
                Acesso centralizado a todo o portfólio de fornecedores e materiais pré-aprovados pela engenharia.
                Sincronização forçada com banco de dados de markup v3.2.
              </p>
              <Button className="mt-10 bg-white text-black font-black uppercase text-[11px] tracking-widest h-14 px-12 transition-all hover:scale-105 active:scale-95">
                 Explorar Catálogo Global
              </Button>
           </Card>
        </TabsContent>

        <TabsContent value="scraps" className="mt-0 outline-none space-y-8">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SCRAP_DATA.map((scrap, i) => (
                      <Card key={i} className="bg-white dark:bg-zinc-900 border-transparent group hover:border-amber-500/20 transition-all overflow-hidden cursor-pointer relative">
                         <div className="absolute top-0 right-0 px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex gap-2">
                               <button className="p-1.5 bg-white/5 rounded-md text-zinc-400 hover:text-white"><Maximize2 size={14} /></button>
                               <button className="p-1.5 bg-rose-500/10 rounded-md text-rose-500 hover:bg-rose-500 hover:text-white"><Trash2 size={14} /></button>
                            </div>
                         </div>
                         <CardHeader className="p-6 pb-4">
                            <Badge className="bg-amber-500 text-amber-950 border-0 text-[9px] font-black italic mb-3 w-fit tracking-widest">{scrap.id}</Badge>
                            <CardTitle className="text-xl font-black text-white uppercase italic tracking-tighter">{scrap.material}</CardTitle>
                         </CardHeader>
                         <CardContent className="p-6 pt-0 space-y-6">
                            <div className="p-5 bg-white/[0.02] border-none rounded-2xl">
                               <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest mb-2 block italic">Área Remanescente</span>
                               <span className="text-2xl font-black text-white italic tracking-tighter">{scrap.size}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                               <div className="space-y-1">
                                  <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Espessura</span>
                                  <p className="text-xs font-bold text-zinc-400 italic">{scrap.thickness}</p>
                               </div>
                               <div className="space-y-1 text-right">
                                  <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Rack Destino</span>
                                  <p className="text-xs font-black text-amber-500 italic uppercase">{scrap.location}</p>
                               </div>
                            </div>

                            <div className="pt-6 border-t border-transparent flex items-center justify-between">
                               <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest italic">{scrap.addedAt} em quarentena</span>
                               <Button className="h-10 bg-white text-black hover:bg-zinc-200 text-[10px] font-black uppercase tracking-widest px-6 italic">Reservar</Button>
                            </div>
                         </CardContent>
                      </Card>
                    ))}

                    <button className="group border-2 border-dashed border-transparent rounded-3xl p-10 flex flex-col items-center justify-center gap-6 hover:border-amber-500/20 transition-all hover:bg-amber-500/[0.02]">
                       <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-zinc-700 group-hover:text-amber-500 group-hover:scale-110 transition-all duration-300">
                          <Plus size={32} />
                       </div>
                       <div className="text-center space-y-1">
                          <p className="text-sm font-black text-zinc-500 uppercase tracking-widest group-hover:text-white transition-colors">Digitalizar Retalho</p>
                          <p className="text-[10px] text-zinc-700 italic font-medium uppercase tracking-tight">Novas dimensões pós-corte CNC</p>
                       </div>
                    </button>
                 </div>
              </div>

              <div className="lg:col-span-4 space-y-8">
                 <Card className="bg-white dark:bg-zinc-900 border-transparent overflow-hidden relative p-10 space-y-8">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 blur-[80px] -mr-24 -mt-24 rounded-full" />
                    
                    <div className="space-y-2 relative">
                       <div className="flex items-center gap-2 text-amber-500 text-[10px] font-black tracking-[0.3em] uppercase">
                          <Sparkles size={16} className="animate-pulse" /> IA Nesting Predictor
                       </div>
                       <CardTitle className="text-2xl text-white italic tracking-tighter uppercase font-black">Match de Sobras</CardTitle>
                    </div>

                    <div className="space-y-6 relative">
                       {[
                         { os: 'OS-4256', target: 'RET-452', material: 'ACM PRATA (3mm)', saving: 'R$ 540,20', desc: 'Sobra exata para 4 letras-caixa Banco Itaú.' },
                         { os: 'OS-4258', target: 'RET-456', material: 'PVC W-FOAM (10mm)', saving: 'R$ 180,00', desc: 'Ideal para base de reforço totem interno.' },
                       ].map((match, i) => (
                         <div key={i} className="p-6 bg-white/[0.02] border-none rounded-2xl space-y-4 hover:border-amber-500/30 transition-colors group">
                            <div className="flex items-center justify-between">
                               <Badge className="bg-blue-600/20 text-blue-400 border-0 text-[9px] font-black italic tracking-widest">{match.os}</Badge>
                               <ChevronRight size={14} className="text-zinc-700 group-hover:translate-x-1 transition-transform" />
                               <Badge className="bg-amber-600/20 text-amber-400 border-0 text-[10px] font-black italic tracking-widest">{match.target}</Badge>
                            </div>
                            <p className="text-[11px] font-bold text-zinc-400 leading-relaxed uppercase tracking-tighter italic">
                               {match.desc}
                            </p>
                            <div className="flex items-center justify-between pt-2 border-t border-transparent">
                               <div className="flex items-center gap-2">
                                  <TrendingDown size={14} className="text-emerald-500" />
                                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest italic">{match.saving}</span>
                               </div>
                               <button className="text-[10px] font-black text-amber-500 hover:text-white uppercase tracking-widest underline underline-offset-4 decoration-amber-500/30">Vincular</button>
                            </div>
                         </div>
                       ))}

                       <Button className="w-full bg-amber-500 text-amber-950 hover:bg-amber-400 font-black text-[11px] tracking-widest h-14 shadow-sm shadow-amber-500/10">
                          RELATÓRIO DE SUSTENTABILIDADE
                       </Button>
                    </div>
                 </Card>

                 <Card className="bg-white dark:bg-zinc-900 border-transparent p-10 space-y-6">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-white/[0.02] border-none flex items-center justify-center text-zinc-600">
                          <Scale size={20} />
                       </div>
                       <div className="space-y-0.5">
                          <h4 className="text-[10px] font-black text-white uppercase italic tracking-widest">Cubagem de Sucata</h4>
                          <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.1em]">Resíduos acumulados / Junho</p>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <div className="space-y-2">
                          <div className="flex justify-between text-[9px] font-black text-zinc-500 uppercase italic">
                             <span>Alumínio Reciclável</span>
                             <span className="text-white">450kg</span>
                          </div>
                          <Progress value={65} className="h-1 bg-white/5" />
                       </div>
                       <Button variant="ghost" className="w-full text-[9px] font-black uppercase text-zinc-600 hover:text-white tracking-widest">Coleta Agendada para 12/06</Button>
                    </div>
                 </Card>
              </div>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
