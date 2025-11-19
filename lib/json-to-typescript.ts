/**
 * JSON to TypeScript Converter
 * Converts JSON objects to TypeScript interface/type definitions
 */

export type TypeStructure = "separated" | "single" | "inline";

export interface ConversionOptions {
  rootName?: string;
  useTypeAlias?: boolean;
  makeOptional?: boolean;
  typeStructure?: TypeStructure;
}

/**
 * Infer TypeScript type from a value
 */
function inferType(value: unknown, options: ConversionOptions = {}): string {
  if (value === null || value === undefined) {
    return options.makeOptional ? "unknown" : "null";
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "any[]";
    }
    // Check all elements to determine common type
    const elementTypes = new Set(value.map((item) => inferType(item, options)));
    if (elementTypes.size === 1) {
      const type = Array.from(elementTypes)[0];
      return `${type}[]`;
    }
    // Mixed types - use union or any
    if (elementTypes.size > 1 && elementTypes.has("object")) {
      // For mixed arrays with objects, we'll use any[]
      return "any[]";
    }
    return `${Array.from(elementTypes).join(" | ")}[]`;
  }

  if (typeof value === "object" && value !== null) {
    return "object";
  }

  return typeof value;
}

/**
 * Convert a property name to a valid TypeScript identifier
 */
function sanitizePropertyName(name: string): string {
  // If it's a valid identifier, return as is
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name)) {
    return name;
  }
  // Otherwise, wrap in quotes
  return `"${name.replace(/"/g, '\\"')}"`;
}

/**
 * Context for tracking generated types in separated mode
 */
interface TypeContext {
  types: Map<string, string>;
  typeCounter: Map<string, number>;
  rootName: string;
}

/**
 * Generate a unique type name for nested objects
 */
function generateTypeName(key: string, context: TypeContext): string {
  const baseName = key.replace(/[^a-zA-Z0-9_$]/g, "").replace(/^[0-9]/, "_$&");

  const capitalized = baseName.charAt(0).toUpperCase() + baseName.slice(1);
  const count = context.typeCounter.get(capitalized) || 0;
  context.typeCounter.set(capitalized, count + 1);

  return count === 0 ? capitalized : `${capitalized}${count}`;
}

/**
 * Generate TypeScript type for any value
 */
function generateTypeValue(
  value: unknown,
  options: ConversionOptions = {},
  context?: TypeContext,
  indent: string = "",
  parentKey?: string
): string {
  if (value === null || value === undefined) {
    return options.makeOptional ? "unknown" : "null";
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "any[]";
    }
    const firstElement = value[0];
    if (typeof firstElement === "object" && firstElement !== null) {
      const typeStructure = options.typeStructure || "single";

      if (typeStructure === "separated" && context && parentKey) {
        const typeName = generateTypeName(parentKey, context);
        generateInterface(firstElement, options, context, "", typeName, true);
        return `${typeName}[]`;
      } else {
        const elementType = generateTypeValue(
          firstElement,
          options,
          context,
          indent + "  ",
          parentKey
        );
        return `(${elementType})[]`;
      }
    }
    const type = inferType(firstElement, options);
    return `${type}[]`;
  }

  if (typeof value === "object" && value !== null) {
    const typeStructure = options.typeStructure || "single";

    if (typeStructure === "separated" && context && parentKey) {
      const typeName = generateTypeName(parentKey, context);
      generateInterface(
        value as Record<string, unknown>,
        options,
        context,
        "",
        typeName,
        true
      );
      return typeName;
    } else {
      return generateInterface(
        value as Record<string, unknown>,
        options,
        context,
        indent,
        undefined,
        false
      );
    }
  }

  return inferType(value, options);
}

/**
 * Generate TypeScript interface/type for an object
 */
