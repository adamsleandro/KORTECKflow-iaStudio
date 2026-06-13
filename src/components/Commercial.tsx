import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, 
  TrendingUp, 
  Users, 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical,
  ChevronRight,
  DollarSign,
  Clock,
  Briefcase,
  Layers,
  ArrowUpRight,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  Zap,
  Star,
  CheckCircle2,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Sliders,
  Download,
  Send,
  Check,
  ExternalLink,
  Scissors,
  FileUp,
  File,
  FolderOpen,
  Tag,
  Building2,
  Settings,
  HelpCircle,
  Folder,
  Trash2,
  Info,
  Maximize2,
  X,
  ClipboardList,
  Package,
  FileSpreadsheet,
  List,
  Paperclip,
  History,
  LineChart,
  Upload,
  Pencil
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useTheme } from '@/src/lib/ThemeContext';

// --- CONFIGURAÇÃO DE TIPOS E INTERFACES ---
type SectorType = 'comunicacao-visual' | 'corte-cnc' | 'impressao-digital' | 'impressao-3d';

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

interface Atendimento {
  id: string;
  cliente: string;
  contato: string;
  canal: 'WhatsApp' | 'Telefone' | 'E-mail' | 'Presencial';
  assunto: string;
  setor: SectorType;
  status: 'Pendente' | 'Retornado' | 'Em Proposta' | 'Finalizado';
  data: string;
  descricao: string;
  valor?: number;
  dificuldade?: number;
  prioridadeForm?: number;
  unidadeLoja?: string;
  responsavelComercial?: string;
  designerResponsavel?: string;
  linkPasta?: string;
  urgente?: boolean;
  briefing?: string;
  produtos?: Product[];
  arquivos?: OSFile[];
  historico?: string[];
  notas?: string;
}

interface Deal {
  id: string;
  cliente: string;
  projeto: string;
  valor: number;
  probabilidade: number;
  setor: SectorType;
  estagio: 'captacao' | 'contato' | 'analise' | 'proposta' | 'followup' | 'ganho';
  diasInativo: number;
  alertas: number;
  date?: string;
  status?: string;
  dificuldade?: number;
  prioridadeForm?: number;
  unidadeLoja?: string;
  responsavelComercial?: string;
  designerResponsavel?: string;
  linkPasta?: string;
  urgente?: boolean;
  briefing?: string;
  produtos?: Product[];
  arquivos?: OSFile[];
  historico?: string[];
  notas?: string;
}

interface ProjetoBrief {
  id: string;
  titulo: string;
  cliente: string;
  setor: SectorType;
  designer: string;
  status: 'Briefing' | 'Em Vetorização' | 'Aprovado Pelo Cliente' | 'Ajuste Solicitado';
  prazo: string;
  dimensoes: string;
  materialPrincipal: string;
  valor?: number;
  dificuldade?: number;
  prioridadeForm?: number;
  unidadeLoja?: string;
  responsavelComercial?: string;
  designerResponsavel?: string;
  linkPasta?: string;
  urgente?: boolean;
  briefing?: string;
  produtos?: Product[];
  arquivos?: OSFile[];
  historico?: string[];
  notas?: string;
  flowStage?: string;
}

interface Orcamento {
  id: string;
  cliente: string;
  valorTotal: number;
  setor: SectorType;
  status: 'Em Elaboração' | 'Enviado' | 'Aprovado' | 'Recusado';
  dataEmissao: string;
  itens: Array<{ nome: string; qtd: number; valorUnit: number }>;
  dificuldade?: number;
  prioridadeForm?: number;
  unidadeLoja?: string;
  responsavelComercial?: string;
  designerResponsavel?: string;
  linkPasta?: string;
  urgente?: boolean;
  briefing?: string;
  produtos?: Product[];
  arquivos?: OSFile[];
  historico?: string[];
  notas?: string;
}

interface OSOrd {
  id: string;
  numeroOS: string;
  orcamentoId: string;
  cliente: string;
  titulo: string;
  setor: SectorType;
  status: 'Aguardando Arquivos' | 'Preparacao' | 'Producao' | 'Acabamento/Qualidade' | 'Entregue';
  dataEntrega: string;
  valor?: number;
  dificuldade?: number;
  prioridadeForm?: number;
  unidadeLoja?: string;
  responsavelComercial?: string;
  designerResponsavel?: string;
  linkPasta?: string;
  urgente?: boolean;
  briefing?: string;
  produtos?: Product[];
  arquivos?: OSFile[];
  historico?: string[];
  notas?: string;
}

interface Campanha {
  id: string;
  nome: string;
  setor: SectorType;
  investimento: number;
  leadsGerados: number;
  conversao: number;
  status: 'Ativa' | 'Pausada' | 'Finalizada';
  roi: number;
  ultimoContato?: string;
  dificuldade?: number;
  prioridadeForm?: number;
  unidadeLoja?: string;
  responsavelComercial?: string;
  designerResponsavel?: string;
  linkPasta?: string;
  urgente?: boolean;
  briefing?: string;
  produtos?: Product[];
  arquivos?: OSFile[];
  historico?: string[];
  notas?: string;
}

interface Client {
  id: string;
  nome: string;
  segmento: string;
  canalPreferido: string;
  ltv: number;
  ultimoContato: string;
  setorPrincipal: SectorType;
  dificuldade?: number;
  prioridadeForm?: number;
  unidadeLoja?: string;
  responsavelComercial?: string;
  designerResponsavel?: string;
  linkPasta?: string;
  urgente?: boolean;
  briefing?: string;
  produtos?: Product[];
  arquivos?: OSFile[];
  historico?: string[];
  notas?: string;
}

interface FTPFile {
  id: string;
  osId: string;
  nomeArquivo: string;
  tamanho: string;
  extensao: 'dxf' | 'dwg' | 'stl' | 'pdf' | 'cdr' | 'ai';
  setor: SectorType;
  enviadoPor: string;
  dataEnvio: string;
  valor?: number;
  dificuldade?: number;
  prioridadeForm?: number;
  unidadeLoja?: string;
  responsavelComercial?: string;
  designerResponsavel?: string;
  linkPasta?: string;
  urgente?: boolean;
  briefing?: string;
  produtos?: Product[];
  arquivos?: OSFile[];
  historico?: string[];
  notas?: string;
}

interface UnifiedItem {
  id: string;
  flowStage?: 'atendimento' | 'funil' | 'projetos' | 'orcamentos' | 'ordem-servicos' | 'campanhas' | 'clientes' | 'ftp-arquivos';
  title?: string;
  subtitle?: string;
  status?: string;
  date?: string;
  hour?: string;
  value?: number;
  sector?: SectorType;
  teamMember?: string;
  category?: string;
  extraInfo?: string;
  dificuldade?: number;
  prioridadeForm?: number;
  unidadeLoja?: string;
  responsavelComercial?: string;
  designerResponsavel?: string;
  designer?: string;
  linkPasta?: string;
  urgente?: boolean;
  briefing?: string;
  produtos?: Product[];
  arquivos?: OSFile[];
  historico?: string[];
  notas?: string;
  notes?: string;

  // Atendimento additions
  contato?: string;
  canal?: 'WhatsApp' | 'Telefone' | 'E-mail' | 'Presencial';

  // Deal/Funil additions
  probabilidade?: number;
  diasInativo?: number;
  alertas?: number;

  // Projeto additions
  dimensoes?: string;
  materialPrincipal?: string;

  // Orçamento additions
  valorTotal?: number;
  itens?: { nome: string; qtd: number; valorUnit: number }[];

  // OS additions
  numeroOS?: string;
  orcamentoId?: string;

  // Campanhas / Marketing additions
  investimento?: number;
  leadsGerados?: number;
  conversao?: number;
  roi?: number;

  // Clientes additions
  segmento?: string;
  canalPreferido?: string;
  ltv?: number;
  ultimoContato?: string;
  setorPrincipal?: SectorType;

  // FTP additions
  osId?: string;
  nomeArquivo?: string;
  tamanho?: string;
  extensao?: string;
  enviadoPor?: string;
  dataEnvio?: string;
}

