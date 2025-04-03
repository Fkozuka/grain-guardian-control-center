
import React from 'react';
import { X } from 'lucide-react';
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

interface BlockedFlowsListProps {
  flows: FlowPath[];
}

const BlockedFlowsList: React.FC<BlockedFlowsListProps> = ({ flows }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <X size={18} className="text-red-500" />
          Fluxos Bloqueados
        </CardTitle>
      </CardHeader>
      <CardContent>
        {flows.map((flow) => (
          <FlowItem key={flow.id} flow={flow} variant="blocked" />
        ))}
      </CardContent>
    </Card>
  );
};

export default BlockedFlowsList;
