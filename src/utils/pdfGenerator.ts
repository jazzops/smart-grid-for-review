import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Company } from '@/types/company';

export const generatePDF = (company: Company | undefined) => {
  if (!company) return;

  // Create PDF with support for Polish characters
  const doc = new jsPDF();
  
  // Add font that supports Polish characters
  doc.setFont("helvetica");
  
  // Add title
  doc.setFontSize(20);
  doc.text(`Raport - ${company.name}`, 20, 20);
  
  // Add energy data table
  doc.setFontSize(16);
  doc.text('Dane energetyczne', 20, 40);
  
  const energyTableData = company.energyData.map(data => [
    data.name,
    data.consumption.toString(),
    data.production.toString(),
    data.efficiency.toString()
  ]);

  autoTable(doc, {
    head: [['Okres', 'Zużycie', 'Produkcja', 'Wydajność']],
    body: energyTableData,
    startY: 45,
    styles: {
      font: 'helvetica',
      fontStyle: 'normal'
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      font: 'helvetica',
      fontStyle: 'bold'
    }
  });

  // Add statistics
  const currentY = (doc as any).lastAutoTable.finalY + 20;
  doc.setFontSize(16);
  doc.text('Statystyki', 20, currentY);

  const statsData = company.stats.map(stat => [
    stat.title,
    `${stat.value}${stat.unit || ''}`
  ]);

  autoTable(doc, {
    head: [['Wskaźnik', 'Wartość']],
    body: statsData,
    startY: currentY + 5,
    styles: {
      font: 'helvetica',
      fontStyle: 'normal'
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      font: 'helvetica',
      fontStyle: 'bold'
    }
  });

  // Save the PDF
  doc.save(`raport-${company.name.toLowerCase().replace(/\s+/g, '-')}.pdf`);
};