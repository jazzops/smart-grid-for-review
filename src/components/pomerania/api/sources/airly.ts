import { AirQualityData } from '../../types/airQuality';

export async function fetchAirlyData(): Promise<AirQualityData[]> {
  const AIRLY_API_KEY = import.meta.env.VITE_AIRLY_API_KEY;
  
  if (!AIRLY_API_KEY) {
    console.warn('Brak klucza API Airly');
    return [];
  }

  try {
    const response = await fetch(
      'https://airapi.airly.eu/v2/installations/nearest?lat=54.372158&lng=18.638306&maxDistanceKM=30&maxResults=100',
      {
        headers: { 'apikey': AIRLY_API_KEY }
      }
    );

    const installations = await response.json();
    
    const results = await Promise.all(
      installations.map(async (installation: any) => {
        try {
          const measurementsResponse = await fetch(
            `https://airapi.airly.eu/v2/measurements/installation?installationId=${installation.id}`,
            {
              headers: { 'apikey': AIRLY_API_KEY }
            }
          );
          const measurements = await measurementsResponse.json();

          return {
            id: `airly-${installation.id}`,
            stationName: installation.address.description,
            region: installation.address.city,
            coordinates: [
              installation.location.latitude,
              installation.location.longitude
            ] as [number, number],
            measurements: {
              aqi: measurements.current.indexes[0]?.value || 0,
              pm25: measurements.current.values.find((v: any) => v.name === 'PM25')?.value || 0,
              pm10: measurements.current.values.find((v: any) => v.name === 'PM10')?.value || 0,
              temperature: measurements.current.values.find((v: any) => v.name === 'TEMPERATURE')?.value,
              humidity: measurements.current.values.find((v: any) => v.name === 'HUMIDITY')?.value,
              timestamp: measurements.current.tillDateTime,
              source: 'Airly' as const
            }
          };
        } catch (error) {
          console.error(`Airly - Błąd dla stacji ${installation.address.description}:`, error);
          return null;
        }
      })
    );

    return results.filter((result): result is AirQualityData => result !== null);
  } catch (error) {
    console.error('Airly - Błąd ogólny:', error);
    return [];
  }
} 