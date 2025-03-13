import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CityTabsProps {
  cities: string[];
  selectedCity: string;
  onCitySelect: (city: string) => void;
}

export const CityTabs = ({ cities, selectedCity, onCitySelect }: CityTabsProps) => {
  return (
    <ScrollArea className="w-full">
      <Tabs value={selectedCity} onValueChange={onCitySelect} className="w-full">
        <TabsList className="inline-flex min-w-full lg:w-full p-1">
          {cities.map((city) => (
            <TabsTrigger 
              key={city} 
              value={city.toLowerCase()} 
              className="relative flex-1 px-3 py-1.5 text-sm whitespace-nowrap"
            >
              {city}
              {selectedCity === city.toLowerCase() && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  layoutId="activeTab"
                />
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};