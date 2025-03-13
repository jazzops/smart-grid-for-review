import { Card } from "@/components/ui/card";
import { List } from "lucide-react";

interface TopicsListProps {
  topics: string[];
}

export function TopicsList({ topics }: TopicsListProps) {
  if (!topics.length) return null;

  return (
    <Card className="p-4 mt-4">
      <div className="flex items-center gap-2 mb-2">
        <List className="h-4 w-4" />
        <h4 className="text-sm font-medium">Główne zagadnienia:</h4>
      </div>
      <ul className="space-y-1">
        {topics.map((topic, index) => (
          <li key={index} className="text-sm text-muted-foreground pl-6">
            {topic}
          </li>
        ))}
      </ul>
    </Card>
  );
}