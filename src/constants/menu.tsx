import { 
  LayoutDashboard, 
  BriefcaseBusiness, 
  Package, 
  Factory, 
  Wallet, 
  UsersRound, 
  GraduationCap, 
  ShieldCheck,
  Settings,
  Database,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Zap,
  Users,
  Target,
  FileText,
  Boxes,
  Truck,
  Workflow,
  Printer,
  Scissors,
  ClipboardList,
  CheckCircle2,
  Undo2,
  Calendar,
  Layers,
  History,
  Clock,
  PieChart,
  UserPlus,
  Network,
  Briefcase,
  FileCheck,
  HardHat,
  Monitor,
  Gamepad2,
  Cpu,
  Fingerprint,
  Lock,
  Palette,
  Eye,
  FileCode,
  Globe
} from 'lucide-react';
import React from 'react';

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  children?: MenuItem[];
  badge?: string | number;
  statusColor?: string;
}

export interface ModuleSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  submenus: MenuItem[];
}

export const NAVIGATION_STRUCTURE: ModuleSection[] = [
  {
    id: 'dashboard',
    label: 'DASHBOARD',
    icon: <LayoutDashboard size={20} />,
    description: 'Visão executiva da operação',
    submenus: [
      { id: 'dash-fin', label: 'Financeiro', icon: <Wallet size={16} />, description: 'KPIs financeiros e fluxo de caixa' },
      { id: 'dash-com', label: 'Comercial', icon: <Target size={16} />, description: 'Vendas, funil e metas' },
      { id: 'dash-prod', label: 'Produção', icon: <Factory size={16} />, description: 'Eficiência e gargalos industriais' },
      { id: 'dash-est', label: 'Estoque', icon: <Package size={16} />, description: 'Giro e materiais críticos' },
    ]
  },
  {
    id: 'comercial',
    label: 'COMERCIAL',
    icon: <BriefcaseBusiness size={20} />,
    description: 'Gestão comercial e relacionamento',
    submenus: [
      {
        id: 'clientes',
        label: 'CLIENTES',
        icon: <Users size={16} />,
        children: [
          { id: 'cli-list', label: 'Clientes' },
          { id: 'cli-seg', label: 'Segmentação' },
          { id: 'cli-rfm', label: 'Análise RFM' },
          { id: 'cli-camp', label: 'Campanhas' },
        ]
      },
      {
        id: 'crm',
        label: 'CRM',
        icon: <TrendingUp size={16} />,
        children: [
          { id: 'crm-pipe', label: 'CRM Comercial' },
          { id: 'crm-vendedor', label: 'Pipeline por vendedor' },
          { id: 'crm-follow', label: 'Follow-ups' },
          { id: 'crm-metas', label: 'Metas' },
        ]
      },
      {
        id: 'operacao-com',
        label: 'OPERAÇÃO COMERCIAL',
        icon: <Workflow size={16} />,
        children: [
          { id: 'op-proj', label: 'Projetos' },
          { id: 'op-ped', label: 'Pedidos', badge: 12 },
          { id: 'op-arte', label: 'Arte Finalista' },
          { id: 'op-vend', label: 'Vendedores' },
        ]
      },
      {
        id: 'gestao-com',
        label: 'GESTÃO',
        icon: <Settings size={16} />,
        children: [
          { id: 'ges-preco', label: 'Gestão de Preço (Markup)' },
          { id: 'ges-rrt', label: 'Gestão de R.R.T.' },
          { id: 'ges-prod', label: 'Cadastro de Produto' },
        ]
      }
    ]
  },
  {
    id: 'suprimentos',
    label: 'SUPRIMENTOS',
    icon: <Package size={20} />,
    description: 'Controle de materiais e compras',
    submenus: [
      { id: 'sup-mp', label: 'Matéria-prima', icon: <Database size={16} />, badge: 5, statusColor: 'bg-red-500' },
      { id: 'sup-forn', label: 'Fornecedores', icon: <Truck size={16} /> },
      { id: 'sup-lista', label: 'Lista de Produtos', icon: <ClipboardList size={16} /> },
    ]
  },
  {
    id: 'producao',
    label: 'PRODUÇÃO',
    icon: <Factory size={20} />,
    description: 'Controle operacional e produção',
    submenus: [
      {
        id: 'pcp-group',
        label: 'PCP',
        icon: <ClipboardList size={16} />,
        children: [
          { id: 'pcp-main', label: 'PCP' },
          { id: 'pcp-os', label: 'Ordem de Serviço', badge: 8 },
        ]
      },
      {
        id: 'prod-group',
        label: 'PRODUÇÃO',
        icon: <Workflow size={16} />,
        children: [
          { id: 'prod-chao', label: 'Chão de Fábrica', badge: 'LIVE', statusColor: 'bg-green-500' },
          { id: 'prod-cnc', label: 'Corte CNC' },
          { id: 'prod-imp', label: 'Impressão' },
        ]
      },
      {
        id: 'qual-group',
        label: 'QUALIDADE',
        icon: <CheckCircle2 size={16} />,
        children: [
          { id: 'qual-exp', label: 'Qualidade & Expedição' },
          { id: 'qual-retr', label: 'Gestão de Retrabalho' },
        ]
      }
    ]
  },
  {
    id: 'financeiro',
    label: 'FINANCEIRO',
    icon: <Wallet size={20} />,
    description: 'Gestão financeira empresarial',
    submenus: [
      { id: 'fin-visao', label: 'Visão Financeira', icon: <BarChart3 size={16} /> },
      { id: 'fin-pagar', label: 'Contas a Pagar', icon: <Undo2 size={16} /> },
      { id: 'fin-receber', label: 'Contas a Receber', icon: <TrendingUp size={16} /> },
      { id: 'fin-fluxo', label: 'Fluxo de Caixa', icon: <TrendingUp size={16} /> },
    ]
  },
  {
    id: 'hr',
    label: 'HR',
    icon: <UsersRound size={20} />,
    description: 'Gestão de colaboradores',
    submenus: [
      {
        id: 'hr-colab',
        label: 'COLABORADORES',
        icon: <Users size={16} />,
        children: [
          { id: 'hr-cad', label: 'Cadastro de Colaborador' },
          { id: 'hr-org', label: 'Organograma' },
          { id: 'hr-cargos', label: 'Cargos e Níveis' },
        ]
      },
      {
        id: 'hr-doc',
        label: 'DOCUMENTAÇÃO',
        icon: <FileCheck size={16} />,
        children: [
          { id: 'hr-docs', label: 'Documentações' },
          { id: 'hr-aso', label: 'ASO' },
          { id: 'hr-nr35', label: 'NR35' },
        ]
      }
    ]
  },
  {
    id: 'educa',
    label: 'EDUCA CV',
    icon: <GraduationCap size={20} />,
    description: 'Universidade corporativa da comunicação visual',
    submenus: [
      { id: 'edu-cursos', label: 'Cursos', icon: <Monitor size={16} /> },
      { id: 'edu-trein', label: 'Treinamentos', icon: <HardHat size={16} /> },
      { id: 'edu-cert', label: 'Certificados', icon: <FileCheck size={16} /> },
    ]
  },
  {
    id: 'sistema',
    label: 'SISTEMA',
    icon: <ShieldCheck size={20} />,
    description: 'Administração da plataforma',
    submenus: [
      {
        id: 'sys-adm',
        label: 'ADMINISTRAÇÃO',
        icon: <Lock size={16} />,
        children: [
          { id: 'sys-adm-gest', label: 'Gestão de Administradores' },
          { id: 'sys-users', label: 'Usuários' },
        ]
      },
      {
        id: 'sys-sec',
        label: 'SEGURANÇA',
        icon: <Fingerprint size={16} />,
        children: [
          { id: 'sys-perm', label: 'Permissões' },
          { id: 'sys-levels', label: 'Níveis de Acesso' },
        ]
      },
      {
        id: 'sys-cfg',
        label: 'CONFIGURAÇÕES',
        icon: <Settings size={16} />,
        children: [
          { id: 'sys-cfg-glob', label: 'Configurações Globais' },
          { id: 'sys-theme', label: 'Tema' },
        ]
      }
    ]
  }
];
