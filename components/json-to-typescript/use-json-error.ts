import { useMemo } from "react";

/**
 * Hook to extract the error line number from JSON parse errors
 */
export function useJsonError(jsonInput: string): number | null {
  return useMemo(() => {
    if (!jsonInput.trim()) {
      return null;
    }

    try {
      JSON.parse(jsonInput);
      return null;
    } catch (error) {
      if (error instanceof SyntaxError) {
        // Try to extract position from error message
        const positionMatch = error.message.match(/position (\d+)/i);
        if (positionMatch) {
          const position = parseInt(positionMatch[1], 10);
          // Calculate line number by counting newlines up to the error position
          const textBeforeError = jsonInput.substring(0, position);
          const lineNumber = textBeforeError.split("\n").length;
          return lineNumber;
        }

        // For "Unexpected end of JSON input", highlight the last line
        if (error.message.includes("Unexpected end of JSON input")) {
          return jsonInput.split("\n").length;
        }
      }
    }

    return null;
  }, [jsonInput]);
}
