
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MessageAvatarProps {
  role: "user" | "assistant";
}

export function MessageAvatar({ role }: MessageAvatarProps) {
  return (
    <Avatar className="mt-1">
      {role === "assistant" ? (
        <AvatarImage src="/lovable-uploads/045f69f0-5424-4c58-a887-6e9e984d428b.png" />
      ) : null}
      <AvatarFallback>
        {role === "assistant" ? "AI" : "Ty"}
      </AvatarFallback>
    </Avatar>
  );
}
