
// Mock data for charts

// Equipment categories
export type EquipmentType = 'elevadores' | 'corrente' | 'fita' | 'rosca';

// Generate random failures data for charts
export const generateFailureData = (days = 30) => {
  const types = [
    'Falha Partida', 
    'Falha Temperatura', 
    'Falha Rotação', 
    'Falha Embuchamento',
    'Outro'
  ];
  
  return types.map(type => {
    const values = Array.from({ length: days }, () => Math.floor(Math.random() * 5));
    return {
      name: type,
      data: values,
    };
  });
};

// Generate availability data
export const generateAvailabilityData = (days = 30, equipment: string) => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    const availability = 85 + Math.random() * 15; // 85-100% availability
    return {
      date: date.toISOString().split('T')[0],
      availability,
      equipment
    };
  });
};

// Generate operation time data
export const generateOperationTimeData = (days = 30, equipment: string) => {
  const shifts = ['Manhã', 'Tarde', 'Noite'];
  
  return shifts.map(shift => {
    return {
      name: shift,
      data: Array.from({ length: days }, () => 4 + Math.random() * 4) // 4-8 hours
    };
  });
};

// Generate tons per hour data
export const generateTonsPerHourData = (equipments: string[]) => {
  return equipments.map(equipment => {
    return {
      name: equipment,
      value: 50 + Math.random() * 100 // 50-150 tons/hour
    };
  });
};

// Generate reception progress data
export const generateReceptionProgressData = (hours = 24) => {
  const goal = 1000; // 1000 tons daily goal
  const actual = Array.from({ length: hours }, (_, i) => {
    const progress = i === 0 ? 0 : 30 + Math.random() * 50; // 30-80 tons per hour
    return {
      hour: `${i.toString().padStart(2, '0')}:00`,
      actual: progress,
      goal: goal / hours
    };
  }).reduce((acc, curr, i) => {
    const prevValue = i > 0 ? acc[i - 1].actual : 0;
    acc.push({
      hour: curr.hour,
      actual: prevValue + curr.actual,
      goal: curr.goal * (i + 1)
    });
    return acc;
  }, [] as {hour: string, actual: number, goal: number}[]);

  return actual;
};

// Equipment data for mock
export const equipmentList: Record<EquipmentType, string[]> = {
  elevadores: ['Elevador 1', 'Elevador 2', 'Elevador 3'],
  corrente: ['Transportador por Corrente 1', 'Transportador por Corrente 2'],
  fita: ['Transportador por Fita 1', 'Transportador por Fita 2', 'Transportador por Fita 3'],
  rosca: ['Transportador por Rosca 1', 'Transportador por Rosca 2']
};

// Available lines for filtering
export const linesList = ['Linha 1', 'Linha 2', 'Linha 3'];

// Available shifts for filtering
export const shiftsList = ['Primeiro', 'Segundo', 'Terceiro'];
