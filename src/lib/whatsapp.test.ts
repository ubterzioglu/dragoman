import { describe, it, expect } from "vitest";
import { buildWhatsappLink } from "./whatsapp";
import { SITE } from "./site";

describe("buildWhatsappLink", () => {
  it("targets the configured wa.me number", () => {
    expect(buildWhatsappLink()).toContain(`https://wa.me/${SITE.whatsapp}?text=`);
  });

  it("includes provided fields in the decoded message", () => {
    const link = buildWhatsappLink({ tourTitle: "Kekova West", date: "2026-07-01", partySize: 2, name: "Ada" });
    const text = decodeURIComponent(link.split("text=")[1]);
    expect(text).toContain("Kekova West");
    expect(text).toContain("2026-07-01");
    expect(text).toContain("2");
    expect(text).toContain("Ada");
  });

  it("omits empty fields", () => {
    const text = decodeURIComponent(buildWhatsappLink({ name: "Ada" }).split("text=")[1]);
    expect(text).not.toContain("Tur:");
    expect(text).toContain("Ada");
  });
});
