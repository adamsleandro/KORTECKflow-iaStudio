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
  Calendar,
  Clock,
  Shield,
  Camera,
  Target,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export function HR() {
  const [activeTab, setActiveTab] = useState('list');
  const [isVendedor, setIsVendedor] = useState(false);

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-zinc-500 mb-2 uppercase">
            <Users size={14} /> GESTÃO DE PESSOAS
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white uppercase tracking-tighter">Human Resources</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-white h-10 px-6 font-bold uppercase text-[10px] tracking-widest">
            <Network size={16} className="mr-2" /> Organograma
          </Button>
          <Button 
            className="bg-white text-black hover:bg-zinc-200 h-10 font-bold px-6 shadow-xl"
            onClick={() => setActiveTab('new')}
          >
            <Plus size={16} className="mr-2" /> Admitir Colaborador
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-transparent">
        <TabsList className="bg-white/5 border border-white/10 p-1 mb-8">
          <TabsTrigger value="list" className="data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400 text-xs font-bold px-8 h-8 tracking-widest uppercase">COLABORADORES</TabsTrigger>
          <TabsTrigger value="new" className="data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400 text-xs font-bold px-8 h-8 tracking-widest uppercase">ADMISSÃO</TabsTrigger>
          <TabsTrigger value="docs" className="data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400 text-xs font-bold px-8 h-8 tracking-widest uppercase">DOCUMENTAÇÃO & NR</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <Card className="bg-white/[0.02] border-white/5">
                <CardHeader>
                  <CardTitle className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Resumo Equipe</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex items-center justify-between">
                     <span className="text-sm font-bold text-zinc-400">Total</span>
                     <span className="text-2xl font-black text-white italic">42</span>
                   </div>
                   <Separator className="bg-white/5" />
                   <div className="space-y-2">
                     <div className="flex justify-between text-[10px] font-bold text-zinc-600 uppercase">
                       <span>Ativos</span>
                       <span className="text-emerald-500">40</span>
                     </div>
                     <div className="flex justify-between text-[10px] font-bold text-zinc-600 uppercase">
                       <span>Afastados</span>
                       <span className="text-amber-500">2</span>
                     </div>
                   </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-950 border-white/5 p-4">
                 <div className="flex items-center gap-2 text-rose-500 text-[10px] font-bold tracking-widest uppercase mb-4">
                   <AlertCircle size={14} /> Treinamentos Vencidos
                 </div>
                 <div className="space-y-3">
                   {[
                     { name: 'Ricardo Melo', type: 'NR-35', date: 'Vencido' },
                     { name: 'Sueli Rocha', type: 'ASO', date: 'Vencido' },
                   ].map((item, i) => (
                     <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                        <div>
                          <p className="text-[10px] font-bold text-white uppercase">{item.name}</p>
                          <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">{item.type}</p>
                        </div>
                        <Button size="icon" variant="ghost" className="h-6 w-6 text-rose-500"><ChevronRight size={14} /></Button>
                     </div>
                   ))}
                 </div>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card className="bg-white/[0.02] border-white/5">
                 <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <div className="relative w-64">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                       <Input className="pl-9 h-9 bg-black/20 border-white/10 text-xs text-white" placeholder="Filtrar colaboradores..." />
                    </div>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-600"><Filter size={16} /></Button>
                 </div>
                 <Table>
                    <TableHeader className="bg-white/[0.01]">
                       <TableRow className="border-white/5">
                          <TableHead className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Colaborador</TableHead>
                          <TableHead className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Cargo / Setor</TableHead>
                          <TableHead className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Status</TableHead>
                          <TableHead className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Contratação</TableHead>
                          <TableHead className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">Ação</TableHead>
                       </TableRow>
                    </TableHeader>
                    <TableBody>
                       {[
                         { name: 'Ana Beatriz', avatar: '1', role: 'Designer Sênior', dept: 'Criação', status: 'Ativo', type: 'CLT', supervisor: 'Eduardo' },
                         { name: 'Bruno Alves', avatar: '2', role: 'Operador CNC', dept: 'Produção', status: 'Ativo', type: 'CLT', supervisor: 'Roberto' },
                         { name: 'Clara Mendes', avatar: '3', role: 'Executiva Vendas', dept: 'Comercial', status: 'Ativo', type: 'CLT/PJ', supervisor: 'Ana' },
                         { name: 'Eduardo Souza', avatar: '4', role: 'Gerente Produção', dept: 'Industrial', status: 'Ativo', type: 'CLT', supervisor: 'Diretoria' },
                         { name: 'Fernanda Lima', avatar: '5', role: 'Arte Finalista', dept: 'Criação', status: 'Afastado', type: 'PJ', supervisor: 'Eduardo' },
                       ].map((c, i) => (
                         <TableRow key={i} className="border-white/5 hover:bg-white/[0.02] group">
                            <TableCell>
                               <div className="flex items-center gap-3">
                                  <Avatar className="w-8 h-8 border border-white/10">
                                     <AvatarImage src={`https://i.pravatar.cc/100?u=${c.name}`} />
                                  </Avatar>
                                  <div className="flex flex-col">
                                     <span className="text-sm font-bold text-white uppercase italic tracking-tight">{c.name}</span>
                                     <span className="text-[10px] text-zinc-500 font-medium">Sup: {c.supervisor}</span>
                                  </div>
                               </div>
                            </TableCell>
                            <TableCell>
                               <div className="flex flex-col">
                                  <span className="text-xs font-bold text-zinc-300">{c.role}</span>
                                  <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{c.dept}</span>
                               </div>
                            </TableCell>
                            <TableCell>
                               <Badge className={cn(
                                 "text-[8px] font-black border-0 px-1.5 h-3.5",
                                 c.status === 'Ativo' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                               )}>
                                 {c.status.toUpperCase()}
                               </Badge>
                            </TableCell>
                            <TableCell className="text-xs font-bold text-zinc-500">{c.type}</TableCell>
                            <TableCell className="text-right">
                               <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-700 hover:text-white"><MoreVertical size={14} /></Button>
                            </TableCell>
                         </TableRow>
                       ))}
                    </TableBody>
                 </Table>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="new" className="mt-0">
           <Card className="bg-white/[0.02] border-white/5 overflow-hidden">
              <CardHeader className="bg-white/[0.01] border-b border-white/5 p-8">
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/5 flex flex-col items-center justify-center text-zinc-700 group hover:text-white transition-all cursor-pointer">
                       <Camera size={24} />
                       <span className="text-[8px] font-black uppercase mt-1">FOTO</span>
                    </div>
                    <div>
                       <CardTitle className="text-2xl font-black text-white italic tracking-tighter">Formulário de Admissão Industrial</CardTitle>
                       <CardDescription className="text-zinc-500 uppercase tracking-widest font-bold text-[10px]">Preencha todos os campos operacionais obrigatórios</CardDescription>
                    </div>
                 </div>
              </CardHeader>
              <CardContent className="p-8">
                 <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Basic Info */}
                    <div className="md:col-span-8 space-y-6">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Nome Completo</Label>
                             <Input className="bg-black/40 border-white/10 text-white h-11" placeholder="Ex: João da Silva" />
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Data de Nascimento</Label>
                             <Input type="date" className="bg-black/40 border-white/10 text-white h-11" />
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                             <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Cargo Operacional</Label>
                             <Select onValueChange={(val) => setIsVendedor(val === 'comercial' || val === 'vendas')}>
                               <SelectTrigger className="bg-black/40 border-white/10 text-white h-11">
                                 <SelectValue placeholder="Selecione..." />
                               </SelectTrigger>
                               <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                  <SelectItem value="operador">Operador de Máquina</SelectItem>
                                  <SelectItem value="vendas">Executivo Comercial</SelectItem>
                                  <SelectItem value="designer">Arte Finalista / Designer</SelectItem>
                                  <SelectItem value="gestao">Supervisão / Gerência</SelectItem>
                               </SelectContent>
                             </Select>
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Nível</Label>
                             <Select>
                               <SelectTrigger className="bg-black/40 border-white/10 text-white h-11">
                                 <SelectValue placeholder="Selecione..." />
                               </SelectTrigger>
                               <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                  <SelectItem value="junior">Júnior / Auxiliar</SelectItem>
                                  <SelectItem value="pleno">Pleno</SelectItem>
                                  <SelectItem value="senior">Sênior / Especialista</SelectItem>
                                  <SelectItem value="lider">Líder / Supervisor</SelectItem>
                               </SelectContent>
                             </Select>
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Setor Industrial</Label>
                             <Select>
                               <SelectTrigger className="bg-black/40 border-white/10 text-white h-11">
                                 <SelectValue placeholder="Selecione..." />
                               </SelectTrigger>
                               <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                  <SelectItem value="producao">Produção</SelectItem>
                                  <SelectItem value="comercial">Comercial</SelectItem>
                                  <SelectItem value="criacao">Criação / Design</SelectItem>
                                  <SelectItem value="adm">Administrativo</SelectItem>
                                  <SelectItem value="logistica">Logística / PCP</SelectItem>
                               </SelectContent>
                             </Select>
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                             <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Carga Horária Mensal</Label>
                             <Input className="bg-black/40 border-white/10 text-white h-11" placeholder="Ex: 220h" />
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Data de Admissão</Label>
                             <Input type="date" className="bg-black/40 border-white/10 text-white h-11" />
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Tipo Contratação</Label>
                             <Select>
                               <SelectTrigger className="bg-black/40 border-white/10 text-white h-11">
                                 <SelectValue placeholder="Selecione..." />
                               </SelectTrigger>
                               <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                  <SelectItem value="clt">CLT</SelectItem>
                                  <SelectItem value="pj">PJ</SelectItem>
                                  <SelectItem value="estagio">Estagiário</SelectItem>
                               </SelectContent>
                             </Select>
                          </div>
                       </div>
                    </div>

                    {/* Financial / Permission Side */}
                    <div className="md:col-span-4 space-y-6">
                       <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl space-y-6 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-[40px] -mr-12 -mt-12" />
                          
                          <div className="space-y-4">
                             <div className="flex items-center gap-2 text-blue-400 text-[10px] font-black tracking-widest uppercase mb-4">
                               <DollarSign size={14} /> Financeiro & Acesso
                             </div>
                             
                             <div className="space-y-2">
                                <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Salário Base (R$)</Label>
                                <Input className="bg-black/80 border-white/10 text-emerald-400 font-bold h-11" placeholder="0,00" />
                             </div>

                             <Separator className="bg-white/5" />

                             <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                   <Label className="text-xs font-bold text-white tracking-tight leading-none">Perfil Vendedor</Label>
                                   <p className="text-[10px] text-zinc-600 font-medium italic">Ativa metas e comissões</p>
                                </div>
                                <Switch checked={isVendedor} onCheckedChange={setIsVendedor} />
                             </div>

                             <AnimatePresence>
                               {isVendedor && (
                                 <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-4 pt-2 overflow-hidden"
                                 >
                                    <div className="space-y-2">
                                       <Label className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Meta Mensal de Venda (R$)</Label>
                                       <Input className="bg-amber-500/5 border-amber-500/20 text-amber-500 font-bold h-10" placeholder="Ex: 150.000,00" />
                                    </div>
                                    <div className="space-y-2">
                                       <Label className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Comissão (%)</Label>
                                       <Input className="bg-amber-500/5 border-amber-500/20 text-amber-500 font-bold h-10" placeholder="Ex: 5%" />
                                    </div>
                                    <div className="flex items-center gap-2 p-2 bg-amber-500/10 rounded-lg border border-amber-500/10">
                                       <Shield size={12} className="text-amber-500" />
                                       <span className="text-[8px] font-black text-amber-500 uppercase">Acesso Comercial Ativado Manualmente</span>
                                    </div>
                                 </motion.div>
                               )}
                             </AnimatePresence>

                             <Separator className="bg-white/5" />
                             
                             <div className="space-y-2">
                                <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Supervisor Direto</Label>
                                <Select>
                                  <SelectTrigger className="bg-black/60 border-white/10 text-white h-11">
                                    <SelectValue placeholder="Selecione..." />
                                  </SelectTrigger>
                                  <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                     <SelectItem value="ed">Eduardo Souza</SelectItem>
                                     <SelectItem value="ana">Ana Beatriz</SelectItem>
                                     <SelectItem value="dir">Diretoria Geral</SelectItem>
                                  </SelectContent>
                                </Select>
                             </div>
                          </div>
                       </div>

                       <Button className="w-full bg-white text-black hover:bg-zinc-200 h-14 font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3">
                          <Plus size={20} /> EFETIVAR ADMISSÃO
                       </Button>
                    </div>
                 </div>
              </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
