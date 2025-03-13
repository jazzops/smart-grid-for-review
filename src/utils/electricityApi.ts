import { PowerData, PowerForecast, ConsumptionForecast } from '@/types/electricity';

const BASE_URL = 'https://api.electricitymap.org/v3';

export const fetchPowerData = async (lat: number, lon: number): Promise<PowerData> => {
  const response = await fetch(
    `${BASE_URL}/power-breakdown/latest?lat=${lat}&lon=${lon}`,
    {
      headers: {
        'auth-token': localStorage.getItem('ELECTRICITY_MAPS_API_KEY') || ''
      }
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch power data');
  }
  
  return response.json();
};

export const fetchPowerForecast = async (zone: string): Promise<PowerForecast> => {
  const response = await fetch(
    `${BASE_URL}/power-production-breakdown/forecast?zone=${zone}`,
    {
      headers: {
        'auth-token': localStorage.getItem('ELECTRICITY_MAPS_API_KEY') || ''
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch power forecast');
  }

  return response.json();
};

export const fetchConsumptionForecast = async (lat: number, lon: number): Promise<ConsumptionForecast> => {
  const response = await fetch(
    `${BASE_URL}/power-consumption-breakdown/forecast?lat=${lat}&lon=${lon}&horizonHours=24`,
    {
      headers: {
        'auth-token': localStorage.getItem('ELECTRICITY_MAPS_API_KEY') || ''
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch consumption forecast');
  }

  return response.json();
};