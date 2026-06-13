import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  Activity, 
  Cpu, 
  Printer, 
  Scissors, 
  Layers, 
  Wrench, 
  Server, 
  AlertTriangle, 
  Gauge, 
  User, 
  Clock, 
  Tv,
  ArrowRight,
  RefreshCw,
  Sparkles,
  Zap,
  Boxes
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface PcpCard {
  id: string;
  subId: string;
  client: string;
  details: string;
  date: string;
  deliveryType: 'Instalado' | 'Cliente Retira';
  status: 'Aguardando' | 'Em produção' | 'Finalizado' | 'Restrição';
  laneId: 'layout' | 'laser' | 'router' | 'impressao' | 'plotter';
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface HeatmapProductionProps {
  cards: PcpCard[];
  isLight: boolean;
}

export function HeatmapProduction({ cards, isLight }: HeatmapProductionProps) {
  const [selectedMachineId, setSelectedMachineId] = useState<string | null>(null);
  const [viewLayout, setViewLayout] = useState<'blueprint' | 'grid'>('blueprint');
  const [extraSimulatorCarga, setExtraSimulatorCarga] = useState<Record<string, number>>({});

  // Filtrar ordens ativas (não finalizadas)
  const activeCards = useMemo(() => {
    return cards.filter(c => c.status !== 'Finalizado');
  }, [cards]);

  // Lista de máquinas industriais KORTECK e sua lógica de calor dinâmico
  const machines = useMemo(() => {
    // Agrupar cartões por raia do PCP
    const cardsByLane = {
      layout: activeCards.filter(c => c.laneId === 'layout'),
      laser: activeCards.filter(c => c.laneId === 'laser'),
      router: activeCards.filter(c => c.laneId === 'router'),
      impressao: activeCards.filter(c => c.laneId === 'impressao'),
      plotter: activeCards.filter(c => c.laneId === 'plotter'),
    };

    const initialMachines = [
      {
        id: 'M-1',
        name: 'Router CNC 3020 Premium',
        type: 'Corte e Usinagem Pesada (ACM, Acrílico)',
        laneId: 'router' as const,
        operator: 'Felipe S.',
        baseOee: 89,
        gridPos: 'col-start-1 col-end-3 row-start-2',
        x: '35%',
        y: '22%',
        getLoad: () => {
          const osCount = cardsByLane.router.length;
          const extra = extraSimulatorCarga['M-1'] || 0;
          return Math.min(100, Math.max(8, osCount * 30 + extra));
        },
        jobs: cardsByLane.router,
        desc: 'Unidade principal de fresagem CNC de alta velocidade com fuso de 5HP. Responsável pelo corte pantográfico de fachadas e rebaixos V-Groove.',
        room: 'Setor de Usinagem CNC'
      },
      {
        id: 'M-2',
        name: 'Laser Fiber Metal Max 01',
        type: 'Corte de Chapas de Aço e Inox',
        laneId: 'laser' as const,
        operator: 'Carlos L.',
        baseOee: 86,
        gridPos: 'col-start-3 col-end-4 row-start-2',
        x: '63%',
        y: '22%',
        getLoad: () => {
          const osCount = cardsByLane.laser.length;
          const extra = extraSimulatorCarga['M-2'] || 0;
          return Math.min(100, Math.max(5, osCount * 25 + extra));
        },
        jobs: cardsByLane.laser,
        desc: 'Laser de fibra óptica de 3000W para cortes complexos e de altíssima precisão em chapas galvanizadas, alumínio e aço inoxidável.',
        room: 'Setor de Usinagem CNC'
      },
      {
        id: 'M-3',
        name: 'Plotter UV-Gel Premium X',
        type: 'Impressão Digital de Alta Definição',
        laneId: 'impressao' as const,
        operator: 'Julia R.',
        baseOee: 92,
        gridPos: 'col-start-1 col-end-2 row-start-4',
        x: '20%',
        y: '68%',
        getLoad: () => {
          const osCount = cardsByLane.impressao.length;
          const extra = extraSimulatorCarga['M-3'] || 0;
          return Math.min(100, Math.max(12, osCount * 20 + extra));
        },
        jobs: cardsByLane.impressao,
        desc: 'Impressora industrial rolo a rolo com tecnologia UV-Gel. Permite secagem instantânea e cura flexível de alta durabilidade para painéis.',
        room: 'Sala Limpa / Impressão'
      },
      {
        id: 'M-4',
        name: 'Dobradora Hidráulica CNC',
        type: 'Modelagem e Conformação de Chapas',
        laneId: 'router' as const, // compartilhada com o fluxo router
        operator: 'Ricardo M.',
        baseOee: 78,
        gridPos: 'col-start-4 col-end-5 r-start-2',
        x: '85%',
        y: '30%',
        getLoad: () => {
          // compartilhada secundariamente
          const osCount = cardsByLane.router.length + cardsByLane.laser.length;
          const extra = extraSimulatorCarga['M-4'] || 0;
          return Math.min(100, Math.max(10, Math.round(osCount * 12 + extra)));
        },
        jobs: cardsByLane.router.slice(0, 2),
        desc: 'Dobradora servo-assistida de 100 toneladas para conformação perfeita de cantoneiras, bandejas de ACM e caixas metálicas de ACM.',
        room: 'Estamparia / Dobra'
      },
      {
        id: 'M-5',
        name: 'Serralheria & Solda TIG/MIG',
        type: 'Estruturação de Painéis e Metalurgia',
        laneId: 'laser' as const, // dependente de corte
        operator: 'Equipe Serralheria A',
        baseOee: 85,
        gridPos: 'col-start-2 col-end-4 row-start-4',
        x: '50%',
        y: '72%',
        getLoad: () => {
          const osCount = cardsByLane.laser.length + cardsByLane.router.length;
          const extra = extraSimulatorCarga['M-5'] || 0;
          return Math.min(100, Math.max(15, osCount * 18 + extra));
        },
        jobs: [...cardsByLane.laser, ...cardsByLane.router].slice(0, 3),
        desc: 'Cabines de soldagem e fabricação mecânica de pilares estruturais para totens gigantescos, pórticos metálicos e painéis frontlight.',
        room: 'Galpão de Estrutura'
      },
      {
        id: 'M-6',
        name: 'Plotter de Recorte Faca Graphtec',
        type: 'Recorte de Adesivos e Vinil Autocolante',
        laneId: 'plotter' as const,
        operator: 'Maria T.',
        baseOee: 94,
        gridPos: 'col-start-4 col-end-5 row-start-4',
        x: '82%',
        y: '70%',
        getLoad: () => {
          const osCount = cardsByLane.plotter.length;
          const extra = extraSimulatorCarga['M-6'] || 0;
          return Math.min(100, Math.max(5, osCount * 40 + extra));
        },
        jobs: cardsByLane.plotter,
        desc: 'Equipamento de altíssima velocidade e pressão regulável para corte de adesivos de revestimento, máscaras de pintura e vinis refletivos.',
        room: 'Sala Limpa / Impressão'
      }
    ];

    return initialMachines.map(m => {
      const load = m.getLoad();
      // Classificar severidade térmica
      let colorClass = 'bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.3)] text-blue-400 border-blue-500/30';
      let textStatus = 'Ociosa / Disponível';
      let colorHex = '#3b82f6';

      if (load > 85) {
        colorClass = 'bg-red-500/35 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.73)] text-red-400 animate-pulse';
        textStatus = 'Sobrecarga Crítica';
        colorHex = '#ef4444';
      } else if (load > 65) {
        colorClass = 'bg-amber-500/30 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.5)] text-amber-400';
        textStatus = 'Carga Elevada';
        colorHex = '#f59e0b';
      } else if (load > 30) {
        colorClass = 'bg-emerald-500/20 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.3)] text-emerald-400';
        textStatus = 'Operando Estável';
        colorHex = '#10b981';
      }

      return {
        ...m,
        load,
        colorClass,
        textStatus,
        colorHex
      };
    });
  }, [activeCards, extraSimulatorCarga]);

  // Estatísticas globais do Mapa Térmico
  const globalStats = useMemo(() => {
    const totalLoad = machines.reduce((acc, curr) => acc + curr.load, 0);
    const avgLoad = Math.round(totalLoad / machines.length);
    const criticalCount = machines.filter(m => m.load > 85).length;
    const warningCount = machines.filter(m => m.load > 65 && m.load <= 85).length;
    const activeJobsLength = activeCards.length;

    return {
      avgLoad,
      criticalCount,
      warningCount,
      activeJobsLength
    };
  }, [machines, activeCards]);

  const handleSimulateLoad = (machineId: string, value: number) => {
    setExtraSimulatorCarga(prev => ({
      ...prev,
      [machineId]: Math.min(100, Math.max(-100, (prev[machineId] || 0) + value))
    }));
  };

  const handleResetSimulation = () => {
    setExtraSimulatorCarga({});
  };

  const selectedMachine = useMemo(() => {
    if (!selectedMachineId) return null;
    return machines.find(m => m.id === selectedMachineId) || null;
  }, [selectedMachineId, machines]);

  return (
    <div className="space-y-6">
      {/* HEADER DO HEATMAP */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-950/20 dark:bg-zinc-900/30 border-none dark:border-transparent">
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-[10px] font-black tracking-widest text-amber-500 uppercase font-mono">// TELEMETRIA INDUSTRIAL DE OPERAÇÕES KORTECK</span>
            <Badge variant="outline" className="text-[8px] border-red-500/20 bg-red-500/5 text-red-500 animate-pulse font-black uppercase tracking-wider">Tempo Real</Badge>
          </div>
          <h2 className="text-lg font-black text-white uppercase italic tracking-tight font-sans flex items-center gap-2">
            <Flame className="text-red-500 stroke-[2.2]" size={18} />
            Mapa de Calor Operacional <span className="text-amber-500">:: MES Chão de Fábrica</span>
          </h2>
          <p className="text-xs text-zinc-400 font-normal">
            Análise térmica dinâmica baseada no fluxo de ordens de serviço (OS) ativas. Máquinas sobrecarregadas são indicadas por espectros de calor infravermelho.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-center shrink-0">
          <div className="flex bg-black/40 p-1 rounded-xl border-none">
            <button
              onClick={() => setViewLayout('blueprint')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                viewLayout === 'blueprint'
                  ? 'bg-amber-600 text-black shadow-lg font-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Tv size={13} /> Planta 2D
            </button>
            <button
              onClick={() => setViewLayout('grid')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                viewLayout === 'grid'
                  ? 'bg-amber-600 text-black shadow-lg font-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Boxes size={13} /> Grid de Sensores
            </button>
          </div>

          {Object.keys(extraSimulatorCarga).length > 0 && (
            <Button
              onClick={handleResetSimulation}
              variant="outline"
              size="sm"
              className="h-8 text-[9px] font-black uppercase tracking-widest border-zinc-700 hover:bg-zinc-800 text-amber-500 flex items-center gap-1 shrink-0"
            >
              <RefreshCw size={11} className="animate-spin" /> Resetar Simulação
            </Button>
          )}
        </div>
      </div>

      {/* METRIC CARDS RESUMO DO MAPA TÉRMICO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        {/* Card 1: Carga Média */}
        <Card className="bg-white dark:bg-zinc-900 border-transparent p-4 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest font-mono block">Carga Média de Planta</span>
              <span className="text-3xl font-black text-white font-sans tracking-tight">{globalStats.avgLoad}%</span>
            </div>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/15">
              <Gauge size={16} />
            </div>
          </div>
          <div className="mt-3">
            <Progress value={globalStats.avgLoad} className="h-1.5 bg-zinc-900" />
            <span className="text-[10px] text-zinc-400 mt-1.5 block">Eficiência ponderada total das máquinas</span>
          </div>
        </Card>

        {/* Card 2: Máquinas em Sobrecarga Crítica */}
        <Card className="bg-white dark:bg-zinc-900 border-transparent p-4 relative overflow-hidden group">
          <div className={`absolute top-0 left-0 w-1 h-full ${globalStats.criticalCount > 0 ? 'bg-red-500' : 'bg-zinc-700'}`} />
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest font-mono block">Sobrecarga Crítica (&gt;85%)</span>
              <span className={`text-3xl font-black font-sans tracking-tight ${globalStats.criticalCount > 0 ? 'text-red-500 animate-pulse' : 'text-zinc-300'}`}>
                {globalStats.criticalCount} <span className="text-xs text-zinc-500 font-medium font-sans">sistemas</span>
              </span>
            </div>
            <div className={`p-2 rounded-xl ${globalStats.criticalCount > 0 ? 'bg-red-500/10 text-red-400 border border-red-500/15' : 'bg-zinc-850 text-zinc-400 border-none'}`}>
              <Flame size={16} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-[10px] text-zinc-400 flex items-center gap-1.5">
              <AlertTriangle size={12} className={globalStats.criticalCount > 0 ? "text-red-500 animate-bounce" : "text-zinc-500"} />
              <span>{globalStats.criticalCount > 0 ? "Altas temperaturas mecânicas detectadas" : "Planta sob total estabilidade térmica"}</span>
            </div>
          </div>
        </Card>

        {/* Card 3: Cargas em Alerta */}
        <Card className="bg-white dark:bg-zinc-900 border-transparent p-4 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest font-mono block">Zonas em Alerta (65%-85%)</span>
              <span className="text-3xl font-black text-amber-500 font-sans tracking-tight">{globalStats.warningCount} <span className="text-xs text-zinc-500 font-medium">unidades</span></span>
            </div>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/15">
              <Activity size={16} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-[10px] text-zinc-400 block">Monitoramento preventivo requerido</span>
          </div>
        </Card>

        {/* Card 4: Fila de Ordens Ativas */}
        <Card className="bg-white dark:bg-zinc-900 border-transparent p-4 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest font-mono block">Volume de OS em Processamento</span>
              <span className="text-3xl font-black text-white font-sans tracking-tight">{globalStats.activeJobsLength} <span className="text-xs text-zinc-500 font-medium">OS ativas</span></span>
            </div>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/15">
              <Layers size={16} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-[10px] text-zinc-400 block">Alocações influenciando o mapa de calor</span>
          </div>
        </Card>
      </div>

      {/* COMPONENTE DO LAYOUT SELECIONADO */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        
        {/* PLANTA BI-DIMENSIONAL / INTERATIVA OU GRID */}
        <div className="xl:col-span-8 flex flex-col justify-between">
          
          {viewLayout === 'blueprint' ? (
            /* PLANTA TÁTICA 2D DO GALPÃO INDUSTRIAL KORTECK */
            <div className="relative w-full h-[450px] md:h-[500px] border-none bg-white dark:bg-zinc-900 bg-radial-[circle_at_center,rgba(15,15,25,0.73)_0%,rgba(0,0,0,1)_100%] rounded-3xl overflow-hidden p-6 select-none shadow-inner flex flex-col justify-between">
              
              {/* Grid de Blueprint Decorativo */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-80" />
              <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-transparent m-4 pointer-events-none" />
              <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-transparent m-4 pointer-events-none" />
              <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-transparent m-4 pointer-events-none" />
              <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-transparent m-4 pointer-events-none" />

              {/* Informações de Seções do Galpão */}
              <div className="absolute left-6 top-6 text-left opacity-60 font-mono text-[9px] uppercase tracking-widest text-zinc-400 z-10 pointer-events-none space-y-0.5">
                <span className="block">// UNIDADE FABRIL 01 - KORTECK</span>
                <span className="block">ÁREA DO GALPÃO: 1.200m²</span>
                <span className="block">DENSIDADE INDUSTRIAL: ALTA</span>
              </div>

              {/* Divisórias de Setor do Desenho do Galpão */}
              <div className="absolute left-[30%] top-6 bottom-6 border-r border-dashed border-transparent pointer-events-none flex flex-col justify-between items-end pl-2">
                <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest -rotate-90 origin-bottom-right translate-y-12">Área de Usinagem &amp; Chapas</span>
                <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest -rotate-90 origin-bottom-right -translate-y-12">Expedição / Cargas</span>
              </div>
              <div className="absolute left-[70%] top-6 bottom-6 border-r border-dashed border-transparent pointer-events-none flex flex-col justify-between items-end pl-2">
                <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest -rotate-90 origin-bottom-right translate-y-12">Sala Limpa &amp; Plotters</span>
                <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest -rotate-90 origin-bottom-right -translate-y-12">Serralheria Pesada</span>
              </div>

              {/* ENTRADA DE MATÉRIA PRIMA DECORATIVA */}
              <div className="absolute bottom-6 left-12 border-none bg-black/50 px-3 py-1.5 rounded-lg pointer-events-none font-mono text-[8px] text-zinc-400 uppercase tracking-widest">
                📦 Almoxarifado / Entrada
              </div>

              {/* VÍNCULO DE FLUXO DE LINHAS / PIPELINE */}
              <div className="absolute left-[15%] top-[50%] right-[15%] h-0.5 border-t border-dashed border-purple-500/10 pointer-events-none" />

              {/* MÁQUINAS DO CHÃO DE FÁBRICA (Pontos Térmicos Pulsantes) */}
              <div className="absolute inset-0 z-10">
                {machines.map((mac) => {
                  const isSelected = selectedMachineId === mac.id;
                  
                  return (
                    <motion.div
                      key={mac.id}
                      style={{ left: mac.x, top: mac.y }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                      onClick={() => setSelectedMachineId(mac.id)}
                      whileHover={{ scale: 1.12 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      {/* Aura de calor radiante desfocada (Heat Spot glow effect) */}
                      <div 
                        style={{ backgroundColor: mac.colorHex }}
                        className={`absolute -inset-10 rounded-full filter blur-xl opacity-35 transition-all duration-700 pointer-events-none scale-100 group-hover:scale-130 ${
                          mac.load > 85 ? 'animate-pulse duration-1000' : ''
                        }`} 
                      />

                      {/* Botão Círculo Central da Máquina */}
                      <div className={`w-14 h-14 rounded-full border-2 bg-white dark:bg-zinc-900/90 flex flex-col items-center justify-center transition-all ${
                        isSelected 
                          ? 'border-amber-500 shadow-[0_0_25px_rgba(245,158,11,0.6)] scale-110 z-20' 
                          : 'border-transparent group-hover:border-zinc-400'
                      }`}>
                        
                        {/* Ícone de Categoria */}
                        <div className={`p-1 rounded-lg ${mac.load > 85 ? 'text-red-500' : mac.load > 65 ? 'text-amber-500' : 'text-zinc-400 group-hover:text-white'}`}>
                          {mac.laneId === 'router' && <Cpu size={16} />}
                          {mac.laneId === 'laser' && <Flame size={16} />}
                          {mac.laneId === 'impressao' && <Printer size={16} />}
                          {mac.laneId === 'plotter' && <Scissors size={16} />}
                        </div>

                        {/* ID de Tag */}
                        <span className="text-[9px] font-black font-mono text-zinc-300 -mt-0.5 leading-none">{mac.id}</span>
                        
                        {/* Carga em % */}
                        <span className="text-[10px] font-black font-mono leading-none mt-0.5" style={{ color: mac.colorHex }}>
                          {mac.load}%
                        </span>

                        {/* Barra periférica circular de carga térmica simplificada */}
                        <div 
                          className="absolute inset-[1px] rounded-full border border-dashed pointer-events-none opacity-40 group-hover:opacity-75"
                          style={{ borderColor: mac.colorHex }}
                        />
                      </div>

                      {/* Tooltip rápida flutuante ao pairar o mouse */}
                      <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-2 rounded-xl border-none text-[10px] font-black uppercase tracking-wider text-center pointer-events-none select-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-35 shadow-sm">
                        <div className="font-extrabold">{mac.name}</div>
                        <div className="font-mono font-medium text-[9px] lowercase text-zinc-400 mt-0.5">
                          carga: <span style={{ color: mac.colorHex }}>{mac.load}%</span> · {mac.operator}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Legenda do Mapa de Calor (Barra de Espectro Infravermelho) */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto pt-6 z-10 w-full bg-black/40 p-4 rounded-2xl border-none">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 font-mono">ÍNDICE DE CALOR OPERACIONAL:</span>
                  <div className="h-3 w-36 bg-gradient-to-r from-blue-500 via-emerald-500 via-amber-500 to-red-500 rounded-full" />
                  <div className="flex items-center justify-between w-36 text-[8px] text-zinc-500 font-mono -mt-1 font-bold">
                    <span>FRIO (0%)</span>
                    <span>QUENTE (100%)</span>
                  </div>
                </div>

                <div className="text-[10px] text-zinc-400 flex items-center gap-1.5">
                  <span className="p-1 rounded-full bg-amber-500/10 text-amber-500"><Sparkles size={11} /></span>
                  <span>Clique nos círculos para inspecionar os sensores térmicos e dados da OS</span>
                </div>
              </div>

            </div>
          ) : (
            /* DETAILED SENSOR HEAT GRID VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {machines.map((mac) => (
                <div
                  key={mac.id}
                  onClick={() => setSelectedMachineId(mac.id)}
                  className={`border text-left p-5 rounded-2xl cursor-pointer bg-white dark:bg-zinc-900 hover:bg-zinc-100 hover:dark:bg-zinc-800 transition-all relative overflow-hidden flex flex-col justify-between h-[155px] ${
                    selectedMachineId === mac.id 
                      ? 'border-amber-500 ring-1 ring-amber-500/20' 
                      : 'border-transparent hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <Badge variant="outline" className="text-[8px] font-mono border-transparent bg-white/5 text-zinc-300 px-1 py-0">{mac.id}</Badge>
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{mac.room}</span>
                      </div>
                      <h4 className="text-sm font-black uppercase text-white truncate max-w-[200px]">{mac.name}</h4>
                    </div>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${mac.colorClass}`}>
                      <Flame size={15} />
                    </div>
                  </div>

                  {/* Informações centrais */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] text-zinc-400">
                      <span>ATIVIDADE / FLUXO:</span>
                      <span className="font-mono text-zinc-200">{mac.jobs.length} OS Ativas</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-zinc-500">SENSORES TÉRMICOS:</span>
                      <span style={{ color: mac.colorHex }} className="font-black uppercase tracking-wider">{mac.textStatus}</span>
                    </div>
                  </div>

                  {/* Barra de progresso e porcentagem */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[9px] text-zinc-400 font-mono">
                      <span>Carga Térmica de Fuso:</span>
                      <span className="font-black" style={{ color: mac.colorHex }}>{mac.load}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-zinc-950 overflow-hidden w-full">
                      <div 
                        className="h-full rounded-full transition-all duration-500" 
                        style={{ width: `${mac.load}%`, backgroundColor: mac.colorHex }} 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* DETAILS SIDEBAR COMPONENT (Inspecionador Térmico Sênior) */}
        <div className="xl:col-span-4 flex flex-col">
          <AnimatePresence mode="wait">
            {selectedMachine ? (
              <motion.div
                key={selectedMachine.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="bg-white dark:bg-zinc-900 border-none rounded-3xl p-6 text-left flex flex-col justify-between h-full space-y-6"
              >
                {/* Header do Inspecionador */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Flame className="stroke-[2]" style={{ color: selectedMachine.colorHex }} size={16} />
                      <span className="text-[10px] font-black uppercase text-zinc-400 font-mono tracking-widest">Inspecionador Térmico</span>
                    </div>
                    <button 
                      onClick={() => setSelectedMachineId(null)}
                      className="text-zinc-500 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors font-mono"
                    >
                      Voltar
                    </button>
                  </div>

                  {/* Informações Gerais da Máquina em Destaque */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Badge className="font-mono text-[9px] bg-zinc-900 border-zinc-700 uppercase" style={{ color: selectedMachine.colorHex }}>
                        {selectedMachine.id}
                      </Badge>
                      <Badge className="text-[9px] uppercase tracking-wider" variant="outline">{selectedMachine.room}</Badge>
                      <Badge className="bg-purple-950/40 text-purple-400 border-purple-900 text-[8px] uppercase">OS: {selectedMachine.laneId}</Badge>
                    </div>

                    <h3 className="text-xl font-black text-white uppercase italic leading-tight">{selectedMachine.name}</h3>
                    <p className="text-[11px] text-zinc-400 font-normal leading-relaxed">{selectedMachine.desc}</p>
                  </div>

                  {/* Indicador de Status Térmico Grande */}
                  <div className="p-4 rounded-2xl border-none bg-black/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Temperatura Operacional</span>
                      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg font-mono" style={{ color: selectedMachine.colorHex, backgroundColor: `${selectedMachine.colorHex}15` }}>
                        {selectedMachine.textStatus}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black font-sans tracking-tight" style={{ color: selectedMachine.colorHex }}>{selectedMachine.load}%</span>
                      <span className="text-zinc-500 text-xs font-bold leading-none font-mono">CARGA DE PRODUÇÃO</span>
                    </div>

                    <div className="h-2 rounded-full bg-zinc-900 w-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-300"
                        style={{ width: `${selectedMachine.load}%`, backgroundColor: selectedMachine.colorHex }}
                      />
                    </div>
                  </div>

                  {/* Alocações de OS Ativas (Fila Real) */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest font-mono block">// OS Ativas Alocadas à Máquina ({selectedMachine.jobs.length})</span>
                    
                    <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                      {selectedMachine.jobs.length === 0 ? (
                        <div className="p-4 rounded-xl border border-dashed border-zinc-900 text-center text-zinc-500 text-[10px] font-black uppercase">
                          Nenhum Job Ativo cadastrado no PCP nesta etapa
                        </div>
                      ) : (
                        selectedMachine.jobs.map((job) => (
                          <div 
                            key={job.id} 
                            className="p-2.5 rounded-xl border-none bg-zinc-950/60 hover:bg-zinc-950 flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="min-w-0 text-left">
                              <div className="flex items-center gap-1.5 font-bold text-zinc-200">
                                <span className="text-white font-mono">{job.id}</span>
                                <span className="text-zinc-650 font-normal">|</span>
                                <span className="truncate uppercase text-[10px] text-zinc-400">{job.client}</span>
                              </div>
                              <span className="text-[9px] text-zinc-500 block truncate uppercase mt-0.5">{job.details}</span>
                            </div>
                            <Badge className="bg-amber-950/20 text-amber-500 border-amber-900/30 text-[9px] font-semibold">{job.date}</Badge>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Simulador Interativo Inteligente de Escalonamento de Carga */}
                <div className="pt-4 border-t border-zinc-800 space-y-3">
                  <div>
                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block font-mono">SIMULAÇÃO DE ESTRESSE &amp; METAS</span>
                    <span className="text-[10px] text-zinc-400 block mt-0.5">Clique para simular alteração de carga ou injetar ordens externas</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => handleSimulateLoad(selectedMachine.id, 20)}
                      className="bg-red-950 text-red-400 hover:bg-red-900 hover:text-white border border-red-900/50 text-[9px] font-black uppercase tracking-wider h-9 font-mono"
                    >
                      + 20% Carga (Estresse)
                    </Button>
                    <Button
                      onClick={() => handleSimulateLoad(selectedMachine.id, -20)}
                      disabled={(extraSimulatorCarga[selectedMachine.id] || 0) <= -100}
                      className="bg-blue-950 text-blue-400 hover:bg-blue-900 hover:text-white border border-blue-900/50 text-[9px] font-black uppercase tracking-wider h-9 font-mono"
                    >
                      - 20% Carga (Alívio)
                    </Button>
                  </div>
                </div>

              </motion.div>
            ) : (
              /* ESTADO INICIAL DESALOCADO DE SIDEBAR INSPECIONADOR */
              <div className="bg-white dark:bg-zinc-900 border-none rounded-3xl p-8 text-center flex flex-col items-center justify-center h-full space-y-4">
                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 border-none">
                  <Activity className="animate-pulse" size={20} />
                </div>
                <div className="space-y-1.5 max-w-sm">
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">Inspecionador Térmico Desalocado</h4>
                  <p className="text-[11px] text-zinc-400 leading-normal">
                    Selecione um ponto de fuso de faturamento ou sensor físico de máquina do galpão no mapa ao lado para monitorar a exaustão térmica da operação KORTECK.
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
