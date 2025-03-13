
import { useState } from "react";
import { MessageAvatar } from "./message/MessageAvatar";
import { MessageHeader } from "./message/MessageHeader";
import { MessageBody } from "./message/MessageBody";
import { DataVisualizations } from "./message/DataVisualizations";
import { AudioPlayback } from "./message/AudioPlayback";

type MessageProps = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  dataVisualizations?: Array<{
    type: "airQuality" | "temperature" | "humidity" | "sensorReading";
    title: string;
    data?: any;
  }>;
};

export function ChatMessage({
  role,
  content,
  timestamp,
  dataVisualizations
}: MessageProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const { playAudio } = AudioPlayback({ 
    content, 
    isPlayingAudio, 
    setIsPlayingAudio 
  });

  const handlePlayText = () => {
    playAudio();
  };

  // Check if content contains data related to air quality
  const hasAirQualityData = content.includes("Indeks jakości powietrza") ||
                            content.includes("AQI") ||
                            content.includes("PM2.5") ||
                            content.includes("PM10");

  return (
    <div className={`flex gap-3 ${role === "assistant" ? "flex-row" : "flex-row-reverse"}`}>
      <MessageAvatar role={role} />
      
      <div className={`flex flex-col max-w-[80%] md:max-w-[85%] lg:max-w-[90%] ${role === "assistant" ? "" : "items-end"}`}>
        <MessageHeader 
          role={role} 
          timestamp={timestamp} 
          isPlayingAudio={isPlayingAudio}
          onPlayText={role === "assistant" ? handlePlayText : undefined}
        />
        
        <MessageBody content={content} role={role} />
        
        {role === "assistant" && dataVisualizations && dataVisualizations.length > 0 && (
          <DataVisualizations visualizations={dataVisualizations} />
        )}
      </div>
    </div>
  );
}
