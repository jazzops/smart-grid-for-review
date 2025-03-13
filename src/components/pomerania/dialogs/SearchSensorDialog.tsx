
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "react-toastify";

interface SearchSensorDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (location: string, radius: number) => void;
}

export function SearchSensorDialog({ isOpen, onOpenChange, onSubmit }: SearchSensorDialogProps) {
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState(5);
  
  const handleSearch = () => {
    if (onSubmit && location) {
      onSubmit(location, radius);
      toast.info(`Wyszukiwanie czujników w pobliżu ${location} (promień: ${radius}km)`);
      onOpenChange(false); // Close dialog after submission
    } else if (!location) {
      toast.warning("Proszę wprowadzić lokalizację");
    } else {
      onOpenChange(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] z-[9999]">
        <DialogHeader>
          <DialogTitle>Wyszukaj czujnik</DialogTitle>
          <DialogDescription>
            Wprowadź parametry wyszukiwania czujnika.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="location">Lokalizacja</Label>
            <Input 
              id="location"
              placeholder="np. Gdańsk, Sopot, Gdynia" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="radius">Promień wyszukiwania (km)</Label>
            <Input 
              id="radius"
              type="number" 
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              min="1" 
              max="50" 
            />
          </div>
          
          <div className="pt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Anuluj
            </Button>
            <Button onClick={handleSearch} disabled={!location}>
              Wyszukaj
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
