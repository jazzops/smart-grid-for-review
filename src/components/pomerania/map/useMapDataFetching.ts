import { useState } from "react";
import L from 'leaflet';
import { fetchInstallations, fetchMeasurements } from "../airlyService";
import { fetchAllAqicnStations } from "@/services/airQuality/aqicnService";
import { Installation } from "../types";
import { CITIES } from "../config/mapConfig";
import { createAirQualityMarker } from "../markers/AirQualityMarker";
import { delay } from "./mapUtils";

interface UseMapDataFetchingProps {
  map: L.Map | null;
  markersRef: React.MutableRefObject<L.Marker[]>;
}

interface UseMapDataFetchingResult {
  isLoading: boolean;
  error: string | null;
  stats: { total: number; loaded: number };
  fetchData: () => Promise<void>;
}

export function useMapDataFetching({ 
  map, 
  markersRef 
}: UseMapDataFetchingProps): UseMapDataFetchingResult {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({ total: 0, loaded: 0 });

  const fetchData = async (): Promise<void> => {
    if (!map) return;
    
    setIsLoading(true);
    setError(null);
    setStats({ total: 0, loaded: 0 });

    try {
      // Try to fetch AQICN stations first
      const aqicnStations = await fetchAllAqicnStations().catch(err => {
        console.error('Error fetching AQICN stations:', err);
        return [];
      });
      
      // Set initial stats
      setStats({ total: aqicnStations.length, loaded: 0 });
      
      // Add AQICN stations to the map
      for (const station of aqicnStations) {
        try {
          const marker = createAirQualityMarker(station, map);
          if (marker) markersRef.current.push(marker);
          setStats(prev => ({ ...prev, loaded: prev.loaded + 1 }));
        } catch (error) {
          console.error(`Error adding AQICN station to map:`, error);
        }
      }
      
      // Now try to fetch Airly installations
      try {
        // Fetch installations for all cities
        const fetchPromises = CITIES.map(city => 
          fetchInstallations(city.lat, city.lon)
            .catch(err => {
              console.warn(`Error fetching installations for ${city.name}:`, err);
              return [];
            })
        );
        
        const fetchedInstallations = await Promise.all(fetchPromises);
        
        // Flatten and deduplicate installations by ID
        const allInstallations = Array.from(
          new Map(
            fetchedInstallations
              .flat()
              .map(install => [install.id, install])
          ).values()
        );
        
        // Update total count
        setStats(prev => ({ 
          total: prev.total + allInstallations.length, 
          loaded: prev.loaded 
        }));
        
        // Process Airly installations in batches to prevent rate limiting
        await fetchAirlyInstallationsInBatches(allInstallations, map, markersRef.current);
        
        // If we have at least some data, consider it a success
        if (markersRef.current.length > 0) {
          setIsLoading(false);
        } else {
          setError('Nie można załadować danych o jakości powietrza. Spróbuj ponownie później.');
          setIsLoading(false);
        }
        
      } catch (error) {
        console.error('Error fetching Airly data:', error);
        // Continue with the app even if Airly data fails
        if (markersRef.current.length > 0) {
          setIsLoading(false);
        } else {
          setError('Wystąpił problem z pobieraniem danych o jakości powietrza.');
          setIsLoading(false);
        }
      }
      
    } catch (error) {
      console.error('Error loading air quality data:', error);
      setError('Wystąpił problem z pobieraniem danych o jakości powietrza.');
      setIsLoading(false);
    }
  };

  // Function to process Airly installations in batches
  const fetchAirlyInstallationsInBatches = async (
    installations: Installation[],
    map: L.Map,
    markers: L.Marker[]
  ): Promise<void> => {
    const batchSize = 3; // Reduced batch size
    
    for (let i = 0; i < installations.length; i += batchSize) {
      const batch = installations.slice(i, i + batchSize);
      
      await Promise.all(batch.map(async (installation: Installation) => {
        try {
          console.log(`Fetching data for installation ${installation.id}...`);
          const measurements = await fetchMeasurements(installation.id)
            .catch(err => {
              console.warn(`Error fetching measurements for installation ${installation.id}:`, err);
              return null;
            });
          
          if (measurements) {
            const data = {
              source: {
                id: `airly-${installation.id}`,
                name: `Airly ${installation.address?.street || ''}`,
                provider: 'Airly',
                location: installation.location
              },
              current: {
                ...measurements.current,
                provider: 'Airly',
                timestamp: measurements.current.fromDateTime
              }
            };

            const marker = createAirQualityMarker(data, map);
            if (marker) markers.push(marker);
          }
          
          setStats(prev => ({ ...prev, loaded: prev.loaded + 1 }));
        } catch (error) {
          console.error(`Error processing installation ${installation.id}:`, error);
          setStats(prev => ({ ...prev, loaded: prev.loaded + 1 }));
        }
      }));

      if (i + batchSize < installations.length) {
        await delay(1000); // Increased delay to 1 second
      }
    }
  };

  return { isLoading, error, stats, fetchData };
}
