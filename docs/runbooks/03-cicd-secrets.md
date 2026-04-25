# Runbook 03 — CI/CD Secrets Setup

> **Who executes this:** propersam, via GitHub UI and terminal.
> **When:** after Item 4's workflow commit lands on `main` (i.e., after this runbook is committed).
> **Goal:** wire the two GitHub Secrets that allow the GHA workflow to SSH into the OCI VM and deploy.

---

## Step 1 — Add GitHub Secrets to the API repo

Navigate to:
```
https://github.com/failfastng/failfast-learner-api/settings/secrets/actions
```

Click **"New repository secret"** for each of the following:

---

### Secret 1: `OCI_HOST`

| Field | Value |
|---|---|
| Name | `OCI_HOST` |
| Value | `145.241.243.20` |

---

### Secret 2: `OCI_SSH_KEY`

| Field | Value |
|---|---|
| Name | `OCI_SSH_KEY` |
| Value | the full contents of `~/.ssh/failfast_oci_deploy` (the **private** key) |

To copy the value:

```bash
cat ~/.ssh/failfast_oci_deploy
```

Copy the **entire** output — including the header and footer lines:

```
-----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----
```

Paste directly into the GitHub secret value field. No quotes, no extra whitespace, no trailing newline issues — GitHub's UI handles it correctly when you paste the raw output.

---

## Step 2 — Ensure the compose files are on the VM

The workflow SSHs into the VM and runs:

```bash
cd /home/ubuntu/failfast-learner-api
docker compose pull
docker compose up -d
docker image prune -f
```

This directory must exist and contain `docker-compose.yml`, `Caddyfile`, and a populated `.env` file. This was set up in Item 2's runbook (`01-oci-deploy.md`).

Verify the directory is in place:

```bash
ssh -i ~/.ssh/failfast_oci_deploy ubuntu@145.241.243.20 \
  "ls /home/ubuntu/failfast-learner-api/"
```

Expected output should include at minimum: `docker-compose.yml`, `Caddyfile`, `.env`.

If the directory is missing or incomplete, re-run the relevant steps from `docs/runbooks/01-oci-deploy.md` before triggering the first workflow run.

---

## Step 3 — Enable GHCR package access for the org

Navigate to:
```
https://github.com/organizations/failfastng/settings/packages
```

Check the following:

- **Package creation:** ensure "Public" is allowed (so the `failfast-learner-api` package can be created on first push).
- **Default permissions:** ensure workflow tokens have **read/write** access to packages. This allows `GITHUB_TOKEN` to push images to `ghcr.io/failfastng/` without a personal access token.

If the org is private, also verify that the `failfast-learner-api` repo has been granted access to write packages: `https://github.com/orgs/failfastng/packages` → find `failfast-learner-api` package (after first push) → Package Settings → add the repo with **Write** access.

---

## Step 4 — Trigger first CI/CD run

Push a trivial change to the API repo to fire the workflow:

```bash
cd /path/to/failfast-learner-api
echo "" >> README.md
git add README.md
git commit -m "chore: trigger first CI/CD run"
git push origin main
```

This fires the `Deploy API` workflow on the `main` branch.

---

## Step 5 — Verify

1. **GitHub → Actions tab** on `failfast-learner-api` → watch the workflow run. All steps should go green in under 5 minutes (build ~2–3 min, SSH deploy ~30 sec).

2. **On VM — new image present:**
   ```bash
   ssh -i ~/.ssh/failfast_oci_deploy ubuntu@145.241.243.20 \
     "docker images | grep failfast-learner-api"
   ```
   The `latest` tag should show a `CREATED` timestamp of less than 5 minutes ago.

3. **On VM — container restarted with new image:**
   ```bash
   ssh -i ~/.ssh/failfast_oci_deploy ubuntu@145.241.243.20 \
     "docker compose -f /home/ubuntu/failfast-learner-api/docker-compose.yml ps"
   ```
   The `api` service should be `healthy` with an uptime of less than 2 minutes (confirming it restarted, not stayed on the old image).

4. **API still responds:**
   ```bash
   curl https://api.learner.failfastng.com
   ```
   Should return `"Hello World!"` — no cold-start outage.

5. **GHCR package visible:**
   Navigate to `https://github.com/orgs/failfastng/packages` → `failfast-learner-api` package should be listed with the `latest` tag and a recent push timestamp.

---

## Summary: secrets required

| Secret name | Value source |
|---|---|
| `OCI_HOST` | `145.241.243.20` (static OCI VM public IP) |
| `OCI_SSH_KEY` | `cat ~/.ssh/failfast_oci_deploy` (full private key text) |

`GITHUB_TOKEN` is **not** a secret you add — it is minted automatically by GitHub Actions for each workflow run and is scoped to the repo with `packages: write` permission (declared in the workflow's `permissions` block).
