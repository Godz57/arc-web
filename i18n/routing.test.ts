import { describe, expect, it } from "vitest";
import { defaultLocale, locales, pathnames, isLocale } from "./routing";

describe("i18n routing", () => {
  it("exposes pt (default) and en only", () => {
    expect(locales).toEqual(["pt", "en"]);
    expect(defaultLocale).toBe("pt");
  });

  it("isLocale accepts only known locales", () => {
    expect(isLocale("pt")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("es")).toBe(false);
    expect(isLocale("")).toBe(false);
  });

  it("maps privacy pathnames per locale", () => {
    expect(pathnames["/privacidade"]).toEqual({
      pt: "/privacidade",
      en: "/privacy",
    });
  });
});
