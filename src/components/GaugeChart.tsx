
import React from 'react';

interface GaugeChartProps {
  value: number;
  max: number;
  title: string;
  unit: string;
  color: string;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ 
  value, 
  max, 
  title, 
  unit,
  color
}) => {
  const percentage = (value / max) * 100;
  const rotation = (percentage * 180) / 100;
  
  return (
    <div className="flex flex-col items-center">
      <div className="gauge-container">
        <div className="gauge-background"></div>
        <div 
          className="gauge-indicator" 
          style={{ 
            borderTopColor: color, 
            borderRightColor: color,
            transform: `rotate(${rotation}deg)` 
          }}
        ></div>
        <div className="gauge-value flex flex-col items-center">
          <span className="text-2xl font-bold">{value}</span>
          <span className="text-xs text-gray-500">{unit}</span>
        </div>
      </div>
      <span className="mt-2 font-medium text-industrial-dark">{title}</span>
    </div>
  );
};

export default GaugeChart;
