# failfast-learner-api — Agent Memory

## Prisma 7 (CRITICAL — caused multi-session debugging)

- **No `url` in `schema.prisma`**. Prisma 7 removed datasource `url` from the schema file. It lives in `prisma.config.ts` using `defineConfig` from `'prisma/config'` (NOT `'@prisma/config'` — wrong package, breaks silently).
- **`PrismaClient` requires a driver adapter**. Use `@prisma/adapter-pg` + `pg.Pool`. Always pass individual env vars (`POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_HOST`, `POSTGRES_DB`, `POSTGRES_PORT`) to `pg.Pool` — never `connectionString`. Passwords with `+/=` characters break URL parsing.
- **`prisma.config.ts` at repo root shifts TypeScript's inferred `rootDir`** from `./src` to `.`, which moves compiled output from `dist/main.js` to `dist/src/main.js`, crashing the container with `Cannot find module '/app/dist/main.js'`. Fix: add `"prisma.config.ts"` to the `exclude` array in `tsconfig.build.json`.
- **Dockerfile**: run `npx prisma generate` before `nest build` in the builder stage. In CMD: `["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]` — migrations run automatically on every container start.
- **Prisma creates PascalCase quoted table names** in Postgres. Raw SQL must use `"Session"`, `"WaitlistSignup"`, `"ShareEvent"` etc. — lowercase `sessions` will 404.
- **After any schema change**: run `npx prisma generate` locally before building so TypeScript picks up new model accessors.

## OAuth Protected Resource Metadata

- **API host (canonical):** `GET /.well-known/oauth-protected-resource` from `AppController`, host-aware via `req.headers.host`. `resource` must match the API origin (`https://learner-api.failfastng.com/` or `https://learner-api.failfastedu.com/`). `authorization_servers` points at the matching marketing site.
- **Marketing sites** publish separate static PRM where `resource` matches the marketing origin (`https://failfastng.com/` or `https://failfastedu.com/`) so agent-readiness scanners pass origin validation. Agents integrating with the API should read PRM from the **API host**; `auth.md` on each marketing site documents both URLs.

## Always build before pushing (non-negotiable)

Run `npm run build` in the API repo before every commit. The user was explicit and frustrated when a broken build was pushed. Lint passing is not sufficient — NestJS type errors only surface at build time.

## Session row must stay in sync with side-effect events

When any event fires that relates to a session, always update `Session` in the same operation:
- `POST /events/share` → `Promise.all([shareEvent.create, session.updateMany({ clicked_share: true })])`
- `POST /waitlist` → upsert signup by `(email, source)` with merge-only nullable fields on repeat submits, then `session.updateMany({ completed_waitlist_signup: true })` when `session_uuid` is supplied. Bots that trip the honeypot never hit signup logic — keep session updates paired with genuine signup handling only.

## Adding new event types

Follow the pattern in `src/events/`: DTO with `@IsUUID() session_uuid`, service method that creates the event row + updates Session, controller `@HttpCode(204)` with `@Throttle`. Each new event type also needs a Prisma model and a handwritten migration SQL file.

## Migration workflow

- New models need a migration file at `prisma/migrations/<timestamp>_<name>/migration.sql`
- `migration_lock.toml` must declare `provider = "postgresql"`
- Migrations apply automatically on container start via `prisma migrate deploy` in CMD
