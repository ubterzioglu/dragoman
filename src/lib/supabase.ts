import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { ENV, hasSupabase } from "./env";

/**
 * Anonymous Supabase client. Null when env vars are absent (e.g. local dev
 * without a .env file) so callers can degrade gracefully — the reservation
 * form still works via the WhatsApp fallback.
 */
export const supabase: SupabaseClient | null = hasSupabase
  ? createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY)
  : null;
