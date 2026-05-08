import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Target, 
  TrendingUp, 
  BriefcaseBusiness, 
  PhoneCall, 
  Mail, 
  Search, 
  Filter, 
  Plus, 
  Calendar,
  MoreHorizontal,
  ChevronRight,
  Star,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  CreditCard,
  Building2,
  User,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Deal {
  id: string;
  title: string;
  client: string;
  value: string;
  probability: number;
  tags: string[];
  owner: string;
  status: 'cold' | 'warm' | 'hot';
  daysInStage: number;
}

const CRM_PIPELINE: Record<string, Deal[]> = {
  'PROSPECÇÃO': [
    { id: '1', title: 'Fachada Loja Shopping', client: 'Lojas Renner', value: 'R$ 45.000', probability: 20, tags: ['Fachada', 'Shopping'], owner: 'Carlos', status: 'cold', daysInStage: 2 },
    { id: '2', title: 'Adesivagem Frota', client: 'Loggi', value: 'R$ 12.000', probability: 40, tags: ['Adesivagem'], owner: 'Ana', status: 'warm', daysInStage: 5 },
  ],
  'QUALIFICAÇÃO': [
    { id: '3', title: 'Letra Caixa Prédio', client: 'Construtora Cyrela', value: 'R$ 88.000', probability: 60, tags: ['Letra Caixa'], owner: 'Carlos', status: 'hot', daysInStage: 12 },
  ],
  'PROPOSTA': [
    { id: '4', title: 'Luminosos LED', client: 'Rede Droga Raia', value: 'R$ 32.500', probability: 80, tags: ['Luminoso'], owner: 'Bia', status: 'hot', daysInStage: 3 },
  ],
  'NEGOCIAÇÃO': [
    { id: '5', title: 'Totens Sinalização', client: 'Hospital Israelita', value: 'R$ 115.000', probability: 90, tags: ['Totem', 'Sustentável'], owner: 'Ana', status: 'hot', daysInStage: 8 },
  ],
};

