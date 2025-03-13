import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";

interface ApiKeyPromptProps {
  onSetApiKey: () => void;
}

export const ApiKeyPrompt = ({ onSetApiKey }: ApiKeyPromptProps) => {
  return (
    <CardContent className="pt-6">
      <div className="text-center space-y-4">
        <p>Please set your Electricity Maps API key to view energy data.</p>
        <Button onClick={onSetApiKey}>Set API Key</Button>
      </div>
    </CardContent>
  );
};