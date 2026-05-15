import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Target, 
  TrendingUp, 
  Mail, 
  Search, 
  Plus, 
  MoreVertical, 
  Star, 
  Zap, 
  PieChart, 
  BarChart3, 
  Filter, 
  Download, 
  ShieldCheck, 
  Cpu, 
  Sparkles,
  Phone,
  MessageSquare,
  Calendar,
  AlertCircle,
  Clock,
  ArrowRight,
  TrendingDown,
  UserCheck,
  Briefcase,
  Edit,
  FileText,
  Layout,
  FolderOpen,
  Info,
  User,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { GoogleGenAI } from "@google/genai";
import { format, differenceInDays } from 'date-fns';

import { useStore } from '../lib/store';
import { KanbanBoard } from './common/KanbanBoard';
import { KanbanColumn, KanbanItem } from '@/src/types/common';

// Types
export type Temperature = 'Quente' | 'Morno' | 'Frio';

export interface Lead {
  id: string;
  client: string;
  value: number;
  salesperson: string;
  status: string;
  entryDate: string;
  lastContact: string;
  temperature: Temperature;
  lastAction: string;
  objections: string[];
  registrationInfo?: string;
  briefing?: string;
  folderLink?: string;
  supportDesigner?: string;
  nextAction?: string;
  observations?: string;
  aiAnalysis?: string;
  salesScript?: string;
}

// Mock Data
const COLUMNS = [
  { id: 'lead-franq', title: 'Lead - Franquias/Rede', color: 'bg-zinc-500' },
  { id: 'lead-proj', title: 'Lead - Com Projeto', color: 'bg-blue-500' },
  { id: 'lead-sem-proj', title: 'Lead - Sem Projeto', color: 'bg-zinc-600' },
  { id: 'layout-comp', title: 'Layout COMPLEXO', color: 'bg-orange-500' },
  { id: 'layout-des', title: 'Layout Designer', color: 'bg-pink-500' },
  { id: 'review', title: 'Revisar Proj/Orç', color: 'bg-amber-500' },
  { id: 'connect', title: 'Conectar p/ Proposta', color: 'bg-indigo-500' },
  { id: 'f1', title: 'Follow DIA 1 (Valor)', color: 'bg-purple-500' },
  { id: 'f2', title: 'Follow DIA 2 (Decisão)', color: 'bg-purple-600' },
  { id: 'f3', title: 'Follow DIA 4 (Áudio)', color: 'bg-purple-700' },
  { id: 'f4', title: 'Follow DIA 7 (Quebra)', color: 'bg-purple-800' },
  { id: 'f5', title: 'Follow DIA 10 (Vencido)', color: 'bg-rose-600' },
  { id: 'f6', title: 'Follow DIA 12 (Pressão)', color: 'bg-rose-700' },
  { id: 'f7', title: 'Follow DIA 14 (Desistência)', color: 'bg-zinc-900' },
  { id: 'quente', title: 'LEADS QUENTES (50-70%)', color: 'bg-emerald-500' },
  { id: 'morno', title: 'LEADS MORNOS (20-30%)', color: 'bg-yellow-500' },
  { id: 'frio', title: 'LEADS FRIOS (5-10%)', color: 'bg-blue-300' },
  { id: 'fridge', title: 'Freidge', color: 'bg-sky-900' },
];

