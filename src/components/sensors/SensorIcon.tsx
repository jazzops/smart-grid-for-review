
import { Thermometer, Cloud, Wind, Atom, Droplet, Volume2, Gauge, Sun } from "lucide-react";

export type SensorIconType = "temperature" | "co2" | "voc" | "pm25" | "pm10" | "humidity" | "noise" | "pressure" | "light";

interface SensorIconProps {
  type: SensorIconType;
  className?: string;
}

export const SensorIcon = ({ type, className = "w-5 h-5" }: SensorIconProps) => {
  switch (type) {
    case "temperature":
      return <Thermometer className={className} />;
    case "co2":
      return <Cloud className={className} />;
    case "voc":
      return <Wind className={className} />;
    case "pm25":
    case "pm10":
      return <Atom className={className} />;
    case "humidity":
      return <Droplet className={className} />;
    case "noise":
      return <Volume2 className={className} />;
    case "pressure":
      return <Gauge className={className} />;
    case "light":
      return <Sun className={className} />;
    default:
      return null;
  }
};
