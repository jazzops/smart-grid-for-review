import { Company } from "@/types/company";
import { Activity, Battery, Cpu, DollarSign, Flame } from "lucide-react";

export const smartPowerCorp: Company = {
  id: "1",
  name: "Smart Power Corp",
  description: "Inteligentne zarządzanie energią",
  logo: "/logo-smartpower.png",
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
      value: "10.5",
      unit: "µg/m³",
      icon: Battery,
      description: "↘️ -0.8% od ostatniej godziny",
      details: [
        { label: "Norma WHO", value: "20 µg/m³" },
        { label: "Norma EU", value: "50 µg/m³" },
        { label: "Średnia 24h", value: "10.5 µg/m³" },
      ],
    },
    {
      title: "O₃ (Ozon)",
      value: "105.2",
      unit: "µg/m³",
      icon: Cpu,
      description: "↗️ +2.0% od ostatniego odczytu",
      details: [
        { label: "Norma WHO", value: "100 µg/m³" },
        { label: "Norma EU", value: "120 µg/m³" },
        { label: "Średnia 8h", value: "105.2 µg/m³" },
      ],
    },
    {
      title: "NO₂",
      value: "23.5",
      unit: "µg/m³",
      icon: DollarSign,
      description: "↘️ -1.5% od ostatniej godziny",
      details: [
        { label: "Norma WHO", value: "40 µg/m³" },
        { label: "Norma EU", value: "40 µg/m³" },
        { label: "Średnia roczna", value: "23.5 µg/m³" },
      ],
    },
    {
      title: "SO₂",
      value: "21.0",
      unit: "µg/m³",
      icon: Flame,
      description: "Stabilny poziom",
      details: [
        { label: "Norma WHO", value: "20 µg/m³" },
        { label: "Norma EU", value: "125 µg/m³" },
        { label: "Średnia 24h", value: "21.0 µg/m³" },
      ],
    },
  ],
  energyData: [
    {
      name: "Solar Panels",
      consumption: 1500,
      production: 3000,
      efficiency: 95,
    },
    {
      name: "Wind Turbines",
      consumption: 800,
      production: 1800,
      efficiency: 92,
    },
  ]
};
