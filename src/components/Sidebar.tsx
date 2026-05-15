import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { NAVIGATION_STRUCTURE, ModuleSection, MenuItem } from '@/src/constants/menu';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ChevronRight, Search, Star, Clock, X, Workflow, Menu } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function Sidebar({ 
  onChangeView, 
  isMobileOpen, 
  onCloseMobile 
}: { 
  onChangeView?: (viewId: string) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}) {
  const [activeModule, setActiveModule] = useState<ModuleSection | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<MenuItem | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close everything on click outside or ESC
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setActiveModule(null);
        setActiveSubmenu(null);
        if (isMobileOpen && onCloseMobile) {
          // If clicking outside the bar specifically
          // This logic might need to be careful with mobile overlay
        }
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (activeSubmenu) setActiveSubmenu(null);
        else setActiveModule(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [activeSubmenu]);

  const handleModuleClick = (module: ModuleSection) => {
    if (activeModule?.id === module.id) {
      setActiveModule(null);
      setActiveSubmenu(null);
    } else {
      setActiveModule(module);
      setActiveSubmenu(null);
    }
  };

  const handleSubmenuClick = (item: MenuItem) => {
    if (item.children) {
      if (activeSubmenu?.id === item.id) {
        setActiveSubmenu(null);
      } else {
        setActiveSubmenu(item);
      }
    } else {
      // Navigate or handle action
      onChangeView?.(item.id);
      setActiveModule(null);
      setActiveSubmenu(null);
    }
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
        "flex h-screen fixed left-0 top-0 z-50 select-none transition-all duration-500",
        isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* LEVEL 1: Main Icons Bar */}
        <div className="w-18 bg-[#08080a] border-r border-white/5 flex flex-col items-center py-8 gap-8 shadow-[10px_0_40px_rgba(0,0,0,0.5)] relative z-30 pointer-events-auto">
        <div className="group relative">
           <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 cursor-pointer hover:rotate-90 transition-all duration-500 shadow-[0_0_25px_rgba(37,99,235,0.4)] relative z-10" onClick={() => onChangeView?.('dashboard')}>
             <span className="text-white font-black text-2xl italic tracking-tighter">M</span>
           </div>
           <div className="absolute inset-0 bg-blue-600/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <TooltipProvider delay={0}>
          <div className="flex flex-col gap-6 flex-1">
            {NAVIGATION_STRUCTURE.map((module) => (
              <div key={module.id}>
                <Tooltip>
                  <TooltipTrigger
                    onClick={() => handleModuleClick(module)}
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 relative group",
                      activeModule?.id === module.id 
                        ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]" 
                        : "text-zinc-600 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {module.icon && React.cloneElement(module.icon as React.ReactElement, { size: 22 })}
                    {activeModule?.id === module.id && (
                      <motion.div 
                        layoutId="active-nav"
                        className="absolute -right-[1px] w-1.5 h-8 bg-blue-400 rounded-l-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                      />
                    )}
                    <div className="absolute left-full ml-4 px-3 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none translate-x-2 group-hover:translate-x-0 transition-all z-[100] whitespace-nowrap shadow-2xl hidden md:block">
                       {module.label}
                    </div>
                  </TooltipTrigger>
                </Tooltip>
              </div>
            ))}
          </div>
        </TooltipProvider>

        <div className="flex flex-col gap-6 mt-auto items-center">
          <TooltipProvider delay={0}>
            <Tooltip>
              <TooltipTrigger className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-700 hover:text-white hover:bg-white/5 transition-all">
                <Search size={22} />
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-black text-white border-zinc-800">Localizar OS, CRM ou Log</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-700 hover:text-white hover:bg-white/5 transition-all">
                <Star size={22} className="text-amber-500/20 hover:text-amber-500 transition-colors" />
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-black text-white border-zinc-800">Módulos Favoritos</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Separator className="bg-white/5 w-8 mx-auto" />
          <button className="w-12 h-12 rounded-2xl border-2 border-white/5 overflow-hidden bg-zinc-900 hover:scale-105 transition-all hover:border-blue-500/50 relative group">
             <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-colors" />
            <img src="https://i.pravatar.cc/100?u=korteck" alt="User" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      {/* LEVEL 2: Sector Drawer */}
      <AnimatePresence>
        {activeModule && (
          <motion.div
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-[320px] bg-[#0c0c10]/95 backdrop-blur-3xl border-r border-white/5 shadow-[20px_0_60px_rgba(0,0,0,0.6)] relative z-20 flex flex-col pointer-events-auto"
          >
            <div className="p-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black tracking-[0.5em] text-zinc-600 uppercase italic">SECTOR / {activeModule.id}</span>
                <button onClick={() => setActiveModule(null)} className="text-zinc-600 hover:text-white transition-colors bg-white/5 p-2 rounded-xl">
                  <X size={14} />
                </button>
              </div>
              <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none mb-1">{activeModule.label}</h2>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{activeModule.description}</p>
            </div>
            
            <ScrollArea className="flex-1 px-4">
              <div className="flex flex-col gap-2 pb-10">
                {activeModule.submenus.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSubmenuClick(item)}
                    className={cn(
                      "w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 group text-left border border-transparent",
                      activeSubmenu?.id === item.id 
                        ? "bg-blue-600/10 text-white border-blue-500/20 shadow-[inset_0_0_20px_rgba(59,130,246,0.05)]" 
                        : "text-zinc-500 hover:text-white hover:bg-white/[0.03] hover:border-white/5"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                        activeSubmenu?.id === item.id ? "bg-blue-600 text-white shadow-lg" : "bg-white/5 group-hover:bg-white/10"
                      )}>
                        {item.icon && React.cloneElement(item.icon as React.ReactElement, { size: 18 })}
                      </div>
                      <span className="text-xs font-black uppercase italic tracking-widest">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {item.badge && (
                        <Badge className={cn(
                          "px-2 py-0.5 text-[9px] font-black uppercase h-5 bg-transparent border border-white/5 text-zinc-600",
                          activeSubmenu?.id === item.id && "border-blue-500/30 text-blue-400"
                        )}>
                          {item.badge}
                        </Badge>
                      )}
                      {item.children && <ChevronRight size={16} className={cn("transition-transform duration-300 opacity-20", activeSubmenu?.id === item.id && "rotate-90 opacity-100")} />}
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>

            <div className="p-8 bg-black/50 border-t border-white/5">
              <div className="flex items-center gap-3 text-blue-500 text-[10px] font-black tracking-[0.3em] px-2 mb-4 uppercase">
                <Workflow size={16} className="animate-pulse" /> Intelligence Cloud
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 shadow-inner">
                <p className="text-[11px] text-zinc-500 leading-relaxed font-bold italic uppercase tracking-tighter">
                  "O setor de <span className="text-blue-400">Corte CNC</span> apresenta ociosidade de 40%. Antecipar <span className="text-white">OS#4251</span> é recomendado."
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEVEL 3: Sub-Sector Drawer */}
      <AnimatePresence>
        {activeSubmenu && activeSubmenu.children && (
          <motion.div
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-[300px] bg-[#0c0c10]/98 backdrop-blur-3xl border-r border-white/5 shadow-[30px_0_80px_rgba(0,0,0,0.7)] relative z-10 flex flex-col pointer-events-auto"
          >
            <div className="p-10 flex items-center justify-between border-b border-white/5 h-[140px]">
              <div>
                <span className="text-[10px] font-black tracking-[0.5em] text-zinc-600 uppercase mb-2 block">{activeSubmenu.label}</span>
                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Sub-Categorias</h3>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="flex flex-col gap-2 pb-10">
                {activeSubmenu.children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => {
                      onChangeView?.(child.id);
                      setActiveModule(null);
                      setActiveSubmenu(null);
                    }}
                    className="w-full flex items-center justify-between px-6 py-4 rounded-2xl text-zinc-500 hover:text-white hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-all text-[11px] font-black uppercase tracking-widest italic group"
                  >
                    {child.label}
                    {child.badge && (
                      <Badge className="px-2 py-0.5 h-4 bg-blue-600/10 border-0 text-blue-500 text-[8px] font-black uppercase italic">
                        {child.badge}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </>
  );
}
