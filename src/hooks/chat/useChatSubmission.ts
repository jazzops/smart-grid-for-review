
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useQueryProcessor } from "./useQueryProcessor";
import { Message } from "@/types/chat";

export const useChatSubmission = () => {
  const [input, setInput] = useState("");
  const { processQuery } = useQueryProcessor();
  const { toast } = useToast();

  // We need callbacks to be passed in from the parent component
  let addUserMessageCallback: (content: string) => void;
  let addAssistantMessageCallback: (content: string, visualizations?: Message["dataVisualizations"]) => void;

  const setMessageCallbacks = (
    userMsgCallback: (content: string) => void,
    assistantMsgCallback: (content: string, visualizations?: Message["dataVisualizations"]) => void
  ) => {
    addUserMessageCallback = userMsgCallback;
    addAssistantMessageCallback = assistantMsgCallback;
  };

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (inputText: string) => {
      return await processQuery(inputText);
    },
    onSuccess: (response) => {
      if (addAssistantMessageCallback) {
        addAssistantMessageCallback(response.text, response.visualizations);
      }
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

    if (addUserMessageCallback) {
      addUserMessageCallback(input);
    }
    sendMessage(input);
    setInput("");
  };

  return {
    input,
    setInput,
    handleSubmit,
    isPending,
    setMessageCallbacks
  };
};
