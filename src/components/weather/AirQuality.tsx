import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind, AlertTriangle, ThumbsUp, ThumbsDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AirQualityProps {
  data: {
    list: Array<{
      main: {
        aqi: number;
      };
      components: {
        co: number;
        no2: number;
        o3: number;
        pm2_5: number;
        pm10: number;
        so2: number;
      };
    }>;
  };
}

interface PollutantThreshold {
  good: number;
  moderate: number;
  unit: string;
  description: string;
}

const pollutantThresholds: Record<string, PollutantThreshold> = {
  pm2_5: {
    good: 10,
    moderate: 25,
    unit: "µg/m³",
    description: "Pył zawieszony PM2.5 - cząstki o średnicy mniejszej niż 2.5 mikrometra"
  },
  pm10: {
    good: 20,
    moderate: 50,
    unit: "µg/m³",
    description: "Pył zawieszony PM10 - cząstki o średnicy mniejszej niż 10 mikrometrów"
  },
  o3: {
    good: 100,
    moderate: 140,
    unit: "µg/m³",
    description: "Ozon - gaz będący formą tlenu"
  },
  no2: {
    good: 40,
    moderate: 70,
    unit: "µg/m³",
    description: "Dwutlenek azotu - gaz drażniący"
  },
  so2: {
    good: 20,
    moderate: 80,
    unit: "µg/m³",
    description: "Dwutlenek siarki - gaz o ostrym zapachu"
  },
  co: {
    good: 4000,
    moderate: 7000,
    unit: "µg/m³",
    description: "Tlenek węgla - bezwonny, trujący gaz"
  }
};

const getValueStatus = (value: number, pollutant: string) => {
  const threshold = pollutantThresholds[pollutant];
  if (!threshold) return { status: "unknown", color: "text-gray-500" };

  if (value <= threshold.good) {
    return { 
      status: "Dobra wartość", 
      color: "text-green-500",
      icon: <ThumbsUp className="h-4 w-4 text-green-500" />
    };
  } else if (value <= threshold.moderate) {
    return { 
      status: "Umiarkowana wartość", 
      color: "text-yellow-500",
      icon: <AlertTriangle className="h-4 w-4 text-yellow-500" />
    };
  } else {
    return { 
      status: "Zła wartość", 
      color: "text-red-500",
      icon: <ThumbsDown className="h-4 w-4 text-red-500" />
    };
  }
};

const getAQILevel = (aqi: number) => {
  switch (aqi) {
    case 1:
      return { label: "Bardzo dobra", color: "text-green-500" };
    case 2:
      return { label: "Dobra", color: "text-green-400" };
    case 3:
      return { label: "Umiarkowana", color: "text-yellow-500" };
    case 4:
      return { label: "Zła", color: "text-orange-500" };
    case 5:
      return { label: "Bardzo zła", color: "text-red-500" };
    default:
      return { label: "Brak danych", color: "text-gray-500" };
  }
};

const PollutantValue = ({ name, value, pollutantKey }: { name: string; value: number; pollutantKey: string }) => {
  const threshold = pollutantThresholds[pollutantKey];
  const status = getValueStatus(value, pollutantKey);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-help">
            <span>{name}:</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{value} {threshold?.unit}</span>
              {status.icon}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-[300px]">
          <div className="space-y-2">
            <p className="font-semibold">{threshold?.description}</p>
            <div className="space-y-1 text-sm">
              <p>Wartość dobra: ≤ {threshold?.good} {threshold?.unit}</p>
              <p>Wartość umiarkowana: ≤ {threshold?.moderate} {threshold?.unit}</p>
              <p>Obecna wartość: {value} {threshold?.unit}</p>
              <p className={status.color}>Status: {status.status}</p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const AirQuality = ({ data }: AirQualityProps) => {
  const { t } = useTranslation();
  const currentData = data.list[0];
  const aqiInfo = getAQILevel(currentData.main.aqi);

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Wind className="h-5 w-5" />
          {t("airQuality")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className={`flex items-center gap-2 ${aqiInfo.color}`}>
            <AlertTriangle className="h-5 w-5" />
            <span className="font-semibold">{aqiInfo.label}</span>
          </div>
          <div className="grid gap-2">
            <PollutantValue name="PM2.5" value={currentData.components.pm2_5} pollutantKey="pm2_5" />
            <PollutantValue name="PM10" value={currentData.components.pm10} pollutantKey="pm10" />
            <PollutantValue name="O₃" value={currentData.components.o3} pollutantKey="o3" />
            <PollutantValue name="NO₂" value={currentData.components.no2} pollutantKey="no2" />
            <PollutantValue name="SO₂" value={currentData.components.so2} pollutantKey="so2" />
            <PollutantValue name="CO" value={currentData.components.co} pollutantKey="co" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};