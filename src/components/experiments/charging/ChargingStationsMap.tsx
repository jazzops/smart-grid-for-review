import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Zap } from 'lucide-react';
import { createElement } from 'react';

interface ChargingStation {
  ID: number;
  AddressInfo: {
    Title: string;
    AddressLine1: string;
    Town: string;
    StateOrProvince: string;
    Latitude: number;
    Longitude: number;
  };
  Connections: Array<{
    PowerKW: number;
    ConnectionType: {
      Title: string;
    };
  }>;
}

interface Props {
  stations: ChargingStation[];
}

export const ChargingStationsMap = ({ stations }: Props) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map centered on Poland
    map.current = L.map(mapContainer.current).setView([52.0689, 19.4803], 6);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map.current);

    // Add markers for each charging station
    stations.forEach(station => {
      if (!map.current) return;
      
      const markerIcon = L.divIcon({
        className: 'bg-transparent',
        html: `<div class="w-6 h-6 bg-primary/90 rounded-full flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${createElement(Zap).props.children}
          </svg>
        </div>`,
      });

      L.marker(
        [station.AddressInfo.Latitude, station.AddressInfo.Longitude],
        { icon: markerIcon }
      )
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-bold">${station.AddressInfo.Title}</h3>
            <p>${station.AddressInfo.AddressLine1}</p>
            <p>${station.AddressInfo.Town}</p>
            ${station.Connections.map(conn => 
              `<p>${conn.ConnectionType.Title} - ${conn.PowerKW}kW</p>`
            ).join('')}
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