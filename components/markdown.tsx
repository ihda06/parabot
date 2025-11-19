"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MarkdownProps {
  content: string;
  className?: string;
}

export function Markdown({ content, className }: MarkdownProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <div
        className={cn(
          "markdown-content space-y-4 text-sm",
          "[&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mt-6 [&>h1]:mb-4",
          "[&>h2]:text-xl [&>h2]:font-bold [&>h2]:mt-5 [&>h2]:mb-3",
          "[&>h3]:text-lg [&>h3]:font-semibold [&>h3]:mt-4 [&>h3]:mb-2",
          "[&>p]:mb-3 [&>p]:leading-relaxed",
          "[&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4 [&>ul]:space-y-1",
          "[&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-4 [&>ol]:space-y-1",
          "[&>li]:mb-1",
          "[&>blockquote]:border-l-4 [&>blockquote]:border-muted-foreground [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-4",
          "[&>code]:bg-muted [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono",
          "[&>pre]:bg-muted [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:my-4",
          "[&>pre>code]:bg-transparent [&>pre>code]:p-0",
          "[&>strong]:font-semibold",
          "[&>em]:italic",
          "[&>a]:text-primary [&>a]:underline [&>a]:hover:text-primary/80",
          "[&_table]:w-full [&_table]:border-collapse [&_table]:my-4 [&_table]:min-w-full",
          "[&_thead]:border-b-2 [&_thead]:border-border [&_thead]:bg-muted/30",
          "[&_tbody_tr:not(:last-child)]:border-b [&_tbody_tr:not(:last-child)]:border-border",
          "[&_tr]:hover:bg-muted/30 [&_tr]:transition-colors",
          "[&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-semibold [&_th]:bg-muted/50 [&_th]:text-foreground [&_th]:align-top",
          "[&_td]:px-4 [&_td]:py-2 [&_td]:text-foreground [&_td]:align-top"
        )}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
