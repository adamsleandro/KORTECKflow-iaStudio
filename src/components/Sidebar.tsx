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
        isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        "pointer-events-none md:pointer-events-auto"
      )}>
        {/* LEVEL 1: Main Icons Bar */}
        <div className="w-16 bg-[#020202] border-r border-white/5 flex flex-col items-center py-6 gap-6 shadow-2xl relative z-30 pointer-events-auto">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-4 cursor-pointer hover:scale-105 transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)]" onClick={() => onChangeView?.('dashboard')}>
          <span className="text-white font-black text-xl italic tracking-tighter">K</span>
        </div>

        <TooltipProvider delay={0}>
          <div className="flex flex-col gap-4 flex-1">
            {NAVIGATION_STRUCTURE.map((module) => (
              <div key={module.id}>
                <Tooltip>
                  <TooltipTrigger
                    onClick={() => handleModuleClick(module)}
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 relative group",
                      activeModule?.id === module.id 
                        ? "bg-blue-600/10 text-blue-500 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]" 
                        : "text-zinc-500 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {module.icon}
                    {activeModule?.id === module.id && (
                      <motion.div 
                        layoutId="active-nav"
                        className="absolute -right-[1px] w-1 h-6 bg-blue-500 rounded-l-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                      />
                    )}
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-black text-white border-zinc-800 ml-2">
                    <p className="font-medium">{module.label}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
          </div>
        </TooltipProvider>

        <div className="flex flex-col gap-4">
          <button className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/5 transition-all">
            <Search size={20} />
          </button>
          <button className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/5 transition-all">
            <Star size={20} />
          </button>
          <button className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/5 transition-all">
            <Clock size={20} />
          </button>
          <Separator className="bg-white/10 w-8 mx-auto" />
          <button className="w-10 h-10 rounded-full border border-white/10 overflow-hidden bg-zinc-800">
            <img src="https://i.pravatar.cc/100?u=korteck" alt="User" referrerPolicy="no-referrer" />
          </button>
        </div>
      </div>

      {/* LEVEL 2: Sector Drawer */}
      <AnimatePresence>
        {activeModule && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-[280px] bg-[#0d0d11] border-r border-white/5 shadow-2xl relative z-20 flex flex-col pointer-events-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-500">{activeModule.label}</span>
                <button onClick={() => setActiveModule(null)} className="text-zinc-500 hover:text-white transition-colors">
                  <X size={14} />
                </button>
              </div>
              <h2 className="text-xl font-medium text-white mb-1">{activeModule.description}</h2>
            </div>
            
            <ScrollArea className="flex-1 px-3">
              <div className="flex flex-col gap-1 pb-6">
                {activeModule.submenus.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSubmenuClick(item)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group text-left",
                      activeSubmenu?.id === item.id 
                        ? "bg-white/10 text-white" 
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "transition-colors duration-200",
                        activeSubmenu?.id === item.id ? "text-white" : "text-zinc-500 group-hover:text-white"
                      )}>
                        {item.icon}
                      </span>
                      <span className="text-sm font-medium tracking-tight">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <Badge variant="outline" className={cn(
                          "px-1.5 py-0 text-[10px] h-4 bg-transparent border-white/10 text-zinc-400",
                          item.statusColor && `border-0 text-white ${item.statusColor}`
                        )}>
                          {item.badge}
                        </Badge>
                      )}
                      {item.children && <ChevronRight size={14} className={cn("transition-transform duration-200 opacity-40", activeSubmenu?.id === item.id && "rotate-90 opacity-100")} />}
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 bg-[#141419]/50 border-t border-white/5">
              <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black tracking-widest px-2 mb-2 uppercase">
                <Workflow size={12} className="text-blue-500 animate-pulse" /> IA Intelligence
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
                <p className="text-[11px] text-zinc-500 leading-relaxed italic">
                  "O setor de <span className="text-blue-400 font-bold">Corte CNC</span> está com capacidade ociosa. Recomendar antecipação da OS #4251."
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
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-[280px] bg-[#141414] border-r border-white/5 shadow-2xl relative z-10 flex flex-col pointer-events-auto"
          >
            <div className="p-6 flex items-center justify-between border-b border-white/5 h-[100px]">
              <div>
                <span className="text-xs font-bold tracking-widest text-zinc-500">{activeSubmenu.label}</span>
                <h3 className="text-sm font-medium text-white opacity-60">Submódulos</h3>
              </div>
            </div>

            <ScrollArea className="flex-1 p-3">
              <div className="flex flex-col gap-1">
                {activeSubmenu.children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => {
                      onChangeView?.(child.id);
                      setActiveModule(null);
                      setActiveSubmenu(null);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium group"
                  >
                    {child.label}
                    {child.badge && (
                      <Badge variant="outline" className="px-1.5 py-0 h-4 bg-white/10 border-0 text-white text-[10px]">
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
