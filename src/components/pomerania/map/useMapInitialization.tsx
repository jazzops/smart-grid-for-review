import { useEffect, useRef, useState } from "react";
import L from 'leaflet';

interface AQICNData {
  id: string;
  stationName: string;
  region: 'Gdańsk' | 'Gdynia' | 'Sopot';
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

export const useMapInitialization = () => {
  const mapRef = useRef<L.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<AQICNData[]>([]);

  useEffect(() => {
    const fetchAQICNData = async () => {
      const AQICN_TOKEN = '5a1271b20fbbb9c972814a7b8d31512e061e83e6';
      const stations = [
        { id: '2684', name: 'Gdańsk-Wrzeszcz', region: 'Gdańsk' },
        { id: '2683', name: 'Gdańsk-Śródmieście', region: 'Gdańsk' },
        { id: '2685', name: 'Gdańsk-Stogi', region: 'Gdańsk' },
        { id: '2682', name: 'Gdańsk-Nowy Port', region: 'Gdańsk' },
        { id: '2687', name: 'Gdynia-Pogórze', region: 'Gdynia' },
        { id: '2686', name: 'Gdynia-Śródmieście', region: 'Gdynia' },
        { id: '2688', name: 'Sopot', region: 'Sopot' }
      ];

      try {
        const promises = stations.map(station =>
          fetch(`https://api.waqi.info/feed/@${station.id}/?token=${AQICN_TOKEN}`)
            .then(res => res.json())
            .then(data => {
              if (data.status === 'ok') {
                return {
                  id: `aqicn-${station.id}`,
                  stationName: station.name,
                  region: station.region,
                  coordinates: data.data.city.geo,
                  measurements: {
                    aqi: data.data.aqi,
                    pm25: data.data.iaqi.pm25?.v || 0,
                    pm10: data.data.iaqi.pm10?.v || 0,
                    temperature: data.data.iaqi.t?.v,
                    humidity: data.data.iaqi.h?.v,
                    timestamp: data.data.time.iso
                  }
                };
              }
              return null;
            })
        );

        const results = await Promise.all(promises);
        const validResults = results.filter((result): result is AQICNData => result !== null);
        setStats(validResults);
        setIsLoading(false);
      } catch (err) {
        setError('Błąd podczas pobierania danych z czujników');
        setIsLoading(false);
      }
    };

    fetchAQICNData();
    const interval = setInterval(fetchAQICNData, 5 * 60 * 1000); // odświeżanie co 5 minut

    return () => clearInterval(interval);
  }, []);

  return { mapRef, isLoading, error, stats };
};
