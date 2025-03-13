import { Upload } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DropZoneProps {
  isDragging: boolean;
  isProcessing: boolean;
  selectedFile: File | null;
  onFileSelect: (files: FileList | null) => void;
  setIsDragging: (isDragging: boolean) => void;
}

export const DropZone = ({ 
  isDragging, 
  isProcessing, 
  selectedFile, 
  onFileSelect,
  setIsDragging 
}: DropZoneProps) => {
  const handleButtonClick = () => {
    document.getElementById('file-upload')?.click();
  };

  return (
    <Card
      className={`p-8 border-2 border-dashed transition-colors ${
        isDragging ? "border-primary bg-primary/10" : "border-border"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        onFileSelect(e.dataTransfer.files);
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <Upload className="w-12 h-12 text-muted-foreground" />
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {isProcessing 
              ? `Przetwarzanie pliku: ${selectedFile?.name}...` 
              : "Przeciągnij i upuść pliki lub"}
          </p>
          <Button 
            variant="link" 
            className="mt-1" 
            disabled={isProcessing}
            onClick={handleButtonClick}
          >
            wybierz z dysku
          </Button>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".pdf,.docx,.png,.jpg,.jpeg"
            onChange={(e) => onFileSelect(e.target.files)}
            disabled={isProcessing}
            multiple // Dodajemy obsługę wielu plików
          />
        </div>
        <p className="text-xs text-muted-foreground">
          PDF, DOCX, PNG, JPG (max. 20MB na plik, do 5 plików)
        </p>
      </div>
    </Card>
  );
};