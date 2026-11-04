-- Leads: only server functions (service_role) may write. Browser roles lose all access.
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;
--> statement-breakpoint
REVOKE ALL ON public.leads FROM anon, authenticated;
--> statement-breakpoint
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS ip_hash text;
--> statement-breakpoint
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS mail_status text;
--> statement-breakpoint
-- Length / value checks formerly enforced by the insert policy, now on the table itself.
ALTER TABLE public.leads
  ADD CONSTRAINT leads_name_len CHECK (char_length(name) BETWEEN 1 AND 100),
  ADD CONSTRAINT leads_email_len CHECK (email IS NULL OR char_length(email) <= 255),
  ADD CONSTRAINT leads_phone_len CHECK (phone IS NULL OR char_length(phone) <= 40),
  ADD CONSTRAINT leads_service_len CHECK (service IS NULL OR char_length(service) <= 60),
  ADD CONSTRAINT leads_message_len CHECK (message IS NULL OR char_length(message) <= 2000),
  ADD CONSTRAINT leads_source_valid CHECK (source IN ('formular', 'chatbot')),
  ADD CONSTRAINT leads_ip_hash_len CHECK (ip_hash IS NULL OR char_length(ip_hash) = 64),
  ADD CONSTRAINT leads_mail_status_valid CHECK (mail_status IS NULL OR mail_status IN ('sent', 'failed'));
--> statement-breakpoint
-- Rate-limit lookups (per ip_hash and in total, last hour).
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS leads_ip_hash_created_at_idx ON public.leads (ip_hash, created_at);
--> statement-breakpoint
-- Retention: delete leads older than 12 months, daily at 03:17 UTC.
-- Uses pg_cron when available; otherwise the migration still succeeds and the
-- fallback route /api/cron/purge-leads (LOVABLE_CRON_SECRET) has to be scheduled.
DO $$
BEGIN
  CREATE EXTENSION IF NOT EXISTS pg_cron;
  PERFORM cron.schedule(
    'fleckenlos-purge-old-leads',
    '17 3 * * *',
    $cron$DELETE FROM public.leads WHERE created_at < now() - interval '12 months'$cron$
  );
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'pg_cron not available (%). Schedule /api/cron/purge-leads instead.', SQLERRM;
END
$$;
