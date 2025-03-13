import { AirQualityData } from '../../types/airQuality';

export async function fetchGIOSData(): Promise<AirQualityData[]> {
  try {
    const response = await fetch('http://api.gios.gov.pl/pjp-api/rest/station/findAll');
    const stations = await response.json();
    
    const trojmiastoStations = stations.filter((station: any) => 
      station.city.name.includes('Gdańsk') || 
      station.city.name.includes('Gdynia') || 
      station.city.name.includes('Sopot')
    );

    const results = await Promise.all(
      trojmiastoStations.map(async (station: any) => {
        try {
          const sensorResponse = await fetch(
            `http://api.gios.gov.pl/pjp-api/rest/data/getData/${station.id}`
          );
          const sensorData = await sensorResponse.json();

          return {
            id: `gios-${station.id}`,
            stationName: station.stationName,
            region: station.city.name,
            coordinates: [station.gegrLat, station.gegrLon] as [number, number],
            measurements: {
              aqi: sensorData.values[0]?.value || 0,
              pm25: sensorData.values[0]?.value || 0,
              pm10: sensorData.values[0]?.value || 0,
              timestamp: new Date().toISOString(),
              source: 'GIOS' as const
            }
          };
        } catch (error) {
          console.error(`GIOŚ - Błąd dla stacji ${station.stationName}:`, error);
          return null;
        }
      })
    );

    return results.filter((result): result is AirQualityData => result !== null);
  } catch (error) {
    console.error('GIOŚ - Błąd ogólny:', error);
    return [];
  }
} 