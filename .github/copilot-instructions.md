<!-- Copilot / AI agent instructions for contributors and tooling -->
# Repository summary

This is a Next.js 13 (app router) TypeScript project. Key directories:

- `app/` — App router; server components by default. See `app/layout.tsx` and `app/page.tsx`.
- `app/api/` — Route handlers using Next.js Route Handlers (`route.ts`). Example paths: `app/api/users/login/route.ts`, `app/api/users/signup/route.ts`.
- `dbconfig/db.ts` — Mongoose connection helper; runtime `MONGO_URL` env var is required.
- `public/`, `helpers/`, `models/` — supporting assets, helpers, and Mongoose models.

# Big picture & architecture cues

- The app uses the Next.js App Router (server-first). UI files under `app/*` are generally server components unless a `"use client"` directive is present.
- API endpoints are implemented with Route Handlers in `app/api/*/route.ts` and run server-side. Authentication likely uses `bcryptjs` and `jsonwebtoken` (see `package.json`).
- Database access is centralized in `dbconfig/db.ts` and uses `mongoose`. Any server code that needs DB access should call `connectDB()` (server-side only).

# Important developer workflows

- Run development server: `npm run dev` (see `package.json`).
- Build for production: `npm run build` then `npm run start`.
- Lint: `npm run lint`.
- Environment: set `MONGO_URL` (e.g. in `.env.local`) for MongoDB connections. `dbconfig/db.ts` performs a runtime check and will throw if `MONGO_URL` is missing.

# Project-specific conventions and patterns

- TypeScript + Next 13 app router conventions: components under `app/` are server components by default; add `"use client"` at the top of a file for client components.
- API handlers: export `GET`, `POST`, etc. from `route.ts`. These files live at `app/api/<resource>/route.ts`.
- DB helper: `connectDB()` is async and expects `process.env.MONGO_URL` to be present. To avoid TS errors, code uses runtime checks rather than non-null assertions.
- Avoid calling `process.exit()` from library helpers — errors should be thrown so the caller decides how to handle them (this project follows that pattern in `dbconfig/db.ts`).

# Integration points & dependencies to watch

- Mongoose (`mongoose`) — DB models likely in `models/`.
- Auth stack: `bcryptjs`, `jsonwebtoken`, and `nodemailer` are installed — expect auth-related logic in `app/api/users/*`.
- HTTP client on frontend: `axios` is available.

# Patterns for AI edits (what an automated agent should do)

- When modifying server-side code that reads env vars, add a runtime check (`if (!process.env.MONGO_URL) throw ...`) rather than assuming presence; reference `dbconfig/db.ts`.
- Prefer `await mongoose.connect(uri)` and propagate errors upward instead of calling `process.exit()` inside helpers.
- For new API routes, follow the `app/api/<resource>/route.ts` shape and export handlers named for the HTTP methods.
- Keep UI changes inside `app/*` and avoid moving CLI/server-only code into client components.

# Files to reference when automating changes

- `dbconfig/db.ts` — DB connection example and env-var handling.
- `app/layout.tsx` — global layout and font loading pattern.
- `app/api/users/login/route.ts` and `app/api/users/signup/route.ts` — intended API endpoints (currently present).
- `package.json` — scripts for dev/build/start/lint.

# If you change runtime or build behavior

- Update `package.json` scripts and include any new env vars in README and/or `.env.example`.

Please review and tell me if you want stricter rules (typing policies, security checks, or a `.env.example` scaffold). If anything is unclear or you want this merged into an existing instructions file, tell me which sections to keep or remove.
