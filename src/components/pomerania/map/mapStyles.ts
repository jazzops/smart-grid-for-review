
// Add global styles for the map
export const initMapStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .leaflet-popup-content-wrapper {
      background: rgba(26, 31, 44, 0.95);
      color: white;
      border-radius: 12px;
      backdrop-filter: blur(8px);
    }

    .leaflet-popup-tip {
      background: rgba(26, 31, 44, 0.95);
    }

    .leaflet-container {
      font-family: 'Montserrat', sans-serif;
    }

    .dark-map-tiles {
      filter: brightness(0.8) saturate(1.2);
    }

    .airly-popup .leaflet-popup-content {
      margin: 0;
      min-width: 300px;
      max-width: 400px;
    }

    .airly-popup .leaflet-popup-content::-webkit-scrollbar {
      width: 8px;
    }

    .airly-popup .leaflet-popup-content::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }

    .airly-popup .leaflet-popup-content::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
    }

    .airly-popup .leaflet-popup-content::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    @media (max-width: 640px) {
      .airly-popup .leaflet-popup-content {
        min-width: 240px;
        max-width: 300px;
      }
    }
  `;
  document.head.appendChild(style);
};
