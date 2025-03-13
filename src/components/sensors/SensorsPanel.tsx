import { useState } from "react";
import { SensorCard } from "./SensorCard";
import { CityTabs } from "./CityTabs";
import { sensorsData, SensorData } from "./SensorsData";
import { Input } from "@/components/ui/input";
import { AlertsConfig } from "./AlertsConfig";
import { DataComparison } from "./DataComparison";
import { Search, Battery, Signal, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AirQualityChart } from "../dashboard/AirQualityChart";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const SensorsPanel = () => {
  const [selectedCity, setSelectedCity] = useState<string>("gdansk");
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  
  const cities = Object.keys(sensorsData).map(key => 
    key.charAt(0).toUpperCase() + key.slice(1)
  );

  const handleExport = async (format: 'pdf' | 'jpg' | 'xlsx' | 'csv') => {
    const element = document.getElementById('sensors-panel');
    if (!element) return;

    try {
      if (format === 'pdf' || format === 'jpg') {
        const canvas = await html2canvas(element);
        if (format === 'pdf') {
          const pdf = new jsPDF('p', 'mm', 'a4');
          const imgData = canvas.toDataURL('image/png');
          pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
          pdf.save('sensors-data.pdf');
        } else {
          const link = document.createElement('a');
          link.download = 'sensors-data.jpg';
          link.href = canvas.toDataURL('image/jpeg');
          link.click();
        }
      } else {
        const data = Object.entries(sensorsData).map(([city, cityData]) => {
          const sensorReadings = cityData.sensors.reduce((acc, sensor) => ({
            ...acc,
            [`${sensor.name} (${sensor.unit})`]: sensor.value
          }), {});

          return {
            City: cityData.name,
            ...sensorReadings
          };
        });

        if (format === 'xlsx') {
          const ws = XLSX.utils.json_to_sheet(data);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Sensor Data");
          XLSX.writeFile(wb, "sensor-data.xlsx");
        } else {
          const ws = XLSX.utils.json_to_sheet(data);
          const csv = XLSX.utils.sheet_to_csv(ws);
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          const link = document.createElement("a");
          const url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", "sensor-data.csv");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
      
      toast.success(`Eksport do ${format.toUpperCase()} zakończony sukcesem`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error(`Błąd podczas eksportu do ${format.toUpperCase()}`);
    }
  };

  const { data: weatherData } = useQuery({
    queryKey: ['weather', selectedCity],
    queryFn: async () => {
      const city = sensorsData[selectedCity];
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.coordinates.lat}&lon=${city.coordinates.lon}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric&lang=pl`
      );
      if (!response.ok) {
        throw new Error(t("weatherDataError"));
      }
      return response.json();
    },
    refetchInterval: 300000,
  });

  const { data: airQualityData } = useQuery({
    queryKey: ['airQuality', selectedCity],
    queryFn: async () => {
      const city = sensorsData[selectedCity];
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${city.coordinates.lat}&lon=${city.coordinates.lon}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
      );
      if (!response.ok) {
        throw new Error(t("airQualityError"));
      }
      return response.json();
    },
    refetchInterval: 300000,
  });

  const currentCityData = sensorsData[selectedCity];

  const handleCitySelect = (city: string) => {
    setSelectedCity(city.toLowerCase());
  };

  const getSensorData = (sensorName: string) => {
    if (!weatherData || !airQualityData) return null;

    switch (sensorName) {
      case "Temp":
        return {
          value: weatherData.main.temp.toFixed(1),
          description: `Temperatura odczuwalna: ${weatherData.main.feels_like.toFixed(1)}°C`,
        };
      case "Humidity":
        return {
          value: weatherData.main.humidity,
          description: "Wilgotność względna powietrza",
        };
      case "PM 2.5":
        return {
          value: airQualityData.list[0].components.pm2_5.toFixed(1),
          description: "Pył zawieszony PM2.5",
        };
      case "PM10":
        return {
          value: airQualityData.list[0].components.pm10.toFixed(1),
          description: "Pył zawieszony PM10",
        };
      case "NO₂":
        return {
          value: airQualityData.list[0].components.no2.toFixed(1),
          description: "Dwutlenek azotu",
        };
      case "SO₂":
        return {
          value: airQualityData.list[0].components.so2.toFixed(1),
          description: "Dwutlenek siarki",
        };
      case "CO":
        return {
          value: airQualityData.list[0].components.co.toFixed(0),
          description: "Tlenek węgla",
        };
      case "O₃":
        return {
          value: airQualityData.list[0].components.o3.toFixed(1),
          description: "Ozon",
        };
      default:
        return null;
    }
  };

  const filteredSensors = currentCityData.sensors.map(sensor => {
    const realData = getSensorData(sensor.name);
    if (realData) {
      return {
        ...sensor,
        value: realData.value,
        description: realData.description,
      };
    }
    return sensor;
  }).filter(sensor =>
    sensor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sensor.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4" id="sensors-panel">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold">Czujniki i jakość powietrza</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{t('lastSync')}: 1h</span>
            <Battery className="w-4 h-4 ml-4" />
            <span>100% est. battery</span>
            <Signal className="w-4 h-4 ml-4" />
            <span>-71 dBm</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 bg-card p-4 rounded-lg shadow-sm">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t('searchSensors')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={() => handleExport('pdf')}
              variant="outline"
              className="bg-primary/10 hover:bg-primary/20 text-primary"
            >
              {t('exportToPDF')}
            </Button>
            <Button
              onClick={() => handleExport('jpg')}
              variant="outline"
              className="bg-primary/10 hover:bg-primary/20 text-primary"
            >
              {t('exportToJPG')}
            </Button>
            <Button
              onClick={() => handleExport('xlsx')}
              variant="outline"
              className="bg-primary/10 hover:bg-primary/20 text-primary"
            >
              {t('exportToExcel')}
            </Button>
            <Button
              onClick={() => handleExport('csv')}
              variant="outline"
              className="bg-primary/10 hover:bg-primary/20 text-primary"
            >
              {t('exportToCSV')}
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <CityTabs
            cities={cities}
            selectedCity={selectedCity}
            onCitySelect={handleCitySelect}
          />
        </div>

        {currentCityData && (
          <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredSensors.map((sensor, index) => (
                <SensorCard 
                  key={index}
                  iconType={sensor.iconType}
                  name={sensor.name}
                  value={sensor.value}
                  unit={sensor.unit}
                  status={sensor.status}
                  description={sensor.description}
                />
              ))}
            </div>

            <div className="mt-8 space-y-8">
              <AlertsConfig />
              <DataComparison />
              <AirQualityChart />
              
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Dane dla miasta {currentCityData.name}</h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-muted-foreground">
                    Poniżej znajdują się szczegółowe informacje o jakości powietrza i warunkach środowiskowych w mieście {currentCityData.name}. 
                    Wszystkie pomiary są aktualizowane w czasie rzeczywistym, zapewniając dokładny obraz stanu środowiska.
                  </p>
                  <div className="mt-4 grid gap-2">
                    {currentCityData.sensors.map((sensor, index) => (
                      <div key={index} className="p-4 rounded-lg bg-background/50 border">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{sensor.name}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-semibold">{sensor.value}</span>
                            <span className="text-sm text-muted-foreground">{sensor.unit}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{sensor.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SensorsPanel;
