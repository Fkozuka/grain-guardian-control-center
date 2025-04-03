
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { equipmentData } from '@/utils/equipmentData';

// Define interface for equipment types
export interface Equipment {
  id: string;
  name: string;
  type: string;
  status: 'running' | 'warning' | 'error' | 'inactive';
  position?: number;
}

// Define interfaces for flow steps
export interface FlowStep {
  id: string;
  name: string;
  type: string;
  position?: number;
  status: 'running' | 'warning' | 'error' | 'inactive';
}

export interface FlowPath {
  id: string;
  name: string;
  steps: FlowStep[];
  status: 'available' | 'active' | 'blocked';
  blockReason?: string;
}

export function useFlows() {
  // Equipment lists for each type
  const moegas: Equipment[] = [
    { id: 'MG1', name: 'Moega 1', type: 'moega', status: 'running' },
    { id: 'MG2', name: 'Moega 2', type: 'moega', status: 'running' },
    { id: 'MG3', name: 'Moega 3', type: 'moega', status: 'inactive' },
  ];
  
  const valvulas: Equipment[] = [
    { id: 'VB-01', name: 'VB-01', type: 'valvula', status: 'running', position: 1 },
    { id: 'VB-02', name: 'VB-02', type: 'valvula', status: 'running', position: 1 },
    { id: 'VT-01', name: 'VT-01', type: 'valvula', status: 'running', position: 2 },
    { id: 'VT-02', name: 'VT-02', type: 'valvula', status: 'error', position: 2 },
    { id: 'VT-03', name: 'VT-03', type: 'valvula', status: 'running', position: 2 },
  ];
  
  const elevadores: Equipment[] = elevadoresData();
  
  const silos: Equipment[] = [
    { id: 'SL1', name: 'Silo Pulmão', type: 'silo', status: 'running' },
    { id: 'SL2', name: 'Silo Armazenamento 1', type: 'silo', status: 'running' },
    { id: 'SL3', name: 'Silo Armazenamento 2', type: 'silo', status: 'warning' },
    { id: 'SL4', name: 'Silo Armazenamento 3', type: 'silo', status: 'running' },
  ];
  
  // Predefined flows
  const possibleFlows: FlowPath[] = [
    {
      id: 'flow1',
      name: 'Moega 1 → Silo Pulmão',
      steps: [
        { id: 'MG1', name: 'Moega 1', type: 'moega', status: 'running' },
        { id: 'VB-01', name: 'VB-01', type: 'valvula', status: 'running', position: 1 },
        { id: 'EL1', name: 'Elevador 1', type: 'elevador', status: 'running' },
        { id: 'VT-01', name: 'VT-01', type: 'valvula', status: 'running', position: 2 },
        { id: 'SL1', name: 'Silo Pulmão', type: 'silo', status: 'running' },
      ],
      status: 'available'
    },
    {
      id: 'flow2',
      name: 'Moega 2 → Silo Armazenamento 1',
      steps: [
        { id: 'MG2', name: 'Moega 2', type: 'moega', status: 'running' },
        { id: 'VB-02', name: 'VB-02', type: 'valvula', status: 'running', position: 1 },
        { id: 'EL2', name: 'Elevador 2', type: 'elevador', status: 'warning' },
        { id: 'VT-03', name: 'VT-03', type: 'valvula', status: 'running', position: 2 },
        { id: 'SL2', name: 'Silo Armazenamento 1', type: 'silo', status: 'running' },
      ],
      status: 'available'
    },
    {
      id: 'flow3',
      name: 'Moega 3 → Silo Armazenamento 2',
      steps: [
        { id: 'MG3', name: 'Moega 3', type: 'moega', status: 'inactive' },
        { id: 'VB-02', name: 'VB-02', type: 'valvula', status: 'running', position: 1 },
        { id: 'EL3', name: 'Elevador 3', type: 'elevador', status: 'error' },
        { id: 'VT-02', name: 'VT-02', type: 'valvula', status: 'error', position: 2 },
        { id: 'SL3', name: 'Silo Armazenamento 2', type: 'silo', status: 'warning' },
      ],
      status: 'blocked',
      blockReason: 'Elevador 3 em falha e Moega 3 inativa'
    },
    {
      id: 'flow4',
      name: 'Moega 2 → Silo Armazenamento 3',
      steps: [
        { id: 'MG2', name: 'Moega 2', type: 'moega', status: 'running' },
        { id: 'VB-01', name: 'VB-01', type: 'valvula', status: 'running', position: 1 },
        { id: 'EL1', name: 'Elevador 1', type: 'elevador', status: 'running' },
        { id: 'VT-03', name: 'VT-03', type: 'valvula', status: 'running', position: 2 },
        { id: 'SL4', name: 'Silo Armazenamento 3', type: 'silo', status: 'running' },
      ],
      status: 'available'
    },
  ];
  
  const activeFlows: FlowPath[] = [
    {
      id: 'active1',
      name: 'Moega 1 → Silo Pulmão',
      steps: [
        { id: 'MG1', name: 'Moega 1', type: 'moega', status: 'running' },
        { id: 'VB-01', name: 'VB-01', type: 'valvula', status: 'running', position: 1 },
        { id: 'EL1', name: 'Elevador 1', type: 'elevador', status: 'running' },
        { id: 'VT-01', name: 'VT-01', type: 'valvula', status: 'running', position: 2 },
        { id: 'SL1', name: 'Silo Pulmão', type: 'silo', status: 'running' },
      ],
      status: 'active'
    }
  ];
  
  const blockedFlows: FlowPath[] = [
    {
      id: 'blocked1',
      name: 'Moega 3 → Silo Armazenamento 2',
      steps: [
        { id: 'MG3', name: 'Moega 3', type: 'moega', status: 'inactive' },
        { id: 'VB-02', name: 'VB-02', type: 'valvula', status: 'running', position: 1 },
        { id: 'EL3', name: 'Elevador 3', type: 'elevador', status: 'error' },
        { id: 'VT-02', name: 'VT-02', type: 'valvula', status: 'error', position: 2 },
        { id: 'SL3', name: 'Silo Armazenamento 2', type: 'silo', status: 'warning' },
      ],
      status: 'blocked',
      blockReason: 'Elevador 3 em falha'
    },
    {
      id: 'blocked2',
      name: 'Moega 2 → Silo Armazenamento 3',
      steps: [
        { id: 'MG2', name: 'Moega 2', type: 'moega', status: 'running' },
        { id: 'VB-01', name: 'VB-01', type: 'valvula', status: 'running', position: 1 },
        { id: 'EL2', name: 'Elevador 2', type: 'elevador', status: 'warning' },
        { id: 'VT-02', name: 'VT-02', type: 'valvula', status: 'error', position: 2 },
        { id: 'SL4', name: 'Silo Armazenamento 3', type: 'silo', status: 'running' },
      ],
      status: 'blocked',
      blockReason: 'VT-02 em falha'
    }
  ];

  // State for the selected flow to activate
  const [selectedFlow, setSelectedFlow] = useState<FlowPath | null>(null);

  // Function to activate a flow
  const handleActivateFlow = (flow: FlowPath) => {
    // Check if any equipment in the flow has an error status
    const hasErrors = flow.steps.some(step => step.status === 'error' || step.status === 'inactive');
    
    if (hasErrors) {
      toast({
        title: "Fluxo com falhas",
        description: "Não é possível ativar um fluxo com equipamentos em falha.",
        variant: "destructive"
      });
      return;
    }
    
    // Update the selected flow
    setSelectedFlow(flow);
    
    toast({
      title: "Fluxo selecionado",
      description: `Fluxo ${flow.name} selecionado. Confirme para ativar.`,
    });
  };

  // Function to confirm flow activation
  const handleConfirmFlow = () => {
    if (!selectedFlow) {
      toast({
        title: "Nenhum fluxo selecionado",
        description: "Por favor, selecione um fluxo para ativar.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Fluxo ativado",
      description: `Fluxo ${selectedFlow.name} foi ativado com sucesso.`,
    });
    
    // Reset selected flow after activation
    setSelectedFlow(null);
  };

  // Helper function to convert equipment data
  function elevadoresData(): Equipment[] {
    return equipmentData.elevadores.map(item => ({
      id: `EL${item.name.split(' ')[1]}`,
      name: item.name,
      type: 'elevador',
      status: getStatusFromEquipmentData(item.status)
    }));
  }

  // Function to convert equipment status to our internal status
  function getStatusFromEquipmentData(status: string): 'running' | 'warning' | 'error' | 'inactive' {
    switch (status) {
      case 'running': return 'running';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'inactive';
    }
  }

  return {
    equipment: {
      moegas,
      valvulas,
      elevadores,
      silos
    },
    flows: {
      possibleFlows,
      activeFlows,
      blockedFlows
    },
    selectedFlow,
    handleActivateFlow,
    handleConfirmFlow
  };
}
