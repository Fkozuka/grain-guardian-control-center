
import React from 'react';
import { ArrowRight } from 'lucide-react';
import FlowStatusIndicator from './FlowStatusIndicator';

interface FlowStep {
  id: string;
  name: string;
  type: string;
  position?: number;
  status: 'running' | 'warning' | 'error' | 'inactive';
}

interface FlowStepsDisplayProps {
  steps: FlowStep[];
  variant?: 'default' | 'available' | 'active' | 'blocked';
}

const FlowStepsDisplay: React.FC<FlowStepsDisplayProps> = ({ steps, variant = 'default' }) => {
  const getStepClassName = (step: FlowStep) => {
    if (variant === 'active') {
      return 'bg-green-100 border border-green-200 text-green-800';
    }
    
    if (variant === 'blocked' && (step.status === 'error' || step.status === 'inactive')) {
      return 'bg-red-100 border border-red-200 text-red-800';
    }
    
    // 'available' and 'default' will both use the default styling
    return 'bg-gray-100';
  };

  const getArrowClassName = (step: FlowStep) => {
    if (variant === 'active') {
      return 'text-green-500';
    }
    
    if (variant === 'blocked' && (step.status === 'error' || step.status === 'inactive')) {
      return 'text-red-400';
    }
    
    // 'available' and 'default' will both use the default styling
    return 'text-gray-400';
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className={`px-2 py-1 rounded-md flex items-center gap-1 ${getStepClassName(step)}`}>
            <FlowStatusIndicator status={step.status} size="sm" />
            <span className="text-sm">{step.name}</span>
          </div>
          {index < steps.length - 1 && (
            <ArrowRight size={14} className={getArrowClassName(step)} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default FlowStepsDisplay;
