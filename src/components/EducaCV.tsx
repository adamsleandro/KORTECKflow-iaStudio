import React, { useState, useEffect } from 'react';
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
  youtubeUrl?: string;
}

interface Course {
  id: string;
  title: string;
  sector: 'comunicacao-visual' | 'impressao-digital' | 'impressao-3d';
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

// Complete industry list of Courses (15 Courses total, 5 per sector)
const VISUAL_COMMUNICATION_COURSES: Course[] = [
  // ==================== COMUNICAÇÃO VISUAL (5 Cursos) ====================
  {
    id: 'cv-router-cnc',
    title: 'Nesting Avançado e Operação de Router CNC',
    sector: 'comunicacao-visual',
    level: 'Especialista',
    time: '12h',
    xp: 450,
    desc: 'Otimização máxima de facas, trajetos de corte e arranjos automáticos em chapas de ACM, acrílico e PVC expandido para reduzir sucatas para menos de 5%.',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
    progress: 75,
    lessons: [
      { id: '1', title: 'Fundamentos de Nesting em Software CAM', duration: '25 min', completed: true },
      { id: '2', title: 'Configuração de Pontes e Junções Técnicas', duration: '40 min', completed: true },
      { id: '3', title: 'Fatores de Tolerância e Resfriamento de ACM', duration: '35 min', completed: true },
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
    id: 'cv-montagem-acm',
    title: 'Dobra, Vinco e Estruturação de Fachadas ACM',
    sector: 'comunicacao-visual',
    level: 'Avançado',
    time: '15h',
    xp: 600,
    desc: 'Uso correto de fresas V-Groove de 90° e 135°, calandra e curvaturas estruturais, cálculo de juntas de dilatação e vedações de poliuretano (PU) na montagem externa.',
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
    id: 'cv-solda-metalon',
    title: 'Serralheria e Soldagem MIG/TIG para Painéis',
    sector: 'comunicacao-visual',
    level: 'Avançado',
    time: '16h',
    xp: 500,
    desc: 'Dimensionamento e esquadro de metalon para letras caixa e painéis robustos. Técnicas e ponteamentos intercalados para evitar o empenamento térmico de perfis finos.',
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=600',
    progress: 0,
    lessons: [
      { id: '1', title: 'Corte de Perfis de Metalon em Meia-Esquadria', duration: '30 min', completed: false },
      { id: '2', title: 'Ajuste de Amperagem da Tocha MIG/MAG', duration: '40 min', completed: false },
      { id: '3', title: 'Evitando Deformações por Ponteamento Espacial', duration: '35 min', completed: false },
      { id: '4', title: 'Acabamento de Cordões de Solda com Flap', duration: '25 min', completed: false }
    ],
    quiz: {
      question: 'Qual técnica de soldagem é recomendada para atenuar o empenamento térmico em estruturas leves de metalon?',
      options: [
        'Realizar um único cordão contínuo e rápido com potência máxima.',
        'Fazer ponteamento intercalado estático, deixando a estrutura resfriar antes de fechar os cordões.',
        'Refrescar a solda imediatamente jogando água gelada sob pressão.',
        'Soldar no sentido das extremidades para o centro direto.'
      ],
      correctIndex: 1,
      explanation: 'O ponteamento intercalado distribui o aporte de calor de forma homogênea, reduzindo as tensões internas de contração mecânica das chapas e mantendo o esquadro perfeito.'
    }
  },
  {
    id: 'cv-instalacao-comercial',
    title: 'Instalação de Fachadas e Ancoragem Química',
    sector: 'comunicacao-visual',
    level: 'Especialista',
    time: '10h',
    xp: 400,
    desc: 'Fixação segura de fachadas de grande porte, manuseio de parabolts de impacto, químicos de ancoragem epóxi e cálculo de resistência contra ventos na comunicação visual exterior.',
    img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600',
    progress: 0,
    lessons: [
      { id: '1', title: 'Análise de Prumo, Nível e Gabaritos de Fachada', duration: '25 min', completed: false },
      { id: '2', title: 'Parabolts Mecânicos vs. Ancoragem Epóxi Química', duration: '40 min', completed: false },
      { id: '3', title: 'Requisitos de Segurança em Altura (NR-35)', duration: '45 min', completed: false }
    ],
    quiz: {
      question: 'Em quais condições superficiais a ancoragem química por ampola de vinil é recomendada em detrimento ao chumbador mecânico tradicional?',
      options: [
        'Em superfícies plásticas leves que requerem parafusos autorroscantes comuns.',
        'Em bases porosas, alvenaria oca ou concreto de baixa dureza, pois distribui a força de adesão na parede interna do furo por adesão química.',
        'Em gesso cartonado comum para fixação de quadros internos leves.',
        'Em chapas finas de alumínio ACM.'
      ],
      correctIndex: 1,
      explanation: 'A ancoragem química injetável ou por ampola preenche vazios em blocos ocos e adere quimicamente ao concreto sem gerar forças de expansão mecânica que poderiam estourar ou trincar bases fracas e porosas.'
    }
  },
  {
    id: 'cv-letras-led',
    title: 'Letra Caixa Premium, Iluminação LED e Neon Flex',
    sector: 'comunicacao-visual',
    level: 'Intermediador',
    time: '8h',
    xp: 350,
    desc: 'Montagem de caixas tridimensionais, soldagem invisível de acrílicos, colagem de fitas de Neon LED flexíveis e dimensionamento elétrico de fontes chaveadas 12V e 24V.',
    img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=600',
    progress: 0,
    lessons: [
      { id: '1', title: 'Corte e Dobra de Acrílico Cristal em Soprador Térmico', duration: '20 min', completed: false },
      { id: '2', title: 'Soldagem Química Molecular de Peças Acrílicas', duration: '30 min', completed: false },
      { id: '3', title: 'Dimensionamento Elétrico e Margem Protetiva de Fontes LED', duration: '35 min', completed: false }
    ],
    quiz: {
      question: 'Qual o adesivo ideal para a união de acrílico cristal que promove uma solda química de fusão molecular pura, sem bolhas?',
      options: [
        'Cola de cianoacrilato comum.',
        'Fita adesiva dupla face transparente comum.',
        'Adesivo monômero por polimerização (solvente clorofórmio estabilizado).',
        'Silicone acético comum.'
      ],
      correctIndex: 2,
      explanation: 'O adesivo monômero à base de solvente dissolve temporariamente a superfície do acrílico. Ao secar, as duas partes se unem de maneira monolítica em fusão molecular límpida e resistente.'
    }
  },

  // ==================== IMPRESSÃO DIGITAL (5 Cursos) ====================
  {
    id: 'id-operacao-plotter',
    title: 'Operação e Calibração de Plotters Eco-Solvente',
    sector: 'impressao-digital',
    level: 'Iniciante',
    time: '8h',
    xp: 300,
    desc: 'Alinhamento milimétrico de cabeças de impressão piezoelétricas, calibração dinâmica do passo de avanço de mídia para eliminar bandeamentos, e carregamento de perfis de materiais.',
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600',
    progress: 0,
    lessons: [
      { id: '1', title: 'Limpeza de Wipers, Capping Station e Cabeças de Impressão', duration: '30 min', completed: false },
      { id: '2', title: 'Teste de Nozzles e Ajuste Bi-Direcional Cruzado', duration: '35 min', completed: false },
      { id: '3', title: 'Resolução de Banding por Correção de Step da Mídia', duration: '40 min', completed: false }
    ],
    quiz: {
      question: 'O que caracteriza o defeito conhecido como "Banding" na impressão digital e qual sua principal causa eletrônica/mecânica?',
      options: [
        'É a variação térmica na estufa de secagem rápida do vinil adesivo.',
        'São linhas horizontais claras ou escuras paralelas no sentido da impressão, causadas pelo avanço de mídia descalibrado ou bicos entupidos na cabeça de impressão.',
        'É o deslocamento de cores primárias CMYK nas bordas da lona.',
        'É o enrugamento físico por excesso de tração elástica da mídia.'
      ],
      correctIndex: 1,
      explanation: 'O banding ocorre quando o avanço do rolo de mídia não está perfeitamente sincronizado com o deslocamento do carro, ou por bicos da cabeça sem disparar jato (nozzles obstruídos), gerando marcas no impresso.'
    }
  },
  {
    id: 'id-impressao-uv',
    title: 'Impressão Direta UV e UV Gel em Substratos Rígidos',
    sector: 'impressao-digital',
    level: 'Intermediador',
    time: '10h',
    xp: 380,
    desc: 'Operação de impressoras de mesa plana (Flatbed) para impressão direta em chapas de PVC, MDF e acrílico. Configurações de branco localizado, máscaras de verniz epóxi e cura por LED UV.',
    img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=600',
    progress: 0,
    lessons: [
      { id: '1', title: 'Diferenças de Cura por Lâmpadas de Mercúrio vs. LED UV', duration: '25 min', completed: false },
      { id: '2', title: 'Promotores de Adesão (Primer) para Vidro e Metais Rígidos', duration: '35 min', completed: false },
      { id: '3', title: 'Geração de Camada de Fundo Branco Sombreado em Arquivos de Arte', duration: '45 min', completed: false }
    ],
    quiz: {
      question: 'Qual é o papel fundamental dos promotores de adesão (primers) na impressão digital direta por cura UV sobre materiais inorgânicos lisos como vidro ou aço?',
      options: [
        'Acelerar a velocidade de deslocamento horizontal do carro de impressão.',
        'Aumentar o brilho final do verniz protetor.',
        'Gerar afinidade química entre as tintas acriladas da cura UV e a superfície inerte do substrato, evitando descascamentos ao toque.',
        'Diminuir a densidade de tinta por centímetro quadrado.'
      ],
      correctIndex: 2,
      explanation: 'O primer em superfícies sem porosidade, como vidro e metal, faz uma ponte química que permite à tinta acrílica curada por radiação ultravioleta fixar-se sem se soltar com facilidade por abrasão ou umidade.'
    }
  },
  {
    id: 'id-laminacao-refile',
    title: 'Acabamento, Refile de Precisão e Laminação',
    sector: 'impressao-digital',
    level: 'Iniciante',
    time: '6h',
    xp: 250,
    desc: 'Técnicas de laminação de proteção contra raios solares UV e arranhões, prevenção de bolhas físicas e refile em mesa de corte pneumática para banners e adesivos.',
    img: 'https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?auto=format&fit=crop&q=80&w=600',
    progress: 0,
    lessons: [
      { id: '1', title: 'Ajuste de Pressão de Rolos em Laminadoras Industriais', duration: '20 min', completed: false },
      { id: '2', title: 'Técnicas de Laminação a Frio vs. Laminação Térmica', duration: '30 min', completed: false },
      { id: '3', title: 'Solda Eletrônica de Bainhas com Ar Quente para Banners', duration: '40 min', completed: false }
    ],
    quiz: {
      question: 'Como evitar o surgimento de rugas e a inclusão indesejada de bolhas de ar ao aplicar um vinil de laminação transparente em plotagens de comunicação visual de grande formato?',
      options: [
        'Aumentar a temperatura do aquecedor para mais de 150°C instantaneamente.',
        'Aplicar álcool líquido abundante sobre o adesivo e rolo.',
        'Garantir paralelismo mecânico e ajuste correto de pressão igualitária nos eixos de rotação da calandra laminadora, mantendo a película sob tração suave.',
        'Utilizar uma espátula de feltro em movimentos circulares rápidos sem firmeza.'
      ],
      correctIndex: 2,
      explanation: 'A perfeita regulagem de pressão nas bordas dos cilindros de laminação, associada a uma tração uniforme na saída do rolo de revestimento, impede o engrupamento localizado da película adesiva.'
    }
  },
  {
    id: 'id-envelopamento-veicular',
    title: 'Envelopamento Automotivo e Aplicação de Vinil',
    sector: 'impressao-digital',
    level: 'Avançado',
    time: '14h',
    xp: 550,
    desc: 'Técnicas profissionais de envelopamento de veículos. Uso regulado do soprador térmico, eliminação de memória elástica de películas de vinil fundido, e cortes seguros com fitas Knifeless de precisão.',
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600',
    progress: 0,
    lessons: [
      { id: '1', title: 'Características de Películas de Vinil: Calandrado Monomérico, Polimérico vs. Cast', duration: '35 min', completed: false },
      { id: '2', title: 'Tratamento de Curvaturas Profundas e Ponto de Quebra de Memória Térmica', duration: '40 min', completed: false },
      { id: '3', title: 'Uso de Fitas Adesivas de Corte Knifeless para Preservar Pinturas Originais', duration: '45 min', completed: false }
    ],
    quiz: {
      question: 'Qual o procedimento físico obrigatório para garantir que películas adesivas do tipo Cast revestidas em curvas complexas de lataria veicular não sofram retração e levantem nas canaletas com o tempo?',
      options: [
        'Molhar as canaletas com querosene antes da aplicação de vinis.',
        'Realizar pós-aquecimento uniforme utilizando termômetro infravermelho de controle, alcançando de 85°C a 95°C para quebrar a memória molecular do filme estrutural.',
        'Esticar o material ao máximo em temperatura ambiente sem aquecimento.',
        'Aplicar adesivo instantâneo de contato em toda a extensão do parachoques.'
      ],
      correctIndex: 1,
      explanation: 'Vinis moldáveis necessitam alcançar a temperatura crítica de pós-aquecimento (geralmente entre 85°C e 95°C, conforme marca). Esse calor altera definitivamente a disposição molecular do polímero, fixando o novo formato e evitando forças de retração mecânica.'
    }
  },
  {
    id: 'id-gerenciamento-cores',
    title: 'Gerenciamento de Cores e Perfis ICC',
    sector: 'impressao-digital',
    level: 'Especialista',
    time: '12h',
    xp: 500,
    desc: 'Criação de curvas de linearização para tintas corporativas, calibração contra escalas de tons Pantone com auxílio de espectrofotômetro, e ajuste de limites físicos de tinta no software RIP.',
    img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=600',
    progress: 0,
    lessons: [
      { id: '1', title: 'Fundamentos de Espectrofotometria e Cores L*a*b* na Indústria', duration: '40 min', completed: false },
      { id: '2', title: 'Linearização Física de Cabeças de Plotters de Impressão', duration: '50 min', completed: false },
      { id: '3', title: 'Construção de Perfis de Cores ICC com Alvos de Teste IT8/9.7', duration: '45 min', completed: false }
    ],
    quiz: {
      question: 'No gerenciamento de cores industrial, qual a principal diferença de atuação conceitual entre a etapa de "Linearização" e a criação do "Perfil de Cor (ICC)" de um material no software RIP?',
      options: [
        'A linearização é feita apenas para mídias brilhosas; o perfil é exclusivo para envelopamentos foscos.',
        'A linearização calibra a resposta física da passagem gradual de densidade de tinta em escalas de cinza de 0 a 100%; o perfil mapeia estatisticamente as gamas cromáticas máximas para prever a correspondência exata de tons de cor.',
        'A linearização altera a velocidade física do motor do carro; o perfil mexe na viscosidade química solvente da cor preta.',
        'Ambos se referem precisamente à mesma função, e mudar os parâmetros de um não afeta as propriedades mecânicas do outro.'
      ],
      correctIndex: 1,
      explanation: 'A linearização garante que incrementos eletrônicos de 10% na lona reflitam fisicamente 10% de cobertura linear homogênea. Já o perfil de cor traduz matematicamente o gamut cromático limite do papel combinado com essa lona específica.'
    }
  },

  // ==================== IMPRESSÃO 3D (5 Cursos) ====================
  {
    id: 'i3d-modelagem-fatiamento',
    title: 'Fatiamento e Configuração no Cura/PrusaSlicer',
    sector: 'impressao-3d',
    level: 'Iniciante',
    time: '8h',
    xp: 300,
    desc: 'Controle de parâmetros chaves de fatiamento: altura de camadas, porcentagem do miolo de infill, velocidade linear, ventiladores de resfriamento e suportes inteligentes.',
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600',
    progress: 0,
    lessons: [
      { id: '1', title: 'Fundamentos de Fatiadores: Cura vs PrusaSlicer vs Bambu Studio', duration: '25 min', completed: false },
      { id: '2', title: 'Cálculo de Infill: Padrões Reticular, Giroide e Cúbico 3D', duration: '35 min', completed: false },
      { id: '3', title: 'Parâmetros de Retração no Bico para Prevenir Delaminação e Fiapos (Stringing)', duration: '40 min', completed: false }
    ],
    quiz: {
      question: 'Por que o padrão de preenchimento mecânico "Giroide" (Gyroid) é altamente elogiado em peças estruturais submetidas a esforços tridimensionais constantes?',
      options: [
        'Por ser o modelo que consome mais filamentos, resultando em peças pesadas nativamente.',
        'Por prover resistência mecânica isótropa multidirecional uniforme, com rápida transição rotativa sem sobreposição de linhas e com alta drenagem de calor dinâmico.',
        'Pois gasta menos da metade de energia da mesa aquecida.',
        'Por extinguir de forma nativa e sem ventiladores o defeito de banding horizontal na impressora.'
      ],
      correctIndex: 1,
      explanation: 'O padrão Giroide apresenta curvas em relevos alternados tridimensionalmente. Diferente de grades lineares quadradas que são fortes apenas axialmente, o giroide suporta cargas incidentes diretas de todos os lados igualmente.'
    }
  },
  {
    id: 'i3d-calibracao-fdm',
    title: 'Impressão FDM: Calibração Mecânica e Extrusão',
    sector: 'impressao-3d',
    level: 'Intermediador',
    time: '10h',
    xp: 350,
    desc: 'Medições e calibração fina de motores de avanço de passos das polias, retificação mecânica de eixos lineares, configuração do sensor do Z-Offset da mesa de impressão.',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
    progress: 0,
    lessons: [
      { id: '1', title: 'Cálculo e Calibração Fina de E-Steps de Extrusoras Direct Drive e Bowden', duration: '30 min', completed: false },
      { id: '2', title: 'Nivelamento Manual com Folha de Calibração e Criação de Malhas ABL', duration: '40 min', completed: false },
      { id: '3', title: 'Retificação Física e Lubrificação dos Fusos Trapezoidais do Eixo Z', duration: '35 min', completed: false }
    ],
    quiz: {
      question: 'Qual o sintoma técnico visual que indica que a distância física do bico extrusor com relação à cama de impressão (Z-offset) está muito próxima na primeira camada de impressão?',
      options: [
        'O bico se move acima e a fita derretida voa de forma randômica ou flutua sem adesão básica à mesa.',
        'O filamento sai achatado de forma extrema e sem brilho, em canais semi-transparentes ou com estalos mecânicos audíveis da extrusora por contra-pressão insuportável no bloco de fusão.',
        'A ventoinha do cabeçote reduz sua rotação eletrônica em tempo de execução.',
        'O motor de passos do eixo horizontal Y trava bruscamente deixando marcas de queima de cor.'
      ],
      correctIndex: 1,
      explanation: 'Ao posicionar a saída do bico encostada em demasia, a abertura física para a saída do plástico derretido fica restrita. O material tenta escapar gerando canais transparentes muito esparros e forçando a extrusora física, que estala de forma nítida pulando dentes no arame de tração.'
    }
  },
  {
    id: 'i3d-resina-msla',
    title: 'Impressão MSLA/SLA em Resina: Segurança e Operação',
    sector: 'impressao-3d',
    level: 'Avançado',
    time: '12h',
    xp: 450,
    desc: 'Uso seguro de fotopolímeros reativos, calibração exata de tempo de exposição por camada sob telas LCD monocromáticas, e segurança sanitária contra vapores nocivos baseados em resinas orgânicas líquidas.',
    img: 'https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?auto=format&fit=crop&q=80&w=600',
    progress: 0,
    lessons: [
      { id: '1', title: 'Uso Rigoroso de EPIs: Máscaras de Carvão Ativo VOC, Luvas de Nitrila e Óculos UV', duration: '30 min', completed: false },
      { id: '2', title: 'Teste de Matriz de Validação de Exposição de Imagens de Padrão Micrométrico', duration: '35 min', completed: false },
      { id: '3', title: 'Prevenção de Trincas Internas por Orientação Física de Modelos Ocos em Software Slicer', duration: '40 min', completed: false }
    ],
    quiz: {
      question: 'Durante a lavagem de peças recém impressas em resina química MSLA, por que luvas de látex comuns devem ser severamente evitadas e substituídas por luvas de Nitrila de boa densidade?',
      options: [
        'Porque luvas de látex são caras no varejo médico comum.',
        'Porque monômeros acrilados ativos das resinas líquidas penetram facilmente atravessando a barreira molecular do látex fino em poucos minutos de exposição mecânica contínua, causando dermatites severas e alergias de contato de longo prazo.',
        'Porque o látex derrete a tela LCD monocromática em temperatura operacional fria.',
        'Pois mídias de nitrila aderem de forma estática às bordas de metal da mesa.'
      ],
      correctIndex: 1,
      explanation: 'Conforme literaturas de segurança química ocupacional de polímeros, resinas de impressão 3D permeiam a parede microporosa do látex, ao passo que as luvas de Nitrila oferecem resistência superior e duradoura aos monômeros perigosos.'
    }
  },
  {
    id: 'i3d-pos-processamento',
    title: 'Pós-Processamento e Acabamento de Peças 3D',
    sector: 'impressao-3d',
    level: 'Intermediador',
    time: '8h',
    xp: 300,
    desc: 'Sequenciamento seguro pós-impressão: banhos de diluição de resíduos com Álcool Isopropílico (IPA), cura UV complementar em câmaras de radiação, cura de filamentos em estufa de desumidificação, e técnicas de lixamento.',
    img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=600',
    progress: 0,
    lessons: [
      { id: '1', title: 'Ciclos Desumidificadores de Filamentos Higroscópicos (Nylon, PETG, TPU)', duration: '25 min', completed: false },
      { id: '2', title: 'Remoção sem Marcas de Suportes FDM por Banho Térmico e Alicates de Bico Curvo', duration: '35 min', completed: false },
      { id: '3', title: 'Aplicação de Primer PU, Massa Rápida e Polimento Molhado de Linhas de Camada', duration: '40 min', completed: false }
    ],
    quiz: {
      question: 'O Nylon é considerado um material de engenharia 3D com propriedades mecânicas extraordinárias operando sob desgaste, porém extremamente "higroscópico". Qual o comportamento do material e o procedimento de pré-impressão indicado?',
      options: [
        'É higroscópico pois derrete com luz solar. Deve-se resfriar o material a menos de 0°C antes de rodar.',
        'Ele atrai e absorve com extrema facilidade a umidade do ar ambiente. Deve ser desidratado em pequenas estufas térmicas por 6 a 12 horas a ~70°C antes de alimentar a impressora para evitar porosidades e sopros de vapor.',
        'Higroscopia se refere ao comportamento de repelir graxas industriais. Deve-se untar o fio com silicone para rodar.',
        'Indica que o filamento expande seu tamanho ao contato com o plástico ABS derretido.'
      ],
      correctIndex: 1,
      explanation: 'Filamentos hidrófilos como Nylon, PETG e PVA absorvem vapor de água molecular da atmosfera local. No bloco de aquecimento, a água ferve virando vapor e estourando na saída, gerando porosidades microcríticas e falhas na coesão de camadas.'
    }
  },
  {
    id: 'i3d-engenharia-reversa',
    title: 'Engenharia Reversa e Peças de Alta Resistência',
    sector: 'impressao-3d',
    level: 'Especialista',
    time: '14h',
    xp: 600,
    desc: 'Replicação científica de engrenagens, polias e protótipos mecânicos reais. Seleção estrutural de filamentos industriais de engenharia avançados (ABS, ASA, PETG e Nylon Carbon) com simulação extrema de esforços físicos.',
    img: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=600',
    progress: 0,
    lessons: [
      { id: '1', title: 'Análise de Peças Danificadas com Paquímetro Digital, Goniômetros e Raio de Curvaturas', duration: '40 min', completed: false },
      { id: '2', title: 'Modelagem CAD Inteligente com Tolerância Dinâmica nos Eixos de Ajustes', duration: '45 min', completed: false },
      { id: '3', title: 'Efeitos Climatológicos e Proteção UV Estendida por ASA e PETG', duration: '35 min', completed: false }
    ],
    quiz: {
      question: 'Ao projetar uma engrenagem mecânica de reposição industrial que ficará exposta à luz solar e intempéries externas constantes, qual material plástico polímero deve ser selecionado devido a sua resistência estendida no campo físico a raios UV e impactos?',
      options: [
        'PLA comum biodegradável básico.',
        'ASA (Acrilonitrila Estireno Acrilato), pois possui aditivação de elastômeros acrílicos que previnem o ressecamento, amarelamento e rachaduras por radiação ultravioleta.',
        'Resina de maquete clássica de cura rápida por luz fria.',
        'Filamento flexível tipo TPU de alta maciez.'
      ],
      correctIndex: 1,
      explanation: 'O filamento ASA destaca-se da família do ABS por contar com resistência extrema ao ultravioleta. Não perde rigidez mecânica ou racha ao tempo por exposição à chuva e calor agressivo de fachadas externas.'
    }
  }
];

export function EducaCV({ initialTab }: { initialTab?: string }) {
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // Load and persist courses locally inside Korteck Flow system
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('korteck_educa_courses');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Erro ao carregar cursos do localStorage:", e);
      }
    }
    return VISUAL_COMMUNICATION_COURSES;
  });

  const saveCourses = (newCourses: Course[]) => {
    setCourses(newCourses);
    localStorage.setItem('korteck_educa_courses', JSON.stringify(newCourses));
  };

  const [activeTab, setActiveTab] = useState('cursos');

  useEffect(() => {
    if (!initialTab) return;
    if (initialTab === 'edu-cursos') {
      setActiveTab('cursos');
    } else if (initialTab === 'edu-trein') {
      setActiveTab('cursos');
    } else if (initialTab === 'edu-cert') {
      setActiveTab('certifica');
    } else if (initialTab === 'edu-carreira') {
      setActiveTab('badges');
    }
  }, [initialTab]);

  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Immersive Lecture Mode / Player state
  const [currentPlayingCourse, setCurrentPlayingCourse] = useState<Course | null>(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userSelectedOption, setUserSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null); // null if not completed/failed, 100 if correct
  
  // Course/Quiz editing & AI state variables
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiSelectedLessonIndex, setAiSelectedLessonIndex] = useState<number>(0);

  // Local Training tracker & stats
  const [extraXP, setExtraXP] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  
  // Custom Certifications / Supervisor floor evaluation Form
  const [supervisorName, setSupervisorName] = useState('');
  const [candidateName, setCandidateName] = useState('Bruno Alves');
  const [evaluationSector, setEvaluationSector] = useState('comunicacao-visual');
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
      showNotification("Por favor, informe o nome do supervisor avaliador e o candidato antes de gerar a certificação.", "error");
      return;
    }
    
    const finalScore = Math.round(((criteria1 + criteria2 + criteria3) / 15) * 100);
    const newCert = {
      id: Math.random().toString(36).substr(2, 9),
      candidate: candidateName,
      sector: evaluationSector === 'comunicacao-visual' ? 'Comunicação Visual' :
              evaluationSector === 'impressao-digital' ? 'Impressão Digital' : 'Impressão 3D',
      score: finalScore,
      supervisor: supervisorName,
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    
    setCustomCertificates([newCert, ...customCertificates]);
    showNotification(`Certificado Técnico de Visualização emitido para ${candidateName}! Média final de competência avaliada de ${finalScore}%.`, "success");
    setSupervisorName('');
    setEvaluationNotes('');
  };

  const getSectorMeta = (sector: string) => {
    switch(sector) {
      case 'comunicacao-visual': return { label: 'Comunicação Visual', icon: <Layers size={14} />, color: 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' };
      case 'impressao-digital': return { label: 'Impressão Digital', icon: <Cpu size={14} />, color: 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20' };
      case 'impressao-3d': return { label: 'Impressão 3D', icon: <Sparkles size={14} />, color: 'bg-amber-600/10 text-amber-500 border border-amber-500/30' };
      default: return { label: 'Segurança Geral', icon: <Construction size={14} />, color: 'bg-zinc-600 text-zinc-100 border-none/20' };
    }
  };

  // YouTube video link to iframe converter
  const getYouTubeEmbedUrl = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0`;
    }
    return null;
  };

  // Filter logic based on editable courses array
  const filteredCourses = courses.filter(c => {
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

    // Save update inside courses list and sync localStorage
    const updatedCourses = courses.map(c => c.id === courseId ? updatedCourse : c);
    saveCourses(updatedCourses);
  };

  // Create empty course template for customization
  const handleCreateNewCourse = () => {
    const newId = 'treinamento-' + Math.random().toString(36).substr(2, 9);
    const blankCourse: Course = {
      id: newId,
      title: 'Novo Treinamento de Capacitação',
      sector: 'comunicacao-visual',
      level: 'Iniciante',
      time: '5h',
      xp: 200,
      desc: 'Descreva aqui os objetivos técnicos desse treinamento para a equipe...',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
      progress: 0,
      lessons: [
        { id: '1', title: 'Introdução e Normas do Setor', duration: '15 min', completed: false, youtubeUrl: '' }
      ],
      quiz: {
        question: 'Qual a principal prática de segurança industrial ao operar neste setor?',
        options: [
          'Usar corretamento os EPIs exigidos (como óculos, luvas e protetores).',
          'Limpar os maquinários apenas com o motor ainda rotacionando.',
          'Ignorar as sinalizações térmicas ou de bloqueio elétrico.',
          'Aumentar o ritmo de avanço sem calibragem de fusos ou fresas.'
        ],
        correctIndex: 0,
        explanation: 'A utilização rígida dos Equipamentos de Proteção Individual (EPI) é a maior barreira contra impactos de cavacos, choques elétricos ou riscos de corte no chão de fábrica.'
      }
    };
    
    setEditingCourse(blankCourse);
    setIsEditingMode(true);
  };

  // Delete a customized course from list
  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm("Deseja realmente excluir este treinamento de capacitação do sistema?")) {
      const updated = courses.filter(c => c.id !== courseId);
      saveCourses(updated);
      if (currentPlayingCourse && currentPlayingCourse.id === courseId) {
        setCurrentPlayingCourse(null);
      }
      showNotification("Treinamento excluído de forma definitiva.", "info");
    }
  };

  // Compile and save modifications back to local state & storage
  const handleSaveCourse = (updatedCourse: Course) => {
    if (!updatedCourse.title.trim() || !updatedCourse.desc.trim()) {
      showNotification("Por favor, preencha o título e a descrição do treinamento.", "error");
      return;
    }
    if (updatedCourse.lessons.length === 0) {
      showNotification("Adicione pelo menos uma lição ou vídeo-tutorial ao conteúdo programático.", "error");
      return;
    }

    const index = courses.findIndex(c => c.id === updatedCourse.id);
    let updatedCourses = [...courses];
    
    if (index >= 0) {
      updatedCourses[index] = updatedCourse;
    } else {
      updatedCourses.push(updatedCourse);
    }
    
    saveCourses(updatedCourses);

    // Update active player details if currently selected
    if (currentPlayingCourse && currentPlayingCourse.id === updatedCourse.id) {
      // Recalculate progress based on updated lessons
      const completedCount = updatedCourse.lessons.filter(l => l.completed).length;
      const progress = Math.round((completedCount / updatedCourse.lessons.length) * 100);
      setCurrentPlayingCourse({ ...updatedCourse, progress });
    }

    setIsEditingMode(false);
    setEditingCourse(null);
    showNotification(`Treinamento "${updatedCourse.title}" e seus respectivos testes foram estruturados com sucesso.`, "success");
  };

  // Make an AI call to generate and automatically format tests / quizzes or titles
  const handleGenerateQuizWithAI = async () => {
    if (!editingCourse) return;
    
    if (editingCourse.lessons.length === 0) {
      showNotification("Adicione uma lição programática ao curso antes de ativar o gerador por Inteligência Artificial.", "error");
      return;
    }

    const targetLesson = editingCourse.lessons[aiSelectedLessonIndex] || editingCourse.lessons[0];
    
    setIsGeneratingAI(true);
    setAiError(null);

    try {
      const res = await fetch("/api/gemini/generate-training-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseTitle: editingCourse.title,
          lessonTitle: targetLesson.title,
          sector: editingCourse.sector,
          level: editingCourse.level,
          youtubeUrl: targetLesson.youtubeUrl || ""
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "O servidor de IA retornou uma falha.");
      }

      const data = await res.json();

      // Overwrite corresponding lesson title if suggested
      const updatedLessons = [...editingCourse.lessons];
      if (data.lessonTitle) {
        updatedLessons[aiSelectedLessonIndex] = {
          ...updatedLessons[aiSelectedLessonIndex],
          title: data.lessonTitle
        };
      }

      // Update quiz values with highly structured technical options
      const updatedCourse: Course = {
        ...editingCourse,
        lessons: updatedLessons,
        quiz: {
          question: data.quizQuestion || editingCourse.quiz.question,
          options: data.options || editingCourse.quiz.options,
          correctIndex: typeof data.correctIndex === 'number' ? data.correctIndex : editingCourse.quiz.correctIndex,
          explanation: data.explanation || editingCourse.quiz.explanation
        }
      };

      setEditingCourse(updatedCourse);
      showNotification("Sucesso! O agente de Inteligência Artificial preencheu a lição e estruturou perguntas inovadoras para o teste.", "success");
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "Falha na conexão com o agente cognitivo.");
      showNotification("A Inteligência Artificial KORTECK teve problemas temporários para formular o teste.", "error");
    } finally {
      setIsGeneratingAI(false);
    }
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
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b border-transparent pb-6">
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
           <div className="hidden xl:flex items-center gap-10 px-8 border-r border-transparent mr-3">
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
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-zinc-400 bg-zinc-900/60 hover:bg-zinc-800/80 hover:text-zinc-200 border-none/85 data-[state=active]:border-blue-500 text-xs font-semibold px-4 h-11 rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-2.5 cursor-pointer shadow-sm relative"
            >
              {tab.icon} {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* 1. CURSOS DETALHADOS E ATIVAÇÕES */}
        <TabsContent value="cursos" className="mt-0 outline-none space-y-6">
          <AnimatePresence mode="wait">
            {isEditingMode && editingCourse ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-white dark:bg-zinc-900 border-none rounded-3xl p-6 md:p-8 space-y-8 text-left text-zinc-300"
              >
                {/* Editor Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-transparent pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest font-mono">// PAINEL DE COORDENAÇÃO DE ENSINO KORTECK</span>
                    <h2 className="text-2xl font-black text-white uppercase italic tracking-tight font-sans">
                      Configurar Treinamento Técnico
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsEditingMode(false);
                        setEditingCourse(null);
                      }}
                      className="text-zinc-400 hover:text-white uppercase text-[10px] font-black tracking-widest h-10 cursor-pointer"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={() => handleSaveCourse(editingCourse)}
                      className="bg-amber-600 hover:bg-amber-500 text-black font-black uppercase text-[10px] tracking-widest h-10 px-6 shrink-0 cursor-pointer"
                    >
                      Salvar Treinamento
                    </Button>
                  </div>
                </div>

                {/* Form Panels Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* General settings (Left Column) */}
                  <div className="lg:col-span-12 xl:col-span-7 space-y-6">
                    <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-transparent pb-2">
                      1. Informações do Curso
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-zinc-400 block">Título do Treinamento</label>
                        <Input
                          value={editingCourse.title}
                          onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                          className="bg-black border-transparent text-xs text-white uppercase font-bold"
                          placeholder="EX: Dobra e Montagem de Fachadas ACM"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-zinc-400 block">Descrição do Curso</label>
                        <textarea
                          value={editingCourse.desc}
                          onChange={(e) => setEditingCourse({ ...editingCourse, desc: e.target.value })}
                          rows={3}
                          className="w-full text-xs font-bold uppercase p-3 rounded-xl bg-black border-none text-white outline-none active:border-zinc-700 focus:border-zinc-700"
                          placeholder="Descreva detalhadamente o que o operador aprenderá..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase text-zinc-400 block">Setor Industrial</label>
                          <select
                            value={editingCourse.sector}
                            onChange={(e) => setEditingCourse({ ...editingCourse, sector: e.target.value as any })}
                            className="w-full h-10 px-3 rounded-xl bg-black border-none text-xs text-white font-bold"
                          >
                            <option value="comunicacao-visual">Comunicação Visual</option>
                            <option value="impressao-digital">Impressão Digital</option>
                            <option value="impressao-3d">Impressão 3D</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase text-zinc-400 block">Nível Técnico</label>
                          <select
                            value={editingCourse.level}
                            onChange={(e) => setEditingCourse({ ...editingCourse, level: e.target.value as any })}
                            className="w-full h-10 px-3 rounded-xl bg-black border-none text-xs text-white font-bold"
                          >
                            <option value="Iniciante">Iniciante</option>
                            <option value="Intermediador">Intermediador</option>
                            <option value="Avançado">Avançado</option>
                            <option value="Especialista">Especialista</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase text-zinc-400 block">XP e Carga Horária</label>
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              value={editingCourse.xp}
                              onChange={(e) => setEditingCourse({ ...editingCourse, xp: Number(e.target.value) })}
                              className="bg-black border-transparent text-xs text-white font-black"
                              placeholder="XP"
                            />
                            <Input
                              value={editingCourse.time}
                              onChange={(e) => setEditingCourse({ ...editingCourse, time: e.target.value })}
                              className="bg-black border-transparent text-xs text-white font-black uppercase"
                              placeholder="Carga (ex: 12h)"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-zinc-400 block">URL da Imagem Capa</label>
                        <Input
                          value={editingCourse.img}
                          onChange={(e) => setEditingCourse({ ...editingCourse, img: e.target.value })}
                          className="bg-black border-transparent text-xs text-white font-medium"
                          placeholder="https://images.unsplash.com/photo-..."
                        />
                      </div>
                    </div>

                    {/* Section 2: Programmatic Lesson Content */}
                    <div className="space-y-4 pt-4">
                      <div className="flex items-center justify-between border-b border-transparent pb-2">
                        <h3 className="text-sm font-black text-white uppercase tracking-wider">
                          2. Conteúdo Programático &amp; Tutoriais (Aulas)
                        </h3>
                        <Button
                          type="button"
                          onClick={() => {
                            const newLessonId = (editingCourse.lessons.length + 1).toString();
                            const newLessons = [
                              ...editingCourse.lessons,
                              { id: newLessonId, title: 'Nova Lição Técnica', duration: '20 min', completed: false, youtubeUrl: '' }
                            ];
                            setEditingCourse({ ...editingCourse, lessons: newLessons });
                          }}
                          className="bg-zinc-900 hover:bg-zinc-850 text-white uppercase text-[9px] font-black tracking-widest h-8 px-3 cursor-pointer"
                        >
                          + Adicionar Aula
                        </Button>
                      </div>

                      <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin">
                        {editingCourse.lessons.map((lesson, idx) => (
                          <div
                            key={lesson.id}
                            className="bg-black/40 border-none rounded-xl p-4 space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black text-amber-500 font-mono">LIÇÃO #{idx + 1}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = editingCourse.lessons.filter((_, lIdx) => lIdx !== idx);
                                  setEditingCourse({ ...editingCourse, lessons: updated });
                                }}
                                className="text-red-500 hover:text-red-400 text-[9px] uppercase font-black tracking-widest cursor-pointer"
                              >
                                Excluir Aula
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                              <div className="md:col-span-8 space-y-1.5">
                                <label className="text-[9px] uppercase font-bold text-zinc-400 block">Título da Lição</label>
                                <Input
                                  value={lesson.title}
                                  onChange={(e) => {
                                    const updated = [...editingCourse.lessons];
                                    updated[idx] = { ...updated[idx], title: e.target.value };
                                    setEditingCourse({ ...editingCourse, lessons: updated });
                                  }}
                                  className="bg-black border-transparent text-xs text-white font-bold"
                                />
                              </div>
                              <div className="md:col-span-4 space-y-1.5">
                                <label className="text-[9px] uppercase font-bold text-zinc-400 block">Duração (Texto)</label>
                                <Input
                                  value={lesson.duration}
                                  onChange={(e) => {
                                    const updated = [...editingCourse.lessons];
                                    updated[idx] = { ...updated[idx], duration: e.target.value };
                                    setEditingCourse({ ...editingCourse, lessons: updated });
                                  }}
                                  className="bg-black border-transparent text-xs text-white font-bold"
                                />
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[9px] uppercase font-bold text-zinc-400 block">Link de Vídeo do YouTube (Treinamento)</label>
                              <Input
                                value={lesson.youtubeUrl || ''}
                                onChange={(e) => {
                                  const updated = [...editingCourse.lessons];
                                  updated[idx] = { ...updated[idx], youtubeUrl: e.target.value };
                                  setEditingCourse({ ...editingCourse, lessons: updated });
                                }}
                                className="bg-black border-transparent text-xs text-zinc-300 font-mono"
                                placeholder="E.G: https://www.youtube.com/watch?v=ABC123xyz"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Teste de Proficiência & AI (Right Column) */}
                  <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-transparent pb-2">
                      3. Teste de Proficiência Técnica
                    </h3>

                    {/* AI Generator Integration Panel */}
                    <div className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="text-amber-500 animate-pulse shrink-0" size={18} />
                        <h4 className="text-xs font-black text-white uppercase tracking-wider italic">
                          Assistente de Capacitação com IA
                        </h4>
                      </div>
                      
                      <p className="text-[11px] text-zinc-400 leading-normal font-sans">
                        Nossa IA criará perguntas técnicas do setor de comunicação visual sob medida. Selecione uma das lições ao lado como contexto e deixe a IA formular tudo!
                      </p>

                      <div className="space-y-3 pt-1">
                        <div className="space-y-1.5">
                          <label className="text-[9px] uppercase font-black tracking-wider text-zinc-400 block">Focar na Aula Contexto:</label>
                          <select
                            value={aiSelectedLessonIndex}
                            onChange={(e) => setAiSelectedLessonIndex(Number(e.target.value))}
                            className="w-full h-10 px-3 rounded-lg bg-black border-none text-xs text-white font-black"
                          >
                            {editingCourse.lessons.map((l, i) => (
                              <option key={l.id} value={i}>
                                Aula {i + 1}: {l.title || "Sem título"}
                              </option>
                            ))}
                          </select>
                        </div>

                        <Button
                          type="button"
                          disabled={isGeneratingAI}
                          onClick={handleGenerateQuizWithAI}
                          className="w-full bg-amber-500 hover:bg-amber-600 text-black text-[10px] font-black uppercase tracking-wider h-11 cursor-pointer"
                        >
                          {isGeneratingAI ? "Gerando Teste Operacional Sênior..." : "✨ Gerar Pergunta e Título com IA"}
                        </Button>

                        {aiError && (
                          <div className="text-[10px] text-red-400 bg-red-950/20 border border-red-500/10 p-2 rounded-lg font-mono">
                            {aiError}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Manual Correction Fields */}
                    <div className="space-y-4 pt-2">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-zinc-400 block">Pergunta do Teste</label>
                        <textarea
                          value={editingCourse.quiz.question}
                          onChange={(e) => {
                            const updatedQuiz = { ...editingCourse.quiz, question: e.target.value };
                            setEditingCourse({ ...editingCourse, quiz: updatedQuiz });
                          }}
                          rows={3}
                          className="w-full text-xs font-bold uppercase p-3 rounded-xl bg-black border-none text-white outline-none active:border-zinc-700"
                          placeholder="Escreva a hipótese operacional real..."
                        />
                      </div>

                      {/* Options listing */}
                      <div className="space-y-2.5">
                        <label className="text-[10px] font-black uppercase text-zinc-400 block">Alternativas do Teste</label>
                        {editingCourse.quiz.options.map((opt, oIdx) => (
                          <div key={oIdx} className="flex items-center gap-2">
                            <span className="text-zinc-600 font-mono font-black text-xs shrink-0">{String.fromCharCode(65 + oIdx)}.</span>
                            <Input
                              value={opt}
                              onChange={(e) => {
                                const newOpts = [...editingCourse.quiz.options];
                                newOpts[oIdx] = e.target.value;
                                setEditingCourse({
                                  ...editingCourse,
                                  quiz: { ...editingCourse.quiz, options: newOpts }
                                });
                              }}
                              className="bg-black border-transparent text-xs text-white"
                              placeholder={`Alternativa ${String.fromCharCode(65 + oIdx)}`}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-zinc-400 block">Índice da Alternativa Correta</label>
                        <select
                          value={editingCourse.quiz.correctIndex}
                          onChange={(e) => {
                            setEditingCourse({
                              ...editingCourse,
                              quiz: { ...editingCourse.quiz, correctIndex: Number(e.target.value) }
                            });
                          }}
                          className="w-full h-10 px-3 rounded-xl bg-black border-none text-xs text-white font-bold"
                        >
                          <option value={0}>A (Alternativa 1)</option>
                          <option value={1}>B (Alternativa 2)</option>
                          <option value={2}>C (Alternativa 3)</option>
                          <option value={3}>D (Alternativa 4)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-zinc-400 block">Explicação Didática de Aprendizado</label>
                        <textarea
                          value={editingCourse.quiz.explanation}
                          onChange={(e) => {
                            const updatedQuiz = { ...editingCourse.quiz, explanation: e.target.value };
                            setEditingCourse({ ...editingCourse, quiz: updatedQuiz });
                          }}
                          rows={3}
                          className="w-full text-xs font-bold uppercase p-3 rounded-xl bg-black border-none text-white outline-none active:border-zinc-700"
                          placeholder="Explique tecnicamente por que essa alternativa é a correta..."
                        />
                      </div>
                    </div>

                    {/* Delete training block if needed */}
                    {courses.some(c => c.id === editingCourse.id) && (
                      <div className="pt-6 border-t border-transparent text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteCourse(editingCourse.id)}
                          className="text-red-500 hover:text-red-400 text-[10px] uppercase font-black tracking-widest cursor-pointer"
                        >
                          Excluir este Treinamento do Sistema
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : !currentPlayingCourse ? (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                {/* Sector Tabs Bar Filters */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 zinc-900 border-none p-3 rounded-2xl">
                  {/* Category badgess */}
                  <div className="flex flex-wrap items-center gap-2">
                    {[
                      { id: 'todos', label: 'Ver Todos' },
                      { id: 'comunicacao-visual', label: 'Comunicação Visual' },
                      { id: 'impressao-digital', label: 'Impressão Digital' },
                      { id: 'impressao-3d', label: 'Impressão 3D' }
                    ].map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={cn(
                          "px-4 h-9 rounded-xl text-xs font-black uppercase tracking-tight transition-all border-none",
                          selectedCategory === cat.id 
                            ? "bg-amber-600 text-white shadow-md shadow-amber-600/10 border-amber-500/20 font-bold"
                            : "bg-zinc-900/50 text-zinc-400 hover:text-white hover:bg-zinc-800 border-zinc-800/85"
                        )}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Action group with Search & Creator */}
                  <div className="flex items-center gap-3 w-full md:w-auto flex-wrap sm:flex-nowrap">
                     <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 animate-pulse" size={14} />
                        <Input 
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           className="bg-black/40 border-transparent pl-9 h-10 w-full text-[10px] text-white uppercase font-black tracking-widest placeholder:text-zinc-600 placeholder:normal-case font-mono" 
                           placeholder="Filtrar treinamentos..." 
                        />
                     </div>
                     <Button
                       onClick={handleCreateNewCourse}
                       className="bg-amber-600 hover:bg-amber-500 text-black font-black text-[10px] uppercase tracking-wider h-10 px-4 whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
                     >
                       + Novo Treinamento
                     </Button>
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
                          className="bg-white dark:bg-zinc-900 border-transparent overflow-hidden group hover:border-amber-500/20 transition-all cursor-pointer flex flex-col justify-between h-full relative"
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
                            <div className="flex justify-between items-center pt-3 border-t border-transparent">
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
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <Button 
                      variant="ghost" 
                      onClick={() => { setCurrentPlayingCourse(null); }}
                      className="text-zinc-500 hover:text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest pl-0 transition-colors"
                    >
                      <ArrowRight size={14} className="rotate-180" /> Voltar ao Catálogo
                    </Button>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => {
                          setEditingCourse(currentPlayingCourse);
                          setIsEditingMode(true);
                        }}
                        className="bg-zinc-900 hover:bg-zinc-800 text-amber-500 border-none hover:border-amber-500/20 text-[10px] font-black uppercase tracking-widest h-9 px-4 flex items-center gap-2"
                      >
                        <Wrench size={12} /> Editar Curso &amp; Teste
                      </Button>
                      <Badge className={cn("border-0 font-black px-3.5 py-1.5 text-[9px] tracking-widest uppercase", getSectorMeta(currentPlayingCourse.sector).color)}>
                        {getSectorMeta(currentPlayingCourse.sector).label}
                      </Badge>
                    </div>
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
                      
                      {/* Embed real YouTube Video context if playing and available */}
                      {isPlaying && getYouTubeEmbedUrl(currentPlayingCourse.lessons[activeLessonIndex]?.youtubeUrl || '') ? (
                        <div className="absolute inset-0 w-full h-full z-20">
                          <iframe
                            src={getYouTubeEmbedUrl(currentPlayingCourse.lessons[activeLessonIndex]?.youtubeUrl || '') + "?autoplay=1"}
                            className="w-full h-full border-0"
                            title={currentPlayingCourse.lessons[activeLessonIndex]?.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2 right-2 z-30 opacity-80 hover:opacity-100 transition-opacity">
                            <Button 
                              onClick={() => setIsPlaying(false)}
                              size="sm"
                              className="bg-black/90 hover:bg-zinc-900 border-none text-white text-[9px] font-black tracking-widest uppercase h-8 px-4 flex items-center gap-1.5"
                            >
                              Parar Vídeo
                            </Button>
                          </div>
                        </div>
                      ) : null}

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
                               className="border-transparent text-white hover:bg-white/5 h-10 px-6 text-[9px] font-black tracking-widest uppercase"
                             >
                                 Pausar Aula
                             </Button>
                          </div>
                        )}
                      </div>

                      {/* Course bottom progress line inside player */}
                      <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between z-10 text-[10px] text-zinc-400 font-bold font-mono">
                         <span className="bg-black/70 px-2.5 py-1 rounded border-none uppercase">Aula {activeLessonIndex + 1} de {currentPlayingCourse.lessons.length}</span>
                         <span className="bg-amber-600 font-black text-black px-2 py-1 rounded">VÍDEO HD 1080P // ATIVO</span>
                      </div>
                    </div>
                  </Card>

                  {/* Course Details Text section */}
                  <div className="bg-white dark:bg-zinc-900 border-none rounded-2xl p-6 md:p-8 space-y-4">
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
                     
                     <div className="p-4 rounded-xl border-none bg-white/[0.01] flex items-center gap-3">
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
                  <Card className="bg-white dark:bg-zinc-900 border-transparent">
                    <CardHeader className="border-b border-transparent pb-4 bg-white/[0.01]">
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
                  <Card className="bg-white dark:bg-zinc-900 border-transparent">
                     <CardHeader className="border-b border-transparent pb-4 bg-white/[0.01]">
                        <div className="flex items-center justify-between">
                           <CardTitle className="text-xs font-black text-white uppercase tracking-widest italic flex items-center gap-2">
                              <Sparkles size={14} className="text-amber-500" /> Teste de Proficiência
                           </CardTitle>
                           <Badge variant="outline" className="border-transparent text-[9px] font-black uppercase text-zinc-500">
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
                                 : "bg-black/50 border-transparent text-zinc-400 hover:bg-zinc-900/60 hover:text-white",
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
                             className="w-full border-transparent text-zinc-400 hover:text-white h-12 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2"
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
                 <Card className="bg-white dark:bg-zinc-900 border-transparent p-6 md:p-8 space-y-6">
                    <div className="space-y-1.5 border-b border-transparent pb-4">
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
                                className="bg-black border-transparent text-xs text-white uppercase font-bold" 
                                placeholder="E.G. ADAMS LEANDRO" 
                             />
                          </div>
                          
                          <div className="space-y-2">
                             <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Colaborador Candidato</label>
                             <select
                                value={candidateName}
                                onChange={(e) => setCandidateName(e.target.value)}
                                className="w-full h-10 px-3 rounded-lg bg-black border-none text-xs text-white uppercase font-bold"
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
                               { id: 'comunicacao-visual', label: 'Comunicação Visual' },
                               { id: 'impressao-digital', label: 'Impressão Digital' },
                               { id: 'impressao-3d', label: 'Impressão 3D' }
                             ].map((sec) => (
                               <button
                                 key={sec.id}
                                 type="button"
                                 onClick={() => setEvaluationSector(sec.id)}
                                 className={cn(
                                   "py-3 rounded-xl border text-[10px] uppercase font-black transition-all",
                                   evaluationSector === sec.id
                                     ? "bg-amber-600/20 border-amber-500 text-amber-400"
                                     : "bg-black/40 border-transparent text-zinc-400 hover:text-white"
                                 )}
                               >
                                 {sec.label}
                               </button>
                             ))}
                          </div>
                       </div>

                       {/* Evaluation Criteria Sliders */}
                       <div className="p-5 rounded-2xl border-none bg-white/[0.01] space-y-4">
                          <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest italic pb-2 border-b border-transparent">Critérios de Avaliação Prática (1 a 5 estrelas)</h4>
                          
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
                             className="w-full text-xs font-bold uppercase p-3 rounded-xl bg-black border-none text-white active:border-zinc-700 focus:border-zinc-700 outline-none"
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

                            <div className="flex justify-between items-center text-[9px] font-bold uppercase text-zinc-650 pt-4 border-t border-transparent tracking-wider">
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
                 <Card className="bg-white dark:bg-zinc-900 border-transparent overflow-hidden">
                    <CardHeader className="border-b border-transparent pb-4 bg-white/[0.01]">
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
                                     <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white border-none overflow-hidden font-bold">
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
                 <Card className="bg-white dark:bg-zinc-900 border-transparent p-6 space-y-6">
                    <h4 className="text-lg font-black text-white uppercase italic tracking-tighter border-b border-transparent pb-3">Objetivos Ativos de Time</h4>
                    
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
           <Card className="bg-white dark:bg-zinc-900 border-transparent p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-transparent pb-4 mb-6">
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
                   <Card key={idx} className="bg-zinc-950 border-transparent p-6 space-y-4">
                      <div className="flex items-center justify-between">
                         <span className="text-2xl font-black text-white italic font-mono leading-none">{nrNode.nr}</span>
                         <Badge variant="outline" className={cn("border-0 text-[8px] font-black uppercase shadow-xs px-2.5 h-6", nrNode.color)}>
                            {nrNode.status}
                         </Badge>
                      </div>
                      <h4 className="text-sm font-black text-zinc-300 uppercase italic tracking-wide">{nrNode.label}</h4>
                      <p className="text-xs text-zinc-500 leading-normal font-medium">{nrNode.desc}</p>
                      
                      <div className="pt-4 border-t border-transparent flex justify-between items-center">
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

      {/* Dynamic Toast Notification Panel */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={cn(
              "fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-xl flex items-center gap-3 border max-w-sm backdrop-blur-md animate-in slide-in-from-bottom duration-200 text-left",
              notification.type === 'success' ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-100" :
              notification.type === 'error' ? "bg-red-950/90 border-red-500/30 text-red-100" :
              "bg-zinc-950/90 border-zinc-700 text-zinc-100"
            )}
          >
            {notification.type === 'success' && <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />}
            {notification.type === 'error' && <AlertTriangle className="text-red-500 shrink-0" size={18} />}
            {notification.type === 'info' && <Info className="text-purple-500 shrink-0" size={18} />}
            
            <p className="text-xs font-bold leading-tight flex-1 text-left uppercase">
              {notification.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
