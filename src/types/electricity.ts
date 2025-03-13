export interface PowerProductionBreakdown {
  nuclear: number;
  geothermal: number | null;
  biomass: number;
  coal: number;
  wind: number;
  solar: number;
  hydro: number;
  gas: number;
  oil: number;
  unknown: number | null;
  "hydro discharge": number;
  "battery discharge": number;
}

export interface PowerData {
  zone: string;
  datetime: string;
  powerProductionBreakdown: PowerProductionBreakdown;
  fossilFreePercentage: number;
  renewablePercentage: number;
  powerImportTotal: number;
  powerExportTotal: number;
}

export interface PowerForecastEntry {
  powerProductionBreakdown: PowerProductionBreakdown;
  datetime: string;
  powerProductionTotal: number;
}

export interface PowerForecast {
  zone: string;
  forecast: PowerForecastEntry[];
  updatedAt: string;
}

export interface ConsumptionBreakdown {
  biomass: number;
  coal: number;
  gas: number;
  hydro: number;
  nuclear: number;
  solar: number;
  wind: number;
  unknown: number;
}

export interface ConsumptionForecastEntry {
  powerConsumptionBreakdown: ConsumptionBreakdown;
  datetime: string;
  powerConsumptionTotal: number;
}

export interface ConsumptionForecast {
  zone: string;
  forecast: ConsumptionForecastEntry[];
  updatedAt: string;
}