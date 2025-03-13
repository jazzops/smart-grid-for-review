
import { AirQualityData } from "@/types/company";

/**
 * Get AQI level information based on AQI value
 */
export const getAqiLevelInfo = (aqi: number | undefined) => {
  if (aqi === undefined) {
    return {
      color: '#999999',
      level: 'Unknown',
      description: 'Brak danych',
      advice: ''
    };
  }

  if (aqi <= 50) {
    return {
      color: '#34D399',
      level: 'Good',
      description: 'Bardzo dobra',
      advice: 'Jakość powietrza jest zadowalająca, można bezpiecznie przebywać na zewnątrz.'
    };
  } else if (aqi <= 100) {
    return {
      color: '#FBBF24',
      level: 'Moderate',
      description: 'Dobra',
      advice: 'Jakość powietrza jest akceptowalna, jednak osoby wrażliwe mogą odczuwać lekki dyskomfort.'
    };
  } else if (aqi <= 150) {
    return {
      color: '#F59E0B',
      level: 'Unhealthy for Sensitive Groups',
      description: 'Umiarkowana',
      advice: 'Osoby wrażliwe (dzieci, osoby starsze, osoby z chorobami układu oddechowego) powinny ograniczyć przebywanie na zewnątrz.'
    };
  } else if (aqi <= 200) {
    return {
      color: '#EF4444',
      level: 'Unhealthy',
      description: 'Zła',
      advice: 'Wszyscy powinni ograniczyć przebywanie na zewnątrz, szczególnie osoby wrażliwe.'
    };
  } else if (aqi <= 300) {
    return {
      color: '#991B1B',
      level: 'Very Unhealthy',
      description: 'Bardzo zła',
      advice: 'Należy unikać przebywania na zewnątrz. Jeśli to możliwe, zostań w domu i zamknij okna.'
    };
  } else {
    return {
      color: '#7F1D1D',
      level: 'Hazardous',
      description: 'Niebezpieczna',
      advice: 'Stan alarmowy! Unikaj wszelkiej aktywności na zewnątrz i zabezpiecz swój dom przed zanieczyszczonym powietrzem.'
    };
  }
};

/**
 * Transform AQICN API data to AirQualityData format
 */
export const transformAqicnToAirQualityData = (stationId: string, data: any, stationName?: string): AirQualityData => {
  // Extract values or use defaults for missing data
  const pm25 = data.iaqi?.pm25?.v;
  const pm10 = data.iaqi?.pm10?.v;
  const no2 = data.iaqi?.no2?.v;
  const so2 = data.iaqi?.so2?.v;
  const o3 = data.iaqi?.o3?.v;
  const co = data.iaqi?.co?.v;
  const temperature = data.iaqi?.t?.v;
  const humidity = data.iaqi?.h?.v;
  const pressure = data.iaqi?.p?.v;
  const windSpeed = data.iaqi?.w?.v;  // Wind speed
  
  // Get AQI index and determine color and level
  const aqi = data.aqi;
  const { color, level, description, advice } = getAqiLevelInfo(aqi);
  
  // Get station name from data if not provided
  const name = stationName || data.city?.name || `Station ${stationId}`;
  
  // Create AirQualityData object
  return {
    source: {
      id: `aqicn-${stationId}`,
      name: name,
      provider: 'AQICN',
      location: {
        latitude: data.city?.geo?.[0] || 0,
        longitude: data.city?.geo?.[1] || 0,
        address: {
          displayAddress1: name,
          displayAddress2: 'Pomorskie, Polska'
        }
      }
    },
    current: {
      timestamp: data.time?.iso || new Date().toISOString(),
      fromDateTime: data.time?.iso || new Date().toISOString(),
      tillDateTime: data.time?.iso || new Date().toISOString(),
      indexes: [
        {
          name: 'AQI',
          value: aqi,
          level: level,
          description: description,
          advice: advice,
          color: color
        }
      ],
      values: [
        { name: 'PM2.5', value: pm25 || 0 },
        { name: 'PM10', value: pm10 || 0 },
        { name: 'NO2', value: no2 || 0 },
        { name: 'SO2', value: so2 || 0 },
        { name: 'O3', value: o3 || 0 },
        { name: 'CO', value: co || 0 },
      ],
      pm25: pm25,
      pm10: pm10,
      no2: no2,
      so2: so2,
      o3: o3,
      co: co,
      temperature: temperature,
      humidity: humidity,
      pressure: pressure,
      windSpeed: windSpeed,
      provider: 'AQICN'
    }
  };
};

