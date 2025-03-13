
export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  dataVisualizations?: Array<{
    type: "airQuality" | "temperature" | "humidity" | "sensorReading";
    title: string;
    data?: any;
  }>;
}

export interface SensorResponse {
  text: string;
  visualizations?: Message["dataVisualizations"];
}

export interface SensorData {
  provider: string;
  location: string;
  timestamp: string;
  airQualityIndex?: number;
  airQualityLevel?: string;
  airQualityDescription?: string;
  readings?: Record<string, { value: number | string, unit: string }>;
  temperature?: number;
  humidity?: number;
  pressure?: number;
  error?: string;
}
