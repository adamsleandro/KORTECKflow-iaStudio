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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filteredUsers = MOCK_USERS.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'Todos' || user.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700 max-w-[1600px] mx-auto">
      {/* Header Gestão de Usuários */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-blue-500 mb-2 uppercase">
            <Users size={14} /> GESTÃO DE USUÁRIOS [SYS-USERS]
          </div>
          <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">
            Usuários do Sistema<span className="text-blue-600">.</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-blue-600 text-white hover:bg-blue-500 font-bold h-11 px-8 text-[11px] uppercase tracking-[0.1em] shadow-[0_0_25px_rgba(37,99,235,0.25)] transition-all">
            <UserPlus className="mr-2" size={16} /> Convidar Usuário
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Usuários', value: '124', trend: '+12 este mês', icon: <Users className="text-blue-500" /> },
          { label: 'Sessões Ativas', value: '42', trend: 'Ao Vivo Agora', icon: <Activity className="text-emerald-500" /> },
          { label: 'Convites Pendentes', value: '07', trend: 'Aguardando', icon: <MailWarning className="text-amber-500" /> },
          { label: 'Nível Médio Acesso', value: 'Lvl 2', trend: 'Padrão Seg.', icon: <Shield className="text-purple-500" /> },
        ].map((stat, i) => (
          <Card key={i} className="bg-[#111116] border-white/5 relative overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{stat.label}</span>
                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-light text-white italic tracking-tighter leading-none">{stat.value}</h3>
                <span className="text-[9px] font-bold text-zinc-600 uppercase">{stat.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Filtros e Busca */}
        <Card className="lg:col-span-12 bg-[#111116] border-white/5">
          <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
              <Input 
                placeholder="Buscar por nome, email ou cargo..." 
                className="bg-black border-white/5 pl-10 h-11 text-xs text-white focus-visible:ring-blue-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              {['Todos', 'Ativo', 'Inativo', 'Pendente'].map((filter) => (
                <Button
                  key={filter}
                  variant="ghost"
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "text-[10px] font-black uppercase tracking-widest h-11 px-4 transition-all",
                    activeFilter === filter ? "bg-blue-600/10 text-blue-500 border border-blue-500/20" : "text-zinc-500 hover:text-white"
                  )}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Table */}
        <Card className="lg:col-span-8 bg-[#111116] border-white/5 overflow-hidden">
          <CardHeader className="border-b border-white/5 bg-white/[0.01]">
            <CardTitle className="text-sm font-black text-white uppercase tracking-widest italic">Lista de Usuários</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] font-medium border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="px-6 py-4 text-zinc-500 uppercase tracking-widest font-black">Usuário</th>
                    <th className="px-6 py-4 text-zinc-500 uppercase tracking-widest font-black">Cargo / Dep.</th>
                    <th className="px-6 py-4 text-zinc-500 uppercase tracking-widest font-black">Atividade</th>
                    <th className="px-6 py-4 text-zinc-500 uppercase tracking-widest font-black text-center">Status</th>
                    <th className="px-6 py-4 text-zinc-500 uppercase tracking-widest font-black text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <AnimatePresence mode="popLayout">
                    {filteredUsers.map((user) => (
                      <motion.tr 
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key={user.id} 
                        className="hover:bg-white/[0.01] transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-9 h-9 border border-white/10">
                              <AvatarImage src={`https://i.pravatar.cc/100?u=${user.id}`} />
                              <AvatarFallback className="bg-zinc-900 text-zinc-500">{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-white font-bold italic uppercase">{user.name}</p>
                              <p className="text-[10px] text-zinc-600 font-mono tracking-tighter">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-zinc-400 font-bold uppercase text-[10px]">{user.role}</p>
                          <p className="text-zinc-600 font-medium text-[9px] uppercase tracking-widest">{user.department}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <p className="text-xs text-zinc-500">{user.lastActive}</p>
                            <span className="text-[9px] text-zinc-700 uppercase font-black tracking-widest">{user.accessCount} acessos</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Badge className={cn(
                            "text-[8px] font-black uppercase border-0",
                            user.status === 'Ativo' ? "bg-emerald-500/10 text-emerald-500" :
                            user.status === 'Inativo' ? "bg-rose-500/10 text-rose-500" :
                            "bg-amber-500/10 text-amber-500"
                          )}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              className={cn(
                                buttonVariants({ variant: "ghost", size: "icon" }),
                                "h-8 w-8 text-zinc-600 hover:text-white"
                              )}
                            >
                              <MoreVertical size={16} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-black border-zinc-800 text-zinc-400">
                              <DropdownMenuItem className="text-xs font-bold uppercase focus:bg-blue-600 focus:text-white cursor-pointer">Editar Permissões</DropdownMenuItem>
                              <DropdownMenuItem className="text-xs font-bold uppercase focus:bg-blue-600 focus:text-white cursor-pointer">Ver Atividade</DropdownMenuItem>
                              <DropdownMenuItem className="text-xs font-bold uppercase focus:bg-rose-600 focus:text-white cursor-pointer text-rose-500">Desativar Conta</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* AI Insight & Roles */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-gradient-to-br from-blue-600/10 to-purple-900/10 border border-blue-500/20 relative overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                 <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Cortex IA Insight</span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                Detectamos que <span className="text-white italic">Marcos Silva</span> tem acessado o módulo comercial com frequência incomum para seu cargo (Produção). Sugerimos auditar permissões de cargo.
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white transition-all text-[10px] font-black uppercase tracking-widest h-10">
                   Revisar Permissões
                </Button>
                <Button variant="ghost" className="w-full text-zinc-500 hover:text-white text-[10px] font-black uppercase tracking-widest h-10">
                   Descartar Alerta
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#111116] border-white/5">
            <CardHeader className="border-b border-white/5 bg-white/[0.01]">
              <CardTitle className="text-sm font-black text-white uppercase tracking-widest italic">Níveis de Acesso</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {[
                { label: 'Administradores', count: 4, color: 'bg-blue-600' },
                { label: 'Vendedores', count: 18, color: 'bg-blue-700' },
                { label: 'Operadores', count: 56, color: 'bg-blue-800' },
                { label: 'Externos', count: 12, color: 'bg-blue-900' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-1.5 h-1.5 rounded-full", item.color)} />
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{item.label}</span>
                  </div>
                  <span className="text-xs font-black text-white italic">{item.count}</span>
                </div>
              ))}
              <Button variant="link" className="w-full text-[10px] text-zinc-600 hover:text-white uppercase tracking-[0.2em] font-black h-8">
                 Gestão de Roles <Zap size={12} className="ml-2 text-blue-500" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#111116] border-white/5">
            <CardHeader className="border-b border-white/5 bg-white/[0.01]">
              <CardTitle className="text-sm font-black text-white uppercase tracking-widest italic">Status de Convites</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {[
                  { email: 'joao.v@gmail.com', invited: '2h atrás', status: 'Enviado' },
                  { email: 'ana.f@outlook.com', invited: '1 dia atrás', status: 'Expirando' },
                ].map((inv, i) => (
                  <div key={i} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-white">{inv.email}</p>
                      <p className="text-[9px] text-zinc-600 uppercase font-black">{inv.invited}</p>
                    </div>
                    <Badge variant="outline" className={cn(
                      "text-[8px] font-black uppercase",
                      inv.status === 'Expirando' ? "text-rose-500 border-rose-500/20" : "text-zinc-500"
                    )}>{inv.status}</Badge>
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
