
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
    <div className="sensor-indicator bg-white">
      <div className={`status-indicator ${statusColors[status]}`}></div>
      <div className="flex-1">
        <div className="text-sm text-industrial-gray">{title}</div>
        <div className="text-lg font-bold">
          {value}{unit && <span className="text-xs ml-1">{unit}</span>}
        </div>
      </div>
      <div className="text-industrial-primary">
        {icon}
      </div>
    </div>
  );
};

export default SensorCard;
