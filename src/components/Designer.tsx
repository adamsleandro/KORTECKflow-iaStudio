import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, 
  Layers, 
  FileCode, 
  Maximize, 
  Zap, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  Upload, 
  Download,
  Eye,
  Settings,
  Scissors,
  Box,
  LayoutTemplate,
  Monitor,
  PenTool,
  Hash,
  Palette,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// --- MOCK DATA FOR CNC ENGINEERING ---
const ACTIVE_PROJECTS = [
  { id: 'PRJ-882', client: 'Santander', name: 'Fachada Agência Paulista', type: 'ACM / LED', status: 'pre-flight', progress: 45, designer: 'Alan B.', priority: 'high' },
  { id: 'PRJ-885', client: 'Hospital Israelita', name: 'Sinalização Emergência', type: 'Acrílico 5mm', status: 'nesting', progress: 85, designer: 'Alan B.', priority: 'critical' },
  { id: 'PRJ-880', client: 'Loggi', name: 'Frota Adesivação', type: 'Vinil Polimérico', status: 'approved', progress: 100, designer: 'Camila R.', priority: 'medium' },
];

export function Designer({ initialTab: propInitialTab }: { initialTab?: string }) {
  const [activeTab, setActiveTab] = useState('eng-view');

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-750 max-w-[1600px] mx-auto pb-24">
      {/* Engineering / Pre-Press Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 border-b border-white/5 pb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
             <div className="p-2.5 bg-indigo-600/10 rounded-xl border border-indigo-500/20">
                <PenTool size={28} className="text-indigo-500" />
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-[0.5em] text-zinc-500 uppercase">ENGINEERING & CAM // MESH-CORE</span>
                <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                  Engenharia <span className="text-indigo-600">de</span> Arte <span className="text-zinc-700 mx-2">&</span> CAM
                </h1>
             </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-12 px-6 bg-white/5 border-white/10 text-white font-black uppercase text-[10px] tracking-widest gap-2">
              <Download size={16} /> Templates DXF
           </Button>
           <Button className="bg-white text-black hover:bg-zinc-200 h-12 px-8 font-black uppercase text-[11px] tracking-widest shadow-xl transition-all gap-2">
              <Upload size={18} /> Novo Arquivo [F4]
           </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-[#0c0c10] border border-white/5 p-1 h-14 flex w-full xl:w-auto overflow-x-auto scrollbar-hide">
          {[
            { id: 'eng-view', label: 'WORKFLOW TÉCNICO', icon: <Monitor size={14} /> },
            { id: 'pre-flight', label: 'PRE-FLIGHT / DXF', icon: <FileCode size={14} /> },
            { id: 'nesting', label: 'OTIMIZAÇÃO / NESTING', icon: <Layers size={14} /> },
            { id: 'material-spec', label: 'ESPECIFICAÇÃO TÉCNICA', icon: <Box size={14} /> },
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

        <TabsContent value="eng-view" className="mt-0 outline-none space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {ACTIVE_PROJECTS.map((prj, i) => (
                <Card key={prj.id} className="bg-[#0c0c10] border-white/5 hover:border-indigo-500/30 transition-all overflow-hidden relative group">
                   <div className={cn(
                     "absolute top-0 left-0 w-full h-1",
                     prj.status === 'approved' ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" : 
                     prj.status === 'nesting' ? "bg-amber-500" : "bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                   )} />
                   
                   <CardHeader className="pb-4 pt-8 px-8">
                      <div className="flex items-center justify-between mb-4">
                         <div className="flex flex-col">
                            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">{prj.id}</span>
                            <CardTitle className="text-lg font-black text-white uppercase italic tracking-tighter">{prj.client}</CardTitle>
                         </div>
                         <Badge className={cn(
                           "text-[8px] font-black uppercase border-0 italic px-3",
                           prj.priority === 'critical' ? "bg-rose-600 text-white animate-pulse" : "bg-white/5 text-zinc-400"
                         )}>
                           {prj.priority}
                         </Badge>
                      </div>
                      <p className="text-[12px] font-bold text-zinc-400 uppercase italic tracking-tight leading-tight">{prj.name}</p>
                   </CardHeader>

                   <CardContent className="px-8 pb-8 space-y-6">
                      <div className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-4">
                         <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                            <div className="flex items-center gap-2 text-indigo-400">
                               <FileCode size={12} />
                               <span>Status Técnico</span>
                            </div>
                            <span className="text-white italic">{prj.status.replace('-', ' ')}</span>
                         </div>
                         
                         <div className="space-y-2">
                            <div className="flex justify-between text-[9px] font-bold text-zinc-600 uppercase">
                               <span>Preparação CAM</span>
                               <span>{prj.progress}%</span>
                            </div>
                            <Progress value={prj.progress} className="h-1.5 bg-white/5" />
                         </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-white/5 pt-6">
                         <div className="flex flex-col">
                            <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest mb-1 italic">Engenheiro</span>
                            <div className="flex items-center gap-2">
                               <div className="w-5 h-5 rounded bg-indigo-600/20 text-indigo-500 flex items-center justify-center text-[8px] font-black">{prj.designer.split(' ')[0][0]}</div>
                               <span className="text-[11px] font-black text-zinc-400 uppercase italic">{prj.designer}</span>
                            </div>
                         </div>
                         <Button size="icon" variant="ghost" className="h-10 w-10 text-zinc-500 hover:text-white bg-white/5 border border-white/5">
                            <ChevronRight size={18} />
                         </Button>
                      </div>
                   </CardContent>
                </Card>
              ))}
           </div>

           {/* Pre-Flight Checklist Logic */}
           <Card className="bg-[#0c0c10] border-white/5 overflow-hidden">
              <CardHeader className="bg-white/[0.01] border-b border-white/5 py-8 px-10 flex flex-row items-center justify-between">
                 <div>
                    <CardTitle className="text-lg font-black text-white uppercase italic tracking-widest">Pre-Flight Automático [IA]</CardTitle>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase mt-1">Detecção de erros comuns em arquivos vetoriais para CNC</p>
                 </div>
                 <div className="flex gap-2">
                    <Button variant="outline" className="bg-white/5 border-white/10 text-white text-[10px] font-black uppercase h-10 px-6">Configurar Critérios</Button>
                 </div>
              </CardHeader>
              <CardContent className="p-0">
                 {[
                   { name: 'Nós Abertos / Polylines', status: 'error', count: 12, desc: 'Identificados caminhos não fechados no arquivo PRJ-882' },
                   { name: 'Double Path (Linhas Duplas)', status: 'ok', count: 0, desc: 'Nenhuma sobreposição de vetores detectada' },
                   { name: 'Raio de Fresagem < Tool', status: 'warning', count: 4, desc: 'Cantos internos menores que fresa de 4mm detectados' },
                   { name: 'Espaçamento para Nesting', status: 'ok', count: 0, desc: 'Margens de segurança de 10mm respeitadas' },
                 ].map((check, i) => (
                   <div key={i} className="flex items-center gap-6 p-8 border-b border-white/5 last:border-0 hover:bg-white/[0.01] transition-colors group">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110",
                        check.status === 'ok' ? "bg-emerald-500/10 text-emerald-500" : 
                        check.status === 'error' ? "bg-rose-500/20 text-rose-500" : "bg-amber-500/10 text-amber-500"
                      )}>
                         {check.status === 'ok' ? <CheckCircle2 size={24} /> : check.status === 'error' ? <AlertTriangle size={24} /> : <AlertCircle size={24} />}
                      </div>
                      <div className="flex-1 space-y-1">
                         <div className="flex items-center gap-3">
                            <h4 className="text-sm font-black text-white uppercase italic tracking-tight">{check.name}</h4>
                            {check.count > 0 && <Badge className="bg-rose-500 text-white border-0 text-[8px] font-black">{check.count} ERROS</Badge>}
                         </div>
                         <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{check.desc}</p>
                      </div>
                      <Button variant="ghost" className="text-[10px] font-black text-indigo-500 hover:text-indigo-400 uppercase tracking-widest border border-indigo-500/20 py-2 h-auto">Corrigir Arquivo</Button>
                   </div>
                 ))}
              </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="nesting" className="mt-0 outline-none">
           {/* Visual simulation of nesting/optimization results */}
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <Card className="lg:col-span-8 bg-[#0c0c10] border-white/5 p-10 min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#4f46e520_0%,_transparent_70%)] opacity-30" />
                 <div className="w-full max-w-2xl bg-zinc-950 border border-white/10 aspect-[16/9] rounded-3xl relative p-1 pb-4 shadow-2xl">
                    <div className="absolute top-2 left-4 text-[8px] font-black text-zinc-700 tracking-widest">CHAPA-PADRÃO 3000x2000mm // ACRÍLICO 3MM</div>
                    {/* Mock canvas rendering of nested shapes */}
                    <div className="w-full h-full flex flex-wrap gap-1 p-2 items-start content-start opacity-40">
                       {Array.from({length: 45}).map((_, i) => (
                         <div key={i} className="bg-indigo-600/30 border border-indigo-500/40 rounded shadow-[inset_0_0_10px_rgba(99,102,241,0.2)]" style={{ width: `${Math.random() * 40 + 20}px`, height: `${Math.random() * 40 + 20}px` }} />
                       ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="bg-black/90 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center space-y-4 shadow-2xl">
                          <Cpu size={32} className="text-indigo-500 mx-auto animate-pulse" />
                          <h4 className="text-lg font-black text-white italic tracking-tighter uppercase">Motor de Nesting Mesh Ativo</h4>
                          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Otimização de Retalho em Tempo Real</p>
                          <div className="flex gap-4 pt-4">
                             <div className="text-center">
                                <p className="text-[10px] font-black text-zinc-600 uppercase mb-1">Aproveitamento</p>
                                <p className="text-2xl font-black text-emerald-500 italic">94.2%</p>
                             </div>
                             <div className="w-px h-10 bg-white/5" />
                             <div className="text-center">
                                <p className="text-[10px] font-black text-zinc-600 uppercase mb-1">Peças</p>
                                <p className="text-2xl font-black text-white italic">84</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </Card>

              <Card className="lg:col-span-4 bg-[#0c0c10] border-white/5 flex flex-col p-10 space-y-10">
                 <div className="space-y-1">
                    <h3 className="text-sm font-black text-white uppercase italic tracking-widest">Parâmetros de Corte</h3>
                    <p className="text-[9px] font-bold text-zinc-600 uppercase">Configuração automática via material</p>
                 </div>
                 
                 <div className="space-y-8">
                    {[
                      { label: 'Velocidade de Avanço (Feed)', val: '4500 mm/min', icon: <Zap size={14} /> },
                      { label: 'Rotação Spindle (RPM)', val: '18.000', icon: <Cpu size={14} /> },
                      { label: 'Margem de Peças', val: '5.0 mm', icon: <Scissors size={14} /> },
                      { label: 'Tipo de Entrada', val: 'Rampa de 15°', icon: <Settings size={14} /> },
                    ].map((p, i) => (
                      <div key={i} className="flex items-center justify-between group">
                         <div className="flex items-center gap-3">
                            <div className="text-zinc-600 group-hover:text-indigo-500 transition-colors">{p.icon}</div>
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{p.label}</span>
                         </div>
                         <span className="text-[11px] font-black text-white italic">{p.val}</span>
                      </div>
                    ))}
                 </div>

                 <div className="pt-10 border-t border-white/5 space-y-4 mt-auto">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white h-14 font-black uppercase text-[11px] tracking-widest shadow-xl shadow-indigo-600/20">Gerar G-CODE Final</Button>
                    <Button variant="outline" className="w-full border-white/10 text-zinc-400 h-14 font-black uppercase text-[11px] tracking-widest">Enviar para Fila CNC</Button>
                 </div>
              </Card>
           </div>
        </TabsContent>

        <TabsContent value="material-spec" className="mt-0 outline-none">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: 'ACM 3mm Silver Poly', type: 'Compósito Alumínio', id: 'MAT-ACM-01', stock: 'Ok', spec: 'Proteção UV, Dobrabilidade Alta' },
                { name: 'Acrílico 5mm Cristal', type: 'Polímero Termopl.', id: 'MAT-ACR-05', stock: 'Baixo', spec: 'Grau de Transparência 92%' },
                { name: 'Aço Galvanizado 18', type: 'Metálico', id: 'MAT-MET-G18', stock: 'Ok', spec: 'Resistência Corrosão Média' },
                { name: 'MDF 18mm Cru', type: 'Madeira Processada', id: 'MAT-MDF-18', stock: 'Crítico', spec: 'Densidade Média' },
              ].map((mat, i) => (
                 <Card key={i} className="bg-[#0c0c10] border-white/5 p-8 flex items-center gap-8 hover:bg-white/[0.01] transition-all">
                    <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-700">
                       <Box size={32} />
                    </div>
                    <div className="flex-1 space-y-2">
                       <div className="flex justify-between items-center">
                          <h4 className="text-lg font-black text-white uppercase italic tracking-tighter">{mat.name}</h4>
                          <Badge variant="outline" className={cn(
                            "text-[8px] font-black uppercase border-0 px-3",
                            mat.stock === 'Ok' ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                          )}>{mat.stock}</Badge>
                       </div>
                       <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{mat.type} <span className="mx-2">|</span> {mat.id}</p>
                       <p className="text-[11px] text-zinc-400 font-bold italic uppercase">{mat.spec}</p>
                    </div>
                 </Card>
              ))}
           </div>
        </TabsContent>
      </Tabs>

      {/* Engineering Footer Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-8 py-5 bg-zinc-950/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl flex items-center gap-12 justify-between border-t-2 border-t-indigo-500/20 min-w-[800px]">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl">
               <FileCode size={24} />
            </div>
            <div>
               <p className="text-[11px] font-black text-white uppercase italic tracking-tight mb-1">Módulo de Validação Técnica</p>
               <span className="text-[12px] font-black text-zinc-600 uppercase tracking-widest italic">Aguardando Importação de Arquivos</span>
            </div>
         </div>
         
         <div className="flex items-center gap-8 px-8 border-x border-white/5 flex-1 justify-center">
            <div className="text-center">
               <p className="text-[10px] font-black text-zinc-700 uppercase mb-1 italic">Projetos em Eng.</p>
               <p className="text-xl font-black text-white italic">14</p>
            </div>
            <div className="text-center">
               <p className="text-[10px] font-black text-zinc-700 uppercase mb-1 italic">Setup CAM Médio</p>
               <p className="text-xl font-black text-indigo-500 italic">28m</p>
            </div>
         </div>

         <Button className="h-12 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase text-[11px] tracking-widest shadow-xl">Dashboard de Arte</Button>
      </div>
    </div>
  );
}
