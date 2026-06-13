import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Key, 
  Eye, 
  Edit3, 
  Trash2, 
  ShieldAlert, 
  BrainCircuit, 
  Activity,
  History,
  CheckCircle2,
  AlertTriangle,
  Users,
  Search,
  Filter,
  Save,
  Zap,
  Info,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface PermissionNode {
  module: string;
  read: boolean;
  write: boolean;
  delete: boolean;
  special: boolean;
}

const INITIAL_PERMS: Record<string, PermissionNode[]> = {
  'SUPER_ADMIN': [
    { module: 'COMERCIAL', read: true, write: true, delete: true, special: true },
    { module: 'PRODUÇÃO', read: true, write: true, delete: true, special: true },
    { module: 'RECURSOS HUMANOS', read: true, write: true, delete: true, special: true },
    { module: 'FINANCEIRO', read: true, write: true, delete: true, special: true },
    { module: 'SISTEMA', read: true, write: true, delete: true, special: true },
  ],
  'GESTOR_PROD': [
    { module: 'COMERCIAL', read: true, write: false, delete: false, special: false },
    { module: 'PRODUÇÃO', read: true, write: true, delete: true, special: true },
    { module: 'RECURSOS HUMANOS', read: true, write: false, delete: false, special: false },
    { module: 'FINANCEIRO', read: false, write: false, delete: false, special: false },
    { module: 'SISTEMA', read: false, write: false, delete: false, special: false },
  ],
  'OPERADOR': [
    { module: 'COMERCIAL', read: false, write: false, delete: false, special: false },
    { module: 'PRODUÇÃO', read: true, write: true, delete: false, special: false },
    { module: 'RECURSOS HUMANOS', read: false, write: false, delete: false, special: false },
    { module: 'FINANCEIRO', read: false, write: false, delete: false, special: false },
    { module: 'SISTEMA', read: false, write: false, delete: false, special: false },
  ]
};

