import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ExportButtonsProps {
  onExport: (format: 'pdf' | 'jpg' | 'xlsx' | 'csv') => void;
  onGenerateForecast: () => void;
  showForecast: boolean;
}

export function ExportButtons({ onExport, onGenerateForecast, showForecast }: ExportButtonsProps) {
  const { toast } = useToast();

  return (
    <div className="flex gap-2 items-center flex-wrap">
      <Button 
        variant="outline"
        className="bg-secondary hover:bg-primary/40 text-primary-foreground"
        onClick={() => onExport('pdf')}
      >
        Eksportuj do PDF
      </Button>
      <Button 
        variant="outline"
        className="bg-secondary hover:bg-primary/40 text-primary-foreground"
        onClick={() => onExport('xlsx')}
      >
        Eksportuj do Excel
      </Button>
      <Button 
        variant="outline"
        className="bg-secondary hover:bg-primary/40 text-primary-foreground"
        onClick={() => onExport('jpg')}
      >
        Eksportuj do JPG
      </Button>
      <Button 
        variant="outline"
        className="bg-secondary hover:bg-primary/40 text-primary-foreground"
        onClick={() => onExport('csv')}
      >
        Eksportuj do CSV
      </Button>
      <Button 
        variant="outline"
        className="bg-secondary hover:bg-primary/40 text-primary-foreground"
        onClick={() => {
          onGenerateForecast();
          toast({
            title: "Prognoza wygenerowana",
            description: "Wyświetlono przewidywane wartości na podstawie danych historycznych",
          });
        }} 
        disabled={showForecast}
      >
        Generuj prognozę
      </Button>
    </div>
  );
}
