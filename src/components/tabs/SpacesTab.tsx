
import { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { PowerStats } from "@/components/dashboard/PowerStats";
import { AirQualityChart } from "@/components/dashboard/AirQualityChart";
import { DeviceStatus } from "@/components/network/DeviceStatus";
import { NetworkMap } from "@/components/network/NetworkMap";
import { FailureAnalysis } from "@/components/network/FailureAnalysis";
import EnergyMap from "@/components/map/EnergyMap";
import { FileUpload } from "@/components/FileUpload";
import { Chatbot } from "@/components/Chatbot";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from 'react-i18next';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function SpacesTab() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const spacesRef = useRef<HTMLDivElement>(null);

  const handleExport = async (format: 'pdf' | 'jpg') => {
    if (!spacesRef.current) return;

    try {
      const canvas = await html2canvas(spacesRef.current);
      
      if (format === 'pdf') {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('przestrzenie-export.pdf');
        
        toast({
          title: "Eksport zakończony",
          description: "Plik PDF został pobrany",
        });
      } else {
        const link = document.createElement('a');
        link.download = 'przestrzenie-export.jpg';
        link.href = canvas.toDataURL('image/jpeg');
        link.click();
        
        toast({
          title: "Eksport zakończony",
          description: "Plik JPG został pobrany",
        });
      }
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Błąd eksportu",
        description: "Nie udało się wyeksportować sekcji",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-end gap-2 mb-4">
        <Button
          variant="outline"
          onClick={() => handleExport('jpg')}
        >
          Eksportuj do JPG
        </Button>
        <Button
          variant="outline"
          onClick={() => handleExport('pdf')}
        >
          Eksportuj do PDF
        </Button>
      </div>
      <div ref={spacesRef}>
        <DndContext collisionDetection={closestCenter}>
          <SortableContext items={[]} strategy={rectSortingStrategy}>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <PowerStats />
            </div>
          </SortableContext>
        </DndContext>

        <div className="grid gap-6 p-8">
          <AirQualityChart />
        </div>

        <div className="grid gap-6 p-8">
          <DeviceStatus />
        </div>

        {/* Commented out section for NetworkMap
        <div className="grid gap-6 p-8">
          <NetworkMap />
        </div>
        */}

        <div className="grid gap-6 p-8">
          <FailureAnalysis />
        </div>

        {/* Commented out section for EnergyMap
        <div className="grid gap-6 p-8">
          <EnergyMap />
        </div>
        */}

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-4">{t('Wgraj pliki')}</h2>
            <FileUpload />
          </div>
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-4">{t('Asystent AI')}</h2>
            <Chatbot />
          </div>
        </div>
      </div>
    </div>
  );
}
