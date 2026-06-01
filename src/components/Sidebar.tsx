import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/src/lib/ThemeContext';
import { 
  Calendar, 
  Building2, 
  ShoppingCart, 
  Wallet, 
  Package, 
  Factory, 
  Settings, 
  HelpCircle,
  ChevronRight,
  ChevronDown,
  ShieldAlert,
  Sliders,
  Menu,
  X,
  GraduationCap
} from 'lucide-react';

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
  const { theme } = useTheme();
  const isLight = theme === 'ash-light';

  const [comercialExpanded, setComercialExpanded] = useState(true);
  const [financeiroExpanded, setFinanceiroExpanded] = useState(true);
  const [producaoExpanded, setProducaoExpanded] = useState(true);

  // Check which module is active
  const isModuleActive = (moduleId: string) => {
    if (currentView === moduleId) return true;
    
    // Map view states to parents
    if (moduleId === 'dashboard' && ['dashboard', 'dash-fin', 'dash-com', 'dash-prod', 'dash-est'].includes(currentView)) return true;
    if (moduleId === 'comercial' && [
      'comercial', 'crm-pipe', 'crm-follow', 'com-leads', 'op-vendas', 'op-ped', 'clientes',
      'com-atendimentos', 'com-orcamentos', 'com-servicos', 'com-campanhas', 'com-ftp'
    ].includes(currentView)) return true;
    if (moduleId === 'suprimentos' && ['suprimentos', 'sup-mp', 'sup-forn', 'sup-lista', 'scraps'].includes(currentView)) return true;
    if (moduleId === 'producao' && ['producao', 'prod-chao', 'prod-cnc', 'prod-imp', 'qual-exp', 'qual-retr', 'pcp-main', 'pcp-os'].includes(currentView)) return true;
    if (moduleId === 'financeiro' && [
      'financeiro', 'fin-visao', 'fin-pagar', 'fin-receber', 'fin-fluxo',
      'fin-colab', 'fin-fiscal', 'fin-sped', 'fin-notes', 'fin-notas', 'fin-os-restricao', 'fin-lancamentos-futuros', 'fin-faturamento'
    ].includes(currentView)) return true;
    if (moduleId === 'hr' && ['hr', 'hr-cad', 'hr-colab', 'hr-org', 'niveis', 'hierarchy', 'sys-levels', 'hr-cargos'].includes(currentView)) return true;
    if (moduleId === 'educa' && ['educa', 'edu-cursos', 'edu-trein'].includes(currentView)) return true;
    if (moduleId === 'sistema' && ['sistema', 'sys-adm-gest', 'sys-users', 'usuarios', 'sys-perm', 'permissoes', 'sys-cfg-glob', 'sys-theme'].includes(currentView)) return true;
    return false;
  };

  const menuItems = [
    { id: 'dashboard', label: 'Calendário', icon: <Calendar size={18} />, hasArrow: false },
    { id: 'hr', label: 'RH', icon: <Building2 size={18} />, hasArrow: false },
    { id: 'comercial', label: 'Comercial', icon: <ShoppingCart size={18} />, hasArrow: false },
    { id: 'financeiro', label: 'Financeiro', icon: <Wallet size={18} />, hasArrow: true },
    { id: 'suprimentos', label: 'Suprimentos', icon: <Package size={18} />, hasArrow: true },
    { id: 'producao', label: 'Produção', icon: <Factory size={18} />, hasArrow: true },
    { id: 'educa', label: 'EducaCV', icon: <GraduationCap size={18} />, hasArrow: false },
    { id: 'sistema', label: 'Sistema', icon: <Settings size={18} />, hasArrow: true },
    { id: 'help', label: 'Ajuda', icon: <HelpCircle size={18} />, hasArrow: false },
  ];

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

      <div 
        ref={sidebarRef} 
        className={cn(
          "flex h-screen fixed left-0 top-0 z-50 select-none transition-all duration-300 border-r",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "w-[245px]", // Precise width of the mockup sidebar
          isLight 
            ? "bg-white border-zinc-200 shadow-[2px_0_10px_rgba(0,0,0,0.02)]" 
            : "bg-[#09090b] border-zinc-800 shadow-[2px_0_30px_rgba(0,0,0,0.4)]"
        )}
      >
        <div className="flex flex-col w-full h-full">
          {/* Logo Branding (Mockup: mubi sys -> KORTECKflowERP) */}
          <div className={cn(
            "h-16 px-6 flex items-center justify-between border-b",
            isLight ? "border-zinc-100 bg-[#fdfdfd]" : "border-zinc-800/80 bg-zinc-950/20"
          )}>
            <div className="flex items-center gap-2">
              <span className={cn(
                "font-extrabold text-[15px] tracking-tight uppercase",
                isLight ? "text-zinc-950" : "text-white"
              )}>
                KORTECK<span className="text-purple-600 lowercase font-medium">flowERP</span>
              </span>
            </div>
          </div>

          {/* User Badge: Custom Rounded Black Circle with NK Initials */}
          <div className={cn(
            "flex flex-col items-center py-5 border-b",
            isLight ? "border-zinc-100 bg-white" : "border-zinc-850 bg-zinc-950/10"
          )}>
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center shadow-sm mb-2 transition-transform hover:scale-105",
              isLight ? "bg-zinc-900 border border-zinc-800" : "bg-zinc-100 border border-zinc-200"
            )}>
              <span className={cn(
                "font-black text-base tracking-tighter",
                isLight ? "text-white" : "text-zinc-900"
              )}>
                NK
              </span>
            </div>
            <span className={cn(
              "text-[12px] font-bold tracking-tight",
              isLight ? "text-zinc-800" : "text-zinc-200"
            )}>
              Adm do Sistema
            </span>
          </div>

          {/* Navigation Links List */}
          <div className="flex-1 py-4 overflow-y-auto scrollbar-none px-3 space-y-1">
            {menuItems.map((item) => {
              const active = isModuleActive(item.id);
              const isComercial = item.id === 'comercial';
              const isFinanceiro = item.id === 'financeiro';
              return (
                <div key={item.id} className="flex flex-col">
                  <button
                    onClick={() => {
                      // Check special action overrides
                      if (item.id === 'help') {
                        alert("KORTECK Ajuda: Central de Suporte e Instruções de Uso.");
                        return;
                      }
                      if (isComercial) {
                        onChangeView?.('comercial');
                        onCloseMobile?.();
                        return;
                      }
                      if (isFinanceiro) {
                        setFinanceiroExpanded(!financeiroExpanded);
                        onChangeView?.('fin-fluxo');
                        onCloseMobile?.();
                        return;
                      }
                      if (item.id === 'producao') {
                        setProducaoExpanded(!producaoExpanded);
                        onChangeView?.('pcp-main');
                        onCloseMobile?.();
                        return;
                      }
                      onChangeView?.(item.id);
                      onCloseMobile?.();
                    }}
                    className={cn(
                      "w-full h-11 px-4 rounded-xl flex items-center justify-between transition-all duration-200 group relative text-sm font-semibold border border-transparent",
                      active 
                        ? isLight
                          ? "bg-purple-50 text-purple-700 font-bold border-purple-100 shadow-[0_2px_8px_rgba(124,58,237,0.06)]"
                          : "bg-purple-950/40 text-purple-300 font-bold border-purple-900/30 shadow-[0_2px_8px_rgba(124,58,237,0.1)]"
                        : isLight
                          ? "text-zinc-650 hover:text-zinc-950 hover:bg-zinc-150/40"
                          : "text-zinc-400 hover:text-white hover:bg-white/[0.03]"
                    )}
                  >
                    {/* Item Indicator bar on active states */}
                    {active && (
                      <div className="absolute left-1 w-[4px] h-5 rounded-full bg-purple-600" />
                    )}

                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "transition-colors duration-200",
                        active 
                          ? isLight ? "text-purple-600" : "text-purple-400"
                          : "text-zinc-400 group-hover:text-zinc-650 dark:group-hover:text-zinc-200"
                      )}>
                        {item.icon}
                      </div>
                      <span className="tracking-tight">{item.label}</span>
                    </div>

                    {item.hasArrow && (
                      ((isComercial && comercialExpanded) || (isFinanceiro && financeiroExpanded) || (item.id === 'producao' && producaoExpanded)) ? (
                        <ChevronDown 
                          size={14} 
                          className={cn(
                            "opacity-50 transition-all",
                            active ? "text-purple-650" : "text-zinc-400"
                          )} 
                        />
                      ) : (
                        <ChevronRight 
                          size={14} 
                          className={cn(
                            "opacity-30 group-hover:opacity-60 transition-all",
                            active ? "text-purple-600 opacity-60 translate-x-0.5" : "text-zinc-400"
                          )} 
                        />
                      )
                    )}
                  </button>

                  {/* Financeiro sub-items rendered with layout indent */}
                  {isFinanceiro && financeiroExpanded && (
                    <div className="pl-6 pr-1 py-1 space-y-1 mt-1 font-sans border-l border-zinc-200/50 dark:border-zinc-800/50 ml-6">
                      {[
                        { id: 'fin-fluxo', label: 'Fluxo de caixa' },
                        { id: 'fin-colab', label: 'Colaboradores' },
                        { id: 'fin-pagar', label: 'Contas a pagar' },
                        { id: 'fin-receber', label: 'Contas a receber' },
                        { id: 'fin-fiscal', label: 'Fiscal' },
                        { id: 'fin-sped', label: 'SPED Fiscal' },
                        { id: 'fin-notas', label: 'Monitor de notas' },
                        { id: 'fin-os-restricao', label: 'O.Ss com restrição' },
                        { id: 'fin-lancamentos-futuros', label: 'Lançamentos futuros' },
                        { id: 'fin-faturamento', label: 'Faturamento' },
                      ].map((subItem) => {
                        const isSubActive = currentView === subItem.id || (subItem.id === 'fin-fluxo' && (currentView === 'financeiro' || currentView === 'fin-visao'));
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              onChangeView?.(subItem.id);
                              onCloseMobile?.();
                            }}
                            className={cn(
                              "w-full h-8.5 px-3 rounded-lg flex items-center justify-between text-xs font-semibold transition-all duration-150 border border-transparent",
                              isSubActive
                                ? isLight
                                  ? "bg-purple-100/60 text-purple-700 font-extrabold border-purple-200/40"
                                  : "bg-purple-900/30 text-purple-300 font-extrabold border-purple-800/30"
                                : isLight
                                  ? "text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100/50"
                                  : "text-zinc-400 hover:text-white hover:bg-white/[0.015]"
                            )}
                          >
                            <span className="truncate">{subItem.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {item.id === 'producao' && producaoExpanded && (
                    <div className="pl-6 pr-1 py-1 space-y-1 mt-1 font-sans border-l border-zinc-200/50 dark:border-zinc-800/50 ml-6">
                      {[
                        { id: 'pcp-main', label: 'PCP', hasDot: true },
                        { id: 'producao', label: 'Produção' },
                        { id: 'sup-lista', label: 'Almoxarifado' },
                        { id: 'prod-diario', label: 'Diário de bordo' },
                        { id: 'prod-acompanhamento', label: 'Acompanhamento produção' },
                      ].map((subItem) => {
                        const isSubActive = currentView === subItem.id || (subItem.id === 'pcp-main' && currentView === 'pcp-main') || (subItem.id === 'producao' && currentView === 'producao');
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              onChangeView?.(subItem.id);
                              onCloseMobile?.();
                            }}
                            className={cn(
                              "w-full h-8.5 px-3 rounded-lg flex items-center justify-between text-xs font-semibold transition-all duration-150 border border-transparent",
                              isSubActive
                                ? isLight
                                  ? "bg-purple-100/60 text-purple-700 font-extrabold border-purple-200/40"
                                  : "bg-purple-900/30 text-purple-300 font-extrabold border-purple-800/30"
                                : isLight
                                  ? "text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100/50"
                                  : "text-zinc-400 hover:text-white hover:bg-white/[0.015]"
                            )}
                          >
                            <span className="truncate">{subItem.label}</span>
                            {subItem.hasDot && (
                              <span className="w-2 h-2 rounded-full bg-red-500 shadow-sm animate-pulse shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer Security Badge */}
          <div className={cn(
            "p-4 border-t text-center flex items-center justify-center gap-2",
            isLight ? "border-zinc-100 bg-[#fcfcfc]" : "border-zinc-800 bg-zinc-950/20"
          )}>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className={cn(
              "text-[10px] font-bold tracking-tight uppercase",
              isLight ? "text-zinc-500" : "text-zinc-500"
            )}>
              Korteck Secure Online
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
