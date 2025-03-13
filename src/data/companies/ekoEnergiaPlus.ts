
import { Company } from "@/types/company";
import { Activity, DollarSign, Flame, Power, Zap } from "lucide-react";

export const ekoEnergiaPlus: Company = {
  id: "3",
  name: "EkoEnergia Plus",
  description: "Energia przyjazna środowisku",
  logo: "/logo-ekoenergiaplus.png",
  stats: [
    {
      title: "Ladunek",
      value: "18,923",
      unit: "MW",
      icon: Power,
      description: "↗️ +4.5% od ostatniego dnia",
      details: [
        { label: "Szczyt dzienny", value: "19,234 MW" },
        { label: "Minimum", value: "17,567 MW" },
        { label: "Średnia", value: "18,456 MW" },
      ],
    },
    {
      title: "Obciążenie netto",
      value: "17,456",
      unit: "MW",
      icon: Zap,
      description: "↘️ -1.0% od ostatniej godziny",
      details: [
        { label: "Szczyt", value: "18,000 MW" },
        { label: "Minimum dzienne", value: "16,500 MW" },
        { label: "Prognoza", value: "17,000 MW" },
      ],
    },
    {
      title: "Cena",
      value: "29.00",
      unit: "/MWh",
      icon: DollarSign,
      description: "↗️ +1.0% od ostatniego odczytu",
      details: [
        { label: "Maksymalna", value: "31.00 /MWh" },
        { label: "Minimalna", value: "28.00 /MWh" },
        { label: "Średnia dzienna", value: "29.50 /MWh" },
      ],
    },
    {
      title: "Główne źródło",
      value: "Energia wiatrowa",
      icon: Flame,
      description: "80% udziału w miksie",
      details: [
        { label: "Wydajność", value: "95%" },
        { label: "Emisja CO2", value: "150 g/kWh" },
        { label: "Moc nominalna", value: "18,000 MW" },
      ],
    }
  ],
  energyData: [
    { name: "00:00", consumption: 550, production: 500, efficiency: 91 },
    { name: "04:00", consumption: 480, production: 450, efficiency: 94 },
    { name: "08:00", consumption: 750, production: 700, efficiency: 93 },
    { name: "12:00", consumption: 950, production: 900, efficiency: 95 },
    { name: "16:00", consumption: 850, production: 800, efficiency: 94 },
    { name: "20:00", consumption: 650, production: 600, efficiency: 92 },
    { name: "23:59", consumption: 550, production: 500, efficiency: 91 },
  ],
};
