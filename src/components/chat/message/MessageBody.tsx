
interface MessageBodyProps {
  content: string;
  role: "user" | "assistant";
}

export function MessageBody({ content, role }: MessageBodyProps) {
  return (
    <div
      className={`rounded-lg p-3 ${
        role === "assistant"
          ? "bg-muted text-foreground"
          : "bg-primary text-primary-foreground"
      }`}
    >
      <div className="whitespace-pre-wrap">{content}</div>
    </div>
  );
}
