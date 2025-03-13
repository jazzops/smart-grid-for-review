
import { AirQualityData, AirQualitySource } from "@/types/company";
import { isInTriCity } from "@/utils/locationUtils";

const GIOS_API_BASE = 'https://api.gios.gov.pl/pjp-api/rest';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

interface GIOSStation {
  id: number;
  stationName: string;
  gegrLat: string;
  gegrLon: string;
  city: {
    name: string;
  };
}

async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
      if (response.status === 429) { // Rate limit
        const delay = Math.min(RETRY_DELAY * Math.pow(2, i), 10000);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
  throw new Error('Max retries reached');
}

export const fetchGIOSStations = async (): Promise<AirQualitySource[]> => {
  try {
    const response = await fetchWithRetry(`${GIOS_API_BASE}/station/findAll`);
    const stations = (await response.json()) as GIOSStation[];
    
    return stations
      .filter((station) => {
        const lat = parseFloat(station.gegrLat);
        const lon = parseFloat(station.gegrLon);
        return !isNaN(lat) && !isNaN(lon) && isInTriCity(lat, lon);
      })
      .map((station) => ({
        id: `gios-${station.id}`,
        name: station.stationName,
        provider: 'GIOŚ',
        location: {
          latitude: parseFloat(station.gegrLat),
          longitude: parseFloat(station.gegrLon)
        },
        address: {
          city: station.city.name
        }
      }));
  } catch (error) {
    console.error('Error fetching GIOŚ stations:', error);
    return [];
  }
};

interface GIOSAirQualityIndex {
  id: number;
  stCalcDate: string;
  stIndexLevel: {
    id: number;
    indexLevelName: string;
  };
  pm10IndexLevel: {
    id: number;
    indexLevelName: string;
  };
  pm25IndexLevel: {
    id: number;
    indexLevelName: string;
  };
  no2IndexLevel: {
    id: number;
    indexLevelName: string;
  };
  so2IndexLevel: {
    id: number;
    indexLevelName: string;
  };
}

const getIndexLevel = (index: any) => {
  if (!index) return { level: 'Unknown', color: '#808080' };
  
  const levels = {
    'Bardzo dobry': { level: 'Very Good', color: '#00FF00' },
    'Dobry': { level: 'Good', color: '#80FF00' },
    'Umiarkowany': { level: 'Moderate', color: '#FFFF00' },
    'Dostateczny': { level: 'Sufficient', color: '#FF8000' },
    'Zły': { level: 'Bad', color: '#FF0000' },
    'Bardzo zły': { level: 'Very Bad', color: '#800080' }
  };
  
  return levels[index.indexLevelName] || { level: 'Unknown', color: '#808080' };
};

export const fetchGIOSData = async (stationId: string): Promise<AirQualityData | null> => {
  try {
    const rawId = stationId.replace('gios-', '');
    if (!rawId.match(/^\d+$/)) {
      throw new Error('Invalid station ID format');
    }

    const [sensorData, station, airQualityIndex] = await Promise.all([
      fetchWithRetry(`${GIOS_API_BASE}/data/getData/${rawId}`).then(r => r.json()),
      fetchWithRetry(`${GIOS_API_BASE}/station/sensors/${rawId}`).then(r => r.json()),
      fetchWithRetry(`${GIOS_API_BASE}/aqindex/getIndex/${rawId}`).then(r => r.json())
    ]);

    const measurements: { [key: string]: number } = {};
    if (!Array.isArray(station)) {
      throw new Error('Invalid station data format');
    }

    station.forEach((sensor: any) => {
      if (!sensor?.param?.paramCode) return;
      const param = sensor.param.paramCode.toLowerCase();
      const values = sensorData[param]?.values;
      if (!Array.isArray(values) || values.length === 0) return;
      
      const value = values[0]?.value;
      if (typeof value === 'number' && !isNaN(value)) {
        measurements[param] = value;
      }
    });

    const stationIndex = getIndexLevel(airQualityIndex?.stIndexLevel);

    return {
      source: await fetchGIOSStations().then(stations => 
        stations.find(s => s.id === stationId)!
      ),
      current: {
        timestamp: airQualityIndex?.stCalcDate || new Date().toISOString(),
        pm25: measurements.pm25,
        pm10: measurements.pm10,
        no2: measurements.no2,
        so2: measurements.so2,
        o3: measurements.o3,
        provider: 'GIOŚ',
        aqi: airQualityIndex?.stIndexLevel?.id || 0,
        aqiInfo: {
          level: stationIndex.level,
          color: stationIndex.color,
          description: airQualityIndex?.stIndexLevel?.indexLevelName || 'Unknown'
        },
        indexes: {
          pm25: getIndexLevel(airQualityIndex?.pm25IndexLevel),
          pm10: getIndexLevel(airQualityIndex?.pm10IndexLevel),
          no2: getIndexLevel(airQualityIndex?.no2IndexLevel),
          so2: getIndexLevel(airQualityIndex?.so2IndexLevel),
          o3: getIndexLevel(airQualityIndex?.o3IndexLevel)
        }
      }
    };
  } catch (error) {
    console.error('Error fetching GIOŚ data:', error);
    return null;
  }
};
