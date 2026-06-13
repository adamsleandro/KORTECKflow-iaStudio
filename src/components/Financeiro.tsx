import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Percent, 
  FileText, 
  Clock, 
  Users, 
  Receipt, 
  ShieldAlert, 
  Calendar, 
  Sliders, 
  RefreshCw, 
  Check, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Info, 
  Sparkles, 
  CheckCircle2, 
  X, 
  ChevronRight, 
  Lock, 
  Unlock,
  AlertCircle,
  FileCheck,
  Zap,
  Building2,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// --- MAIN ENUM FOR FINANCE SECTIONS ---
type FinanceSubView = 
  | 'fin-fluxo'
  | 'fin-colab'
  | 'fin-pagar'
  | 'fin-receber'
  | 'fin-fiscal'
  | 'fin-sped'
  | 'fin-notas'
  | 'fin-os-restricao'
  | 'fin-lancamentos-futuros'
  | 'fin-faturamento';

export function Financeiro({ initialTab: propInitialTab }: { initialTab?: string }) {
  // Navigation sync
  const [activeTab, setActiveTab] = useState<FinanceSubView>('fin-fluxo');

  useEffect(() => {
    if (propInitialTab && propInitialTab.startsWith('fin-')) {
      setActiveTab(propInitialTab as FinanceSubView);
    } else if (propInitialTab === 'financeiro') {
      setActiveTab('fin-fluxo');
    }
  }, [propInitialTab]);

  // General States
  const [selectedMonth, setSelectedMonth] = useState('Maio');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [startDate, setStartDate] = useState('01/05/2026');
  const [endDate, setEndDate] = useState('31/05/2026');
  const [hasProvisoes, setHasProvisoes] = useState(true);
  const [companyFilter, setCompanyFilter] = useState('Todas as empresas');

  // Sub-tabs for Fluxo de Caixa (Image 2 Top)
  const [fluxoSubTab, setFluxoSubTab] = useState<'fluxo' | 'conciliacao' | 'ignorados'>('fluxo');

  // --- MODAL STATES FOR ADDING NEW ENTRIES ---
  const [isPayableModalOpen, setIsPayableModalOpen] = useState(false);
  const [isReceivableModalOpen, setIsReceivableModalOpen] = useState(false);
  const [newPayable, setNewPayable] = useState({ description: '', value: '', dueDate: '2026-05-31', category: 'Produção', status: 'Pendente' });
  const [newReceivable, setNewReceivable] = useState({ client: '', value: '', dueDate: '2026-05-31', method: 'Boleto', status: 'Pendente' });

  // --- MONTH SELECTION DATA OVERRIDES ---
  // Keeps Image 2 values for Maio, and scales for other months
  const getMonthlyKPIs = (month: string) => {
    switch (month) {
      case 'Janeiro':
        return { rec: 645200.00, des: 210450.00, salTotal: 265800.00 };
      case 'Fevereiro':
        return { rec: 580400.00, des: 195300.00, salTotal: 280400.00 };
      case 'Março':
        return { rec: 720600.00, des: 245900.00, salTotal: 310200.00 };
      case 'Abril':
        return { rec: 785340.00, des: 268420.00, salTotal: 295450.00 };
      case 'Maio':
        return { rec: 880656.50, des: 297984.87, salTotal: 328606.15 }; // Exact Image 2
      case 'Junho':
        return { rec: 920400.00, des: 310500.00, salTotal: 345200.00 };
      case 'Julho':
        return { rec: 840100.00, des: 285300.00, salTotal: 312000.00 };
      case 'Agosto':
        return { rec: 875200.00, des: 290150.00, salTotal: 319200.00 };
      case 'Setembro':
        return { rec: 890450.00, des: 295400.00, salTotal: 324500.00 };
      case 'Outubro':
        return { rec: 915300.00, des: 304100.00, salTotal: 331400.00 };
      case 'Novembro':
        return { rec: 940600.00, des: 312805.00, salTotal: 342600.00 };
      case 'Dezembro':
        return { rec: 1050900.00, des: 345200.00, salTotal: 385400.00 };
      case 'Anual':
        return { rec: 10084446.50, des: 3361610.00, salTotal: 328606.15 };
      default:
        return { rec: 880656.50, des: 297984.87, salTotal: 328606.15 };
    }
  };

  const kpis = getMonthlyKPIs(selectedMonth);
  const saldoMovimentacao = kpis.rec - kpis.des;
  const saldoMovimentacaoPerc = kpis.rec > 0 ? (saldoMovimentacao / kpis.rec) * 100 : 0;

  // --- DYNAMIC DATA MANIPULATION ---
  // Payables Local State
  const [payables, setPayables] = useState([
    { id: 'P1', description: 'Fornecedor de Alumínio KORTPLAST', value: 15400.00, dueDate: '2026-05-15', status: 'Pago', category: 'Produção' },
    { id: 'P2', description: 'Energia Elétrica RS - CPFL', value: 3200.00, dueDate: '2026-05-12', status: 'Pago', category: 'Administrativo' },
    { id: 'P3', description: 'Impostos Federais DAS 2026', value: 24196.37, dueDate: '2026-05-20', status: 'Pago', category: 'Impostos' },
    { id: 'P4', description: 'Manutenção Router CNC - Oficina', value: 9028.94, dueDate: '2026-05-14', status: 'Pago', category: 'Corte CNC' },
    { id: 'P5', description: 'Folha de Pagamento CLP Equipe', value: 15137.63, dueDate: '2026-05-30', status: 'Pago', category: 'Folha de Pagamento' },
    { id: 'P6', description: 'Fornecedor Chapa de Aço Inox', value: 22450.00, dueDate: '2026-06-05', status: 'Pendente', category: 'Produção' },
    { id: 'P7', description: 'Aluguel do Galpão Industrial', value: 18500.00, dueDate: '2026-06-10', status: 'Pendente', category: 'Administrativo' },
    { id: 'P8', description: 'Tributos Guia Municipal ISS', value: 4320.00, dueDate: '2026-06-12', status: 'Agendado', category: 'Impostos' },
  ]);

  // Receivables Local State
  const [receivables, setReceivables] = useState([
    { id: 'R1', client: 'Banco Itaú - Fachada ACM', value: 45000.00, dueDate: '2026-05-18', status: 'Pago', method: 'Boleto' },
    { id: 'R2', client: 'Shopping Center Norte Lojas', value: 12000.00, dueDate: '2026-05-14', status: 'Pago', method: 'Pix' },
    { id: 'R3', client: 'Postos Shell Matriz - Totem', value: 35500.00, dueDate: '2026-05-22', status: 'Pago', method: 'Boleto' },
    { id: 'R4', client: 'Condomínio Alpha Revestimentos', value: 8900.00, dueDate: '2026-05-15', status: 'Pago', method: 'Cartão' },
    { id: 'R5', client: 'Prefeitura de Itapetininga - Placas', value: 145000.00, dueDate: '2026-06-18', status: 'Pendente', method: 'Boleto' },
    { id: 'R6', client: 'E3Corp Engenharia - Letreiros', value: 78000.00, dueDate: '2026-06-25', status: 'Pendente', method: 'Boleto' },
    { id: 'R7', client: 'Piimo Arquitetura - Corte router', value: 19500.00, dueDate: '2026-06-15', status: 'Em Dia', method: 'Pix' },
  ]);

  // Bank accounts balances (Sum is exactly R$ 328.606,15)
  const [bankAccounts, setBankAccounts] = useState([
    { id: 'bradesco', name: 'Bradesco', subtitle: 'KORTECK', balance: 68423.51, badge: 1, logo: '🔴', color: 'text-red-500' },
    { id: 'c6', name: 'C6 Bank', subtitle: 'KORTECK', balance: 11438.86, badge: 0, logo: '⚫', color: 'text-zinc-400' },
    { id: 'caixinha', name: 'Caixinha', subtitle: 'KORTECK', balance: 133.75, badge: 0, logo: '🟣', color: 'text-purple-600' },
    { id: 'inter', name: 'Inter', subtitle: 'KORTECK', balance: 7965.47, badge: 1, logo: '🟠', color: 'text-orange-500' },
    { id: 'inter-inv', name: 'Inter Investimentos', subtitle: 'KORTECK', balance: 240644.56, badge: 0, logo: '📈', color: 'text-amber-500' },
  ]);

  const [conciliatedItems, setConciliatedItems] = useState([
    { id: 'C1', description: 'Venda à Vista Balcão Korteck', value: 3450.00, bank: 'Bradesco', date: '30/05/2026', status: 'Conciliado' },
    { id: 'C2', description: 'Compra de Suplementos EPI', value: -450.00, bank: 'C6 Bank', date: '29/05/2026', status: 'Conciliado' },
    { id: 'C3', description: 'Pix Recebido - Consumidor Final', value: 1200.00, bank: 'Inter', date: '28/05/2026', status: 'Pendente' }
  ]);

  const [ignoredItems, setIgnoredItems] = useState([
    { id: 'I1', description: 'Tarifa de Administração Provisória', value: 45.00, date: '15/05/2026', motive: 'Lançamento duplicado' },
    { id: 'I2', description: 'Estorno de Fornecedor Terceiros', value: 320.00, date: '10/05/2026', motive: 'Não tributável' }
  ]);

  // Operations Overrides
  const handleAddPayable = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newPayable.value) || 0;
    const item = {
      id: `P${payables.length + 1}`,
      description: newPayable.description,
      value: val,
      dueDate: newPayable.dueDate,
      status: newPayable.status,
      category: newPayable.category
    };
    setPayables([...payables, item]);
    setIsPayableModalOpen(false);
    setNewPayable({ description: '', value: '', dueDate: '2026-05-31', category: 'Produção', status: 'Pendente' });
  };

  const handleAddReceivable = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newReceivable.value) || 0;
    const item = {
      id: `R${receivables.length + 1}`,
      client: newReceivable.client,
      value: val,
      dueDate: newReceivable.dueDate,
      status: newReceivable.status,
      method: newReceivable.method
    };
    setReceivables([...receivables, item]);
    setIsReceivableModalOpen(false);
    setNewReceivable({ client: '', value: '', dueDate: '2026-05-31', method: 'Boleto', status: 'Pendente' });
  };

  // --- RENDERING ROUTER INTERFACES ---
  const renderSelectedView = () => {
    switch (activeTab) {
      case 'fin-fluxo':
        return renderFluxoDeCaixa();
      case 'fin-pagar':
        return renderContasAPagar();
      case 'fin-receber':
        return renderContasAReceber();
      case 'fin-colab':
        return renderColaboradores();
      case 'fin-fiscal':
        return renderFiscal();
      case 'fin-sped':
        return renderSpedFiscal();
      case 'fin-notas':
        return renderMonitorDeNotas();
      case 'fin-os-restricao':
        return renderOsComRestricao();
      case 'fin-lancamentos-futuros':
        return renderLancamentosFuturos();
      case 'fin-faturamento':
        return renderFaturamento();
      default:
        return renderFluxoDeCaixa();
    }
  };

  // --- VIEW 1: FLUXO DE CAIXA (SOPHISTICATED IMAGE REPLICATION) ---
  const renderFluxoDeCaixa = () => {
    // Exact cost center metrics matching horizontal percentage bar chart
    const costCenters = [
      { name: 'Produção', percentage: 29.70, amount: 88501.51, color: 'bg-[#38bdf8]' },
      { name: 'Administrativo', percentage: 16.59, amount: 49435.69, color: 'bg-[#18181b] dark:bg-zinc-800' },
      { name: 'Investimento', percentage: 14.87, amount: 44310.35, color: 'bg-[#84cc16]' },
      { name: 'Instalação', percentage: 9.49, amount: 28278.76, color: 'bg-[#0284c7]' },
      { name: 'Impostos', percentage: 8.12, amount: 24196.37, color: 'bg-[#1e3a8a]' },
      { name: 'Folha de Pagamento', percentage: 5.08, amount: 15137.63, color: 'bg-[#c084fc]' },
      { name: 'Comercial', percentage: 4.88, amount: 14541.66, color: 'bg-[#eab308]' },
      { name: 'Frota/Carros', percentage: 4.57, amount: 13617.91, color: 'bg-[#6366f1]' },
      { name: 'Corte CNC', percentage: 3.03, amount: 9028.94, color: 'bg-[#475569]' },
      { name: 'Copa/Cozinha', percentage: 2.80, amount: 8343.58, color: 'bg-[#f43f5e]' },
      { name: 'Retrabalho', percentage: -0.63, amount: -1877.30, color: 'bg-[#f43f5e] opacity-80' },
      { name: 'Terceirização', percentage: -0.17, amount: -506.57, color: 'bg-orange-500' },
      { name: 'Endomarketing', percentage: -0.07, amount: -208.59, color: 'bg-pink-500' },
      { name: 'Não definido', percentage: 0.00, amount: 0.00, color: 'bg-zinc-400' },
    ];

    return (
      <div className="space-y-6">
        {/* Top-level Sub-tab Bar */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-850 gap-4 mt-2">
          {[
            { id: 'fluxo', label: 'Fluxo de Caixa' },
            { id: 'conciliacao', label: 'Conciliação Bancária' },
            { id: 'ignorados', label: 'Lançamentos Ignorados' }
          ].map(sb => (
            <button
              key={sb.id}
              onClick={() => setFluxoSubTab(sb.id as any)}
              className={`pb-3 text-xs font-bold tracking-tight px-1 transition-all relative border-b-2 cursor-pointer ${
                fluxoSubTab === sb.id 
                  ? 'border-purple-600 text-purple-600 dark:text-purple-400 font-extrabold' 
                  : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
              }`}
            >
              {sb.label}
            </button>
          ))}
        </div>

        {fluxoSubTab === 'fluxo' && (
          <div className="space-y-6">
            {/* Title & Filter bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-zinc-950/5 dark:bg-zinc-900/30 p-4 rounded-xl border-none/50 dark:border-zinc-850">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-600 rounded-xl text-white shadow-sm">
                  <Wallet size={18} />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
                    Fluxo de Caixa
                  </h2>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mt-0.5">Visão Executiva de Fluxos Financeiros</p>
                </div>
              </div>

              {/* Header variables */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border-none dark:border-zinc-800 rounded-lg px-2 h-9 text-[11px] font-semibold text-zinc-600 dark:text-zinc-300">
                  <input 
                    type="text" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                    className="w-20 bg-transparent text-center border-0 focus:ring-0 outline-none p-0" 
                  />
                  <span className="text-zinc-400">à</span>
                  <input 
                    type="text" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                    className="w-20 bg-transparent text-center border-0 focus:ring-0 outline-none p-0" 
                  />
                </div>

                <select 
                  value={companyFilter} 
                  onChange={(e) => setCompanyFilter(e.target.value)}
                  className="bg-white dark:bg-zinc-900 border-none dark:border-zinc-800 rounded-lg h-9 px-3 text-[11px] font-bold text-zinc-700 dark:text-zinc-300 outline-none focus:border-purple-500 cursor-pointer"
                >
                  <option>Todas as empresas</option>
                  <option>KORTECK Soluções Industriais</option>
                  <option>NK Empreendimentos LTDA</option>
                </select>
              </div>
            </div>

            {/* Monthly Navigation Submenu */}
            <div className="overflow-x-auto scrollbar-none flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-900/60 rounded-xl border-none/50 dark:border-zinc-850">
              {['Anual', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'].map((m) => {
                const isActive = selectedMonth === m;
                return (
                  <button
                    key={m}
                    onClick={() => {
                      setSelectedMonth(m);
                      if (m === 'Maio') {
                        setStartDate('01/05/2026');
                        setEndDate('31/05/2026');
                      } else if (m === 'Anual') {
                        setStartDate('01/01/2026');
                        setEndDate('31/12/2026');
                      } else {
                        setStartDate('01/06/2026');
                        setEndDate('30/06/2026');
                      }
                    }}
                    className={`py-2 px-3.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      isActive 
                        ? 'bg-purple-650 dark:bg-purple-600 text-white shadow-sm' 
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 hover:bg-zinc-200/50'
                    }`}
                  >
                    {m}
                  </button>
                );
              })}
              <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-800 mx-1" />
              <input 
                type="text" 
                value={selectedYear} 
                onChange={(e) => setSelectedYear(e.target.value)} 
                className="w-16 bg-white dark:bg-zinc-950 border-none dark:border-zinc-800 rounded-lg h-8 text-[11px] font-black text-center text-zinc-700 dark:text-zinc-200 focus:outline-none" 
              />
            </div>

            {/* Performance Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* KPIs (10 cols on large screens) */}
              <div className="md:col-span-8 lg:col-span-9 grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Receitas */}
                <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850">
                  <CardContent className="p-4.5">
                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Receitas</p>
                    <h3 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                      R$ {kpis.rec.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </h3>
                  </CardContent>
                </Card>

                {/* 2. Despesas */}
                <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850">
                  <CardContent className="p-4.5">
                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Despesas</p>
                    <h3 className="text-xl font-extrabold text-rose-600 dark:text-rose-400">
                      R$ {kpis.des.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </h3>
                  </CardContent>
                </Card>

                {/* 3. Saldo Movimentação */}
                <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850">
                  <CardContent className="p-4.5">
                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Saldo da movimentação</p>
                    <div className="flex flex-col">
                      <h3 className={`text-xl font-extrabold ${saldoMovimentacao >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'}`}>
                        R$ {saldoMovimentacao.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </h3>
                      <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-600 mt-0.5">
                        ({saldoMovimentacaoPerc.toFixed(2)}%)
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* 4. Saldo Total */}
                <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850">
                  <CardContent className="p-4.5">
                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Saldo total</p>
                    <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">
                      R$ {kpis.salTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </h3>
                  </CardContent>
                </Card>
              </div>

              {/* Presets and provisions (2 cols) */}
              <div className="md:col-span-4 lg:col-span-3 flex flex-col sm:flex-row gap-2.5 h-full justify-center">
                <div className="grid grid-cols-2 gap-1.5 w-full">
                  {['60 dias', '30 dias', 'Ontem', 'Hoje'].map((period) => (
                    <button
                      key={period}
                      className={`h-9 px-3 border-none dark:border-zinc-800 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                        period === '30 dias' 
                          ? 'bg-zinc-900 dark:bg-white text-white dark:text-black border-transparent' 
                          : 'bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setHasProvisoes(!hasProvisoes)}
                  className={`h-9 sm:h-auto px-4 border rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer w-full whitespace-nowrap ${
                    hasProvisoes 
                      ? 'bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 border-purple-250 dark:border-purple-900/60' 
                      : 'bg-white dark:bg-zinc-950 text-zinc-500 border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  <Receipt size={14} /> Provisões
                </button>
              </div>
            </div>

            {/* MAIN TWO-COLUMN MODULE GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Column 1: Expenditure Analysis (65%) */}
              <Card className="lg:col-span-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850">
                <CardHeader className="pb-3 border-b border-zinc-150 dark:border-zinc-850 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xs font-black text-zinc-800 dark:text-zinc-200 uppercase tracking-widest flex items-center gap-1.5">
                      Análise de despesas por Centro de Custos
                    </CardTitle>
                    <CardDescription className="text-[9px] uppercase font-bold text-zinc-500 dark:text-zinc-600 mt-0.5">Visão consolidada do período selecionado</CardDescription>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 border-none dark:border-zinc-700 flex items-center justify-center cursor-pointer">
                    <FileText size={14} className="text-zinc-500" />
                  </div>
                </CardHeader>
                <CardContent className="p-5 space-y-4 font-sans">
                  {costCenters.map((cc, index) => {
                    const isNeg = cc.percentage < 0;
                    const cleanPercentage = Math.abs(cc.percentage);
                    return (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between items-center text-[11px] font-bold uppercase transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900 p-0.5 rounded">
                          <span className="text-zinc-600 dark:text-zinc-400 font-medium">{cc.name}</span>
                          <span className="font-mono text-zinc-900 dark:text-zinc-150">
                            R$ {cc.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} 
                            <span className={`ml-2 font-black ${isNeg ? 'text-rose-500' : 'text-zinc-500'}`}>
                              {cc.percentage.toFixed(2)}%
                            </span>
                          </span>
                        </div>
                        <div className="h-2 bg-zinc-100 dark:bg-zinc-800/80 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${cc.color}`} 
                            style={{ width: `${cleanPercentage}%` }} 
                          />
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Column 2: Bank Accounts & Actions (35%) */}
              <div className="lg:col-span-4 space-y-5">
                {/* Control Action pill */}
                <div className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-900 p-3 rounded-2xl border-none/50 dark:border-zinc-800">
                  <div className="flex gap-2">
                    <button className="h-8 px-3.5 bg-white dark:bg-zinc-950 border-none dark:border-zinc-850 rounded-lg text-[9px] font-black uppercase tracking-wider text-zinc-700 dark:text-zinc-300 shadow-xs cursor-pointer">
                      Exibir todas
                    </button>
                    <button className="h-8 px-3.5 bg-white dark:bg-zinc-950 border-none dark:border-zinc-850 rounded-lg text-[9px] font-black uppercase tracking-wider text-zinc-700 dark:text-zinc-300 shadow-xs cursor-pointer">
                      Transferências
                    </button>
                  </div>
                  <button className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950/20 text-red-600 dark:text-red-400 flex items-center justify-center cursor-pointer border border-red-200/40">
                    <Unlock size={14} />
                  </button>
                </div>

                {/* List of Accounts */}
                <div className="space-y-3.5">
                  {bankAccounts.map((ac) => (
                    <Card key={ac.id} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850 overflow-hidden relative shadow-xs hover:border-zinc-300 dark:hover:border-zinc-750 transition-all">
                      {/* Red notification Indicator on top level */}
                      {ac.badge > 0 && (
                        <div className="absolute top-3 left-3 w-5 h-5 bg-red-500 rounded-full text-white text-[9px] font-black flex items-center justify-center animate-pulse z-10 shadow-sm border border-white dark:border-zinc-900">
                          {ac.badge}
                        </div>
                      )}

                      <CardContent className="p-4 pt-4">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 border-none/60 dark:border-zinc-750 flex items-center justify-center text-lg shadow-inner">
                              {ac.logo}
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-tight">{ac.name}</h4>
                              <p className="text-[10px] uppercase font-bold text-zinc-500 font-mono tracking-wider">{ac.subtitle}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-extrabold text-zinc-950 dark:text-zinc-50 font-mono">
                              R$ {ac.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                        </div>

                        {/* Interactive mini actions matching mockup bottom bar */}
                        <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-850 mt-3 pt-3 text-[10px] font-bold text-purple-650 dark:text-purple-400">
                          <button 
                            onClick={() => alert(`Conciliando lançamentos para conta ${ac.name}...`)}
                            className="hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            🔗 Conciliar
                          </button>
                          <button 
                            onClick={() => alert(`Visualizando extrato consolidado da conta ${ac.name}...`)}
                            className="hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            📄 Extrato
                          </button>
                          <button 
                            onClick={() => alert(`Visualizando movimentos históricos da conta ${ac.name}...`)}
                            className="hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            🔄 Movimentos
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {fluxoSubTab === 'conciliacao' && (
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850">
            <CardHeader className="border-b border-zinc-150 dark:border-zinc-850 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xs font-black uppercase text-zinc-800 dark:text-zinc-200">Conciliação Bancária Integrada</CardTitle>
                <CardDescription className="text-[9px] font-bold uppercase text-zinc-500 mt-1">Status de conciliação automática via extrato OFX</CardDescription>
              </div>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 font-bold uppercase text-[9px] text-white tracking-wider h-8">
                <RefreshCw size={12} className="mr-1.5" /> Atualizar Feeds
              </Button>
            </CardHeader>
            <CardContent className="p-4 divide-y divide-zinc-100 dark:divide-zinc-850 font-sans">
              {conciliatedItems.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs border ${
                      item.status === 'Conciliado' 
                        ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border-emerald-100 dark:border-emerald-900/60' 
                        : 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 border-amber-100 dark:border-amber-900/60'
                    }`}>
                      {item.status === 'Conciliado' ? '✓' : '!'}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase">{item.description}</h4>
                      <p className="text-[10px] text-zinc-500">{item.bank} • Vencimento: {item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-extrabold font-mono ${item.value >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'}`}>
                      {item.value >= 0 ? '+' : ''} R$ {item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    {item.status === 'Pendente' ? (
                      <Button 
                        size="xs" 
                        onClick={() => {
                          setConciliatedItems(conciliatedItems.map(c => c.id === item.id ? { ...c, status: 'Conciliado' } : c));
                          alert("Lançamento conciliado com sucesso!");
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[9px] px-2 h-7 rounded uppercase"
                      >
                        Aprovar
                      </Button>
                    ) : (
                      <Badge className="bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase border-0">Aprovado</Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {fluxoSubTab === 'ignorados' && (
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850">
            <CardHeader className="border-b border-zinc-150 dark:border-zinc-850">
              <CardTitle className="text-xs font-black uppercase text-zinc-800 dark:text-zinc-200">Lançamentos Ignorados da Planilha</CardTitle>
              <CardDescription className="text-[9px] font-bold uppercase text-zinc-500 mt-1">Transações desconsideradas da curva líquida de faturamento</CardDescription>
            </CardHeader>
            <CardContent className="p-4 divide-y divide-zinc-100 dark:divide-zinc-850 font-sans">
              {ignoredItems.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-250 uppercase">{item.description}</h4>
                    <p className="text-[10px] text-zinc-500">Motive: <span className="text-rose-500 font-semibold">{item.motive}</span> • Data: {item.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-extrabold text-zinc-650 dark:text-zinc-400 font-mono">
                      R$ {item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <Button 
                      size="xs" 
                      onClick={() => {
                        setIgnoredItems(ignoredItems.filter(i => i.id !== item.id));
                        alert('Lançamento restaurado ao fluxo de caixa principal!');
                      }}
                      className="bg-zinc-800 text-zinc-200 hover:bg-zinc-700 font-extrabold text-[9px] px-2.5 h-7 rounded uppercase"
                    >
                      Restaurar
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  // --- VIEW 2: CONTAS A PAGAR (`fin-pagar`) ---
  const renderContasAPagar = () => {
    // Totals
    const totalAberto = payables.filter(p => p.status !== 'Pago').reduce((acc, p) => acc + p.value, 0);
    const totalPago = payables.filter(p => p.status === 'Pago').reduce((acc, p) => acc + p.value, 0);

    return (
      <div className="space-y-6">
        {/* Standard header info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
          <div className="space-y-1">
            <span className="text-[9px] font-black tracking-widest text-purple-600 dark:text-purple-400 uppercase font-mono">Contas a Pagar</span>
            <h1 className="text-3xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter leading-none">
              Gestão de <span className="text-purple-600 dark:text-purple-450">Contas a Pagar</span>
            </h1>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => setIsPayableModalOpen(true)}
              className="bg-purple-650 hover:bg-purple-600 text-white font-extrabold uppercase text-[10px] tracking-wider px-6 h-11 rounded-xl shadow-lg shadow-purple-650/10"
            >
              <Plus size={14} className="mr-1.5" /> Novo Lançamento
            </Button>
          </div>
        </div>

        {/* Dynamic metrics bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-zinc-50 dark:bg-zinc-900/40 p-4.5 rounded-2xl border-none dark:border-zinc-805">
          <div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Total em Aberto</p>
            <p className="text-2xl font-black text-zinc-900 dark:text-white font-mono">
              R$ {totalAberto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="border-t sm:border-t-0 sm:border-l border-zinc-200 dark:border-zinc-800 pt-3 sm:pt-0 sm:pl-6">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Total Pago (Maio)</p>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              R$ {totalPago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="border-t sm:border-t-0 sm:border-l border-zinc-200 dark:border-zinc-800 pt-3 sm:pt-0 sm:pl-6">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Próximos Próximos 7 Dias</p>
            <p className="text-2xl font-black text-amber-500 font-mono">
              R$ {(22450.00).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Payables Grid layout Table */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-zinc-600 dark:text-zinc-400 divide-y divide-zinc-150 dark:divide-zinc-850">
              <thead className="text-[9px] bg-zinc-50 dark:bg-zinc-900/50 uppercase tracking-widest text-zinc-500 font-mono">
                <tr>
                  <th scope="col" className="px-6 py-4">Descrição / Fornecedor</th>
                  <th scope="col" className="px-6 py-4 text-center">Categoria</th>
                  <th scope="col" className="px-6 py-4 text-center">Vencimento</th>
                  <th scope="col" className="px-6 py-4 text-right">Valor</th>
                  <th scope="col" className="px-6 py-4 text-center">Status</th>
                  <th scope="col" className="px-6 py-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-850 font-medium">
                {payables.map((pay) => (
                  <tr key={pay.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                    <td className="px-6 py-4 font-black uppercase text-zinc-800 dark:text-zinc-200">{pay.description}</td>
                    <td className="px-6 py-4 text-center">
                      <Badge className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold border-0 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        {pay.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center font-mono">
                      {new Date(pay.dueDate).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-right font-black text-zinc-950 dark:text-zinc-50 font-mono text-sm leading-none">
                      R$ {pay.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge className={`text-[8px] font-black uppercase border-0 ${
                        pay.status === 'Pago' 
                          ? 'bg-emerald-500/10 text-emerald-500' 
                          : pay.status === 'Atrasado'
                            ? 'bg-rose-500/10 text-rose-500 animate-pulse'
                            : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {pay.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {pay.status !== 'Pago' ? (
                        <Button 
                          size="xs" 
                          onClick={() => {
                            setPayables(payables.map(p => p.id === pay.id ? { ...p, status: 'Pago' } : p));
                            alert("Conta marcada como PAGA de forma integrada!");
                          }}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold uppercase text-[8px] tracking-wide px-2.5 h-7 rounded"
                        >
                          Pagar
                        </Button>
                      ) : (
                        <span className="text-[10px] text-zinc-400">Pago ✓</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Modal Overlay Payable */}
        {isPayableModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white dark:bg-zinc-900 border-none dark:border-zinc-800 rounded-3xl max-w-md w-full p-6 shadow-sm relative"
            >
              <button 
                onClick={() => setIsPayableModalOpen(false)}
                className="absolute top-5 right-5 text-zinc-450 hover:text-black dark:hover:text-white"
              >
                <X size={18} />
              </button>
              <h3 className="text-lg font-black text-zinc-950 dark:text-white uppercase italic tracking-tight mb-4">Novo Fluxo de Saída</h3>
              <form onSubmit={handleAddPayable} className="space-y-4">
                <div className="space-y-1.5 flex flex-col">
                  <Label className="text-[10px] bg-transparent pb-0 font-bold uppercase text-zinc-550">Descrição / Favorecido</Label>
                  <Input 
                    required 
                    value={newPayable.description} 
                    onChange={e => setNewPayable({ ...newPayable, description: e.target.value })}
                    placeholder="Fornecedor de Alumínio LTDA" 
                    className="h-11 rounded-xl text-zinc-700 bg-zinc-50 border-zinc-150"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 flex flex-col">
                    <Label className="text-[10px] pb-0 font-bold uppercase text-zinc-550">Valor Bruto (R$)</Label>
                    <Input 
                      required 
                      type="number" 
                      step="0.01" 
                      value={newPayable.value} 
                      onChange={e => setNewPayable({ ...newPayable, value: e.target.value })}
                      placeholder="18500.00" 
                      className="h-11 rounded-xl text-zinc-700 bg-zinc-50 border-zinc-150"
                    />
                  </div>
                  <div className="space-y-1.5 flex flex-col">
                    <Label className="text-[10px] pb-0 font-bold uppercase text-zinc-550">Data de Vencimento</Label>
                    <Input 
                      required 
                      type="date" 
                      value={newPayable.dueDate} 
                      onChange={e => setNewPayable({ ...newPayable, dueDate: e.target.value })}
                      className="h-11 rounded-xl text-zinc-700 bg-zinc-50 border-zinc-150"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 flex flex-col">
                    <Label className="text-[10px] pb-0 font-bold uppercase text-zinc-550">Centro de Custo</Label>
                    <select 
                      value={newPayable.category} 
                      onChange={e => setNewPayable({ ...newPayable, category: e.target.value })}
                      className="bg-zinc-50 dark:bg-zinc-950 border-none dark:border-zinc-800 rounded-xl h-11 px-3 text-xs text-zinc-600 outline-none"
                    >
                      <option>Produção</option>
                      <option>Administrativo</option>
                      <option>Investimento</option>
                      <option>Folha de Pagamento</option>
                      <option>Impostos</option>
                      <option>Corte CNC</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 flex flex-col">
                    <Label className="text-[10px] pb-0 font-bold uppercase text-zinc-550">Status Inicial</Label>
                    <select 
                      value={newPayable.status} 
                      onChange={e => setNewPayable({ ...newPayable, status: e.target.value })}
                      className="bg-zinc-50 dark:bg-zinc-950 border-none dark:border-zinc-800 rounded-xl h-11 px-3 text-xs text-zinc-600 outline-none"
                    >
                      <option>Pendente</option>
                      <option>Agendado</option>
                      <option>Pago</option>
                    </select>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-purple-650 hover:bg-purple-600 text-white font-extrabold uppercase text-[10px] tracking-widest h-11 rounded-xl mt-3">
                  Salvar Lançamento
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    );
  };

  // --- VIEW 3: CONTAS A RECEBER (`fin-receber`) ---
  const renderContasAReceber = () => {
    const totalAberto = receivables.filter(r => r.status !== 'Pago').reduce((acc, r) => acc + r.value, 0);
    const totalRecebido = receivables.filter(r => r.status === 'Pago').reduce((acc, r) => acc + r.value, 0);

    return (
      <div className="space-y-6">
        {/* Standard header info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
          <div className="space-y-1">
            <span className="text-[9px] font-black tracking-widest text-blue-600 dark:text-blue-400 uppercase font-mono">Contas a Receber</span>
            <h1 className="text-3xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter leading-none">
              Gestão de <span className="text-blue-600">Contas a Receber</span>
            </h1>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => setIsReceivableModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold uppercase text-[10px] tracking-wider px-6 h-11 rounded-xl shadow-lg shadow-blue-600/10"
            >
              <Plus size={14} className="mr-1.5" /> Novo Recebível
            </Button>
          </div>
        </div>

        {/* Metrics bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-zinc-50 dark:bg-zinc-900/40 p-4.5 rounded-2xl border-none dark:border-zinc-805">
          <div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Previsão de Recebimento</p>
            <p className="text-2xl font-black text-zinc-900 dark:text-white font-mono">
              R$ {totalAberto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="border-t sm:border-t-0 sm:border-l border-zinc-200 dark:border-zinc-800 pt-3 sm:pt-0 sm:pl-6">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Total Recebido (Mês)</p>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              R$ {totalRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="border-t sm:border-t-0 sm:border-l border-zinc-200 dark:border-zinc-800 pt-3 sm:pt-0 sm:pl-6">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Comercial Faturável</p>
            <p className="text-2xl font-black text-blue-500 font-mono">
              R$ {(242500.00).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Receivables Table */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-zinc-600 dark:text-zinc-400 divide-y divide-zinc-150 dark:divide-zinc-850">
              <thead className="text-[9px] bg-zinc-50 dark:bg-zinc-900/50 uppercase tracking-widest text-zinc-500 font-mono">
                <tr>
                  <th scope="col" className="px-6 py-4">Cliente / Projeto de Faturamento</th>
                  <th scope="col" className="px-6 py-4 text-center">Vencimento</th>
                  <th scope="col" className="px-6 py-4 text-right">Valor</th>
                  <th scope="col" className="px-6 py-4 text-center">Meio de Cobrança</th>
                  <th scope="col" className="px-6 py-4 text-center">Status</th>
                  <th scope="col" className="px-6 py-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-850 font-medium">
                {receivables.map((rec) => (
                  <tr key={rec.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                    <td className="px-6 py-4 font-black uppercase text-zinc-800 dark:text-zinc-200">{rec.client}</td>
                    <td className="px-6 py-4 text-center font-mono">
                      {new Date(rec.dueDate).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-right font-black text-blue-600 dark:text-blue-400 font-mono text-sm leading-none">
                      R$ {rec.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-center font-bold font-mono text-zinc-500">{rec.method}</td>
                    <td className="px-6 py-4 text-center">
                      <Badge className={`text-[8px] font-black uppercase border-0 ${
                        rec.status === 'Pago' 
                          ? 'bg-emerald-500/10 text-emerald-500' 
                          : rec.status === 'Atrasado'
                            ? 'bg-rose-500/10 text-rose-500'
                            : 'bg-blue-500/10 text-blue-500'
                      }`}>
                        {rec.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {rec.status !== 'Pago' ? (
                        <Button 
                          size="xs" 
                          onClick={() => {
                            setReceivables(receivables.map(r => r.id === rec.id ? { ...r, status: 'Pago' } : r));
                            alert("Boleto/Pix faturado e conciliado!");
                          }}
                          className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold uppercase text-[8px] tracking-wide px-2.5 h-7 rounded"
                        >
                          Faturar
                        </Button>
                      ) : (
                        <span className="text-[10px] text-zinc-450 font-bold">Liquidado ✓</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Modal Overlay Receivable */}
        {isReceivableModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white dark:bg-zinc-900 border-none dark:border-zinc-800 rounded-3xl max-w-md w-full p-6 shadow-sm relative"
            >
              <button 
                onClick={() => setIsReceivableModalOpen(false)}
                className="absolute top-5 right-5 text-zinc-450 hover:text-black dark:hover:text-white"
              >
                <X size={18} />
              </button>
              <h3 className="text-lg font-black text-zinc-950 dark:text-white uppercase italic tracking-tight mb-4">Novo Faturamento Ativo</h3>
              <form onSubmit={handleAddReceivable} className="space-y-4">
                <div className="space-y-1.5 flex flex-col">
                  <Label className="text-[10px] pb-0 font-bold uppercase text-zinc-550">Cliente / Tomador do Serviço</Label>
                  <Input 
                    required 
                    value={newReceivable.client} 
                    onChange={e => setNewReceivable({ ...newReceivable, client: e.target.value })}
                    placeholder="Construtora Korteck de São Paulo" 
                    className="h-11 rounded-xl text-zinc-700 bg-zinc-50 border-zinc-150"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 flex flex-col">
                    <Label className="text-[10px] pb-0 font-bold uppercase text-zinc-550">Bruto Faturado (R$)</Label>
                    <Input 
                      required 
                      type="number" 
                      step="0.01" 
                      value={newReceivable.value} 
                      onChange={e => setNewReceivable({ ...newReceivable, value: e.target.value })}
                      placeholder="125000.00" 
                      className="h-11 rounded-xl text-zinc-700 bg-zinc-50 border-zinc-150"
                    />
                  </div>
                  <div className="space-y-1.5 flex flex-col">
                    <Label className="text-[10px] pb-0 font-bold uppercase text-zinc-550">Previsão Liquidação</Label>
                    <Input 
                      required 
                      type="date" 
                      value={newReceivable.dueDate} 
                      onChange={e => setNewReceivable({ ...newReceivable, dueDate: e.target.value })}
                      className="h-11 rounded-xl text-zinc-700 bg-zinc-50 border-zinc-150"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 flex flex-col">
                    <Label className="text-[10px] pb-0 font-bold uppercase text-zinc-550">Meio de Cobrança</Label>
                    <select 
                      value={newReceivable.method} 
                      onChange={e => setNewReceivable({ ...newReceivable, method: e.target.value })}
                      className="bg-zinc-50 dark:bg-zinc-950 border-none dark:border-zinc-800 rounded-xl h-11 px-3 text-xs text-zinc-650 outline-none"
                    >
                      <option>Boleto</option>
                      <option>Pix</option>
                      <option>Cartão</option>
                      <option>Transferência</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 flex flex-col">
                    <Label className="text-[10px] pb-0 font-bold uppercase text-zinc-550">Status de Cobrança</Label>
                    <select 
                      value={newReceivable.status} 
                      onChange={e => setNewReceivable({ ...newReceivable, status: e.target.value })}
                      className="bg-zinc-50 dark:bg-zinc-950 border-none dark:border-zinc-800 rounded-xl h-11 px-3 text-xs text-zinc-650 outline-none"
                    >
                      <option>Pendente</option>
                      <option>Em Dia</option>
                      <option>Pago</option>
                    </select>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold uppercase text-[10px] tracking-widest h-11 rounded-xl mt-3">
                  Salvar Faturamento
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    );
  };

  // --- VIEW 4: COLABORADORES (`fin-colab`) ---
  const renderColaboradores = () => {
    const crew = [
      { id: 'C1', name: 'Leandro Adams', role: 'Diretor Geral NK-Mubi', dept: 'Administração', salary: 14500.00, type: 'PJ', status: 'Pago' },
      { id: 'C2', name: 'Rodrigo Silva', role: 'Técnico Operação CNC Router', dept: 'Produção', salary: 4800.00, type: 'CLT', status: 'Pago' },
      { id: 'C3', name: 'Marta Souza', role: 'Líder Financeiro Korteck', dept: 'Financeiro', salary: 6500.00, type: 'CLT', status: 'Pago' },
      { id: 'C4', name: 'Carlos Santos', role: 'Instalador Comunicação Visual', dept: 'Instalação', salary: 3805.00, type: 'CLT', status: 'Pago' },
      { id: 'C5', name: 'Ana Oliveira', role: 'Designer Arte Finalista', dept: 'Comercial', salary: 4200.00, type: 'PJ', status: 'Pago' }
    ];

    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-[9px] font-black tracking-widest text-[#c084fc] uppercase font-mono">Consolidado de Recursos Humanos</span>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter leading-none">
            Folha e <span className="text-purple-650">Colaboradores</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { label: 'Folha Bruta Mensal', val: 'R$ 68.050,00' },
            { label: 'Encargos CLT', val: 'R$ 14.200,00' },
            { label: 'Prestadores PJ', val: 'R$ 18.700,00' },
            { label: 'Total Provisionado', val: 'R$ 100.950,00' }
          ].map((item, i) => (
            <Card key={i} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850">
              <CardContent className="p-4">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">{item.label}</p>
                <h3 className="text-lg font-extrabold text-zinc-950 dark:text-white font-mono">{item.val}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-zinc-600 dark:text-zinc-400 divide-y divide-zinc-150 dark:divide-zinc-850">
              <thead className="text-[9px] bg-zinc-50 dark:bg-zinc-900/50 uppercase tracking-widest text-zinc-500 font-mono">
                <tr>
                  <th scope="col" className="px-6 py-4">Nome</th>
                  <th scope="col" className="px-6 py-4 text-center">Cargo / Função</th>
                  <th scope="col" className="px-6 py-4 text-center">Departamento</th>
                  <th scope="col" className="px-6 py-4 text-center">Formato</th>
                  <th scope="col" className="px-6 py-4 text-right">Salário Base</th>
                  <th scope="col" className="px-6 py-4 text-center">Status Payout</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-850 font-medium">
                {crew.map((member) => (
                  <tr key={member.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-905 transition-colors">
                    <td className="px-6 py-4 font-black uppercase text-zinc-800 dark:text-zinc-200">{member.name}</td>
                    <td className="px-6 py-4 text-center">{member.role}</td>
                    <td className="px-6 py-4 text-center font-bold text-zinc-500">{member.dept}</td>
                    <td className="px-6 py-4 text-center">
                      <Badge className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-0">{member.type}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right font-black font-mono">R$ {member.salary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4 text-center">
                      <Badge className="bg-emerald-500/10 text-emerald-500 border-0 uppercase text-[8px] font-black">{member.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  };

  // --- VIEW 5: FISCAL (`fin-fiscal`) ---
  const renderFiscal = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-[9px] font-black tracking-widest text-[#1e3a8a] uppercase font-mono">Painel de Escrituração de Impostos</span>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter leading-none">
            Módulo <span className="text-blue-900 dark:text-blue-500">Fiscal Tributário</span>
          </h1>
        </div>

        {/* Action compensation banner */}
        <div className="bg-gradient-to-br from-indigo-900/10 to-blue-950/20 border-indigo-500/20 rounded-2xl border-2 p-5 flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[60px] opacity-20 pointer-events-none" />
          <div className="space-y-1 max-w-xl">
            <span className="text-[9px] font-black tracking-widest text-indigo-400 uppercase flex items-center gap-1.5"><Sparkles size={11} className="animate-bounce" /> Oportunidade Fiscal de Compensação</span>
            <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase italic tracking-tight">R$ 12.400,00 de Créditos Ativos</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal">
              Detectamos créditos tributários passíveis de compensação imediata de PIS/COFINS por matéria-prima adquirida para a produção CNC.
            </p>
          </div>
          <Button 
            onClick={() => alert("Simulando compensação automática no DAS Simples Nacional!")}
            className="bg-indigo-650 hover:bg-indigo-605 text-white font-extrabold uppercase text-[10px] tracking-widest px-6 h-11 shrink-0 rounded-xl shadow-md shadow-indigo-600/20"
          >
            Solicitar Compensação
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850">
            <CardHeader className="border-b border-zinc-150 dark:border-zinc-850">
              <CardTitle className="text-xs font-black uppercase text-zinc-800 dark:text-zinc-200">Guias DAS do Simples Nacional</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-4 divide-y divide-zinc-100 dark:divide-zinc-850 text-xs font-medium font-sans">
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-zinc-800 dark:text-zinc-200">Guia DAS • Maio 2026</h4>
                  <p className="text-[10px] text-zinc-500 font-mono">Competência: 05/2026 • Vecto: 20/06/2026</p>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-zinc-700 dark:text-zinc-300 font-mono mt-1">R$ 24.196,37</span>
                  <Badge className="bg-amber-500/10 text-amber-500 border-0 uppercase text-[8px] font-black mt-1">Pendente</Badge>
                </div>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-zinc-800 dark:text-zinc-150">Guia DAS • Abril 2026</h4>
                  <p className="text-[10px] text-zinc-500 font-mono">Competência: 04/2026 • Vecto: 20/05/2026</p>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-zinc-700 dark:text-zinc-300 font-mono mt-1">R$ 21.435,20</span>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-0 uppercase text-[8px] font-black mt-1">Pago</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850">
            <CardHeader className="border-b border-zinc-150 dark:border-zinc-850">
              <CardTitle className="text-xs font-black uppercase text-zinc-800 dark:text-zinc-200">ISS Guia Municipal consolidada</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-4 divide-y divide-zinc-100 dark:divide-zinc-850 text-xs font-medium font-sans">
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-zinc-800 dark:text-zinc-200">ISS Prestadora • Korteck</h4>
                  <p className="text-[10px] text-zinc-500 font-mono">Prefeitura Municipal de São Paulo • Vecto: 10/06/2026</p>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-zinc-700 dark:text-zinc-350 font-mono mt-1">R$ 4.320,00</span>
                  <Badge className="bg-amber-500/10 text-amber-500 border-0 uppercase text-[8px] font-black mt-1">Agendado</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // --- VIEW 6: SPED FISCAL (`fin-sped`) ---
  const renderSpedFiscal = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-[9px] font-black tracking-widest text-[#475569] uppercase font-mono">EFD ICMS IPI & EFD Contribuições</span>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter leading-none">
            Módulo <span className="text-zinc-755 dark:text-zinc-400">SPED Fiscal</span>
          </h1>
        </div>

        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850">
          <CardHeader className="border-b border-zinc-150 dark:border-zinc-850">
            <CardTitle className="text-xs font-black uppercase text-zinc-800 dark:text-zinc-200">Transmissão EFD SPED 2026</CardTitle>
            <CardDescription className="text-[9px] font-bold uppercase text-zinc-500 mt-1">Relatório eletrônico de escrituração mercantil</CardDescription>
          </CardHeader>
          <CardContent className="p-5 space-y-6 font-sans">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border-none dark:border-zinc-850">
              <div className="space-y-1">
                <span className="text-[9px] font-black uppercase text-zinc-500">Situação da Transmissão</span>
                <h4 className="text-xs font-bold text-emerald-650 flex items-center gap-1.5 uppercase">
                  <CheckCircle2 size={14} /> Arquivo Consolidado & Validado [Competência Maio 2026]
                </h4>
              </div>
              <Button 
                onClick={() => alert("Gerando e transmitindo arquivo SPED Fiscal OFICIAL aos servidores do Sefaz...")}
                className="bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold uppercase text-[10px] tracking-wider px-5 h-10 rounded-lg"
              >
                Transmitir ao Fisco
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center font-mono text-xs">
              {[
                { label: 'Bloco 0 (Abertura/Dados)', val: 'Consolidado' },
                { label: 'Bloco C (NF-e/NFS-e)', val: '1.322 Documentos' },
                { label: 'Bloco E (Apuração)', val: 'R$ 24.196,37' },
                { label: 'Bloco H (Inventário)', val: 'Completo' }
              ].map((b, i) => (
                <div key={i} className="p-4 bg-zinc-100/50 dark:bg-zinc-900/40 rounded-xl border-none dark:border-zinc-800">
                  <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1 font-sans">{b.label}</p>
                  <span className="font-extrabold text-zinc-850 dark:text-zinc-150">{b.val}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // --- VIEW 7: MONITOR DE NOTAS (`fin-notas`) ---
  const renderMonitorDeNotas = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-[9px] font-black tracking-widest text-[#eab308] uppercase font-mono">Emissão NF-e, NFS-e e Notas Sebrae</span>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter leading-none">
            Monitor de <span className="text-yellow-600 dark:text-yellow-500">Notas Fiscais</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850">
            <CardContent className="p-4">
              <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Notas Faturamento Emissão</p>
              <h3 className="text-xl font-black text-zinc-900 dark:text-white">84 Documentos</h3>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850">
            <CardContent className="p-4">
              <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Notas Entrada (Materiais)</p>
              <h3 className="text-xl font-black text-zinc-900 dark:text-white">48 Documentos</h3>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850">
            <CardContent className="p-4">
              <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Conversão XML Rejeitados</p>
              <h3 className="text-xl font-black text-emerald-600">0 Rejeições</h3>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850 overflow-hidden font-sans">
          <CardHeader className="border-b border-zinc-150 dark:border-zinc-850">
            <CardTitle className="text-xs font-black uppercase text-zinc-800 dark:text-zinc-220">Invoices & Emissões Recentes</CardTitle>
          </CardHeader>
          <CardContent className="p-4 font-sans text-xs">
            <div className="divide-y divide-zinc-100 dark:divide-zinc-850">
              {[
                { ref: 'NFe-3240', tomador: 'Banco Itaú S/A', val: 'R$ 45.000,00', status: 'Autorizada' },
                { ref: 'NFe-3239', tomador: 'Shopping Center Norte S.N.', val: 'R$ 12.000,00', status: 'Autorizada' },
                { ref: 'NFSe-843', tomador: 'Condomínio Residencial Alpha', val: 'R$ 8.900,00', status: 'Processada' }
              ].map((n, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold uppercase text-zinc-800 dark:text-zinc-200">{n.ref} • {n.tomador}</h4>
                    <span className="text-[9px] text-zinc-500 uppercase font-bold">XML Gerado • Protocolo WebSvc</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-zinc-700 dark:text-zinc-300 font-mono">{n.val}</span>
                    <Badge className="bg-emerald-500/10 text-emerald-500 border-0 uppercase text-[8px] font-black">{n.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // --- VIEW 8: OSS COM RESTRICAO (`fin-os-restricao`) ---
  const renderOsComRestricao = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-[9px] font-black tracking-widest text-red-650 uppercase font-mono">Prevenção de Insolvência e Análise Cadastral</span>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter leading-none">
            Anomalias em <span className="text-red-600">Ordens de Serviço</span>
          </h1>
        </div>

        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850">
          <CardHeader className="border-b border-zinc-150 dark:border-zinc-850">
            <CardTitle className="text-xs font-black uppercase text-zinc-800 dark:text-zinc-200">OS Bloqueadas Financeiro [KORTECK-CRM]</CardTitle>
            <CardDescription className="text-[9px] font-bold uppercase text-zinc-500 mt-1">Serviços travados no PCP aguardando sinal, análise de limite de crédito ou aprovação gerencial</CardDescription>
          </CardHeader>
          <CardContent className="p-4 divide-y divide-zinc-100 dark:divide-zinc-850 font-sans text-xs">
            {[
              { id: 'OS-955', client: 'Construtora Loteamento Leste', val: 'R$ 28.000,00', restriction: 'Aguardando depósito de 50% de entrada (Sinal)', status: 'Restrita' },
              { id: 'OS-942', client: 'Metalúrgica Aliança S/A', val: 'R$ 44.500,00', restriction: 'Cliente estourou o limite de crédito global (Boleto faturado)', status: 'Gerencial' }
            ].map((os) => (
              <div key={os.id} className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-zinc-850 dark:text-zinc-150 uppercase">{os.id} • {os.client}</h4>
                  <p className="text-rose-500 dark:text-rose-400 text-[10px] font-bold uppercase">Gargalo: {os.restriction}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="font-bold text-zinc-900 dark:text-zinc-200 font-mono">R$ {os.val}</span>
                  <Button 
                    onClick={() => alert(`Aprovando liberação da ${os.id} e destravando no painel de PCP do operador CNC Router!`)}
                    className="bg-rose-600 hover:bg-rose-500 text-white font-extrabold uppercase text-[9px] px-3.5 h-8 rounded-lg tracking-wider"
                  >
                    Aprovar Overrule
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  };

  // --- VIEW 9: LANCAMENTOS FUTUROS (`fin-lancamentos-futuros`) ---
  const renderLancamentosFuturos = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-[9px] font-black tracking-widest text-indigo-650 uppercase font-mono">Mapeamento Preditivo Trimestral</span>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter leading-none">
            Visão de <span className="text-indigo-600">Lançamentos Futuros</span>
          </h1>
        </div>

        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850">
          <CardHeader className="border-b border-zinc-150 dark:border-zinc-850">
            <CardTitle className="text-xs font-black uppercase text-zinc-800 dark:text-zinc-200">Cronograma de Contratos Recorrentes 2026</CardTitle>
          </CardHeader>
          <CardContent className="p-4 divide-y divide-zinc-100 dark:divide-zinc-850 font-sans text-xs">
            {[
              { desc: 'Licença Autodesk CAD / CAM Plataforma', val: 'R$ 1.250,00', recur: 'Mensal recorrente • Todo dia 05', type: 'Débito' },
              { desc: 'Fornecimento Gases para Solda Oxi', val: 'R$ 4.800,00', recur: 'Bimensal • Todo dia 20', type: 'Débito' },
              { desc: 'Retenção Projeto Fachada Shopping SP', val: 'R$ 45.000,00', recur: 'Semestral • Parcela final em 18/06', type: 'Crédito' }
            ].map((lf, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold uppercase text-zinc-800 dark:text-zinc-200">{lf.desc}</h4>
                  <p className="text-[10px] text-zinc-500">{lf.recur}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-mono font-bold ${lf.type === 'Crédito' ? 'text-emerald-500' : 'text-zinc-650 dark:text-zinc-400'}`}>R$ {lf.val}</span>
                  <Badge className={`border-0 uppercase text-[8px] font-black ${lf.type === 'Crédito' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>{lf.type}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  };

  // --- VIEW 10: FATURAMENTO (`fin-faturamento`) ---
  const renderFaturamento = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-[9px] font-black tracking-widest text-[#0c0c10] uppercase font-mono">Demonstrativo Fiscal Acumulado</span>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter leading-none">
            Painel Geral de <span className="text-purple-650">Faturamento</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Faturamento Líquido (Mês)', val: 'R$ 880.656,50' },
            { label: 'Faturamento Acumulado (2026)', val: 'R$ 4.821.500,00' },
            { label: 'Projeção Próximo Trimestre', val: 'R$ 2.450.000,50' },
            { label: 'Simples Nacional Faixa DAS', val: 'Faixa 5 (Até R$ 4.8M)' }
          ].map((item, i) => (
            <Card key={i} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850">
              <CardContent className="p-4">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">{item.label}</p>
                <h3 className="text-lg font-extrabold text-zinc-950 dark:text-white font-mono">{item.val}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850">
          <CardHeader className="border-b border-zinc-150 dark:border-zinc-850">
            <CardTitle className="text-xs font-black uppercase text-zinc-850 dark:text-zinc-200">Previsão e Realizado Mensal (2026)</CardTitle>
          </CardHeader>
          <CardContent className="p-5 font-sans text-xs space-y-4">
            {[
              { month: 'Janeiro', pred: 'R$ 600.000', real: 'R$ 645.200 (107%)', color: 'bg-emerald-500' },
              { month: 'Fevereiro', pred: 'R$ 600.000', real: 'R$ 580.400 (96%)', color: 'bg-[#ffcc00]' },
              { month: 'Março', pred: 'R$ 650.000', real: 'R$ 720.600 (110%)', color: 'bg-emerald-500' },
              { month: 'Abril', pred: 'R$ 750.000', real: 'R$ 785.340 (104%)', color: 'bg-emerald-500' },
              { month: 'Maio', pred: 'R$ 800.000', real: 'R$ 880.656 (110%)', color: 'bg-emerald-500' },
            ].map((d, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between font-bold text-[11px] uppercase p-0.5 rounded text-zinc-650 dark:text-zinc-400">
                  <span>{d.month}</span>
                  <span>{d.real} • Meta: {d.pred}</span>
                </div>
                <div className="h-1.5 bg-zinc-100 dark:bg-zinc-850 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${d.color}`} style={{ width: '85%' }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-300 max-w-[1600px] mx-auto select-none">
      {/* Dynamic Render block of active child layout view */}
      {renderSelectedView()}
    </div>
  );
}
