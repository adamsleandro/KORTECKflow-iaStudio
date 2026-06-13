import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '@/src/lib/ThemeContext';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  MapPin, 
  User, 
  CheckCircle, 
  ArrowRight, 
  Tag, 
  X,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format, startOfMonth, startOfWeek, endOfMonth, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface EventoCV {
  id: string;
  title: string;
  client: string;
  date: Date;
  time: string;
  type: 'instalacao' | 'entrega' | 'retirada' | 'medicao' | 'reparo';
  address?: string;
  team?: string;
  vendedor?: string;
  pedido?: string;
  status: 'pendente' | 'realizado';
}

const INITIAL_EVENTS: EventoCV[] = [
  {
    id: 'ev-1',
    title: 'Instalação Canal Letra Caixa Inox',
    client: 'Banco Itaú Personnalité',
    date: new Date(2026, 4, 15), // May 15, 2026
    time: '09:00',
    type: 'instalacao',
    address: 'Av. Paulista, 1200 - Bela Vista, SP',
    team: 'Equipe de Montagem Alfa',
    vendedor: 'João Silva',
    pedido: '#10482',
    status: 'realizado'
  },
  {
    id: 'ev-2',
    title: 'Entrega Técnica Painel Luminoso',
    client: "McDonald's Brasil",
    date: new Date(2026, 4, 15),
    time: '14:30',
    type: 'entrega',
    address: 'Marginal Pinheiros, 8500',
    team: 'Logística Korteck - Caminhão 02',
    vendedor: 'Maria Costa',
    pedido: '#10483',
    status: 'realizado'
  },
  {
    id: 'ev-3',
    title: 'Conferência de Medidas a Laser',
    client: 'Academia BlueFit',
    date: new Date(2026, 4, 20),
    time: '11:00',
    type: 'medicao',
    address: 'Rua Augusta, 450 - Consolação, SP',
    team: 'Projetista Técnico',
    vendedor: 'Pedro Santos',
    pedido: '#10488',
    status: 'pendente'
  },
  {
    id: 'ev-4',
    title: 'Reparo Preventivo Fachada',
    client: 'Hospital Albert Einstein',
    date: new Date(2026, 4, 25),
    time: '10:00',
    type: 'reparo',
    team: 'Equipe de Manutenção',
    vendedor: 'Ana Lima',
    pedido: '#10492',
    status: 'pendente'
  },
  {
    id: 'ev-5',
    title: 'Retirada de Display ACM',
    client: 'Arco Distribuidora',
    date: new Date(2026, 4, 30),
    time: '08:00',
    type: 'retirada',
    address: 'Rodovia Raposo Tavares, Km 18',
    team: 'Equipe Logística Beta',
    vendedor: 'João Silva',
    pedido: '#10485',
    status: 'pendente'
  }
];

