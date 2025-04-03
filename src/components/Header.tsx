
import React from 'react';
import { Gauge, Wheat, Clock } from 'lucide-react';
import MobileNav from './MobileNav';

const Header = () => {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const currentTime = new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <header className="bg-industrial-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex w-full md:w-auto justify-between items-center mb-3 md:mb-0">
          <div className="flex items-center gap-3">
            <Wheat size={32} className="text-industrial-warning" />
            <h1 className="text-2xl font-bold">Grain Guardian</h1>
          </div>
          <MobileNav />
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock size={20} />
            <span className="font-medium">{currentTime}</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-300">
            <span>{currentDate}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
