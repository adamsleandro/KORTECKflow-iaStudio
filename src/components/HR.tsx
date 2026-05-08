import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  UserPlus, 
  Network, 
  Briefcase, 
  FileCheck, 
  HardHat,
  Search,
  Plus,
  Filter,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Calendar as CalendarIcon,
  Clock,
  Shield,
  Camera,
  Target,
  ChevronRight,
  BrainCircuit,
  Zap,
  Activity,
  History,
  GraduationCap,
  Medal,
  Stethoscope,
  Construction,
  Scale,
  Award,
  BarChart3,
  Flame,
  ArrowUpRight,
  UserCheck,
  Building2,
  Timer,
  Scissors,
  PenTool,
  Cpu,
  Monitor,
  Truck,
  HeartPulse,
  Palmtree,
  Settings,
  ArrowDownRight,
  Info,
  LayoutGrid,
  List,
  Mail,
  Phone,
  ArrowLeft,
  Download,
  FileText,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { cn } from '@/lib/utils';

// --- MOCK DATA ---
const PRODUCTIVITY_DATA = [
  { day: 'Seg', prod: 85, efficiency: 92, reworking: 2 },
  { day: 'Ter', prod: 88, efficiency: 90, reworking: 1 },
  { day: 'Qua', prod: 78, efficiency: 85, reworking: 5 },
  { day: 'Qui', prod: 92, efficiency: 95, reworking: 1 },
  { day: 'Sex', prod: 95, efficiency: 98, reworking: 0 },
  { day: 'Sáb', prod: 60, efficiency: 70, reworking: 2 },
];

const SKILL_MAP = [
  { group: 'Produção Industrial', items: [
    { name: 'Router CNC Expert', level: 'Especialista', score: 98 },
    { name: 'Laser Fiber / CO2', level: 'Avançado', score: 85 },
    { name: 'Solda MIG/MAG/TIG', level: 'Intermediário', score: 62 },
    { name: 'ACM / Dobra / Vinco', level: 'Especialista', score: 92 },
  ]},
  { group: 'Instalação & Campo', items: [
    { name: 'NR-35 Trabalho Altura', level: 'Avançado', score: 88 },
    { name: 'Elétrica Baixa Tensão', level: 'Básico', score: 45 },
    { name: 'Operação de Munck', level: 'Intermediário', score: 55 },
  ]},
  { group: 'Design & Engineering', items: [
    { name: 'SolidWorks / CAD', level: 'Especialista', score: 95 },
    { name: 'Cálculo Estrutural', level: 'Avançado', score: 82 },
    { name: 'Fechamento de Arquivos', level: 'Expert', score: 100 },
  ]},
];

const COMPLIANCE_ALERTS = [
  { name: 'Ricardo Melo', doc: 'NR-35 (Vencimento)', status: 'vencido', days: -12, type: 'critical' },
  { name: 'Sueli Rocha', doc: 'ASO Periódico', status: 'expira', days: 5, type: 'warning' },
  { name: 'Marcos Paulo', doc: 'Treinamento Operação CNC', status: 'pendente', days: 0, type: 'info' },
  { name: 'Ana Beatriz', doc: 'Validação EPI Trimestral', status: 'vencido', days: -2, type: 'critical' },
];

const COLLABORATORS = [
  { 
    id: 1, 
    name: 'Ana Beatriz', 
    role: 'Designer Sênior', 
    dept: 'Criação', 
    status: 'Ativo', 
    type: 'CLT', 
    score: 95, 
    avatar: '1',
    email: 'ana.beatriz@mesh.com',
    phone: '(11) 98877-6655',
    admission: '12 Jan 2022',
    lastTraining: '05 Mar 2024',
    salary: 'R$ 8.450,00',
    tags: ['SolidWorks', 'CAD', 'Liderança'],
    skillMatrix: {
      'Router CNC': 1,
      'Laser Fiber': 2,
      'Solda MIG/MAG': 0,
      'ACM/Dobra': 1,
      'SolidWorks': 4,
      'Elétrica': 2
    },
    nrs: { nr35: 'success', nr10: 'success', aso: 'success' }
  },
  { 
    id: 2, 
    name: 'Bruno Alves', 
    role: 'Operador CNC', 
    dept: 'Produção', 
    status: 'Ativo', 
    type: 'CLT', 
    score: 88, 
    avatar: '2',
    email: 'bruno.alves@mesh.com',
    phone: '(11) 97766-5544',
    admission: '04 Jun 2021',
    lastTraining: '12 Abr 2024',
    salary: 'R$ 4.200,00',
    tags: ['Router CNC', 'Corte', 'Usinagem'],
    skillMatrix: {
      'Router CNC': 4,
      'Laser Fiber': 3,
      'Solda MIG/MAG': 1,
      'ACM/Dobra': 2,
      'SolidWorks': 2,
      'Elétrica': 1
    },
    nrs: { nr35: 'success', nr10: 'n/a', aso: 'success' }
  },
  { 
    id: 3, 
    name: 'Clara Mendes', 
    role: 'Executiva Vendas', 
    dept: 'Comercial', 
    status: 'Ativo', 
    type: 'PJ', 
    score: 72, 
    avatar: '3',
    email: 'clara.mendes@mesh.com',
    phone: '(11) 91122-3344',
    admission: '15 Ago 2023',
    lastTraining: '10 Jan 2024',
    salary: 'Comissionado',
    tags: ['CRM', 'Vendas', 'Negociação'],
    skillMatrix: {
      'Router CNC': 0,
      'Laser Fiber': 0,
      'Solda MIG/MAG': 0,
      'ACM/Dobra': 0,
      'SolidWorks': 1,
      'Elétrica': 0
    },
    nrs: { nr35: 'n/a', nr10: 'n/a', aso: 'success' }
  },
  { 
    id: 4, 
    name: 'Eduardo Souza', 
    role: 'Líder de Chão', 
    dept: 'Industrial', 
    status: 'Ativo', 
    type: 'CLT', 
    score: 91, 
    avatar: '4',
    email: 'eduardo.souza@mesh.com',
    phone: '(11) 94444-8888',
    admission: '01 Dez 2019',
    lastTraining: '20 Dez 2023',
    salary: 'R$ 10.200,00',
    tags: ['Gestão', 'Lean', 'Processos'],
    skillMatrix: {
      'Router CNC': 3,
      'Laser Fiber': 3,
      'Solda MIG/MAG': 2,
      'ACM/Dobra': 4,
      'SolidWorks': 3,
      'Elétrica': 2
    },
    nrs: { nr35: 'success', nr10: 'success', aso: 'success' }
  },
  { 
    id: 5, 
    name: 'Ricardo Melo', 
    role: 'Instalador', 
    dept: 'Instalação', 
    status: 'Afastado', 
    type: 'CLT', 
    score: 65, 
    avatar: '5',
    email: 'ricardo.melo@mesh.com',
    phone: '(11) 92222-1111',
    admission: '10 Mai 2023',
    lastTraining: '15 Jun 2023',
    salary: 'R$ 3.800,00',
    tags: ['Estruturas', 'Altura', 'Eletro'],
    skillMatrix: {
      'Router CNC': 1,
      'Laser Fiber': 1,
      'Solda MIG/MAG': 4,
      'ACM/Dobra': 2,
      'SolidWorks': 0,
      'Elétrica': 4
    },
    nrs: { nr35: 'error', nr10: 'success', aso: 'warning' }
  },
];

const HISTORY_LOG = [
  { date: 'Hoje, 10:20', type: 'PROMO', user: 'Bruno Alves', desc: 'Promovido de Auxiliar para Operador I' },
  { date: 'Ontem, 15:45', type: 'DOC', user: 'Ana Beatriz', desc: 'Certificado NR-35 anexado ao prontuário' },
  { date: '04 Mai', type: 'EQUIP', user: 'Ricardo Melo', desc: 'Entrega de Kit EPI (Botinas, Capacete, Luvas)' },
  { date: '02 Mai', type: 'AI', user: 'Sistema', desc: 'Alerta: Identificada queda de performance no setor de Impressão' },
];

