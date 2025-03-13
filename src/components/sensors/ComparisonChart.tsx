import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  timestamp: string;
  value: number;
}

interface ComparisonChartProps {
  data1: ChartData[];
  data2: ChartData[];
  title: string;
  city1: string;
  city2: string;
  unit: string;
}

export const ComparisonChart = ({
  data1,
  data2,
  title,
  city1,
  city2,
  unit,
}: ComparisonChartProps) => {
  // Combine data for comparison
  const combinedData = data1.map((item, index) => ({
    timestamp: item.timestamp,
    [city1]: item.value,
    [city2]: data2[index].value,
  }));

  return (
    <Card className="p-4">
      <h4 className="text-lg font-semibold mb-4">{title}</h4>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={combinedData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="timestamp"
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickMargin={10}
              label={{
                value: unit,
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle" },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                border: "none",
                borderRadius: "4px",
                color: "white",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={city1}
              stroke="#34d399"
              strokeWidth={2}
              dot={{ strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey={city2}
              stroke="#60a5fa"
              strokeWidth={2}
              dot={{ strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};