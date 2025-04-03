
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplets } from 'lucide-react';

const Secadores: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <Droplets className="mr-2" /> Secadores
      </h1>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Status dos Secadores</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Informações sobre os secadores serão exibidas aqui.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Secadores;
