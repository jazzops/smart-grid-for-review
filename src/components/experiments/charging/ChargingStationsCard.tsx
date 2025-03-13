import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, MapPin, Zap, Info, Battery, Clock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChargingStationsMap } from "./ChargingStationsMap";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ChargingStation {
  ID: number;
  AddressInfo: {
    Title: string;
    AddressLine1: string;
    Town: string;
    StateOrProvince: string;
    Latitude: number;
    Longitude: number;
    AccessComments?: string;
  };
  Connections: Array<{
    ConnectionTypeID: number;
    PowerKW: number;
    Quantity?: number;
    CurrentTypeID?: number;
    CurrentType?: {
      Title: string;
    };
    ConnectionType: {
      Title: string;
    };
  }>;
  OperatorInfo?: {
    Title: string;
    WebsiteURL?: string;
  };
  UsageCost?: string;
  NumberOfPoints?: number;
  StatusType?: {
    Title: string;
    IsOperational: boolean;
  };
}

const API_KEY = 'e44d4c3e-9f3c-4e1d-ad15-5efc0e7f7ac0';

export const ChargingStationsCard = () => {
  const { toast } = useToast();
  const [selectedStation, setSelectedStation] = useState<ChargingStation | null>(null);
  const [minPower, setMinPower] = useState<string>("0");
  const [operationalOnly, setOperationalOnly] = useState<boolean>(true);

  const { data: stations, isLoading, error } = useQuery({
    queryKey: ['charging-stations', minPower, operationalOnly],
    queryFn: async () => {
      console.log('Fetching charging stations with params:', { minPower, operationalOnly });
      
      const params = new URLSearchParams({
        key: API_KEY,
        countrycode: 'PL',
        maxresults: '100',
        compact: 'false',
        verbose: 'false',
        levelid: minPower === "50" ? "3" : minPower === "22" ? "2" : "1",
      });

      if (operationalOnly) {
        params.append('statustypeid', '50'); // 50 is the ID for "Operational" status
      }

      const response = await fetch(
        `https://api.openchargemap.io/v3/poi?${params.toString()}`,
        {
          headers: {
            'Accept': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch charging stations');
      }

      return response.json() as Promise<ChargingStation[]>;
    },
  });

  const handleStationClick = (station: ChargingStation) => {
    setSelectedStation(station);
    toast({
      title: "Station Selected",
      description: `${station.AddressInfo.Title} - ${station.AddressInfo.AddressLine1}`,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Stacje ładowania w Polsce</CardTitle>
        <div className="flex gap-4 mt-4">
          <Select value={minPower} onValueChange={setMinPower}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Min. Power" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">All Powers</SelectItem>
              <SelectItem value="22">Min 22kW</SelectItem>
              <SelectItem value="50">Min 50kW</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant={operationalOnly ? "default" : "outline"}
            onClick={() => setOperationalOnly(!operationalOnly)}
          >
            {operationalOnly ? "Showing Operational Only" : "Showing All Stations"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : stations ? (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {stations.map((station) => (
                <TooltipProvider key={station.ID}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Card 
                        className="cursor-pointer transition-all hover:shadow-lg"
                        onClick={() => handleStationClick(station)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-2">
                              <MapPin className="h-5 w-5 text-primary mt-1" />
                              <div>
                                <h3 className="font-semibold">{station.AddressInfo.Title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {station.AddressInfo.AddressLine1}, {station.AddressInfo.Town}
                                </p>
                              </div>
                            </div>
                            {station.OperatorInfo && (
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Operator: {station.OperatorInfo.Title}</p>
                                  {station.OperatorInfo.WebsiteURL && (
                                    <p>Website: {station.OperatorInfo.WebsiteURL}</p>
                                  )}
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                          
                          <div className="mt-4 space-y-2">
                            {station.Connections.map((conn, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <Zap className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm">
                                  {conn.ConnectionType.Title} - {conn.PowerKW}kW
                                  {conn.Quantity && ` (x${conn.Quantity})`}
                                  {conn.CurrentType && ` - ${conn.CurrentType.Title}`}
                                </span>
                              </div>
                            ))}
                            
                            {station.NumberOfPoints && (
                              <div className="flex items-center gap-2">
                                <Battery className="h-4 w-4 text-green-500" />
                                <span className="text-sm">
                                  {station.NumberOfPoints} charging points
                                </span>
                              </div>
                            )}
                            
                            {station.UsageCost && (
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-blue-500" />
                                <span className="text-sm">{station.UsageCost}</span>
                              </div>
                            )}
                          </div>

                          {station.AddressInfo.AccessComments && (
                            <p className="mt-2 text-sm text-muted-foreground">
                              {station.AddressInfo.AccessComments}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-2">
                        <p>Status: {station.StatusType?.Title || 'Unknown'}</p>
                        {station.UsageCost && <p>Cost: {station.UsageCost}</p>}
                        {station.AddressInfo.AccessComments && (
                          <p>Access: {station.AddressInfo.AccessComments}</p>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
            
            <ChargingStationsMap stations={stations} />
          </>
        ) : null}
      </CardContent>
    </Card>
  );
};