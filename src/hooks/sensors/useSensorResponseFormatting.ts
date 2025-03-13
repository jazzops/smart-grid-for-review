
import { SensorData, SensorResponse } from "@/types/chat";

/**
 * Formats sensor data into readable text and visualizations
 */
export const formatSensorResponse = (
  data: SensorData, 
  source: string, 
  query: string
): SensorResponse => {
  const lowercaseQuery = query.toLowerCase();
  
  const date = new Date(data.timestamp);
  const formattedDate = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  
  // Handle specific PM2.5 query
  if (lowercaseQuery.includes("pm2.5") || lowercaseQuery.includes("pm2,5")) {
    const pm25 = data.readings?.["PM2.5"] || data.readings?.["PM 2.5"];
    if (pm25) {
      return {
        text: `Aktualny poziom PM2.5 w ${data.location} wynosi ${pm25.value} ${pm25.unit}. Dane z ${source}, aktualizacja: ${formattedDate}.`,
        visualizations: [{ 
          type: "sensorReading", 
          title: `PM2.5 - ${data.location}`,
          data: {
            readings: { "PM2.5": pm25 },
            provider: source,
            location: data.location,
            timestamp: data.timestamp
          }
        }]
      };
    }
  }
  
  // Handle specific PM10 query
  if (lowercaseQuery.includes("pm10")) {
    const pm10 = data.readings?.["PM10"] || data.readings?.["PM 10"];
    if (pm10) {
      return {
        text: `Aktualny poziom PM10 w ${data.location} wynosi ${pm10.value} ${pm10.unit}. Dane z ${source}, aktualizacja: ${formattedDate}.`,
        visualizations: [{ 
          type: "sensorReading", 
          title: `PM10 - ${data.location}`,
          data: {
            readings: { "PM10": pm10 },
            provider: source,
            location: data.location,
            timestamp: data.timestamp
          }
        }]
      };
    }
  }
  
  // Handle temperature query
  if (lowercaseQuery.includes("temperatura")) {
    if (data.temperature) {
      return {
        text: `Aktualna temperatura w ${data.location} wynosi ${data.temperature}°C. Dane z ${source}, aktualizacja: ${formattedDate}.`,
        visualizations: [{ 
          type: "temperature", 
          title: `Temperatura - ${data.location}`,
          data: {
            temperature: data.temperature,
            provider: source,
            location: data.location,
            timestamp: data.timestamp
          }
        }]
      };
    }
  }
  
  // Handle humidity query
  if (lowercaseQuery.includes("wilgotność")) {
    if (data.humidity) {
      return {
        text: `Aktualna wilgotność w ${data.location} wynosi ${data.humidity}%. Dane z ${source}, aktualizacja: ${formattedDate}.`,
        visualizations: [{ 
          type: "humidity", 
          title: `Wilgotność - ${data.location}`,
          data: {
            humidity: data.humidity,
            provider: source,
            location: data.location,
            timestamp: data.timestamp
          }
        }]
      };
    }
  }
  
  // Default response with all available data
  let responseText = `Jakość powietrza w ${data.location} (dane z ${source}, aktualizacja: ${formattedDate}):\n`;
  
  if (data.airQualityIndex) {
    responseText += `\nIndeks jakości powietrza: ${data.airQualityIndex}`;
    if (data.airQualityLevel) {
      responseText += ` (${data.airQualityLevel})`;
    }
  }
  
  const pm25 = data.readings?.["PM2.5"] || data.readings?.["PM 2.5"];
  const pm10 = data.readings?.["PM10"] || data.readings?.["PM 10"];
  
  if (pm25) {
    responseText += `\nPM2.5: ${pm25.value} ${pm25.unit}`;
  }
  
  if (pm10) {
    responseText += `\nPM10: ${pm10.value} ${pm10.unit}`;
  }
  
  if (data.temperature) {
    responseText += `\nTemperatura: ${data.temperature}°C`;
  }
  
  if (data.humidity) {
    responseText += `\nWilgotność: ${data.humidity}%`;
  }
  
  if (data.pressure) {
    responseText += `\nCiśnienie: ${data.pressure} hPa`;
  }
  
  return {
    text: responseText,
    visualizations: [{ 
      type: "sensorReading", 
      title: `Jakość powietrza - ${data.location}`,
      data: data
    }]
  };
};
