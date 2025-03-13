
import L from 'leaflet';
import { AirQualityData } from '@/types/company';
import { createMarkerPopup } from '../popup/AirQualityPopup';

export const createAirQualityMarker = (data: AirQualityData, map: L.Map) => {
  const { source, current } = data;
  // Check if map is defined and valid
  if (!map || !map.getContainer()) {
    console.error('Map is undefined or invalid');
    return null;
  }
  
  const marker = L.marker([source.location.latitude, source.location.longitude]);

  // Get the air quality index from measurements
  const index = current.indexes?.[0];
  const color = index?.color || '#999999';
  const value = index?.value || 0;

  // Create a custom marker icon with air quality information
  marker.setIcon(L.divIcon({
    className: 'custom-div-icon',
    html: `<div 
      style="
        width: 32px;
        height: 32px;
        background-color: ${color};
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-family: 'Montserrat', sans-serif;
        font-size: 12px;
        font-weight: bold;
      "
      role="img"
      aria-label="Air quality index: ${value}"
    >${Math.round(value)}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  }));

  // Create and bind popup with air quality information
  const popupContent = createMarkerPopup(data);
  marker.bindPopup(popupContent, {
    maxWidth: 400,
    className: 'airly-popup'
  });

  // Add the marker to the map if the map is valid
  try {
    marker.addTo(map);
    return marker;
  } catch (error) {
    console.error('Error adding marker to map:', error);
    return null;
  }
};
