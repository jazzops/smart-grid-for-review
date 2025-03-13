
import { useState, useEffect } from 'react';
import { Chatbot } from './Chatbot';
import { Button } from './ui/button';
import { Bot, X, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [elevenlabsApiKey, setElevenlabsApiKey] = useState("");
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(!!localStorage.getItem('ELEVENLABS_API_KEY'));
  const location = useLocation();
  const { toast } = useToast();
  
  // Remove the section restriction to make it available everywhere
  // const isAllowedSection = ['insights', 'status', 'sensors'].includes(currentHash);

  useEffect(() => {
    const handleOpenAssistant = () => setIsOpen(true);
    window.addEventListener('openAssistant', handleOpenAssistant);
    return () => window.removeEventListener('openAssistant', handleOpenAssistant);
  }, []);

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

  // Remove the conditional return that was restricting where the chatbot appears
  // if (!isAllowedSection) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mb-4 w-[90vw] md:w-auto"
          >
            <div className="flex justify-end mb-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mr-2"
                      onClick={toggleSound}
                    >
                      {isSoundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isSoundEnabled ? "Wyłącz dźwięk" : "Włącz dźwięk"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Chatbot />
          </motion.div>
        )}
      </AnimatePresence>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="lg"
              className="rounded-full p-4 shadow-lg flex items-center gap-2 bg-primary hover:bg-primary/90 transition-colors duration-200"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Bot className="h-6 w-6" />
              )}
              <span className="text-sm font-medium hidden md:inline">
                {isOpen ? "Zamknij" : "Asystent AI"}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Asystent AI - pomoc i analiza danych</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
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
