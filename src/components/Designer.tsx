import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette, 
  Eye, 
  FileCode, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Layout, 
  Maximize2,
  MoreVertical,
  Plus,
  MessageSquare,
  Paperclip,
  History,
  Workflow,
  Search,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface DesignProject {
  id: string;
  os: string;
  client: string;
  title: string;
  designer: string;
  status: 'briefing' | 'creation' | 'review' | 'adjustments' | 'approved' | 'finalizing';
  timeSpent: string;
  revisions: number;
}

const DESIGN_PROJECTS: DesignProject[] = [
  { id: '1', os: '4251', client: 'Banco Itaú', title: 'Fachada Agência Paulista', designer: 'Ana Beatriz', status: 'creation', timeSpent: '4h 12m', revisions: 0 },
  { id: '2', os: '4252', client: 'Restaurante Sabor', title: 'Cardápios & Logo', designer: 'Fernanda Lima', status: 'review', timeSpent: '12h 45m', revisions: 2 },
  { id: '3', os: '4254', client: 'Loggi', title: 'Adesivagem Frota VUC', designer: 'Ana Beatriz', status: 'approved', timeSpent: '8h 20m', revisions: 1 },
  { id: '4', os: '4260', client: 'Tech Corp', title: 'Totem Sinalização', designer: 'Julia Santos', status: 'briefing', timeSpent: '0h 0m', revisions: 0 },
];

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  briefing: { label: 'Briefing', color: 'bg-zinc-500' },
  creation: { label: 'Criação', color: 'bg-blue-500' },
  review: { label: 'Revisão Interna', color: 'bg-amber-500' },
  adjustments: { label: 'Ajustes Cliente', color: 'bg-purple-500' },
  approved: { label: 'Aprovado', color: 'bg-emerald-500' },
  finalizing: { label: 'Arte Final', color: 'bg-indigo-500' },
};

export function Designer() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-zinc-500 mb-2 uppercase">
            <Palette size={14} /> MÓDULO DE CRIAÇÃO
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white uppercase tracking-tighter">Workflow de Designers</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-white h-10 px-6 font-bold uppercase text-[10px] tracking-widest">
            <History size={16} className="mr-2" /> Histórico
          </Button>
          <Button className="bg-blue-600 text-white hover:bg-blue-500 h-10 font-bold px-6 shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all">
            <Plus size={16} className="mr-2" /> Novo Briefing
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Projetos em Criação', value: '12', icon: <Palette className="text-blue-500" /> },
          { label: 'Aguardando Revisão', value: '05', icon: <Eye className="text-amber-500" /> },
          { label: 'Aprovados Hoje', value: '08', icon: <CheckCircle className="text-emerald-500" /> },
          { label: 'Retrabalho (Revisões)', value: '14%', icon: <AlertTriangle className="text-rose-500" /> },
        ].map((kpi, i) => (
          <Card key={i} className="bg-white/[0.02] border-white/5 hover:border-white/10 transition-all">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">{kpi.label}</p>
                <h3 className="text-2xl font-bold text-white tracking-tight">{kpi.value}</h3>
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">{kpi.icon}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Kanban for Design Workflow */}
      <div className="flex overflow-x-auto gap-6 pb-6 min-h-[600px]">
        {['creation', 'review', 'adjustments', 'finalizing'].map((stage) => {
          const statusInfo = STATUS_LABELS[stage as keyof typeof STATUS_LABELS];
          const projects = DESIGN_PROJECTS.filter(p => p.status === stage);

          return (
            <div key={stage} className="min-w-[340px] w-[340px] flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                  <div className={cn("w-2 h-2 rounded-full", statusInfo.color)} />
                  <h3 className="text-[11px] font-bold tracking-[0.2em] text-zinc-400 uppercase">{statusInfo.label}</h3>
                </div>
                <Badge variant="outline" className="bg-white/5 border-0 text-[10px] text-zinc-500 font-bold px-1.5">{projects.length}</Badge>
              </div>

              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-3 flex flex-col gap-3">
                {projects.map(project => (
                   <motion.div 
                      key={project.id}
                      className="bg-[#0c0c0c] border border-white/5 p-4 rounded-xl shadow-lg hover:border-white/20 transition-all cursor-grab active:cursor-grabbing group"
                   >
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-blue-500/10 text-blue-400 border-0 text-[9px] font-bold px-1.5 py-0 h-4">OS-{project.os}</Badge>
                        <div className="flex gap-1">
                           <button className="p-1 text-zinc-700 hover:text-white"><MessageSquare size={13} /></button>
                           <button className="p-1 text-zinc-700 hover:text-white"><Paperclip size={13} /></button>
                           <button className="p-1 text-zinc-700 hover:text-white"><MoreVertical size={13} /></button>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-none mb-1">{project.client}</p>
                        <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight line-clamp-1">{project.title}</h4>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1.5">
                           <div className="flex justify-between items-center text-[9px] font-bold text-zinc-600 uppercase">
                              <span>Tempo Decorrido</span>
                              <span className="text-zinc-500">{project.timeSpent}</span>
                           </div>
                           <Progress value={Math.random() * 80 + 20} className="h-1 bg-white/5 rounded-full" />
                        </div>

                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6 border border-white/10">
                                 <AvatarImage src={`https://i.pravatar.cc/100?u=${project.designer}`} />
                                 <AvatarFallback>{project.designer[0]}</AvatarFallback>
                              </Avatar>
                              <span className="text-[10px] font-bold text-zinc-400">{project.designer}</span>
                           </div>
                           {project.revisions > 0 && (
                             <Badge variant="outline" className="bg-rose-500/5 border-rose-500/20 text-rose-500 text-[8px] font-bold px-1.5 py-0 h-4 uppercase">
                               {project.revisions} Revisões
                             </Badge>
                           )}
                        </div>
                      </div>
                   </motion.div>
                ))}

                <button className="w-full h-10 border border-dashed border-white/5 hover:border-white/10 text-zinc-600 hover:text-zinc-400 text-[10px] font-bold tracking-widest uppercase transition-all rounded-lg flex items-center justify-center gap-2">
                   <Plus size={14} /> Atribuir Tarefa
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
