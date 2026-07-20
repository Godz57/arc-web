import { describe, expect, it } from "vitest";
import {
  getSeoCopy,
  getLanguageAlternates,
  buildJsonLd,
  htmlLang,
} from "./seo";

describe("seo i18n", () => {
  it("returns locale-specific titles", () => {
    expect(getSeoCopy("pt").title).toMatch(/ARC WEB/);
    expect(getSeoCopy("pt").description).toMatch(/sites|landing/i);
    expect(getSeoCopy("en").description).toMatch(/website|landing|web/i);
    expect(getSeoCopy("en").title).not.toEqual(getSeoCopy("pt").title);
  });

  it("builds hreflang map for home", () => {
    const alt = getLanguageAlternates("/");
    expect(alt["pt-BR"]).toMatch(/https?:\/\//);
    expect(alt["en"]).toMatch(/\/en$/);
    expect(alt["x-default"]).toBe(alt["pt-BR"]);
  });

  it("buildJsonLd sets inLanguage per locale", () => {
    type GraphNode = { "@type"?: string; inLanguage?: string };
    type JsonLdGraph = { "@graph": GraphNode[] };

    const pt = buildJsonLd("https://arcweb.com.br", "pt") as JsonLdGraph;
    const en = buildJsonLd("https://arcweb.com.br", "en") as JsonLdGraph;
    const ptWeb = pt["@graph"].find((n) => n["@type"] === "WebSite");
    const enWeb = en["@graph"].find((n) => n["@type"] === "WebSite");
    expect(ptWeb?.inLanguage).toBe("pt-BR");
    expect(enWeb?.inLanguage).toBe("en");
  });

  it("htmlLang maps correctly", () => {
    expect(htmlLang("pt")).toBe("pt-BR");
    expect(htmlLang("en")).toBe("en");
  });
});
