
import React from 'react';
import { CardHeader, CardTitle } from "@/components/ui/card";

interface MapHeaderProps {
  title: string;
}

export function MapHeader({ title }: MapHeaderProps) {
  return (
    <CardHeader className="pb-3">
      <CardTitle className="text-xl font-bold">{title}</CardTitle>
    </CardHeader>
  );
}
