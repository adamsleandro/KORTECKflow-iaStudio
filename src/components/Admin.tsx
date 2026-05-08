import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Users, 
  Lock, 
  Fingerprint, 
  Activity, 
  ShieldAlert, 
  Key, 
  ChevronRight, 
  MoreVertical,
  Cpu,
  BrainCircuit,
  Zap,
  Globe,
  Database,
  History,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function Admin() {
  const [activeTab, setActiveTab] = useState('gest-adm');
  const [isAiAuditRunning, setIsAiAuditRunning] = useState(false);

  const startAiAudit = () => {
    setIsAiAuditRunning(true);
    setTimeout(() => setIsAiAuditRunning(false), 3000);
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700 max-w-[1600px] mx-auto">
      {/* Header Admin */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-blue-500 mb-2 uppercase">
            <ShieldCheck size={14} /> ADMINISTRAÇÃO DO SISTEMA [SYS-ADM-GEST]
          </div>
          <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">
            Centro de Controle<span className="text-blue-600">.</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={startAiAudit}
            disabled={isAiAuditRunning}
            className="bg-blue-600 text-white hover:bg-blue-500 font-bold h-11 px-6 text-[10px] uppercase tracking-widest shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all"
          >
            {isAiAuditRunning ? (
              <><Cpu className="mr-2 animate-spin" size={14} /> Analisando Heurísticas...</>
            ) : (
              <><BrainCircuit className="mr-2" size={14} /> Auditoria IA Completa</>
            )}
          </Button>
          <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-white h-11 px-6 text-[10px] uppercase font-black">
            Logs Globais
          </Button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Admins Ativos', value: '04', trend: 'Nível Root', icon: <Lock className="text-blue-500" /> },
          { label: 'Tempo de Atividade', value: '99.98%', trend: 'Estável', icon: <Globe className="text-emerald-500" /> },
          { label: 'Score de Segurança', value: '98/100', trend: 'A+', icon: <ShieldAlert className="text-purple-500" /> },
          { label: 'Latência na Nuvem', value: '24ms', trend: 'Região BR', icon: <Zap className="text-amber-500" /> },
        ].map((stat, i) => (
          <Card key={i} className="bg-[#111116] border-white/5 relative overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{stat.label}</span>
                <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center">
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
        {/* Left Column: Admin Management */}
        <Card className="lg:col-span-8 bg-[#111116] border-white/5 overflow-hidden">
          <CardHeader className="border-b border-white/5 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-black text-white uppercase tracking-widest italic">Gestão de Administradores</CardTitle>
              <CardDescription className="text-[10px] font-bold text-zinc-500 uppercase mt-1">Hierarquia de acesso e privilégios de sistema</CardDescription>
            </div>
            <Button size="sm" className="bg-white/5 hover:bg-white/10 text-white h-8 text-[9px] font-black uppercase border border-white/10">
              <Plus size={12} className="mr-1" /> Novo Root Admin
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {[
                { name: 'Adams Leandro', role: 'Super Admin', level: 'Nível 0 (Root)', status: 'Ativo', email: 'adams@korteck.com', lastLogin: '10 min atrás' },
                { name: 'Ricardo Santos', role: 'Gerente TI', level: 'Nível 1', status: 'Ativo', email: 'ricardo@korteck.com', lastLogin: '2h atrás' },
                { name: 'Elena Meyer', role: 'Finanças', level: 'Nível 1', status: 'Inativo', email: 'elena@korteck.com', lastLogin: '3 dias atrás' },
                { name: 'Sistema Cortex', role: 'Agente IA', level: 'Daemon', status: 'Ativo', email: 'ai@korteck.local', lastLogin: 'Tempo Real' },
              ].map((admin, i) => (
                <div key={i} className="p-5 flex items-center justify-between hover:bg-white/[0.01] transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:border-blue-500/50 transition-all font-black text-sm italic">
                      {admin.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-black text-white italic uppercase tracking-tight">{admin.name}</h4>
                        <Badge className={cn(
                          "text-[8px] font-black uppercase h-4 px-1.5",
                          admin.status === 'Active' ? "bg-emerald-500/10 text-emerald-500 border-0" : "bg-zinc-800 text-zinc-500 border-0"
                        )}>
                          {admin.status}
                        </Badge>
                      </div>
                      <p className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase mt-0.5">{admin.email} • {admin.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-white italic">{admin.level}</p>
                      <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{admin.lastLogin}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-zinc-600 hover:text-white">
                      <MoreVertical size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Column: AI Insights & Security */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI Security Insight */}
          <Card className="bg-gradient-to-br from-blue-600/10 to-indigo-900/10 border border-blue-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl -mr-16 -mt-16 rounded-full" />
            <CardHeader>
              <div className="flex items-center gap-2 text-blue-400 text-[10px] font-black tracking-[0.2em] mb-2 uppercase">
                <BrainCircuit size={14} className="animate-pulse" /> Cortex AI Audit
              </div>
              <CardTitle className="text-sm font-black text-white uppercase italic tracking-widest">Diagnóstico de Segurança</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                  <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold text-white uppercase italic tracking-tight">Criptografia E2E Ativa</p>
                    <p className="text-[10px] text-zinc-500 leading-relaxed">Todos os canais de dados industriais estão sob AES-256 GCM.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-500/5 border border-rose-500/10">
                  <AlertTriangle size={16} className="text-rose-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold text-rose-400 uppercase italic tracking-tight">Alerta de Permissão</p>
                    <p className="text-[10px] text-zinc-500 leading-relaxed">
                      O usuário <span className="text-white font-bold">#Marcos_OPS</span> possui nível 1 em PCP mas acessou logs de faturamento. <span className="text-rose-400">Recomendar restrição?</span>
                    </p>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest h-10 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                Aplicar Correções IA
              </Button>
            </CardContent>
          </Card>

          {/* System Performance Tracker */}
          <Card className="bg-[#111116] border-white/5">
            <CardHeader className="border-b border-white/5 bg-white/[0.01]">
              <CardTitle className="text-sm font-black text-white uppercase tracking-widest italic">Carga do Sistema</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {[
                { label: 'Uso de CPU', val: 12, color: 'text-blue-500' },
                { label: 'E/S Banco de Dados', val: 45, color: 'text-blue-500' },
                { label: 'Requisições API', val: 78, color: 'text-emerald-500' },
                { label: 'Memória', val: 22, color: 'text-blue-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-zinc-500">{item.label}</span>
                    <span className={item.color}>{item.val}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.val}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Access Logs Footer Section */}
      <Card className="bg-[#111116] border-white/5 overflow-hidden">
        <CardHeader className="border-b border-white/5 bg-white/[0.01] flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-black text-white uppercase tracking-widest italic">Auditoria de Acesso em Tempo Real</CardTitle>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Monitoramento ao Vivo</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px] font-medium border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.01]">
                  <th className="px-6 py-3 text-zinc-500 uppercase tracking-widest font-black">Timestamp</th>
                  <th className="px-6 py-3 text-zinc-500 uppercase tracking-widest font-black">Evento</th>
                  <th className="px-6 py-3 text-zinc-500 uppercase tracking-widest font-black">Módulo</th>
                  <th className="px-6 py-3 text-zinc-500 uppercase tracking-widest font-black">IP / Agent</th>
                  <th className="px-6 py-3 text-zinc-500 uppercase tracking-widest font-black text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { time: '12:04:52', event: 'Alteração Global de Config.', module: 'Sistema', src: '192.168.1.1', status: 'SUCESSO' },
                  { time: '12:01:10', event: 'Rotação de Secret da API', module: 'Autenticação', src: 'Cortex-AI', status: 'SUCESSO' },
                  { time: '11:58:34', event: 'Padrão de Acesso Incomum', module: 'Comercial', src: '177.34.22.1', status: 'AVISO' },
                  { time: '11:45:00', event: 'Backup de Banco de Dados', module: 'Infraestrutura', src: 'AWS-Instância', status: 'SUCESSO' },
                ].map((log, i) => (
                  <tr key={i} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-4 font-mono text-zinc-400">{log.time}</td>
                    <td className="px-6 py-4 text-white font-bold italic uppercase">{log.event}</td>
                    <td className="px-6 py-4 text-zinc-500 uppercase tracking-tight">{log.module}</td>
                    <td className="px-6 py-4 text-zinc-600 italic">{log.src}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={cn(
                        "text-[9px] font-black px-2 py-0.5 rounded-full",
                        log.status === 'SUCESSO' ? "text-emerald-500 bg-emerald-500/10" : "text-amber-500 bg-amber-500/10"
                      )}>{log.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
