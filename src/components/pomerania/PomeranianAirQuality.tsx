
import { useState } from "react";
import { InfoCard } from "./InfoCard";
import { ActionButtons } from "./ActionButtons";
import { AirlyMap } from "./AirlyMap";
import { AqicnMapEmbed } from "./maps/AqicnMapEmbed";
import { AirlyMapEmbed } from "./maps/AirlyMapEmbed";
import { AirQualitySpaces } from "./AirQualitySpaces";
import { AddSensorDialog, SensorFormValues } from "./dialogs/AddSensorDialog";
import { RemoveSensorDialog } from "./dialogs/RemoveSensorDialog";
import { SearchSensorDialog } from "./dialogs/SearchSensorDialog";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const PomeranianAirQuality = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  
  const handleAddSensor = (data: SensorFormValues) => {
    console.log("Sensor data:", data);
    // Here you would add the sensor with the provided data
    toast.success(`Dodano czujnik: ${data.name}`);
    setIsAddDialogOpen(false);
  };

  const handleRemoveSensor = (sensorId: string) => {
    console.log("Removing sensor with ID:", sensorId);
    toast.success("Usunięto czujnik");
    setIsRemoveDialogOpen(false);
  };

  const handleSearchSensor = (location: string, radius: number) => {
    console.log("Searching for sensors near:", location, "within radius:", radius, "km");
    
    // Here you would implement the actual sensor search functionality
    // For example by calling an API endpoint or filtering local data
    
    toast.info(`Wyszukiwanie czujników w pobliżu ${location} (promień: ${radius}km)`);
    setIsSearchDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <InfoCard />
      
      <ActionButtons 
        onAddClick={() => setIsAddDialogOpen(true)}
        onRemoveClick={() => setIsRemoveDialogOpen(true)}
        onSearchClick={() => setIsSearchDialogOpen(true)}
      />
      
      <AirlyMap />
      <AqicnMapEmbed />
      <AirlyMapEmbed />
      <AirQualitySpaces />

      {/* Dialogs */}
      <AddSensorDialog 
        isOpen={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddSensor}
      />
      
      <RemoveSensorDialog 
        isOpen={isRemoveDialogOpen} 
        onOpenChange={setIsRemoveDialogOpen}
        onSubmit={handleRemoveSensor}
      />
      
      <SearchSensorDialog 
        isOpen={isSearchDialogOpen} 
        onOpenChange={setIsSearchDialogOpen}
        onSubmit={handleSearchSensor}
      />
    </div>
  );
};
