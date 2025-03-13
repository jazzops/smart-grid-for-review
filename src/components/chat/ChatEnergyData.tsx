
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useCompanyStore } from "@/components/CompanySidebar";
import { companiesData } from "@/data/companies";
import { sensorsData } from "@/components/sensors/SensorsData";

interface ChatEnergyDataProps {
  dataType: "consumption" | "production" | "efficiency" | "airQuality" | "temperature" | "humidity";
  title: string;
}

export function ChatEnergyData({ dataType, title }: ChatEnergyDataProps) {
  const { selectedCompanyId } = useCompanyStore();
  const selectedCompany = companiesData.find(
    (company) => company.id === selectedCompanyId
  );

  const getDataColor = () => {
    switch (dataType) {
      case "consumption":
        return "#ef4444";
      case "production":
        return "#34d399";
      case "efficiency":
        return "#60a5fa";
      case "airQuality":
        return "#8b5cf6";
      case "temperature":
        return "#f59e0b";
      case "humidity":
        return "#3b82f6";
      default:
        return "#60a5fa";
    }
  };

  const getData = () => {
    if (["consumption", "production", "efficiency"].includes(dataType)) {
      return selectedCompany?.energyData || [];
    } else {
      const gdanskData = sensorsData.gdansk;
      if (!gdanskData) return [];

      // Convert sensor data to chart format
      const last24Hours = Array.from({ length: 24 }, (_, i) => {
        const hour = new Date();
        hour.setHours(hour.getHours() - (23 - i));
        return {
          name: hour.getHours().toString().padStart(2, '0') + ':00',
          value: gdanskData.sensors.find(s => {
            if (dataType === "airQuality") return s.name === "PM 2.5";
            if (dataType === "temperature") return s.name === "Temp";
            if (dataType === "humidity") return s.name === "Humidity";
            return false;
          })?.value || "0"
        };
      });

      return last24Hours;
    }
  };

  const chartData = getData();

  return (
    <Card className="w-full p-4 my-4">
      <h4 className="text-sm font-medium mb-4">{title}</h4>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={["consumption", "production", "efficiency"].includes(dataType) ? dataType : "value"}
              stroke={getDataColor()}
              strokeWidth={2}
              dot={{ strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
