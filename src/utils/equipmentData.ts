
// Mock data for equipment monitoring
export const equipmentData: Record<string, any[]> = {
  elevadores: Array.from({ length: 17 }, (_, i) => {
    const number = i + 1;
    const numberFormatted = number.toString().padStart(2, '0');
    const status = Math.random() > 0.8 ? 'error' : (Math.random() > 0.7 ? 'warning' : 'running');
    return {
      name: `EL-${numberFormatted}`,
      type: 'elevator',
      status,
      currentAmpere: status === 'error' ? 0.2 : 8 + Math.random() * 8,
      details: {
        emergencia: status !== 'error',
        bloqueio: true,
        intertravado: status !== 'error',
        chaveAuto: true,
        falhaPartida: status === 'error',
        falhaTempMancalSuperior: status === 'warning',
        falhaTempMancalInferior: Math.random() > 0.9,
        falhaRotacao: status === 'error',
        confirmaPartida: status !== 'error'
      }
    };
  }),
  corrente: Array.from({ length: 38 }, (_, i) => {
    const number = i + 1;
    const numberFormatted = number.toString().padStart(2, '0');
    const status = Math.random() > 0.8 ? 'error' : (Math.random() > 0.7 ? 'warning' : 'running');
    return {
      name: `TC-${numberFormatted}`,
      type: 'chain',
      status,
      currentAmpere: status === 'error' ? 0.1 : 7 + Math.random() * 4,
      details: {
        emergencia: status !== 'error',
        bloqueio: true,
        intertravado: status !== 'error',
        chaveAuto: true,
        falhaPartida: status === 'error',
        falhaTempMancal: status === 'warning',
        falhaEmbuchamento: Math.random() > 0.9,
        falhaRotacao: status === 'error',
        confirmaPartida: status !== 'error'
      }
    };
  }),
  rosca: Array.from({ length: 10 }, (_, i) => {
    const number = i + 1;
    const numberFormatted = number.toString().padStart(2, '0');
    const status = Math.random() > 0.8 ? 'error' : (Math.random() > 0.7 ? 'warning' : 'running');
    return {
      name: `RT-${numberFormatted}`,
      type: 'screw',
      status,
      currentAmpere: status === 'error' ? 0.1 : 6 + Math.random() * 5,
      details: {
        emergencia: status !== 'error',
        bloqueio: true,
        intertravado: status !== 'error',
        chaveAuto: true,
        falhaPartida: status === 'error',
        falhaTempMancal: status === 'warning',
        falhaEmbuchamento: Math.random() > 0.9,
        falhaRotacao: status === 'error',
        confirmaPartida: status !== 'error'
      }
    };
  })
};
