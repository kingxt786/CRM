# TotBtot CRM — Electron + React + Supabase (Windows)

## Quick start
1. Install Node.js (v18+) and Git.
2. Clone repo and `cd` into it.
3. Create a Supabase project and run the SQL schema (see `supabase-schema.sql`).
4. Copy `.env.example` to `.env` and fill `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
5. `npm install`
6. Development: `npm run dev` (opens Electron with Vite)
7. Build Windows installer: `npm run package:win` (produces NSIS .exe in `dist`)

## Notes
- Use Supabase Auth for user login. Enable RLS policies (SQL provided).
- Printing uses browser print dialog; choose your printer.

## GitHub Actions (Auto build .exe)

1. Create a GitHub repo and push this project to the `main` branch.
2. In the repo Settings → Secrets → Actions, add these secrets:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Go to Actions tab and run the `Build Windows Installer` workflow or push to `main`.
4. When the workflow completes, download the `.exe` from the Artifacts section.
