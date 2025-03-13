
export const isInTriCity = (lat: number, lon: number) => {
  const bounds = {
    north: 54.60,  // North of Gdynia
    south: 54.30,  // South of Gdańsk
    east: 18.70,   // East coast
    west: 18.40    // West of Gdynia
  };
  return lat >= bounds.south && lat <= bounds.north && lon >= bounds.west && lon <= bounds.east;
};
