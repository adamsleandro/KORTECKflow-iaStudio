import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/src/lib/ThemeContext';
import { 
  Calendar, 
  LayoutDashboard,
  Sliders,
  ShoppingCart, 
  Package, 
  Factory, 
  Wallet, 
  Building2, 
  GraduationCap, 
  Settings, 
  HelpCircle,
  ChevronRight,
  ChevronDown,
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

  // Toggle states of each main menu module
  const [gestaoExpanded, setGestaoExpanded] = useState(true);
  const [comercialExpanded, setComercialExpanded] = useState(true);
  const [suprimentosExpanded, setSuprimentosExpanded] = useState(false);
  const [producaoExpanded, setProducaoExpanded] = useState(true);
  const [financeiroExpanded, setFinanceiroExpanded] = useState(false);
  const [hrExpanded, setHrExpanded] = useState(false);
  const [educaExpanded, setEducaExpanded] = useState(false);
  const [sistemaExpanded, setSistemaExpanded] = useState(false);

  // Check if a module holds the active view state inside
  const isModuleActive = (moduleId: string) => {
    if (currentView === moduleId) return true;
    
    if (moduleId === 'calendario' && currentView === 'calendario') return true;
    if (moduleId === 'dashboard' && ['dashboard', 'dash-fin', 'dash-com', 'dash-prod', 'dash-est'].includes(currentView)) return true;
    if (moduleId === 'gestao' && ['gestao', 'ges-preco', 'ges-rrt', 'ges-bitola', 'ges-led-fonte', 'ges-pgv'].includes(currentView)) return true;
    if (moduleId === 'comercial' && [
      'comercial', 'crm-pipe', 'crm-follow', 'com-leads', 'op-vendas', 'op-ped', 'clientes',
      'com-atendimentos', 'com-projetos', 'com-orcamentos', 'com-servicos', 'com-campanhas', 'com-ftp'
    ].includes(currentView)) return true;
    if (moduleId === 'suprimentos' && ['suprimentos', 'sup-mp', 'sup-forn', 'sup-lista', 'scraps'].includes(currentView)) return true;
    if (moduleId === 'producao' && ['producao', 'prod-chao', 'prod-cnc', 'prod-imp', 'qual-exp', 'qual-retr', 'pcp-main', 'pcp-os', 'qualidade', 'expedicao'].includes(currentView)) return true;
    if (moduleId === 'financeiro' && [
      'financeiro', 'fin-visao', 'fin-pagar', 'fin-receber', 'fin-fluxo',
      'fin-colab', 'fin-fiscal', 'fin-sped', 'fin-notes', 'fin-notas', 'fin-os-restricao', 'fin-lancamentos-futuros', 'fin-faturamento'
    ].includes(currentView)) return true;
    if (moduleId === 'hr' && ['hr', 'hr-cad', 'hr-colab', 'hr-org', 'niveis', 'hierarchy', 'sys-levels', 'hr-cargos', 'hr-docs', 'hr-aso', 'hr-horas'].includes(currentView)) return true;
    if (moduleId === 'educa' && ['educa', 'edu-cursos', 'edu-trein', 'edu-cert', 'edu-carreira'].includes(currentView)) return true;
    if (moduleId === 'sistema' && ['sistema', 'sys-adm-gest', 'sys-users', 'usuarios', 'sys-perm', 'permissoes', 'sys-cfg-glob', 'sys-theme'].includes(currentView)) return true;
    return false;
  };

  const menuItems = [
    { id: 'calendario', label: 'Calendário', icon: <Calendar size={18} />, hasArrow: false },
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} />, hasArrow: false },
    { id: 'gestao', label: 'Gestão', icon: <Sliders size={18} />, hasArrow: true },
    { id: 'comercial', label: 'Comercial', icon: <ShoppingCart size={18} />, hasArrow: true },
    { id: 'suprimentos', label: 'Suprimentos', icon: <Package size={18} />, hasArrow: true },
    { id: 'producao', label: 'Produção', icon: <Factory size={18} />, hasArrow: true },
    { id: 'financeiro', label: 'Financeiro', icon: <Wallet size={18} />, hasArrow: true },
    { id: 'hr', label: 'RH', icon: <Building2 size={18} />, hasArrow: true },
    { id: 'educa', label: 'Educa CV', icon: <GraduationCap size={18} />, hasArrow: true },
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
          "w-[245px]",
          isLight 
            ? "bg-white border-zinc-200 shadow-[2px_0_30px_rgba(0,0,0,0.05)] text-zinc-900" 
            : "bg-[#150a21] border-transparent shadow-[2px_0_30px_rgba(0,0,0,0.4)] text-zinc-100"
        )}
      >
        <div className="flex flex-col w-full h-full">
          {/* Logo Branding */}
          <div className={cn(
            "h-[72px] px-5 flex items-center justify-between border-b",
            isLight ? "bg-white border-zinc-200" : "border-transparent bg-[#150a21]"
          )}>
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 100 100" className={cn("w-[38px] h-[38px] flex-shrink-0", isLight ? "text-purple-600" : "text-white")} fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" />
                <line x1="50" y1="10" x2="50" y2="90" />
                <line x1="29" y1="22" x2="29" y2="78" />
                <line x1="29" y1="22" x2="50" y2="90" />
                <line x1="50" y1="50" x2="71" y2="22" />
                <line x1="50" y1="50" x2="71" y2="78" />
              </svg>
              <div className="flex flex-col">
                <span className={cn("font-extrabold text-[15px] leading-tight tracking-tight mb-0.5", isLight ? "text-zinc-950" : "text-white")}>
                  KORTECK<span className={isLight ? "text-purple-600 font-extrabold" : "text-purple-400 font-medium"}>Flow</span>
                </span>
                <span className={cn("text-[10px] font-medium tracking-wide uppercase", isLight ? "text-zinc-500" : "text-zinc-400")}>ERP Industrial</span>
              </div>
            </div>
          </div>

          {/* Expandable Navigation Links list */}
          <div className="flex-1 py-4 overflow-y-auto scrollbar-none px-3 space-y-1">
            {menuItems.map((item) => {
              const active = isModuleActive(item.id);
              const isGestao = item.id === 'gestao';
              const isComercial = item.id === 'comercial';
              const isSuprimentos = item.id === 'suprimentos';
              const isProducao = item.id === 'producao';
              const isFinanceiro = item.id === 'financeiro';
              const isHR = item.id === 'hr';
              const isEduca = item.id === 'educa';
              const isSistema = item.id === 'sistema';

              return (
                <div key={item.id} className="flex flex-col">
                  <button
                    onClick={() => {
                      if (item.id === 'help') {
                        onChangeView?.('help');
                        onCloseMobile?.();
                        return;
                      }
                      
                      // Handle expansions toggle and route active tab
                      if (isGestao) {
                        setGestaoExpanded(!gestaoExpanded);
                        return;
                      }
                      if (isComercial) {
                        setComercialExpanded(!comercialExpanded);
                        return;
                      }
                      if (isSuprimentos) {
                        setSuprimentosExpanded(!suprimentosExpanded);
                        return;
                      }
                      if (isProducao) {
                        setProducaoExpanded(!producaoExpanded);
                        return;
                      }
                      if (isFinanceiro) {
                        setFinanceiroExpanded(!financeiroExpanded);
                        return;
                      }
                      if (isHR) {
                        setHrExpanded(!hrExpanded);
                        return;
                      }
                      if (isEduca) {
                        setEducaExpanded(!educaExpanded);
                        return;
                      }
                      if (isSistema) {
                        setSistemaExpanded(!sistemaExpanded);
                        return;
                      }
                      
                      // Simple route views
                      onChangeView?.(item.id);
                      onCloseMobile?.();
                    }}
                    className={cn(
                      "w-full h-10 px-3 rounded-lg flex items-center justify-between transition-all duration-200 group relative text-[13px] font-semibold border-none cursor-pointer",
                      active 
                        ? (isLight ? "bg-purple-50 text-purple-700 font-extrabold border border-purple-100 shadow-sm" : "bg-white/5 text-white font-bold")
                        : (isLight ? "text-zinc-650 hover:text-purple-700 hover:bg-purple-50/55" : "text-zinc-400 hover:text-white hover:bg-white/[0.03]")
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "transition-colors duration-200",
                        active 
                          ? (isLight ? "text-purple-600" : "text-purple-400")
                          : (isLight ? "text-zinc-500 group-hover:text-purple-600" : "text-zinc-400 group-hover:text-zinc-300")
                      )}>
                        {item.icon}
                      </div>
                      <span className="tracking-tight">{item.label}</span>
                    </div>

                    {item.hasArrow && (
                      ((isGestao && gestaoExpanded) || 
                       (isComercial && comercialExpanded) || 
                       (isSuprimentos && suprimentosExpanded) || 
                       (isProducao && producaoExpanded) || 
                       (isFinanceiro && financeiroExpanded) || 
                       (isHR && hrExpanded) || 
                       (isEduca && educaExpanded) || 
                       (isSistema && sistemaExpanded)) ? (
                        <ChevronDown 
                          size={14} 
                          className={cn("transition-all", isLight ? "text-zinc-500" : "text-zinc-400")} 
                        />
                      ) : (
                        <ChevronRight 
                          size={14} 
                          className={cn("opacity-40 group-hover:opacity-70 transition-all", isLight ? "text-zinc-500" : "text-zinc-400")} 
                        />
                      )
                    )}
                  </button>

                  {/* 3. GESTÃO SUB-ITEMS */}
                  {isGestao && gestaoExpanded && (
                    <div className="flex flex-col space-y-0.5 mt-0.5 ml-8 border-l border-zinc-200/40 pl-2">
                      {[
                        { id: 'ges-preco', label: 'Precificação' },
                        { id: 'ges-markup', label: 'Gestão de Preço (Markup)' },
                        { id: 'ges-rrt', label: 'Gestão de R.R.T.' },
                        { id: 'ges-produtos', label: 'Cadastro de Produto' },
                      ].map((subItem) => {
                        const isSubActive = currentView === subItem.id || (subItem.id === 'ges-markup' && currentView === 'gestao');
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              onChangeView?.(subItem.id);
                              onCloseMobile?.();
                            }}
                            className={cn(
                              "w-full h-8 px-3 rounded-lg flex items-center justify-start text-[12px] transition-all duration-150 border-none cursor-pointer",
                              isSubActive
                                ? (isLight ? "bg-purple-100/60 text-purple-700 font-bold" : "bg-white/10 text-white font-semibold")
                                : (isLight ? "text-zinc-650 hover:text-purple-700 hover:bg-purple-50/50" : "text-zinc-400 hover:text-white")
                            )}
                          >
                            <span className="truncate">{subItem.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* 4. COMERCIAL SUB-ITEMS */}
                  {isComercial && comercialExpanded && (
                    <div className="flex flex-col space-y-0.5 mt-0.5 ml-8 border-l border-zinc-200/40 pl-2">
                      {[
                        { id: 'clientes', label: 'CLIENTES' },
                        { id: 'crm-pipe', label: 'CRM' },
                        { id: 'com-projetos', label: 'OPERAÇÃO' },
                        { id: 'gestao-comercial', label: 'GESTÃO' },
                      ].map((subItem) => {
                        const isSubActive = currentView === subItem.id;
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              onChangeView?.(subItem.id);
                              onCloseMobile?.();
                            }}
                            className={cn(
                              "w-full h-8 px-3 rounded-lg flex items-center justify-between text-[12px] font-bold uppercase transition-all duration-150 border-none cursor-pointer",
                              isSubActive
                                ? (isLight ? "text-purple-700 font-extrabold bg-purple-50" : "text-purple-400")
                                : (isLight ? "text-zinc-500 hover:text-purple-700 hover:bg-purple-50/50" : "text-zinc-500 hover:text-zinc-300")
                            )}
                          >
                            <span className="truncate">{subItem.label}</span>
                            <ChevronDown size={12} className="opacity-50" />
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* 5. SUPRIMENTOS SUB-ITEMS */}
                  {isSuprimentos && suprimentosExpanded && (
                    <div className="flex flex-col space-y-0.5 mt-0.5 ml-8 border-l border-zinc-200/40 pl-2">
                      {[
                        { id: 'sup-mp', label: 'Matéria-prima' },
                        { id: 'sup-forn', label: 'Fornecedores' },
                        { id: 'sup-lista', label: 'Lista de Produtos' },
                        { id: 'suprimentos', label: 'Produtos (Estoque)' },
                        { id: 'scraps', label: 'Gestão de Retalhos' },
                      ].map((subItem) => {
                        const isSubActive = currentView === subItem.id;
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              onChangeView?.(subItem.id);
                              onCloseMobile?.();
                            }}
                            className={cn(
                              "w-full h-8 px-3 rounded-lg flex items-center justify-start text-[12px] transition-all duration-150 border-none cursor-pointer",
                              isSubActive
                                ? (isLight ? "bg-purple-100/60 text-purple-700 font-bold" : "bg-white/10 text-white font-semibold")
                                : (isLight ? "text-zinc-650 hover:text-purple-700 hover:bg-purple-50/50" : "text-zinc-400 hover:text-white")
                            )}
                          >
                            <span className="truncate">{subItem.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* 6. PRODUÇÃO SUB-ITEMS */}
                  {isProducao && producaoExpanded && (
                    <div className="flex flex-col space-y-0.5 mt-0.5 ml-8 border-l border-zinc-200/40 pl-2">
                      {[
                        { id: 'pcp-main', label: 'PCP', hasDot: true },
                        { id: 'producao', label: 'Produção' },
                        { id: 'qualidade', label: 'Qualidade & Expedição' },
                      ].map((subItem) => {
                        const isSubActive = currentView === subItem.id || (subItem.id === 'pcp-main' && currentView === 'pcp-main') || (subItem.id === 'producao' && currentView === 'producao') || (subItem.id === 'qualidade' && (currentView === 'qualidade' || currentView === 'qual-exp' || currentView === 'qual-retr'));
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              onChangeView?.(subItem.id);
                              onCloseMobile?.();
                            }}
                            className={cn(
                              "w-full h-8 px-3 rounded-lg flex items-center justify-between text-[12px] transition-all duration-150 border-none cursor-pointer",
                              isSubActive
                                ? (isLight ? "bg-purple-100/60 text-purple-700 font-bold" : "bg-white/10 text-white font-semibold")
                                : (isLight ? "text-zinc-650 hover:text-purple-700 hover:bg-purple-50/50" : "text-zinc-400 hover:text-white")
                            )}
                          >
                            <span className="truncate flex-1 text-left">{subItem.label}</span>
                            {subItem.hasDot && (
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* 7. FINANCEIRO SUB-ITEMS */}
                  {isFinanceiro && financeiroExpanded && (
                    <div className="flex flex-col space-y-0.5 mt-0.5 ml-8 border-l border-zinc-200/40 pl-2">
                      {[
                        { id: 'fin-visao', label: 'Visão Financeira' },
                        { id: 'fin-pagar', label: 'Contas a pagar' },
                        { id: 'fin-receber', label: 'Contas a receber' },
                        { id: 'fin-fluxo', label: 'Fluxo de caixa' },
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
                              "w-full h-8 px-3 rounded-lg flex items-center justify-start text-[12px] transition-all duration-150 border-none cursor-pointer",
                              isSubActive
                                ? (isLight ? "bg-purple-100/60 text-purple-700 font-bold" : "bg-white/10 text-white font-semibold")
                                : (isLight ? "text-zinc-650 hover:text-purple-700 hover:bg-purple-50/50" : "text-zinc-400 hover:text-white")
                            )}
                          >
                            <span className="truncate">{subItem.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* 8. HR SUB-ITEMS */}
                  {isHR && hrExpanded && (
                    <div className="flex flex-col space-y-0.5 mt-0.5 ml-8 border-l border-zinc-200/40 pl-2">
                      {[
                        { id: 'hr-colab', label: 'Contratação (Exame)' },
                        { id: 'hr', label: 'Colaboradores' },
                        { id: 'hr-docs', label: 'Documentação' },
                        { id: 'hr-aso', label: 'ASO e NRs' },
                        { id: 'hr-horas', label: 'Cálculo de Horas' },
                      ].map((subItem) => {
                        const isSubActive = currentView === subItem.id || (subItem.id === 'hr' && (currentView === 'hr' || currentView === 'hr-cad' || currentView === 'hr-org'));
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              onChangeView?.(subItem.id);
                              onCloseMobile?.();
                            }}
                            className={cn(
                              "w-full h-8 px-3 rounded-lg flex items-center justify-start text-[12px] transition-all duration-150 border-none cursor-pointer",
                              isSubActive
                                ? (isLight ? "bg-purple-100/60 text-purple-700 font-bold" : "bg-white/10 text-white font-semibold")
                                : (isLight ? "text-zinc-650 hover:text-purple-700 hover:bg-purple-50/50" : "text-zinc-400 hover:text-white")
                            )}
                          >
                            <span className="truncate">{subItem.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* 9. EDUCA CV SUB-ITEMS */}
                  {isEduca && educaExpanded && (
                    <div className="flex flex-col space-y-0.5 mt-0.5 ml-8 border-l border-zinc-200/40 pl-2">
                      {[
                        { id: 'edu-cursos', label: 'Cursos' },
                        { id: 'edu-trein', label: 'Treinamentos' },
                        { id: 'edu-cert', label: 'Certificados' },
                        { id: 'edu-carreira', label: 'Plano de Carreira' },
                      ].map((subItem) => {
                        const isSubActive = currentView === subItem.id;
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              onChangeView?.(subItem.id);
                              onCloseMobile?.();
                            }}
                            className={cn(
                              "w-full h-8 px-3 rounded-lg flex items-center justify-start text-[12px] transition-all duration-150 border-none cursor-pointer",
                              isSubActive
                                ? (isLight ? "bg-purple-100/60 text-purple-700 font-bold" : "bg-white/10 text-white font-semibold")
                                : (isLight ? "text-zinc-650 hover:text-purple-700 hover:bg-purple-50/50" : "text-zinc-400 hover:text-white")
                            )}
                          >
                            <span className="truncate">{subItem.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* 10. SISTEMA SUB-ITEMS */}
                  {isSistema && sistemaExpanded && (
                    <div className="flex flex-col space-y-0.5 mt-0.5 ml-8 border-l border-zinc-200/40 pl-2">
                      {[
                        { id: 'sys-theme', label: 'Temas' },
                        { id: 'usuarios', label: 'Usuários' },
                        { id: 'sys-adm-gest', label: 'Gestão de Adm' },
                        { id: 'permissoes', label: 'Permissões' },
                        { id: 'sys-cfg-glob', label: 'Config Globais' },
                      ].map((subItem) => {
                        const isSubActive = currentView === subItem.id;
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              onChangeView?.(subItem.id);
                              onCloseMobile?.();
                            }}
                            className={cn(
                              "w-full h-8 px-3 rounded-lg flex items-center justify-start text-[12px] transition-all duration-150 border-none cursor-pointer",
                              isSubActive
                                ? (isLight ? "bg-purple-100/60 text-purple-700 font-bold" : "bg-white/10 text-white font-semibold")
                                : (isLight ? "text-zinc-650 hover:text-purple-700 hover:bg-purple-50/50" : "text-zinc-400 hover:text-white")
                            )}
                          >
                            <span className="truncate">{subItem.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer Upgradable Badge */}
          <div className="p-4 mx-3 mb-4 rounded-xl bg-gradient-to-br from-[#773be6] to-[#602eb6] flex flex-col mt-auto shrink-0 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest mb-0.5">
              KORTECK Flow
            </span>
            <span className="text-sm font-extrabold text-white mb-3">
              Enterprise Edition
            </span>
            <button className="bg-orange-500 hover:bg-orange-600 transition-colors text-white py-1.5 px-3 rounded text-[11px] font-bold w-fit shadow-md">
              Atualizar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
