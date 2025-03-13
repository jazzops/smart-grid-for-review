
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SensorWidgetProps {
  data: any;
  title: string;
}

export function SensorWidget({ data, title }: SensorWidgetProps) {
  if (!data) return null;
  
  // Prepare data formatting
  const location = data.location || "Brak danych o lokalizacji";
  const provider = data.provider || "Nieznane źródło";
  const timestamp = data.timestamp ? new Date(data.timestamp) : new Date();
  const formattedTime = format(timestamp, "HH:mm, dd MMM", { locale: pl });
  const readings = data.readings || {};
  
  // Helper function to render air quality status color
  const getAqiColor = (aqi: number | undefined) => {
    if (!aqi) return "bg-gray-400";
    if (aqi <= 50) return "bg-green-500";
    if (aqi <= 100) return "bg-yellow-500";
    if (aqi <= 150) return "bg-orange-500";
    if (aqi <= 200) return "bg-red-500";
    if (aqi <= 300) return "bg-purple-500";
    return "bg-purple-900";
  };
  
  // Get AQI label
  const getAqiLabel = (aqi: number | undefined) => {
    if (!aqi) return "";
    if (aqi <= 50) return "Dobra";
    if (aqi <= 100) return "Umiarkowana";
    if (aqi <= 150) return "Niezdrowa dla wrażliwych";
    if (aqi <= 200) return "Niezdrowa";
    if (aqi <= 300) return "Bardzo niezdrowa";
    return "Niebezpieczna";
  };
  
  return (
    <Card className="mb-4 shadow-sm border-muted-foreground/20">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base flex items-center gap-2">
          {title}
          {data.airQualityIndex && (
            <span className={`${getAqiColor(data.airQualityIndex)} text-white text-xs px-2 py-1 rounded-full`}>
              AQI: {data.airQualityIndex} {getAqiLabel(data.airQualityIndex)}
            </span>
          )}
        </CardTitle>
        <CardDescription className="text-xs">
          {location} | {provider} | {formattedTime}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-3">
          {Object.entries(readings).map(([key, value]: [string, any]) => (
            <div key={key} className="border rounded p-2 text-center min-w-[80px]">
              <div className="text-sm font-medium">{key}</div>
              <div className="text-base">{value.value} <span className="text-xs">{value.unit}</span></div>
            </div>
          ))}
          
          {data.temperature && (
            <div className="border rounded p-2 text-center min-w-[80px]">
              <div className="text-sm font-medium">Temp</div>
              <div className="text-base">{data.temperature} <span className="text-xs">°C</span></div>
            </div>
          )}
          
          {data.humidity && (
            <div className="border rounded p-2 text-center min-w-[80px]">
              <div className="text-sm font-medium">Wilgotność</div>
              <div className="text-base">{data.humidity} <span className="text-xs">%</span></div>
            </div>
          )}
          
          {data.pressure && (
            <div className="border rounded p-2 text-center min-w-[80px]">
              <div className="text-sm font-medium">Ciśnienie</div>
              <div className="text-base">{data.pressure} <span className="text-xs">hPa</span></div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
