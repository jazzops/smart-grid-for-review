
import { Card } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { MetricData } from "./types";

interface MetricCardProps {
  metric: MetricData;
}

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <Card className="p-4">
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          {metric.title}
        </p>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            {metric.value}
            <span className="text-sm font-normal text-muted-foreground ml-1">
              {metric.unit}
            </span>
          </h2>
          {metric.status === "Good" && (
            <span className="text-sm font-medium text-green-500">
              Dobra
            </span>
          )}
          {metric.status === "Moderate" && (
            <span className="text-sm font-medium text-yellow-500">
              Średnia
            </span>
          )}
          {metric.status === "Bad" && (
            <span className="text-sm font-medium text-red-500">
              Zła
            </span>
          )}
        </div>
        {metric.change ? (
          <p className="text-xs text-muted-foreground flex items-center">
            {parseFloat(metric.change) > 0 ? (
              <ArrowUpIcon className="w-4 h-4 text-red-500 mr-1" />
            ) : (
              <ArrowDownIcon className="w-4 h-4 text-green-500 mr-1" />
            )}
            {metric.change} {metric.period}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">
            {metric.subtext}
          </p>
        )}
      </div>
    </Card>
  );
}
