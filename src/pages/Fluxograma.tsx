
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import FluxogramaInterativo from '@/components/FluxogramaInterativo';
import FluxogramaLegenda from '@/components/FluxogramaLegenda';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Fluxograma = () => {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Fluxograma do Sistema</h1>
        
        <Tabs defaultValue="principal" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="principal">Fluxograma Principal</TabsTrigger>
            <TabsTrigger value="impurezas">Fluxograma de Impurezas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="principal" className="mt-4">
            <div className="bg-white p-4 rounded-lg shadow-md overflow-auto">
              <FluxogramaInterativo tipo="principal" />
            </div>
          </TabsContent>
          
          <TabsContent value="impurezas" className="mt-4">
            <div className="bg-white p-4 rounded-lg shadow-md overflow-auto">
              <FluxogramaInterativo tipo="impurezas" />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6">
          <FluxogramaLegenda />
        </div>
      </div>
    </Layout>
  );
};

export default Fluxograma;
