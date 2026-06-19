/**
 * Resolves env vars, preferring runtime-injected values (window.__ENV from
 * /env-config.js on Coolify) over build-time import.meta.env. This lets the
 * same Docker image be deployed with different Supabase credentials without a
 * rebuild. The service_role key is NEVER exposed here — client only.
 */
declare global {
  interface Window {
    __ENV?: Record<string, string>;
  }
}

function read(key: string): string {
  const runtime = typeof window !== "undefined" ? window.__ENV?.[key] : undefined;
  const build = (import.meta.env as Record<string, string | undefined>)[key];
  return (runtime || build || "").trim();
}

export const ENV = {
  SUPABASE_URL: read("VITE_SUPABASE_URL"),
  SUPABASE_ANON_KEY: read("VITE_SUPABASE_ANON_KEY"),
};

export const hasSupabase = Boolean(ENV.SUPABASE_URL && ENV.SUPABASE_ANON_KEY);
