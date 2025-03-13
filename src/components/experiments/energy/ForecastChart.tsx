import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { PowerForecast, ConsumptionForecast } from '@/types/electricity';

interface ForecastChartProps {
  productionForecast: PowerForecast;
  consumptionForecast: ConsumptionForecast;
}

export const ForecastChart = ({ productionForecast, consumptionForecast }: ForecastChartProps) => {
  const data = productionForecast.forecast.map((prod, index) => {
    const cons = consumptionForecast.forecast[index];
    return {
      time: new Date(prod.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      production: prod.powerProductionTotal,
      consumption: cons?.powerConsumptionTotal || 0,
      difference: prod.powerProductionTotal - (cons?.powerConsumptionTotal || 0)
    };
  });

  console.log('Chart Data:', data);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip 
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-background/95 p-2 rounded-lg border shadow-sm">
                  <p className="font-medium">{label}</p>
                  <p className="text-sm text-green-500">
                    Production: {payload[0].value.toLocaleString()} MW
                  </p>
                  <p className="text-sm text-blue-500">
                    Consumption: {payload[1].value.toLocaleString()} MW
                  </p>
                  <p className="text-sm text-orange-500">
                    Difference: {payload[2].value.toLocaleString()} MW
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="production" 
          stroke="#22c55e" 
          name="Production" 
          strokeWidth={2}
        />
        <Line 
          type="monotone" 
          dataKey="consumption" 
          stroke="#3b82f6" 
          name="Consumption"
          strokeWidth={2}
        />
        <Line 
          type="monotone" 
          dataKey="difference" 
          stroke="#f97316" 
          name="Difference"
          strokeWidth={2}
          strokeDasharray="5 5"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};