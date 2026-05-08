import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Play, Lock, CheckCircle, Clock, Star, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export function EducaCV() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-zinc-500 mb-2 uppercase">
            <GraduationCap size={14} /> UNIVERSIDADE CORPORATIVA
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white uppercase tracking-tighter italic">Educa CV</h1>
        </div>
        <div className="flex items-center gap-2">
           <Badge className="bg-emerald-500/10 text-emerald-500 border-0 font-bold px-3 py-1">2 Certificados Concluídos</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <Card className="bg-white/[0.02] border-white/5 overflow-hidden">
              <div className="aspect-video bg-zinc-900 flex items-center justify-center relative group cursor-pointer">
                 <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" alt="Course" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                 <div className="relative z-10 w-20 h-20 rounded-full bg-white text-black flex items-center justify-center translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Play size={32} className="ml-1" />
                 </div>
                 <div className="absolute bottom-6 left-6 text-white">
                    <Badge className="bg-amber-500 text-amber-950 border-0 font-black mb-2 uppercase tracking-widest text-[8px]">EM ANDAMENTO</Badge>
                    <h2 className="text-2xl font-black italic tracking-tighter">Otimização de Nesting para Router CNC</h2>
                    <p className="text-xs font-medium text-zinc-400 mt-1">Módulo 4: Redução de Desperdício em ACM</p>
                 </div>
              </div>
              <div className="p-1 bg-white/10">
                 <div className="h-1 bg-amber-500" style={{ width: '65%' }} />
              </div>
           </Card>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {[
               { title: 'Segurança NR-35', level: 'Obrigatório', duration: '4h', icon: <Lock className="text-rose-500" /> },
               { title: 'Operação Impressão UV', level: 'Avançado', duration: '12h', icon: <Star className="text-amber-500" /> },
               { title: 'Gestão Lean para CV', level: 'Gerencial', duration: '8h', icon: <Users className="text-blue-500" /> },
               { title: 'Acabamentos em Acrílico', level: 'Técnico', duration: '6h', icon: <GraduationCap size={20} className="text-purple-500" /> },
             ].map((course, i) => (
               <Card key={i} className="bg-white/[0.01] border-white/5 hover:bg-white/[0.03] transition-all cursor-pointer group">
                  <CardContent className="p-5 flex items-center gap-4">
                     <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">{course.icon}</div>
                     <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                           <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{course.title}</h4>
                        </div>
                        <div className="flex items-center gap-3">
                           <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{course.level}</span>
                           <div className="w-1 h-1 rounded-full bg-zinc-800" />
                           <div className="flex items-center gap-1 text-[9px] font-bold text-zinc-600">
                              <Clock size={10} /> {course.duration}
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>
             ))}
           </div>
        </div>

        <div className="space-y-6">
           <Card className="bg-zinc-950 border-white/5">
              <CardHeader>
                 <CardTitle className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Seu Progresso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                       <span>Conhecimento Técnico</span>
                       <span>72%</span>
                    </div>
                    <Progress value={72} className="h-1.5 bg-white/5" />
                 </div>
                 <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                       <span>Segurança & NR</span>
                       <span>100%</span>
                    </div>
                    <Progress value={100} className="h-1.5 bg-emerald-500/20" />
                 </div>
              </CardContent>
           </Card>

           <Card className="bg-blue-600 p-6 relative overflow-hidden group cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[40px] -mr-16 -mt-16 rounded-full group-hover:scale-125 transition-transform" />
              <div className="relative z-10">
                 <h3 className="text-lg font-black text-white italic tracking-tighter mb-2">Desafio de Eficiência</h3>
                 <p className="text-xs font-bold text-white/80 mb-6 leading-relaxed">
                   Conclua o curso de <span className="text-white">Troca de Mídia Rápida</span> e ganhe a Badge "Ninja da Impressão".
                 </p>
                 <Button className="w-full bg-black text-white hover:bg-zinc-900 font-bold text-xs tracking-widest h-10 px-0">
                    INICIAR DESAFIO <ArrowRight size={16} className="ml-2" />
                 </Button>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
