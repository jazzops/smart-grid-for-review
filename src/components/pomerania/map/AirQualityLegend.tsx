import React from 'react';

export const AirQualityLegend = () => {
  const legendItems = [
    { color: '#00E400', range: '0-50', label: 'Dobra' },
    { color: '#FFFF00', range: '51-100', label: 'Umiarkowana' },
    { color: '#FF7E00', range: '101-150', label: 'Niezdrowa dla wrażliwych grup' },
    { color: '#FF0000', range: '151-200', label: 'Niezdrowa' },
    { color: '#8F3F97', range: '201-300', label: 'Bardzo niezdrowa' },
    { color: '#7E0023', range: '300+', label: 'Niebezpieczna' },
  ];

  return (
    <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-3">Legenda jakości powietrza (AQI)</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {legendItems.map((item) => (
          <div key={item.range} className="flex items-center space-x-2">
            <div
              className="w-6 h-6 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <div className="text-sm">
              <div className="font-medium">{item.range}</div>
              <div className="text-gray-500 dark:text-gray-400">{item.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};