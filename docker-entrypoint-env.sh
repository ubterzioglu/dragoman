#!/bin/sh
# Generates /env-config.js at container start so VITE_ public vars can be set
# at deploy time (Coolify env) without rebuilding the image. Only PUBLIC vars
# (anon key, url) belong here — never the service_role key.
set -e

TARGET=/usr/share/nginx/html/env-config.js

cat > "$TARGET" <<EOF
window.__ENV = {
  VITE_SUPABASE_URL: "${VITE_SUPABASE_URL:-}",
  VITE_SUPABASE_ANON_KEY: "${VITE_SUPABASE_ANON_KEY:-}"
};
EOF

echo "env-config.js generated."
