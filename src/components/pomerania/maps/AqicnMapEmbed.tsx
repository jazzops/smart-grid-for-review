
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AqicnMapEmbed() {
  return (
    <Card className="dark:bg-[#1A1F2C] font-['Montserrat'] shadow-lg hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold">Mapa jakości powietrza - Gdańsk Wrzeszcz (AQICN)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[600px] rounded-lg overflow-hidden">
          <iframe 
            src="https://aqicn.org/city/poland/gdansk/gdansk-wrzeszcz/pl/#@54.380277777778,18.620277777778,14z" 
            className="w-full h-full border-0" 
            title="Mapa jakości powietrza AQICN - Gdańsk Wrzeszcz"
            aria-label="Interaktywna mapa jakości powietrza AQICN dla Gdańska Wrzeszcz"
          />
        </div>
      </CardContent>
    </Card>
  );
}
