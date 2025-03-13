import React from 'react';

interface LegendItem {
  range: string;
  color: string;
  label: string;
  description: string;
}

const legendItems: LegendItem[] = [
  {
    range: '0-50',
    color: '#00E400',
    label: 'Dobra',
    description: 'Jakość powietrza jest zadowalająca'
  },
  {
    range: '51-100',
    color: '#FFFF00',
    label: 'Umiarkowana',
    description: 'Jakość powietrza jest akceptowalna'
  },
  {
    range: '101-150',
    color: '#FF7E00',
    label: 'Niezdrowa dla wrażliwych grup',
    description: 'Osoby wrażliwe mogą odczuwać negatywne skutki'
  },
  {
    range: '151-200',
    color: '#FF0000',
    label: 'Niezdrowa',
    description: 'Każdy może zacząć odczuwać negatywne skutki'
  },
  {
    range: '201-300',
    color: '#8F3F97',
    label: 'Bardzo niezdrowa',
    description: 'Ostrzeżenie zdrowotne: wszyscy mogą odczuwać poważne skutki'
  },
  {
    range: '>300',
    color: '#7E0023',
    label: 'Niebezpieczna',
    description: 'Alert zdrowotny: każdy może odczuwać poważne skutki zdrowotne'
  }
];

export function AirQualityLegend() {
  return (
    <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-3 dark:text-white">Legenda jakości powietrza (AQI)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {legendItems.map((item) => (
          <div 
            key={item.range}
            className="flex items-start space-x-2 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div
              className="w-6 h-6 rounded-full flex-shrink-0 mt-1"
              style={{ backgroundColor: item.color }}
            />
            <div>
              <div className="font-medium dark:text-white">
                {item.label} ({item.range})
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}