import * as React from 'react';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  LayoutGrid, 
  List, 
  Target, 
  Shield, 
  Flame, 
  Info, 
  MoreVertical, 
  Plus, 
  Search, 
  Filter, 
  Calendar as CalendarIcon, 
  GanttChart, 
  Trello, 
  Table as TableIcon,
  Clock,
  ChevronDown,
  ChevronRight,
  User,
  Building2,
  DollarSign,
  Link as LinkIcon,
  AlertCircle,
  CheckCircle2,
  Timer,
  ArrowRight,
  Maximize2,
  Layers,
  Boxes,
  Zap,
  Package,
  Box,
  Edit,
  Sparkles,
  Undo2,
  RefreshCw,
  RotateCcw,
  Trash2,
  Check,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  format, 
  addDays, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isToday 
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
  useDroppable,
  useDraggable,
} from '@dnd-kit/core';

// Types
type ProjectStatus = string;

interface ProjectProduct {
  id: string;
  name: string;
  category: string;
  quantity: number;
  material: string;
  dimensions: { width: number; height: number };
  technicalStatus: 'Pendente' | 'Em Execução' | 'Finalizado';
}

interface Project {
  id: string;
  title: string;
  client: string;
  unit: string;
  status: ProjectStatus;
  priority: 1 | 2 | 3 | 4 | 5;
  difficulty: 1 | 2 | 3 | 4 | 5;
  commercialResponsible: string;
  designerResponsible: string;
  deadline: string;
  value: number;
  isUrgent: boolean;
  color: string;
  products: ProjectProduct[];
  progress: number;
  startDate: string;
  lastUpdate: string;
  sector: string;
  alertType?: 'novo_projeto' | 'retorno_vendas' | 'alteracao' | 'retrabalho' | null;
  alertMessage?: string;
  alertDate?: string;
}

// Mock Data
const PROJECTS_DATA: Project[] = [
  {
    id: '3319',
    title: 'Fachada Lojas Renner - Shopping Ibirapuera',
    client: 'Lojas Renner S.A.',
    unit: 'Loja 450',
    status: 'Aprovação Cliente',
    priority: 5,
    difficulty: 4,
    commercialResponsible: 'Adams Leandro',
    designerResponsible: 'Julia Costa',
    deadline: '2026-05-15',
    value: 45000,
    isUrgent: true,
    color: '#8b5cf6',
    progress: 45,
    startDate: '2026-05-01',
    lastUpdate: '2026-05-09 10:15',
    sector: 'Design',
    alertType: 'retorno_vendas',
    alertMessage: 'Vendas precisa validar material em Inox recomendado.',
    alertDate: '2026-05-21 15:30',
    products: [
      { id: 'p1', name: 'Letra Caixa Iluminada', category: 'Letra Caixa', quantity: 1, material: 'Aço Inox', dimensions: { width: 450, height: 120 }, technicalStatus: 'Em Execução' },
      { id: 'p2', name: 'Painel ACM Frontal', category: 'ACM', quantity: 4, material: 'ACM 3mm', dimensions: { width: 300, height: 400 }, technicalStatus: 'Pendente' },
    ]
  },
  {
    id: '3320',
    title: 'Sinalização Interna - Hospital Israelita',
    client: 'Hospital Albert Einstein',
    unit: 'Unidade Morumbi',
    status: 'PCP',
    priority: 4,
    difficulty: 3,
    commercialResponsible: 'Carlos Silva',
    designerResponsible: 'Ana Mendes',
    deadline: '2026-05-20',
    value: 125000,
    isUrgent: false,
    color: '#3b82f6',
    progress: 30,
    startDate: '2026-05-03',
    lastUpdate: '2026-05-08 16:40',
    sector: 'Planejamento',
    alertType: 'novo_projeto',
    alertMessage: 'Novo projeto provisionado automaticamente a partir do CRM.',
    alertDate: '2026-05-22 08:00',
    products: [
      { id: 'p3', name: 'Totens de Wayfinding', category: 'Totem', quantity: 15, material: 'Alumínio', dimensions: { width: 60, height: 180 }, technicalStatus: 'Pendente' },
    ]
  },
  {
    id: '3321',
    title: 'Rebranding Postos Shell - Região Sul',
    client: 'Shell Brasil',
    unit: 'Vários Postos',
    status: 'Produção',
    priority: 5,
    difficulty: 5,
    commercialResponsible: 'Marcos Rezende',
    designerResponsible: 'Pedro Santos',
    deadline: '2026-06-10',
    value: 580000,
    isUrgent: false,
    color: '#ef4444',
    progress: 15,
    startDate: '2026-04-25',
    lastUpdate: '2026-05-09 08:30',
    sector: 'Fábrica',
    alertType: 'alteracao',
    alertMessage: 'Solicitação de alteração das dimensões da testeira pelo cliente.',
    alertDate: '2026-05-20 11:15',
    products: [
      { id: 'p4', name: 'Testeira de Posto', category: 'Estrutura', quantity: 8, material: 'Metalon/Lona', dimensions: { width: 1200, height: 150 }, technicalStatus: 'Em Execução' },
    ]
  },
  {
    id: '3322',
    title: 'Adesivação Frota Loggi',
    client: 'Loggi Tecnologia',
    unit: 'CD Cajamar',
    status: 'Briefing',
    priority: 3,
    difficulty: 2,
    commercialResponsible: 'Adams Leandro',
    designerResponsible: 'Ana Mendes',
    deadline: '2026-05-12',
    value: 12000,
    isUrgent: true,
    color: '#f59e0b',
    progress: 10,
    startDate: '2026-05-07',
    lastUpdate: '2026-05-09 09:00',
    sector: 'Atendimento',
    alertType: 'retrabalho',
    alertMessage: 'Erro de grafia na impressão. Re-processar do briefing de criação.',
    alertDate: '2026-05-22 09:45',
    products: []
  }
];

const INITIAL_COLUMNS: ProjectStatus[] = [
  'Entrada', 'Briefing', 'Criação', 'Aprovação Cliente', 'PCP', 'Produção', 'Qualidade', 'Expedição', 'Instalação', 'Concluído'
];

