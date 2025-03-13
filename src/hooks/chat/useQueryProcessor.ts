
import { SensorResponse } from "@/types/chat";
import { isMapDataQuery, processMapDataQuery, getAvailableStations } from "./queryProcessors/mapDataProcessor";
import { isSensorRelatedQuery, processSensorRelatedQuery, processLocalAirQualityData } from "./queryProcessors/sensorProcessor";
import { processRagQuery } from "./queryProcessors/ragProcessor";

export const useQueryProcessor = () => {
  const processQuery = async (input: string): Promise<SensorResponse> => {
    // Handle map data queries
    if (isMapDataQuery(input)) {
      // If asking for list of stations
      if (input.toLowerCase().includes("lista stacji") || 
          input.toLowerCase().includes("dostępne stacje") ||
          input.toLowerCase().includes("jakie stacje") ||
          input.toLowerCase().includes("pokaż stacje")) {
        return getAvailableStations();
      }
      
      try {
        console.log("Processing map data query:", input);
        const mapDataResponse = await processMapDataQuery(input);
        return mapDataResponse;
      } catch (error) {
        console.error("Error processing map data query:", error);
        return {
          text: "Wystąpił błąd podczas przetwarzania zapytania o dane z mapy. Spróbuj zapytać inaczej lub o inną stację."
        };
      }
    }
    
    // Check if it's a sensor-related query
    if (isSensorRelatedQuery(input)) {
      return await processSensorRelatedQuery(input);
    }
    
    // Then check if we have local air quality data
    const localData = processLocalAirQualityData(input);
    if (localData.text !== "Nie znalazłem tej informacji w dostępnych danych.") {
      return localData;
    }
    
    // Finally, fall back to RAG response
    return await processRagQuery(input);
  };

  return { processQuery };
};
