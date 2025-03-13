import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, Wind } from "lucide-react";

export const getWeatherIcon = (weatherMain: string) => {
  switch (weatherMain.toLowerCase()) {
    case 'clear':
      return <Sun className="h-8 w-8 text-yellow-500" />;
    case 'clouds':
      return <Cloud className="h-8 w-8 text-gray-500" />;
    case 'rain':
    case 'drizzle':
      return <CloudRain className="h-8 w-8 text-blue-500" />;
    case 'snow':
      return <CloudSnow className="h-8 w-8 text-blue-200" />;
    case 'thunderstorm':
      return <CloudLightning className="h-8 w-8 text-purple-500" />;
    case 'mist':
    case 'fog':
      return <CloudFog className="h-8 w-8 text-gray-400" />;
    default:
      return <Wind className="h-8 w-8 text-gray-500" />;
  }
};