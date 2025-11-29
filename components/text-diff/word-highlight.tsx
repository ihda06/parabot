import { diffChars, type Change } from "diff";

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

  // For added/removed lines, show character-level diff
  const changes = diffChars(oldText || "", newText || "");

  if (type === "removed") {
    // On left side: show only oldText, highlight removed parts
    return (
      <span>
        {changes.map((change: Change, index: number) => {
          if (change.removed) {
            return (
              <span
                key={index}
                className="bg-red-500/30 dark:bg-red-500/40 text-red-800 dark:text-red-400 px-0.5 rounded line-through"
              >
                {change.value}
              </span>
            );
          } else if (!change.added) {
            // Show unchanged parts normally
            return <span key={index}>{change.value}</span>;
          }
          // Skip added parts on the left side
          return null;
        })}
      </span>
    );
  } else if (type === "added") {
    // On right side: show only newText, highlight added parts
    return (
      <span>
        {changes.map((change: Change, index: number) => {
          if (change.added) {
            return (
              <span
                key={index}
                className="bg-green-500/30 dark:bg-green-500/40 text-green-800 dark:text-green-400 px-0.5 rounded"
              >
                {change.value}
              </span>
            );
          } else if (!change.removed) {
            // Show unchanged parts normally
            return <span key={index}>{change.value}</span>;
          }
          // Skip removed parts on the right side
          return null;
        })}
      </span>
    );
  }

  return <span>{oldText || newText}</span>;
}
