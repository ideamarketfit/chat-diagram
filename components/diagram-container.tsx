import React, { ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, X } from 'lucide-react';

interface DiagramContainerProps {
  title: string;
  onClose: () => void;
  showBackButton?: boolean;
  children: ReactNode;
  diagramDefinition: string;
}

const DiagramContainer = ({
  title,
  onClose,
  showBackButton = false,
  children,
  diagramDefinition
}: DiagramContainerProps) => {
  const handleExportDiagram = async () => {
    try {
      const response = await fetch(`/api/diagram-to-image?diagramDefinition=${encodeURIComponent(diagramDefinition)}&diagramTitle=${encodeURIComponent(title)}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to generate diagram');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `${title || 'diagram'}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting diagram:', error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-muted p-4 rounded-lg m-4 shadow-lg relative">
      {/* Diagram Panel Header */}
      <div className="flex items-center justify-between mx-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleExportDiagram}>
            <Download className="h-4 w-4" />
            <span className="sr-only">Export diagram</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close diagram</span>
          </Button>
        </div>
      </div>
      
      {/* Diagram Content */}
      <div className="flex-grow flex items-center justify-center overflow-auto">
        {children}
      </div>

      {/* Back Button - Mobile Only */}
      {showBackButton && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="md:hidden absolute bottom-4 left-4"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back to chat</span>
        </Button>
      )}
    </div>
  );
};

export default DiagramContainer; 