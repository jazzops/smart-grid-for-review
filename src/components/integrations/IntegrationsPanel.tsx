import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { 
  Home, 
  Zap, 
  Globe, 
  Cloud, 
  Bell, 
  Droplet,
  AlertCircle, 
  CheckCircle, 
  Loader2,
  MicIcon,
  SmartphoneIcon 
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { IntegrationType, IntegrationConfig } from "@/types/integrations";
import { SmartHomeFunctionalities } from "./SmartHomeFunctionalities";
import { EnergyManagementFunctionalities } from "./EnergyManagementFunctionalities";
import { AdditionalFunctionalities } from "./AdditionalFunctionalities";

export const IntegrationsPanel = () => {
  const [selectedIntegration, setSelectedIntegration] = useState<IntegrationType | null>(null);
  const [config, setConfig] = useState<IntegrationConfig>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const integrations = [
    {
      type: "smartHome" as const,
      icon: Home,
      name: "Smart Home",
      description: "System zarządzania inteligentnym domem",
      status: "connected",
    },
    // {
    //   type: "energyManagement" as const,
    //   icon: Zap,
    //   name: "Zarządzanie energią",
    //   description: "Optymalizacja zużycia energii",
    //   status: "warning",
    // },
    {
      type: "zapier" as const,
      icon: Globe,
      name: "Zapier",
      description: "Automatyzacja z innymi platformami",
      status: "disconnected",
    },
    {
      type: "googleHome" as const,
      icon: MicIcon,
      name: "Google Home",
      description: "Sterowanie głosowe przez Google",
      status: "disconnected",
    },
    {
      type: "alexa" as const,
      icon: SmartphoneIcon,
      name: "Amazon Alexa",
      description: "Integracja z Alexa",
      status: "disconnected",
    },
    {
      type: "cloudServices" as const,
      icon: Cloud,
      name: "Usługi chmurowe",
      description: "Integracja z AWS/Google Cloud/Azure",
      status: "disconnected",
    },
    {
      type: "alarmSystems" as const,
      icon: Bell,
      name: "Systemy alarmowe",
      description: "Powiadomienia o zdarzeniach alarmowych",
      status: "disconnected",
    },
    // {
    //   type: "irrigation" as const,
    //   icon: Droplet,
    //   name: "System nawadniania",
    //   description: "Automatyczne podlewanie",
    //   status: "disconnected",
    // }
  ];

  const handleConfigSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Symulacja wywołania API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Połączono pomyślnie",
        description: `Konfiguracja ${selectedIntegration} została zaktualizowana`,
      });
    } catch (error) {
      toast({
        title: "Błąd",
        description: String(error),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getConfigFields = (type: IntegrationType) => {
    switch (type) {
      case "smartHome":
      case "zapier":
        return (
          <Input
            placeholder="URL webhooka"
            value={config.webhook || ""}
            onChange={(e) => setConfig({ ...config, webhook: e.target.value })}
          />
        );
      case "googleHome":
      case "alexa":
      case "homeKit":
        return (
          <Input
            placeholder="ID urządzenia"
            value={config.deviceId || ""}
            onChange={(e) => setConfig({ ...config, deviceId: e.target.value })}
          />
        );
      case "cloudServices":
        return (
          <>
            <Input
              placeholder="Klucz API"
              value={config.apiKey || ""}
              onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
              className="mb-2"
            />
            <Input
              placeholder="Endpoint"
              value={config.endpoint || ""}
              onChange={(e) => setConfig({ ...config, endpoint: e.target.value })}
            />
          </>
        );
      default:
        return (
          <Input
            placeholder="URL webhooka"
            value={config.webhook || ""}
            onChange={(e) => setConfig({ ...config, webhook: e.target.value })}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {integrations.map((integration) => (
          <motion.div
            key={integration.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card 
              className="p-6 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setSelectedIntegration(integration.type)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <integration.icon className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-semibold">{integration.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {integration.description}
                    </p>
                  </div>
                </div>
                {integration.status === "connected" && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {integration.status === "warning" && (
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                )}
                {integration.status === "disconnected" && (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedIntegration && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Konfiguracja: {integrations.find(i => i.type === selectedIntegration)?.name}
          </h3>
          <form onSubmit={handleConfigSubmit} className="space-y-4">
            <div className="space-y-4">
              {getConfigFields(selectedIntegration)}
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Zapisz
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setSelectedIntegration(null)}
              >
                Anuluj
              </Button>
            </div>
          </form>
        </Card>
      )}

      <SmartHomeFunctionalities />
      <EnergyManagementFunctionalities />
      <AdditionalFunctionalities />
    </div>
  );
};
