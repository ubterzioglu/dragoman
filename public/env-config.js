// Placeholder for runtime env injection. In production the Docker entrypoint
// (docker-entrypoint-env.sh) overwrites this file with real values so that
// VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY can be set at deploy time on Coolify
// without rebuilding the image. In local dev, Vite's import.meta.env is used instead.
window.__ENV = window.__ENV || {};
