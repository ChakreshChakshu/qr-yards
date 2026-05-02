# Frontend Auth Setup

## Google OAuth with Supabase

1. Copy `frontend/.env.example` to `frontend/.env` and set:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_SITE_URL`
2. In Supabase Dashboard:
   - Go to `Authentication` -> `Providers` -> `Google`
   - Enable Google
   - Paste your Google OAuth client ID and client secret
3. In Supabase `Authentication` -> `URL Configuration`:
   - Set `Site URL` to your app URL, for example `http://localhost:8080`
   - Add `http://localhost:8080/auth/callback` to Redirect URLs
   - Add your production callback URL too, for example `https://your-domain.com/auth/callback`
4. In Google Cloud / Google Auth Platform:
   - Create an OAuth client of type `Web application`
   - Add your frontend origin to `Authorized JavaScript origins`
   - Add your Supabase callback URL to `Authorized redirect URIs`:
     `https://<your-project-ref>.supabase.co/auth/v1/callback`
5. Restart the frontend dev server after env changes.

The app redirects Google OAuth back to `/auth/callback`, where Supabase restores the session and the UI sends the user into `/qr-generator`.
