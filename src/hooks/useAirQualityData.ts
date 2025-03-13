
import { sensorsData } from "@/components/sensors/SensorsData";
import { SensorResponse } from "@/types/chat";

export const getAirQualityData = (query: string): SensorResponse => {
  const lowercaseQuery = query.toLowerCase();
  const gdanskData = sensorsData.gdansk;
  
  if (!gdanskData) {
    return { text: "Przepraszam, ale nie mogę znaleźć danych dla Gdańska." };
  }

  if (lowercaseQuery.includes("pm2.5") || lowercaseQuery.includes("pm2,5")) {
    const pm25Sensor = gdanskData.sensors.find(s => s.name === "PM 2.5");
    if (pm25Sensor) {
      return {
        text: `Aktualny poziom PM2.5 w Gdańsku wynosi ${pm25Sensor.value} ${pm25Sensor.unit}. ${pm25Sensor.description}`,
        visualizations: [{ type: "airQuality", title: "Poziom PM2.5" }]
      };
    }
  }

  if (lowercaseQuery.includes("pm10")) {
    const pm10Sensor = gdanskData.sensors.find(s => s.name === "PM10");
    if (pm10Sensor) {
      return {
        text: `Aktualny poziom PM10 w Gdańsku wynosi ${pm10Sensor.value} ${pm10Sensor.unit}. ${pm10Sensor.description}`,
        visualizations: [{ type: "airQuality", title: "Poziom PM10" }]
      };
    }
  }

  if (lowercaseQuery.includes("jakość powietrza") || lowercaseQuery.includes("zanieczyszczenie")) {
    const airQualityInfo = gdanskData.sensors
      .filter(s => ["PM 2.5", "PM10"].includes(s.name))
      .map(s => `${s.name}: ${s.value} ${s.unit} (${s.status})`)
      .join("\n");

    return {
      text: `Aktualna jakość powietrza w Gdańsku:\n${airQualityInfo}`,
      visualizations: [{ type: "airQuality", title: "Jakość powietrza" }]
    };
  }

  if (lowercaseQuery.includes("temperatura")) {
    const tempSensor = gdanskData.sensors.find(s => s.name === "Temp");
    if (tempSensor) {
      return {
        text: `Aktualna temperatura w Gdańsku wynosi ${tempSensor.value} ${tempSensor.unit}. ${tempSensor.description}`,
        visualizations: [{ type: "temperature", title: "Temperatura" }]
      };
    }
  }

  if (lowercaseQuery.includes("wilgotność")) {
    const humiditySensor = gdanskData.sensors.find(s => s.name === "Humidity");
    if (humiditySensor) {
      return {
        text: `Aktualna wilgotność w Gdańsku wynosi ${humiditySensor.value} ${humiditySensor.unit}. ${humiditySensor.description}`,
        visualizations: [{ type: "humidity", title: "Wilgotność" }]
      };
    }
  }

  return { text: "Nie znalazłem tej informacji w dostępnych danych." };
};
