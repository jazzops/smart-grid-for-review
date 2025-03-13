import React, { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchAirQualityData } from '../api/airQuality';
import { AirQualityData } from '../types/airQuality';
import { getAQIColor } from '../utils/airQuality';

const Map = React.lazy(() => import('./Map'));
const MapWithTile = React.lazy(() => import('./MapWithTile'));


export function MapComponent() {
  const [stations, setStations] = useState<AirQualityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAirQualityData();
        setStations(data);
      } catch (err) {
        setError('Błąd podczas pobierania danych');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <div>Ładowanie danych...</div>;
  }

  if (error) {
    return <div>Błąd: {error}</div>;
  }

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden">
      <Suspense fallback={<div>Ładowanie mapy...</div>}>
        <MapWithTile />
      </Suspense>
    </div>
  );
}

export default MapComponent; 