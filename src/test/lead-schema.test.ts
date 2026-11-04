import { describe, expect, it } from "vitest";
import { chatLeadSchema, parseContact, quoteLeadSchema } from "@/lib/lead-schema";

const validQuote = {
  name: "Erika Muster",
  email: "erika@example.de",
  phone: "+49 221 123456",
  objektart: "Praxis",
  flaeche: 120,
  haeufigkeit: "Wöchentlich",
  website: "",
  elapsedMs: 15_000,
};

describe("quoteLeadSchema", () => {
  it("accepts a valid quote request", () => {
    expect(quoteLeadSchema.safeParse(validQuote).success).toBe(true);
  });

  it.each([
    ["empty name", { name: "  " }],
    ["name too long", { name: "x".repeat(101) }],
    ["invalid email", { email: "kein-mail" }],
    ["phone with letters", { phone: "0221 abc 123" }],
    ["phone too short", { phone: "12345" }],
    ["unknown objektart", { objektart: "Schloss" }],
    ["unknown haeufigkeit", { haeufigkeit: "Jährlich" }],
    ["area 0", { flaeche: 0 }],
    ["missing elapsedMs", { elapsedMs: undefined }],
  ])("rejects %s", (_, patch) => {
    expect(quoteLeadSchema.safeParse({ ...validQuote, ...patch }).success).toBe(false);
  });
});

describe("chatLeadSchema", () => {
  const validChat = {
    name: "Max",
    service: "Praxisreinigung",
    contact: "max@example.de",
    elapsedMs: 20_000,
  };

  it("accepts e-mail or phone as contact", () => {
    expect(chatLeadSchema.safeParse(validChat).success).toBe(true);
    expect(chatLeadSchema.safeParse({ ...validChat, contact: "0221 / 123 45-6" }).success).toBe(
      true,
    );
  });

  it("rejects unknown services and invalid contacts", () => {
    expect(chatLeadSchema.safeParse({ ...validChat, service: "Fensterputzen" }).success).toBe(
      false,
    );
    expect(chatLeadSchema.safeParse({ ...validChat, contact: "ruf mich an" }).success).toBe(false);
  });
});

describe("parseContact (chatbot contact check)", () => {
  it.each([
    ["info@fleckenlos.nrw", "email"],
    ["+49 (221) 7173-2304", "phone"],
    ["0176/84202516", "phone"],
  ])("accepts %s as %s", (v, kind) => {
    expect(parseContact(v)?.kind).toBe(kind);
  });

  it.each(["hallo", "12345", "0221 12345 67890 12345 6", "+-/()  -", "max@", "<script>"])(
    "rejects %s",
    (v) => {
      expect(parseContact(v)).toBeNull();
    },
  );
});
