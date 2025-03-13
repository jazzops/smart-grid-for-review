import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { PowerProductionBreakdown } from '@/types/electricity';
import { COLORS } from './constants';

interface ProductionChartProps {
  data: PowerProductionBreakdown;
}

export const ProductionChart = ({ data }: ProductionChartProps) => {
  const chartData = Object.entries(data)
    .filter(([_, value]) => value > 0)
    .map(([key, value]) => ({
      name: key,
      value: value
    }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[entry.name] || COLORS.unknown} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};