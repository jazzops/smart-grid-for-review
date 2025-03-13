
/**
 * Utilities for detecting sensor-related queries and extracting locations
 */

export const isSensorRelatedQuery = (query: string): boolean => {
  const lowercaseQuery = query.toLowerCase();
  const keywords = [
    "jakość powietrza", "powietrze", "czujnik", "czujniki", "sensor", "sensory",
    "pm2.5", "pm10", "pm2,5", "zanieczyszczenie", "smog", "pm1", "pyły",
    "temperatura", "wilgotność", "aqi", "caqi", "stacja", "stacje pomiarowe", 
    "airly", "aqicn", "dane", "odczyt", "ul", "ulica", "ulicy"
  ];
  
  const locations = [
    "gdańsk", "gdansk", "sopot", "gdynia", "trójmiasto", "trojmiasto", 
    "wrzeszcz", "starowiejska", "starowiejskiej"
  ];
  
  for (const keyword of keywords) {
    if (lowercaseQuery.includes(keyword)) {
      return true;
    }
  }
  
  for (const location of locations) {
    if (lowercaseQuery.includes(location) && 
        (lowercaseQuery.includes("powietrze") || 
         lowercaseQuery.includes("jakość") || 
         lowercaseQuery.includes("czujnik") ||
         lowercaseQuery.includes("dane") ||
         lowercaseQuery.includes("odczyt"))) {
      return true;
    }
  }
  
  return false;
};

export const extractLocation = (query: string): string | null => {
  const lowercaseQuery = query.toLowerCase();
  
  if (lowercaseQuery.includes("starowiejska") || 
      lowercaseQuery.includes("starowiejskiej")) {
    return "gdynia ul starowiejska";
  }
  
  const locations = [
    { name: "gdańsk wrzeszcz", keywords: ["gdańsk wrzeszcz", "gdansk wrzeszcz", "wrzeszcz"] },
    { name: "gdańsk", keywords: ["gdańsk", "gdansk"] },
    { name: "sopot", keywords: ["sopot"] },
    { name: "gdynia", keywords: ["gdynia"] },
    { name: "trójmiasto", keywords: ["trójmiasto", "trojmiasto", "trójmieście", "trojmiescie"] }
  ];
  
  for (const location of locations) {
    for (const keyword of location.keywords) {
      if (lowercaseQuery.includes(keyword)) {
        return location.name;
      }
    }
  }
  
  return null;
};
