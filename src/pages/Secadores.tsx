
import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Droplets, Thermometer, ArrowDownUp, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import SensorCard from '@/components/SensorCard';

const sampleDryerData = {
  secador1: {
    unidadeEntrada: 18.5,
    unidadeSaida: 14.2,
    temperaturaQueimador: 105,
    temperaturaFornalha: 95,
    temperaturaEntrada: 80,
    temperaturaSaida: 45,
    toneladaHoraEntrada: 28.5,
    toneladaHoraSaida: 26.8,
  },
  secador2: {
    unidadeEntrada: 19.2,
    unidadeSaida: 14.0,
    temperaturaQueimador: 110,
    temperaturaFornalha: 98,
    temperaturaEntrada: 85,
    temperaturaSaida: 42,
    toneladaHoraEntrada: 30.2,
    toneladaHoraSaida: 28.5,
  }
};

const generateChartData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 0; i < 24; i++) {
    const time = new Date(now);
    time.setHours(now.getHours() - 24 + i);
    
    data.push({
      time: format(time, 'HH:mm'),
      temperaturaQueimador1: Math.floor(100 + Math.random() * 15),
      temperaturaFornalha1: Math.floor(90 + Math.random() * 10),
      temperaturaEntrada1: Math.floor(75 + Math.random() * 10),
      temperaturaSaida1: Math.floor(40 + Math.random() * 10),
      unidadeEntrada1: Math.floor(17 + Math.random() * 3),
      unidadeSaida1: Math.floor(13 + Math.random() * 2),
      temperaturaQueimador2: Math.floor(105 + Math.random() * 15),
      temperaturaFornalha2: Math.floor(95 + Math.random() * 10),
      temperaturaEntrada2: Math.floor(80 + Math.random() * 10),
      temperaturaSaida2: Math.floor(40 + Math.random() * 10),
      unidadeEntrada2: Math.floor(18 + Math.random() * 3),
      unidadeSaida2: Math.floor(13 + Math.random() * 2),
    });
  }
  
  return data;
};

