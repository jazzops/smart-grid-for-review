
import { CityData } from "../types/SensorDataTypes";
import { sensorDescriptions } from "../constants/sensorDescriptions";

export const slupskData: CityData = {
  name: "Słupsk",
  coordinates: {
    lat: 54.352,
    lon: 18.6466
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
      value: "490",
      unit: "ppm",
      status: "Good",
      description: sensorDescriptions.co2,
    },
    {
      iconType: "voc",
      name: "VOC",
      value: "47",
      unit: "ppb",
      status: "Good",
      description: sensorDescriptions.voc,
    },
    {
      iconType: "pm25",
      name: "PM 2.5",
      value: "11",
      unit: "µg/m³",
      status: "Good",
      description: sensorDescriptions.pm25,
    },
    {
      iconType: "pm10",
      name: "PM10",
      value: "14",
      unit: "µg/m³",
      status: "Good",
      description: sensorDescriptions.pm10,
    },
    {
      iconType: "humidity",
      name: "Humidity",
      value: "52",
      unit: "%",
      status: "Good",
      description: sensorDescriptions.humidity,
    },
    {
      iconType: "noise",
      name: "Noise",
      value: "45",
      unit: "dBA",
      status: "Good",
      description: sensorDescriptions.noise,
    },
    {
      iconType: "pressure",
      name: "Pressure",
      value: "1012",
      unit: "hPa",
      status: "Good",
      description: sensorDescriptions.pressure,
    },
    {
      iconType: "light",
      name: "Light",
      value: "70",
      unit: "%",
      status: "Good",
      description: sensorDescriptions.light,
    },
  ],
};
