export const getAQIColor = (aqi: number): string => {
  if (aqi <= 50) return '#00E400'; // Dobry
  if (aqi <= 100) return '#FFFF00'; // Umiarkowany
  if (aqi <= 150) return '#FF7E00'; // Niezdrowy dla wrażliwych grup
  if (aqi <= 200) return '#FF0000'; // Niezdrowy
  if (aqi <= 300) return '#8F3F97'; // Bardzo niezdrowy
  return '#7E0023'; // Niebezpieczny
}; 