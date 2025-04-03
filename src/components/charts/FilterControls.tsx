
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterControlsProps {
  period: 'today' | 'week' | 'month';
  selectedLine: string;
  selectedShift: string;
  setPeriod: (period: 'today' | 'week' | 'month') => void;
  setSelectedLine: (line: string) => void;
  setSelectedShift: (shift: string) => void;
  linesList: string[];
  shiftsList: string[];
}

const FilterControls: React.FC<FilterControlsProps> = ({
  period,
  selectedLine,
  selectedShift,
  setPeriod,
  setSelectedLine,
  setSelectedShift,
  linesList,
  shiftsList
}) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
      <Select value={period} onValueChange={(val) => setPeriod(val as any)}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Hoje</SelectItem>
          <SelectItem value="week">Semana</SelectItem>
          <SelectItem value="month">Mês</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={selectedLine} onValueChange={setSelectedLine}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Linha" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas Linhas</SelectItem>
          {linesList.map(line => (
            <SelectItem key={line} value={line}>{line}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select value={selectedShift} onValueChange={setSelectedShift}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Turno" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos Turnos</SelectItem>
          {shiftsList.map(shift => (
            <SelectItem key={shift} value={shift}>Turno {shift}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterControls;
