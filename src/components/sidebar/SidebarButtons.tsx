import { Button } from "@/components/ui/button";
import { Plus, Bot } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface SidebarButtonsProps {
  collapsed?: boolean;
  handleAddCompany: () => void;
}

export function SidebarButtons({ collapsed, handleAddCompany }: SidebarButtonsProps) {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const currentHash = location.hash.slice(1);
  const isAIAssistantVisible = ['insights', 'status', 'sensors'].includes(currentHash);

  const handleOpenAssistant = () => {
    if (!isAIAssistantVisible) {
      toast({
        title: "Asystent AI",
        description: "Asystent AI jest dostępny tylko w sekcjach Analiza, Status i Czujniki.",
        variant: "destructive"
      });
      return;
    }
    navigate('/assistant');
  };

  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        className={`w-full justify-start ${collapsed ? "px-2" : ""}`}
        onClick={handleAddCompany}
      >
        <Plus className="h-4 w-4 mr-2" />
        {!collapsed && <span>Dodaj firmę</span>}
      </Button>
      <Button
        variant="outline"
        className={`w-full justify-start ${collapsed ? "px-2" : ""} ${!isAIAssistantVisible ? 'opacity-50' : ''}`}
        onClick={handleOpenAssistant}
      >
        <Bot className="h-4 w-4 mr-2" />
        {!collapsed && <span>Asystent AI</span>}
      </Button>
    </div>
  );
}