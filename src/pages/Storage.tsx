
import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import StorageTank from '@/components/StorageTank';
import { Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const fakeSilos = [
  { id: 'SL-001', name: 'Silo 1', capacity: 10000, currentLevel: 8500, product: 'Soja', temperature: 22, humidity: 64 },
  { id: 'SL-002', name: 'Silo 2', capacity: 10000, currentLevel: 7200, product: 'Milho', temperature: 24, humidity: 68 },
  { id: 'SL-003', name: 'Silo 3', capacity: 8000, currentLevel: 6800, product: 'Trigo', temperature: 23, humidity: 65 },
  { id: 'SL-004', name: 'Silo 4', capacity: 12000, currentLevel: 3600, product: 'Soja', temperature: 21, humidity: 62 },
  { id: 'SL-005', name: 'Silo 5', capacity: 10000, currentLevel: 9500, product: 'Milho', temperature: 25, humidity: 70 },
  { id: 'SL-006', name: 'Silo 6', capacity: 8000, currentLevel: 2400, product: 'Trigo', temperature: 22, humidity: 63 },
];

const Storage = () => {
  // Calculate overall storage metrics
  const totalCapacity = fakeSilos.reduce((sum, silo) => sum + silo.capacity, 0);
  const totalCurrentLevel = fakeSilos.reduce((sum, silo) => sum + silo.currentLevel, 0);
  const overallPercentage = Math.round((totalCurrentLevel / totalCapacity) * 100);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-industrial-primary mb-6">Gerenciamento de Armazenamento</h2>
            
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Database size={20} className="text-industrial-primary" />
                  Visão Geral de Armazenamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-md">
                    <div className="text-sm text-industrial-gray">Capacidade Total</div>
                    <div className="text-xl font-bold">{totalCapacity.toLocaleString()} kg</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <div className="text-sm text-industrial-gray">Armazenamento Utilizado</div>
                    <div className="text-xl font-bold">{totalCurrentLevel.toLocaleString()} kg</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <div className="text-sm text-industrial-gray">Taxa de Ocupação</div>
                    <div className="text-xl font-bold">{overallPercentage}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
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
        </main>
      </div>
    </div>
  );
};

export default Storage;
