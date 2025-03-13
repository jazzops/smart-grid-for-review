import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ApiKeySettings() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('ELEVENLABS_API_KEY') || '');
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const validateApiKey = async (key: string) => {
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: {
          'Accept': 'application/json',
          'xi-api-key': key
        }
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const handleSaveApiKey = async () => {
    setIsValidating(true);
    const isValid = await validateApiKey(apiKey);
    setIsValidating(false);

    if (isValid) {
      localStorage.setItem('ELEVENLABS_API_KEY', apiKey);
      toast({
        title: "Sukces",
        description: "Klucz API został pomyślnie zapisany.",
      });
      window.location.reload(); // Odśwież stronę, aby zastosować nowy klucz
    } else {
      toast({
        variant: "destructive",
        title: "Błąd",
        description: "Podany klucz API jest nieprawidłowy. Sprawdź czy został poprawnie skopiowany.",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Konfiguruj klucz API</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Klucz API ElevenLabs</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Input
              id="apiKey"
              placeholder="Wprowadź klucz API ElevenLabs"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Możesz znaleźć swój klucz API w{" "}
              <a
                href="https://elevenlabs.io/speech-synthesis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                panelu ElevenLabs
              </a>
            </p>
          </div>
          <Button 
            onClick={handleSaveApiKey} 
            disabled={isValidating}
          >
            {isValidating ? "Sprawdzanie..." : "Zapisz klucz API"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}