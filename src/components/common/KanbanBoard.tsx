import React from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { KanbanColumn, KanbanItem } from '@/src/types/common';
import { MoreHorizontal, GripVertical, Calendar, Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface KanbanBoardProps {
  columns: KanbanColumn[];
  items: KanbanItem[];
  onItemMove?: (itemId: string, newStatus: string) => void;
  renderCard?: (item: KanbanItem) => React.ReactNode;
}

export function KanbanBoard({ columns, items, onItemMove, renderCard }: KanbanBoardProps) {
  const [activeItem, setActiveItem] = React.useState<KanbanItem | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const item = items.find((i) => i.id === active.id);
    if (item) setActiveItem(item);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const itemId = active.id as string;
    const overId = over.id as string;

    // Determine if we dropped over a column or another item
    const newStatus = columns.find((c) => c.id === overId)?.id || 
                     items.find((i) => i.id === overId)?.status;

    if (newStatus && onItemMove) {
      onItemMove(itemId, newStatus);
    }

    setActiveItem(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 h-full overflow-x-auto pb-4 scrollbar-hide">
        {columns.map((column) => (
          <KanbanColumnContainer 
            key={column.id} 
            column={column} 
            items={items.filter((i) => i.status === column.id)}
            renderCard={renderCard}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: '0.5',
              },
            },
          }),
        }}>
        {activeItem ? (
          <div className="w-[320px]">
            {renderCard ? renderCard(activeItem) : <DefaultKanbanCard item={activeItem} isDragging />}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function KanbanColumnContainer({ column, items, renderCard }: { column: KanbanColumn, items: KanbanItem[], renderCard?: (item: KanbanItem) => React.ReactNode, key?: React.Key }) {
  return (
    <div className="flex flex-col w-[320px] min-w-[320px] h-full rounded-2xl bg-zinc-900/40 border border-white/5 overflow-hidden">
      <div className="p-4 flex items-center justify-between border-b border-white/5 bg-white/[0.01]">
        <div className="flex items-center gap-3">
          <div className={cn("w-1.5 h-6 rounded-full shadow-[0_0_10px_currentColor]", column.color || "text-blue-500")} />
          <h3 className="text-xs font-black uppercase tracking-widest text-white/90">{column.title}</h3>
          <Badge variant="outline" className="bg-white/5 border-white/10 text-[10px] text-zinc-400 h-5">
            {items.length}
          </Badge>
        </div>
        <button className="text-zinc-500 hover:text-white transition-colors">
          <MoreHorizontal size={14} />
        </button>
      </div>

      <div className="flex-1 p-3 overflow-y-auto scrollbar-hide">
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-3 min-h-[100px]">
            {items.map((item) => (
              <SortableItem key={item.id} item={item} renderCard={renderCard} />
            ))}
          </div>
        </SortableContext>
      </div>
      
      <button className="p-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white border-t border-white/5 hover:bg-white/[0.02] transition-all text-center">
        + Adicionar Item
      </button>
    </div>
  );
}

function SortableItem({ item, renderCard }: { item: KanbanItem, renderCard?: (item: KanbanItem) => React.ReactNode, key?: React.Key }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div 
        ref={setNodeRef} 
        style={style} 
        className="opacity-30 border-2 border-dashed border-blue-500/50 rounded-xl min-h-[120px] bg-blue-500/5"
      />
    );
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {renderCard ? renderCard(item) : <DefaultKanbanCard item={item} />}
    </div>
  );
}

function DefaultKanbanCard({ item, isDragging }: { item: KanbanItem; isDragging?: boolean }) {
  return (
    <motion.div
      layout
      className={cn(
        "group p-4 rounded-xl bg-[#1a1a20]/80 border border-white/5 hover:border-white/10 transition-all cursor-grab active:cursor-grabbing",
        isDragging && "shadow-2xl ring-2 ring-blue-500/20"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-col gap-1">
          {item.tags?.length ? (
            <div className="flex flex-wrap gap-1 mb-2">
              {item.tags.map((tag, idx) => (
                <span key={idx} className={cn("text-[8px] font-black uppercase px-2 py-0.5 rounded-full", tag.color)}>
                  {tag.label}
                </span>
              ))}
            </div>
          ) : null}
          <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors leading-snug">
            {item.title}
          </h4>
          {item.subtitle && <p className="text-[11px] text-zinc-500 font-medium tracking-tight">{item.subtitle}</p>}
        </div>
        <GripVertical className="text-zinc-700 group-hover:text-zinc-500 transition-colors" size={14} />
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex -space-x-2">
           {item.assignee && (
             <div className="w-6 h-6 rounded-full bg-zinc-800 border-2 border-[#1a1a20] flex items-center justify-center overflow-hidden">
                {item.assignee.avatar ? (
                  <img src={item.assignee.avatar} alt={item.assignee.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <User className="w-3 h-3 text-zinc-500" />
                )}
             </div>
           )}
        </div>
        
        <div className="flex items-center gap-3">
           {item.value && (
             <div className="text-[10px] font-bold text-emerald-500">{item.value}</div>
           )}
           {item.date && (
             <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-medium">
               <Calendar size={10} />
               {item.date}
             </div>
           )}
        </div>
      </div>
    </motion.div>
  );
}
