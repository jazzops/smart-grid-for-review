import { CurrentWeather, WeatherForecast, AirQualityData } from "@/types/weather";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchCurrentWeather = async (
  lat: number,
  lon: number,
  units: string = "metric",
  lang: string = "pl"
): Promise<CurrentWeather> => {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}&lang=${lang}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch current weather data");
  }
  return response.json();
};

export const fetchWeatherForecast = async (
  lat: number,
  lon: number,
  units: string = "metric",
  lang: string = "pl"
): Promise<WeatherForecast> => {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}&lang=${lang}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch weather forecast");
  }
  return response.json();
};

export const fetchAirQuality = async (
  lat: number,
  lon: number
): Promise<AirQualityData> => {
  const response = await fetch(
    `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch air quality data");
  }
  return response.json();
};