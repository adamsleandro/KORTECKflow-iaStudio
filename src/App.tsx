/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from '@/src/components/Sidebar';
import { Dashboard } from '@/src/components/Dashboard';
import { Production } from '@/src/components/Production';
import { Commercial } from '@/src/components/Commercial';
import { Stock } from '@/src/components/Stock';
import { HR } from '@/src/components/HR';
import { Designer } from '@/src/components/Designer';
import { EducaCV } from '@/src/components/EducaCV';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
      case 'dash-fin':
      case 'dash-com':
      case 'dash-prod':
      case 'dash-est':
        return <Dashboard />;
      case 'prod-chao':
      case 'pcp-main':
      case 'pcp-os':
      case 'producao':
        return <Production />;
      case 'crm-pipe':
      case 'comercial':
      case 'op-ped':
        return <Commercial />;
      case 'sup-mp':
      case 'suprimentos':
      case 'scraps':
        return <Stock />;
      case 'hr-cad':
      case 'hr-colab':
      case 'hr':
        return <HR />;
      case 'op-arte':
        return <Designer />;
      case 'edu-cursos':
      case 'edu-trein':
      case 'educa':
        return <EducaCV />;
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
      <div className="min-h-screen bg-[#050505] text-zinc-200 font-sans selection:bg-white/10 selection:text-white overflow-x-hidden">
        <Sidebar onChangeView={setCurrentView} />
        
        {/* Main Content Area */}
        <main className="pl-16 min-h-screen transition-all duration-500 ease-in-out relative">
          <div className="mx-auto w-full max-w-[1700px] pb-20">
            {renderView()}
          </div>

          {/* Global Floating Actions (Optional premium touch) */}
          <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-40">
             <button className="w-12 h-12 rounded-full bg-white text-black shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                <div className="w-6 h-6 border-4 border-black rotate-45" />
             </button>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}


