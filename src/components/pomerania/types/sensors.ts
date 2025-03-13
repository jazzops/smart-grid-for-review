export interface SensorData {
  id: string;
  lat: number;
  lng: number;
  source: 'Airly' | 'GIOS' | 'AQICN';
  stationName: string;
  region: 'Gdańsk' | 'Gdynia' | 'Sopot';
  pm25: number;
  pm10: number;
  timestamp: string;
  additionalData?: AdditionalData;
}

export interface AdditionalData {
  aqi?: number;
  temperature?: number;
  humidity?: number;
  co?: number;
  no2?: number;
  so2?: number;
  o3?: number;
} 