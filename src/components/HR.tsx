import React, { useState, useRef, useEffect } from 'react';
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
  X,
  Edit,
  Trash2
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

import { BaseTable, Column } from './common/BaseTable';

// --- MOCK DATA ---
const PRODUCTIVITY_DATA = [
  { day: 'Seg', prod: 85, efficiency: 92, reworking: 2 },
  { day: 'Ter', prod: 88, efficiency: 90, reworking: 1 },
  { day: 'Qua', prod: 78, efficiency: 85, reworking: 5 },
  { day: 'Qui', prod: 92, efficiency: 95, reworking: 1 },
  { day: 'Sex', prod: 95, efficiency: 98, reworking: 0 },
  { day: 'Sáb', prod: 60, efficiency: 70, reworking: 2 },
];

interface Collaborator {
  id: number;
  name: string;
  role: string;
  dept: string;
  status: string;
  type: string;
  score: number;
  avatar: string;
  email: string;
  phone: string;
  admission: string;
  lastTraining: string;
  salary: string;
  tags: string[];
  skillMatrix: Record<string, number>;
  nrs: { nr35: string; nr10: string; aso: string };
}

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

export interface OrgNode {
  id: string;
  name: string;
  role: string;
  dept: string;
  level: 'Estratégico' | 'Tático' | 'Operacional';
  parentId: string | null;
}

const INITIAL_ORG_NODES: OrgNode[] = [
  { id: '1', name: 'Adams Leandro', role: 'Presidente & CEO', dept: 'Presidência', level: 'Estratégico', parentId: null },
  
  // Industrial Group
  { id: '2', name: 'Eduardo Souza', role: 'Diretor Industrial', dept: 'Industrial', level: 'Estratégico', parentId: '1' },
  { id: '3', name: 'Marcos Silva', role: 'Gerente Geral Industrial', dept: 'Industrial', level: 'Tático', parentId: '2' },
  { id: '4', name: 'Bruno Alves', role: 'Operador Sênior CNC Router', dept: 'Industrial', level: 'Operacional', parentId: '3' },
  { id: '5', name: 'Ricardo Melo', role: 'Instalador Especialista', dept: 'Industrial', level: 'Operacional', parentId: '3' },
  
  // Comercial Group
  { id: '6', name: 'Ricardo Santos', role: 'Diretor Comercial', dept: 'Comercial', level: 'Estratégico', parentId: '1' },
  { id: '7', name: 'Clara Mendes', role: 'Gerente Comercial', dept: 'Comercial', level: 'Tático', parentId: '6' },
  { id: '8', name: 'Sofia Rezende', role: 'Consultora de Vendas AP', dept: 'Comercial', level: 'Operacional', parentId: '7' },
  { id: '9', name: 'Leandro Cruz', role: 'Executivo de Contas', dept: 'Comercial', level: 'Operacional', parentId: '7' },

  // Design & Engenharia Group
  { id: '10', name: 'Ana Beatriz', role: 'Diretora de Design & CAD', dept: 'Design & Engenharia', level: 'Estratégico', parentId: '1' },
  { id: '11', name: 'Lucas Rocha', role: 'Coordenador de Projetos', dept: 'Design & Engenharia', level: 'Tático', parentId: '10' },
  { id: '12', name: 'Marcelo Lima', role: 'Cadista Designer Jr', dept: 'Design & Engenharia', level: 'Operacional', parentId: '11' },

  // Financeiro & Admin Group
  { id: '13', name: 'Julia Moreira', role: 'Diretora Financeira & CFO', dept: 'Financeiro', level: 'Estratégico', parentId: '1' },
  { id: '14', name: 'Amanda Costa', role: 'Gerente de Contabilidade', dept: 'Financeiro', level: 'Tático', parentId: '13' },
  { id: '15', name: 'Daniel Dias', role: 'Analista de Faturamento', dept: 'Financeiro', level: 'Operacional', parentId: '14' },

  // Recursos Humanos Group
  { id: '16', name: 'Patrícia Antunes', role: 'Gerente de DHO & RH', dept: 'Recursos Humanos', level: 'Tático', parentId: '1' },
  { id: '17', name: 'Sueli Rocha', role: 'Analista de DP / Benefícios', dept: 'Recursos Humanos', level: 'Operacional', parentId: '16' },
];

