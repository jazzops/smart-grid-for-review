
import { Card } from "@/components/ui/card";
import { FileText, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FileInfoProps {
  file: File;
  topics?: string[];
}

export function FileInfo({ file, topics = [] }: FileInfoProps) {
  const navigate = useNavigate();
  
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const handleTopicClick = (topic: string) => {
    navigate('/assistant', { state: { initialQuery: `Opowiedz mi więcej o: ${topic}` } });
  };

  return (
    <Card className="p-4 mt-4">
      <div className="flex items-start gap-4">
        <FileText className="h-8 w-8 text-primary" />
        <div className="flex-1">
          <h3 className="font-medium">Wgrany plik</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Nazwa: {file.name}
          </p>
          <p className="text-sm text-muted-foreground">
            Rozmiar: {formatFileSize(file.size)}
          </p>
          
          {topics && topics.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <List className="h-4 w-4" />
                Główne zagadnienia:
              </h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {topics.map((topic, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-sm"
                    onClick={() => handleTopicClick(topic)}
                  >
                    {topic}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
