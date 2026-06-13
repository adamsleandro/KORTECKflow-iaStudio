import React from 'react';
import { motion } from 'motion/react';
import { 
  Globe, 
  Building2, 
  Clock, 
  Shield, 
  ToggleLeft, 
  Cpu, 
  Cloud, 
  Database,
  Save,
  Check,
  AlertCircle,
  Server,
  Zap,
  Lock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useTheme } from '@/src/lib/ThemeContext';

export function GlobalSettings() {
  const { theme } = useTheme();
  const isLight = theme === 'ash-light';
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className={cn(
      "p-4 md:p-8 space-y-8 animate-in fade-in duration-750 min-h-screen transition-colors duration-500",
      isLight 
        ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-150/10 via-zinc-100 to-zinc-50"
        : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-[#050505] to-[#050505]"
    )}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-zinc-500 mb-2 uppercase">
            <Globe size={14} className="text-blue-500" /> Configurações Gerais [SYS-CFG-GLOB]
          </div>
          <h1 className={cn(
            "text-2xl md:text-3xl font-bold tracking-tight uppercase italic flex items-center gap-3",
            isLight ? "text-zinc-900" : "text-white"
          )}>
             Gestão Estrutural do Sistema <Badge className="bg-blue-600/10 text-blue-500 border-blue-500/20 text-[10px] font-black italic">ROOT ACCESS</Badge>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest"
            >
              <Check size={14} /> Alterações Salvas
            </motion.div>
          )}
          <Button 
            disabled={isSaving}
            onClick={handleSave}
            className="bg-blue-600 text-white hover:bg-blue-700 font-black text-[10px] uppercase tracking-widest px-8 h-10 min-w-[160px]"
          >
             {isSaving ? "Sincronizando..." : <><Save size={14} className="mr-2" /> Salvar Configurações</>}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 p-1 h-auto flex flex-wrap gap-1">
          <TabsTrigger value="company" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-[10px] font-black uppercase tracking-widest px-6 py-2.5 italic">
             <Building2 size={14} className="mr-2" /> Perfil Empresa
          </TabsTrigger>
          <TabsTrigger value="localization" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-[10px] font-black uppercase tracking-widest px-6 py-2.5 italic">
             <Globe size={14} className="mr-2" /> Localização
          </TabsTrigger>
          <TabsTrigger value="modules" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-[10px] font-black uppercase tracking-widest px-6 py-2.5 italic">
             <Cpu size={14} className="mr-2" /> Módulos Ativos
          </TabsTrigger>
          <TabsTrigger value="infrastructure" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-[10px] font-black uppercase tracking-widest px-6 py-2.5 italic">
             <Cloud size={14} className="mr-2" /> Infraestrutura
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-6">
            <TabsContent value="company" className="mt-0 space-y-6 animate-in slide-in-from-left-2 duration-500">
              <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <CardHeader className="bg-zinc-50/50 dark:bg-white/[0.02] border-b border-zinc-200 dark:border-transparent p-6">
                  <CardTitle className={cn("text-sm font-black uppercase italic tracking-widest flex items-center gap-2", isLight ? "text-zinc-950" : "text-white")}>
                    <Building2 size={16} className="text-blue-500" /> Identidade Corporativa
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Razão Social</Label>
                      <Input defaultValue="KORTECK COMUNICACAO VISUAL LTDA" className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-transparent text-zinc-900 dark:text-white text-xs font-bold h-10" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Nome Fantasia</Label>
                      <Input defaultValue="KORTECK INDUSTRIES" className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-transparent text-zinc-900 dark:text-white text-xs font-bold h-10" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">CNPJ (Tax ID)</Label>
                      <Input defaultValue="00.000.000/0001-00" className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-transparent text-zinc-900 dark:text-white text-xs font-bold h-10" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Inscrição Estadual</Label>
                      <Input defaultValue="ISENTO" className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-transparent text-zinc-900 dark:text-white text-xs font-bold h-10" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <CardHeader className="bg-zinc-50/50 dark:bg-white/[0.02] border-b border-zinc-200 dark:border-transparent p-6">
                  <CardTitle className={cn("text-xs font-black uppercase italic tracking-[0.2em] flex items-center gap-2", isLight ? "text-zinc-950" : "text-white")}>
                    <Globe size={16} className="text-zinc-500" /> Endereços & Contato
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">E-mail Administrativo</Label>
                      <Input defaultValue="admin@korteck.com.br" className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-transparent text-zinc-900 dark:text-white text-xs font-bold h-10" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Telefone Central</Label>
                      <Input defaultValue="+55 (11) 4004-0000" className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-transparent text-zinc-900 dark:text-white text-xs font-bold h-10" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Logradouro Completo</Label>
                    <Input defaultValue="Av. Industrial, 1000 - Setor Alfa, São Paulo - SP" className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-transparent text-zinc-900 dark:text-white text-xs font-bold h-10" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="localization" className="mt-0 space-y-6 animate-in slide-in-from-left-2 duration-500">
              <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <CardHeader className="bg-zinc-50/50 dark:bg-white/[0.02] border-b border-zinc-200 dark:border-transparent p-6">
                  <CardTitle className={cn("text-sm font-black uppercase italic tracking-widest flex items-center gap-2", isLight ? "text-zinc-950" : "text-white")}>
                    <Globe size={16} className="text-blue-500" /> Sincronização de Região
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Idioma Nativo do Sistema</Label>
                      <Select defaultValue="pt-BR">
                        <SelectTrigger className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-transparent text-zinc-900 dark:text-white text-xs font-bold h-10">
                          <SelectValue placeholder="Selecione o Idioma" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 text-zinc-900 dark:text-white">
                          <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                          <SelectItem value="en-US">English (USA)</SelectItem>
                          <SelectItem value="es-ES">Español</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Timezone Operacional</Label>
                      <Select defaultValue="america-sp">
                        <SelectTrigger className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-transparent text-zinc-900 dark:text-white text-xs font-bold h-10">
                          <SelectValue placeholder="Selecione o Fuso" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 text-zinc-900 dark:text-white">
                          <SelectItem value="america-sp">UTC-3 (São Paulo)</SelectItem>
                          <SelectItem value="utc">UTC (Greenwich)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Moeda de Auditoria</Label>
                      <Select defaultValue="brl">
                        <SelectTrigger className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-transparent text-zinc-900 dark:text-white text-xs font-bold h-10">
                          <SelectValue placeholder="Selecione a Moeda" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 text-zinc-900 dark:text-white">
                          <SelectItem value="brl">BRL (R$)</SelectItem>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Formato de Data</Label>
                      <Select defaultValue="ddmmyyyy">
                        <SelectTrigger className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-transparent text-zinc-900 dark:text-white text-xs font-bold h-10">
                          <SelectValue placeholder="Formato" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 text-zinc-900 dark:text-white">
                          <SelectItem value="ddmmyyyy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="yyyymmdd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="modules" className="mt-0 space-y-6 animate-in slide-in-from-left-2 duration-500">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { id: 'com', label: 'Gestão Comercial', icon: <Building2 />, desc: 'Módulos de venda, CRM e propostas.' },
                    { id: 'prod', label: 'Controle de Produção', icon: <Zap />, desc: 'PCP, Chão de fábrica e monitoramento CNC.' },
                    { id: 'fin', label: 'Financeiro Core', icon: <Database />, desc: 'Pagamentos, fluxos e auditoria fiscal.' },
                    { id: 'stock', label: 'Módulo de Estoque', icon: <Server />, desc: 'Giro de matéria-prima e insumos.' },
                    { id: 'hr', label: 'Recursos Humanos', icon: <ToggleLeft />, desc: 'Gestão de carreiras e documentação.' },
                    { id: 'edu', label: 'Educação Corporativa', icon: <Shield />, desc: 'Portal de treinamento e certificações.' },
                  ].map((module) => (
                    <Card key={module.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/20 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 shrink-0">
                               {React.cloneElement(module.icon as React.ReactElement, { size: 20 })}
                            </div>
                            <div>
                               <h4 className={cn("text-xs font-black uppercase italic tracking-widest", isLight ? "text-zinc-900" : "text-white")}>{module.label}</h4>
                               <p className="text-[10px] text-zinc-500 mt-1">{module.desc}</p>
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
               </div>
            </TabsContent>

            <TabsContent value="infrastructure" className="mt-0 space-y-6 animate-in slide-in-from-left-2 duration-500">
               <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                  <div className="bg-zinc-50/50 dark:bg-white/[0.02] border-b border-zinc-200 dark:border-transparent p-6 flex items-center justify-between">
                     <CardTitle className={cn("text-sm font-black uppercase italic tracking-widest flex items-center gap-2", isLight ? "text-zinc-950" : "text-white")}>
                        <Cloud size={16} className="text-blue-500" /> Status da Infraestrutura Cloud
                     </CardTitle>
                     <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[9px] font-black uppercase tracking-widest">System Healthy</Badge>
                  </div>
                  <div className="p-8 space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          { label: 'SERVIDORES API', status: 'Online', color: 'text-emerald-500' },
                          { label: 'BANCO DE DADOS', status: 'Online', color: 'text-emerald-500' },
                          { label: 'STORAGE S3', status: 'Online', color: 'text-emerald-500' },
                        ].map((s) => (
                          <div key={s.label} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-transparent text-center">
                             <div className="text-[9px] font-black text-zinc-500 dark:text-zinc-600 uppercase tracking-widest mb-1">{s.label}</div>
                             <div className={cn("text-xs font-black italic uppercase tracking-wider", s.color)}>{s.status}</div>
                          </div>
                        ))}
                     </div>

                     <div className="space-y-4">
                        <div className="flex justify-between items-center px-1">
                           <div className={cn("text-[10px] font-black uppercase tracking-widest flex items-center gap-2", isLight ? "text-zinc-850" : "text-white")}>
                              <Database size={14} className="text-blue-500" /> Uso de Armazenamento Global
                           </div>
                           <div className="text-[10px] font-black text-zinc-550 dark:text-zinc-500">42.8 GB / 100 GB</div>
                        </div>
                        <div className="h-2 w-full bg-zinc-100 dark:bg-white/5 rounded-full overflow-hidden">
                           <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: '42.8%' }}
                              className="h-full bg-blue-600" 
                           />
                        </div>
                     </div>
                  </div>
               </Card>
            </TabsContent>
          </div>

          <div className="space-y-6">
            <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 shadow-2xl flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shadow-[0_0_50px_rgba(245,158,11,0.15)]">
                 <AlertCircle size={40} />
              </div>
              <div>
                 <h4 className="text-sm font-black uppercase italic tracking-[0.2em] mb-2 text-amber-500">Aviso de Segurança</h4>
                 <p className="text-xs text-zinc-500 dark:text-zinc-500 font-medium leading-relaxed italic">
                    Modificações nessas configurações podem afetar a visibilidade de dados e a performance operacional de todos os usuários do sistema <span className={cn(isLight ? "text-zinc-950 font-bold" : "text-white")}>ERP KORTECK</span>.
                 </p>
              </div>
              <Separator className="bg-zinc-150 dark:bg-white/5" />
              <div className="w-full space-y-4">
                 <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 rounded-lg bg-zinc-50 dark:bg-white/5 flex items-center justify-center text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-transparent">
                       <Lock size={16} />
                    </div>
                    <div>
                       <div className={cn("text-[9px] font-black uppercase tracking-widest", isLight ? "text-zinc-850" : "text-white")}>Logs de Auditoria</div>
                       <div className="text-[8px] text-zinc-550 dark:text-zinc-650 font-bold uppercase">Última alteração: Hoje, 09:42</div>
                    </div>
                 </div>
              </div>
            </Card>

            <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
               <CardHeader className="bg-zinc-50/50 dark:bg-white/[0.02] border-b border-zinc-200 dark:border-transparent p-6">
                  <CardTitle className={cn("text-xs font-black uppercase italic tracking-[0.2em] flex items-center gap-2", isLight ? "text-zinc-850" : "text-white")}>
                     <Clock size={16} className="text-blue-500" /> Manutenção Agendada
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-6">
                  <div className="flex gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-150 dark:border-transparent">
                     <div className="w-10 h-10 rounded-lg bg-blue-600 flex flex-col items-center justify-center text-white shrink-0">
                        <span className="text-[10px] font-black leading-none">12</span>
                        <span className="text-[8px] font-black uppercase">MAI</span>
                     </div>
                     <div>
                        <div className={cn("text-[10px] font-black uppercase tracking-widest", isLight ? "text-zinc-800" : "text-white")}>Atualização de Kernel</div>
                        <div className="text-[9px] text-zinc-550 dark:text-zinc-500 font-medium">02:00 - 04:00 (Fuso Local)</div>
                     </div>
                  </div>
               </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
