
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import StorageTank from '@/components/StorageTank';
import { Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SiloData } from '@/types/equipment';
import { getAllSilos } from '@/db/queries';

const Storage = () => {
  const [silos, setSilos] = useState<SiloData[]>([]);
  const [totalCapacity, setTotalCapacity] = useState(0);
  const [totalStorage, setTotalStorage] = useState(0);

  useEffect(() => {
    // In a browser environment, we'd use an API endpoint that queries our SQLite DB
    // For now, we'll use mock data similar to what we'd get from the DB
    const fakeSilos = [
      { id: 'SL-001', name: 'Silo 1', capacity: 10000, current_level: 8500, product: 'Soja', temperature: 22, humidity: 64 },
      { id: 'SL-002', name: 'Silo 2', capacity: 10000, current_level: 7200, product: 'Milho', temperature: 24, humidity: 68 },
      { id: 'SL-003', name: 'Silo 3', capacity: 8000, current_level: 6800, product: 'Trigo', temperature: 23, humidity: 65 },
      { id: 'SL-004', name: 'Silo 4', capacity: 12000, current_level: 3600, product: 'Soja', temperature: 21, humidity: 62 },
      { id: 'SL-005', name: 'Silo 5', capacity: 10000, current_level: 9500, product: 'Milho', temperature: 25, humidity: 70 },
      { id: 'SL-006', name: 'Silo 6', capacity: 8000, current_level: 2400, product: 'Trigo', temperature: 22, humidity: 63 },
    ];
    
    setSilos(fakeSilos);
    
    // Calculate totals
    const capacity = fakeSilos.reduce((sum, silo) => sum + silo.capacity, 0);
    const storage = fakeSilos.reduce((sum, silo) => sum + silo.current_level, 0);
    
    setTotalCapacity(capacity);
    setTotalStorage(storage);
    
    // In a real implementation with our SQLite DB:
    // const fetchData = async () => {
    //   try {
    //     const silosData = await getAllSilos();
    //     setSilos(silosData);
    //     const capacity = silosData.reduce((sum, silo) => sum + silo.capacity, 0);
    //     const storage = silosData.reduce((sum, silo) => sum + silo.current_level, 0);
    //     setTotalCapacity(capacity);
    //     setTotalStorage(storage);
    //   } catch (error) {
    //     console.error('Error fetching silo data:', error);
    //   }
    // };
    // fetchData();
  }, []);

  const storagePercentage = totalCapacity ? Math.round((totalStorage / totalCapacity) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-6">Armazenagem</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Capacidade Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(totalCapacity / 1000).toFixed(2)} mil toneladas
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Armazenagem Atual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(totalStorage / 1000).toFixed(2)} mil toneladas
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Ocupação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    {storagePercentage}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className={`h-2.5 rounded-full ${
                        storagePercentage > 90 ? 'bg-red-500' : 
                        storagePercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${storagePercentage}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {silos.map((silo) => (
                <StorageTank
                  key={silo.id}
                  id={silo.id}
                  name={silo.name} 
                  capacity={silo.capacity}
                  currentLevel={silo.current_level}
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
