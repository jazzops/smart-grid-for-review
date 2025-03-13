import { CompanyData } from "@/types/company";
import { Activity, Battery, Cpu, Gauge, Power, Zap, DollarSign, Flame } from "lucide-react";

export const companiesData: CompanyData[] = [
  {
    id: "demo",
    name: "Demo Projekt",
    description: "Projekt demonstracyjny monitorowania jakości powietrza",
    logo: "/logo-demo.png",
    energyData: [],
    stats: [
      {
        title: "PM2.5",
        value: "0.6",
        unit: "µg/m³",
        icon: Activity,
        description: "↗️ +2.1% od ostatniego pomiaru",
        details: [
          { label: "Norma WHO", value: "10 µg/m³" },
          { label: "Norma EU", value: "25 µg/m³" },
          { label: "Średnia 24h", value: "0.6 µg/m³" },
        ],
      },
      {
        title: "PM10",
        value: "7.8",
        unit: "µg/m³",
        icon: Battery,
        description: "↘️ -1.2% od ostatniej godziny",
        details: [
          { label: "Norma WHO", value: "20 µg/m³" },
          { label: "Norma EU", value: "50 µg/m³" },
          { label: "Średnia 24h", value: "7.8 µg/m³" },
        ],
      },
      {
        title: "O₃ (Ozon)",
        value: "97.8",
        unit: "µg/m³",
        icon: Cpu,
        description: "↗️ +1.5% od ostatniego odczytu",
        details: [
          { label: "Norma WHO", value: "100 µg/m³" },
          { label: "Norma EU", value: "120 µg/m³" },
          { label: "Średnia 8h", value: "97.8 µg/m³" },
        ],
      },
      {
        title: "NO₂",
        value: "21.1",
        unit: "µg/m³",
        icon: Gauge,
        description: "↘️ -0.8% od ostatniej godziny",
        details: [
          { label: "Norma WHO", value: "40 µg/m³" },
          { label: "Norma EU", value: "40 µg/m³" },
          { label: "Średnia roczna", value: "21.1 µg/m³" },
        ],
      },
      {
        title: "SO₂",
        value: "19.6",
        unit: "µg/m³",
        icon: Power,
        description: "Stabilny poziom",
        details: [
          { label: "Norma WHO", value: "20 µg/m³" },
          { label: "Norma EU", value: "125 µg/m³" },
          { label: "Średnia 24h", value: "19.6 µg/m³" },
        ],
      },
      {
        title: "CO",
        value: "2117",
        unit: "µg/m³",
        icon: Zap,
        description: "Dobry poziom",
        details: [
          { label: "Norma EU", value: "10000 µg/m³" },
          { label: "Średnia 8h", value: "2117 µg/m³" },
          { label: "Trend", value: "Stabilny" },
        ],
      },
      {
        title: "Indeks CAQI",
        value: "27.3",
        unit: "",
        icon: DollarSign,
        description: "Dobra jakość powietrza",
        details: [
          { label: "Interpretacja", value: "Dobra" },
          { label: "Zalecenia", value: "Można przebywać na zewnątrz" },
          { label: "Trend", value: "Stabilny" },
        ],
      },
      {
        title: "Wilgotność",
        value: "54.7",
        unit: "%",
        icon: Flame,
        description: "Optymalna wilgotność",
        details: [
          { label: "Min 24h", value: "45%" },
          { label: "Max 24h", value: "65%" },
          { label: "Średnia", value: "54.7%" },
        ],
      },
    ]
  }
];

export default companiesData;
