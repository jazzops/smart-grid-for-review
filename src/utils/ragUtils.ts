import { GoogleGenerativeAI } from "@google/generative-ai";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { getGeminiResponse } from '@/lib/gemini';
import { calculateTFIDF } from './searchUtils';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY || "");

let documentChunks: { text: string; metadata?: Record<string, any> }[] = [];

export const generateRAGResponse = async (query: string): Promise<string> => {
  console.log('Generuję odpowiedź dla zapytania:', query);

  const isAirQualityRelated = query.toLowerCase().includes('powietrz') || 
                             query.toLowerCase().includes('pm') ||
                             query.toLowerCase().includes('zanieczyszcz');

  if (documentChunks.length === 0) {
    console.log('Brak dokumentów w pamięci');
    
    // Even without documents, try to provide a meaningful response
    const enhancedPrompt = `Odpowiedz na pytanie: ${query}. 
      ${isAirQualityRelated ? 'Skup się na informacjach dotyczących wpływu na zdrowie i zalecanych działaniach profilaktycznych.' : ''}
      Odpowiedz w sposób przyjazny i pomocny.`;
    
    return getGeminiResponse(enhancedPrompt);
  }

  const relevantChunks = searchRelevantChunks(query);
  
  if (relevantChunks.length === 0) {
    console.log('Nie znaleziono pasujących fragmentów');
    
    // If no relevant chunks found, still try to provide a helpful response
    const enhancedPrompt = `Odpowiedz na pytanie: ${query}. 
      ${isAirQualityRelated ? 'Uwzględnij wpływ na zdrowie i zalecane działania profilaktyczne.' : ''}
      Odpowiedz w sposób przyjazny i pomocny.`;
    
    return getGeminiResponse(enhancedPrompt);
  }

  const context = relevantChunks.join('\n\n');
  const prompt = `Na podstawie poniższego kontekstu, ${query === 'podsumuj' ? 'przedstaw krótkie podsumowanie głównych punktów dokumentu' : 'odpowiedz na pytanie'}. 
  ${isAirQualityRelated ? 'Zwróć szczególną uwagę na informacje dotyczące jakości powietrza i ich wpływu na zdrowie.' : ''}
  Jeśli odpowiedź nie znajduje się w kontekście, powiedz, że nie masz tej informacji, ale spróbuj pomóc na podstawie swojej ogólnej wiedzy.

  Kontekst:
  ${context}

  ${query === 'podsumuj' ? 'Podsumuj najważniejsze informacje z dokumentu.' : `Pytanie: ${query}`}`;

  console.log('Wysyłam zapytanie do Gemini z kontekstem długości:', context.length);
  return getGeminiResponse(prompt);
};

export const searchRelevantChunks = (query: string): string[] => {
  console.log('Szukam fragmentów dla zapytania:', query);
  
  if (documentChunks.length === 0) {
    console.log("Brak przetworzonych dokumentów w pamięci");
    return [];
  }

  if (query.toLowerCase() === 'podsumuj') {
    console.log('Zapytanie o podsumowanie - zwracam wszystkie fragmenty');
    return documentChunks.map(chunk => chunk.text);
  }

  const results = calculateTFIDF(
    query,
    documentChunks.map(chunk => chunk.text)
  );

  return results.slice(0, 3).map(result => result.text);
};

async function extractMainTopics(text: string): Promise<string[]> {
  try {
    console.log('Rozpoczynam ekstrakcję głównych tematów...');
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro"
    });
    
    const prompt = `
      Przeanalizuj poniższy tekst i wypisz 5 najważniejszych zagadnień lub tematów.
      Wypisz je w formie krótkich, zwięzłych haseł (maksymalnie 3-4 słowa na temat).
      
      Tekst do analizy:
      ${text}
      
      Zwróć dokładnie 5 głównych tematów, każdy w nowej linii, bez numeracji i dodatkowych oznaczeń.
      Format odpowiedzi - tylko tematy, jeden pod drugim:
      Temat pierwszy
      Temat drugi
      Temat trzeci
      Temat czwarty
      Temat piąty
    `;

    console.log('Wysyłam zapytanie do modelu Gemini...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const topicsString = response.text();
    
    console.log('Otrzymano odpowiedź od modelu:', topicsString);
    
    const topics = topicsString
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .slice(0, 5);

    console.log('Przetworzone tematy:', topics);
    
    if (topics.length !== 5) {
      console.warn('Nieoczekiwana liczba tematów:', topics.length);
      while (topics.length < 5) {
        topics.push('Analizowanie treści...');
      }
    }

    return topics;
  } catch (error) {
    console.error('Błąd podczas ekstrakcji tematów:', error);
    throw new Error("Wystąpił błąd podczas analizy dokumentu. Spróbuj ponownie później.");
  }
}

export const processDocumentForRAG = async (text: string) => {
  try {
    console.log('Rozpoczynam przetwarzanie dokumentu dla RAG, długość tekstu:', text.length);

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const chunks = await splitter.createDocuments([text]);
    documentChunks = chunks.map(chunk => ({
      text: chunk.pageContent,
      metadata: chunk.metadata,
    }));

    console.log(`Dokument przetworzony na ${documentChunks.length} fragmentów`);

    const mainTopics = await extractMainTopics(text);
    console.log('Wyodrębnione główne tematy:', mainTopics);

    return {
      message: `Dokument został przetworzony na ${documentChunks.length} fragmentów`,
      chunks: documentChunks,
      topics: mainTopics
    };
  } catch (error) {
    console.error("Błąd podczas przetwarzania dokumentu:", error);
    throw error;
  }
};
