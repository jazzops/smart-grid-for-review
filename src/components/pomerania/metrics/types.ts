
export interface MetricData {
  title: string;
  value: string;
  unit: string;
  status: "Good" | "Moderate" | "Bad";
  change?: string;
  period?: string;
  subtext?: string;
}
