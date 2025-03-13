
import { SensorIconType } from "../SensorIcon";

export interface SensorData {
  iconType: SensorIconType;
  name: string;
  value: string;
  unit: string;
  status: "Good" | "Warning";
  description: string;
}

export interface CityData {
  name: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  sensors: SensorData[];
}

export type SensorsDataByCity = Record<string, CityData>;