export function Calendario() {
  const { theme } = useTheme();
  const isLight = theme === 'ash-light';
  const c = (light: string, dark: string) => isLight ? light : dark;

  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 15)); // Center in May 2026
  const [selectedDay, setSelectedDay] = useState<Date | null>(new Date(2026, 4, 15));
  const [eventList, setEventList] = useState<EventoCV[]>(INITIAL_EVENTS);
  const [filterType, setFilterType] = useState<string>('todos');

  // Add Event Form State
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventClient, setNewEventClient] = useState('');
  const [newEventTime, setNewEventTime] = useState('09:00');
  const [newEventType, setNewEventType] = useState<'instalacao' | 'entrega' | 'retirada' | 'medicao' | 'reparo'>('instalacao');
  const [newEventAddress, setNewEventAddress] = useState('');
  const [newEventTeam, setNewEventTeam] = useState('');
  const [newEventVendedor, setNewEventVendedor] = useState('');
  const [newEventPedido, setNewEventPedido] = useState('');

  const firstDayOfMonth = startOfMonth(currentDate);
  const firstDayOfCalendar = startOfWeek(firstDayOfMonth, { weekStartsOn: 0 });
  const lastDayOfMonth = endOfMonth(currentDate);
  const lastDayOfCalendar = endOfWeek(lastDayOfMonth, { weekStartsOn: 0 });

  const daysGrid = useMemo(() => {
    return eachDayOfInterval({
      start: firstDayOfCalendar,
      end: lastDayOfCalendar
    });
  }, [firstDayOfCalendar, lastDayOfCalendar]);

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle || !newEventClient || !selectedDay) return;

    const newEvent: EventoCV = {
      id: `ev-${Math.random().toString(36).substr(2, 9)}`,
      title: newEventTitle,
      client: newEventClient,
      date: selectedDay,
      time: newEventTime,
      type: newEventType,
      address: newEventAddress || undefined,
      team: newEventTeam || undefined,
      vendedor: newEventVendedor || undefined,
      pedido: newEventPedido || undefined,
      status: 'pendente'
    };

    setEventList([...eventList, newEvent]);
    setIsAddFormOpen(false);
    setNewEventTitle('');
    setNewEventClient('');
    setNewEventTime('09:00');
    setNewEventAddress('');
    setNewEventTeam('');
    setNewEventVendedor('');
    setNewEventPedido('');
  };

  const handleToggleStatus = (id: string) => {
    setEventList(eventList.map(ev => {
      if (ev.id === id) {
        return { ...ev, status: ev.status === 'pendente' ? 'realizado' : 'pendente' as const };
      }
      return ev;
    }));
  };

  const handleDeleteEvent = (id: string) => {
    setEventList(eventList.filter(ev => ev.id !== id));
  };

  // Filtered Events inside calendar grid
  const filteredEventsForDay = (day: Date) => {
    return eventList.filter(ev => isSameDay(ev.date, day) && (filterType === 'todos' || ev.type === filterType));
  };

  // Selected Day Highlighted Events
  const selectedDayEvents = useMemo(() => {
    if (!selectedDay) return [];
    return eventList.filter(ev => isSameDay(ev.date, selectedDay));
  }, [selectedDay, eventList]);

  const getTypeMeta = (type: string) => {
    switch (type) {
      case 'instalacao':
        return { label: 'Inst. Técnica', color: 'bg-red-500', bg: 'bg-red-500/10 border-red-500/20 text-red-400' };
      case 'entrega':
        return { label: 'Ent. Material', color: 'bg-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' };
      case 'retirada':
        return { label: 'Ret. Produto', color: 'bg-amber-500', bg: 'bg-amber-500/10 border-amber-500/30 text-amber-500' };
      case 'medicao':
        return { label: 'Conf. Medidas', color: 'bg-cyan-500', bg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-500' };
      default:
        return { label: 'Reparo/Manut.', color: 'bg-blue-500', bg: 'bg-blue-500/10 border-blue-500/20 text-blue-400' };
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-300 pb-24">
      {/* Header section with total scheduled counts */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b border-transparent pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="p-2.5 bg-purple-600/10 rounded-xl border border-purple-500/20">
                <CalendarIcon size={26} className="text-purple-500 animate-pulse" />
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-[0.4em] text-zinc-500 uppercase">LOGÍSTICA MESH INDUSTRIAL DE CAMPO</span>
                <h1 className="text-3xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter leading-none">
                  Calendário <span className="text-purple-600">de</span> Operações
                </h1>
             </div>
          </div>
        </div>

        {/* Quick legend and filter state controller */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'instalacao', label: 'Instalação', color: 'bg-red-500' },
            { id: 'entrega', label: 'Entrega', color: 'bg-emerald-500' },
            { id: 'retirada', label: 'Retirada', color: 'bg-amber-500' },
            { id: 'medicao', label: 'Medição', color: 'bg-cyan-500' },
            { id: 'reparo', label: 'Reparo', color: 'bg-blue-500' }
          ].map((mode) => (
             <button
               key={mode.id}
               onClick={() => setFilterType(mode.id)}
               className={cn(
                 "h-10 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 border transition-all cursor-pointer",
                 filterType === mode.id
                   ? "bg-purple-600 text-white border-purple-500 shadow-md"
                   : isLight
                     ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-zinc-200"
                     : "bg-white dark:bg-zinc-900 hover:bg-zinc-900 text-zinc-400 border-transparent"
               )}
             >
                {mode.color && <div className={cn("w-2 h-2 rounded-full", mode.color)} />}
                {mode.label}
             </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
         {/* Left Area: Visual Calendar Grid */}
         <div className="xl:col-span-8 space-y-4">
            <Card className="bg-white dark:bg-zinc-900 border-transparent shadow-sm overflow-hidden">
               {/* Controls Bar */}
               <div className="flex items-center justify-between p-6 border-b border-transparent">
                  <div className="flex items-center gap-4">
                     <h2 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight font-sans">
                        {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
                     </h2>
                  </div>
                  <div className="flex items-center gap-2">
                     <Button 
                       variant="outline" 
                       size="icon" 
                       onClick={handlePrevMonth} 
                       className={cn(
                         "border-transparent hover:bg-zinc-200 dark:hover:bg-zinc-850",
                         isLight ? "bg-zinc-100 text-zinc-900" : "bg-black/40 text-white"
                       )}
                     >
                        <ChevronLeft size={16} />
                     </Button>
                     <Button 
                       variant="outline" 
                       size="icon" 
                       onClick={handleNextMonth} 
                       className={cn(
                         "border-transparent hover:bg-zinc-200 dark:hover:bg-zinc-850",
                         isLight ? "bg-zinc-100 text-zinc-900" : "bg-black/40 text-white"
                       )}
                     >
                        <ChevronRight size={16} />
                     </Button>
                  </div>
               </div>

               {/* Week Days Headers */}
                <div className={cn("grid grid-cols-7 text-center border-b border-transparent py-3", isLight ? "bg-zinc-100" : "bg-black/20")}>
                   {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map((label) => (
                      <span key={label} className={cn("text-[10px] font-black tracking-wider", isLight ? "text-zinc-800" : "text-zinc-500")}>
                         {label}
                      </span>
                   ))}
                </div>

               {/* Days Box Container */}
               <div className={cn("grid grid-cols-7 relative", isLight ? "bg-zinc-50" : "bg-black/[0.05]")}>
                  {daysGrid.map((day, idx) => {
                     const isCurrentMonth = isSameMonth(day, currentDate);
                     const isSelected = selectedDay && isSameDay(day, selectedDay);
                     const dayEvents = filteredEventsForDay(day);

                     return (
                        <div
                          key={idx}
                          onClick={() => setSelectedDay(day)}
                          className={cn(
                             "min-h-[110px] p-2 border-r border-b transition-colors cursor-pointer flex flex-col justify-between relative",
                             isLight ? "border-zinc-200 hover:bg-zinc-150" : "border-transparent hover:bg-white/[0.015]",
                             !isCurrentMonth && "opacity-25",
                             isSelected && (isLight 
                                ? "bg-purple-100 border-l-2 border-t-2 border-purple-600 shadow-[inset_0_0_15px_rgba(124,58,237,0.1)]" 
                                : "bg-purple-950/20 border-l border-t border-purple-600/30 shadow-[inset_0_0_15px_rgba(124,58,237,0.05)]")
                          )}
                        >
                           <div className="flex justify-between items-center mb-1">
                              <span className={cn(
                                 "text-xs font-bold font-mono px-1.5 py-0.5 rounded",
                                 isSelected 
                                   ? "bg-purple-600 text-white" 
                                   : isLight 
                                     ? "text-zinc-900 bg-zinc-200/50" 
                                     : "text-zinc-400"
                              )}>
                                 {format(day, 'd')}
                              </span>
                              
                              {dayEvents.length > 0 && (
                                 <span className={cn("text-[9px] font-bold px-1 rounded-full", isLight ? "bg-purple-600 text-white" : "bg-zinc-800 text-zinc-300")}>
                                    {dayEvents.length}
                                 </span>
                              )}
                           </div>

                           {/* Bullet events list */}
                           <div className="space-y-1 overflow-hidden flex-1 flex flex-col justify-start">
                              {dayEvents.slice(0, 3).map((ev) => (
                                 <div 
                                   key={ev.id}
                                   className={cn(
                                      "text-[9px] font-black tracking-tight rounded px-1.5 py-0.5 border flex items-center gap-1 truncate uppercase",
                                      getTypeMeta(ev.type).bg
                                   )}
                                 >
                                    <div className={cn("w-1 h-1 rounded-full", getTypeMeta(ev.type).color)} />
                                    <span className="truncate">{ev.client}</span>
                                 </div>
                              ))}
                              {dayEvents.length > 3 && (
                                 <span className="text-[8px] font-mono font-bold text-zinc-550 block text-right">
                                    + {dayEvents.length - 3} mais
                                 </span>
                              )}
                           </div>
                        </div>
                     );
                  })}
               </div>
            </Card>
         </div>

         {/* Right Area: Selected Day List & Activities scheduler */}
         <div className="xl:col-span-4 space-y-6">
            <Card className="bg-white dark:bg-zinc-900 border-transparent shadow-sm relative overflow-hidden">
               <CardHeader className="border-b border-transparent">
                  <div className="flex items-center justify-between">
                     <div>
                        <CardTitle className={cn("text-sm font-black uppercase", isLight ? "text-zinc-950" : "text-zinc-300")}>
                           {selectedDay ? format(selectedDay, "dd 'de' MMMM", { locale: ptBR }) : 'Selecione um Dia'}
                        </CardTitle>
                        <CardDescription className="text-xs text-zinc-500">Fluxo interno de entregas de campo.</CardDescription>
                     </div>
                     <Button 
                       onClick={() => setIsAddFormOpen(true)}
                       className="bg-purple-600 hover:bg-purple-700 h-9 px-3 rounded-lg flex items-center gap-1.5 font-bold text-xs text-white"
                     >
                        <Plus size={14} /> Novo Evento
                     </Button>
                  </div>
               </CardHeader>
               
               <CardContent className="p-6">
                  <AnimatePresence mode="wait">
                     {isAddFormOpen ? (
                        <motion.form 
                          key="add-form"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          onSubmit={handleAddEvent}
                          className="space-y-4 pt-2 border-b border-transparent pb-6 mb-6"
                        >
                           <div className="space-y-1">
                               <Label className={cn("text-[10px] uppercase font-mono", isLight ? "text-zinc-800 font-bold" : "text-zinc-400")}>Título do Evento</Label>
                               <Input 
                                 value={newEventTitle}
                                 onChange={(e) => setNewEventTitle(e.target.value)}
                                 placeholder="Instalação de Totem Luminoso"
                                 className={cn("text-xs h-9.5 focus:ring-1 focus:ring-purple-500", isLight ? "bg-zinc-100 border-zinc-300 text-zinc-900 focus:bg-white" : "bg-black/40 border-transparent text-white")}
                                 required
                               />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                               <div className="space-y-1">
                                  <Label className={cn("text-[10px] uppercase font-mono font-bold", isLight ? "text-zinc-800 font-bold" : "text-zinc-400")}>Cliente</Label>
                                  <Input 
                                    value={newEventClient}
                                    onChange={(e) => setNewEventClient(e.target.value)}
                                    placeholder="Starbucks Campinas"
                                    className={cn("text-xs h-9.5 focus:ring-1 focus:ring-purple-500", isLight ? "bg-zinc-100 border-zinc-300 text-zinc-900 focus:bg-white" : "bg-black/40 border-transparent text-white")}
                                    required
                                  />
                               </div>
                               <div className="space-y-1">
                                  <Label className={cn("text-[10px] uppercase font-mono", isLight ? "text-zinc-800 font-bold" : "text-zinc-400")}>Horário</Label>
                                  <Input 
                                    type="time"
                                    value={newEventTime}
                                    onChange={(e) => setNewEventTime(e.target.value)}
                                    className={cn("text-xs h-9.5 focus:ring-1 focus:ring-purple-500 [color-scheme:light]", isLight ? "bg-zinc-100 border-zinc-300 text-zinc-900 focus:bg-white" : "bg-black/40 border-transparent text-white")}
                                    required
                                  />
                               </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                               <div className="space-y-1">
                                  <Label className={cn("text-[10px] uppercase font-mono", isLight ? "text-zinc-800 font-bold" : "text-zinc-400")}>Tipo de Atividade</Label>
                                  <select
                                    value={newEventType}
                                    onChange={(e) => setNewEventType(e.target.value as any)}
                                    className={cn("w-full h-9.5 rounded-lg px-3 text-xs outline-none focus:ring-1 focus:ring-purple-500", isLight ? "bg-zinc-100 border border-zinc-350 text-zinc-950 focus:bg-white" : "bg-black/40 border-none text-white")}
                                  >
                                     <option value="instalacao">Instalações técnicas</option>
                                     <option value="entrega">Entrega de material</option>
                                     <option value="retirada">Retirada de produto</option>
                                     <option value="medicao">Conferência de medidas</option>
                                     <option value="reparo">Reparo-Manutenção</option>
                                  </select>
                               </div>
                               <div className="space-y-1">
                                  <Label className={cn("text-[10px] uppercase font-mono", isLight ? "text-zinc-800 font-bold" : "text-zinc-400")}>Responsável / Crew</Label>
                                  <Input 
                                    value={newEventTeam}
                                    onChange={(e) => setNewEventTeam(e.target.value)}
                                    placeholder="Equipe Alfa"
                                    className={cn("text-xs h-9.5 focus:ring-1 focus:ring-purple-500", isLight ? "bg-zinc-100 border-zinc-300 text-zinc-900 focus:bg-white" : "bg-black/40 border-transparent text-white")}
                                  />
                               </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                               <div className="space-y-1">
                                  <Label className={cn("text-[10px] uppercase font-mono", isLight ? "text-zinc-800 font-bold" : "text-zinc-400")}>Vendedor Resp.</Label>
                                  <Input 
                                    value={newEventVendedor}
                                    onChange={(e) => setNewEventVendedor(e.target.value)}
                                    placeholder="Ex: João Silva"
                                    className={cn("text-xs h-9.5 focus:ring-1 focus:ring-purple-500", isLight ? "bg-zinc-100 border-zinc-300 text-zinc-900 focus:bg-white" : "bg-black/40 border-transparent text-white")}
                                  />
                               </div>
                               <div className="space-y-1">
                                  <Label className={cn("text-[10px] uppercase font-mono", isLight ? "text-zinc-800 font-bold" : "text-zinc-400")}>Nº do Pedido</Label>
                                  <Input 
                                    value={newEventPedido}
                                    onChange={(e) => setNewEventPedido(e.target.value)}
                                    placeholder="#10482"
                                    className={cn("text-xs h-9.5 focus:ring-1 focus:ring-purple-500", isLight ? "bg-zinc-100 border-zinc-300 text-zinc-900 focus:bg-white" : "bg-black/40 border-transparent text-white")}
                                  />
                               </div>
                            </div>

                            <div className="space-y-1">
                               <Label className={cn("text-[10px] uppercase font-mono", isLight ? "text-zinc-800 font-bold" : "text-zinc-400")}>Endereço de Campo</Label>
                               <Input 
                                 value={newEventAddress}
                                 onChange={(e) => setNewEventAddress(e.target.value)}
                                 placeholder="Marginal Pinheiros Km 2"
                                 className={cn("text-xs h-9.5 focus:ring-1 focus:ring-purple-500", isLight ? "bg-zinc-100 border-zinc-300 text-zinc-900 focus:bg-white" : "bg-black/40 border-transparent text-white")}
                               />
                            </div>

                            <div className="flex gap-2 justify-end pt-2">
                               <Button 
                                 type="button" 
                                 variant="ghost" 
                                 onClick={() => setIsAddFormOpen(false)}
                                 className={cn(isLight ? "text-zinc-550 hover:text-zinc-950 font-bold" : "text-zinc-400 hover:text-white")}
                               >
                                  Cancelar
                               </Button>
                               <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                                  Gravar Operação
                               </Button>
                            </div>
                        </motion.form>
                     ) : null}
                  </AnimatePresence>

                  {/* Scheduled elements list for selected day */}
                  <div className="space-y-4">
                     {selectedDayEvents.length === 0 ? (
                        <div className={cn("text-center py-12 border border-dashed rounded-2xl", isLight ? "bg-zinc-50 border-zinc-200" : "bg-white/[0.01] border-transparent")}>
                           <Info size={22} className={cn("mx-auto mb-2", isLight ? "text-zinc-500" : "text-zinc-555")} />
                           <h4 className={cn("text-xs font-black uppercase tracking-wider", isLight ? "text-zinc-950" : "text-zinc-500")}>Cronograma Limpo</h4>
                           <p className={cn("text-[10px] font-bold mt-1 max-w-[200px] mx-auto", isLight ? "text-zinc-800" : "text-zinc-550")}>
                              Nenhuma entrega física ou instalação externa cadastrada para este dia específico.
                           </p>
                        </div>
                     ) : (
                        selectedDayEvents.map((ev) => (
                           <div 
                             key={ev.id}
                             className={cn(
                                isLight ? "p-4.5 rounded-2xl border transition-all space-y-3 relative group bg-zinc-50 border-zinc-200 shadow-sm" : "p-4.5 rounded-2xl border bg-black/40 border-transparent hover:border-purple-500/20 transition-all space-y-3 relative group",
                                ev.status === 'realizado' && (isLight ? "opacity-75 bg-emerald-50 text-emerald-950 border-emerald-300" : "opacity-60 bg-emerald-950/[0.05]"),
                             )}
                           >
                              <div className="flex justify-between items-start gap-4">
                                 <div className="space-y-1">
                                    <h3 className={cn("text-xs font-black uppercase", isLight ? "text-zinc-950 font-black" : "text-white")}>{ev.title}</h3>
                                    <p className={cn("text-[10px] font-bold", isLight ? "text-purple-700 font-extrabold" : "text-purple-400")}>{ev.client}</p>
                                 </div>
                                 <Badge className={cn("text-[9px] font-black uppercase shrink-0 px-2 h-5.5", getTypeMeta(ev.type).bg)}>
                                    {getTypeMeta(ev.type).label}
                                 </Badge>
                              </div>

                              <div className={cn("space-y-1.5 font-sans text-[10px] rounded-md p-2.5", isLight ? "text-zinc-805 bg-zinc-200/60 font-bold" : "text-zinc-400 bg-black/25")}>
                                 <div className="flex items-center gap-1.5">
                                    <Clock size={11} className={isLight ? "text-zinc-650" : "text-zinc-500"} />
                                    <span>Horário: <strong>{ev.time} hs</strong></span>
                                 </div>
                                 {ev.pedido && (
                                    <div className="flex items-center gap-1.5">
                                       <Tag size={11} className={isLight ? "text-zinc-650" : "text-zinc-500"} />
                                       <span>Pedido: <strong>{ev.pedido}</strong></span>
                                    </div>
                                 )}
                                 {ev.vendedor && (
                                    <div className="flex items-center gap-1.5">
                                       <User size={11} className="text-zinc-500" />
                                       <span className="truncate">Vendedor: <strong className={isLight ? "text-zinc-950 font-black" : "text-white"}>{ev.vendedor}</strong></span>
                                    </div>
                                 )}
                                 {ev.team && (
                                    <div className="flex items-center gap-1.5">
                                       <User size={11} className="text-zinc-500" />
                                       <span className="truncate">Staff: <strong className={isLight ? "text-zinc-950 font-black" : "text-white"}>{ev.team}</strong></span>
                                    </div>
                                 )}
                                 {ev.address && (
                                    <div className="flex items-center gap-1.5">
                                       <MapPin size={11} className="text-zinc-500" />
                                       <span className="truncate">Local: <strong className={isLight ? "text-zinc-950 font-black" : "text-white"}>{ev.address}</strong></span>
                                    </div>
                                 )}
                              </div>

                              <div className="flex justify-between items-center border-t border-transparent pt-3 mt-3">
                                 <button 
                                   onClick={() => handleToggleStatus(ev.id)}
                                   className={cn(
                                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase transition-all",
                                      ev.status === 'realizado'
                                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                      : "bg-purple-600/10 text-purple-400 hover:bg-purple-650/20 border border-purple-500/20"
                                   )}
                                 >
                                    <CheckCircle size={10} />
                                    {ev.status === 'realizado' ? 'Finalizado' : 'Set Finalizado'}
                                 </button>

                                 <button 
                                   onClick={() => handleDeleteEvent(ev.id)}
                                   className="text-zinc-600 hover:text-red-500 transition-colors p-1"
                                 >
                                    <X size={12} />
                                 </button>
                              </div>
                           </div>
                        ))
                     )}
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}
