import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '@/src/lib/ThemeContext';
import { HeatmapProduction } from './HeatmapProduction';
import {
  ClipboardList,
  Flame,
  Cpu,
  Printer,
  Scissors,
  Users,
  User,
  Truck,
  HardHat,
  Package,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Filter,
  Check,
  X,
  Edit2,
  Trash2,
  Calendar,
  Layers,
  Wrench,
  Download,
  LayoutGrid,
  MoreVertical,
  Sliders,
  Settings,
  Activity,
  Play,
  Pause,
  AlertTriangle,
  Clock,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle,
  HelpCircle,
  Info,
  CalendarDays,
  Tag,
  List,
  Columns
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

// --- TYPES ---
interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  material: string;
  width: string;
  height: string;
  structure: string;
  finish: string;
  installationType: string;
  applicationPlace: string;
  lighting: boolean;
  designer: string;
  designerProjetista: string;
  productionResponsavel: string;
  assembler: string;
  technicalStatus: string;
  observations: string;
}

interface OSFile {
  id: string;
  type: 'Drive' | 'PDF' | 'Mockup' | 'Vetor' | 'Outro';
  name: string;
  url: string;
}

interface PcpCard {
  id: string; // Left code e.g. "631"
  subId: string; // Middle subcode e.g. "912"
  client: string; // Client name
  details: string; // Detail description tag
  date: string; // Target date
  deliveryType: 'Instalado' | 'Cliente Retira';
  status: 'Aguardando' | 'Em produção' | 'Finalizado' | 'Restrição';
  laneId: 'layout' | 'laser' | 'router' | 'impressao' | 'plotter';
  priority: 'low' | 'medium' | 'high' | 'critical';
  notes?: string;
  
  // Novos campos dos anexos
  dificuldade?: number; // 1 a 5
  prioridadeForm?: number; // 1 a 5
  unidadeLoja?: string;
  responsavelComercial?: string;
  designerResponsavel?: string;
  valor?: number;
  linkPasta?: string;
  urgente?: boolean;
  briefing?: string;
  produtos?: Product[];
  arquivos?: OSFile[];
}

// --- INITIAL STATE DATA MATCHING ATTACHMENT ---
const INITIAL_PCP_CARDS: PcpCard[] = [
  // Lane 1: Layout Produção L.P
  { 
    id: '631', 
    subId: '912', 
    client: 'ARQTEC COMÉRCIO E SERV...', 
    details: 'Arqtec | Pr...', 
    date: '20/06/2026', 
    deliveryType: 'Instalado', 
    status: 'Em produção', 
    laneId: 'layout', 
    priority: 'medium',
    dificuldade: 3,
    prioridadeForm: 3,
    unidadeLoja: 'Unidade Centro',
    responsavelComercial: 'Adams Leandro Alves Pereira',
    designerResponsavel: 'Adams Leandro Alves Pereira',
    valor: 25000,
    linkPasta: 'https://drive.google.com/drive/folders/1abc912xyz',
    urgente: true,
    briefing: 'Fachada em ACM preta com LED interno e letras em relevo para a loja Arqtec.',
    produtos: [
      {
        id: '1',
        name: 'Novo produto',
        category: 'Letra Caixa, ACM, Totem...',
        quantity: 1,
        material: 'ACM 4mm',
        width: '300',
        height: '150',
        structure: 'Aço Reforçado',
        finish: 'Pintura eletrostática',
        installationType: 'Chumbado',
        applicationPlace: 'Fachada',
        lighting: true,
        designer: 'Adams Leandro Alves Pereira',
        designerProjetista: 'Carlos L.',
        productionResponsavel: 'Julia R.',
        assembler: 'Ricardo M.',
        technicalStatus: 'Em andamento',
        observations: 'Atenção ao alinhamento central.'
      },
      {
        id: '2',
        name: 'Placa interna backlight',
        category: 'Letra Caixa',
        quantity: 2,
        material: 'Acrílico + LED',
        width: '120',
        height: '60',
        structure: 'Perfis de alumínio',
        finish: 'Polimento especial',
        installationType: 'Suspenso',
        applicationPlace: 'Showroom',
        lighting: true,
        designer: 'Adams Leandro Alves Pereira',
        designerProjetista: 'Felipe S.',
        productionResponsavel: 'Maria T.',
        assembler: 'Carlos L.',
        technicalStatus: 'Pendente',
        observations: 'Fiação embutida traseira.'
      }
    ],
    arquivos: [
      { id: '1', type: 'Drive', name: 'Projeto_Aprovado_Final.dwg', url: 'https://drive.google.com/drive/some-folder' },
      { id: '2', type: 'PDF', name: 'memorial_descritivo.pdf', url: 'https://drive.google.com/drive/some-pdf.pdf' }
    ]
  },
  { id: '424', subId: '446', client: 'MULTI AR', details: 'Placa em Ac...', date: '01/02/2026', deliveryType: 'Cliente Retira', status: 'Em produção', laneId: 'layout', priority: 'low', dificuldade: 1, prioridadeForm: 1, unidadeLoja: 'Filial 02' },
  { id: '460', subId: '282', client: 'Dos Anjos Comunicação ...', details: 'Corte CNC', date: '01/02/2026', deliveryType: 'Cliente Retira', status: 'Em produção', laneId: 'layout', priority: 'medium', dificuldade: 2, prioridadeForm: 2 },
  { id: '488', subId: '476', client: 'ALTA VISTA INVESTIMENT...', details: 'Alta vista', date: '14/02/2026', deliveryType: 'Instalado', status: 'Em produção', laneId: 'layout', priority: 'high', dificuldade: 4, prioridadeForm: 4, urgente: true },
  { id: '502', subId: '564', client: 'BLACK RIVER CAFE LTDA', details: 'Black River', date: '10/03/2026', deliveryType: 'Cliente Retira', status: 'Em produção', laneId: 'layout', priority: 'low', dificuldade: 1, prioridadeForm: 2 },

  // Lane 2: Laser - CNC
  { id: '623', subId: '778', client: 'Lindt Vitoria', details: 'LINDT | Vit...', date: '08/06/2026', deliveryType: 'Cliente Retira', status: 'Em produção', laneId: 'laser', priority: 'high', dificuldade: 4, prioridadeForm: 4 },
  { id: '490', subId: '432', client: 'Lindt Manauara Shopping', details: 'Lindt- Mana...', date: '27/02/2026', deliveryType: 'Instalado', status: 'Em produção', laneId: 'laser', priority: 'high', dificuldade: 3, prioridadeForm: 5 },
  { id: '529', subId: '563', client: 'Conecttabr', details: 'Conecttabr', date: '31/03/2026', deliveryType: 'Instalado', status: 'Em produção', laneId: 'laser', priority: 'medium', dificuldade: 2, prioridadeForm: 3 },
  { id: '548', subId: '691', client: 'Lindt Plaza Campos Gerais', details: 'Lindt Plaza...', date: '17/04/2026', deliveryType: 'Cliente Retira', status: 'Em produção', laneId: 'laser', priority: 'medium', dificuldade: 3, prioridadeForm: 3 },

  // Lane 3: Router - CNC
  { id: '415', subId: '436', client: 'NEW BODY', details: 'Corte em Ro...', date: '19/01/2026', deliveryType: 'Cliente Retira', status: 'Em produção', laneId: 'router', priority: 'medium', dificuldade: 3, prioridadeForm: 3 },
  { id: '416', subId: '437', client: 'AFJ PROJETOS', details: 'Corte em Ro...', date: '03/02/2026', deliveryType: 'Cliente Retira', status: 'Em produção', laneId: 'router', priority: 'low', dificuldade: 2, prioridadeForm: 1 },

  // Lane 4: Impressão Digital
  { id: '305', subId: '337', client: 'KOP SP ALTO DE PINHEIROS', details: 'KOP Alto de...', date: '06/01/2026', deliveryType: 'Instalado', status: 'Em produção', laneId: 'impressao', priority: 'high', dificuldade: 4, prioridadeForm: 4 },
  { id: '493', subId: '528', client: 'JFC ENGENHARIA - Mei M...', details: 'Mei Mei | ...', date: '26/02/2026', deliveryType: 'Instalado', status: 'Em produção', laneId: 'impressao', priority: 'medium', dificuldade: 3, prioridadeForm: 2 },
  { id: '499', subId: '411', client: 'KOP SP Ipiranga Bom Pa...', details: 'KOP SP Ipir...', date: '13/02/2026', deliveryType: 'Instalado', status: 'Em produção', laneId: 'impressao', priority: 'low', dificuldade: 2, prioridadeForm: 2 },
  { id: '501', subId: '315', client: 'KOP JK IGUATEMI', details: 'KOP JK Igua...', date: '06/03/2026', deliveryType: 'Instalado', status: 'Em produção', laneId: 'impressao', priority: 'high', dificuldade: 5, prioridadeForm: 5, urgente: true },
  { id: '504', subId: '593', client: 'BC JARDIM GOIAS', details: 'BC Jardim', date: '15/04/2026', deliveryType: 'Instalado', status: 'Em produção', laneId: 'impressao', priority: 'medium', dificuldade: 3, prioridadeForm: 3 },
];

