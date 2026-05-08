import React, { useState } from 'react';
import { motion } from 'motion/react';
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
  ArrowRight
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

export function Stock() {
  const [activeTab, setActiveTab] = useState('inventory');

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-zinc-500 mb-2 uppercase">
            <Package size={14} /> SUPRIMENTOS & LOGÍSTICA
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white uppercase tracking-tighter">Inventário Industrial</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
            <Input className="pl-10 h-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-emerald-500 transition-all font-medium" placeholder="Buscar material..." />
          </div>
          <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-white h-10">
            <History size={16} className="mr-2" /> Movimentação
          </Button>
          <Button className="bg-emerald-600 text-white hover:bg-emerald-500 h-10 font-bold px-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <Plus size={16} className="mr-2" /> Entrada
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Valor em Estoque', value: 'R$ 452.8k', trend: 'Auditado hoje', icon: <Database className="text-emerald-500" /> },
          { label: 'Materiais Críticos', value: '08', trend: 'Reposição urgente', icon: <AlertTriangle className="text-rose-500" /> },
          { label: 'Aproveitamento (Retalhos)', value: '18%', trend: '+4% este mês', icon: <Scissors className="text-amber-500" /> },
          { label: 'Pedidos Compra', value: '12', trend: '4 em trânsito', icon: <Truck className="text-blue-500" /> },
        ].map((kpi, i) => (
          <Card key={i} className="bg-white/[0.02] border-white/5 group hover:border-white/10 transition-all">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">{kpi.label}</p>
                <h3 className="text-xl font-bold text-white tracking-tight">{kpi.value}</h3>
                <p className="text-[9px] text-zinc-500 font-medium mt-1 uppercase leading-none">{kpi.trend}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">{kpi.icon}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="inventory" onValueChange={setActiveTab} className="bg-transparent">
        <TabsList className="bg-white/5 border border-white/10 p-1 mb-8">
          <TabsTrigger value="inventory" className="data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400 text-xs font-bold px-8 h-8 tracking-widest uppercase">Matéria-Prima</TabsTrigger>
          <TabsTrigger value="scraps" className="data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400 text-xs font-bold px-8 h-8 tracking-widest uppercase items-center gap-2">
             Controle de Retalhos <Badge className="h-3.5 px-1 bg-amber-500 text-[8px] border-0 text-amber-950 font-black">PRO</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="mt-0 space-y-6">
          <Card className="bg-white/[0.02] border-white/5">
             <Table>
                <TableHeader className="bg-white/[0.01]">
                   <TableRow className="border-white/5">
                      <TableHead className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Material</TableHead>
                      <TableHead className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-center">Categoria</TableHead>
                      <TableHead className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-center">Atual</TableHead>
                      <TableHead className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Estágio</TableHead>
                      <TableHead className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">Custo Un.</TableHead>
                      <TableHead className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">Ação</TableHead>
                   </TableRow>
                </TableHeader>
                <TableBody>
                   {STOCK_DATA.map(item => (
                     <TableRow key={item.id} className="border-white/5 hover:bg-white/[0.02] group">
                        <TableCell>
                           <div className="flex flex-col">
                              <span className="text-sm font-bold text-white uppercase tracking-tight">{item.name}</span>
                              <span className="text-[10px] font-bold text-zinc-600">{item.id}</span>
                           </div>
                        </TableCell>
                        <TableCell className="text-center">
                           <Badge variant="outline" className="bg-white/5 border-0 text-[10px] font-medium text-zinc-400">{item.category}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                           <div className="flex flex-col">
                              <span className="text-sm font-black text-white">{item.current} {item.unit}</span>
                              <span className="text-[10px] text-zinc-500 font-bold uppercase">Mín: {item.min}</span>
                           </div>
                        </TableCell>
                        <TableCell className="w-[150px]">
                            <div className="flex flex-col gap-1.5">
                                <Progress value={(item.current/item.min) * 50} className={cn(
                                   "h-1 bg-white/5",
                                   (item.current < item.min) ? "bg-rose-500/20" : ""
                                )} />
                                <Badge className={cn(
                                   "text-[8px] font-black w-fit border-0 px-1.5 h-3.5",
                                   item.status === 'ok' ? "bg-emerald-500 text-emerald-950" :
                                   item.status === 'low' ? "bg-amber-500 text-amber-950" : "bg-rose-500 text-white"
                                )}>
                                   {item.status.toUpperCase()}
                                </Badge>
                            </div>
                        </TableCell>
                        <TableCell className="text-right font-bold text-zinc-300 text-xs">{item.cost}</TableCell>
                        <TableCell className="text-right">
                           <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-600 hover:text-white"><Maximize2 size={14} /></Button>
                        </TableCell>
                     </TableRow>
                   ))}
                </TableBody>
             </Table>
          </Card>
        </TabsContent>

        <TabsContent value="scraps" className="mt-0 space-y-8">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SCRAP_DATA.map((scrap, i) => (
                      <Card key={i} className="bg-zinc-950 border-white/5 group hover:border-amber-500/30 transition-all overflow-hidden cursor-pointer">
                         <CardHeader className="p-4 flex flex-row items-start justify-between pb-2">
                            <div>
                               <Badge className="bg-amber-500 text-amber-950 border-0 text-[10px] font-black mb-2">{scrap.id}</Badge>
                               <CardTitle className="text-sm font-bold text-white uppercase tracking-wider">{scrap.material}</CardTitle>
                            </div>
                            <div className="flex gap-1">
                               <button className="p-1 text-zinc-700 hover:text-white"><Maximize2 size={12} /></button>
                               <button className="p-1 text-rose-800 hover:text-rose-500"><Trash2 size={12} /></button>
                            </div>
                         </CardHeader>
                         <CardContent className="p-4 pt-0">
                            <div className="space-y-3">
                               <div className="flex flex-col p-2 bg-white/[0.02] border border-white/5 rounded-md">
                                  <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">Dimensões Reais</span>
                                  <span className="text-lg font-black text-white italic tracking-tighter">{scrap.size}</span>
                               </div>

                               <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-1">
                                     <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest leading-none">Espessura</span>
                                     <p className="text-xs font-bold text-zinc-400">{scrap.thickness}</p>
                                  </div>
                                  <div className="space-y-1 text-right">
                                     <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest leading-none">Localização</span>
                                     <p className="text-xs font-bold text-emerald-400">{scrap.location}</p>
                                  </div>
                               </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                               <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Adicionado há {scrap.addedAt}</span>
                               <Button size="sm" className="h-7 bg-white text-black hover:bg-zinc-200 text-[10px] font-black uppercase tracking-widest">Usar Retalho</Button>
                            </div>
                         </CardContent>
                      </Card>
                    ))}

                    <button className="group border-2 border-dashed border-white/5 rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:border-white/20 transition-all hover:bg-white/[0.02]">
                       <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-zinc-600 group-hover:text-white transition-colors">
                          <Plus size={24} />
                       </div>
                       <div className="text-center">
                          <p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-1">Novo Retalho</p>
                          <p className="text-[10px] text-zinc-700 italic">Cadastrar sobra de produção</p>
                       </div>
                    </button>
                 </div>
              </div>

              {/* AI Scrap Recommender Side */}
              <div className="space-y-6">
                 <Card className="bg-zinc-950 border-white/5 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[60px] -mr-16 -mt-16 rounded-full" />
                    <CardHeader>
                       <div className="flex items-center gap-2 text-amber-500/50 text-[10px] font-black tracking-[0.2em] mb-2">
                          <Sparkles size={14} className="text-amber-500" /> MOTOR DE OTIMIZAÇÃO IA
                       </div>
                       <CardTitle className="text-xl text-white italic tracking-tighter">Sugestões de Aproveitamento</CardTitle>
                       <CardDescription className="text-xs text-zinc-500">IA analisando fila de produção v1.2</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 relative">
                       <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl space-y-3">
                          <div className="flex items-center justify-between">
                             <Badge className="bg-blue-500/20 text-blue-500 border-0 text-[10px] font-bold">OS-4256</Badge>
                             <ArrowRight size={14} className="text-zinc-600" />
                             <Badge className="bg-amber-500/20 text-amber-500 border-0 text-[10px] font-bold tracking-tight">RET-452</Badge>
                          </div>
                          <p className="text-xs font-bold text-zinc-400 leading-snug">
                             O retalho <span className="text-white italic">ACM PRATA (3mm)</span> tem o tamanho exato para as 4 letras caixa do Banco Itaú.
                          </p>
                          <div className="flex items-center justify-between pt-2">
                             <div className="flex items-center gap-1.5">
                                <TrendingDown size={14} className="text-emerald-500" />
                                <span className="text-[10px] font-black text-emerald-500 uppercase">Economia R$ 540,00</span>
                             </div>
                             <button className="text-[10px] font-black text-zinc-500 hover:text-white uppercase tracking-widest underline underline-offset-4 decoration-amber-500">Reservar</button>
                          </div>
                       </div>

                       <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl space-y-3">
                          <div className="flex items-center justify-between">
                             <Badge className="bg-blue-500/20 text-blue-500 border-0 text-[10px] font-bold">OS-4258</Badge>
                             <ArrowRight size={14} className="text-zinc-600" />
                             <Badge className="bg-amber-500/20 text-amber-500 border-0 text-[10px] font-bold tracking-tight">RET-456</Badge>
                          </div>
                          <p className="text-xs font-bold text-zinc-400 leading-snug">
                             Use o retalho de <span className="text-white italic">PVC 10mm</span> para o suporte do Totem. Sobra zero desperdício.
                          </p>
                          <div className="flex items-center justify-between pt-2">
                             <div className="flex items-center gap-1.5">
                                <Layers size={14} className="text-emerald-500" />
                                <span className="text-[10px] font-black text-emerald-500 uppercase">Impacto ESG: Alto</span>
                             </div>
                             <button className="text-[10px] font-black text-zinc-500 hover:text-white uppercase tracking-widest underline underline-offset-4 decoration-amber-500">Reservar</button>
                          </div>
                       </div>

                       <Button className="w-full bg-amber-500 text-amber-950 hover:bg-amber-400 font-black text-xs tracking-widest h-12">
                          GERAR RELATÓRIO DE SUSTENTABILIDADE
                       </Button>
                    </CardContent>
                 </Card>
              </div>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
