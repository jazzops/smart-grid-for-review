
import { useEffect, useState } from "react";
import { useConversation } from "@11labs/react";
import { useToast } from "@/hooks/use-toast";

interface AudioPlaybackProps {
  content: string;
  isPlayingAudio: boolean;
  setIsPlayingAudio: (isPlaying: boolean) => void;
}

export function AudioPlayback({ content, isPlayingAudio, setIsPlayingAudio }: AudioPlaybackProps) {
  const { toast } = useToast();
  
  const conversation = useConversation({
    apiKey: localStorage.getItem('ELEVENLABS_API_KEY') || '',
    overrides: {
      tts: {
        voiceId: "XB0fDUnXU5powFXDhCwa", // Charlotte - polska wymowa
      }
    },
    onError: (error) => {
      console.error('ElevenLabs error:', error);
      setIsPlayingAudio(false);
      toast({
        title: "Błąd odtwarzania",
        description: "Nie udało się odtworzyć wiadomości głosowo. Sprawdź swój klucz API.",
        variant: "destructive"
      });
    },
  });

  // Zatrzymaj odtwarzanie po odmontowaniu komponentu
  useEffect(() => {
    return () => {
      if (isPlayingAudio) {
        conversation.endSession();
      }
    };
  }, [isPlayingAudio, conversation]);

  // Zatrzymaj odtwarzanie, gdy asystent kończy mówić
  useEffect(() => {
    if (!conversation.isSpeaking && isPlayingAudio) {
      setIsPlayingAudio(false);
    }
  }, [conversation.isSpeaking, isPlayingAudio, setIsPlayingAudio]);

  const playAudio = async () => {
    try {
      if (isPlayingAudio) {
        conversation.endSession();
        setIsPlayingAudio(false);
        return;
      }
      
      // Sprawdź, czy jest dostępny klucz API ElevenLabs
      if (!localStorage.getItem('ELEVENLABS_API_KEY')) {
        const apiKey = prompt('Podaj klucz API ElevenLabs, aby korzystać z funkcji odtwarzania głosowego:');
        if (apiKey) {
          localStorage.setItem('ELEVENLABS_API_KEY', apiKey);
        } else {
          return; // Anulowano wprowadzanie klucza
        }
      }
      
      setIsPlayingAudio(true);
      
      try {
        // Tworzenie nowej sesji ElevenLabs
        await conversation.startSession({
          agentId: "default"
        });
        
        // Bezpośrednie wywołanie API, aby odtworzyć tekst
        const apiKey = localStorage.getItem('ELEVENLABS_API_KEY');
        
        if (!apiKey) {
          throw new Error("Brak klucza API");
        }
        
        const voiceId = "XB0fDUnXU5powFXDhCwa"; // Charlotte
        const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
        
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': apiKey
          },
          body: JSON.stringify({
            text: content,
            model_id: "eleven_multilingual_v2",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75
            }
          })
        });
        
        if (!response.ok) {
          throw new Error(`Błąd API: ${response.status}`);
        }
        
        // Konwertuj odpowiedź na Blob
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Odtwórz dźwięk
        const audio = new Audio(audioUrl);
        audio.onended = () => {
          setIsPlayingAudio(false);
          URL.revokeObjectURL(audioUrl);
        };
        
        audio.onerror = () => {
          console.error("Błąd odtwarzania audio");
          setIsPlayingAudio(false);
          URL.revokeObjectURL(audioUrl);
          toast({
            title: "Błąd odtwarzania",
            description: "Nie udało się odtworzyć wiadomości głosowo.",
            variant: "destructive"
          });
        };
        
        audio.play();
      } catch (error) {
        console.error("Błąd podczas przetwarzania tekstu na mowę:", error);
        setIsPlayingAudio(false);
        toast({
          title: "Błąd ElevenLabs",
          description: "Wystąpił problem z usługą tekst-na-mowę. Sprawdź swój klucz API.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error playing text:', error);
      setIsPlayingAudio(false);
    }
  };

  return { playAudio };
}
