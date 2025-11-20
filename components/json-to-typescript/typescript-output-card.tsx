"use client";

import { Code2, Copy, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Show from "@/components/ui/show";

interface TypeScriptOutputCardProps {
  output: string | null | undefined;
  error: string | null | undefined;
  copied: boolean;
  onCopy: () => void;
}

export function TypeScriptOutputCard({
  output,
  error,
  copied,
  onCopy,
}: TypeScriptOutputCardProps) {
  return (
    <Card className="flex flex-col h-full border-2 border-border/50 shadow-lg shadow-black/5 dark:shadow-black/20 bg-linear-to-br from-card via-card to-card/95 overflow-hidden">
      <CardHeader className="border-b border-border/40 bg-linear-to-r from-muted/30 via-transparent to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted/50 border border-border/50">
              <Code2 className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold leading-none tracking-tight">
                TypeScript Output
              </h2>
              <CardDescription className="text-xs mt-1.5">
                Generated TypeScript interface/type
              </CardDescription>
            </div>
          </div>
          <Show when={!!output}>
            <Button
              variant="outline"
              size="sm"
              onClick={onCopy}
              className="text-xs"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </Show>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0 p-6">
        <Show
          when={!!output}
          fallback={
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center flex-1">
              <div className="p-4 rounded-full bg-muted/50 mb-4">
                <Code2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm max-w-md mb-4">
                {error
                  ? error
                  : "Enter JSON in the left field to generate TypeScript types."}
              </p>
              <Show when={!error}>
                <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-border/50 text-left max-w-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span className="text-sm font-semibold">Features:</span>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-2">
                    <div>✓ Automatic type inference</div>
                    <div>✓ Nested object support</div>
                    <div>✓ Array type detection</div>
                    <div>✓ Valid identifier handling</div>
                  </div>
                </div>
              </Show>
            </div>
          }
        >
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-auto rounded-lg bg-muted/30 border border-border/50 p-4">
              <pre className="text-sm font-mono text-foreground whitespace-pre-wrap wrap-break-word">
                <code>{output}</code>
              </pre>
            </div>
          </div>
        </Show>
      </CardContent>
    </Card>
  );
}

