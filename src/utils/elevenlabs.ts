export const getElevenLabsConfig = () => {
  const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
  
  if (!apiKey) {
    console.warn('Brak klucza API ElevenLabs - funkcja odtwarzania głosowego nie będzie działać bez klucza');
    return null;
  }

  return {
    apiKey,
    baseUrl: 'https://api.elevenlabs.io/v1'
  };
};

export const initializeElevenLabs = () => {
  const config = getElevenLabsConfig();
  if (!config) return null;

  // Tutaj możesz zainicjalizować klienta ElevenLabs
  return {
    // Implementacja metod ElevenLabs
  };
}; 