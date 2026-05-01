# Backend

This folder is reserved for server-side work if QRYards later needs:

- protected admin APIs
- scan analytics ingestion
- webhook handlers
- custom email workflows
- file processing or signed upload flows

Current auth direction does not require a custom backend. `frontend/` can use Supabase Auth directly for:

- email/password sign-in
- OAuth providers like Google and GitHub
- session persistence
- email confirmation and password reset

If backend auth or protected business logic is added later, keep it here.
