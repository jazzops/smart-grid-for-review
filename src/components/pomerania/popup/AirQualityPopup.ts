
import { AirQualityData } from '@/types/company';
import { getColorClasses } from '../utils/airQualityFormatters';
import { 
  renderAirQualityIndex,
  renderParticulateMatter,
  renderWeatherData,
  renderGases
} from './AirQualityPopupSections';

/**
 * Creates the HTML content for an air quality marker popup
 */
export const createMarkerPopup = (data: AirQualityData) => {
  const { source, current } = data;
  const index = current.indexes?.[0];
  const lastUpdate = new Date(current.timestamp).toLocaleString();
  
  // Get color classes based on air quality index
  const [bgClass, textClass] = getColorClasses(index);
  
  return `
    <div class="p-4 font-['Montserrat'] max-h-[80vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-bold text-lg text-white">${source.name}</h3>
        <span class="text-sm font-medium text-gray-400">${source.provider}</span>
      </div>
      
      ${renderAirQualityIndex(index, bgClass, textClass)}
      ${renderParticulateMatter(current)}
      ${renderWeatherData(current)}
      ${renderGases(current)}

      <div class="text-xs text-gray-400 mt-4">
        Ostatnia aktualizacja: ${lastUpdate}
      </div>
    </div>
  `;
};
