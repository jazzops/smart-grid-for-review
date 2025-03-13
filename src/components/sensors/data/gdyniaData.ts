
import { CityData } from "../types/SensorDataTypes";
import { sensorDescriptions } from "../constants/sensorDescriptions";

export const gdyniaData: CityData = {
  name: "Gdynia",
  coordinates: {
    lat: 54.5189,
    lon: 18.5305
  },
  sensors: [
    {
      iconType: "temperature",
      name: "Temp",
      value: "0",
      unit: "°C",
      status: "Good",
      description: sensorDescriptions.temp,
    },
    {
      iconType: "co2",
      name: "CO₂",
      value: "485",
      unit: "ppm",
      status: "Good",
      description: sensorDescriptions.co2,
    },
    {
      iconType: "voc",
      name: "VOC",
      value: "52",
      unit: "ppb",
      status: "Warning",
      description: sensorDescriptions.voc,
    },
    {
      iconType: "pm25",
      name: "PM 2.5",
      value: "8",
      unit: "µg/m³",
      status: "Good",
      description: sensorDescriptions.pm25,
    },
    {
      iconType: "pm10",
      name: "PM10",
      value: "11",
      unit: "µg/m³",
      status: "Good",
      description: sensorDescriptions.pm10,
    },
    {
      iconType: "humidity",
      name: "Humidity",
      value: "55",
      unit: "%",
      status: "Good",
      description: sensorDescriptions.humidity,
    },
    {
      iconType: "noise",
      name: "Noise",
      value: "48",
      unit: "dBA",
      status: "Good",
      description: sensorDescriptions.noise,
    },
    {
      iconType: "pressure",
      name: "Pressure",
      value: "1015",
      unit: "hPa",
      status: "Good",
      description: sensorDescriptions.pressure,
    },
    {
      iconType: "light",
      name: "Light",
      value: "82",
      unit: "%",
      status: "Good",
      description: sensorDescriptions.light,
    },
  ],
};
