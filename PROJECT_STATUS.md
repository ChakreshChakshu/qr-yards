# QRYards Project Status

## 1. Project Overview

QRYards is a frontend-first QR code generator web app.

Main product goals:

- let users create QR codes for different content types
- preview QR-linked content in styled templates
- customize QR design
- download QR codes in usable formats
- add account access with email/password and OAuth

Current stack:

- `frontend/`: Vite + React + TypeScript
- styling/UI: Tailwind + shadcn/ui + Radix
- QR generation: `qr-code-styling`
- auth: Supabase browser auth
- `backend/`: reserved scaffold for future protected server-side logic

---

## 2. Current Project Structure

### Frontend

Important paths:

- `frontend/src/pages/Index.tsx`
  - landing page
- `frontend/src/pages/QRGeneratorPage.tsx`
  - full QR generator experience
- `frontend/src/pages/Auth.tsx`
  - auth page for login/register with Supabase
- `frontend/src/components/qr-generator/`
  - QR wizard, forms, preview, templates, customization
- `frontend/src/components/landing/`
  - navbar, hero, sections, footer
- `frontend/src/integrations/supabase/client.ts`
  - Supabase browser client
- `frontend/src/contexts/AuthContext.tsx`
  - auth session state for UI
- `frontend/.env.example`
  - frontend auth env template

### Backend

Important paths:

- `backend/README.md`
  - explains why backend exists and what it is for later
- `backend/.env.example`
  - placeholder env for future service-role/backend work
- `backend/package.json`
  - placeholder package scaffold

Backend is not active yet. It is intentionally reserved for:

- privileged Supabase access
- analytics ingestion
- webhooks
- custom protected APIs

---

## 3. What This Project Currently Does

### Landing experience

The app already has a branded landing page with:

- hero section
- feature blocks
- QR types showcase
- FAQ/testimonial style sections
- CTA links into auth and QR generator flows

### QR generator

The QR generator works as a multi-step flow:

1. choose QR type
2. enter content
3. customize design

Features already present:

- multiple QR content types
- content forms by type
- styled content preview inside phone/template mockups
- QR design customization:
  - foreground color
  - background color
  - eye color
  - module shape
  - eye shape
  - optional logo
  - frame style
- QR download:
  - PNG
  - SVG

### Auth

Supabase auth wiring has been added to frontend.

Implemented:

- email/password login
- email/password signup
- Google OAuth button
- GitHub OAuth button
- browser session restore
- navbar session awareness
- sign out support
- auth config warning if Supabase env missing

Important note:

- auth code is implemented
- live auth only works after Supabase dashboard/provider setup is completed

---

## 4. What Has Been Done So Far

### Completed code/infra work

#### QR app foundation

- built landing page and QR generator UI
- added QR design preview/export flow
- added route structure:
  - `/`
  - `/auth`
  - `/qr-generator`

#### Lint/typing cleanup

The earlier blocking lint errors were fixed:

- removed `any` usages in QR customization/preview flow
- fixed empty-interface lint issues
- verified:
  - `npm test` passes
  - `npm run build` passes
  - `npm run lint` has no errors

Remaining lint output is warnings only from fast-refresh rules in some shared UI files.

#### Supabase integration

Added:

- `@supabase/supabase-js`
- frontend Supabase client
- auth context provider
- real auth page replacing old mock form
- session-aware navbar
- frontend env template

#### Backend scaffold

Created `backend/` so future privileged logic has a home.

This is intentional separation:

- frontend uses Supabase anon/public key
- backend will later use Supabase service role key

---

## 5. Current Auth Architecture

### Frontend responsibility

Frontend handles browser auth directly with Supabase:

- signup
- login
- OAuth start
- session persistence
- logout

Required frontend env:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

### Backend responsibility later

Backend will be used only for privileged or protected work:

- service-role DB operations
- server-side business rules
- internal APIs
- scan analytics pipeline
- webhooks

Important rule:

- never put `SUPABASE_SERVICE_ROLE_KEY` in frontend

---

## 6. What Is Still To Be Done

### A. Finish Supabase dashboard setup

This is the most immediate next step.

Still needed in Supabase:

- set `Site URL`
- add frontend redirect URL
- enable Email provider
- create and connect Google OAuth credentials
- create and connect GitHub OAuth credentials

For local dev:

- `Site URL`: `http://localhost:5173`
- redirect URL:
  - `http://localhost:5173/auth?mode=login`

### B. Validate live auth flows

After provider setup:

- test signup
- test login
- test logout
- test Google OAuth
- test GitHub OAuth
- confirm redirect and session restore behavior

### C. Reduce product/code drift

There is still drift between vision docs and implementation.

Examples:

- `frontend/plan.md` mentions more capabilities than current app fully supports
- auth was previously visual-only and is now real, but needs final dashboard setup
- some listed QR type ambitions are broader than current polished implementation

Need:

- align `plan.md` with actual delivered scope
- define phase 2 priorities clearly

### D. Remove duplicate QR type config

There are two QR type definitions in repo:

- active one under `frontend/src/components/qr-generator/qr-types.ts`
- another config file under `frontend/src/config/qrTypes.config.ts`

This should be consolidated into one source of truth.

### E. Improve performance

Current build passes, but bundle is large.

Needs later work:

- route/code splitting
- defer heavy libraries
- reduce landing-page load cost

### F. Add real backend only when needed

Backend should be implemented only when a real protected requirement exists, such as:

- user-specific saved QR codes
- analytics storage
- admin actions
- payment/subscription logic

---

## 7. Recommended Next Steps

### Immediate next steps

1. finish Google OAuth setup in Supabase
2. finish GitHub OAuth setup in Supabase
3. enable Email auth provider
4. verify all auth flows locally
5. fix any live callback/redirect issues

### After auth is stable

1. consolidate duplicate QR type config
2. decide whether QR generator should be public or partially gated
3. add user-specific saved data if accounts are meant to matter
4. optimize bundle size
5. define backend phase only when protected features exist

---

## 8. Suggested Product Direction

There are two clean ways to move forward.

### Option 1: Keep it frontend-first

Good if goal is:

- fast launch
- static QR generator
- simple auth
- minimal ops

Then:

- finish auth
- polish QR flow
- maybe save user preferences/profile only

### Option 2: Grow into SaaS

Good if goal is:

- user dashboards
- saved/generated QR history
- scan analytics
- dynamic QR management
- plans/payments

Then:

- keep current frontend auth
- build backend APIs gradually
- add protected database flows

---

## 9. Current Risks / Known Gaps

- Supabase auth code exists but is not fully validated until dashboard/provider setup is finished
- QR type definitions are duplicated in repo
- build bundle is still large
- tests are very thin right now
- backend exists only as scaffold, not as running server

---

## 10. Summary

QRYards is already a functioning QR generator frontend with polished UI and working Supabase auth integration in code.

What is done:

- frontend app structure
- landing page
- QR generator wizard
- QR preview/download
- lint/type cleanup
- Supabase auth integration
- backend scaffold

What remains:

- complete Supabase provider/dashboard setup
- test live auth flows
- clean duplicated config
- optimize bundle
- decide if/when backend should become real

The most important next milestone is:

- finish Supabase provider setup and validate auth end-to-end
