
import React from 'react';
import { Gauge, Database, Monitor, Settings, Truck, Wheat } from 'lucide-react';
import { Button } from '@/components/ui/button';

const sidebarItems = [
  { name: 'Dashboard', icon: Gauge },
  { name: 'Armazenamento', icon: Database },
  { name: 'Monitoramento', icon: Monitor },
  { name: 'Transporte', icon: Truck },
  { name: 'Gestão de Silos', icon: Wheat },
  { name: 'Configurações', icon: Settings },
];

const Sidebar = () => {
  return (
    <div className="bg-industrial-primary text-white w-64 flex-shrink-0 hidden md:block">
      <div className="p-4 h-full flex flex-col">
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className="w-full justify-start text-white hover:bg-industrial-primary/80 hover:text-white"
            >
              <item.icon className="mr-2 h-5 w-5" />
              {item.name}
            </Button>
          ))}
        </div>
        
        <div className="mt-auto p-4 bg-industrial-dark/30 rounded-lg">
          <div className="text-sm text-gray-300">Status do Sistema</div>
          <div className="flex items-center mt-2">
            <div className="w-3 h-3 bg-industrial-success rounded-full mr-2"></div>
            <span className="text-sm font-medium">Operando Normalmente</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
