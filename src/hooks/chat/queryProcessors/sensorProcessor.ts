
import { SensorResponse } from "@/types/chat";
import { processSensorQuery, isSensorRelatedQuery } from "@/hooks/useSensorQueries";
import { getAirQualityData } from "@/hooks/useAirQualityData";

export const processSensorRelatedQuery = async (query: string): Promise<SensorResponse> => {
  try {
    const sensorResponse = await processSensorQuery(query);
    return sensorResponse;
  } catch (error) {
    console.error("Error processing sensor query:", error);
    return {
      text: "Wystąpił błąd podczas przetwarzania zapytania o dane z czujników. Spróbuj zapytać inaczej."
    };
  }
};

export const processLocalAirQualityData = (query: string): SensorResponse => {
  return getAirQualityData(query);
};

export { isSensorRelatedQuery };
