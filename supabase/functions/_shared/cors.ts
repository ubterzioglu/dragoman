// Shared CORS headers for Edge Functions. The admin panel invokes functions
// from the browser, so preflight + permissive origin are required.
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-shared-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
