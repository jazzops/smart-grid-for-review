import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const tutorialSteps = [
  {
    title: "Witaj w panelu monitorowania stanu jakości powietrza.",
    description: "Ten panel pomoże Ci monitorować i analizować dane z inteligentnej sieci smart grid oraz inteligentnych czujników jakości powietrza. Przeprowadzimy Cię przez najważniejsze funkcje systemu."
  },
  {
    title: "Asystent AI i Analiza Danych",
    description: "Kliknij w przycisk 'Asystent AI' w menu, aby zadać pytania dotyczące sieci lub przeanalizować dane. Możesz również wgrać pliki do analizy poprzez przeciągnięcie ich do wskazanego obszaru."
  },
  {
    title: "Personalizacja i Nawigacja",
    description: "Użyj zakładek na górze, aby przełączać się między różnymi widokami: Przestrzenie, Analiza, Status, Czujniki. Możesz dostosować układ kafelków do swoich potrzeb poprzez ich przeciąganie."
  },
  {
    title: "Monitorowanie w Czasie Rzeczywistym",
    description: "Kafelki pokazują aktualne dane o zużyciu energii i statusie sieci. Kliknij w kafelek, aby zobaczyć szczegółowe statystyki i wykresy."
  },
  {
    title: "Mapa i Lokalizacje",
    description: "Mapa pokazuje rozmieszczenie elementów sieci. Możesz przybliżać i oddalać widok oraz klikać w znaczniki, aby zobaczyć szczegóły każdej lokalizacji."
  },
  {
    title: "Dostosowanie Wyglądu",
    description: "W prawym górnym rogu znajdziesz przełącznik trybu ciemnego/jasnego oraz wybór języka. Dostosuj interfejs do swoich preferencji."
  }
];

export function Tutorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Sprawdź, czy samouczek był już wyświetlony
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
    if (!hasSeenTutorial) {
      setIsOpen(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOpen(false);
      localStorage.setItem("hasSeenTutorial", "true");
    }
  };

  const handleSkip = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenTutorial", "true");
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setIsOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {tutorialSteps[currentStep].title}
            </DialogTitle>
            <DialogDescription className="mt-4 text-base leading-relaxed">
              {tutorialSteps[currentStep].description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between mt-8">
            <Button variant="ghost" onClick={handleSkip} className="hover:bg-secondary">
              Pomiń
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {currentStep + 1} z {tutorialSteps.length}
              </span>
              <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
                {currentStep === tutorialSteps.length - 1 ? "Zakończ" : "Dalej"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Button
        variant="outline"
        onClick={handleRestart}
        className="fixed bottom-4 right-4 z-50"
      >
        Pokaż samouczek
      </Button>
    </>
  );
}
