
import { Card } from "@/components/ui/card";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ReactNode } from "react";

interface ChatContainerProps {
  children: ReactNode;
  isSpeaking: boolean;
  isTyping: boolean;
  onStopSpeaking: () => void;
  onSaveHistory: () => void;
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleVoiceInput: () => void;
  handleClearConversation: () => void;
  isRecording: boolean;
  isPending: boolean;
}

export function ChatContainer({
  children,
  isSpeaking,
  isTyping,
  onStopSpeaking,
  onSaveHistory,
  input,
  setInput,
  handleSubmit,
  handleVoiceInput,
  handleClearConversation,
  isRecording,
  isPending
}: ChatContainerProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] md:h-[700px] flex flex-col bg-background shadow-lg rounded-xl">
      <ChatHeader
        isSpeaking={isSpeaking}
        onStopSpeaking={onStopSpeaking}
        onSaveHistory={onSaveHistory}
        isTyping={isTyping}
      />
      
      {children}
      
      <ChatInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        handleVoiceInput={handleVoiceInput}
        handleClearConversation={handleClearConversation}
        isRecording={isRecording}
        isPending={isPending}
      />
    </Card>
  );
}
