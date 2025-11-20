"use client";

import { Textarea } from "@/components/ui/textarea";

interface JsonTextareaProps {
  value: string;
  onChange: (value: string) => void;
  errorLineNumber: number | null;
  lineHeight?: string;
  minHeight?: string;
}

export function JsonTextarea({
  value,
  onChange,
  errorLineNumber,
  lineHeight = "1.5rem",
  minHeight = "400px",
}: JsonTextareaProps) {
  const lines = value.split("\n");

  return (
    <div className="relative flex h-full border-2 border-input rounded-md focus-within:border-accent/50 transition-colors overflow-hidden">
      <div
        className="shrink-0 py-2 px-3 bg-muted/30 border-r border-border/50 text-right text-xs text-muted-foreground font-mono select-none overflow-y-auto"
        style={{ maxHeight: "100%" }}
      >
        {lines.map((_, index) => {
          const lineNumber = index + 1;
          const isErrorLine = errorLineNumber === lineNumber;
          return (
            <div
              key={index}
              style={{ lineHeight }}
              className={`text-center ${
                isErrorLine
                  ? "bg-red-500/20 text-red-500 font-semibold"
                  : ""
              }`}
            >
              {lineNumber}
            </div>
          );
        })}
      </div>
      <Textarea
        placeholder="Paste your JSON here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={(e) => {
          const target = e.target as HTMLTextAreaElement;
          const lineNumbers =
            target.previousElementSibling as HTMLElement;
          if (lineNumbers) {
            lineNumbers.scrollTop = target.scrollTop;
          }
        }}
        className="font-mono text-sm resize-none h-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-l-none flex-1"
        style={{
          lineHeight,
          minHeight,
        }}
      />
    </div>
  );
}

