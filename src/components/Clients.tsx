import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Target, 
  TrendingUp, 
  Mail, 
  Search, 
  Plus, 
  MoreVertical, 
  Star, 
  Zap, 
  PieChart, 
  BarChart3, 
  Filter, 
  Download, 
  ShieldCheck, 
  Cpu, 
  Sparkles,
  SearchCode,
  Building2,
  Globe,
  Phone,
  FileText,
  AlertCircle,
  ArrowRight,
  UserPlus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { GoogleGenAI } from "@google/genai";

// Mock Data
const CLIENTS_MOCK = [
  { id: '1', name: 'KORTECK INDUSTRIES', cnpj: '12.345.678/0001-90', segment: 'Comunicação Visual', score: 95, rfm: 'Promotor', lastPurchase: '2 dias atrás' },
  { id: '2', name: 'ZETA TECH SOLUTIONS', cnpj: '11.222.333/0001-00', segment: 'Tech', score: 82, rfm: 'Fiel', lastPurchase: '10 dias atrás' },
  { id: '3', name: 'ALFA CONSTRUTORA', cnpj: '33.444.555/0001-11', segment: 'Construção', score: 45, rfm: 'Risco', lastPurchase: '45 dias atrás' },
  { id: '4', name: 'OMEGA LOGISTICA', cnpj: '55.666.777/0001-22', segment: 'Transporte', score: 70, rfm: 'Dormindo', lastPurchase: '30 dias atrás' },
];

