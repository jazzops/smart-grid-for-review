import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BikeStationsMap } from "./BikeStationsMap";
import { Bike, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Station {
  station_id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  capacity: number;
  num_bikes_available: number;
  num_docks_available: number;
  last_reported: number;
}

const ITEMS_PER_PAGE = 15;

export const BikeStationsCard = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const infoResponse = await fetch('https://gbfs.urbansharing.com/rowermevo.pl/station_information.json');
        const statusResponse = await fetch('https://gbfs.urbansharing.com/rowermevo.pl/station_status.json');
        
        const infoData = await infoResponse.json();
        const statusData = await statusResponse.json();

        const combinedStations = infoData.data.stations.map((station: any) => {
          const status = statusData.data.stations.find(
            (s: any) => s.station_id === station.station_id
          );
          return {
            ...station,
            ...status,
          };
        });

        setStations(combinedStations);
        console.log("Fetched MEVO stations:", combinedStations);
      } catch (error) {
        console.error("Error fetching MEVO stations:", error);
        toast({
          title: "Błąd",
          description: "Nie udało się pobrać danych o stacjach MEVO",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
    const interval = setInterval(fetchStations, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, [toast]);

  // Calculate pagination values
  const totalPages = Math.ceil(stations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentStations = stations.slice(startIndex, endIndex);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push('...');
      }
    }
    return pages;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bike className="h-6 w-6 text-primary" />
            <CardTitle>Stacje MEVO w Gdańsku</CardTitle>
          </div>
          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <AlertTriangle className="h-4 w-4" />
              <span>Ładowanie danych...</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <BikeStationsMap stations={stations} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentStations.map((station) => (
              <Card key={station.station_id} className="p-4">
                <h3 className="font-semibold mb-2">{station.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{station.address}</p>
                <div className="flex justify-between text-sm">
                  <span>Dostępne rowery: {station.num_bikes_available}</span>
                  <span>Wolne miejsca: {station.num_docks_available}</span>
                </div>
              </Card>
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {getPageNumbers().map((pageNum, index) => (
                  <PaginationItem key={index}>
                    {pageNum === '...' ? (
                      <span className="px-4 py-2">...</span>
                    ) : (
                      <PaginationLink
                        onClick={() => setCurrentPage(Number(pageNum))}
                        isActive={currentPage === pageNum}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </CardContent>
    </Card>
  );
};