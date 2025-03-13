
import L from 'leaflet';
import { MAP_CONFIG } from "../config/mapConfig";

/**
 * Creates and initializes a Leaflet map with dark theme
 */
export const initializeLeafletMap = (mapContainer: HTMLDivElement): L.Map => {
  // Initialize the map
  console.log('Initializing map...');
  const map = L.map(mapContainer, {
    center: MAP_CONFIG.center,
    zoom: MAP_CONFIG.zoom,
    minZoom: MAP_CONFIG.minZoom,
    maxZoom: MAP_CONFIG.maxZoom,
    zoomControl: false,
    attributionControl: true
  });

  // Set bounds to restrict the view to Tricity area
  map.setMaxBounds(MAP_CONFIG.bounds);

  // Add a dark theme map layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '©OpenStreetMap, ©CartoDB, ©Airly, ©AQICN',
    subdomains: 'abcd',
    className: 'dark-map-tiles'
  }).addTo(map);

  // Add zoom control to bottom right
  L.control.zoom({
    position: 'bottomright'
  }).addTo(map);

  console.log('Map initialized successfully');
  
  return map;
};

/**
 * Simple delay function for rate limiting
 */
export const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

