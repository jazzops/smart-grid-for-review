
import { MetricCard } from "./metrics/MetricCard";
import { useAirQualityData } from "./metrics/useAirQualityData";

export const AirQualitySpaces = () => {
  const metrics = useAirQualityData();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, i) => (
        <MetricCard key={i} metric={metric} />
      ))}
    </div>
  );
};
