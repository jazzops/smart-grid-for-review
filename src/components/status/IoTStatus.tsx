import { useCompanyStore } from "@/components/CompanySidebar";
import { companiesData } from "@/data/companies";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Cpu, 
  Signal, 
  Network, 
  Database, 
  Clock, 
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { DeviceStatusDetail } from "./DeviceStatusDetail";
import { SystemPerformanceDetail } from "./SystemPerformanceDetail";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { getCompanyStatusData } from "./IoTStatusData";

const StatusIndicator = ({ value }: { value: number }) => {
  const getColor = (value: number) => {
    if (value >= 80) return "text-success";
    if (value >= 50) return "text-warning";
    return "text-danger";
  };

  const getIcon = (value: number) => {
    if (value >= 80) return <CheckCircle className={`w-5 h-5 ${getColor(value)}`} />;
    if (value >= 50) return <AlertTriangle className={`w-5 h-5 ${getColor(value)}`} />;
    return <XCircle className={`w-5 h-5 ${getColor(value)}`} />;
  };

  return getIcon(value);
};

const ProgressItem = ({ 
  label, 
  value, 
  icon: Icon, 
  description,
  onClick,
  className = ""
}: { 
  label: string; 
  value: number; 
  icon: any;
  description: string;
  onClick?: () => void;
  className?: string;
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={`space-y-2 cursor-pointer ${className}`} onClick={onClick}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{label}</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusIndicator value={value} />
              <span className="text-sm font-semibold">{value}%</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          <div className="relative">
            <Progress 
              value={value} 
              className="h-2"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-primary-foreground">
              {value}%
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{description}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export function IoTStatus() {
  const { t } = useTranslation();
  const { selectedCompanyId } = useCompanyStore();
  const selectedCompany = companiesData.find(
    (company) => company.id === selectedCompanyId
  );
  const [activeView, setActiveView] = useState<'overview' | 'devices' | 'system'>('overview');

  const statusData = getCompanyStatusData(selectedCompanyId || "1");
  const { deviceStatus, systemStatus } = statusData;

  const getOverallStatus = (values: number[]) => {
    const average = values.reduce((a, b) => a + b, 0) / values.length;
    if (average >= 80) return t("optimal");
    if (average >= 50) return t("requiresAttention");
    return t("critical");
  };

  const overallStatus = getOverallStatus([
    ...Object.values(deviceStatus),
    ...Object.values(systemStatus)
  ]);

  if (activeView === 'devices') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setActiveView('overview')}
            className="mb-4"
          >
            ← {t('back')}
          </Button>
        </div>
        <DeviceStatusDetail />
      </motion.div>
    );
  }

  if (activeView === 'system') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setActiveView('overview')}
            className="mb-4"
          >
            ← {t('back')}
          </Button>
        </div>
        <SystemPerformanceDetail />
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid gap-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-1">
            {t('iotStatus')} - {selectedCompany?.name}
          </h2>
          <div className="flex items-center gap-2">
            <StatusIndicator value={deviceStatus.activeDevices} />
            <span className="text-sm text-muted-foreground">
              {t('overallStatus')}: {overallStatus}
            </span>
          </div>
        </div>
        <div className="text-right flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>
            {t('lastUpdate')}: 5 {t('minutesAgo')}
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 bg-[#0A0F1C] border-[#1F2937] hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">{t('deviceStatus')}</h3>
          </div>
          <div className="space-y-6">
            <ProgressItem
              label={t('activeDevices')}
              value={deviceStatus.activeDevices}
              icon={Cpu}
              description={t('devicesOnline')}
              onClick={() => setActiveView('devices')}
            />
            <ProgressItem
              label={t('networkConnection')}
              value={deviceStatus.networkConnection}
              icon={Network}
              description={t('networkStability')}
              onClick={() => setActiveView('devices')}
            />
            <ProgressItem
              label={t('signalQuality')}
              value={deviceStatus.signalQuality}
              icon={Signal}
              description={t('signalStrength')}
              onClick={() => setActiveView('devices')}
            />
          </div>
        </Card>

        <Card className="p-6 bg-[#0A0F1C] border-[#1F2937] hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">{t('systemPerformance')}</h3>
          </div>
          <div className="space-y-6">
            <ProgressItem
              label={t('cpuUsage')}
              value={systemStatus.cpuUsage}
              icon={Cpu}
              description={t('processorLoad')}
              onClick={() => setActiveView('system')}
            />
            <ProgressItem
              label={t('memoryUsage')}
              value={systemStatus.memoryUsage}
              icon={Database}
              description={t('ramUsage')}
              onClick={() => setActiveView('system')}
            />
            <ProgressItem
              label={t('networkLatency')}
              value={systemStatus.networkLatency}
              icon={Network}
              description={t('connectionLatency')}
              onClick={() => setActiveView('system')}
            />
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
