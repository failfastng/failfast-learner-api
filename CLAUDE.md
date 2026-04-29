# failfast-learner-api

NestJS 11 REST API for FailFast Learner. Serves questions, records sessions, manages waitlist signups, and logs analytics events. Deployed as a Docker container behind Cloudflare, PostgreSQL via `pg.Pool` + Prisma 7.

## Agent memory

**Read [`MEMORY.md`](./MEMORY.md) before starting any task.** It contains hard-won patterns and mistakes from past sessions that are not obvious from the code alone.

**Update `MEMORY.md` when you finish.** If you hit a non-obvious problem, discover a new invariant, make a decision that future agents should know about, or find that an existing entry is wrong — add or correct it. Keep entries concise: state the rule, why it exists, and how to apply it. This file is the institutional memory for this codebase.

## Stack

- NestJS 11, TypeScript
- Prisma 7 + `@prisma/adapter-pg` + `pg` (no URL-based connection)
- PostgreSQL 16
- `class-validator` / `class-transformer` for DTO validation
- `@nestjs/throttler` for rate limiting
- Docker multi-stage build, Node 22 Alpine

## Non-negotiable before every commit

**Run `npm run build` and confirm it exits clean.** Lint alone is not enough — NestJS type errors only surface at build time. A broken build means a crashed container in production. This is not optional.

## Prisma 7 invariants (read this before touching anything Prisma-related)

1. **`schema.prisma` datasource has NO `url` field** — only `provider = "postgresql"`. The URL lives in `prisma.config.ts`.
2. **`prisma.config.ts`** uses `import { defineConfig } from 'prisma/config'` — NOT `'@prisma/config'` (wrong package, fails silently).
3. **`PrismaService`** instantiates `pg.Pool` with individual env vars (`POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_HOST`, `POSTGRES_DB`, `POSTGRES_PORT`), passes it to `new PrismaPg(pool)`, and gives the adapter to `super({ adapter })`. Never use `connectionString` — passwords with `+/=` break URL parsing.
4. **`tsconfig.build.json` must exclude `prisma.config.ts`** — having it at the repo root shifts TypeScript's inferred `rootDir` from `./src` to `.`, which moves the compiled output from `dist/main.js` to `dist/src/main.js` and crashes the container with `Cannot find module '/app/dist/main.js'`.
5. **Dockerfile builder stage**: `npx prisma generate` must run before `nest build`.
6. **Container CMD**: `["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]` — migrations apply automatically on every start.
7. **After any schema change**: run `npx prisma generate` locally so TypeScript picks up new model accessors before building.
8. **Prisma table names in Postgres are PascalCase and quoted** — raw SQL must use `"Session"`, `"WaitlistSignup"`, `"ShareEvent"` etc.

## Session row sync pattern

The session analytics POST fires on `SummaryPhase` mount — before the user interacts with share/waitlist CTAs. Any event that fires after must also patch the `Session` row directly:

- `POST /events/share` → `Promise.all([shareEvent.create, session.updateMany({ clicked_share: true })])`
- `POST /waitlist` → upsert `WaitlistSignup` keyed by `(email, source)` with merge-only updates for repeats, then `session.updateMany({ completed_waitlist_signup: true })` when `session_uuid` is supplied. The honeypot path returns early and must not write signup rows or session rows.

## Adding a new event type

Follow the pattern in `src/events/`:
1. DTO with `@IsUUID() session_uuid` (and `@IsOptional()` where appropriate)
2. Service method: create the event row + `session.updateMany` in `Promise.all`
3. Controller: `@Post('name')`, `@HttpCode(204)`, `@Throttle({ default: { limit: N, ttl: 60_000 } })`
4. New Prisma model in `schema.prisma`
5. Handwritten migration SQL in `prisma/migrations/<timestamp>_<name>/migration.sql`
6. Run `npx prisma generate` locally, then `npm run build` to verify

## Adding migrations

- Create `prisma/migrations/<timestamp>_<name>/migration.sql` with raw SQL
- `migration_lock.toml` must declare `provider = "postgresql"`
- Migrations run automatically on next container start via `prisma migrate deploy`
- Never edit applied migrations — always add a new one

## Module structure

```
src/
  common/filters/    — global exception filter
  events/            — reset + share event logging
  prisma/            — PrismaService (singleton)
  questions/         — question bank endpoint
  sessions/          — session analytics POST
  waitlist/          — email signup + honeypot guard
```

## Environment variables required

```
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_HOST
POSTGRES_DB
POSTGRES_PORT
```

## Rate limits (current)

- `/events/reset` → 30 req/min
- `/events/share` → 10 req/min
- `/waitlist` → stricter (honeypot guard + throttle)
