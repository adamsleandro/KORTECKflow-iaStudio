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
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
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
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700 max-w-[1600px] mx-auto">
      {/* Header Permissões */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-blue-500 mb-2 uppercase">
            <Lock size={14} /> GESTÃO DE ACESSO [SYS-PERM]
          </div>
          <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">
            Matriz de Segurança<span className="text-blue-600">.</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-blue-600 text-white hover:bg-blue-500 font-bold h-11 px-8 text-[11px] uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(37,99,235,0.25)] transition-all"
          >
            {isSaving ? <Activity className="mr-2 animate-spin" size={16} /> : <Save className="mr-2" size={16} />}
            Salvar Hierarquia
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Role Selector */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="bg-[#111116] border-white/5 pb-2">
            <CardHeader className="bg-white/[0.01] border-b border-white/5">
              <CardTitle className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Perfis de Acesso</CardTitle>
            </CardHeader>
            <CardContent className="p-2 space-y-1">
              {[
                { id: 'SUPER_ADMIN', label: 'Super Admin', icon: <ShieldCheck size={14} />, desc: 'Acesso total IRRESTRITO' },
                { id: 'GESTOR_PROD', label: 'Gestor Produção', icon: <Activity size={14} />, desc: 'Gerência de fábrica e PCP' },
                { id: 'OPERADOR', label: 'Operador Padrão', icon: <Users size={14} />, desc: 'Execução e logs de chão' },
              ].map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={cn(
                    "w-full p-4 rounded-xl flex items-start gap-4 transition-all text-left group",
                    selectedRole === role.id ? "bg-blue-600/10 border border-blue-500/20" : "hover:bg-white/[0.02] border border-transparent"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                    selectedRole === role.id ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]" : "bg-zinc-900 text-zinc-500 group-hover:text-zinc-300"
                  )}>
                    {role.icon}
                  </div>
                  <div>
                    <p className={cn(
                      "text-[11px] font-black uppercase tracking-widest",
                      selectedRole === role.id ? "text-white italic" : "text-zinc-500"
                    )}>{role.label}</p>
                    <p className="text-[9px] text-zinc-600 font-bold uppercase mt-0.5">{role.desc}</p>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* AI Guardian Status */}
          <Card className="bg-gradient-to-br from-rose-600/10 to-transparent border border-rose-500/20 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-rose-500 text-[10px] font-black uppercase tracking-widest mb-4">
                 <ShieldAlert size={14} /> Avaliação de Risco IA
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-[10px] font-bold uppercase text-zinc-400">
                    <span>Vulnerabilidades</span>
                    <span className="text-rose-500 italic">02 Detectadas</span>
                 </div>
                 <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-600 w-1/3" />
                 </div>
                 <p className="text-[10px] text-zinc-500 leading-relaxed italic">
                    O perfil <span className="text-white">OPERADOR</span> possui permissão de escrita no módulo <span className="text-white">PRODUÇÃO</span> sem supervisão de timestamp. Perigo de fraude.
                 </p>
                 <Button variant="link" className="p-0 h-auto text-rose-500 text-[9px] font-black uppercase tracking-widest hover:text-rose-400">
                   Ver Relatório Completo IA
                 </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Matrix Area */}
        <Card className="lg:col-span-9 bg-[#111116] border-white/5 overflow-hidden">
          <CardHeader className="border-b border-white/5 bg-white/[0.01] flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-black text-white uppercase tracking-widest italic">Matriz de Permissões: {selectedRole}</CardTitle>
              <CardDescription className="text-[10px] font-bold text-zinc-500 uppercase mt-1">Configure o nível granular de acesso do perfil selecionado</CardDescription>
            </div>
            <div className="flex items-center gap-6 text-[9px] font-black uppercase text-zinc-500 tracking-widest">
                <span className="flex items-center gap-1.5"><Eye size={12} className="text-blue-500" /> Leitura</span>
                <span className="flex items-center gap-1.5"><Edit3 size={12} className="text-emerald-500" /> Escrita</span>
                <span className="flex items-center gap-1.5"><Trash2 size={12} className="text-rose-500" /> Deletar</span>
                <span className="flex items-center gap-1.5"><Zap size={12} className="text-purple-500" /> Admin</span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
             <div className="divide-y divide-white/5">
                {perms[selectedRole].map((perm, idx) => (
                  <div key={perm.module} className="p-6 flex items-center justify-between group hover:bg-white/[0.01] transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-1.5 h-6 bg-blue-600/40 rounded-full group-hover:bg-blue-600 transition-colors" />
                       <div>
                          <h4 className="text-sm font-black text-white uppercase italic tracking-tight">{perm.module}</h4>
                          <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Sub-módulos e API Endpoints</p>
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                       {[
                         { icon: <Eye size={16} />, type: 'read', color: 'peer-checked:bg-blue-600' },
                         { icon: <Edit3 size={16} />, type: 'write', color: 'peer-checked:bg-emerald-600' },
                         { icon: <Trash2 size={16} />, type: 'delete', color: 'peer-checked:bg-rose-600' },
                         { icon: <Zap size={16} />, type: 'special', color: 'peer-checked:bg-purple-600' },
                       ].map((toggle) => (
                         <div key={toggle.type} className="flex flex-col items-center gap-2">
                           <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50">
                             <Switch 
                                checked={perm[toggle.type as keyof PermissionNode] as boolean}
                                onCheckedChange={() => togglePerm(perm.module, toggle.type as keyof PermissionNode)}
                                className="data-[state=checked]:bg-blue-600"
                             />
                           </div>
                           <span className={cn(
                             "text-[8px] font-black uppercase tracking-tighter",
                             perm[toggle.type as keyof PermissionNode] ? "text-zinc-300" : "text-zinc-700"
                           )}>
                             {toggle.type === 'special' ? 'Root' : toggle.type}
                           </span>
                         </div>
                       ))}
                    </div>
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Logs Area */}
      <Card className="bg-[#111116] border-white/5 overflow-hidden">
        <CardHeader className="border-b border-white/5 bg-white/[0.01] flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-black text-white uppercase tracking-widest italic">Log de Alterações de Acesso</CardTitle>
          <Button variant="ghost" size="sm" className="text-zinc-500 font-black text-[9px] uppercase tracking-widest h-8 px-4">
             Exportar Auditoria <History size={14} className="ml-2" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-white/5">
             {[
               { user: 'Adams Leandro (Root)', action: 'Modificou Role: GESTOR_PROD', module: 'PRODUÇÃO', time: '10 min atrás', status: 'Verificado IA' },
               { user: 'Sistema Cortex', action: 'Bloqueio Automático: Tentativa Brute-force', module: 'AUTH', time: '2h atrás', status: 'Crítico' },
               { user: 'Ricardo Santos', action: 'Permissão especial concedida para Ana Julia', module: 'COMERCIAL', time: '5h atrás', status: 'Auditado' },
             ].map((log, i) => (
               <div key={i} className="p-4 px-6 flex items-center justify-between hover:bg-white/[0.01] transition-all">
                  <div className="flex items-center gap-4">
                     <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-600">
                        <History size={14} />
                     </div>
                     <div>
                        <div className="flex items-center gap-2">
                           <p className="text-[11px] font-bold text-white italic">{log.user}</p>
                           <Badge variant="outline" className="text-[8px] font-black uppercase text-zinc-500 border-white/5">{log.module}</Badge>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase mt-0.5">{log.action}</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-black text-emerald-500 italic uppercase">{log.status}</p>
                     <p className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">{log.time}</p>
                  </div>
               </div>
             ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
