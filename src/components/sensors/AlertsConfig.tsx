import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AlertThreshold {
  parameter: string;
  threshold: number;
}

export const AlertsConfig = () => {
  const { toast } = useToast();
  const [thresholds, setThresholds] = useState<AlertThreshold[]>([
    { parameter: 'PM2.5', threshold: 25 },
    { parameter: 'PM10', threshold: 50 },
    { parameter: 'CO₂', threshold: 1000 }
  ]);

  const handleThresholdChange = (parameter: string, value: string) => {
    setThresholds(prev =>
      prev.map(t =>
        t.parameter === parameter ? { ...t, threshold: Number(value) } : t
      )
    );
  };

  const saveThresholds = () => {
    // In a real application, this would save to backend
    toast({
      title: "Zapisano progi alertów",
      description: "Nowe wartości zostały zapisane pomyślnie."
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Konfiguracja Alertów</h3>
      <div className="space-y-4">
        {thresholds.map((threshold) => (
          <div key={threshold.parameter} className="flex items-center gap-4">
            <span className="w-24">{threshold.parameter}</span>
            <Input
              type="number"
              value={threshold.threshold}
              onChange={(e) => handleThresholdChange(threshold.parameter, e.target.value)}
              className="w-32"
            />
          </div>
        ))}
        <Button onClick={saveThresholds}>Zapisz</Button>
      </div>
    </Card>
  );
};