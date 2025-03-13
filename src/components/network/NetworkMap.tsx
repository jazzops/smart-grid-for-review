import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircuitBoard, Gauge, Signal, Globe } from "lucide-react";
import { createElement } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Device {
  id: string;
  name: string;
  type: "transformer" | "meter" | "sensor";
  status: "operational" | "warning" | "error";
  position: [number, number];
}

const mockDevices: Device[] = [
  {
    id: "tr-001",
    name: "Airthings A1",
    type: "transformer",
    status: "operational",
    position: [54.372158, 18.638306],
  },
  {
    id: "mt-001",
    name: "Licznik L1",
    type: "meter",
    status: "warning",
    position: [54.371158, 18.637306],
  },
  {
    id: "sn-001",
    name: "Czujnik C1",
    type: "sensor",
    status: "error",
    position: [54.373158, 18.639306],
  },
];

const getDeviceIcon = (type: Device["type"]) => {
  switch (type) {
    case "transformer":
      return CircuitBoard;
    case "meter":
      return Gauge;
    case "sensor":
      return Signal;
  }
};

const getStatusColor = (status: Device["status"]) => {
  return "#22c55e";
};

export function NetworkMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const connections = useRef<L.Polyline[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = L.map(mapContainer.current).setView([54.372158, 18.638306], 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map.current);

    mockDevices.forEach((device) => {
      if (!map.current) return;

      const IconComponent = getDeviceIcon(device.type);
      const color = getStatusColor(device.status);

      const iconHtml = `
        <div class="relative">
          <div class="absolute -top-4 -left-4 bg-background p-2 rounded-full shadow-lg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              ${createElement(IconComponent, { size: 16 }).props.children}
            </svg>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: "bg-transparent",
        html: iconHtml,
      });

      L.marker(device.position, { icon: customIcon })
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-bold">${device.name}</h3>
            <p>Status: ${device.status}</p>
          </div>
        `)
        .addTo(map.current);
    });

    mockDevices.forEach((device, index) => {
      if (!map.current || index === mockDevices.length - 1) return;

      const nextDevice = mockDevices[index + 1];
      const connection = L.polyline(
        [device.position, nextDevice.position],
        {
          color: getStatusColor(device.status),
          weight: 2,
          opacity: 0.6,
          dashArray: "5, 10",
        }
      ).addTo(map.current);

      connections.current.push(connection);
    });

    return () => {
      map.current?.remove();
      connections.current = [];
    };
  }, []);

  return (
    <div className="grid gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">Mapa sieci czujników</h2>
          <Globe className="w-6 h-6 text-primary animate-spin" style={{ animationDuration: '3s' }} />
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="gap-1">
            <CircuitBoard className="w-4 h-4 text-success" />
            <span>Airthings</span>
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Gauge className="w-4 h-4 text-success" />
            <span>Liczniki</span>
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Signal className="w-4 h-4 text-success" />
            <span>Czujniki</span>
          </Badge>
        </div>
      </div>

      <Card className="relative h-[500px] overflow-hidden">
        <div ref={mapContainer} className="absolute inset-0" />
      </Card>
    </div>
  );
}
