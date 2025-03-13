
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronLeft, ChevronRight, Plus, Bot, Search, MessageSquare } from "lucide-react";
import { companiesData } from "@/data/companies";
import { create } from "zustand";
import { Button } from "@/components/ui/button";
import { CompanyStoreState } from "@/types/company";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import { CompanyActions } from "@/components/company/CompanyActions";

export const useCompanyStore = create<CompanyStoreState>((set) => ({
  selectedCompany: null,
  selectedCompanyId: "1",
  setSelectedCompany: (company) => set({ selectedCompany: company }),
  setSelectedCompanyId: (id) => set({ selectedCompanyId: id }),
}));

interface CompanySidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function CompanySidebar({ isOpen, onClose }: CompanySidebarProps) {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedCompanyId, setSelectedCompanyId } = useCompanyStore();
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const currentHash = location.hash.slice(1);
  const isAIAssistantVisible = ['insights', 'status', 'sensors'].includes(currentHash);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen && onClose) {
      onClose();
    }
  };

  const filteredCompanies = companiesData.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Sheet open={isOpen !== undefined ? isOpen : open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <SidebarContent 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredCompanies={filteredCompanies}
          isAIAssistantVisible={isAIAssistantVisible}
          navigate={navigate}
        />
      </SheetContent>
      <aside className={`fixed left-0 top-0 z-30 h-screen transition-all duration-300 bg-background border-r ${collapsed ? "w-[60px]" : "w-[300px]"} hidden lg:block`}>
        <Button
          variant="ghost"
          onClick={toggleCollapse}
          className="absolute -right-4 top-4 z-50 flex items-center gap-2"
        >
          {collapsed ? (
            <>
              <ChevronRight className="h-4 w-4" />
              <span className="text-sm">Rozwiń</span>
            </>
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span className="text-sm">Zwiń</span>
            </>
          )}
        </Button>
        <SidebarContent 
          collapsed={collapsed}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredCompanies={filteredCompanies}
          isAIAssistantVisible={isAIAssistantVisible}
          navigate={navigate}
        />
      </aside>
    </Sheet>
  );
}

interface SidebarContentProps {
  collapsed?: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredCompanies: typeof companiesData;
  isAIAssistantVisible: boolean;
  navigate: (path: string) => void;
}

function SidebarContent({ 
  collapsed = false,
  searchQuery,
  setSearchQuery,
  isAIAssistantVisible,
  navigate
}: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col gap-4">
      {!collapsed && (
        <div className="p-6">
          <h2 className="text-lg font-semibold">Projekty</h2>
          <p className="text-sm text-muted-foreground">
            Wybierz projekt do monitorowania
          </p>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Szukaj projektów..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="mt-4">
            <CompanyActions />
          </div>
        </div>
      )}
      <ScrollArea className="flex-1">
        <div className="space-y-4 p-4">
          <Button
            variant="outline"
            className={`mt-2 rounded ${
              collapsed ? "w-10 p-2 bg-gray-100" : "w-full bg-[#00A36C]"
            } text-white`}
            onClick={() => navigate('/assistant')}
          >
            <MessageSquare className="w-4 h-4" />
            {!collapsed && <span className="ml-2">Asystent AI</span>}
          </Button>
        </div>
      </ScrollArea>
      {!collapsed && (
        <>
          <Separator />
          <div className="p-4">
            <p className="text-xs text-muted-foreground">
              Ostatnia aktualizacja: {new Date().toLocaleString()}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
