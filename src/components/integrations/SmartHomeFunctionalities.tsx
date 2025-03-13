import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { 
  Home,
  Lightbulb,
  Thermometer,
  Blinds,
  AirVent,
  WashingMachine,
} from "lucide-react";

interface SmartHomeFeature {
  icon: React.ElementType;
  name: string;
  description: string;
}

export const SmartHomeFunctionalities = () => {
  const features: SmartHomeFeature[] = [
    {
      icon: Lightbulb,
      name: "Zarządzanie oświetleniem",
      description: "Scenariusze oświetleniowe, automatyczne sterowanie światłami",
    },
    {
      icon: Thermometer,
      name: "Kontrola temperatury",
      description: "Regulacja temperatury w pomieszczeniach, harmonogramy",
    },
    {
      icon: Blinds,
      name: "Zarządzanie roletami",
      description: "Automatyczne sterowanie roletami",
    },
    {
      icon: AirVent,
      name: "Monitoring jakości powietrza",
      description: "Pomiar i wyświetlanie jakości powietrza",
    },
    {
      icon: WashingMachine,
      name: "Kontrola urządzeń AGD, IoT i RTV",
      description: "Zdalne sterowanie sprzętem AGD i RTV oraz IoT",
    },
  ];

  const handleFeatureClick = () => {
    toast({
      title: "Informacja",
      description: "Funkcja w przygotowaniu",
    });
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Home className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold">Funkcjonalności związane z domem inteligentnym</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
