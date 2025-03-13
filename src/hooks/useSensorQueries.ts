
import { SensorResponse } from "@/types/chat";
import { extractLocation, isSensorRelatedQuery } from "./sensors/useSensorQueryDetection";
import { getSensorData } from "./sensors/useSensorDataFetching";
import { formatSensorResponse } from "./sensors/useSensorResponseFormatting";

/**
 * Processes a user query for sensor data
 */
export const processSensorQuery = async (query: string): Promise<SensorResponse> => {
  // Extract location from query or default to Gdańsk
  const location = extractLocation(query) || "gdańsk";
  
  // Get sensor data for the location
  const sensorData = await getSensorData(location);
  
  // Handle error case
  if ('error' in sensorData) {
    return { text: sensorData.error };
  }
  
  // Format the response based on the query and data
  return formatSensorResponse(sensorData.data, sensorData.source, query);
};

// Re-export functions needed by other modules
export { isSensorRelatedQuery, extractLocation, getSensorData };
