import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { NAVIGATION_STRUCTURE } from '@/src/constants/menu';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Search, Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function Sidebar({ 
  currentView = 'dashboard',
  onChangeView, 
  isMobileOpen, 
  onCloseMobile 
}: { 
  currentView?: string;
  onChangeView?: (viewId: string) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const isModuleActive = (moduleId: string) => {
    if (currentView === moduleId) return true;
    // Map individual subviews to highlight their parent module
    if (moduleId === 'dashboard' && ['dashboard', 'dash-fin', 'dash-com', 'dash-prod', 'dash-est'].includes(currentView)) return true;
    if (moduleId === 'comercial' && ['comercial', 'crm-pipe', 'crm-follow', 'com-leads', 'op-vendas', 'op-ped', 'clientes'].includes(currentView)) return true;
    if (moduleId === 'suprimentos' && ['suprimentos', 'sup-mp', 'sup-forn', 'sup-lista', 'scraps'].includes(currentView)) return true;
    if (moduleId === 'producao' && ['producao', 'prod-chao', 'prod-cnc', 'prod-imp', 'qual-exp', 'qual-retr', 'pcp-main', 'pcp-os'].includes(currentView)) return true;
    if (moduleId === 'financeiro' && ['financeiro', 'fin-visao', 'fin-pagar', 'fin-receber', 'fin-fluxo'].includes(currentView)) return true;
    if (moduleId === 'hr' && ['hr', 'hr-cad', 'hr-colab', 'hr-org', 'niveis', 'hierarchy', 'sys-levels', 'hr-cargos'].includes(currentView)) return true;
    if (moduleId === 'educa' && ['educa', 'edu-cursos', 'edu-trein', 'edu-cert'].includes(currentView)) return true;
    if (moduleId === 'sistema' && ['sistema', 'sys-adm-gest', 'sys-users', 'usuarios', 'sys-perm', 'permissoes', 'sys-cfg-glob', 'sys-theme'].includes(currentView)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden pointer-events-auto"
          />
        )}
      </AnimatePresence>

      <div ref={sidebarRef} className={cn(
        "flex h-screen fixed left-0 top-0 z-50 select-none transition-all duration-300",
        isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* SINGLE BAR SIDEBAR (W-24): Vertically stacked Icon with Label underneath */}
        <div className="w-24 bg-[#08080a] border-r border-white/5 flex flex-col items-center py-6 gap-6 shadow-[10px_0_40px_rgba(0,0,0,0.5)] pointer-events-auto shrink-0">
          <div className="group relative mb-2">
            <div 
              className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center cursor-pointer hover:rotate-90 transition-all duration-500 shadow-[0_0_25px_rgba(37,99,235,0.4)] relative z-10" 
              onClick={() => onChangeView?.('dashboard')}
            >
              <span className="text-white font-black text-2xl italic tracking-tighter">M</span>
            </div>
            <div className="absolute inset-0 bg-blue-600/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <TooltipProvider delay={0}>
            <div className="flex flex-col gap-4 flex-1 w-full px-2 overflow-y-auto scrollbar-none">
              {NAVIGATION_STRUCTURE.map((module) => {
                const active = isModuleActive(module.id);
                return (
                  <div key={module.id} className="w-full flex justify-center">
                    <Tooltip>
                      <TooltipTrigger
                        onClick={() => onChangeView?.(module.id)}
                        className={cn(
                          "w-20 h-20 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 relative group gap-1.5 border border-transparent",
                          active
                            ? "bg-blue-600 text-white border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]" 
                            : "text-zinc-500 hover:text-white hover:bg-white/5 hover:border-white/5"
                        )}
                      >
                        <div className="flex items-center justify-center shrink-0">
                          {module.icon && React.cloneElement(module.icon as React.ReactElement, { size: 20 })}
                        </div>
                        <span className="text-[8.5px] font-black tracking-wider uppercase leading-none overflow-hidden text-ellipsis w-full px-0.5 text-center truncate">
                          {module.label}
                        </span>
                        {active && (
                          <motion.div 
                            layoutId="active-indicator"
                            className="absolute left-1 w-1 h-6 bg-blue-300 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                          />
                        )}
                      </TooltipTrigger>
                      <TooltipContent side="right" className="bg-black text-white border-zinc-800 text-[10px] font-black uppercase tracking-wider">
                        {module.description}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                );
              })}
            </div>
          </TooltipProvider>

          <div className="flex flex-col gap-4 mt-auto items-center w-full px-2">
            <TooltipProvider delay={0}>
              <Tooltip>
                <TooltipTrigger className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-700 hover:text-white hover:bg-white/5 transition-all">
                  <Search size={20} />
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-black text-white border-zinc-800">Localizar OS, CRM ou Log</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-700 hover:text-white hover:bg-white/5 transition-all">
                  <Star size={20} className="text-amber-500/20 hover:text-amber-500 transition-colors" />
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-black text-white border-zinc-800">Módulos Favoritos</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Separator className="bg-white/5 w-8 mx-auto" />
            <button className="w-10 h-10 rounded-xl border-2 border-white/5 overflow-hidden bg-zinc-900 hover:scale-105 transition-all hover:border-blue-500/50 relative group">
              <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-colors" />
              <img src="https://i.pravatar.cc/100?u=korteck" alt="User" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
