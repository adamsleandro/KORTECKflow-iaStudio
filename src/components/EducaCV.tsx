import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Play, 
  Lock, 
  CheckCircle2, 
  Clock, 
  Star, 
  Users, 
  ArrowRight, 
  Search,
  Filter,
  Medal,
  BookOpen,
  Award,
  Zap,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  Check,
  RotateCcw,
  Award as DiplomaIcon,
  Crown,
  Maximize2,
  Wrench,
  Construction,
  Paintbrush,
  Flame,
  Lightbulb,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Rich Types for the visual communication sector curriculum
interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

interface Course {
  id: string;
  title: string;
  sector: 'corte' | 'montagem' | 'eletrica' | 'pintura' | 'solda' | 'seguranca';
  level: 'Iniciante' | 'Intermediador' | 'Avançado' | 'Especialista';
  time: string;
  xp: number;
  desc: string;
  img: string;
  progress: number;
  lessons: Lesson[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// Complete industry list of Courses
const VISUAL_COMMUNICATION_COURSES: Course[] = [
  {
    id: 'corte-cnc',
    title: 'Nesting Avançado para Router CNC',
    sector: 'corte',
    level: 'Especialista',
    time: '12h',
    xp: 450,
    desc: 'Otimização máxima de facas, trajetos de corte e arranjos automáticos em chapas de ACM, acrílico e PVC expandido para reduzir sucatas para menos de 5%.',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
    progress: 75,
    lessons: [
      { id: '1', title: 'Fundamentos de Nesting em Software CAM', duration: '25 min', completed: true },
      { id: '2', title: 'Configuração de Pontes e Junções Técnicas', duration: '40 min', completed: true },
      { id: '3', title: 'Fatores de Tolerância e Res friamento de ACM', duration: '35 min', completed: true },
      { id: '4', title: 'Maximização de Retalhos Sobressalentes', duration: '50 min', completed: false }
    ],
    quiz: {
      question: 'Qual é a finalidade principal de configurar "pontes" (tabs) no percurso de corte em Router CNC?',
      options: [
        'Aumentar o brilho e acabamento das bordas cortadas.',
        'Impedir que peças pequenas soltem-se da chapa com a força do vácuo ou fresa, evitando colisões e acidentes.',
        'Aumentar a velocidade linear de corte e avanço do cabeçote.',
        'Evitar que a fresa superaqueça durante o processo.'
      ],
      correctIndex: 1,
      explanation: 'As pontes servem de sustentação física para que peças menores fiquem fixadas à grade de sobras, impedindo levantamento de peças operadas sob forte vácuo e prevenindo quebras de fresa.'
    }
  },
  {
    id: 'corte-laser',
    title: 'Corte e Gravação a Laser Fibra & CO2',
    sector: 'corte',
    level: 'Avançado',
    time: '10h',
    xp: 350,
    desc: 'Parametrização precisa de velocidade, frequência e potência de gás para cortes limpos sem rebarbas em aço inox e acrilicos espelhados.',
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600',
    progress: 0,
    lessons: [
      { id: '1', title: 'Focalização das Lentes e Comprimento de Onda', duration: '30 min', completed: false },
      { id: '2', title: 'Diferenças de Gases Auxiliares: N2 vs O2', duration: '45 min', completed: false },
      { id: '3', title: 'Corte Limpo em Acrílico de Alta Espessura', duration: '40 min', completed: false }
    ],
    quiz: {
      question: 'Ao cortar aço carbono com Laser Fibra, qual gás auxiliar promove uma reação exotérmica para acelerar o corte?',
      options: [
        'Nitrogênio (N2)',
        'Argônio (Ar)',
        'Oxigênio (O2)',
        'Dióxido de Carbono (CO2)'
      ],
      correctIndex: 2,
      explanation: 'O oxigênio reage com o ferro quente gerando calor adicional, acelerando a queima e expulsando o material derretido, ideal para corte de aços ferrosos densos.'
    }
  },
  {
    id: 'montagem-acm',
    title: 'Dobra, Vinco e Montagem de Fachadas ACM',
    sector: 'montagem',
    level: 'Avançado',
    time: '15h',
    xp: 600,
    desc: 'Estruturação de bandejas de ACM, fresagem regulada do núcleo termoplástico, instalação sob perfis e vedação contra infiltrações com elastômero de PU.',
    img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600',
    progress: 30,
    lessons: [
      { id: '1', title: 'Uso Correto de Fresas V-Groove de 90° e 135°', duration: '30 min', completed: true },
      { id: '2', title: 'Técnicas de Calandra e Curvatura de Fachadas', duration: '50 min', completed: false },
      { id: '3', title: 'Dimensionamento de Folga de Junta de Dilatação', duration: '30 min', completed: false },
      { id: '4', title: 'Tipagem de Fixadores e Buchas de Impacto', duration: '45 min', completed: false }
    ],
    quiz: {
      question: 'Ao realizar a fresagem de uma chapa de ACM com fresa V-Groove para posterior dobra, qual espessura mínima do núcleo de polietileno deve ser deixada para evitar que a chapa quebre na dobra?',
      options: [
        'Nenhuma, o alumínio deve ficar totalmente exposto.',
        'Aproximadamente 0.3mm a 0.8mm de polietileno restante acima das folhas de alumínio internas.',
        'Todo o polietileno deve ser mantido intacto.',
        'Deve-se desgastar cerca de metade da folha de alumínio de cobertura.'
      ],
      correctIndex: 1,
      explanation: 'Deixar uma fina camada do polietileno (0.3 a 0.8mm) serve de amortecedor e pivô, distribuindo a tensão de tração de forma que a lâmina superficial de alumínio não rompa ou trinque durante as dobras manuais.'
    }
  },
  {
    id: 'montagem-letras',
    title: 'Montagem de Letra Caixa & Logotipos Premium',
    sector: 'montagem',
    level: 'Intermediador',
    time: '8h',
    xp: 300,
    desc: 'Confecção de caixas de acrílico tridimensional, metal galvanizado e PVC expandido. Métodos de colagem invisível, encaixes e fixação flutuante.',
    img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=600',
    progress: 100,
    lessons: [
      { id: '1', title: 'Corte de Laterais de Acrílico em Soprador Térmico', duration: '20 min', completed: true },
      { id: '2', title: 'Colas para Acrílico: Acrílico Líquido vs Cianoacrilato', duration: '30 min', completed: true },
      { id: '3', title: 'Montagem de Gabaritos de Plotagem de Instalação espacial', duration: '35 min', completed: true }
    ],
    quiz: {
      question: 'Qual o adesivo ideal para a união de acrílico cristal que promove uma solda química de fusão molecular pura, sem bolhas e perfeitamente transparente?',
      options: [
        'Cola instantânea de cianoacrilato comum.',
        'Fita dupla face VHB.',
        'Adesivo monômero por polimerização (solvente clorofórmio estabilizado).',
        'Silicone acético transparente.'
      ],
      correctIndex: 2,
      explanation: 'Adesivos específicos à base de solvente reagem dissolvendo temporariamente as superfícies de acrílico. Ao evaporar, as moléculas fundem-se em uma única estrutura monolítica transparente com máxima resistência de carga.'
    }
  },
  {
    id: 'eletrica-fontes',
    title: 'Sistemas de Iluminação LED & Fontes 12V/24V',
    sector: 'eletrica',
    level: 'Iniciante',
    time: '6h',
    xp: 250,
    desc: 'Cálculo de potência de fontes chaveadas, blindagem IP contra intempéries, limitação de queda de tensão em circuitos longos e cabeamento apropriado.',
    img: 'https://images.unsplash.com/photo-1558244661-d248897f7bc4?auto=format&fit=crop&q=80&w=600',
    progress: 10,
    lessons: [
      { id: '1', title: 'Dimensionamento Geral de Fontes Chaveadas', duration: '25 min', completed: true },
      { id: '2', title: 'Cálculo de Queda de Tensão por Bitola de Fio', duration: '35 min', completed: false },
      { id: '3', title: 'Conectores Estanques e Isolação Hidro-resistente', duration: '30 min', completed: false }
    ],
    quiz: {
      question: 'Uma placa necessita de 120 módulos de LED 12V. Sabendo que cada módulo consome 1.2W e aplicando a margem de segurança industrial padrão de 20%, qual a potência mínima que a fonte robusta de 12V deve prover?',
      options: [
        '144 Watts',
        '172.8 Watts',
        '120 Watts',
        '200 Watts'
      ],
      correctIndex: 1,
      explanation: 'Consumo real = 120 unidades * 1.2W = 144W. Adicionando a margem protetiva contra sobressaltos e picos industriais de 20% (144 * 1.2), obtemos 172.8W.'
    }
  },
  {
    id: 'eletrica-neon',
    title: 'Instalação Prática de Neon LED Flexível',
    sector: 'eletrica',
    level: 'Intermediador',
    time: '8h',
    xp: 350,
    desc: 'Técnicas de corte e soldagem em placas acrílicas gravadas para Neon, isolamento de pontas, curvas complexas e gabarito estético.',
    img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=600',
    progress: 0,
    lessons: [
      { id: '1', title: 'Terminologia e Marcadores de Corte do Neon Flex', duration: '20 min', completed: false },
      { id: '2', title: 'Soldagem Rápida com Estanho e Trigo de Vedação', duration: '30 min', completed: false },
      { id: '3', title: 'Acabamentos e Colagem em Acrílico Cristal', duration: '40 min', completed: false }
    ],
    quiz: {
      question: 'Qual a temperatura ideal da ponta do ferro de solda para soldar fios finos de alimentação aos pontos de cobre do Neon Flex sem queimar o guia de silicone?',
      options: [
        '150°C a 200°C',
        '320°C a 360°C aplicada em toques rápidos de menos de 3 segundos',
        '450°C a 500°C durante cerca de 10 segundos',
        'O silicone deve ser fundido e prensado junto com o fio'
      ],
      correctIndex: 1,
      explanation: 'A soldagem de fios em contato com fitas Neon LED requer calor rápido de 320°C a 360°C para fundir o estanho instantaneamente. Períodos maiores de contato dissipam calor e destroem o circuito flexível de cobre interno e as trilhas de LED.'
    }
  },
  {
    id: 'pintura-pu',
    title: 'Pintura Automotiva PU para Letras Metálicas',
    sector: 'pintura',
    level: 'Avançado',
    time: '14h',
    xp: 500,
    desc: 'Preparação com Primer Wash para galvanizado, catálise e diluição de tinta PU, controle de pressão da pistola e técnicas de aplicação uniforme sem escorrer.',
    img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=600',
    progress: 0,
    lessons: [
      { id: '1', title: 'Preparação Básica de Superfície e Polimento do Aço', duration: '35 min', completed: false },
      { id: '2', title: 'Aplicação de Wash Primer: Fundamento Químico de Aderência', duration: '30 min', completed: false },
      { id: '3', title: 'Técnica de Passadas Cruzadas e Distância de Canecos', duration: '45 min', completed: false },
      { id: '4', title: 'Secagem, Cura e Polimento de Letras Metálicas', duration: '40 min', completed: false }
    ],
    quiz: {
      question: 'Por que o uso de Wash Primer (ou fundo fosfatizante) é considerado uma etapa estritamente obrigatória antes de pintar estruturas de chapa galvanizada ou alumínio com tinta poliuretano (PU)?',
      options: [
        'Para dar o brilho espelhado final.',
        'Porque chapas galvanizadas e alumínio possuem superfícies inertes e oleosas que impedem a aderência mecânica da tinta comum. O Wash Primer cria uma ancoragem química estável por fosfatização.',
        'Apenas para acelerar o tempo de secagem da estufa.',
        'Para deixar a tinta mais densa e resistente a impactos de corte.'
      ],
      correctIndex: 1,
      explanation: 'O zinco da galvanização e a camada de óxido de alumínio nativos dificultam a fixação de tintas PU diretamente. O Wash Primer reage quimicamente com os metais, criando uma camada fosfatizada que ancora o acabamento final indefinitivamente, prevenindo descascamentos.'
    }
  },
  {
    id: 'pintura-verniz',
    title: 'Acabamentos Premium e Mascaramento de Dupla Cor',
    sector: 'pintura',
    level: 'Intermediador',
    time: '8h',
    xp: 300,
    desc: 'Lixamento entre demãos de verniz, uso de fitas automotivas de mascaramento sem deixar resíduo, pinturas bicomponente texturizadas e foscas.',
    img: 'https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?auto=format&fit=crop&q=80&w=600',
    progress: 0,
    lessons: [
      { id: '1', title: 'Tipagem de Grãos de Lixa D’água: Do #320 ao #1200', duration: '25 min', completed: false },
      { id: '2', title: 'Mascaramento Preciso de Linhas Retas e Logos Complexos', duration: '40 min', completed: false },
      { id: '3', title: 'Efeito Verniz Resistente a Raios Solares UV Externos', duration: '30 min', completed: false }
    ],
    quiz: {
      question: 'Qual o tempo ideal para remover a fita de mascaramento após aplicar a segunda camada de tinta em uma letra caixa bicolor para garantir uma linha divisória limpa e sem remover a camada inferior?',
      options: [
        'Remover imediatamente após secagem ao toque (cerca de 25-40 minutos), com a tinta ainda macia, puxando em ângulo agudo de 45°.',
        'Remover após 48 horas da cura total no forno.',
        'Antes de aplicar a tinta secundária.',
        'Umedecer com Thinner de diluição para soltar as pontas antes de puxar.'
      ],
      correctIndex: 0,
      explanation: 'A fita deve ser removida quando a película de tinta secundária estiver estável porém flexível (toque). Se secar demais, a tinta curada racha na borda da fita deixando lascas; se estiver muito líquida, escorre.'
    }
  },
  {
    id: 'solda-mig',
    title: 'Soldagem MIG/MAG em Metalon e Chaparia',
    sector: 'solda',
    level: 'Avançado',
    time: '16h',
    xp: 600,
    desc: 'Montagem de quadros de sustentação metálica para painéis de fachada. Ajuste fino de amperagem e velocidade do arame, gás protetor CO2/Argônio e esquadro térmico.',
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=600',
    progress: 0,
    lessons: [
      { id: '1', title: 'Configuração Básica de Gás de Blindagem e Tochas MIG', duration: '30 min', completed: false },
      { id: '2', title: 'Prevenção de Empenamento Térmico por Pontos Estáveis', duration: '45 min', completed: false },
      { id: '3', title: 'Solda em Pontos de Canto e Chanfros de Penetração Avançada', duration: '50 min', completed: false },
      { id: '4', title: 'Inspeção por Ensaios Não-Destrutivos Práticos de Campo', duration: '35 min', completed: false }
    ],
    quiz: {
      question: 'O empenamento térmico é um problema crucial na soldagem de estruturas em esquadro de metalon leve de chapa fina (ex: chapa #18 ou #20). Qual técnica de montagem mitiga este efeito prejudicial?',
      options: [
        'Soldar de forma corrida e ininterrupta de um canto a outro com corrente máxima.',
        'Realizar soldagem pontual alternada (técnica do passo peregrino ou pontas cruzadas) e prender as peças rigidamente ao gabarito de solda em esquadro.',
        'Soldar sem gás auxiliar para refrigerar o metal fundido.',
        'Resfriar a solda quente jogando água sob pressão no metalon.'
      ],
      correctIndex: 1,
      explanation: 'A soldagem alternada e o ponteamento prévio distribuem o aporte térmico homogeneamente ao longo da estrutura de metalon leve. Fixar gabaritos robustos restringe a contração mecânica do metal do cordão durante a fase crítica de resfriamento, mantendo o perfeito esquadro de 90° das grades do painel.'
    }
  },
  {
    id: 'solda-tig',
    title: 'Soldagem TIG de Alta Precisão para Letras Inox',
    sector: 'solda',
    level: 'Especialista',
    time: '18h',
    xp: 650,
    desc: 'Solda invisível micro-TIG sem aporte excessivo de material. Acabamentos requintados e espelhados em letras caixas de Aço Inoxidável 304.',
    img: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=600',
    progress: 0,
    lessons: [
      { id: '1', title: 'Afiação e Escolhas de Eletrodo de Tungstênio de Lantanio', duration: '30 min', completed: false },
      { id: '2', title: 'Tratamento de Proteção no Verso com Gás de Purga', duration: '40 min', completed: false },
      { id: '3', title: 'Técnica de Toque Livre e Solda Autógena Perfeita', duration: '55 min', completed: false }
    ],
    quiz: {
      question: 'Ao soldar letreiros em aço inox fino por processo TIG autógeno, qual gás de purga (escoamento) é indicado para proteger as costas do cordão de solda interno contra contaminações e oxidação "flor de enxofre"?',
      options: [
        'Oxigênio Puro',
        'Argônio Inerte fluído purificado',
        'Ar comprimido desumidificado',
        'Mistura de CO2 com Acetileno'
      ],
      correctIndex: 1,
      explanation: 'O argônio flui cobrindo fisicamente a raiz interna da chapa de inox para expulsar o oxigênio atmosférico. Sem a purga, o aço inox superaquecido nas costas do ponto reage violentamente com o oxigênio do ar, oxidando brutalmente resultando em uma solda porosa, quebradiça e esteticamente inviabilizada.'
    }
  }
];

export function EducaCV() {
  const [activeTab, setActiveTab] = useState('cursos');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Immersive Lecture Mode / Player state
  const [currentPlayingCourse, setCurrentPlayingCourse] = useState<Course | null>(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userSelectedOption, setUserSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null); // null if not completed/failed, 100 if correct
  
  // Local Training tracker & stats
  const [extraXP, setExtraXP] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  
  // Custom Certifications / Supervisor floor evaluation Form
  const [supervisorName, setSupervisorName] = useState('');
  const [candidateName, setCandidateName] = useState('Bruno Alves');
  const [evaluationSector, setEvaluationSector] = useState('corte');
  const [criteria1, setCriteria1] = useState(3); // 1-5
  const [criteria2, setCriteria2] = useState(3); // 1-5
  const [criteria3, setCriteria3] = useState(3); // 1-5
  const [evaluationNotes, setEvaluationNotes] = useState('');
  const [customCertificates, setCustomCertificates] = useState<Array<{
    id: string;
    candidate: string;
    sector: string;
    score: number;
    supervisor: string;
    date: string;
  }>>([
    { id: '1', candidate: 'Bruno Alves', sector: 'Router CNC Nesting', score: 98, supervisor: 'Adams Leandro', date: '15 Mai 2026' },
    { id: '2', candidate: 'Ana Beatriz', sector: 'Fechamento & Designer CAD', score: 100, supervisor: 'Adams Leandro', date: '04 Mar 2026' }
  ]);

  const handleCreateEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supervisorName.trim() || !candidateName.trim()) {
      alert("Por favor, informe o nome do supervisor avaliador e o candidato antes de gerar a certificação.");
      return;
    }
    
    const finalScore = Math.round(((criteria1 + criteria2 + criteria3) / 15) * 100);
    const newCert = {
      id: Math.random().toString(36).substr(2, 9),
      candidate: candidateName,
      sector: evaluationSector === 'corte' ? 'Setor de Corte (Router e Laser)' :
              evaluationSector === 'montagem' ? 'Setor de Montagem e Fachada' :
              evaluationSector === 'eletrica' ? 'Sistemas Elétricos e Luminosos' :
              evaluationSector === 'pintura' ? 'Setor de Cabine de Pintura PU' : 'Serralheria e Soldagem MIG/TIG',
      score: finalScore,
      supervisor: supervisorName,
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    
    setCustomCertificates([newCert, ...customCertificates]);
    alert(`Certificado Técnico de Visualização emitido para ${candidateName}! Média final de competência avaliada de ${finalScore}%.`);
    setSupervisorName('');
    setEvaluationNotes('');
  };

  const getSectorMeta = (sector: string) => {
    switch(sector) {
      case 'corte': return { label: 'Setor de Corte', icon: <Cpu size={14} />, color: 'bg-indigo-600 text-indigo-100 border-indigo-500/20' };
      case 'montagem': return { label: 'Montagem / Acabamento', icon: <Layers size={14} />, color: 'bg-emerald-600 text-emerald-100 border-emerald-500/20' };
      case 'eletrica': return { label: 'Elétrica / Luminosos', icon: <Lightbulb size={14} />, color: 'bg-amber-600 text-amber-500/10 border-amber-500/30' };
      case 'pintura': return { label: 'Pintura Especial', icon: <Paintbrush size={14} />, color: 'bg-rose-600 text-rose-100 border-rose-500/20' };
      case 'solda': return { label: 'Solda e Chapas', icon: <Flame size={14} />, color: 'bg-purple-600 text-purple-100 border-purple-500/20' };
      default: return { label: 'Segurança Geral', icon: <Construction size={14} />, color: 'bg-zinc-600 text-zinc-100 border-zinc-500/20' };
    }
  };

  // Filter logic
  const filteredCourses = VISUAL_COMMUNICATION_COURSES.filter(c => {
    const matchesCat = selectedCategory === 'todos' || c.sector === selectedCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleLessonToggle = (courseId: string, lessonId: string) => {
    if (!currentPlayingCourse) return;
    const updatedLessons = currentPlayingCourse.lessons.map(l => {
      if (l.id === lessonId) return { ...l, completed: !l.completed };
      return l;
    });
    
    // Recalculate course progress
    const completedCount = updatedLessons.filter(l => l.completed).length;
    const calculatedProgress = Math.round((completedCount / updatedLessons.length) * 100);
    
    const updatedCourse = {
      ...currentPlayingCourse,
      lessons: updatedLessons,
      progress: calculatedProgress
    };
    
    setCurrentPlayingCourse(updatedCourse);
  };

  const handleQuizSubmit = () => {
    if (!currentPlayingCourse || userSelectedOption === null) return;
    setQuizSubmitted(true);
    if (userSelectedOption === currentPlayingCourse.quiz.correctIndex) {
      setQuizScore(100);
      if (!completedQuizzes.includes(currentPlayingCourse.id)) {
        setCompletedQuizzes([...completedQuizzes, currentPlayingCourse.id]);
        setExtraXP(prev => prev + currentPlayingCourse.xp);
      }
    } else {
      setQuizScore(0);
    }
  };

  const handleResetQuiz = () => {
    setUserSelectedOption(null);
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  // Rankings Mock Data representing the visual communication shop floor
  const LEADERBOARD_TRAINEES = [
    { name: 'Bruno Alves', sector: 'Corte CNC & Laser', xp: 4500 + extraXP, rank: 1, avatar: '2' },
    { name: 'Marcos Paulo', sector: 'Letra Caixa & Montagem', xp: 3800, rank: 2, avatar: '4' },
    { name: 'Eduardo Souza', sector: 'Serralheria & Soldagem', xp: 3500, rank: 3, avatar: '1' },
    { name: 'Ricardo Melo', sector: 'Instalador Elétrica e Fachadas', xp: 2100, rank: 4, avatar: '5' },
    { name: 'Sueli Rocha', sector: 'Mascaramento e Pintura especial', xp: 1950, rank: 5, avatar: '3' }
  ].sort((a,b) => b.xp - a.xp);

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-700 max-w-[1600px] mx-auto pb-24">
      {/* Mesh Education Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b border-white/5 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="p-2.5 bg-amber-600/10 rounded-xl border border-amber-500/20">
                <GraduationCap size={28} className="text-amber-500" />
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-[0.5em] text-zinc-500 uppercase">TREINAMENTO DE EQUIPE // CAPACITAÇÃO OPERATIVA</span>
                <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                  Educa <span className="text-amber-600">CV</span> <span className="text-zinc-650 mx-1">&amp;</span> Capacitação
                </h1>
             </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
           <div className="hidden xl:flex items-center gap-10 px-8 border-r border-white/5 mr-3">
              <div className="text-right">
                 <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">CERTIFICADOS IMPRESSOS</p>
                 <p className="text-xl font-black text-white italic tracking-tighter">{customCertificates.length} ATIVOS</p>
              </div>
              <div className="text-right">
                 <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">XP TOTAL DA EQUIPE</p>
                 <div className="flex items-center gap-2 justify-end">
                    <TrendingUp size={14} className="text-amber-500" />
                    <p className="text-xl font-black text-amber-500 italic">{15800 + extraXP} XP</p>
                 </div>
              </div>
           </div>
           <Button 
             onClick={() => { setSelectedCategory('todos'); setActiveTab('cursos'); setSearchQuery(''); }}
             className="bg-white text-black hover:bg-zinc-200 h-12 px-6 font-black uppercase text-[11px] tracking-widest shadow-xl transition-all"
           >
              Catálogo Geral
           </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-transparent border-0 p-0 flex flex-wrap gap-2 w-full xl:w-auto overflow-x-auto scrollbar-hide">
          {[
            { id: 'cursos', label: 'Cursos por Setor', icon: <BookOpen size={14} /> },
            { id: 'certifica', label: 'Ficha de Avaliação Prática DHO / RH', icon: <DiplomaIcon size={14} /> },
            { id: 'badges', label: 'Hall da Fama (Staff Rankings)', icon: <Medal size={14} /> },
            { id: 'cursos-grade', label: 'NRs obrigatórios de Segurança', icon: <Lock size={14} /> },
          ].map(tab => (
            <TabsTrigger 
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-zinc-400 bg-zinc-900/60 hover:bg-zinc-800/80 hover:text-zinc-200 border border-zinc-800/85 data-[state=active]:border-blue-500 text-xs font-semibold px-4 h-11 rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-2.5 cursor-pointer shadow-sm relative"
            >
              {tab.icon} {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* 1. CURSOS DETALHADOS E ATIVAÇÕES */}
        <TabsContent value="cursos" className="mt-0 outline-none space-y-6">
          <AnimatePresence mode="wait">
            {!currentPlayingCourse ? (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                {/* Sector Tabs Bar Filters */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0c0c10] border border-white/5 p-3 rounded-2xl">
                  {/* Category badgess */}
                  <div className="flex flex-wrap items-center gap-2">
                    {[
                      { id: 'todos', label: 'Ver Todos' },
                      { id: 'corte', label: 'Corte (Router & Laser)' },
                      { id: 'montagem', label: 'Montagem' },
                      { id: 'eletrica', label: 'Elétrica / LED' },
                      { id: 'pintura', label: 'Pintura' },
                      { id: 'solda', label: 'Soldagem / Serralheria' }
                    ].map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={cn(
                          "px-4 h-9 rounded-xl text-xs font-black uppercase tracking-tight transition-all border border-transparent",
                          selectedCategory === cat.id 
                            ? "bg-amber-600 text-white shadow-md shadow-amber-600/10 border-amber-500/20 font-bold"
                            : "bg-zinc-900/50 text-zinc-400 hover:text-white hover:bg-zinc-800 border-zinc-800/85"
                        )}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Search box for visual filter */}
                  <div className="relative w-full md:w-80">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 animate-pulse" size={14} />
                     <Input 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-black/40 border-white/10 pl-9 h-10 w-full text-[10px] text-white uppercase font-black tracking-widest placeholder:text-zinc-600 placeholder:normal-case font-mono" 
                        placeholder="Filtrar treinamentos..." 
                     />
                  </div>
                </div>

                {/* Training Course Deck Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => {
                      const meta = getSectorMeta(course.sector);
                      const isComplete = course.progress === 100 || completedQuizzes.includes(course.id);
                      return (
                        <Card 
                          key={course.id} 
                          onClick={() => {
                            setCurrentPlayingCourse(course);
                            setActiveLessonIndex(0);
                            setIsPlaying(false);
                            setUserSelectedOption(null);
                            setQuizSubmitted(false);
                            setQuizScore(null);
                          }}
                          className="bg-[#0c0c10] border-white/5 overflow-hidden group hover:border-amber-500/20 transition-all cursor-pointer flex flex-col justify-between h-full relative"
                        >
                          <div>
                            <div className="aspect-video relative overflow-hidden">
                              <img 
                                src={course.img} 
                                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700" 
                                alt={course.title} 
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c10] via-[#0c0c10]/40 to-transparent" />
                              
                              <div className="absolute top-4 left-4">
                                <Badge className={cn("border-0 font-extrabold uppercase px-2.5 py-1 text-[8.5px] tracking-wider", meta.color)}>
                                  {meta.icon} <span className="ml-1.5">{meta.label}</span>
                                </Badge>
                              </div>

                              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[9px] text-zinc-400 font-bold tracking-tight">
                                {course.level}
                              </div>
                            </div>

                            <CardContent className="p-6 space-y-3">
                              <h3 className="text-lg font-black text-white italic uppercase tracking-tighter leading-tight group-hover:text-amber-500 transition-colors">
                                {course.title}
                              </h3>
                              <p className="text-zinc-500 text-xs leading-relaxed font-medium line-clamp-3">
                                {course.desc}
                              </p>
                            </CardContent>
                          </div>

                          <div className="p-6 pt-0 space-y-4">
                            {/* Progress bar info */}
                            <div className="space-y-1.5">
                              <div className="flex justify-between items-center text-[9px] font-black text-zinc-600 uppercase tracking-widest italic">
                                 <span>Progresso Capacidade</span>
                                 <span className={cn(isComplete ? "text-emerald-500" : "text-white")}>
                                   {isComplete ? "Concluído" : `${course.progress}%`}
                                 </span>
                              </div>
                              <Progress value={isComplete ? 100 : course.progress} className="h-1.5 bg-white/5" />
                            </div>

                            {/* bottom actions info */}
                            <div className="flex justify-between items-center pt-3 border-t border-white/5">
                              <div className="flex items-center gap-1.5">
                                <Zap size={12} className="text-amber-500" />
                                <span className="text-[10px] font-black text-amber-500 tracking-tight italic font-mono">
                                   +{course.xp} XP
                                </span>
                              </div>
                              <span className="text-[9px] font-black uppercase text-zinc-400 flex items-center gap-1 hover:translate-x-1 transition-transform group-hover:text-white">
                                 Iniciar Módulo <ArrowRight size={12} />
                              </span>
                            </div>
                          </div>
                        </Card>
                      );
                    })
                  ) : (
                    <div className="col-span-full py-16 text-center border-2 border-dashed border-zinc-850 rounded-2xl bg-white/[0.01]">
                       <Award size={48} className="mx-auto text-zinc-600 mb-3 animate-pulse" />
                       <h3 className="text-sm font-black text-white uppercase italic mb-1">Nenhum Treinamento Encontrado</h3>
                       <p className="text-xs text-zinc-500">Mude a palavra pesquisada ou selecione outro setor industrial.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              /* ACTIVE CLASSROOM MODE / LECTURE SCREEN */
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="grid grid-cols-1 xl:grid-cols-12 gap-8"
              >
                {/* Center Lecture area */}
                <div className="xl:col-span-8 space-y-6">
                  {/* Player header */}
                  <div className="flex items-center justify-between">
                    <Button 
                      variant="ghost" 
                      onClick={() => { setCurrentPlayingCourse(null); }}
                      className="text-zinc-500 hover:text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest pl-0 transition-colors"
                    >
                      <ArrowRight size={14} className="rotate-180" /> Voltar ao Catálogo
                    </Button>
                    <Badge className={cn("border-0 font-black px-3.5 py-1.5 text-[9px] tracking-widest uppercase", getSectorMeta(currentPlayingCourse.sector).color)}>
                      {getSectorMeta(currentPlayingCourse.sector).label}
                    </Badge>
                  </div>

                  {/* Simulated Visual Screen Player */}
                  <Card className="bg-black border-zinc-800/80 overflow-hidden relative shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
                    <div className="aspect-[16/9] relative flex items-center justify-center">
                      <img 
                        src={currentPlayingCourse.img} 
                        className={cn("absolute inset-0 w-full h-full object-cover transition-all duration-350", isPlaying ? "opacity-25" : "opacity-40 brightness-75")} 
                        alt="Course Display"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
                      
                      {/* Interactive overlay based on play state */}
                      <div className="absolute z-10 text-center px-12 max-w-lg">
                        {!isPlaying ? (
                          <div className="space-y-4">
                            <button 
                              onClick={() => setIsPlaying(true)}
                              className="w-20 h-20 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.4)] hover:scale-110 active:scale-95 transition-all mx-auto group cursor-pointer"
                            >
                               <Play size={32} className="ml-1 fill-black" />
                            </button>
                            <div className="space-y-1">
                               <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">AULA SELECIONADA</p>
                               <h2 className="text-xl md:text-2xl font-black text-white uppercase italic tracking-tighter">
                                 {currentPlayingCourse.lessons[activeLessonIndex]?.title}
                               </h2>
                               <p className="text-xs text-zinc-400 flex items-center justify-center gap-1.5">
                                 <Clock size={12} /> {currentPlayingCourse.lessons[activeLessonIndex]?.duration} de vídeo-tutorial técnico
                               </p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4 py-8">
                             {/* Mock video equalizer animations */}
                             <div className="flex items-end justify-center gap-1.5 h-12">
                               {[0.6, 0.9, 0.4, 0.7, 0.3, 0.85, 0.5, 0.95].map((h, i) => (
                                 <motion.div 
                                   key={i}
                                   animate={{ height: [`${h * 100}%`, `${(1-h) * 100}%`, `${h * 100}%`] }}
                                   transition={{ repeat: Infinity, duration: 1.2 + i * 0.1, ease: 'easeInOut' }}
                                   className="w-1 px-0.5 bg-amber-500 rounded-full"
                                 />
                               ))}
                             </div>
                             <div className="space-y-1">
                               <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest animate-pulse">REPRODUZINDO TREINAMENTO MULTIMÍDIA KORTECK</p>
                               <h3 className="text-base font-bold text-white tracking-wide">{currentPlayingCourse.lessons[activeLessonIndex]?.title}</h3>
                             </div>
                             <Button 
                               onClick={() => setIsPlaying(false)}
                               variant="outline" 
                               className="border-white/10 text-white hover:bg-white/5 h-10 px-6 text-[9px] font-black tracking-widest uppercase"
                             >
                                 Pausar Aula
                             </Button>
                          </div>
                        )}
                      </div>

                      {/* Course bottom progress line inside player */}
                      <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between z-10 text-[10px] text-zinc-400 font-bold font-mono">
                         <span className="bg-black/70 px-2.5 py-1 rounded border border-white/5 uppercase">Aula {activeLessonIndex + 1} de {currentPlayingCourse.lessons.length}</span>
                         <span className="bg-amber-600 font-black text-black px-2 py-1 rounded">VÍDEO HD 1080P // ATIVO</span>
                      </div>
                    </div>
                  </Card>

                  {/* Course Details Text section */}
                  <div className="bg-[#0c0c10] border border-white/5 rounded-2xl p-6 md:p-8 space-y-4">
                     <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="space-y-1">
                           <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest">Currículo Profissional Realizado pela Diretoria Industrial</span>
                           <h2 className="text-xl md:text-2xl font-black text-white italic uppercase tracking-tighter">{currentPlayingCourse.title}</h2>
                        </div>
                        <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl">
                           <Zap size={14} className="text-amber-500" />
                           <span className="text-[11px] font-black text-amber-500 italic font-mono">+{currentPlayingCourse.xp} XP</span>
                        </div>
                     </div>
                     <p className="text-zinc-400 text-sm leading-relaxed">{currentPlayingCourse.desc}</p>
                     
                     <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex items-center gap-3">
                        <Info size={16} className="text-amber-500 shrink-0" />
                        <p className="text-xs text-zinc-500 leading-normal">
                           Assista ao vídeo para responder ao quiz de capacitação. Acertar o quiz concede o bônus de <strong>{currentPlayingCourse.xp} XP</strong> para seu perfil e atualiza sua pontuação dentro do Hall de Rankings industriais DHO.
                        </p>
                     </div>
                  </div>
                </div>

                {/* Right Side: Chapter check and sector Quiz Evaluator */}
                <div className="xl:col-span-4 space-y-6">
                  {/* Playlist Lectures check */}
                  <Card className="bg-[#0c0c10] border-white/5">
                    <CardHeader className="border-b border-white/5 pb-4 bg-white/[0.01]">
                       <CardTitle className="text-xs font-black text-white uppercase tracking-widest italic flex items-center gap-2">
                          <BookOpen size={14} className="text-amber-500" /> Conteúdo Curricular
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-2 mt-2">
                      {currentPlayingCourse.lessons.map((lesson, idx) => (
                        <div 
                          key={lesson.id}
                          className={cn(
                            "flex items-center justify-between p-3 rounded-xl transition-all border",
                            activeLessonIndex === idx 
                              ? "bg-zinc-900 border-zinc-700/80 shadow-md"
                              : "bg-transparent border-transparent hover:bg-zinc-900/40"
                          )}
                        >
                          <div 
                            onClick={() => { setActiveLessonIndex(idx); setIsPlaying(false); }}
                            className="flex items-center gap-3 cursor-pointer flex-1"
                          >
                            <span className={cn(
                              "w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0",
                              activeLessonIndex === idx ? "bg-amber-500 text-black" : "bg-white/5 text-zinc-400"
                            )}>
                              {idx + 1}
                            </span>
                            <div className="text-left">
                              <p className={cn("text-xs font-bold leading-tight uppercase", activeLessonIndex === idx ? "text-white" : "text-zinc-400")}>
                                {lesson.title}
                              </p>
                              <span className="text-[9px] text-zinc-600 font-mono tracking-tighter">{lesson.duration}</span>
                            </div>
                          </div>

                          <button 
                            onClick={() => handleLessonToggle(currentPlayingCourse.id, lesson.id)}
                            className={cn(
                              "w-6 h-6 rounded-full flex items-center justify-center border transition-all shrink-0",
                              lesson.completed 
                                ? "bg-emerald-500 border-emerald-400 text-black shadow-[0_0_8px_rgba(16,185,129,0.3)]" 
                                : "bg-transparent border-zinc-800 text-zinc-600 hover:border-zinc-700"
                            )}
                          >
                            {lesson.completed && <Check size={12} className="stroke-[3]" />}
                          </button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Interactive Quiz container */}
                  <Card className="bg-[#0c0c10] border-white/5">
                     <CardHeader className="border-b border-white/5 pb-4 bg-white/[0.01]">
                        <div className="flex items-center justify-between">
                           <CardTitle className="text-xs font-black text-white uppercase tracking-widest italic flex items-center gap-2">
                              <Sparkles size={14} className="text-amber-500" /> Teste de Proficiência
                           </CardTitle>
                           <Badge variant="outline" className="border-white/10 text-[9px] font-black uppercase text-zinc-500">
                             DHO Avalia
                           </Badge>
                        </div>
                     </CardHeader>
                     <CardContent className="p-6 space-y-4">
                       <h4 className="text-sm font-bold text-zinc-300 leading-normal">
                         {currentPlayingCourse.quiz.question}
                       </h4>

                       <div className="space-y-2 mt-2">
                         {currentPlayingCourse.quiz.options.map((option, oIdx) => (
                           <button
                             key={oIdx}
                             disabled={quizSubmitted}
                             onClick={() => setUserSelectedOption(oIdx)}
                             className={cn(
                               "w-full text-left p-3.5 rounded-xl border text-xs font-bold transition-all leading-relaxed",
                               userSelectedOption === oIdx
                                 ? "bg-amber-600/10 border-amber-500 text-white"
                                 : "bg-black/50 border-white/5 text-zinc-400 hover:bg-zinc-900/60 hover:text-white",
                               quizSubmitted && oIdx === currentPlayingCourse.quiz.correctIndex
                                 ? "bg-emerald-950/40 border-emerald-500/80 text-emerald-400"
                                 : "",
                               quizSubmitted && userSelectedOption === oIdx && oIdx !== currentPlayingCourse.quiz.correctIndex
                                 ? "bg-rose-950/40 border-rose-500/80 text-rose-400"
                                 : ""
                             )}
                           >
                             <div className="flex gap-3">
                               <span className="font-mono mt-0.5 font-black uppercase tracking-tight">{String.fromCharCode(65 + oIdx)}.</span>
                               <span>{option}</span>
                             </div>
                           </button>
                         ))}
                       </div>

                       {/* Feedbacks of correct or wrong choices */}
                       {quizSubmitted && (
                         <motion.div 
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           className={cn(
                             "p-4 rounded-xl border space-y-2 text-left",
                             quizScore === 100 
                               ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-300"
                               : "bg-rose-950/20 border-rose-500/20 text-rose-300"
                           )}
                         >
                            <div className="flex items-center gap-2 font-black uppercase text-[10px] tracking-widest italic leading-none">
                               {quizScore === 100 ? (
                                 <><CheckCircle2 size={14} className="text-emerald-500" /> APROVADO (+{currentPlayingCourse.xp} XP!)</>
                               ) : (
                                 <><AlertTriangle size={14} className="text-rose-500" /> TENTE NOVAMENTE</>
                               )}
                            </div>
                            <p className="text-xs leading-normal font-medium text-zinc-300">
                               {currentPlayingCourse.quiz.explanation}
                            </p>
                         </motion.div>
                       )}

                       {/* Quiz Actions */}
                       <div className="flex gap-3 pt-2">
                         {!quizSubmitted ? (
                           <Button 
                             disabled={userSelectedOption === null}
                             onClick={handleQuizSubmit}
                             className="w-full bg-amber-500 hover:bg-amber-600 text-black hover:text-black font-black text-xs uppercase tracking-widest h-12"
                           >
                              Enviar Resposta
                           </Button>
                         ) : (
                           <Button 
                             onClick={handleResetQuiz}
                             variant="outline"
                             className="w-full border-white/5 text-zinc-400 hover:text-white h-12 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2"
                           >
                              <RotateCcw size={14} /> Refazer Teste
                           </Button>
                         )}
                       </div>
                     </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>

        {/* 2. RECURSOS HUMANOS / AVALIAÇÃO DO SUPERVISOR NO CHÃO */}
        <TabsContent value="certifica" className="mt-0 outline-none space-y-8">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Floor evaluation manual Form */}
              <div className="lg:col-span-7">
                 <Card className="bg-[#0c0c10] border-white/5 p-6 md:p-8 space-y-6">
                    <div className="space-y-1.5 border-b border-white/5 pb-4">
                       <h3 className="text-lg font-black text-white uppercase italic tracking-tighter">
                          Ficha de Avaliação Prática no Chão de Fábrica
                       </h3>
                       <p className="text-[10px] font-bold text-zinc-550 uppercase">
                          RH MESH INDUSTRIAL // VERIFICAÇÃO DE HABILIDADE REAL-TIME
                       </p>
                    </div>

                    <form onSubmit={handleCreateEvaluation} className="space-y-6 text-left">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Supervisor Avaliador (Líder/RH)</label>
                             <Input 
                                value={supervisorName}
                                onChange={(e) => setSupervisorName(e.target.value)}
                                className="bg-black border-white/5 text-xs text-white uppercase font-bold" 
                                placeholder="E.G. ADAMS LEANDRO" 
                             />
                          </div>
                          
                          <div className="space-y-2">
                             <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Colaborador Candidato</label>
                             <select
                                value={candidateName}
                                onChange={(e) => setCandidateName(e.target.value)}
                                className="w-full h-10 px-3 rounded-lg bg-black border border-white/5 text-xs text-white uppercase font-bold"
                             >
                                <option value="Bruno Alves">Bruno Alves (Corte CNC)</option>
                                <option value="Marcos Paulo">Marcos Paulo (Montador)</option>
                                <option value="Eduardo Souza">Eduardo Souza (Serralheiro)</option>
                                <option value="Ricardo Melo">Ricardo Melo (Eletricista)</option>
                                <option value="Sueli Rocha">Sueli Rocha (Pintora)</option>
                             </select>
                          </div>
                       </div>

                       <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500 font-bold">Setor Operativo Avaliado</label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                             {[
                               { id: 'corte', label: 'Corte (CNC/Laser)' },
                               { id: 'montagem', label: 'CV Montagem' },
                               { id: 'eletrica', label: 'Elétrica LED' },
                               { id: 'pintura', label: 'Pintura Especial' },
                               { id: 'solda', label: 'Serralheria / Solda' }
                             ].map((sec) => (
                               <button
                                 key={sec.id}
                                 type="button"
                                 onClick={() => setEvaluationSector(sec.id)}
                                 className={cn(
                                   "py-3 rounded-xl border text-[10px] uppercase font-black transition-all",
                                   evaluationSector === sec.id
                                     ? "bg-amber-600/20 border-amber-500 text-amber-400"
                                     : "bg-black/40 border-white/5 text-zinc-400 hover:text-white"
                                 )}
                               >
                                 {sec.label}
                               </button>
                             ))}
                          </div>
                       </div>

                       {/* Evaluation Criteria Sliders */}
                       <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-4">
                          <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest italic pb-2 border-b border-white/5">Critérios de Avaliação Prática (1 a 5 estrelas)</h4>
                          
                          <div className="space-y-4">
                             {[
                               { id: 'c1', label: 'Precisão e Velocidade de Execução', val: criteria1, setter: setCriteria1, desc: 'Capacidade de configurar o ferramental e entregar as peças com corte/dobra dentro das quotas indicadas no DWG.' },
                               { id: 'c2', label: 'Organização do Posto e Desperdício', val: criteria2, setter: setCriteria2, desc: 'Aproveitamento correto das sobras e capricho na separação metálica residual do setor de visual.' },
                               { id: 'c3', label: 'Compliance de EPI e Segurança NR', val: criteria3, setter: setCriteria3, desc: 'Uso obrigatório de óculos de proteção solar/técnica, botas, luvas e conformidade geral das normas regulamentadoras.' }
                             ].map((crit) => (
                               <div key={crit.id} className="space-y-2">
                                  <div className="flex justify-between items-center text-[10px] font-black uppercase">
                                     <span className="text-zinc-300">{crit.label}</span>
                                     <span className="text-amber-500 font-mono">{crit.val} / 5</span>
                                  </div>
                                  <div className="flex items-center gap-4">
                                     <input 
                                       type="range" 
                                       min="1" 
                                       max="5" 
                                       value={crit.val} 
                                       onChange={(e) => crit.setter(Number(e.target.value))}
                                       className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500" 
                                     />
                                  </div>
                                  <p className="text-[10px] text-zinc-555 text-zinc-650 font-medium leading-none mt-1">{crit.desc}</p>
                               </div>
                             ))}
                          </div>
                       </div>

                       <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Observações de Campo do Supervisor</label>
                          <textarea 
                             value={evaluationNotes}
                             onChange={(e) => setEvaluationNotes(e.target.value)}
                             rows={3}
                             placeholder="Destaque pontos técnicos apurados na auditoria presencial nos painéis, fontes LED, de segurança ou acabamentos ..."
                             className="w-full text-xs font-bold uppercase p-3 rounded-xl bg-black border border-white/5 text-white active:border-zinc-700 focus:border-zinc-700 outline-none"
                          />
                       </div>

                       <div className="pt-2">
                          <Button 
                            type="submit"
                            className="bg-amber-600 hover:bg-amber-500 text-black font-black text-xs uppercase tracking-widest h-12 w-full shadow-lg transition-all flex items-center justify-center gap-2"
                          >
                             <Award size={16} /> Emitir Certificação e Atualizar Matriz do RH
                          </Button>
                       </div>
                    </form>
                 </Card>
              </div>

              {/* Display generated Certificates */}
              <div className="lg:col-span-5 space-y-6 text-left">
                 <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest italic pl-2">Certificações de Equipe Ativas</h3>
                 
                 <div className="space-y-4">
                    {customCertificates.map((cert) => (
                      <Card key={cert.id} className="bg-gradient-to-br from-zinc-950 to-[#0e0e14] border-amber-500/10 overflow-hidden relative group">
                         {/* Watermark Diploma */}
                         <div className="absolute top-0 right-0 p-8 opacity-5 text-white pointer-events-none">
                            <DiplomaIcon size={120} />
                         </div>
                         <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />
                         
                         <CardContent className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                               <div>
                                  <Badge className="bg-amber-500 text-amber-950 font-black text-[8px] uppercase tracking-widest px-2 shadow-sm border-0 mb-2">CERTIFICADO OFICIAL</Badge>
                                  <h4 className="text-lg font-black text-white uppercase italic tracking-tighter">{cert.candidate}</h4>
                                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight">{cert.sector}</p>
                               </div>
                               <div className="text-right">
                                  <p className="text-[9px] font-black text-zinc-650 uppercase">Competência</p>
                                  <p className="text-2xl font-black text-amber-500 italic font-mono leading-none mt-1">{cert.score}%</p>
                               </div>
                            </div>

                            <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-650 pt-4 border-t border-white/5 tracking-wider">
                               <span>Resp: <strong className="text-zinc-400">{cert.supervisor}</strong></span>
                               <span>Emitido em {cert.date}</span>
                            </div>
                         </CardContent>
                      </Card>
                    ))}
                 </div>
              </div>
           </div>
        </TabsContent>

        {/* 3. CLASSIFICAÇÕES & LEADERBOARD HALL OF FAMERS */}
        <TabsContent value="badges" className="mt-0 outline-none space-y-6">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
              {/* Leaderboard stats */}
              <div className="lg:col-span-8">
                 <Card className="bg-[#0c0c10] border-white/5 overflow-hidden">
                    <CardHeader className="border-b border-white/5 pb-4 bg-white/[0.01]">
                       <div className="flex justify-between items-center">
                          <div>
                             <CardTitle className="text-xs font-black text-white uppercase tracking-[0.2em] italic">Ranqueamento de Produtividade Técnica</CardTitle>
                             <CardDescription className="text-[9px] font-bold text-zinc-500 uppercase mt-1">Ranking atualizado de pontuações de DHO baseada em quizzes e certificações de chão</CardDescription>
                          </div>
                          <Crown className="text-amber-500 animate-bounce" size={20} />
                       </div>
                    </CardHeader>
                    <CardContent className="p-0">
                       <div className="divide-y divide-white/5">
                          {LEADERBOARD_TRAINEES.map((user, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 md:px-8 hover:bg-white/[0.01] transition-colors">
                               <div className="flex items-center gap-4">
                                  <span className={cn(
                                    "w-7 h-7 rounded-full flex items-center justify-center font-black text-sm italic font-mono shrink-0",
                                    idx === 0 ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20" :
                                    idx === 1 ? "bg-zinc-300 text-zinc-950" :
                                    idx === 2 ? "bg-amber-800 text-amber-100" : "bg-zinc-900 text-zinc-500"
                                  )}>
                                     {idx + 1}
                                  </span>

                                  <div className="flex items-center gap-3">
                                     <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white border border-white/10 overflow-hidden font-bold">
                                        <img src={`https://i.pravatar.cc/100?u=trainee-${user.avatar}`} alt={user.name} referrerPolicy="no-referrer" />
                                     </div>
                                     <div>
                                        <p className="text-xs font-black text-white uppercase italic">{user.name}</p>
                                        <p className="text-[9px] font-bold text-zinc-650 uppercase tracking-widest">{user.sector}</p>
                                     </div>
                                  </div>
                               </div>

                               <div className="text-right">
                                  <div className="flex items-center gap-2 justify-end">
                                     <Zap size={13} className="text-amber-500" />
                                     <span className="text-xs font-black text-white font-mono italic">{user.xp} XP</span>
                                  </div>
                                  <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Nível Técnico {Math.floor(user.xp / 1000) + 1}</span>
                               </div>
                            </div>
                          ))}
                       </div>
                    </CardContent>
                 </Card>
              </div>

              {/* gamification goals panel */}
              <div className="lg:col-span-4 space-y-6">
                 <Card className="bg-[#0c0c10] border-white/5 p-6 space-y-6">
                    <h4 className="text-lg font-black text-white uppercase italic tracking-tighter border-b border-white/5 pb-3">Objetivos Ativos de Time</h4>
                    
                    <div className="space-y-5">
                       {[
                         { title: 'Corte Limpo Sem Rebarba', val: 75, detail: 'Completar 4 quizzes de Corte', color: 'indigo' },
                         { title: 'Telas sem sombras (LED/Neon)', val: 25, detail: '1 Certificação com nota acima de 90%', color: 'amber' },
                         { title: 'Tolerância Térmica Zero (Solda)', val: 100, detail: 'Cumpra todas as NRs exigíveis', color: 'emerald' }
                       ].map((item, i) => (
                         <div key={i} className="space-y-2">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase">
                               <span className="text-zinc-300">{item.title}</span>
                               <span className="text-zinc-500 font-mono">{item.val}%</span>
                            </div>
                            <Progress value={item.val} className="h-1.5 bg-white/5" />
                            <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider">{item.detail}</p>
                         </div>
                       ))}
                    </div>
                 </Card>

                 {/* Challenge badge of visual design excellence */}
                 <Card className="bg-amber-600 border-0 p-8 rounded-2xl text-orange-950 relative overflow-hidden group shadow-lg">
                    <div className="absolute top-0 right-0 p-8 opacity-15"><Maximize2 size={80} className="text-white" /></div>
                    <div className="relative z-10 space-y-4">
                       <div className="flex items-center gap-2 text-white text-[10px] font-black tracking-[0.3em] uppercase">
                          <Crown size={14} className="animate-spin" /> DESAFIO ATIVO
                       </div>
                       <h4 className="text-xl font-black text-white italic uppercase tracking-tighter leading-tight">Mestre das Letras Inox 3D</h4>
                       <p className="text-xs text-amber-100 leading-relaxed font-bold uppercase tracking-wide">
                          Complete a avaliação prática da Soldagem TIG de Alta Precisão e destrave o kit de canetas térmicas industriais.
                       </p>
                    </div>
                 </Card>
              </div>
           </div>
        </TabsContent>

        {/* 4. NR COMPLIANCE OBRIGATÓRIOS */}
        <TabsContent value="cursos-grade" className="mt-0 outline-none space-y-6 text-left">
           <Card className="bg-[#0c0c10] border-white/5 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-6">
                 <div>
                    <h3 className="text-lg font-black text-white uppercase italic tracking-tighter">Normas Regulamentadoras Obrigatórias (NRs)</h3>
                    <p className="text-[9px] font-bold text-zinc-500 uppercase mt-1">Sincronização de segurança de saúde ocupacional na comunicação visual</p>
                 </div>
                 <Badge className="bg-rose-600 text-white font-extrabold uppercase text-[8.5px] px-3 border-0 py-1 tracking-widest animate-pulse h-6">
                    AUDITORIA PERIÓDICA ATIVA
                 </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {[
                   { nr: 'NR-35', label: 'Trabalho em Altura', status: 'Obrigatório para Montagem', desc: 'Regras de segurança obrigatórias para operadores de plataformas de lançamento, andaimes, içamentos de letreiros e montagens externas de grande escala.', color: 'border-blue-500/20 bg-blue-500/5 text-blue-400' },
                   { nr: 'NR-10', label: 'Eletricidade & Luminosos', status: 'Obrigatório para Elétrica', desc: 'Certificação exigida para toda equipe responsável em conectar fontes chaveadas, fiação, barramento elétrico geral e energizar fachadas e letreiros no campo comercial.', color: 'border-amber-500/20 bg-amber-500/5 text-amber-400' },
                   { nr: 'NR-06', label: 'Uso Correto de EPI Industrial', status: 'Obrigatório para todos os setores', desc: 'Instruções para o uso impecável de máscaras faciais contra vapores PU e pó de acrílico/MDF, óculos anti-raios de solda/laser, protetores auriculares robustos no chão de fábrica.', color: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400' }
                 ].map((nrNode, idx) => (
                   <Card key={idx} className="bg-zinc-950 border-white/5 p-6 space-y-4">
                      <div className="flex items-center justify-between">
                         <span className="text-2xl font-black text-white italic font-mono leading-none">{nrNode.nr}</span>
                         <Badge variant="outline" className={cn("border-0 text-[8px] font-black uppercase shadow-xs px-2.5 h-6", nrNode.color)}>
                            {nrNode.status}
                         </Badge>
                      </div>
                      <h4 className="text-sm font-black text-zinc-300 uppercase italic tracking-wide">{nrNode.label}</h4>
                      <p className="text-xs text-zinc-500 leading-normal font-medium">{nrNode.desc}</p>
                      
                      <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                         <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                            <CheckCircle2 size={12} /> Exigência em Dia
                         </span>
                         <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase text-zinc-400 hover:text-white px-0">Ver Portaria</Button>
                      </div>
                   </Card>
                 ))}
              </div>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
