
import React, { useState, useMemo } from 'react';
import { Check, AlertTriangle, ArrowRight, Play, X, Clock, AlertCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { equipmentData } from '@/utils/equipmentData';

// Define interface for equipment types
interface Equipment {
  id: string;
  name: string;
  type: string;
  status: 'running' | 'warning' | 'error' | 'inactive';
  position?: number;
}

// Define interfaces for flow steps
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

const FluxoTransferencia = () => {
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
  
  // State for selected flow
  const [flowSteps, setFlowSteps] = useState<FlowStep[]>([]);
  const [selectedOrigin, setSelectedOrigin] = useState<string>('');
  const [selectedValve1, setSelectedValve1] = useState<string>('');
  const [selectedElevator, setSelectedElevator] = useState<string>('');
  const [selectedValve2, setSelectedValve2] = useState<string>('');
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  
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
    }
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

  // Function to check if the current flow has any failed equipment
  const hasFailedEquipment = useMemo(() => {
    if (flowSteps.length === 0) return false;
    return flowSteps.some(step => step.status === 'error');
  }, [flowSteps]);

  // Function to get the correct status color class
  const getStatusColorClass = (status: string) => {
    switch (status) {
      case 'running': return 'bg-industrial-success text-white';
      case 'warning': return 'bg-industrial-warning text-white';
      case 'error': return 'bg-industrial-danger text-white';
      case 'inactive': return 'bg-gray-400 text-white';
      case 'available': return 'bg-blue-500 text-white';
      case 'active': return 'bg-green-500 text-white';
      case 'blocked': return 'bg-red-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const getEquipmentByIdAndType = (id: string, type: string): Equipment | undefined => {
    switch (type) {
      case 'moega': return moegas.find(item => item.id === id);
      case 'valvula': return valvulas.find(item => item.id === id);
      case 'elevador': return elevadores.find(item => item.id === id);
      case 'silo': return silos.find(item => item.id === id);
      default: return undefined;
    }
  };

  // Function to update the flow steps based on selections
  const updateFlowSteps = () => {
    const newSteps: FlowStep[] = [];
    
    if (selectedOrigin) {
      const origin = moegas.find(item => item.id === selectedOrigin);
      if (origin) newSteps.push(origin);
    }
    
    if (selectedValve1) {
      const valve1 = valvulas.find(item => item.id === selectedValve1);
      if (valve1) newSteps.push(valve1);
    }
    
    if (selectedElevator) {
      const elevator = elevadores.find(item => item.id === selectedElevator);
      if (elevator) newSteps.push(elevator);
    }
    
    if (selectedValve2) {
      const valve2 = valvulas.find(item => item.id === selectedValve2);
      if (valve2) newSteps.push(valve2);
    }
    
    if (selectedDestination) {
      const destination = silos.find(item => item.id === selectedDestination);
      if (destination) newSteps.push(destination);
    }
    
    setFlowSteps(newSteps);
  };

  // Update flow steps when selections change
  React.useEffect(() => {
    updateFlowSteps();
  }, [selectedOrigin, selectedValve1, selectedElevator, selectedValve2, selectedDestination]);

  // Handle form submission
  const handleConfirmFlow = () => {
    if (flowSteps.length < 5) {
      toast({
        title: "Fluxo incompleto",
        description: "Por favor, selecione todos os componentes do fluxo.",
        variant: "destructive"
      });
      return;
    }

    if (hasFailedEquipment) {
      toast({
        title: "Fluxo com falhas",
        description: "Não é possível confirmar um fluxo com equipamentos em falha.",
        variant: "destructive"
      });
      return;
    }

    // Simulate adding the flow to active flows
    toast({
      title: "Fluxo confirmado",
      description: `Fluxo de ${flowSteps[0].name} para ${flowSteps[flowSteps.length - 1].name} ativado com sucesso.`,
    });
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

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Fluxo de Transferência</h1>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Flow Constructor */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Play size={18} />
                Criador de Fluxo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Origem</label>
                  <Select value={selectedOrigin} onValueChange={setSelectedOrigin}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a moega" />
                    </SelectTrigger>
                    <SelectContent>
                      {moegas.map((moega) => (
                        <SelectItem key={moega.id} value={moega.id}>
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${getStatusColorClass(moega.status)}`}></span>
                            {moega.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Válvula (Pos 1)</label>
                  <Select value={selectedValve1} onValueChange={setSelectedValve1} disabled={!selectedOrigin}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a válvula" />
                    </SelectTrigger>
                    <SelectContent>
                      {valvulas
                        .filter(valve => valve.position === 1)
                        .map((valve) => (
                          <SelectItem key={valve.id} value={valve.id}>
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${getStatusColorClass(valve.status)}`}></span>
                              {valve.name}
                            </div>
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Elevador</label>
                  <Select value={selectedElevator} onValueChange={setSelectedElevator} disabled={!selectedValve1}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o elevador" />
                    </SelectTrigger>
                    <SelectContent>
                      {elevadores.map((elevator) => (
                        <SelectItem key={elevator.id} value={elevator.id}>
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${getStatusColorClass(elevator.status)}`}></span>
                            {elevator.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Válvula (Pos 2)</label>
                  <Select value={selectedValve2} onValueChange={setSelectedValve2} disabled={!selectedElevator}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a válvula" />
                    </SelectTrigger>
                    <SelectContent>
                      {valvulas
                        .filter(valve => valve.position === 2)
                        .map((valve) => (
                          <SelectItem key={valve.id} value={valve.id}>
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${getStatusColorClass(valve.status)}`}></span>
                              {valve.name}
                            </div>
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destino</label>
                  <Select value={selectedDestination} onValueChange={setSelectedDestination} disabled={!selectedValve2}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o silo" />
                    </SelectTrigger>
                    <SelectContent>
                      {silos.map((silo) => (
                        <SelectItem key={silo.id} value={silo.id}>
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${getStatusColorClass(silo.status)}`}></span>
                            {silo.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Flow Visualization */}
              {flowSteps.length > 0 && (
                <div className="mt-6 border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-2">Visualização do Fluxo:</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    {flowSteps.map((step, index) => (
                      <React.Fragment key={step.id}>
                        <div className={`px-3 py-1 rounded-md ${step.status === 'error' ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-gray-100'}`}>
                          <div className="flex items-center gap-1">
                            <span className={`w-2 h-2 rounded-full ${getStatusColorClass(step.status)}`}></span>
                            <span>{step.name}</span>
                            {step.status === 'error' && <AlertTriangle size={14} className="text-red-500" />}
                            {step.status === 'warning' && <AlertCircle size={14} className="text-amber-500" />}
                          </div>
                        </div>
                        {index < flowSteps.length - 1 && (
                          <ArrowRight size={16} className="text-gray-400" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button 
                      onClick={handleConfirmFlow} 
                      disabled={hasFailedEquipment || flowSteps.length < 5}
                      className="flex items-center gap-2"
                    >
                      {hasFailedEquipment ? <X size={16} /> : <Check size={16} />}
                      Confirmar Fluxo
                    </Button>
                  </div>
                  
                  {hasFailedEquipment && (
                    <div className="mt-2 text-sm text-red-600">
                      O fluxo não pode ser confirmado devido a equipamentos com falha.
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Flows Lists */}
          <Tabs defaultValue="possible" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="possible">Fluxos Possíveis</TabsTrigger>
              <TabsTrigger value="active">Em Execução</TabsTrigger>
              <TabsTrigger value="blocked">Bloqueados</TabsTrigger>
            </TabsList>
            
            <TabsContent value="possible" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Check size={18} className="text-green-500" />
                    Fluxos Possíveis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {possibleFlows.map((flow) => (
                    <div key={flow.id} className="mb-4 last:mb-0 p-3 border rounded-md hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{flow.name}</h3>
                        <Badge className={getStatusColorClass('available')}>Disponível</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {flow.steps.map((step, index) => (
                          <React.Fragment key={step.id}>
                            <div className="px-2 py-1 bg-gray-100 rounded-md flex items-center gap-1">
                              <span className={`w-2 h-2 rounded-full ${getStatusColorClass(step.status)}`}></span>
                              <span className="text-sm">{step.name}</span>
                            </div>
                            {index < flow.steps.length - 1 && (
                              <ArrowRight size={14} className="text-gray-400" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="active" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Play size={18} className="text-green-500" />
                    Fluxos em Execução
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {activeFlows.length > 0 ? (
                    activeFlows.map((flow) => (
                      <div key={flow.id} className="mb-4 last:mb-0 p-3 border border-green-200 rounded-md bg-green-50">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{flow.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="border-green-500 text-green-700 bg-green-50 flex items-center gap-1">
                              <Clock size={12} />
                              Em execução
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          {flow.steps.map((step, index) => (
                            <React.Fragment key={step.id}>
                              <div className="px-2 py-1 bg-green-100 border border-green-200 text-green-800 rounded-md flex items-center gap-1">
                                <span className={`w-2 h-2 rounded-full ${getStatusColorClass(step.status)}`}></span>
                                <span className="text-sm">{step.name}</span>
                              </div>
                              {index < flow.steps.length - 1 && (
                                <ArrowRight size={14} className="text-green-500" />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      Nenhum fluxo em execução no momento.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="blocked" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <X size={18} className="text-red-500" />
                    Fluxos Bloqueados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {blockedFlows.map((flow) => (
                    <div key={flow.id} className="mb-4 last:mb-0 p-3 border border-red-200 rounded-md bg-red-50">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{flow.name}</h3>
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <AlertTriangle size={12} />
                          Bloqueado
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {flow.steps.map((step, index) => (
                          <React.Fragment key={step.id}>
                            <div className={`px-2 py-1 rounded-md flex items-center gap-1 ${
                              step.status === 'error' || step.status === 'inactive' 
                                ? 'bg-red-100 border border-red-200 text-red-800' 
                                : 'bg-gray-100'
                            }`}>
                              <span className={`w-2 h-2 rounded-full ${getStatusColorClass(step.status)}`}></span>
                              <span className="text-sm">{step.name}</span>
                              {(step.status === 'error' || step.status === 'inactive') && (
                                <AlertTriangle size={12} className="text-red-500" />
                              )}
                            </div>
                            {index < flow.steps.length - 1 && (
                              <ArrowRight size={14} className={
                                step.status === 'error' || step.status === 'inactive' 
                                  ? 'text-red-400' 
                                  : 'text-gray-400'
                              } />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                      
                      <div className="text-sm text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle size={14} />
                        <span>Motivo: {flow.blockReason}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default FluxoTransferencia;

