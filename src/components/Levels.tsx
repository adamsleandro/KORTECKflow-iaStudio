import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  ShieldCheck, 
  ShieldAlert, 
  TrendingUp, 
  Zap, 
  Lock, 
  BrainCircuit,
  Network,
  Cpu,
  Layers,
  ChevronRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  Users,
  Search,
  Filter,
  ArrowUpRight,
  Fingerprint
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface LevelNode {
  id: string;
  name: string;
  count: number;
  securityScore: number;
  description: string;
  color: string;
  critical: boolean;
}

const HIERARCHY_LEVELS: LevelNode[] = [
  { id: 'L0', name: 'Nível 0 (Root)', count: 2, securityScore: 100, description: 'Acesso total à infraestrutura e banco de dados.', color: 'text-rose-500', critical: true },
  { id: 'L1', name: 'Nível 1 (Executivo)', count: 5, securityScore: 95, description: 'Gestão estratégica e dashboards consolidados.', color: 'text-purple-500', critical: false },
  { id: 'L2', name: 'Nível 2 (Gerência)', count: 12, securityScore: 88, description: 'Controle de setores e aprovações de faturamento.', color: 'text-blue-500', critical: false },
  { id: 'L3', name: 'Nível 3 (Supervisão)', count: 28, securityScore: 82, description: 'Monitoramento de fluxo e gestão de escalas.', color: 'text-emerald-500', critical: false },
  { id: 'L4', name: 'Nível 4 (Operacional)', count: 85, securityScore: 75, description: 'Execução de tarefas e registros de produção.', color: 'text-zinc-500', critical: false },
];

export function LevelsManagement() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>('L0');

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700 max-w-[1600px] mx-auto">
      {/* Header Níveis */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-blue-500 mb-2 uppercase">
            <Layers size={14} /> HIERARQUIA DE ACESSO [SYS-LEVELS]
          </div>
          <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">
            Níveis de Segurança<span className="text-blue-600">.</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white/5 border-transparent hover:bg-white/10 text-white h-11 px-6 text-[10px] uppercase font-black tracking-widest">
            Exportar Protocolos
          </Button>
          <Button className="bg-blue-600 text-white hover:bg-blue-500 font-bold h-11 px-8 text-[11px] uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(37,99,235,0.25)] transition-all">
            <ShieldCheck className="mr-2" size={16} /> Auditar Níveis
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Visual Hierarchy Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4">
            {HIERARCHY_LEVELS.map((level, idx) => (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <button
                  onClick={() => setSelectedLevel(level.id)}
                  className={cn(
                    "w-full p-6 rounded-2xl border transition-all text-left group relative overflow-hidden",
                    selectedLevel === level.id 
                      ? "bg-blue-600/5 border-blue-500/30 shadow-[0_0_40px_rgba(37,99,235,0.05)]" 
                      : "bg-white dark:bg-zinc-900 border-transparent hover:border-transparent"
                  )}
                >
                  {selectedLevel === level.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />
                  )}
                  
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center font-black italic text-xl border",
                        selectedLevel === level.id ? "bg-blue-600 border-blue-400 text-white" : "bg-zinc-900 border-transparent text-zinc-500"
                      )}>
                        {level.id}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-black text-white italic uppercase tracking-tight">{level.name}</h3>
                          {level.critical && (
                            <Badge className="bg-rose-500/10 text-rose-500 border-0 text-[8px] font-black uppercase h-4">Crítico</Badge>
                          )}
                        </div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">
                          {level.count} USUÁRIOS ATRIBUÍDOS • {level.securityScore}% SCORE SEGURANÇA
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                      <div className="text-right hidden md:block">
                        <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">Integridade IA</p>
                        <div className="flex items-center gap-1.5">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                           <span className="text-[11px] font-black text-emerald-500 uppercase italic">Verificado</span>
                        </div>
                      </div>
                      <ChevronRight className={cn(
                        "transition-transform",
                        selectedLevel === level.id ? "rotate-90 text-blue-500" : "text-zinc-700"
                      )} />
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Details & AI Audit Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI Auditor Insight */}
          <Card className="bg-gradient-to-br from-blue-600/10 to-indigo-900/10 border border-blue-500/20 relative overflow-hidden">
            <CardHeader>
              <div className="flex items-center gap-2 text-blue-400 text-[10px] font-black tracking-[0.2em] mb-2 uppercase">
                <BrainCircuit size={14} className="animate-pulse" /> Cortex Auditoria IA
              </div>
              <CardTitle className="text-sm font-black text-white uppercase italic tracking-widest leading-tight">
                Análise de Densidade<br />Hierárquica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-xl bg-black/40 border-none space-y-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-amber-500 mt-0.5 shrink-0" size={16} />
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
                    O nível <span className="text-white font-bold">Nível 0 (Root)</span> possui 2 usuários, o que é ideal. No entanto, o <span className="text-white font-bold">Nível 2</span> cresceu 40% este mês. Recomendamos auditoria de cargos.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-zinc-500">Risco de Escalada</span>
                    <span className="text-emerald-500">Baixo</span>
                 </div>
                 <Progress value={22} className="h-1 bg-white/5" />
              </div>
              
              <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest h-10 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                Gerar Relatório de Impacto
              </Button>
            </CardContent>
          </Card>

          {/* Level Constraints */}
          <Card className="bg-white dark:bg-zinc-900 border-transparent">
            <CardHeader className="border-b border-transparent bg-white/[0.01]">
              <CardTitle className="text-sm font-black text-white uppercase tracking-widest italic">Restrições de Protocolo</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedLevel}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    {HIERARCHY_LEVELS.find(l => l.id === selectedLevel)?.description}
                  </p>
                  
                  <div className="space-y-3">
                    {[
                      { label: 'Acesso a API Global', allowed: selectedLevel === 'L0' },
                      { label: 'Deleção de Logs', allowed: selectedLevel === 'L0' },
                      { label: 'Gestão de Usuários', allowed: ['L0', 'L1', 'L2'].includes(selectedLevel!) },
                      { label: 'Visualização de Dashboards', allowed: true },
                    ].map((rule, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border-none">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight">{rule.label}</span>
                        {rule.allowed ? (
                          <CheckCircle2 size={14} className="text-emerald-500" />
                        ) : (
                          <Lock size={14} className="text-zinc-800" />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-zinc-900 border-transparent overflow-hidden">
             <CardHeader className="border-b border-transparent bg-white/[0.01]">
                <CardTitle className="text-sm font-black text-white uppercase tracking-widest italic">Últimos Upgrades</CardTitle>
             </CardHeader>
             <CardContent className="p-0">
                <div className="divide-y divide-white/5">
                   {[
                     { user: 'Marcos Silva', from: 'L3', to: 'L2', date: 'Hoje' },
                     { user: 'Ana Julia', from: 'L2', to: 'L1', date: 'Ontem' },
                   ].map((up, i) => (
                     <div key={i} className="p-4 flex items-center justify-between">
                        <div>
                           <p className="text-[11px] font-bold text-white uppercase italic">{up.user}</p>
                           <p className="text-[9px] text-zinc-600 uppercase font-black tracking-widest">{up.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                           <Badge variant="outline" className="text-[8px] bg-zinc-900 border-transparent text-zinc-500 uppercase">{up.from}</Badge>
                           <ChevronRight size={10} className="text-zinc-700" />
                           <Badge className="text-[8px] bg-blue-600 border-0 text-white uppercase">{up.to}</Badge>
                        </div>
                     </div>
                   ))}
                </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
