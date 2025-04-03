
import React from 'react';
import { Droplets, Thermometer, ArrowDownUp } from 'lucide-react';
import SensorCard from '@/components/SensorCard';

interface SecadorDashboardProps {
  data: {
    unidadeEntrada: number;
    unidadeSaida: number;
    temperaturaQueimador: number;
    temperaturaFornalha: number;
    temperaturaEntrada: number;
    temperaturaSaida: number;
    toneladaHoraEntrada: number;
    toneladaHoraSaida: number;
  };
  secadorId: string;
}

const SecadorDashboard: React.FC<SecadorDashboardProps> = ({ data, secadorId }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SensorCard
        title="Unidade de Entrada"
        value={data.unidadeEntrada}
        unit="%"
        status={data.unidadeEntrada > 19 ? "warning" : "normal"}
        icon={<Droplets />}
      />
      
      <SensorCard
        title="Unidade de Saída"
        value={data.unidadeSaida}
        unit="%"
        status="normal"
        icon={<Droplets />}
      />
      
      <SensorCard
        title="Temperatura Queimador"
        value={data.temperaturaQueimador}
        unit="°C"
        status={data.temperaturaQueimador > 110 ? "critical" : data.temperaturaQueimador > 105 ? "warning" : "normal"}
        icon={<Thermometer />}
      />
      
      <SensorCard
        title="Temperatura Fornalha"
        value={data.temperaturaFornalha}
        unit="°C"
        status={data.temperaturaFornalha > 100 ? "warning" : "normal"}
        icon={<Thermometer />}
      />
      
      <SensorCard
        title="Temperatura de Entrada"
        value={data.temperaturaEntrada}
        unit="°C"
        status="normal"
        icon={<Thermometer />}
      />
      
      <SensorCard
        title="Temperatura de Saída"
        value={data.temperaturaSaida}
        unit="°C"
        status="normal"
        icon={<Thermometer />}
      />
      
      <SensorCard
        title="Entrada"
        value={data.toneladaHoraEntrada}
        unit="t/h"
        status="normal"
        icon={<ArrowDownUp />}
      />
      
      <SensorCard
        title="Saída"
        value={data.toneladaHoraSaida}
        unit="t/h"
        status="normal"
        icon={<ArrowDownUp />}
      />
    </div>
  );
};

export default SecadorDashboard;
