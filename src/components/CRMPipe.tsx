import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Calendar, Phone, Activity, Star, MessageSquare, History, User, FileText, CheckCircle2, TrendingUp, AlertCircle, Clock, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// BANT Pipeline Lanes
const PIPELINE_LANES = [
  { id: 'lead', label: 'Lead' },
  { id: 'franquia', label: 'Franquia' },
  { id: 'com-projeto', label: 'Com projeto' },
  { id: 'sem-projetos', label: 'Sem projetos' },
  { id: 'layout-complexo', label: 'Layout COMPLEXOS - Atenção especializada' },
  { id: 'layout-apresentacao', label: 'Layout de Apresentação - Designer' },
  { id: 'revisar-orc', label: 'Revisar o Proj./Orç. Antes de Enviar' },
  { id: 'conectar', label: 'Conectar antes de Enviar de Proposta' },
  { id: 'fu-1', label: '1-Follow up - DIA 1 – ENVIO DO ORÇAMENTO - GERAÇÃO DE VALOR' },
  { id: 'fu-2', label: '2-Follow up - DIA 2 – (mensagem leve) - AVANÇO DE DECISÃO' },
  { id: 'fu-3', label: '3-Follow up - DIA 4 – (ÁUDIO – DIFERENCIAL) Áudio (20–30s, natural)' },
  { id: 'fu-4', label: '4-Follow up - DIA 7 – (QUEBRA + DIAGNÓSTICO)' },
  { id: 'fu-5', label: '5-Follow up - DIA 10 – (ORÇAMENTO VENCIDO + AUMENTO 20%)' },
  { id: 'fu-6', label: '6-Follow up - DIA 12 (LIGAÇÃO + PRESSÃO FINAL)' },
  { id: 'fu-7', label: '7-Follow up - ÚLTIMO TOQUE (DESISTÊNCIA ESTRATÉGICA)' },
  { id: 'lead-quente', label: '1-Lead Quente (Altíssimo Potencial) 50-70% tx de conversão' },
  { id: 'lead-morno', label: '2-Leads Mornos ( Potencial Médio) 20-30% tx de conversão' },
  { id: 'lead-frio', label: '3- Leads Frios ( Baixo Interesse) 5-10% tx de conversão' },
  { id: 'freidge', label: 'Freidge' }
] as const;

type OpportunityScore = 'Quente' | 'Morno' | 'Frio';

interface CRMCard {
  id: string;
  client: string;
  value: string;
  score: OpportunityScore;
  laneId: string;
  nextFollowUp: string;
  followUpStep: number; // 1 to 7
  seller: string;
}

const MOCK_DATA: CRMCard[] = [
  { id: 'OP-101', client: 'Franquia Burger King - SP', value: 'R$ 45.000', score: 'Quente', laneId: 'lead', nextFollowUp: '12/06/2026', followUpStep: 1, seller: 'João Silva' },
  { id: 'OP-102', client: 'Shopping Iguatemi - Fachada', value: 'R$ 120.000', score: 'Quente', laneId: 'com-projeto', nextFollowUp: '14/06/2026', followUpStep: 3, seller: 'Maria Costa' },
  { id: 'OP-103', client: 'Loja Conceito Nike', value: 'R$ 80.000', score: 'Morno', laneId: 'layout-complexo', nextFollowUp: '15/06/2026', followUpStep: 2, seller: 'Pedro Santos' },
  { id: 'OP-104', client: 'Rede Farma - Letreiros', value: 'R$ 25.000', score: 'Frio', laneId: 'revisar-orc', nextFollowUp: '18/06/2026', followUpStep: 5, seller: 'Ana Lima' },
];

