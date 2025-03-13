
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AirlyMapEmbed() {
  return (
    <Card className="dark:bg-[#1A1F2C] font-['Montserrat'] shadow-lg hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold">Mapa jakości powietrza - Trójmiasto (Airly)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[600px] rounded-lg overflow-hidden">
          <iframe 
            src="https://airly.org/map/pl/#54.3520,18.6466,11" 
            className="w-full h-full border-0" 
            title="Mapa jakości powietrza Airly"
            aria-label="Interaktywna mapa jakości powietrza Airly dla Trójmiasta"
          />
        </div>
      </CardContent>
    </Card>
  );
}