export function Projects() {
  const [viewMode, setViewMode] = useState<'kanban' | 'list' | 'calendar' | 'gantt' | 'timeline' | 'table' | 'dashboard'>('kanban');
  const [projects, setProjects] = useState<Project[]>(PROJECTS_DATA);
  const [columns, setColumns] = useState<string[]>(INITIAL_COLUMNS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [alertFilter, setAlertFilter] = useState<'all' | 'novo_projeto' | 'retorno_vendas' | 'alteracao' | 'retrabalho'>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleAddColumn = (colName: string) => {
    if (!colName.trim()) return;
    if (columns.includes(colName)) return;
    setColumns(prev => [...prev, colName]);
  };

  const handleRenameColumn = (oldName: string, newName: string) => {
    if (!newName.trim() || oldName === newName) return;
    setColumns(prev => prev.map(c => c === oldName ? newName : c));
    setProjects(prev => prev.map(p => p.status === oldName ? {
      ...p,
      status: newName,
      lastUpdate: format(new Date(), 'yyyy-MM-dd HH:mm')
    } : p));
  };

  const handleDeleteColumn = (colName: string) => {
    const remaining = columns.filter(c => c !== colName);
    setColumns(remaining);
    const fallbackStatus = remaining[0] || 'Entrada';
    setProjects(prev => prev.map(p => p.status === colName ? {
      ...p,
      status: fallbackStatus,
      lastUpdate: format(new Date(), 'yyyy-MM-dd HH:mm')
    } : p));
  };

  // New project creation state placeholders
  const [newTitle, setNewTitle] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newValue, setNewValue] = useState(25000);
  const [newDesigner, setNewDesigner] = useState('Julia Costa');

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.id.includes(searchQuery);
      const matchesAlert = alertFilter === 'all' || p.alertType === alertFilter;
      return matchesSearch && matchesAlert;
    });
  }, [projects, searchQuery, alertFilter]);
  const handleUpdateProject = (updatedProj: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProj.id ? updatedProj : p));
    if (selectedProject?.id === updatedProj.id) {
      setSelectedProject(updatedProj);
    }
  };

  const handleUpdateStatus = (projectId: string, newStatus: ProjectStatus) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          status: newStatus,
          lastUpdate: format(new Date(), 'yyyy-MM-dd HH:mm')
        };
      }
      return p;
    }));
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newClient) return;

    const nextId = String(Math.floor(Math.random() * 1000) + 3400);
    const newProj: Project = {
      id: nextId,
      title: newTitle,
      client: newClient,
      unit: 'Unidade Geral',
      status: 'Entrada',
      priority: 3,
      difficulty: 3,
      commercialResponsible: 'Adams Leandro',
      designerResponsible: newDesigner,
      deadline: '2026-05-30',
      value: newValue,
      isUrgent: false,
      color: '#10b981',
      progress: 0,
      startDate: '2026-05-22',
      lastUpdate: '2026-05-22 10:00',
      sector: 'Design',
      alertType: 'novo_projeto',
      alertMessage: 'Novo projeto provisionado para criação e briefing pelo designer.',
      alertDate: '2026-05-22 10:00',
      products: []
    };

    setProjects(prev => [newProj, ...prev]);
    setIsCreateOpen(false);
    setAlertFilter('novo_projeto'); // Auto focus on new projects to show alert triggers immediately!
    setNewTitle('');
    setNewClient('');
  };

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-700 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-[#050505] to-[#050505] text-left">
      {/* Header & View Selector */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 zinc-900 p-6 border-none rounded-2xl">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-zinc-500 mb-2 uppercase">
            <Trello size={14} className="text-blue-500" /> Operação de Projetos [OP-PROJ]
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white uppercase italic flex items-center gap-3">
             Gestão Multi-Modo <Badge className="bg-blue-600/10 text-blue-500 border-blue-500/20 text-[10px] font-black italic">MESH-IA</Badge>
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
           {/* View Selector Professional Style */}
           <div className="bg-white dark:bg-zinc-900 border-none p-1 rounded-xl flex items-center gap-1">
              {[
                { id: 'kanban', icon: <Trello size={14} />, label: 'Kanban' },
                { id: 'list', icon: <List size={14} />, label: 'Lista' },
                { id: 'calendar', icon: <CalendarIcon size={14} />, label: 'Agenda' },
                { id: 'gantt', icon: <GanttChart size={14} />, label: 'Gantt' },
                { id: 'timeline', icon: <Clock size={14} />, label: 'Timeline' },
                { id: 'table', icon: <TableIcon size={14} />, label: 'Tabela' },
                { id: 'dashboard', icon: <BarChart3 size={14} />, label: 'Dashboard' },
              ].map((view) => (
                <button
                  key={view.id}
                  onClick={() => setViewMode(view.id as any)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                    viewMode === view.id 
                      ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
                      : "text-zinc-500 hover:text-white hover:bg-white/5"
                  )}
                >
                  {view.icon}
                  <span className="hidden lg:inline">{view.label}</span>
                </button>
              ))}
           </div>

           <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                <Input 
                  className="pl-10 h-10 zinc-900 border-transparent text-white placeholder:text-zinc-600 focus-visible:ring-blue-500 transition-all text-xs" 
                  placeholder="Buscar projetos..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="bg-blue-600 text-white hover:bg-blue-700 h-10 font-bold px-4 text-[10px] uppercase tracking-widest shrink-0" onClick={() => setIsCreateOpen(true)}>
                <Plus size={14} className="mr-2" /> Novo Projeto
              </Button>
           </div>
        </div>
      </div>

      {/* Interactive Flow Alerts Banner */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Card 0: Todos */}
        <button 
          onClick={() => setAlertFilter('all')}
          className={cn(
            "p-4 rounded-2xl border text-left transition-all flex flex-col justify-between h-24",
            alertFilter === 'all' 
              ? "bg-white dark:bg-zinc-900 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.1)] text-white" 
              : "bg-white/[0.01] border-transparent text-zinc-400 hover:border-transparent hover:text-white"
          )}
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-[10px] font-black uppercase tracking-widest italic">Todos os Projetos</span>
            <Layers size={14} className={alertFilter === 'all' ? 'text-blue-500' : 'text-zinc-600'} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black italic">{projects.length}</span>
            <span className="text-[10px] font-bold text-zinc-500">PROJETOS</span>
          </div>
        </button>

        {/* Card 1: Novo Projeto */}
        <button 
          onClick={() => setAlertFilter('novo_projeto')}
          className={cn(
            "p-4 rounded-2xl border text-left transition-all flex flex-col justify-between h-24",
            alertFilter === 'novo_projeto' 
              ? "bg-[#10b981]/10 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)] text-white" 
              : "bg-white/[0.01] border-transparent text-zinc-400 hover:border-transparent hover:text-white"
          )}
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-[10px] font-black uppercase tracking-widest italic flex items-center gap-1.5 text-emerald-400">
              <Sparkles size={12} className="text-emerald-500 animate-pulse" /> Novo Projeto
            </span>
            {projects.some(p => p.alertType === 'novo_projeto') && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-500 italic">
              {projects.filter(p => p.alertType === 'novo_projeto').length}
            </span>
            <span className="text-[10px] font-bold text-zinc-500 uppercase">Alertas Ativos</span>
          </div>
        </button>

        {/* Card 2: Retorno para Vendas */}
        <button 
          onClick={() => setAlertFilter('retorno_vendas')}
          className={cn(
            "p-4 rounded-2xl border text-left transition-all flex flex-col justify-between h-24",
            alertFilter === 'retorno_vendas' 
              ? "bg-[#f59e0b]/10 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.1)] text-white" 
              : "bg-white/[0.01] border-transparent text-zinc-400 hover:border-transparent hover:text-white"
          )}
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-[10px] font-black uppercase tracking-widest italic flex items-center gap-1.5 text-amber-500">
              <Undo2 size={12} className="text-amber-500" /> Retorno p/ Vendas
            </span>
            {projects.some(p => p.alertType === 'retorno_vendas') && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-500 italic">
              {projects.filter(p => p.alertType === 'retorno_vendas').length}
            </span>
            <span className="text-[10px] font-bold text-zinc-500 uppercase">Em Validação</span>
          </div>
        </button>

        {/* Card 3: Alteração */}
        <button 
          onClick={() => setAlertFilter('alteracao')}
          className={cn(
            "p-4 rounded-2xl border text-left transition-all flex flex-col justify-between h-24",
            alertFilter === 'alteracao' 
              ? "bg-[#3b82f6]/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.1)] text-white" 
              : "bg-white/[0.01] border-transparent text-zinc-400 hover:border-transparent hover:text-white"
          )}
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-[10px] font-black uppercase tracking-widest italic flex items-center gap-1.5 text-blue-400">
              <RefreshCw size={12} className="text-blue-500 animate-spin" style={{ animationDuration: '8s' }} /> Alteração
            </span>
            {projects.some(p => p.alertType === 'alteracao') && (
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-blue-500 italic">
              {projects.filter(p => p.alertType === 'alteracao').length}
            </span>
            <span className="text-[10px] font-bold text-zinc-500 uppercase">Solicitadas</span>
          </div>
        </button>

        {/* Card 4: Retrabalho */}
        <button 
          onClick={() => setAlertFilter('retrabalho')}
          className={cn(
            "p-4 rounded-2xl border text-left transition-all flex flex-col justify-between h-24",
            alertFilter === 'retrabalho' 
              ? "bg-[#f43f5e]/10 border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.1)] text-white" 
              : "bg-white/[0.01] border-transparent text-zinc-400 hover:border-transparent hover:text-white"
          )}
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-[10px] font-black uppercase tracking-widest italic flex items-center gap-1.5 text-rose-500 animate-pulse">
              <RotateCcw size={12} className="text-rose-500" /> Retrabalho
            </span>
            {projects.some(p => p.alertType === 'retrabalho') && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-rose-500 italic">
              {projects.filter(p => p.alertType === 'retrabalho').length}
            </span>
            <span className="text-[10px] font-bold text-zinc-500 uppercase">Críticos</span>
          </div>
        </button>
      </div>

      {/* Creation Project Modal Simulation drawer overlay */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-zinc-900/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-zinc-900 border-none rounded-2xl p-6 w-full max-w-md shadow-sm space-y-4"
          >
            <div className="flex justify-between items-center">
               <h3 className="text-sm font-black text-white uppercase italic tracking-widest flex items-center gap-2">
                 <Sparkles size={16} className="text-emerald-500" /> Novo Projeto [OP-PROJ]
               </h3>
               <button onClick={() => setIsCreateOpen(false)} className="text-zinc-500 hover:text-white text-xs">Fechar</button>
            </div>
            <form onSubmit={handleCreateProject} className="space-y-4">
               <div className="space-y-1">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">Título do Projeto</label>
                  <Input 
                     className="bg-white dark:bg-zinc-900 border-transparent text-white placeholder:text-zinc-700 h-10 text-xs" 
                     placeholder="Ex: Fachada LED Posto Executivo" 
                     value={newTitle} 
                     onChange={(e) => setNewTitle(e.target.value)} 
                     required
                  />
               </div>
               <div className="space-y-1">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">Nome do Cliente</label>
                  <Input 
                     className="bg-white dark:bg-zinc-900 border-transparent text-white placeholder:text-zinc-700 h-10 text-xs" 
                     placeholder="Ex: Petrobras S.A." 
                     value={newClient} 
                     onChange={(e) => setNewClient(e.target.value)} 
                     required
                  />
               </div>
               <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">Valor total (R$)</label>
                     <Input 
                        type="number"
                        className="bg-white dark:bg-zinc-900 border-transparent text-white h-10 text-xs" 
                        value={newValue} 
                        onChange={(e) => setNewValue(Number(e.target.value))} 
                     />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">Designer</label>
                     <select 
                        className="w-full rounded-md bg-white dark:bg-zinc-900 border-none text-white h-10 px-3 text-xs focus:ring-1 focus:ring-blue-500 outline-none" 
                        value={newDesigner} 
                        onChange={(e) => setNewDesigner(e.target.value)}
                     >
                        <option value="Julia Costa">Julia Costa</option>
                        <option value="Ana Mendes">Ana Mendes</option>
                        <option value="Pedro Santos">Pedro Santos</option>
                     </select>
                  </div>
               </div>
               <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-xs tracking-widest h-11 mt-2">
                  Provisionar Novo Projeto (Alerta de Criação)
               </Button>
            </form>
          </motion.div>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
           key={viewMode}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -10 }}
           transition={{ duration: 0.3 }}
           className="min-h-[600px]"
        >
          {viewMode === 'kanban' && (
            <KanbanView 
              projects={filteredProjects} 
              onSelect={setSelectedProject} 
              onUpdateStatus={handleUpdateStatus}
              columns={columns}
              onAddColumn={handleAddColumn}
              onRenameColumn={handleRenameColumn}
              onDeleteColumn={handleDeleteColumn}
            />
          )}
          {viewMode === 'list' && <ListView projects={filteredProjects} onSelect={setSelectedProject} />}
          {viewMode === 'calendar' && <CalendarView projects={filteredProjects} onSelect={setSelectedProject} />}
          {viewMode === 'gantt' && <GanttView projects={filteredProjects} onSelect={setSelectedProject} />}
          {viewMode === 'timeline' && <TimelineView projects={filteredProjects} onSelect={setSelectedProject} />}
          {viewMode === 'table' && <TableView projects={filteredProjects} onSelect={setSelectedProject} />}
          {viewMode === 'dashboard' && <ProjectsDashboard projects={filteredProjects} columns={columns} />}
        </motion.div>
      </AnimatePresence>

      {/* Project Detail Modal Placeholder */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
             <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} onUpdateProject={handleUpdateProject} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-components for Views

function KanbanView({ 
  projects, 
  onSelect,
  onUpdateStatus,
  columns,
  onAddColumn,
  onRenameColumn,
  onDeleteColumn,
}: { 
  projects: Project[], 
  onSelect: (p: Project) => void,
  onUpdateStatus?: (projectId: string, newStatus: ProjectStatus) => void,
  columns: string[],
  onAddColumn: (colName: string) => void,
  onRenameColumn: (oldName: string, newName: string) => void,
  onDeleteColumn: (colName: string) => void,
}) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const proj = projects.find((p) => p.id === active.id);
    if (proj) setActiveProject(proj);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && onUpdateStatus) {
      const colId = over.id as string;
      if (columns.includes(colId)) {
        onUpdateStatus(active.id as string, colId);
      }
    }
    setActiveProject(null);
  };

  const dropAnimationConfig = {
    duration: 350,
    easing: 'cubic-bezier(0.18, 0.89, 0.32, 1.28)',
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.4',
        },
      },
    }),
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div id="projects-kanban-board" className="flex gap-4 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide snap-x items-start">
        {columns.map((col) => {
          const colProjects = projects.filter((p) => p.status === col);
          return (
            <DroppableColumn 
              key={col} 
              col={col} 
              projects={colProjects} 
              onSelect={onSelect}
              onRename={(newName) => onRenameColumn(col, newName)}
              onDelete={() => onDeleteColumn(col)}
            >
              {colProjects.map((p) => (
                <DraggableProjectCard key={p.id} project={p} onClick={() => onSelect(p)} />
              ))}
            </DroppableColumn>
          );
        })}

        <AddColumnButton onAdd={onAddColumn} />
      </div>

      <DragOverlay dropAnimation={dropAnimationConfig}>
        {activeProject ? (
          <div className="w-[300px] pointer-events-none origin-center rotate-3 scale-105 shadow-sm">
            <ProjectCard project={activeProject} onClick={() => {}} isDraggingOverlay />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function AddColumnButton({ onAdd }: { onAdd: (name: string) => void }) {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (name.trim()) {
      onAdd(name.trim());
      setName('');
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsAdding(false);
      setName('');
    }
  };

  if (isAdding) {
    return (
      <div className="min-w-[300px] w-[300px] zinc-900/40 border-none rounded-2xl p-4 flex flex-col gap-3 shrink-0">
        <h4 className="text-[10px] font-black tracking-widest uppercase text-zinc-400 italic">Nova Coluna</h4>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input
            placeholder="Nome da coluna..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-9 text-xs bg-black border-transparent text-white placeholder:text-zinc-600 focus:border-blue-500/50"
            autoFocus
          />
          <div className="flex gap-2 justify-end">
            <Button 
              type="button" 
              variant="ghost" 
              className="h-8 text-[10px] font-black tracking-wider uppercase text-zinc-500 hover:text-zinc-300" 
              onClick={() => { setIsAdding(false); setName(''); }}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="h-8 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black tracking-wider uppercase px-4"
            >
              Confirmar
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      onClick={() => setIsAdding(true)}
      className="min-w-[300px] w-[300px] h-32 border-2 border-dashed border-transparent hover:border-transparent hover:bg-white/[0.01] rounded-2xl flex flex-col items-center justify-center gap-2 group/add-col text-zinc-500 hover:text-blue-400 transition-all duration-300 shrink-0"
    >
      <Plus size={20} className="group-hover/add-col:scale-125 transition-transform" />
      <span className="text-[10px] font-black tracking-widest uppercase">Adicionar Coluna</span>
    </Button>
  );
}

function DroppableColumn({ 
  col, 
  projects, 
  onSelect, 
  children,
  onRename,
  onDelete
}: { 
  col: string, 
  projects: Project[], 
  onSelect: (p: Project) => void,
  children: React.ReactNode,
  onRename: (newName: string) => void,
  onDelete: () => void,
  key?: React.Key
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: col,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(col);

  const handleSave = () => {
    if (editValue.trim() && editValue !== col) {
      onRename(editValue.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditValue(col);
      setIsEditing(false);
    }
  };

  return (
    <motion.div 
      ref={setNodeRef}
      layout
      className={cn(
        "min-w-[300px] w-[300px] flex flex-col gap-3 snap-center group/col rounded-2xl p-2 transition-all duration-300",
        isOver ? "bg-zinc-900/30 ring-1 ring-blue-500/20" : "bg-transparent"
      )}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      <div className="flex items-center justify-between px-2 mb-2 group">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className={cn(
            "w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-300 flex-shrink-0",
            isOver ? "scale-150 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" : "group-hover/col:scale-125"
          )} />
          
          {isEditing ? (
            <div className="flex items-center gap-1 flex-1 min-w-0">
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-7 text-xs bg-black border-transparent text-white py-0 px-2 flex-1 focus-visible:ring-1 focus-visible:ring-blue-500"
                autoFocus
              />
              <Button size="icon" variant="ghost" className="h-7 w-7 text-emerald-400 hover:text-emerald-300 hover:bg-white/5" onClick={handleSave}>
                <Check size={12} />
              </Button>
              <Button size="icon" variant="ghost" className="h-7 w-7 text-zinc-500 hover:text-zinc-400 hover:bg-white/5" onClick={() => { setEditValue(col); setIsEditing(false); }}>
                <X size={12} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 flex-1 min-w-0 overflow-hidden cursor-pointer" onClick={() => setIsEditing(true)}>
              <h3 className={cn(
                "text-[11px] font-black tracking-[0.2em] uppercase italic transition-colors truncate",
                isOver ? "text-emerald-400" : "text-zinc-300 group-hover/col:text-blue-400"
              )}>
                {col}
              </h3>
              <Edit size={10} className="opacity-0 group-hover/col:opacity-40 hover:!opacity-100 transition-opacity text-zinc-400 flex-shrink-0" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 opacity-100">
          <Badge variant="outline" className="bg-white/5 border-0 text-[10px] text-zinc-500 font-bold px-2">{projects.length}</Badge>
          {!isEditing && (
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-6 w-6 opacity-0 group-hover/col:opacity-100 text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all rounded"
              onClick={(e) => {
                e.stopPropagation();
                if (confirm(`Tem certeza que deseja excluir a coluna "${col}"? Os cartões serão movidos para as colunas restantes.`)) {
                  onDelete();
                }
              }}
            >
              <Trash2 size={11} />
            </Button>
          )}
        </div>
      </div>

      <div className={cn(
        "flex flex-col gap-3 overflow-y-auto max-h-[70vh] p-2 bg-white/[0.01] border-none rounded-2xl transition-all duration-300 ease-out",
        isOver ? "bg-white/[0.03] border-blue-500/30" : "group-hover/col:bg-white/[0.02] group-hover/col:border-transparent"
      )}>
        {children}
        <Button variant="ghost" className="w-full h-12 border-2 border-dashed border-transparent hover:border-transparent text-zinc-600 hover:text-white text-[10px] font-black tracking-widest uppercase mt-1">
           <Plus size={14} className="mr-2" /> Novo Item
        </Button>
      </div>
    </motion.div>
  );
}

function DraggableProjectCard({ 
  project, 
  onClick 
}: { 
  project: Project, 
  onClick: () => void,
  key?: React.Key
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: project.id,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-none select-none">
      <ProjectCard project={project} onClick={onClick} isDragging={isDragging} />
    </div>
  );
}

function ProjectCard({ 
  project, 
  onClick,
  isDragging,
  isDraggingOverlay
}: { 
  project: Project, 
  onClick: () => void,
  isDragging?: boolean,
  isDraggingOverlay?: boolean
}) {
  return (
    <motion.div
      layout={!isDraggingOverlay}
      layoutId={isDraggingOverlay ? undefined : project.id}
      whileHover={isDraggingOverlay ? {} : { 
        y: -6, 
        scale: 1.025,
        borderColor: "rgba(59, 130, 246, 0.3)",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 0 15px rgba(59, 130, 246, 0.15)"
      }}
      whileTap={isDraggingOverlay ? {} : { scale: 0.98, y: -2 }}
      onClick={isDraggingOverlay ? undefined : onClick}
      className={cn(
        "bg-white dark:bg-zinc-900 border rounded-2xl p-5 shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between",
        isDraggingOverlay 
          ? "border-blue-500 bg-white dark:bg-zinc-900 scale-105 shadow-[0_0_25px_rgba(59,130,246,0.25)] select-none cursor-grabbing" 
          : "border-transparent cursor-pointer group hover:border-transparent"
      )}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        layout: { type: "spring", stiffness: 200, damping: 25 }
      }}
    >
      {project.alertType && (
         <div className={cn(
           "px-3 py-1.5 border-b text-[8px] font-black uppercase tracking-widest flex items-center gap-2 mb-4 -mx-5 -mt-5",
           project.alertType === 'novo_projeto' ? "bg-emerald-500/10 border-emerald-500/10 text-emerald-400" :
           project.alertType === 'retorno_vendas' ? "bg-amber-500/10 border-amber-500/10 text-amber-500" :
           project.alertType === 'alteracao' ? "bg-blue-500/10 border-blue-500/10 text-blue-400" :
           "bg-rose-500/10 border-rose-500/10 text-rose-500 animate-pulse"
         )}>
            {project.alertType === 'novo_projeto' && <Sparkles size={10} />}
            {project.alertType === 'retorno_vendas' && <Undo2 size={10} />}
            {project.alertType === 'alteracao' && <RefreshCw size={10} />}
            {project.alertType === 'retrabalho' && <RotateCcw size={10} />}
            <span className="truncate">Alerta: {
              project.alertType === 'novo_projeto' ? 'Novo Projeto Atribuído' :
              project.alertType === 'retorno_vendas' ? 'Retorno de Vendas' :
              project.alertType === 'alteracao' ? 'Alteração Solicitada' : 'Retrabalho Ativo'
            }</span>
         </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="px-2.5 py-1 bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.2)] rounded-lg text-[9px] font-black text-white italic uppercase tracking-widest">
           #{project.id}
        </div>
        <div className="flex items-center gap-2">
           {project.isUrgent && (
             <div className="flex items-center gap-1 px-2 py-0.5 bg-rose-500/10 border border-rose-500/20 rounded-full">
               <AlertCircle size={10} className="text-rose-500 animate-pulse" />
               <span className="text-[7px] font-black text-rose-500 uppercase tracking-tighter">Urgente</span>
             </div>
           )}
           <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-500 hover:text-white hover:bg-white/5 rounded-full" title="Editar Projeto">
              <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -rotate-45" />
           </Button>
           <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-700 hover:text-white rounded-full">
              <MoreVertical size={14} />
           </Button>
        </div>
      </div>

      <div className="space-y-1 mb-5 text-left">
        <h4 className="text-sm font-bold text-white leading-snug group-hover:text-blue-400 transition-colors uppercase tracking-tight line-clamp-2 md:line-clamp-1">{project.title}</h4>
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter line-clamp-1">{project.client}</p>
      </div>

      <div className="space-y-2.5 mb-6 bg-white/[0.02] p-3 rounded-xl border-none">
        <div className="flex justify-between text-[9px] font-black text-zinc-400 uppercase tracking-widest">
           <span>PROCESSAMENTO</span>
           <span className="text-blue-500">{project.progress}%</span>
        </div>
        <Progress value={project.progress} className="h-1.5 bg-white/5 animate-pulse" indicatorClassName="bg-blue-500" />
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-transparent">
        <div className="flex items-center gap-2">
           <div className="flex -space-x-1.5"> {/* Minimal overlap for professional look but with better borders */}
              <Avatar className="w-7 h-7 border-2 border-[#0c0c10] shadow-lg ring-1 ring-white/5">
                 <AvatarImage src={`https://i.pravatar.cc/100?u=${project.designerResponsible}`} />
                 <AvatarFallback className="text-[8px] font-black bg-zinc-800">DS</AvatarFallback>
              </Avatar>
              <Avatar className="w-7 h-7 border-2 border-[#0c0c10] shadow-lg ring-1 ring-white/5">
                 <AvatarImage src={`https://i.pravatar.cc/100?u=${project.commercialResponsible}`} />
                 <AvatarFallback className="text-[8px] font-black bg-zinc-800">CM</AvatarFallback>
              </Avatar>
           </div>
           <div className="flex flex-col text-left">
              <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest">Responsáveis</span>
              <span className="text-[8px] font-bold text-zinc-400 uppercase truncate max-w-[80px]">{project.designerResponsible.split(' ')[0]} / {project.commercialResponsible.split(' ')[0]}</span>
           </div>
        </div>
        <div className="flex flex-col items-end">
           <div className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-500 uppercase bg-white/5 px-2 py-0.5 rounded-full">
              <CalendarIcon size={10} className="text-blue-500" /> {format(new Date(project.deadline), 'dd/MM')}
           </div>
           <div className="flex items-center gap-1 mt-1.5">
              <Box size={10} className="text-zinc-600" />
               <span className="text-[8px] font-black text-zinc-500 uppercase">PRODS: {project.products.length}</span>
           </div>
        </div>
      </div>
    </motion.div>
  );
}

function ListView({ projects, onSelect }: { projects: Project[], onSelect: (p: Project) => void }) {
  return (
    <Card className="bg-white dark:bg-zinc-900 border-transparent overflow-hidden">
      <ScrollArea className="w-full">
        <div className="min-w-[800px]">
          <Table>
            <TableHeader className="bg-white/[0.02]">
          <TableRow className="border-transparent hover:bg-transparent text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
            <TableHead className="w-12 text-center">Urg</TableHead>
            <TableHead>Projeto</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Responsável</TableHead>
            <TableHead>Setor</TableHead>
            <TableHead>Progresso</TableHead>
            <TableHead>Prazo</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((p) => (
            <TableRow 
              key={p.id} 
              onClick={() => onSelect(p)}
              className="border-transparent hover:bg-white/[0.01] cursor-pointer group transition-colors"
            >
              <TableCell className="text-center">
                 {p.isUrgent && <AlertCircle size={14} className="text-rose-500 mx-auto" />}
              </TableCell>
              <TableCell>
                <div className="flex flex-col text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-black text-white italic uppercase tracking-tight group-hover:text-blue-500 transition-colors">#{p.id} - {p.title}</span>
                    {p.alertType && (
                      <Badge className={cn(
                        "text-[7px] font-black uppercase italic px-1.5 h-4 border-0 rounded flex items-center gap-1",
                        p.alertType === 'novo_projeto' ? "bg-emerald-500/15 text-emerald-400" :
                        p.alertType === 'retorno_vendas' ? "bg-amber-500/15 text-amber-500" :
                        p.alertType === 'alteracao' ? "bg-blue-500/15 text-blue-400" :
                        "bg-rose-500/15 text-rose-500 animate-pulse"
                      )}>
                        {p.alertType === 'novo_projeto' && <Sparkles size={8} />}
                        {p.alertType === 'retorno_vendas' && <Undo2 size={8} />}
                        {p.alertType === 'alteracao' && <RefreshCw size={8} />}
                        {p.alertType === 'retrabalho' && <RotateCcw size={8} />}
                        <span>
                          {p.alertType === 'novo_projeto' && 'Atribuído'}
                          {p.alertType === 'retorno_vendas' && 'Retorno Vendas'}
                          {p.alertType === 'alteracao' && 'Alteração'}
                          {p.alertType === 'retrabalho' && 'Retrabalho'}
                        </span>
                      </Badge>
                    )}
                  </div>
                  <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-tighter">{p.unit}</span>
                </div>
              </TableCell>
              <TableCell className="text-[10px] font-bold text-zinc-400 uppercase">{p.client}</TableCell>
              <TableCell>
                <Badge className="bg-blue-600/10 text-blue-500 border-0 text-[8px] font-black uppercase italic h-5">
                   {p.status}
                </Badge>
              </TableCell>
              <TableCell>
                 <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6 border-none shrink-0">
                       <AvatarImage src={`https://i.pravatar.cc/100?u=${p.designerResponsible}`} />
                    </Avatar>
                    <span className="text-[9px] font-bold text-zinc-500 uppercase">{p.designerResponsible}</span>
                 </div>
              </TableCell>
              <TableCell className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{p.sector}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                   <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600" style={{ width: `${p.progress}%` }} />
                   </div>
                   <span className="text-[9px] font-bold text-zinc-600">{p.progress}%</span>
                </div>
              </TableCell>
              <TableCell className="text-[10px] font-mono text-zinc-400">{format(new Date(p.deadline), 'dd/MM/yyyy')}</TableCell>
              <TableCell className="text-right text-[10px] font-black text-white italic">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.value)}
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-700 hover:text-white">
                   <MoreVertical size={14} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        </div>
      </ScrollArea>
    </Card>
  );
}

function CalendarView({ projects, onSelect }: { projects: Project[], onSelect: (p: Project) => void }) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4, 15)); // Center around May 15, 2026
  const [calendarMode, setCalendarMode] = useState<'month' | 'week' | 'day'>('month');

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const handlePrevious = () => {
    if (calendarMode === 'month') {
      setCurrentMonth(prev => addDays(prev, -30));
    } else if (calendarMode === 'week') {
      setCurrentMonth(prev => addDays(prev, -7));
    } else {
      setCurrentMonth(prev => addDays(prev, -1));
    }
  };

  const handleNext = () => {
    if (calendarMode === 'month') {
      setCurrentMonth(prev => addDays(prev, 30));
    } else if (calendarMode === 'week') {
      setCurrentMonth(prev => addDays(prev, 7));
    } else {
      setCurrentMonth(prev => addDays(prev, 1));
    }
  };

  const handleToday = () => {
    setCurrentMonth(new Date(2026, 4, 15));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div className="flex items-center gap-4">
            <h3 className="text-xl font-black text-white uppercase italic tracking-tight">
              {calendarMode === 'month' 
                ? format(currentMonth, 'MMMM yyyy', { locale: ptBR })
                : calendarMode === 'week'
                  ? `Semana de ${format(startOfWeek(currentMonth), 'dd/MM')} a ${format(endOfWeek(currentMonth), 'dd/MM/yyyy')}`
                  : format(currentMonth, 'dd MMMM yyyy', { locale: ptBR })
              }
            </h3>
            <div className="flex zinc-900 border-none p-1 rounded-lg">
               {(['month', 'week', 'day'] as const).map(mode => (
                 <button
                   key={mode}
                   onClick={() => setCalendarMode(mode)}
                   className={cn(
                     "px-3 py-1 rounded text-[8px] font-black uppercase tracking-widest transition-all",
                     calendarMode === mode ? "bg-blue-600 text-white" : "text-zinc-600 hover:text-white"
                   )}
                 >
                   {mode === 'month' ? 'Mês' : mode === 'week' ? 'Semana' : 'Dia'}
                 </button>
               ))}
            </div>
         </div>
         <div className="flex gap-2">
            <Button variant="outline" className="bg-white/5 border-transparent text-[10px] font-bold uppercase tracking-widest h-8 px-4" onClick={handlePrevious}>Anterior</Button>
            <Button variant="outline" className="bg-white/5 border-transparent text-[10px] font-bold uppercase tracking-widest h-8 px-4" onClick={handleNext}>Próximo</Button>
            <Button className="bg-blue-600 text-white h-8 text-[10px] font-bold uppercase tracking-widest px-4" onClick={handleToday}>Hoje</Button>
         </div>
      </div>

      {calendarMode === 'month' ? (
        <div className="grid grid-cols-7 zinc-900 border-none rounded-2xl overflow-hidden shadow-sm">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
            <div key={day} className="py-4 px-4 text-center border-b border-r border-transparent bg-white/[0.02] text-[10px] font-black text-zinc-500 uppercase tracking-widest">
              {day}
            </div>
          ))}
          {days.map((day, i) => {
            const dayProjects = projects.filter(p => isSameDay(new Date(p.deadline), day));
            return (
              <div 
                key={day.toString()} 
                className={cn(
                  "min-h-[140px] p-2 border-b border-r border-transparent transition-all hover:bg-white/[0.01] relative",
                  !isSameMonth(day, currentMonth) && "opacity-25 grayscale",
                  isToday(day) && "bg-blue-600/5"
                )}
              >
                <div className="flex justify-between items-center mb-2 px-1">
                  <span className={cn(
                    "text-[10px] font-black",
                    isToday(day) ? "text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]" : "text-zinc-600"
                  )}>
                    {format(day, 'd')}
                  </span>
                  {dayProjects.length > 0 && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />}
                </div>
                <div className="space-y-1.5 h-[100px] overflow-y-auto scrollbar-hide">
                  {dayProjects.map(p => (
                    <div 
                      key={p.id} 
                      onClick={() => onSelect(p)}
                      className="p-1 px-2 rounded bg-blue-600/10 border border-blue-500/20 cursor-pointer group hover:bg-blue-500/20 transition-all text-left"
                    >
                      <div className="text-[8px] font-black text-white italic truncate uppercase leading-tight">#{p.id} - {p.title}</div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[7px] font-bold text-zinc-500 uppercase truncate">{p.client}</span>
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : calendarMode === 'week' ? (
        <div className="grid grid-cols-1 md:grid-cols-7 zinc-900 border-none rounded-2xl overflow-hidden shadow-2xl">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dayName, idx) => {
            const startOfMainWeek = startOfWeek(currentMonth);
            const thisDay = addDays(startOfMainWeek, idx);
            const dayProjects = projects.filter(p => isSameDay(new Date(p.deadline), thisDay));
            return (
              <div 
                key={dayName} 
                className={cn(
                  "min-h-[220px] p-4 border-b md:border-b-0 md:border-r border-transparent transition-all hover:bg-white/[0.01] relative flex flex-col justify-start",
                  isToday(thisDay) && "bg-blue-600/5 border-t-2 border-t-blue-500"
                )}
              >
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-[10px] font-black uppercase text-zinc-500 tracking-wider">
                    {dayName}
                  </span>
                  <span className={cn(
                    "text-sm font-black",
                    isToday(thisDay) ? "text-blue-500 shadow-lg shadow-blue-500/10" : "text-zinc-400"
                  )}>
                    {format(thisDay, 'd')}
                  </span>
                </div>
                <div className="space-y-3 flex-1 overflow-y-auto scrollbar-hide">
                  {dayProjects.length === 0 ? (
                    <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest italic block text-center py-6">Sem Projetos</span>
                  ) : (
                    dayProjects.map(p => (
                      <div 
                        key={p.id} 
                        onClick={() => onSelect(p)}
                        className="p-3 rounded-xl bg-white/[0.02] border-none hover:border-blue-500/40 cursor-pointer group transition-all text-left space-y-2"
                      >
                        <div className="text-[9px] font-black text-white italic truncate uppercase">#{p.id} - {p.title}</div>
                        <p className="text-[8px] font-bold text-zinc-500 uppercase truncate">{p.client}</p>
                        <Badge className="bg-blue-600/15 text-blue-500 text-[8px] font-black uppercase border-0">{p.status}</Badge>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Day view mode */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-zinc-900 border-none rounded-2xl p-6 shadow-2xl space-y-4 lg:col-span-1 text-left">
            <h4 className="text-xs font-black text-white uppercase italic tracking-widest flex items-center gap-2">
              <CalendarIcon size={14} className="text-blue-500" /> Detalhes do Dia Selecionado
            </h4>
            <div className="p-4 bg-white/[0.02] border-none rounded-xl space-y-1">
               <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Data da Agenda</p>
               <p className="text-xl font-black text-white uppercase italic">{format(currentMonth, "dd 'de' MMMM, yyyy", { locale: ptBR })}</p>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-medium">
               Abaixo estão listados todos os prazos críticos de designers, orientações, validações e retornos agendados para este dia específico.
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 border-none rounded-2xl p-6 shadow-2xl lg:col-span-2 space-y-4 text-left">
             <h4 className="text-xs font-black text-white uppercase italic tracking-widest">Compromissos e Entregas do Dia ({projects.filter(p => isSameDay(new Date(p.deadline), currentMonth)).length})</h4>
             <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                {projects.filter(p => isSameDay(new Date(p.deadline), currentMonth)).length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-2 py-12">
                     <CheckCircle2 size={32} className="text-emerald-500 mb-1" />
                     <p className="text-white font-black text-xs uppercase italic tracking-widest">Nenhuma entrega crítica</p>
                     <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-tighter">Agenda livre de prazos finais para este dia.</p>
                  </div>
                ) : (
                  projects.filter(p => isSameDay(new Date(p.deadline), currentMonth)).map(p => (
                    <div 
                      key={p.id} 
                      onClick={() => onSelect(p)}
                      className="p-4 rounded-xl bg-white/[0.01] border-none hover:border-blue-500/30 cursor-pointer flex items-center justify-between gap-4 transition-all"
                    >
                      <div className="space-y-1">
                         <span className="text-[9px] font-black text-blue-500 italic uppercase">#{p.id}</span>
                         <h5 className="text-sm font-bold text-white uppercase italic leading-tight">{p.title}</h5>
                         <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{p.client}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                         <Badge className="bg-blue-600 text-white font-black uppercase text-[8px] border-0">{p.status}</Badge>
                         <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                      </div>
                    </div>
                  ))
                )}
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GanttView({ projects, onSelect }: { projects: Project[], onSelect: (p: Project) => void }) {
  const days = Array.from({ length: 30 }, (_, i) => addDays(new Date(2026, 4, 1), i));

  return (
    <Card className="bg-white dark:bg-zinc-900 border-transparent overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-[1200px]">
          {/* Timeline Header */}
          <div className="flex bg-white/[0.02] border-b border-transparent">
            <div className="w-64 p-4 shrink-0 border-r border-transparent text-[10px] font-black text-zinc-500 uppercase tracking-widest">
              PROJETO / ETAPAS
            </div>
            <div className="flex-1 flex">
              {days.map(day => (
                <div key={day.toString()} className="w-12 py-3 text-center border-r border-transparent shrink-0 flex flex-col items-center">
                   <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">{format(day, 'EEE', { locale: ptBR })}</span>
                   <span className={cn("text-[10px] font-black", isToday(day) ? "text-blue-500" : "text-zinc-400")}>{format(day, 'd')}</span>
                </div>
              ))}
            </div>
          </div>

          <ScrollArea className="h-[500px]">
             {projects.map((p, i) => {
               const startIdx = days.findIndex(d => isSameDay(d, new Date(p.startDate)));
               const endIdx = days.findIndex(d => isSameDay(d, new Date(p.deadline)));
               const width = (endIdx - startIdx + 1) * 48; // Each day is 12*4 = 48px? No, w-12 is 48px.
               
               return (
                 <div key={p.id} className="flex border-b border-transparent hover:bg-white/[0.01] transition-colors group">
                    <div className="w-64 p-4 shrink-0 border-r border-transparent">
                       <div className="flex flex-col gap-1 cursor-pointer" onClick={() => onSelect(p)}>
                          <div className="flex items-center gap-1.5 overflow-hidden text-left">
                             {p.alertType && (
                               <div className={cn(
                                 "w-2 h-2 rounded-full shrink-0 animate-pulse",
                                 p.alertType === 'novo_projeto' ? "bg-emerald-500" :
                                 p.alertType === 'retorno_vendas' ? "bg-amber-500" :
                                 p.alertType === 'alteracao' ? "bg-blue-500" : "bg-rose-500"
                               )} />
                             )}
                             <span className="text-[10px] font-black text-white italic uppercase truncate">#{p.id} - {p.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <Badge className="bg-blue-600/10 text-blue-500 border-0 text-[7px] font-black uppercase h-3.5">{p.status}</Badge>
                             <span className="text-[8px] font-bold text-zinc-600 uppercase">{p.progress}%</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex-1 relative h-16 flex items-center">
                       {/* Grid lines */}
                       <div className="absolute inset-0 flex pointer-events-none">
                          {days.map(d => <div key={d.toString()} className="w-12 border-r border-transparent h-full shrink-0" />)}
                       </div>
                       
                       {/* Project Bar */}
                       {startIdx !== -1 && (
                         <div 
                           className="absolute h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center px-3 group/bar cursor-pointer"
                           style={{ left: `${startIdx * 48}px`, width: `${width}px` }}
                           onClick={() => onSelect(p)}
                         >
                            <div 
                              className="absolute left-0 top-0 bottom-0 bg-blue-500 rounded-l-lg opacity-50" 
                              style={{ width: `${p.progress}%` }} 
                            />
                            <div className="relative z-10 flex items-center gap-2 overflow-hidden">
                               <div className="w-5 h-5 rounded-full border-none shrink-0 overflow-hidden">
                                  <img src={`https://i.pravatar.cc/100?u=${p.designerResponsible}`} alt="" />
                               </div>
                               <span className="text-[8px] font-black text-white italic uppercase truncate tracking-widest">{p.client}</span>
                            </div>
                         </div>
                       )}
                    </div>
                 </div>
               )
             })}
          </ScrollArea>
        </div>
      </div>
    </Card>
  );
}

function TimelineView({ projects, onSelect }: { projects: Project[], onSelect: (p: Project) => void }) {
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime());
  }, [projects]);

  return (
    <div className="max-w-4xl mx-auto py-8">
       <div className="relative border-l-2 border-transparent space-y-12 pl-8 ml-4">
          {sortedProjects.map((p, i) => (
            <div key={p.id} className="relative group">
               {/* Dot */}
               <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-white dark:bg-zinc-900 border-4 border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)] z-10" />
               
               <div className="space-y-4">
                  <div className="flex items-center gap-4">
                     <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">{p.lastUpdate}</span>
                     <Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-[8px] font-black uppercase italic">Atualização Operacional</Badge>
                  </div>
                  
                  <Card className="bg-white dark:bg-zinc-900 border-transparent p-6 hover:border-transparent transition-all cursor-pointer" onClick={() => onSelect(p)}>
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                           <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black text-blue-500 italic uppercase">#{p.id}</span>
                              <h4 className="text-lg font-bold text-white uppercase italic tracking-tight">{p.title}</h4>
                           </div>
                           <p className="text-xs text-zinc-400 font-medium leading-relaxed max-w-xl">
                              O projeto avançou para a etapa de <span className="text-white font-black italic underline decoration-blue-500/50">{p.status}</span>. 
                              Todos os materiais foram validados pelo setor de {p.sector}.
                           </p>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                           <div className="flex items-center gap-2">
                              <Avatar className="w-8 h-8 border-none">
                                 <AvatarImage src={`https://i.pravatar.cc/100?u=${p.designerResponsible}`} />
                              </Avatar>
                              <div className="text-right">
                                 <p className="text-[10px] font-black text-white italic uppercase leading-none">{p.designerResponsible}</p>
                                 <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-tighter">Designer Responsável</p>
                              </div>
                           </div>
                           <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-white">Ver Log Completo <ArrowRight size={12} className="ml-2" /></Button>
                        </div>
                     </div>
                  </Card>
               </div>
            </div>
          ))}
       </div>
    </div>
  );
}

function TableView({ projects, onSelect }: { projects: Project[], onSelect: (p: Project) => void }) {
  return (
    <Card className="bg-white dark:bg-zinc-900 border-transparent overflow-hidden">
       <div className="p-4 bg-white/[0.02] border-b border-transparent flex gap-4">
          <div className="relative flex-1">
             <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
             <Input placeholder="Filtro rápido na tabela..." className="h-8 bg-transparent border-transparent text-[10px] pl-9" />
          </div>
          <Button variant="outline" className="h-8 text-[9px] font-black border-transparent bg-white/5 text-zinc-400">Exportar CSV</Button>
       </div>
       <ScrollArea className="h-[600px]">
          <Table>
             <TableHeader className="sticky top-0 zinc-900 z-20">
               <TableRow className="border-transparent hover:bg-transparent text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                  <TableHead className="w-32">Código</TableHead>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progresso</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Designer</TableHead>
                  <TableHead>Prazo</TableHead>
                  <TableHead className="text-right">Última At.</TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
                {projects.map(p => (
                  <TableRow key={p.id} className="border-transparent hover:bg-white/[0.01] group cursor-pointer" onClick={() => onSelect(p)}>
                     <TableCell className="text-[10px] font-black text-blue-500">#{p.id}</TableCell>
                     <TableCell className="text-[10px] font-bold text-white uppercase">{p.title}</TableCell>
                     <TableCell className="text-[10px] font-bold text-zinc-500 uppercase">{p.client}</TableCell>
                     <TableCell>
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                           <span className="text-[9px] font-bold text-zinc-400 uppercase">{p.status}</span>
                        </div>
                     </TableCell>
                     <TableCell>
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] font-mono text-zinc-500">{p.progress}%</span>
                        </div>
                     </TableCell>
                     <TableCell className="text-[10px] font-bold text-zinc-300">R$ {p.value.toLocaleString()}</TableCell>
                     <TableCell className="text-[10px] font-black text-zinc-500">{p.designerResponsible}</TableCell>
                     <TableCell className="text-[10px] font-mono text-zinc-400">{p.deadline}</TableCell>
                     <TableCell className="text-right text-[9px] font-bold text-zinc-600">{p.lastUpdate}</TableCell>
                  </TableRow>
                ))}
             </TableBody>
          </Table>
       </ScrollArea>
    </Card>
  );
}

function ProjectsDashboard({ projects, columns }: { projects: Project[], columns?: string[] }) {
  const finalColumns = columns || [
    'Entrada', 'Briefing', 'Criação', 'Aprovação Cliente', 'PCP', 'Produção', 'Qualidade', 'Expedição', 'Instalação', 'Concluído'
  ];

  const stats = [
    { label: 'Projetos Ativos', value: projects.length, icon: <Layers className="text-blue-500" /> },
    { label: 'Ticket Médio', value: 'R$ 190.5k', icon: <DollarSign className="text-emerald-500" /> },
    { label: 'Eficiência Térmica', value: '88.4%', icon: <Timer className="text-purple-500" /> },
    { label: 'Alertas Críticos', value: '03', icon: <AlertCircle className="text-rose-500 animate-pulse" /> },
  ];

  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <Card key={i} className="bg-white dark:bg-zinc-900 border-transparent p-6 hover:border-transparent transition-all group">
               <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.02] border-none flex items-center justify-center group-hover:bg-blue-600/10 group-hover:border-blue-600/20 transition-all">
                     {s.icon}
                  </div>
                  <Badge className="bg-blue-600/10 text-blue-500 border-0 text-[8px] font-black italic">MESH-AI DATA</Badge>
               </div>
               <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">{s.label}</p>
               <h3 className="text-2xl font-black text-white italic tracking-tight">{s.value}</h3>
            </Card>
          ))}
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 zinc-900 border-transparent p-6 shadow-2xl">
             <div className="flex items-center justify-between mb-8">
                <h4 className="text-xs font-black text-white uppercase italic tracking-[0.2em] flex items-center gap-2">
                   <Target size={16} className="text-blue-500" /> Volume de Operação por Status
                </h4>
             </div>
             <div className="h-[300px] w-full flex items-end gap-2 md:gap-4 pb-8 border-b border-transparent relative">
                {finalColumns.map((col, i) => {
                  const count = projects.filter(p => p.status === col).length;
                  const height = projects.length > 0 ? (count / projects.length) * 100 + 10 : 10;
                  return (
                    <div key={col} className="flex-1 min-w-[30px] flex flex-col items-center gap-3 group">
                       <div className="w-full relative h-full flex items-end">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            className={cn(
                              "w-full rounded-t-lg transition-all group-hover:brightness-125 relative overflow-hidden",
                              i % 2 === 0 ? "bg-blue-600" : "bg-blue-800"
                            )}
                          >
                             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30" />
                          </motion.div>
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-white opacity-0 group-hover:opacity-100 transition-opacity">{count}</span>
                       </div>
                       <span className="text-[8px] font-black text-zinc-500 uppercase tracking-tighter text-center h-8 leading-tight">{col}</span>
                    </div>
                  );
                })}
             </div>
          </Card>

          <Card className="bg-white dark:bg-zinc-900 border-transparent p-6 shadow-2xl flex flex-col">
             <h4 className="text-xs font-black text-white uppercase italic tracking-[0.2em] mb-6 flex items-center gap-2">
                <Timer size={16} className="text-purple-500" /> Gargalos Operacionais
             </h4>
             <div className="flex-1 space-y-4">
                {[
                  { label: 'Corte CNC', load: 92, status: 'crítico', color: 'rose' },
                  { label: 'Impressão UV', load: 78, status: 'warning', color: 'amber' },
                  { label: 'Serralheria', load: 45, status: 'normal', color: 'emerald' },
                  { label: 'Atendimento', load: 20, status: 'normal', color: 'blue' },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span className="text-zinc-300">{item.label}</span>
                        <span className={cn(
                          item.color === 'rose' ? 'text-rose-500' : 
                          item.color === 'amber' ? 'text-amber-500' : 'text-emerald-500'
                        )}>{item.load}%</span>
                     </div>
                     <Progress value={item.load} className="h-1.5 bg-white/5" indicatorClassName={cn(
                        item.color === 'rose' ? 'bg-rose-500' : 
                        item.color === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'
                     )} />
                  </div>
                ))}
             </div>
             <div className="mt-8 p-4 bg-blue-600/5 border border-blue-500/20 rounded-xl">
                <p className="text-[10px] font-bold text-zinc-500 italic leading-relaxed">
                   IA sugere realocação de 2 operadores do setor de Acabamento para o setor de <span className="text-white font-black">CORTE CNC</span> para aliviar backlog.
                </p>
             </div>
          </Card>
       </div>
    </div>
  );
}

function ProjectDetailModal({ project, onClose, onUpdateProject }: { project: Project, onClose: () => void, onUpdateProject?: (p: Project) => void }) {
  const triggerAlert = (type: 'novo_projeto' | 'retorno_vendas' | 'alteracao' | 'retrabalho' | null, msg: string) => {
    if (onUpdateProject) {
      const updated = {
        ...project,
        alertType: type,
        alertMessage: msg,
        alertDate: format(new Date(), 'yyyy-MM-dd HH:mm'),
        progress: type === 'retrabalho' ? Math.max(0, project.progress - 20) : project.progress,
        lastUpdate: format(new Date(), 'yyyy-MM-dd HH:mm')
      };
      onUpdateProject(updated);
    }
  };

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-white dark:bg-zinc-900 border-none w-full max-w-5xl h-[90vh] rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.15)] flex flex-col"
    >
       <div className="p-6 border-b border-transparent bg-white dark:bg-zinc-900 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center p-0.5">
                <div className="w-full h-full rounded-lg bg-white dark:bg-zinc-900 flex items-center justify-center font-black text-blue-500 italic">
                   #{project.id}
                </div>
             </div>
             <div>
                <div className="flex items-center gap-3 mb-1">
                   <h2 className="text-xl md:text-2xl font-black text-white italic uppercase tracking-tight leading-tight">{project.title}</h2>
                   <Badge className="bg-blue-600 text-white border-0 text-[10px] font-black uppercase italic px-3">{project.status}</Badge>
                </div>
                <div className="flex items-center gap-3 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                   <span>{project.client}</span>
                   <div className="w-1 h-1 rounded-full bg-zinc-700" />
                   <span>{project.unit}</span>
                </div>
             </div>
          </div>
          <div className="flex items-center gap-2">
             <Button variant="ghost" className="hidden md:flex text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white hover:bg-white/5 gap-2 px-4">
                <Edit size={14} className="text-blue-500" /> Editar Projeto
             </Button>
             <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-zinc-500 hover:text-white hover:bg-white/5">
                <MoreVertical />
             </Button>
          </div>
       </div>

       <ScrollArea className="flex-1 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
             <div className="lg:col-span-2 space-y-8">
                <Tabs defaultValue="geral" className="w-full">
                  <TabsList className="bg-white/5 border-none p-1 mb-8">
                    <TabsTrigger value="geral" className="text-[10px] font-black uppercase tracking-widest px-6 data-[state=active]:bg-white data-[state=active]:text-black">Geral</TabsTrigger>
                    <TabsTrigger value="produtos" className="text-[10px] font-black uppercase tracking-widest px-6 data-[state=active]:bg-white data-[state=active]:text-black">Produtos ({project.products.length})</TabsTrigger>
                    <TabsTrigger value="arquivos" className="text-[10px] font-black uppercase tracking-widest px-6 data-[state=active]:bg-white data-[state=active]:text-black">Arquivos</TabsTrigger>
                    <TabsTrigger value="historico" className="text-[10px] font-black uppercase tracking-widest px-6 data-[state=active]:bg-white data-[state=active]:text-black">Histórico</TabsTrigger>
                  </TabsList>

                  <TabsContent value="geral" className="space-y-8 mt-0 animate-in fade-in slide-in-from-left-4">
                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Dificuldade</p>
                           <div className="flex gap-1.5">
                              {[1, 2, 3, 4, 5].map(v => (
                                <div key={v} className={cn(
                                  "flex-1 h-8 rounded border flex items-center justify-center text-[10px] font-black transition-all",
                                  v <= project.difficulty ? "bg-blue-600 text-white border-blue-500" : "bg-white/[0.02] text-zinc-600 border-transparent"
                                )}>{v}</div>
                              ))}
                           </div>
                        </div>
                        <div className="space-y-2">
                           <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Prioridade</p>
                           <div className="flex gap-1.5">
                              {[1, 2, 3, 4, 5].map(v => (
                                <div key={v} className={cn(
                                  "flex-1 h-8 rounded border flex items-center justify-center text-[10px] font-black transition-all",
                                  v <= project.priority ? "bg-amber-600 text-white border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.2)]" : "bg-white/[0.02] text-zinc-600 border-transparent"
                                )}>{v}</div>
                              ))}
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Responsável Comercial</p>
                           <div className="p-3 bg-white/[0.02] border-none rounded-xl flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                 <AvatarImage src={`https://i.pravatar.cc/100?u=${project.commercialResponsible}`} />
                              </Avatar>
                              <span className="text-sm font-bold text-white uppercase italic">{project.commercialResponsible}</span>
                           </div>
                        </div>
                        <div className="space-y-2">
                           <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Designer Responsável</p>
                           <div className="p-3 bg-white/[0.02] border-none rounded-xl flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                 <AvatarImage src={`https://i.pravatar.cc/100?u=${project.designerResponsible}`} />
                              </Avatar>
                              <span className="text-sm font-bold text-white uppercase italic">{project.designerResponsible}</span>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div className="p-4 bg-white/[0.02] border-none rounded-2xl flex items-center justify-between">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                                 <DollarSign size={20} />
                              </div>
                              <div>
                                 <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">VALOR TOTAL DO PROJETO</p>
                                 <p className="text-2xl font-black text-white italic tracking-tight">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(project.value)}</p>
                              </div>
                           </div>
                           <Button variant="ghost" className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">Gerar Orçamento PDF</Button>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2">Briefing Operacional</p>
                        <div className="p-6 bg-white/[0.01] border-none rounded-2xl text-xs text-zinc-400 font-medium leading-relaxed italic">
                           "Execução de fachadas em ACM 3mm com logotipos em letra caixa iluminada. Instalação noturna necessária no Shopping Ibirapuera. Verificação estrutural do mezanino pendente."
                        </div>
                     </div>

                     {/* Central de Alertas [OP-PROJ] */}
                     <div className="bg-white dark:bg-zinc-900 border-none p-6 rounded-2xl space-y-4 text-left">
                       <div className="flex items-center justify-between">
                         <h4 className="text-[10px] font-black text-white uppercase italic tracking-[0.2em] flex items-center gap-2">
                           <Zap size={14} className="text-blue-500 animate-pulse" /> Central de Alertas e Ações de Fluxo
                         </h4>
                         {project.alertType && (
                           <Badge className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-[8px] font-black border border-rose-500/20 uppercase cursor-pointer py-1 px-2.5" onClick={() => triggerAlert(null, '')}>
                             Remover Alerta Ativo
                           </Badge>
                         )}
                       </div>

                       {project.alertType ? (
                         <div className={cn(
                           "p-4 rounded-xl border space-y-2 text-left",
                           project.alertType === 'novo_projeto' ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" :
                           project.alertType === 'retorno_vendas' ? "bg-amber-500/5 border-amber-500/20 text-amber-500" :
                           project.alertType === 'alteracao' ? "bg-blue-500/5 border-blue-500/20 text-blue-400" :
                           "bg-rose-500/5 border-rose-500/20 text-rose-500 animate-pulse"
                         )}>
                           <p className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                             {project.alertType === 'novo_projeto' && <Sparkles size={11} />}
                             {project.alertType === 'retorno_vendas' && <Undo2 size={11} />}
                             {project.alertType === 'alteracao' && <RefreshCw size={11} />}
                             {project.alertType === 'retrabalho' && <RotateCcw size={11} />}
                             Alerta Ativo: {
                               project.alertType === 'novo_projeto' ? 'Novo Projeto Atribuído' :
                               project.alertType === 'retorno_vendas' ? 'Retorno de Vendas' :
                               project.alertType === 'alteracao' ? 'Alteração Solicitada' : 'Retrabalho Ativo'
                             }
                           </p>
                           <p className="text-xs font-bold text-zinc-300 leading-relaxed italic mt-1 pb-1">"{project.alertMessage}"</p>
                           <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest pt-1 border-t border-transparent">Registrado em: {project.alertDate}</p>
                         </div>
                       ) : (
                         <p className="text-xs text-zinc-500 leading-relaxed font-semibold italic text-left p-3 bg-white/[0.01] border-none rounded-xl">
                           Nenhum fluxo de retrabalho ou alteração agendado no momento. Estável e operando em regime normal no setor de {project.sector}.
                         </p>
                       )}

                       <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-2">
                          <Button 
                            onClick={() => triggerAlert('novo_projeto', 'Novo briefing de projeto importado do comercial. Pronto para criação urgente.')}
                            className="bg-emerald-500/10 hover:bg-zinc-100 hover:dark:bg-zinc-800 hover:text-white border border-emerald-500/15 text-emerald-400 text-[8px] font-black uppercase tracking-widest p-2 h-14 flex flex-col justify-center items-center gap-1 transition-all"
                          >
                            <Sparkles size={14} />
                            Novo Projeto
                          </Button>
                          <Button 
                            onClick={() => triggerAlert('retorno_vendas', 'Projeto devolvido para aprovação de custos adicionais do setor de vendas de designer.')}
                            className="bg-amber-500/10 hover:bg-zinc-100 hover:dark:bg-zinc-800 hover:text-white border border-amber-500/15 text-amber-500 text-[8px] font-black uppercase tracking-widest p-2 h-14 flex flex-col justify-center items-center gap-1 transition-all"
                          >
                            <Undo2 size={14} />
                            Retor. Vendas
                          </Button>
                          <Button 
                            onClick={() => triggerAlert('alteracao', 'Solicitada mudança em dimensões e layout de ACM frontal.')}
                            className="bg-blue-600/10 hover:bg-zinc-100 hover:dark:bg-zinc-800 hover:text-white border border-blue-500/15 text-blue-400 text-[8px] font-black uppercase tracking-widest p-2 h-14 flex flex-col justify-center items-center gap-1 transition-all"
                          >
                            <RefreshCw size={14} />
                            Alteração
                          </Button>
                          <Button 
                            onClick={() => triggerAlert('retrabalho', 'Retrabalho acionado devido a re-impressão estrutural de adesivação.')}
                            className="bg-[#f43f5e]/10 hover:bg-zinc-100 hover:dark:bg-zinc-800 hover:text-white border border-rose-500/15 text-rose-500 text-[8px] font-black uppercase tracking-widest p-2 h-14 flex flex-col justify-center items-center gap-1 transition-all animate-pulse hover:animate-none"
                          >
                            <RotateCcw size={14} />
                            Retrabalho
                          </Button>
                       </div>
                     </div>
                  </TabsContent>
                  
                  <TabsContent value="produtos" className="mt-0">
                     <div className="space-y-4">
                        {project.products.map(product => (
                          <Card key={product.id} className="bg-white dark:bg-zinc-900 border-transparent overflow-hidden group hover:border-blue-500/30 transition-all">
                             <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center gap-5">
                                   <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border-none group-hover:bg-blue-600/10 transition-all">
                                      <Maximize2 size={24} className="text-zinc-600 group-hover:text-blue-500 transition-all" />
                                   </div>
                                   <div>
                                      <div className="flex flex-wrap items-center gap-3 mb-1">
                                         <h4 className="text-base md:text-lg font-black text-white italic uppercase tracking-tight leading-tight">{product.name}</h4>
                                         <Badge className="bg-zinc-800 text-zinc-400 border-0 text-[8px] font-black uppercase">{product.category}</Badge>
                                      </div>
                                      <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                         <span className="flex items-center gap-1.5"><Boxes size={12} className="text-blue-500" /> {product.quantity} UND</span>
                                         <span className="flex items-center gap-1.5"><Layers size={12} className="text-purple-500" /> {product.material}</span>
                                         <span className="flex items-center gap-1.5"><Timer size={12} className="text-orange-500" /> {product.dimensions.width}x{product.dimensions.height} CM</span>
                                      </div>
                                   </div>
                                </div>
                                <div className="flex flex-col items-end gap-2 shrink-0">
                                   <Badge className={cn(
                                     "text-[9px] font-black uppercase italic px-3 h-6 border-0",
                                     product.technicalStatus === 'Finalizado' ? "bg-emerald-600 text-white" : 
                                     product.technicalStatus === 'Em Execução' ? "bg-blue-600 text-white animate-pulse" : "bg-zinc-800 text-zinc-500"
                                   )}>
                                      {product.technicalStatus}
                                   </Badge>
                                   <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-white">Detalhes Técnicos <ChevronRight size={12} className="ml-2" /></Button>
                                </div>
                             </div>
                          </Card>
                        ))}
                        <Button className="w-full h-14 border-2 border-dashed border-transparent bg-transparent hover:bg-white/5 hover:border-transparent text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                           <Plus size={16} className="mr-2" /> Adicionar Produto ao Projeto
                        </Button>
                     </div>
                  </TabsContent>
                </Tabs>
             </div>

             <div className="space-y-6">
                <Card className="bg-white dark:bg-zinc-900 border-transparent p-6 shadow-2xl space-y-6">
                   <h4 className="text-[10px] font-black text-white uppercase italic tracking-[0.2em] flex items-center gap-2">
                      <Target size={16} className="text-blue-500" /> Timeline do Projeto
                   </h4>
                   <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
                      {[
                        { status: 'Aprovação Cliente', date: 'Hoje, 10:15', active: true },
                        { status: 'Criação Finalizada', date: 'Ontem, 16:40', active: false },
                        { status: 'Briefing Validado', date: '08 Mai, 09:12', active: false },
                        { status: 'Entrada no Sistema', date: '07 Mai, 14:00', active: false },
                      ].map((step, i) => (
                        <div key={i} className="flex gap-4 relative">
                           <div className={cn(
                             "w-6 h-6 rounded-full border-4 border-[#0c0c10] z-10 shrink-0",
                             step.active ? "bg-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "bg-zinc-800"
                           )} />
                           <div>
                              <p className={cn("text-[11px] font-black uppercase italic leading-none mb-1", step.active ? "text-white" : "text-zinc-500")}>
                                {step.status}
                              </p>
                              <p className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">{step.date}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </Card>

                <Card className="bg-blue-600 border-0 p-6 text-white shadow-[0_0_30px_rgba(37,99,235,0.2)]">
                   <div className="flex items-center gap-3 mb-4">
                      <Zap size={20} className="fill-white" />
                      <h4 className="text-xs font-black uppercase tracking-[0.2em]">MESH.IA INSIGHT</h4>
                   </div>
                   <p className="text-sm font-bold leading-relaxed italic mb-6">
                      "Detectado atraso potencial na entrega das Letras Caixas devido à carga no setor de Serralheria. Recomendo priorizar usinagem CNC hoje."
                   </p>
                   <Button className="w-full bg-white text-blue-600 hover:bg-zinc-100 font-black text-[10px] uppercase tracking-widest">Otimizar Fluxo</Button>
                </Card>

                <div className="flex flex-col gap-3">
                   <Button className="w-full h-12 bg-white text-black hover:bg-zinc-200 font-black text-[10px] uppercase tracking-widest italic group">
                      Salvar Alterações <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                   </Button>
                   <Button variant="outline" className="w-full h-12 bg-transparent border-transparent text-white hover:bg-white/5 font-black text-[10px] uppercase tracking-widest" onClick={onClose}>
                      Fechar Visualização
                   </Button>
                </div>
             </div>
          </div>
       </ScrollArea>
    </motion.div>
  );
}

// Additional Views Placeholders to avoid build errors if called manually

function TimelineViewStub() { return <div>Timeline View Placeholder</div>; }
function ProjectsDashboardStub() { return <div>Dashboard View Placeholder</div>; }
