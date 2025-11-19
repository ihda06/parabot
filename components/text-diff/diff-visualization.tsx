import { type DiffResult, type DiffLine } from "@/lib/text-diff";
import Show from "@/components/ui/show";
import { WordHighlight } from "./word-highlight";

interface DiffVisualizationProps {
  diffResult: DiffResult;
}

export function UnifiedDiff({ diffResult }: DiffVisualizationProps) {
  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-green-600 dark:text-green-400 font-medium">
            +{diffResult.stats.added} added
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-red-600 dark:text-red-400 font-medium">
            -{diffResult.stats.removed} removed
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50">
          <div className="h-2 w-2 rounded-full bg-muted-foreground" />
          <span className="text-muted-foreground font-medium">
            {diffResult.stats.unchanged} unchanged
          </span>
        </div>
      </div>

      {/* Diff Display */}
      <div className="relative max-h-[600px] overflow-auto rounded-lg border-2 border-border/50 bg-muted/30">
        <div className="sticky top-0 z-10 bg-muted/95 backdrop-blur-sm border-b border-border/50 px-4 py-2 flex items-center justify-between text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Line</span>
            <span>Content</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-600 dark:text-green-400">
              +Added
            </span>
            <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-600 dark:text-red-400">
              -Removed
            </span>
          </div>
        </div>
        <div className="font-mono text-sm">
          {diffResult.lines.map((line: DiffLine, index: number) => {
            const bgColor =
              line.type === "added"
                ? "bg-green-500/10 dark:bg-green-500/20"
                : line.type === "removed"
                ? "bg-red-500/10 dark:bg-red-500/20"
                : "bg-transparent";
            const borderColor =
              line.type === "added"
                ? "border-l-4 border-green-500"
                : line.type === "removed"
                ? "border-l-4 border-red-500"
                : "border-l-4 border-transparent";
            const textColor =
              line.type === "added"
                ? "text-green-700 dark:text-green-300"
                : line.type === "removed"
                ? "text-red-700 dark:text-red-300"
                : "text-foreground";

            return (
              <div
                key={index}
                className={`${bgColor} ${borderColor} ${textColor} px-4 py-1 flex items-start gap-4 hover:bg-opacity-20 transition-colors`}
              >
                <div className="shrink-0 w-16 text-right text-xs text-muted-foreground pt-0.5">
                  <Show when={line.type === "added"}>
                    <span className="text-green-600 dark:text-green-400">
                      +{line.newLineNumber}
                    </span>
                  </Show>
                  <Show when={line.type === "removed"}>
                    <span className="text-red-600 dark:text-red-400">
                      -{line.oldLineNumber}
                    </span>
                  </Show>
                  <Show when={line.type === "unchanged"}>
                    <span>
                      {line.oldLineNumber === line.newLineNumber
                        ? line.oldLineNumber
                        : `${line.oldLineNumber}→${line.newLineNumber}`}
                    </span>
                  </Show>
                </div>
                <div className="flex-1 min-w-0">
                  <Show
                    when={!!line.content}
                    fallback={
                      <span className="text-muted-foreground/50"> </span>
                    }
                  >
                    {line.type === "added" ? (
                      <WordHighlight
                        oldText=""
                        newText={line.content}
                        type="added"
                      />
                    ) : line.type === "removed" ? (
                      <WordHighlight
                        oldText={line.content}
                        newText=""
                        type="removed"
                      />
                    ) : (
                      line.content
                    )}
                  </Show>
                </div>
                <div className="shrink-0 w-8 text-center text-xs text-muted-foreground">
                  <Show when={line.type === "added"}>
                    <span className="text-green-600 dark:text-green-400">
                      +
                    </span>
                  </Show>
                  <Show when={line.type === "removed"}>
                    <span className="text-red-600 dark:text-red-400">-</span>
                  </Show>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
