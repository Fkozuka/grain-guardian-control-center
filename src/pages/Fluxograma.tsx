
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import FluxogramaLegenda from '@/components/FluxogramaLegenda';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/button';
import { ZoomIn, ZoomOut, Info } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface EquipmentPoint {
  id: string;
  x: number;
  y: number;
  type: 'silo' | 'elevador' | 'transportador' | 'valvula';
  status: 'operando' | 'alerta' | 'falha' | 'inativo';
  label: string;
}

const Fluxograma = () => {
  const { toast } = useToast();
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Pontos de equipamentos para o fluxograma principal
  const principalPoints: EquipmentPoint[] = [
    { id: 'EL1', x: 120, y: 100, type: 'elevador', status: 'operando', label: 'Elevador EL1' },
    { id: 'EL2', x: 220, y: 150, type: 'elevador', status: 'alerta', label: 'Elevador EL2' },
    { id: 'TC1', x: 300, y: 120, type: 'transportador', status: 'operando', label: 'Transportador TC1' },
    { id: 'TC2', x: 450, y: 120, type: 'transportador', status: 'falha', label: 'Transportador TC2' },
    { id: 'SL1', x: 600, y: 200, type: 'silo', status: 'inativo', label: 'Silo SL1' },
    { id: 'TR1', x: 400, y: 300, type: 'transportador', status: 'operando', label: 'Transportador TR1' },
    { id: 'SL2', x: 150, y: 350, type: 'silo', status: 'operando', label: 'Silo SL2' },
    { id: 'SL3', x: 250, y: 350, type: 'silo', status: 'alerta', label: 'Silo SL3' },
    { id: 'SL4', x: 350, y: 350, type: 'silo', status: 'operando', label: 'Silo SL4' },
    { id: 'SL5', x: 450, y: 500, type: 'silo', status: 'inativo', label: 'Silo SL5' },
    { id: 'SL6', x: 550, y: 500, type: 'silo', status: 'operando', label: 'Silo SL6' },
    { id: 'SL7', x: 650, y: 500, type: 'silo', status: 'operando', label: 'Silo SL7' },
    { id: 'VL1', x: 180, y: 220, type: 'valvula', status: 'operando', label: 'Válvula VL1' },
    { id: 'VL2', x: 280, y: 220, type: 'valvula', status: 'operando', label: 'Válvula VL2' },
  ];

  // Pontos de equipamentos para o fluxograma de impurezas
  const impurezasPoints: EquipmentPoint[] = [
    { id: 'EL10', x: 1150, y: 80, type: 'elevador', status: 'operando', label: 'Elevador EL10' },
    { id: 'TC20', x: 1250, y: 100, type: 'transportador', status: 'inativo', label: 'Transportador TC20' },
    { id: 'SL20', x: 1350, y: 180, type: 'silo', status: 'alerta', label: 'Silo SL20' },
    { id: 'TR10', x: 1200, y: 200, type: 'transportador', status: 'operando', label: 'Transportador TR10' },
    { id: 'VL10', x: 1100, y: 250, type: 'valvula', status: 'falha', label: 'Válvula VL10' },
  ];

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handlePointClick = (point: EquipmentPoint) => {
    toast({
      title: `Equipamento ${point.id}`,
      description: `Status: ${getStatusLabel(point.status)} - Tipo: ${getTypeLabel(point.type)}`,
    });
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'operando': return 'Operando normalmente';
      case 'alerta': return 'Em alerta';
      case 'falha': return 'Com falha';
      case 'inativo': return 'Inativo';
      default: return status;
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'silo': return 'Silo';
      case 'elevador': return 'Elevador';
      case 'transportador': return 'Transportador';
      case 'valvula': return 'Válvula';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'operando': return 'bg-industrial-success';
      case 'alerta': return 'bg-industrial-warning';
      case 'falha': return 'bg-industrial-danger';
      case 'inativo': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  const renderPoints = (points: EquipmentPoint[]) => {
    return points.map((point) => (
      <div
        key={point.id}
        className={`absolute rounded-full cursor-pointer flex items-center justify-center ${getStatusColor(point.status)} ${point.status === 'operando' || point.status === 'falha' ? 'animate-pulse' : ''}`}
        style={{
          left: `${point.x}px`,
          top: `${point.y}px`,
          width: '20px',
          height: '20px',
          transform: `translate(-50%, -50%)`,
          zIndex: 10
        }}
        onClick={() => handlePointClick(point)}
        title={point.label}
      >
        <span className="text-white text-xs font-bold">{point.id}</span>
      </div>
    ));
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Fluxograma do Sistema</h1>
        
        <div className="mb-4 flex gap-2">
          <Button onClick={zoomIn} size="sm" variant="outline" className="flex items-center gap-1">
            <ZoomIn size={16} />
            <span>Ampliar</span>
          </Button>
          <Button onClick={zoomOut} size="sm" variant="outline" className="flex items-center gap-1">
            <ZoomOut size={16} />
            <span>Reduzir</span>
          </Button>
          <div className="ml-4 text-sm flex items-center gap-1">
            <Info size={16} className="text-industrial-primary" />
            <span>Clique nos pontos coloridos para ver detalhes dos equipamentos</span>
          </div>
        </div>
        
        <Tabs defaultValue="principal" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="principal">Fluxograma Principal</TabsTrigger>
            <TabsTrigger value="impurezas">Fluxograma de Impurezas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="principal" className="mt-4">
            <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden" style={{ height: '600px', position: 'relative' }}>
              <div 
                className="relative overflow-hidden h-full w-full cursor-move"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <div 
                  style={{
                    transform: `scale(${zoom}) translate(${pan.x/zoom}px, ${pan.y/zoom}px)`,
                    transformOrigin: '0 0',
                    height: '100%',
                    width: '100%',
                    position: 'relative'
                  }}
                >
                  <img 
                    src="/lovable-uploads/b99b884c-2f74-464b-b7c4-c6804ce2c672.png" 
                    alt="Fluxograma principal" 
                    className="object-contain"
                    style={{ 
                      height: 'auto',
                      width: '100%',
                      maxWidth: '1800px'
                    }}
                  />
                  {renderPoints(principalPoints)}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="impurezas" className="mt-4">
            <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden" style={{ height: '600px', position: 'relative' }}>
              <div 
                className="relative overflow-hidden h-full w-full cursor-move"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <div 
                  style={{
                    transform: `scale(${zoom}) translate(${pan.x/zoom}px, ${pan.y/zoom}px)`,
                    transformOrigin: '0 0',
                    height: '100%',
                    width: '100%',
                    position: 'relative'
                  }}
                >
                  <img 
                    src="/lovable-uploads/b99b884c-2f74-464b-b7c4-c6804ce2c672.png" 
                    alt="Fluxograma de impurezas" 
                    className="object-contain"
                    style={{ 
                      height: 'auto',
                      width: '100%',
                      maxWidth: '1800px'
                    }}
                  />
                  {renderPoints(impurezasPoints)}
                </div>
              </div>
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
