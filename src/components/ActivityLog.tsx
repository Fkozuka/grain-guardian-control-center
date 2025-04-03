
import React from 'react';

interface LogEntry {
  id: number;
  timestamp: string;
  event: string;
  type: 'info' | 'warning' | 'error';
}

const logs: LogEntry[] = [
  { id: 1, timestamp: '09:45', event: 'Silo 3 atingiu 85% da capacidade', type: 'warning' },
  { id: 2, timestamp: '09:30', event: 'Início de descarga no silo 5', type: 'info' },
  { id: 3, timestamp: '09:15', event: 'Temperatura elevada no silo 2', type: 'warning' },
  { id: 4, timestamp: '09:00', event: 'Falha na comporta do silo 1', type: 'error' },
  { id: 5, timestamp: '08:45', event: 'Manutenção programada para o elevador', type: 'info' },
  { id: 6, timestamp: '08:30', event: 'Caminhão registrado para descarga', type: 'info' },
];

const ActivityLog: React.FC = () => {
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'warning':
        return 'text-industrial-warning';
      case 'error':
        return 'text-industrial-error';
      default:
        return 'text-industrial-primary';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-full">
      <h3 className="font-bold text-industrial-primary mb-3">Registro de Atividades</h3>
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start p-2 border-b border-gray-100 text-sm">
            <div className="w-12 text-industrial-gray">{log.timestamp}</div>
            <div className={`flex-1 ${getTypeStyles(log.type)}`}>{log.event}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
