import React from 'react';
import { motion } from 'motion/react';
import { 
  Palette, 
  Sun, 
  Moon, 
  Monitor, 
  Zap, 
  Shield, 
  Check, 
  RefreshCw,
  Eye,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

import { useTheme } from '@/src/lib/ThemeContext';

export function ThemeSettings() {
  const { 
    theme: currentTheme, 
    setTheme, 
    glassEffect, 
    setGlassEffect, 
    animations, 
    setAnimations 
  } = useTheme();

  const THEMES = [
    {
      id: 'korteck-dark',
      name: 'KORTECK DARK',
      description: 'Padrão industrial de alta performance',
      colors: ['bg-[#050505]', 'bg-blue-600', 'bg-[#0c0c10]'],
      accent: 'text-blue-500'
    },
    {
      id: 'ash-light',
      name: 'ASH LIGHT',
      description: 'Limpeza visual e foco em legibilidade',
      colors: ['bg-zinc-50', 'bg-blue-500', 'bg-white'],
      accent: 'text-blue-600'
    },
    {
      id: 'cyber-blue',
      name: 'CYBER BLUE',
      description: 'Interface futurista com alto contraste',
      colors: ['bg-[#020617]', 'bg-cyan-500', 'bg-[#0f172a]'],
      accent: 'text-cyan-400'
    }
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-[#050505] to-[#050505] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-zinc-500 mb-2 uppercase">
            <Palette size={14} className="text-blue-500" /> Configurações de Sistema [SYS-THEME]
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white uppercase italic flex items-center gap-3">
             Personalização de Interface <Badge className="bg-blue-600/10 text-blue-500 border-blue-500/20 text-[10px] font-black italic">V.2.0</Badge>
          </h1>
        </div>

        <Button className="bg-blue-600 text-white hover:bg-blue-700 font-black text-[10px] uppercase tracking-widest px-8">
           <RefreshCw size={14} className="mr-2" /> Restaurar Padrões
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <Card className="bg-[#0c0c10] border-white/5 shadow-2xl overflow-hidden">
            <CardHeader className="bg-white/[0.02] border-b border-white/5 p-6">
               <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-black text-white uppercase italic tracking-widest flex items-center gap-2">
                       <Palette size={16} className="text-blue-500" /> Seleção de Tema Estrutural
                    </CardTitle>
                    <CardDescription className="text-xs text-zinc-500 mt-1">Escolha a base visual que melhor se adapta ao seu ambiente de trabalho.</CardDescription>
                  </div>
                  <Badge variant="outline" className="border-white/10 text-zinc-500 text-[9px] font-black uppercase">Alpha Build</Badge>
               </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {THEMES.map((theme) => (
                  <div 
                    key={theme.id}
                    onClick={() => setTheme(theme.id as any)}
                    className={cn(
                      "relative cursor-pointer group transition-all duration-500",
                      currentTheme === theme.id ? "scale-105" : "hover:scale-[1.02]"
                    )}
                  >
                     <div className={cn(
                       "aspect-[16/10] rounded-2xl p-4 border-2 transition-all duration-500 relative overflow-hidden",
                       currentTheme === theme.id 
                        ? "border-blue-600 shadow-[0_0_30px_rgba(37,99,235,0.2)]" 
                        : "border-white/5 bg-white/[0.01] hover:border-white/10"
                     )}>
                        {/* Mock UI in the preview */}
                        <div className={cn("absolute inset-0 opacity-10", theme.colors[0])} />
                        <div className="relative z-10 space-y-2 h-full">
                           <div className="flex items-center gap-1.5">
                              <div className={cn("w-2 h-2 rounded-full", theme.colors[1])} />
                              <div className="h-1.5 w-12 bg-white/10 rounded-full" />
                           </div>
                           <div className="grid grid-cols-2 gap-2">
                              <div className="h-12 rounded-lg bg-white/5 border border-white/10 animate-pulse" />
                              <div className="h-12 rounded-lg bg-white/5 border border-white/10 animate-pulse" style={{ animationDelay: '0.2s' }} />
                           </div>
                           <div className="flex-1" />
                           <div className="h-4 w-full bg-white/5 rounded-md" />
                        </div>

                        {currentTheme === theme.id && (
                          <div className="absolute top-3 right-3 bg-blue-600 text-white p-1 rounded-full shadow-lg z-20">
                             <Check size={12} strokeWidth={4} />
                          </div>
                        )}
                     </div>
                     <div className="mt-4 text-center">
                        <h3 className={cn("text-xs font-black italic uppercase tracking-widest", currentTheme === theme.id ? "text-blue-500" : "text-white")}>{theme.name}</h3>
                        <p className="text-[10px] text-zinc-500 font-medium mt-1 leading-tight">{theme.description}</p>
                     </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <Card className="bg-[#0c0c10] border-white/5 shadow-2xl">
                <CardHeader className="p-6 pb-0">
                   <CardTitle className="text-xs font-black text-white uppercase italic tracking-[0.2em] flex items-center gap-2">
                      <Zap size={16} className="text-amber-500" /> Efeitos de Renderização
                   </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                   <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                         <Label className="text-[11px] font-black text-zinc-300 uppercase tracking-widest">Efeito Glassmorphism</Label>
                         <p className="text-[10px] text-zinc-600 font-medium">Blur e transparências em modais e sidebars.</p>
                      </div>
                      <Switch checked={glassEffect} onCheckedChange={setGlassEffect} />
                   </div>
                   <Separator className="bg-white/5" />
                   <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                         <Label className="text-[11px] font-black text-zinc-300 uppercase tracking-widest">Animações Fluídas</Label>
                         <p className="text-[10px] text-zinc-600 font-medium">Transições entre telas e micro-interações.</p>
                      </div>
                      <Switch checked={animations} onCheckedChange={setAnimations} />
                   </div>
                </CardContent>
             </Card>

             <Card className="bg-[#0c0c10] border-white/5 shadow-2xl">
                <CardHeader className="p-6 pb-0">
                   <CardTitle className="text-xs font-black text-white uppercase italic tracking-[0.2em] flex items-center gap-2">
                      <Eye size={16} className="text-purple-500" /> Acessibilidade & Tipografia
                   </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                   <div className="space-y-3">
                      <Label className="text-[11px] font-black text-zinc-300 uppercase tracking-widest">Densidade de Dados</Label>
                      <RadioGroup defaultValue="comfortable" className="grid grid-cols-3 gap-2">
                         {['compacta', 'padrão', 'ampla'].map((d) => (
                           <div key={d}>
                              <RadioGroupItem value={d} id={d} className="sr-only" />
                              <Label
                                htmlFor={d}
                                className={cn(
                                  "flex items-center justify-center h-8 rounded-lg border text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer",
                                  "peer-data-[state=checked]:bg-blue-600 border-white/5 bg-white/[0.02] text-zinc-600 hover:text-white"
                                )}
                              >
                                {d}
                              </Label>
                           </div>
                        ))}
                      </RadioGroup>
                   </div>
                   <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                         <Label className="text-[11px] font-black text-zinc-300 uppercase tracking-widest">Modo Alto Contraste</Label>
                         <p className="text-[10px] text-zinc-600 font-medium">Otimizado para visibilidade extrema.</p>
                      </div>
                      <Switch />
                   </div>
                </CardContent>
             </Card>
          </div>
        </div>

        <div className="space-y-6">
           <Card className="bg-[#0c0c10] border-white/5 p-8 shadow-2xl flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-500 shadow-[0_0_50px_rgba(37,99,235,0.15)]">
                 <Monitor size={40} />
              </div>
              <div>
                 <h4 className="text-sm font-black text-white uppercase italic tracking-[0.2em] mb-2">Interface de Visualização</h4>
                 <p className="text-xs text-zinc-500 font-medium leading-relaxed italic">
                    A pré-visualização em tempo real do tema selecionado estará disponível na atualização <span className="text-white">v3.0.0-BETA</span>.
                 </p>
              </div>
              <div className="w-full space-y-3 pt-4">
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 px-2">
                    <span>STATUS DA SINCRONIZAÇÃO</span>
                    <span className="text-blue-500">98%</span>
                 </div>
                 <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: '98%' }}
                       className="h-full bg-blue-600" 
                    />
                 </div>
              </div>
           </Card>

           <Card className="bg-blue-600 border-0 p-6 text-white shadow-[0_0_40px_rgba(37,99,235,0.25)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                 <Settings size={80} />
              </div>
              <div className="relative z-10 flex flex-col gap-4">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                       <Zap size={16} className="fill-white" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] italic">Dica IA de Estilo</span>
                 </div>
                 <p className="text-xs font-bold leading-relaxed italic opacity-90">
                    "Detectamos que a sua produtividade aumenta em 12% durante o período noturno utilizando o tema <span className="underline decoration-white/40">KORTECK DARK</span>. Deseja agendar o switch automático?"
                 </p>
                 <Button className="w-full bg-white text-blue-600 hover:bg-zinc-100 font-black text-[10px] uppercase tracking-widest mt-2">
                    Agendar Transição
                 </Button>
              </div>
           </Card>

           <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                 <Shield size={18} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-white uppercase tracking-widest">SISTEMA PROTEGIDO</p>
                 <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-tighter">As alterações de tema são vinculadas ao seu perfil de usuário local.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
