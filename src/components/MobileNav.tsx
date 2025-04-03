
import React, { useState } from 'react';
import { Menu, X, Gauge, Database, Monitor, Settings, Truck, Wheat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { name: 'Dashboard', icon: Gauge },
  { name: 'Armazenamento', icon: Database },
  { name: 'Monitoramento', icon: Monitor },
  { name: 'Transporte', icon: Truck },
  { name: 'Gestão de Silos', icon: Wheat },
  { name: 'Configurações', icon: Settings },
];

const MobileNav: React.FC = () => {
  const [open, setOpen] = useState(false);

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
                  onClick={() => setOpen(false)}
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
