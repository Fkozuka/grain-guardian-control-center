
import React from 'react';
import { format } from 'date-fns';
import { Clock, Calendar as CalendarIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SecadoresChartProps {
  chartData: any[];
  selectedDryer: string;
  selectedParameter: string;
  date: Date;
  setDate: (date: Date) => void;
  setSelectedParameter: (param: string) => void;
}

const SecadoresChart: React.FC<SecadoresChartProps> = ({ 
  chartData, 
  selectedDryer, 
  selectedParameter, 
  date, 
  setDate, 
  setSelectedParameter 
}) => {
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
                    <CalendarIcon className="mr-2 h-4 w-4" />
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
  );
};

export default SecadoresChart;