export function Permissions() {
  const [selectedRole, setSelectedRole] = useState('GESTOR_PROD');
  const [perms, setPerms] = useState(INITIAL_PERMS);
  const [isSaving, setIsSaving] = useState(false);

  const togglePerm = (moduleName: string, type: keyof PermissionNode) => {
    const rolePerms = [...perms[selectedRole]];
    const nodeIndex = rolePerms.findIndex(n => n.module === moduleName);
    
    if (nodeIndex !== -1) {
      // @ts-ignore
      rolePerms[nodeIndex][type] = !rolePerms[nodeIndex][type];
      setPerms({ ...perms, [selectedRole]: rolePerms });
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-750 max-w-[1700px] mx-auto pb-24">
      {/* Mesh Permissions Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 border-b border-transparent pb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
             <div className="p-2.5 bg-blue-600/10 rounded-xl border border-blue-500/20">
                <Lock size={28} className="text-blue-500" />
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-[0.5em] text-zinc-500 uppercase">SECURITY PROTOCOL // MESH-CORE</span>
                <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                  Matriz de <span className="text-blue-600">Segurança</span>
                </h1>
             </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
           <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-blue-600 text-white hover:bg-blue-500 font-black h-14 px-10 text-[11px] uppercase tracking-widest shadow-sm shadow-blue-600/20 transition-all border-0"
          >
            {isSaving ? <Activity className="mr-3 animate-spin" size={18} /> : <Save className="mr-3" size={18} />}
            Salvar Hierarquia
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column: Role Selector */}
        <div className="xl:col-span-3 space-y-8">
          <Card className="bg-white dark:bg-zinc-900 border-transparent overflow-hidden">
            <div className="p-8 border-b border-transparent bg-white/[0.01]">
              <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">Perfis Operacionais</h3>
            </div>
            <div className="p-3 space-y-2">
              {[
                { id: 'SUPER_ADMIN', label: 'Super Admin', icon: <ShieldCheck size={18} />, desc: 'Acesso total IRRESTRITO' },
                { id: 'GESTOR_PROD', label: 'Gestor Produção', icon: <Activity size={18} />, desc: 'Gerência de fábrica e PCP' },
                { id: 'OPERADOR', label: 'Operador Padrão', icon: <Users size={18} />, desc: 'Execução e logs de chão' },
              ].map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={cn(
                    "w-full p-5 rounded-2xl flex items-start gap-5 transition-all text-left group border-none",
                    selectedRole === role.id ? "bg-white text-black shadow-sm" : "hover:bg-white/[0.02] hover:border-transparent"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-lg",
                    selectedRole === role.id ? "bg-blue-600 text-white" : "bg-zinc-900 text-zinc-600 group-hover:text-zinc-400"
                  )}>
                    {role.icon}
                  </div>
                  <div>
                    <p className={cn(
                      "text-[12px] font-black uppercase tracking-widest",
                      selectedRole === role.id ? "text-black italic" : "text-zinc-500"
                    )}>{role.label}</p>
                    <p className={cn(
                      "text-[9px] font-bold uppercase mt-1 tracking-tighter",
                      selectedRole === role.id ? "text-zinc-600" : "text-zinc-700"
                    )}>{role.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* AI Guardian Status */}
          <Card className="bg-gradient-to-br from-rose-600/10 to-transparent border-2 border-rose-500/20 overflow-hidden relative p-8">
            <div className="absolute top-0 right-0 p-6 opacity-10"><ShieldAlert size={60} className="text-rose-500" /></div>
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3 text-rose-500 text-[10px] font-black uppercase tracking-[0.3em]">
                 <ShieldAlert size={18} /> Cortex Risk Monitor
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                    <span>Threat Level</span>
                    <span className="text-rose-500 italic">Moderate Risk</span>
                 </div>
                 <Progress value={35} className="h-1 bg-white/5" />
                 <p className="text-xs text-zinc-500 leading-relaxed font-medium italic uppercase tracking-tighter">
                    O perfil <span className="text-white font-black">OPERADOR</span> possui permissão de escrita no módulo <span className="text-white font-black whitespace-nowrap">PRODUÇÃO [IA-CNC]</span> sem supervisão de timestamp. Perigo de fraude.
                 </p>
                 <Button variant="ghost" className="p-0 h-auto text-rose-500 text-[9px] font-black uppercase tracking-widest hover:text-rose-400">
                   Analyze Security Report <ChevronRight size={12} className="ml-1" />
                 </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Matrix Area */}
        <Card className="xl:col-span-9 zinc-900 border-transparent overflow-hidden rounded-3xl">
          <div className="p-8 border-b border-transparent bg-white/[0.01] flex flex-col md:flex-row md:items-center justify-between gap-6 px-10">
            <div>
              <CardTitle className="text-xl font-black text-white uppercase tracking-tight italic">Granular Matrix Access Control</CardTitle>
              <CardDescription className="text-[10px] font-bold text-zinc-600 uppercase mt-1 tracking-widest">Current Profile: {selectedRole}</CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-[9px] font-black uppercase text-zinc-500 tracking-widest bg-black/50 p-3 px-6 rounded-2xl border-none shadow-inner">
                <span className="flex items-center gap-2"><Eye size={16} className="text-blue-500" /> View</span>
                <span className="flex items-center gap-2"><Edit3 size={16} className="text-emerald-500" /> Write</span>
                <span className="flex items-center gap-2"><Trash2 size={16} className="text-rose-500" /> Delete</span>
                <span className="flex items-center gap-2"><Zap size={16} className="text-purple-500" /> Root</span>
            </div>
          </div>
          <div className="p-0">
             <div className="divide-y divide-white/5">
                {perms[selectedRole].map((perm, idx) => (
                  <div key={perm.module} className="p-8 px-10 flex flex-col md:flex-row md:items-center justify-between gap-8 group hover:bg-white/[0.01] transition-all border-l-4 border-transparent hover:border-blue-600">
                    <div className="flex items-center gap-6">
                       <div className="p-4 bg-white/[0.02] rounded-2xl border-none group-hover:bg-blue-600/10 group-hover:border-blue-600/20 transition-all">
                          <Key size={20} className="text-zinc-600 group-hover:text-blue-500" />
                       </div>
                       <div>
                          <h4 className="text-lg font-black text-white uppercase italic tracking-tighter">{perm.module}</h4>
                          <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mt-1">Módulos, Submódulos e Endpoints de API</p>
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-10">
                       {[
                         { icon: <Eye size={18} />, type: 'read', color: 'blue' },
                         { icon: <Edit3 size={18} />, type: 'write', color: 'emerald' },
                         { icon: <Trash2 size={18} />, type: 'delete', color: 'rose' },
                         { icon: <Zap size={18} />, type: 'special', color: 'purple' },
                       ].map((toggle) => (
                         <div key={toggle.type} className="flex flex-col items-center gap-3 group/toggle">
                            <Switch 
                               checked={perm[toggle.type as keyof PermissionNode] as boolean}
                               onCheckedChange={() => togglePerm(perm.module, toggle.type as keyof PermissionNode)}
                               className="data-[state=checked]:bg-blue-600 border-transparent"
                            />
                           <span className={cn(
                             "text-[9px] font-black uppercase tracking-tighter transition-colors",
                             perm[toggle.type as keyof PermissionNode] ? "text-zinc-400" : "text-zinc-700"
                           )}>
                             {toggle.type === 'special' ? 'Root' : toggle.type}
                           </span>
                         </div>
                       ))}
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </Card>
      </div>

      {/* Security Logs Area */}
      <Card className="bg-white dark:bg-zinc-900 border-transparent overflow-hidden rounded-3xl mt-8">
        <div className="p-8 border-b border-transparent bg-white/[0.01] flex flex-row items-center justify-between px-10">
          <CardTitle className="text-sm font-black text-white uppercase tracking-widest italic">Auditoria Global de Segurança</CardTitle>
          <Button variant="ghost" className="text-zinc-600 font-black text-[10px] uppercase tracking-widest h-10 px-6 border-none hover:text-white">
             Exportar Logs <History size={16} className="ml-3" />
          </Button>
        </div>
        <div className="p-0">
          <div className="divide-y divide-white/5">
             {[
               { user: 'Adams Leandro (Root)', action: 'Modificou Role: GESTOR_PROD', module: 'PRODUÇÃO', time: '10 min atrás', status: 'Verificado IA' },
               { user: 'Sistema Cortex', action: 'Bloqueio Automático: Tentativa Brute-force', module: 'AUTH', time: '2h atrás', status: 'Crítico' },
               { user: 'Ricardo Santos', action: 'Permissão especial concedida para Ana Julia', module: 'COMERCIAL', time: '5h atrás', status: 'Auditado' },
             ].map((log, i) => (
               <div key={i} className="p-6 px-10 flex items-center justify-between hover:bg-white/[0.01] transition-all">
                  <div className="flex items-center gap-6">
                     <div className="w-12 h-12 rounded-xl bg-zinc-900 border-none flex items-center justify-center text-zinc-700 group-hover:text-white transition-colors">
                        <History size={20} />
                     </div>
                     <div>
                        <div className="flex items-center gap-3">
                           <p className="text-xs font-black text-white italic uppercase">{log.user}</p>
                           <Badge className="bg-white/5 text-zinc-500 border-0 text-[8px] font-black uppercase tracking-widest">{log.module}</Badge>
                        </div>
                        <p className="text-[10px] text-zinc-600 font-black uppercase mt-1 tracking-widest">{log.action}</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-black text-emerald-500 italic uppercase tracking-widest">{log.status}</p>
                     <p className="text-[9px] font-black text-zinc-800 uppercase tracking-[0.2em] mt-1">{log.time}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
