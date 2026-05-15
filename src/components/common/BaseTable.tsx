import React from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  MoreVertical, 
  Filter,
  Download,
  Trash2,
  Edit2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface Column<T> {
  header: string;
  accessorKey: keyof T | string;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface BaseTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  searchPlaceholder?: string;
  actions?: (item: T) => React.ReactNode;
  className?: string;
}

export function BaseTable<T extends { id: string | number }>({ 
  data, 
  columns, 
  onRowClick, 
  isLoading,
  searchPlaceholder = "Pesquisar...",
  actions,
  className
}: BaseTableProps<T>) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortKey, setSortKey] = React.useState<keyof T | string | null>(null);
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');

  const filteredData = React.useMemo(() => {
    let result = [...data];
    if (searchTerm) {
      result = result.filter(item => 
        Object.values(item).some(val => 
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    if (sortKey) {
      result.sort((a, b) => {
        const valA = a[sortKey as keyof T];
        const valB = b[sortKey as keyof T];
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [data, searchTerm, sortKey, sortOrder]);

  return (
    <div className="space-y-4">
      {/* Table Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <Input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={searchPlaceholder}
            className="pl-10 bg-white/5 border-white/5 h-11 rounded-xl text-sm focus-visible:ring-1 focus-visible:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="bg-white/5 border-white/5 h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white">
            <Filter className="mr-2" size={14} /> Filtros
          </Button>
          <Button variant="outline" className="bg-white/5 border-white/5 h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white">
            <Download className="mr-2" size={14} /> Exportar
          </Button>
        </div>
      </div>

      {/* Table Surface */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
             <thead>
               <tr className="bg-white/[0.02] border-b border-white/5 h-14">
                  <th className="w-12 px-6">
                    <Checkbox className="border-white/20 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                  </th>
                  {columns.map((col, idx) => (
                    <th 
                      key={idx} 
                      className={cn(
                        "px-6 text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500 transition-colors",
                        col.sortable && "cursor-pointer hover:text-white"
                      )}
                      onClick={() => {
                        if (col.sortable) {
                          setSortOrder(sortKey === col.accessorKey && sortOrder === 'asc' ? 'desc' : 'asc');
                          setSortKey(col.accessorKey as string);
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {col.header}
                        {sortKey === col.accessorKey && (
                          sortOrder === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                        )}
                      </div>
                    </th>
                  ))}
                  <th className="w-16 px-6"></th>
               </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={columns.length + 2} className="h-16 px-6">
                         <div className="h-4 bg-white/5 rounded w-full" />
                      </td>
                    </tr>
                  ))
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + 2} className="h-40 px-6 text-center">
                       <p className="text-sm text-zinc-500 italic">Nenhum registro encontrado núcleo operacional KORTECK.</p>
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr 
                      key={item.id} 
                      onClick={() => onRowClick?.(item)}
                      className={cn(
                        "h-16 hover:bg-white/[0.02] transition-colors group",
                        onRowClick && "cursor-pointer"
                      )}
                    >
                      <td className="px-6" onClick={(e) => e.stopPropagation()}>
                        <Checkbox className="border-white/20 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                      </td>
                      {columns.map((col, idx) => (
                        <td key={idx} className="px-6">
                           <div className="text-sm font-medium tracking-tight text-zinc-300 group-hover:text-white transition-colors">
                              {col.cell ? col.cell(item) : String(item[col.accessorKey as keyof T] || '-')}
                           </div>
                        </td>
                      ))}
                      <td className="px-6 text-right" onClick={(e) => e.stopPropagation()}>
                         {actions ? actions(item) : (
                           <DropdownMenu>
                             <DropdownMenuTrigger className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition-all">
                               <MoreVertical size={16} />
                             </DropdownMenuTrigger>
                             <DropdownMenuContent align="end" className="bg-zinc-900 border-white/5 p-2 min-w-[140px]">
                                <DropdownMenuItem className="gap-3 text-[11px] font-bold uppercase tracking-widest p-3 focus:bg-white/5 cursor-pointer">
                                  <Edit2 size={12} className="text-blue-500" /> Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-3 text-[11px] font-bold uppercase tracking-widest p-3 focus:bg-red-500/10 text-red-500 cursor-pointer">
                                  <Trash2 size={12} /> Excluir
                                </DropdownMenuItem>
                             </DropdownMenuContent>
                           </DropdownMenu>
                         )}
                      </td>
                    </tr>
                  ))
                )}
             </tbody>
          </table>
        </div>

        {/* Table Pagination Info */}
        <div className="h-14 px-6 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
           <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
             Mostrando {filteredData.length} de {data.length} registros
           </div>
           <div className="flex items-center gap-4">
              <Button variant="ghost" disabled className="h-8 w-8 p-0 rounded-lg text-zinc-500">
                <ChevronLeft size={16} />
              </Button>
              <div className="text-[10px] font-black text-white">1 / 1</div>
              <Button variant="ghost" disabled className="h-8 w-8 p-0 rounded-lg text-zinc-500 text-white">
                <ChevronRight size={16} />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
