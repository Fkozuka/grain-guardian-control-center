
import React from 'react';
import SensorCard from './SensorCard';
import { Gauge, Clock, Truck, Database, Package } from 'lucide-react';

const StatusOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-6">
      <SensorCard
        title="Expedição"
        value="Ativo"
        status="normal"
        icon={<Package size={20} />}
      />
      <SensorCard
        title="Recebimento"
        value="Ativo"
        status="normal"
        icon={<Truck size={20} />}
      />
      <SensorCard
        title="Temperatura Média"
        value={24.5}
        unit="°C"
        status="normal"
        icon={<Gauge size={20} />}
      />
      <SensorCard
        title="Umidade Média"
        value={68}
        unit="%"
        status="warning"
        icon={<Gauge size={20} />}
      />
      <SensorCard
        title="Capacidade Utilizada"
        value={72}
        unit="%"
        status="normal"
        icon={<Database size={20} />}
      />
    </div>
  );
};

export default StatusOverview;

