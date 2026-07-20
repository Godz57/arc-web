import { describe, expect, it } from "vitest";
import { getContent } from "./index";

describe("getContent", () => {
  it("returns Portuguese services with stable ids", () => {
    const pt = getContent("pt");
    expect(pt.services.map((s) => s.id)).toEqual([
      "landing-pages",
      "ecommerce",
      "sistemas-web",
      "manutencao",
    ]);
    expect(pt.services[0].description).toMatch(/conversão|conversao/i);
    expect(pt.defaultWhatsappMessage).toMatch(/Olá|ola/i);
  });

  it("returns English copy for the same service ids", () => {
    const en = getContent("en");
    expect(en.services.map((s) => s.id)).toEqual(
      getContent("pt").services.map((s) => s.id)
    );
    expect(en.services[0].description).toMatch(/conversion|performance/i);
    expect(en.defaultWhatsappMessage).toMatch(/Hello|project/i);
    expect(en.aboutContent.role).toMatch(/front-end|immersive/i);
  });

  it("keeps FAQ count aligned", () => {
    expect(getContent("en").faqItems).toHaveLength(
      getContent("pt").faqItems.length
    );
  });

  it("shares stack tags across locales", () => {
    expect(getContent("en").stackTags).toEqual(getContent("pt").stackTags);
  });

  it("keeps privacy section counts aligned", () => {
    expect(getContent("en").privacy.sections.length).toBe(
      getContent("pt").privacy.sections.length
    );
    expect(getContent("en").privacy.sections.length).toBeGreaterThan(3);
  });
});
