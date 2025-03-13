
import { AirQualityData } from "@/types/company";
import { fetchAqicnData, fetchAllAqicnStations as fetchAllStations } from "./aqicnDataFetching";
import { transformAqicnToAirQualityData } from "./aqicnDataTransformation";
import { AQICN_STATIONS } from "./aqicnStations";

// Re-export everything for backward compatibility
export { AQICN_STATIONS, fetchAqicnData };
export { getAqiLevelInfo } from "./aqicnDataTransformation";

/**
 * Fetch data for all AQICN stations and transform it to AirQualityData format
 */
export const fetchAllAqicnStations = async (): Promise<AirQualityData[]> => {
  try {
    const stationsRawData = await fetchAllStations();
    
    return stationsRawData
      .map(station => {
        if (!station) return null;
        return transformAqicnToAirQualityData(station.stationId, station.data, station.stationName);
      })
      .filter(Boolean) as AirQualityData[];
  } catch (error) {
    console.error('Error fetching and transforming AQICN stations data:', error);
    return [];
  }
};

// Re-export the transform function for backward compatibility
export { transformAqicnToAirQualityData };

