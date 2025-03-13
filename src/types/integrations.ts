export type IntegrationType = 
  | "smartHome" 
  | "energyManagement" 
  | "zapier" 
  | "googleHome" 
  | "alexa" 
  | "homeKit" 
  | "cloudServices" 
  | "alarmSystems" 
  | "irrigation";

export interface IntegrationConfig {
  webhook?: string;
  apiKey?: string;
  endpoint?: string;
  deviceId?: string;
}

export interface Integration {
  type: IntegrationType;
  name: string;
  description: string;
  icon: string;
  status: "connected" | "disconnected" | "warning";
}