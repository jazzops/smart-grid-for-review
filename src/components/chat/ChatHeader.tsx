
import { Button } from "@/components/ui/button";
import { Save, VolumeOff } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface ChatHeaderProps {
  isSpeaking?: boolean;
  onStopSpeaking?: () => void;
  onSaveHistory: () => void;
  isTyping: boolean;
}

export function ChatHeader({
  isSpeaking,
  onStopSpeaking,
  onSaveHistory,
  isTyping
}: ChatHeaderProps) {
  return (
    <div className="p-4 border-b flex items-center justify-between bg-background shadow-sm">
      <h3 className="text-lg font-semibold">
        Asystent AI
        {isTyping && (
          <span className="text-xs text-muted-foreground ml-2 animate-pulse">
            pisze...
          </span>
        )}
        {isSpeaking && (
          <span className="text-xs text-primary ml-2 animate-pulse">
            mówi...
          </span>
        )}
      </h3>
      
      <div className="flex gap-2">
        {isSpeaking && onStopSpeaking && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={onStopSpeaking}
                >
                  <VolumeOff className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zatrzymaj odtwarzanie</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onSaveHistory}
              >
                <Save className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Zapisz historię konwersacji</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