export function Commercial() {
  const [activeTab, setActiveTab] = useState('pipeline');

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-zinc-500 mb-2 uppercase">
            <Target size={14} /> CRM & COMERCIAL
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Pipeline de Vendas</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
            <Input className="pl-10 h-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-white transition-all" placeholder="Buscar negócios, clientes..." />
          </div>
          <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-white h-10">
            <Filter size={16} className="mr-2" /> Segmentar
          </Button>
          <Button className="bg-white text-black hover:bg-zinc-200 h-10 font-bold px-6">
            <Plus size={16} className="mr-2" /> Novo Negócio
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Valor Total Funil', value: 'R$ 2.4M', trend: '+R$ 450k/mês', icon: <TrendingUp className="text-emerald-500" /> },
          { label: 'Conversão', value: '28.4%', trend: '+4.2%', icon: <Target className="text-blue-500" /> },
          { label: 'Ciclo Médio', value: '22 dias', trend: '-2 dias', icon: <Clock className="text-purple-500" /> },
          { label: 'Atividades Hoje', value: '45', trend: '12 pendentes', icon: <PhoneCall className="text-amber-500" /> },
        ].map((kpi, i) => (
          <Card key={i} className="bg-white/[0.02] border-white/5 hover:border-white/10 transition-all">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">{kpi.label}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-xl font-bold text-white">{kpi.value}</h3>
                  <span className="text-[9px] font-bold text-zinc-500">{kpi.trend}</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">{kpi.icon}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="pipeline" className="w-full">
        <TabsList className="bg-transparent border-b border-white/5 w-full justify-start h-12 rounded-none p-0 gap-8 mb-6">
          <TabsTrigger value="pipeline" className="data-[state=active]:border-white border-b-2 border-transparent h-full rounded-none bg-transparent text-zinc-500 data-[state=active]:text-white font-bold text-xs tracking-widest transition-all">PIPELINE</TabsTrigger>
          <TabsTrigger value="vendedores" className="data-[state=active]:border-white border-b-2 border-transparent h-full rounded-none bg-transparent text-zinc-500 data-[state=active]:text-white font-bold text-xs tracking-widest transition-all">PERFORMANCE</TabsTrigger>
          <TabsTrigger value="clientes" className="data-[state=active]:border-white border-b-2 border-transparent h-full rounded-none bg-transparent text-zinc-500 data-[state=active]:text-white font-bold text-xs tracking-widest transition-all">LISTA DE CLIENTES</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="mt-0">
          <div className="flex overflow-x-auto gap-6 pb-6 min-h-[600px]">
            {Object.entries(CRM_PIPELINE).map(([stage, deals], i) => (
              <div key={stage} className="min-w-[320px] w-[320px] flex flex-col gap-4">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <h3 className="text-[11px] font-bold tracking-[0.2em] text-zinc-400 uppercase">{stage}</h3>
                  </div>
                  <Badge variant="outline" className="bg-white/5 border-0 text-[10px] text-zinc-500 font-bold px-1.5">{deals.length}</Badge>
                </div>

                <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-3 flex flex-col gap-3 h-full">
                   {deals.map(deal => (
                     <motion.div 
                        key={deal.id}
                        layoutId={deal.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#0c0c0c] border border-white/5 p-4 rounded-xl shadow-lg hover:border-white/20 transition-all cursor-grab group active:cursor-grabbing"
                     >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex flex-col gap-1">
                             <div className="flex items-center gap-2">
                               {deal.status === 'hot' && <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />}
                               {deal.status === 'warm' && <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                               <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">{deal.client}</span>
                             </div>
                             <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{deal.title}</h4>
                          </div>
                          <button className="text-zinc-700 hover:text-white"><MoreHorizontal size={14} /></button>
                        </div>
                        
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {deal.tags.map(tag => (
                            <Badge key={tag} className="bg-white/5 text-zinc-500 border-0 text-[8px] font-bold px-1.5 py-0 h-4">
                              {tag.toUpperCase()}
                            </Badge>
                          ))}
                        </div>

                        <Separator className="bg-white/5 mb-4" />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                             <Avatar className="w-6 h-6 border border-white/10">
                                <AvatarImage src={`https://i.pravatar.cc/100?u=${deal.owner}`} />
                                <AvatarFallback className="text-[8px]">{deal.owner[0]}</AvatarFallback>
                             </Avatar>
                             <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-white tracking-widest">{deal.value}</span>
                                <span className="text-[8px] text-zinc-500 font-medium">{deal.daysInStage} dias nesta fase</span>
                             </div>
                          </div>
                          <div className="text-right">
                             <div className="text-[8px] font-bold text-zinc-600 uppercase mb-1">Confiança</div>
                             <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                                <div 
                                  className={cn(
                                    "h-full",
                                    deal.probability > 70 ? "bg-emerald-500" : 
                                    deal.probability > 40 ? "bg-blue-500" : "bg-amber-500"
                                  )} 
                                  style={{ width: `${deal.probability}%` }} 
                                />
                             </div>
                          </div>
                        </div>
                     </motion.div>
                   ))}

                   <Button variant="ghost" className="w-full h-10 border border-dashed border-white/5 hover:border-white/10 text-zinc-600 hover:text-zinc-400 text-[10px] font-bold tracking-widest uppercase">
                      <Plus size={14} className="mr-2" /> Adicionar Lead
                   </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vendedores" className="mt-0">
          <Card className="bg-white/[0.01] border-white/5 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Performance de Equipe</h3>
            <div className="space-y-8">
              {[
                { name: 'Ana Oliveira', sales: 'R$ 420k', goal: 450, deals: 12, conversion: '32%', color: 'emerald' },
                { name: 'Carlos Silva', sales: 'R$ 380k', goal: 400, deals: 8, conversion: '28%', color: 'blue' },
                { name: 'Marcos Rezende', sales: 'R$ 210k', goal: 350, deals: 5, conversion: '18%', color: 'amber' },
              ].map((rep, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <Avatar className="w-10 h-10 border border-white/10 ring-2 ring-transparent group-hover:ring-white transition-all">
                          <AvatarImage src={`https://i.pravatar.cc/100?u=${rep.name}`} />
                       </Avatar>
                       <div>
                          <h4 className="text-sm font-bold text-white">{rep.name}</h4>
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{rep.deals} Negócios Ativos</span>
                       </div>
                    </div>
                    <div className="text-right">
                       <h4 className="text-lg font-bold text-white">{rep.sales}</h4>
                       <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Meta: R$ {rep.goal}k</span>
                    </div>
                  </div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <Badge className={`bg-${rep.color}-500/10 text-${rep.color}-500 border-0 text-[10px] font-bold`}>
                          CONVERSÃO: {rep.conversion}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-white">
                          {Math.round((parseInt(rep.sales.replace(/[^0-9]/g, '')) / rep.goal) * 10)}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-1.5 mb-4 text-xs flex rounded bg-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(parseInt(rep.sales.replace(/[^0-9]/g, '')) / rep.goal) * 10}%` }}
                        transition={{ duration: 1.5, delay: i * 0.2 }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${rep.color}-500`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
