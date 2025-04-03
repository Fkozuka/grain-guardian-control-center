
import React from 'react';
import { Gauge, Database, Monitor, Settings, Truck, Wheat, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const sidebarItems = [
  { name: 'Dashboard', icon: Gauge, path: '/' },
  { name: 'Armazenamento', icon: Database, path: '/storage' },
  { name: 'Secadores', icon: Droplets, path: '/secadores' },
  { name: 'Monitoramento', icon: Monitor, path: '#' },
  { name: 'Transporte', icon: Truck, path: '#' },
  { name: 'Gestão de Silos', icon: Wheat, path: '#' },
  { name: 'Configurações', icon: Settings, path: '#' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    if (path !== '#') {
      navigate(path);
    }
  };

  return (
    <div className="bg-industrial-primary text-white w-64 flex-shrink-0 hidden md:block">
      <div className="p-4 h-full flex flex-col">
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className={`w-full justify-start text-white hover:bg-industrial-primary/80 hover:text-white ${
                location.pathname === item.path ? 'bg-industrial-primary/40' : ''
              }`}
              onClick={() => handleNavigation(item.path)}
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
