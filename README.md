# FailFast Learner — API

NestJS 11 backend for the FailFast Learner app.

## Stack

- NestJS 11 (Node 20 LTS, arm64)
- Prisma ORM + PostgreSQL 16
- @nestjs/throttler for rate limiting
- Docker Compose (api + postgres services)
- Caddy 2.8+ reverse proxy with auto-TLS
- GitHub Actions CI/CD → GHCR arm64 image → OCI VM deploy

## Modules

| Module | Endpoint | Notes |
|---|---|---|
| QuestionsModule | GET /questions | Serves seed bank from memory |
| SessionsModule | POST /sessions | Logs session + outcomes in one transaction |
| WaitlistModule | POST /waitlist | Honeypot + throttle; upsert `WaitlistSignup` by `(email, source)`; merge missing fields |
| EventsModule | POST /events/reset | Logs reset events; returns 204 |

## Getting started

```bash
npm install
cp .env.example .env   # fill in your values
npm run start:dev
```

## Deployment

GitHub Actions builds an arm64 Docker image, pushes to GHCR, then SSH-deploys to the OCI Ampere A1 VM via `docker compose pull && up -d`.

Secrets required: `OCI_HOST`, `OCI_SSH_KEY`.

