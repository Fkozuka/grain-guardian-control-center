
import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface EquipmentDetailsProps {
  equipment: {
    name: string;
    type: string;
    status: string;
    currentAmpere: number;
    details: Record<string, boolean>;
  };
}

const EquipmentDetails: React.FC<EquipmentDetailsProps> = ({ equipment }) => {
  return (
    <div className="py-2">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b">
        <div className={`w-3 h-3 rounded-full ${
          equipment.status === 'running' ? 'bg-industrial-success' :
          equipment.status === 'warning' ? 'bg-industrial-warning' :
          equipment.status === 'error' ? 'bg-industrial-error' : 'bg-gray-400'
        }`}></div>
        <p className="text-sm font-medium">
          {
            equipment.status === 'running' ? 'Em Operação' :
            equipment.status === 'warning' ? 'Atenção' :
            equipment.status === 'error' ? 'Falha' : 'Inativo'
          }
        </p>
        <p className="text-sm font-medium ml-auto">
          Corrente: <span className="font-bold">{equipment.currentAmpere} A</span>
        </p>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Status de Operação:</p>
        {Object.entries(equipment.details).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2 border-b pb-2">
            {value ? (
              <CheckCircle className="h-4 w-4 text-industrial-success" />
            ) : (
              <AlertCircle className="h-4 w-4 text-industrial-error" />
            )}
            <span className="text-sm">{formatDetailName(key)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const formatDetailName = (key: string) => {
  const formattedKey = key.replace(/([A-Z])/g, ' $1');
  return formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1);
};

export default EquipmentDetails;
