interface ForecastSummaryProps {
  productionForecast: any;
  consumptionForecast: any;
}

export const ForecastSummary = ({ productionForecast, consumptionForecast }: ForecastSummaryProps) => {
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="p-4 rounded-lg border bg-card">
        <h4 className="text-sm font-medium mb-2">Production Total</h4>
        <p className="text-2xl font-semibold">
          {productionForecast.forecast[0]?.powerProductionTotal.toLocaleString()} MW
        </p>
      </div>
      <div className="p-4 rounded-lg border bg-card">
        <h4 className="text-sm font-medium mb-2">Consumption Total</h4>
        <p className="text-2xl font-semibold">
          {consumptionForecast.forecast[0]?.powerConsumptionTotal.toLocaleString()} MW
        </p>
      </div>
    </div>
  );
};