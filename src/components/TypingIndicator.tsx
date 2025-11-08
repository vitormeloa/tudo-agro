'use client';

export const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-muted/50 rounded-2xl w-fit">
      <div className="flex gap-1">
        <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
};
