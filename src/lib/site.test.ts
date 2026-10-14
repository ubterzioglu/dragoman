import { describe, expect, it } from "vitest";

import { SITE } from "./site";

describe("SITE", () => {
  it("uses the production domain for canonical URLs", () => {
    expect(SITE.domain).toBe("https://notyetbro.club");
  });
});
