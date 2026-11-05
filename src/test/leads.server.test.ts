import { beforeEach, describe, expect, it, vi } from "vitest";
import { RATE_LIMIT_MESSAGE, type ChatLead, type QuoteLead } from "@/lib/lead-schema";
import {
  LeadError,
  escapeHtml,
  hashIp,
  processChatLead,
  processQuoteLead,
  type LeadMail,
  type LeadRow,
  type LeadStore,
} from "@/lib/leads.server";

type Stored = LeadRow & { id: string; created_at: string; mail_status: "sent" | "failed" | null };

function memoryStore(seed: Stored[] = []) {
  const rows = [...seed];
  const store: LeadStore = {
    async countSince(since, ipHash) {
      return rows.filter((r) => r.created_at >= since && (!ipHash || r.ip_hash === ipHash)).length;
    },
    async insert(row) {
      const id = `lead-${rows.length + 1}`;
      rows.push({ ...row, id, created_at: new Date().toISOString(), mail_status: null });
      return id;
    },
    async setMailStatus(id, status) {
      rows.find((r) => r.id === id)!.mail_status = status;
    },
  };
  return { store, rows };
}

const quote: QuoteLead = {
  name: "Erika <b>Muster</b>",
  email: "erika@example.de",
  phone: "0221 123456",
  objektart: "Praxis",
  flaeche: 120,
  haeufigkeit: "Wöchentlich",
  website: "",
  elapsedMs: 10_000,
};
const chat: ChatLead = {
  name: "Max",
  service: "Glasreinigung",
  contact: "0176 1234567",
  website: "",
  elapsedMs: 10_000,
};

function recent(n: number, ipHash: string | null): Stored[] {
  return Array.from({ length: n }, (_, i) => ({
    id: `old-${i}`,
    created_at: new Date().toISOString(),
    mail_status: "sent",
    name: "x",
    email: null,
    phone: null,
    service: null,
    message: null,
    source: "formular",
    ip_hash: ipHash,
  }));
}

let mails: LeadMail[];
const okMailer = async (m: LeadMail) => {
  mails.push(m);
};

beforeEach(() => {
  mails = [];
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("honeypot & minimum fill time", () => {
  it("silently accepts but neither stores nor mails when the honeypot is filled", async () => {
    const { store, rows } = memoryStore();
    await expect(
      processQuoteLead(
        { ...quote, website: "http://spam.example" },
        { store, mailer: okMailer, ipHash: "a".repeat(64) },
      ),
    ).resolves.toEqual({ ok: true });
    await expect(
      processChatLead({ ...chat, website: "x" }, { store, mailer: okMailer, ipHash: null }),
    ).resolves.toEqual({ ok: true });
    expect(rows).toHaveLength(0);
    expect(mails).toHaveLength(0);
  });

  it("silently drops submissions faster than 3 seconds", async () => {
    const { store, rows } = memoryStore();
    await expect(
      processQuoteLead({ ...quote, elapsedMs: 2999 }, { store, mailer: okMailer, ipHash: null }),
    ).resolves.toEqual({ ok: true });
    expect(rows).toHaveLength(0);
    expect(mails).toHaveLength(0);
  });
});

describe("rate limit", () => {
  const ip = "b".repeat(64);

  it("allows the 5th request per IP and rejects the 6th", async () => {
    const { store, rows } = memoryStore(recent(4, ip));
    await processQuoteLead(quote, { store, mailer: okMailer, ipHash: ip });
    expect(rows).toHaveLength(5);
    const err = await processQuoteLead(quote, { store, mailer: okMailer, ipHash: ip }).catch(
      (e) => e,
    );
    expect(err).toBeInstanceOf(LeadError);
    expect(err.message).toBe(RATE_LIMIT_MESSAGE);
    expect(rows).toHaveLength(5);
  });

  it("rejects everyone once 100 leads arrived in the last hour", async () => {
    const { store } = memoryStore(recent(100, null));
    await expect(
      processChatLead(chat, { store, mailer: okMailer, ipHash: "c".repeat(64) }),
    ).rejects.toThrow(RATE_LIMIT_MESSAGE);
  });

  it("ignores leads older than one hour", async () => {
    const old = recent(5, ip).map((r) => ({
      ...r,
      created_at: new Date(Date.now() - 2 * 3600_000).toISOString(),
    }));
    const { store } = memoryStore(old);
    await expect(processQuoteLead(quote, { store, mailer: okMailer, ipHash: ip })).resolves.toEqual(
      { ok: true },
    );
  });
});

describe("store → mail", () => {
  it("stores the lead, sends an escaped mail and marks it sent", async () => {
    const { store, rows } = memoryStore();
    await processQuoteLead(quote, { store, mailer: okMailer, ipHash: null });
    expect(rows[0]).toMatchObject({
      service: "Praxisreinigung",
      source: "formular",
      mail_status: "sent",
    });
    expect(mails[0]!.subject).toBe("Neue Online-Anfrage aus Köln – Fleckenlos Gebäudereinigung");
    expect(mails[0]!.html).toContain("Erika &lt;b&gt;Muster&lt;/b&gt;");
    expect(mails[0]!.html).not.toContain("<b>Muster</b>");
  });

  it("still succeeds for the customer when the mail fails, with mail_status 'failed'", async () => {
    const { store, rows } = memoryStore();
    const failing = async () => {
      throw new Error("resend responded 500");
    };
    await expect(processChatLead(chat, { store, mailer: failing, ipHash: null })).resolves.toEqual({
      ok: true,
    });
    expect(rows[0]).toMatchObject({
      source: "chatbot",
      phone: "0176 1234567",
      email: null,
      mail_status: "failed",
    });
    const logged = vi.mocked(console.error).mock.calls.flat().join(" ");
    expect(logged).toContain("lead-1");
    expect(logged).not.toContain("0176 1234567");
    expect(logged).not.toContain("Max");
  });

  it("returns an error and sends no mail when storing fails", async () => {
    const { store } = memoryStore();
    store.insert = async () => {
      throw new Error("db down");
    };
    await expect(
      processQuoteLead(quote, { store, mailer: okMailer, ipHash: null }),
    ).rejects.toBeInstanceOf(LeadError);
    expect(mails).toHaveLength(0);
  });

  it("labels chatbot mails", async () => {
    const { store } = memoryStore();
    await processChatLead(chat, { store, mailer: okMailer, ipHash: null });
    expect(mails[0]!.subject).toBe("Neue Online-Anfrage aus Köln – Fleckenlos Gebäudereinigung");
  });
});

describe("helpers", () => {
  it("escapes HTML", () => {
    expect(escapeHtml(`<a href="x">'&'</a>`)).toBe(
      "&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;",
    );
  });

  it("hashes IPs with the salt and never returns the IP", async () => {
    const h = await hashIp("203.0.113.7", "salt");
    expect(h).toMatch(/^[0-9a-f]{64}$/);
    expect(h).not.toContain("203.0.113.7");
    expect(await hashIp("203.0.113.7", "other")).not.toBe(h);
    expect(await hashIp("203.0.113.7", undefined)).toBeNull();
  });
});
