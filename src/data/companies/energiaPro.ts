import { Company } from "@/types/company";
import { Activity, Battery, Cpu, DollarSign, Flame } from "lucide-react";

export const energiaPro: Company = {
  id: "2",
  name: "Energia Pro",
  description: "Profesjonalne rozwiązania energetyczne",
  logo: "/logo-energiapro.png",
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
        { label: "Średnia 24h", value: "1.1 µg/m³" },
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
        { label: "Średnia 24h", value: "9.8 µg/m³" },
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
        { label: "Średnia 8h", value: "102.5 µg/m³" },
      ],
    },
    {
      title: "NO₂",
      value: "18.5",
      unit: "µg/m³",
      icon: Flame,
      description: "Stabilny poziom",
      details: [
        { label: "Norma WHO", value: "40 µg/m³" },
        { label: "Norma EU", value: "40 µg/m³" },
        { label: "Średnia roczna", value: "20.1 µg/m³" },
      ],
    },
  ],
  energyData: [
    {
      name: "Solar Panel 1",
      consumption: 1500,
      production: 3000,
      efficiency: 92,
    },
    {
      name: "Wind Turbine 1",
      consumption: 800,
      production: 1200,
      efficiency: 78,
    },
  ]
};
