
// Mock data for equipment monitoring
export const equipmentData: Record<string, any[]> = {
  elevadores: [
    {
      name: 'Elevador 1',
      type: 'elevator',
      status: 'running',
      currentAmpere: 12.5,
      details: {
        emergencia: true,
        bloqueio: true,
        intertravado: true,
        chaveAuto: true,
        falhaPartida: false,
        falhaTempMancalSuperior: false,
        falhaTempMancalInferior: false,
        falhaRotacao: false,
        confirmaPartida: true
      }
    },
    {
      name: 'Elevador 2',
      type: 'elevator',
      status: 'warning',
      currentAmpere: 14.2,
      details: {
        emergencia: true,
        bloqueio: true,
        intertravado: true,
        chaveAuto: true,
        falhaPartida: false,
        falhaTempMancalSuperior: true,
        falhaTempMancalInferior: false,
        falhaRotacao: false,
        confirmaPartida: true
      }
    },
    {
      name: 'Elevador 3',
      type: 'elevator',
      status: 'error',
      currentAmpere: 0.2,
      details: {
        emergencia: false,
        bloqueio: true,
        intertravado: false,
        chaveAuto: true,
        falhaPartida: true,
        falhaTempMancalSuperior: false,
        falhaTempMancalInferior: false,
        falhaRotacao: true,
        confirmaPartida: false
      }
    },
  ],
  corrente: [
    {
      name: 'Transportador por Corrente 1',
      type: 'chain',
      status: 'running',
      currentAmpere: 8.7,
      details: {
        emergencia: true,
        bloqueio: true,
        intertravado: true,
        chaveAuto: true,
        falhaPartida: false,
        falhaTempMancal: false,
        falhaEmbuchamento: false,
        falhaRotacao: false,
        confirmaPartida: true
      }
    },
    {
      name: 'Transportador por Corrente 2',
      type: 'chain',
      status: 'running',
      currentAmpere: 9.1,
      details: {
        emergencia: true,
        bloqueio: true,
        intertravado: true,
        chaveAuto: true,
        falhaPartida: false,
        falhaTempMancal: false,
        falhaEmbuchamento: false,
        falhaRotacao: false,
        confirmaPartida: true
      }
    }
  ],
  fita: [
    {
      name: 'Transportador por Fita 1',
      type: 'belt',
      status: 'warning',
      currentAmpere: 15.8,
      details: {
        emergencia: true,
        bloqueio: true,
        intertravado: true,
        chaveAuto: true,
        falhaPartida: false,
        falhaTempMancal: false,
        falhaEmbuchamento: true,
        falhaRotacao: false,
        confirmaPartida: true
      }
    },
    {
      name: 'Transportador por Fita 2',
      type: 'belt',
      status: 'running',
      currentAmpere: 12.3,
      details: {
        emergencia: true,
        bloqueio: true,
        intertravado: true,
        chaveAuto: true,
        falhaPartida: false,
        falhaTempMancal: false,
        falhaEmbuchamento: false,
        falhaRotacao: false,
        confirmaPartida: true
      }
    },
    {
      name: 'Transportador por Fita 3',
      type: 'belt',
      status: 'error',
      currentAmpere: 0.0,
      details: {
        emergencia: false,
        bloqueio: true,
        intertravado: false,
        chaveAuto: true,
        falhaPartida: true,
        falhaTempMancal: false,
        falhaEmbuchamento: false,
        falhaRotacao: true,
        confirmaPartida: false
      }
    }
  ],
  rosca: [
    {
      name: 'Transportador por Rosca 1',
      type: 'screw',
      status: 'running',
      currentAmpere: 7.5,
      details: {
        emergencia: true,
        bloqueio: true,
        intertravado: true,
        chaveAuto: true,
        falhaPartida: false,
        falhaTempMancal: false,
        falhaEmbuchamento: false,
        falhaRotacao: false,
        confirmaPartida: true
      }
    },
    {
      name: 'Transportador por Rosca 2',
      type: 'screw',
      status: 'warning',
      currentAmpere: 9.8,
      details: {
        emergencia: true,
        bloqueio: true,
        intertravado: true,
        chaveAuto: true,
        falhaPartida: false,
        falhaTempMancal: true,
        falhaEmbuchamento: false,
        falhaRotacao: false,
        confirmaPartida: true
      }
    }
  ]
};
