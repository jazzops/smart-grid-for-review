import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export const useSpeechRecognition = (onTranscript: (transcript: string) => void) => {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Speech recognition is not supported in this browser.",
        });
        return;
      }
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'pl-PL';
      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("");
        onTranscript(transcript);
        setIsRecording(false);
        recognitionRef.current?.stop();
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Error during speech recognition. Please try again.",
        });
        setIsRecording(false);
      };
      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }

    if (!isRecording) {
      recognitionRef.current.start();
      setIsRecording(true);
    } else {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  return {
    isRecording,
    handleVoiceInput
  };
};