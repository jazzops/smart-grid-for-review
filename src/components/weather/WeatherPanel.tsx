import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { RefreshCw } from "lucide-react";
import { CitySelector } from "./CitySelector";
import { WeatherDetails } from "./WeatherDetails";
import { WeatherForecast } from "./WeatherForecast";
import { WeatherSettings } from "./WeatherSettings";
import { getWeatherIcon } from "./weatherUtils";
import { AirQuality } from "./AirQuality";

const cities = [
  {
    id: "gdansk",
    name: "Gdańsk",
    lat: 54.352,
    lon: 18.6466
  },
  {
    id: "gdynia",
    name: "Gdynia",
    lat: 54.5189,
    lon: 18.5305
  },
  {
    id: "sopot",
    name: "Sopot",
    lat: 54.4418,
    lon: 18.5601
  },
  {
    id: "slupsk",
    name: "Słupsk",
    lat: 54.4641,
    lon: 17.0285
  },
  {
    id: "ustka",
    name: "Ustka",
    lat: 54.5805,
    lon: 16.8614
  }
];

export const WeatherPanel = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [units, setUnits] = useState("metric");
  const [displayOptions, setDisplayOptions] = useState({
    details: true,
    forecast: true,
    airQuality: true,
    map: true
  });

  const { data: weatherData, isLoading, error, refetch } = useQuery({
    queryKey: ['weather', selectedCity.id, units],
    queryFn: async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=${units}&lang=pl`
      );
      if (!response.ok) {
        throw new Error(t("weatherDataError"));
      }
      return response.json();
    },
    refetchInterval: 300000, // Refresh every 5 minutes
  });

  const { data: forecastData } = useQuery({
    queryKey: ['forecast', selectedCity.id, units],
    queryFn: async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedCity.lat}&lon=${selectedCity.lon}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=${units}&lang=pl`
      );
      if (!response.ok) {
        throw new Error(t("forecastDataError"));
      }
      return response.json();
    },
    refetchInterval: 300000,
  });

  const { data: airQualityData } = useQuery({
    queryKey: ['airQuality', selectedCity.id],
    queryFn: async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${selectedCity.lat}&lon=${selectedCity.lon}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
      );
      if (!response.ok) {
        throw new Error(t("airQualityError"));
      }
      return response.json();
    },
    enabled: displayOptions.airQuality,
    refetchInterval: 300000
  });

  const handleRefresh = () => {
    refetch();
    toast({
      title: t("refreshing"),
      description: t("weatherDataUpdated"),
    });
  };

  const handleDisplayOptionChange = (option: string, value: boolean) => {
    setDisplayOptions((prev) => ({
      ...prev,
      [option]: value,
    }));
  };

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="text-red-500">{t("weatherDataError")}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">{t("weatherInPomerania")}</CardTitle>
        <Button variant="ghost" size="icon" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <CitySelector
          cities={cities}
          selectedCity={selectedCity.id}
          onCitySelect={(cityId) => 
            setSelectedCity(cities.find(c => c.id === cityId) || cities[0])
          }
        />

        {displayOptions.airQuality && airQualityData && (
              <AirQuality data={airQualityData} />
            )}

        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : weatherData ? (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col items-center justify-center p-4 bg-card rounded-lg border">
                {getWeatherIcon(weatherData.weather[0].main)}
                <div className="mt-2 text-2xl font-bold">
                  {Math.round(weatherData.main.temp)}°{units === "metric" ? "C" : "F"}
                </div>
                <div className="text-muted-foreground">
                  {weatherData.weather[0].description}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span>{t("coordinates")}: {selectedCity.lat}, {selectedCity.lon}</span>
                </div>
              </div>
            </div>

            {displayOptions.details && <WeatherDetails data={weatherData} />}
            
            {displayOptions.forecast && forecastData && (
              <WeatherForecast
                hourlyForecast={forecastData.list.slice(0, 6)}
                dailyForecast={forecastData.list.filter((item: any, index: number) => index % 8 === 0)}
              />
            )}

            

            <WeatherSettings
              units={units}
              onUnitsChange={setUnits}
              displayOptions={displayOptions}
              onDisplayOptionChange={handleDisplayOptionChange}
            />
          </>
        ) : null}
      </CardContent>
    </Card>
  );
};
