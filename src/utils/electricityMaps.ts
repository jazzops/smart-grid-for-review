export const EUROPEAN_COUNTRIES = [
  { id: "FR", name: "France", lat: 48.8566, lon: 2.3522 },
  { id: "DE", name: "Germany", lat: 52.5200, lon: 13.4050 },
  { id: "ES", name: "Spain", lat: 40.4168, lon: -3.7038 },
  { id: "IT", name: "Italy", lat: 41.9028, lon: 12.4964 },
  { id: "PL", name: "Poland", lat: 52.2297, lon: 21.0122 },
  { id: "UK", name: "United Kingdom", lat: 51.5074, lon: -0.1278 },
  { id: "NL", name: "Netherlands", lat: 52.3676, lon: 4.9041 },
  { id: "BE", name: "Belgium", lat: 50.8503, lon: 4.3517 },
  { id: "SE", name: "Sweden", lat: 59.3293, lon: 18.0686 },
  { id: "NO", name: "Norway", lat: 59.9139, lon: 10.7522 }
];

export interface PowerData {
  zone: string;
  datetime: string;
  powerProductionBreakdown: {
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
  };
  fossilFreePercentage: number;
  renewablePercentage: number;
  powerImportTotal: number;
  powerExportTotal: number;
}

export const fetchPowerData = async (lat: number, lon: number): Promise<PowerData> => {
  const response = await fetch(
    `https://api.electricitymap.org/v3/power-breakdown/latest?lat=${lat}&lon=${lon}`,
    {
      headers: {
        'auth-token': localStorage.getItem('ELECTRICITY_MAPS_API_KEY') || ''
      }
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch power data');
  }
  
  return response.json();
};