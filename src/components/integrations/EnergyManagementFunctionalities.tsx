import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { 
  Zap,
  LineChart,
  Lightbulb,
  Sun,
  Car,
} from "lucide-react";

interface EnergyFeature {
  icon: React.ElementType;
  name: string;
  description: string;
}

export const EnergyManagementFunctionalities = () => {
  const features: EnergyFeature[] = [
    {
      icon: LineChart,
      name: "Monitorowanie stanu klimatyzatorów i urządzen badających jakość powietrza",
      description: "Szczegółowe informacje o stanie urządzeń i jakości powietrza",
    },
    // {
    //   icon: Lightbulb,
    //   name: "Optymalizacja zużycia energii",
    //   description: "Sugestie zmniejszenia zużycia energii",
    // },
    // {
    //   icon: Sun,
    //   name: "Integracja z panelami fotowoltaicznymi",
    //   description: "Informacje o produkcji i zużyciu energii",
    // },
    // {
    //   icon: Car,
    //   name: "Zarządzanie ładowaniem pojazdów",
    //   description: "Automatyczne ładowanie w optymalnych godzinach",
    // },
  ];

  const handleFeatureClick = () => {
    toast({
      title: "Informacja",
      description: "Funkcja w przygotowaniu",
    });
  };

  return (
    <div className="mt-8 mb-12">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold">Funkcjonalności związane z zarządzaniem energią</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card 
              className="p-6 cursor-pointer hover:shadow-lg transition-all"
              onClick={handleFeatureClick}
            >
              <div className="flex items-center gap-3">
                <feature.icon className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">{feature.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
