
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const FluxogramaLegenda: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Legenda</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-4">
            <h3 className="font-medium">Status dos Equipamentos</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-industrial-success animate-pulse rounded-full"></div>
                <span>Verde Piscando: Operando Normalmente</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-industrial-warning rounded-full"></div>
                <span>Amarelo Fixo: Alerta de Atenção</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-industrial-danger animate-pulse rounded-full"></div>
                <span>Vermelho Pulsante: Falha Detectada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                <span>Cinza: Equipamento Inativo/Desligado</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <h3 className="font-medium">Tipos de Equipamentos</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full text-white text-xs">M</div>
                <span>MG: Moegas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full text-white text-xs">E</div>
                <span>EL: Elevadores</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 bg-yellow-500 rounded-full text-white text-xs">V</div>
                <span>VB/VT: Válvulas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 bg-red-500 rounded-full text-white text-xs">S</div>
                <span>SL: Silos</span>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <Separator className="mb-4" />
            <div className="text-sm text-gray-600">
              <h3 className="font-medium mb-2">Instruções de Uso:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Selecione os componentes na sequência correta para criar um fluxo de transferência</li>
                <li>Verifique o status de cada equipamento antes de confirmar o fluxo</li>
                <li>Use as abas para visualizar fluxos possíveis, ativos e bloqueados</li>
                <li>Fluxos com equipamentos em falha não podem ser ativados</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FluxogramaLegenda;
