
import React from 'react';

interface FlowStatusIndicatorProps {
  status: string;
  size?: 'sm' | 'md';
}

const FlowStatusIndicator: React.FC<FlowStatusIndicatorProps> = ({ status, size = 'md' }) => {
  // Function to get the correct status color class
  const getStatusColorClass = (status: string) => {
    switch (status) {
      case 'running': return 'bg-industrial-success';
      case 'warning': return 'bg-industrial-warning';
      case 'error': return 'bg-industrial-danger';
      case 'inactive': return 'bg-gray-400';
      case 'available': return 'bg-blue-500';
      case 'active': return 'bg-green-500';
      case 'blocked': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const sizeClass = size === 'sm' ? 'w-2 h-2' : 'w-3 h-3';
  
  return (
    <span className={`${sizeClass} rounded-full ${getStatusColorClass(status)}`}></span>
  );
};

export default FlowStatusIndicator;
