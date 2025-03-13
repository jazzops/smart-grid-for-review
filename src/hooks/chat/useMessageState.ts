
import { useState } from "react";
import { Message } from "@/types/chat";

export const useMessageState = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Witaj! Jestem twoim asystentem monitorowania stanu jakości powietrza. Jak mogę ci pomóc?",
      timestamp: new Date(),
    },
  ]);
  
  const [input, setInput] = useState("");

  const addUserMessage = (content: string) => {
    const userMessage = {
      role: "user" as const,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    return userMessage;
  };

  const addAssistantMessage = (content: string, dataVisualizations?: Message["dataVisualizations"]) => {
    const newMessage = {
      role: "assistant" as const,
      content,
      timestamp: new Date(),
      dataVisualizations,
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  };

  const clearMessages = () => {
    setMessages([
      {
        role: "assistant",
        content: "Witaj! Jestem twoim asystentem monitorowania stanu jakości powietrza. Jak mogę ci pomóc?",
        timestamp: new Date(),
      },
    ]);
  };

  return {
    messages,
    input,
    setInput,
    addUserMessage,
    addAssistantMessage,
    clearMessages
  };
};
