
import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import StatusOverview from '@/components/StatusOverview';
import GaugeChart from '@/components/GaugeChart';
import StorageTank from '@/components/StorageTank';
import ActivityLog from '@/components/ActivityLog';

const fakeSilos = [
  { id: 'SL-001', name: 'Silo 1', capacity: 10000, currentLevel: 8500, product: 'Soja', temperature: 22, humidity: 64 },
  { id: 'SL-002', name: 'Silo 2', capacity: 10000, currentLevel: 7200, product: 'Milho', temperature: 24, humidity: 68 },
  { id: 'SL-003', name: 'Silo 3', capacity: 8000, currentLevel: 6800, product: 'Trigo', temperature: 23, humidity: 65 },
  { id: 'SL-004', name: 'Silo 4', capacity: 12000, currentLevel: 3600, product: 'Soja', temperature: 21, humidity: 62 },
  { id: 'SL-005', name: 'Silo 5', capacity: 10000, currentLevel: 9500, product: 'Milho', temperature: 25, humidity: 70 },
  { id: 'SL-006', name: 'Silo 6', capacity: 8000, currentLevel: 2400, product: 'Trigo', temperature: 22, humidity: 63 },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-industrial-primary mb-6">Supervisório de Recebimento de Grãos</h2>
            
            <StatusOverview />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
                <h3 className="font-semibold text-industrial-primary mb-4">Monitoramento em Tempo Real</h3>
                <div className="flex flex-wrap justify-center gap-6">
                  <GaugeChart 
                    value={75} 
                    max={100} 
                    title="Capacidade Total" 
                    unit="%" 
                    color="#1A3A5A" 
                  />
                  <GaugeChart 
                    value={24} 
                    max={40} 
                    title="Temperatura" 
                    unit="°C" 
                    color="#F44336" 
                  />
                  <GaugeChart 
                    value={68} 
                    max={100} 
                    title="Umidade" 
                    unit="%" 
                    color="#FFC857" 
                  />
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <ActivityLog />
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-industrial-primary mb-4">Status dos Silos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {fakeSilos.map((silo) => (
                  <StorageTank
                    key={silo.id}
                    id={silo.id}
                    name={silo.name}
                    capacity={silo.capacity}
                    currentLevel={silo.currentLevel}
                    product={silo.product}
                    temperature={silo.temperature}
                    humidity={silo.humidity}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
