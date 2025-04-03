
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Info, Activity, AlertTriangle } from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';

type EquipmentStatus = 'operando' | 'alerta' | 'falha' | 'inativo';

interface EquipmentData {
  id: string;
  name: string;
  type: string;
  status: EquipmentStatus;
  lastMaintenance?: string;
  nextMaintenance?: string;
  motorInfo?: {
    power: string;
    rpm: number;
    current: number;
    temperature: number;
  };
  alerts?: string[];
}

const getStatusClass = (status: EquipmentStatus): string => {
  switch (status) {
    case 'operando': return 'bg-industrial-success text-white';
    case 'alerta': return 'bg-industrial-warning text-industrial-dark';
    case 'falha': return 'bg-industrial-danger text-white';
    case 'inativo': 
    default: return 'bg-gray-400 text-white';
  }
};

const getStatusText = (status: EquipmentStatus): string => {
  switch (status) {
    case 'operando': return 'Operando';
    case 'alerta': return 'Em Alerta';
    case 'falha': return 'Falha';
    case 'inativo': 
    default: return 'Inativo';
  }
};

const Equipamento: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [equipment, setEquipment] = useState<EquipmentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data fetch - seria substituído por uma chamada API real
    const fetchEquipment = () => {
      setTimeout(() => {
        // Simulando dados do equipamento
        const mockData: EquipmentData = {
          id: id || '',
          name: `Equipamento ${id}`,
          type: id?.startsWith('EL') ? 'Elevador' : 
                id?.startsWith('TC') ? 'Transportador por Corrente' : 
                id?.startsWith('TR') || id?.startsWith('RT') ? 'Transportador por Rosca' : 
                id?.startsWith('SL') ? 'Silo' : 'Outro',
          status: Math.random() > 0.7 ? 'operando' : 
                 Math.random() > 0.5 ? 'alerta' : 
                 Math.random() > 0.3 ? 'falha' : 'inativo',
          lastMaintenance: '10/03/2025',
          nextMaintenance: '10/06/2025',
          motorInfo: {
            power: '15 kW',
            rpm: 1750,
            current: 22.3,
            temperature: 42.8
          },
          alerts: Math.random() > 0.5 ? ['Temperatura acima do normal', 'Vibração detectada'] : []
        };
        
        setEquipment(mockData);
        setLoading(false);
      }, 1000);
    };

    fetchEquipment();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="p-6 flex items-center justify-center h-full">
          <div className="animate-pulse">Carregando dados do equipamento...</div>
        </div>
      </Layout>
    );
  }

  if (!equipment) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-industrial-danger">Equipamento não encontrado.</div>
          <Button asChild className="mt-4">
            <Link to="/fluxograma">Voltar ao Fluxograma</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Button variant="outline" asChild className="mr-4">
            <Link to="/fluxograma">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Fluxograma
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{equipment.name}</h1>
          <span className={`ml-3 px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(equipment.status)}`}>
            {getStatusText(equipment.status)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Info className="mr-2 h-5 w-5" />
                Informações Gerais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">TAG:</span>
                  <span className="font-medium">{equipment.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tipo:</span>
                  <span className="font-medium">{equipment.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Última Manutenção:</span>
                  <span className="font-medium">{equipment.lastMaintenance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Próxima Manutenção:</span>
                  <span className="font-medium">{equipment.nextMaintenance}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Activity className="mr-2 h-5 w-5" />
                Dados do Motor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Potência:</span>
                  <span className="font-medium">{equipment.motorInfo?.power}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">RPM:</span>
                  <span className="font-medium">{equipment.motorInfo?.rpm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Corrente:</span>
                  <span className="font-medium">{equipment.motorInfo?.current} A</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Temperatura:</span>
                  <span className="font-medium">{equipment.motorInfo?.temperature}°C</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Alertas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {equipment.alerts && equipment.alerts.length > 0 ? (
                <ul className="space-y-2 list-disc list-inside text-industrial-warning">
                  {equipment.alerts.map((alert, index) => (
                    <li key={index}>{alert}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-industrial-success">Nenhum alerta no momento</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Tabs defaultValue="grafico">
            <TabsList>
              <TabsTrigger value="grafico">Gráficos</TabsTrigger>
              <TabsTrigger value="comando">Comandos</TabsTrigger>
              <TabsTrigger value="historico">Histórico</TabsTrigger>
            </TabsList>
            <TabsContent value="grafico" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                    <span className="text-gray-500">Gráficos do equipamento serão exibidos aqui</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="comando" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Controle Manual</h3>
                    <div className="flex gap-4">
                      <Button>Ligar</Button>
                      <Button variant="destructive">Desligar</Button>
                      <Button variant="outline">Reiniciar</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="historico" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="h-64 overflow-auto">
                    <div className="space-y-4">
                      <div className="border-l-4 border-industrial-primary pl-3 pb-3">
                        <div className="font-medium">Manutenção Preventiva</div>
                        <div className="text-sm text-gray-500">10/03/2025 - Técnico: João Silva</div>
                        <div className="mt-1">Troca de rolamentos e lubrificação geral.</div>
                      </div>
                      <div className="border-l-4 border-industrial-danger pl-3 pb-3">
                        <div className="font-medium">Falha Detectada</div>
                        <div className="text-sm text-gray-500">25/02/2025 - Sistema</div>
                        <div className="mt-1">Temperatura acima do limite - Parada automática acionada.</div>
                      </div>
                      <div className="border-l-4 border-industrial-warning pl-3 pb-3">
                        <div className="font-medium">Alerta</div>
                        <div className="text-sm text-gray-500">24/02/2025 - Sistema</div>
                        <div className="mt-1">Vibração anormal detectada.</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Equipamento;
