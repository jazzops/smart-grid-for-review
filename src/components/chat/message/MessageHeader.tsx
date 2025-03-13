
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Speaker } from "lucide-react";

interface MessageHeaderProps {
  role: "user" | "assistant";
  timestamp: Date;
  isPlayingAudio: boolean;
  onPlayText?: () => void;
}

export function MessageHeader({ role, timestamp, isPlayingAudio, onPlayText }: MessageHeaderProps) {
  const time = format(timestamp, "HH:mm", { locale: pl });
  
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
      <span>{role === "assistant" ? "Asystent" : "Ty"}</span>
      <span>•</span>
      <span>{time}</span>
      
      {role === "assistant" && onPlayText && (
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-full ml-1"
          onClick={onPlayText}
          title={isPlayingAudio ? "Zatrzymaj odtwarzanie" : "Odtwórz głosowo"}
        >
          <Speaker className={`h-4 w-4 ${isPlayingAudio ? "text-primary animate-pulse" : ""}`} />
        </Button>
      )}
    </div>
  );
}
