
import React from 'react';
import { Play } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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

interface ActiveFlowsListProps {
  flows: FlowPath[];
}

const ActiveFlowsList: React.FC<ActiveFlowsListProps> = ({ flows }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Play size={18} className="text-green-500" />
          Fluxos em Execução
        </CardTitle>
      </CardHeader>
      <CardContent>
        {flows.length > 0 ? (
          flows.map((flow) => (
            <FlowItem key={flow.id} flow={flow} variant="active" />
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">
            Nenhum fluxo em execução no momento.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActiveFlowsList;
