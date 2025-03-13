import { SensorWidget } from "./SensorWidget";

interface DataVisualizationProps {
  visualizations?: Array<{
    type: "airQuality" | "temperature" | "humidity" | "sensorReading";
    title: string;
    data?: any;
  }>;
}

export function DataVisualizations({ visualizations }: DataVisualizationProps) {
  if (!visualizations || visualizations.length === 0) return null;
  
  return (
    <div className="mt-3 space-y-2">
      {visualizations.map((viz, index) => (
        <div key={index}>
          {viz.type === "sensorReading" && viz.data && (
            <SensorWidget data={viz.data} title={viz.title} />
          )}
          {/* Other visualization types can be added here */}
        </div>
      ))}
    </div>
  );
}
