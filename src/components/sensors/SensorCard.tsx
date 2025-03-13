
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SensorIcon, SensorIconType } from "./SensorIcon";

interface SensorCardProps {
  iconType: SensorIconType;
  name: string;
  value: string;
  unit: string;
  status: "Good" | "Warning";
  description: string;
}

export const SensorCard = ({ iconType, name, value, unit, status, description }: SensorCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="p-4 transition-all duration-200 hover:shadow-md">
            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="w-full space-y-2"
            >
              <div className="flex items-center gap-3">
                <div className="text-muted-foreground">
                  <SensorIcon type={iconType} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{name}</span>
                    <Badge
                      variant="outline"
                      className={`${
                        status === "Good"
                          ? "bg-green-500/10 text-green-500 border-green-500/20"
                          : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                      }`}
                    >
                      {status}
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-semibold">{value}</span>
                    <span className="text-sm text-muted-foreground">{unit}</span>
                  </div>
                </div>
                <CollapsibleTrigger className="lg:hidden">
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="lg:hidden space-y-2">
                <div className="text-sm text-muted-foreground pt-2 border-t">
                  {description}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </TooltipTrigger>
        <TooltipContent className="max-w-[300px] text-sm hidden lg:block">
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
