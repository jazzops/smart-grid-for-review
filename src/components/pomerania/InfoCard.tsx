
import { Info } from "lucide-react";

export function InfoCard() {
  return (
    <div className="bg-card rounded-lg p-4 border border-primary/20">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-primary mt-0.5" />
        <div>
          <h3 className="font-medium mb-1">Dane o jakości powietrza</h3>
          <p className="text-sm text-muted-foreground">
            Poniżej prezentujemy dane o jakości powietrza w Trójmieście pochodzące z wielu źródeł:
            stacji pomiarowych Airly, stacji Głównego Inspektoratu Ochrony Środowiska (GIOŚ) oraz
            World Air Quality Index Project (AQICN). Dane są aktualizowane w czasie rzeczywistym.
          </p>
        </div>
      </div>
    </div>
  );
}
