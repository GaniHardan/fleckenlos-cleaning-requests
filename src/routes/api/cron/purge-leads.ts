import { createFileRoute } from "@tanstack/react-router";

/**
 * Fallback retention job (only needed if pg_cron is unavailable, see migration 0001):
 * deletes leads older than 12 months. Call daily with
 *   Authorization: Bearer $LOVABLE_CRON_SECRET
 */
export const Route = createFileRoute("/api/cron/purge-leads")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { authenticateCronRequest } = await import("@/integrations/supabase/cron-auth");
        const denied = await authenticateCronRequest(request);
        if (denied) return denied;

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const cutoff = new Date();
        cutoff.setMonth(cutoff.getMonth() - 12);
        const { count, error } = await supabaseAdmin
          .from("leads")
          .delete({ count: "exact" })
          .lt("created_at", cutoff.toISOString());
        if (error) {
          console.error("purge-leads failed", error.message);
          return Response.json({ ok: false }, { status: 500 });
        }
        return Response.json({ ok: true, deleted: count ?? 0 });
      },
    },
  },
});