const LANES = [
  { id: 'layout', label: 'Layout Produção L.P', icon: ClipboardList, colorClass: 'bg-zinc-100 hover:bg-zinc-200 border-transparent text-zinc-800 dark:bg-zinc-900/60 dark:border-transparent dark:text-zinc-100' },
  { id: 'laser', label: 'Laser - CNC', icon: Flame, colorClass: 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-800 dark:bg-amber-950/20 dark:border-amber-900 dark:text-amber-300' },
  { id: 'router', label: 'Router - CNC', icon: Cpu, colorClass: 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-800 dark:bg-blue-950/20 dark:border-blue-900 dark:text-blue-300' },
  { id: 'impressao', label: 'Impressão Digital', icon: Printer, colorClass: 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-800 dark:bg-purple-950/20 dark:border-purple-900 dark:text-purple-300' },
  { id: 'plotter', label: 'Plotter de Recorte', icon: Scissors, colorClass: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-800 dark:bg-indigo-950/20 dark:border-indigo-900 dark:text-indigo-300' },
] as const;

// Resources & scheduling mock data
const RESOURCE_MACHINES = [
  { id: 'M-1', name: 'Router CNC 01', type: 'Cortadora / Fresnel', operator: 'Felipe S.', status: 'operating', load: 85, oee: 89, activeJob: '631 | ARQTEC' },
  { id: 'M-2', name: 'Laser Fiber 01', type: 'Corte de Chapas', operator: 'Carlos L.', status: 'maintenance', load: 0, oee: 34, activeJob: 'Manutenção de Sensor' },
  { id: 'M-3', name: 'Impressora UV-Gel', type: 'Plotter UV Premium', operator: 'Julia R.', status: 'operating', load: 95, oee: 92, activeJob: '305 | KOP SP' },
  { id: 'M-4', name: 'Dobradora Hidráulica', type: 'Modelador Inox', operator: 'Ricardo M.', status: 'setup', load: 20, oee: 78, activeJob: 'Setup Molde 12mm' },
  { id: 'M-5', name: 'Serralheria Industrial_A', type: 'Solda e Montagem', operator: 'Equipe A', status: 'operating', load: 65, oee: 85, activeJob: 'Estrutura Metálica' },
  { id: 'M-6', name: 'Plotter de Recorte 01', type: 'Vinil Faca', operator: 'Maria T.', status: 'idle', load: 0, oee: 94, activeJob: 'Nenhum' },
];

const MACHINE_PERFORMANCE_HOURS = [
  { hour: '08h', Router: 82, Laser: 90, Impressora: 95 },
  { hour: '10h', Router: 78, Laser: 90, Impressora: 98 },
  { hour: '12h', Router: 45, Laser: 30, Impressora: 92 },
  { hour: '14h', Router: 88, Laser: 94, Impressora: 97 },
  { hour: '16h', Router: 92, Laser: 99, Impressora: 99 },
  { hour: '18h', Router: 85, Laser: 95, Impressora: 94 },
];

export function Production({ initialTab }: { initialTab?: string }) {
  const { theme } = useTheme();
  const isLight = theme === 'ash-light';

  // State Management
  const [activeMainTab, setActiveMainTab] = useState<'pcp' | 'recursos' | 'consulta'>(() => {
    if (initialTab === 'pcp-main' || initialTab === 'pcp-os') return 'pcp';
    if (initialTab === 'producao' || initialTab?.startsWith('prod-')) return 'recursos';
    if (initialTab === 'qualidade' || initialTab === 'expedicao') return 'consulta';
    return 'pcp';
  });

  React.useEffect(() => {
    if (!initialTab) return;
    if (initialTab === 'pcp' || initialTab === 'pcp-main') {
      setActiveMainTab('pcp');
    } else if (initialTab === 'producao' || initialTab.startsWith('prod-')) {
      setActiveMainTab('recursos');
    } else if (initialTab === 'qualidade' || initialTab === 'expedicao' || initialTab.startsWith('qual-')) {
      setActiveMainTab('consulta');
    }
  }, [initialTab]);
  const [cards, setCards] = useState<PcpCard[]>(() => INITIAL_PCP_CARDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('30 de Maio de 2026');
  const [activeDateIndex, setActiveDateIndex] = useState(2);
  const [selectedCard, setSelectedCard] = useState<PcpCard | null>(null);
  const [activeDragOverLane, setActiveDragOverLane] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'kanban' | 'list' | 'grid'>('kanban');
  const [modalTab, setModalTab] = useState<'geral' | 'produtos' | 'arquivos' | 'historico' | 'performance' | 'notas'>('geral');
  const [activeProdIndex, setActiveProdIndex] = useState(0);
  const [newFileType, setNewFileType] = useState<'Drive' | 'PDF' | 'Mockup' | 'Vetor' | 'Outro'>('Drive');
  const [newFileName, setNewFileName] = useState('');
  const [newFileUrl, setNewFileUrl] = useState('');

  // Pagination Days
  const datesList = [
    '28 de Maio de 2026',
    '29 de Maio de 2026',
    '30 de Maio de 2026',
    '31 de Maio de 2026',
    '01 de Junho de 2026',
  ];

  const handleDateChange = (direction: 'prev' | 'next') => {
    let nextIndex = activeDateIndex;
    if (direction === 'prev') {
      nextIndex = Math.max(0, activeDateIndex - 1);
    } else {
      nextIndex = Math.min(datesList.length - 1, activeDateIndex + 1);
    }
    setActiveDateIndex(nextIndex);
    setSelectedDate(datesList[nextIndex]);
    showToast(`Visualizando planejamento dia: ${datesList[nextIndex]}`);
  };

  // New Card Form State
  const [newCard, setNewCard] = useState<Omit<PcpCard, 'status'>>({
    id: '',
    subId: '',
    client: '',
    details: '',
    date: '30/05/2026',
    deliveryType: 'Cliente Retira',
    laneId: 'layout',
    priority: 'medium',
    notes: '',
  });

  // Query Filter State for "Consulta" Tab
  const [queryFilters, setQueryFilters] = useState({
    client: '',
    code: '',
    stage: 'all',
    delivery: 'all',
    status: 'all',
  });

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter cards in real-time
  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      const matchSearch = 
        card.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.subId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.details.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSearch;
    });
  }, [cards, searchTerm]);

  // Consulta/Report Logs filtered
  const queryResultCards = useMemo(() => {
    return cards.filter(card => {
      const matchClient = !queryFilters.client || card.client.toLowerCase().includes(queryFilters.client.toLowerCase());
      const matchCode = !queryFilters.code || card.id.includes(queryFilters.code) || card.subId.includes(queryFilters.code);
      const matchStage = queryFilters.stage === 'all' || card.laneId === queryFilters.stage;
      const matchDelivery = queryFilters.delivery === 'all' || card.deliveryType === queryFilters.delivery;
      const matchStatus = queryFilters.status === 'all' || card.status === queryFilters.status;

      return matchClient && matchCode && matchStage && matchDelivery && matchStatus;
    });
  }, [cards, queryFilters]);

  // Add card handler
  const handleAddCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCard.id || !newCard.client) {
      alert("Por favor preencha pelo menos o Código da OS e o Nome do Cliente!");
      return;
    }

    const cardToAdd: PcpCard = {
      ...newCard,
      status: 'Em produção',
    };

    setCards(prev => [...prev, cardToAdd]);
    setIsAddModalOpen(false);
    showToast(`OS ${cardToAdd.id} foi agendada com sucesso no PCP!`);
    
    // Reset Form
    setNewCard({
      id: '',
      subId: '',
      client: '',
      details: '',
      date: '30/05/2026',
      deliveryType: 'Cliente Retira',
      laneId: 'layout',
      priority: 'medium',
      notes: '',
    });
  };

  // Move card lane
  const updateCardLane = (cardId: string, targetLane: PcpCard['laneId']) => {
    setCards(prev => prev.map(c => c.id === cardId ? { ...c, laneId: targetLane } : c));
    showToast(`OS ${cardId} movida para ${LANES.find(l => l.id === targetLane)?.label}`);
    if (selectedCard && selectedCard.id === cardId) {
      setSelectedCard(prev => prev ? { ...prev, laneId: targetLane } : null);
    }
  };

  // Save Card Changes
  const handleSaveCardDetails = (updated: PcpCard) => {
    setCards(prev => prev.map(c => c.id === updated.id ? updated : c));
    setSelectedCard(null);
    showToast(`Log de Alteração gravado! OS ${updated.id} atualizada.`);
  };

  // Delete card handler
  const handleDeleteCard = (cardId: string) => {
    if (confirm(`Deseja realmente remover a OS de código ${cardId} do planejamento?`)) {
      setCards(prev => prev.filter(c => c.id !== cardId));
      setSelectedCard(null);
      showToast(`Ordem ${cardId} excluída com sucesso.`);
    }
  };

  // Export report list simulator
  const handleExportCSV = () => {
    showToast("Gerando arquivo Excel da Produção...");
    setTimeout(() => {
      alert("PCP Excel KORTECK exportado com sucesso! Baixando: Korteck_PCP_Fluxo_2026.csv");
    }, 1200);
  };

  return (
    <div className={cn(
      "p-4 md:p-8 space-y-6 max-w-[1700px] mx-auto pb-24 font-sans select-none animate-in fade-in duration-500",
      "text-zinc-900 dark:text-zinc-100"
    )}>
      {/* Toast Alert Indicator */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed top-20 right-8 z-50 bg-purple-600 text-white px-5 py-3.5 rounded-2xl shadow-[0_10px_30px_rgba(124,58,237,0.3)] flex items-center gap-3 text-xs font-bold border border-purple-500"
          >
            <CheckCircle size={16} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP HEADER MENU BAR matching PCP/Recursos/Consulta tabs style in image */}
      <div className={cn(
        "flex flex-col md:flex-row items-center justify-between border-b pb-4 gap-4",
        isLight ? "border-transparent" : "border-transparent"
      )}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-purple-600/10 dark:bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
            <ClipboardList size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black tracking-widest text-purple-600 uppercase">KORTECK PLANEJAMENTO OPERACIONAL</span>
              <Badge variant="outline" className="text-[8px] uppercase tracking-normal border-purple-400 bg-purple-500/5 text-purple-700 dark:text-purple-300">Modulo Ativo</Badge>
            </div>
            <h1 className="text-xl font-bold tracking-tight uppercase italic text-zinc-950 dark:text-white leading-none mt-1">
              Produção <span className="text-purple-600">:: PCP 2026</span>
            </h1>
          </div>
        </div>

        {/* Dynamic Nav Tabs */}
        <div className="flex items-center gap-2 bg-zinc-100/80 dark:bg-zinc-900/60 p-1.5 rounded-2xl border-none dark:border-transparent shrink-0">
          <button
            onClick={() => setActiveMainTab('pcp')}
            className={cn(
              "px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2",
              activeMainTab === 'pcp'
                ? "bg-purple-600 text-white shadow-[0_4px_12px_rgba(124,58,237,0.25)] border border-purple-500/20"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            )}
          >
            <Layers size={14} />
            PCP
          </button>
          <button
            onClick={() => setActiveMainTab('recursos')}
            className={cn(
              "px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2",
              activeMainTab === 'recursos'
                ? "bg-purple-600 text-white shadow-[0_4px_12px_rgba(124,58,237,0.25)] border border-purple-500/20"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            )}
          >
            <Wrench size={14} />
            Recursos
          </button>
          <button
            onClick={() => setActiveMainTab('consulta')}
            className={cn(
              "px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2",
              activeMainTab === 'consulta'
                ? "bg-purple-600 text-white shadow-[0_4px_12px_rgba(124,58,237,0.25)] border border-purple-500/20"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            )}
          >
            <Sliders size={14} />
            Consulta
          </button>
        </div>
      </div>

      {/* MAIN PCP MODULE TAB CONTENT */}
      {activeMainTab === 'pcp' && (
        <div className="space-y-6">
          
          {/* MOCKUP DATE SELECTOR & VIEW CHANGER ROW */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left side: Date Select & Day Presets */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative">
                <Button variant="outline" className="h-10 pl-3.5 pr-10 hover:bg-zinc-100 dark:hover:bg-zinc-900 border-transparent dark:border-transparent rounded-xl text-xs font-black text-zinc-800 dark:text-zinc-200">
                  <CalendarDays size={14} className="mr-2 text-purple-600 shrink-0" />
                  {selectedDate}
                </Button>
                <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400" />
              </div>

              {/* Day Presets mapping */}
              <div className="hidden lg:flex items-center gap-1.5 ml-2 bg-zinc-100/50 dark:bg-zinc-900/30 p-1 rounded-xl">
                {datesList.map((dt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedDate(dt);
                      setActiveDateIndex(i);
                      showToast(`Dia selecionado: ${dt}`);
                    }}
                    className={cn(
                      "px-3 py-1.5 text-[10px] font-black uppercase tracking-tight rounded-lg transition-all",
                      selectedDate === dt
                        ? "bg-white dark:bg-zinc-800 text-purple-700 dark:text-purple-300 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border-none dark:border-transparent"
                        : "text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    )}
                  >
                    {dt.split(' de ')[0]} {dt.split(' de ')[1].substring(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            {/* Right side: Three Layout view toggle buttons (List, Columns/Kanban, Grid) */}
            <div className="flex items-center gap-2 self-end md:self-auto shrink-0 bg-white dark:bg-zinc-950 p-1 rounded-xl border-none dark:border-transparent">
              <button
                onClick={() => {
                  setViewMode('list');
                  showToast("Visualização em Lista / Tabela ativada.");
                }}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  viewMode === 'list'
                    ? "bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200/20 shadow-xs"
                    : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                )}
                title="Visualização em Lista"
              >
                <List size={16} className="stroke-[2.5]" />
              </button>
              
              <button
                onClick={() => {
                  setViewMode('kanban');
                  showToast("Visualização em Kanban de Produção ativada.");
                }}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  viewMode === 'kanban'
                    ? "bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200/20 shadow-xs"
                    : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                )}
                title="Quadro Kanban"
              >
                <Columns size={16} className="stroke-[2.5]" />
              </button>

              <button
                onClick={() => {
                  setViewMode('grid');
                  showToast("Macro Grelha de Máquinas ativada.");
                }}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  viewMode === 'grid'
                    ? "bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200/20 shadow-xs"
                    : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                )}
                title="Exibição em Grid"
              >
                <LayoutGrid size={16} className="stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* SECOND ROW: SEARCH & NEW PLANNING ACTION BUTTON */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-zinc-50 border shadow-xs dark:bg-zinc-950/40 dark:border-transparent">
            <div className="relative flex-1 w-full max-w-md">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <Input
                type="text"
                placeholder="Filtrar por OS, cliente, etiqueta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-9 rounded-xl text-xs border-none focus:ring-purple-500 placeholder-zinc-400 dark:border-transparent bg-white dark:bg-zinc-900"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="h-10 px-4 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl border-y border-purple-500 flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Plus size={15} />
                Novo Planejamento
              </Button>
              {searchTerm && (
                <Button variant="ghost" onClick={() => setSearchTerm('')} className="h-10 text-[10px] font-black text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 px-3 uppercase tracking-widest">
                  Limpar
                </Button>
              )}
            </div>
          </div>

          {/* DYNAMIC METRIC PAGINATION BAR matching center bar from image */}
          <div className={cn(
            "p-4 rounded-xl flex flex-col xl:flex-row items-center justify-between border select-none transition-all duration-300",
            isLight ? "bg-white border-transparent shadow-[0_1px_5px_rgba(0,0,0,0.01)]" : "bg-zinc-900/80 border-transparent shadow-[0_2px_15px_rgba(0,0,0,0.2)]"
          )}>
            {/* Left section: Helmet on blueprint + Left Arrow */}
            <div className="flex items-center gap-4 w-full xl:w-auto justify-between xl:justify-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center border border-purple-500/20">
                  <HardHat size={20} className="stroke-[2.2]" />
                </div>
                <button
                  onClick={() => handleDateChange('prev')}
                  disabled={activeDateIndex === 0}
                  className="p-2 rounded-lg text-purple-600 hover:bg-purple-500/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                >
                  <ChevronLeft size={24} className="stroke-[3]" />
                </button>
              </div>

              {/* Counters strictly aligned like mockup with big purple counts */}
              <div className="flex items-center gap-6 xl:ml-6">
                {/* 58 counter */}
                <div className="flex items-center gap-1">
                  <div className="text-purple-600 dark:text-purple-400 flex flex-col items-center">
                    <span className="text-lg font-black leading-none font-sans">58</span>
                    <User size={16} className="text-purple-500 opacity-80 mt-1" />
                  </div>
                </div>

                {/* 6 counter */}
                <div className="flex items-center gap-1">
                  <div className="text-purple-600 dark:text-purple-400 flex flex-col items-center">
                    <span className="text-lg font-black leading-none font-sans">6</span>
                    <Truck size={16} className="text-purple-500 opacity-80 mt-1" />
                  </div>
                </div>

                {/* 108 counter */}
                <div className="flex items-center gap-1">
                  <div className="text-purple-600 dark:text-purple-400 flex flex-col items-center">
                    <span className="text-lg font-black leading-none font-sans">108</span>
                    <HardHat size={16} className="text-purple-500 opacity-80 mt-1" />
                  </div>
                </div>

                {/* Folder/Transfers icon with arrows to signify ongoing work */}
                <div className="flex flex-col items-center pt-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-600 border border-purple-500/20">
                    <Sliders size={13} className="stroke-[2.5]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Center-right: Title text precisely formatted */}
            <div className="text-center xl:text-right mt-3 xl:mt-0 w-full xl:w-auto flex-1 xl:flex-initial flex items-center justify-center xl:justify-end gap-3">
              <span className="text-sm md:text-base font-black uppercase tracking-tight text-zinc-900 dark:text-white mr-2">
                Planejamento Controle da Produção
              </span>
              <button
                onClick={() => handleDateChange('next')}
                disabled={activeDateIndex === datesList.length - 1}
                className="p-2 rounded-lg text-purple-600 hover:bg-purple-500/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer shrink-0"
              >
                <ChevronRight size={24} className="stroke-[3]" />
              </button>
            </div>
          </div>

          {/* VIEW: KANBAN BOARD */}
          {viewMode === 'kanban' && (
            <div className="scroll-x-auto select-none flex gap-4 pb-4 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-800 pr-1 select-none">
              {LANES.map((lane) => {
                const laneCards = filteredCards.filter(c => c.laneId === lane.id);
                const LaneIcon = lane.icon;

                return (
                  <div 
                    key={lane.id}
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDragEnter={() => {
                      setActiveDragOverLane(lane.id);
                    }}
                    onDragLeave={() => {
                      setActiveDragOverLane(null);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const cardId = e.dataTransfer.getData("cardId");
                      if (cardId) {
                        updateCardLane(cardId, lane.id);
                      }
                      setActiveDragOverLane(null);
                    }}
                    className={cn(
                      "w-80 shrink-0 flex flex-col h-[650px] rounded-3xl p-4 border transition-all duration-200",
                      activeDragOverLane === lane.id 
                        ? "bg-purple-950/20 border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.15)] scale-[1.01]"
                        : "bg-zinc-900 dark:bg-zinc-900/40 border-transparent dark:border-transparent"
                    )}
                  >
                    {/* Lane Header */}
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-transparent dark:border-transparent">
                      <div className="flex items-center gap-2">
                        <div className={cn("p-1.5 rounded-lg border shadow-3xs", lane.colorClass)}>
                          <LaneIcon size={14} className="stroke-[2.5]" />
                        </div>
                        <span className="text-[12px] font-black tracking-tight text-zinc-800 dark:text-zinc-200 uppercase">{lane.label}</span>
                      </div>
                      <Badge variant="secondary" className="px-2 h-5 text-[10px] font-bold bg-zinc-200/70 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                        {laneCards.length}
                      </Badge>
                    </div>

                    {/* Lane Cards List */}
                    <div className="flex-1 space-y-3 overflow-y-auto scrollbar-none pr-0.5 select-none pb-4">
                      <AnimatePresence mode="popLayout">
                        {laneCards.length === 0 ? (
                           <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            exit={{ opacity: 0 }}
                            className="h-32 rounded-2xl border-2 border-dashed border-transparent dark:border-transparent flex flex-col items-center justify-center p-4 text-center"
                          >
                            <Info size={18} className="text-zinc-400 mb-1" />
                            <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Nenhuma informação para exibir</span>
                          </motion.div>
                        ) : (
                          laneCards.map((card) => {
                            let startX = 0;
                            let startY = 0;
                            return (
                              <motion.div
                                layout
                                key={card.id}
                                draggable
                                onDragStart={(e) => {
                                  e.dataTransfer.setData("cardId", card.id);
                                  e.dataTransfer.effectAllowed = "move";
                                }}
                                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                whileHover={{ scale: 1.015, y: -1 }}
                                whileDrag={{ scale: 1.04, rotate: 1.5, opacity: 0.8 }}
                                transition={{ duration: 0.2 }}
                                onMouseDown={(e) => {
                                  startX = e.clientX;
                                  startY = e.clientY;
                                }}
                                onClick={(e) => {
                                  const diffX = Math.abs(e.clientX - startX);
                                  const diffY = Math.abs(e.clientY - startY);
                                  // Se o arraste foi mínimo (menos de 6 pixels), considera-se clique intencional para abrir o card
                                  if (diffX < 6 && diffY < 6) {
                                    setSelectedCard(card);
                                  }
                                }}
                                onDoubleClick={() => setSelectedCard(card)}
                                className="bg-white hover:bg-zinc-50 border-none dark:border-transparent dark:bg-zinc-900 dark:hover:bg-zinc-950 rounded-lg p-4 shadow-[0_1px_3px_rgba(0,0,0,0.015)] transition-shadow cursor-grab active:cursor-grabbing select-none space-y-3 relative group"
                                title="Clique ou dê duplo clique para abrir os dísticos do cartão"
                              >
                                {/* Card Header matching screen style precisely: `631   912 | CLIENT NAME` */}
                                <div className="flex items-center text-[12px] font-bold tracking-tight text-zinc-900 dark:text-zinc-100 justify-between gap-1">
                                  <div className="flex items-center min-w-0 flex-1">
                                    <span className="font-extrabold text-[14px] text-zinc-900 dark:text-white mr-2 shrink-0">{card.id}</span>
                                    <span className="text-zinc-400 dark:text-zinc-600 font-normal mr-1.5 shrink-0">{card.subId}</span>
                                    <span className="text-zinc-300 dark:text-zinc-800 mr-2 shrink-0">|</span>
                                    <span className="truncate font-black uppercase text-zinc-500 dark:text-zinc-400 text-[11px] text-left">
                                      {card.client}
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedCard(card);
                                    }}
                                    className="p-1 rounded-md text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors shrink-0 cursor-pointer"
                                    title="Visualizar Detalhes"
                                  >
                                    <Edit2 size={12} className="stroke-[2.5]" />
                                  </button>
                                </div>

                                {/* Card Body Row 2: Tag icon + Details, and Target Date */}
                                <div className="flex items-center justify-between text-[11px]">
                                  <div className="flex items-center gap-1.5 min-w-0 text-zinc-600 dark:text-zinc-400">
                                    <Tag size={13} className="text-zinc-400 dark:text-zinc-600 shrink-0" />
                                    <span className="truncate font-normal uppercase text-[10px]">
                                      {card.details}
                                    </span>
                                  </div>
                                  <span className="text-zinc-400 dark:text-zinc-500 font-semibold text-[11px] font-sans pr-1 shrink-0">
                                    {card.date}
                                  </span>
                                </div>

                                {/* Card Body Row 3: Purple User silhouette icon + Delivery type, and Status */}
                                <div className="flex items-center justify-between pt-1 text-[11px] select-none">
                                  <div className="flex items-center gap-1.5 font-semibold text-zinc-500 dark:text-zinc-400">
                                    <div className="w-5 h-5 rounded-full bg-purple-500/10 dark:bg-purple-400/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                      <User size={11} className="stroke-[2.5]" />
                                    </div>
                                    <span className="text-zinc-600 dark:text-zinc-400 font-medium text-[10px]">{card.deliveryType}</span>
                                  </div>

                                  <div className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded-md antialiased pr-1">
                                    {card.status}
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* VIEW: COMPACT INDUSTRIAL TABLE LIST */}
          {viewMode === 'list' && (
            <div className="bg-white dark:zinc-900 border-none dark:border-transparent rounded-2xl overflow-hidden transition-all duration-200 shadow-[0_1px_4px_rgba(0,0,0,0.015)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-transparent dark:border-transparent">
                      <th className="p-4 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest pl-6">OS / SubID</th>
                      <th className="p-4 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Cliente</th>
                      <th className="p-4 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Serviço / Detalhes</th>
                      <th className="p-4 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Data Limite</th>
                      <th className="p-4 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Entrega</th>
                      <th className="p-4 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Etapa de Produção</th>
                      <th className="p-4 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest text-right pr-6">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCards.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-zinc-400 uppercase text-xs font-semibold">
                          Nenhum planejamento encontrado para os filtros selecionados
                        </td>
                      </tr>
                    ) : (
                      filteredCards.map((card) => {
                        const lane = LANES.find(l => l.id === card.laneId);
                        return (
                          <tr 
                            key={card.id} 
                            onClick={() => setSelectedCard(card)}
                            className="border-b border-transparent dark:border-transparent hover:bg-zinc-50/50 dark:hover:bg-zinc-950/40 transition-colors cursor-pointer group"
                          >
                            <td className="p-4 pl-6">
                              <div className="flex items-center gap-1.5">
                                <span className="font-extrabold text-[13px] text-zinc-900 dark:text-white">{card.id}</span>
                                <span className="text-zinc-300 dark:text-zinc-700 font-normal">|</span>
                                <span className="text-zinc-400 dark:text-zinc-500 text-xs font-mono">{card.subId}</span>
                              </div>
                            </td>
                            <td className="p-4 font-bold text-zinc-800 dark:text-zinc-300 uppercase text-[11px] max-w-[150px] truncate">
                              {card.client}
                            </td>
                            <td className="p-4 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                              {card.details}
                            </td>
                            <td className="p-4 text-xs font-mono font-bold text-zinc-600 dark:text-zinc-400">
                              {card.date}
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                                <User size={12} className="text-purple-500" />
                                <span>{card.deliveryType}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              {lane && (
                                <Badge className={cn("text-[10px] font-semibold uppercase py-0.5", lane.colorClass)}>
                                  {lane.label}
                                </Badge>
                              )}
                            </td>
                            <td className="p-4 text-right pr-6" onClick={(e) => e.stopPropagation()}>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setSelectedCard(card)} 
                                className="h-8 w-8 p-0 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-400 hover:text-purple-600 transition-colors"
                              >
                                <Edit2 size={13} />
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW: BENTO MACHINE GRID */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
              {LANES.map((lane) => {
                const laneCards = filteredCards.filter(c => c.laneId === lane.id);
                const LaneIcon = lane.icon;

                return (
                  <Card key={lane.id} className="border-none shadow-sm bg-white dark:bg-zinc-900 overflow-hidden85 dark:border-transparent overflow-hidden shadow-xs hover:shadow-sm transition-all rounded-2xl">
                    <CardHeader className="pb-3 border-b border-transparent dark:border-transparent flex flex-row items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={cn("p-1.5 rounded-lg border", lane.colorClass)}>
                          <LaneIcon size={14} className="stroke-[2.5]" />
                        </div>
                        <CardTitle className="text-xs font-extrabold uppercase tracking-wider">{lane.label}</CardTitle>
                      </div>
                      <Badge variant="outline" className="font-bold bg-zinc-50 dark:bg-zinc-900 text-zinc-500">
                        {laneCards.length} ordens
                      </Badge>
                    </CardHeader>
                    <CardContent className="pt-4">
                      {laneCards.length === 0 ? (
                        <div className="h-28 flex flex-col items-center justify-center border-2 border-dashed border-transparent dark:border-transparent rounded-xl text-center p-4">
                          <span className="text-[10px] font-black uppercase text-zinc-400">Sem ordens ativas</span>
                        </div>
                      ) : (
                        <div className="space-y-2 max-h-[280px] overflow-y-auto scrollbar-none pr-0.5">
                          {laneCards.map((card) => (
                            <div 
                              key={card.id}
                              onClick={() => setSelectedCard(card)}
                              className="p-2.5 rounded-xl border-none dark:border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900/50 cursor-pointer flex items-center justify-between gap-3 text-xs"
                            >
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 font-black mb-0.5 flex-wrap">
                                  <span className="text-zinc-900 dark:text-white">{card.id}</span>
                                  <span className="text-zinc-300 shrink-0">·</span>
                                  <span className="truncate uppercase text-[10px] text-zinc-500">{card.client}</span>
                                </div>
                                <span className="text-[10px] text-zinc-400 block truncate">{card.details}</span>
                              </div>
                              <span className="text-[10px] font-bold font-mono text-zinc-400 shrink-0">{card.date}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* RESOURCES SCHEDULE TAB CONTENT */}
      {activeMainTab === 'recursos' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* MAPA DE CALOR DA PRODUÇÃO EM TEMPO REAL */}
          <HeatmapProduction cards={cards} isLight={isLight} />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* CNC Machine list & active jobs */}
            <div className="xl:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-wider text-zinc-500">Capacidade Operacional das Máquinas</h3>
                <Badge variant="outline" className="text-xs bg-emerald-500/5 text-emerald-500 border-emerald-500/20">ESTABILIDADE DE ENTE KORTECK</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {RESOURCE_MACHINES.map((machine) => {
                  const isOperating = machine.status === 'operating';
                  const isMaintenance = machine.status === 'maintenance';
                  const isSetup = machine.status === 'setup';

                  return (
                    <Card key={machine.id} className="bg-white dark:bg-zinc-900 border-none shadow-sm overflow-hidden relative">
                      <div className={cn(
                        "absolute top-0 left-0 w-full h-1",
                        isOperating ? "bg-emerald-500" : isMaintenance ? "bg-rose-500" : isSetup ? "bg-amber-500" : "bg-zinc-400"
                      )} />
                      <CardContent className="pt-5 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[9px] font-mono text-zinc-400 block mb-0.5">ID: {machine.id}</span>
                            <h4 className="text-base font-extrabold uppercase italic">{machine.name}</h4>
                          </div>
                          <Badge 
                            className={cn(
                              "text-[9px] font-bold uppercase py-0.5",
                              isOperating ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400" :
                              isMaintenance ? "bg-rose-100 text-rose-800 dark:bg-rose-950/30 dark:text-rose-400" :
                              "bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400"
                            )}
                          >
                            {isOperating ? 'Operando' : isMaintenance ? 'Manutenção' : 'Setup'}
                          </Badge>
                        </div>

                        <div className="space-y-1.5 text-xs">
                          <div className="flex items-center justify-between text-zinc-500">
                            <span>Operador:</span>
                            <span className="font-bold text-zinc-800 dark:text-zinc-200">{machine.operator}</span>
                          </div>
                          <div className="flex items-center justify-between text-zinc-500">
                            <span>Job Ativo:</span>
                            <span className="font-bold text-zinc-800 dark:text-zinc-300 truncate max-w-[150px]">{machine.activeJob}</span>
                          </div>
                        </div>

                        <div className="space-y-1 pt-1">
                          <div className="flex items-center justify-between text-[10px] text-zinc-400 uppercase font-black">
                            <span>Carga de trabalho</span>
                            <span className={cn(
                              "font-mono font-black",
                              machine.load > 80 ? "text-amber-500" : "text-emerald-500"
                            )}>{machine.load}%</span>
                          </div>
                          <Progress value={machine.load} className="h-2 bg-zinc-100 dark:bg-zinc-800" />
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-transparent dark:border-transparent text-[11px] text-zinc-400">
                          <span>Eficiência CNC OEE:</span>
                          <span className="font-black text-purple-600 dark:text-purple-400 font-mono">{machine.oee}%</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Performance charts sidebar */}
            <div className="space-y-6">
              <Card className="bg-white dark:bg-zinc-900 border-none shadow-sm p-4 space-y-4">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-zinc-500 mb-1">Carga de Máquinas Global</h3>
                  <span className="text-xs text-zinc-400 block font-normal">Capacidade de processamento ativa de acordo com fuso estandarte</span>
                </div>

                <div className="h-64 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReBarChart data={RESOURCE_MACHINES.filter(m => m.load > 0)}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#888' }} />
                      <YAxis tick={{ fontSize: 10, fill: '#888' }} />
                      <RechartsTooltip />
                      <Bar dataKey="load" radius={[4, 4, 0, 0]}>
                        {RESOURCE_MACHINES.filter(m => m.load > 0).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#7c3aed' : '#a855f7'} />
                        ))}
                      </Bar>
                    </ReBarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="bg-white dark:bg-zinc-900 border-none shadow-sm p-4 space-y-4">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-zinc-500 mb-1">Carga Horária e Produção</h3>
                  <span className="text-xs text-zinc-400 block">Eficiência de corte de picos diários</span>
                </div>

                <div className="h-56 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MACHINE_PERFORMANCE_HOURS}>
                      <defs>
                        <linearGradient id="colorOee" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#888' }} />
                      <YAxis tick={{ fontSize: 10, fill: '#888' }} />
                      <RechartsTooltip />
                      <Area type="monotone" dataKey="Router" stroke="#7c3aed" fillOpacity={1} fill="url(#colorOee)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* CONSULTA/REPORT QUERY TAB CONTENT */}
      {activeMainTab === 'consulta' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Query filter dashboard block */}
          <Card className="bg-white dark:bg-zinc-900 border-none shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-black uppercase tracking-wider text-zinc-500">Mecanismo de Filtro e Busca Geral</CardTitle>
              <CardDescription className="text-xs">Consulte ordens ativas, históricas ou por fases operacionais no ERP</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3.5">
                {/* 1. Client Search */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">Cliente</label>
                  <Input 
                    placeholder="Nome do cliente..."
                    value={queryFilters.client}
                    onChange={(e) => setQueryFilters(prev => ({ ...prev, client: e.target.value }))}
                    className="h-10 text-xs rounded-xl"
                  />
                </div>

                {/* 2. ID / Sub ID Code search */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">Nº da OS / Planejamento</label>
                  <Input 
                    placeholder="Ex: 631"
                    value={queryFilters.code}
                    onChange={(e) => setQueryFilters(prev => ({ ...prev, code: e.target.value }))}
                    className="h-10 text-xs rounded-xl"
                  />
                </div>

                {/* 3. Stage dropdown select */}
                <div className="space-y-1 font-mono">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">Etapa Produtiva</label>
                  <select
                    value={queryFilters.stage}
                    onChange={(e) => setQueryFilters(prev => ({ ...prev, stage: e.target.value }))}
                    className="w-full h-10 border-none dark:border-transparent bg-white dark:bg-zinc-900 rounded-xl px-3 text-xs font-semibold focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="all">Todas as etapas</option>
                    {LANES.map(lane => (
                      <option key={lane.id} value={lane.id}>{lane.label}</option>
                    ))}
                  </select>
                </div>

                {/* 4. Delivery status dropdown select */}
                <div className="space-y-1 font-mono">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">Logística / Entrega</label>
                  <select
                    value={queryFilters.delivery}
                    onChange={(e) => setQueryFilters(prev => ({ ...prev, delivery: e.target.value }))}
                    className="w-full h-10 border-none dark:border-transparent bg-white dark:bg-zinc-900 rounded-xl px-3 text-xs font-semibold focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="all">Todos os tipos</option>
                    <option value="Instalado">Instalado</option>
                    <option value="Cliente Retira">Cliente Retira</option>
                  </select>
                </div>

                {/* 5. Production status dropdown select */}
                <div className="space-y-1 font-mono">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">Status Operacional</label>
                  <select
                    value={queryFilters.status}
                    onChange={(e) => setQueryFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full h-10 border-none dark:border-transparent bg-white dark:bg-zinc-900 rounded-xl px-3 text-xs font-semibold focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="all">Todos os status</option>
                    <option value="Em produção">Em produção</option>
                    <option value="Aguardando">Aguardando</option>
                    <option value="Restrição">Com Restrição</option>
                    <option value="Finalizado">Finalizado</option>
                  </select>
                </div>
              </div>

              {/* Advanced Controls & Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-transparent dark:border-transparent">
                <span className="text-[11px] font-bold text-zinc-400 uppercase">
                  Filtro apurado: <b className="text-purple-600 font-black">{queryResultCards.length} registros</b> encontrados.
                </span>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setQueryFilters({ client: '', code: '', stage: 'all', delivery: 'all', status: 'all' })}
                    variant="ghost"
                    className="h-10 text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:hover:text-zinc-200"
                  >
                    Limpar Filtros
                  </Button>
                  <Button
                    onClick={handleExportCSV}
                    className="h-10 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl border-y border-purple-500 flex items-center gap-2"
                  >
                    <FileSpreadsheet size={15} />
                    Exportar Relatório Excel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DENSE RESULT TABLE */}
          <Card className="bg-white dark:bg-zinc-900 border-none shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-zinc-50 dark:bg-zinc-900 border-none">
                    <TableRow className="border-b border-transparent dark:border-transparent">
                      <TableHead className="w-20 text-[10px] font-black uppercase tracking-widest text-zinc-400">OS ID</TableHead>
                      <TableHead className="w-20 text-[10px] font-black uppercase tracking-widest text-zinc-400">Sub ID</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Cliente / Razão Social</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Detalhamento Técnico</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Etapa de PCP</TableHead>
                      <TableHead className="w-32 text-[10px] font-black uppercase tracking-widest text-zinc-400">Previsão</TableHead>
                      <TableHead className="w-36 text-[10px] font-black uppercase tracking-widest text-zinc-400">Forma Logística</TableHead>
                      <TableHead className="w-32 text-[10px] font-black uppercase tracking-widest text-zinc-400">Estado</TableHead>
                      <TableHead className="w-16"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {queryResultCards.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="h-32 text-center text-xs text-zinc-500 uppercase tracking-widest font-bold">
                          Nenhuma ordem encontrada de acordo com os filtros especificados.
                        </TableCell>
                      </TableRow>
                    ) : (
                      queryResultCards.map((card) => {
                        const isInstalado = card.deliveryType === 'Instalado';
                        const currentLane = LANES.find(l => l.id === card.laneId);

                        return (
                          <TableRow key={card.id} className="border-b border-transparent dark:border-transparent hover:bg-zinc-50/50 dark:hover:bg-zinc-950/20 cursor-pointer">
                            <TableCell className="font-mono font-black text-xs text-purple-600 dark:text-purple-400">{card.id}</TableCell>
                            <TableCell className="font-mono text-zinc-500 font-bold text-xs">{card.subId}</TableCell>
                            <TableCell className="font-bold text-xs uppercase text-zinc-800 dark:text-zinc-200 truncate max-w-[200px]">{card.client}</TableCell>
                            <TableCell className="text-xs text-zinc-500 font-semibold">{card.details}</TableCell>
                            <TableCell>
                              <Badge variant="secondary" className="text-[9px] font-bold uppercase tracking-tight bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                                {currentLane?.label}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-mono font-semibold text-xs text-zinc-500">{card.date}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-300 font-semibold">
                                {isInstalado ? <Wrench size={12} className="text-purple-650" /> : <Truck size={12} className="text-amber-500" />}
                                {card.deliveryType}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-[10px] font-black uppercase text-purple-600 dark:text-purple-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 animate-pulse" />
                                {card.status}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedCard(card);
                                }}
                                className="h-8 w-8 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg text-zinc-400 hover:text-zinc-800"
                              >
                                <Edit2 size={13} />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* DETAILED CARD SLIDE-OVER MODAL / SIDEBAR */}
      <AnimatePresence>
        {selectedCard && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCard(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 pointer-events-auto"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className={cn(
                "fixed top-0 right-0 h-screen w-full lg:w-[920px] xl:w-[1060px] z-50 p-6 md:p-8 flex flex-col justify-between border-l shadow-[0_0_50px_rgba(0,0,0,0.4)] pointer-events-auto",
                isLight ? "bg-zinc-50 border-transparent text-zinc-900" : "bg-zinc-900 border-transparent text-white"
              )}
            >
              {/* Sidebar Header */}
              <div className="space-y-4 flex flex-col flex-1 overflow-hidden">
                <div className="flex items-center justify-between border-b pb-4 border-transparent dark:border-transparent">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-[#a855f7] uppercase tracking-widest font-mono">ID DETALHADO DA OS</span>
                    <Badge variant="outline" className="text-[10px] font-mono font-extrabold text-zinc-400 border-transparent dark:border-transparent">
                      {selectedCard.id} / {selectedCard.subId}
                    </Badge>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setSelectedCard(null)}
                    className="h-9 w-9 rounded-full text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  >
                    <X size={18} />
                  </Button>
                </div>

                {/* TAB SELECTOR */}
                <div className="flex items-center gap-1 border-b border-transparent dark:border-transparent overflow-x-auto scrollbar-none pb-2 shrink-0">
                  {[
                    { id: 'geral', label: 'Geral', icon: ClipboardList },
                    { id: 'produtos', label: `Produtos (${(selectedCard.produtos || []).length})`, icon: Package },
                    { id: 'arquivos', label: `Arquivos (${(selectedCard.arquivos || []).length})`, icon: FileSpreadsheet },
                    { id: 'historico', label: 'Histórico', icon: Clock },
                    { id: 'performance', label: 'Performance', icon: TrendingUp },
                    { id: 'notas', label: 'Notas', icon: List }
                  ].map(tab => {
                    const isActive = modalTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setModalTab(tab.id as any)}
                        className={cn(
                          "px-4 py-2 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 rounded-full transition-all shrink-0",
                          isActive 
                            ? "bg-purple-600 text-white dark:bg-purple-600/20 dark:text-[#c084fc]" 
                            : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900/40"
                        )}
                      >
                        <tab.icon size={12} />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* SCROLLABLE INNER FORMS */}
                <div className="flex-1 overflow-y-auto pr-1 scrollbar-none space-y-4">
                  {/* TAB: GERAL */}
                  {modalTab === 'geral' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-2">
                      {/* DIFICULDADE (Rating bar lit like mockup) */}
                      <div className="space-y-2 col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 inline-block"></span>
                          <span className="text-xs font-bold text-zinc-400 dark:text-zinc-300">Dificuldade</span>
                        </div>
                        <div className="grid grid-cols-5 gap-2 max-w-lg">
                          {[1, 2, 3, 4, 5].map((level) => {
                            const isSelected = level <= (selectedCard.dificuldade || 0);
                            return (
                              <button
                                key={level}
                                type="button"
                                onClick={() => setSelectedCard({ ...selectedCard, dificuldade: level })}
                                className={cn(
                                  "h-10 rounded-xl font-mono text-xs font-black border transition-all flex items-center justify-center",
                                  isSelected
                                    ? "bg-purple-500 text-white border-purple-500 font-extrabold shadow-[0_0_10px_rgba(168,85,247,0.2)]"
                                    : "bg-transparent border-transparent dark:border-transparent text-zinc-400 hover:border-purple-500"
                                )}
                              >
                                {level}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* PRIORIDADE RATING BAR */}
                      <div className="space-y-2 col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block"></span>
                          <span className="text-xs font-bold text-zinc-400 dark:text-zinc-300">Prioridade</span>
                        </div>
                        <div className="grid grid-cols-5 gap-2 max-w-lg">
                          {[1, 2, 3, 4, 5].map((level) => {
                            const isSelected = level <= (selectedCard.prioridadeForm || 0);
                            return (
                              <button
                                key={level}
                                type="button"
                                onClick={() => setSelectedCard({ ...selectedCard, prioridadeForm: level })}
                                className={cn(
                                  "h-10 rounded-xl font-mono text-xs font-black border transition-all flex items-center justify-center",
                                  isSelected
                                    ? "bg-zinc-900 text-white border-orange-500 font-extrabold shadow-[0_0_10px_rgba(249,115,22,0.2)]"
                                    : "bg-transparent border-transparent dark:border-transparent text-zinc-400 hover:border-orange-500"
                                )}
                              >
                                {level}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* CLIENTE & UNIDADE */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Cliente</label>
                        <Input 
                          value={selectedCard.client}
                          onChange={(e) => setSelectedCard({ ...selectedCard, client: e.target.value })}
                          className="h-10 text-xs font-bold font-sans uppercase border-transparent dark:border-transparent bg-white dark:bg-zinc-950"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-455 dark:text-zinc-500">Unidade/Loja</label>
                        <Input 
                          value={selectedCard.unidadeLoja || ''}
                          onChange={(e) => setSelectedCard({ ...selectedCard, unidadeLoja: e.target.value })}
                          className="h-10 text-xs font-bold border-transparent dark:border-transparent bg-white dark:bg-zinc-950"
                        />
                      </div>

                      {/* RESPONSAVEL COMERCIAL & DESIGNER */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Responsável Comercial</label>
                        <Input 
                          value={selectedCard.responsavelComercial || ''}
                          onChange={(e) => setSelectedCard({ ...selectedCard, responsavelComercial: e.target.value })}
                          className="h-10 text-xs font-bold border-transparent dark:border-transparent bg-white dark:bg-zinc-950"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Designer Responsável</label>
                        <select
                          value={selectedCard.designerResponsavel || ''}
                          onChange={(e) => setSelectedCard({ ...selectedCard, designerResponsavel: e.target.value })}
                          className="w-full h-10 border-none dark:border-transparent bg-white dark:bg-zinc-950 rounded-xl px-3 text-xs font-bold focus:ring-1 focus:ring-purple-500"
                        >
                          <option value="">—</option>
                          <option value="Adams Leandro Alves Pereira">Adams Leandro Alves Pereira</option>
                          <option value="Felipe S.">Felipe S.</option>
                          <option value="Carlos L.">Carlos L.</option>
                          <option value="Julia R.">Julia R.</option>
                        </select>
                      </div>

                      {/* PRAZO E VALOR */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Prazo (dd/mm/aaaa)</label>
                        <Input 
                          value={selectedCard.date}
                          onChange={(e) => setSelectedCard({ ...selectedCard, date: e.target.value })}
                          className="h-10 text-xs font-bold border-transparent dark:border-transparent bg-white dark:bg-zinc-950 font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-mono">Valor (R$)</label>
                        <Input 
                          type="number"
                          value={selectedCard.valor || 0}
                          onChange={(e) => setSelectedCard({ ...selectedCard, valor: Number(e.target.value) })}
                          className="h-10 text-xs font-bold border-transparent dark:border-transparent bg-white dark:bg-zinc-950 font-mono"
                        />
                      </div>

                      {/* pasta e urgente */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-mono">Link da Pasta</label>
                        <Input 
                          value={selectedCard.linkPasta || ''}
                          onChange={(e) => setSelectedCard({ ...selectedCard, linkPasta: e.target.value })}
                          className="h-10 text-xs font-bold border-transparent dark:border-transparent bg-white dark:bg-zinc-950 text-blue-500 dark:text-blue-400"
                          placeholder="https://drive.google.com/..."
                        />
                      </div>
                      <div className="space-y-1 flex flex-col justify-end">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">Urgente</label>
                        <div className="h-10 flex items-center gap-2 px-3 border-none dark:border-transparent rounded-xl bg-white dark:bg-zinc-950">
                          <input 
                            type="checkbox"
                            id="urgente_checkbox"
                            checked={selectedCard.urgente || false}
                            onChange={(e) => setSelectedCard({ ...selectedCard, urgente: e.target.checked })}
                            className="rounded border-transparent text-purple-600 focus:ring-purple-500 h-4 w-4 cursor-pointer"
                          />
                          <label htmlFor="urgente_checkbox" className="text-xs font-bold text-zinc-500 dark:text-zinc-200 select-none cursor-pointer">
                            Marcar como urgente
                          </label>
                        </div>
                      </div>

                      {/* briefing */}
                      <div className="space-y-1 col-span-1 md:col-span-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-sans">Briefing</label>
                        <textarea
                          placeholder="Descreva as especificações gerais desse pedido..."
                          value={selectedCard.briefing || ''}
                          onChange={(e) => setSelectedCard({ ...selectedCard, briefing: e.target.value })}
                          className="w-full h-24 text-xs font-bold p-3 border-none dark:border-transparent bg-white dark:bg-zinc-950 rounded-xl focus:ring-purple-500 shrink-0 select-text"
                        />
                      </div>
                    </div>
                  )}

                  {/* TAB: PRODUTOS */}
                  {modalTab === 'produtos' && (
                    <div className="flex gap-4 pt-2 h-[410px] overflow-hidden">
                      {/* PRODS LIST SIDEBAR */}
                      <div className="w-1/4 shrink-0 border-r border-transparent dark:border-transparent pr-2 flex flex-col gap-2 overflow-y-auto pb-4 scrollbar-thin">
                        {(selectedCard.produtos || []).map((prod, idx) => {
                          const isActive = activeProdIndex === idx;
                          return (
                            <button
                              key={prod.id || idx}
                              type="button"
                              onClick={() => {
                                setActiveProdIndex(idx);
                              }}
                              className={cn(
                                "p-3 text-left rounded-xl border text-[11px] font-black uppercase transition-all truncate shrink-0 flex items-center justify-between",
                                isActive 
                                  ? "bg-amber-400/10 border-amber-500 pcp-highlight text-amber-500 dark:text-amber-400 shadow-3xs"
                                  : "border-transparent dark:border-transparent hover:bg-zinc-105 dark:hover:bg-zinc-900/40 text-zinc-400"
                              )}
                            >
                              <span className="truncate">{idx + 1}. {prod.name || 'Novo produto'}</span>
                            </button>
                          );
                        })}
                        <button
                          type="button"
                          onClick={() => {
                            const currentProds = selectedCard.produtos || [];
                            const newProd: Product = {
                              id: String(Date.now()),
                              name: 'Novo produto',
                              category: '',
                              quantity: 1,
                              material: '',
                              width: '',
                              height: '',
                              structure: '',
                              finish: '',
                              installationType: '',
                              applicationPlace: '',
                              lighting: false,
                              designer: 'Adams Leandro Alves Pereira',
                              designerProjetista: '',
                              productionResponsavel: '',
                              assembler: '',
                              technicalStatus: 'Em andamento',
                              observations: ''
                            };
                            const nextProds = [...currentProds, newProd];
                            setSelectedCard({ ...selectedCard, produtos: nextProds });
                            setActiveProdIndex(nextProds.length - 1);
                          }}
                          className="p-3 border border-dashed border-transparent dark:border-transparent hover:border-amber-400 rounded-xl text-xs font-black uppercase text-zinc-400 hover:text-amber-400 transition-all text-center flex items-center justify-center gap-1 shrink-0"
                        >
                          <Plus size={12} />
                          Adicionar
                        </button>
                      </div>

                      {/* PRODUCT DETAIL FORM */}
                      <div className="w-3/4 overflow-y-auto pr-1 pb-4 space-y-4 scrollbar-thin">
                        {(selectedCard.produtos || [])[activeProdIndex] ? (() => {
                          const product = (selectedCard.produtos || [])[activeProdIndex];
                          const updateProd = (fields: Partial<Product>) => {
                            const updated = (selectedCard.produtos || []).map((p, idx) => {
                              if (idx === activeProdIndex) {
                                return { ...p, ...fields };
                              }
                              return p;
                            });
                            setSelectedCard({ ...selectedCard, produtos: updated });
                          };

                          return (
                            <div className="space-y-4 pt-1">
                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Nome do Produto</label>
                                  <Input 
                                    value={product.name}
                                    onChange={(e) => updateProd({ name: e.target.value })}
                                    className="h-10 text-xs font-extrabold border-transparent dark:border-transparent bg-white dark:bg-zinc-950 font-sans"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Categoria</label>
                                  <Input 
                                    value={product.category}
                                    onChange={(e) => updateProd({ category: e.target.value })}
                                    placeholder="Letra Caixa, ACM, Totem..."
                                    className="h-10 text-xs font-extrabold border-transparent dark:border-transparent bg-white dark:bg-zinc-950"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-3 font-mono text-zinc-800 dark:text-zinc-200">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-[#f59e0b] dark:text-zinc-500 font-sans">Quantidade</label>
                                  <Input 
                                    type="number"
                                    value={product.quantity}
                                    onChange={(e) => updateProd({ quantity: Number(e.target.value) })}
                                    className="h-10 text-xs font-bold border-transparent dark:border-transparent bg-white dark:bg-zinc-950"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-sans">Material</label>
                                  <Input 
                                    value={product.material}
                                    onChange={(e) => updateProd({ material: e.target.value })}
                                    className="h-10 text-xs font-bold border-transparent dark:border-transparent bg-white dark:bg-zinc-950"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-3 font-mono">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-sans">Largura (cm)</label>
                                  <Input 
                                    value={product.width}
                                    onChange={(e) => updateProd({ width: e.target.value })}
                                    className="h-10 text-xs font-bold border-transparent dark:border-transparent bg-white dark:bg-zinc-950"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-sans">Altura (cm)</label>
                                  <Input 
                                    value={product.height}
                                    onChange={(e) => updateProd({ height: e.target.value })}
                                    className="h-10 text-xs font-bold border-transparent dark:border-transparent bg-white dark:bg-zinc-950"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-3 font-mono">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-sans">Estrutura</label>
                                  <Input 
                                    value={product.structure}
                                    onChange={(e) => updateProd({ structure: e.target.value })}
                                    className="h-10 text-xs font-bold border-transparent dark:border-transparent bg-white dark:bg-zinc-950"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-sans">Acabamento</label>
                                  <Input 
                                    value={product.finish}
                                    onChange={(e) => updateProd({ finish: e.target.value })}
                                    className="h-10 text-xs font-bold border-transparent dark:border-transparent bg-white dark:bg-zinc-950"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-3 font-mono">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-sans">Tipo de Instalação</label>
                                  <Input 
                                    value={product.installationType}
                                    onChange={(e) => updateProd({ installationType: e.target.value })}
                                    className="h-10 text-xs font-bold border-transparent dark:border-transparent bg-white dark:bg-zinc-950"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-sans">Local de Aplicação</label>
                                  <Input 
                                    value={product.applicationPlace}
                                    onChange={(e) => updateProd({ applicationPlace: e.target.value })}
                                    className="h-10 text-xs font-bold border-transparent dark:border-transparent bg-white dark:bg-zinc-950"
                                  />
                                </div>
                              </div>

                              {/* ILUMINACAO ROW CHECKBOX BLOCK */}
                              <div className="p-3.5 border-none dark:border-transparent rounded-xl bg-white dark:bg-zinc-950 flex items-center gap-2 select-none">
                                <input 
                                  type="checkbox"
                                  id={`ilum_checkbox_${product.id}`}
                                  checked={product.lighting}
                                  onChange={(e) => updateProd({ lighting: e.target.checked })}
                                  className="rounded border-transparent text-amber-500 focus:ring-amber-500 h-4.5 w-4.5 cursor-pointer"
                                />
                                <label htmlFor={`ilum_checkbox_${product.id}`} className="text-xs font-extrabold text-zinc-500 dark:text-zinc-200 select-none cursor-pointer uppercase tracking-wider">
                                  Possui iluminação
                                </label>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-sans">Designer</label>
                                  <select
                                    value={product.designer}
                                    onChange={(e) => updateProd({ designer: e.target.value })}
                                    className="w-full h-10 border-none dark:border-transparent bg-white dark:bg-zinc-950 rounded-xl px-3 text-xs font-bold focus:ring-1 focus:ring-amber-500"
                                  >
                                    <option value="Adams Leandro Alves Pereira">Adams Leandro Alves Pereira</option>
                                    <option value="Felipe S.">Felipe S.</option>
                                    <option value="Carlos L.">Carlos L.</option>
                                    <option value="Julia R.">Julia R.</option>
                                  </select>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-sans">Projetista</label>
                                  <Input 
                                    value={product.designerProjetista}
                                    onChange={(e) => updateProd({ designerProjetista: e.target.value })}
                                    className="h-10 text-xs font-bold border-transparent dark:border-transparent bg-white dark:bg-zinc-950"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-3 font-mono">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-sans">Produção</label>
                                  <Input 
                                    value={product.productionResponsavel}
                                    onChange={(e) => updateProd({ productionResponsavel: e.target.value })}
                                    className="h-10 text-xs font-bold border-transparent dark:border-transparent bg-white dark:bg-zinc-950"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-sans">Instalador</label>
                                  <Input 
                                    value={product.assembler}
                                    onChange={(e) => updateProd({ assembler: e.target.value })}
                                    className="h-10 text-xs font-bold border-transparent dark:border-transparent bg-white dark:bg-zinc-950"
                                  />
                                </div>
                              </div>

                              <div className="space-y-1 font-mono">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-sans">Status Técnico</label>
                                <select
                                  value={product.technicalStatus}
                                  onChange={(e) => {
                                    updateProd({ technicalStatus: e.target.value });
                                  }}
                                  className="w-full h-11 border-none dark:border-transparent bg-white dark:bg-zinc-950 rounded-xl px-3 text-xs font-bold focus:ring-1 focus:ring-amber-500"
                                >
                                  <option value="Em andamento">Em andamento</option>
                                  <option value="Pendente">Pendente</option>
                                  <option value="Atrasado">Atrasado</option>
                                  <option value="Finalizado">Finalizado</option>
                                </select>
                              </div>

                              <div className="space-y-1 text-left">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-sans">Observações</label>
                                <textarea
                                  placeholder="Notas adicionais sobre esse produto específico..."
                                  value={product.observations}
                                  onChange={(e) => updateProd({ observations: e.target.value })}
                                  className="w-full h-20 text-xs font-bold p-3 border-none dark:border-transparent bg-white dark:bg-zinc-950 rounded-xl focus:ring-amber-500 shrink-0 select-text"
                                />
                              </div>

                              {/* REMOVE PRODUCT BUTTON */}
                              <div className="pt-2 text-right">
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => {
                                    if (confirm("Deseja realmente remover esse produto do planejamento técnico?")) {
                                      const filtered = (selectedCard.produtos || []).filter((_, idx) => idx !== activeProdIndex);
                                      setSelectedCard({ ...selectedCard, produtos: filtered });
                                      setActiveProdIndex(0);
                                    }
                                  }}
                                  className="text-xs text-rose-500 hover:text-white hover:bg-rose-600 rounded-xl border-rose-200 dark:border-rose-950 px-4 h-9 font-black uppercase"
                                >
                                  Remover Produto
                                </Button>
                              </div>
                            </div>
                          );
                        })() : (
                          <div className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-transparent dark:border-transparent rounded-2xl text-center">
                            <span className="text-xs font-black uppercase text-zinc-400 block mb-2 font-sans">Nenhum produto indexado.</span>
                            <Button
                              type="button"
                              onClick={() => {
                                const newProd: Product = {
                                  id: String(Date.now()),
                                  name: 'Novo produto',
                                  category: '',
                                  quantity: 1,
                                  material: '',
                                  width: '',
                                  height: '',
                                  structure: '',
                                  finish: '',
                                  installationType: '',
                                  applicationPlace: '',
                                  lighting: false,
                                  designer: 'Adams Leandro Alves Pereira',
                                  designerProjetista: '',
                                  productionResponsavel: '',
                                  assembler: '',
                                  technicalStatus: 'Em andamento',
                                  observations: ''
                                };
                                setSelectedCard({ ...selectedCard, produtos: [newProd] });
                                setActiveProdIndex(0);
                              }}
                              className="bg-amber-500 hover:bg-amber-600 border-none font-bold text-xs uppercase text-white rounded-xl h-10 px-4"
                            >
                              Criar Primeiro Produto
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB: ARQUIVOS (conforme anexo 3) */}
                  {modalTab === 'arquivos' && (
                    <div className="space-y-4 pt-2 h-[410px] overflow-y-auto pr-1 scrollbar-none">
                      {/* FILE ADD FORM */}
                      <div className="p-4 border-none dark:border-transparent rounded-2xl bg-zinc-50 dark:zinc-900 flex flex-col md:flex-row items-end gap-3 shrink-0">
                        <div className="w-full md:w-1/5 space-y-1 text-left">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Tipo</label>
                          <select
                            value={newFileType}
                            onChange={(e) => setNewFileType(e.target.value as any)}
                            className="w-full h-10 border-none dark:border-transparent bg-white dark:bg-zinc-950 rounded-xl px-2 text-xs font-bold focus:ring-1 focus:ring-purple-500"
                          >
                            <option value="Drive">Drive</option>
                            <option value="PDF">PDF</option>
                            <option value="Mockup">Mockup</option>
                            <option value="Vetor">Vetor</option>
                            <option value="Outro">Outro</option>
                          </select>
                        </div>
                        <div className="w-full md:w-2/5 space-y-1 text-left font-sans">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Nome do arquivo</label>
                          <Input 
                            value={newFileName}
                            onChange={(e) => setNewFileName(e.target.value)}
                            placeholder="Nome de identificação"
                            className="h-10 text-xs font-bold bg-white dark:bg-zinc-950 border-transparent dark:border-transparent"
                          />
                        </div>
                        <div className="w-full md:w-2/5 space-y-1 text-left font-sans">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">URL</label>
                          <Input 
                            value={newFileUrl}
                            onChange={(e) => setNewFileUrl(e.target.value)}
                            placeholder="Link do drive, FTP, arquivo"
                            className="h-10 text-xs font-bold bg-white dark:bg-zinc-950 border-transparent dark:border-transparent font-mono"
                          />
                        </div>
                        <Button
                          type="button"
                          onClick={() => {
                            if (!newFileName || !newFileUrl) return;
                            const currentFiles = selectedCard.arquivos || [];
                            const newFile: OSFile = {
                              id: String(Date.now()),
                              type: newFileType,
                              name: newFileName,
                              url: newFileUrl
                            };
                            setSelectedCard({ ...selectedCard, arquivos: [...currentFiles, newFile] });
                            setNewFileName('');
                            setNewFileUrl('');
                          }}
                          className="h-10 w-10 shrink-0 bg-purple-600 hover:bg-purple-500 text-white rounded-xl flex items-center justify-center p-0 font-bold"
                        >
                          <Plus size={18} />
                        </Button>
                      </div>

                      {/* FILE LIST */}
                      <div className="pt-1">
                        {(!selectedCard.arquivos || selectedCard.arquivos.length === 0) ? (
                          <div className="h-48 border border-dashed border-transparent dark:border-transparent rounded-2xl flex flex-col items-center justify-center text-center p-4">
                            <span className="text-zinc-400 dark:text-zinc-600 uppercase text-xs font-black tracking-widest block font-sans mb-1">Nenhum arquivo vinculado.</span>
                            <span className="text-[10px] text-zinc-500 font-sans">Preencha os campos acima para acoplar desenhos técnicos, licenças de fachadas ou mockups 3D.</span>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {(selectedCard.arquivos || []).map((file) => (
                              <div 
                                key={file.id} 
                                className="p-3.5 border-none dark:border-transparent bg-white dark:zinc-900 rounded-xl flex items-center justify-between gap-3 text-xs"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <Badge className={cn(
                                    "text-[9px] uppercase font-mono font-black py-0.5 px-2",
                                    file.type === 'Drive' ? 'bg-blue-600 text-white' :
                                    file.type === 'PDF' ? 'bg-rose-600 text-white' :
                                    file.type === 'Mockup' ? 'bg-amber-600 text-white' :
                                    file.type === 'Vetor' ? 'bg-emerald-600 text-white' : 'bg-zinc-600 text-white'
                                  )}>
                                    {file.type}
                                  </Badge>
                                  <span className="font-extrabold text-zinc-700 dark:text-zinc-200 truncate uppercase text-[10px]">{file.name}</span>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  <a 
                                    href={file.url} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="px-3 py-1 bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-[#c084fc] text-[10px] font-black uppercase rounded-lg hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 transition-all font-sans"
                                  >
                                    Abrir Link
                                  </a>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                      const currentFiles = selectedCard.arquivos || [];
                                      setSelectedCard({ ...selectedCard, arquivos: currentFiles.filter(f => f.id !== file.id) });
                                    }}
                                    className="h-8 w-8 text-rose-500 hover:bg-rose-500/10 hover:text-rose-600 rounded-lg"
                                  >
                                    <Trash2 size={13} />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB: HISTORICO */}
                  {modalTab === 'historico' && (
                    <div className="space-y-4 pt-2 h-[410px] overflow-y-auto pr-1 scrollbar-none text-left">
                      <div className="relative pl-6 border-l-2 border-transparent dark:border-transparent space-y-6 pt-2">
                        <div className="relative">
                          <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-purple-500 bg-white dark:zinc-900 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                          </span>
                          <span className="text-[10px] font-bold font-mono text-zinc-400">HOJE ÀS 10:15h</span>
                          <h4 className="text-xs font-black uppercase text-zinc-200 mt-0.5">OS Aberta e agendada no Layout de Produção</h4>
                          <span className="text-[11px] text-zinc-400 block font-normal">Inicializado pelo Diretor do MES / Designer responsável Adams Leandro Alves Pereira.</span>
                        </div>
                        <div className="relative">
                          <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-amber-500 bg-white dark:zinc-900 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          </span>
                          <span className="text-[10px] font-bold font-mono text-zinc-400">ONTEM ÀS 15:40h</span>
                          <h4 className="text-xs font-black uppercase text-zinc-200 mt-0.5">Vetor técnico faturado no faturamento comercial</h4>
                          <span className="text-[11px] text-zinc-400 block font-normal">Estruturação de materiais aprovado com sucesso sob proposta comercial faturada.</span>
                        </div>
                        <div className="relative">
                          <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-emerald-500 bg-white dark:zinc-900 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          </span>
                          <span className="text-[10px] font-bold font-mono text-zinc-400">ONTEM ÀS 11:20h</span>
                          <h4 className="text-xs font-black uppercase text-zinc-200 mt-0.5">Briefing e captação de dimensões finalizada</h4>
                          <span className="text-[11px] text-zinc-400 block font-normal">Mapeamento inicial de dimensões de fachadas ACM inseridos no ERP.</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB: PERFORMANCE */}
                  {modalTab === 'performance' && (
                    <div className="space-y-4 pt-2 h-[410px] overflow-y-auto pr-1 scrollbar-none text-left">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border-none dark:border-transparent bg-zinc-50 dark:zinc-900 rounded-2xl">
                          <span className="text-[9px] font-black uppercase tracking-wider text-zinc-400 block mb-1 font-sans">MÉTRICA DE VELOCIDADE</span>
                          <h3 className="text-xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">92.4%</h3>
                          <span className="text-[10px] text-zinc-500">OEE produtivo estimado para este vetor de OS {selectedCard.id}</span>
                        </div>
                        <div className="p-4 border-none dark:border-transparent bg-zinc-50 dark:zinc-900 rounded-2xl">
                          <span className="text-[9px] font-black uppercase tracking-wider text-zinc-400 block mb-1 font-sans">APONTAMENTO TÉCNICO</span>
                          <h3 className="text-xl font-extrabold text-amber-500 font-mono">01:45h</h3>
                          <span className="text-[10px] text-zinc-500">Tempo ativo de corte e de usinagem estrutural nas máquinas CNC</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB: NOTAS */}
                  {modalTab === 'notas' && (
                    <div className="space-y-2 pt-2 h-[410px] overflow-y-auto pr-1 scrollbar-none text-left flex flex-col">
                      <label className="text-[10px] font-black uppercase tracking-widest text-purple-500 font-mono">Observações da OS no Chão de Fábrica</label>
                      <textarea
                        placeholder="Log de bordo, especificações elétricas, voltagem de fita LED..."
                        value={selectedCard.notes || ''}
                        onChange={(e) => setSelectedCard({ ...selectedCard, notes: e.target.value })}
                        className="w-full flex-1 min-h-[300px] text-xs font-bold p-4 border-none dark:border-transparent bg-white dark:bg-zinc-950 rounded-2xl focus:ring-purple-500 select-text shrink-0"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar Action Buttons */}
              <div className="pt-6 border-t border-transparent dark:border-transparent flex items-center justify-between gap-3 shrink-0">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => handleDeleteCard(selectedCard.id)}
                  className="h-11 px-4 text-rose-600 hover:text-white hover:bg-rose-550 border-rose-100 dark:border-rose-900/40 rounded-xl flex items-center gap-2"
                >
                  <Trash2 size={14} />
                  Excluir OS
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => {
                      setSelectedCard(null);
                    }}
                    className="h-11 rounded-xl text-xs uppercase font-black"
                  >
                    Voltar
                  </Button>
                  <Button
                    onClick={() => handleSaveCardDetails(selectedCard)}
                    className="h-11 px-6 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase tracking-wider rounded-xl border-y border-purple-500 flex items-center gap-2 shadow-xs"
                  >
                    Salvar Alterações
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* NEW ORDER SEEDING MODAL DIALOG */}
      <AnimatePresence>
        {isAddModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 pointer-events-auto"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className={cn(
                "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 rounded-3xl p-6 md:p-8 border shadow-sm pointer-events-auto",
                isLight ? "bg-white border-transparent text-zinc-900" : "bg-zinc-900 border-transparent text-white"
              )}
            >
              <div className="flex items-center justify-between pb-4 border-b border-transparent dark:border-transparent">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-purple-600" />
                  <h3 className="text-base font-extrabold uppercase italic tracking-tight">Nova Inscrição de PCP</h3>
                </div>
                <Button size="icon" variant="ghost" onClick={() => setIsAddModalOpen(false)} className="h-8 w-8 rounded-full">
                  <X size={16} />
                </Button>
              </div>

              <form onSubmit={handleAddCardSubmit} className="space-y-4 pt-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 font-mono">Nome do Cliente / Razão Social</label>
                  <Input
                    required
                    placeholder="Ex: Banco Itaú S.A."
                    value={newCard.client}
                    onChange={(e) => setNewCard(prev => ({ ...prev, client: e.target.value }))}
                    className="h-10 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Código OS [Esquerda]</label>
                    <Input
                      required
                      placeholder="Ex: 631"
                      value={newCard.id}
                      onChange={(e) => setNewCard(prev => ({ ...prev, id: e.target.value }))}
                      className="h-10 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Sub-ID [Direita]</label>
                    <Input
                      placeholder="Ex: 912"
                      value={newCard.subId}
                      onChange={(prevValue) => setNewCard(prev => ({ ...prev, subId: prevValue.target.value }))}
                      className="h-10 text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 font-mono">Detalhamento Técnico / Etiqueta</label>
                  <Input
                    placeholder="Ex: Corte Acrílico 3mm Cristal"
                    value={newCard.details}
                    onChange={(e) => setNewCard(prev => ({ ...prev, details: e.target.value }))}
                    className="h-10 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Etapa do Processo</label>
                    <select
                      value={newCard.laneId}
                      onChange={(e) => setNewCard(prev => ({ ...prev, laneId: e.target.value as PcpCard['laneId'] }))}
                      className="w-full h-10 border-none dark:border-transparent bg-white dark:bg-zinc-900 rounded-xl px-3 text-xs font-semibold focus:ring-1 focus:ring-purple-500"
                    >
                      {LANES.map(lane => (
                        <option key={lane.id} value={lane.id}>{lane.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Forma Logística</label>
                    <select
                      value={newCard.deliveryType}
                      onChange={(e) => setNewCard(prev => ({ ...prev, deliveryType: e.target.value as PcpCard['deliveryType'] }))}
                      className="w-full h-10 border-none dark:border-transparent bg-white dark:bg-zinc-900 rounded-xl px-3 text-xs font-semibold focus:ring-1 focus:ring-purple-500"
                    >
                      <option value="Cliente Retira">Cliente Retira</option>
                      <option value="Instalado">Instalado</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Prazo de Resolução</label>
                    <Input
                      value={newCard.date}
                      onChange={(e) => setNewCard(prev => ({ ...prev, date: e.target.value }))}
                      className="h-10 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Prioridade</label>
                    <select
                      value={newCard.priority}
                      onChange={(e) => setNewCard(prev => ({ ...prev, priority: e.target.value as PcpCard['priority'] }))}
                      className="w-full h-10 border-none dark:border-transparent bg-white dark:bg-zinc-900 rounded-xl px-3 text-xs font-semibold focus:ring-1 focus:ring-purple-500"
                    >
                      <option value="low">Baixa</option>
                      <option value="medium">Média</option>
                      <option value="high">Alta</option>
                      <option value="critical">Crítica</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-transparent dark:border-transparent flex items-center justify-end gap-2.5">
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="h-11 rounded-xl text-xs uppercase font-black"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="h-11 px-6 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl border-y border-purple-500 flex items-center gap-2"
                  >
                    Agendar Produção
                  </Button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Fallback Container wrapper to safe guard open variables
const HeadlessMovers = motion.div;
