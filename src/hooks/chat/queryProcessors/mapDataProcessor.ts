
import { SensorResponse } from "@/types/chat";
import { fetchAqicnData } from "@/services/airQuality/aqicnService";
import { AQICN_STATIONS } from "@/services/airQuality/aqicnStations";

// Check if the query is related to map data
export const isMapDataQuery = (query: string): boolean => {
  const lowerQuery = query.toLowerCase();
  return (
    (lowerQuery.includes("mapa") || lowerQuery.includes("map")) && 
    (lowerQuery.includes("czujnik") || lowerQuery.includes("sensor") || 
     lowerQuery.includes("stacja") || lowerQuery.includes("station") ||
     lowerQuery.includes("jakość powietrza") || lowerQuery.includes("air quality"))
  );
};

// Function to process map data queries
export const processMapDataQuery = async (query: string): Promise<SensorResponse> => {
  const lowerQuery = query.toLowerCase();
  
  // Using @ prefix for user-contributed stations as per AQICN API requirements
  let stationId = "@62983"; // Default to Gdynia as it's more likely to have data
  let stationName = "Gdynia";

  if (lowerQuery.includes("wrzeszcz") || lowerQuery.includes("gdańsk wrzeszcz")) {
    stationId = "@237496"; // Use correct station ID for Gdańsk Wrzeszcz
    stationName = "Gdańsk Wrzeszcz";
  } else if (lowerQuery.includes("gdynia")) {
    stationId = "@62983";
    stationName = "Gdynia";
  } else if (lowerQuery.includes("sopot")) {
    stationId = "@63286";
    stationName = "Sopot";
  } else if (lowerQuery.includes("zaspa")) {
    stationId = "@101890";
    stationName = "Gdańsk Zaspa";
  } else if (lowerQuery.includes("morena")) {
    stationId = "@467518";
    stationName = "Gdańsk Morena";
  } else if (lowerQuery.includes("oliwa")) {
    stationId = "@192865";
    stationName = "Gdańsk Oliwa";
  }
  
  try {
    // Fetch the data from AQICN API
    const data = await fetchAqicnData(stationId);
    
    if (!data) {
      return { 
        text: `Nie udało się pobrać danych z wybranej stacji pomiarowej ${stationName}. Spróbuj zapytać o inną stację lub spróbuj ponownie za chwilę.`
      };
    }
    
    // Prepare the air quality data
    const aqi = data.aqi || "brak danych";
    const pm25 = data.iaqi?.pm25?.v || "brak danych";
    const pm10 = data.iaqi?.pm10?.v || "brak danych";
    const temperature = data.iaqi?.t?.v || "brak danych";
    const humidity = data.iaqi?.h?.v || "brak danych";
    const pressure = data.iaqi?.p?.v || "brak danych";

    // Create a visualization for the data
    const sensorData = {
      location: stationName,
      provider: "AQICN",
      timestamp: data.time?.iso || new Date().toISOString(),
      airQualityIndex: data.aqi,
      readings: {
        "PM2.5": { value: pm25, unit: "μg/m³" },
        "PM10": { value: pm10, unit: "μg/m³" },
      },
      temperature: temperature,
      humidity: humidity,
      pressure: pressure
    };

    // Create response text
    let qualityDescription = "nieznana";
    if (aqi <= 50) qualityDescription = "dobra";
    else if (aqi <= 100) qualityDescription = "umiarkowana";
    else if (aqi <= 150) qualityDescription = "niezdrowa dla osób wrażliwych";
    else if (aqi <= 200) qualityDescription = "niezdrowa";
    else if (aqi <= 300) qualityDescription = "bardzo niezdrowa";
    else if (aqi > 300) qualityDescription = "niebezpieczna";

    const responseText = `Dane ze stacji pomiarowej ${stationName}:\n\nIndeks jakości powietrza (AQI): ${aqi} (${qualityDescription})\nPM2.5: ${pm25} μg/m³\nPM10: ${pm10} μg/m³\nTemperatura: ${temperature} °C\nWilgotność: ${humidity}%\nCiśnienie: ${pressure} hPa`;

    return {
      text: responseText,
      visualizations: [
        {
          type: "sensorReading",
          title: `Stacja pomiarowa: ${stationName}`,
          data: sensorData
        }
      ]
    };
  } catch (error) {
    console.error("Error fetching map sensor data:", error);
    return {
      text: `Wystąpił błąd podczas pobierania danych ze stacji ${stationName}. Spróbuj zapytać o inną stację lub spróbuj ponownie później.`
    };
  }
};

// Return a list of available stations
export const getAvailableStations = (): SensorResponse => {
  const stationList = AQICN_STATIONS.slice(0, 10).map(station => station.name).join("\n- ");
  
  return {
    text: `Dostępne stacje pomiarowe:\n- ${stationList}\n\nAby sprawdzić dane z konkretnej stacji, zapytaj o "jakość powietrza w [nazwa stacji]" lub "dane z czujnika w [nazwa stacji]".`
  };
};
