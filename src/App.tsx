/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from '@/src/components/Sidebar';
import { Menu, X, ChevronLeft, Search, Bell, LogOut, User } from 'lucide-react';
import { Dashboard } from '@/src/components/Dashboard';
import { Production } from '@/src/components/Production';
import { Commercial } from '@/src/components/Commercial';
import { Stock } from '@/src/components/Stock';
import { HR } from '@/src/components/HR';
import { Designer } from '@/src/components/Designer';
import { Projects } from '@/src/components/Projects';
import { EducaCV } from '@/src/components/EducaCV';
import { Clients } from '@/src/components/Clients';
import { CRMFollow } from '@/src/components/CRMFollow';
import { Financeiro } from '@/src/components/Financeiro';
import { Admin } from '@/src/components/Admin';
import { UsersManagement } from '@/src/components/Users';
import { Permissions } from '@/src/components/Permissions';
import { LevelsManagement } from '@/src/components/Levels';
import { ThemeSettings } from '@/src/components/ThemeSettings';
import { GlobalSettings } from '@/src/components/GlobalSettings';
import { TooltipProvider } from '@/components/ui/tooltip';
import { GlobalAudit } from '@/src/components/common/GlobalAudit';
import { useStore } from '@/src/lib/store';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const auditLogs = useStore((state) => state.auditLogs);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
      case 'dash-fin':
      case 'dash-com':
      case 'dash-prod':
      case 'dash-est':
        return <Dashboard />;
      case 'prod-chao':
      case 'prod-cnc':
      case 'prod-imp':
      case 'qual-exp':
      case 'qual-retr':
      case 'pcp-main':
      case 'pcp-os':
      case 'producao':
        return <Production initialTab={currentView} />;
      case 'crm-pipe':
      case 'comercial':
      case 'crm-follow':
      case 'com-leads':
      case 'op-vendas':
      case 'op-ped':
      case 'clientes':
      case 'com-atendimentos':
      case 'com-projetos':
      case 'com-orcamentos':
      case 'com-servicos':
      case 'com-campanhas':
      case 'com-ftp':
        return <Commercial initialTab={currentView} />;
      case 'sup-mp':
      case 'sup-forn':
      case 'sup-lista':
      case 'suprimentos':
      case 'scraps':
        return <Stock initialTab={currentView} />;
      case 'financeiro':
      case 'fin-visao':
      case 'fin-pagar':
      case 'fin-receber':
      case 'fin-fluxo':
      case 'fin-colab':
      case 'fin-fiscal':
      case 'fin-sped':
      case 'fin-notas':
      case 'fin-os-restricao':
      case 'fin-lancamentos-futuros':
      case 'fin-faturamento':
        return <Financeiro initialTab={currentView} />;
      case 'hr-cad':
      case 'hr-colab':
      case 'hr-org':
      case 'hr':
        return <HR initialTab={currentView} />;
      case 'op-arte':
        return <Designer />;
      case 'op-proj':
        return <Projects />;
      case 'edu-cursos':
      case 'edu-trein':
      case 'educa':
        return <EducaCV />;
      case 'sys-adm-gest':
      case 'sistema':
        return <Admin />;
      case 'sys-users':
      case 'usuarios':
        return <UsersManagement />;
      case 'sys-perm':
      case 'permissoes':
        return <Permissions />;
      case 'sys-levels':
      case 'hr-cargos':
      case 'niveis':
      case 'hierarchy':
        return <LevelsManagement />;
      case 'sys-theme':
        return <ThemeSettings />;
      case 'sys-cfg-glob':
        return <GlobalSettings />;
      default:
        return (
          <div className="flex items-center justify-center h-screen text-zinc-500 animate-in fade-in duration-500">
            <div className="text-center p-12 border border-white/5 bg-white/[0.01] rounded-3xl">
              <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-[0.2em] italic">Módulo em Integração</h2>
              <p className="text-sm font-medium opacity-60">
                A funcionalidade <span className="text-white font-bold tracking-tight">[{currentView.toUpperCase()}]</span> está sendo configurada<br/>
                pelo núcleo de Inteligência Operacional KORTECK.
              </p>
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="mt-6 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white underline underline-offset-8 decoration-white/20"
              >
                Voltar para o Dashboard
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10 selection:text-white overflow-x-hidden">
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-40 w-full h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6">
           <div className="flex items-center gap-3" onClick={() => {
             setCurrentView('dashboard');
             setIsMobileMenuOpen(false);
           }}>
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                <span className="text-white font-black text-lg italic tracking-tighter">K</span>
              </div>
              <span className="text-sm font-black text-white uppercase italic tracking-tighter">KORTECK<span className="text-blue-600">.</span></span>
           </div>

           <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 rounded-full bg-white/5 text-white flex items-center justify-center border border-white/10"
           >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
           </button>
        </header>

        <Sidebar 
          currentView={currentView}
          onChangeView={(view) => {
            setCurrentView(view);
            setIsMobileMenuOpen(false);
          }} 
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Main Content Area */}
        <main className="pl-0 md:pl-[245px] min-h-screen transition-all duration-300 relative flex flex-col">
          {/* Top Header - Mockup Standard Header */}
          <header className="hidden md:flex sticky top-0 z-40 w-full h-16 bg-white dark:bg-[#0c0c10] border-b border-zinc-200 dark:border-zinc-800/85 items-center justify-between px-8 select-none shadow-[0_1px_5px_rgba(0,0,0,0.01)] shrink-0">
             {/* Left Section of Header */}
             <div className="flex items-center gap-6">
                <button 
                  onClick={() => setCurrentView('dashboard')}
                  className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer text-zinc-600 dark:text-zinc-400"
                >
                  <ChevronLeft size={16} />
                </button>
                
                <span className="text-[13px] font-black tracking-tight text-purple-700 dark:text-purple-400 uppercase">
                  Korteck{" "}<span className="text-zinc-300 dark:text-zinc-700">::</span>{" "}955716
                </span>

                {/* KPI / Priority Indicators */}
                <div className="flex items-center gap-2 text-[11px] font-black">
                   <div className="bg-[#12b347] text-white px-2.5 h-6 rounded-full flex items-center justify-center gap-1 shadow-[0_1px_4px_rgba(18,179,71,0.2)]">
                      <span>173</span>
                   </div>
                   <div className="bg-[#ffcc00] text-zinc-950 px-2.5 h-6 rounded-full flex items-center justify-center gap-1 shadow-[0_1px_4px_rgba(255,204,0,0.2)]">
                      <span>1</span>
                   </div>
                   <div className="bg-[#d92c2c] text-white px-2.5 h-6 rounded-full flex items-center justify-center gap-1 shadow-[0_1px_4px_rgba(217,44,44,0.2)]">
                      <span>96</span>
                   </div>
                </div>
             </div>

             {/* Center Search Pill */}
             <div className="flex-1 max-w-sm relative mx-8">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={15} />
                <input 
                  type="text" 
                  placeholder="Buscar" 
                  className="w-full h-9 bg-[#f4f5f7] dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-200 border-0 focus:ring-1 focus:ring-purple-500 rounded-full pl-9 pr-4 text-xs font-semibold placeholder-zinc-400"
                />
             </div>

             {/* Right Section Tools */}
             <div className="flex items-center gap-4">
                {/* Custom purple helmet profile badge from mockup */}
                <button 
                  onClick={() => setCurrentView('sys-theme')}
                  className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950/40 border-2 border-purple-500 flex items-center justify-center text-purple-600 dark:text-purple-400 hover:scale-[1.03] transition-all cursor-pointer shadow-[0_0_15px_rgba(124,58,237,0.15)] overflow-hidden"
                >
                   <User size={18} className="stroke-[2.5]" />
                </button>

                <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800" />

                <button className="text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 relative p-1.5 transition-all">
                  <Bell size={18} />
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-purple-600 animate-ping" />
                </button>

                <button 
                  onClick={() => {
                    const confirmLog = window.confirm("Deseja desconectar do sistema KORTECKflowERP?");
                    if (confirmLog) {
                      setCurrentView('dashboard');
                    }
                  }}
                  className="text-zinc-400 hover:text-rose-500 p-1.5 transition-colors cursor-pointer"
                  title="Fazer Logout"
                >
                  <LogOut size={18} />
                </button>
             </div>
          </header>

          <div className="mx-auto w-full max-w-[1700px] flex-1">
            {renderView()}
          </div>

          {/* Mobile Navigation Disclaimer (Optional, if needed) */}
          <div className="md:hidden h-16 shrink-0" /> {/* Spacer for mobile nav if it was bottom-fixed */}

          {/* Global Floating Actions (Optional premium touch) */}
          <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 flex flex-col gap-3 z-40 scale-90 md:scale-100">
             <button className="w-12 h-12 rounded-full bg-white text-black shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                <div className="w-6 h-6 border-4 border-black rotate-45" />
             </button>
          </div>

          <GlobalAudit 
            logs={auditLogs} 
            isOpen={isAuditOpen} 
            onToggle={() => setIsAuditOpen(!isAuditOpen)} 
          />
        </main>
      </div>
    </TooltipProvider>
  );
}


