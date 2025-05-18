
import { Equipment } from '@/types/equipment';

// Mock data for equipment monitoring
export const equipmentData: Record<string, Equipment[]> = {
  elevadores: [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
  rosca: [
    {
      id: 9,
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
      id: 10,
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

// This function would be used in a real implementation to map database results to the format expected by the UI
export const mapDbEquipmentToUiFormat = (dbEquipment: any): Equipment => {
  return {
    id: dbEquipment.id,
    name: dbEquipment.name,
    type: dbEquipment.type,
    status: dbEquipment.status,
    currentAmpere: dbEquipment.current_ampere,
    details: {
      emergencia: Boolean(dbEquipment.details?.emergencia),
      bloqueio: Boolean(dbEquipment.details?.bloqueio),
      intertravado: Boolean(dbEquipment.details?.intertravado),
      chaveAuto: Boolean(dbEquipment.details?.chave_auto),
      falhaPartida: Boolean(dbEquipment.details?.falha_partida),
      falhaTempMancal: Boolean(dbEquipment.details?.falha_temp_mancal),
      falhaTempMancalSuperior: Boolean(dbEquipment.details?.falha_temp_mancal_superior),
      falhaTempMancalInferior: Boolean(dbEquipment.details?.falha_temp_mancal_inferior),
      falhaEmbuchamento: Boolean(dbEquipment.details?.falha_embuchamento),
      falhaRotacao: Boolean(dbEquipment.details?.falha_rotacao),
      confirmaPartida: Boolean(dbEquipment.details?.confirma_partida)
    }
  };
};
