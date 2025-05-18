import React from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  EquipmentType, 
  generateAvailabilityData, 
  generateFailureData, 
  generateOperationTimeData
} from '@/utils/chartsData';

interface EquipmentChartsProps {
  type: EquipmentType;
  period: 'today' | 'week' | 'month';
  selectedEquipment: string;
}

const EquipmentCharts: React.FC<EquipmentChartsProps> = ({ type, period, selectedEquipment }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };
  
  const getDaysForPeriod = () => {
    switch (period) {
      case 'today':
        return 1;
      case 'week':
        return 7;
      case 'month':
      default:
        return 30;
    }
  };
  
  const days = getDaysForPeriod();
  
  const safeFormatValue = (value: string | number | undefined): string => {
    if (typeof value === 'number') {
      return value.toFixed(1);
    }
    return String(value || '');
  };
  
  const equipmentList = {
    elevadores: ['Elevador 1', 'Elevador 2', 'Elevador 3'],
    corrente: ['Transportador por Corrente 1', 'Transportador por Corrente 2'],
    rosca: ['Transportador por Rosca 1', 'Transportador por Rosca 2']
  };
  
  // Filter the equipment list based on selected equipment
  const filteredEquipmentList = selectedEquipment === 'all' 
    ? equipmentList[type]
    : equipmentList[type].filter(equipment => equipment === selectedEquipment);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredEquipmentList.map((equipment) => (
        <Card key={equipment} className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{equipment}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="failures" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="failures">Falhas</TabsTrigger>
                <TabsTrigger value="availability">Disponibilidade</TabsTrigger>
                <TabsTrigger value="operation">Operação</TabsTrigger>
              </TabsList>
              
              <TabsContent value="failures" className="mt-0">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={generateFailureData(days).map(item => ({
                        name: item.name,
                        value: item.data.reduce((sum, val) => sum + val, 0)
                      }))}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => {
                        const formattedValue = safeFormatValue(value as string | number);
                        return [formattedValue, 'Quantidade'];
                      }} />
                      <Legend />
                      <Bar dataKey="value" name="Quantidade" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="availability" className="mt-0">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={generateAvailabilityData(days, equipment)}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={formatDate} />
                      <YAxis domain={[80, 100]} />
                      <Tooltip formatter={(value) => {
                        const formattedValue = safeFormatValue(value as string | number);
                        return [formattedValue + '%', 'Disponibilidade'];
                      }} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="availability" 
                        name="Disponibilidade (%)" 
                        stroke="#82ca9d" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="operation" className="mt-0">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={generateOperationTimeData(days, equipment).reduce((acc, curr) => {
                        curr.data.forEach((value, index) => {
                          if (!acc[index]) {
                            acc[index] = { name: `Dia ${index + 1}` };
                          }
                          acc[index][curr.name] = value;
                        });
                        return acc;
                      }, [] as Record<string, any>[])}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Manhã" fill="#8884d8" />
                      <Bar dataKey="Tarde" fill="#82ca9d" />
                      <Bar dataKey="Noite" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EquipmentCharts;
