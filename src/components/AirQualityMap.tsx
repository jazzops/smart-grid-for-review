import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { fetchAirlyData, fetchGIOSData, fetchAQICNData } from '../api/airQuality';
import L from 'leaflet';
import { SensorData } from './pomerania/types/sensors';
import 'leaflet/dist/leaflet.css';

// Dodaj style dla mapy
const mapStyle = {
  height: '600px',
  width: '100%'
};

const getAQIColor = (aqi: number) => {
  if (aqi <= 50) return '#00E400';
  if (aqi <= 100) return '#FFFF00';
  if (aqi <= 150) return '#FF7E00';
  if (aqi <= 200) return '#FF0000';
  if (aqi <= 300) return '#8F3F97';
  return '#7E0023';
};

export const AirQualityMap = () => {
  const [sensors, setSensors] = useState<SensorData[]>([]);
  const [showGdansk, setShowGdansk] = useState(true);
  const [showGdynia, setShowGdynia] = useState(true);
  const [showSopot, setShowSopot] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [airlyData, giosData, aqicnData] = await Promise.all([
          fetchAirlyData(),
          fetchGIOSData(),
          fetchAQICNData()
        ]);
        
        setSensors([...airlyData, ...giosData, ...aqicnData]);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    };

    fetchData();
    // Odświeżanie co 5 minut
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="map-filters">
        <label>
          <input
            type="checkbox"
            checked={showGdansk}
            onChange={(e) => setShowGdansk(e.target.checked)}
          /> Gdańsk
        </label>
        <label>
          <input
            type="checkbox"
            checked={showGdynia}
            onChange={(e) => setShowGdynia(e.target.checked)}
          /> Gdynia
        </label>
        <label>
          <input
            type="checkbox"
            checked={showSopot}
            onChange={(e) => setShowSopot(e.target.checked)}
          /> Sopot
        </label>
      </div>
      <div style={mapStyle}>
        <MapContainer 
          center={[54.372158, 18.638306]} 
          zoom={11} 
          style={{ height: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {sensors
            .filter(sensor => 
              (showGdansk && sensor.region === 'Gdańsk') ||
              (showGdynia && sensor.region === 'Gdynia') ||
              (showSopot && sensor.region === 'Sopot')
            )
            .map((sensor) => (
              <Marker 
                key={sensor.id} 
                position={[sensor.lat, sensor.lng]}
                icon={L.divIcon({
                  className: 'custom-marker',
                  html: `<div style="background-color: ${getAQIColor(sensor.additionalData?.aqi || 0)};
                                                     width: 30px;
                                                     height: 30px;
                                                     border-radius: 50%;
                                                     display: flex;
                                                     align-items: center;
                                                     justify-content: center;
                                                     color: white;
                                                     font-weight: bold;">
                                            ${sensor.additionalData?.aqi != null ? sensor.additionalData.aqi : '?'}
                                          </div>`
                })}
              >
                <Popup>
                  <div>
                    <h3>{sensor.stationName}</h3>
                    <p>Region: {sensor.region}</p>
                    <p>AQI: {sensor.additionalData?.aqi}</p>
                    <p>PM2.5: {sensor.pm25} µg/m³</p>
                    <p>PM10: {sensor.pm10} µg/m³</p>
                    {sensor.additionalData?.temperature && (
                      <p>Temperatura: {sensor.additionalData.temperature}°C</p>
                    )}
                    {sensor.additionalData?.humidity && (
                      <p>Wilgotność: {sensor.additionalData.humidity}%</p>
                    )}
                    <p>Ostatnia aktualizacja: {new Date(sensor.timestamp).toLocaleString()}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
};
