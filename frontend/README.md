# Frontend Auth Setup

## Google OAuth with Supabase

1. Copy `frontend/.env.example` to `frontend/.env` and set:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_SITE_URL`
2. Local dev default for this Vite app:
   - `VITE_SITE_URL=http://localhost:5173`
   - callback URL is `http://localhost:5173/auth/callback`
3. In Supabase Dashboard:
   - Go to `Authentication` -> `Providers` -> `Google`
   - Enable Google
   - Paste your Google OAuth client ID and client secret
4. In Supabase `Authentication` -> `URL Configuration`:
   - Set `Site URL` to `http://localhost:5173` for local dev
   - Add `http://localhost:5173/auth/callback` to Redirect URLs
   - Add production site URL and production callback too when deployed
5. In Google Cloud Console:
   - Create OAuth client of type `Web application`
   - Add `http://localhost:5173` to `Authorized JavaScript origins`
   - Add Supabase callback URI to `Authorized redirect URIs`:
     `https://<your-project-ref>.supabase.co/auth/v1/callback`
6. Restart frontend dev server after env changes.

App starts Google OAuth from `/auth`, Supabase returns to `/auth/callback`, then session restores and user redirects to `/qr-generator`.
