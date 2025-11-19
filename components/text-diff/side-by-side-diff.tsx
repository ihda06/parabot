import { type DiffResult } from "@/lib/text-diff";
import Show from "@/components/ui/show";
import { WordHighlight } from "./word-highlight";

interface SideBySideDiffProps {
  diffResult: DiffResult;
}

interface SideBySideLine {
  left: {
    content: string;
    lineNumber?: number;
    type: "removed" | "unchanged" | "empty";
  };
  right: {
    content: string;
    lineNumber?: number;
    type: "added" | "unchanged" | "empty";
  };
}

function prepareSideBySideLines(diffResult: DiffResult): SideBySideLine[] {
  const sideBySideLines: SideBySideLine[] = [];
  const lines = diffResult.lines;

  let i = 0;
  while (i < lines.length) {
    const currentLine = lines[i];

    if (currentLine.type === "unchanged") {
      // Unchanged lines appear on both sides
      sideBySideLines.push({
        left: {
          content: currentLine.content,
          lineNumber: currentLine.oldLineNumber,
          type: "unchanged",
        },
        right: {
          content: currentLine.content,
          lineNumber: currentLine.newLineNumber,
          type: "unchanged",
        },
      });
      i++;
    } else if (currentLine.type === "removed") {
      // Check if next line is an added line (modification)
      const nextLine = i + 1 < lines.length ? lines[i + 1] : null;
      if (nextLine && nextLine.type === "added") {
        // Modification: show removed on left, added on right
        sideBySideLines.push({
          left: {
            content: currentLine.content,
            lineNumber: currentLine.oldLineNumber,
            type: "removed",
          },
          right: {
            content: nextLine.content,
            lineNumber: nextLine.newLineNumber,
            type: "added",
          },
        });
        i += 2;
      } else {
        // Deletion: show removed on left, empty on right
        sideBySideLines.push({
          left: {
            content: currentLine.content,
            lineNumber: currentLine.oldLineNumber,
            type: "removed",
          },
          right: {
            content: "",
            type: "empty",
          },
        });
        i++;
      }
    } else if (currentLine.type === "added") {
      // Addition: show empty on left, added on right
      sideBySideLines.push({
        left: {
          content: "",
          type: "empty",
        },
        right: {
          content: currentLine.content,
          lineNumber: currentLine.newLineNumber,
          type: "added",
        },
      });
      i++;
    }
  }

  return sideBySideLines;
}

export function SideBySideDiff({ diffResult }: SideBySideDiffProps) {
  const sideBySideLines = prepareSideBySideLines(diffResult);

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

      {/* Side-by-Side Diff Display */}
      <div className="relative max-h-[600px] overflow-auto rounded-lg border-2 border-border/50 bg-muted/30">
        <div className="sticky top-0 z-10 bg-muted/95 backdrop-blur-sm border-b border-border/50 grid grid-cols-2 text-xs font-mono text-muted-foreground">
          <div className="px-4 py-2 border-r border-border/50">
            <div className="flex items-center justify-between">
              <span>Original</span>
              <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-600 dark:text-red-400">
                -Removed
              </span>
            </div>
          </div>
          <div className="px-4 py-2">
            <div className="flex items-center justify-between">
              <span>New</span>
              <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-600 dark:text-green-400">
                +Added
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 font-mono text-sm">
          {sideBySideLines.map((line, index) => {
            const leftBgColor =
              line.left.type === "removed"
                ? "bg-red-500/10 dark:bg-red-500/20"
                : line.left.type === "unchanged"
                ? "bg-transparent"
                : "bg-muted/20";
            const leftBorderColor =
              line.left.type === "removed"
                ? "border-l-4 border-red-500"
                : "border-l-4 border-transparent";
            const leftTextColor =
              line.left.type === "removed"
                ? "text-red-700 dark:text-red-300"
                : "text-foreground";

            const rightBgColor =
              line.right.type === "added"
                ? "bg-green-500/10 dark:bg-green-500/20"
                : line.right.type === "unchanged"
                ? "bg-transparent"
                : "bg-muted/20";
            const rightBorderColor =
              line.right.type === "added"
                ? "border-l-4 border-green-500"
                : "border-l-4 border-transparent";
            const rightTextColor =
              line.right.type === "added"
                ? "text-green-700 dark:text-green-300"
                : "text-foreground";

            return (
              <div key={index} className="contents">
                {/* Left side - Original */}
                <div
                  className={`${leftBgColor} ${leftBorderColor} ${leftTextColor} px-4 py-1 border-r border-border/50 flex items-start gap-4 hover:bg-opacity-20 transition-colors`}
                >
                  <div className="shrink-0 w-12 text-right text-xs text-muted-foreground pt-0.5">
                    <Show when={!!line.left.lineNumber}>
                      {line.left.lineNumber}
                    </Show>
                    <Show when={line.left.type === "removed"}>
                      <span className="text-red-600 dark:text-red-400">-</span>
                    </Show>
                  </div>
                  <div className="flex-1 min-w-0">
                    <Show
                      when={!!line.left.content}
                      fallback={
                        <span className="text-muted-foreground/50"> </span>
                      }
                    >
                      {line.left.type === "removed" &&
                      line.right.type === "added" ? (
                        <WordHighlight
                          oldText={line.left.content}
                          newText={line.right.content}
                          type="removed"
                        />
                      ) : (
                        line.left.content
                      )}
                    </Show>
                  </div>
                </div>

                {/* Right side - New */}
                <div
                  className={`${rightBgColor} ${rightBorderColor} ${rightTextColor} px-4 py-1 flex items-start gap-4 hover:bg-opacity-20 transition-colors`}
                >
                  <div className="shrink-0 w-12 text-right text-xs text-muted-foreground pt-0.5">
                    <Show when={!!line.right.lineNumber}>
                      {line.right.lineNumber}
                    </Show>
                    <Show when={line.right.type === "added"}>
                      <span className="text-green-600 dark:text-green-400">
                        +
                      </span>
                    </Show>
                  </div>
                  <div className="flex-1 min-w-0">
                    <Show
                      when={!!line.right.content}
                      fallback={
                        <span className="text-muted-foreground/50"> </span>
                      }
                    >
                      {line.left.type === "removed" &&
                      line.right.type === "added" ? (
                        <WordHighlight
                          oldText={line.left.content}
                          newText={line.right.content}
                          type="added"
                        />
                      ) : (
                        line.right.content
                      )}
                    </Show>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
