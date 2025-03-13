import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { 
  Settings,
  Bell,
  Mic,
  BarChart,
  Plus,
} from "lucide-react";

interface AdditionalFeature {
  icon: React.ElementType;
  name: string;
  description: string;
}

export const AdditionalFunctionalities = () => {
  const features: AdditionalFeature[] = [
    {
      icon: Settings,
      name: "Scenariusze",
      description: "Tworzenie złożonych scenariuszy automatyzacji",
    },
    {
      icon: Bell,
      name: "Powiadomienia",
      description: "Powiadomienia o zdarzeniach w domu",
    },
    {
      icon: Mic,
      name: "Głosowe sterowanie",
      description: "Sterowanie funkcjami za pomocą komend głosowych",
    },
    {
      icon: BarChart,
      name: "Analityka danych",
      description: "Analiza danych użytkowania systemu",
    },
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
        <Plus className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold">Funkcjonalności dodatkowe</h2>
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