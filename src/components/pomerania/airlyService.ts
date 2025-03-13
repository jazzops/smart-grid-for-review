
import { fetchInstallations, fetchMeasurements } from './services/airlyApiService';
import { getCoordinatesForLocation, getDisplayLocationName, getUnitForReading } from './utils/locationUtils';
import { clearAirlyCache as clearCache } from './utils/cacheUtils';

// Re-export cache clearing function
export const clearAirlyCache = clearCache;

/**
 * Gets sensor readings for a specific location
 */
export const getSensorReadingsByLocation = async (location: string): Promise<any> => {
  try {
    const coordinates = getCoordinatesForLocation(location);
    if (!coordinates) {
      return { error: "Nie znaleziono lokalizacji" };
    }
    
    const installations = await fetchInstallations(coordinates.lat, coordinates.lng);
    if (!installations || installations.length === 0) {
      return { error: "Brak czujników w tej lokalizacji" };
    }
    
    const closestInstallation = installations[0];
    const measurements = await fetchMeasurements(closestInstallation.id);
    
    const readingsData = {
      location: getDisplayLocationName(location, closestInstallation),
      provider: "Airly",
      timestamp: measurements.current?.fromDateTime || new Date().toISOString(),
      airQualityIndex: measurements.current?.indexes?.[0]?.value || null,
      airQualityLevel: measurements.current?.indexes?.[0]?.level || null,
      airQualityDescription: measurements.current?.indexes?.[0]?.description || null,
      readings: measurements.current?.values?.reduce((acc: Record<string, any>, val) => {
        acc[val.name] = { value: val.value, unit: getUnitForReading(val.name) };
        return acc;
      }, {}) || {},
      temperature: undefined,
      humidity: undefined,
      pressure: undefined,
      installationId: closestInstallation.id,
      address: closestInstallation.address
    };

    if (readingsData.readings?.TEMPERATURE) {
      readingsData.temperature = readingsData.readings.TEMPERATURE.value;
    }
    
    if (readingsData.readings?.HUMIDITY) {
      readingsData.humidity = readingsData.readings.HUMIDITY.value;
    }
    
    if (readingsData.readings?.PRESSURE) {
      readingsData.pressure = readingsData.readings.PRESSURE.value;
    }
    
    return readingsData;
  } catch (error) {
    console.error("Error getting sensor readings:", error);
    return { error: "Nie udało się pobrać danych z czujników" };
  }
};

// Re-export functions for backwards compatibility
export { fetchInstallations, fetchMeasurements };
