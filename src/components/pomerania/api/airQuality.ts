import { AirQualityData } from '../types/airQuality';

export async function fetchAirQualityData(): Promise<AirQualityData[]> {
  const AQICN_TOKEN = '5a1271b20fbbb9c972814a7b8d31512e061e83e6';
  
  try {
    const response = await fetch(
      `https://api.waqi.info/feed/@2684/?token=${AQICN_TOKEN}`
    );
    const data = await response.json();
    
    if (data.status === 'ok') {
      return [{
        id: `aqicn-${data.data.idx}`,
        stationName: 'Gdańsk-Wrzeszcz',
        region: 'Gdańsk',
        coordinates: data.data.city.geo,
        measurements: {
          aqi: data.data.aqi,
          pm25: data.data.iaqi.pm25?.v || 0,
          pm10: data.data.iaqi.pm10?.v || 0,
          temperature: data.data.iaqi.t?.v,
          humidity: data.data.iaqi.h?.v,
          timestamp: data.data.time.iso,
          source: 'AQICN'
        }
      }];
    }
    return [];
  } catch (error) {
    console.error('Błąd podczas pobierania danych:', error);
    return [];
  }
} 