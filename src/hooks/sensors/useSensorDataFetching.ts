import { getSensorReadingsByLocation } from "@/components/pomerania/airlyService";
import { fetchAqicnData } from "@/services/airQuality/aqicnService";
import { sensorsData } from "@/components/sensors/SensorsData";
import { SensorData } from "@/types/chat";

/**
 * Fetches sensor data from available sources based on location
 */
export const getSensorData = async (location: string): Promise<{ data: SensorData, source: string } | { error: string }> => {
  try {
    // Try Airly API first
    const airlyData = await getSensorReadingsByLocation(location);
    if (!airlyData.error) {
      return {
        data: airlyData,
        source: "Airly"
      };
    }
    
    // If Airly fails, try AQICN API
    let stationId = "2684"; // Default for Gdańsk
    if (location.toLowerCase().includes("sopot")) {
      stationId = "@63286";
    } else if (location.toLowerCase().includes("gdynia")) {
      stationId = "@62983";
    }
    
    try {
      const aqicnData = await fetchAqicnData(stationId);
      if (aqicnData) {
        return {
          data: {
            location: location,
            provider: "AQICN",
            timestamp: new Date().toISOString(),
            airQualityIndex: aqicnData.aqi,
            readings: {
              "PM2.5": { value: aqicnData.iaqi?.pm25?.v || 0, unit: "μg/m³" },
              "PM10": { value: aqicnData.iaqi?.pm10?.v || 0, unit: "μg/m³" },
              "NO2": { value: aqicnData.iaqi?.no2?.v || 0, unit: "μg/m³" },
              "O3": { value: aqicnData.iaqi?.o3?.v || 0, unit: "μg/m³" },
              "SO2": { value: aqicnData.iaqi?.so2?.v || 0, unit: "μg/m³" },
              "CO": { value: aqicnData.iaqi?.co?.v || 0, unit: "μg/m³" }
            },
            temperature: aqicnData.iaqi?.t?.v,
            humidity: aqicnData.iaqi?.h?.v,
            pressure: aqicnData.iaqi?.p?.v
          },
          source: "AQICN"
        };
      }
    } catch (error) {
      console.error("AQICN fetch error:", error);
    }
    
    // If both APIs fail, use static data as a fallback
    const gdanskData = sensorsData.gdansk;
    if (gdanskData) {
      const pm25Sensor = gdanskData.sensors.find(s => s.name === "PM 2.5");
      const pm10Sensor = gdanskData.sensors.find(s => s.name === "PM10");
      
      let calculatedAqi = 0;
      if (pm25Sensor && pm10Sensor) {
        calculatedAqi = Math.round((parseFloat(pm25Sensor.value) * 2 + parseFloat(pm10Sensor.value)) / 3);
      }
      
      return {
        data: {
          location: location,
          provider: "SensorsData",
          timestamp: new Date().toISOString(),
          readings: gdanskData.sensors.reduce((acc: Record<string, any>, sensor) => {
            acc[sensor.name] = { value: sensor.value, unit: sensor.unit };
            return acc;
          }, {}),
          airQualityIndex: calculatedAqi
        },
        source: "SensorsData"
      };
    }
    
    return { error: "Nie udało się pobrać danych z czujników" };
  } catch (error) {
    console.error("Error getting sensor data:", error);
    return { error: "Wystąpił błąd podczas pobierania danych" };
  }
};
