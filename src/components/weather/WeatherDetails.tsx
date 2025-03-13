import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ThermometerSun, 
  Gauge, 
  Eye, 
  Cloud, 
  Sunrise, 
  Sunset, 
  Wind, 
  Droplet,
  CloudRain,
  Snowflake,
  Navigation,
  Waves,
  Mountain
} from "lucide-react";
import { CurrentWeather } from "@/types/weather";

interface WeatherDetailsProps {
  data: CurrentWeather;
}

const getWindDirection = (deg: number): string => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
};

const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

export const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { t } = useTranslation();

  return (
    <Card className="w-full mt-4">
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        <div className="flex items-center gap-2">
          <ThermometerSun className="h-5 w-5 text-blue-500" />
          <div className="flex flex-col">
            <span>{t("temperature")}</span>
            <span className="text-sm text-muted-foreground">
              Min: {Math.round(data.main.temp_min)}°C / Max: {Math.round(data.main.temp_max)}°C
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThermometerSun className="h-5 w-5 text-orange-500" />
          <span>{t("feelsLike")}: {Math.round(data.main.feels_like)}°C</span>
        </div>

        <div className="flex items-center gap-2">
          <Gauge className="h-5 w-5 text-blue-500" />
          <div className="flex flex-col">
            <span>{t("pressure")}: {data.main.pressure} hPa</span>
            {data.main.sea_level && (
              <span className="text-sm text-muted-foreground">
                {t("seaLevel")}: {data.main.sea_level} hPa
              </span>
            )}
            {data.main.grnd_level && (
              <span className="text-sm text-muted-foreground">
                {t("groundLevel")}: {data.main.grnd_level} hPa
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Droplet className="h-5 w-5 text-blue-500" />
          <span>{t("humidity")}: {data.main.humidity}%</span>
        </div>

        <div className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-blue-500" />
          <span>{t("visibility")}: {(data.visibility / 1000).toFixed(1)} km</span>
        </div>

        <div className="flex items-center gap-2">
          <Cloud className="h-5 w-5 text-blue-500" />
          <span>{t("cloudiness")}: {data.clouds.all}%</span>
        </div>

        <div className="flex items-center gap-2">
          <Sunrise className="h-5 w-5 text-yellow-500" />
          <span>{t("sunrise")}: {formatTime(data.sys.sunrise)}</span>
        </div>

        <div className="flex items-center gap-2">
          <Sunset className="h-5 w-5 text-orange-500" />
          <span>{t("sunset")}: {formatTime(data.sys.sunset)}</span>
        </div>

        <div className="flex items-center gap-2">
          <Navigation 
            className="h-5 w-5 text-blue-500" 
            style={{ transform: `rotate(${data.wind.deg}deg)` }}
          />
          <span>{t("windDirection")}: {getWindDirection(data.wind.deg)} ({data.wind.deg}°)</span>
        </div>

        <div className="flex items-center gap-2">
          <Wind className="h-5 w-5 text-blue-500" />
          <span>{t("windSpeed")}: {Math.round(data.wind.speed * 3.6)} km/h</span>
        </div>

        {data.wind.gust && (
          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-blue-500" />
            <span>{t("windGusts")}: {Math.round(data.wind.gust * 3.6)} km/h</span>
          </div>
        )}

        {data.rain && (
          <div className="flex items-center gap-2">
            <CloudRain className="h-5 w-5 text-blue-500" />
            <div className="flex flex-col">
              {data.rain["1h"] !== undefined && (
                <span>{t("rain1h")}: {data.rain["1h"]} mm</span>
              )}
              {data.rain["3h"] !== undefined && (
                <span className="text-sm text-muted-foreground">
                  {t("rain3h")}: {data.rain["3h"]} mm
                </span>
              )}
            </div>
          </div>
        )}

        {data.snow && (
          <div className="flex items-center gap-2">
            <Snowflake className="h-5 w-5 text-blue-500" />
            <div className="flex flex-col">
              {data.snow["1h"] !== undefined && (
                <span>{t("snow1h")}: {data.snow["1h"]} mm</span>
              )}
              {data.snow["3h"] !== undefined && (
                <span className="text-sm text-muted-foreground">
                  {t("snow3h")}: {data.snow["3h"]} mm
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};