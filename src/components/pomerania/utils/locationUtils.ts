
/**
 * Maps location names to coordinates
 */
interface LocationCoordinates {
  lat: number;
  lng: number;
}

const locationCoordinatesMap: Record<string, LocationCoordinates> = {
  "gdańsk": { lat: 54.372158, lng: 18.638306 },
  "gdansk": { lat: 54.372158, lng: 18.638306 },
  "gdańsk wrzeszcz": { lat: 54.3813, lng: 18.5954 },
  "gdansk wrzeszcz": { lat: 54.3813, lng: 18.5954 },
  "sopot": { lat: 54.441581, lng: 18.560096 },
  "gdynia": { lat: 54.5189, lng: 18.5305 },
  "gdynia ul starowiejska": { lat: 54.5163, lng: 18.5361 },
  "trójmiasto": { lat: 54.441581, lng: 18.560096 },
  "trojmiasto": { lat: 54.441581, lng: 18.560096 }
};

/**
 * Returns coordinates for a given location name
 */
export const getCoordinatesForLocation = (location: string): LocationCoordinates | null => {
  const normalizedLocation = location.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  
  if (normalizedLocation.includes("starowiejska")) {
    return locationCoordinatesMap["gdynia ul starowiejska"];
  }
  
  if (locationCoordinatesMap[normalizedLocation]) {
    return locationCoordinatesMap[normalizedLocation];
  }
  
  for (const [key, coords] of Object.entries(locationCoordinatesMap)) {
    if (normalizedLocation.includes(key) || key.includes(normalizedLocation)) {
      return coords;
    }
  }
  
  return null;
};

/**
 * Returns a display-friendly location name
 */
export const getDisplayLocationName = (requestedLocation: string, installation: any): string => {
  if (requestedLocation.toLowerCase().includes("starowiejska")) {
    return "Gdynia, ul. Starowiejska";
  }
  
  if (installation.address) {
    const { street, city } = installation.address;
    if (street && city) {
      return `${city}, ul. ${street}`;
    }
    return city || "Nieznana lokalizacja";
  }
  
  return requestedLocation;
};

/**
 * Returns the appropriate unit for a sensor reading
 */
export const getUnitForReading = (name: string): string => {
  const units: Record<string, string> = {
    "PM1": "μg/m³",
    "PM2.5": "μg/m³",
    "PM10": "μg/m³",
    "TEMPERATURE": "°C",
    "HUMIDITY": "%",
    "PRESSURE": "hPa",
    "NO2": "μg/m³",
    "O3": "μg/m³",
    "SO2": "μg/m³",
    "CO": "μg/m³"
  };
  
  return units[name] || "";
};
