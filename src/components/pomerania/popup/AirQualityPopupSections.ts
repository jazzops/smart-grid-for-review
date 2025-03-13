
import { formatValue, getPercentageClass, getWindDirection } from '../utils/airQualityFormatters';

/**
 * Generates the HTML for the air quality index section
 */
export const renderAirQualityIndex = (index: any, bgClass: string, textClass: string) => {
  return `
    <div class="p-3 rounded-lg mb-4 ${bgClass}">
      <div class="font-bold text-lg ${textClass}">
        ${index ? index.description : 'Cóż... Bywało lepiej.'}
      </div>
      ${index?.advice ? `
        <div class="text-sm mt-1 text-gray-300">
          ${index.advice}
        </div>
      ` : ''}
    </div>
  `;
};

/**
 * Generates the HTML for the particulate matter section
 */
export const renderParticulateMatter = (current: any) => {
  // Calculate percentages from standards
  const pm25Percent = current.standards?.find((s: any) => s.pollutant === 'PM25')?.percent;
  const pm10Percent = current.standards?.find((s: any) => s.pollutant === 'PM10')?.percent;
  
  return `
    <div class="mb-4">
      <h4 class="text-sm uppercase font-semibold text-gray-400 mb-2 border-b border-gray-700 pb-1">Pyły</h4>
      <div class="grid grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <div class="text-sm text-gray-400">PM10</div>
          <div class="flex items-baseline">
            <div class="text-lg font-semibold text-white mr-2">
              ${formatValue(current.pm10, 'µg/m³')}
            </div>
            ${pm10Percent ? `
              <div class="text-xs ${getPercentageClass(pm10Percent)}">
                ${pm10Percent}%
              </div>
            ` : ''}
          </div>
        </div>

        <div>
          <div class="text-sm text-gray-400">PM2.5</div>
          <div class="flex items-baseline">
            <div class="text-lg font-semibold text-white mr-2">
              ${formatValue(current.pm25, 'µg/m³')}
            </div>
            ${pm25Percent ? `
              <div class="text-xs ${getPercentageClass(pm25Percent)}">
                ${pm25Percent}%
              </div>
            ` : ''}
          </div>
        </div>

        ${current.pm1 ? `
          <div>
            <div class="text-sm text-gray-400">PM1</div>
            <div class="text-lg font-semibold text-white">
              ${formatValue(current.pm1, 'µg/m³')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
};

/**
 * Generates the HTML for the weather data section
 */
export const renderWeatherData = (current: any) => {
  // Format wind direction
  const windDirection = getWindDirection(current.windDirection || current.windHeading);
  
  return `
    <div class="mb-4">
      <h4 class="text-sm uppercase font-semibold text-gray-400 mb-2 border-b border-gray-700 pb-1">Dane pogodowe</h4>
      <div class="grid grid-cols-2 gap-x-6 gap-y-4">
        ${current.temperature ? `
          <div>
            <div class="text-sm text-gray-400">Temperatura</div>
            <div class="text-lg font-semibold text-white">
              ${formatValue(current.temperature, '°C')}
            </div>
          </div>
        ` : ''}

        ${current.humidity ? `
          <div>
            <div class="text-sm text-gray-400">Wilgotność</div>
            <div class="text-lg font-semibold text-white">
              ${formatValue(current.humidity, '%')}
            </div>
          </div>
        ` : ''}

        ${current.pressure ? `
          <div>
            <div class="text-sm text-gray-400">Ciśnienie</div>
            <div class="text-lg font-semibold text-white">
              ${formatValue(current.pressure, 'hPa')}
            </div>
          </div>
        ` : ''}

        ${(current.windSpeed || current.windDirection || current.windHeading) ? `
          <div>
            <div class="text-sm text-gray-400">Wiatr</div>
            <div class="text-lg font-semibold text-white">
              ${windDirection} ${formatValue(current.windSpeed || 0, 'km/h')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
};

/**
 * Generates the HTML for the gases section
 */
export const renderGases = (current: any) => {
  return `
    <div class="mb-4">
      <h4 class="text-sm uppercase font-semibold text-gray-400 mb-2 border-b border-gray-700 pb-1">Gazy</h4>
      <div class="grid grid-cols-2 gap-x-6 gap-y-4">
        ${current.no2 ? `
          <div>
            <div class="text-sm text-gray-400">NO₂</div>
            <div class="text-lg font-semibold text-white">
              ${formatValue(current.no2, 'µg/m³')}
            </div>
          </div>
        ` : ''}

        ${current.o3 ? `
          <div>
            <div class="text-sm text-gray-400">O₃</div>
            <div class="text-lg font-semibold text-white">
              ${formatValue(current.o3, 'µg/m³')}
            </div>
          </div>
        ` : ''}

        ${current.so2 ? `
          <div>
            <div class="text-sm text-gray-400">SO₂</div>
            <div class="text-lg font-semibold text-white">
              ${formatValue(current.so2, 'µg/m³')}
            </div>
          </div>
        ` : ''}

        ${current.co ? `
          <div>
            <div class="text-sm text-gray-400">CO</div>
            <div class="text-lg font-semibold text-white">
              ${formatValue(current.co, 'mg/m³')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
};
