
import React, { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  equipmentList, 
  EquipmentType, 
  generateAvailabilityData, 
  generateFailureData, 
  generateOperationTimeData, 
  generateTonsPerHourData,
  generateReceptionProgressData,
  linesList,
  shiftsList
} from '@/utils/chartsData';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const Charts = () => {
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('week');
  const [selectedLine, setSelectedLine] = useState<string>('all');
  const [selectedShift, setSelectedShift] = useState<string>('all');

  // Get days based on selected period
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

  // Format date for x-axis
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  const days = getDaysForPeriod();

  const renderEquipmentCharts = (type: EquipmentType) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {equipmentList[type].map((equipment) => (
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
                        <Tooltip />
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
                        <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'Disponibilidade']} />
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

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-industrial-background">
        <Sidebar />
        
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          
          <div className="flex-1 overflow-auto p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Gráficos</h1>
              
              <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                <Select value={period} onValueChange={(val) => setPeriod(val as any)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Hoje</SelectItem>
                    <SelectItem value="week">Semana</SelectItem>
                    <SelectItem value="month">Mês</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedLine} onValueChange={setSelectedLine}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Linha" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas Linhas</SelectItem>
                    {linesList.map(line => (
                      <SelectItem key={line} value={line}>{line}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedShift} onValueChange={setSelectedShift}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Turno" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos Turnos</SelectItem>
                    {shiftsList.map(shift => (
                      <SelectItem key={shift} value={shift}>Turno {shift}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 mb-6">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Tonelada/Hora por Equipamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          ...generateTonsPerHourData(equipmentList.elevadores),
                          ...generateTonsPerHourData(equipmentList.corrente),
                          ...generateTonsPerHourData(equipmentList.fita),
                          ...generateTonsPerHourData(equipmentList.rosca)
                        ]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                        <YAxis label={{ value: 'Tonelada/Hora', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value) => [`${value.toFixed(1)} ton/h`, 'Desempenho']} />
                        <Legend />
                        <Bar dataKey="value" name="Tonelada/Hora" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Avanço do Recebimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={generateReceptionProgressData()}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis label={{ value: 'Toneladas', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="goal" 
                          name="Meta" 
                          stroke="#8884d8" 
                          fill="#8884d8"
                          fillOpacity={0.2}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="actual" 
                          name="Realizado" 
                          stroke="#82ca9d" 
                          fill="#82ca9d"
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="elevadores" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                <TabsTrigger value="elevadores">Elevadores</TabsTrigger>
                <TabsTrigger value="corrente">Transportadores por Corrente</TabsTrigger>
                <TabsTrigger value="fita">Transportadores por Fita</TabsTrigger>
                <TabsTrigger value="rosca">Transportadores por Rosca</TabsTrigger>
              </TabsList>
              
              <TabsContent value="elevadores" className="mt-0">
                {renderEquipmentCharts('elevadores')}
              </TabsContent>
              
              <TabsContent value="corrente" className="mt-0">
                {renderEquipmentCharts('corrente')}
              </TabsContent>
              
              <TabsContent value="fita" className="mt-0">
                {renderEquipmentCharts('fita')}
              </TabsContent>
              
              <TabsContent value="rosca" className="mt-0">
                {renderEquipmentCharts('rosca')}
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <MobileNav />
      </div>
      
      <Toaster />
    </>
  );
};

export default Charts;
