
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ActiveFlowsList from './ActiveFlowsList';
import BlockedFlowsList from './BlockedFlowsList';
import { FlowPath } from '@/hooks/use-flows';

interface FlowTabsProps {
  activeFlows: FlowPath[];
  blockedFlows: FlowPath[];
}

const FlowTabs: React.FC<FlowTabsProps> = ({ activeFlows, blockedFlows }) => {
  return (
    <Tabs defaultValue="active" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="active">Em Execução</TabsTrigger>
        <TabsTrigger value="blocked">Bloqueados</TabsTrigger>
      </TabsList>
      
      <TabsContent value="active" className="mt-4">
        <ActiveFlowsList flows={activeFlows} />
      </TabsContent>
      
      <TabsContent value="blocked" className="mt-4">
        <BlockedFlowsList flows={blockedFlows} />
      </TabsContent>
    </Tabs>
  );
};

export default FlowTabs;
