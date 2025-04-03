
import React, { useState } from 'react';
import { Menu, X, Gauge, Database, Monitor, Settings, Truck, Wheat, Droplets, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', icon: Gauge, path: '/' },
  { name: 'Armazenamento', icon: Database, path: '/storage' },
  { name: 'Secadores', icon: Droplets, path: '/secadores' },
  { name: 'Monitoramento', icon: Monitor, path: '/monitoring' },
  { name: 'Gráficos', icon: BarChart, path: '/charts' },
  { name: 'Transporte', icon: Truck, path: '#' },
  { name: 'Gestão de Silos', icon: Wheat, path: '#' },
  { name: 'Configurações', icon: Settings, path: '#' },
];

const MobileNav: React.FC = () => {
  const [open, setOpen] = useState(false);
  
  const handleNavigation = (path: string, e: React.MouseEvent) => {
    if (path === '#') {
      e.preventDefault();
    } else {
      setOpen(false);
    }
  };

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-industrial-primary border-r-industrial-primary p-0 w-64">
          <div className="p-4 h-full flex flex-col text-white">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-industrial-primary/80 hover:text-white"
                  asChild
                >
                  {item.path !== '#' ? (
                    <Link to={item.path} onClick={(e) => handleNavigation(item.path, e)}>
                      <item.icon className="mr-2 h-5 w-5" />
                      {item.name}
                    </Link>
                  ) : (
                    <a href={item.path} onClick={(e) => handleNavigation(item.path, e)}>
                      <item.icon className="mr-2 h-5 w-5" />
                      {item.name}
                    </a>
                  )}
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
