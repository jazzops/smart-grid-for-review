export type AirQualitySource = 'AQICN' | 'GIOS' | 'Airly';

export interface AirQualityData {
  id: string;
  stationName: string;
  region: string;
  coordinates: [number, number];
  measurements: {
    aqi: number;
    pm25: number;
    pm10: number;
    temperature?: number;
    humidity?: number;
    timestamp: string;
    source: AirQualitySource;
  };
} 