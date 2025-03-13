
import { AirQualityData } from '@/types/company';

/**
 * Formats a numerical value with a unit, handling undefined values
 */
export const formatValue = (value: number | undefined, unit: string) => {
  if (value === undefined || value === null) return 'brak danych';
  return `${value.toFixed(1)} ${unit}`;
};

/**
 * Returns a CSS class based on the percentage of a pollutant standard
 */
export const getPercentageClass = (percent: number | undefined) => {
  if (!percent) return '';
  if (percent <= 50) return 'text-emerald-300';
  if (percent <= 100) return 'text-yellow-300';
  if (percent <= 150) return 'text-orange-300';
  return 'text-red-300';
};

/**
 * Extracts the percentage value for a specific pollutant from standards data
 */
export const getStandardPercentage = (data: any, pollutant: string) => {
  if (!data.standards) return null;
  const standard = data.standards.find((s: any) => s.pollutant === pollutant);
  return standard?.percent;
};

/**
 * Converts wind direction in degrees to cardinal directions
 */
export const getWindDirection = (degrees: number | undefined) => {
  if (degrees === undefined) return '';
  
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
  const index = Math.round((degrees % 360) / 45);
  return directions[index];
};

/**
 * Returns background and text color classes based on air quality index
 */
export const getColorClasses = (index: any) => {
  if (!index) return ['bg-gray-500/15', 'text-gray-300'];
  
  const value = index.value;
  if (value <= 25) return ['bg-emerald-500/15', 'text-emerald-300'];
  if (value <= 50) return ['bg-yellow-500/15', 'text-yellow-300'];
  if (value <= 75) return ['bg-orange-500/15', 'text-orange-300'];
  return ['bg-red-500/15', 'text-red-300'];
};
