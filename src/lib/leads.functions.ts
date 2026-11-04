import { createServerFn } from "@tanstack/react-start";
import { chatLeadSchema, quoteLeadSchema } from "./lead-schema";

/** Client IP as seen by the edge. Only ever used hashed (see hashIp). */
async function clientIp(): Promise<string | undefined> {
  const { getRequestHeader, getRequestIP } = await import("@tanstack/react-start/server");
  return getRequestHeader("cf-connecting-ip") ?? getRequestIP({ xForwardedFor: true }) ?? undefined;
}

type LeadsServer = typeof import("./leads.server");
type LeadDeps = import("./leads.server").LeadDeps;

async function run<T>(fn: (deps: LeadDeps, mod: LeadsServer) => Promise<T>) {
  const mod = await import("./leads.server");
  const deps = await mod.productionDeps(await clientIp());
  try {
    return await fn(deps, mod);
  } catch (e) {
    // Re-throw only the user-facing message; never leak internals.
    if (e instanceof mod.LeadError) throw new Error(e.message);
    console.error("lead handler failed", e instanceof Error ? e.message : e);
    throw new Error("Anfrage konnte nicht gesendet werden. Bitte erneut versuchen oder anrufen.");
  }
}

export const sendQuoteRequest = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => quoteLeadSchema.parse(d))
  .handler(({ data }) => run((deps, mod) => mod.processQuoteLead(data, deps)));

export const submitChatLead = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => chatLeadSchema.parse(d))
  .handler(({ data }) => run((deps, mod) => mod.processChatLead(data, deps)));