export function CRMPipe() {
  const [cards, setCards] = useState<CRMCard[]>(MOCK_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDragOverLane, setActiveDragOverLane] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<CRMCard | null>(null);

  const filteredCards = cards.filter(c => 
    c.client.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.seller.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateCardLane = (cardId: string, newLaneId: string) => {
    setCards(prev => prev.map(c => c.id === cardId ? { ...c, laneId: newLaneId } : c));
  };

  const getScoreColor = (score: OpportunityScore) => {
    switch (score) {
      case 'Quente': return 'bg-red-500/10 text-red-600 border-red-200 dark:border-red-900 absolute top-0 right-0';
      case 'Morno': return 'bg-orange-500/10 text-orange-600 border-orange-200 dark:border-orange-900 absolute top-0 right-0';
      case 'Frio': return 'bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900 absolute top-0 right-0';
    }
  };

  const getFollowUpText = (step: number) => {
    switch(step) {
      case 1: return 'DIA 1: Geração de Valor';
      case 2: return 'DIA 2: Avanço de Decisão';
      case 3: return 'DIA 4: Áudio Diferencial';
      case 4: return 'DIA 7: Quebra+Diagnóstico';
      case 5: return 'DIA 10: Vencido +20%';
      case 6: return 'DIA 12: Pressão Final';
      case 7: return 'ÚLTIMO: Desistência Estratégica';
      default: return 'Follow-up inicial';
    }
  };

  return (
    <div className="flex-1 h-full flex flex-col p-4 md:p-8 space-y-6 max-w-[1800px] mx-auto pb-24 select-none">
      
      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl border bg-white dark:bg-zinc-900 shadow-[0_1px_5px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
            <Target size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight uppercase italic text-zinc-900 dark:text-zinc-100 leading-none">
              CRM Comercial <span className="text-orange-500">:: BANT & Performance</span>
            </h1>
            <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mt-1">
              Gestão Avançada de Oportunidades & Follow-Up
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar oportunidade..."
              className="pl-9 h-10 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900"
            />
          </div>
          <Button className="h-10 px-4 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl">
            <Plus size={14} className="mr-2" /> Nova Oportunidade
          </Button>
        </div>
      </div>

      <Tabs defaultValue="pipeline" className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center gap-2 mb-4 px-1 overflow-x-auto pb-2">
          <TabsList className="bg-zinc-100 dark:bg-zinc-900 h-12 p-1">
            <TabsTrigger value="pipeline" className="text-xs font-bold px-6 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 rounded-lg h-full">
              Pipeline BANT
            </TabsTrigger>
            <TabsTrigger value="performance" className="text-xs font-bold px-6 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 rounded-lg h-full">
              Performance da Equipe
            </TabsTrigger>
            <TabsTrigger value="agenda" className="text-xs font-bold px-6 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 rounded-lg h-full">
              Agenda de Retornos
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="pipeline" className="flex-1 flex flex-col min-h-0 overflow-hidden outline-none data-[state=inactive]:hidden m-0">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-800 pr-4 h-full">
            {PIPELINE_LANES.map(lane => {
              const laneCards = filteredCards.filter(c => c.laneId === lane.id);
              
              return (
                <div 
                  key={lane.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={() => setActiveDragOverLane(lane.id)}
                  onDragLeave={() => setActiveDragOverLane(null)}
                  onDrop={(e) => {
                    e.preventDefault();
                    const cardId = e.dataTransfer.getData("cardId");
                    if (cardId) updateCardLane(cardId, lane.id);
                    setActiveDragOverLane(null);
                  }}
                  className={cn(
                    "w-[280px] shrink-0 flex flex-col h-full rounded-2xl p-3 border transition-all duration-200",
                    activeDragOverLane === lane.id 
                      ? "bg-orange-500/10 border-orange-500/40"
                      : "bg-zinc-100/50 dark:bg-zinc-900/40 border-transparent dark:border-transparent"
                  )}
                >
                  <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-[11px] font-black tracking-tight uppercase text-zinc-700 dark:text-zinc-300">
                      {lane.label}
                    </span>
                    <Badge variant="secondary" className="px-1.5 h-4 text-[9px]">
                      {laneCards.length}
                    </Badge>
                  </div>

                  <div className="flex-1 space-y-2 overflow-y-auto scrollbar-none pb-2 h-full">
                    <AnimatePresence>
                      {laneCards.map(card => (
                        <motion.div
                          layout
                          key={card.id}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData("cardId", card.id);
                          }}
                          onClick={() => setSelectedCard(card)}
                          className="bg-white dark:bg-zinc-950 border-none dark:border-transparent rounded-xl p-3 shadow-sm cursor-pointer relative overflow-hidden group hover:border-orange-500/50 transition-colors"
                        >
                          <div className={cn("absolute right-0 top-0 text-[10px] font-bold px-2 py-0.5 rounded-bl-lg border-b border-l", getScoreColor(card.score))}>
                            {card.score}
                          </div>

                          <div className="text-[10px] text-zinc-500 font-bold mb-1">
                            {card.id}
                          </div>
                          <div className="font-bold text-xs text-zinc-900 dark:text-zinc-100 leading-tight mb-2 pr-12">
                            {card.client}
                          </div>

                          <div className="text-orange-600 dark:text-orange-500 font-black text-sm mb-3">
                            {card.value}
                          </div>

                          <div className="space-y-1.5 text-[10px] font-medium">
                            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 p-1.5 rounded-md">
                              <User size={10} /> {card.seller}
                            </div>
                            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 p-1.5 rounded-md">
                              <Calendar size={10} /> FUP: {card.nextFollowUp}
                            </div>
                            <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 p-1.5 rounded-md font-bold">
                              <Activity size={10} /> {getFollowUpText(card.followUpStep)}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="flex-1 flex flex-col m-0 p-2 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                  { title: 'Taxa de Conversão', value: '38%', subtitle: '+2% vs mês', icon: TrendingUp, color: 'text-emerald-500' },
                  { title: 'Tempo Médio Lead', value: '4.2 Dias', subtitle: 'Pipeline BANT', icon: Clock, color: 'text-amber-500' },
                  { title: 'Follow-ups Realizados', value: '142', subtitle: 'Atividades planejadas na semana', icon: Activity, color: 'text-blue-500' },
              ].map((m, i) => (
                <div key={i} className="p-6 rounded-2xl border bg-white dark:bg-zinc-900 flex items-center justify-between">
                   <div>
                     <h3 className="text-xs uppercase font-bold text-zinc-500 tracking-wider mb-2">{m.title}</h3>
                     <div className="text-3xl font-black text-zinc-900 dark:text-white mb-1">{m.value}</div>
                     <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">{m.subtitle}</span>
                   </div>
                   <div className={cn("p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950", m.color)}>
                      <m.icon size={24} />
                   </div>
                </div>
              ))}
           </div>
           
           <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
             <div className="flex flex-col p-6 rounded-2xl border bg-white dark:bg-zinc-900 overflow-hidden">
               <h3 className="text-xs uppercase font-bold text-zinc-500 tracking-wider mb-6 flex items-center gap-2">
                 <User size={14} /> Funil e Forecast por Vendedor
               </h3>
               <div className="flex-1 space-y-4">
                  {['João Silva', 'Maria Costa', 'Pedro Santos', 'Ana Lima'].map((v, i) => (
                     <div key={v} className="flex flex-col gap-2 p-3 rounded-xl border bg-zinc-50 dark:bg-zinc-950">
                       <div className="flex items-center justify-between">
                         <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{v}</span>
                         <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">R$ {(120 - i*20)}k (FORECAST)</span>
                       </div>
                       <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                         <div className="h-full bg-emerald-500" style={{ width: `${60 - i*10}%` }}></div>
                         <div className="h-full bg-amber-500" style={{ width: `${30 - i*5}%` }}></div>
                         <div className="h-full bg-rose-500" style={{ width: `${10 + i*5}%` }}></div>
                       </div>
                     </div>
                  ))}
               </div>
             </div>

             <div className="flex flex-col p-6 rounded-2xl border bg-white dark:bg-zinc-900 overflow-hidden">
               <h3 className="text-xs uppercase font-bold text-zinc-500 tracking-wider mb-6 flex items-center gap-2">
                 <Target size={14} /> Comparativo de Conversão BANT
               </h3>
               <div className="flex-1 flex flex-col justify-center px-4 space-y-8">
                  {/* Simplistic Bar representation */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                       <span className="text-zinc-500">Leads Quentes</span>
                       <span className="text-red-500">65% Taxa</span>
                    </div>
                    <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                       <div className="h-full bg-red-500 w-[65%]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                       <span className="text-zinc-500">Leads Mornos</span>
                       <span className="text-orange-500">28% Taxa</span>
                    </div>
                    <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                       <div className="h-full bg-orange-500 w-[28%]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                       <span className="text-zinc-500">Leads Frios</span>
                       <span className="text-blue-500">8% Taxa</span>
                    </div>
                    <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500 w-[8%]" />
                    </div>
                  </div>
               </div>
             </div>
           </div>
        </TabsContent>

        <TabsContent value="agenda" className="flex-1 flex flex-col m-0">
          <div className="flex-1 p-6 rounded-2xl border bg-white dark:bg-zinc-900 overflow-y-auto">
             <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between mb-8 pb-4 border-b">
                   <h2 className="text-lg font-black tracking-tight text-zinc-900 dark:text-white uppercase italic flex items-center gap-2">
                     <Calendar className="text-orange-500" /> Agenda de Retornos & Follow-Ups
                   </h2>
                   <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-red-500 border-red-500 bg-red-500/10">3 Vencidas</Badge>
                      <Badge variant="outline" className="text-amber-500 border-amber-500 bg-amber-500/10">8 Para Hoje</Badge>
                   </div>
                </div>

                <div className="space-y-3">
                   {cards.map((c, i) => (
                     <div key={i} className="p-4 rounded-xl border bg-zinc-50 dark:bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                           <div className={cn("w-10 h-10 rounded-full flex flex-col items-center justify-center font-bold text-[10px] shrink-0", i === 0 ? "bg-red-500/20 text-red-500" : "bg-purple-500/20 text-purple-400")}>
                              {c.nextFollowUp.split('/')[0]}
                              <span className="text-[8px] uppercase">{['Set','Set','Set','Out'][i%4]}</span>
                           </div>
                           <div>
                              <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{c.client}</div>
                              <div className="text-[11px] font-semibold text-zinc-500 flex flex-wrap items-center gap-2 mt-1">
                                <span>{c.seller}</span>
                                <span>•</span>
                                <span className={getScoreColor(c.score).split(' ')[0] + " px-1.5 py-0.5 rounded text-[10px]"}>{c.score}</span>
                                <span>•</span>
                                <span>{getFollowUpText(c.followUpStep)}</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                           <Button size="sm" variant="outline" className="text-xs h-8">Abrir Lead</Button>
                           <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-8 text-xs">Concluir FUP</Button>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedCard} onOpenChange={(open) => !open && setSelectedCard(null)}>
        {selectedCard && (
          <DialogContent className="max-w-2xl bg-white dark:bg-zinc-900 border-none p-0 overflow-hidden shadow-2xl">
             <div className="bg-zinc-50 dark:bg-zinc-950 p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <div>
                   <h2 className="text-xl font-black tracking-tight text-zinc-900 dark:text-white mb-1">{selectedCard.client}</h2>
                   <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                     <span className={cn("px-2 py-0.5 rounded font-bold", getScoreColor(selectedCard.score))}>
                       {selectedCard.score} TEMPERATURA
                     </span>
                     <span>•</span>
                     <span>{selectedCard.id}</span>
                   </div>
                </div>
                <div className="text-right">
                   <div className="text-sm font-bold text-zinc-500 uppercase">Potencial</div>
                   <div className="text-2xl font-black text-orange-500">{selectedCard.value}</div>
                </div>
             </div>

             <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border">
                     <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Vendedor</span>
                     <div className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2"><User size={14}/> {selectedCard.seller}</div>
                  </div>
                  <div className="space-y-1 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border">
                     <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Próximo FUP</span>
                     <div className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2"><Calendar size={14}/> {selectedCard.nextFollowUp}</div>
                  </div>
                </div>

                <div className="space-y-3">
                   <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase flex items-center gap-2">
                     <Activity size={14} className="text-indigo-500" /> Histórico & Fase Atual
                   </h3>
                   <div className="p-4 rounded-xl border bg-indigo-50 dark:bg-indigo-950/20 text-indigo-900 dark:text-indigo-200 text-sm font-medium">
                      Estágio Kanban: <strong>{PIPELINE_LANES.find(l => l.id === selectedCard.laneId)?.label}</strong>
                      <br/>
                      Passo Atual: <strong>{getFollowUpText(selectedCard.followUpStep)}</strong>
                   </div>
                </div>

                <div className="space-y-3">
                   <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase flex items-center gap-2">
                     <FileText size={14} className="text-orange-500" /> Tarefas & Anotações Livres
                   </h3>
                   <Textarea 
                     placeholder="Adicione um registro na linha do tempo deste cliente..." 
                     className="bg-zinc-50 dark:bg-zinc-950 border resize-none text-sm h-24"
                   />
                   <div className="flex justify-end">
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-500 text-white font-bold h-8 text-xs">
                        Adicionar ao Histórico
                      </Button>
                   </div>
                </div>
             </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
