import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, MinusCircle, RotateCcw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { companiesData } from "@/data/companies";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useCompanyStore } from "@/components/CompanySidebar";
import { Separator } from "@/components/ui/separator";
import { CompanyStats, Company } from "@/types/company";
import { Activity, Battery, Cpu, DollarSign, Flame, Gauge, Power, Timer, Wifi, Zap } from "lucide-react";

export function CompanyActions() {
  const [newProjectName, setNewProjectName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { setSelectedCompanyId } = useCompanyStore();
  const [archivedProjects, setArchivedProjects] = useState<typeof companiesData>([]);

  const defaultStats: CompanyStats[] = [
    {
      title: "PM2.5",
      value: "0.6",
      unit: "µg/m³",
      icon: Activity,
      description: "↗️ +2.1% od ostatniego pomiaru",
      details: [
        { label: "Norma WHO", value: "10 µg/m³" },
        { label: "Norma EU", value: "25 µg/m³" },
        { label: "Średnia 24h", value: "0.6 µg/m³" },
      ],
    },
    {
      title: "PM10",
      value: "7.8",
      unit: "µg/m³",
      icon: Battery,
      description: "↘️ -1.2% od ostatniej godziny",
      details: [
        { label: "Norma WHO", value: "20 µg/m³" },
        { label: "Norma EU", value: "50 µg/m³" },
        { label: "Średnia 24h", value: "7.8 µg/m³" },
      ],
    },
    {
      title: "O₃ (Ozon)",
      value: "97.8",
      unit: "µg/m³",
      icon: Cpu,
      description: "↗️ +1.5% od ostatniego odczytu",
      details: [
        { label: "Norma WHO", value: "100 µg/m³" },
        { label: "Norma EU", value: "120 µg/m³" },
        { label: "Średnia 8h", value: "97.8 µg/m³" },
      ],
    },
    {
      title: "NO₂",
      value: "21.1",
      unit: "µg/m³",
      icon: Gauge,
      description: "↘️ -0.8% od ostatniej godziny",
      details: [
        { label: "Norma WHO", value: "40 µg/m³" },
        { label: "Norma EU", value: "40 µg/m³" },
        { label: "Średnia roczna", value: "21.1 µg/m³" },
      ],
    },
    {
      title: "SO₂",
      value: "19.6",
      unit: "µg/m³",
      icon: Power,
      description: "Stabilny poziom",
      details: [
        { label: "Norma WHO", value: "20 µg/m³" },
        { label: "Norma EU", value: "125 µg/m³" },
        { label: "Średnia 24h", value: "19.6 µg/m³" },
      ],
    },
    {
      title: "CO",
      value: "2117",
      unit: "µg/m³",
      icon: Zap,
      description: "Dobry poziom",
      details: [
        { label: "Norma EU", value: "10000 µg/m³" },
        { label: "Średnia 8h", value: "2117 µg/m³" },
        { label: "Trend", value: "Stabilny" },
      ],
    },
    {
      title: "Indeks CAQI",
      value: "27.3",
      unit: "",
      icon: DollarSign,
      description: "Dobra jakość powietrza",
      details: [
        { label: "Interpretacja", value: "Dobra" },
        { label: "Zalecenia", value: "Można przebywać na zewnątrz" },
        { label: "Trend", value: "Stabilny" },
      ],
    },
    {
      title: "Wilgotność",
      value: "54.7",
      unit: "%",
      icon: Flame,
      description: "Optymalna wilgotność",
      details: [
        { label: "Min 24h", value: "45%" },
        { label: "Max 24h", value: "65%" },
        { label: "Średnia", value: "54.7%" },
      ],
    },
  ];

  const handleAddProject = () => {
    if (!newProjectName.trim()) {
      toast({
        title: "Błąd",
        description: "Nazwa projektu nie może być pusta",
        variant: "destructive",
      });
      return;
    }

    const newProject: Company = {
      id: (companiesData.length + 1).toString(),
      name: newProjectName,
      description: "Nowy projekt monitorowania jakości powietrza",
      logo: "/logo-demo.png",
      energyData: [],
      stats: defaultStats,
    };

    companiesData.push(newProject);
    setSelectedCompanyId(newProject.id);
    
    toast({
      title: "Sukces",
      description: `Projekt "${newProjectName}" został dodany`,
    });

    setNewProjectName("");
    setIsDialogOpen(false);
  };

  const handleArchiveProject = (project: (typeof companiesData)[0]) => {
    const index = companiesData.findIndex(c => c.id === project.id);
    if (index !== -1) {
      const [removedProject] = companiesData.splice(index, 1);
      setArchivedProjects(prev => [...prev, removedProject]);
      
      if (companiesData.length > 0) {
        setSelectedCompanyId(companiesData[0].id);
      }
      
      toast({
        title: "Zarchiwizowano",
        description: `Projekt "${project.name}" został zarchiwizowany`,
      });
    }
  };

  const handleRestoreProject = (project: (typeof companiesData)[0]) => {
    const index = archivedProjects.findIndex(c => c.id === project.id);
    if (index !== -1) {
      const [restoredProject] = archivedProjects.splice(index, 1);
      companiesData.push(restoredProject);
      setArchivedProjects([...archivedProjects]);
      setSelectedCompanyId(restoredProject.id);
      
      toast({
        title: "Przywrócono",
        description: `Projekt "${project.name}" został przywrócony`,
      });
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col sm:flex-row gap-2">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Dodaj projekt
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dodaj nowy projekt</DialogTitle>
              <DialogDescription>
                Wprowadź nazwę dla nowego projektu monitorowania jakości powietrza.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Input
                  placeholder="Nazwa projektu"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                />
              </div>
              <Button onClick={handleAddProject} className="w-full">
                Dodaj
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {companiesData.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Aktywne projekty</h3>
          <ul className="space-y-2">
            {companiesData.map((project) => (
              <li
                key={project.id}
                className="flex items-center justify-between text-sm text-muted-foreground"
              >
                <span>{project.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleArchiveProject(project)}
                >
                  <MinusCircle className="h-4 w-4 text-red-500" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {archivedProjects.length > 0 && (
        <div className="mt-4">
          <Separator className="my-4" />
          <h3 className="text-sm font-medium mb-2">Zarchiwizowane projekty</h3>
          <ul className="space-y-2">
            {archivedProjects.map((project) => (
              <li
                key={project.id}
                className="flex items-center justify-between text-sm text-muted-foreground"
              >
                <span>{project.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleRestoreProject(project)}
                >
                  <RotateCcw className="h-4 w-4 text-green-500" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
