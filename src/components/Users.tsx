import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  UserX, 
  Shield, 
  Mail, 
  Phone, 
  Calendar, 
  Search, 
  Filter, 
  MoreVertical,
  BrainCircuit,
  Zap,
  Activity,
  History,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Fingerprint,
  MailWarning
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useTheme } from '@/src/lib/ThemeContext';

import { BaseTable, Column } from './common/BaseTable';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'Ativo' | 'Inativo' | 'Pendente';
  lastActive: string;
  avatar?: string;
  accessCount: number;
}

const MOCK_USERS: User[] = [
  { id: '1', name: 'Marcos Silva', email: 'marcos.silva@korteck.com', role: 'Operador Senior', department: 'Corte CNC', status: 'Ativo', lastActive: '2 min atrás', accessCount: 1450 },
  { id: '2', name: 'Ana Julia', email: 'ana.julia@korteck.com', role: 'Gestora Comercial', department: 'Vendas', status: 'Ativo', lastActive: '15 min atrás', accessCount: 2200 },
  { id: '3', name: 'Roberto Dias', email: 'roberto.dias@korteck.com', role: 'Técnico Especialista', department: 'Impressão UV', status: 'Ativo', lastActive: '1h atrás', accessCount: 980 },
  { id: '4', name: 'Sandra Lima', email: 'sandra.lima@korteck.com', role: 'Analista de RH', department: 'Recursos Humanos', status: 'Inativo', lastActive: '3 dias atrás', accessCount: 450 },
  { id: '5', name: 'Carlos Santos', email: 'carlos.santos@korteck.com', role: 'Designer Industrial', department: 'Projetos', status: 'Pendente', lastActive: 'Nunca', accessCount: 0 },
];

