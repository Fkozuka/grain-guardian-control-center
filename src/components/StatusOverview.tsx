
import React, { useEffect, useState } from 'react';
import SensorCard from './SensorCard';
import { Gauge, Truck, Database, ArrowRight, Send } from 'lucide-react';
import { getTonsPerHourData } from '@/db/queries';
import { equipmentList } from '@/utils/chartsData';

interface SensorData {
  expedition: { status: 'normal' | 'warning' | 'critical', value: string };
  reception: { status: 'normal' | 'warning' | 'critical', value: string };
  capacity: { status: 'normal' | 'warning' | 'critical', value: number };
  chain: { status: 'normal' | 'warning' | 'critical', value: number };
  screw: { status: 'normal' | 'warning' | 'critical', value: number };
}

const StatusOverview: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData>({
    expedition: { status: 'normal', value: 'Ativo' },
    reception: { status: 'normal', value: 'Ativo' },
    capacity: { status: 'normal', value: 72 },
    chain: { status: 'warning', value: 120 },
    screw: { status: 'normal', value: 85 }
  });

  useEffect(() => {
    // In real implementation, we'd fetch this data from our SQLite database via an API
    // const fetchSensorData = async () => {
    //   try {
    //     // Get chain data (first item from the corrente list)
    //     const chainData = await getTonsPerHourData([equipmentList.corrente[0]]);
    //     const chainValue = chainData[0]?.value || 120;
    //     const chainStatus = chainValue > 110 ? 'warning' : 'normal';
    //
    //     // Get screw data (first item from the rosca list)
    //     const screwData = await getTonsPerHourData([equipmentList.rosca[0]]);
    //     const screwValue = screwData[0]?.value || 85;
    //     const screwStatus = screwValue > 90 ? 'warning' : 'normal';
    //
    //     // Update state with real data
    //     setSensorData(prev => ({
    //       ...prev,
    //       chain: { status: chainStatus, value: chainValue },
    //       screw: { status: screwStatus, value: screwValue }
    //     }));
    //   } catch (error) {
    //     console.error('Error fetching sensor data:', error);
    //   }
    // };
    // fetchSensorData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-6">
      <SensorCard
        title="Expedição"
        value={sensorData.expedition.value}
        status={sensorData.expedition.status}
        icon={<Send size={20} />}
      />
      <SensorCard
        title="Recebimento"
        value={sensorData.reception.value}
        status={sensorData.reception.status}
        icon={<Truck size={20} />}
      />
      <SensorCard
        title="Capacidade Utilizada"
        value={sensorData.capacity.value}
        unit="%"
        status={sensorData.capacity.status}
        icon={<Database size={20} />}
      />
      <SensorCard
        title="Corrente"
        value={sensorData.chain.value}
        unit="ton/h"
        status={sensorData.chain.status}
        icon={<ArrowRight size={20} />}
      />
      <SensorCard
        title="Rosca"
        value={sensorData.screw.value}
        unit="ton/h"
        status={sensorData.screw.status}
        icon={<Gauge size={20} />}
      />
    </div>
  );
};

export default StatusOverview;
