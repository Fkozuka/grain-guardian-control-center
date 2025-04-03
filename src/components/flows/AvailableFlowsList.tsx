
import React from 'react';
import { Play } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import FlowItem from './FlowItem';

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

interface AvailableFlowsListProps {
  flows: FlowPath[];
  selectedFlow: FlowPath | null;
  onSelectFlow: (flow: FlowPath) => void;
  onConfirmFlow: () => void;
}

const AvailableFlowsList: React.FC<AvailableFlowsListProps> = ({ 
  flows, 
  selectedFlow, 
  onSelectFlow, 
  onConfirmFlow 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Play size={18} />
          Fluxos Pré-Definidos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-gray-500 mb-2">
            Selecione um fluxo disponível para ativação:
          </div>
          
          {flows.filter(flow => flow.status === 'available').map((flow) => (
            <FlowItem 
              key={flow.id} 
              flow={flow} 
              variant="available" 
              onSelect={onSelectFlow} 
              isSelected={selectedFlow?.id === flow.id}
            />
          ))}
          
          {selectedFlow && (
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={onConfirmFlow} 
                className="flex items-center gap-2"
              >
                <Check size={16} />
                Confirmar Fluxo
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailableFlowsList;
