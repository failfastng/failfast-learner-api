# Runbook 01 — OCI VM Deploy: Docker + Caddy + DNS

> **Who runs this:** propersam, manually.
> **When:** once, to stand up the API server for the first time.
> **Estimated time:** 45–60 minutes (mostly waiting on apt, DNS propagation, and ACME).
>
> All commands that run **on your local machine** are prefixed `# LOCAL`.
> All commands that run **on the VM** are prefixed `# VM`.
> Neither label appears in the copy-paste blocks — read the context heading.

---

## 0. Pre-conditions — verify before starting

Run these locally. All three must pass before you proceed.

```bash
# LOCAL — confirm VM is reachable
ping -c 3 145.241.243.20

# LOCAL — confirm SSH key pair exists
ls -la ~/.ssh/failfast_oci_deploy ~/.ssh/failfast_oci_deploy.pub

# LOCAL — confirm the public IP hasn't changed (should print 145.241.243.20)
# (check OCI Console: Compute → Instances → instance-20260213-1152 → Instance Information → Public IP address)
```

Expected: ping responds, both key files exist, OCI console shows `145.241.243.20` and state `Running`.

---

## 1. Add SSH public key to the OCI VM

You need to get your new deploy key's public key onto the VM.

**Option A — You can already SSH in with your existing key (most likely):**

```bash
# LOCAL — print the public key you need to add
cat ~/.ssh/failfast_oci_deploy.pub
```

Copy the entire output line (starts with `ssh-ed25519` or `ssh-rsa`). Then SSH in with your existing key and append it:

```bash
# LOCAL — SSH in with whatever key already works
ssh ubuntu@145.241.243.20

# VM — append the new public key
echo 'PASTE_THE_FULL_PUBLIC_KEY_LINE_HERE' >> ~/.ssh/authorized_keys
exit
```

**Option B — Add via OCI Console (if no existing SSH access):**

1. OCI Console → Compute → Instances → `instance-20260213-1152`
2. Resources (left sidebar) → Attached VNICs → click the VNIC name
3. Resources → IPv4 Addresses → action menu → Edit → add SSH key → paste contents of `~/.ssh/failfast_oci_deploy.pub`

**Test the new key:**

```bash
# LOCAL
ssh -i ~/.ssh/failfast_oci_deploy ubuntu@145.241.243.20 "echo OK"
```

Expected output: `OK` — no passphrase prompt, no fingerprint error.

---

## 2. Open ports 80 and 443 in the OCI Security List

