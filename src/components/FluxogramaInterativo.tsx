
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

// Tipos de equipamentos
type EquipmentType = 'elevador' | 'corrente' | 'fita' | 'rosca' | 'silo' | 'outros';
type EquipmentStatus = 'operando' | 'alerta' | 'falha' | 'inativo';

interface Equipment {
  id: string;
  type: EquipmentType;
  status: EquipmentStatus;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  connections?: string[];
}

// Mock data - em produção seria carregado de uma API
const equipmentData: Record<string, Equipment[]> = {
  principal: [
    { id: 'EL1', type: 'elevador', status: 'operando', position: { x: 120, y: 100, width: 40, height: 80 } },
    { id: 'EL2', type: 'elevador', status: 'alerta', position: { x: 220, y: 150, width: 40, height: 80 } },
    { id: 'TC1', type: 'corrente', status: 'operando', position: { x: 300, y: 120, width: 100, height: 20 } },
    { id: 'TC2', type: 'corrente', status: 'falha', position: { x: 450, y: 120, width: 100, height: 20 } },
    { id: 'SL1', type: 'silo', status: 'inativo', position: { x: 600, y: 200, width: 80, height: 150 } },
    { id: 'TR1', type: 'rosca', status: 'operando', position: { x: 400, y: 300, width: 60, height: 30 } },
  ],
  impurezas: [
    { id: 'EL10', type: 'elevador', status: 'operando', position: { x: 150, y: 80, width: 40, height: 80 } },
    { id: 'TC20', type: 'corrente', status: 'inativo', position: { x: 250, y: 100, width: 100, height: 20 } },
    { id: 'SL5', type: 'silo', status: 'alerta', position: { x: 400, y: 180, width: 80, height: 150 } },
  ]
};

// Função para mapear status para classe CSS de animação
const getStatusClass = (status: EquipmentStatus): string => {
  switch (status) {
    case 'operando':
      return 'animate-pulse fill-industrial-success stroke-industrial-dark';
    case 'alerta':
      return 'fill-industrial-warning stroke-industrial-dark';
    case 'falha':
      return 'animate-pulse fill-industrial-danger stroke-industrial-dark';
    case 'inativo':
    default:
      return 'fill-gray-400 stroke-gray-600';
  }
};

// Função para mapear tipo para ícone/forma
const getEquipmentShape = (equipment: Equipment) => {
  switch (equipment.type) {
    case 'elevador':
      return (
        <rect
          x={equipment.position.x}
          y={equipment.position.y}
          width={equipment.position.width}
          height={equipment.position.height}
          className={`${getStatusClass(equipment.status)} cursor-pointer transition-colors duration-300`}
          rx="5"
        />
      );
    case 'corrente':
      return (
        <rect
          x={equipment.position.x}
          y={equipment.position.y}
          width={equipment.position.width}
          height={equipment.position.height}
          className={`${getStatusClass(equipment.status)} cursor-pointer transition-colors duration-300`}
        />
      );
    case 'rosca':
      return (
        <path
          d={`M ${equipment.position.x} ${equipment.position.y + equipment.position.height/2} 
               L ${equipment.position.x + equipment.position.width} ${equipment.position.y + equipment.position.height/2}`}
          strokeWidth="10"
          className={`${getStatusClass(equipment.status)} cursor-pointer transition-colors duration-300`}
        />
      );
    case 'silo':
      return (
        <path
          d={`M ${equipment.position.x} ${equipment.position.y} 
               L ${equipment.position.x + equipment.position.width} ${equipment.position.y} 
               L ${equipment.position.x + equipment.position.width} ${equipment.position.y + equipment.position.height - 20} 
               L ${equipment.position.x + equipment.position.width/2} ${equipment.position.y + equipment.position.height} 
               L ${equipment.position.x} ${equipment.position.y + equipment.position.height - 20} Z`}
          className={`${getStatusClass(equipment.status)} cursor-pointer transition-colors duration-300`}
        />
      );
    default:
      return (
        <circle
          cx={equipment.position.x + equipment.position.width/2}
          cy={equipment.position.y + equipment.position.height/2}
          r={equipment.position.width/2}
          className={`${getStatusClass(equipment.status)} cursor-pointer transition-colors duration-300`}
        />
      );
  }
};

interface FluxogramaInterativoProps {
  tipo: 'principal' | 'impurezas';
}

const FluxogramaInterativo: React.FC<FluxogramaInterativoProps> = ({ tipo }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [equipment, setEquipment] = useState<Equipment[]>(equipmentData[tipo] || []);
  
  const handleEquipmentClick = (equipmentId: string) => {
    toast({
      title: `Equipamento ${equipmentId}`,
      description: `Redirecionando para detalhes do equipamento ${equipmentId}`,
    });
    navigate(`/equipamento/${equipmentId}`);
  };
  
  // Dimensões do SVG (ajuste conforme necessário)
  const svgWidth = 800;
  const svgHeight = 600;
  
  return (
    <div className="overflow-auto">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Linhas de conexão (simplificadas) */}
        <line x1="140" y1="180" x2="220" y2="180" stroke="#2563EB" strokeWidth="2" />
        <line x1="260" y1="150" x2="300" y2="120" stroke="#2563EB" strokeWidth="2" />
        <line x1="400" y1="120" x2="450" y2="120" stroke="#2563EB" strokeWidth="2" />
        <line x1="550" y1="120" x2="600" y2="200" stroke="#2563EB" strokeWidth="2" />
        
        {/* Renderizar todos os equipamentos */}
        {equipment.map((eq) => (
          <g key={eq.id} onClick={() => handleEquipmentClick(eq.id)}>
            {getEquipmentShape(eq)}
            <text 
              x={eq.position.x + eq.position.width / 2} 
              y={eq.position.y - 10} 
              textAnchor="middle" 
              className="text-xs font-bold fill-industrial-dark"
            >
              {eq.id}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default FluxogramaInterativo;
