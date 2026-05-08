import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Factory, 
  ClipboardList, 
  Workflow, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Info,
  MoreVertical,
  Play,
  Pause,
  AlertCircle,
  Maximize2,
  Calendar as CalendarIcon,
  Filter,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface OrderService {
  id: string;
  client: string;
  product: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'planning' | 'material' | 'production' | 'finishing' | 'quality' | 'delivered';
  progress: number;
  deadline: string;
}

const OS_DATA: OrderService[] = [
  { id: 'OS-4251', client: 'Banco Itaú', product: 'Fachada ACM & Letra Caixa', priority: 'critical', status: 'production', progress: 65, deadline: 'Hoje' },
  { id: 'OS-4252', client: 'Restaurante Sabor', product: 'Cardápios & Luminoso', priority: 'medium', status: 'material', progress: 15, deadline: 'Amanhã' },
  { id: 'OS-4253', client: 'Academia Fit', product: 'Adesivação Total', priority: 'high', status: 'planning', progress: 5, deadline: '12/05' },
  { id: 'OS-4248', client: 'Tech Corp', product: 'Branding Industrial', priority: 'low', status: 'quality', progress: 95, deadline: 'Ontem' },
];

export function Production() {
  const [activeTab, setActiveTab] = useState('chao');

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-zinc-500 mb-2 uppercase">
            <Factory size={14} /> Módulo Industrial
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Chão de Fábrica & PCP</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-white h-9">
            <Filter size={16} className="mr-2" /> Filtros
          </Button>
          <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-white h-9">
            <CalendarIcon size={16} className="mr-2" /> Cronograma
          </Button>
          <Button className="bg-white text-black hover:bg-zinc-200 h-9">
            <Plus size={16} className="mr-2" /> Nova OS
          </Button>
        </div>
      </div>

      <Tabs defaultValue="chao" onValueChange={setActiveTab} className="bg-transparent">
        <div className="flex items-center justify-between mb-8">
          <TabsList className="bg-white/5 border border-white/10 p-1">
            <TabsTrigger value="chao" className="data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400 text-xs font-bold px-6">CHÃO DE FÁBRICA</TabsTrigger>
            <TabsTrigger value="pcp" className="data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400 text-xs font-bold px-6">PCP & ORDENS</TabsTrigger>
            <TabsTrigger value="maquinas" className="data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400 text-xs font-bold px-6">MÁQUINAS</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-4 text-[10px] font-medium tracking-tight text-zinc-500">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Operando</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500" /> Alerta</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500" /> Atraso</div>
          </div>
        </div>

        <TabsContent value="chao" className="space-y-6 mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Corte CNC Router', operator: 'Felipe Santos', status: 'operando', job: 'OS-4251 (Fachada ACM)', progress: 78, time: '35m' },
              { name: 'Corte Laser', operator: 'Carlos Lima', status: 'parado', job: '-', progress: 0, time: '2h 15m' },
              { name: 'Impressora UV-Gel', operator: 'Julia Rocha', status: 'operando', job: 'OS-4254 (Adesivos)', progress: 32, time: '1h 10m' },
              { name: 'Dobradora Acrílico', operator: 'Roberto Costa', status: 'alerta', job: 'OS-4250 (Expositores)', progress: 92, time: '05m' },
              { name: 'Serralheria Industrial', operator: 'Equipe Alpha', status: 'operando', job: 'OS-4245 (Estrutura)', progress: 45, time: '5h' },
              { name: 'Preparação ACM', operator: 'Marcos Gomes', status: 'operando', job: 'OS-4251 (Processamento)', progress: 60, time: '40m' },
            ].map((machine, i) => (
              <Card key={i} className="bg-white/[0.02] border-white/5 hover:border-white/10 transition-all overflow-hidden relative group">
                <div className={cn(
                  "absolute top-0 left-0 w-full h-1",
                  machine.status === 'operando' ? "bg-emerald-500" : 
                  machine.status === 'alerta' ? "bg-amber-500" : "bg-rose-500"
                )} />
                <CardHeader className="pb-3 pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-sm font-bold text-white uppercase tracking-wider">{machine.name}</CardTitle>
                    <button className="text-zinc-500 hover:text-white"><Maximize2 size={14} /></button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={cn(
                      "text-[9px] font-bold px-1.5 py-0 h-4 border-0",
                      machine.status === 'operando' ? "bg-emerald-500/10 text-emerald-500" : 
                      machine.status === 'alerta' ? "bg-amber-500/10 text-amber-500" : "bg-rose-500/10 text-rose-500"
                    )}>
                      {machine.status.toUpperCase()}
                    </Badge>
                    <span className="text-[10px] text-zinc-500 font-medium">#{i+102}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Trabalho Atual</p>
                        <p className={cn("text-xs font-bold", machine.job === '-' ? "text-zinc-700" : "text-white")}>{machine.job}</p>
                      </div>
                      {machine.status === 'operando' ? (
                        <button className="p-1.5 bg-white/5 rounded-md text-amber-500 hover:bg-white/10"><Pause size={14} /></button>
                      ) : (
                        <button className="p-1.5 bg-white/5 rounded-md text-emerald-500 hover:bg-white/10"><Play size={14} /></button>
                      )}
                    </div>
                    {machine.progress > 0 && (
                      <div className="space-y-1.5 mt-3">
                        <div className="flex justify-between text-[10px] font-bold text-zinc-500">
                          <span>PROGRESSO</span>
                          <span>{machine.progress}%</span>
                        </div>
                        <Progress value={machine.progress} className="h-1 bg-white/5" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <div className="space-y-1">
                      <p className="text-zinc-600 uppercase tracking-widest">Operador</p>
                      <p className="text-zinc-400 uppercase">{machine.operator}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-zinc-600 uppercase tracking-widest">Restante</p>
                      <div className="flex items-center gap-1 text-zinc-400">
                        <Clock size={10} /> {machine.time}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Industrial Board View */}
          <Card className="bg-[#0a0a0a] border-white/5 overflow-hidden">
            <CardHeader className="bg-white/[0.02] border-b border-white/5 py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase">Painel de Alinhamento - Próximas Horas</CardTitle>
                <div className="flex gap-2">
                   <Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-[10px] font-bold">Eficiência: 92%</Badge>
                   <Badge className="bg-amber-500/10 text-amber-500 border-0 text-[10px] font-bold">4 Alertas</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-[400px]">
              <div className="flex h-full divide-x divide-white/5">
                 {/* Timeline Side */}
                 <div className="w-16 flex flex-col items-center py-4 bg-white/[0.01]">
                    {[8, 10, 12, 14, 16, 18].map(h => (
                      <div key={h} className="h-16 flex items-start justify-center text-[10px] font-bold text-zinc-600 pt-1 tracking-tighter">
                        {h}:00
                      </div>
                    ))}
                 </div>
                 {/* Grid Side */}
                 <div className="flex-1 relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-80">
                    <div className="absolute top-10 left-10 w-2/3 h-12 bg-blue-500/20 border border-blue-500/50 rounded-md p-2 flex items-center justify-between group cursor-pointer hover:bg-blue-500/30 transition-all overflow-hidden">
                       <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          <span className="text-[10px] font-bold text-white uppercase tracking-tight">OS-4251 (Produção)</span>
                       </div>
                       <Badge className="text-[8px] bg-blue-500 text-white border-0 py-0 h-3">ROUTER CNC</Badge>
                    </div>

                    <div className="absolute top-24 left-32 w-1/2 h-12 bg-emerald-500/20 border border-emerald-500/50 rounded-md p-2 flex items-center justify-between group cursor-pointer hover:bg-emerald-500/30 transition-all overflow-hidden">
                       <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="text-[10px] font-bold text-white uppercase tracking-tight">OS-4254 (Impressão)</span>
                       </div>
                       <Badge className="text-[8px] bg-emerald-500 text-white border-0 py-0 h-3">UV-GEL</Badge>
                    </div>

                    <div className="absolute top-40 left-4 w-4/5 h-12 bg-amber-500/10 border border-amber-500/30 border-dashed rounded-md p-2 flex items-center justify-between group opacity-60">
                       <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight">Manutenção Preventiva</span>
                       </div>
                       <Badge className="text-[8px] bg-amber-500 text-black border-0 py-0 h-3">TO DOS</Badge>
                    </div>

                    {/* Laser lines for "industrial" feel */}
                    <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-white/5" />
                    <div className="absolute top-0 bottom-0 left-2/4 w-[1px] bg-white/5" />
                    <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-white/5" />
                    <div className="absolute left-0 right-0 top-16 h-[1px] bg-white/5" />
                    <div className="absolute left-0 right-0 top-32 h-[1px] bg-white/5" />
                    <div className="absolute left-0 right-0 top-48 h-[1px] bg-white/5" />
                 </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pcp" className="space-y-6 mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <Card className="bg-white/[0.02] border-white/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold text-white">Resumo PCP</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase">
                      <span>Carga Total</span>
                      <span>84%</span>
                    </div>
                    <Progress value={84} className="h-1.5 bg-white/5" />
                  </div>
                  <Separator className="bg-white/5" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-zinc-600 uppercase">Atrás</p>
                      <p className="text-xl font-bold text-rose-500 tracking-tight">12</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-zinc-600 uppercase">No Prazo</p>
                      <p className="text-xl font-bold text-emerald-500 tracking-tight">142</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-950 border-white/5">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center gap-2 text-rose-500 text-[10px] font-bold tracking-widest uppercase">
                    <AlertTriangle size={14} /> Critical Bottleneck
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                    O setor de <span className="text-white">Impressão</span> atingiu 100% de capacidade para as próximas 24h.
                  </p>
                  <Button variant="outline" className="w-full h-8 text-[10px] font-bold uppercase tracking-widest bg-rose-500/10 border-rose-500/20 text-rose-500 hover:bg-rose-500/20">Ações Sugeridas IA</Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card className="bg-white/[0.02] border-white/5">
                <Table>
                  <TableHeader className="bg-white/[0.01]">
                    <TableRow className="border-white/5 hover:bg-transparent">
                      <TableHead className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest h-10">OS ID</TableHead>
                      <TableHead className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest h-10">Cliente</TableHead>
                      <TableHead className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest h-10">Produto</TableHead>
                      <TableHead className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest h-10">Status</TableHead>
                      <TableHead className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest h-10">Meta</TableHead>
                      <TableHead className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest h-10 text-right">Ação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {OS_DATA.map((os) => (
                      <TableRow key={os.id} className="border-white/5 hover:bg-white/[0.02] group">
                        <TableCell className="font-bold text-white text-xs">{os.id}</TableCell>
                        <TableCell className="text-xs text-zinc-400 font-medium">{os.client}</TableCell>
                        <TableCell className="text-xs text-zinc-300 font-medium">{os.product}</TableCell>
                        <TableCell>
                          <Badge className={cn(
                            "text-[9px] font-bold px-1.5 py-0 h-4 border-0",
                            os.status === 'production' ? "bg-blue-500/20 text-blue-500" :
                            os.status === 'planning' ? "bg-purple-500/20 text-purple-500" :
                            os.status === 'material' ? "bg-amber-500/20 text-amber-500" :
                            "bg-emerald-500/20 text-emerald-500"
                          )}>
                            {os.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                           <div className="flex items-center gap-2">
                             <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-white/20" style={{ width: `${os.progress}%` }} />
                             </div>
                             <span className="text-[10px] font-bold text-zinc-600">{os.deadline}</span>
                           </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white"><MoreVertical size={14} /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="p-4 bg-white/[0.01] flex justify-between items-center text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                  <span>Mostrando {OS_DATA.length} de 154 OS Ativas</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" disabled className="h-6 px-2 text-[10px]">Anterior</Button>
                    <Button variant="ghost" className="h-6 px-2 text-[10px] text-white">Próximo</Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
