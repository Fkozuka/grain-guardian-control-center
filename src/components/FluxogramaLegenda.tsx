
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FluxogramaLegenda: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Legenda</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-4">
            <h3 className="font-medium">Status dos Equipamentos</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-industrial-success animate-pulse"></div>
                <span>Verde Piscando: Operando Normalmente</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-industrial-warning"></div>
                <span>Amarelo Fixo: Alerta de Atenção</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-industrial-danger animate-pulse"></div>
                <span>Vermelho Pulsante: Falha Detectada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-400"></div>
                <span>Cinza: Equipamento Inativo/Desligado</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <h3 className="font-medium">Tipos de Equipamentos</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-8 bg-blue-500 rounded"></div>
                <span>EL: Elevadores</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-4 bg-green-500"></div>
                <span>TC: Transportadores por corrente</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-8 bg-yellow-500"></div>
                <span>TR/RT: Transportadores por rosca</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-400 rounded-sm transform rotate-45"></div>
                <span>SL: Silos</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FluxogramaLegenda;