export function Clients({ initialTab = 'cli-list' }: { initialTab?: string }) {
  const [activeTab, setActiveTab ] = useState(initialTab);
  const [cnpjValue, setCnpjValue] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState<any>(null);
  const [aiInsights, setAiInsights] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Gemini Setup
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const fetchAiInsights = async (module: string) => {
    setIsAiLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analise a aba "${module}" de um sistema de CRM para Comunicação Visual. Forneça 3 insights estratégicos curtos focado em performance, retenção e expansão de mercado baseados em comportamentos de clientes atuais. responda em português, use um tom executivo e minimalista. formate com bullets.`,
      });
      setAiInsights(response.text || 'Ocorreu um erro ao gerar insights.');
    } catch (err) {
      setAiInsights('Erro ao conectar com a Inteligência Operacional Korteck.');
    } finally {
      setIsAiLoading(false);
    }
  };

  useEffect(() => {
    fetchAiInsights(activeTab);
  }, [activeTab]);

  const handleCnpjLookup = async () => {
    if (cnpjValue.length < 14) return;
    setLookupLoading(true);
    // Simulating internet lookup
    setTimeout(() => {
      setLookupResult({
        name: 'EMPRESA ENCONTRADA VIA GOOGLE/RECEITA',
        address: 'Av. Paulista, 1000 - São Paulo, SP',
        email: 'contato@empresa.com.br',
        phone: '(11) 9999-9999',
        segment: 'Tecnologia & Inovação',
        status: 'Ativa'
      });
      setLookupLoading(false);
    }, 1500);
  };

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-750 max-w-[1700px] mx-auto pb-24">
      {/* Mesh Clients Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 border-b border-white/5 pb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
             <div className="p-2.5 bg-blue-600/10 rounded-xl border border-blue-500/20">
                <Users size={28} className="text-blue-500" />
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-[0.5em] text-zinc-500 uppercase italic">OPERATIONAL ENGINE // CRM</span>
                <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                  Gestão de <span className="text-blue-600">Clientes</span>
                </h1>
             </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
           <Button variant="ghost" className="h-14 border-white/5 text-zinc-500 hover:text-white uppercase font-black text-[10px] tracking-widest px-8">
              <Download size={18} className="mr-3" /> Export Dados
           </Button>
           <Button 
            className="bg-blue-600 text-white hover:bg-blue-500 font-black h-14 px-10 text-[11px] uppercase tracking-widest shadow-2xl shadow-blue-600/20 transition-all border-0"
          >
            <Plus className="mr-3" size={18} /> Novo Contrato
          </Button>
        </div>
      </div>

      {/* Stats Cluster */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: 'Total de Clientes', val: '1.248', trend: '+12% este mês', icon: <Users className="text-blue-500" /> },
          { label: 'LTV Médio', val: 'R$ 18.5k', trend: '+5.4% growth', icon: <TrendingUp className="text-blue-500" /> },
          { label: 'Churn Rate', val: '2.4%', trend: 'Nível Estável', icon: <AlertCircle className="text-rose-500" /> },
          { label: 'Market Share', val: '14.2%', trend: '+2.1% share', icon: <Building2 className="text-blue-500" /> },
        ].map((stat, i) => (
          <Card key={i} className="bg-[#0c0c10] border-white/5 p-8 relative overflow-hidden group hover:border-blue-600/20 transition-all">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
               {stat.icon}
            </div>
            <div className="relative z-10 space-y-4">
               <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">{stat.label}</h4>
               <p className="text-4xl font-black text-white italic tracking-tighter uppercase">{stat.val}</p>
               <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest italic">
                  <Zap size={10} className="fill-emerald-500" /> {stat.trend}
               </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-[#0c0c10] border border-white/5 p-1 h-auto flex flex-wrap gap-1">
          <TabsTrigger value="cli-list" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-[10px] font-black uppercase tracking-widest px-8 py-3 italic">
            Listagem Global
          </TabsTrigger>
          <TabsTrigger value="cli-seg" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-[10px] font-black uppercase tracking-widest px-8 py-3 italic">
            Segmentação IA
          </TabsTrigger>
          <TabsTrigger value="cli-rfm" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-[10px] font-black uppercase tracking-widest px-8 py-3 italic">
            Análise RFM
          </TabsTrigger>
          <TabsTrigger value="cli-camp" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-[10px] font-black uppercase tracking-widest px-8 py-3 italic">
            Central de Campanhas
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3">
            <TabsContent value="cli-list" className="mt-0 space-y-6 animate-in slide-in-from-left-4 duration-500">
               {/* CNPJ Lookup Section */}
               <Card className="bg-[#0c0c10] border-white/5 border-l-4 border-l-blue-600 overflow-hidden">
                  <CardHeader className="bg-white/[0.02] p-6 border-b border-white/5">
                    <CardTitle className="text-xs font-black text-white uppercase italic tracking-widest flex items-center gap-2">
                      <SearchCode size={16} className="text-blue-500" /> Lookup Inteligente de CNPJ
                    </CardTitle>
                    <CardDescription className="text-[10px] font-bold text-zinc-500 uppercase">Auto-completa dados via Receita Federal e Big Data</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                     <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                           <div className="relative">
                              <Input 
                                placeholder="Digite o CNPJ para busca..." 
                                className="bg-[#050505] border-white/5 text-white h-12 text-sm font-bold tracking-widest pl-12"
                                value={cnpjValue}
                                onChange={(e) => setCnpjValue(e.target.value)}
                              />
                              <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                           </div>
                        </div>
                        <Button 
                          onClick={handleCnpjLookup}
                          disabled={lookupLoading}
                          className="h-12 px-8 bg-white text-black font-black uppercase italic text-[11px] hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        >
                          {lookupLoading ? 'ESCANEANDO...' : <><Search size={16} className="mr-2" /> CONSULTAR</>}
                        </Button>
                     </div>

                     <AnimatePresence>
                        {lookupResult && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 p-6 rounded-2xl bg-blue-600/5 border border-blue-600/20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                          >
                             <div className="space-y-1">
                                <div className="text-[9px] font-black text-blue-500 uppercase italic tracking-widest">Razão Social</div>
                                <div className="text-xs font-bold text-white uppercase">{lookupResult.name}</div>
                             </div>
                             <div className="space-y-1">
                                <div className="text-[9px] font-black text-blue-500 uppercase italic tracking-widest">Segmento</div>
                                <div className="text-xs font-bold text-white uppercase">{lookupResult.segment}</div>
                             </div>
                             <div className="space-y-1">
                                <div className="text-[9px] font-black text-blue-500 uppercase italic tracking-widest">Localização</div>
                                <div className="text-xs font-bold text-white uppercase truncate">{lookupResult.address}</div>
                             </div>
                             <div className="flex items-center justify-end">
                                <Button size="sm" className="bg-emerald-500 text-white hover:bg-emerald-600 text-[9px] font-black uppercase italic tracking-widest h-8 px-4">
                                   <Plus size={12} className="mr-1.2" /> Importar para Base
                                </Button>
                             </div>
                          </motion.div>
                        )}
                     </AnimatePresence>
                  </CardContent>
               </Card>

               <Card className="bg-[#0c0c10] border-white/5 overflow-hidden">
                  <CardHeader className="bg-white/[0.02] p-6 flex flex-row items-center justify-between border-b border-white/5">
                    <div className="flex gap-4">
                       <Input placeholder="Filtrar por nome, cnpj ou tag..." className="bg-white/5 border-0 text-[10px] font-bold uppercase tracking-widest w-64 h-9" />
                       <Button variant="outline" className="border-white/5 text-[9px] font-black uppercase h-9"><Filter size={14} className="mr-2" /> Segmentos</Button>
                    </div>
                    <div className="text-[10px] font-black text-zinc-500 italic uppercase">Exibindo {CLIENTS_MOCK.length} de 1,248 resultados</div>
                  </CardHeader>
                  <ScrollArea className="h-[600px]">
                     <div className="p-2">
                        <table className="w-full text-left">
                           <thead>
                              <tr className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] italic border-b border-white/5">
                                 <th className="p-4">Cliente</th>
                                 <th className="p-4">CNPJ</th>
                                 <th className="p-4">Score IA</th>
                                 <th className="p-4">Perfil RFM</th>
                                 <th className="p-4">Última Compra</th>
                                 <th className="p-4"></th>
                              </tr>
                           </thead>
                           <tbody>
                              {CLIENTS_MOCK.map((client) => (
                                <tr key={client.id} className="group hover:bg-white/[0.02] border-b border-white/5 transition-colors">
                                   <td className="p-4">
                                      <div className="flex items-center gap-4">
                                         <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-black italic border border-white/5 text-blue-500">
                                            {client.name.charAt(0)}
                                         </div>
                                         <div className="flex flex-col">
                                            <span className="text-xs font-bold text-white uppercase italic tracking-tight group-hover:text-blue-500 transition-colors">{client.name}</span>
                                            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{client.segment}</span>
                                         </div>
                                      </div>
                                   </td>
                                   <td className="p-4 text-[10px] font-bold text-zinc-400 tracking-widest">{client.cnpj}</td>
                                   <td className="p-4">
                                      <div className="flex items-center gap-3">
                                         <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div 
                                              initial={{ width: 0 }}
                                              animate={{ width: `${client.score}%` }}
                                              className={cn("h-full", client.score > 80 ? 'bg-emerald-500' : client.score > 50 ? 'bg-amber-500' : 'bg-rose-500')} 
                                            />
                                         </div>
                                         <span className="text-[10px] font-black italic text-white">{client.score}</span>
                                      </div>
                                   </td>
                                   <td className="p-4">
                                      <Badge 
                                        variant="outline" 
                                        className={cn(
                                          "text-[8px] font-black uppercase italic h-5 border-0",
                                          client.rfm === 'Promotor' ? 'bg-emerald-500/10 text-emerald-500' :
                                          client.rfm === 'Fiel' ? 'bg-blue-500/10 text-blue-500' :
                                          client.rfm === 'Dormindo' ? 'bg-amber-500/10 text-amber-500' : 'bg-rose-500/10 text-rose-500'
                                        )}
                                      >
                                        {client.rfm}
                                      </Badge>
                                   </td>
                                   <td className="p-4 text-[9px] font-black text-zinc-500 uppercase italic opacity-60 group-hover:opacity-100 transition-opacity">{client.lastPurchase}</td>
                                   <td className="p-4">
                                      <button className="text-zinc-700 hover:text-white transition-colors">
                                         <MoreVertical size={16} />
                                      </button>
                                   </td>
                                </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </ScrollArea>
               </Card>
            </TabsContent>

            <TabsContent value="cli-seg" className="mt-0 space-y-6 animate-in slide-in-from-right-4 duration-500">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['High Velocity Clientes', 'Churn Risk 30d', 'Top Decile - Growth', 'Dormant Champions'].map((seg) => (
                    <Card key={seg} className="bg-[#0c0c10] border-white/5 hover:border-blue-600/30 transition-all group">
                       <CardContent className="p-8">
                          <div className="flex items-center justify-between mb-6">
                             <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                <PieChart size={24} />
                             </div>
                             <Badge className="bg-white/5 text-zinc-400 border-0 text-[10px] font-black">24 Clientes</Badge>
                          </div>
                          <h3 className="text-lg font-black text-white italic uppercase tracking-tighter mb-2">{seg}</h3>
                          <p className="text-[11px] text-zinc-500 leading-relaxed mb-6 italic uppercase font-medium">
                             Clientes com alto volume de pedidos mas frequência em queda. Requer intervenção imediata da equipe comercial.
                          </p>
                          <div className="space-y-4">
                             <div className="flex justify-between items-center text-[10px] font-black">
                                <span className="text-zinc-500">POTENCIAL REUP</span>
                                <span className="text-emerald-500">R$ 420.000,00</span>
                             </div>
                             <Progress value={65} className="h-1 bg-white/5" indicatorClassName="bg-emerald-500" />
                          </div>
                       </CardContent>
                    </Card>
                  ))}
               </div>
            </TabsContent>

            <TabsContent value="cli-rfm" className="mt-0 space-y-6 animate-in zoom-in-95 duration-500">
               <Card className="bg-[#0c0c10] border-white/5 p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                     <div className="lg:col-span-2 space-y-8">
                        <div className="relative aspect-square md:aspect-video bg-[#050505] rounded-3xl border border-white/5 flex items-center justify-center">
                           {/* Simplified RFM Grid Visual */}
                           <div className="grid grid-cols-3 grid-rows-3 w-3/4 h-3/4 gap-2">
                              {[...Array(9)].map((_, i) => (
                                <div key={i} className={cn(
                                  "rounded-xl flex items-center justify-center border transition-all hover:scale-105 cursor-pointer",
                                  i === 0 ? "bg-emerald-500/20 border-emerald-500/40" : 
                                  i === 8 ? "bg-rose-500/20 border-rose-500/40" : "bg-white/[0.02] border-white/5"
                                )}>
                                   <div className="text-[10px] font-black text-white italic">{['MVP', 'Fiel', 'Top', 'Mid', 'Avg', 'Low', 'Risk', 'Lost', 'Dead'][i]}</div>
                                </div>
                              ))}
                           </div>
                           <div className="absolute left-4 top-1/2 -rotate-90 text-[10px] font-black text-zinc-600 uppercase tracking-widest shrink-0 origin-center whitespace-nowrap">Recência (Dias)</div>
                           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-black text-zinc-600 uppercase tracking-widest shrink-0 origin-center whitespace-nowrap">Frequência (Pedidos)</div>
                        </div>
                     </div>
                     <div className="space-y-6">
                        <h4 className="text-sm font-black text-white italic uppercase tracking-[0.2em] mb-4">Composição da Base</h4>
                        <div className="space-y-4">
                           {[
                             { label: 'Promotores', val: 42, color: 'bg-emerald-500' },
                             { label: 'Expectantes', val: 28, color: 'bg-blue-500' },
                             { label: 'Neutros', val: 18, color: 'bg-zinc-500' },
                             { label: 'Detratores', val: 12, color: 'bg-rose-500' },
                           ].map((item) => (
                             <div key={item.label} className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase italic">
                                   <span className="text-zinc-500">{item.label}</span>
                                   <span className="text-white">{item.val}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                   <motion.div initial={{ width: 0 }} animate={{ width: `${item.val}%` }} className={cn("h-full", item.color)} />
                                </div>
                             </div>
                           ))}
                        </div>
                        <Separator className="bg-white/5" />
                        <div className="p-4 rounded-xl bg-blue-600/5 border border-blue-600/20">
                           <div className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase italic tracking-widest mb-2">
                              <Sparkles size={14} /> Recomendação RFM
                           </div>
                           <p className="text-[10px] text-zinc-400 font-medium leading-relaxed italic uppercase">
                              Mover 15% dos clientes <span className="text-white font-bold">Expectantes</span> para <span className="text-white font-bold">Fiel</span> através de ofertas personalizadas de reposição de lonas.
                           </p>
                        </div>
                     </div>
                  </div>
               </Card>
            </TabsContent>

            <TabsContent value="cli-camp" className="mt-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: 'Retomada Inativa', type: 'Email/Zap', reach: '450 Clientes', status: 'Roda no Automático' },
                    { title: 'Promoção Fachadas 2024', type: 'Push/Direct', reach: '1.2k Leads', status: 'Ativa' },
                    { title: 'Lançamento Letra Caixa', type: 'Exclusivo MVP', reach: '85 Clientes', status: 'Finalizada' },
                  ].map((camp) => (
                    <Card key={camp.title} className="bg-[#0c0c10] border-white/5 overflow-hidden group">
                       <div className="h-32 bg-gradient-to-br from-blue-900/20 to-transparent p-6 relative">
                          <Badge className="absolute top-4 right-4 bg-blue-600/10 text-blue-500 border-blue-600/20 text-[9px] font-black uppercase">{camp.status}</Badge>
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 mb-2">
                             <Mail size={18} />
                          </div>
                          <h4 className="text-md font-black text-white italic uppercase tracking-tighter">{camp.title}</h4>
                       </div>
                       <CardContent className="p-6 space-y-4">
                          <div className="flex justify-between items-center text-[10px] font-black uppercase italic">
                             <span className="text-zinc-500 text-[10px]">Canais Ativos</span>
                             <span className="text-white">{camp.type}</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] font-black uppercase italic">
                             <span className="text-zinc-500 text-[10px]">Alcance Est.</span>
                             <span className="text-white">{camp.reach}</span>
                          </div>
                          <Separator className="bg-white/5" />
                          <Button className="w-full bg-white/5 border border-white/5 text-white hover:bg-white/10 text-[10px] font-black uppercase italic tracking-widest h-10">
                             Ver Performance
                          </Button>
                       </CardContent>
                    </Card>
                  ))}
                  <Card className="bg-dashed bg-[#0c0c10] border-2 border-dashed border-white/5 hover:border-blue-600/30 transition-all flex items-center justify-center cursor-pointer min-h-[300px] group">
                     <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                           <Plus size={24} />
                        </div>
                        <div className="text-center">
                           <div className="text-[10px] font-black text-white uppercase italic tracking-widest">Nova Campanha Estratégica</div>
                           <div className="text-[9px] text-zinc-600 font-bold uppercase mt-1 italic leading-relaxed">Pelo CORE de Marketing IA KORTECK</div>
                        </div>
                     </div>
                  </Card>
               </div>
            </TabsContent>
          </div>

          {/* AI Intelligence Sidebar */}
          <div className="space-y-6">
             <Card className="bg-blue-600 border-0 overflow-hidden relative shadow-[0_0_50px_rgba(37,99,235,0.2)]">
                <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                <CardHeader className="p-6 pb-0 relative">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                       <Zap size={20} className="fill-white" />
                    </div>
                    <div>
                       <CardTitle className="text-xs font-black text-white uppercase italic tracking-widest leading-none">AI CORE INSIGHT</CardTitle>
                       <CardDescription className="text-[10px] text-white/60 font-bold uppercase tracking-widest mt-1">Sincronizado Agora</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-4 space-y-4 relative">
                   <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 min-h-[160px]">
                      {isAiLoading ? (
                        <div className="flex flex-col items-center justify-center h-full gap-3 pt-6">
                           <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                           <span className="text-[9px] font-black text-white uppercase tracking-widest animate-pulse">Processando Big Data...</span>
                        </div>
                      ) : (
                        <div className="space-y-3 prose prose-invert overflow-hidden">
                           <div className="text-[11px] text-white leading-relaxed font-bold italic whitespace-pre-wrap">
                              {aiInsights}
                           </div>
                        </div>
                      )}
                   </div>
                   <p className="text-[9px] text-white/50 font-medium italic">
                      Baseado no cruzamento de dados de faturamento, recorrência e interações CRM nos últimos 90 dias.
                   </p>
                </CardContent>
             </Card>

             <Card className="bg-[#0c0c10] border-white/5 p-6 space-y-6">
                <h4 className="text-[10px] font-black text-white uppercase italic tracking-widest flex items-center gap-2">
                   <Target size={14} className="text-blue-500" /> Próximos Alvos (IA)
                </h4>
                <div className="space-y-3">
                   {[
                     { name: 'KORTECK IND', gain: '+R$ 12k', prob: 92 },
                     { name: 'ZETA TECH', gain: '+R$ 8k', prob: 78 },
                   ].map((target) => (
                     <div key={target.name} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between group cursor-pointer hover:border-blue-500/30 transition-all">
                        <div className="flex flex-col gap-1">
                           <span className="text-[10px] font-black text-white uppercase italic">{target.name}</span>
                           <span className="text-[9px] font-bold text-emerald-500 uppercase">{target.gain} Potential</span>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                           <span className="text-[9px] font-black text-blue-500 uppercase tracking-tighter">{target.prob}% Profitable</span>
                        </div>
                     </div>
                   ))}
                </div>
                <Button className="w-full bg-white/5 border border-white/5 text-[9px] font-black text-zinc-500 uppercase italic h-9 hover:text-white transition-all">
                   Gerar Novo Planejamento
                </Button>
             </Card>

             <Card className="bg-[#0c0c10] border-white/5 p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mx-auto">
                   <ShieldCheck size={24} />
                </div>
                <div>
                   <h5 className="text-[10px] font-black text-white uppercase italic tracking-widest mb-1">Backup Sincronizado</h5>
                   <p className="text-[9px] text-zinc-600 font-bold uppercase italic">Dados protegidos por criptografia de ponta a ponta Korteck.</p>
                </div>
             </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