export function HR() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedColabId, setSelectedColabId] = useState<number | null>(null);
  
  const SKILLS_LIST = ['Router CNC', 'Laser Fiber', 'Solda MIG/MAG', 'ACM/Dobra', 'SolidWorks', 'Elétrica'];
  
  const PROFICIENCY_LEVELS = {
    0: { label: '-', color: 'bg-zinc-900/50 text-zinc-700' },
    1: { label: 'Básico', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    2: { label: 'Intermed.', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    3: { label: 'Avançado', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    4: { label: 'Especialista', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)]' }
  };

  const selectedColab = COLLABORATORS.find(c => c.id === selectedColabId);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ativo': return 'text-emerald-500 bg-emerald-500/10';
      case 'afastado': return 'text-rose-500 bg-rose-500/10';
      default: return 'text-zinc-500 bg-zinc-500/10';
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1600px] mx-auto">
      {/* Header Industrial RH */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.4em] text-blue-500 uppercase">
             CORE OPERATIONAL HUMAN INTEL [RH-MESH]
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
            RH <span className="text-blue-600">Industrial</span>
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-4">
           <div className="flex -space-x-3 mr-4 hidden sm:flex">
              {[1,2,3,4].map(i => (
                <Avatar key={i} className="border-2 border-black w-10 h-10 ring-2 ring-white/5">
                  <AvatarImage src={`https://i.pravatar.cc/100?u=${i}`} />
                  <AvatarFallback className="bg-zinc-900 font-bold">U</AvatarFallback>
                </Avatar>
              ))}
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-black border-2 border-black ring-2 ring-blue-500/20 z-10">
                +38
              </div>
           </div>
           
           <Dialog>
             <DialogTrigger className={cn(
               buttonVariants({ variant: "default" }),
               "flex-1 md:flex-none bg-white text-black hover:bg-zinc-200 h-12 px-8 font-black uppercase text-[11px] tracking-widest shadow-[0_10px_20px_rgba(255,255,255,0.05)] transition-all"
             )}>
               <UserPlus size={18} className="mr-2" /> Admitir Talento
             </DialogTrigger>
             <DialogContent className="bg-zinc-950 border-white/10 text-white max-w-2xl w-[95vw] md:w-full">
                <DialogHeader>
                   <DialogTitle className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-left">Onboarding Técnico Industrial</DialogTitle>
                   <DialogDescription className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1 text-left">Sincronização de Prontuário Digital e Compliance</DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="pessoal" className="mt-4">
                   <TabsList className="bg-white/5 border-white/5 w-full justify-start p-1 mb-6 flex-wrap h-auto">
                      <TabsTrigger value="pessoal" className="flex-1 text-[9px] font-black uppercase tracking-widest">1. Dados Base</TabsTrigger>
                      <TabsTrigger value="cert" className="flex-1 text-[9px] font-black uppercase tracking-widest">2. Certificações</TabsTrigger>
                      <TabsTrigger value="epi" className="flex-1 text-[9px] font-black uppercase tracking-widest">3. Logística EPI</TabsTrigger>
                   </TabsList>
                   <TabsContent value="pessoal" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Nome Completo</Label>
                            <Input className="bg-black border-white/5 uppercase text-xs" placeholder="Ex: JOÃO DA SILVA" />
                         </div>
                         <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">CPF / Registro</Label>
                            <Input className="bg-black border-white/5 text-xs" placeholder="000.000.000-00" />
                         </div>
                         <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Setor Operativo</Label>
                            <Select>
                               <SelectTrigger className="bg-black border-white/5 text-xs">
                                  <SelectValue placeholder="Selecione..." />
                               </SelectTrigger>
                               <SelectContent className="bg-zinc-900 border-white/5 text-white">
                                  <SelectItem value="industrial">INDUSTRIAL / CHÃO</SelectItem>
                                  <SelectItem value="design">DESIGN / CRIAÇÃO</SelectItem>
                                  <SelectItem value="inst">INSTALAÇÃO</SelectItem>
                               </SelectContent>
                            </Select>
                         </div>
                         <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Data de Admissão</Label>
                            <Input type="date" className="bg-black border-white/5 text-xs" />
                         </div>
                      </div>
                   </TabsContent>
                   <TabsContent value="cert" className="space-y-6">
                      <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-4">
                         <h4 className="text-[10px] font-black text-blue-500 uppercase italic">Auditoria NR Obrigatória</h4>
                         <div className="space-y-3">
                            {['NR-35 (TRABALHO EM ALTURA)', 'NR-10 (ELÉTRICA)', 'ASO (SAÚDE OCUPACIONAL)'].map(nr => (
                               <div key={nr} className="flex items-center justify-between">
                                  <span className="text-[10px] font-bold text-zinc-400">{nr}</span>
                                  <Switch className="data-[state=checked]:bg-blue-600" />
                               </div>
                            ))}
                         </div>
                      </div>
                   </TabsContent>
                   <TabsContent value="epi" className="space-y-4">
                      <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center gap-4">
                         <div className="p-3 bg-zinc-950 rounded-xl border border-white/5">
                            <HardHat size={20} className="text-zinc-500" />
                         </div>
                         <div>
                            <p className="text-[10px] font-black text-white uppercase tracking-tight italic">Kit de Proteção Padrão</p>
                            <p className="text-[9px] font-bold text-zinc-600 uppercase">Reserva automática em estoque: S-42</p>
                         </div>
                      </div>
                   </TabsContent>
                </Tabs>
                <DialogFooter className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row gap-4">
                   <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 md:mr-auto">Cancelar</Button>
                   <Button className="bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest px-8 h-12">Confirmar Admissão</Button>
                </DialogFooter>
             </DialogContent>
           </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-transparent lg:bg-[#0c0c10] border-0 lg:border border-white/5 p-1 flex justify-start overflow-x-auto h-auto lg:h-14 scrollbar-hide flex-nowrap w-full whitespace-nowrap lg:whitespace-normal">
           {[
             { id: 'dashboard', label: 'DASHBOARD', icon: <BarChart3 size={14} /> },
             { id: 'colaboradores', label: 'WORKFORCE (GRID)', icon: <LayoutGrid size={14} /> },
             { id: 'workforce-list', label: 'WORKFORCE (LISTA)', icon: <List size={14} /> },
             { id: 'workforce-matrix', label: 'MATRIZ TÉCNICA', icon: <Target size={14} /> },
             { id: 'performance', label: 'PRODUTIVIDADE', icon: <Timer size={14} /> },
             { id: 'skills', label: 'GLOBAL SKILLS', icon: <Target size={14} /> },
             { id: 'compliance', label: 'COMPLIANCE', icon: <Shield size={14} /> },
             { id: 'org', label: 'ORGANOGRAMA', icon: <Network size={14} /> },
           ].map(tab => (
             <TabsTrigger 
               key={tab.id}
               value={tab.id}
               className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-zinc-500 text-[10px] font-black px-6 h-12 lg:h-full tracking-widest uppercase flex items-center justify-center lg:justify-start gap-2 border-r border-white/5 last:border-0 rounded-none transition-all flex-none"
             >
               {tab.icon} {tab.label}
             </TabsTrigger>
           ))}
        </TabsList>

        {/* 1. DASHBOARD INTEL */}
        <TabsContent value="dashboard" className="space-y-8 mt-0 outline-none">
          {/* Stats Grid at the top, below tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-2">
            {[
              { label: 'Colaboradores Ativos', val: '42', detail: '3 Temporários', icon: <Users className="text-blue-500" />, color: 'blue' },
              { label: 'Eficiência de Equipe', val: '86.4%', detail: '+2.1% este mês', icon: <Zap className="text-emerald-500" />, color: 'emerald' },
              { label: 'Absenteísmo Médio', val: '1.2%', detail: 'Abaixo do target (3%)', icon: <Activity className="text-amber-500" />, color: 'amber' },
              { label: 'Indice de Retrabalho', val: '0.4%', detail: 'Baixa crítica', icon: <Scissors className="text-rose-500" />, color: 'rose' },
            ].map((stat, i) => (
              <Card key={i} className="bg-[#0c0c10] border-white/5 relative overflow-hidden group">
                 <div className={cn("absolute top-0 right-0 w-32 h-32 blur-[60px] -mr-16 -mt-16 opacity-10", `bg-${stat.color}-500`)} />
                 <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                       <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                          {stat.icon}
                       </div>
                       <Badge variant="outline" className="text-[9px] font-black border-white/10 text-zinc-500">{stat.detail}</Badge>
                    </div>
                    <div className="space-y-1">
                       <h3 className="text-3xl font-black text-white italic tracking-tighter">{stat.val}</h3>
                       <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{stat.label}</p>
                    </div>
                 </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
             {/* Productivity Chart */}
             <div className="lg:col-span-8 space-y-8">
                <Card className="bg-[#0c0c10] border-white/5">
                   <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 bg-white/[0.01]">
                      <div>
                         <CardTitle className="text-xs font-black text-white uppercase tracking-[0.2em] italic">Análise de Rendimento Industrial</CardTitle>
                         <CardDescription className="text-[9px] font-bold text-zinc-500 uppercase mt-1">Sincronia de produção e eficiência humana semanal</CardDescription>
                      </div>
                      <div className="flex gap-4">
                         <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /><span className="text-[9px] font-black text-zinc-400 uppercase">Produção</span></div>
                         <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /><span className="text-[9px] font-black text-zinc-400 uppercase">Eficiência</span></div>
                      </div>
                   </CardHeader>
                   <CardContent className="p-8 h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                         <AreaChart data={PRODUCTIVITY_DATA}>
                            <defs>
                               <linearGradient id="chartBlue" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                               </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                            <XAxis dataKey="day" stroke="#52525b" fontSize={10} axisLine={false} tickLine={false} />
                            <YAxis stroke="#52525b" fontSize={10} axisLine={false} tickLine={false} />
                            <RechartsTooltip 
                              contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px' }}
                              itemStyle={{ fontSize: '10px', color: '#fff', fontWeight: 'bold' }}
                              labelStyle={{ fontSize: '10px', color: '#a1a1aa', textTransform: 'uppercase' }}
                            />
                            <Area type="monotone" dataKey="prod" stroke="#3b82f6" fillOpacity={1} fill="url(#chartBlue)" strokeWidth={3} />
                            <Area type="monotone" dataKey="efficiency" stroke="#10b981" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
                         </AreaChart>
                      </ResponsiveContainer>
                   </CardContent>
                </Card>
             </div>

             {/* Right Column: AI & Stats */}
             <div className="lg:col-span-4 space-y-6">
                <Card className="bg-gradient-to-br from-blue-600/10 to-indigo-950/20 border-blue-500/20 relative overflow-hidden group border-2">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] opacity-20" />
                   <CardHeader>
                      <div className="flex items-center gap-2 text-blue-400 text-[10px] font-black tracking-[0.3em] mb-2 uppercase">
                        <BrainCircuit size={14} className="animate-pulse" /> CORE AI PREDICTIVE
                      </div>
                      <CardTitle className="text-base font-black text-white uppercase italic tracking-tighter leading-tight">Insight de Capacidade</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-6">
                      <div className="p-4 rounded-2xl bg-black/60 border border-white/5 space-y-3 relative">
                         <div className="flex items-center gap-2 text-rose-500 text-[9px] font-black uppercase">
                            <AlertCircle size={14} /> Gargalo Identificado
                         </div>
                         <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
                            O <span className="text-white italic">Setor CNC</span> apresenta sinais de sobrecarga. <span className="text-white">Bruno Alves</span> atingiu o pico de 10h de operação sequencial. Sugerimos rodízio imediato para evitar fadiga e erro operacional.
                         </p>
                      </div>
                      <div className="space-y-2">
                         <div className="flex justify-between items-center text-[9px] font-black uppercase text-zinc-600 tracking-widest">
                            <span>Risco de Turnover</span>
                            <span className="text-emerald-500">MUITO BAIXO (0.2%)</span>
                         </div>
                         <Progress value={5} className="h-1 bg-white/5" />
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest h-11 transition-all shadow-lg shadow-blue-600/20">
                         Executar Plano de Revezamento
                      </Button>
                   </CardContent>
                </Card>

                <Card className="bg-[#0c0c10] border-white/5">
                   <CardHeader className="bg-white/[0.01] border-b border-white/5">
                      <CardTitle className="text-[10px] font-black text-white uppercase tracking-widest italic">Distribuição por Setor</CardTitle>
                   </CardHeader>
                   <CardContent className="p-6">
                      <div className="space-y-4">
                         {[
                           { label: 'Produção Industrial', val: 55, color: 'bg-blue-600' },
                           { label: 'Design / Criação', val: 15, color: 'bg-emerald-500' },
                           { label: 'Comercial / CRM', val: 20, color: 'bg-amber-500' },
                           { label: 'Instalação Ext.', val: 10, color: 'bg-purple-500' },
                         ].map((item, i) => (
                           <div key={i} className="space-y-1.5" id={`setor-${i}`}>
                              <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-500">
                                 <span>{item.label}</span>
                                 <span className="text-white">{item.val}%</span>
                              </div>
                              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                 <div className={cn("h-full", item.color)} style={{ width: `${item.val}%` }} />
                              </div>
                           </div>
                        ))}
                      </div>
                   </CardContent>
                </Card>

                <Card className="bg-[#0c0c10] border-white/5 p-6">
                   <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Linha do Tempo Recente</h4>
                   <div className="space-y-4">
                      {HISTORY_LOG.slice(0, 3).map((log, i) => (
                         <div key={i} className="flex gap-3">
                            <div className="w-1 h-8 bg-blue-600/50 rounded-full shrink-0" />
                            <div>
                               <p className="text-[10px] font-black text-white uppercase italic">{log.user}</p>
                               <p className="text-[9px] text-zinc-600 uppercase font-bold truncate max-w-[200px]">{log.desc}</p>
                            </div>
                         </div>
                      ))}
                   </div>
                </Card>
             </div>
          </div>
        </TabsContent>

        {/* 2. WORKFORCE TAB */}
        <TabsContent value="colaboradores" className="space-y-8 mt-0 outline-none">
           {selectedColab ? (
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="space-y-8"
             >
                {/* Profile Header */}
                <div className="flex items-center justify-between">
                   <Button 
                     variant="ghost" 
                     onClick={() => setSelectedColabId(null)}
                     className="text-zinc-500 hover:text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
                   >
                     <ArrowLeft size={14} /> Voltar para Workforce
                   </Button>
                   <div className="flex items-center gap-2">
                      <Button variant="outline" className="h-9 px-4 border-white/5 text-zinc-500 hover:text-white text-[9px] font-black uppercase gap-2">
                         <Download size={14} /> Baixar Prontuário
                      </Button>
                      <Button className="h-9 px-4 bg-blue-600 hover:bg-blue-500 text-white text-[9px] font-black uppercase gap-2">
                         <Settings size={14} /> Editar Perfil
                      </Button>
                   </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                   {/* Col Left: Main Info */}
                   <div className="lg:col-span-4 space-y-8">
                      <Card className="bg-[#0c0c10] border-white/10 overflow-hidden relative">
                         <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-blue-600/10 to-transparent" />
                         <CardContent className="p-8 pt-12 flex flex-col items-center text-center relative">
                            <Avatar className="w-32 h-32 border-4 border-black ring-4 ring-blue-600/20 mb-6">
                               <AvatarImage src={`https://i.pravatar.cc/100?u=${selectedColab.avatar}`} />
                               <AvatarFallback className="text-4xl font-black italic">{selectedColab.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-1">{selectedColab.name}</h2>
                            <p className="text-blue-500 text-[11px] font-black uppercase tracking-[0.2em] mb-6">{selectedColab.role}</p>
                            
                            <div className="w-full grid grid-cols-2 gap-1 border-y border-white/5 py-4 my-2">
                               <div className="text-center">
                                  <p className="text-[8px] font-black text-zinc-600 uppercase">Setor</p>
                                  <p className="text-[10px] font-black text-zinc-300 uppercase">{selectedColab.dept}</p>
                               </div>
                               <div className="text-center border-l border-white/5">
                                  <p className="text-[8px] font-black text-zinc-600 uppercase">Contrato</p>
                                  <p className="text-[10px] font-black text-zinc-300 uppercase">{selectedColab.type}</p>
                               </div>
                            </div>

                            <div className="w-full space-y-4 mt-6">
                               <div className="flex items-center gap-3 text-zinc-400 group cursor-default">
                                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-600 group-hover:text-blue-500 transition-colors border border-white/5">
                                     <Mail size={14} />
                                  </div>
                                  <span className="text-[10px] font-bold tracking-tight lowercase">{selectedColab.email}</span>
                               </div>
                               <div className="flex items-center gap-3 text-zinc-400 group cursor-default">
                                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-600 group-hover:text-blue-500 transition-colors border border-white/5">
                                     <Phone size={14} />
                                  </div>
                                  <span className="text-[10px] font-bold tracking-tight">{selectedColab.phone}</span>
                               </div>
                            </div>
                         </CardContent>
                      </Card>

                      <Card className="bg-[#0c0c10] border-white/5">
                         <CardHeader className="border-b border-white/5 pb-4">
                            <CardTitle className="text-xs font-black text-white uppercase italic tracking-widest">Compliance Audit</CardTitle>
                         </CardHeader>
                         <CardContent className="p-6 space-y-4">
                            {[
                              { label: 'NR-35 Altura', status: selectedColab.nrs.nr35 },
                              { label: 'NR-10 Elétrica', status: selectedColab.nrs.nr10 },
                              { label: 'ASO Periódico', status: selectedColab.nrs.aso },
                            ].map((audit, i) => (
                              <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/[0.01] border border-white/5">
                                 <span className="text-[10px] font-black text-zinc-400 uppercase italic">{audit.label}</span>
                                 <div className={cn(
                                   "w-2 h-2 rounded-full",
                                   audit.status === 'success' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                                   audit.status === 'error' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)] animate-pulse' :
                                   audit.status === 'warning' ? 'bg-amber-500' : 'bg-zinc-800'
                                 )} />
                              </div>
                            ))}
                            <Button className="w-full bg-white/5 hover:bg-white/10 text-white text-[9px] font-black uppercase h-10 border border-white/5">
                               Ver Documentação Completa
                            </Button>
                         </CardContent>
                      </Card>
                   </div>

                   {/* Col Right: Detailed Stats */}
                   <div className="lg:col-span-8 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         {[
                           { label: 'Admissão', val: selectedColab.admission, icon: <CalendarIcon size={16} /> },
                           { label: 'Ult. Treinamento', val: selectedColab.lastTraining, icon: <GraduationCap size={16} /> },
                           { label: 'Remuneração Base', val: selectedColab.salary, icon: <DollarSign size={16} /> },
                         ].map((item, i) => (
                           <Card key={i} className="bg-[#0c0c10] border-white/5 group">
                              <CardContent className="p-6">
                                 <div className="flex items-center gap-3 mb-3">
                                    <div className="text-zinc-600 group-hover:text-blue-500 transition-colors">
                                       {item.icon}
                                    </div>
                                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{item.label}</span>
                                 </div>
                                 <p className="text-lg font-black text-white italic uppercase tracking-tighter">{item.val}</p>
                              </CardContent>
                           </Card>
                         ))}
                      </div>

                      <Card className="bg-[#0c0c10] border-white/5">
                         <CardHeader className="border-b border-white/5 flex flex-row items-center justify-between">
                            <div>
                               <CardTitle className="text-sm font-black text-white uppercase italic tracking-widest">Matriz Técnica & Pontuação IA</CardTitle>
                               <CardDescription className="text-[9px] font-bold text-zinc-500 uppercase mt-1">Análise de competência vs meta do cargo</CardDescription>
                            </div>
                            <Badge className="bg-blue-600 px-3 py-1 text-[10px] font-black italic border-0">TOP TALENT 2024</Badge>
                         </CardHeader>
                         <CardContent className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                               {selectedColab.tags.map((tag, i) => (
                                 <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-end">
                                       <span className="text-[10px] font-black text-white uppercase italic">{tag}</span>
                                       <span className="text-[10px] font-black text-blue-500 italic">MASTER</span>
                                    </div>
                                    <Progress value={90 - (i * 5)} className="h-1 bg-white/5" />
                                 </div>
                               ))}
                            </div>

                            <Separator className="bg-white/5" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                               <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 relative overflow-hidden group">
                                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                                     <ArrowUpRight className="text-emerald-500" />
                                  </div>
                                  <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Potencial de Liderança</h4>
                                  <p className="text-4xl font-black text-white italic tracking-tighter">8.2<span className="text-zinc-700 text-xl">/10</span></p>
                                  <p className="text-[9px] text-zinc-500 mt-2 leading-relaxed uppercase font-bold">Baseado em resolução de problemas e auxílio em bancada.</p>
                               </div>
                               <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 relative overflow-hidden group">
                                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                                     <Activity className="text-blue-500" />
                                  </div>
                                  <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Assiduidade Semestral</h4>
                                  <p className="text-4xl font-black text-white italic tracking-tighter">98<span className="text-zinc-700 text-xl">%</span></p>
                                  <p className="text-[9px] text-zinc-500 mt-2 leading-relaxed uppercase font-bold">1 Atraso justificado nos últimos 180 dias.</p>
                               </div>
                            </div>
                         </CardContent>
                      </Card>

                      <Card className="bg-[#0c0c10] border-white/5">
                         <CardHeader className="bg-white/[0.01] border-b border-white/5">
                            <CardTitle className="text-[10px] font-black text-white uppercase tracking-widest italic">Timeline de Eventos RH</CardTitle>
                         </CardHeader>
                         <CardContent className="p-6">
                            <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-white/5">
                               {[
                                 { date: '12 JUN 2024', event: 'Reciclagem NR-35 Concluída', desc: 'Certificado validado pelo SESMT' },
                                 { date: '01 JAN 2024', event: 'Dissídio Anual Aplicado', desc: 'Atualização de 5.5% sobre o base' },
                                 { date: '12 JAN 2022', event: 'Ingresso na Companhia', desc: 'Admitido em Regime CLT - Planta Sorocaba' },
                               ].map((step, i) => (
                                 <div key={i} className="relative">
                                    <div className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-black border-2 border-blue-600 bg-blue-600/20" />
                                    <p className="text-[8px] font-black text-blue-500 uppercase tracking-widest mb-1">{step.date}</p>
                                    <p className="text-[11px] font-black text-white uppercase italic">{step.event}</p>
                                    <p className="text-[10px] text-zinc-600 font-bold uppercase mt-1 tracking-tight">{step.desc}</p>
                                 </div>
                               ))}
                            </div>
                         </CardContent>
                      </Card>
                   </div>
                </div>
             </motion.div>
           ) : (
             <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filter Sidebar */}
                <Card className="bg-[#0c0c10] border-white/5 lg:col-span-1 h-fit sticky top-8">
                   <CardHeader className="border-b border-white/5 pb-4">
                      <CardTitle className="text-xs font-black text-white uppercase italic tracking-widest leading-none">Intelligence Filters</CardTitle>
                   </CardHeader>
                   <CardContent className="p-6 space-y-6">
                      <div className="relative">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                         <Input className="bg-black border-white/5 pl-9 h-10 text-[10px] text-white uppercase font-bold tracking-widest" placeholder="Pesquisar por nome ou cargo..." />
                      </div>
                      <div className="space-y-4">
                         <div className="space-y-2">
                            <Label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Setor Industrial</Label>
                            <Select defaultValue="industrial">
                               <SelectTrigger className="bg-black border-white/5 h-10 text-[10px] uppercase font-bold">
                                  <SelectValue placeholder="Selecione..." />
                               </SelectTrigger>
                               <SelectContent className="bg-zinc-950 border-white/10 text-white">
                                  <SelectItem value="comercial">COMERCIAL / CRM</SelectItem>
                                  <SelectItem value="industrial">INDUSTRIAL / CHÃO</SelectItem>
                                  <SelectItem value="design">DESIGN / PROJETOS</SelectItem>
                               </SelectContent>
                            </Select>
                         </div>
                         <div className="space-y-2">
                            <Label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Tags de Habilidade</Label>
                            <div className="flex flex-wrap gap-2">
                               {['CNC', 'Router', 'ACM', 'Acrílico', 'Instalação', 'Vendas'].map(tag => (
                                 <Badge key={tag} className="bg-white/5 hover:bg-blue-600/20 text-zinc-500 hover:text-blue-400 cursor-pointer border-0 text-[8px] font-black uppercase px-2 h-5 transition-all">{tag}</Badge>
                               ))}
                            </div>
                         </div>
                      </div>
                      <Separator className="bg-white/5" />
                      <div className="space-y-3">
                         <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mb-2 px-1">Filtros Inteligentes Ativos</p>
                         <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between bg-white/[0.02] p-2 rounded border border-white/5">
                               <span className="text-[8px] font-bold text-zinc-600 uppercase">Geolocalização</span>
                               <Badge className="bg-blue-500/10 text-blue-500 text-[7px] border-0 h-4">Ativo</Badge>
                            </div>
                            <div className="flex items-center justify-between bg-white/[0.02] p-2 rounded border border-white/5">
                               <span className="text-[8px] font-bold text-zinc-600 uppercase">Disponibilidade</span>
                               <Badge className="bg-emerald-500/10 text-emerald-500 text-[7px] border-0 h-4">Sincronizado</Badge>
                            </div>
                         </div>
                      </div>
                   </CardContent>
                </Card>

                <div className="lg:col-span-3">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {COLLABORATORS.map((c) => (
                           <Card 
                             key={c.id} 
                             onClick={() => setSelectedColabId(c.id)}
                             className="bg-[#0c0c10] border-white/5 hover:border-blue-500/30 transition-all group cursor-pointer relative overflow-hidden"
                           >
                             <div className="p-6">
                                <div className="flex items-start justify-between mb-6">
                                   <div className="flex items-center gap-4">
                                      <Avatar className="w-14 h-14 border-2 border-white/5 group-hover:border-blue-500 transition-all duration-500">
                                         <AvatarImage src={`https://i.pravatar.cc/100?u=${c.avatar}`} />
                                         <AvatarFallback className="bg-zinc-900 font-black italic">{c.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                         <h4 className="text-lg font-black text-white italic tracking-tighter uppercase gap-2 flex items-center">
                                            {c.name}
                                            {c.nrs.nr35 === 'error' && <AlertCircle size={14} className="text-rose-500 animate-pulse" />}
                                         </h4>
                                         <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">{c.role}</p>
                                      </div>
                                   </div>
                                   <Badge className={cn("text-[9px] font-black border-0 uppercase h-5", getStatusColor(c.status))}>
                                      {c.status}
                                   </Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                   <div className="p-3 rounded-xl bg-white/[0.01] border border-white/5">
                                      <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Setor</p>
                                      <p className="text-[10px] font-black text-zinc-300 uppercase mt-0.5">{c.dept}</p>
                                   </div>
                                   <div className="p-3 rounded-xl bg-white/[0.01] border border-white/5">
                                      <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Contrato</p>
                                      <p className="text-[10px] font-black text-zinc-300 uppercase mt-0.5">{c.type}</p>
                                   </div>
                                </div>
                                <div className="space-y-2">
                                   <div className="flex justify-between items-center text-[9px] font-black uppercase text-zinc-600 italic">
                                      <span>Nível Técnico IA</span>
                                      <span className="text-blue-500">{c.score}%</span>
                                   </div>
                                   <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                      <motion.div 
                                         initial={{ width: 0 }}
                                         animate={{ width: `${c.score}%` }}
                                         className="h-full bg-blue-600"
                                      />
                                   </div>
                                   <div className="flex gap-2 pt-2">
                                      {c.tags.slice(0, 2).map(tag => (
                                        <span key={tag} className="text-[8px] font-black text-zinc-700 border border-white/5 px-2 py-0.5 rounded uppercase tracking-tighter">{tag}</span>
                                      ))}
                                   </div>
                                </div>
                             </div>
                             <div className="px-6 py-3 bg-white/[0.02] border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all">
                                <span className="text-[8px] font-black text-white uppercase tracking-widest italic">Acessar Prontuário Digital</span>
                                <ChevronRight size={14} className="text-blue-500" />
                             </div>
                           </Card>
                         ))}
                      </div>
                </div>
             </div>
           )}
        </TabsContent>

         <TabsContent value="workforce-list" className="space-y-8 mt-0 outline-none">
            <Card className="bg-[#0c0c10] border-white/5 overflow-hidden">
               <Table>
                  <TableHeader className="bg-white/[0.01]">
                     <TableRow className="border-white/5 hover:bg-transparent tracking-widest uppercase text-[9px]">
                        <TableHead className="px-6">Nome</TableHead>
                        <TableHead>Cargo</TableHead>
                        <TableHead>Setor</TableHead>
                        <TableHead>Admissão</TableHead>
                        <TableHead>Compliance</TableHead>
                        <TableHead className="text-right px-6">Ações</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {COLLABORATORS.map((c) => (
                       <TableRow 
                         key={c.id} 
                         onClick={() => setSelectedColabId(c.id)}
                         className="border-white/5 hover:bg-white/[0.01] cursor-pointer group"
                        >
                          <TableCell className="px-6 py-4">
                             <div className="flex items-center gap-3">
                                <Avatar className="w-8 h-8 border border-white/10">
                                   <AvatarImage src={`https://i.pravatar.cc/100?u=${c.avatar}`} />
                                   <AvatarFallback className="text-[10px] font-black italic">{c.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-[11px] font-black text-white italic uppercase tracking-tight">{c.name}</span>
                             </div>
                          </TableCell>
                          <TableCell className="text-[10px] font-bold text-zinc-500 uppercase">{c.role}</TableCell>
                          <TableCell className="text-[10px] font-bold text-zinc-500 uppercase">{c.dept}</TableCell>
                          <TableCell className="text-[10px] font-mono text-zinc-500">{c.admission}</TableCell>
                          <TableCell>
                             <div className="flex gap-2">
                                <div className={cn("w-1.5 h-1.5 rounded-full", c.nrs.nr35 === 'success' ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse')} />
                                <div className={cn("w-1.5 h-1.5 rounded-full", c.nrs.aso === 'success' ? 'bg-emerald-500' : 'bg-amber-500')} />
                             </div>
                          </TableCell>
                          <TableCell className="text-right px-6">
                             <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-600 hover:text-white">
                                <MoreVertical size={14} />
                             </Button>
                          </TableCell>
                       </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </Card>
         </TabsContent>

         <TabsContent value="workforce-matrix" className="space-y-8 mt-0 outline-none">
            <div className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-[#0c0c10] border-white/5 p-4 border-l-4 border-l-rose-500">
                     <div className="flex items-center gap-3 mb-2">
                        <Flame size={16} className="text-rose-500" />
                        <h4 className="text-[10px] font-black text-white uppercase italic tracking-widest">Gargalos Técnicos</h4>
                     </div>
                     <div className="space-y-2">
                        {SKILLS_LIST.map(skill => {
                           const highProficiency = COLLABORATORS.filter(c => (c.skillMatrix as any)[skill] >= 3).length;
                           if (highProficiency <= 1) {
                              return (
                                 <div key={skill} className="flex justify-between items-center bg-white/[0.02] p-2 rounded border border-white/5">
                                    <span className="text-[9px] font-bold text-zinc-400 uppercase">{skill}</span>
                                    <Badge className="bg-rose-500/10 text-rose-500 text-[8px] border-0 h-4 uppercase">Risco Crítico</Badge>
                                 </div>
                              );
                           }
                           return null;
                        })}
                     </div>
                  </Card>

                  <Card className="bg-[#0c0c10] border-white/5 p-4 border-l-4 border-l-amber-500">
                     <div className="flex items-center gap-3 mb-2">
                        <Shield size={16} className="text-amber-500" />
                        <h4 className="text-[10px] font-black text-white uppercase italic tracking-widest">Dependências Operacionais</h4>
                     </div>
                     <div className="space-y-2">
                        {SKILLS_LIST.map(skill => {
                           const specialists = COLLABORATORS.filter(c => (c.skillMatrix as any)[skill] === 4);
                           if (specialists.length === 1) {
                              return (
                                 <div key={skill} className="flex justify-between items-center bg-white/[0.02] p-2 rounded border border-white/5">
                                    <span className="text-[9px] font-bold text-zinc-400 uppercase">{skill}</span>
                                    <span className="text-[8px] font-black text-amber-500 uppercase">{specialists[0].name} (Único Esp.)</span>
                                 </div>
                              );
                           }
                           return null;
                        })}
                     </div>
                  </Card>
               </div>

               <Card className="bg-[#0c0c10] border-white/5 overflow-x-auto">
                  <Table className="min-w-[800px]">
                     <TableHeader className="bg-white/[0.01]">
                        <TableRow className="border-white/5 hover:bg-transparent">
                           <TableHead className="px-6 text-[9px] font-black text-zinc-500 uppercase sticky left-0 bg-[#0c0c10] z-20">Colaborador</TableHead>
                           {SKILLS_LIST.map(skill => (
                              <TableHead key={skill} className="text-center text-[9px] font-black text-zinc-500 uppercase px-4">{skill}</TableHead>
                           ))}
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {COLLABORATORS.map((c) => (
                           <TableRow key={c.id} className="border-white/5 hover:bg-white/[0.01] group">
                              <TableCell className="px-6 py-4 sticky left-0 bg-[#0c0c10] z-10 border-r border-white/5 group-hover:bg-zinc-900/50">
                                 <div className="flex items-center gap-3">
                                    <Avatar className="w-8 h-8 border border-white/10 shrink-0">
                                       <AvatarImage src={`https://i.pravatar.cc/100?u=${c.avatar}`} />
                                       <AvatarFallback className="text-[10px] font-black italic">{c.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                       <span className="text-[11px] font-black text-white italic uppercase tracking-tight">{c.name}</span>
                                       <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-tighter leading-none">{c.role}</span>
                                    </div>
                                 </div>
                              </TableCell>
                              {SKILLS_LIST.map(skill => {
                                 const level = (c.skillMatrix as any)[skill] as keyof typeof PROFICIENCY_LEVELS;
                                 const prof = PROFICIENCY_LEVELS[level];
                                 return (
                                    <TableCell key={skill} className="text-center p-2">
                                       <div className={cn(
                                          "mx-auto w-24 py-1.5 rounded text-[8px] font-black uppercase tracking-widest border transition-all hover:scale-105",
                                          prof.color
                                       )}>
                                          {prof.label}
                                       </div>
                                    </TableCell>
                                 );
                              })}
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </Card>

               <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-600/5 border border-blue-500/20">
                  <Info size={16} className="text-blue-500 shrink-0" />
                  <p className="text-[10px] font-bold text-zinc-400 leading-relaxed uppercase">
                     A <span className="text-white italic">Matriz de Habilidades Técnicas</span> é atualizada via <span className="text-blue-400">Mesh-IA</span> baseada em apontamentos operacionais, tempos de execução e qualidade de entrega.
                  </p>
               </div>
            </div>
         </TabsContent>

        {/* 3. PERFORMANCE TAB */}
        <TabsContent value="performance" className="space-y-8 mt-0 outline-none">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Operational Log */}
              <Card className="lg:col-span-8 bg-[#0c0c10] border-white/5 overflow-hidden">
                 <CardHeader className="bg-white/[0.01] border-b border-white/5 flex flex-row items-center justify-between">
                    <div>
                       <CardTitle className="text-sm font-black text-white uppercase italic tracking-widest">Apontamento Operacional Realtime</CardTitle>
                       <CardDescription className="text-[9px] font-bold text-zinc-500 uppercase mt-1">Timeline de execução vs Horas produtivas</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 text-[9px] font-black uppercase bg-emerald-500/5">Auditado IA</Badge>
                 </CardHeader>
                 <CardContent className="p-0">
                    <Table>
                       <TableHeader className="bg-white/[0.01]">
                          <TableRow className="border-white/5 hover:bg-transparent">
                             <TableHead className="text-[10px] font-black text-zinc-500 uppercase px-6">Colaborador</TableHead>
                             <TableHead className="text-[10px] font-black text-zinc-500 uppercase">Atividade Atual</TableHead>
                             <TableHead className="text-[10px] font-black text-zinc-500 uppercase">Tempo Dec.</TableHead>
                             <TableHead className="text-[10px] font-black text-zinc-500 uppercase">Progresso OS</TableHead>
                             <TableHead className="text-[10px] font-black text-zinc-500 uppercase text-right px-6">Eficiência</TableHead>
                          </TableRow>
                       </TableHeader>
                       <TableBody>
                          {[
                            { name: 'Bruno Alves', act: 'Corte Router - OS #4552', time: '02:45:12', prog: 85, eff: 92, status: 'prod' },
                            { name: 'Ana Beatriz', act: 'Design Letra Caixa - OS #4560', time: '00:52:05', prog: 40, eff: 98, status: 'prod' },
                            { name: 'Eduardo Souza', act: 'Supervisão de Chão', time: '08:12:33', prog: 100, eff: 88, status: 'prod' },
                            { name: 'Ricardo Melo', act: 'Pausa Almoço', time: '00:15:22', prog: 0, eff: 0, status: 'pause' },
                          ].map((log, i) => (
                            <TableRow key={i} className="border-white/5 hover:bg-white/[0.01] group">
                               <TableCell className="px-6 py-5">
                                  <span className="text-[11px] font-black text-white uppercase italic">{log.name}</span>
                               </TableCell>
                               <TableCell>
                                  <div className="flex items-center gap-2">
                                     <div className={cn("w-1.5 h-1.5 rounded-full", log.status === 'prod' ? 'bg-blue-500 animate-pulse' : 'bg-amber-500')} />
                                     <span className="text-[10px] font-bold text-zinc-400">{log.act}</span>
                                  </div>
                               </TableCell>
                               <TableCell>
                                  <span className="text-[10px] font-mono text-blue-400 font-bold tracking-tighter">{log.time}</span>
                               </TableCell>
                               <TableCell>
                                  <div className="flex items-center gap-3 w-32">
                                     <Progress value={log.prog} className="h-1 bg-white/5" />
                                     <span className="text-[9px] font-black text-zinc-600">{log.prog}%</span>
                                  </div>
                               </TableCell>
                               <TableCell className="text-right px-6 font-black text-xs italic text-blue-500">
                                  {log.eff}%
                               </TableCell>
                            </TableRow>
                          ))}
                       </TableBody>
                    </Table>
                 </CardContent>
              </Card>

              {/* Rework & Quality */}
              <div className="lg:col-span-4 space-y-6">
                 <Card className="bg-[#0c0c10] border-white/5 p-6">
                    <div className="flex items-center justify-between mb-6">
                       <h4 className="text-xs font-black text-white uppercase italic tracking-widest">Fator de Retrabalho</h4>
                       <Badge className="bg-rose-500/10 text-rose-500 border-0 text-[9px] font-black uppercase">Crítico</Badge>
                    </div>
                    <div className="flex items-end justify-between mb-4">
                       <div>
                          <p className="text-4xl font-black text-white italic leading-none">1.42%</p>
                          <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mt-2">+0.2% vs média setorial</p>
                       </div>
                       <TrendingUp className="text-rose-500" size={32} />
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
                       <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Principais Causas:</p>
                       <div className="space-y-2">
                          <div className="flex justify-between items-center text-[10px] font-bold">
                             <span className="text-zinc-400">Erro de Medição</span>
                             <span className="text-rose-500">42%</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] font-bold">
                             <span className="text-zinc-400">Falha de Arquivo</span>
                             <span className="text-amber-500">28%</span>
                          </div>
                       </div>
                    </div>
                 </Card>

                 <Card className="bg-emerald-600/5 border border-emerald-500/20 p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                       <Award size={24} className="text-emerald-500/50" />
                    </div>
                    <h4 className="text-xs font-black text-emerald-500 uppercase italic tracking-widest mb-4">Meta Mensal Performance</h4>
                    <div className="space-y-4">
                       <div className="flex justify-between items-end">
                          <span className="text-2xl font-black text-white italic">R$ 142k</span>
                          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest italic">82% Alcançado</span>
                       </div>
                       <Progress value={82} className="h-2 bg-white/5" />
                       <p className="text-[10px] text-zinc-500 leading-relaxed font-medium">Faltam apenas <span className="text-white font-bold">R$ 28.000,00</span> para bater a meta de faturamento operacional do setor de Usinagem.</p>
                    </div>
                 </Card>
              </div>
           </div>
        </TabsContent>

        {/* 4. COMPLIANCE TAB */}
        <TabsContent value="compliance" className="space-y-8 mt-0 outline-none">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Alert Center */}
              <div className="lg:col-span-4 space-y-6">
                 <Card className="bg-[#0c0c10] border-white/5 overflow-hidden">
                    <CardHeader className="bg-white/[0.01] border-b border-white/5 p-4 py-3">
                       <CardTitle className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] italic flex items-center gap-2">
                          <Shield size={14} /> Critical Compliance Alerts
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                       <div className="divide-y divide-white/5">
                          {COMPLIANCE_ALERTS.map((alert, i) => (
                            <div key={i} className="p-5 flex items-center justify-between group hover:bg-white/[0.01] transition-all">
                               <div className="flex items-center gap-4">
                                  <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center font-black transition-all border",
                                    alert.type === 'critical' ? "bg-rose-500/10 text-rose-500 border-rose-500/20" : 
                                    alert.type === 'warning' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : 
                                    "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                  )}>
                                     <FileCheck size={20} />
                                  </div>
                                  <div className="space-y-0.5">
                                     <p className="text-[11px] font-bold text-white uppercase italic tracking-tight">{alert.name}</p>
                                     <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{alert.doc}</p>
                                  </div>
                               </div>
                               <div className="text-right">
                                  <p className={cn(
                                    "text-[10px] font-black uppercase italic",
                                    alert.days < 0 ? "text-rose-500" : "text-amber-500"
                                  )}>
                                     {alert.days < 0 ? `${Math.abs(alert.days)}d Atraso` : `Exp. ${alert.days}d`}
                                  </p>
                                  <Button variant="link" className="p-0 h-auto text-[8px] text-zinc-700 font-black uppercase italic hover:text-white mt-1">Notificar</Button>
                               </div>
                            </div>
                          ))}
                       </div>
                    </CardContent>
                 </Card>

                 <Card className="bg-[#0c0c10] border-white/5">
                    <CardHeader className="border-b border-white/5">
                       <CardTitle className="text-xs font-black text-white uppercase tracking-widest italic">Inventário Operacional RH</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                       {[
                         { label: 'EPIs em Estoque', val: '14 Kits', status: 'OK' },
                         { label: 'Uniformes Disponíveis', val: '42 Unid', status: 'ALERTA' },
                         { label: 'Treinamentos Realizados', val: '124', status: 'OK' },
                       ].map((item, i) => (
                         <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/[0.01] border border-white/5">
                            <div className="space-y-0.5">
                               <p className="text-[9px] font-black text-zinc-600 uppercase italic tracking-widest">{item.label}</p>
                               <p className="text-sm font-black text-white italic tracking-tighter uppercase">{item.val}</p>
                            </div>
                            <Badge className={cn(
                              "text-[8px] font-black border-0 uppercase h-4",
                              item.status === 'OK' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                            )}>{item.status}</Badge>
                         </div>
                       ))}
                       <Button className="w-full bg-white/5 border border-white/10 text-white font-black text-[9px] uppercase tracking-widest h-10 hover:bg-white/15">
                          Gerir Ativos & EPIs
                       </Button>
                    </CardContent>
                 </Card>
              </div>

              {/* Compliance Matrix */}
              <Card className="lg:col-span-8 bg-[#0c0c10] border-white/5 overflow-hidden">
                 <CardHeader className="bg-white/[0.01] border-b border-white/5 p-6 py-4 flex flex-row items-center justify-between">
                    <div>
                       <CardTitle className="text-sm font-black text-white uppercase italic tracking-widest">Matriz de Compliance Legal & NR</CardTitle>
                       <CardDescription className="text-[9px] font-black text-zinc-600 uppercase mt-1 tracking-widest">Status de Normas Regulamentadoras da Equipe Industrial</CardDescription>
                    </div>
                    <div className="flex gap-4">
                       <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-[8px] font-black text-zinc-500 uppercase italic">Válido</span></div>
                       <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500" /><span className="text-[8px] font-black text-zinc-500 uppercase italic">Expirado</span></div>
                    </div>
                 </CardHeader>
                 <CardContent className="p-0">
                    <Table>
                       <TableHeader className="bg-white/[0.01]">
                          <TableRow className="border-white/5 hover:bg-transparent">
                             <TableHead className="text-[10px] font-black text-zinc-500 uppercase px-6">Colaborador</TableHead>
                             <TableHead className="text-[10px] font-black text-zinc-500 uppercase text-center">NR-35 (Altura)</TableHead>
                             <TableHead className="text-[10px] font-black text-zinc-500 uppercase text-center">NR-10 (Elét.)</TableHead>
                             <TableHead className="text-[10px] font-black text-zinc-500 uppercase text-center">ASO (Saúde)</TableHead>
                             <TableHead className="text-[10px] font-black text-zinc-500 uppercase text-center">NR-12 (Máq.)</TableHead>
                             <TableHead className="text-[10px] font-black text-zinc-500 uppercase text-right px-6">Status Total</TableHead>
                          </TableRow>
                       </TableHeader>
                       <TableBody>
                          {[
                            { name: 'Ricardo Melo', nr35: 'error', nr10: 'success', aso: 'success', nr12: 'warning' },
                            { name: 'Bruno Alves', nr35: 'success', nr10: 'n/a', aso: 'success', nr12: 'success' },
                            { name: 'Eduardo Souza', nr35: 'success', nr10: 'success', aso: 'success', nr12: 'success' },
                            { name: 'Ana Beatriz', nr35: 'success', nr10: 'success', aso: 'error', nr12: 'n/a' },
                          ].map((row, i) => (
                            <TableRow key={i} className="border-white/5 hover:bg-white/[0.01]">
                               <TableCell className="px-6 py-5">
                                  <span className="text-[11px] font-black text-white italic uppercase tracking-tight">{row.name}</span>
                               </TableCell>
                               <TableCell>
                                  <div className="flex justify-center">
                                     {row.nr35 === 'success' ? <CheckCircle2 size={16} className="text-emerald-500" /> : 
                                      row.nr35 === 'error' ? <AlertCircle size={16} className="text-rose-500 animate-pulse" /> :
                                      row.nr35 === 'warning' ? <AlertCircle size={16} className="text-amber-500" /> : <div className="text-zinc-800 text-[10px] font-black">-</div>}
                                  </div>
                               </TableCell>
                               <TableCell>
                                  <div className="flex justify-center">
                                     {row.nr10 === 'success' ? <CheckCircle2 size={16} className="text-emerald-500" /> : 
                                      row.nr10 === 'error' ? <AlertCircle size={16} className="text-rose-500" /> : <div className="text-zinc-800 text-[10px] font-black">-</div>}
                                  </div>
                               </TableCell>
                               <TableCell>
                                  <div className="flex justify-center">
                                     {row.aso === 'success' ? <CheckCircle2 size={16} className="text-emerald-500" /> : 
                                      row.aso === 'error' ? <AlertCircle size={16} className="text-rose-500" /> : <div className="text-zinc-800 text-[10px] font-black">-</div>}
                                  </div>
                               </TableCell>
                               <TableCell>
                                  <div className="flex justify-center">
                                     {row.nr12 === 'success' ? <CheckCircle2 size={16} className="text-emerald-500" /> : <div className="text-zinc-800 text-[10px] font-black">-</div>}
                                  </div>
                               </TableCell>
                               <TableCell className="text-right px-6">
                                  <div className="flex items-center justify-end gap-2 text-[10px] font-black italic">
                                     <span className={cn(row.nr35 === 'error' || row.aso === 'error' ? 'text-rose-500' : 'text-emerald-500')}>
                                        {row.nr35 === 'error' || row.aso === 'error' ? 'ALERTA' : 'PERMISSÃO OK'}
                                     </span>
                                     <ChevronRight size={12} className="text-zinc-800" />
                                  </div>
                               </TableCell>
                            </TableRow>
                          ))}
                       </TableBody>
                    </Table>
                 </CardContent>
              </Card>
           </div>
        </TabsContent>

        {/* 5. SKILLS TAB */}
        <TabsContent value="skills" className="space-y-8 mt-0 outline-none">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SKILL_MAP.map((group, i) => (
                <Card key={i} className="bg-[#0c0c10] border-white/5 group hover:border-blue-500/30 transition-all cursor-pointer">
                   <CardHeader className="bg-white/[0.01] border-b border-white/5 py-4">
                      <CardTitle className="text-xs font-black text-white italic uppercase tracking-[0.2em] flex items-center justify-between">
                         {group.group}
                         <Badge variant="outline" className="text-[8px] font-black border-white/5 text-zinc-600 uppercase">MESH-A{i+1}</Badge>
                      </CardTitle>
                   </CardHeader>
                   <CardContent className="p-6 space-y-6">
                      {group.items.map((skill, j) => (
                        <div key={j} className="space-y-2">
                           <div className="flex justify-between items-baseline mb-1">
                              <span className="text-[10px] font-black text-zinc-400 uppercase italic leading-none">{skill.name}</span>
                              <span className="text-[9px] font-black text-blue-500 italic uppercase leading-none tracking-widest">{skill.level}</span>
                           </div>
                           <div className="flex items-center gap-3">
                              <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                                 <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.score}%` }}
                                    className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all group-hover:bg-blue-400"
                                 />
                              </div>
                              <span className="text-[10px] font-black text-zinc-600 italic tracking-tighter">{skill.score}%</span>
                           </div>
                        </div>
                      ))}
                   </CardContent>
                </Card>
              ))}

              <Card className="bg-[#0c0c10] border-white/5 border-dashed relative flex flex-col items-center justify-center p-12 text-center group hover:bg-white/[0.01] transition-all">
                 <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-zinc-800 group-hover:text-blue-500 transition-all mb-4">
                    <Plus size={32} />
                 </div>
                 <h4 className="text-sm font-black text-zinc-500 uppercase italic tracking-widest">Novo Skill Cluster</h4>
                 <p className="text-[10px] text-zinc-700 uppercase font-black mt-1 leading-relaxed">Mapeie novas competências específicas<br/>para sua jornada de produção</p>
                 <Button variant="ghost" className="mt-8 text-[9px] font-black uppercase text-zinc-600 hover:text-white underline underline-offset-8 decoration-white/10">Definir Parâmetros</Button>
              </Card>
           </div>

           {/* Skill Density Heatmap (Abstracted) */}
           <Card className="bg-[#0c0c10] border-white/5 overflow-hidden">
              <CardHeader className="bg-white/[0.01] border-b border-white/5">
                 <CardTitle className="text-xs font-black text-white uppercase tracking-widest italic">Heatmap de Densidade Técnica Operacional</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                 <div className="grid grid-cols-2 lg:grid-cols-6 gap-8">
                    {[
                      { l: 'Mecânica CNC', v: 95, color: 'emerald' },
                      { l: 'Design CAD', v: 82, color: 'blue' },
                      { l: 'Eletrônica', v: 45, color: 'amber' },
                      { l: 'Acabamentos', v: 98, color: 'emerald' },
                      { l: 'Instalação', v: 72, color: 'blue' },
                      { l: 'Solda Especial', v: 35, color: 'rose' },
                    ].map((m, i) => (
                      <div key={i} className="flex flex-col items-center gap-4 group">
                         <div className="relative w-24 h-24 flex items-center justify-center">
                            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                               <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/5" />
                               <circle 
                                 cx="48" 
                                 cy="48" 
                                 r="40" 
                                 stroke="currentColor" 
                                 strokeWidth="6" 
                                 fill="transparent" 
                                 strokeDasharray="251.2" 
                                 strokeDashoffset={251.2 - (251.2 * m.v) / 100}
                                 className={cn(
                                   m.color === 'emerald' ? 'text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' :
                                   m.color === 'blue' ? 'text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' :
                                   m.color === 'amber' ? 'text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' :
                                   'text-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                                 )}
                               />
                            </svg>
                            <span className="text-xl font-black text-white italic tracking-tighter">{m.v}%</span>
                         </div>
                         <div className="text-center group-hover:scale-110 transition-transform">
                            <p className="text-[10px] font-black text-white uppercase italic tracking-tighter">{m.l}</p>
                            <p className="text-[8px] font-black text-zinc-600 uppercase mt-1 tracking-widest">{m.v > 80 ? 'EXPERT CORE' : 'DEVELOPING'}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </CardContent>
           </Card>
        </TabsContent>

        {/* 6. ORGANOGRAMA TAB */}
        <TabsContent value="org" className="space-y-8 mt-0 outline-none">
           {/* START REVAMP */}
           <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Sidebar AI Insights */}
              <div className="xl:col-span-1 space-y-6">
                 <Card className="bg-[#0c0c10] border-white/5 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-600/20 to-transparent border-b border-white/5 py-4">
                       <div className="flex items-center gap-2 text-blue-400 text-[10px] font-black tracking-widest uppercase mb-1">
                          <BrainCircuit size={14} className="animate-pulse" /> Org Intelligence
                       </div>
                       <CardTitle className="text-sm font-black text-white italic uppercase tracking-tighter">Mapeamento Genômico</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                       <div className="space-y-4">
                          <div className="space-y-2">
                             <div className="flex justify-between items-end text-zinc-500 text-[9px] font-black uppercase">
                                <span>Eficiência de Gestão</span>
                                <span className="text-blue-500">88%</span>
                             </div>
                             <Progress value={88} className="h-1 bg-white/5" />
                          </div>
                          
                          <div className="p-4 rounded-xl bg-blue-600/5 border border-blue-500/20 space-y-2">
                             <p className="text-[10px] font-black text-blue-400 uppercase italic">IA Insight</p>
                             <p className="text-[10px] text-zinc-400 leading-tight">
                                <span className="text-white italic">Ana Beatriz</span> é o principal nó de conhecimento. Recomenda-se mentorar <span className="text-white">Bruno</span> para balanceamento.
                             </p>
                          </div>
                       </div>
                    </CardContent>
                 </Card>

                 <Card className="bg-[#0c0c10] border-white/5">
                    <CardHeader className="pb-2">
                       <CardTitle className="text-[10px] font-black text-white uppercase italic tracking-widest">Capacidade por Cluster</CardTitle>
                    </CardHeader>
                    <CardContent className="h-40 p-0">
                       <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                             <Pie data={[{v: 45}, {v: 25}, {v: 30}]} innerRadius={35} outerRadius={50} paddingAngle={2} dataKey="v">
                                <Cell fill="#3b82f6" /><Cell fill="#10b981" /><Cell fill="#f59e0b" />
                             </Pie>
                          </PieChart>
                       </ResponsiveContainer>
                    </CardContent>
                 </Card>
              </div>

              {/* Main Organogram Visualizer */}
              <div className="xl:col-span-3">
                 <Card className="bg-[#0c0c10] border-white/5 overflow-hidden min-h-[700px] flex flex-col relative">
                    <div className="absolute top-6 left-6 z-20 flex gap-2">
                       <Button variant="outline" size="sm" className="bg-black/40 border-white/10 text-[8px] font-black uppercase h-8 px-4 backdrop-blur-md">Mesh View</Button>
                    </div>
                    <div className="p-12 flex flex-col items-center justify-center">
                       {/* RECOVERED */}
                       <p className="text-white">Organograma Reativado</p>
                    </div>
                 </Card>
              </div>
           </div>
        </TabsContent>
                       <div className="flex flex-col items-center gap-20 relative z-10">
                          {/* ROOT node */}
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                             <div className="w-56 p-6 bg-black border-2 border-blue-600 rounded-[2.5rem] text-center shadow-[0_0_50px_rgba(37,99,235,0.15)] group hover:scale-105 transition-all duration-500 cursor-pointer">
                                <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] italic mb-2">Presidente / CEO</p>
                                <p className="text-xl font-black text-white uppercase italic tracking-tighter">Adams Leandro</p>
                             </div>
                             <div className="h-16 w-0.5 mx-auto bg-gradient-to-b from-blue-600 to-white/5" />
                          </motion.div>
                          {/* NEW CONTENT START */}

                 {/* C-Level */}
                 <div className="flex gap-12 md:gap-32 w-full justify-center">
                    {[
                      { label: 'Diretoria Industrial', user: 'Eduardo Souza', color: 'blue' },
                      { label: 'Diretoria Comercial', user: 'Ricardo Santos', color: 'amber' },
                      { label: 'Diretoria Design', user: 'Ana Beatriz', color: 'purple' },
                    ].map((node, i) => (
                      <div key={i} className="flex flex-col items-center gap-10">
                         <div className={cn(
                           "w-36 p-4 bg-white/[0.02] border rounded-2xl text-center transition-all hover:scale-105",
                           `border-${node.color}-500/40 hover:border-${node.color}-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]`
                         )}>
                            <p className={cn("text-[8px] font-black uppercase tracking-widest italic mb-1", `text-${node.color}-500`)}>{node.label}</p>
                            <p className="text-xs font-black text-white uppercase italic tracking-tight">{node.user}</p>
                         </div>
                         <div className={cn("h-16 w-0.5", `bg-gradient-to-b from-${node.color}-500/40 to-white/5`)} />
                         
                         {/* Staff Level */}
                         <div className="flex gap-4">
                            {[1, 2].map(j => (
                              <div key={j} className="w-8 h-8 rounded-full border border-white/10 bg-white/5" />
                            ))}
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
                 <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex items-center gap-4">
                    <Info size={16} className="text-blue-500" />
                    <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Arraste para navegar na visão tridimensional (Mesh-View)</p>
                 </div>
                 <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-[9px] font-black uppercase h-8 px-4">Exportar PDF</Button>
                    <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-[9px] font-black uppercase h-8 px-4">Visualizar por Setor</Button>
                 </div>
              </div>
           </Card>
        </TabsContent>
      </Tabs>

      {/* Global Status Footer */}
      <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-blue-500">
               <History size={18} />
            </div>
            <div>
               <p className="text-[10px] font-black text-white uppercase italic leading-none">Log de Histórico Operacional</p>
               <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mt-1">Sincronismo Global: Ativo</p>
            </div>
         </div>
         <div className="flex -space-x-1">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-6 h-6 rounded-full bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-[7px] font-bold text-blue-400">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