export function HR({ initialTab: propInitialTab }: { initialTab?: string }) {
  const [activeTab, setActiveTab] = useState(() => {
    if (propInitialTab === 'hr-cad' || propInitialTab === 'hr-colab') return 'colaboradores';
    if (propInitialTab === 'hr-org') return 'org';
    return 'dashboard';
  });
  const [orgNodes, setOrgNodes] = useState<OrgNode[]>(INITIAL_ORG_NODES);
  const [selectedColabId, setSelectedColabId] = useState<number | null>(null);

  // States for interactive organograma
  const [orgViewMode, setOrgViewMode] = useState<'flat' | 'mesh'>('flat');
  const [isAddingNode, setIsAddingNode] = useState(false);
  const [isEditingNode, setIsEditingNode] = useState(false);
  const [editingNode, setEditingNode] = useState<OrgNode | null>(null);
  const [orgSearchQuery, setOrgSearchQuery] = useState('');
  const [orgNodeForm, setOrgNodeForm] = useState({
    name: '',
    role: '',
    dept: 'Industrial',
    level: 'Operacional' as 'Estratégico' | 'Tático' | 'Operacional',
    parentId: ''
  });
  
  const SKILLS_LIST = ['Router CNC', 'Laser Fiber', 'Solda MIG/MAG', 'ACM/Dobra', 'SolidWorks', 'Elétrica'];
  
const PROFICIENCY_LEVELS = {
    0: { label: '-', color: 'bg-zinc-900/50 text-zinc-700' },
    1: { label: 'Básico', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    2: { label: 'Intermed.', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    3: { label: 'Avançado', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    4: { label: 'Especialista', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)]' }
  };

  const COLAB_COLUMNS: Column<Collaborator>[] = [
    {
      header: 'Colaborador',
      accessorKey: 'name',
      sortable: true,
      cell: (c) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9 border-none">
            <AvatarImage src={`https://i.pravatar.cc/100?u=${c.avatar}`} />
            <AvatarFallback className="bg-zinc-900 text-zinc-500">{c.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-[11px] font-black text-white italic uppercase tracking-tight">{c.name}</span>
            <span className="text-[9px] text-zinc-600 font-mono tracking-tighter">{c.email}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Cargo / Setor',
      accessorKey: 'role',
      sortable: true,
      cell: (c) => (
        <div>
          <p className="text-zinc-400 font-bold uppercase text-[10px]">{c.role}</p>
          <p className="text-zinc-600 font-medium text-[9px] uppercase tracking-widest">{c.dept}</p>
        </div>
      )
    },
    {
      header: 'Performance IA',
      accessorKey: 'score',
      sortable: true,
      cell: (c) => (
        <div className="flex flex-col gap-1.5 w-24">
          <div className="flex justify-between items-center text-[8px] font-black uppercase text-zinc-600 italic">
             <span>SCORE</span>
             <span className="text-blue-500">{c.score}%</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
             <div className="h-full bg-blue-600" style={{ width: `${c.score}%` }} />
          </div>
        </div>
      )
    },
    {
      header: 'Compliance NR',
      accessorKey: 'nrs',
      cell: (c) => (
        <div className="flex gap-2">
          <div className={cn("w-2 h-2 rounded-full", c.nrs.nr35 === 'success' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.5)]')} />
          <div className={cn("w-2 h-2 rounded-full", c.nrs.aso === 'success' ? 'bg-emerald-500' : 'bg-amber-500')} />
          <div className={cn("w-2 h-2 rounded-full", c.nrs.nr10 === 'success' ? 'bg-emerald-500' : 'bg-zinc-800')} />
        </div>
      )
    },
    {
      header: 'Contrato',
      accessorKey: 'type',
      cell: (c) => (
        <Badge variant="outline" className="bg-white/5 border-0 text-zinc-500 text-[9px] font-black uppercase h-5">
          {c.type}
        </Badge>
      )
    }
  ];

  // Organograma action helper functions
  const getOrgDescendants = (nodeId: string, currentNodes: OrgNode[]): string[] => {
    const list: string[] = [];
    const recurse = (id: string) => {
      const children = currentNodes.filter(n => n.parentId === id);
      children.forEach(c => {
        list.push(c.id);
        recurse(c.id);
      });
    };
    recurse(nodeId);
    return list;
  };

  const handleAddNodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgNodeForm.name.trim() || !orgNodeForm.role.trim()) return;
    
    const newNodeId = Math.random().toString(36).substr(2, 9);
    const newNode: OrgNode = {
      id: newNodeId,
      name: orgNodeForm.name.trim(),
      role: orgNodeForm.role.trim(),
      dept: orgNodeForm.dept,
      level: orgNodeForm.level,
      parentId: orgNodeForm.parentId || null
    };

    setOrgNodes(prev => [...prev, newNode]);
    setIsAddingNode(false);
    setOrgNodeForm({
      name: '',
      role: '',
      dept: 'Industrial',
      level: 'Operacional',
      parentId: ''
    });
  };

  const handleEditNodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNode || !orgNodeForm.name.trim() || !orgNodeForm.role.trim()) return;

    setOrgNodes(prev => prev.map(n => n.id === editingNode.id ? {
      ...n,
      name: orgNodeForm.name.trim(),
      role: orgNodeForm.role.trim(),
      dept: orgNodeForm.dept,
      level: orgNodeForm.level,
      parentId: orgNodeForm.parentId || null
    } : n));

    setIsEditingNode(false);
    setEditingNode(null);
  };

  const handleDeleteNode = (nodeId: string) => {
    if (nodeId === '1') {
      alert("A raiz presidencial (Adams Leandro) não pode ser removida.");
      return;
    }
    const nodeToDelete = orgNodes.find(n => n.id === nodeId);
    if (!nodeToDelete) return;

    if (confirm(`Tem certeza que deseja remover ${nodeToDelete.name} do organograma? Seus subordinados imediatos serão re-alocados para o nível superior.`)) {
      setOrgNodes(prev => {
        return prev
          .filter(n => n.id !== nodeId)
          .map(n => n.parentId === nodeId ? { ...n, parentId: nodeToDelete.parentId } : n);
      });
    }
  };

  const handleStartAddSubordinate = (parent: OrgNode) => {
    setOrgNodeForm({
      name: '',
      role: '',
      dept: parent.dept,
      level: parent.level === 'Estratégico' ? 'Tático' : 'Operacional',
      parentId: parent.id
    });
    setIsAddingNode(true);
  };

  const handleStartEditNode = (node: OrgNode) => {
    setEditingNode(node);
    setOrgNodeForm({
      name: node.name,
      role: node.role,
      dept: node.dept,
      level: node.level,
      parentId: node.parentId || ''
    });
    setIsEditingNode(true);
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
             <DialogContent className="bg-zinc-950 border-transparent text-white max-w-2xl w-[95vw] md:w-full">
                <DialogHeader>
                   <DialogTitle className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-left">Onboarding Técnico Industrial</DialogTitle>
                   <DialogDescription className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1 text-left">Sincronização de Prontuário Digital e Compliance</DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="pessoal" className="mt-4">
                   <TabsList className="bg-white/5 border-transparent w-full justify-start p-1 mb-6 flex-wrap h-auto">
                      <TabsTrigger value="pessoal" className="flex-1 text-[9px] font-black uppercase tracking-widest">1. Dados Base</TabsTrigger>
                      <TabsTrigger value="cert" className="flex-1 text-[9px] font-black uppercase tracking-widest">2. Certificações</TabsTrigger>
                      <TabsTrigger value="epi" className="flex-1 text-[9px] font-black uppercase tracking-widest">3. Logística EPI</TabsTrigger>
                   </TabsList>
                   <TabsContent value="pessoal" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Nome Completo</Label>
                            <Input className="bg-black border-transparent uppercase text-xs" placeholder="Ex: JOÃO DA SILVA" />
                         </div>
                         <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">CPF / Registro</Label>
                            <Input className="bg-black border-transparent text-xs" placeholder="000.000.000-00" />
                         </div>
                         <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Setor Operativo</Label>
                            <Select>
                               <SelectTrigger className="bg-black border-transparent text-xs">
                                  <SelectValue placeholder="Selecione..." />
                               </SelectTrigger>
                               <SelectContent className="bg-zinc-900 border-transparent text-white">
                                  <SelectItem value="industrial">INDUSTRIAL / CHÃO</SelectItem>
                                  <SelectItem value="design">DESIGN / CRIAÇÃO</SelectItem>
                                  <SelectItem value="inst">INSTALAÇÃO</SelectItem>
                               </SelectContent>
                            </Select>
                         </div>
                         <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Data de Admissão</Label>
                            <Input type="date" className="bg-black border-transparent text-xs" />
                         </div>
                      </div>
                   </TabsContent>
                   <TabsContent value="cert" className="space-y-6">
                      <div className="p-4 rounded-xl border-none bg-white/[0.02] space-y-4">
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
                      <div className="p-4 rounded-xl border-none bg-white/[0.02] flex items-center gap-4">
                         <div className="p-3 bg-zinc-950 rounded-xl border-none">
                            <HardHat size={20} className="text-zinc-500" />
                         </div>
                         <div>
                            <p className="text-[10px] font-black text-white uppercase tracking-tight italic">Kit de Proteção Padrão</p>
                            <p className="text-[9px] font-bold text-zinc-600 uppercase">Reserva automática em estoque: S-42</p>
                         </div>
                      </div>
                   </TabsContent>
                </Tabs>
                <DialogFooter className="mt-8 pt-6 border-t border-transparent flex flex-col md:flex-row gap-4">
                   <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 md:mr-auto">Cancelar</Button>
                   <Button className="bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest px-8 h-12">Confirmar Admissão</Button>
                </DialogFooter>
             </DialogContent>
           </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-transparent border-0 p-0 flex flex-wrap gap-2 w-full xl:w-auto overflow-x-auto scrollbar-hide">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={14} /> },
            { id: 'colaboradores', label: 'Colaboradores', icon: <Users size={14} /> },
            { id: 'performance', label: 'Produtividade', icon: <Timer size={14} /> },
            { id: 'skills', label: 'Habilidades', icon: <Target size={14} /> },
            { id: 'compliance', label: 'Compliance', icon: <Shield size={14} /> },
            { id: 'org', label: 'Organograma', icon: <Network size={14} /> },
          ].map(tab => (
            <TabsTrigger 
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-zinc-400 bg-zinc-900/60 hover:bg-zinc-800/80 hover:text-zinc-200 border-none/85 data-[state=active]:border-blue-500 text-xs font-semibold px-5 h-11 rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-2.5 cursor-pointer shadow-sm flex-none"
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
              <Card key={i} className="bg-white dark:bg-zinc-900 border-transparent relative overflow-hidden group">
                 <div className={cn("absolute top-0 right-0 w-32 h-32 blur-[60px] -mr-16 -mt-16 opacity-10", `bg-${stat.color}-500`)} />
                 <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                       <div className="p-3 rounded-xl bg-white/[0.02] border-none">
                          {stat.icon}
                       </div>
                       <Badge variant="outline" className="text-[9px] font-black border-transparent text-zinc-500">{stat.detail}</Badge>
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
                <Card className="bg-white dark:bg-zinc-900 border-transparent">
                   <CardHeader className="flex flex-row items-center justify-between border-b border-transparent bg-white/[0.01]">
                      <div>
                         <CardTitle className="text-xs font-black text-white uppercase tracking-[0.2em] italic">Análise de Rendimento Industrial</CardTitle>
                         <CardDescription className="text-[9px] font-bold text-zinc-500 uppercase mt-1">Sincronia de produção e eficiência humana semanal</CardDescription>
                      </div>
                      <div className="flex gap-4">
                         <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /><span className="text-[9px] font-black text-zinc-400 uppercase">Produção</span></div>
                         <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /><span className="text-[9px] font-black text-zinc-400 uppercase">Eficiência</span></div>
                      </div>
                   </CardHeader>
                   <CardContent className="p-8 h-[400px] overflow-hidden relative min-h-[400px]">
                      <ResponsiveContainer width="99%" height="99%">
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
                      <div className="p-4 rounded-2xl bg-black/60 border-none space-y-3 relative">
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

                <Card className="bg-white dark:bg-zinc-900 border-transparent">
                   <CardHeader className="bg-white/[0.01] border-b border-transparent">
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

                <Card className="bg-white dark:bg-zinc-900 border-transparent p-6">
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
           <Tabs defaultValue="grid" className="space-y-8">
              {!selectedColab && (
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 zinc-900 border-none p-2 rounded-2xl">
                    <TabsList className="bg-white/5 border-transparent p-1">
                       <TabsTrigger value="grid" className="text-[10px] font-black uppercase px-6 h-10 data-[state=active]:bg-white/10 data-[state=active]:text-white">
                          <LayoutGrid size={14} className="mr-2" /> Grid
                       </TabsTrigger>
                       <TabsTrigger value="list" className="text-[10px] font-black uppercase px-6 h-10 data-[state=active]:bg-white/10 data-[state=active]:text-white">
                          <List size={14} className="mr-2" /> Lista
                       </TabsTrigger>
                       <TabsTrigger value="matrix" className="text-[10px] font-black uppercase px-6 h-10 data-[state=active]:bg-white/10 data-[state=active]:text-white">
                          <Target size={14} className="mr-2" /> Matriz Técnica
                       </TabsTrigger>
                    </TabsList>
                    
                    <div className="flex items-center gap-3 px-2">
                       <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                          <Input className="bg-black/40 border-transparent pl-9 h-10 w-64 text-[10px] text-white uppercase font-bold tracking-widest" placeholder="Filtrar talentos..." />
                       </div>
                       <Button variant="outline" className="h-10 px-4 border-transparent text-white text-[9px] font-black uppercase">
                          <Filter size={14} className="mr-2" /> Avançado
                       </Button>
                    </div>
                 </div>
              )}

              <TabsContent value="grid" className="mt-0 outline-none">
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
                      <Button variant="outline" className="h-9 px-4 border-transparent text-zinc-500 hover:text-white text-[9px] font-black uppercase gap-2">
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
                      <Card className="bg-white dark:bg-zinc-900 border-transparent overflow-hidden relative">
                         <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-blue-600/10 to-transparent" />
                         <CardContent className="p-8 pt-12 flex flex-col items-center text-center relative">
                            <Avatar className="w-32 h-32 border-4 border-black ring-4 ring-blue-600/20 mb-6">
                               <AvatarImage src={`https://i.pravatar.cc/100?u=${selectedColab.avatar}`} />
                               <AvatarFallback className="text-4xl font-black italic">{selectedColab.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-1">{selectedColab.name}</h2>
                            <p className="text-blue-500 text-[11px] font-black uppercase tracking-[0.2em] mb-6">{selectedColab.role}</p>
                            
                            <div className="w-full grid grid-cols-2 gap-1 border-y border-transparent py-4 my-2">
                               <div className="text-center">
                                  <p className="text-[8px] font-black text-zinc-600 uppercase">Setor</p>
                                  <p className="text-[10px] font-black text-zinc-300 uppercase">{selectedColab.dept}</p>
                               </div>
                               <div className="text-center border-l border-transparent">
                                  <p className="text-[8px] font-black text-zinc-600 uppercase">Contrato</p>
                                  <p className="text-[10px] font-black text-zinc-300 uppercase">{selectedColab.type}</p>
                               </div>
                            </div>

                            <div className="w-full space-y-4 mt-6">
                               <div className="flex items-center gap-3 text-zinc-400 group cursor-default">
                                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-600 group-hover:text-blue-500 transition-colors border-none">
                                     <Mail size={14} />
                                  </div>
                                  <span className="text-[10px] font-bold tracking-tight lowercase">{selectedColab.email}</span>
                               </div>
                               <div className="flex items-center gap-3 text-zinc-400 group cursor-default">
                                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-600 group-hover:text-blue-500 transition-colors border-none">
                                     <Phone size={14} />
                                  </div>
                                  <span className="text-[10px] font-bold tracking-tight">{selectedColab.phone}</span>
                               </div>
                            </div>
                         </CardContent>
                      </Card>

                      <Card className="bg-white dark:bg-zinc-900 border-transparent">
                         <CardHeader className="border-b border-transparent pb-4">
                            <CardTitle className="text-xs font-black text-white uppercase italic tracking-widest">Compliance Audit</CardTitle>
                         </CardHeader>
                         <CardContent className="p-6 space-y-4">
                            {[
                              { label: 'NR-35 Altura', status: selectedColab.nrs.nr35 },
                              { label: 'NR-10 Elétrica', status: selectedColab.nrs.nr10 },
                              { label: 'ASO Periódico', status: selectedColab.nrs.aso },
                            ].map((audit, i) => (
                              <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/[0.01] border-none">
                                 <span className="text-[10px] font-black text-zinc-400 uppercase italic">{audit.label}</span>
                                 <div className={cn(
                                   "w-2 h-2 rounded-full",
                                   audit.status === 'success' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                                   audit.status === 'error' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)] animate-pulse' :
                                   audit.status === 'warning' ? 'bg-amber-500' : 'bg-zinc-800'
                                 )} />
                              </div>
                            ))}
                            <Button className="w-full bg-white/5 hover:bg-white/10 text-white text-[9px] font-black uppercase h-10 border-none">
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
                           <Card key={i} className="bg-white dark:bg-zinc-900 border-transparent group">
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

                      <Card className="bg-white dark:bg-zinc-900 border-transparent">
                         <CardHeader className="border-b border-transparent flex flex-row items-center justify-between">
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
                               <div className="p-6 rounded-2xl bg-white/[0.01] border-none relative overflow-hidden group">
                                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                                     <ArrowUpRight className="text-emerald-500" />
                                  </div>
                                  <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Potencial de Liderança</h4>
                                  <p className="text-4xl font-black text-white italic tracking-tighter">8.2<span className="text-zinc-700 text-xl">/10</span></p>
                                  <p className="text-[9px] text-zinc-500 mt-2 leading-relaxed uppercase font-bold">Baseado em resolução de problemas e auxílio em bancada.</p>
                               </div>
                               <div className="p-6 rounded-2xl bg-white/[0.01] border-none relative overflow-hidden group">
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

                      <Card className="bg-white dark:bg-zinc-900 border-transparent">
                         <CardHeader className="bg-white/[0.01] border-b border-transparent">
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
                <Card className="bg-white dark:bg-zinc-900 border-transparent lg:col-span-1 h-fit sticky top-8">
                   <CardHeader className="border-b border-transparent pb-4">
                      <CardTitle className="text-xs font-black text-white uppercase italic tracking-widest leading-none">Intelligence Filters</CardTitle>
                   </CardHeader>
                   <CardContent className="p-6 space-y-6">
                      <div className="relative">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                         <Input className="bg-black border-transparent pl-9 h-10 text-[10px] text-white uppercase font-bold tracking-widest" placeholder="Pesquisar por nome ou cargo..." />
                      </div>
                      <div className="space-y-4">
                         <div className="space-y-2">
                            <Label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Setor Industrial</Label>
                            <Select defaultValue="industrial">
                               <SelectTrigger className="bg-black border-transparent h-10 text-[10px] uppercase font-bold">
                                  <SelectValue placeholder="Selecione..." />
                               </SelectTrigger>
                               <SelectContent className="bg-zinc-950 border-transparent text-white">
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
                            <div className="flex items-center justify-between bg-white/[0.02] p-2 rounded border-none">
                               <span className="text-[8px] font-bold text-zinc-600 uppercase">Geolocalização</span>
                               <Badge className="bg-blue-500/10 text-blue-500 text-[7px] border-0 h-4">Ativo</Badge>
                            </div>
                            <div className="flex items-center justify-between bg-white/[0.02] p-2 rounded border-none">
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
                             className="bg-white dark:bg-zinc-900 border-transparent hover:border-blue-500/30 transition-all group cursor-pointer relative overflow-hidden"
                           >
                             <div className="p-6">
                                <div className="flex items-start justify-between mb-6">
                                   <div className="flex items-center gap-4">
                                      <Avatar className="w-14 h-14 border-none group-hover:border-blue-500 transition-all duration-500">
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
                                   <div className="p-3 rounded-xl bg-white/[0.01] border-none">
                                      <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Setor</p>
                                      <p className="text-[10px] font-black text-zinc-300 uppercase mt-0.5">{c.dept}</p>
                                   </div>
                                   <div className="p-3 rounded-xl bg-white/[0.01] border-none">
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
                                        <span key={tag} className="text-[8px] font-black text-zinc-700 border-none px-2 py-0.5 rounded uppercase tracking-tighter">{tag}</span>
                                      ))}
                                   </div>
                                </div>
                             </div>
                             <div className="px-6 py-3 bg-white/[0.02] border-t border-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all">
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

           <TabsContent value="list" className="mt-0 outline-none">
              <BaseTable 
                data={COLLABORATORS}
                columns={COLAB_COLUMNS}
                searchPlaceholder="Pesquisar colaborador no motor KORTECK..."
                onRowClick={(row) => setSelectedColabId(row.id)}
              />
           </TabsContent>

           <TabsContent value="matrix" className="mt-0 outline-none">
              <div className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-white dark:bg-zinc-900 border-transparent p-4 border-l-4 border-l-rose-500">
                       <div className="flex items-center gap-3 mb-2">
                          <Flame size={16} className="text-rose-500" />
                          <h4 className="text-[10px] font-black text-white uppercase italic tracking-widest">Gargalos Técnicos</h4>
                       </div>
                       <div className="space-y-2">
                          {SKILLS_LIST.map(skill => {
                             const highProficiency = COLLABORATORS.filter(c => (c.skillMatrix as any)[skill] >= 3).length;
                             if (highProficiency <= 1) {
                                return (
                                   <div key={skill} className="flex justify-between items-center bg-white/[0.02] p-2 rounded border-none">
                                      <span className="text-[9px] font-bold text-zinc-400 uppercase">{skill}</span>
                                      <Badge className="bg-rose-500/10 text-rose-500 text-[8px] border-0 h-4 uppercase">Risco Crítico</Badge>
                                   </div>
                                );
                             }
                             return null;
                          })}
                       </div>
                    </Card>

                    <Card className="bg-white dark:bg-zinc-900 border-transparent p-4 border-l-4 border-l-amber-500">
                       <div className="flex items-center gap-3 mb-2">
                          <Shield size={16} className="text-amber-500" />
                          <h4 className="text-[10px] font-black text-white uppercase italic tracking-widest">Dependências Operacionais</h4>
                       </div>
                       <div className="space-y-2">
                          {SKILLS_LIST.map(skill => {
                             const specialists = COLLABORATORS.filter(c => (c.skillMatrix as any)[skill] === 4);
                             if (specialists.length === 1) {
                                return (
                                   <div key={skill} className="flex justify-between items-center bg-white/[0.02] p-2 rounded border-none">
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

                 <Card className="bg-white dark:bg-zinc-900 border-transparent overflow-x-auto">
                    <Table className="min-w-[800px]">
                       <TableHeader className="bg-white/[0.01]">
                          <TableRow className="border-transparent hover:bg-transparent">
                             <TableHead className="px-6 text-[9px] font-black text-zinc-500 uppercase sticky left-0 zinc-900 z-20">Colaborador</TableHead>
                             {SKILLS_LIST.map(skill => (
                                <TableHead key={skill} className="text-center text-[9px] font-black text-zinc-500 uppercase px-4">{skill}</TableHead>
                             ))}
                          </TableRow>
                       </TableHeader>
                       <TableBody>
                          {COLLABORATORS.map((c) => (
                             <TableRow key={c.id} className="border-transparent hover:bg-white/[0.01] group">
                                <TableCell className="px-6 py-4 sticky left-0 zinc-900 z-10 border-r border-transparent group-hover:bg-zinc-900/50">
                                   <div className="flex items-center gap-3">
                                      <Avatar className="w-8 h-8 border-none shrink-0">
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
        </Tabs>
      </TabsContent>



        {/* 3. PERFORMANCE TAB */}
        <TabsContent value="performance" className="space-y-8 mt-0 outline-none">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Operational Log */}
              <Card className="lg:col-span-8 zinc-900 border-transparent overflow-hidden">
                 <CardHeader className="bg-white/[0.01] border-b border-transparent flex flex-row items-center justify-between">
                    <div>
                       <CardTitle className="text-sm font-black text-white uppercase italic tracking-widest">Apontamento Operacional Realtime</CardTitle>
                       <CardDescription className="text-[9px] font-bold text-zinc-500 uppercase mt-1">Timeline de execução vs Horas produtivas</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 text-[9px] font-black uppercase bg-emerald-500/5">Auditado IA</Badge>
                 </CardHeader>
                 <CardContent className="p-0">
                    <Table>
                       <TableHeader className="bg-white/[0.01]">
                          <TableRow className="border-transparent hover:bg-transparent">
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
                            <TableRow key={i} className="border-transparent hover:bg-white/[0.01] group">
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
                 <Card className="bg-white dark:bg-zinc-900 border-transparent p-6">
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
                    <div className="p-4 rounded-xl bg-white/[0.01] border-none space-y-3">
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
                 <Card className="bg-white dark:bg-zinc-900 border-transparent overflow-hidden">
                    <CardHeader className="bg-white/[0.01] border-b border-transparent p-4 py-3">
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

                 <Card className="bg-white dark:bg-zinc-900 border-transparent">
                    <CardHeader className="border-b border-transparent">
                       <CardTitle className="text-xs font-black text-white uppercase tracking-widest italic">Inventário Operacional RH</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                       {[
                         { label: 'EPIs em Estoque', val: '14 Kits', status: 'OK' },
                         { label: 'Uniformes Disponíveis', val: '42 Unid', status: 'ALERTA' },
                         { label: 'Treinamentos Realizados', val: '124', status: 'OK' },
                       ].map((item, i) => (
                         <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/[0.01] border-none">
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
                       <Button className="w-full bg-white/5 border-none text-white font-black text-[9px] uppercase tracking-widest h-10 hover:bg-white/15">
                          Gerir Ativos & EPIs
                       </Button>
                    </CardContent>
                 </Card>
              </div>

              {/* Compliance Matrix */}
              <Card className="lg:col-span-8 zinc-900 border-transparent overflow-hidden">
                 <CardHeader className="bg-white/[0.01] border-b border-transparent p-6 py-4 flex flex-row items-center justify-between">
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
                          <TableRow className="border-transparent hover:bg-transparent">
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
                            <TableRow key={i} className="border-transparent hover:bg-white/[0.01]">
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
                <Card key={i} className="bg-white dark:bg-zinc-900 border-transparent group hover:border-blue-500/30 transition-all cursor-pointer">
                   <CardHeader className="bg-white/[0.01] border-b border-transparent py-4">
                      <CardTitle className="text-xs font-black text-white italic uppercase tracking-[0.2em] flex items-center justify-between">
                         {group.group}
                         <Badge variant="outline" className="text-[8px] font-black border-transparent text-zinc-600 uppercase">MESH-A{i+1}</Badge>
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

              <Card className="bg-white dark:bg-zinc-900 border-transparent border-dashed relative flex flex-col items-center justify-center p-12 text-center group hover:bg-white/[0.01] transition-all">
                 <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-zinc-800 group-hover:text-blue-500 transition-all mb-4">
                    <Plus size={32} />
                 </div>
                 <h4 className="text-sm font-black text-zinc-500 uppercase italic tracking-widest">Novo Skill Cluster</h4>
                 <p className="text-[10px] text-zinc-700 uppercase font-black mt-1 leading-relaxed">Mapeie novas competências específicas<br/>para sua jornada de produção</p>
                 <Button variant="ghost" className="mt-8 text-[9px] font-black uppercase text-zinc-600 hover:text-white underline underline-offset-8 decoration-white/10">Definir Parâmetros</Button>
              </Card>
           </div>

           {/* Skill Density Heatmap (Abstracted) */}
           <Card className="bg-white dark:bg-zinc-900 border-transparent overflow-hidden">
              <CardHeader className="bg-white/[0.01] border-b border-transparent">
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
           <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Sidebar: Analytics, Search, and Directory Operations */}
              <div className="xl:col-span-1 space-y-6">
                 {/* Stats Card */}
                 <Card className="bg-white dark:bg-zinc-900 border-transparent overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-600/20 to-transparent border-b border-transparent py-4">
                       <div className="flex items-center gap-2 text-blue-400 text-[10px] font-black tracking-widest uppercase mb-1">
                          <BrainCircuit size={14} className="animate-pulse" /> Org Intelligence
                       </div>
                       <CardTitle className="text-sm font-black text-white italic uppercase tracking-tighter">Mapeamento Corporativo</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-5">
                       <div className="space-y-3">
                          <div className="flex justify-between items-center text-[10px] font-bold text-zinc-400">
                             <span>TOTAL MEMBROS</span>
                             <span className="text-white font-mono">{orgNodes.length}</span>
                          </div>
                          
                          <div className="space-y-1.5">
                             <div className="flex justify-between items-end text-[9px] font-black uppercase text-zinc-500">
                                <span>Estratégico</span>
                                <span className="text-rose-400">{orgNodes.filter(n => n.level === 'Estratégico').length}</span>
                             </div>
                             <Progress value={(orgNodes.filter(n => n.level === 'Estratégico').length / orgNodes.length) * 100} className="h-1 bg-white/5 [&>div]:bg-rose-500" />
                          </div>

                          <div className="space-y-1.5">
                             <div className="flex justify-between items-end text-[9px] font-black uppercase text-zinc-500">
                                <span>Tático</span>
                                <span className="text-amber-400">{orgNodes.filter(n => n.level === 'Tático').length}</span>
                             </div>
                             <Progress value={(orgNodes.filter(n => n.level === 'Tático').length / orgNodes.length) * 100} className="h-1 bg-white/5 [&>div]:bg-amber-500" />
                          </div>

                          <div className="space-y-1.5">
                             <div className="flex justify-between items-end text-[9px] font-black uppercase text-zinc-500">
                                <span>Operacional</span>
                                <span className="text-emerald-400">{orgNodes.filter(n => n.level === 'Operacional').length}</span>
                             </div>
                             <Progress value={(orgNodes.filter(n => n.level === 'Operacional').length / orgNodes.length) * 100} className="h-1 bg-white/5 [&>div]:bg-emerald-500" />
                          </div>
                       </div>

                       <div className="p-3.5 rounded-xl bg-blue-600/5 border border-blue-500/10 text-[10px] space-y-1">
                          <p className="font-black text-blue-400 uppercase italic">Recomendação Mesh-IA</p>
                          <p className="text-zinc-400 leading-tight">
                             Níveis distribuídos de forma equilibrada. Prontos para expansão estratégica com foco operacional.
                          </p>
                       </div>

                       <Button 
                         onClick={() => {
                           setOrgNodeForm({ name: '', role: '', dept: 'Industrial', level: 'Operacional', parentId: orgNodes[0]?.id || '' });
                           setIsAddingNode(true);
                         }}
                         className="w-full bg-blue-600 hover:bg-blue-500/90 text-white font-black text-[10px] uppercase tracking-widest h-10 gap-2"
                       >
                          <Plus size={14} /> Novo Membro
                       </Button>
                    </CardContent>
                 </Card>

                 {/* Custom search filter & direct list edit directory */}
                 <Card className="bg-white dark:bg-zinc-900 border-transparent overflow-hidden">
                    <CardHeader className="py-4 border-b border-transparent">
                       <CardTitle className="text-[10px] font-black text-white uppercase italic tracking-widest">Diretório de Busca Fiel</CardTitle>
                       <CardDescription className="text-[9px] text-zinc-500 uppercase">Busque e edite nós sem navegar no gráfico</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                       <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 w-3.5 h-3.5" />
                          <Input 
                            value={orgSearchQuery}
                            onChange={e => setOrgSearchQuery(e.target.value)}
                            placeholder="Buscar nome, cargo ou setor..." 
                            className="bg-black/50 border-transparent text-[11px] h-9 pl-9 text-white placeholder-zinc-600 uppercase tracking-tighter"
                          />
                       </div>

                       {/* List of personnel nodes */}
                       <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 pr-1">
                          {orgNodes.filter(n => 
                            n.name.toLowerCase().includes(orgSearchQuery.toLowerCase()) ||
                            n.role.toLowerCase().includes(orgSearchQuery.toLowerCase()) ||
                            n.dept.toLowerCase().includes(orgSearchQuery.toLowerCase())
                          ).map(node => (
                            <div key={node.id} className="p-2 bg-white/[0.01] border-none hover:border-transparent rounded-lg flex items-center justify-between gap-2 group transition-all">
                               <div className="min-w-0">
                                  <p className="text-[10px] font-black text-white truncate leading-none uppercase">{node.name}</p>
                                  <p className="text-[8px] text-zinc-500 font-bold truncate mt-0.5 leading-none uppercase">{node.role} • {node.dept}</p>
                               </div>
                               <div className="flex gap-1">
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-6 w-6 text-zinc-500 hover:text-white hover:bg-white/5"
                                    onClick={() => handleStartEditNode(node)}
                                  >
                                     <Edit size={10} />
                                  </Button>
                                  {node.parentId && (
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-6 w-6 text-rose-500 hover:text-rose-400 hover:bg-rose-950/25"
                                      onClick={() => handleDeleteNode(node.id)}
                                    >
                                       <Trash2 size={10} />
                                    </Button>
                                  )}
                               </div>
                            </div>
                          ))}
                          {orgNodes.filter(n => 
                            n.name.toLowerCase().includes(orgSearchQuery.toLowerCase()) ||
                            n.role.toLowerCase().includes(orgSearchQuery.toLowerCase()) ||
                            n.dept.toLowerCase().includes(orgSearchQuery.toLowerCase())
                          ).length === 0 && (
                            <p className="text-[9px] text-zinc-600 italic text-center py-4">Nenhum membro encontrado.</p>
                          )}
                       </div>
                    </CardContent>
                 </Card>
              </div>

              {/* Main Panel: Interactive Tree layout vs rotating 3D Mesh layout */}
              <div className="xl:col-span-3">
                 <Card className="bg-white dark:bg-zinc-900 border-transparent overflow-hidden min-h-[700px] flex flex-col relative">
                    <div className="absolute top-6 right-6 z-20 flex gap-2">
                       <Button 
                         variant={orgViewMode === 'flat' ? 'secondary' : 'outline'}
                         size="sm" 
                         onClick={() => setOrgViewMode('flat')}
                         className={cn(
                           "text-[9px] font-black uppercase h-8 px-4",
                           orgViewMode === 'flat' ? 'bg-blue-600 hover:bg-blue-500 text-white border-0' : 'bg-black/40 border-transparent text-zinc-400 hover:text-white backdrop-blur-md'
                         )}
                       >
                         Visão Tradicional
                       </Button>
                       <Button 
                         variant={orgViewMode === 'mesh' ? 'secondary' : 'outline'}
                         size="sm" 
                         onClick={() => setOrgViewMode('mesh')}
                         className={cn(
                           "text-[9px] font-black uppercase h-8 px-4",
                           orgViewMode === 'mesh' ? 'bg-blue-600 hover:bg-blue-500 text-white border-0 animate-pulse' : 'bg-black/40 border-transparent text-zinc-400 hover:text-white backdrop-blur-md'
                         )}
                       >
                         Visualizador 3D Mesh
                       </Button>
                    </div>

                    <div className="absolute top-6 left-6 z-20">
                       <h2 className="text-sm font-black text-white italic uppercase tracking-tighter leading-none">
                          Diagramação Organizacional
                       </h2>
                       <p className="text-[9px] text-zinc-500 uppercase tracking-widest mt-1">
                          Navegue, insira lideranças e alterne eixos de profundidade
                       </p>
                    </div>

                    {/* Canvas/Tree render context */}
                    <div className="flex-1 flex flex-col items-center justify-center relative overflow-auto p-12 pt-28 custom-scrollbar">
                       {orgViewMode === 'mesh' ? (
                          <div className="w-full h-[580px] flex flex-col relative">
                             <OrgMesh3D 
                               nodes={orgNodes}
                               onSelectNode={(node) => handleStartEditNode(node)}
                             />
                             <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex items-center justify-center">
                                <div className="p-3 bg-black/80 border-none backdrop-blur-md rounded-xl flex items-center gap-3">
                                   <Info size={14} className="text-blue-500 animate-bounce" />
                                   <p className="text-[8.5px] font-black text-zinc-400 uppercase tracking-widest">
                                      Arraste com o cursor para navegar na visão tridimensional. Clique em um nó para editá-lo.
                                   </p>
                                </div>
                             </div>
                          </div>
                       ) : (
                          <div className="flex flex-col items-center gap-12 relative z-10 w-full overflow-x-auto select-none py-10">
                             {/* Root recursion start point */}
                             {orgNodes.find(n => n.parentId === null) ? (
                               <TreeNode 
                                 node={orgNodes.find(n => n.parentId === null)!}
                                 nodes={orgNodes}
                                 onEdit={handleStartEditNode}
                                 onDelete={handleDeleteNode}
                                 onAddSub={handleStartAddSubordinate}
                               />
                             ) : (
                               <div className="text-center">
                                  <p className="text-[11px] text-zinc-500 italic">Estrutura sem nó raiz configurado.</p>
                                  <Button 
                                    className="mt-4 text-[10px] font-black uppercase"
                                    onClick={() => setOrgNodes([{ id: '1', name: 'Adams Leandro', role: 'Presidente & CEO', dept: 'Presidência', level: 'Estratégico', parentId: null }])}
                                  >
                                     Resetar para Presidente Adams Leandro
                                  </Button>
                               </div>
                             )}
                          </div>
                       )}
                    </div>

                    <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between pointer-events-none xl:pointer-events-auto">
                       <div className="p-3 bg-white/[0.01] border-none rounded-xl flex items-center gap-3">
                          <div className="flex gap-2">
                             <span className="flex items-center gap-1.5 text-[8.5px] font-black text-rose-400 uppercase">
                                <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" /> ESTRATÉGICO
                             </span>
                             <span className="flex items-center gap-1.5 text-[8.5px] font-black text-amber-400 uppercase">
                                <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" /> TÁTICO
                             </span>
                             <span className="flex items-center gap-1.5 text-[8.5px] font-black text-emerald-400 uppercase">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> OPERACIONAL
                             </span>
                          </div>
                       </div>
                       <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-white/5 border-transparent text-[9px] font-black uppercase h-8 px-4"
                            onClick={() => window.print()}
                          >
                             Exportar PDF
                          </Button>
                       </div>
                    </div>
                 </Card>
              </div>
           </div>

           {/* DIALOG FOR ADDING A NODE */}
           <Dialog open={isAddingNode} onOpenChange={setIsAddingNode}>
              <DialogContent className="bg-white dark:bg-zinc-900 border-transparent text-white max-w-md">
                 <DialogHeader>
                    <DialogTitle className="text-base font-black uppercase tracking-tight italic">
                       Adicionar Membro ao Organograma
                    </DialogTitle>
                    <DialogDescription className="text-[10px] text-zinc-500 uppercase tracking-wider">
                       Informe os detalhes do colaborador para acoplar hierarquia
                    </DialogDescription>
                 </DialogHeader>
                 
                 <form onSubmit={handleAddNodeSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                       <Label className="text-[10px] font-bold text-zinc-400 uppercase">Nome Completo</Label>
                       <Input 
                         required
                         value={orgNodeForm.name}
                         onChange={e => setOrgNodeForm(prev => ({ ...prev, name: e.target.value }))}
                         placeholder="Ex: Carlos Eduardo Medeiros"
                         className="bg-black/50 border-transparent text-xs text-white uppercase tracking-tighter"
                       />
                    </div>

                    <div className="space-y-1.5">
                       <Label className="text-[10px] font-bold text-zinc-400 uppercase">Cargo / Função</Label>
                       <Input 
                         required
                         value={orgNodeForm.role}
                         onChange={e => setOrgNodeForm(prev => ({ ...prev, role: e.target.value }))}
                         placeholder="Ex: Engenheiro de Processos CNC"
                         className="bg-black/50 border-transparent text-xs text-white uppercase tracking-tighter"
                       />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-1.5">
                          <Label className="text-[10px] font-bold text-zinc-400 uppercase">Nível Hierárquico</Label>
                          <Select 
                            value={orgNodeForm.level}
                            onValueChange={val => setOrgNodeForm(prev => ({ ...prev, level: val as any }))}
                          >
                             <SelectTrigger className="bg-black/50 border-transparent text-xs uppercase">
                                <SelectValue placeholder="Nível" />
                             </SelectTrigger>
                             <SelectContent className="bg-white dark:bg-zinc-900 border-transparent text-white uppercase text-xs">
                                <SelectItem value="Estratégico">Estratégico</SelectItem>
                                <SelectItem value="Tático">Tático</SelectItem>
                                <SelectItem value="Operacional">Operacional</SelectItem>
                             </SelectContent>
                          </Select>
                       </div>

                       <div className="space-y-1.5">
                          <Label className="text-[10px] font-bold text-zinc-400 uppercase">Área / Setor</Label>
                          <Select 
                            value={orgNodeForm.dept}
                            onValueChange={val => setOrgNodeForm(prev => ({ ...prev, dept: val }))}
                          >
                             <SelectTrigger className="bg-black/50 border-transparent text-xs uppercase">
                                <SelectValue placeholder="Setor" />
                             </SelectTrigger>
                             <SelectContent className="bg-white dark:bg-zinc-900 border-transparent text-white uppercase text-xs">
                                <SelectItem value="Presidência">Presidência</SelectItem>
                                <SelectItem value="Industrial">Industrial (Produção)</SelectItem>
                                <SelectItem value="Comercial">Comercial (Vendas)</SelectItem>
                                <SelectItem value="Design & Engenharia">Design & Engenharia</SelectItem>
                                <SelectItem value="Financeiro">Financeiro</SelectItem>
                                <SelectItem value="Recursos Humanos">Recursos Humanos (RH)</SelectItem>
                             </SelectContent>
                          </Select>
                       </div>
                    </div>

                    <div className="space-y-1.5">
                       <Label className="text-[10px] font-bold text-zinc-400 uppercase">Supervisão Direta (Superior Hierárquico)</Label>
                       <Select 
                         value={orgNodeForm.parentId}
                         onValueChange={val => setOrgNodeForm(prev => ({ ...prev, parentId: val }))}
                       >
                          <SelectTrigger className="bg-black/50 border-transparent text-xs uppercase">
                             <SelectValue placeholder="Selecione o Líder..." />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-zinc-900 border-transparent text-white uppercase text-xs">
                             {orgNodes.map(n => (
                               <SelectItem key={n.id} value={n.id}>
                                  {n.name} ({n.role} • {n.dept})
                               </SelectItem>
                             ))}
                          </SelectContent>
                       </Select>
                    </div>

                    <DialogFooter className="pt-4 border-t border-transparent flex gap-2">
                       <Button 
                         type="button" 
                         variant="ghost" 
                         onClick={() => setIsAddingNode(false)}
                         className="text-[10px] font-black uppercase text-zinc-500"
                       >
                          Cancelar
                       </Button>
                       <Button 
                         type="submit" 
                         className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase px-6"
                       >
                          Criar e Agrupar
                       </Button>
                    </DialogFooter>
                 </form>
              </DialogContent>
           </Dialog>

           {/* DIALOG FOR EDITING A NODE */}
           <Dialog open={isEditingNode} onOpenChange={setIsEditingNode}>
              <DialogContent className="bg-white dark:bg-zinc-900 border-transparent text-white max-w-md">
                 <DialogHeader>
                    <DialogTitle className="text-base font-black uppercase tracking-tight italic">
                       Editar Membro: {editingNode?.name}
                    </DialogTitle>
                    <DialogDescription className="text-[10px] text-zinc-500 uppercase tracking-wider">
                       Modifique permissões, cargos ou remodele a matriz relacional
                    </DialogDescription>
                 </DialogHeader>
                 
                 <form onSubmit={handleEditNodeSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                       <Label className="text-[10px] font-bold text-zinc-400 uppercase">Nome Completo</Label>
                       <Input 
                         required
                         value={orgNodeForm.name}
                         onChange={e => setOrgNodeForm(prev => ({ ...prev, name: e.target.value }))}
                         className="bg-black/50 border-transparent text-xs text-white uppercase tracking-tighter"
                       />
                    </div>

                    <div className="space-y-1.5">
                       <Label className="text-[10px] font-bold text-zinc-400 uppercase">Cargo / Função</Label>
                       <Input 
                         required
                         value={orgNodeForm.role}
                         onChange={e => setOrgNodeForm(prev => ({ ...prev, role: e.target.value }))}
                         className="bg-black/50 border-transparent text-xs text-white uppercase tracking-tighter"
                       />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-1.5">
                          <Label className="text-[10px] font-bold text-zinc-400 uppercase">Nível Hierárquico</Label>
                          <Select 
                            value={orgNodeForm.level}
                            onValueChange={val => setOrgNodeForm(prev => ({ ...prev, level: val as any }))}
                          >
                             <SelectTrigger className="bg-black/50 border-transparent text-xs uppercase">
                                <SelectValue placeholder="Nível" />
                             </SelectTrigger>
                             <SelectContent className="bg-white dark:bg-zinc-900 border-transparent text-white uppercase text-xs">
                                <SelectItem value="Estratégico">Estratégico</SelectItem>
                                <SelectItem value="Tático">Tático</SelectItem>
                                <SelectItem value="Operacional">Operacional</SelectItem>
                             </SelectContent>
                          </Select>
                       </div>

                       <div className="space-y-1.5">
                          <Label className="text-[10px] font-bold text-zinc-400 uppercase">Área / Setor</Label>
                          <Select 
                            value={orgNodeForm.dept}
                            onValueChange={val => setOrgNodeForm(prev => ({ ...prev, dept: val }))}
                          >
                             <SelectTrigger className="bg-black/50 border-transparent text-xs uppercase">
                                <SelectValue placeholder="Setor" />
                             </SelectTrigger>
                             <SelectContent className="bg-white dark:bg-zinc-900 border-transparent text-white uppercase text-xs">
                                <SelectItem value="Presidência">Presidência</SelectItem>
                                <SelectItem value="Industrial">Industrial (Produção)</SelectItem>
                                <SelectItem value="Comercial">Comercial (Vendas)</SelectItem>
                                <SelectItem value="Design & Engenharia">Design & Engenharia</SelectItem>
                                <SelectItem value="Financeiro">Financeiro</SelectItem>
                                <SelectItem value="Recursos Humanos">Recursos Humanos (RH)</SelectItem>
                             </SelectContent>
                          </Select>
                       </div>
                    </div>

                    {editingNode?.parentId && (
                       <div className="space-y-1.5">
                          <Label className="text-[10px] font-bold text-zinc-400 uppercase">Líder Imediato (No Loop de Segurança)</Label>
                          <Select 
                            value={orgNodeForm.parentId}
                            onValueChange={val => setOrgNodeForm(prev => ({ ...prev, parentId: val }))}
                          >
                             <SelectTrigger className="bg-black/50 border-transparent text-xs uppercase">
                                <SelectValue placeholder="Líder" />
                             </SelectTrigger>
                             <SelectContent className="bg-white dark:bg-zinc-900 border-transparent text-white uppercase text-xs">
                                {orgNodes
                                  .filter(n => n.id !== editingNode?.id && !getOrgDescendants(editingNode?.id || '', orgNodes).includes(n.id))
                                  .map(n => (
                                    <SelectItem key={n.id} value={n.id}>
                                       {n.name} ({n.role} • {n.dept})
                                    </SelectItem>
                                )) || <SelectItem value="">Sem Líder Compatível</SelectItem>}
                             </SelectContent>
                          </Select>
                       </div>
                    )}

                    <DialogFooter className="pt-4 border-t border-transparent flex gap-2">
                       <Button 
                         type="button" 
                         variant="ghost" 
                         onClick={() => {
                           setIsEditingNode(false);
                           setEditingNode(null);
                         }}
                         className="text-[10px] font-black uppercase text-zinc-500"
                       >
                          Cancelar
                       </Button>
                       <Button 
                         type="submit" 
                         className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase px-6"
                       >
                          Aplicar Alterações
                       </Button>
                    </DialogFooter>
                 </form>
              </DialogContent>
           </Dialog>
        </TabsContent>
   </Tabs>

      {/* Global Status Footer */}
      <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-transparent gap-4">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.02] border-none flex items-center justify-center text-blue-500">
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

// Subcomponents for the organograma (TreeNode and OrgMesh3D)

interface TreeNodeProps {
  node: OrgNode;
  nodes: OrgNode[];
  onEdit: (node: OrgNode) => void;
  onDelete: (id: string) => void;
  onAddSub: (node: OrgNode) => void;
}

function TreeNode({ node, nodes, onEdit, onDelete, onAddSub }: TreeNodeProps) {
  const children = nodes.filter(c => c.parentId === node.id);

  const levelTag = {
    'Estratégico': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    'Tático': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Operacional': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  };

  const levelBorder = {
    'Estratégico': 'border-rose-500/30 hover:border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.02)]',
    'Tático': 'border-amber-500/30 hover:border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.02)]',
    'Operacional': 'border-emerald-500/30 hover:border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.02)]',
  };

  return (
    <div className="flex flex-col items-center">
      {/* Node card and actions wrapper */}
      <div className={cn(
        "w-52 p-4 bg-white dark:bg-zinc-900 border rounded-2xl text-center group relative backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:bg-black/60",
        levelBorder[node.level]
      )}>
        <p className="text-[7.5px] font-black text-zinc-500 uppercase tracking-[0.2em]">{node.dept}</p>
        <h4 className="text-[12px] font-black text-white uppercase italic tracking-tight truncate mt-1">{node.name}</h4>
        <p className="text-[10px] text-zinc-400 font-bold truncate tracking-tight">{node.role}</p>
        
        <div className="mt-2.5 flex items-center justify-center gap-1">
          <Badge variant="outline" className={cn("text-[7px] font-black px-1.5 h-4 uppercase tracking-widest", levelTag[node.level])}>
            {node.level}
          </Badge>
        </div>

        {/* Hover overlay menu with actions */}
        <div className="absolute inset-0 bg-white dark:bg-zinc-900/95 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-center items-center gap-1 px-3 z-30">
          <p className="text-[8px] font-mono text-zinc-500 uppercase truncate max-w-full italic mb-0.5">{node.name}</p>
          <div className="flex gap-1 w-full justify-center">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-6 text-[8px] font-black uppercase text-blue-400 border-blue-500/20 hover:bg-blue-500/10 flex-1"
              onClick={() => onAddSub(node)}
            >
              + Sub
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white"
              onClick={() => onEdit(node)}
            >
              <Edit size={10} />
            </Button>
            {node.parentId && (
              <Button 
                variant="outline"
                size="icon" 
                className="h-6 w-6 border-rose-500/20 hover:border-rose-500 text-rose-500 hover:bg-rose-500/10"
                onClick={() => onDelete(node.id)}
              >
                <Trash2 size={10} />
              </Button>
            )}
          </div>
        </div>
      </div>

      {children.length > 0 && (
        <div className="h-8 w-[1px] bg-white/10" />
      )}

      {children.length > 0 && (
        <div className="flex gap-4 relative pt-4">
          {children.length > 1 && (
            <div className="absolute top-0 left-[104px] right-[104px] h-[1px] bg-white/10" />
          )}

          {children.map(child => (
            <div key={child.id} className="relative flex flex-col items-center">
              <div className="absolute -top-4 w-[1px] h-4 bg-white/10" />
              <TreeNode 
                node={child} 
                nodes={nodes} 
                onEdit={onEdit} 
                onDelete={onDelete} 
                onAddSub={onAddSub} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface OrgMesh3DProps {
  nodes: OrgNode[];
  onSelectNode: (node: OrgNode) => void;
}

function OrgMesh3D({ nodes, onSelectNode }: OrgMesh3DProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotationX = useRef<number>(0.3); // rotate down slightly
  const rotationY = useRef<number>(0.5); // rotate right slightly
  const isDragging = useRef<boolean>(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.clientWidth || 600;
    let height = canvas.clientHeight || 500;
    canvas.width = width;
    canvas.height = height;

    // Maintain dimensions via ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      if (canvas) {
        width = canvas.clientWidth || 600;
        height = canvas.clientHeight || 500;
        canvas.width = width;
        canvas.height = height;
      }
    });
    resizeObserver.observe(canvas);

    // Filter by levels to lay them out in 3D rings/planes
    const stratNodes = nodes.filter(n => n.level === 'Estratégico');
    const tactNodes = nodes.filter(n => n.level === 'Tático');
    const operNodes = nodes.filter(n => n.level === 'Operacional');

    // Setup coordinates in local space
    const points3D = nodes.map(node => {
      let x = 0;
      let y = 0;
      let z = 0;

      if (node.level === 'Estratégico') {
        const idx = stratNodes.indexOf(node);
        const total = stratNodes.length;
        const radius = 90;
        const angle = total > 1 ? (idx / total) * Math.PI * 2 : 0;
        x = Math.cos(angle) * radius;
        y = -100;
        z = Math.sin(angle) * radius;
      } else if (node.level === 'Tático') {
        const idx = tactNodes.indexOf(node);
        const total = tactNodes.length;
        const radius = 140;
        const angle = total > 1 ? (idx / total) * Math.PI * 2 : 0;
        x = Math.cos(angle) * radius;
        y = 10;
        z = Math.sin(angle) * radius;
      } else {
        const idx = operNodes.indexOf(node);
        const total = operNodes.length;
        const radius = 190;
        const angle = total > 1 ? (idx / total) * Math.PI * 2 : 0;
        x = Math.cos(angle) * radius;
        y = 120;
        z = Math.sin(angle) * radius;
      }

      return {
        node,
        x,
        y,
        z,
        projected: { u: 0, v: 0, scale: 1, zDepth: 0 }
      };
    });

    const draw = () => {
      // Background gradient
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      // Subtle network cyber mesh grid background
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.02)';
      ctx.lineWidth = 1;
      const step = 45;
      for (let j = 0; j < width; j += step) {
        ctx.beginPath();
        ctx.moveTo(j, 0);
        ctx.lineTo(j, height);
        ctx.stroke();
      }
      for (let k = 0; k < height; k += step) {
        ctx.beginPath();
        ctx.moveTo(0, k);
        ctx.lineTo(width, k);
        ctx.stroke();
      }

      const rx = rotationX.current;
      const ry = rotationY.current;
      const centerX = width / 2;
      const centerY = height / 2;
      const cameraDistance = 450;

      // Project each coordinate in 3D perspective
      points3D.forEach(p => {
        // Yaw (rotate Y)
        const cosY = Math.cos(ry);
        const sinY = Math.sin(ry);
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;

        // Pitch (rotate X)
        const cosX = Math.cos(rx);
        const sinX = Math.sin(rx);
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        // Apply scale based on depth distance
        const scale = cameraDistance / (cameraDistance + z2);

        p.projected.u = centerX + x1 * scale * 1.5;
        p.projected.v = centerY + y2 * scale * 1.25;
        p.projected.scale = scale;
        p.projected.zDepth = z2;
      });

      // Draw Connection Links (sorted by depth for standard occlusion)
      points3D.forEach(child => {
        if (!child.node.parentId) return;
        const parent = points3D.find(p => p.node.id === child.node.parentId);
        if (!parent) return;

        const avgDepth = (child.projected.zDepth + parent.projected.zDepth) / 2;
        const depthOpacity = Math.max(0.04, Math.min(0.35, 1 - (avgDepth + 200) / 400));

        // Draw connecting laser line
        ctx.beginPath();
        ctx.moveTo(parent.projected.u, parent.projected.v);
        ctx.lineTo(child.projected.u, child.projected.v);

        // Customize color by subordinate level
        if (child.node.level === 'Estratégico') {
          ctx.strokeStyle = `rgba(244, 63, 94, ${depthOpacity * 0.8})`;
        } else if (child.node.level === 'Tático') {
          ctx.strokeStyle = `rgba(245, 158, 11, ${depthOpacity * 0.8})`;
        } else {
          ctx.strokeStyle = `rgba(16, 185, 129, ${depthOpacity * 0.8})`;
        }

        ctx.lineWidth = Math.max(1, 1.8 * ((child.projected.scale + parent.projected.scale) / 2));
        ctx.stroke();
      });

      // Sort points from back to front (Painter's algorithm)
      const sortedPoints = [...points3D].sort((a, b) => b.projected.zDepth - a.projected.zDepth);

      sortedPoints.forEach(p => {
        const { u, v, scale, zDepth } = p.projected;
        const size = Math.max(5, 13 * scale);

        // Set palette colors as RGB values
        let colorRGB = '59, 130, 246'; // blue default
        if (p.node.level === 'Estratégico') colorRGB = '244, 63, 94'; // rose
        else if (p.node.level === 'Tático') colorRGB = '245, 158, 11'; // amber
        else if (p.node.level === 'Operacional') colorRGB = '16, 185, 129'; // emerald

        // Adjust opacity factor by distance
        const opacity = Math.max(0.2, Math.min(1, 1 - (zDepth / 250)));

        // Glow ring blur shadow
        ctx.shadowBlur = 15 * scale;
        ctx.shadowColor = `rgba(${colorRGB}, ${0.5 * opacity})`;

        // Glow circle outer bloom
        ctx.beginPath();
        const radGrad = ctx.createRadialGradient(u, v, size * 0.1, u, v, size);
        radGrad.addColorStop(0, `rgba(${colorRGB}, ${1.0 * opacity})`);
        radGrad.addColorStop(0.3, `rgba(${colorRGB}, ${0.5 * opacity})`);
        radGrad.addColorStop(1, `rgba(${colorRGB}, 0)`);
        ctx.fillStyle = radGrad;
        ctx.arc(u, v, size, 0, Math.PI * 2);
        ctx.fill();

        // Solid core
        ctx.shadowBlur = 0; // turn off shadow for typography / border lines
        ctx.beginPath();
        ctx.fillStyle = '#06060c';
        ctx.arc(u, v, size * 0.35, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(${colorRGB}, ${0.9 * opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Write Name & Role directly on Canvas under node if depth is close enough
        if (scale > 0.45) {
          ctx.font = `bold ${Math.max(8, Math.round(9.5 * scale))}px "Inter", sans-serif`;
          ctx.textAlign = 'center';
          
          // Draw dark backplate for legible contrast
          const textName = p.node.name.toUpperCase();
          const textRole = p.node.role.toUpperCase();
          const textWidth = Math.max(ctx.measureText(textName).width, ctx.measureText(textRole).width) + 8;
          ctx.fillStyle = `rgba(5, 5, 8, ${opacity * 0.85})`;
          ctx.fillRect(u - textWidth / 2, v - size - 17, textWidth, 18);

          // Render Text details
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fillText(textName, u, v - size - 9);

          ctx.fillStyle = `rgba(161, 161, 170, ${opacity * 0.7})`;
          ctx.font = `${Math.max(7, Math.round(7.5 * scale))}px "JetBrains Mono", monospace`;
          ctx.fillText(textRole, u, v - size - 2);
        }
      });

      // Simple rotation drift if not user dragging
      if (!isDragging.current) {
        rotationY.current += 0.0015;
      }

      animationFrameId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      resizeObserver.disconnect();
    };
  }, [nodes]);

  // Handle mesh node selections
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const width = canvas.width;
    const height = canvas.height;
    const rx = rotationX.current;
    const ry = rotationY.current;
    const centerX = width / 2;
    const centerY = height / 2;
    const cameraDistance = 450;

    const stratNodes = nodes.filter(n => n.level === 'Estratégico');
    const tactNodes = nodes.filter(n => n.level === 'Tático');
    const operNodes = nodes.filter(n => n.level === 'Operacional');

    let closestNode: OrgNode | null = null;
    let minDistance = 25; // click sensitivity in pixels

    nodes.forEach(node => {
      let x = 0; let y = 0; let z = 0;
      if (node.level === 'Estratégico') {
        const idx = stratNodes.indexOf(node); const total = stratNodes.length; const radius = 90;
        const angle = total > 1 ? (idx / total) * Math.PI * 2 : 0;
        x = Math.cos(angle) * radius; y = -100; z = Math.sin(angle) * radius;
      } else if (node.level === 'Tático') {
        const idx = tactNodes.indexOf(node); const total = tactNodes.length; const radius = 140;
        const angle = total > 1 ? (idx / total) * Math.PI * 2 : 0;
        x = Math.cos(angle) * radius; y = 10; z = Math.sin(angle) * radius;
      } else {
        const idx = operNodes.indexOf(node); const total = operNodes.length; const radius = 190;
        const angle = total > 1 ? (idx / total) * Math.PI * 2 : 0;
        x = Math.cos(angle) * radius; y = 120; z = Math.sin(angle) * radius;
      }

      const cosY = Math.cos(ry); const sinY = Math.sin(ry);
      const x1 = x * cosY - z * sinY; const z1 = x * sinY + z * cosY;
      const cosX = Math.cos(rx); const sinX = Math.sin(rx);
      const y2 = y * cosX - z1 * sinX; const z2 = y * sinX + z1 * cosX;
      const scale = cameraDistance / (cameraDistance + z2);

      const u = centerX + x1 * scale * 1.5;
      const v = centerY + y2 * scale * 1.25;

      const dist = Math.hypot(clickX - u, clickY - v);
      if (dist < minDistance) {
        minDistance = dist;
        closestNode = node;
      }
    });

    if (closestNode) {
      onSelectNode(closestNode);
    }
  };

  const startDrag = (clientX: number, clientY: number) => {
    isDragging.current = true;
    previousMousePosition.current = { x: clientX, y: clientY };
  };

  const onDrag = (clientX: number, clientY: number) => {
    if (!isDragging.current) return;
    const deltaX = clientX - previousMousePosition.current.x;
    const deltaY = clientY - previousMousePosition.current.y;

    rotationY.current += deltaX * 0.0065;
    // Keep pitch rotation in a safe range to not invert upside down
    rotationX.current = Math.max(-1.1, Math.min(1.1, rotationX.current + deltaY * 0.0065));

    previousMousePosition.current = { x: clientX, y: clientY };
  };

  const stopDrag = () => {
    isDragging.current = false;
  };

  return (
    <div className="w-full h-full min-h-[580px] flex-1 relative select-none overflow-hidden rounded-2xl">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onMouseDown={e => startDrag(e.clientX, e.clientY)}
        onMouseMove={e => onDrag(e.clientX, e.clientY)}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onTouchStart={e => {
          if (e.touches[0]) startDrag(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchMove={e => {
          if (e.touches[0]) onDrag(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchEnd={stopDrag}
        className="w-full h-full min-h-[580px] bg-white dark:bg-zinc-900 border border-blue-500/10 cursor-grab active:cursor-grabbing block"
      />
    </div>
  );
}