const LEADS_MOCK: Lead[] = [
  { 
     id: 'L-101', 
     client: 'Posto Petrobras Vila Lobos', 
     value: 12500, 
     salesperson: 'Ricardo Silva', 
     status: 'f1', 
     entryDate: '2024-05-01', 
     lastContact: '2024-05-08', 
     temperature: 'Quente', 
     lastAction: 'Envio de orçamento de teste', 
     objections: ['Preço alto', 'Prazo longo'],
     registrationInfo: 'CNPJ: 33.000.167/0001-01 | Endereço: Av. Nações Unidas, 1234',
     briefing: 'Revestimento de testeiras e troca de iluminação LED conforme novo padrão 2024.',
     folderLink: 'https://drive.google.com/drive/u/0/folders/1abc',
     supportDesigner: 'Juliana Costa',
     nextAction: 'Ligar para confirmar recebimento do orçamento às 14h',
     observations: 'Cliente muito focado em prazo, precisa da obra pronta para inauguração no mês que vem.'
  },
  { 
     id: 'L-102', 
     client: 'Condomínio Alpha Garden', 
     value: 4500, 
     salesperson: 'Ana Paula', 
     status: 'lead-franq', 
     entryDate: '2024-05-05', 
     lastContact: '2024-05-05', 
     temperature: 'Morno', 
     lastAction: 'Primeiro contato telefônico', 
     objections: [],
     registrationInfo: 'Pessoa Física | Marcio Alencar',
     briefing: 'Placas indicativas para as torres e entrada principal.',
     folderLink: 'https://drive.google.com/drive/u/0/folders/2def',
     supportDesigner: 'Leo Souza',
     nextAction: 'Enviar cotação inicial baseada em fotos',
     observations: 'Aguardando assembleia do condomínio para aprovação.'
  },
  { 
     id: 'L-103', 
     client: 'Academia Blue Fit', 
     value: 28000, 
     salesperson: 'Ricardo Silva', 
     status: 'quente', 
     entryDate: '2024-04-20', 
     lastContact: '2024-05-07', 
     temperature: 'Quente', 
     lastAction: 'Reunião presencial', 
     objections: ['Concorrente mais barato'],
     registrationInfo: 'CNPJ: 12.345.678/0001-90 | Grupo Fit S/A',
     briefing: 'Fachada em ACM azul com letras caixa retroiluminadas e sinalização interna.',
     folderLink: 'https://drive.google.com/drive/u/0/folders/3ghi',
     supportDesigner: 'Juliana Costa',
     nextAction: 'Preparar amostra de materiais (ACM e LED)',
     observations: 'Cliente já tem orçamentos da concorrência, foco em qualidade e durabilidade.'
  },
  { id: 'L-104', client: 'Restaurante Sabor Local', value: 3200, salesperson: 'Marcos Oliveira', status: 'lead-sem-proj', entryDate: '2024-05-02', lastContact: '2024-05-04', temperature: 'Frio', lastAction: 'Aguardando envio de medidas', objections: ['Ainda decidindo material'] },
  { id: 'L-105', client: 'Supermercado Dia', value: 15600, salesperson: 'Ana Paula', status: 'f2', entryDate: '2024-05-01', lastContact: '2024-05-06', temperature: 'Morno', lastAction: 'Follow-up via WhatsApp', objections: ['Não respondeu orçamento anterior'] },
];

const SALESPERSON_PERFORMANCE = [
  { name: 'Ricardo Silva', conversion: 78, avgTime: '3.2 dias', revenue: 'R$ 142k' },
  { name: 'Ana Paula', conversion: 62, avgTime: '4.5 dias', revenue: 'R$ 98k' },
  { name: 'Marcos Oliveira', conversion: 45, avgTime: '6.1 dias', revenue: 'R$ 54k' },
];

