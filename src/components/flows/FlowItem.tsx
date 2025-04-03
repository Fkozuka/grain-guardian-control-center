
import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import FlowStepsDisplay from './FlowStepsDisplay';

interface FlowStep {
  id: string;
  name: string;
  type: string;
  position?: number;
  status: 'running' | 'warning' | 'error' | 'inactive';
}

interface FlowPath {
  id: string;
  name: string;
  steps: FlowStep[];
  status: 'available' | 'active' | 'blocked';
  blockReason?: string;
}

interface FlowItemProps {
  flow: FlowPath;
  variant: 'available' | 'active' | 'blocked';
  onSelect?: (flow: FlowPath) => void;
  isSelected?: boolean;
}

const FlowItem: React.FC<FlowItemProps> = ({ flow, variant, onSelect, isSelected = false }) => {
  // Function to get the correct status badge
  const getStatusBadge = () => {
    switch (variant) {
      case 'available':
        return <Badge className="bg-blue-500 text-white">Disponível</Badge>;
      case 'active':
        return (
          <Badge variant="outline" className="border-green-500 text-green-700 bg-green-50 flex items-center gap-1">
            <Clock size={12} />
            Em execução
          </Badge>
        );
      case 'blocked':
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle size={12} />
            Bloqueado
          </Badge>
        );
      default:
        return null;
    }
  };

  // Determine the container class based on the variant
  const getContainerClassName = () => {
    switch (variant) {
      case 'available':
        return isSelected 
          ? 'border-blue-500 bg-blue-50' 
          : 'border hover:bg-gray-50';
      case 'active':
        return 'border border-green-200 bg-green-50';
      case 'blocked':
        return 'border border-red-200 bg-red-50';
      default:
        return 'border';
    }
  };

  const handleClick = () => {
    if (onSelect && variant === 'available') {
      onSelect(flow);
    }
  };

  return (
    <div 
      className={`p-3 rounded-md transition-colors ${variant === 'available' ? 'cursor-pointer' : ''} ${getContainerClassName()} mb-4 last:mb-0`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{flow.name}</h3>
        {getStatusBadge()}
      </div>
      
      <FlowStepsDisplay steps={flow.steps} variant={variant} />
      
      {variant === 'blocked' && flow.blockReason && (
        <div className="text-sm text-red-600 flex items-center gap-1 mt-2">
          <AlertTriangle size={14} />
          <span>Motivo: {flow.blockReason}</span>
        </div>
      )}
    </div>
  );
};

export default FlowItem;
