
import { getFromCache, setCache } from '../utils/cacheUtils';
import { Installation, Measurement } from '../types';

const API_KEY = 'zORU0m4cOxlElF9X4YcvhaR3sfiiqgFP';
const LONG_CACHE_DURATION = 30 * 60 * 1000; // 30 minutes for rate limited responses

/**
 * Fetches nearby installations from Airly API
 */
export const fetchInstallations = async (lat: number, lng: number): Promise<Installation[]> => {
  const cacheKey = `installations-${lat}-${lng}`;
  const cached = getFromCache<Installation[]>(cacheKey);
  
  if (cached) {
    console.log('Using cached installations data');
    return cached;
  }

  try {
    const response = await fetch(
      `https://airapi.airly.eu/v2/installations/nearest?lat=${lat}&lng=${lng}&maxDistanceKM=10&maxResults=100`,
      {
        headers: {
          'Accept': 'application/json',
          'apikey': API_KEY
        }
      }
    );
    
    if (response.status === 429) {
      console.warn('Airly API rate limit reached');
      // Try to get even expired cache data
      const expired = localStorage.getItem(cacheKey);
      if (expired) {
        try {
          const { data } = JSON.parse(expired);
          // Save the expired data with a longer expiration
          setCache(cacheKey, data, LONG_CACHE_DURATION);
          return data;
        } catch (e) {
          console.error('Error parsing expired cache:', e);
        }
      }
      throw new Error(`Failed to fetch installations: ${response.status}`);
    }
    
    if (!response.ok) {
      throw new Error(`Failed to fetch installations: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    setCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching installations:', error);
    throw error;
  }
};

/**
 * Fetches measurements for a specific installation from Airly API
 */
export const fetchMeasurements = async (installationId: number): Promise<Measurement> => {
  const cacheKey = `measurements-${installationId}`;
  const cached = getFromCache<Measurement>(cacheKey);
  
  if (cached) {
    console.log(`Using cached measurements data for installation ${installationId}`);
    return cached;
  }

  try {
    const response = await fetch(
      `https://airapi.airly.eu/v2/measurements/installation?installationId=${installationId}&includeWind=true&includeForecast=true`,
      {
        headers: {
          'Accept': 'application/json',
          'apikey': API_KEY
        }
      }
    );
    
    if (response.status === 429) {
      console.warn('Airly API rate limit reached for measurements');
      // Try to get even expired cache data
      const expired = localStorage.getItem(cacheKey);
      if (expired) {
        try {
          const { data } = JSON.parse(expired);
          // Save the expired data with a longer expiration
          setCache(cacheKey, data, LONG_CACHE_DURATION);
          return data;
        } catch (e) {
          console.error('Error parsing expired cache:', e);
        }
      }
      throw new Error(`Failed to fetch measurements: ${response.status}`);
    }
    
    if (!response.ok) {
      throw new Error(`Failed to fetch measurements: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    setCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching measurements:', error);
    throw error;
  }
};
