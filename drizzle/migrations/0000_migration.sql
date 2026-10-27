CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  source text NOT NULL DEFAULT 'formular',
  name text NOT NULL,
  email text,
  phone text,
  service text,
  message text
);
GRANT INSERT ON public.leads TO anon, authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a lead" ON public.leads FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 100
  AND (email IS NULL OR char_length(email) <= 255)
  AND (phone IS NULL OR char_length(phone) <= 40)
  AND (service IS NULL OR char_length(service) <= 60)
  AND (message IS NULL OR char_length(message) <= 2000)
  AND source IN ('formular','chatbot')
);