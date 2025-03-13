
import React from 'react';

export const AirQualityLegend = () => {
  return (
    <div className="mt-4 space-y-2">
      <div className="text-sm text-muted-foreground">
        Kliknij w znacznik na mapie, aby zobaczyć szczegółowe informacje o jakości powietrza.
        Kolor znacznika odpowiada jakości powietrza w danym miejscu. Dane pochodzą z czujników Airly oraz stacji GIOŚ (via AQICN).
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center">
          <span className="w-3 h-3 rounded-full bg-[#34D399] mr-1"></span>
          Bardzo dobra
        </span>
        <span className="inline-flex items-center">
          <span className="w-3 h-3 rounded-full bg-[#FBBF24] mr-1"></span>
          Dobra
        </span>
        <span className="inline-flex items-center">
          <span className="w-3 h-3 rounded-full bg-[#F59E0B] mr-1"></span>
          Umiarkowana
        </span>
        <span className="inline-flex items-center">
          <span className="w-3 h-3 rounded-full bg-[#EF4444] mr-1"></span>
          Zła
        </span>
        <span className="inline-flex items-center">
          <span className="w-3 h-3 rounded-full bg-[#991B1B] mr-1"></span>
          Bardzo zła
        </span>
        <span className="inline-flex items-center">
          <span className="w-3 h-3 rounded-full bg-[#7F1D1D] mr-1"></span>
          Niebezpieczna
        </span>
      </div>
      
      <div className="flex flex-wrap gap-4 mt-2 text-xs">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-blue-400 mr-1"></div>
          <span className="text-muted-foreground">Airly</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-orange-400 mr-1"></div>
          <span className="text-muted-foreground">GIOŚ (AQICN)</span>
        </div>
      </div>
    </div>
  );
};