function LeadCard({ lead }: { lead: Lead, key?: string | number }) {
  const updateItem = useStore(state => state.updateItem);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [objections, setObjections] = useState<string[]>(lead.objections || []);
  const [newObjection, setNewObjection] = useState('');
  const [aiScript, setAiScript] = useState(lead.salesScript || '');
  const [isScriptLoading, setIsScriptLoading] = useState(false);

  const daysInColumn = differenceInDays(new Date(), new Date(lead.entryDate || format(new Date(), 'yyyy-MM-dd')));
  const isAging = daysInColumn > 5;

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const getAiScript = async () => {
    setIsScriptLoading(true);
    try {
      const prompt = `Como vendedor da Korteck Comunicação Visual, gere um script de quebra de objeções altamente persuasivo para um cliente na fase "${lead.status}". 
      Objeções do cliente: ${objections.join(', ')}. 
      Contexto: ${lead.client}, Valor: R$ ${lead.value}.
      O tom deve ser profissional, empático e focado em valor. Responda em Português formatado com emojis.`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      const text = response.text || '';
      setAiScript(text);
      await updateItem('leads', lead.id, { salesScript: text });
    } catch (error) {
      setAiScript('Erro ao conectar com a IA Inteligente.');
    } finally {
      setIsScriptLoading(false);
    }
  };

  const addObjection = async () => {
    if (newObjection.trim()) {
      const updated = [...objections, newObjection.trim()];
      setObjections(updated);
      setNewObjection('');
      await updateItem('leads', lead.id, { objections: updated });
    }
  };

  const removeObjection = async (idx: number) => {
    const updated = objections.filter((_, i) => i !== idx);
    setObjections(updated);
    await updateItem('leads', lead.id, { objections: updated });
  };

  const updateTemperature = async (temp: Temperature) => {
    await updateItem('leads', lead.id, { temperature: temp });
  };

  const PRE_DEFINED_OBJECTIONS = [
     "Preço acima do orçamento",
     "Prazo de entrega muito longo",
     "Dúvida sobre durabilidade",
     "Concorrente com frete grátis",
     "Ainda avaliando layouts"
  ];

  const currentStepIndex = COLUMNS.findIndex(c => c.id === lead.status);
  const totalSteps = COLUMNS.length;
  const progressPercent = ((currentStepIndex + 1) / totalSteps) * 100;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        render={
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="bg-[#0c0c10] border border-white/5 rounded-2xl p-5 shadow-xl cursor-pointer group hover:border-white/20 transition-all relative overflow-hidden"
          />
        }
      >
        {/* Structural background patterns */}
          <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/[0.01] rounded-tl-3xl pointer-events-none" />
          
          {/* Progress bar at the top */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5">
             <div 
               className={cn("h-full transition-all duration-500", COLUMNS[currentStepIndex]?.color || "bg-blue-600")} 
               style={{ width: `${progressPercent}%` }} 
             />
          </div>

          <div className="flex items-start justify-between mb-4 mt-2">
            <div className="px-2.5 py-1 bg-white/[0.05] border border-white/5 rounded-lg text-[9px] font-black text-zinc-500 italic uppercase tracking-widest">
               #{lead.id}
            </div>
            <div className="flex items-center gap-2">
               {isAging && (
                 <div className="flex items-center gap-1 px-2 py-0.5 bg-rose-500/10 border border-rose-500/20 rounded-full">
                   <AlertCircle size={10} className="text-rose-500 animate-pulse" />
                   <span className="text-[7px] font-black text-rose-500 uppercase tracking-tighter">Review Necessário</span>
                 </div>
               )}
               <Badge className={cn(
                 "text-[7px] font-black uppercase tracking-tighter border-0",
                 lead.temperature === 'Quente' ? 'bg-rose-500/10 text-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.2)]' :
                 lead.temperature === 'Morno' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'
               )}>
                 {lead.temperature}
               </Badge>
            </div>
          </div>

          <div className="space-y-1 mb-5">
            <h4 className="text-sm font-bold text-white leading-snug group-hover:text-blue-400 transition-colors uppercase tracking-tight line-clamp-2">{lead.client}</h4>
            <div className="flex items-center gap-2 mt-2">
               <Avatar className="w-5 h-5 border border-white/10">
                  <AvatarImage src={`https://i.pravatar.cc/100?u=${lead.salesperson}`} />
                  <AvatarFallback className="text-[6px] font-black bg-zinc-800">SP</AvatarFallback>
               </Avatar>
               <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter">{lead.salesperson}</span>
            </div>
          </div>

          <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 mb-6 space-y-2">
             <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-zinc-600 uppercase italic">Valor Estimado</span>
                <span className="text-[10px] font-black text-blue-500 italic">R$ {lead.value.toLocaleString('pt-BR')}</span>
             </div>
             <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-zinc-600 uppercase italic truncate">Ação: {lead.lastAction}</span>
             </div>
             {objections.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                   {objections.slice(0, 2).map((obj, i) => (
                     <Badge key={i} variant="outline" className="text-[7px] bg-rose-500/5 text-rose-400 border-rose-500/10 px-1 py-0">{obj}</Badge>
                   ))}
                   {objections.length > 2 && <span className="text-[7px] text-zinc-600 font-bold">+{objections.length - 2}</span>}
                </div>
             )}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/5">
             <div className="flex items-center gap-2 text-[9px] font-black text-zinc-500 uppercase italic">
                <Clock size={12} className={cn(isAging ? "text-rose-500" : "text-blue-500")} />
                {daysInColumn} dias nesta fase
             </div>
             <div className="flex gap-1">
                <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-blue-600 transition-all">
                   <Phone size={10} />
                </div>
                <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-blue-600 transition-all">
                   <MessageSquare size={10} />
                </div>
                <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-blue-600 transition-all">
                   <Zap size={10} />
                </div>
             </div>
          </div>
      </DialogTrigger>

      <DialogContent className="max-w-4xl bg-[#0c0c10] border-white/5 text-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
             <div className="flex items-center justify-between w-full pr-8">
                <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                   <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                   DETALHES DO LEAD: <span className="text-blue-500">{lead.client}</span>
                </DialogTitle>
                <Badge className={cn(
                  "text-[10px] font-black uppercase tracking-widest px-3 py-1",
                  lead.temperature === 'Quente' ? 'bg-rose-500/10 text-rose-500' :
                  lead.temperature === 'Morno' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'
                )}>
                  {lead.temperature}
                </Badge>
             </div>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-6">
             {/* Left Column: Core Info & Project Details */}
             <div className="lg:col-span-2 space-y-8">
                {/* Project Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-3">
                      <div className="flex items-center gap-2 text-zinc-500">
                         <FileText size={14} />
                         <span className="text-[10px] font-black uppercase italic tracking-widest">Informações de Cadastro</span>
                      </div>
                      <p className="text-xs text-white font-medium leading-relaxed">{lead.registrationInfo || 'Não informado'}</p>
                   </div>
                   <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-3">
                      <div className="flex items-center gap-2 text-zinc-500">
                         <Layout size={14} />
                         <span className="text-[10px] font-black uppercase italic tracking-widest">Briefing do Projeto</span>
                      </div>
                      <p className="text-xs text-white font-medium leading-relaxed">{lead.briefing || 'Não informado'}</p>
                   </div>
                   <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-3">
                      <div className="flex items-center gap-2 text-zinc-500">
                         <FolderOpen size={14} />
                         <span className="text-[10px] font-black uppercase italic tracking-widest">Link da Pasta</span>
                      </div>
                      {lead.folderLink ? (
                        <a href={lead.folderLink} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors">
                           Acessar Drive <ExternalLink size={12} />
                        </a>
                      ) : <p className="text-xs text-zinc-600 italic">Sem link vinculado</p>}
                   </div>
                   <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-3">
                      <div className="flex items-center gap-2 text-zinc-500">
                         <User size={14} />
                         <span className="text-[10px] font-black uppercase italic tracking-widest">Equipe Alocada</span>
                      </div>
                      <div className="space-y-1">
                         <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight">Vendedor: <span className="text-white">{lead.salesperson}</span></p>
                         <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight">Designer Apoio: <span className="text-white">{lead.supportDesigner || 'Ninguém alocado'}</span></p>
                      </div>
                   </div>
                   <div className="p-4 bg-blue-600/10 border border-blue-600/20 rounded-2xl space-y-2 col-span-1 md:col-span-2">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2 text-blue-500">
                            <TrendingUp size={14} />
                            <span className="text-[10px] font-black uppercase italic tracking-widest">Valor Estimado do Projeto</span>
                         </div>
                         <span className="text-sm font-black text-white italic tracking-tighter">R$ {lead.value.toLocaleString('pt-BR')}</span>
                      </div>
                   </div>
                </div>

                {/* Observations & Next Action */}
                <div className="space-y-4">
                   <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-zinc-500 italic tracking-widest">Próxima Ação Agendada</Label>
                      <div className="p-4 bg-blue-600/5 border border-blue-600/20 rounded-2xl flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                            <Plus size={20} />
                         </div>
                         <div>
                            <p className="text-xs text-white font-bold uppercase italic tracking-tight">{lead.nextAction || 'Definir próxima ação'}</p>
                            <span className="text-[9px] font-black text-blue-500/70 uppercase">Status: Pendente</span>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-zinc-500 italic tracking-widest">Observações Internas</Label>
                      <div className="p-4 bg-[#050505] border border-white/5 rounded-2xl">
                         <p className="text-xs text-zinc-400 font-medium leading-relaxed italic">
                            "{lead.observations || 'Sem observações adicionais.'}"
                         </p>
                      </div>
                   </div>
                </div>

                <Separator className="bg-white/5" />

                <div className="space-y-4">
                   <Label className="text-[10px] font-black uppercase text-zinc-500 italic tracking-widest">Gerenciar Objeções do Fluxo</Label>
                   <div className="flex gap-2">
                      <Input 
                        placeholder="Adicionar nova objeção detectada..." 
                        value={newObjection}
                        onChange={(e) => setNewObjection(e.target.value)}
                        className="bg-white/5 border-white/10 text-xs" 
                      />
                      <Button onClick={addObjection} size="sm" className="bg-blue-600 hover:bg-blue-700 h-9 px-4">
                        <Plus size={16} />
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {PRE_DEFINED_OBJECTIONS.map((obj) => (
                        <Badge 
                          key={obj} 
                          onClick={() => !objections.includes(obj) && addObjection()}
                          className="bg-zinc-900 border-white/10 text-[8px] cursor-pointer hover:bg-blue-600/20 transition-colors py-1"
                        >
                          + {obj}
                        </Badge>
                      ))}
                    </div>

                    <ScrollArea className="h-[120px] bg-[#050505] rounded-xl p-4 border border-white/5">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {objections.length === 0 ? (
                            <div className="col-span-2 text-[10px] text-zinc-700 font-bold uppercase italic text-center py-8">Nenhuma objeção registrada</div>
                          ) : (
                            objections.map((obj, i) => (
                              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 group">
                                 <span className="text-[10px] font-bold text-white uppercase italic">{obj}</span>
                                 <button 
                                   onClick={() => removeObjection(i)}
                                   className="text-zinc-600 hover:text-rose-500 transition-colors"
                                 >
                                    <Plus size={14} className="rotate-45" />
                                 </button>
                              </div>
                            ))
                          )}
                       </div>
                    </ScrollArea>
                 </div>
              </div>

              {/* Right Column: AI Insights & Qualification */}
              <div className="space-y-6">
                 <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <Label className="text-[10px] font-black uppercase text-zinc-500 italic tracking-widest">Script IA Personalizado</Label>
                       <Button 
                         onClick={getAiScript} 
                         disabled={isScriptLoading || objections.length === 0}
                         variant="ghost" 
                         className="h-6 text-[8px] font-black uppercase text-blue-500 hover:text-blue-400 p-0"
                       >
                          <Sparkles size={12} className="mr-1" /> Gerar Script
                       </Button>
                    </div>
                    
                    <div className="relative group">
                       <div className="absolute inset-0 bg-blue-600/10 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />
                       <div className="relative bg-[#050505] border border-white/5 rounded-2xl p-6 min-h-[400px]">
                          {isScriptLoading ? (
                            <div className="flex flex-col items-center justify-center h-full gap-4 pt-24">
                               <div className="w-8 h-8 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
                               <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest animate-pulse">Consultando Core Inteligente...</span>
                            </div>
                          ) : aiScript ? (
                            <div className="prose prose-invert prose-xs">
                               <p className="text-[12px] text-white leading-relaxed font-medium italic whitespace-pre-wrap">{aiScript}</p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center gap-4 pt-24 opacity-30">
                               <Sparkles size={40} className="text-blue-500" />
                               <p className="text-[10px] font-black uppercase tracking-widest italic leading-tight">Escolha as objeções e clique em "Gerar Script" para receber o apoio tático da IA.</p>
                            </div>
                          )}
                       </div>
                    </div>
                    {aiScript && (
                       <Button 
                         onClick={() => {
                           navigator.clipboard.writeText(aiScript);
                         }}
                         className="w-full bg-blue-600 hover:bg-blue-700 text-[10px] font-black uppercase italic tracking-widest h-12 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                       >
                          <MessageSquare size={14} className="mr-2" /> Copiar script
                       </Button>
                    )}
                 </div>

                 <Separator className="bg-white/5" />

                 <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase text-zinc-500 italic tracking-widest">Qualificação IA da Conta</Label>
                    <div className="grid grid-cols-1 gap-2">
                       <Button 
                         onClick={() => updateTemperature('Quente')}
                         variant="outline" 
                         className={cn(
                           "h-14 flex items-center justify-start gap-4 border-emerald-500/20 bg-emerald-500/5 text-emerald-500 hover:bg-emerald-500/10",
                           lead.temperature === 'Quente' && "border-emerald-500 bg-emerald-500/10"
                         )}
                       >
                          <Zap size={18} /> 
                          <div className="text-left">
                             <span className="text-[9px] font-black uppercase block">Altíssimo Potencial (Quente)</span>
                             <span className="text-[8px] font-bold opacity-60">50-70% TAXA DE CONVERSÃO</span>
                          </div>
                       </Button>
                       <Button 
                         onClick={() => updateTemperature('Morno')}
                         variant="outline" 
                         className={cn(
                           "h-14 flex items-center justify-start gap-4 border-amber-500/20 bg-amber-500/5 text-amber-500 hover:bg-amber-500/10",
                           lead.temperature === 'Morno' && "border-amber-500 bg-amber-500/10"
                         )}
                       >
                          <TrendingUp size={18} /> 
                          <div className="text-left">
                             <span className="text-[9px] font-black uppercase block">Potencial Médio (Morno)</span>
                             <span className="text-[8px] font-bold opacity-60">20-30% TAXA DE CONVERSÃO</span>
                          </div>
                       </Button>
                       <Button 
                         onClick={() => updateTemperature('Frio')}
                         variant="outline" 
                         className={cn(
                           "h-14 flex items-center justify-start gap-4 border-blue-500/20 bg-blue-500/5 text-blue-500 hover:bg-blue-500/10",
                           lead.temperature === 'Frio' && "border-blue-500 bg-blue-500/10"
                         )}
                       >
                          <TrendingDown size={18} /> 
                          <div className="text-left">
                             <span className="text-[9px] font-black uppercase block">Baixo Interesse (Frio)</span>
                             <span className="text-[8px] font-bold opacity-60">5-10% TAXA DE CONVERSÃO</span>
                          </div>
                       </Button>
                    </div>
                 </div>
              </div>
           </div>
        </DialogContent>
     </Dialog>
  );
}

