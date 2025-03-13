import { useState, useEffect } from "react";
import { useConversation } from "@11labs/react";
import { useChat } from "@/hooks/useChat";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { ChatContainer } from "./chat/ChatContainer";
import { MessageList } from "./chat/MessageList";
import { initializeElevenLabs } from '../utils/elevenlabs';

export function Chatbot() {
  const [isTyping, setIsTyping] = useState(false);
  const {
    messages,
    input,
    setInput,
    handleSubmit,
    isPending,
    clearConversation
  } = useChat();

  const { isRecording, handleVoiceInput } = useSpeechRecognition((transcript) => {
    setInput(transcript);
    const userMessage = { role: "user" as const, content: transcript, timestamp: new Date() };
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  });

  const conversation = useConversation({
    apiKey: localStorage.getItem('ELEVENLABS_API_KEY') || '',
    overrides: {
      tts: {
        voiceId: "XB0fDUnXU5powFXDhCwa", // Charlotte - polska wymowa
      },
    },
    onError: (error) => {
      console.error('ElevenLabs error:', error);
    },
  });

  const [elevenLabs, setElevenLabs] = useState(null);

  useEffect(() => {
    setIsTyping(isPending);
  }, [isPending]);

  useEffect(() => {
    const elevenLabsClient = initializeElevenLabs();
    setElevenLabs(elevenLabsClient);
  }, []);

  const handleStopSpeaking = () => {
    conversation.endSession();
  };

  const handleSaveHistory = () => {
    const historyText = messages
      .map((msg) => {
        const time = new Date(msg.timestamp).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
        return `[${time}] ${msg.role === "user" ? "Użytkownik" : "Asystent"}: ${msg.content}`;
      })
      .join("\n\n");

    const blob = new Blob([historyText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-history-${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  };

  useEffect(() => {
    const handleInitialQuery = (event: CustomEvent<string>) => {
      setInput(event.detail);
      handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    };

    window.addEventListener('setInitialQuery', handleInitialQuery as EventListener);
    return () => {
      window.removeEventListener('setInitialQuery', handleInitialQuery as EventListener);
    };
  }, [setInput, handleSubmit]);

  // Check if user has set ElevenLabs API key
  useEffect(() => {
    const hasElevenLabsKey = !!localStorage.getItem('ELEVENLABS_API_KEY');
    if (!hasElevenLabsKey) {
      console.log('Brak klucza API ElevenLabs - funkcja odtwarzania głosowego nie będzie działać bez klucza');
    }
  }, []);

  return (
    <div>
      <ChatContainer
        isSpeaking={conversation.isSpeaking}
        isTyping={isTyping}
        onStopSpeaking={handleStopSpeaking}
        onSaveHistory={handleSaveHistory}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        handleVoiceInput={handleVoiceInput}
        handleClearConversation={clearConversation}
        isRecording={isRecording}
        isPending={isPending}
      >
        <MessageList 
          messages={messages}
          isTyping={isTyping}
          onSuggestionClick={handleSuggestionClick}
        />
      </ChatContainer>
      {!elevenLabs && (
        <div className="text-yellow-500 text-sm">
          Funkcja odtwarzania głosowego jest niedostępna
        </div>
      )}
    </div>
  );
}
