import React, { useState, useEffect } from 'react';
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
  Maximize2
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
}

interface Orcamento {
  id: string;
  cliente: string;
  valorTotal: number;
  setor: SectorType;
  status: 'Em Elaboração' | 'Enviado' | 'Aprovado' | 'Recusado';
  dataEmissao: string;
  itens: Array<{ nome: string; qtd: number; valorUnit: number }>;
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
}

interface Client {
  id: string;
  nome: string;
  segmento: string;
  canalPreferido: string;
  ltv: number;
  ultimoContato: string;
  setorPrincipal: SectorType;
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
}

interface UnifiedItem {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  date: string;
  hour?: string;
  value?: number;
  sector: SectorType;
  teamMember: string;
  category?: string;
  extraInfo?: string;
}

export function Commercial({ initialTab: propInitialTab }: { initialTab?: string }) {
  const { theme } = useTheme();
  const isLight = theme === 'ash-light';

  // --- CONTROLE DE VISÃO DE ABAS ---
  // Sequência do usuário: Atendimento, Funil Comercial, Projetos, Orçamentos, O.S., Campanhas, Clientes, FTP Arquivos em O.S.
  const [activeTab, setActiveTab] = useState<string>('atendimento');
  
  // --- CONTROLE DE VISÃO CLICKUP (TABELAS, KANBAN, GANTT INTERATIVO, CALENDÁRIO, EQUIPE) ---
  const [viewMode, setViewMode] = useState<'lista' | 'quadro' | 'gantt' | 'calendario' | 'equipe'>('lista');
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

  // --- 1. ESTADO DOS ATENDIMENTOS ---
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([
    { id: 'AT-901', cliente: 'Shopping Center Norte', contato: 'Ana Beatriz (Imprensa)', canal: 'WhatsApp', assunto: 'Renovação de Totem de Entrada Principal', setor: 'comunicacao-visual', status: 'Pendente', data: '2026-06-01', descricao: 'Solicitação de orçamento urgente para retrofit do totem externo com iluminação LED de alta performance e chapa ACM dupla face.' },
    { id: 'AT-902', cliente: 'Metalúrgica Alvorada', contato: 'Marcos Silva (Compras)', canal: 'E-mail', assunto: 'Usinagem CNC de Painéis de Alumínio', setor: 'corte-cnc', status: 'Em Proposta', data: '2026-05-31', descricao: 'Nesting de 23 chapas de alumínio composto para divisórias industriais. Cliente forneceu o arquivo DWG pronto.' },
    { id: 'AT-903', cliente: 'Lojas Americanas', contato: 'Claudio Souza (Expansão)', canal: 'WhatsApp', assunto: 'Adesivação em Massa de PDV Campanha Junina', setor: 'impressao-digital', status: 'Retornado', data: '2026-06-01', descricao: 'Plotagem de adesivos vinílicos foscos para vitrine de 15 lojas na região metropolitana.' },
    { id: 'AT-904', cliente: 'Inovação Arquitetura', contato: 'Juliana Paes', canal: 'Telefone', assunto: 'Letreiros Monobloco Decorativos impressos em 3D', setor: 'impressao-3d', status: 'Finalizado', data: '2026-05-28', descricao: 'Prototipia de caracteres corporativos tridimensionais complexos com filamento PETG fosco e retroiluminação.' },
    { id: 'AT-905', cliente: 'Supermercados Pão de Açúcar', contato: 'Ronaldo Santos', canal: 'Presencial', assunto: 'Sinalização Direcional Interna de Gondolas', setor: 'comunicacao-visual', status: 'Em Proposta', data: '2026-05-30', descricao: 'Fabricação de placas aéreas em PVC de 3mm com impressão digital direta UV.' }
  ]);
  const [newAtendCliente, setNewAtendCliente] = useState('');
  const [newAtendAssunto, setNewAtendAssunto] = useState('');
  const [newAtendSetor, setNewAtendSetor] = useState<SectorType>('comunicacao-visual');
  const [newAtendCanal, setNewAtendCanal] = useState<'WhatsApp' | 'Telefone' | 'E-mail' | 'Presencial'>('WhatsApp');
  const [newAtendDesc, setNewAtendDesc] = useState('');

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

  // --- 2. ESTADO DO FUNIL COMERCIAL ---
  const [deals, setDeals] = useState<Deal[]>([
    { id: 'D-101', cliente: 'Grupo RZK', projeto: 'Fachada ACM Brilhante com LEDs Internos RGB', valor: 14850.00, probabilidade: 60, setor: 'comunicacao-visual', estagio: 'analise', diasInativo: 3, alertas: 1 },
    { id: 'D-102', cliente: 'Everton Robson', projeto: 'Corte de Letras Maciças PVC Expandido 20mm', valor: 4800.00, probabilidade: 80, setor: 'corte-cnc', estagio: 'proposta', diasInativo: 1, alertas: 0 },
    { id: 'D-103', cliente: 'Prefeitura de Itapetininga', projeto: 'Adesivação e Envelopamento de Ambulâncias da Frota', valor: 22000.00, probabilidade: 40, setor: 'impressao-digital', estagio: 'captacao', diasInativo: 5, alertas: 3 },
    { id: 'D-104', cliente: 'Lincoln Electric', projeto: 'Matriz e Gabaritos em Filamento Alto Impacto', valor: 1900.00, probabilidade: 90, setor: 'impressao-3d', estagio: 'ganho', diasInativo: 0, alertas: 0 },
    { id: 'D-105', cliente: 'E3Corp Engenharia', projeto: 'Estruturação de Painéis de Divisas Metálicos', valor: 31200.00, probabilidade: 70, setor: 'corte-cnc', estagio: 'followup', diasInativo: 2, alertas: 1 },
    { id: 'D-106', cliente: 'Arquiteto Bruno', projeto: 'Protetor Luminoso em Acrílico de Dupla Curvatura', valor: 3500.00, probabilidade: 95, setor: 'impressao-3d', estagio: 'proposta', diasInativo: 1, alertas: 0 },
    { id: 'D-107', cliente: 'Piimo Arquitetura', projeto: 'Lonas Frontlight com Acabamento em Ganchos', valor: 8900.00, probabilidade: 50, setor: 'impressao-digital', estagio: 'contato', diasInativo: 4, alertas: 0 }
  ]);

  const moveDeal = (id: string, novoEstagio: Deal['estagio']) => {
    setDeals(prevDeals => 
      prevDeals.map(d => d.id === id ? { ...d, estagio: novoEstagio } : d)
    );
  };

  // --- 3. ESTADO DOS PROJETOS COMERCIAIS ---
  const [projetos, setProjetos] = useState<ProjetoBrief[]>([
    { id: 'PROJ-601', titulo: 'Retrofit Fachada ACM Premium', cliente: 'Shopping Center Norte', setor: 'comunicacao-visual', designer: 'Gabriel F.', status: 'Briefing', prazo: '15-06-2026', dimensoes: '12.4 x 3.2 m', materialPrincipal: 'Bandejas ACM 4mm, Estrutura Aço Metalon' },
    { id: 'PROJ-602', titulo: 'Nesting de Divisórias Acústicas', cliente: 'Metalúrgica Alvorada', setor: 'corte-cnc', designer: 'Amanda R.', status: 'Em Vetorização', prazo: '10-06-2026', dimensoes: '2.44 x 1.22 m (18 Placas)', materialPrincipal: 'Acrílico Cristal 8mm' },
    { id: 'PROJ-603', titulo: 'Impressão de Painel Backlight UV', cliente: 'Lojas Americanas', setor: 'impressao-digital', designer: 'Gabriel F.', status: 'Aprovado Pelo Cliente', prazo: '08-06-2026', dimensoes: '6.00 x 2.00 m', materialPrincipal: 'Lona Translúcida 440g' },
    { id: 'PROJ-604', titulo: 'Letras Monobloco com Vedação', cliente: 'Inovação Arquitetura', setor: 'impressao-3d', designer: 'Carlos O.', status: 'Ajuste Solicitado', prazo: '18-06-2026', dimensoes: 'Altura Caracteres: 45 cm', materialPrincipal: 'PLA Carbono e Base em PVC' }
  ]);
  const [newProjTitulo, setNewProjTitulo] = useState('');
  const [newProjCliente, setNewProjCliente] = useState('');
  const [newProjSetor, setNewProjSetor] = useState<SectorType>('comunicacao-visual');
  const [newProjDimensoes, setNewProjDimensoes] = useState('');

  const handleAddProjeto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitulo || !newProjCliente) {
      alert('Por favor, informe o título e o cliente para o projeto.');
      return;
    }
    const novo: ProjetoBrief = {
      id: `PROJ-${Math.floor(605 + Math.random() * 100)}`,
      titulo: newProjTitulo,
      cliente: newProjCliente,
      setor: newProjSetor,
      designer: 'Ana Karolina (Design Korteck)',
      status: 'Briefing',
      prazo: 'Em definição comercial',
      dimensoes: newProjDimensoes || 'Sob medição no local',
      materialPrincipal: 'A definir operacionalmente'
    };
    setProjetos([novo, ...projetos]);
    setNewProjTitulo('');
    setNewProjCliente('');
    setNewProjDimensoes('');
    alert('Briefing de arquivo técnico de projeto registrado com sucesso no CRM!');
  };

  // --- 4. ESTADO DOS ORÇAMENTOS ---
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([
    { id: 'ORC-2201', cliente: 'Grupo RZK', valorTotal: 14850.00, setor: 'comunicacao-visual', status: 'Aprovado', dataEmissao: '2026-05-25', itens: [{ nome: 'Fachada ACM Estrutura inclusa Galvanizada', qtd: 1, valorUnit: 11000 }, { nome: 'Módulos LED RGB Alta Potência', qtd: 70, valorUnit: 55 }] },
    { id: 'ORC-2202', cliente: 'Everton Robson', valorTotal: 4805.00, setor: 'corte-cnc', status: 'Enviado', dataEmissao: '2026-05-28', itens: [{ nome: 'Fresagem Letras PVC Expandido 20mm', qtd: 45, valorUnit: 85 }, { nome: 'Insumo PVC Sobra Placa Nesting', qtd: 2, valorUnit: 490 }] },
    { id: 'ORC-2203', cliente: 'Prefeitura de Itapetininga', valorTotal: 22000.00, setor: 'impressao-digital', status: 'Em Elaboração', dataEmissao: '2026-06-01', itens: [{ nome: 'Envelopamento Completo Ambulância Película Calandrada', qtd: 4, valorUnit: 5500 }] },
    { id: 'ORC-2204', cliente: 'Lincoln Electric', valorTotal: 1900.00, setor: 'impressao-3d', status: 'Aprovado', dataEmissao: '2026-05-15', itens: [{ nome: 'Impressão 3D PETG Peças de Desgaste Engrenagem', qtd: 10, valorUnit: 190 }] }
  ]);
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
  const [ordensServico, setOrdensServico] = useState<OSOrd[]>([
    { id: 'OS-401', numeroOS: 'OS-2026-8091', orcamentoId: 'ORC-2201', cliente: 'Grupo RZK', titulo: 'Fachada ACM Iluminada', setor: 'comunicacao-visual', status: 'Producao', dataEntrega: '2026-06-12' },
    { id: 'OS-402', numeroOS: 'OS-2026-8092', orcamentoId: 'ORC-2204', cliente: 'Lincoln Electric', titulo: 'Engrenagens PETG Tridimensional', setor: 'impressao-3d', status: 'Aguardando Arquivos', dataEntrega: '2026-06-05' },
    { id: 'OS-403', numeroOS: 'OS-2026-8093', orcamentoId: 'ORC-2202', cliente: 'Everton Robson', titulo: 'Letras PVC CNC Corte', setor: 'corte-cnc', status: 'Preparacao', dataEntrega: '2026-06-10' },
    { id: 'OS-404', numeroOS: 'OS-2026-8094', orcamentoId: 'ORC-2203', cliente: 'Pref. Itapetininga', titulo: 'Envelopamento de Ambulância', setor: 'impressao-digital', status: 'Producao', dataEntrega: '2026-06-15' }
  ]);

  const updateOSStatus = (id: string, novoStatus: OSOrd['status']) => {
    setOrdensServico(prev => prev.map(os => os.id === id ? { ...os, status: novoStatus } : os));
  };

  // --- 6. ESTADO DAS CAMPANHAS ---
  const [campanhas, setCampanhas] = useState<Campanha[]>([
    { id: 'CAMP-01', nome: 'Campanha Retrofit ACM 2026', setor: 'comunicacao-visual', investimento: 3500.00, leadsGerados: 48, conversao: 15, status: 'Ativa', roi: 4.2 },
    { id: 'CAMP-02', nome: 'Nesting Promocional de Chapas em Router', setor: 'corte-cnc', investimento: 1800.00, leadsGerados: 32, conversao: 22, status: 'Ativa', roi: 5.6 },
    { id: 'CAMP-03', nome: 'Envelopamento Corporativo UV de Frotas', setor: 'impressao-digital', investimento: 4200.00, leadsGerados: 25, conversao: 10, status: 'Pausada', roi: 3.1 },
    { id: 'CAMP-04', nome: 'Letras Monobloco em Filamento de Alta Fusão', setor: 'impressao-3d', investimento: 1200.00, leadsGerados: 18, conversao: 28, status: 'Ativa', roi: 6.2 }
  ]);
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
  const [clientes, setClientes] = useState<Client[]>([
    { id: 'CLI-01', nome: 'Shopping Center Norte', segmento: 'Shopping e Varejo de Rede', canalPreferido: 'WhatsApp Corporativo', ltv: 125000.00, ultimoContato: '2026-06-01', setorPrincipal: 'comunicacao-visual' },
    { id: 'CLI-02', nome: 'Metalúrgica Alvorada', segmento: 'Sub-Usinagem e Estruturas Metálicas', canalPreferido: 'E-mail Comercial', ltv: 38200.00, ultimoContato: '2026-05-31', setorPrincipal: 'corte-cnc' },
    { id: 'CLI-03', nome: 'Lojas Americanas S/A', segmento: 'Supermercados e Grande Varejo', canalPreferido: 'WhatsApp Corporativo', ltv: 89600.00, ultimoContato: '2026-06-01', setorPrincipal: 'impressao-digital' },
    { id: 'CLI-04', nome: 'Inovação Arquitetura & Interiores', segmento: 'Escritórios de Arquitetura de Luxo', canalPreferido: 'Ligação Telefônica', ltv: 15400.00, ultimoContato: '2026-05-28', setorPrincipal: 'impressao-3d' },
    { id: 'CLI-05', nome: 'Lincoln Electric Tecnologia', segmento: 'Indústria Pesada e Soldagem', canalPreferido: 'E-mail Comercial', ltv: 21000.00, ultimoContato: '2026-05-15', setorPrincipal: 'impressao-3d' }
  ]);
  const [searchClientQuery, setSearchClientQuery] = useState('');

  // --- 8. ESTADO DOS ARQUIVOS FTP POR ORDEM DE SERVIÇO ---
  const [ftpFiles, setFtpFiles] = useState<FTPFile[]>([
    { id: 'F-1', osId: 'OS-401', nomeArquivo: 'fachada-rzk-painel-esquema-v3.dwg', tamanho: '4.8 MB', extensao: 'dwg', setor: 'comunicacao-visual', enviadoPor: 'Adams Leandro (Comercial)', dataEnvio: '2026-05-30' },
    { id: 'F-2', osId: 'OS-401', nomeArquivo: 'detalhamento-solda-estrutura.pdf', tamanho: '1.2 MB', extensao: 'pdf', setor: 'comunicacao-visual', enviadoPor: 'Carlos M. (Projetista)', dataEnvio: '2026-05-31' },
    { id: 'F-3', osId: 'OS-402', nomeArquivo: 'engrenagem-cura-modelo-petg.stl', tamanho: '18.4 MB', extensao: 'stl', setor: 'impressao-3d', enviadoPor: 'Cliente Lincoln', dataEnvio: '2026-05-29' },
    { id: 'F-4', osId: 'OS-403', nomeArquivo: 'letras_pvc_espandido_fresa_6mm.dxf', tamanho: '950 KB', extensao: 'dxf', setor: 'corte-cnc', enviadoPor: 'Everton R. (Vendedor)', dataEnvio: '2026-06-01' },
    { id: 'F-5', osId: 'OS-404', nomeArquivo: 'ambulancia_lateral_vetor.pdf', tamanho: '12.5 MB', extensao: 'pdf', setor: 'impressao-digital', enviadoPor: 'Pedro A. (Mkt)', dataEnvio: '2026-05-28' }
  ]);
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
    const matchesSearch = c.nome.toLowerCase().includes(searchClientQuery.toLowerCase()) || 
                          c.segmento.toLowerCase().includes(searchClientQuery.toLowerCase());
    return matchesSetor && matchesSearch;
  });
  const visibleFTPFiles = ftpFiles.filter(f => {
    const matchesSetor = selectedSector === 'all' || f.setor === selectedSector;
    const matchesOS = f.osId === selectedOSForFTP;
    return matchesSetor && matchesOS;
  });

  // --- HELPER DE MAPEAMENTO UNIFICADO PARA AS VISUALIZAÇÕES TIPO CLICKUP ---
  const getUnifiedItems = (): UnifiedItem[] => {
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
          teamMember: item.contato.includes('Ana') ? 'Gabriel F.' : item.contato.includes('Marcos') ? 'Amanda R.' : item.contato.includes('Claudio') ? 'Carlos O.' : 'Adams Leandro',
          extraInfo: item.descricao,
          value: 0
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
          date: new Date().toISOString().split('T')[0],
          hour: `${8 + (index * 1.5)}:00`,
          sector: item.setor,
          teamMember: 'Adams Leandro',
          value: item.valor
        }));
      case 'projetos':
        return visibleProjetos.map((item, index) => {
          let d = item.prazo;
          if (d.includes('-')) {
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
            extraInfo: item.materialPrincipal
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
          teamMember: 'Adams Leandro'
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
          teamMember: 'Amanda R.'
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
          teamMember: 'Adams Leandro'
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
          teamMember: 'Adams Leandro'
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
          teamMember: item.enviadoPor
        }));
      default:
        return [];
    }
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

  const renderViewsBar = () => {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0c0c0f] border border-zinc-850 p-3 rounded-xl text-xs font-semibold shadow-inner mt-4">
        <div className="flex flex-wrap items-center gap-1.5 animate-in slide-in-from-left duration-500">
          <button 
            type="button"
            onClick={() => alert('Opção para adicionar novos canais de comunicação com o cliente')}
            className="flex items-center gap-1 px-3 h-9 rounded-lg text-zinc-400 bg-zinc-900/60 hover:text-white border border-zinc-800 transition-all text-[11px] font-black uppercase tracking-wider cursor-pointer"
          >
            <Plus size={11} className="text-purple-500" /> Adicionar canal
          </button>
          
          <div className="h-4 w-px bg-zinc-800 mx-1.5" />

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
                "flex items-center gap-1.5 px-3.5 h-9 rounded-lg transition-all text-[11px] font-black uppercase tracking-wider border cursor-pointer",
                viewMode === m.id
                  ? "bg-purple-950/40 text-purple-400 border-purple-550/25 shadow-md animate-pulse"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/40 border-transparent"
              )}
            >
              {m.label}
            </button>
          ))}
        </div>

        <button 
          type="button"
          onClick={() => alert('Personalização das colunas e filtros avançados de exibição')}
          className="flex items-center gap-1 px-3 h-9 rounded-lg text-zinc-400 hover:text-white transition-all text-[11px] font-black uppercase tracking-wider cursor-pointer"
        >
          + Visualização
        </button>
      </div>
    );
  };

  const renderAlternativeView = () => {
    const items = getUnifiedItems();
    const columns = getColumnsForTab();

    switch (viewMode) {
      case 'quadro': {
        return (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Header / Meta info */}
            <div className="bg-[#0b0b0e] border border-zinc-900 p-4 rounded-xl flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-purple-400 font-black uppercase tracking-wider font-mono">
                  Visualização em Quadro / Kanban do Processo Ativo
                </span>
                <p className="text-xs text-zinc-500 font-mono">Mapeamento dinâmico de status: {columns.join(' → ')}</p>
              </div>
              <Badge className="bg-purple-950/40 text-purple-400 border border-purple-900/35 font-mono text-[9px] px-2.5 py-1">
                {items.length} ITENS NO PIPELINE
              </Badge>
            </div>

            {/* Kanban Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 overflow-x-auto pb-4">
              {columns.map((col) => {
                const colItems = items.filter(it => {
                  if (activeTab === 'clientes') {
                    return it.sector === col;
                  }
                  if (activeTab === 'ftp-arquivos') {
                    return it.status === col;
                  }
                  return it.status === col;
                });

                return (
                  <div key={col} className="min-w-[260px] bg-[#0c0c0f]/80 border border-zinc-900/80 rounded-xl p-3.5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                        <span className="text-[10px] font-black uppercase text-zinc-350 truncate tracking-wider">
                          {activeTab === 'clientes' ? getSetorLabel(col as SectorType).split(' ')[0] : col}
                        </span>
                        <Badge className="bg-zinc-90 w-fit text-zinc-400 text-[10px] font-mono">{colItems.length}</Badge>
                      </div>

                      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                        {colItems.map((it) => (
                          <Card key={it.id} className="bg-black/60 border-zinc-900 hover:border-purple-500/30 transition-all shadow-sm">
                            <CardContent className="p-3.5 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[9px] text-zinc-500 font-mono font-bold">{it.id}</span>
                                <Badge className={cn("text-[7.5px] px-1.5 py-0.5 border-0 font-black uppercase", getSetorColor(it.sector))}>
                                  {getSetorLabel(it.sector).split(' ')[0]}
                                </Badge>
                              </div>

                              <div className="space-y-1">
                                <h4 className="text-xs font-black text-white uppercase tracking-tight line-clamp-1">{it.title}</h4>
                                <p className="text-[10px] text-zinc-500 leading-snug line-clamp-2">{it.subtitle}</p>
                              </div>

                              {it.value ? (
                                <div className="text-[10px] font-mono font-black text-purple-400 border-t border-zinc-900 pt-2 flex items-center justify-between">
                                  <span>VALOR:</span>
                                  <span>R$ {it.value.toLocaleString('pt-BR')}</span>
                                </div>
                              ) : null}

                              {/* Quick Move Trigger for Kanban */}
                              {(activeTab !== 'clientes' && activeTab !== 'ftp-arquivos') && (
                                <div className="flex justify-end gap-1 pt-2 border-t border-zinc-900/60">
                                  <select 
                                    value={it.status}
                                    onChange={(e) => updateUnifiedItemStatus(it.id, e.target.value)}
                                    className="bg-zinc-900 text-zinc-400 text-[8.5px] font-black rounded px-1.5 py-1 border border-zinc-800 focus:outline-none cursor-pointer"
                                  >
                                    {columns.map(statusCol => (
                                      <option key={statusCol} value={statusCol}>{statusCol}</option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}

                        {colItems.length === 0 && (
                          <div className="border border-dashed border-zinc-900/30 rounded-xl py-10 text-center text-zinc-850 text-[9px] uppercase font-black">
                            Vazio
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

      case 'gantt': {
        return (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* ClickUp-style Gantt top bar */}
            <div className="bg-[#0b0b0e] border border-zinc-900 p-3 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
              <div className="flex flex-wrap items-center gap-2">
                <button 
                  type="button"
                  onClick={() => setCurrentTime(new Date())}
                  className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-purple-400 font-extrabold rounded-lg text-[10px] tracking-wider uppercase hover:text-white hover:bg-zinc-800 cursor-pointer"
                >
                  Hoje
                </button>
                <button type="button" className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-500 font-extrabold rounded-lg text-[10px] uppercase">
                  Dia
                </button>
                <button type="button" className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-500 font-extrabold rounded-lg text-[10px] uppercase">
                  Ajuste Automático
                </button>
                <button 
                  type="button"
                  onClick={() => alert('Exportando cronograma industrial de Gantt para PDF...')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-850 text-zinc-400 font-extrabold rounded-lg text-[10px] uppercase hover:text-white cursor-pointer"
                >
                  <Download size={11} /> Exportar
                </button>
              </div>

              {/* Stack of team members */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['NK', 'GB', 'AM', 'AL'].map((init, i) => (
                    <div 
                      key={init} 
                      className={cn(
                        "w-6.5 h-6.5 rounded-full border border-zinc-950 flex items-center justify-center text-[9px] font-black font-mono uppercase shadow-sm",
                        i === 0 && "bg-purple-600 text-white",
                        i === 1 && "bg-indigo-600 text-white",
                        i === 2 && "bg-emerald-600 text-white",
                        i === 3 && "bg-amber-600 text-white"
                      )}
                      title={`Profissional: ${init}`}
                    >
                      {init}
                    </div>
                  ))}
                </div>
                <button 
                  type="button"
                  onClick={() => {
                    const taskName = prompt('Digite o nome do novo processo de comunicação visual a agendar:');
                    if (taskName) {
                      alert(`Processo "${taskName}" colocado na fila de Gantt com sucesso!`);
                    }
                  }}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-lg text-[10px] uppercase tracking-wider cursor-pointer"
                >
                  + Processo
                </button>
              </div>
            </div>

            {/* Gantt Timeline Grid */}
            <div className="border border-zinc-900 bg-[#07070a] rounded-xl overflow-x-auto shadow-2xl">
              <div className="min-w-[850px]">
                {/* Grid Header containing Hours representation */}
                <div className="grid grid-cols-12 border-b border-zinc-900">
                  {/* Left Header label */}
                  <div className="col-span-4 p-3.5 border-r border-zinc-900 text-[10px] font-black uppercase text-zinc-500 tracking-wider">
                    Processo / Tarefa Ativa ({activeTab.toUpperCase()})
                  </div>
                  {/* Right Hours list */}
                  <div 
                    className="col-span-8 grid p-3.5 relative bg-zinc-950/60 font-mono text-[9px] font-black text-zinc-405 text-center"
                    style={{ gridTemplateColumns: 'repeat(17, minmax(0, 1fr))' }}
                  >
                    {ganttHours.map((hObj) => (
                      <div key={hObj.label} className="truncate">
                        {hObj.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grid rows list */}
                <div className="divide-y divide-zinc-900/80 min-h-[350px] relative">
                  {/* REAL-TIME VERTICAL INDICATOR LINE (TRACKS REAL LOCAL TIME VISUALLY) */}
                  {(() => {
                    const leftPercentage = getGanttLineLeft();
                    const h = currentTime.getHours().toString().padStart(2, '0');
                    const m = currentTime.getMinutes().toString().padStart(2, '0');
                    
                    return (
                      <div 
                        className="absolute top-0 bottom-0 pointer-events-none transition-all duration-1000 z-30"
                        style={{ 
                          left: `calc(33.333% + (66.666% * ${leftPercentage / 100}))`,
                          transform: 'translateX(-50%)'
                        }}
                      >
                        {/* Top circular marker */}
                        <div className="w-3 w-3 h-3 h-3 rounded-full bg-red-500 border border-white absolute -top-1.5 left-1/2 -translate-x-1/2 flex items-center justify-center shadow-lg shadow-red-500/50">
                          <span className="w-1 h-1 rounded-full bg-white animate-ping" />
                        </div>
                        
                        {/* Red string line */}
                        <div className="h-full border-l-2 border-red-500 shadow-md relative">
                          {/* Live time floating label */}
                          <div className="absolute top-10 left-3 bg-red-600 text-white font-mono text-[8.5px] font-black px-2 py-1 rounded shadow-lg flex items-center gap-1.5 shrink-0 whitespace-nowrap z-50">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-100"></span>
                            </span>
                            <span>{h}:{m}</span>
                          </div>
                        </div>
                        
                        {/* Bottom circular marker */}
                        <div className="w-2 h-2 rounded-full bg-red-500 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                      </div>
                    );
                  })()}

                  {/* Rows listing */}
                  {items.map((it) => {
                    // Gantt positioning calculations
                    const taskStart = parseTaskHour(it.hour);
                    const taskDuration = 1.8; // default duration of 1.8 hours
                    const startPercent = Math.max(0, Math.min(100, ((taskStart - 2) / 16) * 100));
                    const widthPercent = Math.max(6, Math.min(100 - startPercent, (taskDuration / 16) * 100));

                    return (
                      <div key={it.id} className="grid grid-cols-12 hover:bg-zinc-900/5 transition-colors items-center">
                        {/* Task info column */}
                        <div className="col-span-4 p-3 border-r border-zinc-900 flex items-center justify-between gap-3">
                          <div className="space-y-0.5 truncate max-w-[85%]">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-mono font-black text-purple-400">#{it.id}</span>
                              <span className="text-[8.5px] font-bold uppercase tracking-tight text-zinc-500">{it.status}</span>
                            </div>
                            <p className="text-xs font-black text-white uppercase italic tracking-tight truncate">{it.title}</p>
                            <p className="text-[10px] text-zinc-500 uppercase truncate leading-tight">{it.subtitle}</p>
                          </div>
                          <Badge className={cn("text-[7.5px] px-1.5 border-0 font-sans tracking-wide shrink-0", getSetorColor(it.sector))}>
                            {getSetorLabel(it.sector).split(' ')[0]}
                          </Badge>
                        </div>

                        {/* Timeline bar slot */}
                        <div className="col-span-8 p-3 relative bg-zinc-950/15 flex items-center select-none h-14">
                          {/* Background timeline markers */}
                          <div 
                            className="absolute inset-0 grid pointer-events-none divide-x divide-zinc-900/20"
                            style={{ gridTemplateColumns: 'repeat(17, minmax(0, 1fr))' }}
                          >
                            {Array.from({ length: 17 }).map((_, i) => (
                              <div key={i} />
                            ))}
                          </div>

                          {/* Visual Timeline Bar block */}
                          <div 
                            className="absolute h-9 rounded-lg flex items-center px-3.5 group cursor-pointer border shadow-md hover:scale-[1.012] hover:shadow-lg transition-all duration-200"
                            style={{
                              left: `${startPercent}%`,
                              width: `${widthPercent}%`,
                              background: getGanttBarColor(it.sector),
                              borderColor: getGanttBarBorder(it.sector)
                            }}
                            title={`Tarefa Korteck: ${it.title} (${it.hour} - ${(taskStart + taskDuration).toFixed(1)}h)`}
                          >
                            <div className="flex items-center justify-between w-full text-white font-sans text-[10px] font-black truncate">
                              <span className="truncate">{it.title}</span>
                              <span className="font-mono text-[8px] bg-black/65 px-1 py-0.5 rounded text-zinc-300 ml-1.5 shrink-0">
                                {it.hour}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {items.length === 0 && (
                    <div className="py-24 text-center text-zinc-650 font-black uppercase text-[10px]">
                      Nenhum processo agendado para o setor e data atual.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'calendario': {
        // Simple June 2026 Monthly calendar (30 days, starting on Monday)
        const daysInJune = 30;
        const daysArray = Array.from({ length: daysInJune }, (_, i) => i + 1);

        return (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="bg-[#0b0b0e] border border-zinc-905 p-4 rounded-xl flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-purple-400 font-black uppercase tracking-wider">
                  Calendário Mensal de Entregas e Atendimento
                </span>
                <h3 className="text-sm font-black text-white italic uppercase">Junho 2026</h3>
              </div>
              <Badge className="bg-purple-950/45 text-purple-300 font-black border border-purple-900/30 font-mono text-[9.5px]">
                ERP OPERATIONAL CALENDAR
              </Badge>
            </div>

            {/* Calendar Grid */}
            <div className="bg-[#0b0b0e]/95 border border-zinc-900 rounded-xl overflow-hidden">
              <div className="grid grid-cols-7 bg-zinc-950 border-b border-zinc-900 text-center text-[10px] font-black uppercase text-zinc-400 p-2.5">
                <div>Seg</div>
                <div>Ter</div>
                <div>Qua</div>
                <div>Qui</div>
                <div>Sex</div>
                <div className="text-zinc-550">Sáb</div>
                <div className="text-zinc-550">Dom</div>
              </div>

              <div className="grid grid-cols-7 divide-x divide-y divide-zinc-900 text-xs min-h-[450px]">
                {daysArray.map((dayNum) => {
                  const dayStr = `2026-06-${dayNum.toString().padStart(2, '0')}`;
                  const dayItems = items.filter(it => it.date === dayStr);

                  return (
                    <div key={dayNum} className="p-2 bg-zinc-950/15 min-h-[90px] flex flex-col justify-between hover:bg-zinc-900/5 transition-colors">
                      <span className="font-mono font-black text-zinc-550 text-[11px]">
                        {dayNum}
                      </span>
                      
                      <div className="space-y-1 mt-1 overflow-y-auto max-h-[70px]">
                        {dayItems.map(it => (
                          <div 
                            key={it.id} 
                            onClick={() => alert(`Detalhes do Item #${it.id}:\nCliente: ${it.title}\nStatus: ${it.status}\nHorário sugerido: ${it.hour || 'A definir'}`)}
                            className="p-1 rounded text-[8px] font-black uppercase tracking-tight truncate border cursor-pointer hover:brightness-125 transition-all text-white"
                            style={{
                              background: getGanttBarColor(it.sector),
                              borderColor: getGanttBarBorder(it.sector)
                            }}
                          >
                            <span className="font-mono text-[7px] text-zinc-100 mr-0.5">#{it.id.split('-')[1] || it.id}</span>
                            {it.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
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
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="bg-[#0b0b0e] border border-zinc-900 p-4 rounded-xl flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-purple-400 font-black uppercase tracking-wider">
                  Distribuição de Carga de Trabalho por Profissional (MES / Comercial)
                </span>
                <p className="text-xs text-zinc-500 font-sans">Visualização instantânea de quem está encarregado por cada processo</p>
              </div>
              <Badge className="bg-[#0c0c0f] border border-zinc-800 text-emerald-400 font-mono font-black text-[9.5px]">
                4 MEMBROS ATIVOS
              </Badge>
            </div>

            {/* Columns of team members */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {teamMembers.map((member) => {
                const memberItems = items.filter(it => it.teamMember === member);

                return (
                  <div key={member} className="bg-zinc-950/20 border border-zinc-900 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2 border-b border-zinc-900 pb-2 justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center text-[9px] font-black uppercase border border-purple-500/10">
                          {member.charAt(0)}
                        </div>
                        <span className="text-xs font-black uppercase text-zinc-200">{member}</span>
                      </div>
                      <Badge className="bg-zinc-900 text-zinc-400 text-[10px] font-mono">{memberItems.length}</Badge>
                    </div>

                    <div className="space-y-3">
                      {memberItems.map(it => (
                        <Card key={it.id} className="bg-[#0b0b0e] border-zinc-900">
                          <CardContent className="p-3.5 space-y-2">
                            <div className="flex justify-between items-center text-[9px]">
                              <span className="text-purple-405 font-mono font-bold">#{it.id}</span>
                              <Badge className={cn("text-[7.5px] border-0 uppercase px-2 py-0.5", getSetorColor(it.sector))}>
                                {getSetorLabel(it.sector).split(' ')[0]}
                              </Badge>
                            </div>
                            <h4 className="text-xs font-black text-white uppercase italic tracking-tight">{it.title}</h4>
                            <p className="text-[10px] text-zinc-500 leading-snug line-clamp-2">{it.subtitle}</p>
                            
                            <div className="text-[9px] text-zinc-650 font-mono font-semibold pt-2 border-t border-zinc-900 mt-2">
                              Status: <strong className="text-zinc-400">{it.status}</strong>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      {memberItems.length === 0 && (
                        <div className="border border-dashed border-zinc-900/40 rounded-xl py-12 text-center text-zinc-700 text-[9px] font-bold uppercase tracking-wide">
                          Fila livre para {member}
                        </div>
                      )}
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
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-700 max-w-[1650px] mx-auto pb-24">
      
      {/* 1. MESH HEADER COMERCIAL */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-600/10 rounded-xl border border-purple-500/20">
              <Target size={28} className="text-purple-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black tracking-[0.5em] text-zinc-500 uppercase">KORTECK FLOW MÓDULO ERP BI-DIRECIONAL</span>
              <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                Gestão <span className="text-purple-600">Comercial</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Métricas rápidas da Diretoria */}
        <div className="flex flex-wrap items-center gap-6 bg-zinc-950/40 p-4 rounded-2xl border border-zinc-800/60">
          <div className="text-left">
            <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-1">TOTAL PIPELINE</p>
            <p className="text-xl font-black text-white italic tracking-tighter">
              R$ {deals.reduce((acc, d) => acc + d.valor, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="h-8 w-px bg-zinc-800" />
          <div className="text-left">
            <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-1">ATENDIMENTOS PENDENTES</p>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <p className="text-xl font-black text-white italic tracking-tighter">{atendimentos.filter(a => a.status === 'Pendente').length} NOVOS</p>
            </div>
          </div>
          <div className="h-8 w-px bg-zinc-800" />
          <div className="text-left">
            <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-1">O.S. EM PRODUÇÃO</p>
            <p className="text-xl font-black text-purple-400 italic tracking-tighter">{ordensServico.filter(o => o.status === 'Producao').length} ATIVAS</p>
          </div>
        </div>
      </div>

      {/* 2. BARRA DE SELEÇÃO DE SETORES INDUSTRIAL */}
      <div className="bg-[#0b0b0e] border border-zinc-800/80 p-4 rounded-2xl space-y-3">
        <div className="flex items-center gap-2 text-zinc-400">
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
                : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800"
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
                : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-indigo-400"
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
                : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-emerald-400"
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
                : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-pink-400"
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
                : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-amber-400"
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
            { id: 'ordem-servicos', label: '5. Ordem de Serviços', count: ordensServico.length },
            { id: 'campanhas', label: '6. Campanhas', count: campanhas.length },
            { id: 'clientes', label: '7. Clientes', count: clientes.length },
            { id: 'ftp-arquivos', label: '8. FTP Arquivos em O.S.', count: ftpFiles.length }
          ].map((tab, i) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-zinc-400 bg-zinc-900/40 hover:bg-zinc-800/60 border border-zinc-800/80 data-[state=active]:border-purple-500 text-xs font-black uppercase h-11 px-4.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>{tab.label}</span>
              <span className="text-[10px] bg-black/45 px-1.5 py-0.5 rounded-full font-mono text-zinc-300 border border-white/5">{tab.count}</span>
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
              <Card className="bg-[#0b0b0e] border-zinc-800/90 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-sm font-black uppercase tracking-widest text-[#a855f7]">Novo Atendimento</CardTitle>
                  <CardDescription className="text-xs text-zinc-500">Mapeamento inicial de chamados de clientes do varejo e corporativo</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddAtendimento} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Nome do Lead / Cliente</label>
                      <Input
                        value={newAtendCliente}
                        onChange={(e) => setNewAtendCliente(e.target.value)}
                        placeholder="Ex: McDonald's Brasil"
                        className="bg-black/40 border-zinc-800 text-white h-11 text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Assunto / Necessidade Técnico</label>
                      <Input
                        value={newAtendAssunto}
                        onChange={(e) => setNewAtendAssunto(e.target.value)}
                        placeholder="Ex: Retrofit de Painel Luminoso"
                        className="bg-black/40 border-zinc-800 text-white h-11 text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Setor Especializado</label>
                        <select
                          value={newAtendSetor}
                          onChange={(e) => setNewAtendSetor(e.target.value as SectorType)}
                          className="w-full bg-black/40 border border-zinc-800 rounded-lg text-xs h-11 px-3 text-white outline-none"
                        >
                          <option value="comunicacao-visual">Comunicação Visual</option>
                          <option value="corte-cnc">Corte CNC</option>
                          <option value="impressao-digital">Impressão Digital</option>
                          <option value="impressao-3d">Impressão 3D</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Meio de Contato</label>
                        <select
                          value={newAtendCanal}
                          onChange={(e) => setNewAtendCanal(e.target.value as any)}
                          className="w-full bg-black/40 border border-zinc-800 rounded-lg text-xs h-11 px-3 text-white outline-none"
                        >
                          <option value="WhatsApp">WhatsApp</option>
                          <option value="Telefone">Telefone</option>
                          <option value="E-mail">E-mail</option>
                          <option value="Presencial">Presencial</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Detalhamento dos Requisitos</label>
                      <textarea
                        value={newAtendDesc}
                        onChange={(e) => setNewAtendDesc(e.target.value)}
                        placeholder="Especifique dimensões, materiais, se tem arquivo pronto..."
                        className="w-full bg-black/40 border border-zinc-800 rounded-lg text-xs p-3 h-24 text-white outline-none focus:border-purple-650"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white h-11 font-black text-xs uppercase uppercase tracking-wider cursor-pointer">
                      Cadastrar Atendimento
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Direita: Tabela ou Lista de Atendimentos */}
            <div className="lg:col-span-8">
              <Card className="bg-[#0b0b0e] border-zinc-800/90 shadow-2xl h-full">
                <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-900 pb-4">
                  <div>
                    <CardTitle className="text-sm font-black uppercase">Fila de Atendimento Geral</CardTitle>
                    <CardDescription className="text-xs text-zinc-500">Acompanhamento em tempo real da carteira industrial</CardDescription>
                  </div>
                  <Badge variant="outline" className="border-purple-500/20 text-purple-400 text-[10px] font-mono">
                    {visibleAtendimentos.length} ATENDIMENTOS FILTRADOS
                  </Badge>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans text-xs">
                      <thead>
                        <tr className="bg-zinc-950/40 text-zinc-500 border-b border-zinc-900 text-[9.5px] font-black uppercase">
                          <th className="p-4 pl-6">Código / Data</th>
                          <th className="p-4">Cliente / Contato</th>
                          <th className="p-4">Assunto Comercial</th>
                          <th className="p-4">Setor Destino</th>
                          <th className="p-4 text-center">Status</th>
                          <th className="p-4 text-right">Ação</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-900">
                        {visibleAtendimentos.map((atend) => (
                          <tr key={atend.id} className="hover:bg-zinc-900/25 transition-colors">
                            <td className="p-4 pl-6 font-mono text-[10px] text-zinc-550">
                              <span className="block font-black text-purple-400">#{atend.id}</span>
                              <span className="block text-[9.5px] mt-0.5">{atend.data}</span>
                            </td>
                            <td className="p-4">
                              <p className="font-extrabold text-white text-xs">{atend.cliente}</p>
                              <div className="flex items-center gap-1.5 text-[9.5px] text-zinc-450 mt-0.5 uppercase">
                                <span className="bg-zinc-800 px-1.5 py-0.5 rounded text-[8.5px]">{atend.canal}</span>
                                <span>{atend.contato}</span>
                              </div>
                            </td>
                            <td className="p-4 max-w-sm truncate">
                              <p className="font-semibold text-zinc-300">{atend.assunto}</p>
                              <p className="text-[10px] text-zinc-500 italic mt-0.5 leading-tight">{atend.descricao}</p>
                            </td>
                            <td className="p-4">
                              <Badge className={cn("border-0 text-[9px] font-black uppercase", getSetorColor(atend.setor))}>
                                {getSetorLabel(atend.setor)}
                              </Badge>
                            </td>
                            <td className="p-4 text-center">
                              <span className={cn(
                                "px-2 py-1 rounded text-[9.5px] font-black uppercase tracking-tight",
                                atend.status === 'Pendente' && "bg-red-950/40 text-red-400 border border-red-900/30",
                                atend.status === 'Retornado' && "bg-amber-950/40 text-amber-400 border border-amber-900/30",
                                atend.status === 'Em Proposta' && "bg-blue-950/40 text-blue-400 border border-blue-900/30",
                                atend.status === 'Finalizado' && "bg-emerald-950/40 text-emerald-400 border border-emerald-900/30"
                              )}>
                                {atend.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
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
                                className="border-purple-500/20 text-purple-400 hover:bg-purple-600 hover:text-white text-[9.5px] font-black uppercase shrink-0"
                              >
                                Gerar Negócio <Zap size={11} className="ml-1.5" />
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
          <Card className="bg-[#0b0b0e] border-zinc-800/80 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-purple-500 font-black uppercase">PIPELINE DE VENDAS KORTECK CRM</span>
              <p className="text-xs text-zinc-500 leading-none">Arraste de estágio simulado ou use os menus rápidos para aprovações comerciais</p>
            </div>
            <div className="flex gap-2">
              <span className="bg-emerald-950/25 border border-emerald-500/20 text-emerald-400 font-extrabold text-[10px] px-3 py-1.5 rounded-xl uppercase">
                Metas Ativas: R$ 410.000,00
              </span>
              <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold text-[10px] px-3 py-1.5 rounded-xl uppercase">
                Tícket Médio: R$ 12.850,00
              </span>
            </div>
          </Card>

          {/* Kanban Board do Funil Comercial */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
            {[
              { id: 'captacao', label: '1. Captação / Prospecção', color: 'border-zinc-800' },
              { id: 'contato', label: '2. Contato Inicial', color: 'border-yellow-900/30' },
              { id: 'analise', label: '3. Análise Técnica', color: 'border-blue-900/30' },
              { id: 'proposta', label: '4. Elaboração Proposta', color: 'border-indigo-900/30' },
              { id: 'followup', label: '5. Follow-up / Ajustes', color: 'border-purple-900/30' },
              { id: 'ganho', label: '6. Ganhos / Fechados', color: 'border-emerald-900/30' }
            ].map((col) => {
              const colDeals = visibleDeals.filter(d => d.estagio === col.id);
              const totalVal = colDeals.reduce((sum, d) => sum + d.valor, 0);

              return (
                <div key={col.id} className="min-w-[250px] bg-zinc-950/40 rounded-2xl border border-zinc-900 p-3.5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Header Coluna */}
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                      <span className="text-[10px] font-black uppercase text-zinc-300 line-clamp-1">{col.label}</span>
                      <Badge className="bg-purple-900/40 text-purple-300 text-[10.5px]">{colDeals.length}</Badge>
                    </div>

                    <div className="text-[11.5px] font-black font-mono text-zinc-400 italic">
                      R$ {totalVal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>

                    {/* Cards De Negócio */}
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                      {colDeals.map((deal) => (
                        <Card key={deal.id} className="bg-[#0b0b0e] border-zinc-800/80 hover:border-purple-500/40 transition-all shadow-sm">
                          <CardContent className="p-3.5 space-y-3">
                            <div className="flex items-center justify-between gap-1">
                              <Badge className={cn("text-[8px] font-black uppercase border-0 px-2.5", getSetorColor(deal.setor))}>
                                {getSetorLabel(deal.setor).split(' ')[0]}
                              </Badge>
                              <span className="text-[9px] text-zinc-550 font-mono font-black">#{deal.id}</span>
                            </div>

                            <div className="space-y-1">
                              <h4 className="text-xs font-black text-white uppercase tracking-tight line-clamp-1 leading-snug">{deal.cliente}</h4>
                              <p className="text-[10px] text-zinc-500 font-medium leading-relaxed line-clamp-2">{deal.projeto}</p>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-zinc-900 text-[11px] font-black font-mono">
                              <span className="text-zinc-500">{deal.probabilidade}% Prob.</span>
                              <span className="text-purple-400">R$ {deal.valor.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</span>
                            </div>

                            {/* Controles de Movimentação Lógica do Kanban */}
                            <div className="grid grid-cols-2 gap-1.5 pt-2">
                              <button
                                onClick={() => {
                                  // Avançar estágio do funil
                                  const estagios: Deal['estagio'][] = ['captacao', 'contato', 'analise', 'proposta', 'followup', 'ganho'];
                                  const currIdx = estagios.indexOf(deal.estagio);
                                  if (currIdx > 0) {
                                    moveDeal(deal.id, estagios[currIdx - 1]);
                                  }
                                }}
                                className="h-6 rounded bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 text-[8.5px] font-black uppercase text-center cursor-pointer"
                              >
                                ◀ Voltar
                              </button>
                              <button
                                onClick={() => {
                                  const estagios: Deal['estagio'][] = ['captacao', 'contato', 'analise', 'proposta', 'followup', 'ganho'];
                                  const currIdx = estagios.indexOf(deal.estagio);
                                  if (currIdx < estagios.length - 1) {
                                    moveDeal(deal.id, estagios[currIdx + 1]);
                                  } else {
                                    // Se já é GANHO, gera o orçamento automaticamente
                                    alert('Este negócio já foi concluído com sucesso!');
                                  }
                                }}
                                className="h-6 rounded bg-purple-950/40 text-purple-400 hover:bg-purple-600 hover:text-white text-[8.5px] font-black uppercase text-center cursor-pointer"
                              >
                                Avançar ▶
                              </button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      {colDeals.length === 0 && (
                        <div className="border border-dashed border-zinc-900 rounded-xl py-8 text-center text-zinc-600 text-[10px] uppercase font-bold">
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
                    className="w-full text-zinc-600 hover:text-zinc-300 hover:bg-zinc-900/30 text-[9.5px] font-black uppercase tracking-wider py-1 shrink-0 mt-3 border border-dashed border-zinc-900"
                  >
                    + Adicionar Card
                  </Button>
                </div>
              );
            })}
          </div>
        </TabsContent>

        {/* ==================== 3. ABA DE PROJETOS ==================== */}
        <TabsContent value="projetos" className="outline-none space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Registro de Novo Briefing para os Designers */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="bg-[#0b0b0e] border-zinc-800/90 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-sm font-black uppercase tracking-widest text-[#a855f7]">Novo Briefing de Arte / Design</CardTitle>
                  <CardDescription className="text-xs text-zinc-500">Submeta especificações e dimensões para o setor criativo da KORTECK</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddProjeto} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Título do Briefing / Escopo</label>
                      <Input
                        value={newProjTitulo}
                        onChange={(e) => setNewProjTitulo(e.target.value)}
                        placeholder="Ex: Letras Acrílico Prata Espelhado"
                        className="bg-black/40 border-zinc-800 text-white h-11 text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Desenho de Qual Cliente</label>
                      <Input
                        value={newProjCliente}
                        onChange={(e) => setNewProjCliente(e.target.value)}
                        placeholder="Ex: Banco Itaú Mooca"
                        className="bg-black/40 border-zinc-800 text-white h-11 text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 font-semibold">Setor Alocado</label>
                        <select
                          value={newProjSetor}
                          onChange={(e) => setNewProjSetor(e.target.value as SectorType)}
                          className="w-full bg-black/40 border border-zinc-800 rounded-lg text-xs h-11 px-3 text-white outline-none"
                        >
                          <option value="comunicacao-visual">Comunicação Visual</option>
                          <option value="corte-cnc">Corte CNC</option>
                          <option value="impressao-digital">Impressão Digital</option>
                          <option value="impressao-3d">Impressão 3D</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Dimensões / Medidas</label>
                        <Input
                          value={newProjDimensoes}
                          onChange={(e) => setNewProjDimensoes(e.target.value)}
                          placeholder="Ex: 3.5m x 1.25m"
                          className="bg-black/40 border-zinc-800 text-white h-11 text-xs"
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white h-11 font-black text-xs uppercase uppercase tracking-wider cursor-pointer">
                      Enviar para o Designer
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="p-5 rounded-2xl border border-zinc-850 bg-black/35 space-y-2">
                <div className="flex items-center gap-2 text-purple-400">
                  <Info size={16} />
                  <h4 className="text-xs font-black uppercase">Regra do Core Criativo</h4>
                </div>
                <p className="text-[11px] text-zinc-500 leading-normal">
                  Projetos de <strong>Comunicação Visual</strong> e <strong>Corte CNC</strong> requerem que o vetor seja finalizado em formato <strong>AI ou DXF (escala 1:1)</strong> para evitar erros de colisão e desperdício de insumos na Router/Laser.
                </p>
              </div>
            </div>

            {/* Fila dos Briefings ativos de Artes */}
            <div className="lg:col-span-8">
              <Card className="bg-[#0b0b0e] border-zinc-800/90 shadow-2xl h-full">
                <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-900 pb-4">
                  <div>
                    <CardTitle className="text-sm font-black uppercase">Status de Vetorização & Provas Técnico-Visuais</CardTitle>
                    <CardDescription className="text-xs text-zinc-500">Briefings comerciais pendentes de vetor ou em fase de provação espacial</CardDescription>
                  </div>
                  <span className="text-[10px] bg-indigo-950/45 text-indigo-400 border border-indigo-900/30 font-black tracking-tight px-2.5 py-1 rounded-xl">
                    DESENHOS ATIVOS
                  </span>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {visibleProjetos.map((proj) => (
                      <div key={proj.id} className="p-4 rounded-xl border border-zinc-850 bg-[#0f0f13] space-y-4 hover:border-purple-500/20 transition-all">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[9px] font-black uppercase">
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
                          <p className="text-[10px] text-zinc-550 font-bold uppercase">Cliente: {proj.cliente}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-[10px] border-t border-zinc-900 pt-3 text-zinc-450">
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

                        <div className="flex items-center justify-between pt-2 border-t border-zinc-900">
                          <span className="text-[9px] font-black uppercase text-amber-500 font-mono">Setor: {getSetorLabel(proj.setor)}</span>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
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
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ==================== 4. ABA DE ORÇAMENTOS ==================== */}
        <TabsContent value="orcamentos" className="outline-none space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Esquerda: Geração de Proposta Base */}
            <div className="lg:col-span-4">
              <Card className="bg-[#0b0b0e] border-zinc-800/90 shadow-2xl">
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
                        className="bg-black/40 border-zinc-800 text-white h-11 text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Setor Comercial</label>
                        <select
                          value={newOrcSetor}
                          onChange={(e) => setNewOrcSetor(e.target.value as SectorType)}
                          className="w-full bg-black/40 border border-zinc-800 rounded-lg text-xs h-11 px-3 text-white outline-none"
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
                          className="bg-black/40 border-zinc-800 text-white h-11 text-xs"
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
              <Card className="bg-[#0b0b0e] border-zinc-800/90 shadow-2xl h-full">
                <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-900 pb-4">
                  <div>
                    <CardTitle className="text-sm font-black uppercase">Banco de Orçamentos e Propostas</CardTitle>
                    <CardDescription className="text-xs text-zinc-500">Documentações em emissão ou aguardando aceite fiscal de compras</CardDescription>
                  </div>
                  <Badge className="bg-[#10b981]/15 text-emerald-400 border border-emerald-500/10 text-[10px] font-black">
                    ORÇAMENTOS ATIVOS
                  </Badge>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans text-xs">
                      <thead>
                        <tr className="bg-zinc-950/40 text-zinc-500 border-b border-zinc-900 text-[10px] font-black uppercase">
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
                          <tr key={orc.id} className="hover:bg-zinc-900/25 transition-colors">
                            <td className="p-4 pl-6 font-mono text-[10px] text-zinc-400 font-bold">
                              <span className="block text-white">#{orc.id}</span>
                              <span className="block text-[9px] font-medium mt-0.5 text-zinc-650">{orc.dataEmissao}</span>
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
                              <span className="text-[10px] text-zinc-450 font-medium">
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
                            <td className="p-4 text-right">
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
          <Card className="bg-[#0b0b0e] border-zinc-800/90 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-900 pb-4">
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
                    <tr className="bg-zinc-950/40 text-zinc-500 border-b border-zinc-900 text-[10px] font-black uppercase">
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
                      <tr key={o.id} className="hover:bg-zinc-900/25 transition-colors">
                        <td className="p-4 pl-6 font-mono text-[10px]">
                          <span className="block text-white font-black">{o.numeroOS}</span>
                          <span className="block text-[9.5px] text-zinc-550 mt-0.5">Origem: #{o.orcamentoId}</span>
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
                        <td className="p-4 font-mono font-bold text-zinc-350">
                          {o.dataEntrega}
                        </td>
                        <td className="p-4 text-center">
                          <span className={cn(
                            "px-2.5 py-1 rounded text-[9.5px] font-black uppercase tracking-tight inline-block",
                            o.status === 'Aguardando Arquivos' && "bg-neutral-900/80 text-zinc-400 border border-zinc-800",
                            o.status === 'Preparacao' && "bg-blue-950/70 border border-blue-900/35 text-blue-400",
                            o.status === 'Producao' && "bg-purple-950 border border-purple-900 text-purple-400 animate-pulse",
                            o.status === 'Acabamento/Qualidade' && "bg-pink-950 border border-pink-900 text-pink-400",
                            o.status === 'Entregue' && "bg-emerald-950 text-emerald-400 border border-emerald-900"
                          )}>
                            {o.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
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
                        <td colSpan={7} className="py-16 text-center text-zinc-650 font-bold uppercase text-[10.5px]">
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
              <Card className="bg-[#0b0b0e] border-zinc-800/90 shadow-2xl">
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
                        className="bg-black/40 border-zinc-800 text-white h-11 text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Setor Focado</label>
                        <select
                          value={newCampSetor}
                          onChange={(e) => setNewCampSetor(e.target.value as SectorType)}
                          className="w-full bg-black/40 border border-zinc-800 rounded-lg text-xs h-11 px-3 text-white outline-none"
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
                          className="bg-black/40 border-zinc-800 text-white h-11 text-xs"
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
              <Card className="bg-[#0b0b0e] border-zinc-800/90 shadow-2xl h-full">
                <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-900 pb-4">
                  <div>
                    <CardTitle className="text-sm font-black uppercase">Campanhas e Geração de Oportunidades</CardTitle>
                    <CardDescription className="text-xs text-zinc-500 font-sans">Retorno sobre Investimento (ROI) de cada setor de marketing e vendas</CardDescription>
                  </div>
                  <Badge className="bg-amber-500/10 text-amber-500 border border-amber-500/10 text-[10px] font-bold">
                    MARKETING TRACKING
                  </Badge>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {visibleCampanhas.map((camp) => (
                      <div key={camp.id} className="p-5 rounded-2xl border border-zinc-850 bg-black/40 hover:border-purple-500/35 transition-all flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge className="bg-[#1b1035] text-purple-400 border border-purple-500/20 text-[9px] font-black uppercase">
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

                        <div className="grid grid-cols-3 gap-2 border-t border-zinc-900 pt-4 mt-4 text-[11px] font-black text-white font-mono">
                          <div>
                            <span className="text-[8.5px] text-zinc-650 uppercase font-bold block">Investimento:</span>
                            R$ {camp.investimento.toLocaleString('pt-BR')}
                          </div>
                          <div>
                            <span className="text-[8.5px] text-zinc-650 uppercase font-bold block">Leads Gerados:</span>
                            {camp.leadsGerados === 0 ? 'Fase Coleta' : camp.leadsGerados}
                          </div>
                          <div className="text-right">
                            <span className="text-[8.5px] text-zinc-650 uppercase font-bold block">ROI ROI:</span>
                            <span className="text-emerald-400">{camp.roi === 0 ? 'Mapeando' : `${camp.roi}x`}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-4">
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
                            className="w-full bg-[#1b1035] text-purple-300 hover:bg-purple-650 hover:text-white font-bold text-[9.5px] uppercase tracking-wider"
                          >
                            Simular Novo Lead (Pixel API)
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ==================== 7. ABA DE CLIENTES ==================== */}
        <TabsContent value="clientes" className="outline-none space-y-6">
          <Card className="bg-[#0b0b0e] border-zinc-800/90 shadow-2xl">
            <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
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
                    className="bg-black/40 border-zinc-900 text-white pl-9 text-xs h-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs">
                  <thead>
                    <tr className="bg-zinc-950/40 text-zinc-500 border-b border-zinc-900 text-[10px] font-black uppercase">
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
                        <td className="p-4 pl-6 font-mono text-[10px] text-zinc-450 font-bold">
                          {c.id}
                        </td>
                        <td className="p-4 font-black uppercase text-purple-400">
                          {c.nome}
                        </td>
                        <td className="p-4 text-zinc-350">
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
              <Card className="bg-[#0b0b0e] border-zinc-800/90 shadow-2xl">
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
                      className="w-full bg-black/40 border border-zinc-800 rounded-lg text-xs h-11 px-3 text-white outline-none"
                    >
                      {ordensServico.map(os => (
                        <option key={os.id} value={os.id}>
                          {os.numeroOS} - {os.cliente} ({getSetorLabel(os.setor).split(' ')[0]})
                        </option>
                      ))}
                    </select>
                  </div>

                  <form onSubmit={handleSimulateUploadFile} className="space-y-4 pt-3 border-t border-zinc-900">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-1">Simulador de Upload Técnico</span>
                    <div className="space-y-1.5">
                      <label className="text-[9.5px] font-black uppercase tracking-wider text-zinc-400">Nome da Peça / Arquivo Técnico</label>
                      <Input
                        value={newSimulatedFileName}
                        onChange={(e) => setNewSimulatedFileName(e.target.value)}
                        placeholder="Ex: gabarito_encaixes_letras"
                        className="bg-black/40 border-zinc-800 text-white h-11 text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9.5px] font-black uppercase tracking-wider text-zinc-400">Extensão / Tipo do Arquivo</label>
                      <select
                        value={newSimulatedFileExt}
                        onChange={(e) => setNewSimulatedFileExt(e.target.value as any)}
                        className="w-full bg-black/40 border border-zinc-800 rounded-lg text-xs h-11 px-3 text-white outline-none"
                      >
                        <option value="dwg">.DWG (Vetor Projeto)</option>
                        <option value="dxf">.DXF (Corte CNC Router / Laser)</option>
                        <option value="pdf">.PDF (Impressão Digital Vetor)</option>
                        <option value="stl">.STL (Modelo Tridimensional 3D)</option>
                        <option value="cdr">.CDR (CorelDraw)</option>
                        <option value="ai">.AI (Adobe Illustrator)</option>
                      </select>
                    </div>

                    <Button type="submit" className="w-full bg-[#1b1035] text-purple-300 hover:bg-purple-650 hover:text-white h-11 font-black text-xs uppercase uppercase tracking-wider cursor-pointer">
                      Enviar no FTP Técnico <FileUp size={14} className="ml-1.5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="p-5 rounded-2xl border border-zinc-850 bg-black/35 space-y-2">
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
              <Card className="bg-[#0b0b0e] border-zinc-800/90 shadow-2xl h-full">
                <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-900 pb-4">
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
                  <div className="flex items-center gap-2 bg-zinc-950/60 p-3 rounded-xl border border-zinc-900 mb-6 text-xs text-zinc-400">
                    <Folder size={14} className="text-purple-400" />
                    <span>Diretório: <strong className="text-white">/var/ftp/korteck_flow/os_files/os_id_{selectedOSForFTP}/</strong></span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {visibleFTPFiles.map((f) => (
                      <div key={f.id} className="p-4 rounded-xl border border-zinc-850 bg-black/40 hover:border-purple-500/25 transition-all flex items-center justify-between gap-4">
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
                            <span className="text-[9px] text-zinc-650 block">Upload por: {f.enviadoPor}</span>
                          </div>
                        </div>

                        <div className="flex gap-1.5 shrink-0">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => alert(`Iniciando download do vetor industrial: ${f.nomeArquivo}`)}
                            className="h-8 w-8 p-0 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 cursor-pointer"
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
                            className="h-8 w-8 p-0 border-zinc-800 text-zinc-500 hover:text-red-400 hover:bg-red-950/20 cursor-pointer"
                            title="Excluir arquivo"
                          >
                            <Trash2 size={13} />
                          </Button>
                        </div>
                      </div>
                    ))}

                    {visibleFTPFiles.length === 0 && (
                      <div className="col-span-full py-16 text-center text-zinc-650 font-bold uppercase text-[10.5px]">
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
    </div>
  );
}
