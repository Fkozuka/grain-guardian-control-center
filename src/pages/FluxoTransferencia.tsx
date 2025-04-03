
import React from 'react';
import Layout from '@/components/Layout';
import AvailableFlowsList from '@/components/flows/AvailableFlowsList';
import FlowTabs from '@/components/flows/FlowTabs';
import { useFlows } from '@/hooks/use-flows';

const FluxoTransferencia = () => {
  const { 
    flows: { possibleFlows, activeFlows, blockedFlows }, 
    selectedFlow, 
    handleActivateFlow, 
    handleConfirmFlow 
  } = useFlows();

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Fluxo de Transferência</h1>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Flow Selection */}
          <AvailableFlowsList 
            flows={possibleFlows}
            selectedFlow={selectedFlow}
            onSelectFlow={handleActivateFlow}
            onConfirmFlow={handleConfirmFlow}
          />
          
          {/* Flows Lists */}
          <FlowTabs 
            activeFlows={activeFlows}
            blockedFlows={blockedFlows}
          />
        </div>
      </div>
    </Layout>
  );
};

export default FluxoTransferencia;
