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

  const isLight = currentTheme === 'ash-light';

  const THEMES = [
    {
      id: 'korteck-dark',
      name: 'KORTECK DARK',
      description: 'Padrão industrial de alta performance',
      colors: ['bg-white dark:bg-zinc-900', 'bg-blue-600', 'zinc-900'],
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
    <div className={cn(
      "p-4 md:p-8 space-y-8 animate-in fade-in duration-700 min-h-screen transition-colors duration-500",
      isLight 
        ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100/30 via-zinc-100 to-zinc-50"
        : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-[#050505] to-[#050505]"
    )}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden">
        <div>
          <div className={cn("flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] mb-2 uppercase", isLight ? "text-zinc-650" : "text-zinc-500")}>
            <Palette size={14} className={isLight ? "text-purple-600" : "text-blue-500"} /> Configurações de Sistema [SYS-THEME]
          </div>
          <h1 className={cn("text-2xl md:text-3xl font-black tracking-tight uppercase italic flex items-center gap-3", isLight ? "text-zinc-900" : "text-white")}>
             Personalização de Interface <Badge className={cn("text-[10px] font-black italic", isLight ? "bg-purple-100 text-purple-700 border-purple-500/20" : "bg-blue-600/10 text-blue-500 border-blue-500/20")}>V.2.0</Badge>
          </h1>
        </div>

        <Button 
          onClick={() => {
            setTheme('ash-light');
            setGlassEffect(true);
            setAnimations(true);
          }}
          className={cn("font-black text-[10px] uppercase tracking-widest px-8", isLight ? "bg-purple-600 text-white hover:bg-purple-700" : "bg-blue-600 text-white hover:bg-blue-700")}
        >
           <RefreshCw size={14} className="mr-2" /> Restaurar Padrões
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <Card className={cn("border-solid shadow-sm overflow-hidden", isLight ? "bg-white border-zinc-200" : "bg-zinc-900 border-transparent")}>
            <CardHeader className={cn("border-b p-6", isLight ? "bg-zinc-50/50 border-zinc-200" : "bg-white/[0.02] border-transparent")}>
               <div className="flex items-center justify-between">
                  <div>
                     <CardTitle className={cn("text-sm font-black uppercase italic tracking-widest flex items-center gap-2", isLight ? "text-zinc-900" : "text-white")}>
                        <Palette size={16} className={isLight ? "text-purple-600" : "text-blue-500"} /> Seleção de Tema Estrutural
                     </CardTitle>
                     <CardDescription className={cn("text-xs mt-1", isLight ? "text-zinc-600" : "text-zinc-500")}>Escolha a base visual que melhor se adapta ao seu ambiente de trabalho.</CardDescription>
                  </div>
                  <Badge variant="outline" className={cn("text-[9px] font-black uppercase", isLight ? "bg-zinc-200 text-zinc-800 border-transparent" : "border-transparent text-zinc-500")}>Alpha Build</Badge>
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
                         ? (isLight ? "border-purple-600 shadow-[0_0_30px_rgba(124,58,237,0.15)]" : "border-blue-600 shadow-[0_0_30px_rgba(37,99,235,0.2)]")
                         : (isLight ? "border-zinc-250 bg-zinc-50" : "border-transparent bg-white/[0.01]")
                      )}>
                         {/* Mock UI in the preview */}
                         <div className={cn("absolute inset-0 opacity-10", theme.colors[0])} />
                         <div className="relative z-10 space-y-2 h-full">
                            <div className="flex items-center gap-1.5">
                               <div className={cn("w-2 h-2 rounded-full", theme.colors[1])} />
                               <div className={cn("h-1.5 w-12 rounded-full", isLight ? "bg-zinc-300" : "bg-white/10")} />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                               <div className={cn("h-12 rounded-lg border-none animate-pulse", isLight ? "bg-zinc-200" : "bg-white/5")} />
                               <div className={cn("h-12 rounded-lg border-none animate-pulse", isLight ? "bg-zinc-200" : "bg-white/5")} style={{ animationDelay: '0.2s' }} />
                            </div>
                            <div className="flex-1" />
                            <div className={cn("h-4 w-full rounded-md", isLight ? "bg-zinc-200" : "bg-white/5")} />
                         </div>
 
                         {currentTheme === theme.id && (
                           <div className={cn("absolute top-3 right-3 text-white p-1 rounded-full shadow-lg z-20", isLight ? "bg-purple-600" : "bg-blue-600")}>
                              <Check size={12} strokeWidth={4} />
                           </div>
                         )}
                      </div>
                      <div className="mt-4 text-center">
                         <h3 className={cn("text-xs font-black italic uppercase tracking-widest", currentTheme === theme.id ? (isLight ? "text-purple-600" : "text-blue-500") : (isLight ? "text-zinc-950" : "text-white"))}>{theme.name}</h3>
                         <p className={cn("text-[10px] font-medium mt-1 leading-tight", isLight ? "text-zinc-600" : "text-zinc-500")}>{theme.description}</p>
                      </div>
                   </div>
                 ))}
               </div>
            </CardContent>
          </Card>
 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <Card className={cn("border-solid shadow-sm", isLight ? "bg-white border-zinc-200" : "bg-zinc-900 border-transparent")}>
                <CardHeader className="p-6 pb-0">
                   <CardTitle className={cn("text-xs font-black uppercase italic tracking-[0.2em] flex items-center gap-2", isLight ? "text-zinc-900" : "text-white")}>
                      <Zap size={16} className="text-amber-500" /> Efeitos de Renderização
                   </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                   <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                         <Label className={cn("text-[11px] font-black uppercase tracking-widest", isLight ? "text-zinc-800" : "text-zinc-300")}>Efeito Glassmorphism</Label>
                         <p className={cn("text-[10px] font-medium", isLight ? "text-zinc-650" : "text-zinc-600")}>Blur e transparências em modais e sidebars.</p>
                      </div>
                      <Switch checked={glassEffect} onCheckedChange={setGlassEffect} />
                   </div>
                   <Separator className={isLight ? "bg-zinc-205" : "bg-white/5"} />
                   <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                         <Label className={cn("text-[11px] font-black uppercase tracking-widest", isLight ? "text-zinc-800" : "text-zinc-300")}>Animações Fluídas</Label>
                         <p className={cn("text-[10px] font-medium", isLight ? "text-zinc-650" : "text-zinc-600")}>Transições entre telas e micro-interações.</p>
                      </div>
                      <Switch checked={animations} onCheckedChange={setAnimations} />
                   </div>
                </CardContent>
             </Card>
 
             <Card className={cn("border-solid shadow-sm", isLight ? "bg-white border-zinc-200" : "bg-zinc-900 border-transparent")}>
                <CardHeader className="p-6 pb-0">
                   <CardTitle className={cn("text-xs font-black uppercase italic tracking-[0.2em] flex items-center gap-2", isLight ? "text-zinc-900" : "text-white")}>
                      <Eye size={16} className="text-purple-500" /> Acessibilidade & Tipografia
                   </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                   <div className="space-y-3">
                      <Label className={cn("text-[11px] font-black uppercase tracking-widest", isLight ? "text-zinc-800" : "text-zinc-300")}>Densidade de Dados</Label>
                      <RadioGroup defaultValue="comfortable" className="grid grid-cols-3 gap-2">
                         {['compacta', 'padrão', 'ampla'].map((d) => (
                           <div key={d}>
                              <RadioGroupItem value={d} id={d} className="sr-only" />
                              <Label
                                htmlFor={d}
                                className={cn(
                                  "flex items-center justify-center h-8 rounded-lg border text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer",
                                  isLight 
                                    ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border-zinc-200 hover:border-zinc-300" 
                                    : "border-transparent bg-white/[0.02] text-zinc-600 hover:text-white"
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
                         <Label className={cn("text-[11px] font-black uppercase tracking-widest", isLight ? "text-zinc-800" : "text-zinc-300")}>Modo Alto Contraste</Label>
                         <p className={cn("text-[10px] font-medium", isLight ? "text-zinc-650" : "text-zinc-600")}>Otimizado para visibilidade extrema.</p>
                      </div>
                      <Switch />
                   </div>
                </CardContent>
             </Card>
          </div>
        </div>
 
        <div className="space-y-6">
           <Card className={cn("border-solid shadow-sm p-8 flex flex-col items-center text-center space-y-6", isLight ? "bg-white border-zinc-200" : "bg-zinc-900 border-transparent")}>
              <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center shadow-md", isLight ? "bg-purple-100 text-purple-600 border border-purple-200 shadow-purple-500/10" : "bg-blue-600/10 border border-blue-600/20 text-blue-500 shadow-[0_0_50px_rgba(37,99,235,0.15)]")}>
                 <Monitor size={40} />
              </div>
              <div>
                 <h4 className={cn("text-sm font-black uppercase italic tracking-[0.2em] mb-2", isLight ? "text-zinc-900" : "text-white")}>Interface de Visualização</h4>
                 <p className={cn("text-xs font-medium leading-relaxed italic", isLight ? "text-zinc-600" : "text-zinc-500")}>
                    A pré-visualização em tempo real do tema selecionado estará disponível na atualização <span className={isLight ? "text-purple-600 font-extrabold" : "text-white"}>v3.0.0-BETA</span>.
                  </p>
              </div>
              <div className="w-full space-y-3 pt-4">
                 <div className={cn("flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] px-2", isLight ? "text-zinc-700" : "text-zinc-600")}>
                    <span>STATUS DA SINCRONIZAÇÃO</span>
                    <span className={isLight ? "text-purple-600" : "text-blue-500"}>98%</span>
                 </div>
                 <div className={cn("w-full h-1 rounded-full overflow-hidden", isLight ? "bg-zinc-200" : "bg-white/5")}>
                    <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: '98%' }}
                       className={cn("h-full", isLight ? "bg-purple-600" : "bg-blue-600")} 
                    />
                 </div>
              </div>
           </Card>
 
           <Card className={cn("border-0 p-6 shadow-md relative overflow-hidden group text-white", isLight ? "bg-purple-600 shadow-[0_0_40px_rgba(124,58,237,0.15)]" : "bg-blue-600 shadow-[0_0_40px_rgba(37,99,235,0.25)]")}>
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
                    "Detectamos que a sua produtividade aumenta em 12% utilizando cores otimizadas. Prefira o tema <span className="underline decoration-white/40">{isLight ? "ASH LIGHT" : "KORTECK DARK"}</span> para seu perfil."
                 </p>
                 <Button 
                   onClick={() => setTheme(isLight ? 'korteck-dark' : 'ash-light')}
                   className="w-full bg-white text-blue-600 hover:bg-zinc-100 font-black text-[10px] uppercase tracking-widest mt-2"
                   style={{ color: isLight ? '#7c3aed' : '#2563eb' }}
                 >
                    Ver Alternativa
                 </Button>
              </div>
           </Card>
 
           <div className={cn("p-4 border border-solid rounded-2xl flex items-center gap-4", isLight ? "bg-zinc-50 border-zinc-200" : "bg-white/[0.02] border-transparent")}>
              <div className={cn("w-10 h-10 rounded-full border flex items-center justify-center shrink-0", isLight ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-emerald-500/10 border border-emerald-500/20 text-emerald-500")}>
                 <Shield size={18} />
              </div>
              <div className="overflow-hidden text-ellipsis">
                 <p className={cn("text-[10px] font-black uppercase tracking-widest", isLight ? "text-zinc-800" : "text-white")}>SISTEMA PROTEGIDO</p>
                 <p className={cn("text-[8px] font-bold uppercase tracking-tighter", isLight ? "text-zinc-500" : "text-zinc-650")}>As alterações de tema são vinculadas ao seu perfil de usuário local.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
