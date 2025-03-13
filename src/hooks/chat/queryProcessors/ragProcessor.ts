
import { SensorResponse } from "@/types/chat";
import { generateRAGResponse } from "@/utils/ragUtils";

export const processRagQuery = async (query: string): Promise<SensorResponse> => {
  try {
    const response = await generateRAGResponse(query);
    return { text: response };
  } catch (error) {
    console.error("Error generating RAG response:", error);
    return { 
      text: "Przepraszam, wystąpił błąd podczas przetwarzania zapytania. Proszę spróbować ponownie."
    };
  }
};
