import { describe, it, expect } from "vitest";
import { reservationSchema } from "./schema";

describe("reservationSchema", () => {
  it("accepts a minimal valid request (name + phone)", () => {
    const r = reservationSchema.safeParse({ name: "Ada Lovelace", phone: "+905551234567" });
    expect(r.success).toBe(true);
  });

  it("rejects missing name and short phone", () => {
    expect(reservationSchema.safeParse({ phone: "+905551234567" }).success).toBe(false);
    expect(reservationSchema.safeParse({ name: "Ada", phone: "123" }).success).toBe(false);
  });

  it("rejects a filled honeypot", () => {
    const r = reservationSchema.safeParse({ name: "Ada", phone: "+905551234567", honeypot: "bot" });
    expect(r.success).toBe(false);
  });

  it("coerces and bounds party size", () => {
    expect(reservationSchema.safeParse({ name: "Ada", phone: "+905551234567", partySize: "3" }).success).toBe(true);
    expect(reservationSchema.safeParse({ name: "Ada", phone: "+905551234567", partySize: 99 }).success).toBe(false);
  });

  it("allows empty optional email", () => {
    expect(reservationSchema.safeParse({ name: "Ada", phone: "+905551234567", email: "" }).success).toBe(true);
    expect(reservationSchema.safeParse({ name: "Ada", phone: "+905551234567", email: "bad" }).success).toBe(false);
  });
});
