
import db from '@/db/database';
import { seedDatabase } from '@/db/seedData';
import { 
  getEquipmentByType, 
  getAllEquipment, 
  getTonsPerHourData,
  getReceptionProgressData,
  getFailureData,
  getAvailabilityData,
  getOperationTimeData,
  getDryerData,
  getDryerHistoricalData,
  getAllSilos
} from '@/db/queries';

// This file will serve as the API layer between the UI and the database
// In a real application, this would be a server-side API

/**
 * Initialize the database and seed it with initial data
 */
export const initializeDatabase = async () => {
  try {
    seedDatabase();
    return { success: true };
  } catch (error) {
    console.error('Failed to initialize database:', error);
    return { success: false, error };
  }
};

/**
 * Equipment API endpoints
 */
export const equipmentApi = {
  getAllEquipment: async () => {
    try {
      const result = getAllEquipment();
      return { success: true, data: result };
    } catch (error) {
      console.error('Failed to get equipment:', error);
      return { success: false, error };
    }
  },
  
  getEquipmentByType: async (type: string) => {
    try {
      const result = getEquipmentByType(type);
      return { success: true, data: result };
    } catch (error) {
      console.error(`Failed to get equipment by type ${type}:`, error);
      return { success: false, error };
    }
  }
};

/**
 * Charts data API endpoints
 */
export const chartsApi = {
  getTonsPerHourData: async (equipments: string[]) => {
    try {
      const result = getTonsPerHourData(equipments);
      return { success: true, data: result };
    } catch (error) {
      console.error('Failed to get tons per hour data:', error);
      return { success: false, error };
    }
  },
  
  getReceptionProgressData: async () => {
    try {
      const result = getReceptionProgressData();
      return { success: true, data: result };
    } catch (error) {
      console.error('Failed to get reception progress data:', error);
      return { success: false, error };
    }
  },
  
  getFailureData: async (days: number, equipment?: string) => {
    try {
      const result = getFailureData(days, equipment || null);
      return { success: true, data: result };
    } catch (error) {
      console.error('Failed to get failure data:', error);
      return { success: false, error };
    }
  },
  
  getAvailabilityData: async (days: number, equipment: string) => {
    try {
      const result = getAvailabilityData(days, equipment);
      return { success: true, data: result };
    } catch (error) {
      console.error('Failed to get availability data:', error);
      return { success: false, error };
    }
  },
  
  getOperationTimeData: async (days: number, equipment: string) => {
    try {
      const result = getOperationTimeData(days, equipment);
      return { success: true, data: result };
    } catch (error) {
      console.error('Failed to get operation time data:', error);
      return { success: false, error };
    }
  }
};

/**
 * Dryer API endpoints
 */
export const dryerApi = {
  getDryerData: async (dryerId: string) => {
    try {
      const result = getDryerData(dryerId);
      return { success: true, data: result };
    } catch (error) {
      console.error(`Failed to get dryer data for ${dryerId}:`, error);
      return { success: false, error };
    }
  },
  
  getDryerHistoricalData: async (dryerId: string, date?: string) => {
    try {
      const result = getDryerHistoricalData(dryerId, date);
      return { success: true, data: result };
    } catch (error) {
      console.error(`Failed to get historical dryer data for ${dryerId}:`, error);
      return { success: false, error };
    }
  }
};

/**
 * Storage API endpoints
 */
export const storageApi = {
  getAllSilos: async () => {
    try {
      const result = getAllSilos();
      return { success: true, data: result };
    } catch (error) {
      console.error('Failed to get silos data:', error);
      return { success: false, error };
    }
  }
};
