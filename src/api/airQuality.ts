import axios from 'axios';

export const fetchAirlyData = async () => {
  const AIRLY_API_KEY = process.env.REACT_APP_AIRLY_API_KEY;
  const TROJMIASTO_COORDINATES = [
    { name: 'Gdańsk', lat: 54.3520, lng: 18.6466 },
    { name: 'Gdynia', lat: 54.5187, lng: 18.5309 },
    { name: 'Sopot', lat: 54.4405, lng: 18.5674 },
  ];

  try {
    const promises = TROJMIASTO_COORDINATES.map(city =>
      axios.get('https://airapi.airly.eu/v2/measurements/nearest', {
        headers: {
          apikey: AIRLY_API_KEY,
          'Accept-Language': 'en',
        },
        params: {
          lat: city.lat,
          lng: city.lng,
          maxDistanceKM: 5,
        },
      })
        .then(response => {
          const data = response.data;
          return {
            id: `airly-${data.id}-${city.name}`,
            lat: data.location.latitude,
            lng: data.location.longitude,
            source: 'Airly',
            stationName: city.name,
            region: city.name,
            pm25: data.current.values.find(v => v.name === 'PM25')?.value || 0,
            pm10: data.current.values.find(v => v.name === 'PM10')?.value || 0,
            timestamp: data.current.fromDateTime,
            additionalData: {
              aqi: data.current.indexes.find(i => i.name === 'AIRLY_CAQI')?.value || null,
              temperature: data.current.values.find(v => v.name === 'TEMPERATURE')?.value,
              humidity: data.current.values.find(v => v.name === 'HUMIDITY')?.value,
            },
          };
        })
    );

    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Błąd podczas pobierania danych z Airly:', error);
    return [];
  }
};

export const fetchGIOSData = async () => {
  return [];
};

interface AQICNResponse {
  status: string;
  data: {
    aqi: number;
    idx: number;
    city: {
      geo: [number, number];
      name: string;
    };
    iaqi: {
      pm25: { v: number };
      pm10: { v: number };
      co?: { v: number };
      no2?: { v: number };
      so2?: { v: number };
      o3?: { v: number };
      t?: { v: number };
      h?: { v: number };
    };
    time: {
      iso: string;
    };
  };
}

interface StationInfo {
  id: string;
  name: string;
  region: 'Gdańsk' | 'Gdynia' | 'Sopot';
}

const TROJMIASTO_STATIONS: StationInfo[] = [
  { id: '2677', name: 'Gdańsk-Śródmieście', region: 'Gdańsk' },
  { id: '2684', name: 'Gdańsk-Wrzeszcz', region: 'Gdańsk' },
  { id: '2685', name: 'Gdańsk-Stogi', region: 'Gdańsk' },
  { id: '2682', name: 'Gdańsk-Nowy Port', region: 'Gdańsk' },
  { id: '2687', name: 'Gdynia-Pogórze', region: 'Gdynia' },
  { id: '2686', name: 'Gdynia-Śródmieście', region: 'Gdynia' },
  { id: '2688', name: 'Sopot', region: 'Sopot' }
];

export const fetchAQICNData = async () => {
  const AQICN_TOKEN = '5a1271b20fbbb9c972814a7b8d31512e061e83e6';
  
  try {
    const promises = TROJMIASTO_STATIONS.map(station => 
      fetch(`https://api.waqi.info/feed/@${station.id}/?token=${AQICN_TOKEN}`)
        .then(response => response.json())
        .then((data: AQICNResponse) => {
          if (data.status === 'ok') {
            return {
              id: `aqicn-${data.data.idx}-${station.name}`,
              lat: data.data.city.geo[0],
              lng: data.data.city.geo[1],
              source: 'AQICN',
              stationName: station.name,
              region: station.region,
              pm25: data.data.iaqi.pm25?.v || 0,
              pm10: data.data.iaqi.pm10?.v || 0,
              timestamp: data.data.time.iso,
              additionalData: {
                aqi: data.data.aqi !== undefined ? data.data.aqi : null,
                temperature: data.data.iaqi.t?.v,
                humidity: data.data.iaqi.h?.v,
                co: data.data.iaqi.co?.v,
                no2: data.data.iaqi.no2?.v,
                so2: data.data.iaqi.so2?.v,
                o3: data.data.iaqi.o3?.v,
              }
            };
          }
          return null;
        })
    );

    const results = await Promise.all(promises);
    return results.filter(result => result !== null);
  } catch (error) {
    console.error('Błąd podczas pobierania danych z AQICN:', error);
    return [];
  }
};
