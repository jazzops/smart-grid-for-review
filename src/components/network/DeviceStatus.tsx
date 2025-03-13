import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CircuitBoard,
  Gauge,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ServerCog,
  Cpu,
  Database,
  Signal,
} from "lucide-react";
import { motion } from "framer-motion";

interface Device {
  id: string;
  name: string;
  type: "transformer" | "meter" | "sensor";
  status: "operational" | "warning" | "error";
  lastUpdate: string;
  metrics: {
    load: number;
    temperature: number;
    efficiency: number;
  };
}

const mockDevices: Device[] = [
  {
    id: "tr-001",
    name: "Czujnik PM2.5/PM10",
    type: "sensor",
    status: "operational",
    lastUpdate: "2024-01-28T12:00:00",
    metrics: {
      load: 95,
      temperature: 22,
      efficiency: 98,
    },
  },
  {
    id: "mt-001",
    name: "Analizator gazów",
    type: "meter",
    status: "warning",
    lastUpdate: "2024-01-28T12:00:00",
    metrics: {
      load: 85,
      temperature: 24,
      efficiency: 92,
    },
  },
  {
    id: "sn-001",
    name: "Stacja meteo",
    type: "sensor",
    status: "operational",
    lastUpdate: "2024-01-28T12:00:00",
    metrics: {
      load: 90,
      temperature: 21,
      efficiency: 95,
    },
  },
];

const getDeviceIcon = (type: Device["type"]) => {
  switch (type) {
    case "transformer":
      return <CircuitBoard className="w-5 h-5" />;
    case "meter":
      return <Gauge className="w-5 h-5" />;
    case "sensor":
      return <Signal className="w-5 h-5" />;
  }
};

const getStatusColor = (status: Device["status"]) => {
  switch (status) {
    case "operational":
      return "bg-green-500/10 text-green-500";
    case "warning":
      return "bg-yellow-500/10 text-yellow-500";
    case "error":
      return "bg-red-500/10 text-red-500";
  }
};

const getStatusIcon = (status: Device["status"]) => {
  switch (status) {
    case "operational":
      return <CheckCircle className="w-4 h-4" />;
    case "warning":
      return <AlertTriangle className="w-4 h-4" />;
    case "error":
      return <XCircle className="w-4 h-4" />;
  }
};

export function DeviceStatus() {
  return (
    <div className="grid gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Status urządzeń Internet of Things</h2>
          <p className="text-muted-foreground">
            Monitorowanie stanu urządzeń w sieci smart grid, oraz jakości powietrza.
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="gap-1">
            <ServerCog className="w-4 h-4" />
            <span>Airthings: 1</span>
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Cpu className="w-4 h-4" />
            <span>Liczniki: 1</span>
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Database className="w-4 h-4" />
            <span>Czujniki: 1</span>
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockDevices.map((device) => (
          <motion.div
            key={device.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  {getDeviceIcon(device.type)}
                  <h3 className="font-semibold">{device.name}</h3>
                </div>
                <Badge
                  variant="secondary"
                  className={`${getStatusColor(device.status)} gap-1`}
                >
                  {getStatusIcon(device.status)}
                  <span className="capitalize">{device.status}</span>
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Obciążenie
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${device.metrics.load}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {device.metrics.load}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Temperatura
                    </div>
                    <div className="font-medium">
                      {device.metrics.temperature}°C
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Wydajność
                    </div>
                    <div className="font-medium">{device.metrics.efficiency}%</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
