
import { LatLngExpression, LatLngBounds } from 'leaflet';

export const MAP_CONFIG = {
  // Center point between Gdańsk and Gdynia
  center: [54.460, 18.5305] as LatLngExpression,
  zoom: 11, // Adjusted zoom to show both cities
  minZoom: 10,
  maxZoom: 18,
  bounds: new LatLngBounds(
    [54.32, 18.45], // Southwest corner
    [54.56, 18.70]  // Northeast corner
  )
};

export const CITIES = [
  { name: 'Gdańsk', lat: 54.372158, lon: 18.638306 },
  { name: 'Gdynia', lat: 54.5189, lon: 18.5305 }
] as const;