function generateInterface(
  obj: Record<string, unknown>,
  options: ConversionOptions = {},
  context?: TypeContext,
  indent: string = "",
  typeName?: string,
  addToContext: boolean = false
): string {
  const lines: string[] = [];
  const keys = Object.keys(obj);
  const typeStructure = options.typeStructure || "single";
  const isSeparated = typeStructure === "separated" && context;

  for (const key of keys) {
    const value = obj[key];
    const sanitizedKey = sanitizePropertyName(key);
    const isOptional =
      options.makeOptional && (value === null || value === undefined);

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      // Nested object
      if (isSeparated && context) {
        const nestedTypeName = generateTypeName(key, context);
        generateInterface(
          value as Record<string, unknown>,
          options,
          context,
          "",
          nestedTypeName,
          true
        );
        lines.push(
          `${indent}  ${sanitizedKey}${
            isOptional ? "?" : ""
          }: ${nestedTypeName};`
        );
      } else {
        const nestedType = generateTypeValue(
          value,
          options,
          context,
          indent + "  ",
          key
        );
        lines.push(
          `${indent}  ${sanitizedKey}${isOptional ? "?" : ""}: ${nestedType};`
        );
      }
    } else if (
      Array.isArray(value) &&
      value.length > 0 &&
      typeof value[0] === "object" &&
      value[0] !== null
    ) {
      // Array of objects
      if (isSeparated && context) {
        const arrayTypeName = generateTypeName(key, context);
        generateInterface(
          value[0] as Record<string, unknown>,
          options,
          context,
          "",
          arrayTypeName,
          true
        );
        lines.push(
          `${indent}  ${sanitizedKey}${
            isOptional ? "?" : ""
          }: ${arrayTypeName}[];`
        );
      } else {
        const arrayType = generateTypeValue(
          value[0],
          options,
          context,
          indent + "  ",
          key
        );
        lines.push(
          `${indent}  ${sanitizedKey}${isOptional ? "?" : ""}: ${arrayType}[];`
        );
      }
    } else {
      // Primitive or array of primitives
      const type = inferType(value, options);
      lines.push(
        `${indent}  ${sanitizedKey}${isOptional ? "?" : ""}: ${type};`
      );
    }
  }

  const interfaceBody = `{\n${lines.join("\n")}\n${indent}}`;

  if (addToContext && context && typeName) {
    context.types.set(typeName, `interface ${typeName} ${interfaceBody}`);
  }

  return interfaceBody;
}

/**
 * Convert JSON string to TypeScript interface/type definition
 */
export function convertJsonToTypeScript(
  jsonString: string,
  options: ConversionOptions = {}
): { output: string; error: string | null } {
  try {
    // Parse JSON
    const parsed = JSON.parse(jsonString);

    // Determine root name
    const rootName = options.rootName || "Root";
    const typeStructure = options.typeStructure || "single";

    // Handle inline mode - just return the type without interface/type wrapper
    if (typeStructure === "inline") {
      const type = generateTypeValue(parsed, options);
      return { output: type + "\n", error: null };
    }

    // Create context for separated mode
    let context: TypeContext | undefined;
    if (typeStructure === "separated") {
      context = {
        types: new Map(),
        typeCounter: new Map(),
        rootName,
      };
    }

    // Generate TypeScript
    let output: string;

    if (typeStructure === "separated" && context) {
      const isObject =
        typeof parsed === "object" && parsed !== null && !Array.isArray(parsed);

      if (isObject) {
        generateInterface(
          parsed as Record<string, unknown>,
          options,
          context,
          "",
          rootName,
          true
        );

        const allTypes: string[] = [];
        for (const [name, typeDef] of context.types.entries()) {
          if (name !== rootName) {
            allTypes.push(typeDef);
          }
        }

        const rootType = context.types.get(rootName);
        if (rootType) {
          allTypes.push(rootType);
        }

        output = allTypes.join("\n\n") + "\n";
      } else {
        const type = generateTypeValue(parsed, options, context);
        output = `type ${rootName} = ${type};\n`;
      }
    } else {
      // Single mode (default)
      if (options.useTypeAlias) {
        const type = generateTypeValue(parsed, options, context);
        output = `type ${rootName} = ${type};\n`;
      } else {
        if (
          typeof parsed === "object" &&
          parsed !== null &&
          !Array.isArray(parsed)
        ) {
          const interfaceBody = generateInterface(
            parsed as Record<string, unknown>,
            options,
            context
          );
          output = `interface ${rootName} ${interfaceBody}\n`;
        } else {
          const type = generateTypeValue(parsed, options, context);
          output = `type ${rootName} = ${type};\n`;
        }
      }
    }

    return { output, error: null };
  } catch (error) {
    if (error instanceof SyntaxError) {
      return {
        output: "",
        error: `Invalid JSON: ${error.message}`,
      };
    }
    return {
      output: "",
      error: `Error: ${String(error)}`,
    };
  }
}
