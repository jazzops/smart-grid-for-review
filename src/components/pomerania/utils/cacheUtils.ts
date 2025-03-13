
// Utility functions for caching API responses

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const LONG_CACHE_DURATION = 30 * 60 * 1000; // 30 minutes for rate limited responses

interface CachedData<T> {
  data: T;
  timestamp: number;
}

/**
 * Retrieves data from localStorage cache if valid
 */
export const getFromCache = <T>(key: string): T | null => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp }: CachedData<T> = JSON.parse(cached);
    const now = Date.now();

    if (now - timestamp > CACHE_DURATION) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
};

/**
 * Stores data in localStorage cache
 */
export const setCache = <T>(key: string, data: T, duration = CACHE_DURATION): void => {
  try {
    const cacheData: CachedData<T> = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error setting cache:', error);
  }
};

/**
 * Clears all Airly-related cache entries
 */
export const clearAirlyCache = () => {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('installations-') || key.startsWith('measurements-')) {
        localStorage.removeItem(key);
      }
    });
    console.log('Airly cache cleared');
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};
