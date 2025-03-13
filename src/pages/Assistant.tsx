import { Chatbot } from "@/components/Chatbot";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { ArrowLeft, VolumeX, Volume2, Key } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Assistant() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialQuery = location.state?.initialQuery;
  const { toast } = useToast();
  const [elevenlabsApiKey, setElevenlabsApiKey] = useState("");
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(!!localStorage.getItem('ELEVENLABS_API_KEY'));

  useEffect(() => {
    if (initialQuery) {
      // Dispatch a custom event to set the initial query in the chat
      const event = new CustomEvent('setInitialQuery', { detail: initialQuery });
      window.dispatchEvent(event);
    }
  }, [initialQuery]);

  const handleSaveApiKey = () => {
    if (elevenlabsApiKey.trim()) {
      localStorage.setItem('ELEVENLABS_API_KEY', elevenlabsApiKey.trim());
      setIsSoundEnabled(true);
      setIsApiKeyDialogOpen(false);
      toast({
        title: "Klucz API zapisany",
        description: "Możesz teraz korzystać z funkcji głosowej asystenta",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Błąd",
        description: "Klucz API nie może być pusty",
      });
    }
  };

  const toggleSound = () => {
    if (isSoundEnabled) {
      localStorage.removeItem('ELEVENLABS_API_KEY');
      setIsSoundEnabled(false);
      toast({
        title: "Dźwięk wyłączony",
        description: "Funkcja głosowa asystenta została wyłączona",
      });
    } else {
      setIsApiKeyDialogOpen(true);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => navigate('/')}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Asystent AI</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSound}
            className="flex items-center gap-2"
          >
            {isSoundEnabled ? (
              <>
                <Volume2 className="h-4 w-4" />
                <span className="hidden md:inline">Dźwięk włączony</span>
              </>
            ) : (
              <>
                <VolumeX className="h-4 w-4" />
                <span className="hidden md:inline">Dźwięk wyłączony</span>
              </>
            )}
          </Button>
          {isSoundEnabled && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsApiKeyDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <Key className="h-4 w-4" />
              <span className="hidden md:inline">Zmień klucz API</span>
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Chatbot />
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Wgraj pliki</h2>
          <FileUpload />
        </div>
      </div>
      
      <Dialog open={isApiKeyDialogOpen} onOpenChange={setIsApiKeyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Klucz API ElevenLabs</DialogTitle>
            <DialogDescription>
              Aby korzystać z funkcji głosowej, wprowadź swój klucz API ElevenLabs.
              Możesz go uzyskać w panelu sterowania ElevenLabs.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="apiKey">Klucz API</Label>
            <Input
              id="apiKey"
              value={elevenlabsApiKey}
              onChange={(e) => setElevenlabsApiKey(e.target.value)}
              placeholder="Wprowadź klucz API ElevenLabs"
              className="mt-2"
              type="password"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApiKeyDialogOpen(false)}>Anuluj</Button>
            <Button onClick={handleSaveApiKey}>Zapisz</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Assistant;
