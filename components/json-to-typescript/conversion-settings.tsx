"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type TypeStructure } from "@/lib/json-to-typescript";

interface ConversionSettingsProps {
  rootName: string;
  onRootNameChange: (value: string) => void;
  typeStructure: TypeStructure;
  onTypeStructureChange: (value: TypeStructure) => void;
}

export function ConversionSettings({
  rootName,
  onRootNameChange,
  typeStructure,
  onTypeStructureChange,
}: ConversionSettingsProps) {
  const typeStructureDescriptions = {
    single: "One interface with inline nested types",
    separated: "Separate interfaces for nested objects",
    inline: "Inline type without interface/type wrapper",
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="root-name" className="text-sm font-medium">
          Interface/Type Name
        </Label>
        <Input
          id="root-name"
          placeholder="Root"
          value={rootName}
          onChange={(e) => onRootNameChange(e.target.value)}
          className="font-mono"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="type-structure" className="text-sm font-medium">
          Type Structure
        </Label>
        <select
          id="type-structure"
          value={typeStructure}
          onChange={(e) =>
            onTypeStructureChange(e.target.value as TypeStructure)
          }
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          title={typeStructureDescriptions[typeStructure]}
        >
          <option value="single">Single Type</option>
          <option value="separated">Separated Types</option>
          <option value="inline">Inline/Monotype</option>
        </select>
        <p className="text-xs text-muted-foreground">
          {typeStructureDescriptions[typeStructure]}
        </p>
      </div>
    </div>
  );
}

