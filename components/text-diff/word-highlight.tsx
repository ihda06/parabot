import { diffWords, type Change } from "diff";

interface WordHighlightProps {
  oldText: string;
  newText: string;
  type: "added" | "removed" | "unchanged";
}

export function WordHighlight({ oldText, newText, type }: WordHighlightProps) {
  // For unchanged lines, just return the text
  if (type === "unchanged") {
    return <span>{oldText || newText}</span>;
  }

  // For added/removed lines, show word-level diff
  const changes = diffWords(oldText || "", newText || "");

  return (
    <span>
      {changes.map((change: Change, index: number) => {
        if (change.added) {
          return (
            <span
              key={index}
              className="bg-green-500/30 dark:bg-green-500/40 text-green-800 dark:text-green-200 px-0.5 rounded"
            >
              {change.value}
            </span>
          );
        } else if (change.removed) {
          return (
            <span
              key={index}
              className="bg-red-500/30 dark:bg-red-500/40 text-red-800 dark:text-red-200 px-0.5 rounded line-through"
            >
              {change.value}
            </span>
          );
        } else {
          return <span key={index}>{change.value}</span>;
        }
      })}
    </span>
  );
}
