
import React, { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import EquipmentDetails from '@/components/EquipmentDetails';
import { equipmentData, mapDbEquipmentToUiFormat } from '@/utils/equipmentData';
import { getEquipmentByType } from '@/db/queries';
import { Equipment } from '@/types/equipment';

const Monitoring = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  // In a real implementation, we'd use state to store equipment data fetched from SQLite
  // const [elevators, setElevators] = useState<Equipment[]>([]);
  // const [chainConveyors, setChainConveyors] = useState<Equipment[]>([]);
  // const [screwConveyors, setScrewConveyors] = useState<Equipment[]>([]);

  const handleEquipmentClick = (equipment: any) => {
    setSelectedEquipment(equipment);
    setDialogOpen(true);
  };

  useEffect(() => {
    // In a real implementation, we'd fetch equipment data from our SQLite database via an API
    // const fetchEquipmentData = async () => {
    //   try {
    //     const elevatorsData = await getEquipmentByType('elevator');
    //     const chainData = await getEquipmentByType('chain');
    //     const screwData = await getEquipmentByType('screw');
    //
    //     setElevators(elevatorsData.map(mapDbEquipmentToUiFormat));
    //     setChainConveyors(chainData.map(mapDbEquipmentToUiFormat));
    //     setScrewConveyors(screwData.map(mapDbEquipmentToUiFormat));
    //   } catch (error) {
    //     console.error('Error fetching equipment data:', error);
    //   }
    // };
    // fetchEquipmentData();
  }, []);

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'running':
        return <CheckCircle className="text-industrial-success" />;
      case 'warning':
        return <AlertCircle className="text-industrial-warning" />;
      case 'error':
        return <AlertCircle className="text-industrial-error" />;
      default:
        return <Info className="text-industrial-primary" />;
    }
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-industrial-background">
        <Sidebar />
        
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          
          <div className="flex-1 overflow-auto p-4 md:p-6">
            <h1 className="text-2xl font-bold mb-6">Monitoramento</h1>
            <Tabs defaultValue="elevadores" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
                <TabsTrigger value="elevadores">Elevadores</TabsTrigger>
                <TabsTrigger value="corrente">Transportadores por Corrente</TabsTrigger>
                <TabsTrigger value="rosca">Transportadores por Rosca</TabsTrigger>
              </TabsList>
              
              {Object.keys(equipmentData).filter(category => category !== 'fita').map((category) => (
                <TabsContent value={category} key={category} className="mt-0">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {equipmentData[category].map((equipment, index) => (
                      <Card 
                        key={index} 
                        className="cursor-pointer hover:shadow-md transition-all"
                        onClick={() => handleEquipmentClick(equipment)}
                      >
                        <CardContent className="p-4 flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              {getStatusIndicator(equipment.status)}
                              <h3 className="text-lg font-medium">{equipment.name}</h3>
                            </div>
                            <div className="mt-2">
                              <p className="text-sm text-industrial-gray">Corrente Elétrica</p>
                              <p className="text-xl font-semibold">
                                {equipment.currentAmpere} <span className="text-xs">A</span>
                              </p>
                            </div>
                          </div>
                          <div className={`px-2 py-1 rounded text-xs font-medium ${
                            equipment.status === 'running' ? 'bg-green-100 text-green-800' :
                            equipment.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                            equipment.status === 'error' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {
                              equipment.status === 'running' ? 'Em Operação' :
                              equipment.status === 'warning' ? 'Atenção' :
                              equipment.status === 'error' ? 'Falha' : 'Inativo'
                            }
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
        
        <MobileNav />
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedEquipment?.name}</DialogTitle>
          </DialogHeader>
          {selectedEquipment && (
            <EquipmentDetails equipment={selectedEquipment} />
          )}
        </DialogContent>
      </Dialog>
      
      <Toaster />
    </>
  );
};

export default Monitoring;
