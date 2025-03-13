
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyAnalysis } from "@/components/analysis/CompanyAnalysis";
import { IoTStatus } from "@/components/status/IoTStatus";
import SensorsPanel from "@/components/sensors/SensorsPanel";
import { PomeranianAirQuality } from "@/components/pomerania/PomeranianAirQuality";
import { IntegrationsPanel } from "@/components/integrations/IntegrationsPanel";
import { SpacesTab } from "@/components/tabs/SpacesTab";
import { useTranslation } from 'react-i18next';

interface MainContentProps {
  isMobileMenuOpen: boolean;
}

export function MainContent({ isMobileMenuOpen }: MainContentProps) {
  const { t } = useTranslation();

  return (
    <main className={`flex-1 p-4 lg:pl-[320px] transition-all duration-300 ${isMobileMenuOpen ? 'blur-sm lg:blur-none' : ''}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-6"
      >
        <Tabs defaultValue="spaces" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto flex-wrap">
            <TabsTrigger value="spaces">{t('spaces')}</TabsTrigger>
            <TabsTrigger value="air-quality">Mapy jakości powietrza</TabsTrigger>
            <TabsTrigger value="insights">{t('analysis')}</TabsTrigger>
            <TabsTrigger value="status">{t('status')}</TabsTrigger>
            <TabsTrigger value="sensors">{t('sensors')}</TabsTrigger>
            <TabsTrigger value="integrations">{t('integrations')}</TabsTrigger>
          </TabsList>

          <TabsContent value="spaces" className="space-y-6">
            <SpacesTab />
          </TabsContent>

          <TabsContent value="air-quality">
            <PomeranianAirQuality />
          </TabsContent>

          <TabsContent value="insights">
            <CompanyAnalysis />
          </TabsContent>

          <TabsContent value="status">
            <IoTStatus />
          </TabsContent>

          <TabsContent value="sensors">
            <SensorsPanel />
          </TabsContent>

          <TabsContent value="integrations">
            <IntegrationsPanel />
          </TabsContent>
        </Tabs>
      </motion.div>
    </main>
  );
}
