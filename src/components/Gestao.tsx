import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "@/src/lib/ThemeContext";
import {
  Calculator,
  FileCheck,
  Zap,
  Lightbulb,
  Layout,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Sliders,
  Trash2,
  Plus,
  DollarSign,
  Wrench,
  Eye,
  Layers,
  Cpu,
  Info,
  LineChart,
  Activity,
  Gauge,
  Edit2,
  Check,
  X,
  Percent,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  Cell,
  PieChart as RePieChart,
  Pie,
  AreaChart as ReAreaChart,
  Area,
} from "recharts";
import { cn } from "@/lib/utils";

type SubViewGestao =
  | "precificacao"
  | "ges-markup"
  | "rrt"
  | "bitola"
  | "led-fonte"
  | "pgv";

interface LeadFormState {
  itemWidth: number;
  itemHeight: number;
  materialsCost: number;
  laborHours: number;
  laborRate: number;
  indirectCosts: number;
  markup: number;
}

export function Gestao({ initialTab }: { initialTab?: string }) {
  const { theme } = useTheme();
  const isLight = theme === "ash-light";

  const [activeTab, setActiveTab] = useState<SubViewGestao>("precificacao");

  useEffect(() => {
    if (initialTab === "ges-preco") setActiveTab("precificacao");
    else if (initialTab === "ges-markup") setActiveTab("ges-markup");
    else if (initialTab === "ges-rrt") setActiveTab("rrt");
    else if (initialTab === "ges-bitola") setActiveTab("bitola");
    else if (initialTab === "ges-led-fonte") setActiveTab("led-fonte");
    else if (initialTab === "ges-pgv") setActiveTab("pgv");
    else if (initialTab === "gestao") setActiveTab("ges-markup"); // Default for 'gestao'
  }, [initialTab]);

  // --- PRECIFICAÇÃO STATE ---
  const [pricingFields, setPricingFields] = useState<LeadFormState>({
    itemWidth: 2.0,
    itemHeight: 1.0,
    materialsCost: 350,
    laborHours: 6,
    laborRate: 45,
    indirectCosts: 120,
    markup: 2.2,
  });

  const [materialsList, setMaterialsList] = useState([
    { name: "ACM Chapa 3mm", qty: "1 un", val: 180 },
    { name: "Fita LED Dupla Face UV", qty: "12m", val: 95 },
    { name: "Perfil Alumínio Estrutural", qty: "6m", val: 75 },
  ]);

  const [newMatName, setNewMatName] = useState("");
  const [newMatValue, setNewMatValue] = useState("");

  const calcArea = pricingFields.itemWidth * pricingFields.itemHeight;
  const totalMaterials = materialsList.reduce((acc, m) => acc + m.val, 0);
  const totalLabor = pricingFields.laborHours * pricingFields.laborRate;
  const baseCost = totalMaterials + totalLabor + pricingFields.indirectCosts;
  const finalPrice = baseCost * pricingFields.markup;
  const netProfit = finalPrice - baseCost;

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMatName || !newMatValue) return;
    setMaterialsList([
      ...materialsList,
      { name: newMatName, qty: "Unitário", val: Number(newMatValue) },
    ]);
    setNewMatName("");
    setNewMatValue("");
  };

  // --- RRT STATE ---
  const [rrtList, setRrtList] = useState([
    {
      id: "RRT-2026-9901",
      site: "Hospital Sírio Libanês - Fachada ACM",
      eng: "Roberto Carlos Silveira",
      crea: "CREA-SP 5070221",
      status: "Emitido",
      date: "15/05/2026",
      type: "RRT de Execução de Estrutura Metálica",
      complexidade: "Alta",
    },
    {
      id: "RRT-2026-0044",
      site: "Shopping Eldorado - Totem Luminoso 12m",
      eng: "Roberto Carlos Silveira",
      crea: "CREA-SP 5070221",
      status: "Pendente",
      date: "29/05/2026",
      type: "RRT de Projeto de Fixação Mecatrônica",
      complexidade: "Média",
    },
    {
      id: "RRT-2026-1012",
      site: "Loja Nike Oscar Freire - Pórtico Inox Pintado",
      eng: "Mariana Alvarenga",
      crea: "CONFEA-SP 1209931",
      status: "Emitido",
      date: "02/06/2026",
      type: "RRT de Cálculo de Carga de Vento",
      complexidade: "Baixa",
    },
  ]);

  const [newRrtSite, setNewRrtSite] = useState("");
  const [newRrtEng, setNewRrtEng] = useState("Roberto Carlos Silveira");
  const [newRrtType, setNewRrtType] = useState(
    "RRT de Execução de Estrutura Metálica",
  );
  const [newRrtComplexidade, setNewRrtComplexidade] = useState("Média");

  const handleAddRrt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRrtSite) return;
    const codes = Math.floor(1000 + Math.random() * 9000);
    setRrtList([
      ...rrtList,
      {
        id: `RRT-2026-${codes}`,
        site: newRrtSite,
        eng: newRrtEng,
        crea:
          newRrtEng === "Roberto Carlos Silveira"
            ? "CREA-SP 5070221"
            : "CONFEA-SP 1209931",
        status: "Pendente",
        date: new Date().toLocaleDateString("pt-BR"),
        type: newRrtType,
        complexidade: newRrtComplexidade,
      },
    ]);
    setNewRrtSite("");
  };

  // --- BITOLA DE FIO STATE ---
  const [bitolaWatts, setBitolaWatts] = useState(240); // 240 Watts total LEDs
  const [bitolaVolts, setBitolaVolts] = useState(12); // 12V or 24V DC
  const [bitolaDistance, setBitolaDistance] = useState(15); // 15 meters
  const [bitolaMaxDrop, setBitolaMaxDrop] = useState(4); // 4% max voltage drop

  // R = 2 * L * I * rho / (V * (drop/100)) donde rho = 0.0178 ohm.mm2/m
  const currentAmps = bitolaWatts / bitolaVolts;
  const ohmCopper = 0.0178; // rho cobre
  const maxVoltageDropVal = bitolaVolts * (bitolaMaxDrop / 100);
  const calculatedBitola =
    (2 * bitolaDistance * currentAmps * ohmCopper) / maxVoltageDropVal;

  const getStandardGauge = (section: number) => {
    if (section <= 0.5) return "0.50 mm² (Corrente recomendada técnica)";
    if (section <= 0.75) return "0.75 mm²";
    if (section <= 1.0) return "1.00 mm²";
    if (section <= 1.5) return "1.50 mm²";
    if (section <= 2.5) return "2.50 mm²";
    if (section <= 4.0) return "4.00 mm²";
    if (section <= 6.0) return "6.00 mm²";
    if (section <= 10.0) return "10.00 mm²";
    if (section <= 16.0) return "16.00 mm²";
    return (
      "Seção customizada especial (Min: " +
      section.toFixed(2) +
      " mm²) - use cabeamento paralelo duplicado duplo!"
    );
  };

  // --- LED POTENCIA STATE ---
  const [ledQty, setLedQty] = useState(30); // 30 LED modules
  const [ledPowerPerUnit, setLedPowerPerUnit] = useState(1.2); // 1.2W per module
  const [ledMargin, setLedMargin] = useState(25); // 25% safety overhead
  const [ledOutputVoltage, setLedOutputVoltage] = useState(12); // 12V DC power source

  const totalLedPowerRaw = ledQty * ledPowerPerUnit;
  const powerOverheadSum = totalLedPowerRaw * (1 + ledMargin / 100);
  const totalAmpsRecommended = powerOverheadSum / ledOutputVoltage;

  // Recommended standard industrial CV power supplies
  const getRecommendedPowerSource = (watts: number) => {
    if (watts <= 30)
      return {
        model: "Fonte Blindada Premium Slim 12V 30W 2.5A IP67",
        efficiency: "91%",
      };
    if (watts <= 60)
      return { model: "Fonte Colmeia Metálica 12V 60W 5A", efficiency: "88%" };
    if (watts <= 120)
      return {
        model: "Fonte Silenciosa Slim SlimLine 12V 120W 10A IP20",
        efficiency: "92%",
      };
    if (watts <= 150)
      return {
        model: "Fonte Blindada Estanque Heavy-Duty 12V 150W 12.5A IP67",
        efficiency: "94%",
      };
    if (watts <= 200)
      return {
        model: "Fonte Industrial Super-Power 12V 200W 16.6A Bivolt",
        efficiency: "90%",
      };
    if (watts <= 240)
      return {
        model: "Fonte Colmeia Profissional MeanWell 12V 240W 20A",
        efficiency: "96%",
      };
    if (watts <= 350)
      return {
        model: "Fonte MeanWell Heavy-Duty Ventilada 12V 350W 29A LRS-350",
        efficiency: "95%",
      };
    return {
      model:
        "Múltiplas Fontes Redundantes Balanceadas 400W+ ou Unidade Din trilho especial",
      efficiency: "93%",
    };
  };

  // --- PGV STATE ---
  const pgvOeeDaily = [
    { name: "08:00", real: 82, meta: 85 },
    { name: "10:00", real: 86, meta: 85 },
    { name: "12:00", real: 79, meta: 85 },
    { name: "14:00", real: 88, meta: 85 },
    { name: "16:00", real: 90, meta: 85 },
    { name: "18:00", real: 94, meta: 85 },
  ];

  const pgvPieData = [
    { name: "Ativo Operando", val: 65, color: "#10b981" },
    { name: "Setup de Ferramental", val: 15, color: "#f59e0b" },
    { name: "Tempo Ocioso", val: 10, color: "#6b7280" },
    { name: "Manutenção Preditiva", val: 10, color: "#ef4444" },
  ];

  // --- COMPREHENSIVE GESTÃO DE MARKUP SYSTEM STATE & MATH ---
  const [markupCustosDiretos, setMarkupCustosDiretos] = useState(1200);
  const [markupHorasTrabalho, setMarkupHorasTrabalho] = useState(10);
  const [markupValorHora, setMarkupValorHora] = useState(45);
  const [markupDespesasFixas, setMarkupDespesasFixas] = useState(15); // 15%
  const [markupAliquotaImposto, setMarkupAliquotaImposto] = useState(12); // 12%
  const [markupComissao, setMarkupComissao] = useState(5); // 5%
  const [markupTargetFactor, setMarkupTargetFactor] = useState(2.5); // Multiplicador de 2.5x
  const [selectedChannel, setSelectedChannel] = useState<"direta" | "b2b" | "corporativo">("direta");
  
  // Custom categories with individual default markups
  const [markupCategories, setMarkupCategories] = useState([
    { id: '1', name: 'Fachadas em ACM', defaultMarkup: 2.2, minMarkup: 1.8, targetMargin: 45, val: 2.2, risk: 'safe' },
    { id: '2', name: 'Letreiros Caixa LED', defaultMarkup: 2.8, minMarkup: 2.2, targetMargin: 55, val: 2.8, risk: 'safe' },
    { id: '3', name: 'Painéis Neon Flex', defaultMarkup: 3.2, minMarkup: 2.5, targetMargin: 60, val: 3.2, risk: 'safe' },
    { id: '4', name: 'Impressão Digital / Lonas', defaultMarkup: 3.8, minMarkup: 3.0, targetMargin: 65, val: 3.8, risk: 'safe' },
    { id: '5', name: 'Serralheria Estrutural', defaultMarkup: 2.0, minMarkup: 1.6, targetMargin: 40, val: 2.0, risk: 'warning' },
  ]);

  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editMarkupVal, setEditMarkupVal] = useState<string>('');

  const handleSaveCategoryMarkup = (id: string) => {
    const parsed = parseFloat(editMarkupVal);
    if (!isNaN(parsed) && parsed > 0) {
      setMarkupCategories(prev => prev.map(cat => {
        if (cat.id === id) {
          const riskStatus = parsed < cat.minMarkup ? 'danger' : (parsed < cat.defaultMarkup ? 'warning' : 'safe');
          return { ...cat, val: parsed, risk: riskStatus };
        }
        return cat;
      }));
    }
    setEditingCategory(null);
  };

  const channelData = {
    direta: { id: 'direta', label: 'Venda Direta CRM', discount: 0, commission: markupComissao, overhead: markupDespesasFixas, desc: 'Negociação com cliente final corporativo / residencial' },
    b2b: { id: 'b2b', label: 'Parceria de Volume B2B', discount: 15, commission: Math.max(1, markupComissao - 2), overhead: Math.max(4, markupDespesasFixas - 4), desc: 'Agências, arquitetos terceirizados, sub-fabricação' },
    corporativo: { id: 'corporativo', label: 'Grandes Obras & Licitações', discount: 8, commission: Math.min(15, markupComissao + 3), overhead: markupDespesasFixas, desc: 'Exige caução de garantia, engenheiros adicionas e RRT' },
  };

  const currentChannel = channelData[selectedChannel] || channelData.direta;

  // Calculo de custos diretos
  const directLaborCost = markupHorasTrabalho * markupValorHora;
  const rawDirectCost = markupCustosDiretos + directLaborCost;

  // Multiplicador do preço bruto
  const basePriceBeforeChannel = rawDirectCost * markupTargetFactor;

  // Desconto aplicado pelo canal correspondente
  const discountAmount = basePriceBeforeChannel * (currentChannel.discount / 100);
  const finalSalesPrice = basePriceBeforeChannel - discountAmount;

  // Custos em cascata
  const calculatedTaxes = finalSalesPrice * (markupAliquotaImposto / 100);
  const calculatedCommission = finalSalesPrice * (currentChannel.commission / 100);
  const calculatedFixedOverhead = finalSalesPrice * (currentChannel.overhead / 100);

  // Custos diretos totais de produção
  const totalProductionCost = rawDirectCost;

  // Rentabilidade líquida final
  const netEarnings = finalSalesPrice - totalProductionCost - calculatedTaxes - calculatedCommission - calculatedFixedOverhead;
  const netEarningsPct = finalSalesPrice > 0 ? (netEarnings / finalSalesPrice) * 100 : 0;
  const grossProfitMarginPct = finalSalesPrice > 0 ? ((finalSalesPrice - totalProductionCost) / finalSalesPrice) * 100 : 0;

  // Composição do preço final (Recharts horizontal bar chart structure)
  const compositionChartData = [
    { name: 'Custo Produtivo', value: parseFloat(totalProductionCost.toFixed(1)), color: '#a855f7' }, // Purple
    { name: 'Despesas Fixas', value: parseFloat(calculatedFixedOverhead.toFixed(1)), color: '#f59e0b' }, // Amber
    { name: 'Impostos', value: parseFloat(calculatedTaxes.toFixed(1)), color: '#3b82f6' }, // Blue
    { name: 'Comissão Vendas', value: parseFloat(calculatedCommission.toFixed(1)), color: '#ec4899' }, // Pink
    { name: 'Lucro Líquido', value: parseFloat(Math.max(0, netEarnings).toFixed(1)), color: '#10b981' }, // Emerald
  ];

  return (
    <div
      className={cn(
        "flex-1",
        isLight
          ? "bg-zinc-900"
          : "bg-black p-4 md:p-8 space-y-8 animate-in fade-in duration-300 pb-24",
      )}
    >
      {activeTab === "ges-markup" ? (
        <div className="flex flex-col h-full w-full">
          {/* Header specific to markup */}
          <div
            className={cn(
              "px-8 py-6 border-b flex items-center justify-between",
              isLight
                ? "bg-white border-transparent"
                : "bg-zinc-950 border-transparent",
            )}
          >
            <div className="flex flex-col">
              <h1
                className={cn(
                  "text-[22px] font-bold tracking-tight",
                  isLight ? "text-zinc-900" : "text-white",
                )}
              >
                Gestão de Preço (Markup)
              </h1>
              <p
                className={cn(
                  "text-[13px] font-medium mt-0.5",
                  isLight ? "text-zinc-500" : "text-zinc-400",
                )}
              >
                Controle de markup, margem e custos
              </p>
            </div>
            {/* Right actions */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  placeholder="Buscar produtos, clientes, pedidos..."
                  className={cn(
                    "w-[340px] h-9 text-xs pl-8 border-none focus-visible:ring-0 rounded-lg",
                    isLight
                      ? "bg-zinc-900 text-zinc-800 placeholder:text-zinc-500"
                      : "bg-zinc-900 text-zinc-300",
                  )}
                />
                <svg
                  className="absolute left-2.5 top-2.5 w-4 h-4 text-zinc-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <button
                className={cn(
                  "relative p-2 rounded-full transition-colors",
                  isLight
                    ? "hover:bg-zinc-100 text-zinc-600"
                    : "hover:bg-zinc-800 text-zinc-400",
                )}
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-orange-500 rounded-full ring-2 ring-white"></div>
              </button>

              <Button className="bg-zinc-900 hover:bg-orange-600 text-white font-semibold flex items-center gap-2 h-9 px-4 rounded-lg">
                <span>+</span>
                Nova venda
              </Button>

              <div className="w-9 h-9 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold text-sm tracking-tighter cursor-pointer">
                A
              </div>
            </div>
          </div>

          {/* Main content area for markup */}
          <div className="flex-grow p-4 md:p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-172px)]">
            
            {/* Top Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-3xl shadow-sm hover:translate-y-[-2px] transition-all duration-300">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic mb-1">Preço Final de Venda</p>
                <p className="text-2xl font-black italic tracking-tighter text-purple-600 dark:text-purple-400">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(finalSalesPrice)}
                </p>
                <div className="flex items-center gap-1 mt-2 text-[10px] text-zinc-400 font-bold">
                  <Badge variant="outline" className="text-[9px] uppercase font-black px-1.5 h-4 text-purple-500 bg-purple-500/5 dark:bg-purple-500/10 border-purple-500/20">
                    {currentChannel.label}
                  </Badge>
                  {currentChannel.discount > 0 && (
                    <span className="text-orange-500">-{currentChannel.discount}% Desc</span>
                  )}
                </div>
              </Card>

              <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-3xl shadow-sm hover:translate-y-[-2px] transition-all duration-300">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic mb-1">Custo Direto Industrial</p>
                <p className="text-2xl font-black italic tracking-tighter text-zinc-900 dark:text-zinc-100">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalProductionCost)}
                </p>
                <p className="text-[10px] text-zinc-400 font-semibold mt-2">
                  Matérias Primas + Horas de Mão de Obra
                </p>
              </Card>

              <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-3xl shadow-sm hover:translate-y-[-2px] transition-all duration-300">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic mb-1">Margem Gross (Bruta)</p>
                <p className={cn(
                  "text-2xl font-black italic tracking-tighter",
                  grossProfitMarginPct >= 50 ? "text-emerald-500" : (grossProfitMarginPct >= 35 ? "text-amber-500" : "text-rose-500")
                )}>
                  {grossProfitMarginPct.toFixed(1)}%
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-[10px] text-zinc-400 font-semibold">Alvo Recomendado: Min 45%</span>
                </div>
              </Card>

              <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-3xl shadow-sm hover:translate-y-[-2px] transition-all duration-300">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic mb-1">Lucro Líquido Final</p>
                <p className={cn(
                  "text-2xl font-black italic tracking-tighter",
                  netEarnings >= 150 ? "text-emerald-500" : (netEarnings > 0 ? "text-amber-500" : "text-rose-500")
                )}>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(netEarnings)} <span className="text-xs font-semibold">({netEarningsPct.toFixed(1)}%)</span>
                </p>
                <p className="text-[10px] text-zinc-400 font-semibold mt-2">
                  Sobras pós impostos, fixos e comissões
                </p>
              </Card>
            </div>

            {/* Core Simulator and Category Rules Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Simulator Panel (Left: 7cols) */}
              <div className="lg:col-span-7 space-y-6">
                <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl shadow-sm">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-500">
                        <Sliders size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500">Simulador Avançado</h4>
                        <h2 className="text-base font-black italic uppercase text-zinc-900 dark:text-white leading-tight">Variáveis de Custo & Composição</h2>
                      </div>
                    </div>
                    
                    <Badge variant="outline" className="text-[10px] font-bold px-2 py-0.5 border-purple-500/20 text-purple-500 bg-purple-500/5">
                      Sincronizado ERP v4
                    </Badge>
                  </div>

                  {/* Channel Tabs */}
                  <div className="mb-6">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 block mb-3 italic">Canal Operacional de Venda</label>
                    <div className="grid grid-cols-3 gap-2 bg-zinc-100 dark:bg-zinc-950/80 p-1.5 rounded-xl border border-zinc-200/55 dark:border-transparent">
                      {(['direta', 'b2b', 'corporativo'] as const).map((ch) => {
                        const active = selectedChannel === ch;
                        return (
                          <button
                            key={ch}
                            onClick={() => setSelectedChannel(ch)}
                            className={cn(
                              "py-2 px-3 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all",
                              active 
                                ? "bg-purple-600 text-white shadow-md shadow-purple-500/20" 
                                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                            )}
                          >
                            {ch === 'direta' ? 'Direta (Varejo)' : ch === 'b2b' ? 'B2B (Volume)' : 'Construção/Obras'}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-zinc-400 mt-2 font-medium italic">
                      💡 {currentChannel.desc} (Desc: {currentChannel.discount}%, Comis: {currentChannel.commission}%)
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Item 1: Direct material costs */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-[11px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
                          Insumos & Matérias-Primas (BRL)
                        </Label>
                        <span className="text-xs font-extrabold font-mono text-zinc-900 dark:text-zinc-200">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(markupCustosDiretos)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <input 
                          type="range" 
                          min="100" 
                          max="15000" 
                          step="100"
                          value={markupCustosDiretos} 
                          onChange={(e) => setMarkupCustosDiretos(Number(e.target.value))}
                          className="w-full accent-purple-600 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                        />
                        <Input 
                          type="number"
                          value={markupCustosDiretos}
                          onChange={(e) => setMarkupCustosDiretos(Math.max(0, Number(e.target.value)))}
                          className="w-24 h-8 text-xs font-bold bg-zinc-50 dark:bg-zinc-950 font-mono text-right"
                        />
                      </div>
                    </div>

                    {/* Item 2: Labor hours and costs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-zinc-500">Esforço Operacional (Horas)</Label>
                          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-200">{markupHorasTrabalho} h</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input 
                            type="range" 
                            min="1" 
                            max="120" 
                            value={markupHorasTrabalho} 
                            onChange={(e) => setMarkupHorasTrabalho(Number(e.target.value))}
                            className="w-full accent-purple-600 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                          />
                          <Input 
                            type="number"
                            value={markupHorasTrabalho}
                            onChange={(e) => setMarkupHorasTrabalho(Math.max(0, Number(e.target.value)))}
                            className="w-16 h-8 text-xs font-bold bg-zinc-50 dark:bg-zinc-950 text-center font-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-zinc-500">Custo do Homem-Hora (BRL/h)</Label>
                          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-200">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(markupValorHora)}/h</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input 
                            type="range" 
                            min="15" 
                            max="150" 
                            value={markupValorHora} 
                            onChange={(e) => setMarkupValorHora(Number(e.target.value))}
                            className="w-full accent-purple-600 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                          />
                          <Input 
                            type="number"
                            value={markupValorHora}
                            onChange={(e) => setMarkupValorHora(Math.max(0, Number(e.target.value)))}
                            className="w-16 h-8 text-xs font-bold bg-zinc-50 dark:bg-zinc-950 text-center font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800/80 my-2" />

                    {/* Item 3: Markup multi factor slider */}
                    <div className="space-y-3 p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10">
                      <div className="flex justify-between items-center">
                        <Label className="text-[11px] font-black uppercase tracking-widest text-purple-500 flex items-center gap-1">
                          <Sparkles size={13} /> Fator de Multiplicação (Markup Alvo)
                        </Label>
                        <span className="text-base font-black font-mono text-purple-600 dark:text-purple-400">
                          {markupTargetFactor.toFixed(2)}x
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <input 
                          type="range" 
                          min="1.2" 
                          max="5.0" 
                          step="0.05"
                          value={markupTargetFactor} 
                          onChange={(e) => setMarkupTargetFactor(Number(e.target.value))}
                          className="w-full accent-purple-600 h-2 bg-purple-100 dark:bg-purple-950 rounded-lg appearance-none cursor-pointer"
                        />
                        <Input 
                          type="number"
                          step="0.1"
                          value={markupTargetFactor}
                          onChange={(e) => setMarkupTargetFactor(Math.max(1.0, Number(e.target.value)))}
                          className="w-20 h-8 text-xs font-extrabold bg-zinc-50 dark:bg-zinc-950 text-center font-mono border-purple-500/20"
                        />
                      </div>
                    </div>

                    {/* Item 4: Fixed Costs and Overheads */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Overhead Fixo</Label>
                          <span className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-200">{markupDespesasFixas}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="5" 
                          max="30" 
                          value={markupDespesasFixas} 
                          onChange={(e) => setMarkupDespesasFixas(Number(e.target.value))}
                          className="w-full accent-zinc-500 h-1.1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Impostos Alíquota</Label>
                          <span className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-200">{markupAliquotaImposto}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max="25" 
                          value={markupAliquotaImposto} 
                          onChange={(e) => setMarkupAliquotaImposto(Number(e.target.value))}
                          className="w-full accent-zinc-500 h-1.1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Comissão Base</Label>
                          <span className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-200">{markupComissao}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max="15" 
                          value={markupComissao} 
                          onChange={(e) => setMarkupComissao(Number(e.target.value))}
                          className="w-full accent-zinc-500 h-1.1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Warning on negative or low profit */}
                  {netEarnings < 0 && (
                    <div className="mt-6 flex gap-3 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 items-start">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <p className="font-extrabold uppercase tracking-widest mb-0.5">Operação Inviável Detectada</p>
                        <p className="font-medium text-[11px] opacity-90">O markup escolhido ({markupTargetFactor.toFixed(2)}x) sob a estrutura de descontos de canal resulta em prejuízo operacional líquido de {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(netEarnings)}. Aumente o fator multiplicador ou selecione outro canal.</p>
                      </div>
                    </div>
                  )}

                  {netEarnings >= 0 && netEarningsPct < 10 && (
                    <div className="mt-6 flex gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-500 items-start">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <p className="font-extrabold uppercase tracking-widest mb-0.5">Alerta de Margem Estreita</p>
                        <p className="font-medium text-[11px] opacity-90">O lucro líquido ({netEarningsPct.toFixed(1)}%) está abaixo da margem de segurança recomendada para operações de Comunicação Visual (mínimo de 12%). Revise os custos fixos.</p>
                      </div>
                    </div>
                  )}

                </Card>
              </div>

              {/* Composition Chart & Categories (Right: 5cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Polish composition chart */}
                <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-3xl shadow-sm">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic mb-1">Partição do Faturamento</h4>
                  <p className="text-sm font-black italic uppercase text-zinc-900 dark:text-white mb-4">Composição de Preço de Venda Praticado</p>
                  
                  <div className="h-44 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <ReBarChart data={compositionChartData} layout="vertical" margin={{ left: -10, right: 10, top: 5, bottom: 5 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: isLight ? '#52525b' : '#a1a1aa' }} width={90} />
                        <RechartsTooltip formatter={(value: any) => [`R$ ${Number(value).toFixed(2)}`, '']} />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12}>
                          {compositionChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </ReBarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Tiny chart legend in badge format */}
                  <div className="flex flex-wrap gap-2 justify-center mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
                    {compositionChartData.map((lbl, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: lbl.color }} />
                        <span>{lbl.name} (R$ {lbl.value})</span>
                      </div>
                    ))}
                  </div>

                </Card>

                {/* Customizable category markup multiplier rules */}
                <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-3xl shadow-sm">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic mb-1">Diretrizes Por Categoria</h4>
                  <p className="text-sm font-black italic uppercase text-zinc-900 dark:text-white mb-4">Fatores de Markup & Riscos Praticados</p>

                  <div className="space-y-3">
                    {markupCategories.map((cat) => {
                      const isEditing = editingCategory === cat.id;
                      return (
                        <div key={cat.id} className="flex items-center justify-between p-3.5 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-800/60 hover:border-zinc-200 dark:hover:border-zinc-700 transition-colors">
                          <div className="space-y-0.5">
                            <p className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200">{cat.name}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-semibold text-zinc-400">Min Recomendável: {cat.minMarkup.toFixed(1)}x</span>
                              <span className={cn(
                                "text-[9px] uppercase font-black px-1.5 py-0.2 rounded-full",
                                cat.risk === 'safe' ? "text-emerald-500 bg-emerald-500/10" : (cat.risk === 'warning' ? "text-amber-500 bg-amber-500/10" : "text-rose-500 bg-rose-500/10")
                              )}>
                                {cat.risk === 'safe' ? 'Margem Segura' : (cat.risk === 'warning' ? 'Margem Justa' : 'Margem Crítica')}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {isEditing ? (
                              <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                                <Input 
                                  value={editMarkupVal}
                                  onChange={e => setEditMarkupVal(e.target.value)}
                                  className="w-14 h-8 text-[11px] font-extrabold text-center bg-white dark:bg-zinc-900 h-8 font-mono border-purple-500"
                                />
                                <button 
                                  onClick={() => handleSaveCategoryMarkup(cat.id)}
                                  className="w-8 h-8 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white transition-colors flex items-center justify-center border-none"
                                >
                                  <Check size={14} />
                                </button>
                                <button 
                                  onClick={() => setEditingCategory(null)}
                                  className="w-8 h-8 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white transition-colors flex items-center justify-center border-none"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ) : (
                              <>
                                <button 
                                  onClick={() => {
                                    setMarkupTargetFactor(cat.val);
                                  }}
                                  className="text-[10px] font-black uppercase text-purple-600 dark:text-purple-400 font-mono hover:underline h-8 px-2.5 rounded hover:bg-purple-500/5"
                                  title="Carregar multiplicador no simulador"
                                >
                                  {cat.val.toFixed(2)}x ⚡
                                </button>
                                <button 
                                  onClick={() => {
                                    setEditingCategory(cat.id);
                                    setEditMarkupVal(String(cat.val));
                                  }}
                                  className="p-1.5 text-zinc-400 hover:text-purple-500 hover:bg-zinc-100 dark:hover:bg-zinc-850 rounded"
                                >
                                  <Edit2 size={13} />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </Card>

              </div>

            </div>

          </div>
        </div>
      ) : (
        <div
          className={cn(
            "h-full w-full",
            isLight
              ? "p-8 space-y-8 animate-in fade-in duration-300 pb-24"
              : "p-4 md:p-8 space-y-8 animate-in fade-in duration-300 pb-24 bg-transparent",
          )}
        >
          {/* Header section with specialized tags */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b border-transparent pb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-600/10 rounded-xl border border-purple-500/20">
                  <Sliders size={26} className="text-purple-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black tracking-[0.4em] text-zinc-500 uppercase">
                    MÓDULO DE GESTÃO E CAPACIDADE TÉCNICA
                  </span>
                  <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">
                    Gestão <span className="text-purple-600">e</span> Engenharia
                    CV
                  </h1>
                </div>
              </div>
            </div>

            {/* Dynamic Category Navigation pills */}
            <div className="flex flex-wrap gap-2">
              {[
                {
                  id: "precificacao",
                  label: "Precificação",
                  icon: <DollarSign size={14} />,
                },
                {
                  id: "rrt",
                  label: "RRT Técnica",
                  icon: <FileCheck size={14} />,
                },
                {
                  id: "bitola",
                  label: "Bitola de Fio",
                  icon: <Gauge size={14} />,
                },
                {
                  id: "led-fonte",
                  label: "Potência de LED",
                  icon: <Zap size={14} />,
                },
                { id: "pgv", label: "PGV À Vista", icon: <Layout size={14} /> },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setActiveTab(pill.id as SubViewGestao)}
                  className={cn(
                    "h-10 px-5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 border.5 transition-all",
                    activeTab === pill.id
                      ? "bg-purple-600 text-white border-purple-500 shadow-[0_4px_12px_rgba(124,58,237,0.25)]"
                      : isLight
                        ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-transparent"
                        : "bg-white dark:bg-zinc-900 hover:bg-zinc-900 text-zinc-400 border-transparent hover:text-white",
                  )}
                >
                  {pill.icon}
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="space-y-6"
            >
              {/* ======================================= */}
              {/* 1. PRECIFICAÇÃO (MARKUP / MARGEM) */}
              {/* ======================================= */}
              {activeTab === "precificacao" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Esquerda: Materiais e Custos do Projeto */}
                  <div className="lg:col-span-8 space-y-6">
                    <Card className="bg-white dark:bg-zinc-900 border-transparent shadow-xl">
                      <CardHeader>
                        <CardTitle className="text-sm font-black uppercase text-purple-400 font-mono flex items-center gap-2">
                          <Calculator size={16} /> Lista Comparativa de
                          Materiais do Item
                        </CardTitle>
                        <CardDescription className="text-xs text-zinc-500">
                          Mapeie todos os substratos primários usados para a
                          fabricação.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <form
                          onSubmit={handleAddMaterial}
                          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                        >
                          <div className="space-y-1.5 col-span-2">
                            <Label className="text-[10px] uppercase font-bold text-zinc-405">
                              Nome do Insumo
                            </Label>
                            <Input
                              value={newMatName}
                              onChange={(e) => setNewMatName(e.target.value)}
                              placeholder="Ex: ACM Prata Premium escovado 4mm"
                              className="bg-black/40 border-transparent text-white text-xs h-10"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[10px] uppercase font-bold text-zinc-405">
                              Valor do Custo (R$)
                            </Label>
                            <div className="flex gap-2">
                              <Input
                                value={newMatValue}
                                onChange={(e) => setNewMatValue(e.target.value)}
                                placeholder="185.00"
                                type="number"
                                className="bg-black/40 border-transparent text-white text-xs h-10 flex-1"
                              />
                              <Button
                                type="submit"
                                className="bg-purple-600 hover:bg-purple-700 h-10 px-3"
                              >
                                <Plus size={14} />
                              </Button>
                            </div>
                          </div>
                        </form>

                        <Table>
                          <TableHeader className="border-transparent">
                            <TableRow className="border-transparent hover:bg-transparent">
                              <TableHead className="text-[10px] font-black uppercase text-zinc-550">
                                Nome do Insumo
                              </TableHead>
                              <TableHead className="text-[10px] font-black uppercase text-zinc-550">
                                Quantidade
                              </TableHead>
                              <TableHead className="text-[10px] font-black uppercase text-zinc-550 text-right">
                                Custo Estimado
                              </TableHead>
                              <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {materialsList.map((m, idx) => (
                              <TableRow
                                key={idx}
                                className="border-transparent hover:bg-white/[0.01]"
                              >
                                <TableCell className="text-xs font-semibold text-white">
                                  {m.name}
                                </TableCell>
                                <TableCell className="text-xs text-zinc-400">
                                  {m.qty}
                                </TableCell>
                                <TableCell className="text-xs font-mono font-bold text-white text-right">
                                  R$ {m.val.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                  <button
                                    onClick={() =>
                                      setMaterialsList(
                                        materialsList.filter(
                                          (_, i) => i !== idx,
                                        ),
                                      )
                                    }
                                    className="text-zinc-550 hover:text-red-500 transition-colors"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </TableCell>
                              </TableRow>
                            ))}
                            <TableRow className="border-t border-dashed border-transparent hover:bg-transparent">
                              <TableCell className="text-xs font-black text-purple-400">
                                Total Insumos
                              </TableCell>
                              <TableCell></TableCell>
                              <TableCell className="text-xs font-black text-purple-400 text-right font-mono">
                                R$ {totalMaterials.toFixed(2)}
                              </TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>

                    {/* Parâmetros de Manufatura Adicionais */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Card className="bg-white dark:bg-zinc-900 border-transparent">
                        <CardHeader>
                          <CardTitle className="text-sm font-black uppercase text-purple-300">
                            Tempo & Mão de Obra
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <Label className="text-[10px] uppercase font-bold text-zinc-500">
                                Horas de Produção
                              </Label>
                              <Input
                                type="number"
                                value={pricingFields.laborHours}
                                onChange={(e) =>
                                  setPricingFields({
                                    ...pricingFields,
                                    laborHours: Number(e.target.value),
                                  })
                                }
                                className="bg-black/40 border-transparent text-white font-mono text-xs"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-[10px] uppercase font-bold text-zinc-500">
                                Valor da Hora (R$)
                              </Label>
                              <Input
                                type="number"
                                value={pricingFields.laborRate}
                                onChange={(e) =>
                                  setPricingFields({
                                    ...pricingFields,
                                    laborRate: Number(e.target.value),
                                  })
                                }
                                className="bg-black/40 border-transparent text-white font-mono text-xs"
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3.5 bg-black/40 rounded-xl border-none">
                            <span className="text-[11px] text-zinc-400 font-bold">
                              Total Mão de Obra:
                            </span>
                            <span className="text-xs font-black text-white font-mono">
                              R$ {totalLabor.toFixed(2)}
                            </span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-white dark:bg-zinc-900 border-transparent">
                        <CardHeader>
                          <CardTitle className="text-sm font-black uppercase text-purple-300">
                            Custos Indiretos & Markup
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <Label className="text-[10px] uppercase font-bold text-zinc-500">
                                Indireto Fixo (R$)
                              </Label>
                              <Input
                                type="number"
                                value={pricingFields.indirectCosts}
                                onChange={(e) =>
                                  setPricingFields({
                                    ...pricingFields,
                                    indirectCosts: Number(e.target.value),
                                  })
                                }
                                className="bg-black/40 border-transparent text-white font-mono text-xs"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-[10px] uppercase font-bold text-zinc-500">
                                Fator de Markup
                              </Label>
                              <Input
                                type="number"
                                step="0.1"
                                value={pricingFields.markup}
                                onChange={(e) =>
                                  setPricingFields({
                                    ...pricingFields,
                                    markup: Number(e.target.value),
                                  })
                                }
                                className="bg-black/40 border-transparent text-purple-400 font-black text-xs"
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3.5 bg-purple-650/5 rounded-xl border border-purple-500/10">
                            <span className="text-[11px] text-purple-200 font-bold">
                              Base Total com Fixos:
                            </span>
                            <span className="text-xs font-black text-purple-400 font-mono">
                              R$ {baseCost.toFixed(2)}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Direita: Painel Executivo do Orçamento Final */}
                  <div className="lg:col-span-4 space-y-6">
                    <Card className="bg-gradient-to-b from-[#110125] to-[#04000b] border-purple-950/40 shadow-sm overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

                      <CardHeader className="border-b border-transparent">
                        <CardTitle className="text-xs font-mono uppercase tracking-[0.2em] text-purple-400 flex items-center gap-1.5">
                          <DollarSign size={14} /> Proposal Builder CV v4
                        </CardTitle>
                        <CardDescription className="text-[11px] text-zinc-500">
                          Cálculo instantâneo estruturado para fechamento de
                          O.S.
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="p-8 space-y-8">
                        <div className="text-center space-y-2">
                          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
                            PREÇO DE VENDA RECOMENDADO
                          </p>
                          <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter font-mono">
                            R${" "}
                            {finalPrice.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </h1>
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
                            <CheckCircle size={10} /> EBITDA Estimado:{" "}
                            {((netProfit / finalPrice) * 100).toFixed(0)}%
                          </div>
                        </div>

                        <div className="h-px bg-white/5" />

                        <div className="space-y-4 font-sans text-xs">
                          <div className="flex justify-between items-center text-zinc-400">
                            <span>Área Total Calculada:</span>
                            <span className="font-bold text-white font-mono">
                              {calcArea.toFixed(2)} m²
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-zinc-400">
                            <span>Valor por m² vendido:</span>
                            <span className="font-bold text-white font-mono">
                              R$ {(finalPrice / calcArea).toFixed(0)} / m²
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-zinc-400">
                            <span>Custo Direto Total:</span>
                            <span className="font-bold text-white font-mono">
                              R$ {baseCost.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-zinc-400 border-t border-transparent pt-4">
                            <span className="text-purple-400 font-bold">
                              Margem de Lucro Bruta (EBITDA):
                            </span>
                            <span className="font-black text-emerald-400 font-mono text-sm">
                              R$ {netProfit.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <div className="bg-black/20 rounded-xl p-4 border-none space-y-2.5">
                          <div className="flex items-center gap-2">
                            <Info size={12} className="text-zinc-500" />
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                              Métrica de Segurança CV
                            </span>
                          </div>
                          <p className="text-[10px] leading-relaxed text-zinc-550 font-semibold">
                            O markup multiplicador de {pricingFields.markup}{" "}
                            cobre integralmente os desperdícios de corte de
                            chapa (estimado em média de 14.5% no ERP) e as
                            oscilações de fretes interestaduais do acm.
                          </p>
                        </div>

                        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black uppercase text-xs tracking-widest h-12 rounded-xl">
                          Exportar Proposta Comercial [PDF]
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* ======================================= */}
              {/* 2. REGISTRO DE RESPONSABILIDADE TÉCNICA (RRT/ART) */}
              {/* ======================================= */}
              {activeTab === "rrt" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Esquerda: Novo Registro de RRT */}
                    <div className="lg:col-span-4">
                      <Card className="bg-white dark:bg-zinc-900 border-transparent shadow-sm">
                        <CardHeader>
                          <CardTitle className="text-sm font-black uppercase text-purple-400 flex items-center gap-2">
                            <FileCheck size={16} /> Emitir Cadastro de R.R.T.
                          </CardTitle>
                          <CardDescription className="text-xs text-zinc-500">
                            Mapeamento de engenharias responsáveis com emissão
                            de atestados para obras.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <form onSubmit={handleAddRrt} className="space-y-4">
                            <div className="space-y-1.5">
                              <Label className="text-[10px] uppercase font-bold text-zinc-400">
                                Obra / Local de Instalação
                              </Label>
                              <Input
                                value={newRrtSite}
                                onChange={(e) => setNewRrtSite(e.target.value)}
                                placeholder="Ex: McDonald's Interlagos - Pórtico"
                                className="bg-black/40 border-transparent text-white text-xs h-11"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <Label className="text-[10px] uppercase font-bold text-zinc-400">
                                Engenheiro Responsável
                              </Label>
                              <select
                                value={newRrtEng}
                                onChange={(e) => setNewRrtEng(e.target.value)}
                                className="w-full h-11 bg-black/40 border-none rounded-lg px-3 text-xs text-white"
                              >
                                <option value="Roberto Carlos Silveira">
                                  Roberto Carlos Silveira (Logística/Urbano)
                                </option>
                                <option value="Mariana Alvarenga">
                                  Mariana Alvarenga (Fundações/Solo)
                                </option>
                              </select>
                            </div>

                            <div className="space-y-1.5">
                              <Label className="text-[10px] uppercase font-bold text-zinc-400">
                                Tipo de Laudo Técnico
                              </Label>
                              <select
                                value={newRrtType}
                                onChange={(e) => setNewRrtType(e.target.value)}
                                className="w-full h-11 bg-black/40 border-none rounded-lg px-3 text-xs text-white"
                              >
                                <option value="RRT de Execução de Estrutura Metálica">
                                  RRT de Execução de Estrutura Metálica
                                </option>
                                <option value="RRT de Projeto de Fixação Mecatrônica">
                                  RRT de Projeto de Fixação Mecatrônica
                                </option>
                                <option value="RRT de Cálculo de Carga de Vento">
                                  RRT de Cálculo de Carga de Vento
                                </option>
                              </select>
                            </div>

                            <div className="space-y-1.5">
                              <Label className="text-[10px] uppercase font-bold text-zinc-400">
                                Complexidade
                              </Label>
                              <select
                                value={newRrtComplexidade}
                                onChange={(e) => setNewRrtComplexidade(e.target.value)}
                                className="w-full h-11 bg-black/40 border-none rounded-lg px-3 text-xs text-white"
                              >
                                <option value="Baixa">Baixa</option>
                                <option value="Média">Média</option>
                                <option value="Alta">Alta</option>
                                <option value="Especial">Especial</option>
                              </select>
                            </div>

                            <Button
                              type="submit"
                              className="w-full bg-purple-600 hover:bg-purple-700 h-11 text-xs uppercase font-black tracking-wider"
                            >
                              Gravar Responsabilidade Técnica
                            </Button>
                          </form>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Direita: Tabela de RRTs Ativas */}
                    <div className="lg:col-span-8">
                      <Card className="bg-white dark:bg-zinc-900 border-transparent shadow-sm h-full">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-sm font-black uppercase text-zinc-300">
                                Responsabilidades Técnicas Ativas (RRT)
                              </CardTitle>
                              <CardDescription className="text-xs text-zinc-500">
                                Controle de engenharia civil cadastrada no
                                conselho de classe de arquitetura/engenharia.
                              </CardDescription>
                            </div>
                            <Badge className="bg-purple-905 border border-purple-800/30 text-purple-400 text-[9px] font-black uppercase tracking-widest px-2.5 py-1">
                              {rrtList.length} LAUDOS REGISTRADOS
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader className="border-transparent">
                              <TableRow className="border-transparent hover:bg-transparent">
                                <TableHead className="text-[10px] font-black uppercase">
                                  Código RRT
                                </TableHead>
                                <TableHead className="text-[10px] font-black uppercase">
                                  Obra / Cliente
                                </TableHead>
                                <TableHead className="text-[10px] font-black uppercase">
                                  Responsável
                                </TableHead>
                                <TableHead className="text-[10px] font-black uppercase">
                                  tipo
                                </TableHead>
                                <TableHead className="text-[10px] font-black uppercase">
                                  Complexidade
                                </TableHead>
                                <TableHead className="text-[10px] font-black uppercase">
                                  Status
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {rrtList.map((r) => (
                                <TableRow
                                  key={r.id}
                                  className="border-transparent hover:bg-white/[0.01]"
                                >
                                  <TableCell className="text-xs font-black text-purple-400 font-mono">
                                    {r.id}
                                  </TableCell>
                                  <TableCell className="text-xs font-semibold text-white">
                                    {r.site}
                                  </TableCell>
                                  <TableCell className="text-xs text-zinc-400">
                                    {r.eng}{" "}
                                    <span className="text-[9px] text-zinc-500 font-bold block">
                                      {r.crea}
                                    </span>
                                  </TableCell>
                                  <TableCell className="text-xs text-zinc-400 font-semibold">
                                    {r.type}
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      variant="outline"
                                      className={cn(
                                        "text-[9px] font-black uppercase tracking-widest",
                                        r.complexidade === "Alta" || r.complexidade === "Especial"
                                          ? "text-red-500 border-red-500"
                                          : r.complexidade === "Média"
                                            ? "text-amber-500 border-amber-500"
                                            : "text-blue-500 border-blue-500",
                                      )}
                                    >
                                      {r.complexidade}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      className={cn(
                                        "text-[9px] font-black uppercase tracking-widest",
                                        r.status === "Emitido"
                                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                          : "bg-amber-500/10 text-amber-500 border border-amber-500/20 animate-pulse",
                                      )}
                                    >
                                      {r.status}
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}

              {/* ======================================= */}
              {/* 3. CÁLCULO DE BITOLA DE FIO */}
              {/* ======================================= */}
              {activeTab === "bitola" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Esquerda: Formulário de Entrada do Circuito */}
                  <div className="lg:col-span-4">
                    <Card className="bg-white dark:bg-zinc-900 border-transparent shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-sm font-black uppercase text-purple-400 flex items-center gap-2">
                          <Gauge size={16} /> Parâmetros do Linhão DC/AC
                        </CardTitle>
                        <CardDescription className="text-xs text-zinc-500">
                          Calcule a seção de cobre correta para evitar perdas
                          brutas por queda de tensão.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-1.5">
                          <Label className="text-[10px] uppercase font-bold text-zinc-400">
                            Carga total instalada de LEDs (Watts)
                          </Label>
                          <Input
                            type="number"
                            value={bitolaWatts}
                            onChange={(e) =>
                              setBitolaWatts(Number(e.target.value))
                            }
                            className="bg-black/40 border-transparent text-white font-mono text-xs"
                          />
                          <p className="text-[9px] text-zinc-550 font-bold uppercase">
                            Exemplo: 120 módulos x 2W = 240W
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label className="text-[10px] uppercase font-bold text-zinc-400">
                              Tensão Nominal (V)
                            </Label>
                            <select
                              value={bitolaVolts}
                              onChange={(e) =>
                                setBitolaVolts(Number(e.target.value))
                              }
                              className="w-full h-10 bg-black/40 border-none rounded-lg px-3 text-xs text-white"
                            >
                              <option value={12}>12 V DC (Padrão)</option>
                              <option value={24}>
                                24 V DC (Longo alcance)
                              </option>
                              <option value={110}>110 V AC</option>
                              <option value={220}>220 V AC</option>
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[10px] uppercase font-bold text-zinc-400">
                              Distância Linear (metros)
                            </Label>
                            <Input
                              type="number"
                              value={bitolaDistance}
                              onChange={(e) =>
                                setBitolaDistance(Number(e.target.value))
                              }
                              className="bg-black/40 border-transparent text-white font-mono text-xs"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-[10px] uppercase font-bold text-zinc-400">
                            Queda de Tensão Máxima Permitida (%)
                          </Label>
                          <Input
                            type="number"
                            step="0.5"
                            value={bitolaMaxDrop}
                            onChange={(e) =>
                              setBitolaMaxDrop(Number(e.target.value))
                            }
                            className="bg-black/40 border-transparent text-purple-400 font-bold text-xs"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Direita: Análise de Engenharia e Recomendação */}
                  <div className="lg:col-span-8">
                    <Card className="bg-white dark:bg-zinc-900 border-transparent shadow-2xl h-full flex flex-col justify-between">
                      <CardHeader>
                        <CardTitle className="text-sm font-black uppercase text-zinc-300">
                          Análise Dimensional Térmica do Cabo
                        </CardTitle>
                        <CardDescription className="text-xs text-zinc-500">
                          Cálculo baseado na norma NBR 5410 com coeficiente de
                          perdas por efeitos joule no cobre.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6 flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="p-4 bg-muted/40 rounded-xl border-none text-center">
                            <p className="text-[9px] font-black text-zinc-500 uppercase tracking-wider mb-2">
                              CORRENTE NOMINAL
                            </p>
                            <h2 className="text-2xl font-black text-white italic tracking-tighter font-mono">
                              {currentAmps.toFixed(1)} A
                            </h2>
                          </div>
                          <div className="p-4 bg-muted/40 rounded-xl border-none text-center">
                            <p className="text-[9px] font-black text-zinc-500 uppercase tracking-wider mb-2">
                              QUEDA DE TENSÃO MÁXIMA
                            </p>
                            <h2 className="text-2xl font-black text-amber-500 italic tracking-tighter font-mono">
                              {maxVoltageDropVal.toFixed(2)} Volts
                            </h2>
                          </div>
                          <div className="p-4 bg-muted/40 rounded-xl border-none text-center">
                            <p className="text-[9px] font-black text-zinc-500 uppercase tracking-wider mb-2">
                              SEÇÃO CALCULADA MÍNIMA
                            </p>
                            <h2 className="text-2xl font-black text-purple-400 italic tracking-tighter font-mono">
                              {calculatedBitola.toFixed(3)} mm²
                            </h2>
                          </div>
                        </div>

                        <div className="p-6 bg-gradient-to-r from-purple-950/20 to-black/50 border border-purple-500/20 rounded-2xl space-y-4">
                          <div className="flex items-center gap-2">
                            <Zap
                              size={18}
                              className="text-purple-400 animate-pulse"
                            />
                            <h4 className="text-xs font-black uppercase tracking-widest text-[#a855f7]">
                              CABO RECOMENDADO KORTECK
                            </h4>
                          </div>
                          <p className="text-2xl font-black text-white uppercase italic tracking-tighter">
                            Bitola Mínima de{" "}
                            {getStandardGauge(calculatedBitola)}
                          </p>
                          <p className="text-xs leading-relaxed text-zinc-400 font-semibold">
                            Ao instalar letras caixas luminosas ou backlights
                            longos, cabos com seção inferior a recomendada
                            causam sobreaquecimento e perda brutal do brilho dos
                            LEDs na extremidade oposta à fonte de alimentação
                            devido à queda de tensão linear.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* ======================================= */}
              {/* 4. CÁLCULO DE POTÊNCIA DE LED PARA FONTE */}
              {/* ======================================= */}
              {activeTab === "led-fonte" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Esquerda: Dimensionador Técnico */}
                  <div className="lg:col-span-4">
                    <Card className="bg-white dark:bg-zinc-900 border-transparent shadow-2xl">
                      <CardHeader>
                        <CardTitle className="text-sm font-black uppercase text-purple-400 flex items-center gap-2">
                          <Lightbulb size={16} /> Volume de Equipamentos Led
                        </CardTitle>
                        <CardDescription className="text-xs text-zinc-500">
                          Mapeie o inventário de consumo dos luminosos a serem
                          alimentados.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-1.5">
                          <Label className="text-[10px] uppercase font-bold text-zinc-400">
                            Quantidade de Módulos (ou Metros de fita)
                          </Label>
                          <Input
                            type="number"
                            value={ledQty}
                            onChange={(e) => setLedQty(Number(e.target.value))}
                            className="bg-black/40 border-transparent text-white font-mono text-xs"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-[10px] uppercase font-bold text-zinc-400">
                            Consumo Individual (Watts por unidade/metro)
                          </Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={ledPowerPerUnit}
                            onChange={(e) =>
                              setLedPowerPerUnit(Number(e.target.value))
                            }
                            className="bg-black/40 border-transparent text-white font-mono text-xs"
                          />
                          <p className="text-[9px] text-zinc-550 font-bold uppercase">
                            LED 3 garras = 1.2W | Fita Especial Néon = 8.5W/m
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label className="text-[10px] uppercase font-bold text-zinc-400">
                              Overhead de Segurança (%)
                            </Label>
                            <Input
                              type="number"
                              value={ledMargin}
                              onChange={(e) =>
                                setLedMargin(Number(e.target.value))
                              }
                              className="bg-black/40 border-transparent text-purple-400 font-bold text-xs"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[10px] uppercase font-bold text-zinc-400">
                              Tensão da Fonte (Volts)
                            </Label>
                            <select
                              value={ledOutputVoltage}
                              onChange={(e) =>
                                setLedOutputVoltage(Number(e.target.value))
                              }
                              className="w-full h-10 bg-black/40 border-none rounded-lg px-3 text-xs text-white"
                            >
                              <option value={12}>12 Volts DC</option>
                              <option value={24}>24 Volts DC</option>
                            </select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Direita: Resultado Industrial */}
                  <div className="lg:col-span-8">
                    <Card className="bg-white dark:bg-zinc-900 border-transparent shadow-2xl h-full flex flex-col justify-between">
                      <CardHeader>
                        <CardTitle className="text-sm font-black uppercase text-zinc-300">
                          Dimensionamento da Célula de Corrente
                        </CardTitle>
                        <CardDescription className="text-xs text-zinc-500">
                          Indica a fonte ideal garantindo vida útil do circuito.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6 flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="p-4 bg-muted/40 rounded-xl border-none text-center">
                            <p className="text-[9px] font-black text-zinc-500 uppercase tracking-wider mb-2">
                              CONSUMO REAL DOS LEDS
                            </p>
                            <h2 className="text-2xl font-black text-white italic tracking-tighter font-mono">
                              {totalLedPowerRaw.toFixed(1)} W
                            </h2>
                          </div>
                          <div className="p-4 bg-muted/40 rounded-xl border-none text-center">
                            <p className="text-[9px] font-black text-zinc-500 uppercase tracking-wider mb-2">
                              CONSUMO COM MARGEM ({ledMargin}%)
                            </p>
                            <h2 className="text-2xl font-black text-amber-500 italic tracking-tighter font-mono">
                              {powerOverheadSum.toFixed(1)} W
                            </h2>
                          </div>
                          <div className="p-4 bg-muted/40 rounded-xl border-none text-center">
                            <p className="text-[9px] font-black text-zinc-500 uppercase tracking-wider mb-2">
                              CORRENTE MÍNIMA FONTE
                            </p>
                            <h2 className="text-2xl font-black text-purple-400 italic tracking-tighter font-mono">
                              {totalAmpsRecommended.toFixed(2)} A
                            </h2>
                          </div>
                        </div>

                        <div className="p-6 bg-gradient-to-r from-purple-950/20 to-black/50 border border-purple-500/20 rounded-2xl space-y-4">
                          <div className="flex items-center gap-2">
                            <Lightbulb size={18} className="text-purple-400" />
                            <h4 className="text-xs font-black uppercase tracking-widest text-[#a855f7]">
                              FONTE RECOMENDADA COMERCIAL
                            </h4>
                          </div>
                          <p className="text-xl font-black text-white uppercase italic tracking-tighter leading-tight">
                            {getRecommendedPowerSource(powerOverheadSum).model}
                          </p>
                          <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400">
                            <span>
                              Eficiência Energética:{" "}
                              <strong className="text-white font-mono">
                                {
                                  getRecommendedPowerSource(powerOverheadSum)
                                    .efficiency
                                }
                              </strong>
                            </span>
                            <span>
                              Padrão de Proteção:{" "}
                              <strong className="text-white">
                                Curto-circuito e Sobrecarga Térmica
                              </strong>
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* ======================================= */}
              {/* 5. PGV - PAINEL DE GESTÃO À VISTA */}
              {/* ======================================= */}
              {activeTab === "pgv" && (
                <div className="space-y-6">
                  {/* Top Banner KPI Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        label: "OEE OPERACIONAL HOJE",
                        val: "86.4%",
                        trend: "Meta: 85%",
                        desc: "Células integradas nominando alto desempenho",
                        icon: <Gauge className="text-emerald-400" />,
                      },
                      {
                        label: "ATIVIDADE IMPRESSORAS",
                        val: "320 m²/h",
                        trend: "Capacidade local",
                        desc: "Duas plotters UV operando acima da curva de setup",
                        icon: <Cpu className="text-blue-400" />,
                      },
                      {
                        label: "GARGALO DE MONTAGEM",
                        val: "02 O.S.",
                        trend: "Crítico de solda",
                        desc: "Serralheria pesada com retrofit acumulado",
                        icon: (
                          <AlertCircle className="text-amber-500 animate-pulse" />
                        ),
                      },
                      {
                        label: "META PRODUTIVA DIÁRIA",
                        val: "94.2%",
                        trend: "Fator Geral",
                        desc: "Meta de faturamento do turno atingida em 94%",
                        icon: <TrendingUp className="text-purple-400" />,
                      },
                    ].map((card, idx) => (
                      <Card
                        key={idx}
                        className="bg-white dark:bg-zinc-900 border-transparent relative overflow-hidden group hover:border-[#7c3aed]/20 transition-all"
                      >
                        <CardContent className="p-6 space-y-3">
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-black uppercase text-zinc-550 tracking-wider font-mono">
                              {card.label}
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-white/[0.02] flex items-center justify-center border-none">
                              {card.icon}
                            </div>
                          </div>
                          <div>
                            <h2 className="text-3xl font-black text-white italic tracking-tighter leading-none">
                              {card.val}
                            </h2>
                            <p className="text-[10px] font-bold text-zinc-400 mt-1 font-mono uppercase">
                              {card.trend}
                            </p>
                          </div>
                          <p className="text-[10px] leading-relaxed text-zinc-500 font-semibold">
                            {card.desc}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Charts & Production logs */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* OEE real vs Target bar chart */}
                    <div className="lg:col-span-8">
                      <Card className="bg-white dark:bg-zinc-900 border-transparent shadow-2xl">
                        <CardHeader>
                          <CardTitle className="text-sm font-black uppercase text-zinc-300 flex items-center gap-2">
                            <Activity size={16} className="text-emerald-500" />{" "}
                            Histórico de Eficiência OEE em Tempo Real
                          </CardTitle>
                          <CardDescription className="text-xs text-zinc-505">
                            Gráfico operacional à vista para reuniões diárias de
                            feedback de fábrica.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-72 w-full pt-4">
                            <ResponsiveContainer width="100%" height="100%">
                              <ReAreaChart data={pgvOeeDaily}>
                                <defs>
                                  <linearGradient
                                    id="oeeGrad"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                  >
                                    <stop
                                      offset="5%"
                                      stopColor="#10b981"
                                      stopOpacity={0.2}
                                    />
                                    <stop
                                      offset="95%"
                                      stopColor="#10b981"
                                      stopOpacity={0}
                                    />
                                  </linearGradient>
                                </defs>
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  stroke="#27272a"
                                  vertical={false}
                                />
                                <XAxis
                                  dataKey="name"
                                  stroke="#52525b"
                                  fontSize={10}
                                  fontStyle="bold"
                                />
                                <YAxis
                                  stroke="#52525b"
                                  fontSize={10}
                                  fontStyle="bold"
                                />
                                <RechartsTooltip
                                  contentStyle={{
                                    backgroundColor: "#09090b",
                                    borderColor: "#27272a",
                                    borderRadius: "12px",
                                  }}
                                />
                                <Area
                                  type="monotone"
                                  dataKey="real"
                                  stroke="#10b981"
                                  strokeWidth={3}
                                  fillOpacity={1}
                                  fill="url(#oeeGrad)"
                                  name="OEE Real"
                                />
                                <Line
                                  type="monotone"
                                  dataKey="meta"
                                  stroke="#3b82f6"
                                  strokeWidth={2}
                                  strokeDasharray="3 3"
                                  name="Meta Global"
                                />
                              </ReAreaChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Machine downtime allocation cake pie */}
                    <div className="lg:col-span-4">
                      <Card className="bg-white dark:bg-zinc-900 border-transparent shadow-2xl h-full flex flex-col justify-between">
                        <CardHeader>
                          <CardTitle className="text-sm font-black uppercase text-zinc-300">
                            Distribuição Operacional
                          </CardTitle>
                          <CardDescription className="text-xs text-zinc-500">
                            Mapeamento de tempos mortos de recursos industriais.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col justify-between items-center pb-6">
                          <div className="h-56 w-full relative flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                              <RePieChart>
                                <Pie
                                  data={pgvPieData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={60}
                                  outerRadius={80}
                                  paddingAngle={4}
                                  dataKey="val"
                                >
                                  {pgvPieData.map((entry, index) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      fill={entry.color}
                                    />
                                  ))}
                                </Pie>
                              </RePieChart>
                            </ResponsiveContainer>
                            <div className="absolute flex flex-col items-center">
                              <span className="text-2xl font-black text-white italic">
                                80%
                              </span>
                              <span className="text-[9px] font-black tracking-wider text-zinc-500 uppercase">
                                NOMINAL
                              </span>
                            </div>
                          </div>

                          <div className="w-full space-y-2 text-[10px] font-sans">
                            {pgvPieData.map((d, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-center text-zinc-400"
                              >
                                <div className="flex items-center gap-1.5">
                                  <div
                                    className="w-2.5 h-2.5 rounded-sm"
                                    style={{ backgroundColor: d.color }}
                                  />
                                  <span className="font-semibold">
                                    {d.name}
                                  </span>
                                </div>
                                <span className="font-black text-white font-mono">
                                  {d.val}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
