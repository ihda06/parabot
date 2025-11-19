import { diffLines, diffWords, Change } from "diff";

export interface DiffLine {
  lineNumber: number;
  content: string;
  type: "added" | "removed" | "unchanged";
  oldLineNumber?: number;
  newLineNumber?: number;
}

export interface DiffResult {
  lines: DiffLine[];
  stats: {
    added: number;
    removed: number;
    unchanged: number;
    total: number;
  };
}

/**
 * Compute diff between two text strings and format for display
 */
export function computeDiff(oldText: string, newText: string): DiffResult {
  const changes = diffLines(oldText, newText);
  const lines: DiffLine[] = [];
  let oldLineNumber = 1;
  let newLineNumber = 1;
  let addedCount = 0;
  let removedCount = 0;
  let unchangedCount = 0;

  for (const change of changes) {
    const changeLines = change.value.split("\n");
    // Remove the last empty line if it exists (from split)
    if (changeLines.length > 0 && changeLines[changeLines.length - 1] === "") {
      changeLines.pop();
    }

    if (change.added) {
      // Added lines - only increment new line number
      for (const line of changeLines) {
        lines.push({
          lineNumber: newLineNumber,
          content: line,
          type: "added",
          newLineNumber: newLineNumber++,
        });
        addedCount++;
      }
    } else if (change.removed) {
      // Removed lines - only increment old line number
      for (const line of changeLines) {
        lines.push({
          lineNumber: oldLineNumber,
          content: line,
          type: "removed",
          oldLineNumber: oldLineNumber++,
        });
        removedCount++;
      }
    } else {
      // Unchanged lines - increment both line numbers
      for (const line of changeLines) {
        lines.push({
          lineNumber: newLineNumber,
          content: line,
          type: "unchanged",
          oldLineNumber: oldLineNumber++,
          newLineNumber: newLineNumber++,
        });
        unchangedCount++;
      }
    }
  }

  return {
    lines,
    stats: {
      added: addedCount,
      removed: removedCount,
      unchanged: unchangedCount,
      total: lines.length,
    },
  };
}

/**
 * Get word-level diff for a line (for highlighting changes within unchanged context)
 */
export function getWordDiff(oldLine: string, newLine: string): Change[] {
  return diffWords(oldLine, newLine);
}

/**
 * Word diff result for rendering
 */
export interface WordDiffPart {
  text: string;
  type: "added" | "removed" | "unchanged";
}
