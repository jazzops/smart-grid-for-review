
import { AQICN_STATIONS } from './aqicnStations';

const AQICN_TOKEN = '5a1271b20fbbb9c972814a7b8d31512e061e83e6';
const API_BASE_URL = 'https://api.waqi.info/feed';
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes
const ERROR_CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// Cache for AQICN data to avoid excessive API calls
const dataCache = new Map<string, { data: any, timestamp: number }>();

/**
 * Fetch data for a specific AQICN station by ID
 */
export const fetchAqicnData = async (stationId: string): Promise<any> => {
  const now = Date.now();
  const cachedData = dataCache.get(stationId);
  
  if (cachedData && (now - cachedData.timestamp) < CACHE_DURATION) {
    console.log(`Using cached data for station ${stationId}`);
    return cachedData.data;
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/${stationId}/?token=${AQICN_TOKEN}`);
    
    if (!response.ok) {
      throw new Error(`AQICN API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status === 'ok') {
      dataCache.set(stationId, { data: data.data, timestamp: now });
      return data.data;
    } else {
      // For non-ok status, check if we have old cached data
      if (cachedData) {
        console.warn(`AQICN API error: ${data.status}, using old cached data`);
        dataCache.set(stationId, { data: cachedData.data, timestamp: now - CACHE_DURATION + ERROR_CACHE_DURATION });
        return cachedData.data;
      }
      
      console.error('AQICN API returned error:', data);
      throw new Error(`AQICN API error: ${data.status}`);
    }
  } catch (error) {
    console.error(`Error fetching AQICN data for station ${stationId}:`, error);
    
    // If we have any cached data, return it even if expired
    if (cachedData) {
      console.warn(`Using expired cache for station ${stationId} due to API error`);
      dataCache.set(stationId, { data: cachedData.data, timestamp: now - CACHE_DURATION + ERROR_CACHE_DURATION });
      return cachedData.data;
    }
    
    throw error;
  }
};

/**
 * Fetch data for all AQICN stations (with limited subset to avoid rate limiting)
 */
export const fetchAllAqicnStations = async (): Promise<any[]> => {
  try {
    // Use a small subset of stations to avoid rate limiting issues
    const stationsToFetch = AQICN_STATIONS.slice(0, 5);
    
    const stationPromises = stationsToFetch.map(async (station) => {
      try {
        const data = await fetchAqicnData(station.id);
        return { stationId: station.id, stationName: station.name, data };
      } catch (error) {
        console.error(`Error processing station ${station.id}:`, error);
        return null;
      }
    });
    
    const stationsData = await Promise.all(stationPromises);
    return stationsData.filter(Boolean) as any[];
  } catch (error) {
    console.error('Error fetching data from AQICN stations:', error);
    return [];
  }
};

