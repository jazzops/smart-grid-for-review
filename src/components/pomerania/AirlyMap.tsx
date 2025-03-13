import { useEffect, useState, lazy, Suspense } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { log } from 'console';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { MapHeader } from './map/MapHeader';
import { AirQualityLegend } from '../components/AirQualityLegend';

interface AirQualityData {
  id: string;
  stationName: string;
  region: string;
  coordinates: [number, number];
  measurements: {
    aqi: number;
    pm25: number;
    pm10: number;
    temperature?: number;
    humidity?: number;
    timestamp: string;
  };
}

const getAQIColor = (aqi: number): string => {
  if (aqi <= 50) return '#00E400';
  if (aqi <= 100) return '#FFFF00';
  if (aqi <= 150) return '#FF7E00';
  if (aqi <= 200) return '#FF0000';
  if (aqi <= 300) return '#8F3F97';
  return '#7E0023';
};

const AirQualityMapBase = () => {
  const [data, setData] = useState<AirQualityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const stationIds = [
          '@2684',  // Gdańsk-Wrzeszcz
          '@2679',  // Gdańsk-Nowy Port
          '@2681',  // Gdańsk-Szadółki
          'A465595',
          'A361813',
          'A232498',
          'A63073',
          'A96541',
          'A251428',
          'A197050',
          'A192988',
          'A232498', // Duplicated, but including for completeness
          'A63073',  // Duplicated
          'A251428', // Duplicated
          'A77089',
          'A237496',
          '@2685',
          'A96541',  // Duplicated
          'A479593',
          'A72403',
          'A103345',
          'A62983',
          'A203761',
          'A93433',
          'A252829',
          '@2677',
          '@2678',
          'A176593',
          'A64192',
          'A197041',
          'A192865',
          'A370810',
          'A101890',
          'A467518',
          'A509191',
          'A251821',
          'A251821', // Duplicated
          'A104527'
        ];

        const token = '5a1271b20fbbb9c972814a7b8d31512e061e83e6';
        const baseUrl = 'https://api.waqi.info/feed/';

        const responses = await Promise.all(
          stationIds.map(id => fetch(`${baseUrl}${id}/?token=${token}`))
        );
        
        const results = await Promise.all(
          responses.map(response => {
            if (!response.ok) {
              console.error(`Failed to fetch data for ${response.url}`);
              return null; // Return null for failed requests
            }
            return response.json()
          })
        );

        const stations: AirQualityData[] = [];

        results.forEach((result, index) => {
          // Use nullish coalescing operator to handle possible null values
          if (result?.status === 'ok') {
            const data = result.data;
              stations.push({
                id: `aqicn-${data.idx}`,
                stationName: data.city.name,
                region: 'Gdańsk',  //  region information.
                coordinates: data.city.geo,
                measurements: {
                  aqi: data.aqi,
                  pm25: data.iaqi.pm25?.v || 0,
                  pm10: data.iaqi.pm10?.v || 0,
                  temperature: data.iaqi.t?.v,
                  humidity: data.iaqi.h?.v,
                  timestamp: data.time.iso
                }
              });
          } else {
            console.log("result", result, "index", index, "stationIds", stationIds[index]);
            
            setError(`Failed to fetch air quality data for station ${stationIds[index]}`);
          }
        });

        setData(stations);

      } catch (err) {
        console.error('Error fetching air quality data:', err);
        setError('Error loading air quality data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="h-[600px] w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
        Loading data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[600px] w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={[54.372158, 18.638306]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <TileLayer
          url="https://tiles.aqicn.org/tiles/usepa-aqi/{z}/{x}/{y}.png"
          attribution='Air Quality Tiles &copy; <a href="https://waqi.info">WAQI.info</a>'
          opacity={0.6}
        />
        {data.map((station) => (
          <Marker
            key={station.id}
            position={station.coordinates}
            icon={L.divIcon({
              className: 'custom-marker',
              html: `
                <div style="
                  background-color: ${getAQIColor(station.measurements.aqi)};
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-weight: bold;
                  border: 2px solid white;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                ">
                  ${station.measurements.aqi}
                </div>
              `
            })}
          >
            <Popup>
              <div className="font-['Montserrat']">
                <h3 className="font-bold text-lg mb-2">{station.stationName}</h3>
                <p className="mb-1">Region: {station.region}</p>
                <p className="mb-1">AQI: {station.measurements.aqi}</p>
                <p className="mb-1">PM2.5: {station.measurements.pm25} µg/m³</p>
                <p className="mb-1">PM10: {station.measurements.pm10} µg/m³</p>
                {station.measurements.temperature && (
                  <p className="mb-1">Temperature: {station.measurements.temperature}°C</p>
                )}
                {station.measurements.humidity && (
                  <p className="mb-1">Humidity: {station.measurements.humidity}%</p>
                )}
                <p className="text-sm text-gray-500">
                  Last update: {new Date(station.measurements.timestamp).toLocaleString()}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

// Lazy load the map component
const MapComponent = lazy(() => import('./map/MapComponent'));

export function AirQualityMapWrapper() {
  return (
    <Card className="dark:bg-[#1A1F2C] font-['Montserrat'] shadow-lg">
      <MapHeader title="Mapa jakości powietrza - Trójmiasto" />
      <CardContent>
        <Suspense fallback={
          <div className="h-[600px] w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
            Ładowanie mapy...
          </div>
        }>
          <MapComponent />
        </Suspense>
        <AirQualityLegend />
      </CardContent>
    </Card>
  );
}

// Export the base component as AirlyMap
export const AirlyMap = AirQualityMapBase;

// Export the container as default
export default AirQualityMapWrapper;
