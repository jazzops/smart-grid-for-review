import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getWeatherIcon } from "./weatherUtils";

interface ForecastData {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
}

interface WeatherForecastProps {
  hourlyForecast: ForecastData[];
  dailyForecast: ForecastData[];
}

export const WeatherForecast = ({ hourlyForecast, dailyForecast }: WeatherForecastProps) => {
  const { t } = useTranslation();

  return (
    <Card className="w-full mt-4">
      <CardHeader>
        <CardTitle>{t("forecast")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="hourly">
          <TabsList>
            <TabsTrigger value="hourly">{t("hourlyForecast")}</TabsTrigger>
            <TabsTrigger value="daily">{t("dailyForecast")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hourly">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {hourlyForecast.slice(0, 6).map((hour) => (
                <div key={hour.dt} className="flex flex-col items-center p-4 border rounded-lg">
                  <span className="text-sm">
                    {new Date(hour.dt * 1000).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                  {getWeatherIcon(hour.weather[0].main)}
                  <span className="text-lg font-bold mt-2">
                    {Math.round(hour.main.temp)}°C
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {hour.weather[0].description}
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="daily">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {dailyForecast.slice(0, 4).map((day) => (
                <div key={day.dt} className="flex flex-col items-center p-4 border rounded-lg">
                  <span className="text-sm">
                    {new Date(day.dt * 1000).toLocaleDateString()}
                  </span>
                  {getWeatherIcon(day.weather[0].main)}
                  <div className="flex gap-2 mt-2">
                    <span className="text-blue-500">
                      {Math.round(day.main.temp_min)}°C
                    </span>
                    <span>-</span>
                    <span className="text-red-500">
                      {Math.round(day.main.temp_max)}°C
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {day.weather[0].description}
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};