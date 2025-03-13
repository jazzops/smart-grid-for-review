import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "@/hooks/use-toast";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

if (!API_KEY) {
  console.error("Brak klucza API dla Gemini. Proszę dodać VITE_GOOGLE_API_KEY.");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const MAX_RETRIES = 3;
const BASE_DELAY = 2000; // 2 seconds initial delay

const isRateLimitError = (error: any) => {
  return error?.status === 429 || 
         error?.body?.includes("RATE_LIMIT_EXCEEDED") ||
         error?.body?.includes("RESOURCE_EXHAUSTED");
};

export const generateGeminiResponse = async (prompt: string, retryCount = 0): Promise<string> => {
  if (!API_KEY) {
    return "Przepraszam, ale brak skonfigurowanego klucza API dla Gemini. Proszę skontaktować się z administratorem.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error("Error with Gemini API:", error);

    if (isRateLimitError(error) && retryCount < MAX_RETRIES) {
      const waitTime = BASE_DELAY * Math.pow(2, retryCount); // Exponential backoff
      console.log(`Rate limited. Retrying in ${waitTime}ms...`);
      
      // Show toast to inform user about the retry
      toast({
        title: "Przekroczono limit zapytań",
        description: `Ponowna próba za ${waitTime/1000} sekund...`,
        duration: waitTime,
      });
      
      await delay(waitTime);
      return generateGeminiResponse(prompt, retryCount + 1);
    }

    if (isRateLimitError(error)) {
      toast({
        variant: "destructive",
        title: "Przekroczono limit zapytań",
        description: "Proszę spróbować ponownie za kilka minut.",
        duration: 5000,
      });
      return "Przepraszam, ale przekroczono limit zapytań do API. Proszę odczekać kilka minut i spróbować ponownie.";
    }

    return "Przepraszam, wystąpił błąd podczas przetwarzania zapytania. Proszę spróbować ponownie za chwilę.";
  }
};

// Alias for backward compatibility
export const getGeminiResponse = generateGeminiResponse;