export function Commercial({ initialTab: propInitialTab }: { initialTab?: string }) {
  const { theme } = useTheme();
  const isLight = theme === 'ash-light';
  const c = (light: string, dark: string) => isLight ? light : dark;

  // --- CONTROLE DE VISÃO DE ABAS ---
  // Sequência do usuário: Atendimento, Funil Comercial, Projetos, Orçamentos, O.S., Campanhas, Clientes, FTP Arquivos em O.S.
  const [activeTab, setActiveTab] = useState<string>('atendimento');
  const [selectedItem, setSelectedItem] = useState<UnifiedItem | null>(null);

  // --- ESTADOS DO MODAL COLETOR DE ALTA FIDELIDADE (CORTESIA DO PCP DE PRODUÇÃO) ---
  const [selectedCard, setSelectedCard] = useState<any | null>(null);
  const [selectedCardType, setSelectedCardType] = useState<'deal' | 'unifiedItem' | null>(null);
  const [modalTab, setModalTab] = useState<'geral' | 'produtos' | 'arquivos' | 'historico' | 'performance' | 'notas'>('geral');
  const [activeProdIndex, setActiveProdIndex] = useState<number>(0);

  const openHighFidelityModal = (id: string, stage: string) => {
    const isOneToSix = ['atendimento', 'funil', 'projetos', 'orcamentos', 'ordem-servicos', 'campanhas'].includes(stage);
    if (!isOneToSix) {
      const found = unifiedFlowItems.find(x => x.id === id);
      if (found) setSelectedItem(found);
      return;
    }

    const found = unifiedFlowItems.find(x => x.id === id);
    if (!found) return;

    const proj: ProjetoBrief & { flowStage?: string } = {
      ...mapUnifiedToProjeto(found),
      flowStage: found.flowStage || stage,
      produtos: found.produtos || [],
      arquivos: found.arquivos || [],
      historico: found.historico || (found.extraInfo ? [found.extraInfo] : []),
      notas: found.notas || ''
    };
    
    setSelectedProjeto(proj);
    setEditProjActiveTab('geral');
  };

  const openDealModal = (deal: Deal) => {
    openHighFidelityModal(deal.id, 'funil');
  };

  const openUnifiedItemModal = (it: UnifiedItem) => {
    openHighFidelityModal(it.id, it.flowStage || activeTab);
  };

  // --- CONTROLES DE ARRUSTE E ENTREGA (NATURAL NATIVE DRAG AND DROP) ---
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    setDraggedCardId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropToColumn = (e: React.DragEvent, targetColumn: string) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain') || draggedCardId;
    if (!id) return;

    // Verificar se o item arrastado é uma Oportunidade do CRM (deals) ou ClickUp unificado
    const matchedDeal = deals.find(d => d.id === id);
    if (matchedDeal) {
      const statusToEstagio: Record<string, Deal['estagio']> = {
        'captacao': 'captacao',
        'contato': 'contato',
        'analise': 'analise',
        'proposta': 'proposta',
        'followup': 'followup',
        'ganho': 'ganho',
        '1. Captação / Prospecção': 'captacao',
        '2. Contato Inicial': 'contato',
        '3. Análise Técnica': 'analise',
        '4. Elaboração Proposta': 'proposta',
        '5. Follow-up / Ajustes': 'followup',
        '6. Ganhos / Fechados': 'ganho',
        'Prospecção': 'captacao',
        'Contato Inicial': 'contato',
        'Análise Técnica': 'analise',
        'Elaboração Proposta': 'proposta',
        'Follow-up': 'followup',
        'Pronto (Ganho)': 'ganho'
      };
      const finalEstagio = statusToEstagio[targetColumn] || targetColumn as any;
      moveDeal(id, finalEstagio);
    } else {
      updateUnifiedItemStatus(id, targetColumn);
    }

    setDraggedCardId(null);
  };

  const saveDetailedCard = () => {
    if (!selectedCard) return;
    const { id } = selectedCard;
    
    // Salvar campos básicos
    updateUnifiedItemField(id, 'title', selectedCard.client);
    updateUnifiedItemField(id, 'subtitle', selectedCard.details);
    updateUnifiedItemField(id, 'date', selectedCard.date);
    updateUnifiedItemField(id, 'value', selectedCard.valor);
    updateUnifiedItemField(id, 'sector', selectedCard.setor);

    // Salvar campos complementares de alta fidelidade
    updateUnifiedItemField(id, 'dificuldade', selectedCard.dificuldade);
    updateUnifiedItemField(id, 'prioridadeForm', selectedCard.prioridadeForm);
    updateUnifiedItemField(id, 'unidadeLoja', selectedCard.unidadeLoja);
    updateUnifiedItemField(id, 'responsavelComercial', selectedCard.responsavelComercial);
    updateUnifiedItemField(id, 'designerResponsavel', selectedCard.designerResponsavel);
    updateUnifiedItemField(id, 'linkPasta', selectedCard.linkPasta);
    updateUnifiedItemField(id, 'urgente', selectedCard.urgente);
    updateUnifiedItemField(id, 'briefing', selectedCard.briefing);
    updateUnifiedItemField(id, 'produtos', selectedCard.produtos);
    updateUnifiedItemField(id, 'arquivos', selectedCard.arquivos);
    updateUnifiedItemField(id, 'historico', selectedCard.historico);
    updateUnifiedItemField(id, 'notas', selectedCard.notas);

    setSelectedCard(null);
    setSelectedCardType(null);
    alert('Ficha Técnica do Negócio gravada com sucesso no Korteck MES!');
  };
  
  // --- CONTROLE DE VISÃO CLICKUP (TABELAS, KANBAN, GANTT INTERATIVO, CALENDÁRIO, EQUIPE) ---
  const [viewMode, setViewMode] = useState<'lista' | 'quadro' | 'gantt' | 'calendario' | 'equipe'>('lista');
  const [selectedListItems, setSelectedListItems] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Atualizador do tempo real para a linha vertical do Gantt
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000); // Atualiza a cada 10 segundos
    return () => clearInterval(interval);
  }, []);

  // Sincronizar com propInitialTab se fornecido externamente (Sidebar/App)
  useEffect(() => {
    if (!propInitialTab) return;
    if (propInitialTab === 'com-atendimentos') {
      setActiveTab('atendimento');
    } else if (propInitialTab === 'comercial' || propInitialTab === 'crm-pipe') {
      setActiveTab('funil');
    } else if (propInitialTab === 'com-projetos') {
      setActiveTab('projetos');
    } else if (propInitialTab === 'com-orcamentos') {
      setActiveTab('orcamentos');
    } else if (propInitialTab === 'com-servicos') {
      setActiveTab('ordem-servicos');
    } else if (propInitialTab === 'com-campanhas') {
      setActiveTab('campanhas');
    } else if (propInitialTab === 'com-leads' || propInitialTab === 'clientes') {
      setActiveTab('clientes');
    } else if (propInitialTab === 'com-ftp') {
      setActiveTab('ftp-arquivos');
    }
  }, [propInitialTab]);

  // --- FILTRO DE SETOR GLOBAL ---
  const [selectedSector, setSelectedSector] = useState<SectorType | 'all'>('all');

  // --- MAPPERS UNIFICADOS DE BANCO DE DADOS (SINGLE SOURCE OF TRUTH) ---
  const mapAtendimentoToUnified = (item: Atendimento): UnifiedItem => ({
    ...item,
    id: item.id,
    flowStage: 'atendimento',
    title: item.cliente,
    subtitle: item.assunto,
    status: item.status,
    date: item.data,
    sector: item.setor,
    teamMember: item.contato,
    extraInfo: item.descricao,
    value: item.valor || 0,
    canal: item.canal,
    contato: item.contato
  });

  const mapDealToUnified = (item: Deal): UnifiedItem => ({
    ...item,
    id: item.id,
    flowStage: 'funil',
    title: item.cliente,
    subtitle: item.projeto,
    status: item.status || (
      item.estagio === 'captacao' ? 'Prospecção' :
      item.estagio === 'contato' ? 'Contato Inicial' :
      item.estagio === 'analise' ? 'Análise Técnica' :
      item.estagio === 'proposta' ? 'Elaboração Proposta' :
      item.estagio === 'followup' ? 'Follow-up' : 'Pronto (Ganho)'
    ),
    date: item.date || new Date().toISOString().split('T')[0],
    sector: item.setor,
    teamMember: item.responsavelComercial || 'Adams Leandro',
    value: item.valor,
    probabilidade: item.probabilidade,
    diasInativo: item.diasInativo,
    alertas: item.alertas
  });

  const mapProjetoToUnified = (item: ProjetoBrief): UnifiedItem => ({
    ...item,
    id: item.id,
    flowStage: 'projetos',
    title: item.cliente,
    subtitle: item.titulo,
    status: item.status,
    date: item.prazo,
    sector: item.setor,
    teamMember: item.designer,
    extraInfo: item.materialPrincipal,
    dimensoes: item.dimensoes,
    materialPrincipal: item.materialPrincipal,
    designer: item.designer
  });

  const mapOrcamentoToUnified = (item: Orcamento): UnifiedItem => ({
    ...item,
    id: item.id,
    flowStage: 'orcamentos',
    title: item.cliente,
    subtitle: item.itens?.map(x => `${x.qtd}x ${x.nome}`).join(', ') || 'Sem itens cadastrados',
    status: item.status,
    date: item.dataEmissao,
    sector: item.setor,
    teamMember: item.responsavelComercial || 'Adams Leandro',
    value: item.valorTotal,
    valorTotal: item.valorTotal,
    itens: item.itens
  });

  const mapOSToUnified = (item: OSOrd): UnifiedItem => ({
    ...item,
    id: item.id,
    flowStage: 'ordem-servicos',
    title: item.cliente,
    subtitle: item.titulo,
    status: item.status,
    date: item.dataEntrega,
    sector: item.setor,
    teamMember: item.designerResponsavel || 'Adams Leandro',
    value: item.valor || 0,
    numeroOS: item.numeroOS,
    orcamentoId: item.orcamentoId
  });

  const mapCampanhaToUnified = (item: Campanha): UnifiedItem => ({
    ...item,
    id: item.id,
    flowStage: 'campanhas',
    title: item.nome,
    subtitle: `Leads: ${item.leadsGerados} | Conv: ${item.conversao}% | ROI: ${item.roi}x`,
    status: item.status,
    date: item.ultimoContato || new Date().toISOString().split('T')[0],
    sector: item.setor,
    teamMember: 'Adams Leandro',
    value: item.investimento,
    investimento: item.investimento,
    leadsGerados: item.leadsGerados,
    conversao: item.conversao,
    roi: item.roi
  });

  const mapClientToUnified = (item: Client): UnifiedItem => ({
    ...item,
    id: item.id,
    flowStage: 'clientes',
    title: item.nome,
    subtitle: item.segmento,
    status: item.canalPreferido,
    date: item.ultimoContato,
    sector: item.setorPrincipal,
    teamMember: 'Adams Leandro',
    value: item.ltv,
    segmento: item.segmento,
    canalPreferido: item.canalPreferido,
    ltv: item.ltv,
    ultimoContato: item.ultimoContato,
    setorPrincipal: item.setorPrincipal
  });

  const mapFTPFileToUnified = (item: FTPFile): UnifiedItem => ({
    ...item,
    id: item.id,
    flowStage: 'ftp-arquivos',
    title: item.nomeArquivo,
    subtitle: item.enviadoPor,
    status: item.extensao.toUpperCase(),
    date: item.dataEnvio,
    sector: item.setor,
    teamMember: item.enviadoPor,
    value: item.valor || 0,
    osId: item.osId,
    nomeArquivo: item.nomeArquivo,
    tamanho: item.tamanho,
    extensao: item.extensao,
    enviadoPor: item.enviadoPor,
    dataEnvio: item.dataEnvio
  });

  const mapUnifiedToAtendimento = (u: UnifiedItem): Atendimento => ({
    ...u,
    id: u.id,
    cliente: u.title,
    contato: u.teamMember,
    canal: u.canal || 'WhatsApp',
    assunto: u.subtitle,
    setor: u.sector,
    status: u.status as any,
    data: u.date,
    descricao: u.extraInfo || u.briefing || ''
  });

  const mapUnifiedToDeal = (u: UnifiedItem): Deal => {
    const reverseEstag: Record<string, Deal['estagio']> = {
      'Prospecção': 'captacao',
      'Contato Inicial': 'contato',
      'Análise Técnica': 'analise',
      'Elaboração Proposta': 'proposta',
      'Follow-up': 'followup',
      'Pronto (Ganho)': 'ganho'
    };
    return {
      ...u,
      id: u.id,
      cliente: u.title,
      projeto: u.subtitle,
      valor: u.value || 0,
      probabilidade: u.probabilidade || 70,
      setor: u.sector,
      estagio: reverseEstag[u.status] || 'captacao',
      diasInativo: u.diasInativo || 0,
      alertas: u.alertas || 0,
      status: u.status,
      date: u.date
    };
  };

  const mapUnifiedToProjeto = (u: UnifiedItem): ProjetoBrief => ({
    ...u,
    id: u.id,
    titulo: u.subtitle,
    cliente: u.title,
    setor: u.sector,
    designer: u.teamMember,
    status: u.status as any,
    prazo: u.date,
    dimensoes: u.dimensoes || 'A definir',
    materialPrincipal: u.materialPrincipal || u.extraInfo || 'Multi-material'
  });

  const mapUnifiedToOrcamento = (u: UnifiedItem): Orcamento => ({
    ...u,
    id: u.id,
    cliente: u.title,
    valorTotal: u.value || u.valorTotal || 0,
    setor: u.sector,
    status: u.status as any,
    dataEmissao: u.date,
    itens: u.itens || [{ nome: u.subtitle || 'Serviço sob demanda', qtd: 1, valorUnit: u.value || 0 }]
  });

  const mapUnifiedToOS = (u: UnifiedItem): OSOrd => ({
    ...u,
    id: u.id,
    numeroOS: u.numeroOS || `OS-2026-${u.id.split('-')[1] || '8000'}`,
    orcamentoId: u.orcamentoId || 'ORC-999',
    cliente: u.title,
    titulo: u.subtitle,
    setor: u.sector,
    status: u.status as any,
    dataEntrega: u.date,
    valor: u.value || 0
  });

  const mapUnifiedToCampanha = (u: UnifiedItem): Campanha => ({
    ...u,
    id: u.id,
    nome: u.title,
    setor: u.sector,
    investimento: u.value || u.investimento || 0,
    leadsGerados: u.leadsGerados || 0,
    conversao: u.conversao || 0,
    status: u.status as any,
    roi: u.roi || 0
  });

  const mapUnifiedToClient = (u: UnifiedItem): Client => ({
    ...u,
    id: u.id,
    nome: u.title,
    segmento: u.subtitle,
    canalPreferido: u.status,
    ltv: u.value || u.ltv || 0,
    ultimoContato: u.date,
    setorPrincipal: u.sector
  });

  const mapUnifiedToFTPFile = (u: UnifiedItem): FTPFile => ({
    ...u,
    id: u.id,
    osId: u.osId || 'OS-401',
    nomeArquivo: u.title,
    tamanho: u.tamanho || '2.0 MB',
    extensao: (u.extensao || u.status.toLowerCase() || 'dwg') as any,
    setor: u.sector,
    enviadoPor: u.teamMember,
    dataEnvio: u.date
  });

  // Master unified state of the entire Commercial Flow
  const [unifiedFlowItems, setUnifiedFlowItems] = useState<UnifiedItem[]>(() => {
    const initialAtends: UnifiedItem[] = [
      { id: 'AT-901', flowStage: 'atendimento', title: 'Shopping Center Norte', contato: 'Ana Beatriz (Imprensa)', canal: 'WhatsApp', subtitle: 'Renovação de Totem de Entrada Principal', sector: 'comunicacao-visual', status: 'Pendente', date: '2026-06-01', extraInfo: 'Solicitação de orçamento urgente para retrofit do totem externo com iluminação LED de alta performance e chapa ACM dupla face.', value: 14850.00 },
      { id: 'AT-902', flowStage: 'atendimento', title: 'Metalúrgica Alvorada', contato: 'Marcos Silva (Compras)', canal: 'E-mail', subtitle: 'Usinagem CNC de Painéis de Alumínio', sector: 'corte-cnc', status: 'Em Proposta', date: '2026-05-31', extraInfo: 'Nesting de 23 chapas de alumínio composto para divisórias industriais. Cliente forneceu o arquivo DWG pronto.', value: 4800.00 },
      { id: 'AT-903', flowStage: 'atendimento', title: 'Lojas Americanas', contato: 'Claudio Souza (Expansão)', canal: 'WhatsApp', subtitle: 'Adesivação em Massa de PDV Campanha Junina', sector: 'impressao-digital', status: 'Retornado', date: '2026-06-01', extraInfo: 'Plotagem de adesivos vinílicos foscos para vitrine de 15 lojas na região metropolitana.', value: 22000.00 },
      { id: 'AT-904', flowStage: 'atendimento', title: 'Inovação Arquitetura', contato: 'Juliana Paes', canal: 'Telefone', subtitle: 'Letreiros Monobloco Decorativos impressos em 3D', sector: 'impressao-3d', status: 'Finalizado', date: '2026-05-28', extraInfo: 'Prototipia de caracteres corporativos tridimensionais complexos com filamento PETG fosco e retroiluminação.', value: 1900.00 },
      { id: 'AT-905', flowStage: 'atendimento', title: 'Supermercados Pão de Açúcar', contato: 'Ronaldo Santos', canal: 'Presencial', subtitle: 'Sinalização Direcional Interna de Gondolas', sector: 'comunicacao-visual', status: 'Em Proposta', date: '2026-05-30', extraInfo: 'Fabricação de placas aéreas em PVC de 3mm com impressão digital direta UV.', value: 3500.00 }
    ];

    const initialDeals: UnifiedItem[] = [
      { id: 'D-101', flowStage: 'funil', title: 'Grupo RZK', subtitle: 'Fachada ACM Brilhante com LEDs Internos RGB', value: 14850.00, probabilidade: 60, sector: 'comunicacao-visual', status: 'Análise Técnica', date: '2026-06-02', diasInativo: 3, alertas: 1 },
      { id: 'D-102', flowStage: 'funil', title: 'Everton Robson', subtitle: 'Corte de Letras Maciças PVC Expandido 20mm', value: 4800.00, probabilidade: 80, sector: 'corte-cnc', status: 'Elaboração Proposta', date: '2026-06-01', diasInativo: 1, alertas: 0 },
      { id: 'D-103', flowStage: 'funil', title: 'Prefeitura de Itapetininga', subtitle: 'Adesivação e Envelopamento de Ambulâncias da Frota', value: 22000.00, probabilidade: 40, sector: 'impressao-digital', status: 'Prospecção', date: '2026-05-28', diasInativo: 5, alertas: 3 },
      { id: 'D-104', flowStage: 'funil', title: 'Lincoln Electric', subtitle: 'Matriz e Gabaritos em Filamento Alto Impacto', value: 1900.00, probabilidade: 90, sector: 'impressao-3d', status: 'Pronto (Ganho)', date: '2026-06-02', diasInativo: 0, alertas: 0 },
      { id: 'D-105', flowStage: 'funil', title: 'E3Corp Engenharia', subtitle: 'Estruturação de Painéis de Divisas Metálicos', value: 31200.00, probabilidade: 70, sector: 'corte-cnc', status: 'Follow-up', date: '2026-05-31', diasInativo: 2, alertas: 1 },
      { id: 'D-106', flowStage: 'funil', title: 'Arquiteto Bruno', subtitle: 'Protetor Luminoso em Acrílico de Dupla Curvatura', value: 3500.00, probabilidade: 95, sector: 'impressao-3d', status: 'Elaboração Proposta', date: '2026-06-01', diasInativo: 1, alertas: 0 },
      { id: 'D-107', flowStage: 'funil', title: 'Piimo Arquitetura', subtitle: 'Lonas Frontlight com Acabamento em Ganchos', value: 8900.00, probabilidade: 50, sector: 'impressao-digital', status: 'Contato Inicial', date: '2026-05-29', diasInativo: 4, alertas: 0 }
    ];

    const initialProjs: UnifiedItem[] = [
      { id: 'PROJ-601', flowStage: 'projetos', title: 'Shopping Center Norte', subtitle: 'Retrofit Fachada ACM Premium', sector: 'comunicacao-visual', teamMember: 'Gabriel F.', status: 'Briefing', date: '2026-06-15', dimensoes: '12.4 x 3.2 m', materialPrincipal: 'Bandejas ACM 4mm, Estrutura Aço Metalon' },
      { id: 'PROJ-602', flowStage: 'projetos', title: 'Metalúrgica Alvorada', subtitle: 'Nesting de Divisórias Acústicas', sector: 'corte-cnc', teamMember: 'Amanda R.', status: 'Em Vetorização', date: '2026-06-10', dimensoes: '2.44 x 1.22 m (18 Placas)', materialPrincipal: 'Acrílico Cristal 8mm' },
      { id: 'PROJ-603', flowStage: 'projetos', title: 'Lojas Americanas', subtitle: 'Impressão de Painel Backlight UV', sector: 'impressao-digital', teamMember: 'Gabriel F.', status: 'Aprovado Pelo Cliente', date: '2026-06-08', dimensoes: '6.00 x 2.00 m', materialPrincipal: 'Lona Translúcida 440g' },
      { id: 'PROJ-604', flowStage: 'projetos', title: 'Inovação Arquitetura', subtitle: 'Letras Monobloco com Vedação', sector: 'impressao-3d', teamMember: 'Carlos O.', status: 'Ajuste Solicitado', date: '2026-06-18', dimensoes: 'Altura Caracteres: 45 cm', materialPrincipal: 'PLA Carbono e Base em PVC' }
    ];

    const initialOrcs: UnifiedItem[] = [
      { id: 'ORC-2201', flowStage: 'orcamentos', title: 'Grupo RZK', value: 14850.00, sector: 'comunicacao-visual', status: 'Aprovado', date: '2026-05-25', itens: [{ nome: 'Fachada ACM Estrutura inclusa Galvanizada', qtd: 1, valorUnit: 11000 }, { nome: 'Módulos LED RGB Alta Potência', qtd: 70, valorUnit: 55 }] },
      { id: 'ORC-2202', flowStage: 'orcamentos', title: 'Everton Robson', value: 4805.00, sector: 'corte-cnc', status: 'Enviado', date: '2026-05-28', itens: [{ nome: 'Fresagem Letras PVC Expandido 20mm', qtd: 45, valorUnit: 85 }, { nome: 'Insumo PVC Sobra Placa Nesting', qtd: 2, valorUnit: 490 }] },
      { id: 'ORC-2203', flowStage: 'orcamentos', title: 'Prefeitura de Itapetininga', value: 22000.00, sector: 'impressao-digital', status: 'Em Elaboração', date: '2026-06-01', itens: [{ nome: 'Envelopamento Completo Ambulância Película Calandrada', qtd: 4, valorUnit: 5500 }] },
      { id: 'ORC-2204', flowStage: 'orcamentos', title: 'Lincoln Electric', value: 1900.00, sector: 'impressao-3d', status: 'Aprovado', date: '2026-05-15', itens: [{ nome: 'Impressão 3D PETG Peças de Desgaste Engrenagem', qtd: 10, valorUnit: 190 }] }
    ];

    const initialOS: UnifiedItem[] = [
      { id: 'OS-401', flowStage: 'ordem-servicos', title: 'Grupo RZK', subtitle: 'Fachada ACM Iluminada', sector: 'comunicacao-visual', status: 'Producao', date: '2026-06-12', numeroOS: 'OS-2026-8091', orcamentoId: 'ORC-2201' },
      { id: 'OS-402', flowStage: 'ordem-servicos', title: 'Lincoln Electric', subtitle: 'Engrenagens PETG Tridimensional', sector: 'impressao-3d', status: 'Aguardando Arquivos', date: '2026-06-05', numeroOS: 'OS-2026-8092', orcamentoId: 'ORC-2204' },
      { id: 'OS-403', flowStage: 'ordem-servicos', title: 'Everton Robson', subtitle: 'Letras PVC CNC Corte', sector: 'corte-cnc', status: 'Preparacao', date: '2026-06-10', numeroOS: 'OS-2026-8093', orcamentoId: 'ORC-2202' },
      { id: 'OS-404', flowStage: 'ordem-servicos', title: 'Pref. Itapetininga', subtitle: 'Envelopamento de Ambulância', sector: 'impressao-digital', status: 'Producao', date: '2026-06-15', numeroOS: 'OS-2026-8094', orcamentoId: 'ORC-2203' }
    ];

    const initialCampanhas: UnifiedItem[] = [
      { id: 'CAMP-01', flowStage: 'campanhas', title: 'Campanha Retrofit ACM 2026', sector: 'comunicacao-visual', value: 3500.00, leadsGerados: 48, conversao: 15, status: 'Ativa', roi: 4.2 },
      { id: 'CAMP-02', flowStage: 'campanhas', title: 'Nesting Promocional de Chapas em Router', sector: 'corte-cnc', value: 1800.00, leadsGerados: 32, conversao: 22, status: 'Ativa', roi: 5.6 },
      { id: 'CAMP-03', flowStage: 'campanhas', title: 'Envelopamento Corporativo UV de Frotas', sector: 'impressao-digital', value: 4200.00, leadsGerados: 25, conversao: 10, status: 'Pausada', roi: 3.1 },
      { id: 'CAMP-04', flowStage: 'campanhas', title: 'Letras Monobloco em Filamento de Alta Fusão', sector: 'impressao-3d', value: 1200.00, leadsGerados: 18, conversao: 28, status: 'Ativa', roi: 6.2 }
    ];

    const initialClientes: UnifiedItem[] = [
      { id: 'CLI-01', flowStage: 'clientes', title: 'Shopping Center Norte', subtitle: 'Shopping e Varejo de Rede', value: 125000.00, status: 'WhatsApp Corporativo', date: '2026-06-01', sector: 'comunicacao-visual', teamMember: 'Adams Leandro', segmento: 'Shopping e Varejo de Rede', canalPreferido: 'WhatsApp Corporativo', ltv: 125000.00, ultimoContato: '2026-06-01', setorPrincipal: 'comunicacao-visual' },
      { id: 'CLI-02', flowStage: 'clientes', title: 'Metalúrgica Alvorada', subtitle: 'Sub-Usinagem e Estruturas Metálicas', value: 38200.00, status: 'E-mail Comercial', date: '2026-05-31', sector: 'corte-cnc', teamMember: 'Adams Leandro', segmento: 'Sub-Usinagem e Estruturas Metálicas', canalPreferido: 'E-mail Comercial', ltv: 38200.00, ultimoContato: '2026-05-31', setorPrincipal: 'corte-cnc' },
      { id: 'CLI-03', flowStage: 'clientes', title: 'Lojas Americanas S/A', subtitle: 'Supermercados e Grande Varejo', value: 89600.00, status: 'WhatsApp Corporativo', date: '2026-06-01', sector: 'impressao-digital', teamMember: 'Adams Leandro', segmento: 'Supermercados e Grande Varejo', canalPreferido: 'WhatsApp Corporativo', ltv: 89600.00, ultimoContato: '2026-06-01', setorPrincipal: 'impressao-digital' },
      { id: 'CLI-04', flowStage: 'clientes', title: 'Inovação Arquitetura & Interiores', subtitle: 'Escritórios de Arquitetura de Luxo', value: 15400.00, status: 'Ligação Telefônica', date: '2026-05-28', sector: 'impressao-3d', teamMember: 'Adams Leandro', segmento: 'Escritórios de Arquitetura de Luxo', canalPreferido: 'Ligação Telefônica', ltv: 15400.00, ultimoContato: '2026-05-28', setorPrincipal: 'impressao-3d' },
      { id: 'CLI-05', flowStage: 'clientes', title: 'Lincoln Electric Tecnologia', subtitle: 'Indústria Pesada e Soldagem', value: 21000.00, status: 'E-mail Comercial', date: '2026-05-15', sector: 'impressao-3d', teamMember: 'Adams Leandro', segmento: 'Indústria Pesada e Soldagem', canalPreferido: 'E-mail Comercial', ltv: 21000.00, ultimoContato: '2026-05-15', setorPrincipal: 'impressao-3d' }
    ];

    const initialFtp: UnifiedItem[] = [
      { id: 'F-1', flowStage: 'ftp-arquivos', title: 'fachada-rzk-painel-esquema-v3.dwg', subtitle: 'Adams Leandro (Comercial)', status: 'DWG', date: '2026-05-30', sector: 'comunicacao-visual', teamMember: 'Adams Leandro (Comercial)', value: 0, osId: 'OS-401', nomeArquivo: 'fachada-rzk-painel-esquema-v3.dwg', tamanho: '4.8 MB', extensao: 'dwg', enviadoPor: 'Adams Leandro (Comercial)', dataEnvio: '2026-05-30' },
      { id: 'F-2', flowStage: 'ftp-arquivos', title: 'detalhamento-solda-estrutura.pdf', subtitle: 'Carlos M. (Projetista)', status: 'PDF', date: '2026-05-31', sector: 'comunicacao-visual', teamMember: 'Carlos M. (Projetista)', value: 0, osId: 'OS-401', nomeArquivo: 'detalhamento-solda-estrutura.pdf', tamanho: '1.2 MB', extensao: 'pdf', enviadoPor: 'Carlos M. (Projetista)', dataEnvio: '2026-05-31' },
      { id: 'F-3', flowStage: 'ftp-arquivos', title: 'engrenagem-cura-modelo-petg.stl', subtitle: 'Cliente Lincoln', status: 'STL', date: '2026-05-29', sector: 'impressao-3d', teamMember: 'Cliente Lincoln', value: 0, osId: 'OS-402', nomeArquivo: 'engrenagem-cura-modelo-petg.stl', tamanho: '18.4 MB', extensao: 'stl', enviadoPor: 'Cliente Lincoln', dataEnvio: '2026-05-29' },
      { id: 'F-4', flowStage: 'ftp-arquivos', title: 'letras_pvc_espandido_fresa_6mm.dxf', subtitle: 'Everton R. (Vendedor)', status: 'DXF', date: '2026-06-01', sector: 'corte-cnc', teamMember: 'Everton R. (Vendedor)', value: 0, osId: 'OS-403', nomeArquivo: 'letras_pvc_espandido_fresa_6mm.dxf', tamanho: '950 KB', extensao: 'dxf', enviadoPor: 'Everton R. (Vendedor)', dataEnvio: '2026-06-01' },
      { id: 'F-5', flowStage: 'ftp-arquivos', title: 'ambulancia_lateral_vetor.pdf', subtitle: 'Pedro A. (Mkt)', status: 'PDF', date: '2026-05-28', sector: 'impressao-digital', teamMember: 'Pedro A. (Mkt)', value: 0, osId: 'OS-404', nomeArquivo: 'ambulancia_lateral_vetor.pdf', tamanho: '12.5 MB', extensao: 'pdf', enviadoPor: 'Pedro A. (Mkt)', dataEnvio: '2026-05-28' }
    ];

    return [
      ...initialAtends,
      ...initialDeals,
      ...initialProjs,
      ...initialOrcs,
      ...initialOS,
      ...initialCampanhas,
      ...initialClientes,
      ...initialFtp
    ];
  });

  const updateItemsForStage = (stage: string, value: any) => {
    setUnifiedFlowItems(prevAll => {
      const currentItemsOfStage = prevAll.filter(x => x.flowStage === stage);
      let updatedItemsOfStageRaw: any[];
      if (typeof value === 'function') {
        let mappedCurrent: any[];
        switch (stage) {
          case 'atendimento':
            mappedCurrent = currentItemsOfStage.map(mapUnifiedToAtendimento); break;
          case 'funil':
            mappedCurrent = currentItemsOfStage.map(mapUnifiedToDeal); break;
          case 'projetos':
            mappedCurrent = currentItemsOfStage.map(mapUnifiedToProjeto); break;
          case 'orcamentos':
            mappedCurrent = currentItemsOfStage.map(mapUnifiedToOrcamento); break;
          case 'ordem-servicos':
            mappedCurrent = currentItemsOfStage.map(mapUnifiedToOS); break;
          case 'campanhas':
            mappedCurrent = currentItemsOfStage.map(mapUnifiedToCampanha); break;
          case 'clientes':
            mappedCurrent = currentItemsOfStage.map(mapUnifiedToClient); break;
          case 'ftp-arquivos':
            mappedCurrent = currentItemsOfStage.map(mapUnifiedToFTPFile); break;
          default:
            mappedCurrent = currentItemsOfStage;
        }
        updatedItemsOfStageRaw = value(mappedCurrent);
      } else {
        updatedItemsOfStageRaw = value;
      }
      
      const updatedUnifiedOfStage = updatedItemsOfStageRaw.map(item => {
        switch (stage) {
          case 'atendimento':
            return mapAtendimentoToUnified(item);
          case 'funil':
            return mapDealToUnified(item);
          case 'projetos':
            return mapProjetoToUnified(item);
          case 'orcamentos':
            return mapOrcamentoToUnified(item);
          case 'ordem-servicos':
            return mapOSToUnified(item);
          case 'campanhas':
            return mapCampanhaToUnified(item);
          case 'clientes':
            return mapClientToUnified(item);
          case 'ftp-arquivos':
            return mapFTPFileToUnified(item);
          default:
            return item;
        }
      });
      
      const otherItems = prevAll.filter(x => x.flowStage !== stage);
      return [...otherItems, ...updatedUnifiedOfStage];
    });
  };

  // Derived state selectors mimicking standard React states
  const atendimentos = useMemo(() => unifiedFlowItems.filter(x => x.flowStage === 'atendimento').map(mapUnifiedToAtendimento), [unifiedFlowItems]);
  const setAtendimentos = (v: any) => updateItemsForStage('atendimento', v);

  const deals = useMemo(() => unifiedFlowItems.filter(x => x.flowStage === 'funil').map(mapUnifiedToDeal), [unifiedFlowItems]);
  const setDeals = (v: any) => updateItemsForStage('funil', v);

  const projetos = useMemo(() => unifiedFlowItems.filter(x => x.flowStage === 'projetos').map(mapUnifiedToProjeto), [unifiedFlowItems]);
  const setProjetos = (v: any) => updateItemsForStage('projetos', v);

  const orcamentos = useMemo(() => unifiedFlowItems.filter(x => x.flowStage === 'orcamentos').map(mapUnifiedToOrcamento), [unifiedFlowItems]);
  const setOrcamentos = (v: any) => updateItemsForStage('orcamentos', v);

  const ordensServico = useMemo(() => unifiedFlowItems.filter(x => x.flowStage === 'ordem-servicos').map(mapUnifiedToOS), [unifiedFlowItems]);
  const setOrdensServico = (v: any) => updateItemsForStage('ordem-servicos', v);

  const campanhas = useMemo(() => unifiedFlowItems.filter(x => x.flowStage === 'campanhas').map(mapUnifiedToCampanha), [unifiedFlowItems]);
  const setCampanhas = (v: any) => updateItemsForStage('campanhas', v);

  const clientes = useMemo(() => unifiedFlowItems.filter(x => x.flowStage === 'clientes').map(mapUnifiedToClient), [unifiedFlowItems]);
  const setClientes = (v: any) => updateItemsForStage('clientes', v);

  const ftpFiles = useMemo(() => unifiedFlowItems.filter(x => x.flowStage === 'ftp-arquivos').map(mapUnifiedToFTPFile), [unifiedFlowItems]);
  const setFtpFiles = (v: any) => updateItemsForStage('ftp-arquivos', v);

  const [newAtendCliente, setNewAtendCliente] = useState('');
  const [newAtendAssunto, setNewAtendAssunto] = useState('');
  const [newAtendSetor, setNewAtendSetor] = useState<SectorType>('comunicacao-visual');
  const [newAtendCanal, setNewAtendCanal] = useState<'WhatsApp' | 'Telefone' | 'E-mail' | 'Presencial'>('WhatsApp');
  const [newAtendDesc, setNewAtendDesc] = useState('');
  const [editingAtendimento, setEditingAtendimento] = useState<Atendimento | null>(null);

  const handleAddAtendimento = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAtendCliente || !newAtendAssunto) {
      alert('Por favor, digite o nome do cliente e do projeto/assunto.');
      return;
    }
    const novo: Atendimento = {
      id: `AT-${Math.floor(100 + Math.random() * 900)}`,
      cliente: newAtendCliente,
      contato: 'Contato Registrado via Korteck CRM',
      canal: newAtendCanal,
      assunto: newAtendAssunto,
      setor: newAtendSetor,
      status: 'Pendente',
      data: new Date().toISOString().split('T')[0],
      descricao: newAtendDesc || 'Sem descrição detalhada inserida.'
    };
    setAtendimentos([novo, ...atendimentos]);
    setNewAtendCliente('');
    setNewAtendAssunto('');
    setNewAtendDesc('');
    alert('Atendimento comercial inicial cadastrado com sucesso!');
  };

  const moveDeal = (id: string, novoEstagio: Deal['estagio']) => {
    setDeals((prevDeals: Deal[]) => 
      prevDeals.map(d => d.id === id ? { ...d, estagio: novoEstagio } : d)
    );
  };

  const [newProjTitulo, setNewProjTitulo] = useState('');
  const [newProjCliente, setNewProjCliente] = useState('');
  const [newProjSetor, setNewProjSetor] = useState<SectorType>('comunicacao-visual');
  const [newProjDimensoes, setNewProjDimensoes] = useState('');
  const [newProjDificuldade, setNewProjDificuldade] = useState<number>(3);
  const [newProjPrioridade, setNewProjPrioridade] = useState<number>(3);
  const [newProjUnidadeLoja, setNewProjUnidadeLoja] = useState('');
  const [newProjResponsavelComercial, setNewProjResponsavelComercial] = useState('');
  const [newProjDesignerResponsavel, setNewProjDesignerResponsavel] = useState('Gabriel F.');
  const [newProjPrazo, setNewProjPrazo] = useState('');
  const [newProjValor, setNewProjValor] = useState<number>(0);
  const [newProjLinkPasta, setNewProjLinkPasta] = useState('');
  const [newProjUrgente, setNewProjUrgente] = useState<boolean>(false);
  const [newProjBriefingText, setNewProjBriefingText] = useState('');
  const [newProjActiveTab, setNewProjActiveTab] = useState<'geral' | 'produtos' | 'arquivos' | 'historico' | 'performance' | 'notas'>('geral');
  const createNewDefaultProduct = () => ({
    id: `PROD-${Math.floor(100 + Math.random() * 900)}`,
    nome: 'Novo produto',
    name: 'Novo produto',
    category: '',
    categoria: '',
    qtd: 1,
    quantity: 1,
    material: '',
    width: '',
    largura: '',
    height: '',
    altura: '',
    structure: '',
    estrutura: '',
    finish: '',
    acabamento: '',
    installationType: '',
    tipoInstalacao: '',
    applicationPlace: '',
    localAplicacao: '',
    lighting: false,
    iluminacao: false,
    designer: 'Adams Leandro Alves Pereira',
    designerProjetista: '',
    projetista: '',
    productionResponsavel: '',
    producao: '',
    assembler: '',
    instalador: '',
    technicalStatus: 'Em andamento',
    statusTecnico: 'Em andamento',
    observations: '',
    observacoes: ''
  });

  const [newProjProdutosList, setNewProjProdutosList] = useState<any[]>([
    {
      id: 'PROD-101',
      nome: 'Novo produto',
      name: 'Novo produto',
      category: '',
      categoria: '',
      qtd: 1,
      quantity: 1,
      material: '',
      width: '',
      largura: '',
      height: '',
      altura: '',
      structure: '',
      estrutura: '',
      finish: '',
      acabamento: '',
      installationType: '',
      tipoInstalacao: '',
      applicationPlace: '',
      localAplicacao: '',
      lighting: false,
      iluminacao: false,
      designer: 'Adams Leandro Alves Pereira',
      designerProjetista: '',
      projetista: '',
      productionResponsavel: '',
      producao: '',
      assembler: '',
      instalador: '',
      technicalStatus: 'Em andamento',
      statusTecnico: 'Em andamento',
      observations: '',
      observacoes: ''
    }
  ]);
  const [newProjSelectedProdIndex, setNewProjSelectedProdIndex] = useState<number>(0);
  const [selectedProjSelectedProdIndex, setSelectedProjSelectedProdIndex] = useState<number>(0);
  const [newProjArquivosList, setNewProjArquivosList] = useState<OSFile[]>([]);
  const [newProjHistorico, setNewProjHistorico] = useState<string[]>([]);
  const [newProjNotas, setNewProjNotas] = useState<string>('');

  // Selected project for editing/viewing
  const [selectedProjeto, setSelectedProjeto] = useState<ProjetoBrief | null>(null);
  const [editProjActiveTab, setEditProjActiveTab] = useState<'geral' | 'produtos' | 'arquivos' | 'historico' | 'performance' | 'notes' | 'notas'>('geral');
  const [tempProductNome, setTempProductNome] = useState('');
  const [tempProductQtd, setTempProductQtd] = useState(1);

  const updateNewProductField = (index: number, field: string, value: any) => {
    setNewProjProdutosList(prev => prev.map((p, idx) => {
      if (idx === index) {
        return {
          ...p,
          [field]: value,
          ...(field === 'nome' ? { name: value } : {}),
          ...(field === 'name' ? { nome: value } : {}),
          ...(field === 'qtd' ? { quantity: Number(value) || 0 } : {}),
          ...(field === 'quantity' ? { qtd: Number(value) || 0 } : {}),
          ...(field === 'categoria' ? { category: value } : {}),
          ...(field === 'category' ? { categoria: value } : {}),
          ...(field === 'largura' ? { width: value } : {}),
          ...(field === 'width' ? { largura: value } : {}),
          ...(field === 'altura' ? { height: value } : {}),
          ...(field === 'height' ? { altura: value } : {}),
          ...(field === 'estrutura' ? { structure: value } : {}),
          ...(field === 'structure' ? { estrutura: value } : {}),
          ...(field === 'acabamento' ? { finish: value } : {}),
          ...(field === 'finish' ? { acabamento: value } : {}),
          ...(field === 'tipoInstalacao' ? { installationType: value } : {}),
          ...(field === 'installationType' ? { tipoInstalacao: value } : {}),
          ...(field === 'localAplicacao' ? { applicationPlace: value } : {}),
          ...(field === 'applicationPlace' ? { localAplicacao: value } : {}),
          ...(field === 'iluminacao' ? { lighting: value } : {}),
          ...(field === 'lighting' ? { iluminacao: value } : {}),
          ...(field === 'projetista' ? { designerProjetista: value } : {}),
          ...(field === 'designerProjetista' ? { projetista: value } : {}),
          ...(field === 'producao' ? { productionResponsavel: value } : {}),
          ...(field === 'productionResponsavel' ? { producao: value } : {}),
          ...(field === 'instalador' ? { assembler: value } : {}),
          ...(field === 'assembler' ? { instalador: value } : {}),
          ...(field === 'statusTecnico' ? { technicalStatus: value } : {}),
          ...(field === 'technicalStatus' ? { statusTecnico: value } : {}),
          ...(field === 'observacoes' ? { observations: value } : {}),
          ...(field === 'observations' ? { observacoes: value } : {})
        };
      }
      return p;
    }));
  };

  const updateSelectedProductField = (index: number, field: string, value: any) => {
    if (!selectedProjeto) return;
    const updatedProdutos = (selectedProjeto.produtos || []).map((p, idx) => {
      if (idx === index) {
        return {
          ...p,
          [field]: value,
          ...(field === 'nome' ? { name: value } : {}),
          ...(field === 'name' ? { nome: value } : {}),
          ...(field === 'qtd' ? { quantity: Number(value) || 0 } : {}),
          ...(field === 'quantity' ? { qtd: Number(value) || 0 } : {}),
          ...(field === 'categoria' ? { category: value } : {}),
          ...(field === 'category' ? { categoria: value } : {}),
          ...(field === 'largura' ? { width: value } : {}),
          ...(field === 'width' ? { largura: value } : {}),
          ...(field === 'altura' ? { height: value } : {}),
          ...(field === 'height' ? { altura: value } : {}),
          ...(field === 'estrutura' ? { structure: value } : {}),
          ...(field === 'structure' ? { estrutura: value } : {}),
          ...(field === 'acabamento' ? { finish: value } : {}),
          ...(field === 'finish' ? { acabamento: value } : {}),
          ...(field === 'tipoInstalacao' ? { installationType: value } : {}),
          ...(field === 'installationType' ? { tipoInstalacao: value } : {}),
          ...(field === 'localAplicacao' ? { applicationPlace: value } : {}),
          ...(field === 'applicationPlace' ? { localAplicacao: value } : {}),
          ...(field === 'iluminacao' ? { lighting: value } : {}),
          ...(field === 'lighting' ? { iluminacao: value } : {}),
          ...(field === 'projetista' ? { designerProjetista: value } : {}),
          ...(field === 'designerProjetista' ? { projetista: value } : {}),
          ...(field === 'producao' ? { productionResponsavel: value } : {}),
          ...(field === 'productionResponsavel' ? { producao: value } : {}),
          ...(field === 'instalador' ? { assembler: value } : {}),
          ...(field === 'assembler' ? { instalador: value } : {}),
          ...(field === 'statusTecnico' ? { technicalStatus: value } : {}),
          ...(field === 'technicalStatus' ? { statusTecnico: value } : {}),
          ...(field === 'observacoes' ? { observations: value } : {}),
          ...(field === 'observations' ? { observacoes: value } : {})
        };
      }
      return p;
    });
    setSelectedProjeto({
      ...selectedProjeto,
      produtos: updatedProdutos
    });
  };

  const handleAddProjeto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjCliente) {
      alert('Por favor, informe no mínimo o nome do cliente.');
      return;
    }
    const derivedTitulo = newProjTitulo || `Briefing ${newProjCliente}${newProjUnidadeLoja ? ` - ${newProjUnidadeLoja}` : ''}`;
    const newId = `PROJ-${Math.floor(605 + Math.random() * 200)}`;
    const nowStr = new Date().toISOString().split('T')[0];

    const novo: ProjetoBrief = {
      id: newId,
      titulo: derivedTitulo,
      cliente: newProjCliente,
      setor: newProjSetor,
      designer: newProjDesignerResponsavel || 'Gabriel F.',
      status: 'Briefing',
      prazo: newProjPrazo || 'Em definição comercial',
      dimensoes: newProjDimensoes || 'Sob medição no local',
      materialPrincipal: 'A definir operacionalmente',
      valor: newProjValor,
      dificuldade: newProjDificuldade,
      prioridadeForm: newProjPrioridade,
      unidadeLoja: newProjUnidadeLoja,
      responsavelComercial: newProjResponsavelComercial,
      designerResponsavel: newProjDesignerResponsavel,
      linkPasta: newProjLinkPasta,
      urgente: newProjUrgente,
      briefing: newProjBriefingText,
      produtos: newProjProdutosList.map(p => ({
        id: p.id,
        nome: p.nome || p.name || 'Novo produto',
        name: p.nome || p.name || 'Novo produto',
        category: p.categoria || p.category || '',
        categoria: p.categoria || p.category || '',
        qtd: p.qtd !== undefined ? p.qtd : (p.quantity || 1),
        quantity: p.qtd !== undefined ? p.qtd : (p.quantity || 1),
        material: p.material || '',
        width: p.largura || p.width || '',
        largura: p.largura || p.width || '',
        height: p.altura || p.height || '',
        altura: p.altura || p.height || '',
        structure: p.estrutura || p.structure || '',
        estrutura: p.estrutura || p.structure || '',
        finish: p.acabamento || p.finish || '',
        acabamento: p.acabamento || p.finish || '',
        installationType: p.tipoInstalacao || p.installationType || '',
        tipoInstalacao: p.tipoInstalacao || p.installationType || '',
        applicationPlace: p.localAplicacao || p.applicationPlace || '',
        localAplicacao: p.localAplicacao || p.applicationPlace || '',
        lighting: p.iluminacao !== undefined ? p.iluminacao : (p.lighting || false),
        iluminacao: p.iluminacao !== undefined ? p.iluminacao : (p.lighting || false),
        designer: p.designer || 'Adams Leandro Alves Pereira',
        designerProjetista: p.projetista || p.designerProjetista || '',
        projetista: p.projetista || p.designerProjetista || '',
        productionResponsavel: p.producao || p.productionResponsavel || '',
        producao: p.producao || p.productionResponsavel || '',
        assembler: p.instalador || p.assembler || '',
        instalador: p.instalador || p.assembler || '',
        technicalStatus: p.statusTecnico || p.technicalStatus || 'Em andamento',
        statusTecnico: p.statusTecnico || p.technicalStatus || 'Em andamento',
        observations: p.observacoes || p.observations || '',
        observacoes: p.observacoes || p.observations || ''
      })),
      arquivos: newProjArquivosList,
      historico: [
        `${nowStr}: Briefing de arte criado sob nível ${newProjPrioridade} de prioridade por ${newProjResponsavelComercial || 'Comercial'}`
      ],
      notas: newProjNotas
    };

    setProjetos([novo, ...projetos]);
    
    // Reset all states
    setNewProjTitulo('');
    setNewProjCliente('');
    setNewProjDimensoes('');
    setNewProjDificuldade(3);
    setNewProjPrioridade(3);
    setNewProjUnidadeLoja('');
    setNewProjResponsavelComercial('');
    setNewProjDesignerResponsavel('Gabriel F.');
    setNewProjPrazo('');
    setNewProjValor(0);
    setNewProjLinkPasta('');
    setNewProjUrgente(false);
    setNewProjBriefingText('');
    setNewProjActiveTab('geral');
    setNewProjProdutosList([createNewDefaultProduct()]);
    setNewProjSelectedProdIndex(0);
    setNewProjArquivosList([]);
    setNewProjNotas('');
  };

  // --- 4. ESTADO DOS ORÇAMENTOS ---
  const [newOrcCliente, setNewOrcCliente] = useState('');
  const [newOrcValor, setNewOrcValor] = useState('');
  const [newOrcSetor, setNewOrcSetor] = useState<SectorType>('comunicacao-visual');

  const handleCreateOrcamento = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrcCliente || !newOrcValor) {
      alert('Insira cliente e valor base!');
      return;
    }
    const valFloat = parseFloat(newOrcValor);
    const novo: Orcamento = {
      id: `ORC-${Math.floor(2205 + Math.random() * 100)}`,
      cliente: newOrcCliente,
      valorTotal: valFloat,
      setor: newOrcSetor,
      status: 'Em Elaboração',
      dataEmissao: new Date().toISOString().split('T')[0],
      itens: [{ nome: 'Serviço sob orçamento técnico de comunicação visual', qtd: 1, valorUnit: valFloat }]
    };
    setOrcamentos([novo, ...orcamentos]);
    setNewOrcCliente('');
    setNewOrcValor('');
    alert('Orçamento inserido na base para elaboração e faturamento fiscal.');
  };

  // --- 5. ESTADO DAS ORDENS DE SERVIÇO (O.S.) ---
  const updateOSStatus = (id: string, novoStatus: OSOrd['status']) => {
    setOrdensServico((prev: OSOrd[]) => prev.map(os => os.id === id ? { ...os, status: novoStatus } : os));
  };

  // --- 6. ESTADO DAS CAMPANHAS / ARTE FINALISTA ---
  const [newCampName, setNewCampName] = useState('');
  const [newCampSetor, setNewCampSetor] = useState<SectorType>('comunicacao-visual');
  const [newCampInv, setNewCampInv] = useState('');

  const handleAddCampanha = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampName || !newCampInv) return;
    const novo: Campanha = {
      id: `CAMP-${Math.floor(10 + Math.random() * 90)}`,
      nome: newCampName,
      setor: newCampSetor,
      investimento: parseFloat(newCampInv),
      leadsGerados: 0,
      conversao: 0,
      status: 'Ativa',
      roi: 0
    };
    setCampanhas([novo, ...campanhas]);
    setNewCampName('');
    setNewCampInv('');
  };

  // --- 7. ESTADO DOS CLIENTES ---
  const [searchClientQuery, setSearchClientQuery] = useState('');

  // --- 8. ESTADO DOS ARQUIVOS FTP POR ORDEM DE SERVIÇO ---
  const [selectedOSForFTP, setSelectedOSForFTP] = useState<string>('OS-401');
  const [newSimulatedFileName, setNewSimulatedFileName] = useState('');
  const [newSimulatedFileExt, setNewSimulatedFileExt] = useState<'dxf' | 'dwg' | 'stl' | 'pdf' | 'cdr' | 'ai'>('dwg');

  const handleSimulateUploadFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSimulatedFileName.trim()) {
      alert('Digite o nome do arquivo fictício para simulação de upload técnico ao FTP.');
      return;
    }
    const matchedOS = ordensServico.find(o => o.id === selectedOSForFTP);
    const novo: FTPFile = {
      id: `F-${Math.floor(6 + Math.random() * 100)}`,
      osId: selectedOSForFTP,
      nomeArquivo: `${newSimulatedFileName.replaceAll(' ', '_').toLowerCase()}.${newSimulatedFileExt}`,
      tamanho: `${(0.5 + Math.random() * 20).toFixed(1)} MB`,
      extensao: newSimulatedFileExt,
      setor: matchedOS ? matchedOS.setor : 'comunicacao-visual',
      enviadoPor: 'Adams Leandro (Suporte Comercial)',
      dataEnvio: new Date().toISOString().split('T')[0]
    };
    setFtpFiles([...ftpFiles, novo]);
    setNewSimulatedFileName('');
    alert('Arquivo técnico carregado no repositório de O.S. com sucesso (FTP Korteck ativado)!');
  };

  const getSetorLabel = (s: SectorType) => {
    switch (s) {
      case 'comunicacao-visual': return 'Comunicação Visual';
      case 'corte-cnc': return 'Corte CNC (Router/Laser)';
      case 'impressao-digital': return 'Impressão Digital';
      case 'impressao-3d': return 'Impressão 3D';
    }
  };

  const getSetorColor = (s: SectorType) => {
    switch (s) {
      case 'comunicacao-visual': return 'bg-indigo-600 border-indigo-500 text-white';
      case 'corte-cnc': return 'bg-emerald-600 border-emerald-500 text-white';
      case 'impressao-digital': return 'bg-pink-600 border-pink-500 text-white';
      case 'impressao-3d': return 'bg-amber-600 border-amber-500 text-white';
    }
  };

  // --- FILTRAGENS COM BASE NO SETOR GLOBAL E PESQUISAS ---
  const filterBySector = <T extends { setor: SectorType }>(items: T[]): T[] => {
    if (selectedSector === 'all') return items;
    return items.filter(item => item.setor === selectedSector);
  };

  const visibleAtendimentos = filterBySector<Atendimento>(atendimentos);
  const visibleDeals = filterBySector<Deal>(deals);
  const visibleProjetos = filterBySector<ProjetoBrief>(projetos);
  const visibleOrcamentos = filterBySector<Orcamento>(orcamentos);
  const visibleOS = filterBySector<OSOrd>(ordensServico);
  const visibleCampanhas = filterBySector<Campanha>(campanhas);
  const visibleClientes = clientes.filter(c => {
    const matchesSetor = selectedSector === 'all' || c.setorPrincipal === selectedSector;
    const matchesSearch = (c.nome || '').toLowerCase().includes((searchClientQuery || '').toLowerCase()) || 
                          (c.segmento || '').toLowerCase().includes((searchClientQuery || '').toLowerCase());
    return matchesSetor && matchesSearch;
  });
  const visibleFTPFiles = ftpFiles.filter(f => {
    const matchesSetor = selectedSector === 'all' || f.setor === selectedSector;
    const matchesOS = f.osId === selectedOSForFTP;
    return matchesSetor && matchesOS;
  });

  // --- CONTROLES E ESTADOS EXCLUSIVOS CLICKUP ---
  const [clickupListMode, setClickupListMode] = useState<'detalhado' | 'grade'>('detalhado');
  
  // --- CONTROLES E ESTADOS EXCLUSIVOS GANTT OPERACIONAL ---
  const [customHours, setCustomHours] = useState<Record<string, string>>({
    'AT-901': '07:30',
    'AT-902': '11:00',
    'AT-903': '13:30',
    'D-101': '08:00',
    'D-102': '10:00',
    'D-103': '14:00',
    'PRJ-301': '09:00',
    'ORC-501': '15:00',
  });
  const [customDurations, setCustomDurations] = useState<Record<string, number>>({
    'AT-901': 2.5,
    'AT-902': 1.5,
    'AT-903': 3.0,
    'D-101': 2.0,
    'D-102': 4.0,
    'D-103': 1.5,
    'PRJ-301': 3.5,
  });
  const [customConnections, setCustomConnections] = useState<Array<{ from: string; to: string }>>([
    { from: 'AT-901', to: 'AT-902' },
    { from: 'D-101', to: 'D-102' }
  ]);
  const [selectedGanttTask, setSelectedGanttTask] = useState<string | null>(null);

  const [priorities, setPriorities] = useState<Record<string, 'Urgente' | 'Alta' | 'Normal' | 'Baixa'>>({
    'AT-901': 'Urgente',
    'AT-902': 'Normal',
    'AT-903': 'Alta',
    'D-101': 'Urgente',
    'D-102': 'Normal',
    'D-103': 'Alta',
    'PRJ-301': 'Normal',
    'ORC-501': 'Alta',
    'OS-401': 'Urgente',
    'MKT-801': 'Alta',
    'CLI-201': 'Normal',
    'F-1': 'Normal',
  });
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const [clickupSearch, setClickupSearch] = useState('');
  const [clickupPriorityFilter, setClickupPriorityFilter] = useState<string>('all');
  const [editingField, setEditingField] = useState<{ id: string; field: string } | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');
  const [quickAddInput, setQuickAddInput] = useState<Record<string, string>>({});

  // --- HELPER DE MAPEAMENTO UNIFICADO PARA AS VISUALIZAÇÕES TIPO CLICKUP ---
  const getRawUnifiedItems = (): UnifiedItem[] => {
    switch (activeTab) {
      case 'atendimento':
        return visibleAtendimentos.map((item, index) => ({
          id: item.id,
          title: item.cliente,
          subtitle: item.assunto,
          status: item.status,
          date: item.data,
          hour: `${7 + (index * 2)}:00`,
          sector: item.setor,
          teamMember: (item.contato || '').includes('Ana') ? 'Gabriel F.' : (item.contato || '').includes('Marcos') ? 'Amanda R.' : (item.contato || '').includes('Claudio') ? 'Carlos O.' : 'Adams Leandro',
          extraInfo: item.descricao,
          value: item.valor || 0,
          dificuldade: item.dificuldade,
          prioridadeForm: item.prioridadeForm,
          unidadeLoja: item.unidadeLoja,
          responsavelComercial: item.responsavelComercial,
          designerResponsavel: item.designerResponsavel,
          linkPasta: item.linkPasta,
          urgente: item.urgente,
          briefing: item.briefing,
          produtos: item.produtos,
          arquivos: item.arquivos,
          historico: item.historico,
          notas: item.notas
        }));
      case 'funil':
        return visibleDeals.map((item, index) => ({
          id: item.id,
          title: item.cliente,
          subtitle: item.projeto,
          status: item.estagio === 'captacao' ? 'Prospecção' :
                  item.estagio === 'contato' ? 'Contato Inicial' :
                  item.estagio === 'analise' ? 'Análise Técnica' :
                  item.estagio === 'proposta' ? 'Elaboração Proposta' :
                  item.estagio === 'followup' ? 'Follow-up' : 'Pronto (Ganho)',
          date: item.date || new Date().toISOString().split('T')[0],
          hour: `${8 + (index * 1.5)}:00`,
          sector: item.setor,
          teamMember: item.responsavelComercial || 'Adams Leandro',
          value: item.valor,
          dificuldade: item.dificuldade,
          prioridadeForm: item.prioridadeForm,
          unidadeLoja: item.unidadeLoja,
          responsavelComercial: item.responsavelComercial,
          designerResponsavel: item.designerResponsavel,
          linkPasta: item.linkPasta,
          urgente: item.urgente,
          briefing: item.briefing,
          produtos: item.produtos,
          arquivos: item.arquivos,
          historico: item.historico,
          notas: item.notas
        }));
      case 'projetos':
        return visibleProjetos.map((item, index) => {
          let d = item.prazo || '';
          if (d && d.includes('-')) {
            const pts = d.split('-');
            if (pts[2] && pts[2].length === 4) d = `${pts[2]}-${pts[1]}-${pts[0]}`;
          }
          return {
            id: item.id,
            title: item.titulo,
            subtitle: item.cliente,
            status: item.status,
            date: d,
            hour: `${9 + (index * 2)}:00`,
            sector: item.setor,
            teamMember: item.designer,
            extraInfo: item.materialPrincipal,
            value: item.valor || 0,
            dificuldade: item.dificuldade,
            prioridadeForm: item.prioridadeForm,
            unidadeLoja: item.unidadeLoja,
            responsavelComercial: item.responsavelComercial,
            designerResponsavel: item.designerResponsavel || item.designer,
            linkPasta: item.linkPasta,
            urgente: item.urgente,
            briefing: item.briefing,
            produtos: item.produtos,
            arquivos: item.arquivos,
            historico: item.historico,
            notas: item.notas
          };
        });
      case 'orcamentos':
        return visibleOrcamentos.map((item, index) => ({
          id: item.id,
          title: item.cliente,
          subtitle: item.itens?.map(it => `${it.qtd}x ${it.nome}`).join(', ') || 'Peça Publicitária',
          status: item.status,
          date: item.dataEmissao,
          hour: `${10 + index}:00`,
          sector: item.setor,
          value: item.valorTotal,
          teamMember: 'Adams Leandro',
          dificuldade: item.dificuldade,
          prioridadeForm: item.prioridadeForm,
          unidadeLoja: item.unidadeLoja,
          responsavelComercial: item.responsavelComercial,
          designerResponsavel: item.designerResponsavel,
          linkPasta: item.linkPasta,
          urgente: item.urgente,
          briefing: item.briefing,
          produtos: item.produtos,
          arquivos: item.arquivos,
          historico: item.historico,
          notas: item.notas
        }));
      case 'ordem-servicos':
        return visibleOS.map((item, index) => ({
          id: item.id,
          title: item.cliente,
          subtitle: item.titulo,
          status: item.status,
          date: item.dataEntrega,
          hour: `${8 + (index * 2.2)}:00`,
          sector: item.setor,
          teamMember: 'Amanda R.',
          value: item.valor || 0,
          dificuldade: item.dificuldade,
          prioridadeForm: item.prioridadeForm,
          unidadeLoja: item.unidadeLoja,
          responsavelComercial: item.responsavelComercial,
          designerResponsavel: item.designerResponsavel,
          linkPasta: item.linkPasta,
          urgente: item.urgente,
          briefing: item.briefing,
          produtos: item.produtos,
          arquivos: item.arquivos,
          historico: item.historico,
          notas: item.notas
        }));
      case 'campanhas':
        return visibleCampanhas.map((item, index) => ({
          id: item.id,
          title: item.nome,
          subtitle: `Gerados: ${item.leadsGerados}`,
          status: item.status,
          date: new Date().toISOString().split('T')[0],
          hour: `${14 + index}:00`,
          sector: item.setor,
          value: item.investimento,
          teamMember: 'Adams Leandro',
          dificuldade: item.dificuldade,
          prioridadeForm: item.prioridadeForm,
          unidadeLoja: item.unidadeLoja,
          responsavelComercial: item.responsavelComercial,
          designerResponsavel: item.designerResponsavel,
          linkPasta: item.linkPasta,
          urgente: item.urgente,
          briefing: item.briefing,
          produtos: item.produtos,
          arquivos: item.arquivos,
          historico: item.historico,
          notas: item.notas
        }));
      case 'clientes':
        return visibleClientes.map((item, index) => ({
          id: item.id,
          title: item.nome,
          subtitle: item.segmento,
          status: 'Ativo',
          date: item.ultimoContato,
          hour: '16:00',
          sector: item.setorPrincipal,
          value: item.ltv,
          teamMember: 'Adams Leandro',
          dificuldade: item.dificuldade,
          prioridadeForm: item.prioridadeForm,
          unidadeLoja: item.unidadeLoja,
          responsavelComercial: item.responsavelComercial,
          designerResponsavel: item.designerResponsavel,
          linkPasta: item.linkPasta,
          urgente: item.urgente,
          briefing: item.briefing,
          produtos: item.produtos,
          arquivos: item.arquivos,
          historico: item.historico,
          notas: item.notas
        }));
      case 'ftp-arquivos':
        return visibleFTPFiles.map((item, index) => ({
          id: item.id,
          title: item.nomeArquivo,
          subtitle: item.enviadoPor,
          status: item.extensao.toUpperCase(),
          date: item.dataEnvio,
          hour: '10:00',
          sector: item.setor,
          teamMember: item.enviadoPor,
          value: item.valor || 0,
          dificuldade: item.dificuldade,
          prioridadeForm: item.prioridadeForm,
          unidadeLoja: item.unidadeLoja,
          responsavelComercial: item.responsavelComercial,
          designerResponsavel: item.designerResponsavel,
          linkPasta: item.linkPasta,
          urgente: item.urgente,
          briefing: item.briefing,
          produtos: item.produtos,
          arquivos: item.arquivos,
          historico: item.historico,
          notas: item.notas
        }));
      default:
        return [];
    }
  };

  const getUnifiedItems = (): UnifiedItem[] => {
    const raw = getRawUnifiedItems();
    return raw.map(item => ({
      ...item,
      hour: customHours[item.id] || item.hour || '09:00',
      category: customDurations[item.id] !== undefined ? `${customDurations[item.id]}` : '2.0',
      extraInfo: item.extraInfo || ''
    }));
  };

  // --- ATUALIZADOR DO ESTADO ORIGINAL QUANDO ALTERADO NOS MODOS INTERATIVOS ---
  const updateUnifiedItemStatus = (itemId: string, newStatus: string) => {
    switch (activeTab) {
      case 'atendimento':
        setAtendimentos(prev => prev.map(item => item.id === itemId ? { ...item, status: newStatus as any } : item));
        break;
      case 'funil': {
        const estagMapp: Record<string, Deal['estagio']> = {
          'Prospecção': 'captacao',
          'Contato Inicial': 'contato',
          'Análise Técnica': 'analise',
          'Elaboração Proposta': 'proposta',
          'Follow-up': 'followup',
          'Pronto (Ganho)': 'ganho'
        };
        const mappedStatus = estagMapp[newStatus] || (Object.values(estagMapp).includes(newStatus as any) ? newStatus as any : 'captacao');
        setDeals(prev => prev.map(item => item.id === itemId ? { ...item, estagio: mappedStatus } : item));
        break;
      }
      case 'projetos':
        setProjetos(prev => prev.map(item => item.id === itemId ? { ...item, status: newStatus as any } : item));
        break;
      case 'orcamentos':
        setOrcamentos(prev => prev.map(item => item.id === itemId ? { ...item, status: newStatus as any } : item));
        break;
      case 'ordem-servicos':
        setOrdensServico(prev => prev.map(item => item.id === itemId ? { ...item, status: newStatus as any } : item));
        break;
      case 'campanhas':
        setCampanhas(prev => prev.map(item => item.id === itemId ? { ...item, status: newStatus as any } : item));
        break;
      case 'clientes':
        setClientes(prev => prev.map(item => item.id === itemId ? { ...item, canalPreferido: newStatus as any } : item));
        break;
      case 'ftp-arquivos':
        setFtpFiles(prev => prev.map(item => item.id === itemId ? { ...item, extensao: newStatus.toLowerCase() as any } : item));
        break;
    }
  };

  // Helpers auxiliary styled bar colors for Gantt items
  const getGanttBarColor = (s: SectorType) => {
    switch (s) {
      case 'comunicacao-visual': return 'rgba(79, 70, 229, 0.25)';
      case 'corte-cnc': return 'rgba(16, 185, 129, 0.23)';
      case 'impressao-digital': return 'rgba(236, 72, 153, 0.25)';
      case 'impressao-3d': return 'rgba(245, 158, 11, 0.25)';
    }
  };

  const getGanttBarBorder = (s: SectorType) => {
    switch (s) {
      case 'comunicacao-visual': return 'rgba(124, 58, 237, 0.5)';
      case 'corte-cnc': return 'rgba(16, 185, 129, 0.5)';
      case 'impressao-digital': return 'rgba(236, 72, 153, 0.5)';
      case 'impressao-3d': return 'rgba(245, 158, 11, 0.5)';
    }
  };

  const parseTaskHour = (taskHour?: string) => {
    if (!taskHour) return 9;
    const parts = taskHour.split(':');
    return parseInt(parts[0]) + parseInt(parts[1] || '0') / 60;
  };

  const getGanttLineLeft = () => {
    const h = currentTime.getHours();
    const m = currentTime.getMinutes();
    const currentVal = h + m / 60;
    
    if (currentVal <= 2) return 0;
    if (currentVal >= 18) return 100;
    
    return ((currentVal - 2) / 16) * 100;
  };

  const getColumnsForTab = () => {
    switch (activeTab) {
      case 'atendimento':
        return ['Pendente', 'Retornado', 'Em Proposta', 'Finalizado'];
      case 'funil':
        return ['Prospecção', 'Contato Inicial', 'Análise Técnica', 'Elaboração Proposta', 'Follow-up', 'Pronto (Ganho)'];
      case 'projetos':
        return ['Briefing', 'Em Vetorização', 'Aprovado Pelo Cliente', 'Ajuste Solicitado'];
      case 'orcamentos':
        return ['Em Elaboração', 'Enviado', 'Aprovado', 'Recusado'];
      case 'ordem-servicos':
        return ['Aguardando Arquivos', 'Preparacao', 'Producao', 'Acabamento/Qualidade', 'Entregue'];
      case 'campanhas':
        return ['Ativa', 'Pausada', 'Finalizada'];
      case 'clientes':
        return ['comunicacao-visual', 'corte-cnc', 'impressao-digital', 'impressao-3d'];
      case 'ftp-arquivos':
        return ['DWG', 'DXF', 'PDF', 'STL', 'CDR', 'AI'];
      default:
        return ['Geral'];
    }
  };

  // --- ADICIONADOR DINÂMICO CLICKUP ---
  const addUnifiedItem = (title: string, status: string, sector: SectorType, date?: string, teamMember?: string, value?: number) => {
    const today = new Date().toISOString().split('T')[0];
    const itemDate = date || today;
    const itemMember = teamMember || 'Adams Leandro';
    const itemVal = value || 0;

    switch (activeTab) {
      case 'atendimento': {
        const newAtend: Atendimento = {
          id: `AT-${Math.floor(200 + Math.random() * 800)}`,
          cliente: title,
          contato: itemMember + ' (CRM)',
          canal: 'WhatsApp',
          assunto: 'Nova Demanda ClickUp',
          setor: sector,
          status: status as any,
          data: itemDate,
          descricao: 'Registrado de forma acelerada via visualização unificada ClickUp.'
        };
        setAtendimentos(prev => [newAtend, ...prev]);
        break;
      }
      case 'funil': {
        const estagMapp: Record<string, Deal['estagio']> = {
          'Prospecção': 'captacao',
          'Contato Inicial': 'contato',
          'Análise Técnica': 'analise',
          'Elaboração Proposta': 'proposta',
          'Follow-up': 'followup',
          'Pronto (Ganho)': 'ganho'
        };
        const newDeal: Deal = {
          id: `D-${Math.floor(200 + Math.random() * 800)}`,
          cliente: title,
          projeto: 'Demanda de Visualização ClickUp',
          valor: itemVal || 7500,
          probabilidade: 70,
          setor: sector,
          estagio: estagMapp[status] || 'captacao',
          diasInativo: 0,
          alertas: 0
        };
        setDeals(prev => [newDeal, ...prev]);
        break;
      }
      case 'projetos': {
        const newProj: ProjetoBrief = {
          id: `PRJ-${Math.floor(200 + Math.random() * 800)}`,
          titulo: title,
          cliente: 'Demanda de Comunicação Visual',
          setor: sector,
          designer: itemMember,
          status: (['Briefing', 'Em Vetorização', 'Aprovado Pelo Cliente', 'Ajuste Solicitado'].includes(status) ? status : 'Briefing') as any,
          prazo: itemDate,
          dimensoes: 'A definir',
          materialPrincipal: 'ACM / Chapa Galvanizada'
        };
        setProjetos(prev => [newProj, ...prev]);
        break;
      }
      case 'orcamentos': {
        const newOrc: Orcamento = {
          id: `ORC-${Math.floor(200 + Math.random() * 800)}`,
          cliente: title,
          valorTotal: itemVal || 4500,
          setor: sector,
          status: (['Em Elaboração', 'Enviado', 'Aprovado', 'Recusado'].includes(status) ? status : 'Em Elaboração') as any,
          dataEmissao: itemDate,
          itens: [{ nome: 'Placa Canaletada', qtd: 1, valorUnit: itemVal || 4500 }]
        };
        setOrcamentos(prev => [newOrc, ...prev]);
        break;
      }
      case 'ordem-servicos': {
        const newOSItem: OSOrd = {
          id: `OS-${Math.floor(500 + Math.random() * 400)}`,
          numeroOS: Math.floor(400 + Math.random() * 100).toString(),
          orcamentoId: 'ORC-999',
          cliente: title,
          titulo: 'Ordem de Serviço criada via ClickUp',
          setor: sector,
          status: (['Aguardando Arquivos', 'Preparacao', 'Producao', 'Acabamento/Qualidade', 'Entregue'].includes(status) ? status : 'Aguardando Arquivos') as any,
          dataEntrega: itemDate
        };
        setOrdensServico(prev => [newOSItem, ...prev]);
        break;
      }
      case 'campanhas': {
        const newCamp: Campanha = {
          id: `MKT-${Math.floor(200 + Math.random() * 800)}`,
          nome: title,
          setor: sector,
          investimento: itemVal || 1500,
          leadsGerados: 10,
          conversao: 0,
          status: (['Ativa', 'Pausada', 'Finalizada'].includes(status) ? status : 'Ativa') as any,
          roi: 0
        };
        setCampanhas(prev => [newCamp, ...prev]);
        break;
      }
      case 'clientes': {
        const newCli: Client = {
          id: `CLI-${Math.floor(200 + Math.random() * 800)}`,
          nome: title,
          segmento: 'Industrial / B2B',
          canalPreferido: 'WhatsApp',
          ltv: itemVal || 12000,
          ultimoContato: itemDate,
          setorPrincipal: sector
        };
        setClientes(prev => [newCli, ...prev]);
        break;
      }
      case 'ftp-arquivos': {
        const newFtp: FTPFile = {
          id: `F-${Math.floor(100 + Math.random() * 800)}`,
          osId: 'OS-401',
          nomeArquivo: (title || '').includes('.') ? title : `${(title || '').replaceAll(' ', '_').toLowerCase()}.dwg`,
          tamanho: '2.0 MB',
          extensao: (['dxf', 'dwg', 'stl', 'pdf', 'cdr', 'ai'].includes((status || '').toLowerCase()) ? (status || '').toLowerCase() : 'dwg') as any,
          setor: sector,
          enviadoPor: itemMember,
          dataEnvio: itemDate
        };
        setFtpFiles(prev => [newFtp, ...prev]);
        break;
      }
    }
  };

  // --- EXCLUSOR DINÂMICO CLICKUP ---
  const deleteUnifiedItem = (itemId: string) => {
    switch (activeTab) {
      case 'atendimento':
        setAtendimentos(prev => prev.filter(item => item.id !== itemId));
        break;
      case 'funil':
        setDeals(prev => prev.filter(item => item.id !== itemId));
        break;
      case 'projetos':
        setProjetos(prev => prev.filter(item => item.id !== itemId));
        break;
      case 'orcamentos':
        setOrcamentos(prev => prev.filter(item => item.id !== itemId));
        break;
      case 'ordem-servicos':
        setOrdensServico(prev => prev.filter(item => item.id !== itemId));
        break;
      case 'campanhas':
        setCampanhas(prev => prev.filter(item => item.id !== itemId));
        break;
      case 'clientes':
        setClientes(prev => prev.filter(item => item.id !== itemId));
        break;
      case 'ftp-arquivos':
        setFtpFiles(prev => prev.filter(item => item.id !== itemId));
        break;
    }
  };

  // --- ATUALIZADOR EDIT CORRENTE ---
  const updateUnifiedItemField = (itemId: string, field: string, newValue: any) => {
    if (field === 'hour') {
      setCustomHours(prev => ({ ...prev, [itemId]: newValue }));
    }
    if (field === 'duration') {
      setCustomDurations(prev => ({ ...prev, [itemId]: parseFloat(newValue) || 2.0 }));
    }

    const extraFields = [
      'dificuldade', 
      'prioridadeForm', 
      'unidadeLoja', 
      'responsavelComercial', 
      'designerResponsavel', 
      'linkPasta', 
      'urgente', 
      'briefing', 
      'produtos', 
      'arquivos', 
      'historico', 
      'notas'
    ];

    switch (activeTab) {
      case 'atendimento':
        setAtendimentos(prev => prev.map(item => {
          if (item.id !== itemId) return item;
          if (extraFields.includes(field)) return { ...item, [field]: newValue };
          if (field === 'title') return { ...item, cliente: newValue };
          if (field === 'subtitle') return { ...item, assunto: newValue };
          if (field === 'date') return { ...item, data: newValue };
          if (field === 'teamMember') return { ...item, contato: newValue };
          if (field === 'sector') return { ...item, setor: newValue };
          return item;
        }));
        break;
      case 'funil':
        setDeals(prev => prev.map(item => {
          if (item.id !== itemId) return item;
          if (extraFields.includes(field)) return { ...item, [field]: newValue };
          if (field === 'title') return { ...item, cliente: newValue };
          if (field === 'subtitle') return { ...item, projeto: newValue };
          if (field === 'value') return { ...item, valor: parseFloat(newValue) || 0 };
          if (field === 'sector') return { ...item, setor: newValue };
          return item;
        }));
        break;
      case 'projetos':
        setProjetos(prev => prev.map(item => {
          if (item.id !== itemId) return item;
          if (extraFields.includes(field)) return { ...item, [field]: newValue };
          if (field === 'title') return { ...item, titulo: newValue };
          if (field === 'subtitle') return { ...item, cliente: newValue };
          if (field === 'date') return { ...item, prazo: newValue };
          if (field === 'teamMember') return { ...item, designer: newValue };
          if (field === 'sector') return { ...item, setor: newValue };
          return item;
        }));
        break;
      case 'orcamentos':
        setOrcamentos(prev => prev.map(item => {
          if (item.id !== itemId) return item;
          if (extraFields.includes(field)) return { ...item, [field]: newValue };
          if (field === 'title') return { ...item, cliente: newValue };
          if (field === 'value') return { ...item, valorTotal: parseFloat(newValue) || 0 };
          if (field === 'date') return { ...item, dataEmissao: newValue };
          if (field === 'sector') return { ...item, setor: newValue };
          return item;
        }));
        break;
      case 'ordem-servicos':
        setOrdensServico(prev => prev.map(item => {
          if (item.id !== itemId) return item;
          if (extraFields.includes(field)) return { ...item, [field]: newValue };
          if (field === 'title') return { ...item, cliente: newValue };
          if (field === 'subtitle') return { ...item, titulo: newValue };
          if (field === 'date') return { ...item, dataEntrega: newValue };
          if (field === 'sector') return { ...item, setor: newValue };
          return item;
        }));
        break;
      case 'campanhas':
        setCampanhas(prev => prev.map(item => {
          if (item.id !== itemId) return item;
          if (extraFields.includes(field)) return { ...item, [field]: newValue };
          if (field === 'title') return { ...item, nome: newValue };
          if (field === 'value') return { ...item, investimento: parseFloat(newValue) || 0 };
          if (field === 'sector') return { ...item, setor: newValue };
          return item;
        }));
        break;
      case 'clientes':
        setClientes(prev => prev.map(item => {
          if (item.id !== itemId) return item;
          if (extraFields.includes(field)) return { ...item, [field]: newValue };
          if (field === 'title') return { ...item, nome: newValue };
          if (field === 'subtitle') return { ...item, segmento: newValue };
          if (field === 'value') return { ...item, ltv: parseFloat(newValue) || 0 };
          if (field === 'date') return { ...item, ultimoContato: newValue };
          if (field === 'sector') return { ...item, setorPrincipal: newValue };
          return item;
        }));
        break;
      case 'ftp-arquivos':
        setFtpFiles(prev => prev.map(item => {
          if (item.id !== itemId) return item;
          if (extraFields.includes(field)) return { ...item, [field]: newValue };
          if (field === 'title') return { ...item, nomeArquivo: newValue };
          if (field === 'teamMember') return { ...item, enviadoPor: newValue };
          if (field === 'sector') return { ...item, setor: newValue };
          return item;
        }));
        break;
    }
  };

  const shiftTaskHour = (itemId: string, direction: 'earlier' | 'later') => {
    const it = getUnifiedItems().find(item => item.id === itemId);
    if (!it) return;
    const taskStart = parseTaskHour(it.hour);
    const newStart = direction === 'earlier' ? Math.max(2, taskStart - 0.5) : Math.min(18, taskStart + 0.5);
    const h = Math.floor(newStart);
    const m = Math.floor((newStart % 1) * 60);
    const formattedHour = `${h}:${m === 0 ? '00' : m.toString().padStart(2, '0')}`;
    updateUnifiedItemField(itemId, 'hour', formattedHour);
  };

  const autoAdjustSchedule = () => {
    const items = getUnifiedItems();
    if (items.length === 0) return;

    // 1. Build adjacency list and in-degrees for topological sort
    const adj: Record<string, string[]> = {};
    const inDegree: Record<string, number> = {};
    
    items.forEach(it => {
      adj[it.id] = [];
      inDegree[it.id] = 0;
    });

    customConnections.forEach(conn => {
      if (adj[conn.from] && adj[conn.to] !== undefined) {
        adj[conn.from].push(conn.to);
        inDegree[conn.to] = (inDegree[conn.to] || 0) + 1;
      }
    });

    // 2. Queue for topological sort
    const queue: string[] = [];
    items.forEach(it => {
      if ((inDegree[it.id] || 0) === 0) {
        queue.push(it.id);
      }
    });

    const sortedIds: string[] = [];
    while (queue.length > 0) {
      const curr = queue.shift()!;
      sortedIds.push(curr);
      (adj[curr] || []).forEach(neighbor => {
        inDegree[neighbor]--;
        if (inDegree[neighbor] === 0) {
          queue.push(neighbor);
        }
      });
    }

    // Capture standard items without connections
    items.forEach(it => {
      if (!sortedIds.includes(it.id)) {
        sortedIds.push(it.id);
      }
    });

    // 3. Assign times sequentially
    const newHours: Record<string, string> = { ...customHours };
    const taskEndTimes: Record<string, number> = {};
    const operatorLastFreeTime: Record<string, number> = {};

    const formatNumericHour = (val: number): string => {
      const bounded = Math.max(7, Math.min(18, val));
      const h = Math.floor(bounded);
      const m = Math.round((bounded % 1) * 60);
      const mString = m === 60 ? '00' : m.toString().padStart(2, '0');
      const hAdjusted = m === 60 ? h + 1 : h;
      return `${hAdjusted.toString().padStart(2, '0')}:${mString}`;
    };

    sortedIds.forEach(id => {
      const it = items.find(x => x.id === id);
      if (!it) return;

      const durVal = customDurations[id] !== undefined ? customDurations[id] : 2.0;
      let startVal = 7.0; // Start shift standard (07:00)

      // Prerequisite dependency constraint
      const parents = customConnections.filter(c => c.to === id);
      parents.forEach(p => {
        const parentEnd = taskEndTimes[p.from];
        if (parentEnd !== undefined && parentEnd > startVal) {
          startVal = parentEnd;
        }
      });

      // Operator collision constraint
      const op = it.teamMember;
      if (op && operatorLastFreeTime[op] !== undefined) {
        const opFree = operatorLastFreeTime[op];
        if (opFree > startVal) {
          startVal = opFree;
        }
      }

      const endVal = startVal + durVal;
      newHours[id] = formatNumericHour(startVal);
      taskEndTimes[id] = endVal;
      if (op) {
        operatorLastFreeTime[op] = endVal;
      }
    });

    setCustomHours(newHours);
  };

  const ganttHours = [
    { label: '2a', value: 2 },
    { label: '3a', value: 3 },
    { label: '4a', value: 4 },
    { label: '5a', value: 5 },
    { label: '6a', value: 6 },
    { label: '7a', value: 7 },
    { label: '8a', value: 8 },
    { label: '9a', value: 9 },
    { label: '10a', value: 10 },
    { label: '11a', value: 11 },
    { label: '12p', value: 12 },
    { label: '1p', value: 13 },
    { label: '2p', value: 14 },
    { label: '3p', value: 15 },
    { label: '4p', value: 16 },
    { label: '5p', value: 17 },
    { label: '6p', value: 18 }
  ];

  const getPriorityFlag = (id: string) => {
    const prv = priorities[id] || 'Normal';
    switch (prv) {
      case 'Urgente': return '🚩 Urgente';
      case 'Alta': return '🚩 Alta';
      case 'Normal': return '🚩 Normal';
      case 'Baixa': return '🚩 Baixa';
    }
  };

  const getPriorityFlagColor = (id: string) => {
    const prv = priorities[id] || 'Normal';
    switch (prv) {
      case 'Urgente': return 'text-red-500 fill-red-500/10 border-red-500/20';
      case 'Alta': return 'text-amber-500 fill-amber-500/10 border-amber-500/20';
      case 'Normal': return 'text-blue-400 fill-blue-400/10 border-blue-400/10';
      case 'Baixa': return 'text-zinc-500 fill-zinc-500/10 border-transparent';
    }
  };

  const cyclePriority = (id: string) => {
    const current = priorities[id] || 'Normal';
    const nexts: Record<string, 'Urgente' | 'Alta' | 'Normal' | 'Baixa'> = {
      'Normal': 'Alta',
      'Alta': 'Urgente',
      'Urgente': 'Baixa',
      'Baixa': 'Normal'
    };
    setPriorities(prev => ({ ...prev, [id]: nexts[current] }));
  };

  const renderViewsBar = () => {
    return (
      <div className={cn("flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl mt-4 border", isLight ? "bg-white text-zinc-900" : "bg-zinc-900 text-white")}>
        {/* Left indicators: ClickUp tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'lista', label: '📋 Lista' },
            { id: 'quadro', label: '📊 Quadro' },
            { id: 'gantt', label: '📅 Gantt' },
            { id: 'calendario', label: '📆 Calendário' },
            { id: 'equipe', label: '👥 Equipe' }
          ].map(m => (
            <button
              key={m.id}
              type="button"
              onClick={() => setViewMode(m.id as any)}
              className={cn(
                "flex items-center gap-2 px-4 h-10 rounded-xl transition-all text-xs font-black uppercase tracking-wider border cursor-pointer",
                viewMode === m.id
                  ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/20"
                  : c("text-zinc-600 hover:text-zinc-950 bg-zinc-100/70 hover:bg-zinc-200/60 border-transparent", "text-zinc-400 hover:text-white bg-zinc-900/40 hover:bg-zinc-900 border-transparent")
              )}
            >
              {m.label}
            </button>
          ))}

          {/* Toggle specifically for LIST VIEW Mode */}
          {viewMode === 'lista' && (
            <div className={cn("flex items-center gap-1 p-1 rounded-xl ml-2 shrink-0 border", c("bg-zinc-50 border-transparent", "bg-zinc-950 border-transparent"))}>
              <button
                type="button"
                onClick={() => setClickupListMode('detalhado')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer",
                  clickupListMode === 'detalhado' ? c("bg-purple-100 text-purple-700 border border-purple-200", "bg-purple-950/50 text-purple-400 border border-purple-550/20") : c("text-zinc-500 hover:text-zinc-800", "text-zinc-500 hover:text-zinc-300")
                )}
                title="Mostrar formulários específicos de cadastro de cada módulo"
              >
                ⚡ Cadastro & Painel
              </button>
              <button
                type="button"
                onClick={() => setClickupListMode('grade')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer",
                  clickupListMode === 'grade' ? c("bg-purple-100 text-purple-700 border border-purple-200", "bg-purple-950/50 text-purple-400 border border-purple-550/20") : c("text-zinc-500 hover:text-zinc-800", "text-zinc-500 hover:text-zinc-300")
                )}
                title="Mostrar planilha dinâmica unificada ClickUp"
              >
                📋 Planilha ClickUp
              </button>
            </div>
          )}
        </div>

        {/* Universal filter controls: only shown for active ClickUp alternate modes or Grade ClickUp */}
        {(viewMode !== 'lista' || clickupListMode === 'grade') && (
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Live Search */}
            <div className="relative flex-1 lg:max-w-[200px] min-w-[150px]">
              <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <Input
                value={clickupSearch}
                onChange={(e) => setClickupSearch(e.target.value)}
                placeholder="Filtrar tarefas..."
                className={cn("pl-8 h-9 text-xs rounded-xl focus:border-purple-650", c("bg-zinc-50 border-transparent text-zinc-900", "bg-zinc-950 border-transparent text-white"))}
              />
            </div>

            {/* Priority filter */}
            <select
              value={clickupPriorityFilter}
              onChange={(e) => setClickupPriorityFilter(e.target.value)}
              className="bg-zinc-950 text-zinc-400 text-xs rounded-xl h-9 px-3 border-none outline-none focus:border-purple-650 cursor-pointer text-left"
            >
              <option value="all">Filtro: Todas Prioridades</option>
              <option value="Urgente">🚨 Urgente</option>
              <option value="Alta">🚩 Alta</option>
              <option value="Normal">🚩 Normal</option>
              <option value="Baixa">🏳️ Baixa</option>
            </select>

            <button 
              type="button"
              onClick={() => {
                setClickupSearch('');
                setClickupPriorityFilter('all');
                setSelectedSector('all');
              }}
              className="px-3 h-9 bg-zinc-900 border-none text-zinc-400 hover:text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderAlternativeView = () => {
    const items = getUnifiedItems();
    // Universal filtering system across all views
    const filteredItems = items.filter(it => {
      const matchesSearch = it.title.toLowerCase().includes(clickupSearch.toLowerCase()) || 
                            it.id.toLowerCase().includes(clickupSearch.toLowerCase()) ||
                            (it.subtitle && it.subtitle.toLowerCase().includes(clickupSearch.toLowerCase()));
      const itemPriority = priorities[it.id] || 'Normal';
      const matchesPriority = clickupPriorityFilter === 'all' || itemPriority === clickupPriorityFilter;
      return matchesSearch && matchesPriority;
    });

    const columns = getColumnsForTab();

    switch (viewMode) {
      case 'lista': {
        // Render ClickUp Spreadsheet format
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className={cn("p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 border", isLight ? "bg-white text-zinc-900" : "bg-zinc-900 text-white")}>
              <div>
                <span className="text-[10px] text-purple-400 font-mono font-black uppercase tracking-widest leading-none block mb-1">
                  Planilha de Gestão Industrial ClickUp (Agrupada por Status)
                </span>
                <p className="text-xs text-zinc-500 font-sans">
                  Modifique nomes, datas, profissionais e prioridades clicando diretamente nas planilhas. Tudo atualiza o ERP em tempo real.
                </p>
              </div>
              <Badge className="bg-purple-950/50 text-purple-400 border border-purple-900/40 font-mono text-[10px] px-3 py-1 font-black">
                {filteredItems.length} REGISTROS NO PIPELINE
              </Badge>
            </div>

            {selectedListItems.length > 0 && (
              <div className="bg-purple-950/20 border border-purple-500/30 p-3 rounded-2xl flex items-center justify-between animate-in fade-in sticky top-4 z-10 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <Badge className="bg-purple-500 text-white font-mono text-[10px] px-2">
                    {selectedListItems.length} SELECIONADOS
                  </Badge>
                  <span className="text-xs text-zinc-300 font-medium">Ações em lote:</span>
                </div>
                <div className="flex items-center gap-2">
                  <select 
                    className="bg-zinc-950 border-none text-zinc-300 text-xs rounded-xl h-8 px-3 focus:border-purple-500 outline-none"
                    onChange={(e) => {
                      if (!e.target.value) return;
                      const newStatus = e.target.value;
                      if (!confirm(`Mover ${selectedListItems.length} itens para "${newStatus}"?`)) {
                        e.target.value = "";
                        return;
                      }
                      
                      selectedListItems.forEach(id => {
                        updateUnifiedItemStatus(id, newStatus);
                      });
                      setSelectedListItems([]);
                      e.target.value = "";
                    }}
                  >
                    <option value="">-- Alterar Status --</option>
                    {columns.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>

                  <Button 
                    variant="outline" 
                    className="h-8 border-red-900/30 text-rose-500 hover:bg-rose-600 hover:text-white font-black text-[10px] uppercase tracking-wider"
                    onClick={() => {
                      if (!confirm(`Excluir ${selectedListItems.length} itens permanentemente?`)) return;
                      selectedListItems.forEach(id => {
                        const found = unifiedFlowItems.find(x => x.id === id);
                        if (!found) return;
                        const itemStage = found.flowStage || activeTab;
                        if (itemStage === 'atendimento') {
                          setAtendimentos((prev: any) => prev.filter((p: any) => p.id !== id));
                        } else if (itemStage === 'funil') {
                          setDeals((prev: any) => prev.filter((p: any) => p.id !== id));
                        } else if (itemStage === 'projetos') {
                          setProjetos((prev: any) => prev.filter((p: any) => p.id !== id));
                        } else if (itemStage === 'orcamentos') {
                          setOrcamentos((prev: any) => prev.filter((p: any) => p.id !== id));
                        } else if (itemStage === 'ordem-servicos') {
                          setOrdensServico((prev: any) => prev.filter((p: any) => p.id !== id));
                        } else if (itemStage === 'campanhas') {
                          setCampanhas((prev: any) => prev.filter((p: any) => p.id !== id));
                        } else {
                          setProjetos((prev: any) => prev.filter((p: any) => p.id !== id));
                        }
                      });
                      setSelectedListItems([]);
                    }}
                  >
                    <Trash2 size={12} className="mr-1.5" /> Excluir
                  </Button>
                </div>
              </div>
            )}

            {/* List groups representing columns */}
            <div className="space-y-6">
              {columns.map((colStatus) => {
                const groupItems = filteredItems.filter(it => {
                  if (activeTab === 'clientes') return it.sector === colStatus;
                  if (activeTab === 'ftp-arquivos') return it.status === colStatus;
                  return it.status === colStatus;
                });

                const isCollapsed = collapsedGroups[colStatus];
                const totalGroupValue = groupItems.reduce((acc, current) => acc + (current.value || 0), 0);

                return (
                  <div key={colStatus} className="bg-zinc-900/90 border-none rounded-2xl overflow-hidden shadow-lg transition-all">
                    {/* Header bar of Status group */}
                    <div className="p-3 bg-zinc-950/85 border-b border-transparent flex items-center justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setCollapsedGroups(prev => ({ ...prev, [colStatus]: !prev[colStatus] }))}
                          className="text-zinc-500 hover:text-white transition-transform duration-200"
                        >
                          <ChevronRight size={16} className={cn("transition-transform", !isCollapsed && "rotate-95")} />
                        </button>
                        
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "w-2.5 h-2.5 rounded-full",
                            (colStatus || '').includes('Pendente') || (colStatus || '').includes('Aguardando') || (colStatus || '').includes('Recusado') ? "bg-red-500" :
                            (colStatus || '').includes('Retornado') || (colStatus || '').includes('Em Elaboração') || (colStatus || '').includes('Preparacao') ? "bg-amber-500" :
                            (colStatus || '').includes('Proposta') || (colStatus || '').includes('Em Vetorização') || (colStatus || '').includes('Producao') ? "bg-purple-505 bg-indigo-505 bg-purple-500" : "bg-emerald-500"
                          )} />
                          <span className="text-xs font-black uppercase text-zinc-200 tracking-wider font-sans">
                            {activeTab === 'clientes' ? getSetorLabel(colStatus as SectorType).toUpperCase() : colStatus.toUpperCase()}
                          </span>
                        </div>

                        <Badge className="bg-zinc-900 text-zinc-400 font-mono text-[9px] px-2 py-0.5 border-0">
                          {groupItems.length} itens
                        </Badge>
                      </div>

                      {/* Right aggregation sum row */}
                      {totalGroupValue > 0 && (
                        <div className="text-[10px] font-mono font-black text-purple-400">
                          SOMA: R$ {totalGroupValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                      )}
                    </div>

                    {/* Collapsible Table content */}
                    {!isCollapsed && (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left col-span-12 font-sans text-xs border-collapse divide-y divide-zinc-900/60">
                          <thead>
                            <tr className="bg-zinc-950/20 text-zinc-500 text-[9px] font-black uppercase tracking-wider border-b border-transparent">
                              <th className="p-3 pl-4 w-6">
                                <input 
                                  type="checkbox" 
                                  className="w-3.5 h-3.5 rounded border-transparent bg-zinc-900 cursor-pointer accent-purple-500"
                                  checked={groupItems.length > 0 && groupItems.every(i => selectedListItems.includes(i.id))}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      const newSelected = [...selectedListItems];
                                      groupItems.forEach(i => {
                                        if (!newSelected.includes(i.id)) newSelected.push(i.id);
                                      });
                                      setSelectedListItems(newSelected);
                                    } else {
                                      setSelectedListItems(selectedListItems.filter(id => !groupItems.find(i => i.id === id)));
                                    }
                                  }}
                                />
                              </th>
                              <th className="p-3 w-16">Código</th>
                              <th className="p-3">Nome / Cliente</th>
                              <th className="p-3">Assunto / Descrição</th>
                              <th className="p-3">Responsável</th>
                              <th className="p-3">Setor MES</th>
                              <th className="p-3">Prazo / Data</th>
                              <th className="p-3 text-right">Valor</th>
                              <th className="p-3 text-center">Prioridade</th>
                              <th className="p-3 text-right pr-6">Ação</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-900/20 bg-zinc-950/5">
                            {groupItems.map((it) => {
                              const isEditingTitle = editingField?.id === it.id && editingField?.field === 'title';
                              const isEditingSub = editingField?.id === it.id && editingField?.field === 'subtitle';

                              return (
                                <tr 
                                  key={it.id} 
                                  onClick={() => openHighFidelityModal(it.id, it.flowStage || activeTab)}
                                  onDoubleClick={() => openHighFidelityModal(it.id, it.flowStage || activeTab)}
                                  className="hover:bg-zinc-900/25 transition-colors group cursor-pointer"
                                  title="Clique duplo para abrir painel completo de detalhes"
                                >
                                  {/* Multi-select checkbox */}
                                  <td className="p-3 pl-4" onClick={(e) => e.stopPropagation()}>
                                    <input 
                                      type="checkbox" 
                                      className="w-3.5 h-3.5 rounded border-transparent bg-zinc-900 cursor-pointer accent-purple-500"
                                      checked={selectedListItems.includes(it.id)}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setSelectedListItems(prev => [...prev, it.id]);
                                        } else {
                                          setSelectedListItems(prev => prev.filter(id => id !== it.id));
                                        }
                                      }}
                                    />
                                  </td>

                                  {/* Code column */}
                                  <td className="p-3 font-mono text-[10px] font-extrabold text-zinc-500">
                                    {it.id}
                                  </td>

                                  {/* Name / Cliente Column */}
                                  <td className="p-3 max-w-[200px]" onClick={(e) => e.stopPropagation()}>
                                    {isEditingTitle ? (
                                      <input
                                        type="text"
                                        value={editingValue}
                                        onChange={(e) => setEditingValue(e.target.value)}
                                        onBlur={() => {
                                          updateUnifiedItemField(it.id, 'title', editingValue);
                                          setEditingField(null);
                                        }}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') {
                                            updateUnifiedItemField(it.id, 'title', editingValue);
                                            setEditingField(null);
                                          }
                                        }}
                                        className="w-full bg-zinc-900 focus:outline-none text-white text-xs border border-purple-550 rounded px-2 py-0.5"
                                        autoFocus
                                      />
                                    ) : (
                                      <div
                                        onClick={() => {
                                          setEditingField({ id: it.id, field: 'title' });
                                          setEditingValue(it.title);
                                        }}
                                        className="font-extrabold text-white uppercase text-xs tracking-tight cursor-pointer hover:bg-zinc-900/50 p-1 rounded min-h-[22px] flex items-center justify-between"
                                        title="Clique duas vezes para editar"
                                      >
                                        <span className="truncate">{it.title}</span>
                                        <span className="text-[8px] text-zinc-600 opacity-0 group-hover:opacity-100 uppercase font-bold tracking-tight">Editar</span>
                                      </div>
                                    )}
                                  </td>

                                  {/* Subtitle / Description column */}
                                  <td className="p-3 max-w-[250px]" onClick={(e) => e.stopPropagation()}>
                                    {isEditingSub ? (
                                      <input
                                        type="text"
                                        value={editingValue}
                                        onChange={(e) => setEditingValue(e.target.value)}
                                        onBlur={() => {
                                          updateUnifiedItemField(it.id, 'subtitle', editingValue);
                                          setEditingField(null);
                                        }}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') {
                                            updateUnifiedItemField(it.id, 'subtitle', editingValue);
                                            setEditingField(null);
                                          }
                                        }}
                                        className="w-full bg-zinc-900 focus:outline-none text-white text-xs border border-purple-550 rounded px-2 py-0.5"
                                        autoFocus
                                      />
                                    ) : (
                                      <div
                                        onClick={() => {
                                          setEditingField({ id: it.id, field: 'subtitle' });
                                          setEditingValue(it.subtitle || '');
                                        }}
                                        className="text-zinc-400 font-semibold cursor-pointer hover:bg-zinc-900/50 p-1 rounded min-h-[22px] truncate block"
                                        title={it.subtitle}
                                      >
                                        {it.subtitle || <span className="text-zinc-700 italic">Preencher assunto</span>}
                                      </div>
                                    )}
                                  </td>

                                  {/* Responsável column */}
                                  <td className="p-3" onClick={(e) => e.stopPropagation()}>
                                    <select
                                      value={it.teamMember}
                                      onChange={(e) => updateUnifiedItemField(it.id, 'teamMember', e.target.value)}
                                      className="bg-black/40 text-zinc-300 text-[11px] font-bold rounded-lg border-none focus:outline-none p-1 cursor-pointer hover:text-white"
                                    >
                                      {['Gabriel F.', 'Amanda R.', 'Carlos O.', 'Adams Leandro'].map(m => (
                                        <option key={m} value={m}>{m}</option>
                                      ))}
                                    </select>
                                  </td>

                                  {/* Setor column */}
                                  <td className="p-3" onClick={(e) => e.stopPropagation()}>
                                    <select
                                      value={it.sector}
                                      onChange={(e) => updateUnifiedItemField(it.id, 'sector', e.target.value as any)}
                                      className="bg-black/40 text-zinc-330 text-[11px] font-bold rounded-lg border-none focus:outline-none p-1 cursor-pointer hover:text-white"
                                    >
                                      <option value="comunicacao-visual">🖼️ CV</option>
                                      <option value="corte-cnc">⚙️ CNC</option>
                                      <option value="impressao-digital">🖊️ Digital</option>
                                      <option value="impressao-3d">🧊 3D</option>
                                    </select>
                                  </td>

                                  {/* Date Column */}
                                  <td className="p-3" onClick={(e) => e.stopPropagation()}>
                                    <input
                                      type="date"
                                      value={it.date}
                                      onChange={(e) => updateUnifiedItemField(it.id, 'date', e.target.value)}
                                      className="bg-zinc-950 border-none text-zinc-300 text-[11px] font-bold rounded-md px-2 py-0.5 focus:outline-none cursor-pointer"
                                    />
                                  </td>

                                  {/* Value Column */}
                                  <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                                    {editingField?.id === it.id && editingField?.field === 'value' ? (
                                      <input
                                        type="number"
                                        value={editingValue}
                                        onChange={(e) => setEditingValue(e.target.value)}
                                        onBlur={() => {
                                          updateUnifiedItemField(it.id, 'value', editingValue);
                                          setEditingField(null);
                                        }}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') {
                                            updateUnifiedItemField(it.id, 'value', editingValue);
                                            setEditingField(null);
                                          }
                                        }}
                                        className="w-20 bg-zinc-900 border border-purple-550 text-white rounded text-xs p-0.5 text-right font-mono"
                                        autoFocus
                                      />
                                    ) : (
                                      <div
                                        onClick={() => {
                                          setEditingField({ id: it.id, field: 'value' });
                                          setEditingValue((it.value || 0).toString());
                                        }}
                                        className="font-mono text-[11px] text-purple-400 font-extrabold cursor-pointer hover:bg-zinc-900/50 p-1 rounded"
                                      >
                                        R$ {(it.value || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                      </div>
                                    )}
                                  </td>

                                  {/* Priority Selector column */}
                                  <td className="p-3 text-center" onClick={(e) => e.stopPropagation()}>
                                    <button
                                      type="button"
                                      onClick={() => cyclePriority(it.id)}
                                      className={cn(
                                        "px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-tight border cursor-pointer",
                                        getPriorityFlagColor(it.id)
                                      )}
                                      title="Clique para alternar prioridade Korteck"
                                    >
                                      {getPriorityFlag(it.id)}
                                    </button>
                                  </td>

                                  {/* Actions column */}
                                  <td className="p-3 text-right pr-6" onClick={(e) => e.stopPropagation()}>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (confirm(`Tem certeza que deseja arquivar/deletar este registro clickup #${it.id}?`)) {
                                          deleteUnifiedItem(it.id);
                                        }
                                      }}
                                      className="p-1.5 hover:bg-red-950/40 text-zinc-500 hover:text-red-400 rounded-lg transition-all cursor-pointer"
                                    >
                                      <Trash2 size={13} />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}

                            <tr className="bg-zinc-950/10">
                              <td colSpan={9} className="p-2.5 pl-6">
                                {/* ClickUp Inline Quick Task Addition */}
                                <form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    const inputVal = quickAddInput[colStatus];
                                    if (inputVal && inputVal.trim()) {
                                      addUnifiedItem(inputVal, colStatus, selectedSector === 'all' ? 'comunicacao-visual' : selectedSector);
                                      setQuickAddInput(prev => ({ ...prev, [colStatus]: '' }));
                                    }
                                  }}
                                  className="flex items-center gap-2 max-w-lg"
                                >
                                  <Plus size={11} className="text-zinc-500 shrink-0" />
                                  <input
                                    type="text"
                                    value={quickAddInput[colStatus] || ''}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setQuickAddInput(prev => ({ ...prev, [colStatus]: val }));
                                    }}
                                    placeholder={`+ Novo item em ${colStatus}... (Pressione enter)`}
                                    className="bg-transparent border-0 text-xs text-zinc-400 outline-none w-full placeholder-zinc-700 font-bold focus:text-white"
                                  />
                                </form>
                              </td>
                            </tr>

                            {groupItems.length === 0 && !quickAddInput[colStatus] && (
                              <tr>
                                <td colSpan={9} className="p-6 text-center text-zinc-700 italic text-[10px] uppercase font-bold tracking-wide">
                                  Nenhum registro correspondente neste status.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      case 'quadro': {
        return (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Header / Meta info */}
            <div className={cn("p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 border", isLight ? "bg-white text-zinc-900" : "bg-zinc-900 text-white")}>
              <div>
                <span className="text-[10px] text-purple-400 font-black uppercase tracking-widest leading-none block mb-1">
                  Módulo de Pipeline Visual (Kanban Avançado)
                </span>
                <p className="text-xs text-zinc-500 font-sans">
                  Arraste ou clique nos botões direcionais ◄ e ► de cada cartão para empurrar os processos através das etapas.
                </p>
              </div>
              <Badge className="bg-purple-950/50 text-purple-400 border border-purple-900/40 font-mono text-[9.5px]">
                {filteredItems.length} ITENS FILTRADOS NO QUADRO
              </Badge>
            </div>

            {/* Kanban Columns */}
            <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin">
              {columns.map((col) => {
                const colItems = filteredItems.filter(it => {
                  if (activeTab === 'clientes') return it.sector === col;
                  if (activeTab === 'ftp-arquivos') return it.status === col;
                  return it.status === col;
                });

                const groupTotal = colItems.reduce((acc, current) => acc + (current.value || 0), 0);

                return (
                  <div 
                    key={col} 
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDropToColumn(e, col)}
                    className="min-w-[280px] w-[280px] bg-zinc-900 border-none rounded-2xl p-4.5 space-y-4 flex flex-col justify-between shrink-0 snap-align-start shadow-xl"
                  >
                    <div className="space-y-4">
                      {/* Column Header */}
                      <div className="flex items-center justify-between border-b border-transparent pb-2.5">
                        <div className="flex items-center gap-2 truncate">
                          <span className={cn(
                            "w-2 h-2 rounded-full",
                            (col || '').includes('Pendente') || (col || '').includes('Aguardando') ? "bg-red-400 animate-pulse" :
                            (col || '').includes('Retornado') || (col || '').includes('Em Elaboração') ? "bg-amber-400" :
                            (col || '').includes('Proposta') || (col || '').includes('Producao') ? "bg-purple-400" : "bg-emerald-500"
                          )} />
                          <span className="text-[10px] font-black uppercase text-zinc-300 truncate tracking-widest font-sans">
                            {activeTab === 'clientes' ? getSetorLabel(col as SectorType).split(' ')[0] : col}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-600 font-extrabold bg-zinc-950 px-2 py-0.5 rounded-md border-none">
                          {colItems.length}
                        </span>
                      </div>

                      {/* Column Aggregated Value display */}
                      {groupTotal > 0 && (
                        <div className="bg-zinc-950/80 rounded-xl p-2.5 border-none text-center text-[10px] font-mono font-black text-purple-400">
                          TOTAL: R$ {groupTotal.toLocaleString('pt-BR')}
                        </div>
                      )}

                      {/* Cards Container */}
                      <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
                        {colItems.map((it) => {
                          const isEditingTitle = editingField?.id === it.id && editingField?.field === 'title';
                          const isEditingSub = editingField?.id === it.id && editingField?.field === 'subtitle';
                          const isEditingValue = editingField?.id === it.id && editingField?.field === 'value';

                          return (
                            <Card 
                              key={it.id} 
                              draggable={true}
                              onDragStart={(e) => handleDragStart(e, it.id)}
                              onClick={() => openHighFidelityModal(it.id, it.flowStage || activeTab)}
                              onDoubleClick={() => openHighFidelityModal(it.id, it.flowStage || activeTab)}
                              className="bg-zinc-950 border-transparent hover:border-purple-650/50 transition-all shadow-md group cursor-grab active:cursor-grabbing hover:bg-zinc-900 relative select-none cursor-pointer"
                              title="Arraste para mudar • Clique para abrir detalhes"
                            >
                              <CardContent className="p-3.5 space-y-3 text-xs">
                                {/* Card metadata row */}
                                <div className="flex items-center justify-between gap-1.5">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[9px] text-zinc-600 font-mono font-extrabold bg-zinc-900 px-1 rounded">{it.id}</span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        cyclePriority(it.id);
                                      }}
                                      className={cn("text-[8px] font-black uppercase text-left tracking-tight border-0", getPriorityFlagColor(it.id).split(' ')[0])}
                                      title="Clique para alternar prioridade"
                                    >
                                      {getPriorityFlag(it.id).split(' ')[1]}
                                    </button>
                                  </div>
                                  
                                  {/* Direct sector editing on Kanban */}
                                  <select
                                    value={it.sector}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => updateUnifiedItemField(it.id, 'sector', e.target.value as any)}
                                    className="bg-zinc-900 text-zinc-400 hover:text-white text-[9.5px] font-black uppercase tracking-tight rounded px-1.5 py-0.5 border-none focus:outline-none cursor-pointer outline-none max-w-[80px]"
                                  >
                                    <option value="comunicacao-visual" className="bg-zinc-950 text-zinc-300">🖼️ CV</option>
                                    <option value="corte-cnc" className="bg-zinc-950 text-zinc-300">⚙️ CNC</option>
                                    <option value="impressao-digital" className="bg-zinc-950 text-zinc-300">🖊️ DGT</option>
                                    <option value="impressao-3d" className="bg-zinc-950 text-zinc-300">🧊 3D</option>
                                  </select>
                                </div>

                                {/* Title & Description */}
                                <div className="space-y-1">
                                  <h4 className="text-xs font-black text-white uppercase tracking-tight line-clamp-1 italic">
                                    {it.title}
                                  </h4>

                                  <p className="text-[10px] text-zinc-500 leading-snug line-clamp-2">
                                    {it.subtitle || <span className="text-zinc-700 italic">Preencher assunto...</span>}
                                  </p>
                                </div>

                                {/* Value rendering/editing */}
                                {isEditingValue ? (
                                  <div className="flex items-center gap-1 bg-zinc-950 p-1.5 rounded-lg border border-purple-550" onClick={(e) => e.stopPropagation()}>
                                    <span className="text-zinc-600 font-mono text-[10px]">R$</span>
                                    <input
                                      type="number"
                                      value={editingValue}
                                      onChange={(e) => setEditingValue(e.target.value)}
                                      onClick={(e) => e.stopPropagation()}
                                      onBlur={() => {
                                        updateUnifiedItemField(it.id, 'value', editingValue);
                                        setEditingField(null);
                                      }}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          updateUnifiedItemField(it.id, 'value', editingValue);
                                          setEditingField(null);
                                        }
                                      }}
                                      className="w-full bg-transparent text-white font-mono text-[10px] outline-none text-right"
                                      autoFocus
                                    />
                                  </div>
                                ) : (
                                  <div
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingField({ id: it.id, field: 'value' });
                                      setEditingValue((it.value || 0).toString());
                                    }}
                                    className="text-[10px] font-mono font-black text-purple-400 bg-zinc-900 p-1.5 rounded-lg border-none flex items-center justify-between cursor-pointer hover:border-purple-650/40 transition-colors"
                                    title="Clique para editar valor"
                                  >
                                    <span>VALOR:</span>
                                    <span className="flex items-center gap-1 font-bold">
                                      R$ {(it.value || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                      <span className="text-[7.5px] text-purple-400/50">✏️</span>
                                    </span>
                                  </div>
                                )}

                                {/* Assignee/Member display & Date Editor in Kanban card */}
                                <div className="flex items-center justify-between gap-1.5 text-[9.5px] border-t border-transparent pt-2.5" onClick={(e) => e.stopPropagation()}>
                                  <div className="flex items-center gap-1 flex-1">
                                    <span className="text-zinc-600 font-bold mr-0.5 shrink-0">Prazo:</span>
                                    <input
                                      type="date"
                                      value={it.date}
                                      onClick={(e) => e.stopPropagation()}
                                      onChange={(e) => updateUnifiedItemField(it.id, 'date', e.target.value)}
                                      className="bg-zinc-950 border-none text-zinc-300 text-[9.5px] font-bold rounded px-1 py-0.5 outline-none focus:border-purple-550/30 cursor-pointer min-w-0 flex-1 [color-scheme:dark]"
                                    />
                                  </div>

                                  <select
                                    value={it.teamMember}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => updateUnifiedItemField(it.id, 'teamMember', e.target.value)}
                                    className="bg-zinc-900 text-zinc-400 hover:text-white text-[10px] font-bold rounded px-1.5 py-0.5 border-none focus:outline-none cursor-pointer outline-none max-w-[100px]"
                                  >
                                    {['Gabriel F.', 'Amanda R.', 'Carlos O.', 'Adams Leandro'].map(m => (
                                      <option key={m} value={m} className="bg-zinc-950 text-zinc-300">{m.split(' ')[0]}</option>
                                    ))}
                                  </select>
                                </div>

                                {/* ClickUp card controller: column shifter buttons and delete */}
                                <div className="flex items-center justify-between pt-2.5 border-t border-transparent" onClick={(e) => e.stopPropagation()}>
                                  <div className="text-[8px] text-zinc-600 font-extrabold uppercase tracking-wider">
                                    ↔ Arraste para mover
                                  </div>

                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (confirm(`Excluir item ${it.title}?`)) {
                                        deleteUnifiedItem(it.id);
                                      }
                                    }}
                                    className="p-1 text-zinc-600 hover:text-red-400 transition-colors"
                                    title="Excluir este item permanentemente"
                                  >
                                    <Trash2 size={11} />
                                  </button>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}

                        {colItems.length === 0 && (
                          <div className="border border-dashed border-transparent rounded-2xl py-14 text-center text-zinc-800 text-[9px] uppercase font-bold tracking-widest line-clamp-1 bg-zinc-950/10">
                            Sem cartões
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Fast Card Adder at column bottom slot */}
                    <div className="border-t border-transparent pt-3 mt-3">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const inputVal = quickAddInput[col];
                          if (inputVal && inputVal.trim()) {
                            addUnifiedItem(inputVal, col, selectedSector === 'all' ? 'comunicacao-visual' : selectedSector);
                            setQuickAddInput(prev => ({ ...prev, [col]: '' }));
                          }
                        }}
                        className="flex gap-2"
                      >
                        <input
                          type="text"
                          value={quickAddInput[col] || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setQuickAddInput(prev => ({ ...prev, [col]: val }));
                          }}
                          placeholder="+ Novo Cartão..."
                          className="bg-black/60 text-zinc-300 text-[10px] font-bold rounded-lg border-none px-2 py-1.5 w-full outline-none focus:border-purple-600/40 placeholder-zinc-700 focus:text-white"
                        />
                      </form>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      case 'gantt': {
        return (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* ClickUp-style Gantt top bar */}
            <div className={cn("p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs border", isLight ? "bg-white text-zinc-900" : "bg-zinc-900 text-white")}>
              <div className="space-y-1">
                <span className="text-[10px] text-purple-400 font-mono font-black uppercase tracking-widest leading-none block">
                  Cronograma Industrial Integrado de Gantt
                </span>
                <p className="text-xs text-zinc-500">
                  Defina conexões entre processos da fábrica e ajuste os horários individualmente ou de forma automatizada (Auto-Flow).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button 
                  type="button"
                  onClick={() => {
                    autoAdjustSchedule();
                    alert("Turnos e encadeamentos industriais refinados e auto-ajustados com sucesso!");
                  }}
                  className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-lg text-[10px] tracking-wider uppercase transition-transform hover:scale-[1.02] cursor-pointer shadow-lg shadow-purple-600/10"
                >
                  ⚡ Auto-Ajustar Todo o Registro
                </button>
                <button 
                  type="button"
                  onClick={() => setCurrentTime(new Date())}
                  className="px-3.5 py-2 bg-purple-950/30 border border-purple-900/30 text-purple-400 font-black rounded-lg text-[10px] tracking-wider uppercase hover:text-white cursor-pointer"
                >
                  Hoje / Sincronizar Linha de Fluxo
                </button>
              </div>
            </div>

            {/* Dependency Connection Manager */}
            <div className={cn("p-4 rounded-2xl space-y-3.5 border", isLight ? "bg-white text-zinc-900" : "bg-zinc-900 text-white")}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xs font-black uppercase text-purple-400 tracking-wider">Mapeador de Conexões e Dependências de Fábrica</h3>
                  <p className="text-[11px] text-zinc-500">
                    Defina dependências nos processos do setor. Exemplo: um processo sucessor começará logo após o término do antecessor.
                  </p>
                </div>
              </div>

              <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-3 pt-3 border-t items-end", c("border-transparent", "border-transparent"))}>
                <div className="md:col-span-4 space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-zinc-500">Processo Antecessor (Garante Início)</label>
                  <select
                    id="conn-from-select"
                    className="w-full h-9 bg-zinc-950 border-none rounded-xl px-3 text-xs text-zinc-300 outline-none focus:border-purple-600/30"
                  >
                    <option value="">-- Selecione o primeiro --</option>
                    {filteredItems.map(it => (
                      <option key={it.id} value={it.id}>#{it.id.split('-')[1] || it.id} - {it.title} ({it.hour})</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-1 text-center font-bold text-zinc-600 pb-2">
                  ➔
                </div>

                <div className="md:col-span-4 space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-zinc-500">Processo Sucessor (Depende de Início)</label>
                  <select
                    id="conn-to-select"
                    className="w-full h-9 bg-zinc-950 border-none rounded-xl px-3 text-xs text-zinc-300 outline-none focus:border-purple-600/30"
                  >
                    <option value="">-- Selecione o dependente --</option>
                    {filteredItems.map(it => (
                      <option key={it.id} value={it.id}>#{it.id.split('-')[1] || it.id} - {it.title} ({it.hour})</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-3">
                  <button
                    type="button"
                    onClick={() => {
                      const fromVal = (document.getElementById('conn-from-select') as HTMLSelectElement)?.value;
                      const toVal = (document.getElementById('conn-to-select') as HTMLSelectElement)?.value;
                      if (!fromVal || !toVal) {
                        alert('Selecione ambos antecessor e sucessor.');
                        return;
                      }
                      if (fromVal === toVal) {
                        alert('Um processo não depende de si próprio.');
                        return;
                      }
                      const exists = customConnections.some(c => c.from === fromVal && c.to === toVal);
                      if (exists) {
                        alert('Esta conexão já existe.');
                        return;
                      }
                      setCustomConnections(prev => [...prev, { from: fromVal, to: toVal }]);
                    }}
                    className="w-full h-9 bg-zinc-900 border-none text-zinc-300 hover:text-white uppercase font-black tracking-widest text-[10px] rounded-xl hover:bg-zinc-800 transition-colors"
                  >
                    🔗 Conectar Processos
                  </button>
                </div>
              </div>

              {customConnections.length > 0 && (
                <div className="pt-2">
                  <span className="text-[10px] font-black uppercase text-zinc-600 block mb-2">Encadeamentos de Fábrica Ativos:</span>
                  <div className="flex flex-wrap gap-2">
                    {customConnections.map((conn, cIdx) => {
                      return (
                        <div key={`${conn.from}-${conn.to}-${cIdx}`} className="bg-zinc-950 px-2.5 py-1.5 rounded-lg border-none flex items-center gap-2 text-[10px] hover:border-purple-600/30 transition-colors">
                          <span className="text-zinc-500">#{conn.from.split('-')[1] || conn.from}</span>
                          <span className="text-purple-400">➔</span>
                          <span className="text-zinc-300 font-bold">#{conn.to.split('-')[1] || conn.to}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setCustomConnections(prev => prev.filter((_, idx) => idx !== cIdx));
                            }}
                            className="text-red-500 hover:text-red-400 font-bold ml-1 text-xs px-1 hover:bg-red-950/10 rounded"
                            title="Desfazer dependência"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Gantt Timeline Grid */}
            <div className="border-none bg-zinc-900 rounded-2xl overflow-x-auto shadow-sm relative">
              <div className="min-w-[950px]">
                {/* Grid Header containing Hours representation */}
                <div className="grid grid-cols-12 border-b border-transparent">
                  {/* Left Header label */}
                  <div className="col-span-4 p-4 border-r border-transparent text-[10px] font-black uppercase text-zinc-500 tracking-widest font-sans">
                    Fila de Processos Semanais Ativos ({activeTab.toUpperCase()})
                  </div>
                  {/* Right Hours list */}
                  <div 
                    className="col-span-8 grid p-4 relative bg-zinc-950/40 font-mono text-[9px] font-black text-zinc-500 text-center"
                    style={{ gridTemplateColumns: 'repeat(17, minmax(0, 1fr))' }}
                  >
                    {ganttHours.map((hObj) => (
                      <div key={hObj.label} className="truncate border-r border-transparent last:border-r-0">
                        {hObj.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grid rows list */}
                <div className="divide-y divide-zinc-900/60 min-h-[400px] relative">
                  
                  {/* VISUAL SVG DEPENDENCY FLUX OVERLAY */}
                  {customConnections.length > 0 && (
                    <svg className="absolute left-[33.333%] w-[66.666%] h-full top-0 pointer-events-none z-20">
                      <defs>
                        <linearGradient id="gantt-neon-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#818cf8" stopOpacity="0.75" />
                          <stop offset="100%" stopColor="#c084fc" stopOpacity="0.75" />
                        </linearGradient>
                      </defs>
                      {customConnections.map((conn, idx) => {
                        const fromIdx = filteredItems.findIndex(it => it.id === conn.from);
                        const toIdx = filteredItems.findIndex(it => it.id === conn.to);
                        if (fromIdx === -1 || toIdx === -1) return null;

                        const fromItem = filteredItems[fromIdx];
                        const toItem = filteredItems[toIdx];

                        const fromStart = parseTaskHour(fromItem.hour);
                        const fromDur = customDurations[fromItem.id] !== undefined ? customDurations[fromItem.id] : 2.0;
                        const fromEndPercent = Math.max(0, Math.min(100, ((fromStart + fromDur - 2) / 16) * 100));

                        const toStart = parseTaskHour(toItem.hour);
                        const toStartPercent = Math.max(0, Math.min(100, ((toStart - 2) / 16) * 100));

                        const y1 = fromIdx * 64 + 32;
                        const y2 = toIdx * 64 + 32;

                        return (
                          <g key={`flow-svg-${conn.from}-${conn.to}-${idx}`}>
                            <path
                              d={`M ${fromEndPercent}% ${y1} C ${(fromEndPercent + toStartPercent) / 2}% ${y1}, ${(fromEndPercent + toStartPercent) / 2}% ${y2}, ${toStartPercent}% ${y2}`}
                              fill="none"
                              stroke="url(#gantt-neon-grad)"
                              strokeWidth="1.8"
                              strokeDasharray="4 3"
                            />
                            <circle cx={`${fromEndPercent}%`} cy={y1} r="3" className="fill-indigo-500" />
                            <circle cx={`${toStartPercent}%`} cy={y2} r="3" className="fill-purple-400" />
                          </g>
                        );
                      })}
                    </svg>
                  )}

                  {/* REAL-TIME VERTICAL INDICATOR LINE */}
                  {(() => {
                    const leftPercentage = getGanttLineLeft();
                    const h = currentTime.getHours().toString().padStart(2, '0');
                    const m = currentTime.getMinutes().toString().padStart(2, '0');
                    const s = currentTime.getSeconds().toString().padStart(2, '0');
                    
                    return (
                      <div 
                        className="absolute top-0 bottom-0 pointer-events-none transition-all duration-1000 z-30"
                        style={{ 
                          left: `calc(33.333% + (66.666% * ${leftPercentage / 100}))`,
                          transform: 'translateX(-50%)'
                        }}
                      >
                        <div className="w-3 h-3 rounded-full bg-red-600 border border-white absolute -top-1.5 left-1/2 -translate-x-1/2 flex items-center justify-center shadow-lg shadow-red-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        </div>
                        <div className="h-full border-l-[1.5px] border-red-500 relative">
                          <div className="absolute top-6 left-3 bg-red-650 text-white font-mono text-[8.5px] font-black px-2 py-1 rounded shadow-lg flex items-center gap-1.5 shrink-0 whitespace-nowrap z-50">
                            <span className="relative flex h-1 w-1">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1 w-1 bg-red-100"></span>
                            </span>
                            <span>{h}:{m}:{s} <span className="text-red-300 font-medium">MES LIVE</span></span>
                          </div>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-red-500 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                      </div>
                    );
                  })()}

                  {/* Rows listing */}
                  {filteredItems.map((it) => {
                    // Gantt positioning calculations
                    const taskStart = parseTaskHour(it.hour);
                    const taskDuration = customDurations[it.id] !== undefined ? customDurations[it.id] : 2.0;
                    const startPercent = Math.max(0, Math.min(100, ((taskStart - 2) / 16) * 100));
                    const widthPercent = Math.max(8, Math.min(100 - startPercent, (taskDuration / 16) * 100));
                    const isSelected = selectedGanttTask === it.id;

                    const hasIncomingDeps = customConnections.some(c => c.to === it.id);
                    const hasOutgoingDeps = customConnections.some(c => c.from === it.id);

                    return (
                      <div 
                        key={it.id} 
                        onClick={() => setSelectedGanttTask(it.id === selectedGanttTask ? null : it.id)}
                        className={cn(
                          "grid grid-cols-12 hover:bg-zinc-900/20 transition-colors items-center cursor-pointer select-none",
                          isSelected ? "bg-zinc-900/30" : ""
                        )}
                      >
                        {/* Task info column */}
                        <div className="col-span-4 p-3.5 border-r border-transparent flex items-center justify-between gap-3 bg-zinc-950/20 h-16">
                          <div className="space-y-1 truncate max-w-[80%] text-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-[9.5px] font-mono font-black text-purple-400">#{it.id}</span>
                              <span className="text-[8.5px] font-black uppercase text-zinc-500 tracking-wide">{it.status}</span>
                            </div>
                            <h4 className="text-xs font-black text-white uppercase italic tracking-tight truncate">{it.title}</h4>
                            <p className="text-[10px] text-zinc-500 uppercase truncate leading-none">Responsável: {it.teamMember}</p>
                          </div>
                          
                          <div className="flex flex-col gap-1 items-end">
                            <Badge className={cn("text-[7.5px] px-1.5 py-0.5 border-0 font-sans tracking-wide shrink-0 font-black", getSetorColor(it.sector))}>
                              {getSetorLabel(it.sector).split(' ')[0]}
                            </Badge>
                            <span className="text-[7.5px] font-mono font-semibold text-zinc-600 uppercase flex items-center gap-1">
                              {getPriorityFlag(it.id).split(' ')[1]}
                              {(hasIncomingDeps || hasOutgoingDeps) && <span className="text-purple-400">🔗</span>}
                            </span>
                          </div>
                        </div>

                        {/* Timeline bar slot */}
                        <div className="col-span-8 p-3 relative bg-zinc-950/10 flex items-center h-16">
                          {/* Background timeline markers */}
                          <div 
                            className="absolute inset-0 grid pointer-events-none divide-x divide-zinc-900/10"
                            style={{ gridTemplateColumns: 'repeat(17, minmax(0, 1fr))' }}
                          >
                            {Array.from({ length: 17 }).map((_, i) => (
                              <div key={i} />
                            ))}
                          </div>

                          {/* Visual Timeline Bar block */}
                          <div 
                            className={cn(
                              "absolute h-10 rounded-xl flex items-center px-4 group border shadow-md transition-all duration-200 hover:brightness-110",
                              isSelected ? "border-purple-400 shadow-purple-600/10 ring-1 ring-purple-600/30" : ""
                            )}
                            style={{
                              left: `${startPercent}%`,
                              width: `${widthPercent}%`,
                              background: getGanttBarColor(it.sector),
                              borderColor: getGanttBarBorder(it.sector)
                            }}
                          >
                            <div className="flex items-center justify-between w-full text-white font-sans text-[10px] font-black truncate relative z-10">
                              <span className="truncate flex items-center gap-1">
                                {hasIncomingDeps && <span className="text-blue-400/80 mr-0.5">▶</span>}
                                {it.title}
                                {hasOutgoingDeps && <span className="text-purple-400/80 ml-0.5">▶</span>}
                              </span>
                              
                              {/* Inline Slider Shifters for Start Hour */}
                              <div 
                                className="flex items-center gap-1.5 ml-2 bg-black/90 border-none p-1 rounded-lg shrink-0"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  type="button"
                                  onClick={() => shiftTaskHour(it.id, 'earlier')}
                                  className="text-[10px] text-zinc-400 hover:text-white px-1 hover:bg-zinc-800 rounded font-black cursor-pointer"
                                  title="Antecipar processo em 30 minutos"
                                >
                                  ◄
                                </button>
                                <span className="font-mono text-[8px] text-purple-400 font-bold min-w-[28px] text-center">
                                  {it.hour}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => shiftTaskHour(it.id, 'later')}
                                  className="text-[10px] text-zinc-400 hover:text-white px-1 hover:bg-zinc-800 rounded font-black cursor-pointer"
                                  title="Atrasar/Reprogramar processo em 30 minutos"
                                >
                                  ►
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {filteredItems.length === 0 && (
                    <div className="py-24 text-center text-zinc-700 font-black uppercase text-[10px] tracking-widest bg-zinc-950/5 border-dashed border-transparent rounded-b-2xl m-3">
                      Nenhum processo correspondente aos filtros foi planejado.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Float/Interactive console drawer for selected task */}
            {selectedGanttTask && (() => {
              const selectedItem = filteredItems.find(it => it.id === selectedGanttTask);
              if (!selectedItem) return null;

              const numericHour = parseTaskHour(selectedItem.hour);
              const duration = customDurations[selectedItem.id] !== undefined ? customDurations[selectedItem.id] : 2.0;

              return (
                <div className={cn("rounded-2xl p-4 space-y-4 animate-in slide-in-from-bottom duration-200 border", isLight ? "bg-white text-zinc-900" : "bg-zinc-900 text-white")}>
                  <div className={cn("flex items-center justify-between border-b pb-3", c("border-transparent", "border-transparent"))}>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] bg-purple-950 text-purple-400 border border-purple-500/20 font-mono font-black px-2 py-0.5 rounded-lg">#{selectedItem.id}</span>
                      <h4 className="text-xs font-black uppercase text-white tracking-wide italic">{selectedItem.title}</h4>
                      <span className="text-[10px] text-zinc-500">({selectedItem.status})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedGanttTask(null)}
                      className="text-zinc-500 hover:text-zinc-300 text-xs font-bold font-mono transition-colors"
                    >
                      Fechar Ajuste [×]
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Hour position range input (puxar as horas) */}
                    <div className="bg-zinc-900 border-none p-3.5 rounded-xl space-y-2.5">
                      <div className="flex items-center justify-between font-mono text-[10px] font-black">
                        <span className="text-zinc-500 uppercase tracking-wider">Ajustar Horário de Início (Arraste para Puxar):</span>
                        <span className="text-purple-450 text-xs bg-purple-950/60 px-1.5 rounded">{selectedItem.hour}h</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="18"
                        step="0.5"
                        value={numericHour}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          const h = Math.floor(val);
                          const m = Math.round((val % 1) * 60);
                          const formattedHour = `${h.toString().padStart(2, '0')}:${m === 0 ? '00' : m.toString().padStart(2, '0')}`;
                          updateUnifiedItemField(selectedItem.id, 'hour', formattedHour);
                        }}
                        className="w-full accent-purple-600 cursor-pointer h-1.5 bg-zinc-900 rounded-lg appearance-none"
                      />
                      <div className="flex items-center justify-between text-[8px] font-bold text-zinc-600 font-mono">
                        <span>02:00</span>
                        <span>10:00</span>
                        <span>18:00</span>
                      </div>
                    </div>

                    {/* Operational Duration range input (esticar o processo) */}
                    <div className="bg-zinc-900 border-none p-3.5 rounded-xl space-y-2.5">
                      <div className="flex items-center justify-between font-mono text-[10px] font-black">
                        <span className="text-zinc-500 uppercase tracking-wider">Ajustar Durabilidade (Tempo de Produção):</span>
                        <span className="text-emerald-450 text-xs bg-emerald-950/60 px-1.5 rounded">{duration.toFixed(1)} Horas</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="8"
                        step="0.5"
                        value={duration}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          updateUnifiedItemField(selectedItem.id, 'duration', val);
                        }}
                        className="w-full accent-emerald-555 cursor-pointer h-1.5 bg-zinc-900 rounded-lg appearance-none"
                      />
                      <div className="flex items-center justify-between text-[8px] font-bold text-zinc-600 font-mono">
                        <span>0.5h (Rápido)</span>
                        <span>4.0h (Padrão)</span>
                        <span>8.0h (Turno Completo)</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-950/60 p-3 rounded-lg border-none flex justify-between items-center text-[10px] gap-4">
                    <div className="space-y-0.5">
                      <span className="text-zinc-600 uppercase font-black text-[9px] block">Colaborador Operador (Clique Up MES)</span>
                      <span className="text-zinc-300 font-bold uppercase">{selectedItem.teamMember}</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          autoAdjustSchedule();
                          alert("Ajustes sequenciados em cascata efetuados com sucesso!");
                        }}
                        className="px-3.5 py-2 bg-purple-950/40 hover:bg-purple-900/30 border border-purple-900/30 text-purple-400 font-extrabold rounded-lg uppercase tracking-wider text-[9px]"
                      >
                        ⚡ Re-Alinhar Dependências do Operador
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }

      case 'calendario': {
        const daysInJune = 30;
        const daysArray = Array.from({ length: daysInJune }, (_, i) => i + 1);

        return (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-in fade-in duration-300">
            {/* Esquerda: Calendário representativo */}
            <div className="xl:col-span-8 space-y-4">
              <div className={cn("p-4 rounded-2xl flex items-center justify-between gap-4 border", isLight ? "bg-white text-zinc-900" : "bg-zinc-900 text-white")}>
                <div>
                  <span className="text-[10px] text-purple-400 font-black uppercase tracking-widest leading-none block mb-1">
                    Calendário de Fluxo de Fábrica Korteck
                  </span>
                  <h3 className={cn("text-sm font-black italic uppercase", c("text-zinc-900", "text-white"))}>Junho 2026</h3>
                </div>
                <Badge className="bg-purple-950/50 text-purple-400 font-black border border-purple-900/30 font-mono text-[9.5px]">
                  CRONOGRAMA MENSAL MES & CRM
                </Badge>
              </div>

              {/* Grid de Dias */}
              <div className={cn("rounded-2xl overflow-hidden shadow-sm border", isLight ? "bg-white text-zinc-900" : "bg-zinc-900 text-white")}>
                <div className={cn("grid grid-cols-7 border-b text-center text-[10px] font-black uppercase p-3", c("bg-zinc-100 border-transparent text-zinc-500", "bg-zinc-950 border-transparent text-zinc-500"))}>
                  <div>Seg</div>
                  <div>Ter</div>
                  <div>Qua</div>
                  <div>Qui</div>
                  <div>Sex</div>
                  <div className="text-zinc-600">Sáb</div>
                  <div className="text-zinc-600">Dom</div>
                </div>

                <div className="grid grid-cols-7 divide-x divide-y divide-zinc-900 text-xs min-h-[460px]">
                  {daysArray.map((dayNum) => {
                    const dayStr = `2026-06-${dayNum.toString().padStart(2, '0')}`;
                    const dayItems = filteredItems.filter(it => it.date === dayStr);

                    return (
                      <div 
                        key={dayNum} 
                        className="p-2.5 bg-zinc-950/10 min-h-[95px] flex flex-col justify-between hover:bg-zinc-900/20 transition-all cursor-pointer relative"
                        onClick={() => {
                          const customTask = prompt(`Adicionar rápida Ordem de Produção no dia ${dayNum}/06/2026:\nDigite o nome do Projeto:`);
                          if (customTask && customTask.trim()) {
                            addUnifiedItem(customTask, columns[0], 'comunicacao-visual', dayStr);
                          }
                        }}
                        title="Clique neste dia para programar diretamente uma tarefa na agenda"
                      >
                        {/* Day indicator hover plus */}
                        <div className="flex justify-between items-center">
                          <span className="font-mono font-black text-zinc-500 text-[11px] block">{dayNum}</span>
                          <span className="text-[8px] text-zinc-700 opacity-0 hover:opacity-100 uppercase font-black">+ Agendar</span>
                        </div>
                        
                        <div className="space-y-1 mt-2.5 overflow-hidden max-h-[65px]">
                          {dayItems.map(it => (
                            <div 
                              key={it.id} 
                              onClick={(e) => {
                                e.stopPropagation();
                                alert(`[DETALHE COMERCIAL/MES]\n\nID: ${it.id}\nProjeto: ${it.title}\nPrioridade: ${getPriorityFlag(it.id)}\nStatus: ${it.status}\nResponsável: ${it.teamMember}\nPrazo programado: 2026-06-${dayNum}`);
                              }}
                              className="p-1 rounded-[4px] text-[8.5px] font-black uppercase tracking-tight truncate border hover:scale-[1.012] transition-transform text-white block select-none cursor-pointer"
                              style={{
                                background: getGanttBarColor(it.sector),
                                borderColor: getGanttBarBorder(it.sector)
                              }}
                            >
                              #{it.id.split('-')[1] || it.id} {it.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Direita: Agenda de Atividades detalhada para Junho */}
            <div className="xl:col-span-4 space-y-4">
              <Card className={cn("h-full shadow-sm flex flex-col justify-between border", isLight ? "bg-white text-zinc-900" : "bg-zinc-900 text-white")}>
                <CardHeader className={cn("border-b", c("border-transparent", "border-transparent"))}>
                  <span className="text-[10px] text-purple-400 font-mono font-black uppercase tracking-widest leading-none block mb-1">
                    Agenda ClickUp Consolidada
                  </span>
                  <CardTitle className="text-sm font-black uppercase tracking-tight">Compromissos Agendados</CardTitle>
                  <CardDescription className="text-xs text-zinc-500">Compromissos pendentes e reuniões para Junho de 2026</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3.5 flex-1 overflow-y-auto max-h-[500px]">
                  {filteredItems.map(it => (
                    <div 
                      key={it.id} 
                      className="p-3.5 bg-zinc-950/90 border-none rounded-xl space-y-2.5 hover:border-transparent transition-all text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] font-black text-purple-400">#{it.id}</span>
                        <Badge className={cn("text-[7.5px] font-black uppercase border-0 shadow-none", getSetorColor(it.sector))}>
                          {getSetorLabel(it.sector).split(' ')[0]}
                        </Badge>
                      </div>

                      <div className="space-y-0.5">
                        <h4 className="font-extrabold text-white uppercase italic tracking-tight">{it.title}</h4>
                        <p className="text-[10px] text-zinc-500 line-clamp-2">{it.subtitle}</p>
                      </div>

                      <div className="flex items-center justify-between text-[10px] bg-zinc-900 p-2 rounded-lg border-none w-full font-bold">
                        <span className="text-zinc-500">Data Limite:</span>
                        <span className="text-zinc-300 font-mono">{it.date.split('-').reverse().join('/')}</span>
                      </div>

                      {/* Reprogram due date trigger */}
                      <div className="flex items-center justify-between gap-1.5 pt-1 text-[10px] font-black uppercase text-zinc-400">
                        <span>Reagendar:</span>
                        <input
                          type="date"
                          value={it.date}
                          onChange={(e) => updateUnifiedItemField(it.id, 'date', e.target.value)}
                          className="bg-zinc-900 border-none text-zinc-200 rounded px-1.5 py-0.5 outline-none cursor-pointer text-[10px] font-medium"
                        />
                      </div>
                    </div>
                  ))}

                  {filteredItems.length === 0 && (
                    <div className="text-center py-20 text-zinc-700 font-bold uppercase tracking-wide text-[9px]">
                      Nenhuma atividade agendada.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        );
      }

      case 'equipe': {
        const teamMembers = [
          'Gabriel F.',
          'Amanda R.',
          'Carlos O.',
          'Adams Leandro'
        ];

        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className={cn("p-4 rounded-2xl flex items-center justify-between gap-4 flex-wrap border", isLight ? "bg-white text-zinc-900" : "bg-zinc-900 text-white")}>
              <div className="space-y-1">
                <span className="text-[10px] text-purple-400 font-mono font-black uppercase tracking-widest block leading-none mb-1">
                  ClickUp Workload & Capacidades de Chão de Fábrica (MES Korteck)
                </span>
                <p className="text-xs text-zinc-500 font-sans">
                  Gestão dinâmica de profissionais ativos. Reatribua a titularidade das tarefas para equilibrar o fluxo operacional.
                </p>
              </div>
              <Badge className="bg-zinc-900 border-none text-emerald-400 font-mono font-black text-[10px] px-3.5 py-1">
                4 MEMBROS ATIVOS NO TURNO
              </Badge>
            </div>

            {/* Columns of team members */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => {
                const memberItems = filteredItems.filter(it => it.teamMember === member);
                
                // Workload calculation: each task counts as 3 workload hours. Ideal capacity is 8 hours/day.
                const totalHours = memberItems.length * 3;
                const capacityPercentage = Math.min(133, (totalHours / 8) * 105);
                const isOverloaded = totalHours > 8;

                return (
                  <div key={member} className="bg-zinc-900 border-none rounded-2xl p-4.5 space-y-4 flex flex-col justify-between shadow-sm">
                    <div className="space-y-4">
                      {/* Member Info card Header */}
                      <div className="flex items-center gap-3 border-b border-transparent pb-3 justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-purple-600/10 text-purple-400 flex items-center justify-center text-xs font-black uppercase border border-purple-500/25">
                            {member.split(' ')[0].charAt(0)}{member.split(' ')[1]?.charAt(0) || ''}
                          </div>
                          <div>
                            <span className="text-xs font-black uppercase text-zinc-200 block">{member}</span>
                            <span className="text-[10px] text-zinc-500 lowercase font-medium">@korteck.com.br</span>
                          </div>
                        </div>
                        <Badge className="bg-zinc-950 border-transparent text-zinc-400 font-mono text-[10px]">{memberItems.length} tarefas</Badge>
                      </div>

                      {/* ClickUp Capacity visualizer gauge */}
                      <div className="bg-zinc-950 p-3 rounded-xl border-none space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-sans font-black">
                          <span className="text-zinc-500 uppercase tracking-widest">ALOCAÇÃO DIÁRIA:</span>
                          <span className={cn(
                            isOverloaded ? "text-red-400" : "text-purple-400",
                            "font-mono"
                          )}>
                            {totalHours}h / 8h ({capacityPercentage.toFixed(0)}%)
                          </span>
                        </div>
                        
                        <Progress 
                          value={capacityPercentage} 
                          className={cn(
                            "h-2 rounded bg-zinc-900",
                            isOverloaded ? "text-red-500" : "text-purple-500"
                          )}
                        />

                        {isOverloaded ? (
                          <span className="text-[8px] font-black uppercase tracking-wider text-red-500 block animate-pulse">
                            🚨 Alerta: Sobrecarga industrial / Risco de atraso
                          </span>
                        ) : (
                          <span className="text-[8px] font-black uppercase tracking-wider text-emerald-400 block">
                            ✓ Capacidade saudável de trabalho
                          </span>
                        )}
                      </div>

                      {/* Member active Tasks list */}
                      <div className="space-y-3.5">
                        {memberItems.map(it => (
                          <Card key={it.id} className="bg-black/60 border-transparent hover:border-purple-600/20 transition-all text-xs">
                            <CardContent className="p-3.5 space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-purple-400 font-mono font-extrabold text-[9.5px]">#{it.id}</span>
                                <Badge className={cn("text-[7.5px] border-0 uppercase px-1.5 shadow-none", getSetorColor(it.sector))}>
                                  {getSetorLabel(it.sector).split(' ')[0]}
                                </Badge>
                              </div>
                              
                              <div className="space-y-0.5">
                                <h4 className="text-xs font-black text-white uppercase italic tracking-tight">{it.title}</h4>
                                <p className="text-[10px] text-zinc-500 leading-snug line-clamp-1">{it.subtitle}</p>
                              </div>

                              {/* Task Reallocator balance dropdown */}
                              <div className="pt-2.5 border-t border-transparent flex flex-col gap-1.5 text-[9px] font-mono">
                                <span className="text-zinc-600 font-black uppercase">Reatribuir tarefa para:</span>
                                <select
                                  value={it.teamMember}
                                  onChange={(e) => {
                                    updateUnifiedItemField(it.id, 'teamMember', e.target.value);
                                    alert(`Tarefa #${it.id} de comunicação visual reatribuída com sucesso para ${e.target.value}!`);
                                  }}
                                  className="w-full bg-zinc-90 text-zinc-305 border-none rounded p-1 text-[10px] font-bold outline-none cursor-pointer focus:border-purple-550"
                                >
                                  {teamMembers.map(m => (
                                    <option key={m} value={m}>{m}</option>
                                  ))}
                                </select>
                              </div>
                            </CardContent>
                          </Card>
                        ))}

                        {memberItems.length === 0 && (
                          <div className="border border-dashed border-transparent rounded-2xl py-12 text-center text-zinc-800 text-[9.5px] font-bold uppercase tracking-widest bg-zinc-950/5">
                            Sem tarefas ativas
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className={cn("p-4 md:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-700 max-w-[1650px] mx-auto pb-24", c("text-zinc-900", "text-foreground"))}>
      
      {/* 1. MESH HEADER COMERCIAL */}
      <div className={cn("flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b pb-6", c("border-transparent", "border-transparent"))}>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className={cn("p-2.5 rounded-xl border", c("bg-purple-50 border-purple-200/50", "bg-purple-600/10 border-purple-500/20"))}>
              <Target size={28} className="text-purple-600" />
            </div>
            <div className="flex flex-col">
              <span className={cn("text-[10px] font-black tracking-[0.5em] uppercase", c("text-zinc-500", "text-zinc-500"))}>KORTECK FLOW MÓDULO ERP BI-DIRECIONAL</span>
              <h1 className={cn("text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none", c("text-zinc-900", "text-white"))}>
                Gestão <span className="text-purple-600">Comercial</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Métricas rápidas da Diretoria */}
        <div className={cn("flex flex-wrap items-center gap-6 p-4 rounded-2xl border", c("bg-white border-transparent shadow-sm", "bg-zinc-950/40 border-transparent"))}>
          <div className="text-left">
            <p className={cn("text-[9px] font-black uppercase tracking-widest leading-none mb-1", c("text-zinc-500", "text-zinc-500"))}>TOTAL PIPELINE</p>
            <p className={cn("text-xl font-black italic tracking-tighter", c("text-purple-600", "text-white"))}>
              R$ {deals.reduce((acc, d) => acc + d.valor, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className={cn("h-8 w-px", c("bg-zinc-200", "bg-zinc-800"))} />
          <div className="text-left">
            <p className={cn("text-[9px] font-black uppercase tracking-widest leading-none mb-1", c("text-zinc-500", "text-zinc-500"))}>ATENDIMENTOS PENDENTES</p>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <p className={cn("text-xl font-black italic tracking-tighter", c("text-zinc-900", "text-white"))}>{atendimentos.filter(a => a.status === 'Pendente').length} NOVOS</p>
            </div>
          </div>
          <div className={cn("h-8 w-px", c("bg-zinc-200", "bg-zinc-800"))} />
          <div className="text-left">
            <p className={cn("text-[9px] font-black uppercase tracking-widest leading-none mb-1", c("text-zinc-500", "text-zinc-500"))}>O.S. EM PRODUÇÃO</p>
            <p className="text-xl font-black text-purple-600 dark:text-purple-400 italic tracking-tighter">{ordensServico.filter(o => o.status === 'Producao').length} ATIVAS</p>
          </div>
        </div>
      </div>

      {/* 2. BARRA DE SELEÇÃO DE SETORES INDUSTRIAL */}
      <div className={cn("border p-4 rounded-2xl space-y-3", c("bg-white border-transparent shadow-sm", "bg-zinc-900 border-transparent"))}>
        <div className={cn("flex items-center gap-2", c("text-zinc-600", "text-zinc-400"))}>
          <Tag size={14} className="text-purple-500" />
          <span className="text-[10px] font-black uppercase tracking-wider">Visualização por Área Operacional de Produção / MES:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedSector('all')}
            className={cn(
              "px-4 h-9 rounded-xl text-xs font-black uppercase tracking-wider transition-all border",
              selectedSector === 'all' 
                ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/20"
                : c("bg-zinc-100 border-transparent text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/55", "bg-zinc-900/50 border-transparent text-zinc-400 hover:text-white hover:bg-zinc-800")
            )}
          >
            Todos os Setores (Consolidado)
          </button>
          
          <button
            onClick={() => setSelectedSector('comunicacao-visual')}
            className={cn(
              "px-4 h-9 rounded-xl text-xs font-black uppercase tracking-wider transition-all border",
              selectedSector === 'comunicacao-visual' 
                ? getSetorColor('comunicacao-visual') + " shadow-lg"
                : c("bg-zinc-100 border-transparent text-zinc-600 hover:text-indigo-600 hover:bg-zinc-200/55", "bg-zinc-900/50 border-transparent text-zinc-400 hover:text-indigo-400")
            )}
          >
            📊 Comunicação Visual
          </button>

          <button
            onClick={() => setSelectedSector('corte-cnc')}
            className={cn(
              "px-4 h-9 rounded-xl text-xs font-black uppercase tracking-wider transition-all border",
              selectedSector === 'corte-cnc' 
                ? getSetorColor('corte-cnc') + " shadow-lg"
                : c("bg-zinc-100 border-transparent text-zinc-600 hover:text-emerald-600 hover:bg-zinc-200/55", "bg-zinc-900/50 border-transparent text-zinc-400 hover:text-emerald-400")
            )}
          >
            ⚙️ Corte CNC
          </button>

          <button
            onClick={() => setSelectedSector('impressao-digital')}
            className={cn(
              "px-4 h-9 rounded-xl text-xs font-black uppercase tracking-wider transition-all border",
              selectedSector === 'impressao-digital' 
                ? getSetorColor('impressao-digital') + " shadow-lg"
                : c("bg-zinc-100 border-transparent text-zinc-600 hover:text-pink-600 hover:bg-zinc-200/55", "bg-zinc-900/50 border-transparent text-zinc-400 hover:text-pink-400")
            )}
          >
            🖼️ Impressão Digital
          </button>

          <button
            onClick={() => setSelectedSector('impressao-3d')}
            className={cn(
              "px-4 h-9 rounded-xl text-xs font-black uppercase tracking-wider transition-all border",
              selectedSector === 'impressao-3d' 
                ? getSetorColor('impressao-3d') + " shadow-lg"
                : c("bg-zinc-100 border-transparent text-zinc-600 hover:text-amber-600 hover:bg-zinc-200/55", "bg-zinc-900/50 border-transparent text-zinc-400 hover:text-amber-400")
            )}
          >
            🧊 Impressão 3D
          </button>
        </div>
      </div>

      {/* 3. TABS SEQUENCIAIS EXATAS DO COMERCIAL */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-transparent border-0 p-0 flex flex-wrap gap-2 w-full overflow-x-auto scrollbar-hide pb-2">
          {[
            { id: 'atendimento', label: '1. Atendimento', count: atendimentos.length },
            { id: 'funil', label: '2. Funil Comercial', count: deals.length },
            { id: 'projetos', label: '3. Projetos (Designs)', count: projetos.length },
            { id: 'orcamentos', label: '4. Orçamentos', count: orcamentos.length },
            { id: 'ordem-servicos', label: '5. Ordem de Serviço', count: ordensServico.length },
            { id: 'campanhas', label: '6. Arte Finalista', count: campanhas.length }
          ].map((tab, i) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className={cn(
                "data-[state=active]:bg-purple-600 data-[state=active]:text-white text-xs font-black uppercase h-11 px-4.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md",
                c("bg-white hover:bg-zinc-50 border-none text-zinc-700 data-[state=active]:border-purple-600", "text-zinc-400 bg-zinc-900/40 hover:bg-zinc-800/60 border-none data-[state=active]:border-purple-500")
              )}
            >
              <span>{tab.label}</span>
              <span className={cn(
                "text-[10px] px-1.5 py-0.5 rounded-full font-mono border",
                c("bg-zinc-100 text-zinc-600 border-transparent", "bg-black/45 text-zinc-300 border-transparent")
              )}>{tab.count}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* BARRA DE VISUALIZAÇÕES ESTILO CLICKUP (ANEXO 2) */}
        {renderViewsBar()}

        {viewMode === 'lista' ? (
          <>
            {/* ==================== 1. ABA DE ATENDIMENTO ==================== */}
            <TabsContent value="atendimento" className="outline-none space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Esquerda: Novo Chamado de Atendimento */}
            <div className="lg:col-span-4">
              <Card className={cn(isLight ? "bg-white text-zinc-900" : "bg-zinc-900 text-white")}>
                <CardHeader>
                  <CardTitle className={cn("text-sm font-black uppercase tracking-widest", c("text-purple-600", "text-[#a855f7]"))}>Novo Atendimento</CardTitle>
                  <CardDescription className="text-xs text-zinc-500">Mapeamento inicial de chamados de clientes do varejo e corporativo</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddAtendimento} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className={cn("text-[10px] font-black uppercase tracking-wider", c("text-zinc-600", "text-zinc-400"))}>Nome do Lead / Cliente</label>
                      <Input
                        value={newAtendCliente}
                        onChange={(e) => setNewAtendCliente(e.target.value)}
                        placeholder="Ex: McDonald's Brasil"
                        className={cn("h-11 text-xs", c("bg-zinc-50 border-transparent text-zinc-900 focus:bg-white focus:border-purple-600", "bg-black/40 border-transparent text-white"))}
                      />
                    </div>
 
                    <div className="space-y-1.5">
                      <label className={cn("text-[10px] font-black uppercase tracking-wider", c("text-zinc-600", "text-zinc-400"))}>Assunto / Necessidade Técnico</label>
                      <Input
                        value={newAtendAssunto}
                        onChange={(e) => setNewAtendAssunto(e.target.value)}
                        placeholder="Ex: Retrofit de Painel Luminoso"
                        className={cn("h-11 text-xs", c("bg-zinc-50 border-transparent text-zinc-900 focus:bg-white focus:border-purple-600", "bg-black/40 border-transparent text-white"))}
                      />
                    </div>
 
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className={cn("text-[10px] font-black uppercase tracking-wider", c("text-zinc-600", "text-zinc-400"))}>Setor Especializado</label>
                        <select
                          value={newAtendSetor}
                          onChange={(e) => setNewAtendSetor(e.target.value as SectorType)}
                          className={cn("w-full border rounded-lg text-xs h-11 px-3 outline-none", c("bg-zinc-50 border-transparent text-zinc-900 focus:border-purple-600 focus:ring-1 focus:ring-purple-600", "bg-black/40 border-none text-white"))}
                        >
                          <option value="comunicacao-visual">Comunicação Visual</option>
                          <option value="corte-cnc">Corte CNC</option>
                          <option value="impressao-digital">Impressão Digital</option>
                          <option value="impressao-3d">Impressão 3D</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className={cn("text-[10px] font-black uppercase tracking-wider", c("text-zinc-600", "text-zinc-400"))}>Meio de Contato</label>
                        <select
                          value={newAtendCanal}
                          onChange={(e) => setNewAtendCanal(e.target.value as any)}
                          className={cn("w-full border rounded-lg text-xs h-11 px-3 outline-none", c("bg-zinc-50 border-transparent text-zinc-900 focus:border-purple-600 focus:ring-1 focus:ring-purple-600", "bg-black/40 border-none text-white"))}
                        >
                          <option value="WhatsApp">WhatsApp</option>
                          <option value="Telefone">Telefone</option>
                          <option value="E-mail">E-mail</option>
                          <option value="Presencial">Presencial</option>
                        </select>
                      </div>
                    </div>
 
                    <div className="space-y-1.5">
                      <label className={cn("text-[10px] font-black uppercase tracking-wider", c("text-zinc-600", "text-zinc-400"))}>Detalhamento dos Requisitos</label>
                      <textarea
                        value={newAtendDesc}
                        onChange={(e) => setNewAtendDesc(e.target.value)}
                        placeholder="Especifique dimensões, materiais, se tem arquivo pronto..."
                        className={cn("w-full border rounded-lg text-xs p-3 h-24 outline-none", c("bg-zinc-50 border-transparent text-zinc-900 focus:bg-white focus:border-purple-600", "bg-black/40 border-none text-white focus:border-purple-650"))}
                      />
                    </div>
 
                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white h-11 font-black text-xs uppercase tracking-wider cursor-pointer">
                      Cadastrar Atendimento
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
 
            {/* Direita: Tabela ou Lista de Atendimentos */}
            <div className="lg:col-span-8">
              <Card className={cn(isLight ? "bg-white text-zinc-900" : "bg-zinc-900 text-white", "h-full")}>
                <CardHeader className={cn("flex flex-row items-center justify-between pb-4 border-b", c("border-transparent", "border-transparent"))}>
                  <div>
                    <CardTitle className={cn("text-sm font-black uppercase", c("text-zinc-900", "text-white"))}>Fila de Atendimento Geral</CardTitle>
                    <CardDescription className="text-xs text-zinc-500">Acompanhamento em tempo real da carteira industrial</CardDescription>
                  </div>
                  <Badge variant="outline" className="border-purple-500/20 text-purple-600 dark:text-purple-400 text-[10px] font-mono">
                    {visibleAtendimentos.length} ATENDIMENTOS FILTRADOS
                  </Badge>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans text-xs">
                      <thead>
                        <tr className={cn("text-[9.5px] font-black uppercase border-b", c("bg-zinc-50/60 text-zinc-500 border-transparent", "bg-zinc-950/40 text-zinc-500 border-transparent"))}>
                          <th className="p-4 pl-6">Código / Data</th>
                          <th className="p-4">Cliente / Contato</th>
                          <th className="p-4">Assunto Comercial</th>
                          <th className="p-4">Setor Destino</th>
                          <th className="p-4 text-center">Status</th>
                          <th className="p-4 text-right">Ação</th>
                        </tr>
                      </thead>
                      <tbody className={cn("divide-y", c("divide-zinc-200", "divide-zinc-900"))}>
                        {visibleAtendimentos.map((atend) => (
                          <tr 
                            key={atend.id} 
                            onClick={() => openHighFidelityModal(atend.id, 'atendimento')}
                            className={cn("transition-colors cursor-pointer", c("hover:bg-zinc-100/50", "hover:bg-zinc-900/25"))}
                          >
                            <td className="p-4 pl-6 font-mono text-[10px] text-zinc-400">
                              <span className="block font-black text-purple-600">#{atend.id}</span>
                              <span className="block text-[9.5px] mt-0.5">{atend.data}</span>
                            </td>
                            <td className="p-4">
                              <p className={cn("font-extrabold text-xs", c("text-zinc-900", "text-white"))}>{atend.cliente}</p>
                              <div className="flex items-center gap-1.5 text-[9.5px] mt-0.5 uppercase">
                                <span className={cn("px-1.5 py-0.5 rounded text-[8.5px]", c("bg-zinc-100 border-none text-zinc-600", "bg-zinc-800 text-zinc-400"))}>{atend.canal}</span>
                                <span className={c("text-zinc-500", "text-zinc-400")}>{atend.contato}</span>
                              </div>
                            </td>
                            <td className="p-4 max-w-sm truncate">
                              <p className={cn("font-semibold text-xs", c("text-zinc-800", "text-zinc-300"))}>{atend.assunto}</p>
                              <p className="text-[10px] text-zinc-500 italic mt-0.5 leading-tight">{atend.descricao}</p>
                            </td>
                            <td className="p-4">
                              <Badge className={cn("border-0 text-[10px] font-black uppercase", getSetorColor(atend.setor))}>
                                {getSetorLabel(atend.setor)}
                              </Badge>
                            </td>
                            <td className="p-4 text-center">
                              <span className={cn(
                                "px-2 py-1 rounded text-[9.5px] font-black uppercase tracking-tight",
                                atend.status === 'Pendente' && "bg-red-500/10 text-red-650 dark:text-red-400 border border-red-200 dark:border-red-900/10",
                                atend.status === 'Retornado' && "bg-amber-500/10 text-amber-650 dark:text-amber-400 border border-amber-200 dark:border-amber-900/10",
                                atend.status === 'Em Proposta' && "bg-blue-500/10 text-blue-650 dark:text-blue-400 border border-blue-200 dark:border-blue-900/10",
                                atend.status === 'Finalizado' && "bg-emerald-500/10 text-emerald-650 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/10"
                              )}>
                                {atend.status}
                              </span>
                            </td>
                            <td className="p-4 text-right flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  // Simular conversão de atendimento em Negócio no Funil
                                  const novoNegocio: Deal = {
                                    id: `D-${Math.floor(200 + Math.random() * 800)}`,
                                    cliente: atend.cliente,
                                    projeto: atend.assunto,
                                    valor: 5000 + Math.floor(Math.random() * 25000),
                                    probabilidade: 25,
                                    setor: atend.setor,
                                    estagio: 'captacao',
                                    diasInativo: 0,
                                    alertas: 0
                                  };
                                  setDeals([novoNegocio, ...deals]);
                                  // Atualizar status do atendimento
                                  setAtendimentos(prev => prev.map(a => a.id === atend.id ? { ...a, status: 'Em Proposta' } : a));
                                  alert(`Atendimento #${atend.id} convertido em oportunidade no Funil Comercial com sucesso!`);
                                }}
                                className="border-purple-500/20 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white text-[9.5px] font-black uppercase shrink-0 h-8"
                              >
                                Gerar Negócio <Zap size={11} className="ml-1.5" />
                              </Button>

                              <Button
                                size="sm"
                                variant="outline"
                                title="Editar Atendimento"
                                onClick={() => setEditingAtendimento(atend)}
                                className={cn("p-2 h-8 w-8 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border", c("border-transparent", "border-transparent"))}
                              >
                                <Pencil size={11} />
                              </Button>

                              <Button
                                size="sm"
                                variant="outline"
                                title="Excluir Atendimento"
                                onClick={() => {
                                  if (confirm(`Deseja realmente excluir o atendimento de ${atend.cliente}?`)) {
                                    setAtendimentos(prev => prev.filter(item => item.id !== atend.id));
                                  }
                                }}
                                className="p-2 h-8 w-8 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-650 dark:text-red-400 border border-red-200/50 dark:border-red-900/30"
                              >
                                <Trash2 size={11} />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ==================== 2. ABA DE FUNIL COMERCIAL ==================== */}
        <TabsContent value="funil" className="outline-none space-y-6">
          <Card className={cn("p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 border", c("bg-white border-transparent text-zinc-950", "bg-zinc-900 border-transparent text-white"))}>
            <div className="space-y-1">
              <span className="text-[10px] text-purple-650 dark:text-purple-500 font-black uppercase">PIPELINE DE VENDAS KORTECK CRM</span>
              <p className={cn("text-xs leading-none", c("text-zinc-600", "text-zinc-500"))}>Arraste de estágio simulado ou use os menus rápidos para aprovações comerciais</p>
            </div>
            <div className="flex gap-2">
              <span className={cn("font-extrabold text-[10px] px-3 py-1.5 rounded-xl uppercase border", c("bg-emerald-50 border-emerald-250 text-emerald-700", "bg-emerald-950/25 border-emerald-500/20 text-emerald-400"))}>
                Metas Ativas: R$ 410.000,00
              </span>
              <span className={cn("font-bold text-[10px] px-3 py-1.5 rounded-xl uppercase border", c("bg-zinc-100 border-transparent text-zinc-800", "bg-zinc-900 border-transparent text-zinc-300"))}>
                Tícket Médio: R$ 12.850,00
              </span>
            </div>
          </Card>

          {/* Visualização Condicional: Lista vs. Kanban */}
          {viewMode === 'lista' ? (
            <Card className={cn("shadow-2xl border", isLight ? "bg-white text-zinc-900" : "bg-zinc-900 text-white")}>
              <CardHeader className={cn("flex flex-row items-center justify-between border-b pb-4", c("border-transparent", "border-transparent"))}>
                <div>
                  <CardTitle className="text-sm font-black uppercase text-purple-400">Oportunidades em Formato de Lista</CardTitle>
                  <CardDescription className="text-xs text-zinc-500 font-sans">
                    Acompanhamento rápido de todo o pipeline de negócios CRM com ações e filtros integrados
                  </CardDescription>
                </div>
                <Button
                  onClick={() => {
                    const clienteEx = prompt('Nome da empresa/cliente:');
                    const projectEx = prompt('Descrição do letreiro ou peça:');
                    const valorEx = prompt('Valor estimado (R$):');
                    if (clienteEx && projectEx) {
                      const novo: Deal = {
                        id: `D-${Math.floor(200 + Math.random() * 800)}`,
                        cliente: clienteEx,
                        projeto: projectEx,
                        valor: parseFloat(valorEx || '5000'),
                        probabilidade: 50,
                        setor: selectedSector === 'all' ? 'comunicacao-visual' : selectedSector,
                        estagio: 'captacao',
                        diasInativo: 0,
                        alertas: 0
                      };
                      setDeals([novo, ...deals]);
                      alert('Negócio cadastrado com sucesso!');
                    }
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase h-9 px-4 rounded-xl cursor-pointer"
                >
                  + Novo Negócio
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-transparent bg-black/30">
                        <th className="py-3.5 px-4 font-black uppercase text-zinc-500 tracking-wider text-[10px]">Cód</th>
                        <th className="py-3.5 px-4 font-black uppercase text-zinc-500 tracking-wider text-[10px]">Cliente</th>
                        <th className="py-3.5 px-4 font-black uppercase text-zinc-500 tracking-wider text-[10px]">Projeto/Escopo</th>
                        <th className="py-3.5 px-4 font-black uppercase text-zinc-500 tracking-wider text-[10px]">Setor</th>
                        <th className="py-3.5 px-4 font-black uppercase text-zinc-500 tracking-wider text-[10px]">Valor</th>
                        <th className="py-3.5 px-4 font-black uppercase text-zinc-500 tracking-wider text-[10px]">Estágio</th>
                        <th className="py-3.5 px-4 font-black uppercase text-zinc-500 tracking-wider text-[10px] text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900/60 text-zinc-300">
                      {visibleDeals.map((deal) => (
                        <tr 
                          key={deal.id} 
                          className="hover:bg-zinc-900/20 transition-all cursor-pointer"
                          onClick={() => openDealModal(deal)}
                        >
                          <td className="py-3.5 px-4">
                            <span 
                              className="text-[9.5px] text-purple-400 font-mono font-black hover:underline"
                              onClick={() => openDealModal(deal)}
                            >
                              {deal.id}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-black uppercase text-white font-sans">{deal.cliente}</td>
                          <td className="py-3.5 px-4 text-zinc-400 max-w-[280px] truncate" title={deal.projeto}>{deal.projeto}</td>
                          <td className="py-3.5 px-4">
                            <Badge className={cn("text-[8.5px] font-black uppercase border-0 px-2.5 py-0.5", getSetorColor(deal.setor))}>
                              {getSetorLabel(deal.setor)}
                            </Badge>
                          </td>
                          <td className="py-3.5 px-4 font-bold font-mono text-white">
                            R$ {deal.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={cn(
                              "px-2.5 py-1 rounded-full text-[8.5px] font-black uppercase border",
                              deal.estagio === 'captacao' && "bg-zinc-900/50 text-zinc-400 border-transparent",
                              deal.estagio === 'contato' && "bg-yellow-950/40 text-yellow-500 border-yellow-905/30",
                              deal.estagio === 'analise' && "bg-blue-950/40 text-blue-400 border-blue-900/30",
                              deal.estagio === 'proposta' && "bg-indigo-950/40 text-indigo-400 border-indigo-900/30",
                              deal.estagio === 'followup' && "bg-purple-950/40 text-purple-400 border-purple-900/30",
                              deal.estagio === 'ganho' && "bg-emerald-950/40 text-emerald-400 border-emerald-900/30"
                            )}>
                              {deal.estagio === 'captacao' ? '1. Captação' :
                               deal.estagio === 'contato' ? '2. Contato Inicial' :
                               deal.estagio === 'analise' ? '3. Análise Técnica' :
                               deal.estagio === 'proposta' ? '4. Proposta' :
                               deal.estagio === 'followup' ? '5. Follow-up' : '6. Ganho'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-center gap-1.5">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-2.5 text-[9px] border-transparent text-zinc-300 hover:bg-zinc-900 font-bold uppercase transition-all"
                                onClick={() => openDealModal(deal)}
                                title="Abrir Ficha Técnica"
                              >
                                Ficha
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-[9px] border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900 font-black"
                                onClick={() => {
                                  const estagios: Deal['estagio'][] = ['captacao', 'contato', 'analise', 'proposta', 'followup', 'ganho'];
                                  const currIdx = estagios.indexOf(deal.estagio);
                                  if (currIdx > 0) {
                                    moveDeal(deal.id, estagios[currIdx - 1]);
                                  }
                                }}
                                disabled={deal.estagio === 'captacao'}
                                title="Voltar Estágio"
                              >
                                ◀
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-[9px] border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900 font-black"
                                onClick={() => {
                                  const estagios: Deal['estagio'][] = ['captacao', 'contato', 'analise', 'proposta', 'followup', 'ganho'];
                                  const currIdx = estagios.indexOf(deal.estagio);
                                  if (currIdx < estagios.length - 1) {
                                    moveDeal(deal.id, estagios[currIdx + 1]);
                                  }
                                }}
                                disabled={deal.estagio === 'ganho'}
                                title="Avançar Estágio"
                              >
                                ▶
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="h-7 w-7 p-0 bg-rose-950/20 text-rose-500 hover:bg-rose-600 hover:text-white border border-rose-900/30 transition-all cursor-pointer"
                                onClick={() => {
                                  if (confirm(`Excluir negócio de ${deal.cliente}?`)) {
                                    setDeals(prev => prev.filter(item => item.id !== deal.id));
                                  }
                                }}
                                title="Excluir negócio"
                              >
                                <Trash2 size={11} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {visibleDeals.length === 0 && (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-zinc-600 font-bold uppercase text-[10.5px]">
                            Nenhuma oportunidade ativa no pipeline.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
              {[
                { id: 'captacao', label: '1. Captação / Prospecção', color: 'border-transparent' },
                { id: 'contato', label: '2. Contato Inicial', color: 'border-yellow-900/30' },
                { id: 'analise', label: '3. Análise Técnica', color: 'border-blue-900/30' },
                { id: 'proposta', label: '4. Elaboração Proposta', color: 'border-indigo-900/30' },
                { id: 'followup', label: '5. Follow-up / Ajustes', color: 'border-purple-900/30' },
                { id: 'ganho', label: '6. Ganhos / Fechados', color: 'border-emerald-900/30' }
              ].map((col) => {
                const colDeals = visibleDeals.filter(d => d.estagio === col.id);
                const totalVal = colDeals.reduce((sum, d) => sum + d.valor, 0);

                return (
                  <div 
                    key={col.id} 
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDropToColumn(e, col.id)}
                    className="min-w-[250px] bg-zinc-950/40 rounded-2xl border-none p-3.5 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-3 font-sans">
                      {/* Header Coluna */}
                      <div className="flex items-center justify-between border-b border-transparent pb-2">
                        <span className="text-[10px] font-black uppercase text-zinc-300 line-clamp-1">{col.label}</span>
                        <Badge className="bg-purple-900/40 text-purple-300 text-[10.5px]">{colDeals.length}</Badge>
                      </div>

                      <div className="text-[11.5px] font-black font-mono text-zinc-400 italic">
                        R$ {totalVal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>

                      {/* Cards De Negócio */}
                      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                        {colDeals.map((deal) => (
                          <Card 
                            key={deal.id} 
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, deal.id)}
                            onDoubleClick={() => openDealModal(deal)}
                            className="bg-zinc-900 border-transparent hover:border-purple-500/40 transition-all shadow-sm cursor-grab active:cursor-grabbing hover:bg-zinc-900/40 select-none"
                            title="Arraste para mudar de coluna • 2 cliques para abrir ficha técnica do negócio"
                          >
                            <CardContent className="p-3.5 space-y-3">
                              <div className="flex items-center justify-between gap-1">
                                <Badge className={cn("text-[8px] font-black uppercase border-0 px-2.5", getSetorColor(deal.setor))}>
                                  {getSetorLabel(deal.setor).split(' ')[0]}
                                </Badge>
                                <span className="text-[9px] text-zinc-500 font-mono font-black">#{deal.id}</span>
                              </div>

                              <div className="space-y-1">
                                <h4 className="text-xs font-black text-white uppercase tracking-tight line-clamp-1 leading-snug">{deal.cliente}</h4>
                                <p className="text-[10px] text-zinc-500 font-medium leading-relaxed line-clamp-2">{deal.projeto}</p>
                              </div>

                              <div className="flex items-center justify-between pt-2 border-t border-transparent text-[11px] font-black font-mono">
                                <span className="text-zinc-500">{deal.probabilidade}% Prob.</span>
                                <span className="text-purple-400">R$ {deal.valor.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</span>
                              </div>

                              {/* Controles de Movimentação substituídos por texto instrutivo */}
                              <div className="text-[8px] text-zinc-600 font-black uppercase text-center pt-2.5 border-t border-transparent tracking-wider">
                                ↔ Arraste para mover
                              </div>
                            </CardContent>
                          </Card>
                        ))}

                        {colDeals.length === 0 && (
                          <div className="border border-dashed border-transparent rounded-xl py-8 text-center text-zinc-600 text-[10px] uppercase font-bold">
                            Colunar Vazia
                          </div>
                        )}
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        const clienteEx = prompt('Nome da empresa/cliente:');
                        const projectEx = prompt('Descrição do letreiro ou peça:');
                        const valorEx = prompt('Valor estimado (R$):');
                        if (clienteEx && projectEx) {
                          const novo: Deal = {
                            id: `D-${Math.floor(200 + Math.random() * 800)}`,
                            cliente: clienteEx,
                            projeto: projectEx,
                            valor: parseFloat(valorEx || '5000'),
                            probabilidade: 50,
                            setor: selectedSector === 'all' ? 'comunicacao-visual' : selectedSector,
                            estagio: col.id as any,
                            diasInativo: 0,
                            alertas: 0
                          };
                          setDeals([...deals, novo]);
                          alert('Card cadastrado com sucesso!');
                        }
                      }}
                      variant="ghost"
                      className="w-full text-zinc-600 hover:text-zinc-300 hover:bg-zinc-900/30 text-[9.5px] font-black uppercase tracking-wider py-1 shrink-0 mt-3 border border-dashed border-transparent"
                    >
                      + Adicionar Card
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* ==================== 3. ABA DE PROJETOS ==================== */}
        <TabsContent value="projetos" className="outline-none space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Registro de Novo Briefing para os Designers */}
            <div className="lg:col-span-5 space-y-6">
              <Card className={cn("shadow-2xl overflow-hidden border", c("bg-white border-transparent text-zinc-950", "bg-zinc-900 border-transparent text-white"))}>
                <CardHeader className={cn("border-b pb-4", c("bg-zinc-50 border-transparent", "border-transparent bg-black/25"))}>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-sm font-black uppercase tracking-wider text-[#a855f7] flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
                        Novo Briefing de Arte / Design
                      </CardTitle>
                      <CardDescription className="text-xs text-zinc-500 mt-1">Siga o formulário de cadastro conforme o anexo para submissão ágil</CardDescription>
                    </div>
                    <Badge className="bg-purple-950 text-purple-400 border-purple-500/20 text-[9px] font-black uppercase font-mono px-2 py-0.5">
                      CRM VETORES
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6 space-y-6">
                  {/* Navegação de Abas do Form */}
                  <div className="flex items-center gap-1 bg-zinc-900/80 border-none p-1 rounded-full overflow-x-auto select-none scrollbar-none">
                    {[
                      { id: 'geral', label: 'Geral', icon: Info },
                      { id: 'produtos', label: `Produtos (${newProjProdutosList.length})`, icon: Package },
                      { id: 'arquivos', label: 'Arquivos', icon: Paperclip },
                      { id: 'historico', label: 'Histórico', icon: History },
                      { id: 'performance', label: 'Performance', icon: LineChart },
                      { id: 'notas', label: 'Notas', icon: ClipboardList }
                    ].map((tab) => {
                      const IconComp = tab.icon;
                      const isActive = newProjActiveTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setNewProjActiveTab(tab.id as any)}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border outline-none whitespace-nowrap",
                            isActive 
                              ? "bg-zinc-900 text-purple-400 border-purple-500/20 font-black shadow-inner" 
                              : "bg-transparent text-zinc-500 border-transparent hover:text-zinc-300 hover:bg-zinc-900/30"
                          )}
                        >
                          <IconComp size={11} className={isActive ? "text-purple-400" : "text-zinc-500"} />
                          <span>{tab.label}</span>
                          {tab.id === 'geral' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <form onSubmit={handleAddProjeto} className="space-y-5">
                    {/* TAB GERAL (Fidelidade extrema ao anexo) */}
                    {newProjActiveTab === 'geral' && (
                      <div className="space-y-4">
                        {/* Dificuldade & Prioridade numa linha só, menores */}
                        <div className="grid grid-cols-2 gap-4">
                          {/* 1. Dificuldade */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-zinc-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block" /> Dificuldade
                            </div>
                            <div className="grid grid-cols-5 gap-1">
                              {[1, 2, 3, 4, 5].map((val) => {
                                const isFilled = newProjDificuldade >= val;
                                return (
                                  <button
                                    key={val}
                                    type="button"
                                    onClick={() => setNewProjDificuldade(val)}
                                    className={cn(
                                      "h-7 rounded font-black text-[10px] font-mono transition-all flex items-center justify-center uppercase tracking-wider outline-none border",
                                      isFilled
                                        ? "bg-zinc-900 text-white border-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.2)]"
                                        : "bg-zinc-900/35 hover:bg-zinc-900/40 text-zinc-500 border-transparent"
                                    )}
                                  >
                                    {val}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* 2. Prioridade */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-zinc-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 inline-block" /> Prioridade
                            </div>
                            <div className="grid grid-cols-5 gap-1">
                              {[1, 2, 3, 4, 5].map((val) => {
                                const isFilled = newProjPrioridade >= val;
                                return (
                                  <button
                                    key={val}
                                    type="button"
                                    onClick={() => setNewProjPrioridade(val)}
                                    className={cn(
                                      "h-7 rounded font-black text-[10px] font-mono transition-all flex items-center justify-center uppercase tracking-wider outline-none border",
                                      isFilled
                                        ? "bg-zinc-900 text-white border-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.25)]"
                                        : "bg-zinc-900/35 hover:bg-zinc-900/40 text-zinc-500 border-transparent"
                                    )}
                                  >
                                    {val}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* 3. Cliente / Unidade/Loja */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Cliente</label>
                            <Input
                              value={newProjCliente}
                              onChange={(e) => setNewProjCliente(e.target.value)}
                              placeholder="CLIENTE"
                              className="bg-zinc-900/60 border-transparent text-white h-11 text-xs hover:border-transparent transition-all font-bold placeholder:text-zinc-600/70"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Unidade/Loja</label>
                            <Input
                              value={newProjUnidadeLoja}
                              onChange={(e) => setNewProjUnidadeLoja(e.target.value)}
                              placeholder="UNIDADE/LOJA"
                              className="bg-zinc-900/60 border-transparent text-white h-11 text-xs hover:border-transparent transition-all font-bold placeholder:text-zinc-600/70"
                            />
                          </div>
                        </div>

                        {/* Tópico de título opcional */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Título do Briefing / Escopo (Opcional)</label>
                          <Input
                            value={newProjTitulo}
                            onChange={(e) => setNewProjTitulo(e.target.value)}
                            placeholder="Deixe em branco para auto-gerar baseado no cliente"
                            className="bg-zinc-900/60 border-transparent text-white h-11 text-xs hover:border-transparent transition-all font-bold placeholder:text-zinc-600/70"
                          />
                        </div>

                        {/* 4. Responsável Comercial / Designer Responsável */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Responsável Comercial</label>
                            <Input
                              value={newProjResponsavelComercial}
                              onChange={(e) => setNewProjResponsavelComercial(e.target.value)}
                              placeholder="Nome do vendedor..."
                              className="bg-zinc-900/60 border-transparent text-white h-11 text-xs hover:border-transparent transition-all font-bold placeholder:text-zinc-600"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Designer Responsável</label>
                            <select
                              value={newProjDesignerResponsavel}
                              onChange={(e) => setNewProjDesignerResponsavel(e.target.value)}
                              className="w-full bg-zinc-900/60 border-none text-zinc-300 rounded-lg text-xs h-11 px-3 outline-none hover:border-transparent transition-all font-black uppercase"
                            >
                              <option value="—">—</option>
                              <option value="Gabriel F.">Gabriel F. (Design Visual)</option>
                              <option value="Amanda R.">Amanda R. (Luminosos ERP)</option>
                              <option value="Carlos O.">Carlos O. (Prototipação 3D)</option>
                              <option value="Ana Karolina">Ana Karolina (Comunicação)</option>
                              <option value="Amanda J.">Amanda J. (Ilustrações)</option>
                            </select>
                          </div>
                        </div>

                        {/* 5. Prazo / Valor (R$) */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Prazo</label>
                            <Input
                              type="date"
                              value={newProjPrazo}
                              onChange={(e) => setNewProjPrazo(e.target.value)}
                              className="bg-zinc-900/60 border-transparent text-white h-11 text-xs hover:border-transparent transition-all font-mono font-black"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Valor (R$)</label>
                            <Input
                              type="number"
                              value={newProjValor || ''}
                              onChange={(e) => setNewProjValor(parseFloat(e.target.value) || 0)}
                              placeholder="0"
                              className="bg-zinc-900/60 border-transparent text-white h-11 text-xs hover:border-transparent transition-all font-mono font-black text-emerald-400"
                            />
                          </div>
                        </div>

                        {/* Extra: Setor Alocado / Dimensões de Apoio */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Setor Criativo</label>
                            <select
                              value={newProjSetor}
                              onChange={(e) => setNewProjSetor(e.target.value as SectorType)}
                              className="w-full bg-zinc-900/60 border-none text-zinc-300 rounded-lg text-xs h-11 px-3 outline-none hover:border-transparent transition-all font-black uppercase"
                            >
                              <option value="comunicacao-visual">Comunicação Visual</option>
                              <option value="corte-cnc">Corte CNC</option>
                              <option value="impressao-digital">Impressão Digital</option>
                              <option value="impressao-3d">Impressão 3D</option>
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Dimensões Úteis</label>
                            <Input
                              value={newProjDimensoes}
                              onChange={(e) => setNewProjDimensoes(e.target.value)}
                              placeholder="Ex: 3.5m x 1.25m"
                              className="bg-zinc-900/60 border-transparent text-white h-11 text-xs hover:border-transparent transition-all font-black"
                            />
                          </div>
                        </div>

                        {/* 6. Link da Pasta / Urgente */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Link da Pasta</label>
                            <Input
                              value={newProjLinkPasta}
                              onChange={(e) => setNewProjLinkPasta(e.target.value)}
                              placeholder="https://drive.google.com/..."
                              className="bg-zinc-900/60 border-transparent text-purple-400 h-11 text-xs hover:border-transparent transition-all font-mono font-bold placeholder:text-zinc-700 truncate"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Urgente</label>
                            <div className="flex items-center h-11 bg-zinc-900/60 border-none rounded-lg px-3 hover:border-transparent transition-all cursor-pointer group">
                              <label className="flex items-center gap-2.5 cursor-pointer w-full text-xs font-black text-zinc-400 group-hover:text-zinc-200">
                                <input
                                  type="checkbox"
                                  checked={newProjUrgente}
                                  onChange={(e) => setNewProjUrgente(e.target.checked)}
                                  className="w-4 h-4 rounded bg-black/40 border-transparent text-purple-600 focus:ring-0 accent-purple-600 cursor-pointer"
                                />
                                <span>Marcar como urgente</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* 7. Briefing Descriptions */}
                        <div className="space-y-1.5 col-span-2">
                          <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Briefing</label>
                          <textarea
                            value={newProjBriefingText}
                            onChange={(e) => setNewProjBriefingText(e.target.value)}
                            placeholder="Descreva detalhadamente o serviço de arte ou os requisitos industriais..."
                            rows={4}
                            className="w-full bg-zinc-900/60 border-none hover:border-transparent focus:border-purple-500/40 rounded-lg text-xs p-3 text-white outline-none transition-all leading-relaxed font-sans placeholder:text-zinc-700"
                          />
                        </div>
                      </div>
                    )}

                    {/* TAB PRODUTOS */}
                    {newProjActiveTab === 'produtos' && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-transparent pb-2">
                          <div className="space-y-0.5">
                            <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 font-sans">Especificação Detalhada de Peças & Produtos</label>
                            <p className="text-[9px] text-zinc-500 uppercase font-sans">Defina dimensões, materiais, iluminação e responsabilidades de engenharia</p>
                          </div>
                          <Badge className="bg-orange-950/40 text-orange-400 border border-orange-900/30 font-mono text-[9.5px]">
                            {newProjProdutosList.length} {newProjProdutosList.length === 1 ? 'item' : 'itens'}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start font-sans">
                          {/* Left Column: Products List Selector */}
                          <div className="lg:col-span-1 space-y-3">
                            <span className="text-[10.5px] font-black uppercase tracking-wider text-zinc-500 block">Lista de Itens</span>
                            <div className="space-y-2 max-h-[365px] overflow-y-auto pr-1">
                              {newProjProdutosList.map((p, idx) => {
                                const isSelected = newProjSelectedProdIndex === idx;
                                return (
                                  <div
                                    key={p.id || idx}
                                    onClick={() => setNewProjSelectedProdIndex(idx)}
                                    className={cn(
                                      "p-3 rounded-lg border text-left cursor-pointer transition-all relative group flex flex-col justify-center min-h-[52px]",
                                      isSelected
                                        ? "border-orange-500/80 bg-orange-950/20 text-orange-400 font-extrabold shadow-md shadow-orange-950/5"
                                        : "border-transparent hover:border-transparent bg-zinc-900/10 text-zinc-400 hover:text-zinc-300"
                                    )}
                                  >
                                    <span className="text-[9.5px] font-black font-mono text-zinc-500/80 uppercase block">
                                      {idx + 1}.
                                    </span>
                                    <div className="text-xs uppercase font-extrabold truncate pr-6 mt-0.5 text-ellipsis">
                                      {p.nome || p.name || 'Novo produto'}
                                    </div>
                                    
                                    {/* Delete button option */}
                                    {newProjProdutosList.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const updated = newProjProdutosList.filter((_, i) => i !== idx);
                                          setNewProjProdutosList(updated);
                                          setNewProjSelectedProdIndex(Math.max(0, idx - 1));
                                        }}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-rose-500 hover:text-rose-400 opacity-60 hover:opacity-100 transition-opacity p-1.5"
                                      >
                                        <Trash2 size={12} />
                                      </button>
                                    )}
                                  </div>
                                );
                              })}
                            </div>

                            {/* "+ Adicionar" button matching screenshot */}
                            <button
                              type="button"
                              onClick={() => {
                                const newItem = createNewDefaultProduct();
                                setNewProjProdutosList([...newProjProdutosList, newItem]);
                                setNewProjSelectedProdIndex(newProjProdutosList.length);
                              }}
                              className="w-full py-3.5 rounded-lg border border-dashed border-transparent hover:border-orange-500/30 bg-zinc-950/40 hover:bg-orange-950/5 text-zinc-500 hover:text-orange-450 text-xs font-black uppercase transition-all flex items-center justify-center gap-1.5"
                            >
                              <span>+ Adicionar</span>
                            </button>
                          </div>

                          {/* Right Column: Active Product Specification Form */}
                          <div className="lg:col-span-3 bg-zinc-900 border-none rounded-xl p-5 space-y-4 shadow-xl">
                            {newProjProdutosList[newProjSelectedProdIndex] ? (
                              (() => {
                                const activeP = newProjProdutosList[newProjSelectedProdIndex];
                                return (
                                  <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Nome do Produto</label>
                                        <Input
                                          value={activeP.nome || activeP.name || ''}
                                          onChange={(e) => updateNewProductField(newProjSelectedProdIndex, 'nome', e.target.value)}
                                          placeholder="Ex: Letreiro Luminoso"
                                          className="bg-zinc-900/85 border-transparent text-white text-xs h-9 font-extrabold focus:border-orange-500/40"
                                        />
                                      </div>

                                      <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Categoria</label>
                                        <Input
                                          value={activeP.categoria || activeP.category || ''}
                                          onChange={(e) => updateNewProductField(newProjSelectedProdIndex, 'categoria', e.target.value)}
                                          placeholder="Letra Caixa, ACM, Totem..."
                                          className="bg-zinc-900/85 border-transparent text-zinc-200 text-xs h-9 font-bold focus:border-orange-500/40"
                                        />
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Quantidade</label>
                                        <Input
                                          type="number"
                                          value={activeP.qtd !== undefined ? activeP.qtd : (activeP.quantity || 1)}
                                          onChange={(e) => updateNewProductField(newProjSelectedProdIndex, 'qtd', parseInt(e.target.value) || 1)}
                                          className="bg-zinc-900/85 border-transparent text-purple-400 text-xs h-9 font-mono font-black focus:border-orange-500/40"
                                        />
                                      </div>

                                      <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Material</label>
                                        <Input
                                          value={activeP.material || ''}
                                          onChange={(e) => updateNewProductField(newProjSelectedProdIndex, 'material', e.target.value)}
                                          className="bg-zinc-900/85 border-transparent text-zinc-200 text-xs h-9 font-bold focus:border-orange-500/40"
                                        />
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Largura (cm)</label>
                                        <Input
                                          value={activeP.largura || activeP.width || ''}
                                          onChange={(e) => updateNewProductField(newProjSelectedProdIndex, 'largura', e.target.value)}
                                          className="bg-zinc-900/85 border-transparent text-zinc-200 text-xs h-9 font-mono font-bold focus:border-orange-500/40"
                                        />
                                      </div>

                                      <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Altura (cm)</label>
                                        <Input
                                          value={activeP.altura || activeP.height || ''}
                                          onChange={(e) => updateNewProductField(newProjSelectedProdIndex, 'altura', e.target.value)}
                                          className="bg-zinc-900/85 border-transparent text-zinc-200 text-xs h-9 font-mono font-bold focus:border-orange-500/40"
                                        />
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Estrutura</label>
                                        <Input
                                          value={activeP.estrutura || activeP.structure || ''}
                                          onChange={(e) => updateNewProductField(newProjSelectedProdIndex, 'estrutura', e.target.value)}
                                          className="bg-zinc-900/85 border-transparent text-zinc-200 text-xs h-9 font-bold focus:border-orange-500/40"
                                        />
                                      </div>

                                      <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Acabamento</label>
                                        <Input
                                          value={activeP.acabamento || activeP.finish || ''}
                                          onChange={(e) => updateNewProductField(newProjSelectedProdIndex, 'acabamento', e.target.value)}
                                          className="bg-zinc-900/85 border-transparent text-zinc-200 text-xs h-9 font-bold focus:border-orange-500/40"
                                        />
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Tipo de Instalação</label>
                                        <Input
                                          value={activeP.tipoInstalacao || activeP.installationType || ''}
                                          onChange={(e) => updateNewProductField(newProjSelectedProdIndex, 'tipoInstalacao', e.target.value)}
                                          className="bg-zinc-900/85 border-transparent text-zinc-200 text-xs h-9 font-bold focus:border-orange-500/40"
                                        />
                                      </div>

                                      <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Local de Aplicação</label>
                                        <Input
                                          value={activeP.localAplicacao || activeP.applicationPlace || ''}
                                          onChange={(e) => updateNewProductField(newProjSelectedProdIndex, 'localAplicacao', e.target.value)}
                                          className="bg-zinc-900/85 border-transparent text-zinc-200 text-xs h-9 font-bold focus:border-orange-500/40"
                                        />
                                      </div>
                                    </div>

                                    {/* Possui iluminação button style checkbox */}
                                    <div className="py-2.5">
                                      <label className="flex items-center gap-3 cursor-pointer p-4 rounded-lg bg-zinc-900 border-none hover:bg-zinc-900 transition-all">
                                        <input
                                          type="checkbox"
                                          checked={activeP.iluminacao || activeP.lighting || false}
                                          onChange={(e) => updateNewProductField(newProjSelectedProdIndex, 'iluminacao', e.target.checked)}
                                          className="h-4 w-4 bg-zinc-900 border-transparent text-orange-500 rounded focus:ring-0 focus:ring-offset-0 focus:outline-none"
                                        />
                                        <span className="text-xs font-black uppercase tracking-wider text-zinc-300">Possui iluminação</span>
                                      </label>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Designer</label>
                                        <select
                                          value={activeP.designer || 'Adams Leandro Alves Pereira'}
                                          onChange={(e) => updateNewProductField(newProjSelectedProdIndex, 'designer', e.target.value)}
                                          className="w-full bg-zinc-900 border-none text-zinc-300 rounded-lg text-xs h-9 px-3 outline-none hover:border-transparent transition-all font-bold uppercase"
                                        >
                                          <option value="Adams Leandro Alves Pereira">Adams Leandro Alves Pereira (Admin/Dir)</option>
                                          <option value="Gabriel F.">Gabriel F. (Design Visual)</option>
                                          <option value="Amanda R.">Amanda R. (Luminosos ERP)</option>
                                          <option value="Carlos O.">Carlos O. (Prototipação 3D)</option>
                                          <option value="Ana Karolina">Ana Karolina (Comunicação)</option>
                                        </select>
                                      </div>

                                      <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Projetista</label>
                                        <Input
                                          value={activeP.projetista || activeP.designerProjetista || ''}
                                          onChange={(e) => updateNewProductField(newProjSelectedProdIndex, 'projetista', e.target.value)}
                                          className="bg-zinc-900/85 border-transparent text-zinc-200 text-xs h-9 font-bold focus:border-orange-500/40"
                                        />
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Produção</label>
                                        <Input
                                          value={activeP.producao || activeP.productionResponsavel || ''}
                                          onChange={(e) => updateNewProductField(newProjSelectedProdIndex, 'producao', e.target.value)}
                                          className="bg-zinc-900/85 border-transparent text-zinc-200 text-xs h-9 font-bold focus:border-orange-500/40"
                                        />
                                      </div>

                                      <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Instalador</label>
                                        <Input
                                          value={activeP.instalador || activeP.assembler || ''}
                                          onChange={(e) => updateNewProductField(newProjSelectedProdIndex, 'instalador', e.target.value)}
                                          className="bg-zinc-900/85 border-transparent text-zinc-200 text-xs h-9 font-bold focus:border-orange-500/40"
                                        />
                                      </div>
                                    </div>

                                    <div className="space-y-1.5">
                                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Status Técnico</label>
                                      <select
                                        value={activeP.statusTecnico || activeP.technicalStatus || 'Em andamento'}
                                        onChange={(e) => updateNewProductField(newProjSelectedProdIndex, 'statusTecnico', e.target.value)}
                                        className="w-full bg-zinc-900 border-none text-zinc-300 rounded-lg text-xs h-9 px-3 outline-none hover:border-transparent transition-all font-black uppercase"
                                      >
                                        <option value="Em andamento">Em andamento</option>
                                        <option value="Pendente">Pendente</option>
                                        <option value="Aprovado">Aprovado</option>
                                        <option value="Finalizado">Finalizado</option>
                                      </select>
                                    </div>

                                    <div className="space-y-1.5">
                                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Observações</label>
                                      <textarea
                                        value={activeP.observacoes || activeP.observations || ''}
                                        onChange={(e) => updateNewProductField(newProjSelectedProdIndex, 'observacoes', e.target.value)}
                                        rows={4}
                                        className="w-full bg-zinc-900/85 border-none text-white rounded-lg text-xs p-3 outline-none focus:border-orange-500/30 leading-relaxed font-sans placeholder:text-zinc-700"
                                      />
                                    </div>
                                  </>
                                );
                              })()
                            ) : (
                              <div className="py-20 text-center text-zinc-600 uppercase font-black text-xs">
                                Selecione ou adicione um produto ao briefing de arte.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB ARQUIVOS */}
                    {newProjActiveTab === 'arquivos' && (
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Arquivos Técnicos e Plantas Industriais</label>
                        
                        <div className="border border-dashed border-transparent hover:border-purple-500/30 bg-zinc-900/40 rounded-2xl p-6 text-center cursor-pointer transition-all">
                          <Upload size={22} className="mx-auto mb-2 text-purple-400" />
                          <div className="text-xs font-black uppercase text-zinc-300">Arrastar Imagens de Prova / DXF</div>
                          <p className="text-[9.5px] text-zinc-500 mt-1 uppercase max-w-xs mx-auto">Suporta formatos de vetor (.AI, .DXF, .CDR) até 50MB</p>
                        </div>

                        <div className="bg-black/10 p-3 rounded-xl border-none space-y-2">
                          <span className="text-[9px] font-bold text-zinc-500 uppercase font-mono block">Diretório Cloud vinculado:</span>
                          <span className="text-xs font-bold text-zinc-400 italic block truncate">
                            {newProjLinkPasta || 'Aguardando preenchimento do Link da Pasta na aba Geral...'}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* TAB HISTORICO */}
                    {newProjActiveTab === 'historico' && (
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Auditoria & Linha do Tempo do Briefing</label>
                        <div className="bg-black/35 border-none rounded-xl p-4 font-mono text-[10.5px] space-y-4 text-zinc-400">
                          <div className="flex gap-2 text-emerald-500/90">
                            <span>✦</span>
                            <div>
                              <div className="font-extrabold uppercase">[SISTEMA] Aguardando Submissão</div>
                              <div className="text-zinc-600 text-[9 px] uppercase mt-0.5 mt-0.5">Clique em Enviar para gerar o primeiro marcador temporal</div>
                            </div>
                          </div>
                          <div className="flex gap-2 text-zinc-600">
                            <span>✦</span>
                            <div>
                              <div className="font-extrabold uppercase">Fila de Vetorização Inicial</div>
                              <div className="text-zinc-700 text-[9.5px] uppercase mt-0.5">O status mudará para &quot;Em Vetorização&quot; no Kanban operacional</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB PERFORMANCE */}
                    {newProjActiveTab === 'performance' && (
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Mapeamento de KPIs (Dificuldade & Prioridade)</label>
                        
                        <div className="p-4 rounded-xl border-none bg-black/40 space-y-3.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-zinc-400 font-bold uppercase">Meta de SLA para Prova de Arte</span>
                            <span className="font-mono font-black text-white bg-purple-950/60 text-purple-400 px-2.5 py-0.5 rounded border border-purple-900/20">
                              {newProjDificuldade >= 4 ? '72h Úteis' : newProjDificuldade === 3 ? '48h Úteis' : '24h Úteis'}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <span className="text-zinc-400 font-bold uppercase">Nível de Complexidade Vetorial</span>
                            <span className="text-xs font-black uppercase text-zinc-300">
                              {newProjDificuldade >= 4 ? 'Altíssima (Fachadas/ACM)' : 'Standard (Letreiro)'}
                            </span>
                          </div>

                          <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-purple-600 transition-all duration-500" 
                              style={{ width: `${newProjDificuldade * 20}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB NOTAS */}
                    {newProjActiveTab === 'notas' && (
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Notas de Produção / Observações Especiais</label>
                        <textarea
                          value={newProjNotas}
                          onChange={(e) => setNewProjNotas(e.target.value)}
                          placeholder="Explicitar observações (Ex: Acabamento escovado, utilizar fita LED premium, prever rebaixo para reator...)"
                          rows={6}
                          className="w-full bg-zinc-900/60 border-none hover:border-transparent rounded-lg text-xs p-3 text-white outline-none focus:border-purple-500/40 transition-all font-sans leading-relaxed placeholder:text-zinc-700"
                        />
                      </div>
                    )}

                    {/* Botão de Envio Principal (Geralmente acionado a partir de qualquer aba) */}
                    <div className="pt-3 border-t border-transparent">
                      <Button 
                        type="submit" 
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white h-11 font-black text-xs uppercase tracking-widest cursor-pointer shadow-lg shadow-purple-900/10 transition-all hover:translate-y-[-1px]"
                      >
                        Enviar para o Designer
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Box de Informações fixo */}
              <div className="p-5 rounded-2xl border-none bg-zinc-900 shadow-inner space-y-2">
                <div className="flex items-center gap-2 text-purple-400">
                  <Info size={15} />
                  <h4 className="text-xs font-black uppercase">Fidelidade do Fornário</h4>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
                  Siga os dados exatos do anexo incluindo <strong>Dificuldade e Prioridade graduais de 1 a 5</strong>. O sistema vincula as tags e prazos de resposta criativos automaticamente baseados nestes indicadores de MES.
                </p>
              </div>
            </div>

            {/* Fila dos Briefings ativos de Artes */}
            <div className="lg:col-span-7">
              <Card className={cn("shadow-2xl h-full border", c("bg-white border-transparent text-zinc-950", "bg-zinc-900 border-transparent text-white"))}>
                <CardHeader className={cn("flex flex-row items-center justify-between border-b pb-4", c("border-transparent", "border-transparent"))}>
                  <div>
                    <CardTitle className="text-sm font-black uppercase">Status de Vetorização & Provas Técnico-Visuais</CardTitle>
                    <CardDescription className="text-xs text-zinc-500">Briefings comerciais pendentes de vetor ou em fase de provação espacial</CardDescription>
                  </div>
                  <span className="text-[10px] bg-indigo-950/45 text-indigo-400 border border-indigo-900/30 font-black tracking-tight px-2.5 py-1 rounded-xl">
                    DESENHOS ATIVOS
                  </span>
                </CardHeader>
                <CardContent className={cn("p-6", viewMode === 'lista' && "p-0")}>
                  {viewMode === 'lista' ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-transparent bg-black/30">
                            <th className="py-3.5 px-4 font-black uppercase text-zinc-500 tracking-wider text-[10px]">Cód</th>
                            <th className="py-3.5 px-4 font-black uppercase text-zinc-500 tracking-wider text-[10px]">Título do Briefing/Escopo</th>
                            <th className="py-3.5 px-4 font-black uppercase text-zinc-500 tracking-wider text-[10px]">Cliente</th>
                            <th className="py-3.5 px-4 font-black uppercase text-zinc-500 tracking-wider text-[10px]">Setor</th>
                            <th className="py-3.5 px-4 font-black uppercase text-zinc-500 tracking-wider text-[10px]">Dimensões</th>
                            <th className="py-3.5 px-4 font-black uppercase text-zinc-500 tracking-wider text-[10px]">Designer</th>
                            <th className="py-3.5 px-4 font-black uppercase text-zinc-500 tracking-wider text-[10px]">Status</th>
                            <th className="py-3.5 px-4 font-black uppercase text-zinc-500 tracking-wider text-[10px] text-center">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900/60 text-zinc-300">
                          {visibleProjetos.map((proj) => (
                            <tr key={proj.id} onClick={() => { setSelectedProjeto(proj); setEditProjActiveTab('geral'); }} className="hover:bg-purple-950/20 active:bg-purple-900/10 cursor-pointer transition-all font-sans text-xs">
                              <td className="py-3.5 px-4 font-black font-mono text-purple-400 text-[9px]">{proj.id}</td>
                              <td className="py-3.5 px-4">
                                <div className="space-y-0.5">
                                  <div className="font-black uppercase text-white italic tracking-wide">{proj.titulo}</div>
                                  <div className="text-[9.5px] text-zinc-500 font-bold uppercase block font-mono">Tags: {proj.materialPrincipal}</div>
                                </div>
                              </td>
                              <td className="py-3.5 px-4 font-bold uppercase text-zinc-400">{proj.cliente}</td>
                              <td className="py-3.5 px-4">
                                <Badge className="bg-zinc-900 text-purple-400 border border-purple-500/10 text-[8.5px] font-black uppercase font-bold px-2 py-0.5">
                                  {getSetorLabel(proj.setor).split(' ')[0]}
                                </Badge>
                              </td>
                              <td className="py-3.5 px-4 font-extrabold font-mono text-zinc-300">{proj.dimensoes}</td>
                              <td className="py-3.5 px-4 font-bold uppercase text-zinc-400 font-mono">{proj.designer}</td>
                              <td className="py-3.5 px-4">
                                <span className={cn(
                                  "px-2 py-0.5 rounded text-[8px] font-black uppercase border",
                                  proj.status === 'Briefing' && "bg-neutral-900 text-neutral-400 border-neutral-850",
                                  proj.status === 'Em Vetorização' && "bg-blue-950/40 text-blue-400 border-blue-900/30",
                                  proj.status === 'Aprovado Pelo Cliente' && "bg-emerald-950/40 text-emerald-400 border-emerald-900/30",
                                  proj.status === 'Ajuste Solicitado' && "bg-rose-950/40 text-rose-400 border-rose-900/30"
                                )}>
                                  {proj.status}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center justify-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                                  {proj.status !== 'Aprovado Pelo Cliente' && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        setProjetos(prev => prev.map(p => p.id === proj.id ? { ...p, status: 'Aprovado Pelo Cliente' } : p));
                                        alert(`Status do Projeto #${proj.id} atualizado para APROVADO!`);
                                      }}
                                      className="h-7 text-[8.5px] border-emerald-500/20 text-emerald-400 hover:bg-emerald-600 hover:text-white font-black uppercase py-0"
                                      title="Aprovar de desenho técnico"
                                    >
                                      Aprovar Layout
                                    </Button>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    className="h-7 w-7 p-0 bg-rose-950/20 text-rose-500 hover:bg-rose-600 hover:text-white border border-rose-900/30 transition-all cursor-pointer"
                                    onClick={() => {
                                      if (confirm(`Excluir briefing de arte #${proj.id}?`)) {
                                        setProjetos(prev => prev.filter(p => p.id !== proj.id));
                                      }
                                    }}
                                    title="Remover arte do CRM"
                                  >
                                    <Trash2 size={11} />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {visibleProjetos.length === 0 && (
                            <tr>
                              <td colSpan={8} className="py-12 text-center text-zinc-600 font-bold uppercase text-[10.5px]">
                                Nenhum Briefing ativo para o Setor Alocado
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {visibleProjetos.map((proj) => (
                      <div 
                        key={proj.id} 
                        onDoubleClick={() => { setSelectedProjeto(proj); setEditProjActiveTab('geral'); }} 
                        className="p-4 rounded-xl border-none bg-zinc-900 space-y-4 hover:border-purple-500/20 hover:bg-purple-950/5 cursor-pointer transition-all select-none"
                        title="Dê dois cliques para abrir o detalhamento técnico"
                      >
                        <div className="flex items-center justify-between">
                          <Badge className="bg-zinc-900 text-zinc-400 border-none text-[9px] font-black uppercase">
                            {proj.id}
                          </Badge>
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[8.5px] font-black uppercase",
                            proj.status === 'Briefing' && "bg-neutral-900 text-neutral-400",
                            proj.status === 'Em Vetorização' && "bg-blue-950 text-blue-400",
                            proj.status === 'Aprovado Pelo Cliente' && "bg-emerald-950 text-emerald-400",
                            proj.status === 'Ajuste Solicitado' && "bg-rose-950 text-rose-400"
                          )}>
                            {proj.status}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-white uppercase italic tracking-tight">{proj.titulo}</h4>
                          <p className="text-[10px] text-zinc-500 font-bold uppercase">Cliente: {proj.cliente}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-[10px] border-t border-transparent pt-3 text-zinc-400">
                          <div>
                            <span className="text-[9px] text-zinc-600 block uppercase font-mono">Dimensões:</span>
                            <span className="font-extrabold uppercase text-zinc-300">{proj.dimensoes}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-zinc-600 block uppercase font-mono">Design Encargado:</span>
                            <span className="font-extrabold uppercase text-zinc-300">{proj.designer}</span>
                          </div>
                        </div>

                        <div className="text-[10px] text-zinc-500 font-semibold bg-black/45 p-2 rounded">
                          <span className="text-zinc-600 font-bold text-[8.5px] uppercase block">Material Principal:</span>
                          {proj.materialPrincipal}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-transparent">
                          <span className="text-[9px] font-black uppercase text-amber-500 font-mono">Setor: {getSetorLabel(proj.setor)}</span>
                          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                setProjetos(prev => prev.map(p => p.id === proj.id ? { ...p, status: 'Aprovado Pelo Cliente' } : p));
                                alert(`Status do Projeto #${proj.id} atualizado para APROVADO!`);
                              }}
                              className="h-8 text-[9px] border-emerald-500/20 text-emerald-400 hover:bg-emerald-600 hover:text-white font-black uppercase font-bold"
                            >
                              <CheckCircle2 size={11} className="mr-1" /> Aprovar Vetor
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {visibleProjetos.length === 0 && (
                      <div className="col-span-full py-16 text-center text-zinc-600 font-bold uppercase text-[10px]">
                        Nenhum Briefing para o Setor Alocado
                      </div>
                    )}
                  </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Modal / Dialog Flyout de Edição e Detalhamento Técnico de Briefings */}
          {selectedProjeto && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
              <div className="w-full max-w-4xl bg-zinc-900 border-none rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
                
                {/* Esquerda: Ajustes de Formulário & Mapeamento por Abas */}
                <div className="flex-1 p-6 border-b md:border-b-0 md:border-r border-transparent overflow-y-auto space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-black text-purple-400 uppercase tracking-widest block font-bold">
                        {(() => {
                          const itemStage = selectedProjeto.flowStage || activeTab;
                          if (itemStage === 'atendimento') return 'Ficha de Atendimento Comercial';
                          if (itemStage === 'funil') return 'Ficha de Oportunidade CRM';
                          if (itemStage === 'projetos') return 'Ficha de Briefing Técnico';
                          if (itemStage === 'orcamentos') return 'Ficha de Orçamento';
                          if (itemStage === 'ordem-servicos') return 'Ordem de Serviço';
                          if (itemStage === 'campanhas') return 'Campanha de Marketing';
                          return 'Edição de Briefing Operacional';
                        })()}
                      </span>
                      <h3 className="text-sm font-black uppercase text-white tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500" />
                        {selectedProjeto.titulo || selectedProjeto.cliente || 'Briefing Sem Título'}
                      </h3>
                    </div>
                    <Badge className="bg-purple-950 text-purple-400 border border-purple-900/30 font-black font-mono text-[9px] px-2.5 py-0.5 font-bold">
                      CÓD #{selectedProjeto.id}
                    </Badge>
                  </div>

                  {/* Abas Internas de Tuning */}
                  <div className="flex gap-1 bg-zinc-900/80 border-none p-1 rounded-full overflow-x-auto select-none scrollbar-none">
                    {[
                      { id: 'geral', label: 'Geral', icon: Info },
                      { id: 'produtos', label: `Produtos (${selectedProjeto.produtos?.length || 0})`, icon: Package },
                      { id: 'arquivos', label: 'Arquivos', icon: Paperclip },
                      { id: 'historico', label: 'Histórico', icon: History },
                      { id: 'notas', label: 'Notas', icon: ClipboardList }
                    ].map((tab) => {
                      const IconComp = tab.icon;
                      const isActive = editProjActiveTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setEditProjActiveTab(tab.id as any)}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border outline-none whitespace-nowrap",
                            isActive 
                              ? "bg-zinc-900 text-purple-400 border-purple-500/20 font-black" 
                              : "text-zinc-500 border-transparent hover:text-zinc-300 hover:bg-zinc-900/30"
                          )}
                        >
                          <IconComp size={10} />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Aba Geral do Modal */}
                  {editProjActiveTab === 'geral' && (
                    <div className="space-y-4">
                      {/* Dificuldade & Prioridade numa linha só, menores */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* Dificuldade rating bar */}
                        <div className="space-y-1">
                          <div className="text-[10px] font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block" /> Dificuldade
                          </div>
                          <div className="grid grid-cols-5 gap-1">
                            {[1, 2, 3, 4, 5].map((val) => {
                              const isFilled = (selectedProjeto.dificuldade || 1) >= val;
                              return (
                                <button
                                  key={val}
                                  type="button"
                                  onClick={() => setSelectedProjeto({ ...selectedProjeto, dificuldade: val })}
                                  className={cn(
                                    "h-7 rounded font-mono font-black text-[10px] transition-all flex items-center justify-center outline-none border",
                                    isFilled
                                      ? "bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-900/10"
                                      : "bg-zinc-900/35 border-transparent text-zinc-500 hover:bg-zinc-900/40"
                                  )}
                                >
                                  {val}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Prioridade rating bar */}
                        <div className="space-y-1">
                          <div className="text-[10px] font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" /> Prioridade
                          </div>
                          <div className="grid grid-cols-5 gap-1">
                            {[1, 2, 3, 4, 5].map((val) => {
                              const isFilled = (selectedProjeto.prioridadeForm || 1) >= val;
                              return (
                                <button
                                  key={val}
                                  type="button"
                                  onClick={() => setSelectedProjeto({ ...selectedProjeto, prioridadeForm: val })}
                                  className={cn(
                                    "h-7 rounded font-mono font-black text-[10px] transition-all flex items-center justify-center outline-none border",
                                    isFilled
                                      ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-950/10"
                                      : "bg-zinc-900/35 border-transparent text-zinc-500 hover:bg-zinc-900/40"
                                  )}
                                >
                                  {val}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Cliente</label>
                          <Input
                            value={selectedProjeto.cliente}
                            onChange={(e) => setSelectedProjeto({ ...selectedProjeto, cliente: e.target.value })}
                            className="bg-black/55 border-transparent text-white text-xs h-10 font-bold"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Unidade/Loja</label>
                          <Input
                            value={selectedProjeto.unidadeLoja || ''}
                            onChange={(e) => setSelectedProjeto({ ...selectedProjeto, unidadeLoja: e.target.value })}
                            className="bg-black/55 border-transparent text-white text-xs h-10 font-bold"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Vendedor / Comercial</label>
                          <Input
                            value={selectedProjeto.responsavelComercial || ''}
                            onChange={(e) => setSelectedProjeto({ ...selectedProjeto, responsavelComercial: e.target.value })}
                            className="bg-black/55 border-transparent text-white text-xs h-10 font-bold"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Designer Operacional</label>
                          <select
                            value={selectedProjeto.designerResponsavel || selectedProjeto.designer || '—'}
                            onChange={(e) => setSelectedProjeto({ ...selectedProjeto, designerResponsavel: e.target.value, designer: e.target.value })}
                            className="w-full bg-black/55 border-none text-zinc-300 rounded-lg text-xs h-10 px-3 outline-none hover:border-transparent transition-all font-bold uppercase"
                          >
                            <option value="—">—</option>
                            <option value="Gabriel F.">Gabriel F. (Design Visual)</option>
                            <option value="Amanda R.">Amanda R. (Luminosos ERP)</option>
                            <option value="Carlos O.">Carlos O. (Prototipação 3D)</option>
                            <option value="Ana Karolina">Ana Karolina (Comunicação)</option>
                            <option value="Amanda J.">Amanda J. (Ilustrações)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Prazo Acordado</label>
                          <Input
                            type="date"
                            value={selectedProjeto.prazo}
                            onChange={(e) => setSelectedProjeto({ ...selectedProjeto, prazo: e.target.value })}
                            className="bg-black/55 border-transparent text-white text-xs h-10 font-mono font-black"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Valor (R$)</label>
                          <Input
                            type="number"
                            value={selectedProjeto.valor || ''}
                            onChange={(e) => setSelectedProjeto({ ...selectedProjeto, valor: parseFloat(e.target.value) || 0 })}
                            className="bg-black/55 border-transparent text-emerald-400 text-xs h-10 font-mono font-black"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Link da Pasta</label>
                          <Input
                            value={selectedProjeto.linkPasta || ''}
                            onChange={(e) => setSelectedProjeto({ ...selectedProjeto, linkPasta: e.target.value })}
                            className="bg-black/55 border-transparent text-purple-400 text-xs h-10 font-mono truncate"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Status Operacional</label>
                          <select
                            value={selectedProjeto.status}
                            onChange={(e) => setSelectedProjeto({ ...selectedProjeto, status: e.target.value as any })}
                            className="w-full bg-black/55 border-none text-zinc-300 rounded-lg text-xs h-10 px-3 outline-none hover:border-transparent transition-all font-black uppercase"
                          >
                            {(() => {
                              const itemStage = selectedProjeto.flowStage || activeTab;
                              if (itemStage === 'atendimento') {
                                return (
                                  <>
                                    <option value="Pendente">Pendente</option>
                                    <option value="Retornado">Retornado</option>
                                    <option value="Em Proposta">Em Proposta</option>
                                    <option value="Finalizado">Finalizado</option>
                                  </>
                                );
                              }
                              if (itemStage === 'funil') {
                                return (
                                  <>
                                    <option value="Prospecção">Prospecção</option>
                                    <option value="Contato Inicial">Contato Inicial</option>
                                    <option value="Análise Técnica">Análise Técnica</option>
                                    <option value="Elaboração Proposta">Elaboração Proposta</option>
                                    <option value="Follow-up">Follow-up</option>
                                    <option value="Pronto (Ganho)">Pronto (Ganho)</option>
                                  </>
                                );
                              }
                              if (itemStage === 'orcamentos') {
                                return (
                                  <>
                                    <option value="Em Elaboração">Em Elaboração</option>
                                    <option value="Enviado">Enviado</option>
                                    <option value="Aprovado">Aprovado</option>
                                    <option value="Recusado">Recusado</option>
                                  </>
                                );
                              }
                              if (itemStage === 'ordem-servicos') {
                                return (
                                  <>
                                    <option value="Aguardando Arquivos">Aguardando Arquivos</option>
                                    <option value="Preparacao">Preparação</option>
                                    <option value="Producao">Produção</option>
                                    <option value="Acabamento/Qualidade">Acabamento/Qualidade</option>
                                    <option value="Entregue">Entregue</option>
                                  </>
                                );
                              }
                              if (itemStage === 'campanhas') {
                                return (
                                  <>
                                    <option value="Ativa">Ativa</option>
                                    <option value="Pausada">Pausada</option>
                                    <option value="Finalizada">Finalizada</option>
                                  </>
                                );
                              }
                              // default / projetos
                              return (
                                <>
                                  <option value="Briefing">Briefing Pendente</option>
                                  <option value="Em Vetorização">Em Vetorização</option>
                                  <option value="Ajuste Solicitado">Ajuste Solicitado</option>
                                  <option value="Aprovado Pelo Cliente">Aprovado Pelo Cliente</option>
                                </>
                              );
                            })()}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Escopo / Descrição Técnica</label>
                        <textarea
                          value={selectedProjeto.briefing || ''}
                          onChange={(e) => setSelectedProjeto({ ...selectedProjeto, briefing: e.target.value })}
                          rows={3}
                          className="w-full bg-zinc-900/35 border-none rounded-lg text-xs p-3 text-white outline-none focus:border-purple-500/30 leading-relaxed font-sans"
                        />
                      </div>
                    </div>
                  )}

                  {/* Aba Produtos do Modal */}
                  {editProjActiveTab === 'produtos' && selectedProjeto && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-transparent pb-2">
                        <div className="space-y-0.5">
                          <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Gerência Técnica de Peças & Produtos</label>
                          <p className="text-[9px] text-zinc-500 uppercase">Ajuste dimensões, materiais, iluminação e responsáveis nesta OS</p>
                        </div>
                        <Badge className="bg-orange-950/40 text-orange-400 border border-orange-900/30 font-mono text-[9.5px]">
                          {(selectedProjeto.produtos || []).length} {(selectedProjeto.produtos || []).length === 1 ? 'item' : 'itens'}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start font-sans">
                        {/* Left Column: Products List Selector */}
                        <div className="lg:col-span-1 space-y-3">
                          <span className="text-[10.5px] font-black uppercase tracking-wider text-zinc-500 block">Itens da OS</span>
                          <div className="space-y-2 max-h-[365px] overflow-y-auto pr-1">
                            {(selectedProjeto.produtos || []).map((p, idx) => {
                              const isSelected = selectedProjSelectedProdIndex === idx;
                              return (
                                <div
                                  key={p.id || idx}
                                  onClick={() => setSelectedProjSelectedProdIndex(idx)}
                                  className={cn(
                                    "p-3 rounded-lg border text-left cursor-pointer transition-all relative group flex flex-col justify-center min-h-[52px]",
                                    isSelected
                                      ? "border-orange-500/80 bg-orange-950/20 text-orange-400 font-extrabold shadow-md shadow-orange-950/5"
                                      : "border-transparent hover:border-transparent bg-zinc-900/10 text-zinc-400 hover:text-zinc-300"
                                  )}
                                >
                                  <span className="text-[9.5px] font-black font-mono text-zinc-500/80 uppercase block">
                                    {idx + 1}.
                                  </span>
                                  <div className="text-xs uppercase font-extrabold truncate pr-6 mt-0.5 text-ellipsis">
                                    {p.nome || p.name || 'Novo produto'}
                                  </div>
                                  
                                  {/* Delete button option */}
                                  {(selectedProjeto.produtos || []).length > 1 && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const updated = (selectedProjeto.produtos || []).filter((_, i) => i !== idx);
                                        setSelectedProjeto({
                                          ...selectedProjeto,
                                          produtos: updated
                                        });
                                        setSelectedProjSelectedProdIndex(Math.max(0, idx - 1));
                                      }}
                                      className="absolute right-2 top-1/2 -translate-y-1/2 text-rose-500 hover:text-rose-400 opacity-60 hover:opacity-100 transition-opacity p-1.5"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* "+ Adicionar" button matching screenshot */}
                          <button
                            type="button"
                            onClick={() => {
                              const newItem = createNewDefaultProduct();
                              const currentProds = selectedProjeto.produtos || [];
                              setSelectedProjeto({
                                ...selectedProjeto,
                                produtos: [...currentProds, newItem]
                              });
                              setSelectedProjSelectedProdIndex(currentProds.length);
                            }}
                            className="w-full py-3.5 rounded-lg border border-dashed border-transparent hover:border-orange-500/30 bg-zinc-950/40 hover:bg-orange-950/5 text-zinc-500 hover:text-orange-450 text-xs font-black uppercase transition-all flex items-center justify-center gap-1.5"
                          >
                            <span>+ Adicionar</span>
                          </button>
                        </div>

                        {/* Right Column: Active Product Specification Form */}
                        <div className="lg:col-span-3 bg-zinc-900 border-none rounded-xl p-5 space-y-4 shadow-xl">
                          {(selectedProjeto.produtos || [])[selectedProjSelectedProdIndex] ? (
                            (() => {
                              const activeP = (selectedProjeto.produtos || [])[selectedProjSelectedProdIndex];
                              return (
                                <>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Nome do Produto</label>
                                      <Input
                                        value={activeP.nome || activeP.name || ''}
                                        onChange={(e) => updateSelectedProductField(selectedProjSelectedProdIndex, 'nome', e.target.value)}
                                        placeholder="Ex: Letreiro Luminoso"
                                        className="bg-zinc-900/85 border-transparent text-white text-xs h-9 font-extrabold focus:border-orange-500/40"
                                      />
                                    </div>

                                    <div className="space-y-1.5">
                                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Categoria</label>
                                      <Input
                                        value={activeP.categoria || activeP.category || ''}
                                        onChange={(e) => updateSelectedProductField(selectedProjSelectedProdIndex, 'categoria', e.target.value)}
                                        placeholder="Letra Caixa, ACM, Totem..."
                                        className="bg-zinc-900/85 border-transparent text-zinc-200 text-xs h-9 font-bold focus:border-orange-500/40"
                                      />
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Quantidade</label>
                                      <Input
                                        type="number"
                                        value={activeP.qtd !== undefined ? activeP.qtd : (activeP.quantity || 1)}
                                        onChange={(e) => updateSelectedProductField(selectedProjSelectedProdIndex, 'qtd', parseInt(e.target.value) || 1)}
                                        className="bg-zinc-900/85 border-transparent text-purple-400 text-xs h-9 font-mono font-black focus:border-orange-500/40"
                                      />
                                    </div>

                                    <div className="space-y-1.5">
                                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Material</label>
                                      <Input
                                        value={activeP.material || ''}
                                        onChange={(e) => updateSelectedProductField(selectedProjSelectedProdIndex, 'material', e.target.value)}
                                        className="bg-zinc-900/85 border-transparent text-zinc-200 text-xs h-9 font-bold focus:border-orange-500/40"
                                      />
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Largura (cm)</label>
                                      <Input
                                        value={activeP.largura || activeP.width || ''}
                                        onChange={(e) => updateSelectedProductField(selectedProjSelectedProdIndex, 'largura', e.target.value)}
                                        className="bg-zinc-900/85 border-transparent text-zinc-200 text-xs h-9 font-mono font-bold focus:border-orange-500/40"
                                      />
                                    </div>

                                    <div className="space-y-1.5">
                                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Altura (cm)</label>
                                      <Input
                                        value={activeP.altura || activeP.height || ''}
                                        onChange={(e) => updateSelectedProductField(selectedProjSelectedProdIndex, 'altura', e.target.value)}
                                        className="bg-zinc-900/85 border-transparent text-zinc-200 text-xs h-9 font-mono font-bold focus:border-orange-500/40"
                                      />
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Estrutura</label>
                                      <Input
                                        value={activeP.estrutura || activeP.structure || ''}
                                        onChange={(e) => updateSelectedProductField(selectedProjSelectedProdIndex, 'estrutura', e.target.value)}
                                        className="bg-zinc-900/85 border-transparent text-zinc-200 text-xs h-9 font-bold focus:border-orange-500/40"
                                      />
                                    </div>

                                    <div className="space-y-1.5">
                                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Acabamento</label>
                                      <Input
                                        value={activeP.acabamento || activeP.finish || ''}
                                        onChange={(e) => updateSelectedProductField(selectedProjSelectedProdIndex, 'acabamento', e.target.value)}
                                        className="bg-zinc-900/85 border-transparent text-zinc-200 text-xs h-9 font-bold focus:border-orange-500/40"
                                      />
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Tipo de Instalação</label>
                                      <Input
                                        value={activeP.tipoInstalacao || activeP.installationType || ''}
                                        onChange={(e) => updateSelectedProductField(selectedProjSelectedProdIndex, 'tipoInstalacao', e.target.value)}
                                        className="bg-zinc-900/85 border-transparent text-zinc-200 text-xs h-9 font-bold focus:border-orange-500/40"
                                      />
                                    </div>

                                    <div className="space-y-1.5">
                                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Local de Aplicação</label>
                                      <Input
                                        value={activeP.localAplicacao || activeP.applicationPlace || ''}
                                        onChange={(e) => updateSelectedProductField(selectedProjSelectedProdIndex, 'localAplicacao', e.target.value)}
                                        className="bg-zinc-900/85 border-transparent text-zinc-200 text-xs h-9 font-bold focus:border-orange-500/40"
                                      />
                                    </div>
                                  </div>

                                  {/* Possui iluminação button style checkbox */}
                                  <div className="py-2.5">
                                    <label className="flex items-center gap-3 cursor-pointer p-4 rounded-lg bg-zinc-900 border-none hover:bg-zinc-900 transition-all">
                                      <input
                                        type="checkbox"
                                        checked={activeP.iluminacao || activeP.lighting || false}
                                        onChange={(e) => updateSelectedProductField(selectedProjSelectedProdIndex, 'iluminacao', e.target.checked)}
                                        className="h-4 w-4 bg-zinc-900 border-transparent text-orange-500 rounded focus:ring-0 focus:ring-offset-0 focus:outline-none"
                                      />
                                      <span className="text-xs font-black uppercase tracking-wider text-zinc-300">Possui iluminação</span>
                                    </label>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Designer</label>
                                      <select
                                        value={activeP.designer || 'Adams Leandro Alves Pereira'}
                                        onChange={(e) => updateSelectedProductField(selectedProjSelectedProdIndex, 'designer', e.target.value)}
                                        className="w-full bg-zinc-900/85 border-none text-zinc-300 rounded-lg text-xs h-9 px-3 outline-none hover:border-transparent transition-all font-bold uppercase"
                                      >
                                        <option value="Adams Leandro Alves Pereira">Adams Leandro Alves Pereira (Admin/Dir)</option>
                                        <option value="Gabriel F.">Gabriel F. (Design Visual)</option>
                                        <option value="Amanda R.">Amanda R. (Luminosos ERP)</option>
                                        <option value="Carlos O.">Carlos O. (Prototipação 3D)</option>
                                        <option value="Ana Karolina">Ana Karolina (Comunicação)</option>
                                      </select>
                                    </div>

                                    <div className="space-y-1.5">
                                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Projetista</label>
                                      <Input
                                        value={activeP.projetista || activeP.designerProjetista || ''}
                                        onChange={(e) => updateSelectedProductField(selectedProjSelectedProdIndex, 'projetista', e.target.value)}
                                        className="bg-zinc-900/85 border-transparent text-zinc-200 text-xs h-9 font-bold focus:border-orange-500/40"
                                      />
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Produção</label>
                                      <Input
                                        value={activeP.producao || activeP.productionResponsavel || ''}
                                        onChange={(e) => updateSelectedProductField(selectedProjSelectedProdIndex, 'producao', e.target.value)}
                                        className="bg-zinc-900/85 border-transparent text-zinc-200 text-xs h-9 font-bold focus:border-orange-500/40"
                                      />
                                    </div>

                                    <div className="space-y-1.5">
                                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Instalador</label>
                                      <Input
                                        value={activeP.instalador || activeP.assembler || ''}
                                        onChange={(e) => updateSelectedProductField(selectedProjSelectedProdIndex, 'instalador', e.target.value)}
                                        className="bg-zinc-900/85 border-transparent text-zinc-200 text-xs h-9 font-bold focus:border-orange-500/40"
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Status Técnico</label>
                                    <select
                                      value={activeP.statusTecnico || activeP.technicalStatus || 'Em andamento'}
                                      onChange={(e) => updateSelectedProductField(selectedProjSelectedProdIndex, 'statusTecnico', e.target.value)}
                                      className="w-full bg-zinc-900 border-none text-zinc-300 rounded-lg text-xs h-9 px-3 outline-none hover:border-transparent transition-all font-black uppercase"
                                    >
                                      <option value="Em andamento">Em andamento</option>
                                      <option value="Pendente">Pendente</option>
                                      <option value="Aprovado">Aprovado</option>
                                      <option value="Finalizado">Finalizado</option>
                                    </select>
                                  </div>

                                  <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Observações</label>
                                    <textarea
                                      value={activeP.observacoes || activeP.observations || ''}
                                      onChange={(e) => updateSelectedProductField(selectedProjSelectedProdIndex, 'observacoes', e.target.value)}
                                      rows={4}
                                      className="w-full bg-zinc-900/85 border-none text-white rounded-lg text-xs p-3 outline-none focus:border-orange-500/30 leading-relaxed font-sans placeholder:text-zinc-700"
                                    />
                                  </div>
                                </>
                              );
                            })()
                          ) : (
                            <div className="py-20 text-center text-zinc-600 uppercase font-black text-xs">
                              Selecione ou adicione um produto ao briefing de arte.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Aba Arquivos do Modal */}
                  {editProjActiveTab === 'arquivos' && (
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Gerência de Arquivos Técnicos de Prova</label>
                      <div className="border border-dashed border-transparent bg-zinc-900 p-6 text-center rounded-2xl cursor-pointer">
                        <Upload size={18} className="mx-auto mb-2 text-purple-400 animate-bounce" />
                        <span className="text-xs font-black uppercase text-zinc-400">Arraste Novas Plantas ou CDR/DXF</span>
                        <p className="text-[9.5px] text-zinc-600 mt-1 uppercase">Limites de upload sincronizados com as diretrizes do ClickUp</p>
                      </div>
                      
                      <div className="bg-zinc-900 border-none rounded-xl p-3.5 space-y-1 block max-w-full">
                        <span className="text-[9px] font-black text-zinc-605 uppercase font-mono">Pasta de Produção do Cliente:</span>
                        <a 
                          href={selectedProjeto.linkPasta} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-xs font-bold text-purple-450 hover:underline block truncate flex items-center gap-1.5"
                        >
                          <span>{selectedProjeto.linkPasta || 'Aguardando Link do Drive...'}</span>
                          {selectedProjeto.linkPasta && <ExternalLink size={10} />}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Aba Histórico do Modal */}
                  {editProjActiveTab === 'historico' && (
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Marcadores Temporais da Fábrica (MES)</label>
                      <div className="bg-black/50 border-none rounded-xl p-4 font-mono text-xs space-y-3 max-h-56 overflow-y-auto">
                        {(selectedProjeto.historico || []).map((h, idx) => (
                          <div key={idx} className="flex gap-2 text-zinc-400">
                            <span className="text-purple-500 font-extrabold">•</span>
                            <div>
                              <span className="text-[10px] text-zinc-600 font-black block">{h.data}</span>
                              <span className="font-extrabold uppercase text-zinc-300">{h.evento}</span>
                              {h.nota && <span className="text-[10px] text-zinc-500 block leading-relaxed mt-0.5">{h.nota}</span>}
                            </div>
                          </div>
                        ))}
                        {(selectedProjeto.historico || []).length === 0 && (
                          <div className="text-[10px] text-zinc-600 block uppercase italic font-bold text-center py-4">Nenhum histórico operacional mapeado.</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Aba Notas do Modal */}
                  {editProjActiveTab === 'notas' && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block font-bold">Observações de Chão de Fábrica</label>
                      <textarea
                        value={selectedProjeto.notas || ''}
                        onChange={(e) => setSelectedProjeto({ ...selectedProjeto, notes: e.target.value, notas: e.target.value })}
                        rows={6}
                        className="w-full bg-zinc-900/35 border-none focus:border-purple-500/30 rounded-lg text-xs p-3 text-white outline-none leading-relaxed font-sans placeholder:text-zinc-700"
                        placeholder="Reclamações do cliente, detalhes sobre pintura eletrostática, etc..."
                      />
                    </div>
                  )}
                </div>

                {/* Direita: Painel Comercial / Metadados */}
                <div className="w-full md:w-64 p-6 bg-zinc-900 flex flex-col justify-between shrink-0 font-sans space-y-6">
                  <div className="space-y-5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-zinc-600 block">Metadados de CRM</span>
                    
                    <div className="space-y-3">
                      <div className="p-3 bg-zinc-950/80 border-none rounded-xl space-y-0.5">
                        <span className="text-[9px] font-black text-zinc-600 uppercase font-mono block">Origem do Cadastro:</span>
                        <span className="text-[11px] font-bold text-zinc-300 block uppercase">{selectedProjeto.responsavelComercial || 'Canal Geral Vendedores'}</span>
                      </div>
                      
                      <div className="p-3 bg-zinc-950/80 border-none rounded-xl space-y-1">
                        <span className="text-[9px] font-black text-zinc-600 uppercase font-mono block">Nível de Rigor do Prazo:</span>
                        <Badge className={cn(
                          "font-mono text-[9px] font-black px-2 py-0.5 rounded uppercase border",
                          selectedProjeto.urgente 
                            ? "bg-rose-950/40 text-rose-450 border-rose-900/40" 
                            : "bg-zinc-900 text-zinc-400 border-transparent"
                        )}>
                          {selectedProjeto.urgente ? 'GRAVIDADE MÁXIMA' : 'NORMAL (SLA STANDARD)'}
                        </Badge>
                      </div>

                      <div className="p-3 bg-zinc-950/80 border-none rounded-xl space-y-0.5">
                        <span className="text-[9px] font-black text-zinc-600 uppercase font-mono block">Tempo Faturado estimado:</span>
                        <span className="text-[11px] font-bold text-emerald-400 block font-mono">
                          {selectedProjeto.valor ? `R$ ${selectedProjeto.valor.toLocaleString('pt-BR')}` : 'Sob Orçamento'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Operações de rodapé */}
                  <div className="space-y-2 pt-4 border-t border-transparent">
                    <Button
                      type="button"
                      onClick={() => {
                        const itemStage = selectedProjeto.flowStage || activeTab;
                        if (itemStage === 'atendimento') {
                          setAtendimentos((prev: any) => prev.map((p: any) => p.id === selectedProjeto.id ? mapUnifiedToAtendimento(mapProjetoToUnified(selectedProjeto)) : p));
                        } else if (itemStage === 'funil') {
                          setDeals((prev: any) => prev.map((p: any) => p.id === selectedProjeto.id ? mapUnifiedToDeal(mapProjetoToUnified(selectedProjeto)) : p));
                        } else if (itemStage === 'projetos') {
                          setProjetos((prev: any) => prev.map((p: any) => p.id === selectedProjeto.id ? selectedProjeto : p));
                        } else if (itemStage === 'orcamentos') {
                          setOrcamentos((prev: any) => prev.map((p: any) => p.id === selectedProjeto.id ? mapUnifiedToOrcamento(mapProjetoToUnified(selectedProjeto)) : p));
                        } else if (itemStage === 'ordem-servicos') {
                          setOrdensServico((prev: any) => prev.map((p: any) => p.id === selectedProjeto.id ? mapUnifiedToOS(mapProjetoToUnified(selectedProjeto)) : p));
                        } else if (itemStage === 'campanhas') {
                          setCampanhas((prev: any) => prev.map((p: any) => p.id === selectedProjeto.id ? mapUnifiedToCampanha(mapProjetoToUnified(selectedProjeto)) : p));
                        } else {
                          setProjetos((prev: any) => prev.map((p: any) => p.id === selectedProjeto.id ? selectedProjeto : p));
                        }
                        setSelectedProjeto(null);
                        alert('Dados atualizados com sucesso no ERP Korteck!');
                      }}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black text-[10.5px] uppercase tracking-wider h-11"
                    >
                      Salvar Alterações
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setSelectedProjeto(null)}
                        className="flex-1 border-transparent text-zinc-400 hover:bg-zinc-900 hover:text-white font-black text-[10.5px] uppercase tracking-wider h-11"
                      >
                        Descartar e Fechar
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          if (!confirm(`Deseja EXCLUIR o registro #${selectedProjeto.id} permanentemente?`)) return;
                          const itemStage = selectedProjeto.flowStage || activeTab;
                          if (itemStage === 'atendimento') {
                            setAtendimentos((prev: any) => prev.filter((p: any) => p.id !== selectedProjeto.id));
                          } else if (itemStage === 'funil') {
                            setDeals((prev: any) => prev.filter((p: any) => p.id !== selectedProjeto.id));
                          } else if (itemStage === 'projetos') {
                            setProjetos((prev: any) => prev.filter((p: any) => p.id !== selectedProjeto.id));
                          } else if (itemStage === 'orcamentos') {
                            setOrcamentos((prev: any) => prev.filter((p: any) => p.id !== selectedProjeto.id));
                          } else if (itemStage === 'ordem-servicos') {
                            setOrdensServico((prev: any) => prev.filter((p: any) => p.id !== selectedProjeto.id));
                          } else if (itemStage === 'campanhas') {
                            setCampanhas((prev: any) => prev.filter((p: any) => p.id !== selectedProjeto.id));
                          } else {
                            setProjetos((prev: any) => prev.filter((p: any) => p.id !== selectedProjeto.id));
                          }
                          setSelectedProjeto(null);
                        }}
                        className="flex-1 border-red-900/30 text-rose-500 hover:bg-rose-600 hover:text-white font-black text-[10.5px] uppercase tracking-wider h-11"
                      >
                        <Trash2 size={12} className="mr-1.5" /> Excluir
                      </Button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </TabsContent>

        {/* ==================== 4. ABA DE ORÇAMENTOS ==================== */}
        <TabsContent value="orcamentos" className="outline-none space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Esquerda: Geração de Proposta Base */}
            <div className="lg:col-span-4">
              <Card className={cn("shadow-2xl border", c("bg-white border-transparent text-zinc-950", "bg-zinc-900 border-transparent text-white"))}>
                <CardHeader>
                  <CardTitle className="text-sm font-black uppercase tracking-widest text-[#a855f7]">Gerar Orçamento / Proposta Comercial</CardTitle>
                  <CardDescription className="text-xs text-zinc-500">Defina o preço dos insumos e gere propostas para faturamento</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateOrcamento} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Cliente Requerente</label>
                      <Input
                        value={newOrcCliente}
                        onChange={(e) => setNewOrcCliente(e.target.value)}
                        placeholder="Ex: Grupo RZK S/A"
                        className="bg-black/40 border-transparent text-white h-11 text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Setor Comercial</label>
                        <select
                          value={newOrcSetor}
                          onChange={(e) => setNewOrcSetor(e.target.value as SectorType)}
                          className="w-full bg-black/40 border-none rounded-lg text-xs h-11 px-3 text-white outline-none"
                        >
                          <option value="comunicacao-visual">Comunicação Visual</option>
                          <option value="corte-cnc">Corte CNC</option>
                          <option value="impressao-digital">Impressão Digital</option>
                          <option value="impressao-3d">Impressão 3D</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Valor Estimado (R$)</label>
                        <Input
                          value={newOrcValor}
                          onChange={(e) => setNewOrcValor(e.target.value)}
                          placeholder="Valor Comercial Base"
                          type="number"
                          className="bg-black/40 border-transparent text-white h-11 text-xs"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-zinc-950 rounded-xl space-y-1">
                      <span className="text-[8.5px] text-zinc-600 block uppercase font-black">Pre-visualização ERP:</span>
                      <p className="text-white text-xs font-bold uppercase italic tracking-tighter">
                        VALOR TOTAL CALCULADO: R$ {parseFloat(newOrcValor || '0').toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>

                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white h-11 font-black text-xs uppercase uppercase tracking-wider cursor-pointer">
                      Salvar e Emitir Proposta
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Direita: Tabela de Orçamentos cadastrados */}
            <div className="lg:col-span-8">
              <Card className={cn("shadow-2xl h-full border", c("bg-white border-transparent text-zinc-950", "bg-zinc-900 border-transparent text-white"))}>
                <CardHeader className={cn("flex flex-row items-center justify-between border-b pb-4", c("border-transparent", "border-transparent"))}>
                  <div>
                    <CardTitle className="text-sm font-black uppercase">Banco de Orçamentos e Propostas</CardTitle>
                    <CardDescription className="text-xs text-zinc-500">Documentações em emissão ou aguardando aceite fiscal de compras</CardDescription>
                  </div>
                  <Badge className="bg-zinc-900/15 text-emerald-400 border border-emerald-500/10 text-[10px] font-black">
                    ORÇAMENTOS ATIVOS
                  </Badge>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans text-xs">
                      <thead>
                        <tr className="bg-zinc-950/40 text-zinc-500 border-b border-transparent text-[10px] font-black uppercase">
                          <th className="p-4 pl-6">Nº Orçamento / Data</th>
                          <th className="p-4">Cliente / Comprador</th>
                          <th className="p-4">Setor Alocado</th>
                          <th className="p-4 text-right">Insumos Estimados</th>
                          <th className="p-4 text-right">Valor Final</th>
                          <th className="p-4 text-center">Status</th>
                          <th className="p-4 text-right">Ações Rápidas</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-900">
                        {visibleOrcamentos.map((orc) => (
                          <tr 
                            key={orc.id} 
                            onClick={() => openHighFidelityModal(orc.id, 'orcamentos')}
                            className="hover:bg-zinc-900/25 transition-colors cursor-pointer"
                          >
                            <td className="p-4 pl-6 font-mono text-[10px] text-zinc-400 font-bold">
                              <span className="block text-white">#{orc.id}</span>
                              <span className="block text-[9px] font-medium mt-0.5 text-zinc-600">{orc.dataEmissao}</span>
                            </td>
                            <td className="p-4 font-black uppercase text-zinc-200">
                              {orc.cliente}
                            </td>
                            <td className="p-4">
                              <Badge className={cn("border-0 text-[8px] font-black uppercase", getSetorColor(orc.setor))}>
                                {getSetorLabel(orc.setor)}
                              </Badge>
                            </td>
                            <td className="p-4 text-right">
                              <span className="text-[10px] text-zinc-400 font-medium">
                                {orc.itens?.map(it => `${it.qtd}x ${it.nome}`).join(', ') || 'Item Geral'}
                              </span>
                            </td>
                            <td className="p-4 text-right font-black font-mono text-purple-400 italic">
                              R$ {orc.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </td>
                            <td className="p-4 text-center">
                              <Badge className={cn(
                                "border-0 text-[9px] font-black uppercase tracking-wide",
                                orc.status === 'Em Elaboração' && "bg-zinc-900 text-zinc-400",
                                orc.status === 'Enviado' && "bg-blue-950 border border-blue-900/30 text-blue-400",
                                orc.status === 'Aprovado' && "bg-emerald-950 border border-emerald-950 text-emerald-400",
                                orc.status === 'Recusado' && "bg-rose-950 border border-rose-950/40 text-rose-400"
                              )}>
                                {orc.status}
                              </Badge>
                            </td>
                            <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                              <div className="flex justify-end gap-1.5">
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    // Aprovar orçamento e gerar O.S.
                                    setOrcamentos(prev => prev.map(o => o.id === orc.id ? { ...o, status: 'Aprovado' } : o));
                                    
                                    const novaOS: OSOrd = {
                                      id: `OS-${Math.floor(405 + Math.random() * 100)}`,
                                      numeroOS: `OS-2026-${Math.floor(8095 + Math.random() * 100)}`,
                                      orcamentoId: orc.id,
                                      cliente: orc.cliente,
                                      titulo: orc.itens?.[0]?.nome || 'Produção Geral',
                                      setor: orc.setor,
                                      status: 'Aguardando Arquivos',
                                      dataEntrega: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                                    };
                                    setOrdensServico([novaOS, ...ordensServico]);
                                    alert(`Orçamento #${orc.id} aprovado! Ordem de Serviço gerada na base: ${novaOS.numeroOS}`);
                                  }}
                                  className="h-8 px-2.5 text-[9px] bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase leading-none shadow-sm cursor-pointer"
                                >
                                  Faturar O.S.
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ==================== 5. ABA DE ORDENS DE SERVIÇO (O.S.) ==================== */}
        <TabsContent value="ordem-servicos" className="outline-none space-y-6">
          <Card className={cn("shadow-2xl border", c("bg-white border-transparent text-zinc-950", "bg-zinc-900 border-transparent text-white"))}>
            <CardHeader className={cn("flex flex-row items-center justify-between border-b pb-4", c("border-transparent", "border-transparent"))}>
              <div>
                <CardTitle className="text-sm font-black uppercase">Central de Ordens de Serviço (O.S.) Ativas</CardTitle>
                <CardDescription className="text-xs text-zinc-500 font-mono">Controle o andamento da engenharia de comunicação visual por setor de produção</CardDescription>
              </div>
              <Badge className="bg-purple-900/40 text-purple-400 border border-purple-500/20 text-[10px] font-bold">
                MES INDUSTRIAL LINKED // PCP VINCULADO
              </Badge>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs">
                  <thead>
                    <tr className="bg-zinc-950/40 text-zinc-500 border-b border-transparent text-[10px] font-black uppercase">
                      <th className="p-4 pl-6">Códigos O.S. / Orçamento</th>
                      <th className="p-4">Cliente / Comitente</th>
                      <th className="p-4 font-sans">Título da Ordem de Serviço</th>
                      <th className="p-4">Setor Industrial</th>
                      <th className="p-4">Data Limite de Entrega</th>
                      <th className="p-4 text-center">Status Operativo</th>
                      <th className="p-4 text-right">Alterar Fluxo PCP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900">
                    {visibleOS.map((o) => (
                      <tr 
                        key={o.id} 
                        onClick={() => openHighFidelityModal(o.id, 'ordem-servicos')}
                        className="hover:bg-zinc-900/25 transition-colors cursor-pointer"
                      >
                        <td className="p-4 pl-6 font-mono text-[10px]">
                          <span className="block text-white font-black">{o.numeroOS}</span>
                          <span className="block text-[9.5px] text-zinc-500 mt-0.5">Origem: #{o.orcamentoId}</span>
                        </td>
                        <td className="p-4 font-extrabold text-zinc-300 uppercase">
                          {o.cliente}
                        </td>
                        <td className="p-4 font-medium max-w-xs truncate text-[11px] text-zinc-400 uppercase">
                          {o.titulo}
                        </td>
                        <td className="p-4">
                          <Badge className={cn("border-0 text-[8px] font-black uppercase", getSetorColor(o.setor))}>
                            {getSetorLabel(o.setor)}
                          </Badge>
                        </td>
                        <td className="p-4 font-mono font-bold text-zinc-300">
                          {o.dataEntrega}
                        </td>
                        <td className="p-4 text-center">
                          <span className={cn(
                            "px-2.5 py-1 rounded text-[9.5px] font-black uppercase tracking-tight inline-block",
                            o.status === 'Aguardando Arquivos' && "bg-neutral-900/80 text-zinc-400 border-none",
                            o.status === 'Preparacao' && "bg-blue-950/70 border border-blue-900/35 text-blue-400",
                            o.status === 'Producao' && "bg-purple-950 border border-purple-900 text-purple-400 animate-pulse",
                            o.status === 'Acabamento/Qualidade' && "bg-pink-950 border border-pink-900 text-pink-400",
                            o.status === 'Entregue' && "bg-emerald-950 text-emerald-400 border border-emerald-900"
                          )}>
                            {o.status}
                          </span>
                        </td>
                        <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex justify-end gap-1">
                            {['Preparacao', 'Producao', 'Entregue'].map((etap) => (
                              <button
                                key={etap}
                                onClick={() => {
                                  updateOSStatus(o.id, etap as any);
                                  alert(`Status da ${o.numeroOS} alterado para: ${etap.toUpperCase()}`);
                                }}
                                className={cn(
                                  "h-6.5 px-2 rounded font-black text-[8px] uppercase tracking-wide cursor-pointer",
                                  o.status === etap 
                                    ? "bg-purple-600 text-white font-bold"
                                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                                )}
                              >
                                {etap === 'Preparacao' ? 'Vetores/Pre-flight' : etap === 'Producao' ? 'Cortar/Montar' : 'Entregue'}
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}

                    {visibleOS.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-16 text-center text-zinc-600 font-bold uppercase text-[10.5px]">
                          Nenhuma O.S. ativa no setor
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ==================== 6. ABA DE CAMPANHAS ==================== */}
        <TabsContent value="campanhas" className="outline-none space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Esquerda: Nova Campanha */}
            <div className="lg:col-span-4">
              <Card className={cn("shadow-2xl border", c("bg-white border-transparent text-zinc-950", "bg-zinc-900 border-transparent text-white"))}>
                <CardHeader>
                  <CardTitle className="text-sm font-black uppercase tracking-widest text-[#a855f7]">Criar Campanha Comercial</CardTitle>
                  <CardDescription className="text-xs text-zinc-500">Mapeamento de investimentos em captação de leads</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddCampanha} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Nome Comercial da Campanha</label>
                      <Input
                        value={newCampName}
                        onChange={(e) => setNewCampName(e.target.value)}
                        placeholder="Ex: Google Ads - Comunicação Visual RJ"
                        className="bg-black/40 border-transparent text-white h-11 text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Setor Focado</label>
                        <select
                          value={newCampSetor}
                          onChange={(e) => setNewCampSetor(e.target.value as SectorType)}
                          className="w-full bg-black/40 border-none rounded-lg text-xs h-11 px-3 text-white outline-none"
                        >
                          <option value="comunicacao-visual">Comunicação Visual</option>
                          <option value="corte-cnc">Corte CNC</option>
                          <option value="impressao-digital">Impressão Digital</option>
                          <option value="impressao-3d">Impressão 3D</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Verba / Investimento (R$)</label>
                        <Input
                          value={newCampInv}
                          onChange={(e) => setNewCampInv(e.target.value)}
                          placeholder="Ex: 2500"
                          type="number"
                          className="bg-black/40 border-transparent text-white h-11 text-xs"
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white h-11 font-black text-xs uppercase uppercase tracking-wider cursor-pointer">
                      Lançar Campanha de Captação
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Direita: Grid das Campanhas comerciais */}
            <div className="lg:col-span-8">
              <Card className={cn("shadow-2xl h-full border", c("bg-white border-transparent text-zinc-950", "bg-zinc-900 border-transparent text-white"))}>
                <CardHeader className={cn("flex flex-row items-center justify-between border-b pb-4", c("border-transparent", "border-transparent"))}>
                  <div>
                    <CardTitle className="text-sm font-black uppercase">Campanhas e Geração de Oportunidades</CardTitle>
                    <CardDescription className="text-xs text-zinc-500 font-sans">Retorno sobre Investimento (ROI) de cada setor de marketing e vendas</CardDescription>
                  </div>
                  <Badge className="bg-amber-500/10 text-amber-500 border border-amber-500/10 text-[10px] font-bold">
                    MARKETING TRACKING
                  </Badge>
                </CardHeader>
                <CardContent className={cn("p-6", viewMode === 'lista' && "p-0")}>
                  {viewMode === 'lista' ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-transparent bg-black/30">
                            <th className="py-3.5 px-4 font-black uppercase text-zinc-500 tracking-wider text-[10px]">Cód</th>
                            <th className="py-3.5 px-4 font-black uppercase text-zinc-500 tracking-wider text-[10px]">Nome da Campanha</th>
                            <th className="py-3.5 px-4 font-black uppercase text-zinc-500 tracking-wider text-[10px]">Setor</th>
                            <th className="py-3.5 px-4 font-black uppercase text-zinc-500 tracking-wider text-[10px]">Investimento</th>
                            <th className="py-3.5 px-4 font-black uppercase text-zinc-500 tracking-wider text-[10px]">Leads</th>
                            <th className="py-3.5 px-4 font-black uppercase text-zinc-500 tracking-wider text-[10px]">ROI</th>
                            <th className="py-3.5 px-4 font-black uppercase text-zinc-500 tracking-wider text-[10px]">Status</th>
                            <th className="py-3.5 px-4 font-black uppercase text-zinc-500 tracking-wider text-[10px] text-center">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900/60 text-zinc-300">
                          {visibleCampanhas.map((camp) => (
                            <tr 
                              key={camp.id} 
                              onClick={() => openHighFidelityModal(camp.id, 'campanhas')}
                              className="hover:bg-zinc-900/20 transition-all font-sans text-xs cursor-pointer"
                            >
                              <td className="py-3.5 px-4 font-black font-mono text-purple-400 text-[9px]">{camp.id}</td>
                              <td className="py-3.5 px-4 font-black uppercase text-white font-sans">{camp.nome}</td>
                              <td className="py-3.5 px-4">
                                <Badge className="bg-zinc-900 text-purple-400 border border-purple-500/10 text-[8.5px] font-black uppercase font-bold px-2 py-0.5">
                                  {getSetorLabel(camp.setor).split(' ')[0]}
                                </Badge>
                              </td>
                              <td className="py-3.5 px-4 font-bold font-mono text-zinc-300">
                                R$ {camp.investimento.toLocaleString('pt-BR')}
                              </td>
                              <td className="py-3.5 px-4 font-bold font-mono">{camp.leadsGerados === 0 ? 'Fase Coleta' : camp.leadsGerados}</td>
                              <td className="py-3.5 px-4">
                                <span className={cn(
                                  "font-bold font-mono text-xs",
                                  camp.roi === 0 ? "text-zinc-600" : "text-emerald-400"
                                )}>
                                  {camp.roi === 0 ? 'Mapeando' : `${camp.roi}x`}
                                </span>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className={cn(
                                  "px-2 px-1 py-0.5 rounded text-[8px] font-black uppercase border tracking-wider",
                                  camp.status === 'Ativa' ? "bg-emerald-950/40 text-emerald-400 border-emerald-900/30" : "bg-zinc-800 text-zinc-500 border-transparent"
                                )}>
                                  {camp.status}
                                </span>
                              </td>
                              <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center justify-center gap-1.5">
                                  <Button
                                    size="sm"
                                    onClick={() => {
                                      // Simular chegada de lead
                                      setCampanhas(prev => prev.map(c => {
                                        if (c.id === camp.id) {
                                          const totalLeads = c.leadsGerados + 1;
                                          return { ...c, leadsGerados: totalLeads, roi: parseFloat((c.roi + 0.1).toFixed(1)) };
                                        }
                                        return c;
                                      }));
                                      // Criar atendimento simulado
                                      const simAtend: Atendimento = {
                                        id: `AT-${Math.floor(801 + Math.random() * 99)}`,
                                        cliente: `Interessado Campanha ${camp.id}`,
                                        contato: 'Automático via Landing Page',
                                        canal: 'WhatsApp',
                                        assunto: `Consulta via ${camp.nome}`,
                                        setor: camp.setor,
                                        status: 'Pendente',
                                        data: new Date().toISOString().split('T')[0],
                                        descricao: 'Lead capturado automaticamente no Pixel da campanha corporativa.'
                                      };
                                      setAtendimentos([simAtend, ...atendimentos]);
                                      alert('Simulação de Pixel ativa: Lead de internet capturado no CRM e incluído na aba de Atendimento!');
                                    }}
                                    className="h-7 text-[8.5px] bg-zinc-900 text-purple-300 hover:bg-purple-650 hover:text-white font-extrabold uppercase py-0"
                                    title="Disparar lead via Pixel simulado"
                                  >
                                    Atrair Lead
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    className="h-7 w-7 p-0 bg-rose-950/20 text-rose-500 hover:bg-rose-600 hover:text-white border border-rose-900/30 transition-all cursor-pointer"
                                    onClick={() => {
                                      if (confirm(`Excluir campanha ${camp.nome}?`)) {
                                        setCampanhas(prev => prev.filter(c => c.id !== camp.id));
                                      }
                                    }}
                                    title="Remover campanha de marketing"
                                  >
                                    <Trash2 size={11} />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {visibleCampanhas.length === 0 && (
                            <tr>
                              <td colSpan={8} className="py-12 text-center text-zinc-600 font-bold uppercase text-[10.5px]">
                                Nenhuma campanha de marketing ativa no momento.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {visibleCampanhas.map((camp) => (
                      <div 
                        key={camp.id} 
                        onClick={() => openHighFidelityModal(camp.id, 'campanhas')}
                        className="p-5 rounded-2xl border-none bg-black/40 hover:border-purple-500/35 transition-all flex flex-col justify-between cursor-pointer"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge className="bg-zinc-900 text-purple-400 border border-purple-500/20 text-[9px] font-black uppercase">
                              {camp.id}
                            </Badge>
                            <span className={cn(
                              "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider",
                              camp.status === 'Ativa' ? "bg-emerald-950 text-emerald-400" : "bg-zinc-800 text-zinc-500"
                            )}>
                              {camp.status}
                            </span>
                          </div>

                          <h4 className="text-base font-black text-white uppercase italic tracking-tight">{camp.nome}</h4>
                          <span className="text-[10px] text-zinc-500 font-black block uppercase">SETOR: {getSetorLabel(camp.setor)}</span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 border-t border-transparent pt-4 mt-4 text-[11px] font-black text-white font-mono">
                          <div>
                            <span className="text-[8.5px] text-zinc-600 uppercase font-bold block">Investimento:</span>
                            R$ {camp.investimento.toLocaleString('pt-BR')}
                          </div>
                          <div>
                            <span className="text-[8.5px] text-zinc-600 uppercase font-bold block">Leads Gerados:</span>
                            {camp.leadsGerados === 0 ? 'Fase Coleta' : camp.leadsGerados}
                          </div>
                          <div className="text-right">
                            <span className="text-[8.5px] text-zinc-600 uppercase font-bold block">ROI ROI:</span>
                            <span className="text-emerald-400">{camp.roi === 0 ? 'Mapeando' : `${camp.roi}x`}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-4" onClick={(e) => e.stopPropagation()}>
                          <Button 
                            onClick={() => {
                              // Simular chegada de lead
                              setCampanhas(prev => prev.map(c => {
                                if (c.id === camp.id) {
                                  const totalLeads = c.leadsGerados + 1;
                                  return { ...c, leadsGerados: totalLeads, roi: parseFloat((c.roi + 0.1).toFixed(1)) };
                                }
                                return c;
                              }));
                              // Criar atendimento simulado
                              const simAtend: Atendimento = {
                                id: `AT-${Math.floor(801 + Math.random() * 99)}`,
                                cliente: `Interessado Campanha ${camp.id}`,
                                contato: 'Automático via Landing Page',
                                canal: 'WhatsApp',
                                assunto: `Consulta via ${camp.nome}`,
                                setor: camp.setor,
                                status: 'Pendente',
                                data: new Date().toISOString().split('T')[0],
                                descricao: 'Lead capturado automaticamente no Pixel da campanha corporativa.'
                              };
                              setAtendimentos([simAtend, ...atendimentos]);
                              alert('Simulação de Pixel ativa: Lead de internet capturado no CRM e incluído na aba de Atendimento!');
                            }}
                            className="w-full bg-zinc-900 text-purple-300 hover:bg-purple-650 hover:text-white font-bold text-[9.5px] uppercase tracking-wider"
                          >
                            Simular Novo Lead (Pixel API)
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ==================== 7. ABA DE CLIENTES ==================== */}
        <TabsContent value="clientes" className="outline-none space-y-6">
          <Card className={cn("shadow-2xl border", c("bg-white border-transparent text-zinc-950", "bg-zinc-900 border-transparent text-white"))}>
            <CardHeader className={cn("flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4", c("border-transparent", "border-transparent"))}>
              <div>
                <CardTitle className="text-sm font-black uppercase">Consolidação da Base de Clientes (LTV)</CardTitle>
                <CardDescription className="text-xs text-zinc-500">Mapeamento do Life Time Value (LTV) e canais de relacionamento</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={13} />
                  <Input
                    value={searchClientQuery}
                    onChange={(e) => setSearchClientQuery(e.target.value)}
                    placeholder="Filtrar por nome de empresa..."
                    className="bg-black/40 border-transparent text-white pl-9 text-xs h-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs">
                  <thead>
                    <tr className="bg-zinc-950/40 text-zinc-500 border-b border-transparent text-[10px] font-black uppercase">
                      <th className="p-4 pl-6">Código Cliente</th>
                      <th className="p-4">Razão Social / Identificação</th>
                      <th className="p-4">Seguimento do Mercado</th>
                      <th className="p-4">Meio Comercial de Atendimento</th>
                      <th className="p-4">Área Alocada Principal</th>
                      <th className="p-4 text-right">LTV Acumulado</th>
                      <th className="p-4 text-center">Última Compra</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900">
                    {visibleClientes.map((c) => (
                      <tr key={c.id} className="hover:bg-zinc-900/25 transition-colors">
                        <td className="p-4 pl-6 font-mono text-[10px] text-zinc-400 font-bold">
                          {c.id}
                        </td>
                        <td className="p-4 font-black uppercase text-purple-400">
                          {c.nome}
                        </td>
                        <td className="p-4 text-zinc-300">
                          {c.segmento}
                        </td>
                        <td className="p-4 text-zinc-400 font-medium">
                          {c.canalPreferido}
                        </td>
                        <td className="p-4">
                          <Badge className={cn("border-0 text-[8px] font-black uppercase", getSetorColor(c.setorPrincipal))}>
                            {getSetorLabel(c.setorPrincipal)}
                          </Badge>
                        </td>
                        <td className="p-4 text-right font-black font-mono text-zinc-200">
                          R$ {c.ltv.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="p-4 text-center font-mono text-zinc-500 text-[10px]">
                          {c.ultimoContato}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ==================== 8. ABA DE FTP ARQUIVOS EM O.S. ==================== */}
        <TabsContent value="ftp-arquivos" className="outline-none space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Esquerda: Seletor de O.S. e Simulador de Upload */}
            <div className="lg:col-span-4 space-y-6">
              <Card className={cn("shadow-2xl border", c("bg-white border-transparent text-zinc-950", "bg-zinc-900 border-transparent text-white"))}>
                <CardHeader>
                  <CardTitle className="text-sm font-black uppercase tracking-widest text-[#a855f7]">Selecionar O.S. para Carregar Arquivos</CardTitle>
                  <CardDescription className="text-xs text-zinc-500">Mapeie desenhos prontos e envie para a máquina correspondente do PCP</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Número da O.S. de Produção</label>
                    <select
                      value={selectedOSForFTP}
                      onChange={(e) => setSelectedOSForFTP(e.target.value)}
                      className="w-full bg-black/40 border-none rounded-lg text-xs h-11 px-3 text-white outline-none"
                    >
                      {ordensServico.map(os => (
                        <option key={os.id} value={os.id}>
                          {os.numeroOS} - {os.cliente} ({getSetorLabel(os.setor).split(' ')[0]})
                        </option>
                      ))}
                    </select>
                  </div>

                  <form onSubmit={handleSimulateUploadFile} className="space-y-4 pt-3 border-t border-transparent">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-1">Simulador de Upload Técnico</span>
                    <div className="space-y-1.5">
                      <label className="text-[9.5px] font-black uppercase tracking-wider text-zinc-400">Nome da Peça / Arquivo Técnico</label>
                      <Input
                        value={newSimulatedFileName}
                        onChange={(e) => setNewSimulatedFileName(e.target.value)}
                        placeholder="Ex: gabarito_encaixes_letras"
                        className="bg-black/40 border-transparent text-white h-11 text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9.5px] font-black uppercase tracking-wider text-zinc-400">Extensão / Tipo do Arquivo</label>
                      <select
                        value={newSimulatedFileExt}
                        onChange={(e) => setNewSimulatedFileExt(e.target.value as any)}
                        className="w-full bg-black/40 border-none rounded-lg text-xs h-11 px-3 text-white outline-none"
                      >
                        <option value="dwg">.DWG (Vetor Projeto)</option>
                        <option value="dxf">.DXF (Corte CNC Router / Laser)</option>
                        <option value="pdf">.PDF (Impressão Digital Vetor)</option>
                        <option value="stl">.STL (Modelo Tridimensional 3D)</option>
                        <option value="cdr">.CDR (CorelDraw)</option>
                        <option value="ai">.AI (Adobe Illustrator)</option>
                      </select>
                    </div>

                    <Button type="submit" className="w-full bg-zinc-900 text-purple-300 hover:bg-purple-650 hover:text-white h-11 font-black text-xs uppercase uppercase tracking-wider cursor-pointer">
                      Enviar no FTP Técnico <FileUp size={14} className="ml-1.5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="p-5 rounded-2xl border-none bg-black/35 space-y-2">
                <div className="flex items-center gap-2 text-amber-500">
                  <AlertCircle size={15} />
                  <h4 className="text-xs font-black uppercase">Instruções aos Operadores</h4>
                </div>
                <p className="text-[11px] text-zinc-500 leading-normal">
                  Este diretório FTP industrial disponibiliza os arquivos finais aos computadores dedicados à <strong>Router CNC</strong>, <strong>Plotters de Recorte</strong> e <strong>Impressoras 3D</strong>. Verifique o esquadro em softwares CAM antes de acionar a queima do laser.
                </p>
              </div>
            </div>

            {/* Direita: Explorador FTP */}
            <div className="lg:col-span-8">
              <Card className={cn("shadow-2xl h-full border", c("bg-white border-transparent text-zinc-950", "bg-zinc-900 border-transparent text-white"))}>
                <CardHeader className={cn("flex flex-row items-center justify-between border-b pb-4", c("border-transparent", "border-transparent"))}>
                  <div className="flex items-center gap-3">
                    <FolderOpen size={22} className="text-purple-500" />
                    <div>
                      <CardTitle className="text-sm font-black uppercase">Mapeamento Integrado de FTP por O.S.</CardTitle>
                      <CardDescription className="text-xs text-zinc-500">Mídia e vetores ativos no servidor local da linha de montagem</CardDescription>
                    </div>
                  </div>
                  <span className="text-[10px] bg-indigo-950/45 text-indigo-400 border border-indigo-900/30 font-black px-2.5 py-1 rounded-xl">
                    FTP ONLINE // PORTA 21
                  </span>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 bg-zinc-950/60 p-3 rounded-xl border-none mb-6 text-xs text-zinc-400">
                    <Folder size={14} className="text-purple-400" />
                    <span>Diretório: <strong className="text-white">/var/ftp/korteck_flow/os_files/os_id_{selectedOSForFTP}/</strong></span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {visibleFTPFiles.map((f) => (
                      <div key={f.id} className="p-4 rounded-xl border-none bg-black/40 hover:border-purple-500/25 transition-all flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-11 h-11 rounded-lg flex items-center justify-center font-black text-xs text-white",
                            f.extensao === 'dwg' && "bg-blue-650",
                            f.extensao === 'dxf' && "bg-emerald-650",
                            f.extensao === 'pdf' && "bg-red-650",
                            f.extensao === 'stl' && "bg-amber-650",
                            f.extensao === 'cdr' && "bg-indigo-650",
                            f.extensao === 'ai' && "bg-orange-650"
                          )}>
                            .{f.extensao.toUpperCase()}
                          </div>
                          <div className="space-y-0.5">
                            <p className="font-extrabold text-xs text-white uppercase tracking-tight line-clamp-1">{f.nomeArquivo}</p>
                            <span className="text-[9px] text-zinc-500 block">Tamanho: {f.tamanho} // Enviado em {f.dataEnvio}</span>
                            <span className="text-[9px] text-zinc-600 block">Upload por: {f.enviadoPor}</span>
                          </div>
                        </div>

                        <div className="flex gap-1.5 shrink-0">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => alert(`Iniciando download do vetor industrial: ${f.nomeArquivo}`)}
                            className="h-8 w-8 p-0 border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900 cursor-pointer"
                            title="Baixar arquivo técnico"
                          >
                            <Download size={13} />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setFtpFiles(prev => prev.filter(fi => fi.id !== f.id));
                              alert('Seu arquivo foi apagado do FTP Korteck.');
                            }}
                            className="h-8 w-8 p-0 border-transparent text-zinc-500 hover:text-red-400 hover:bg-red-950/20 cursor-pointer"
                            title="Excluir arquivo"
                          >
                            <Trash2 size={13} />
                          </Button>
                        </div>
                      </div>
                    ))}

                    {visibleFTPFiles.length === 0 && (
                      <div className="col-span-full py-16 text-center text-zinc-600 font-bold uppercase text-[10.5px]">
                        Nenhum arquivo anexado a esta O.S., faça a simulação de upload acima.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
          </>
        ) : (
          renderAlternativeView()
        )}
      </Tabs>

      {/* DETAILED CARD SLIDE-OVER MODAL / SIDEBAR FOR COMMERCIAL PIPELINE */}
      <AnimatePresence>
        {selectedItem && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black z-50 backdrop-blur-sm cursor-pointer"
            />
            {/* Slide-over Drawer */}
            <motion.div
              initial={{ x: "100%", opacity: 0.9 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:max-w-[480px] bg-zinc-900 border-l border-transparent shadow-2xl z-50 overflow-y-auto flex flex-col justify-between"
            >
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-transparent pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-purple-500 font-extrabold uppercase font-mono tracking-widest">
                      Dísticos do Cartão // #{selectedItem.id}
                    </span>
                    <h3 className="text-sm font-black text-white uppercase italic tracking-wide">
                      Visualizar & Editar Detalhes
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedItem(null)}
                    className="h-8 w-8 text-zinc-500 hover:text-white hover:bg-zinc-900 rounded-lg cursor-pointer"
                  >
                    <X size={15} />
                  </Button>
                </div>

                {/* Content/Form Fields */}
                <div className="space-y-5 text-left">
                  {/* TÍTULO / CLIENTE */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                      Cliente / Empresa
                    </label>
                    <Input
                      value={selectedItem.title}
                      onChange={(e) => {
                        updateUnifiedItemField(selectedItem.id, 'title', e.target.value);
                        setSelectedItem({ ...selectedItem, title: e.target.value });
                      }}
                      className="bg-black/40 border-transparent text-white h-10 text-xs rounded-xl focus:border-purple-650"
                    />
                  </div>

                  {/* SUBTÍTULO / PROJETO */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                      Projeto / Assunto / Descrição
                    </label>
                    <textarea
                      value={selectedItem.subtitle || ''}
                      onChange={(e) => {
                        updateUnifiedItemField(selectedItem.id, 'subtitle', e.target.value);
                        setSelectedItem({ ...selectedItem, subtitle: e.target.value });
                      }}
                      className="w-full bg-black/40 border-none rounded-xl text-xs h-24 p-3 text-white focus:border-purple-650 outline-none resize-none"
                    />
                  </div>

                  {/* VALOR & SETOR */}
                  <div className="grid grid-cols-2 gap-4">
                    {selectedItem.value !== undefined && (
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                          Valor Estimado (R$)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 font-mono text-[10px]">R$</span>
                          <Input
                            type="number"
                            value={selectedItem.value}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              updateUnifiedItemField(selectedItem.id, 'value', val);
                              setSelectedItem({ ...selectedItem, value: val });
                            }}
                            className="pl-8 bg-black/40 border-transparent text-white h-10 text-xs rounded-xl font-mono focus:border-purple-650"
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                        Setor Alocado
                      </label>
                      <select
                        value={selectedItem.sector}
                        onChange={(e) => {
                          const sec = e.target.value as SectorType;
                          updateUnifiedItemField(selectedItem.id, 'sector', sec);
                          setSelectedItem({ ...selectedItem, sector: sec });
                        }}
                        className="w-full bg-black/40 border-none rounded-xl text-xs h-10 px-3 text-white focus:border-purple-650 outline-none cursor-pointer"
                      >
                        <option value="comunicacao-visual">🖼️ Comunicação Visual</option>
                        <option value="corte-cnc">⚙️ Corte CNC</option>
                        <option value="impressao-digital">🖊️ Impressão Digital</option>
                        <option value="impressao-3d">🧊 Impressão 3D</option>
                      </select>
                    </div>
                  </div>

                  {/* PRAZO & RESPONSÁVEL */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                        Prazo de Entrega
                      </label>
                      <input
                        type="date"
                        value={selectedItem.date}
                        onChange={(e) => {
                          updateUnifiedItemField(selectedItem.id, 'date', e.target.value);
                          setSelectedItem({ ...selectedItem, date: e.target.value });
                        }}
                        className="w-full bg-black/40 border-none rounded-xl text-xs h-10 px-3 text-white focus:border-purple-650 outline-none cursor-pointer [color-scheme:dark]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                        Responsável
                      </label>
                      <select
                        value={selectedItem.teamMember}
                        onChange={(e) => {
                          updateUnifiedItemField(selectedItem.id, 'teamMember', e.target.value);
                          setSelectedItem({ ...selectedItem, teamMember: e.target.value });
                        }}
                        className="w-full bg-black/40 border-none rounded-xl text-xs h-10 px-3 text-white focus:border-purple-650 outline-none cursor-pointer"
                      >
                        {['Gabriel F.', 'Amanda R.', 'Carlos O.', 'Adams Leandro'].map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* ESTÁGIO / STATUS */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                      Estágio / Status Atual no Pipeline
                    </label>
                    <select
                      value={selectedItem.status}
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        updateUnifiedItemStatus(selectedItem.id, newStatus);
                        setSelectedItem({ ...selectedItem, status: newStatus });
                      }}
                      className="w-full bg-black/40 border-none rounded-xl text-xs h-10 px-3 text-white focus:border-purple-650 outline-none cursor-pointer"
                    >
                      {getColumnsForTab().map(statusCol => (
                        <option key={statusCol} value={statusCol}>{statusCol.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>

                  {/* EXTRA INFO */}
                  {selectedItem.extraInfo && (
                    <div className="p-3.5 bg-zinc-950 rounded-xl border-none text-[10.5px] text-zinc-400 space-y-1 leading-relaxed">
                      <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500 block">Nota Adicional / Informações de Origem:</span>
                      <p>{selectedItem.extraInfo}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-transparent bg-black/30 flex gap-3">
                <Button
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 bg-purple-600 hover:bg-purple-500 text-white text-xs font-black uppercase h-11 rounded-xl transition-all cursor-pointer shadow-lg shadow-purple-600/10"
                >
                  <Check size={14} className="mr-1.5" /> Concluído
                </Button>
              </div>
            </motion.div>
          </>
        )}

        {editingAtendimento && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingAtendimento(null)}
              className="fixed inset-0 bg-black z-50 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ x: "100%", opacity: 0.9 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={cn(
                "fixed top-0 right-0 h-full w-full sm:max-w-[480px] border-l shadow-2xl z-50 overflow-y-auto flex flex-col justify-between",
                c("bg-white border-transparent text-zinc-950", "bg-zinc-900 border-l-zinc-900/90 text-white")
              )}
            >
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className={cn("flex items-center justify-between pb-4 border-b", c("border-transparent", "border-transparent"))}>
                  <div className="space-y-1">
                    <span className="text-[10px] text-purple-600 font-extrabold uppercase font-mono tracking-widest">
                      Fila Atendimento // #{editingAtendimento.id}
                    </span>
                    <h3 className={cn("text-base font-black uppercase italic tracking-wide", c("text-zinc-900", "text-white"))}>
                      Editar Atendimento
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingAtendimento(null)}
                    className={cn("h-8 w-8 rounded-lg cursor-pointer", c("text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100", "text-zinc-500 hover:text-white hover:bg-zinc-900 bg-transparent"))}
                  >
                    <X size={15} />
                  </Button>
                </div>

                {/* Form Fields */}
                <div className="space-y-5 text-left">
                  {/* Nome do Lead / Cliente */}
                  <div className="space-y-1.5">
                    <label className={cn("text-[10px] font-black uppercase tracking-wider", c("text-zinc-600", "text-zinc-400"))}>
                      Cliente / Prospecção
                    </label>
                    <Input
                      value={editingAtendimento.cliente}
                      onChange={(e) => setEditingAtendimento({ ...editingAtendimento, cliente: e.target.value })}
                      className={cn("h-10 text-xs rounded-xl focus:border-purple-650", c("bg-zinc-50 border-transparent text-zinc-900", "bg-black/40 border-transparent text-white"))}
                    />
                  </div>

                  {/* Assunto / Necessidade Técnico */}
                  <div className="space-y-1.5">
                    <label className={cn("text-[10px] font-black uppercase tracking-wider", c("text-zinc-600", "text-zinc-400"))}>
                      Assunto Comercial / Necessidade
                    </label>
                    <Input
                      value={editingAtendimento.assunto}
                      onChange={(e) => setEditingAtendimento({ ...editingAtendimento, assunto: e.target.value })}
                      className={cn("h-10 text-xs rounded-xl focus:border-purple-650", c("bg-zinc-50 border-transparent text-zinc-900", "bg-black/40 border-transparent text-white"))}
                    />
                  </div>

                  {/* Contato Info */}
                  <div className="space-y-1.5">
                    <label className={cn("text-[10px] font-black uppercase tracking-wider", c("text-zinc-600", "text-zinc-400"))}>
                      Contato (Telefone / Email)
                    </label>
                    <Input
                      value={editingAtendimento.contato}
                      onChange={(e) => setEditingAtendimento({ ...editingAtendimento, contato: e.target.value })}
                      className={cn("h-10 text-xs rounded-xl focus:border-purple-650", c("bg-zinc-50 border-transparent text-zinc-900", "bg-black/40 border-transparent text-white"))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Setor Especializado */}
                    <div className="space-y-1.5">
                      <label className={cn("text-[10px] font-black uppercase tracking-wider", c("text-zinc-600", "text-zinc-400"))}>Setor Especializado</label>
                      <select
                        value={editingAtendimento.setor}
                        onChange={(e) => setEditingAtendimento({ ...editingAtendimento, setor: e.target.value as SectorType })}
                        className={cn("w-full border rounded-lg text-xs h-10 px-3 outline-none", c("bg-zinc-50 border-transparent text-zinc-900 focus:border-purple-600", "bg-black/40 border-none text-white"))}
                      >
                        <option value="comunicacao-visual">Comunicação Visual</option>
                        <option value="corte-cnc">Corte CNC</option>
                        <option value="impressao-digital">Impressão Digital</option>
                        <option value="impressao-3d">Impressão 3D</option>
                      </select>
                    </div>

                    {/* Meio de Contato */}
                    <div className="space-y-1.5">
                      <label className={cn("text-[10px] font-black uppercase tracking-wider", c("text-zinc-600", "text-zinc-400"))}>Meio de Contato</label>
                      <select
                        value={editingAtendimento.canal}
                        onChange={(e) => setEditingAtendimento({ ...editingAtendimento, canal: e.target.value as any })}
                        className={cn("w-full border rounded-lg text-xs h-10 px-3 outline-none", c("bg-zinc-50 border-transparent text-zinc-900 focus:border-purple-600", "bg-black/40 border-none text-white"))}
                      >
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Telefone">Telefone</option>
                        <option value="E-mail">E-mail</option>
                        <option value="Presencial">Presencial</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Status do Atendimento */}
                    <div className="space-y-1.5">
                      <label className={cn("text-[10px] font-black uppercase tracking-wider", c("text-zinc-600", "text-zinc-400"))}>Status</label>
                      <select
                        value={editingAtendimento.status}
                        onChange={(e) => setEditingAtendimento({ ...editingAtendimento, status: e.target.value as any })}
                        className={cn("w-full border rounded-lg text-xs h-10 px-3 outline-none", c("bg-zinc-50 border-transparent text-zinc-900 focus:border-purple-600", "bg-black/40 border-none text-white"))}
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Retornado">Retornado</option>
                        <option value="Em Proposta">Em Proposta</option>
                        <option value="Finalizado">Finalizado</option>
                      </select>
                    </div>

                    {/* Data do Registro */}
                    <div className="space-y-1.5">
                      <label className={cn("text-[10px] font-black uppercase tracking-wider", c("text-zinc-600", "text-zinc-400"))}>Data</label>
                      <Input
                        value={editingAtendimento.data}
                        onChange={(e) => setEditingAtendimento({ ...editingAtendimento, data: e.target.value })}
                        className={cn("h-10 text-xs rounded-xl focus:border-purple-650", c("bg-zinc-50 border-transparent text-zinc-900", "bg-black/40 border-transparent text-white"))}
                      />
                    </div>
                  </div>

                  {/* Detalhes / Descrição */}
                  <div className="space-y-1.5">
                    <label className={cn("text-[10px] font-black uppercase tracking-wider", c("text-zinc-600", "text-zinc-400"))}>Detalhamento Técnico / Requisitos</label>
                    <textarea
                      value={editingAtendimento.descricao}
                      onChange={(e) => setEditingAtendimento({ ...editingAtendimento, descricao: e.target.value })}
                      className={cn("w-full border rounded-lg text-xs p-3 h-24 outline-none resize-none focus:border-purple-600", c("bg-zinc-50 border-transparent text-zinc-900", "bg-black/40 border-none text-white"))}
                    />
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className={cn("p-6 border-t flex justify-end gap-3", c("bg-zinc-50 border-transparent", "bg-zinc-950 border-transparent"))}>
                <Button
                  variant="outline"
                  onClick={() => setEditingAtendimento(null)}
                  className={cn("text-xs font-black uppercase tracking-wider h-11 px-4 rounded-xl cursor-pointer", c("bg-white border-transparent hover:bg-zinc-100", "border-transparent hover:bg-zinc-900"))}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    // Atualizar na base de state
                    setAtendimentos(prev => prev.map(item => item.id === editingAtendimento.id ? editingAtendimento : item));
                    setEditingAtendimento(null);
                    alert('Atendimento salvo com sucesso!');
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-black uppercase tracking-wider h-11 px-6 rounded-xl cursor-pointer"
                >
                  Salvar Alterações
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