Caddy needs inbound HTTP (80) and HTTPS (443) to serve traffic and complete ACME (Let's Encrypt) challenges.

1. OCI Console → Networking → Virtual Cloud Networks
2. Click your VCN (the one `instance-20260213-1152` lives in)
3. Resources → Security Lists → Default Security List for \<your-vcn\>
4. Click **Add Ingress Rules** and add these two rules one at a time:

**Rule 1 — HTTP:**
- Source Type: CIDR
- Source CIDR: `0.0.0.0/0`
- IP Protocol: TCP
- Destination Port Range: `80`
- Description: `Caddy HTTP / ACME challenge`

**Rule 2 — HTTPS:**
- Source Type: CIDR
- Source CIDR: `0.0.0.0/0`
- IP Protocol: TCP
- Destination Port Range: `443`
- Description: `Caddy HTTPS`

**Rule 3 — SSH (restrict this):**

If an existing SSH rule says source `0.0.0.0/0` port `22`, edit it to use your home/office IP only:
- Source CIDR: `YOUR_HOME_IP/32` (find it at https://ifconfig.me)
- Description: `SSH propersam home/office`

Fail2ban (installed in Step 3) adds a second layer, but restricting the security list is the belt-and-suspenders approach.

---

## 3. Install fail2ban, Docker Engine, Compose plugin, and Caddy on the VM

SSH in, then paste the entire block in one go.

```bash
# LOCAL
ssh -i ~/.ssh/failfast_oci_deploy ubuntu@145.241.243.20
```

Once on the VM, paste this entire block:

```bash
# VM
set -euo pipefail

# ── System update ──────────────────────────────────────────────
sudo apt-get update && sudo apt-get upgrade -y

# ── fail2ban ───────────────────────────────────────────────────
sudo apt-get install -y fail2ban
sudo systemctl enable --now fail2ban

# ── Docker Engine + Compose plugin ────────────────────────────
sudo apt-get install -y ca-certificates curl gnupg lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=arm64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io \
  docker-buildx-plugin docker-compose-plugin

sudo systemctl enable --now docker
sudo usermod -aG docker ubuntu

# ── Verify Docker ──────────────────────────────────────────────
docker --version && docker compose version
```

> **After this block completes:** log out and log back in so the `docker` group change takes effect.
> ```bash
> exit
> ssh -i ~/.ssh/failfast_oci_deploy ubuntu@145.241.243.20
> # Verify you can run docker without sudo:
> docker ps
> ```

Now install Caddy (paste this block after logging back in):

```bash
# VM
set -euo pipefail

sudo apt-get install -y debian-keyring debian-archive-keyring apt-transport-https curl

curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
  | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg

curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
  | sudo tee /etc/apt/sources.list.d/caddy-stable.list

sudo apt-get update
sudo apt-get install -y caddy

sudo systemctl enable --now caddy

# Verify
caddy version
sudo systemctl status caddy --no-pager
```

Expected: Caddy version printed, systemd shows `active (running)`.

---

## 4. Clone the API repo to the VM

```bash
# VM
cd /home/ubuntu
git clone https://github.com/failfastng/failfast-learner-api.git
cd failfast-learner-api
ls -la   # should show Dockerfile, docker-compose.yml, Caddyfile, .env.example, etc.
```

---

## 5. Create the `.env` file on the VM

This file is never committed to git. It lives on the VM only. Create it from the example:

```bash
# VM
cd /home/ubuntu/failfast-learner-api
cp .env.example .env
nano .env   # or: vi .env
```

Fill in every value. Template with explanations:

```bash
# Database connection string — uses the Docker Compose service name 'postgres' as the host.
# Port is always 5432. DB name, user, and password must match POSTGRES_* values below.
DATABASE_URL=postgresql://failfast:CHANGE_ME_STRONG_PASSWORD@postgres:5432/failfast

# Postgres container credentials — must match DATABASE_URL above
POSTGRES_USER=failfast
POSTGRES_PASSWORD=CHANGE_ME_STRONG_PASSWORD
POSTGRES_DB=failfast

# CORS — comma-separated browser origins (GET/POST). No trailing slashes.
# Example includes the Expo learner web app and marketing site:
# CORS_ORIGIN=https://learner.failfastng.com,https://www.failfastng.com

# Node environment — leave as production
NODE_ENV=production
```

Rules:
- `POSTGRES_PASSWORD` and the password in `DATABASE_URL` must be identical.
- Use a strong random password (e.g. `openssl rand -base64 32` on the VM to generate one).
- `CORS_ORIGIN` lists comma-separated allowlist origins, no trailing slashes, no wildcards — include learner web and marketing site if both POST from the browser.
- This file must not be readable by other users: `chmod 600 .env`

```bash
# VM
chmod 600 /home/ubuntu/failfast-learner-api/.env
```

---

## 6. Install the Caddyfile and create the log directory

The repo's committed `Caddyfile` is the authoritative config. Copy it into place and create the log directory Caddy expects.

```bash
# VM
sudo cp /home/ubuntu/failfast-learner-api/Caddyfile /etc/caddy/Caddyfile

# Create the log directory the Caddyfile references
sudo mkdir -p /var/log/caddy
sudo chown caddy:caddy /var/log/caddy

# Validate the config before reloading
sudo caddy validate --config /etc/caddy/Caddyfile

# Reload Caddy with the new config
sudo systemctl reload caddy
```

Expected: `caddy validate` prints `Valid configuration.` — then reload succeeds silently.

---

## 7. First `docker compose up`

At this point the CI/CD pipeline (GitHub Actions → GHCR) is not yet wired. Build the image locally from source on the VM for the first deploy.

```bash
# VM
cd /home/ubuntu/failfast-learner-api

# Build the arm64 image locally from the committed Dockerfile
docker compose build

# Start all services in the background
docker compose up -d

# Confirm both containers are running
docker compose ps
```

Expected output from `docker compose ps`:

```
NAME        IMAGE                                             STATUS
api         ghcr.io/failfastng/failfast-learner-api:latest   Up X seconds
postgres    postgres:16-alpine                                Up X seconds (healthy)
```

The `api` container starts only after `postgres` reports healthy (the `depends_on: condition: service_healthy` in `docker-compose.yml`). This takes 10–20 seconds.

Check the API is responding on the loopback:

```bash
# VM
curl -s http://127.0.0.1:3000
```

Expected: JSON response (Hello World or 404 from NestJS — either confirms the server is up).

Check logs if anything looks wrong:

```bash
# VM
docker compose logs api --tail 50
docker compose logs postgres --tail 20
```

---

## 8. Add the DNS record at Squarespace

> **Do NOT modify any existing record.** Only add the new A record.

1. Log into Squarespace → Domains → failfastng.com → DNS Settings
2. Custom Records → **Add Record**
3. Fill in:
   - **Record type:** A
   - **Name (host):** `api.learner`
   - **Data (value):** `145.241.243.20`
   - **TTL:** `300`
4. Save.

Existing records to leave untouched (confirmed inventory from runbook 00):

| Record | Why it must not change |
|--------|----------------------|
| `ALIAS @` → `apex-loadbalancer.netlify.com` | Main site / Netlify |
| `CNAME www` → `failfastng.netlify.app` | www redirect |
| `MX @` → `smtp.google.com` | Google Workspace email |
| `TXT google._domainkey` | DKIM signing — email breaks without this |
| `TXT @` (SPF) | Email delivery — breaks without this |

---

## 9. Wait for DNS propagation and Caddy ACME challenge

TTL is 300 seconds. Full propagation typically takes 2–10 minutes; allow up to 30 minutes before troubleshooting.

**On your local machine — poll until the A record resolves:**

```bash
# LOCAL
watch -n 30 'dig api.learner.failfastng.com +short'
```

Expected: `145.241.243.20` appears. Press Ctrl+C once it does.

**On the VM — watch Caddy obtain the TLS certificate:**

```bash
# VM
sudo journalctl -u caddy -f
```

Look for log lines containing `certificate obtained successfully` or `tls.obtain`. Caddy triggers the ACME HTTP-01 challenge automatically when the first HTTPS request arrives at the domain. This requires port 80 to be open (done in Step 2) and DNS to resolve (done in Step 8).

If Caddy shows repeated ACME failures, check:
1. Port 80 ingress rule is saved in the OCI security list (Step 2)
2. `dig api.learner.failfastng.com +short` returns `145.241.243.20` (DNS propagated)
3. `sudo systemctl status caddy` shows `active (running)`

---

## 10. Verify end-to-end

Run each check. All five must pass before this runbook is complete.

**1. API responds over HTTPS:**

```bash
# LOCAL
curl -s https://api.learner.failfastng.com
```

Expected: JSON response from NestJS (Hello World or a 404 body — both confirm TLS is terminating and traffic is reaching the container).

**2. Both containers healthy:**

```bash
# VM
docker compose ps
```

Expected: `api` and `postgres` both show `Up` / `healthy`.

**3. Reboot persistence:**

```bash
# VM
sudo reboot
```

Wait 2 minutes, then from your local machine:

```bash
# LOCAL
curl -s https://api.learner.failfastng.com
```

Expected: same response as before the reboot. Docker Compose starts on reboot because both services have `restart: unless-stopped` and Docker itself is `systemctl enable`d.

**4. TLS certificate is valid:**

Open `https://api.learner.failfastng.com` in a browser. Click the padlock → Certificate. Verify:
- Issued by: Let's Encrypt
- Common Name (CN): `api.learner.failfastng.com`
- Not expired

**5. Email records are untouched (MX sanity check):**

```bash
# LOCAL
dig MX failfastng.com +short
```

Expected: `smtp.google.com` — Google Workspace mail is intact.

---

## Post-runbook: wire CI/CD (Item 4)

Once this runbook passes all 5 checks, the server is live. The next item wires GitHub Actions to:
1. Build the arm64 image and push to GHCR on every `main` push
2. SSH into the VM and run `docker compose pull && docker compose up -d`

GitHub Secrets to add to the `failfast-learner-api` repo before Item 4:
- `OCI_HOST` → `145.241.243.20`
- `OCI_SSH_KEY` → contents of `~/.ssh/failfast_oci_deploy` (the private key)
