
import React, { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { equipmentList, linesList, shiftsList } from '@/utils/chartsData';

// Import our new components
import FilterControls from '@/components/charts/FilterControls';
import TonsPerHourChart from '@/components/charts/TonsPerHourChart';
import ReceptionProgressChart from '@/components/charts/ReceptionProgressChart';
import EquipmentCharts from '@/components/charts/EquipmentCharts';

const Charts = () => {
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('week');
  const [selectedLine, setSelectedLine] = useState<string>('all');
  const [selectedShift, setSelectedShift] = useState<string>('all');

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-industrial-background">
        <Sidebar />
        
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          
          <div className="flex-1 overflow-auto p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Gráficos</h1>
              
              <FilterControls 
                period={period}
                selectedLine={selectedLine}
                selectedShift={selectedShift}
                setPeriod={setPeriod}
                setSelectedLine={setSelectedLine}
                setSelectedShift={setSelectedShift}
                linesList={linesList}
                shiftsList={shiftsList}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-6 mb-6">
              <TonsPerHourChart equipmentList={equipmentList} />
              <ReceptionProgressChart />
            </div>
            
            <Tabs defaultValue="elevadores" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                <TabsTrigger value="elevadores">Elevadores</TabsTrigger>
                <TabsTrigger value="corrente">Transportadores por Corrente</TabsTrigger>
                <TabsTrigger value="fita">Transportadores por Fita</TabsTrigger>
                <TabsTrigger value="rosca">Transportadores por Rosca</TabsTrigger>
              </TabsList>
              
              <TabsContent value="elevadores" className="mt-0">
                <EquipmentCharts type="elevadores" period={period} />
              </TabsContent>
              
              <TabsContent value="corrente" className="mt-0">
                <EquipmentCharts type="corrente" period={period} />
              </TabsContent>
              
              <TabsContent value="fita" className="mt-0">
                <EquipmentCharts type="fita" period={period} />
              </TabsContent>
              
              <TabsContent value="rosca" className="mt-0">
                <EquipmentCharts type="rosca" period={period} />
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
