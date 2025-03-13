
import React from 'react';
import { RefreshCw } from 'lucide-react';

interface LoadingOverlayProps {
  loaded: number;
  total: number;
}

export const LoadingOverlay = ({ loaded, total }: LoadingOverlayProps) => {
  return (
    <div 
      className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      role="alert"
      aria-busy="true"
    >
      <div className="text-center">
        <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
        <div className="text-sm text-gray-500">
          Ładowanie czujników... ({loaded}/{total})
        </div>
      </div>
    </div>
  );
};

