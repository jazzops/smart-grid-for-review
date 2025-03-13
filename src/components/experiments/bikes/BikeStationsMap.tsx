import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Bike } from 'lucide-react';
import { createElement } from 'react';

interface Station {
  station_id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  capacity: number;
  num_bikes_available: number;
  num_docks_available: number;
  last_reported: number;
}

interface Props {
  stations: Station[];
}

export const BikeStationsMap = ({ stations }: Props) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map centered on Gdańsk
    map.current = L.map(mapContainer.current).setView([54.372158, 18.638306], 12);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map.current);

    // Add markers for each bike station
    stations.forEach(station => {
      if (!map.current) return;
      
      const markerIcon = L.divIcon({
        className: 'bg-transparent',
        html: `<div class="w-6 h-6 bg-primary/90 rounded-full flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${createElement(Bike).props.children}
          </svg>
        </div>`,
      });

      L.marker(
        [station.lat, station.lon],
        { icon: markerIcon }
      )
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-bold">${station.name}</h3>
            <p>${station.address}</p>
            <p>Dostępne rowery: ${station.num_bikes_available}</p>
            <p>Wolne miejsca: ${station.num_docks_available}</p>
          </div>
        `)
        .addTo(map.current);
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [stations]);

  return (
    <div className="mt-6 rounded-lg overflow-hidden border shadow-sm">
      <div ref={mapContainer} className="h-[400px] w-full" />
    </div>
  );
};