
import React from 'react';

interface StorageTankProps {
  id: string;
  name: string;
  capacity: number;
  currentLevel: number;
  product: string;
  temperature: number;
  humidity: number;
}

const StorageTank: React.FC<StorageTankProps> = ({
  id,
  name,
  capacity,
  currentLevel,
  product,
  temperature,
  humidity
}) => {
  const fillPercentage = (currentLevel / capacity) * 100;
  
  // Determine color based on fill level
  const getFillColor = () => {
    if (fillPercentage > 90) return 'bg-industrial-error';
    if (fillPercentage > 70) return 'bg-industrial-warning';
    return 'bg-industrial-success';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-industrial-primary">{name}</h3>
          <p className="text-sm text-industrial-gray">{product}</p>
        </div>
        <div className="text-xs bg-industrial-primary/10 text-industrial-primary px-2 py-1 rounded">
          {id}
        </div>
      </div>
      
      <div className="relative h-40 w-full bg-gray-100 rounded-md mb-3 overflow-hidden border border-gray-200">
        <div 
          className={`absolute bottom-0 w-full ${getFillColor()} transition-all duration-500`} 
          style={{ height: `${fillPercentage}%` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-bold text-2xl text-industrial-dark">
            {Math.round(fillPercentage)}%
          </span>
        </div>
      </div>
      
      <div className="mt-auto">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-industrial-gray">Capacidade</div>
            <div className="font-medium">{capacity.toLocaleString()} kg</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-industrial-gray">Atual</div>
            <div className="font-medium">{currentLevel.toLocaleString()} kg</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-industrial-gray">Temperatura</div>
            <div className="font-medium">{temperature}°C</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-industrial-gray">Umidade</div>
            <div className="font-medium">{humidity}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageTank;
