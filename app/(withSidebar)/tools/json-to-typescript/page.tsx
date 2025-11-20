"use client";

import { useMemo, useState } from "react";
import {
  convertJsonToTypeScript,
  type TypeStructure,
} from "@/lib/json-to-typescript";
import { PageHeader } from "@/components/json-to-typescript/page-header";
import { JsonInputCard } from "@/components/json-to-typescript/json-input-card";
import { TypeScriptOutputCard } from "@/components/json-to-typescript/typescript-output-card";
import { useJsonError } from "@/components/json-to-typescript/use-json-error";
import { useCopyToClipboard } from "usehooks-ts";

const EXAMPLE_JSON = `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "isActive": true,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zipCode": "10001"
  },
  "hobbies": ["reading", "coding", "traveling"],
  "scores": [95, 87, 92]
}`;

export default function JsonToTypeScript() {
  const [jsonInput, setJsonInput] = useState("");
  const [rootName, setRootName] = useState("Root");
  const [typeStructure, setTypeStructure] = useState<TypeStructure>("single");

  const [copiedText, copy] = useCopyToClipboard();
  const errorLineNumber = useJsonError(jsonInput);

  const result = useMemo<{
    output: string;
    error: string | null;
  } | null>(() => {
    if (!jsonInput.trim()) {
      return null;
    }
    return convertJsonToTypeScript(jsonInput, {
      rootName: rootName || "Root",
      useTypeAlias: false,
      makeOptional: false,
      typeStructure,
    });
  }, [jsonInput, rootName, typeStructure]);

  const handleCopy = () => {
    if (result?.output) {
      copy(result.output);
    }
  };

  // Convert copiedText to boolean for the component
  const copied = !!copiedText && copiedText === result?.output;

  const handleLoadExample = () => {
    setJsonInput(EXAMPLE_JSON);
    setRootName("User");
  };

  const handlePrettify = () => {
    if (!jsonInput.trim()) {
      return;
    }
    try {
      const parsed = JSON.parse(jsonInput);
      const prettified = JSON.stringify(parsed, null, 2);
      setJsonInput(prettified);
    } catch (error) {
      // If JSON is invalid, show error but don't change input
      console.error("Invalid JSON:", error);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "JSON to TypeScript Converter",
    description:
      "Free online tool to convert JSON objects to TypeScript interfaces and types. Generate type definitions from JSON data instantly.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Convert JSON to TypeScript",
      "Generate interfaces and types",
      "Support for nested objects",
      "Array type inference",
      "Real-time conversion",
    ],
  };

  return (
    <article className="space-y-8 max-w-7xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageHeader />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <JsonInputCard
          jsonInput={jsonInput}
          onJsonInputChange={setJsonInput}
          rootName={rootName}
          onRootNameChange={setRootName}
          typeStructure={typeStructure}
          onTypeStructureChange={setTypeStructure}
          errorLineNumber={errorLineNumber}
          onLoadExample={handleLoadExample}
          onPrettify={handlePrettify}
          result={result}
        />

        <TypeScriptOutputCard
          output={result?.output}
          error={result?.error}
          copied={copied}
          onCopy={handleCopy}
        />
      </div>
    </article>
  );
}
