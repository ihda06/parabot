"use client";

import { FileText, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { JsonTextarea } from "./json-textarea";
import { ConversionSettings } from "./conversion-settings";
import { type TypeStructure } from "@/lib/json-to-typescript";
import Show from "@/components/ui/show";

interface JsonInputCardProps {
  jsonInput: string;
  onJsonInputChange: (value: string) => void;
  rootName: string;
  onRootNameChange: (value: string) => void;
  typeStructure: TypeStructure;
  onTypeStructureChange: (value: TypeStructure) => void;
  errorLineNumber: number | null;
  onLoadExample: () => void;
  onPrettify: () => void;
  result:
    | {
        output: string;
        error: string | null;
      }
    | null
    | undefined;
}

export function JsonInputCard({
  jsonInput,
  onJsonInputChange,
  rootName,
  onRootNameChange,
  typeStructure,
  onTypeStructureChange,
  errorLineNumber,
  onLoadExample,
  onPrettify,
  result,
}: JsonInputCardProps) {
  const lineCount = jsonInput.split("\n").length;

  return (
    <Card className="flex flex-col h-full border-2 border-border/50 shadow-lg shadow-black/5 dark:shadow-black/20 bg-linear-to-br from-card via-card to-card/95 overflow-hidden">
      <CardHeader className="border-b border-border/40 bg-linear-to-r from-accent/5 via-transparent to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-linear-to-br from-accent/20 to-accent/10 border border-accent/20">
              <FileText className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-semibold leading-none tracking-tight">
                JSON Input
              </h2>
              <CardDescription className="mt-1.5">
                Paste or enter your JSON data
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onLoadExample}
              className="text-xs"
            >
              Load Example
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0 p-6 space-y-4">
        <ConversionSettings
          rootName={rootName}
          onRootNameChange={onRootNameChange}
          typeStructure={typeStructure}
          onTypeStructureChange={onTypeStructureChange}
        />
        <div className="flex-1 flex flex-col min-h-0">
          <JsonTextarea
            value={jsonInput}
            onChange={onJsonInputChange}
            errorLineNumber={errorLineNumber}
          />
          <Show when={!!jsonInput}>
            <div className="flex items-center justify-between pt-3">
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span>
                  {lineCount} lines
                  {result?.error ? (
                    <span className="text-red-500 ml-2">
                      • Invalid JSON
                    </span>
                  ) : result?.output ? (
                    <span className="text-green-500 ml-2">
                      • Valid JSON
                    </span>
                  ) : null}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onPrettify}
                disabled={!jsonInput.trim()}
                className="text-xs"
                title="Format JSON with proper indentation"
              >
                <Wand2 className="h-3 w-3 mr-1" />
                Prettify
              </Button>
            </div>
          </Show>
        </div>
      </CardContent>
    </Card>
  );
}