export function CRMFollow() {
  const leads = useStore(state => state.leads);
  const sync = useStore(state => state.syncCollection);
  const seed = useStore(state => state.seedCollection);
  const addItem = useStore(state => state.addItem);

  const [activeView, setActiveView] = useState<'board' | 'performance'>('board');
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = sync('leads');
    seed('leads', LEADS_MOCK);
    return () => unsubscribe();
  }, [sync, seed]);

  // Gemini Setup
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const fetchAiPerformance = async () => {
    setIsAiLoading(true);
    try {
      const prompt = `Analise a performance de vendas da Korteck Comunicação Visual. Vendedores: ${JSON.stringify(SALESPERSON_PERFORMANCE)}. Leads Atuais: ${JSON.stringify(leads)}. Gere um sumário executivo curto de 3 frases com previsibilidade de fechamento e alertas de gargalo. Responda em Português com tom futurista e minimalista.`;
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      setAiAnalysis(response.text || '');
    } catch (err) {
      setAiAnalysis('Falha na conexão com o Core Inteligente Korteck.');
    } finally {
      setIsAiLoading(false);
    }
  };

  useEffect(() => {
    if (leads.length > 0) {
      fetchAiPerformance();
    }
  }, [leads.length]);

  const handleAddLead = () => {
    const id = `L-${Math.floor(Math.random() * 1000)}`;
    addItem('leads', id, {
      client: 'Novo Cliente Potential',
      value: 0,
      salesperson: 'Ricardo Silva',
      status: 'lead-franq',
      entryDate: format(new Date(), 'yyyy-MM-dd'),
      lastContact: format(new Date(), 'yyyy-MM-dd'),
      temperature: 'Morno',
      lastAction: 'Lead cadastrado',
      objections: []
    });
  };

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-background to-background min-h-screen">
      
      {/* Top Performance Report */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#0c0c10] border-white/5 p-6 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 blur-3xl rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform" />
           <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Conversão Global</span>
              <TrendingUp size={16} className="text-emerald-500" />
           </div>
           <div className="text-4xl font-black text-white italic tracking-tighter">64.8%</div>
           <p className="text-[9px] font-black text-zinc-600 mt-2 uppercase tracking-widest">+4.2% VS MÊS ANTERIOR</p>
        </Card>

        <Card className="bg-[#0c0c10] border-white/5 p-6 shadow-2xl">
           <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Tempo em Coluna (Avg)</span>
              <Clock size={16} className="text-blue-500" />
           </div>
           <div className="text-4xl font-black text-white italic tracking-tighter">4.2 <span className="text-sm">DIAS</span></div>
           <div className="w-full h-1.5 bg-white/5 rounded-full mt-4 overflow-hidden">
               <motion.div initial={{ width: 0 }} animate={{ width: '42%' }} className="h-full bg-blue-600" />
           </div>
        </Card>

        <Card className="bg-[#0c0c10] border-white/5 p-6 shadow-2xl">
           <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Pipeline Ativo</span>
              <BarChart3 size={16} className="text-amber-500" />
           </div>
           <div className="text-4xl font-black text-white italic tracking-tighter">R$ 542k</div>
           <p className="text-[9px] font-black text-emerald-500 mt-2 uppercase tracking-widest italic">R$ 124k Previsão p/ Hoje</p>
        </Card>

        <Card className="bg-blue-600 border-0 p-6 shadow-[0_0_50px_rgba(37,99,235,0.25)] flex flex-col justify-center">
           <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-white animate-pulse" />
              <span className="text-[10px] font-black text-white/50 uppercase tracking-widest italic">IA Prediction Core</span>
           </div>
           <div className="text-[11px] font-bold text-white italic leading-tight uppercase">
              {isAiLoading ? "Processando Performance..." : aiAnalysis}
           </div>
        </Card>
      </div>

      {/* Header Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-[#0c0c10] border border-white/5 p-6 rounded-2xl">
         <div className="flex items-center gap-6">
            <div>
               <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                  CRM FOLLOW-UP <span className="text-blue-500">[CRM-FOLLOW]</span>
               </h1>
               <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1.5">
                     <div className="w-2 h-2 rounded-full bg-emerald-500" />
                     <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">32 Clientes Quentes</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                     <div className="w-2 h-2 rounded-full bg-amber-500" />
                     <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">18 Clientes Mornos</span>
                  </div>
               </div>
            </div>
         </div>

         <div className="flex items-center gap-3">
            <div className="flex bg-[#050505] border border-white/5 p-1 rounded-xl">
               <button 
                  onClick={() => setActiveView('board')}
                  className={cn(
                    "px-4 py-2 text-[10px] font-black uppercase italic tracking-widest rounded-lg transition-all",
                    activeView === 'board' ? "bg-blue-600 text-white" : "text-zinc-500 hover:text-white"
                  )}
               >
                  Board Kanban
               </button>
               <button 
                  onClick={() => setActiveView('performance')}
                  className={cn(
                    "px-4 py-2 text-[10px] font-black uppercase italic tracking-widest rounded-lg transition-all",
                    activeView === 'performance' ? "bg-blue-600 text-white" : "text-zinc-500 hover:text-white"
                  )}
               >
                  Performance Vendedores
               </button>
            </div>
            <Button onClick={handleAddLead} className="bg-blue-600 text-white hover:bg-blue-700 h-10 px-6 text-[10px] font-black uppercase tracking-widest">
               <Plus size={14} className="mr-2" /> Novo Lead
            </Button>
         </div>
      </div>

      {/* Main Content Area */}
      {activeView === 'board' ? (
        <div className="h-[calc(100vh-400px)]">
          <KanbanBoard 
            columns={COLUMNS.map(c => ({ id: c.id, title: c.title, color: c.color.replace('bg-', 'text-') }))}
            items={leads.map(lead => ({
              id: lead.id,
              title: lead.client,
              subtitle: lead.salesperson,
              status: lead.status,
              value: `R$ ${lead.value.toLocaleString('pt-BR')}`,
              date: lead.entryDate,
              tags: lead.temperature === 'Quente' ? [{ label: 'QUENTE', color: 'bg-rose-500/20 text-rose-500' }] : [],
              assignee: { name: lead.salesperson, avatar: `https://i.pravatar.cc/100?u=${lead.salesperson}` }
            }))}
            onItemMove={(itemId, newStatus) => {
              useStore.getState().updateItem('leads', itemId, { status: newStatus });
            }}
            renderCard={(item) => {
              const fullLead = leads.find(l => l.id === item.id);
              if (!fullLead) return null;
              return <LeadCard lead={fullLead} />;
            }}
          />
        </div>
      ) : (
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
               <Card className="bg-[#0c0c10] border-white/5 p-6 overflow-hidden">
                  <h3 className="text-xs font-black text-white uppercase italic tracking-[0.2em] mb-8 flex items-center gap-2">
                     <TrendingUp size={16} className="text-blue-500" /> Ranking de Conversão [%]
                  </h3>
                  <div className="space-y-10">
                     {SALESPERSON_PERFORMANCE.map((sp) => (
                        <div key={sp.name} className="space-y-3">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                 <Avatar className="w-10 h-10 border border-white/10">
                                    <AvatarImage src={`https://i.pravatar.cc/100?u=${sp.name}`} />
                                    <AvatarFallback className="bg-zinc-800 text-[10px] font-black uppercase">{sp.name.split(' ')[0][0]}{sp.name.split(' ')[1][0]}</AvatarFallback>
                                 </Avatar>
                                 <div>
                                    <h4 className="text-sm font-black text-white uppercase italic">{sp.name}</h4>
                                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Revenue: {sp.revenue}</p>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <div className="text-lg font-black text-blue-500 italic leading-none">{sp.conversion}%</div>
                                 <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Conversion Rate</p>
                              </div>
                           </div>
                           <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${sp.conversion}%` }} className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
                           </div>
                           <div className="flex items-center justify-between px-1">
                              <div className="flex items-center gap-1.5 text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                                 <Clock size={10} /> Lead Time: {sp.avgTime}
                              </div>
                              <div className="flex items-center gap-2">
                                 <Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-[8px] font-black">HIGH PERFORMANCE</Badge>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </Card>
            </div>
            
            <div className="space-y-6">
               <Card className="bg-[#0c0c10] border-white/5 p-8 text-center space-y-6 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-3xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-500 shadow-[0_0_50px_rgba(37,99,235,0.1)]">
                     <Target size={40} />
                  </div>
                  <div>
                     <h3 className="text-sm font-black text-white uppercase italic tracking-[0.2em] mb-2">Meta de Vendas Korteck</h3>
                     <p className="text-xs text-zinc-500 font-medium uppercase tracking-tighter">Faltam <span className="text-white">R$ 145.000,00</span> para bater a meta global do trimestre.</p>
                  </div>
                  <div className="w-full space-y-2">
                     <div className="flex justify-between text-[10px] font-black italic uppercase">
                        <span className="text-zinc-600">Progresso Atual</span>
                        <span className="text-blue-600">72%</span>
                     </div>
                     <Progress value={72} className="h-2 bg-white/5" indicatorClassName="bg-blue-600" />
                  </div>
                  <Button className="w-full border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-widest h-12 hover:bg-white/10 transition-colors">
                     Ver Detalhamento Financeiro
                  </Button>
               </Card>

               <Card className="bg-gradient-to-br from-[#0c0c10] to-[#050505] border-white/5 p-6">
                  <h4 className="text-[10px] font-black text-white uppercase italic tracking-widest flex items-center gap-2 mb-6">
                     <Zap size={14} className="text-amber-500" /> Ações Sugeridas (AI)
                  </h4>
                  <div className="space-y-4">
                     {[
                       { action: 'Follow-up Urgente', client: 'Posto Petrobras', type: 'Email', icon: <Mail /> },
                       { action: 'Re-atribuir Lead Frio', client: 'Restaurante Sabor', type: 'Call', icon: <Phone /> },
                       { action: 'Finalizar Proposta', client: 'Condomínio Alpha', type: 'Review', icon: <UserCheck /> },
                     ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.02] transition-all cursor-pointer group border border-transparent hover:border-white/5">
                           <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-500 group-hover:text-blue-500 transition-colors">
                              {React.cloneElement(item.icon as React.ReactElement, { size: 14 })}
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[10px] font-black text-white uppercase italic group-hover:translate-x-1 transition-transform">{item.action}</span>
                              <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">{item.client} | {item.type}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </Card>
            </div>
         </div>
      )}
    </div>
  );
}
