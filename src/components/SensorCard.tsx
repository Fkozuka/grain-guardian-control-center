
import React from 'react';

interface SensorCardProps {
  title: string;
  value: number | string;
  unit?: string;
  status: 'normal' | 'warning' | 'critical';
  icon: React.ReactNode;
}

const SensorCard: React.FC<SensorCardProps> = ({ 
  title, 
  value, 
  unit = '', 
  status, 
  icon 
}) => {
  const statusColors = {
    normal: 'bg-industrial-success',
    warning: 'bg-industrial-warning',
    critical: 'bg-industrial-error animate-pulse-slow'
  };

  return (
    <div className="sensor-indicator bg-white p-4 rounded-lg border shadow-sm flex items-center relative overflow-hidden">
      <div className={`status-indicator w-1 absolute left-0 top-0 bottom-0 ${statusColors[status]}`}></div>
      <div className="flex-1 ml-2">
        <div className="text-sm text-industrial-gray font-medium">{title}</div>
        <div className="text-xl font-bold">
          {value}{unit && <span className="text-xs ml-1">{unit}</span>}
        </div>
      </div>
      <div className="text-industrial-primary text-opacity-80">
        {icon}
      </div>
    </div>
  );
};

export default SensorCard;