export function UsersManagement() {
  const { currentTheme } = useTheme();
  const isLight = currentTheme === 'ash-light';
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filteredUsers = MOCK_USERS.filter(user => {
    return activeFilter === 'Todos' || user.status === activeFilter;
  });

  const userColumns: Column<User>[] = [
    { 
      header: 'Usuário', 
      accessorKey: 'name',
      sortable: true,
      cell: (user) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9 border-none">
            <AvatarImage src={`https://i.pravatar.cc/100?u=${user.id}`} />
            <AvatarFallback className="bg-zinc-200 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-550">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className={cn("font-bold italic uppercase", isLight ? "text-zinc-900" : "text-white")}>{user.name}</p>
            <p className="text-[10px] text-zinc-500 font-mono tracking-tighter">{user.email}</p>
          </div>
        </div>
      )
    },
    { 
      header: 'Cargo / Dep.', 
      accessorKey: 'role',
      sortable: true,
      cell: (user) => (
        <div>
          <p className="text-zinc-500 dark:text-zinc-400 font-bold uppercase text-[10px]">{user.role}</p>
          <p className="text-zinc-500 dark:text-zinc-650 font-medium text-[9px] uppercase tracking-widest">{user.department}</p>
        </div>
      )
    },
    { 
      header: 'Atividade', 
      accessorKey: 'lastActive',
      cell: (user) => (
        <div className="flex flex-col gap-1">
          <p className="text-xs text-zinc-500">{user.lastActive}</p>
          <span className="text-[9px] text-zinc-500 dark:text-zinc-700 uppercase font-black tracking-widest">{user.accessCount} acessos</span>
        </div>
      )
    },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: (user) => (
        <Badge className={cn(
          "text-[8px] font-black uppercase border-0 mx-auto block w-fit",
          user.status === 'Ativo' ? "bg-emerald-500/10 text-emerald-500" :
          user.status === 'Inativo' ? "bg-rose-500/10 text-rose-500" :
          "bg-amber-500/10 text-amber-500"
        )}>
          {user.status}
        </Badge>
      )
    }
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700 max-w-[1700px] mx-auto pb-24">
      {/* Mesh Users Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 border-b border-zinc-200 dark:border-transparent pb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
             <div className="p-2.5 bg-blue-600/10 rounded-xl border border-blue-500/20">
                <Users size={28} className="text-blue-500" />
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-[0.5em] text-zinc-500 uppercase">ACCESS IDENTITY // MESH-CORE</span>
                <h1 className={cn("text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none", isLight ? "text-zinc-950" : "text-white")}>
                  Gestão de <span className="text-blue-600">Colaboradores</span>
                </h1>
             </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
           <div className="hidden lg:flex items-center gap-6 px-10 border-r border-zinc-200 dark:border-transparent mr-3">
              <div className="text-right">
                 <p className="text-[9px] font-black text-zinc-500 dark:text-zinc-650 uppercase tracking-widest mb-1">USUÁRIOS ATIVOS</p>
                 <div className="flex items-center gap-2 justify-end">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className={cn("text-2xl font-black italic", isLight ? "text-zinc-950" : "text-white")}>42</p>
                 </div>
              </div>
           </div>
           <Button className="bg-blue-600 text-white hover:bg-blue-500 font-black h-14 px-10 text-[11px] uppercase tracking-widest shadow-sm shadow-blue-600/20 transition-all border-0">
             <UserPlus className="mr-3" size={18} /> Convidar Usuário
           </Button>
        </div>
      </div>

      {/* Modern KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Usuários', value: '124', trend: '+12 ESTE MÊS', icon: <Users className="text-blue-500" />, color: 'blue' },
          { label: 'Sessões Ativas', value: '42', trend: 'LIVE MONITOR', icon: <Activity className="text-emerald-500" />, color: 'emerald' },
          { label: 'Convites Pendentes', value: '07', trend: 'Aguardando', icon: <MailWarning className="text-amber-500" />, color: 'amber' },
          { label: 'Security Level', value: 'ROOT', trend: 'Padrão ANSI-S', icon: <Shield className="text-blue-400" />, color: 'blue' },
        ].map((stat, i) => (
          <Card key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative overflow-hidden group shadow-sm">
            <div className={cn("absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-10 -mr-16 -mt-16", i % 2 === 0 ? "bg-blue-500" : "bg-emerald-500")} />
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-black text-zinc-500 dark:text-zinc-600 uppercase tracking-widest">{stat.label}</span>
                <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-transparent flex items-center justify-center group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-end justify-between relative z-10">
                <h3 className={cn("text-4xl font-black italic tracking-tighter leading-none", isLight ? "text-zinc-950" : "text-white")}>{stat.value}</h3>
                <span className="text-[9px] font-black text-zinc-500 dark:text-zinc-700 uppercase tracking-widest">{stat.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 flex flex-col gap-8">
           {/* Filters Bar */}
           <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm backdrop-blur-xl">
             <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-zinc-100 dark:bg-white/5 rounded-xl border border-zinc-200 dark:border-transparent">
                     <Filter size={18} className="text-zinc-500" />
                  </div>
                  <div className="flex items-center gap-2 bg-zinc-50 dark:bg-white/[0.02] p-1 rounded-xl border border-zinc-250 dark:border-transparent">
                    {['Todos', 'Ativo', 'Inativo', 'Pendente'].map((filter) => (
                      <Button
                        key={filter}
                        variant="ghost"
                        onClick={() => setActiveFilter(filter)}
                        className={cn(
                          "text-[10px] font-black uppercase tracking-widest h-10 px-6 transition-all",
                          activeFilter === filter 
                            ? (isLight ? "bg-zinc-950 text-white shadow-xl" : "bg-white text-black shadow-xl") 
                            : "text-zinc-500 dark:text-zinc-450 hover:text-zinc-950 dark:hover:text-white"
                        )}
                      >
                        {filter}
                      </Button>
                    ))}
                  </div>
               </div>
               
               <div className="relative w-full md:w-80">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <Input 
                    className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-transparent h-12 pl-12 text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-650 font-mono" 
                    placeholder="Buscar por nome ou ID..." 
                  />
               </div>
             </CardContent>
           </Card>

           {/* User Table Card */}
           <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden rounded-3xl shadow-sm">
              <BaseTable 
                 data={filteredUsers}
                 columns={userColumns}
                 searchPlaceholder=""
              />
           </Card>
        </div>

        {/* Right Column: AI & Roles */}
        <div className="xl:col-span-4 space-y-8">
          <Card className="bg-gradient-to-br from-blue-600/10 to-blue-900/20 border-blue-500/20 overflow-hidden relative p-10 border-2">
            <div className="absolute top-0 right-0 p-12 opacity-10"><BrainCircuit size={100} className="text-white" /></div>
            <div className="relative z-10 space-y-8">
               <div className="flex items-center gap-3 text-blue-400 text-[10px] font-black tracking-[0.4em] uppercase">
                  <Fingerprint size={20} className="animate-pulse" /> Cortex Identity Guard
               </div>
               
               <p className="text-lg font-black text-white italic tracking-tighter uppercase leading-tight">
                  Alerta Heurístico de Acesso
               </p>

               <div className="p-6 bg-black/60 border-none rounded-3xl space-y-4">
                  <div className="flex items-start gap-4">
                     <AlertTriangle size={20} className="text-amber-500 shrink-0 mt-1" />
                     <p className="text-[12px] text-zinc-400 font-medium leading-relaxed italic uppercase tracking-tighter">
                        O usuário <span className="text-white font-black">#Marcos_OPS</span> acessou o módulo comercial <span className="text-blue-500">22 vezes</span> nas últimas 24h. Comportamento atípico para cargo industrial.
                     </p>
                  </div>
               </div>

               <div className="flex gap-3">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-black text-[11px] uppercase h-14 tracking-widest shadow-sm shadow-blue-600/20 shadow-black">
                     CONGELAR PERMISSÕES
                  </Button>
                  <Button variant="outline" className="h-14 border-transparent text-zinc-500 hover:text-white uppercase font-black text-[10px]">
                     IGNORAR
                  </Button>
               </div>
            </div>
          </Card>

          <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-10 space-y-10 shadow-sm">
             <div>
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic mb-2">Hierarquia Operacional</h4>
                <p className={cn("text-2xl font-black italic tracking-tighter uppercase leading-none", isLight ? "text-zinc-950" : "text-white")}>Distribuição de Acesso</p>
             </div>

             <div className="space-y-6">
                {[
                  { label: 'Administradores [Mesh-0]', count: 4, val: 10, color: 'text-blue-500' },
                  { label: 'Gestores de Unidade', count: 18, val: 35, color: 'text-blue-600' },
                  { label: 'Operadores de Chão', count: 56, val: 85, color: 'text-blue-400' },
                  { label: 'Logística & Externos', count: 12, val: 20, color: 'text-zinc-600' },
                ].map((item, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-end mb-3">
                       <p className="text-[10px] font-black text-zinc-500 dark:text-zinc-600 uppercase tracking-widest italic group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">{item.label}</p>
                       <p className={cn("text-base font-black italic", item.color)}>{item.count}</p>
                    </div>
                    <Progress value={item.val} className="h-1 bg-zinc-100 dark:bg-white/5" indicatorClassName="bg-blue-500" />
                  </div>
                ))}
             </div>

             <Button variant="ghost" className="w-full h-14 text-[11px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border-none hover:bg-zinc-100 dark:hover:bg-white/5">
                GERENCIAR ROLES <ChevronRight size={16} className="ml-2" />
             </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
