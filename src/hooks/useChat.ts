
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Message } from "@/types/chat";
import { useQueryProcessor } from "@/hooks/chat/useQueryProcessor";
import { useMessageState } from "@/hooks/chat/useMessageState";

export const useChat = () => {
  const { 
    messages, 
    input, 
    setInput, 
    addUserMessage, 
    addAssistantMessage, 
    clearMessages 
  } = useMessageState();
  
  const { toast } = useToast();
  const { processQuery } = useQueryProcessor();

  const clearConversation = () => {
    clearMessages();
    toast({
      title: "Konwersacja wyczyszczona",
      description: "Historia czatu została zresetowana.",
    });
  };

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (input: string) => {
      return await processQuery(input);
    },
    onSuccess: (response) => {
      addAssistantMessage(response.text, response.visualizations);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Błąd",
        description: "Nie udało się uzyskać odpowiedzi. Spróbuj ponownie.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addUserMessage(input);
    sendMessage(input);
    setInput("");
  };

  return {
    messages,
    input,
    setInput,
    handleSubmit,
    isPending,
    clearConversation
  };
};
