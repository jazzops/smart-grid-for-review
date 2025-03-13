import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Cloud, Files, Database } from "lucide-react";

export function UploadOptions() {
  const { toast } = useToast();

  const handleOptionClick = (optionName: string) => {
    toast({
      title: "Funkcja w przygotowaniu",
      description: `Opcja: ${optionName}`,
    });
  };

  const options = [
    {
      title: "Wgrywanie zbiorcze",
      description: "Jednoczesne wgrywanie wielu plików poprzez przeciągnięcie całego folderu",
      icon: Files,
    },
    {
      title: "Wgrywanie w tle",
      description: "Kontynuuj pracę w aplikacji podczas wgrywania plików",
      icon: Upload,
    },
    {
      title: "Wgrywanie dużych plików",
      description: "Obsługa plików o większym rozmiarze z mechanizmem podziału",
      icon: Database,
    },
    {
      title: "Wgrywanie z chmury",
      description: "Wgrywaj pliki z Google Drive, Dropbox i innych źródeł",
      icon: Cloud,
    },
  ];

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Dodatkowe opcje wgrywania</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {options.map((option) => (
          <Card
            key={option.title}
            className="p-4 hover:bg-accent cursor-pointer transition-colors"
            onClick={() => handleOptionClick(option.title)}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <option.icon className="h-8 w-8 text-primary" />
              <h4 className="font-medium">{option.title}</h4>
              <p className="text-sm text-muted-foreground">{option.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}