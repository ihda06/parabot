import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Truncates a string by cutting the middle portion, keeping the beginning and end visible.
 *
 * @param str - The string to truncate
 * @param maxLength - Maximum length of the resulting string (default: 50)
 * @param startLength - Number of characters to keep at the start (default: 20)
 * @param endLength - Number of characters to keep at the end (default: 20)
 * @param ellipsis - Text to insert in the middle (default: "...")
 * @returns The truncated string
 *
 * @example
 * truncateMiddle("This is a very long string that needs to be truncated", 30)
 * // Returns: "This is a very lo...truncated"
 */
export function truncateMiddle(
  str: string,
  maxLength: number = 50,
  startLength: number = 20,
  endLength: number = 20,
  ellipsis: string = "..."
): string {
  if (!str || str.length <= maxLength) {
    return str;
  }

  // Ensure we have enough space for start, end, and ellipsis
  const minRequiredLength = startLength + endLength + ellipsis.length;
  if (maxLength < minRequiredLength) {
    // If maxLength is too small, adjust start and end proportionally
    const availableLength = maxLength - ellipsis.length;
    startLength = Math.floor(availableLength / 2);
    endLength = availableLength - startLength;
  }

  // If the string is shorter than start + end + ellipsis, just return it
  if (str.length <= startLength + endLength) {
    return str;
  }

  const start = str.slice(0, startLength);
  const end = str.slice(-endLength);

  return `${start}${ellipsis}${end}`;
}
