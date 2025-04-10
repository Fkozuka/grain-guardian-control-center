
import React from 'react';
import SensorCard from './SensorCard';
import { Gauge, Truck, Database, Package, AlertTriangle } from 'lucide-react';

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
        title="Capacidade Utilizada"
        value={72}
        unit="%"
        status="normal"
        icon={<Database size={20} />}
      />
      <SensorCard
        title="Linha Suja"
        value="Parcial"
        status="warning"
        icon={<AlertTriangle size={20} />}
      />
      <SensorCard
        title="Linha Limpa"
        value="Ativo"
        status="normal"
        icon={<Gauge size={20} />}
      />
    </div>
  );
};

export default StatusOverview;
