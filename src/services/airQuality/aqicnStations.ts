
/**
 * List of AQICN monitoring stations in the Tricity area (Gdańsk, Sopot, Gdynia)
 */
export const AQICN_STATIONS = [
  {id: '2684', name: 'Gdańsk Wrzeszcz'},
  {id: '@251428', name: 'Gdańsk Śródmieście'},
  {id: '@77089', name: 'Gdańsk Nowy Port'},
  {id: '@237496', name: 'Gdańsk Stogi'},
  {id: '@63286', name: 'Sopot'},
  {id: '@103345', name: 'Gdańsk Szadółki'},
  {id: '@232498', name: 'Gdynia Pogórze'},
  {id: '@62983', name: 'Gdynia'},
  {id: '@203761', name: 'Gdynia Dąbrowa'},
  {id: '@77029', name: 'Gdynia Śródmieście'},
  {id: '@93433', name: 'Gdańsk Jasień'},
  {id: '@192865', name: 'Gdańsk Oliwa'},
  {id: '@197041', name: 'Gdańsk Przymorze'},
  {id: '@101890', name: 'Gdańsk Zaspa'},
  {id: '@370810', name: 'Gdańsk Brzeźno'},
  {id: '@104527', name: 'Gdańsk Suchanino'},
  {id: '@251821', name: 'Gdańsk Chełm'},
  {id: '@467518', name: 'Gdańsk Morena'},
  {id: '@509191', name: 'Gdańsk Osowa'},
  {id: '@64192', name: 'Gdańsk Piecki-Migowo'},
  {id: '@176593', name: 'Gdańsk Ujeścisko'},
  {id: '@84283', name: 'Gdynia Witomino'},
  {id: '@192910', name: 'Gdynia Orłowo'},
  {id: '@375472', name: 'Gdynia Oksywie'},
];

/**
 * Find a station by name (partial match)
 */
export const findStationByName = (name: string): { id: string, name: string } | undefined => {
  const lowerName = name.toLowerCase();
  return AQICN_STATIONS.find(station => 
    station.name.toLowerCase().includes(lowerName)
  );
};

/**
 * Get a subset of stations (to avoid API rate limiting)
 */
export const getSubsetOfStations = (count: number = 5): { id: string, name: string }[] => {
  return AQICN_STATIONS.slice(0, count);
};

