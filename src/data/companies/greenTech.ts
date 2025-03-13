
import { Company } from "@/types/company";
import { Activity, Battery, Cpu, DollarSign, Flame, Gauge, Power, Zap } from "lucide-react";

export const greenTech: Company = {
  id: "5",
  name: "Green Tech",
  description: "Zielone technologie dla lepszego jutra",
  logo: "/logo-greentech.png",
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
      description: "↘️ -0.9% od ostatniej godziny",
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
      description: "↗️ +2.0% od ostatniego odczytu",
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
      icon: Gauge,
      description: "↘️ -1.5% od ostatniej godziny",
      details: [
        { label: "Norma WHO", value: "40 µg/m³" },
        { label: "Norma EU", value: "40 µg/m³" },
        { label: "Średnia roczna", value: "18.5 µg/m³" },
      ],
    },
    {
      title: "SO₂",
      value: "15.8",
      unit: "µg/m³",
      icon: Power,
      description: "Stabilny poziom",
      details: [
        { label: "Norma WHO", value: "20 µg/m³" },
        { label: "Norma EU", value: "125 µg/m³" },
        { label: "Średnia 24h", value: "15.8 µg/m³" },
      ],
    },
    {
      title: "CO",
      value: "1950",
      unit: "µg/m³",
      icon: DollarSign,
      description: "Dobry poziom",
      details: [
        { label: "Norma EU", value: "10000 µg/m³" },
        { label: "Średnia 8h", value: "1950 µg/m³" },
        { label: "Trend", value: "Stabilny" },
      ],
    },
    {
      title: "Indeks CAQI",
      value: "31.5",
      unit: "",
      icon: Flame,
      description: "Dobra jakość powietrza",
      details: [
        { label: "Interpretacja", value: "Dobra" },
        { label: "Zalecenia", value: "Można przebywać na zewnątrz" },
        { label: "Trend", value: "Stabilny" },
      ],
    },
    {
      title: "Wilgotność",
      value: "60.2",
      unit: "%",
      icon: Zap,
      description: "Optymalna wilgotność",
      details: [
        { label: "Min 24h", value: "50%" },
        { label: "Max 24h", value: "70%" },
        { label: "Średnia", value: "60.2%" },
      ],
    },
  ],
  energyData: [
    { name: "Solar Panels", consumption: 1500, production: 3000, efficiency: 92 },
    { name: "Wind Turbine", consumption: 800, production: 1800, efficiency: 88 },
  ]
};
