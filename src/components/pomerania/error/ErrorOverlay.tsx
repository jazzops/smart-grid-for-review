
import React from 'react';

interface ErrorOverlayProps {
  message: string;
}

export const ErrorOverlay = ({ message }: ErrorOverlayProps) => {
  return (
    <div 
      className="absolute inset-0 flex items-center justify-center"
      role="alert"
    >
      <div className="text-red-500 text-center p-4 bg-background/95 rounded-lg">
        <div className="font-bold mb-2">Błąd</div>
        <div>{message}</div>
      </div>
    </div>
  );
};

