import { describe, expect, it } from "vitest";
import pt from "./pt.json";
import en from "./en.json";

function leafPaths(obj: unknown, prefix = ""): string[] {
  if (obj !== null && typeof obj === "object" && !Array.isArray(obj)) {
    return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
      leafPaths(v, prefix ? `${prefix}.${k}` : k)
    );
  }
  return [prefix];
}

describe("messages parity", () => {
  it("en has the same keys as pt", () => {
    expect(leafPaths(en).sort()).toEqual(leafPaths(pt).sort());
  });
});
