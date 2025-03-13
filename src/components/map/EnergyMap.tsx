
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useCompanyStore } from '@/components/CompanySidebar';
import { companiesData } from '@/data/companies';

const AirQualityMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const { selectedCompanyId } = useCompanyStore();
  const selectedProject = companiesData.find(
    (company) => company.id === selectedCompanyId
  );

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map centered on Tricity
    map.current = L.map(mapContainer.current).setView([54.372158, 18.638306], 11);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map.current);

    // Add markers for Tricity cities
    const cities = [
      { name: 'Gdańsk', coords: [54.372158, 18.638306] },
      { name: 'Sopot', coords: [54.441581, 18.560096] },
      { name: 'Gdynia', coords: [54.518889, 18.531883] }
    ];

    cities.forEach(city => {
      if (!map.current) return;
      L.marker(city.coords as L.LatLngExpression)
        .bindPopup(city.name)
        .addTo(map.current);
    });

    // Add markers for air quality monitoring points
    const getMarkerColor = (quality: number) => {
      if (quality < 50) return 'bg-green-500';
      if (quality < 100) return 'bg-yellow-500';
      return 'bg-red-500';
    };

    selectedProject?.stats.forEach((stat) => {
      if (!map.current) return;
      
      // Generate random positions around Tricity area
      const lat = 54.372158 + (Math.random() - 0.5) * 0.2;
      const lng = 18.638306 + (Math.random() - 0.5) * 0.2;

      // Calculate air quality index (example calculation)
      const airQualityIndex = Math.random() * 100;

      const markerIcon = L.divIcon({
        className: 'bg-transparent',
        html: `<div class="w-4 h-4 rounded-full ${getMarkerColor(airQualityIndex)}" />`,
      });

      L.marker([lat, lng], { icon: markerIcon })
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-bold">Stacja pomiarowa</h3>
            <p>PM2.5: ${(Math.random() * 25).toFixed(1)} µg/m³</p>
            <p>PM10: ${(Math.random() * 40).toFixed(1)} µg/m³</p>
            <p>AQI: ${airQualityIndex.toFixed(0)}</p>
          </div>
        `)
        .addTo(map.current);
    });

    return () => {
      map.current?.remove();
    };
  }, [selectedCompanyId]);

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Panel czujników w Trójmieście</h2>
        <p className="text-muted-foreground">Wizualizacja rozmieszczenia punktów pomiaru jakości powietrza</p>
      </div>
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
        <div ref={mapContainer} className="absolute inset-0" />
        <div className="absolute bottom-4 left-4 bg-background/80 p-4 rounded-lg shadow-lg">
          <h3 className="font-semibold mb-2">Legenda</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500" />
              <span>Dobra jakość powietrza (AQI {'≤'} 50)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500" />
              <span>Umiarkowana jakość powietrza (AQI 51-100)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500" />
              <span>Zła jakość powietrza (AQI {'>'} 100)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirQualityMap;

