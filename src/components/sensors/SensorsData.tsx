
import { SensorsDataByCity } from "./types/SensorDataTypes";
import { gdanskData } from "./data/gdanskData";
import { gdyniaData } from "./data/gdyniaData";
import { sopotData } from "./data/sopotData";
import { slupskData } from "./data/slupskData";
import { ustkaData } from "./data/ustkaData";
export { sensorDescriptions } from "./constants/sensorDescriptions";
export type { SensorData, CityData } from "./types/SensorDataTypes";

/**
 * Combined sensor data for all cities
 */
export const sensorsData: SensorsDataByCity = {
  gdansk: gdanskData,
  gdynia: gdyniaData,
  sopot: sopotData,
  slupsk: slupskData,
  ustka: ustkaData,
};
