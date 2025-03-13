import { Company } from "@/types/company";
import { Activity, Battery, Cpu, DollarSign, Flame } from "lucide-react";

export const futureEnergy: Company = {
  id: "4",
  name: "Future Energy",
  description: "Energia przyszłości już dziś",
  logo: "/logo-future.png",
  stats: [
    {
      title: "PM2.5",
      value: "1.2",
      unit: "µg/m³",
      icon: Activity,
      description: "↗️ +3.5% od ostatniego pomiaru",
      details: [
        { label: "Norma WHO", value: "10 µg/m³" },
        { label: "Norma EU", value: "25 µg/m³" },
        { label: "Średnia 24h", value: "1.2 µg/m³" },
      ],
    },
    {
      title: "PM10",
      value: "9.5",
      unit: "µg/m³",
      icon: Battery,
      description: "↘️ -0.8% od ostatniej godziny",
      details: [
        { label: "Norma WHO", value: "20 µg/m³" },
        { label: "Norma EU", value: "50 µg/m³" },
        { label: "Średnia 24h", value: "9.5 µg/m³" },
      ],
    },
    {
      title: "O₃ (Ozon)",
      value: "105.2",
      unit: "µg/m³",
      icon: Cpu,
      description: "↗️ +2.1% od ostatniego odczytu",
      details: [
        { label: "Norma WHO", value: "100 µg/m³" },
        { label: "Norma EU", value: "120 µg/m³" },
        { label: "Średnia 8h", value: "105.2 µg/m³" },
      ],
    },
    {
      title: "NO₂",
      value: "18.5",
      unit: "µg/m³",
      icon: DollarSign,
      description: "↘️ -1.5% od ostatniej godziny",
      details: [
        { label: "Norma WHO", value: "40 µg/m³" },
        { label: "Norma EU", value: "40 µg/m³" },
        { label: "Średnia roczna", value: "18.5 µg/m³" },
      ],
    },
  ],
  energyData: [
    { name: "Solar Panels", consumption: 0, production: 1500, efficiency: 0.95 },
    { name: "Wind Turbines", consumption: 0, production: 800, efficiency: 0.80 },
  ]
};
