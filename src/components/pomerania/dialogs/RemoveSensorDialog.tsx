
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface RemoveSensorDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (sensorId: string) => void;
}

export function RemoveSensorDialog({ isOpen, onOpenChange, onSubmit }: RemoveSensorDialogProps) {
  const [selectedSensor, setSelectedSensor] = useState<string | null>(null);
  
  // Mock sensor data - in a real app, this would come from your state or API
  const mockSensors = [
    { id: "sensor1", name: "Czujnik domowy" },
    { id: "sensor2", name: "Czujnik biurowy" },
  ];
  
  const handleRemove = () => {
    if (selectedSensor && onSubmit) {
      onSubmit(selectedSensor);
    } else {
      onOpenChange(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] z-[9999]">
        <DialogHeader>
          <DialogTitle>Usuń czujnik</DialogTitle>
          <DialogDescription>
            Wybierz czujnik, który chcesz usunąć z systemu.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {mockSensors.length > 0 ? (
            <div className="space-y-4">
              <div className="space-y-2">
                {mockSensors.map((sensor) => (
                  <div 
                    key={sensor.id}
                    className={`p-3 border rounded-md cursor-pointer flex justify-between items-center ${
                      selectedSensor === sensor.id ? 'border-primary bg-primary/10' : 'border-border'
                    }`}
                    onClick={() => setSelectedSensor(sensor.id)}
                  >
                    <span>{sensor.name}</span>
                    <span className="text-xs text-muted-foreground">ID: {sensor.id}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Anuluj
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleRemove}
                  disabled={!selectedSensor}
                >
                  Usuń czujnik
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Obecnie brak aktywnych czujników niestandardowych do usunięcia.
              </p>
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Zamknij
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
