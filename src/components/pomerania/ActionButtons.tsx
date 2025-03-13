
import { Button } from "@/components/ui/button";
import { Plus, Minus, Search } from "lucide-react";

interface ActionButtonsProps {
  onAddClick: () => void;
  onRemoveClick: () => void;
  onSearchClick: () => void;
}

export function ActionButtons({ onAddClick, onRemoveClick, onSearchClick }: ActionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={onAddClick} className="flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Dodaj czujnik
      </Button>
      <Button onClick={onRemoveClick} variant="outline" className="flex items-center gap-2">
        <Minus className="w-4 h-4" />
        Usuń czujnik
      </Button>
      <Button onClick={onSearchClick} variant="secondary" className="flex items-center gap-2">
        <Search className="w-4 h-4" />
        Wyszukaj czujnik
      </Button>
    </div>
  );
}