const Secadores: React.FC = () => {
  const [chartData] = useState(generateChartData());
  const [selectedDryer, setSelectedDryer] = useState("secador1");
  const [selectedParameter, setSelectedParameter] = useState("temperaturaQueimador");
  const [date, setDate] = useState<Date>(new Date());
  
  const displayParameters = {
    unidadeEntrada: "Unidade de Entrada (%)",
    unidadeSaida: "Unidade de Saída (%)",
    temperaturaQueimador: "Temperatura Queimador (°C)",
    temperaturaFornalha: "Temperatura Fornalha (°C)", 
    temperaturaEntrada: "Temperatura de Entrada (°C)",
    temperaturaSaida: "Temperatura de Saída (°C)",
    toneladaHoraEntrada: "Entrada (t/h)",
    toneladaHoraSaida: "Saída (t/h)"
  };
  
  const getChartLines = () => {
    if (selectedParameter === "all") {
      return (
        <>
          <Line type="monotone" dataKey={`temperaturaQueimador${selectedDryer === "secador1" ? "1" : "2"}`} stroke="#ff7300" name="Temperatura Queimador" />
          <Line type="monotone" dataKey={`temperaturaFornalha${selectedDryer === "secador1" ? "1" : "2"}`} stroke="#ff0000" name="Temperatura Fornalha" />
          <Line type="monotone" dataKey={`temperaturaEntrada${selectedDryer === "secador1" ? "1" : "2"}`} stroke="#82ca9d" name="Temperatura Entrada" />
          <Line type="monotone" dataKey={`temperaturaSaida${selectedDryer === "secador1" ? "1" : "2"}`} stroke="#8884d8" name="Temperatura Saída" />
        </>
      );
    }
    
    return (
      <Line 
        type="monotone" 
        dataKey={`${selectedParameter}${selectedDryer === "secador1" ? "1" : "2"}`}
        stroke="#8884d8" 
        name={displayParameters[selectedParameter as keyof typeof displayParameters]}
      />
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-industrial-primary mb-6 flex items-center">
              <Droplets className="mr-2" /> Secadores
            </h1>
            
            <Tabs defaultValue="secador1" onValueChange={setSelectedDryer}>
              <TabsList className="w-full mb-4">
                <TabsTrigger value="secador1" className="flex-1">Secador 1</TabsTrigger>
                <TabsTrigger value="secador2" className="flex-1">Secador 2</TabsTrigger>
              </TabsList>
              
              <TabsContent value="secador1" className="animate-fade-in">
                <SecadorDashboard data={sampleDryerData.secador1} secadorId="1" />
              </TabsContent>
              
              <TabsContent value="secador2" className="animate-fade-in">
                <SecadorDashboard data={sampleDryerData.secador2} secadorId="2" />
              </TabsContent>
            </Tabs>
            
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Monitoramento de Desempenho</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 mb-4 md:grid-cols-3">
                    <div>
                      <Label htmlFor="parameter">Parâmetro</Label>
                      <Select value={selectedParameter} onValueChange={setSelectedParameter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o parâmetro" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas as Temperaturas</SelectItem>
                          <SelectItem value="temperaturaQueimador">Temperatura Queimador</SelectItem>
                          <SelectItem value="temperaturaFornalha">Temperatura Fornalha</SelectItem>
                          <SelectItem value="temperaturaEntrada">Temperatura Entrada</SelectItem>
                          <SelectItem value="temperaturaSaida">Temperatura Saída</SelectItem>
                          <SelectItem value="unidadeEntrada">Unidade de Entrada</SelectItem>
                          <SelectItem value="unidadeSaida">Unidade de Saída</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Data</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left">
                            <Calendar className="mr-2 h-4 w-4" />
                            {format(date, 'dd/MM/yyyy')}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 z-50" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(newDate) => newDate && setDate(newDate)}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <Label htmlFor="time">Período</Label>
                      <Select defaultValue="24h">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o período" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6h">Últimas 6 horas</SelectItem>
                          <SelectItem value="12h">Últimas 12 horas</SelectItem>
                          <SelectItem value="24h">Últimas 24 horas</SelectItem>
                          <SelectItem value="7d">Últimos 7 dias</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="mt-4 h-80 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {getChartLines()}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

interface SecadorDashboardProps {
  data: {
    unidadeEntrada: number;
    unidadeSaida: number;
    temperaturaQueimador: number;
    temperaturaFornalha: number;
    temperaturaEntrada: number;
    temperaturaSaida: number;
    toneladaHoraEntrada: number;
    toneladaHoraSaida: number;
  };
  secadorId: string;
}

const SecadorDashboard: React.FC<SecadorDashboardProps> = ({ data, secadorId }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SensorCard
        title="Unidade de Entrada"
        value={data.unidadeEntrada}
        unit="%"
        status={data.unidadeEntrada > 19 ? "warning" : "normal"}
        icon={<Droplets />}
      />
      
      <SensorCard
        title="Unidade de Saída"
        value={data.unidadeSaida}
        unit="%"
        status="normal"
        icon={<Droplets />}
      />
      
      <SensorCard
        title="Temperatura Queimador"
        value={data.temperaturaQueimador}
        unit="°C"
        status={data.temperaturaQueimador > 110 ? "critical" : data.temperaturaQueimador > 105 ? "warning" : "normal"}
        icon={<Thermometer />}
      />
      
      <SensorCard
        title="Temperatura Fornalha"
        value={data.temperaturaFornalha}
        unit="°C"
        status={data.temperaturaFornalha > 100 ? "warning" : "normal"}
        icon={<Thermometer />}
      />
      
      <SensorCard
        title="Temperatura de Entrada"
        value={data.temperaturaEntrada}
        unit="°C"
        status="normal"
        icon={<Thermometer />}
      />
      
      <SensorCard
        title="Temperatura de Saída"
        value={data.temperaturaSaida}
        unit="°C"
        status="normal"
        icon={<Thermometer />}
      />
      
      <SensorCard
        title="Entrada"
        value={data.toneladaHoraEntrada}
        unit="t/h"
        status="normal"
        icon={<ArrowDownUp />}
      />
      
      <SensorCard
        title="Saída"
        value={data.toneladaHoraSaida}
        unit="t/h"
        status="normal"
        icon={<ArrowDownUp />}
      />
    </div>
  );
};

export default Secadores;
