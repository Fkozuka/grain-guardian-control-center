
import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Droplets } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SecadorDashboard from '@/components/SecadorDashboard';
import SecadoresChart from '@/components/SecadoresChart';
import { sampleDryerData, generateChartData } from '@/utils/secadoresData';

const Secadores: React.FC = () => {
  const [chartData] = useState(generateChartData());
  const [selectedDryer, setSelectedDryer] = useState("secador1");
  const [selectedParameter, setSelectedParameter] = useState("temperaturaQueimador");
  const [date, setDate] = useState<Date>(new Date());
  
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
            
            <SecadoresChart 
              chartData={chartData}
              selectedDryer={selectedDryer}
              selectedParameter={selectedParameter}
              date={date}
              setDate={setDate}
              setSelectedParameter={setSelectedParameter}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Secadores;
