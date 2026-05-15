import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Play, 
  Lock, 
  CheckCircle2, 
  Clock, 
  Star, 
  Users, 
  ArrowRight, 
  Search,
  Filter,
  Medal,
  BookOpen,
  Award,
  Zap,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function EducaCV() {
  const [activeTab, setActiveTab] = React.useState('cursos');

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-750 max-w-[1600px] mx-auto pb-24">
      {/* Mesh Education Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 border-b border-white/5 pb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
             <div className="p-2.5 bg-amber-600/10 rounded-xl border border-amber-500/20">
                <GraduationCap size={28} className="text-amber-500" />
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-[0.5em] text-zinc-500 uppercase">INDUSTRIAL TRAINING // MESH-CORE</span>
                <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                  Educa <span className="text-amber-600">CV</span> <span className="text-zinc-700 mx-1">&</span> Treinamento
                </h1>
             </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
           <div className="hidden xl:flex items-center gap-10 px-8 border-r border-white/5 mr-3">
              <div className="text-right">
                 <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">CERTIFICADOS</p>
                 <p className="text-xl font-black text-white italic tracking-tighter">02 ATIVOS</p>
              </div>
              <div className="text-right">
                 <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">XP ACUMULADA</p>
                 <div className="flex items-center gap-2 justify-end">
                    <TrendingUp size={14} className="text-amber-500" />
                    <p className="text-xl font-black text-amber-500 italic">4.250</p>
                 </div>
              </div>
           </div>
           <Button className="bg-white text-black hover:bg-zinc-200 h-14 px-8 font-black uppercase text-[11px] tracking-widest shadow-xl shadow-white/5 transition-all">
              Catálogo de Cursos
           </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-[#0c0c10] border border-white/5 p-1 h-14 flex w-full xl:w-auto overflow-x-auto scrollbar-hide">
          {[
            { id: 'cursos', label: 'MEUS CURSOS', icon: <BookOpen size={14} /> },
            { id: 'certifica', label: 'CERTIFICAÇÕES', icon: <Award size={14} /> },
            { id: 'badges', label: 'RANQUEAMENTO', icon: <Medal size={14} /> },
            { id: 'obrigat', label: 'OBRIGATÓRIOS [NRs]', icon: <Lock size={14} /> },
          ].map(tab => (
            <TabsTrigger 
              key={tab.id}
              value={tab.id}
              className="flex-1 data-[state=active]:bg-white/10 data-[state=active]:text-white text-zinc-500 text-[10px] font-black px-8 h-full tracking-widest uppercase flex items-center justify-center gap-3 border-r border-white/5 last:border-0 rounded-none transition-all whitespace-nowrap"
            >
              {tab.icon} {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="cursos" className="mt-0 outline-none space-y-8">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-6">
                 {/* Main Featured Course */}
                 <Card className="bg-[#0c0c10] border-white/5 overflow-hidden group cursor-pointer active:scale-[0.99] transition-all">
                    <div className="aspect-[21/9] relative">
                       <img 
                          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200" 
                          className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity" 
                          alt="CNC Training" 
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c10] to-transparent" />
                       <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform">
                             <Play size={32} className="ml-1" />
                          </div>
                       </div>
                       <div className="absolute bottom-10 left-10 space-y-2">
                          <Badge className="bg-amber-500 text-amber-950 border-0 font-black px-3 py-1 text-[8px] uppercase tracking-widest shadow-lg shadow-amber-500/20 mb-2">RETOMAR CURSO</Badge>
                          <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">Otimização de Nesting para Router CNC</h2>
                          <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Módulo 4: Redução de Desperdício em ACM & Acrílico</p>
                       </div>
                    </div>
                    <div className="p-1 px-10 pb-10 space-y-4">
                       <div className="flex justify-between items-end text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] italic">
                          <span>Progresso do Módulo</span>
                          <span className="text-white">65% concluído</span>
                       </div>
                       <Progress value={65} className="h-2 bg-white/5" />
                    </div>
                 </Card>

                 {/* Sub Courses Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { title: 'Operação Impressão UV', level: 'Intermediário', time: '12h', xp: '+450', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=400' },
                      { title: 'Acabamentos Premium', level: 'Avançado', time: '8h', xp: '+300', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400' },
                    ].map((c, i) => (
                      <Card key={i} className="bg-[#0c0c10] border-white/5 overflow-hidden group hover:border-amber-500/20 transition-all cursor-pointer">
                         <div className="aspect-video relative overflow-hidden">
                            <img src={c.img} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700" alt={c.title} />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c10] to-transparent opacity-60" />
                            <div className="absolute top-4 right-4">
                               <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
                                  <Play size={12} className="ml-0.5" />
                               </div>
                            </div>
                         </div>
                         <CardContent className="p-6 space-y-4">
                            <div className="space-y-1">
                               <h4 className="text-sm font-black text-white uppercase italic tracking-tight group-hover:text-amber-500 transition-colors">{c.title}</h4>
                               <div className="flex items-center gap-3 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                                  <span>{c.level}</span>
                                  <div className="w-1 h-1 rounded-full bg-zinc-800" />
                                  <span>{c.time}</span>
                               </div>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-white/5">
                               <span className="text-[10px] font-black text-amber-500 italic tracking-tighter">{c.xp} XP</span>
                               <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase text-zinc-500 hover:text-white px-0">Ver Detalhes</Button>
                            </div>
                         </CardContent>
                      </Card>
                    ))}
                 </div>
              </div>

              <div className="lg:col-span-4 space-y-8">
                 {/* Progress Analytics Card */}
                 <Card className="bg-[#0c0c10] border-white/5 p-10 space-y-8">
                    <div className="flex items-center justify-between">
                       <div>
                          <h3 className="text-sm font-black text-white uppercase italic tracking-widest">Seu Desenvolvimento</h3>
                          <p className="text-[10px] font-bold text-zinc-700 uppercase">Visão técnica vs operativa</p>
                       </div>
                       <Zap size={24} className="text-amber-500" />
                    </div>

                    <div className="space-y-8">
                       {[
                         { label: 'OPERAÇÃO MÁQUINA', val: 78, color: 'amber' },
                         { label: 'SEGURANÇA DO TRABALHO', val: 100, color: 'emerald' },
                         { label: 'CRIAÇÃO & ARTE', val: 42, color: 'zinc' },
                       ].map((p, i) => (
                         <div key={i} className="space-y-3">
                            <div className="flex justify-between items-end text-[9px] font-black uppercase tracking-widest italic">
                               <span className="text-zinc-500">{p.label}</span>
                               <span className={cn(p.val === 100 ? "text-emerald-500" : "text-white")}>{p.val}%</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                               <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${p.val}%` }}
                                  className={cn("h-full", p.val === 100 ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" : "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.2)]")}
                               />
                            </div>
                         </div>
                       ))}
                    </div>

                    <Button variant="outline" className="w-full border-white/10 text-white text-[10px] font-black uppercase tracking-widest h-12 hover:bg-white/5 shadow-xl">
                       Pedir Treinamento Specifico
                    </Button>
                 </Card>

                 {/* Challenge Card */}
                 <Card className="bg-amber-600 border-0 p-10 relative overflow-hidden group cursor-pointer">
                    <div className="absolute top-0 right-0 p-12 opacity-20"><Medal size={80} className="text-white" /></div>
                    <div className="relative z-10 space-y-6">
                       <h4 className="text-xl font-black text-white uppercase italic tracking-tighter leading-tight">Desafio da Semana: Eficiência em Chapa</h4>
                       <p className="text-[11px] font-black text-amber-100 uppercase tracking-widest leading-loose">
                          Conclua o módulo de "Cálculo de Desperdício" e ganhe o selo de Especialista Otimizador.
                       </p>
                       <Button className="w-full bg-black text-white hover:bg-zinc-900 border-0 text-[10px] font-black h-12 uppercase tracking-widest mt-4">
                          Iniciar Agora
                       </Button>
                    </div>
                 </Card>
              </div>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
